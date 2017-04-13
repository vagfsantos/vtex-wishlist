(function(APP, GLOBAL){
    // CHECK IF WISHLIST GLOBAL IS SET
    
    if( !APP ){
        GLOBAL.WISHLIST = {};
        APP = GLOBAL.WISHLIST;
    }
    
    var _userIsLogged = APP._Util.Login.userIsLogged;
    var _config = APP._Util.Config.get();
    
    
    var Core = {
        save: function(){
            
        }
    };
    
    APP._Util.Core = Core;
    
})( window.WISHLIST, window );