var headers = {
    'Accept': 'application/vnd.vtex.ds.v10+json',
    'Content-Type': 'application/json'
};

var isWishListPage = $('body').hasClass('wishlist');
var documentClientId = '';
var wishlistStoreName = 'duratex';

function onWishListEmpty(){
    $('.x-no-itens').addClass('x-active');
}

// eventos nos botoes wishlist
function wishlist() {
    $('body').on('click', '.x-wishlist-btn', function() {
        $(this).addClass('x-loading');
        var elemento = $(this);
        var id= $(this).closest('li').find('.x-id').val();
        saveOnWishlist(elemento, id);
        return false;
    });
    
    $('.x-product-view__wistlist').on('click', function() {
        if( !skuJson ) return false;
        
        $(this).addClass('x-loading');
        var elemento = $(this);
        var id= skuJson.productId;
        saveOnWishlist(elemento, id);
        
        return false;
    });
};


function saveOnWishlist(elemento, idProduto){
    var $this = elemento;
    var wishlistID = idProduto;

    $.ajax({
        type: 'GET',
        url: '/no-cache/profileSystem/getProfile',

        success: function(data) {
            var userEmail = data.Email;

            if (data.IsUserDefined == false) {
                vtexid.start({
                    returnUrl: '',
                    userEmail: '',
                    locale: 'pt-BR',
                    forceReload: false
                });

            } else {

                if (data.IsUserDefined == true && data.FirstName == null) {
                    $('#x-userEmail').val(userEmail);
                    $('#x-cadastro-user').show();
                } else {

                    addProductWishlist.apply($this, [wishlistID, userEmail]);

                    if ( $.cookie("wishlist") == undefined || $.cookie("wishlist") == 'undefined') {
                        $.cookie("wishlist", wishlistID, {
                            path: "/",
                            expires: 1
                        });
                    } else {
                        var oldCookie = $.cookie("wishlist").split(/,/);
                        
                        if( oldCookie.indexOf( wishlistID ) != -1){
                            var wishlistIDs = $.cookie("wishlist") + "," + wishlistID;
                        }else{
                            var wishlistIDs = oldCookie.remove(wishlistID);
                            wishlistIDs = ''.concat(wishlistIDs);
                        }

                        $.cookie("wishlist", wishlistIDs, {
                            path: "/",
                            expires: 1
                        });
                    };

                    wishlistSelectedsCookie();

                };

            };

        },

        error: function(data) {
            console.log(data);
            console.log("Ops, ocorreu um erro.");
        }
    });
}


function addProductWishlist(id_produto, userEmail) {
    $(this).each(function() {
        var $elem = $(this);
        var elemAdded = true;
        var jsonWishlist = {
            "userId": userEmail,
            "productsList": ''
        };
        var getUserId = '';
        var idWishList = '';

        $.ajax({
            headers: headers,
            type: 'GET',
            url: 'https://api.vtexcrm.com.br/'+wishlistStoreName+'/dataentities/CL/search?_where=email=' + userEmail +'&_fields=id',

            success: function(data) {
                if( $(data).length ){
                    getUserId = data[0].id;

                    $.ajax({
                        headers: headers,
                        type: 'GET',
                        url: 'https://api.vtexcrm.com.br/'+wishlistStoreName+'/dataentities/WL/search?_where=userId=' + getUserId + '&_fields=id,productsList',

                        success: function(response) {
                            if( response[0] ){
                                var oldList = response[0].productsList;
                                if( oldList ){
                                    if( oldList.indexOf(',') != -1 ){
                                        oldList = oldList.split(/,/);
                                    }
                                }
                                idWishList = response[0].id;
                            }

                            // verificando se o produto ja esta na wishlist
                            if( oldList ){
                                var indexElem = oldList.indexOf(id_produto.toString());
                                if( indexElem == -1 ){
                                    jsonWishlist.productsList = oldList + ',' + id_produto;
                                }
                                else{
                                    if( Array.isArray(oldList) ){
                                        oldList.remove(id_produto.toString());
                                        jsonWishlist.productsList = ''.concat(oldList);
                                    } else{
                                        jsonWishlist.productsList = '';
                                    }

                                    elemAdded = false;
                                }
                            } else{
                                jsonWishlist.productsList = id_produto;
                            }

                            saveNewProductIdList();
                        }
                    });
                }
            },

            error: function(data) {
                console.log(data);
            }
        });

        function saveNewProductIdList(){
            var urlWishlist = 'https://api.vtexcrm.com.br/'+wishlistStoreName+'/dataentities/WL/documents/'+idWishList;
            console.log(jsonWishlist);
            $.ajax({
                headers: headers,
                data: JSON.stringify(jsonWishlist),
                type: 'PATCH',
                url: urlWishlist,
                success: function(data) {
                    console.log("Produto adicionado a wishlist!");
                    $elem.removeClass('x-loading');

                    if( elemAdded ){
                        $elem.addClass('x-active');
                    }else{
                        $elem.removeClass('x-active');
                    }
                    wishlistSelecteds();
                },

                error: function(data) {
                    console.log(data);
                    console.log("Ops, ocorreu um erro.");
                }

            });
        }

    });

};

