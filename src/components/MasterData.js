(function(APP, GLOBAL){
    // CHECK IF WISHLIST GLOBAL IS SET
    if( !APP ){
        GLOBAL.WISHLIST = {};
        APP = GLOBAL.WISHLIST;
        
        if( !APP._Util ){
            APP._Util = {};
        }
    }
    
    var MasterData = {
        getUserId: function(){
            APP._Util.Login.userIsLogged(function(data){
                console.log('-----------------');
                console.log(data);
            })
        },
        
        getProducts: function(){
           
        },
        
        saveProducts: function(){
           
        }
    }
    
    APP._Util.MasterData = MasterData;
    
})( window.WISHLIST, window);