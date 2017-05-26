(function(APP, GLOBAL){
    // cheking if the namespace is already set
    if( !APP ){
        GLOBAL.vtexCustomWishlist = {};
        APP = GLOBAL.vtexCustomWishlist;

        if( !APP._Util ){
            APP._Util = {};
        }
    }

    var MasterData = {
        getUserId: function(){
            var wishlistStoreName = APP._Util.Config.get().storeName;
            var userEmail = APP._Util.Config.get().userEmail;
            
            APP._Util.Login.userIsLogged(function(data){
                console.log('-----------------');
                
                $.ajax({
                    headers: headers,
                    type: 'GET',
                    url: 'https://api.vtexcrm.com.br/'+wishlistStoreName+'/dataentities/CL/search?_where=email=' + userEmail +'&_fields=id'
                })
                .done(function(data){
                    console.log(data);
                });
                
            })
        },

        getProducts: function(){

        },

        saveProducts: function(){
            this.getUserId();
        }
    }

    APP._Util.MasterData = MasterData;

})( window.vtexCustomWishlist, window);