function wishlistSelecteds() {
    $.ajax({
        type: 'GET',
        url: '/no-cache/profileSystem/getProfile',

        success: function(userInfoData) {
            var userEmail = userInfoData.Email;

            if (userInfoData.IsUserDefined == true) {

                if (userInfoData.IsUserDefined == true && userInfoData.FirstName != null) {

                    $.ajax({
                        headers: headers,
                        type: 'GET',
                        url: 'https://api.vtexcrm.com.br/'+wishlistStoreName+'/dataentities/CL/search?_where=email=' + userEmail +'&_fields=id',

                        success: function(data) {
                            if ($(data).length) {
                                var idUser = data[0].id;
                                documentClientId = data[0].id;

                                $.ajax({
                                    headers: headers,
                                    type: 'GET',
                                    url: 'https://api.vtexcrm.com.br/'+wishlistStoreName+'/dataentities/WL/search?_where=userId=' + idUser + '&_fields=id,productsList',

                                    success: function(lisData) {
                                        
                                        if ( $(lisData).length && lisData[0].productsList ) {
                                            var product_id = lisData[0].productsList.split(/,/g);

                                            if( product_id[0] ){

                                                for (var i = 0; i < product_id.length; i++) {
                                                    setWishedProducts(product_id[i]);
                                                };

                                                if ( isWishListPage ) {

                                                    for (var pos = 0; pos < product_id.length; pos++) {
                                                        var a = product_id[pos];
                                                        console.log(a);

                                                        $.ajax({
                                                            type: 'GET',
                                                            url: '/api/catalog_system/pub/products/search/?fq=productId:' + product_id[pos],

                                                            success: (function(p) {
                                                                return function(data) {
                                                                    var estoque = false;
                                                                    var skuItens = data[0].items;
                                                                    var Reference = data[0].productReference;
                                                                    var productName = data[0].productName;
                                                                    var imagem, imageURL, labelImg, productPrice,listPrice,parcelas; 
                                                                    var productLink = data[0].link;     
                                                                    console.log(data);

                                                                    // MONTANDO PRODUTO DISPONÍVEL COM IMAGEM DE LABEL
                                                                    skuItens.forEach(function(item){
                                                                        if( item.sellers[0].commertialOffer.AvailableQuantity ){
                                                                            imageURL = item.images[0].imageUrl.split("/ids/")[1].split("/")[0];
                                                                            imagem = "/arquivos/ids/"+imageURL+"-500-500.png"

                                                                            labelImg = item.images[0].imageUrl;
                                                                            productPrice = floatToCurrency(item.sellers[0].commertialOffer.Price);
                                                                            NumberInstallments = item.sellers[0].commertialOffer.Installments[2].NumberOfInstallments;
                                                                            InstallmentsValue = floatToCurrency(item.sellers[0].commertialOffer.Installments[2].Value);
                                                                            estoque = true;
                                                                            return false;
                                                                        }

                                                                    });
                                                                    
                                                                    if( estoque ){
                                                                        $('.x-wishlist-list ul').append(
                                                                            '<li data-document="' + p.id + '" class="x-wishlist-item" data-id="' + data[0].productId + '"> \
                                                                                <span class="x-wishlist-delete"></span> \
                                                                                <a href="' + productLink + '"> \
                                                                                    <img class="x-product__image" src="' + imagem + '" border="0" alt="' + productName + '"/> \
                                                                                    <div class="x-infos"> \
                                                                                        <h2 class="x-product__name">' + productName + '</h2> \
                                                                                        <div class="x-product__installments">\
                                                                                        <span class="x-product__installments__number">' + NumberInstallments + 'X</span> de  <span class="x-product__installments__value">' + InstallmentsValue + '</span> \
                                                                                        </div>\
                                                                                        <span class="x-product__price">' + productPrice + '</span> \
                                                                                    </div> \
                                                                                </a> \
                                                                            </li>'
                                                                        );
                                                                    }
                                                                    
                                                                }
                                                            })( lisData[0] ),

                                                            error: function(data) {
                                                                console.log(data);
                                                            }
                                                        });

                                                    };
                                                }

                                            } else{
                                                onWishListEmpty();
                                            }
                                        }
                                        else{
                                            onWishListEmpty();
                                        }

                                        $('body').addClass('x-active');
                                    },

                                    error: function(data) {
                                        console.log(data);
                                    }
                                });

                            };

                        },

                        error: function(data) {
                            console.log(data);
                        }

                    });
                };
            };
        },

        error: function(data) {
            console.log(data);
            console.log("Ops, ocorreu um erro.");
        }
    });

};

