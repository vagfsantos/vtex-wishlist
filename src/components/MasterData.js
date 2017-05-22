(function(APP, GLOBAL){
    // CHECK IF vtexCustomWishlist GLOBAL IS SET
    if( !APP ){
        GLOBAL.vtexCustomWishlist = {};
        APP = GLOBAL.vtexCustomWishlist;
        
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
    
})( window.vtexCustomWishlist, window);