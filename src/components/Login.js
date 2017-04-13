(function(APP, GLOBAL){
    // CHECK IF WISHLIST GLOBAL IS SET
    if( !APP ){
        GLOBAL.WISHLIST = {};
        APP = GLOBAL.WISHLIST;
        
        if( !APP._Util ){
            APP._Util = {};
        }
    }
    
    var Login = {
        // RETURNS LOGGED USER
        userIsLogged: function(callback){
            $.ajax('/no-cache/profileSystem/getProfile')
            .fail(function(error){
                console.log(error);
                console.log('Não foi possível acessar a API de Profile da vtex');
            })
            .success(function(user){
                if( user ){
                    // CALL VTEX LOGIN POP UP
                    if( !user.IsUserDefined ){
                        try{
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
                    else if( user.IsUserDefined &&  !data.FirstName ){
                        APP._Util.Config.completeRegistration();
                    }else{
                        if( typeof callback === 'function' ){
                            callback.call(user);
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
    
    APP._Util.Login = Login;
    
})( window.WISHLIST, window);