function wishlistSelectedsCookie() {
    if ($.cookie("wishlist") != undefined) {
        var wishlistCookie = $.cookie("wishlist").split(",");

        for (var i = 0; i < wishlistCookie.length; i++) {
            var product = wishlistCookie[i];
            setWishedProducts(product);
        };
    };
};

function setWishedProducts(productID){
    $('.prateleira ul li').each(function() {
        var id = $(this).find('.x-id').val();

        if (id == productID) {
            $(this).find('.x-wishlist-btn').addClass("x-active");
        }
    });
    
    $('.x-product-view__wistlist').each(function() {
        var id = skuJson_0.productId;

        if (id == productID) {
            $('.x-product-view__wistlist').addClass("x-active");
        }
    });
}

function deleteItemWishlist() {
    $('body').on('click', '.x-wishlist-delete', function(event) {
        var element = $(this).closest('li');
        var id_document = element.data("document");
        var id = element.data('id').toString();

        $.ajax({
            headers: headers,
            type: 'GET',
            url: 'https://api.vtexcrm.com.br/'+wishlistStoreName+'/dataentities/WL/search?_where=id=' + id_document + '&_fields=userId,productsList',

            success: function(data) {
                var list = data[0].productsList.split(/,/g);
                var index = list.indexOf(id);
                list.splice(index, 1);
                
                if( list.length ){
                    if( list[0] ){
                        list = list.join(',');
                    }else{
                        list = ',';
                    }
                }else{
                    list = ',';
                }

                var newList = {
                    "productsList": list
                };

                var urlWishlist = 'https://api.vtexcrm.com.br/'+wishlistStoreName+'/dataentities/WL/documents/'+id_document;

                $.ajax({
                    headers: headers,
                    data: JSON.stringify(newList),
                    type: 'PATCH',
                    url: urlWishlist,
                    success: function(data) {
                        $(element).slideUp(300, function(){
                            element.remove();
                        });
                        $.cookie("wishlist", "");
                    },

                    error: function(data) {
                        console.log(data);
                        console.log("Ops, ocorreu um erro.");
                    }

                });
            },

            error: function(data) {
                console.log(data);
            }
        });

        return false;

    });
};

function formSaveUserActions() {
    $('div.x-cadastro-user').on('click', '.x-close, .x-not',function() {
        $('div.x-cadastro-user').hide();
    });
};

function saveUserWishlist() {
    $('div.x-cadastro-user div.x-form form').on('submit', function() {
        var _this = $(this);
        $(this).find('input.x-next').val('adicionando...');

        var jsonSaveUser = {
            "email": $('#x-userEmail').val(),
            "firstName": $('#x-userName').val(),
            "lastName": $('#x-userLastName').val(),
            "document": $('#x-userDocument').val(),
            "homePhone": "+55" + $('#x-ddd-cel').val() + $('#x-number-cel').val()
        };

        var urlSaveUser = 'https://api.vtexcrm.com.br/'+wishlistStoreName+'/dataentities/CL/documents/';

        $.ajax({
            headers: headers,
            data: JSON.stringify(jsonSaveUser),
            type: 'PATCH',
            url: urlSaveUser,
            success: function(data) {
                $('#x-cadastro-user .x-form').html('<div class="x-sucesso">Cadastro feito com sucesso, escolha seus produtos.</div>');

                setTimeout(function() {
                    $('#x-cadastro-user').hide();
                }, 3000);

            },

            error: function(data) {
                _this.find('input.x-next').val('Ops! tente novamente');
            }
        });

        return false;
    });
};


$(document).ready(function(){
    wishlist();
    wishlistSelecteds();
    wishlistSelectedsCookie();
    formSaveUserActions();
    saveUserWishlist();
    deleteItemWishlist();
});