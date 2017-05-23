(function(APP, GLOBAL){
    // cheking if the namespace is already set
    if( !APP ){
        GLOBAL.vtexCustomWishlist = {};
        APP = GLOBAL.vtexCustomWishlist;
        
        if( !APP._Util ){
            APP._Util = {};
        }
    }
    
    var Login = {
        // it checks if the user is logged in and handle both cases
        // case they are logged in, a callback is called receiving the user data as argument
        // otherwise the 'completeRegistration' function is called to handle it
        userIsLogged: function(callback){
            $.ajax('/no-cache/profileSystem/getProfile')
            .fail(function(error){
                console.log(error);
                console.log('Não foi possível acessar a API de Profile da vtex');
            })
            .success(function(user){
                if( user ){
                    // it calls the vtex login pop up
                    if( !user.IsUserDefined ){
                        try{
                            // vtex method
                            vtexid.start({
                                returnUrl: '',
                                userEmail: '',
                                locale: 'pt-BR',
                                forceReload: false
                            });
                        }catch(e){
                            console.log(e);
                            console.log('Erro ao tentar abrir o PopUp de login, certifique-se de que o controle <vtex.cmc:welcomeMessage/> esteja na página');
                        }
                    }
                    else if( user.IsUserDefined &&  !user.FirstName ){
                        APP._Util.Config.completeRegistration();
                    }else{
                        if( callback.call ){
                            callback(user);
                        }
                    }
                }else{
                    console.log('Resposta da API getProfile não definida');
                }
            })
            .done(function(){
                console.log('Consulta na API de profile finalizada');
            });
        }
    }
    
    // apply the object into the global namespace
    APP._Util.Login = Login;
    
})( window.vtexCustomWishlist, window);