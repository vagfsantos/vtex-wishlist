(function(APP, GLOBAL){
    // cheking if the namespace is already set
    if( !APP ){
        GLOBAL.vtexCustomWishlist = {};
        APP = GLOBAL.vtexCustomWishlist;
    }
    
    var _userIsLogged = APP._Util.Login.userIsLogged;
    var _config = APP._Util.Config.get();
    
    
    var Core = {
        save: function(){
            
        }
    };
    
    APP._Util.Core = Core;
    
})( window.vtexCustomWishlist, window );