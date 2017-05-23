(function(APP, GLOBAL){
    // cheking if the namespace is already set
    if( !APP ){
        GLOBAL.vtexCustomWishlist = {};
        APP = GLOBAL.vtexCustomWishlist;
    }
    
    // Namespace for Utilities classes
    var Core = APP._Util.Core;
    var Data = APP._Util.Data;
    var Config = APP._Util.Config;
    
    /*
    
    Client API
    Public Interface
    
    */
    APP.add = function(id){
        return Data.add.apply(Data, [id]);
    }
    
    APP.delete = function(id){
        Data.delete.apply(Data, [id]);
        return this;
    }
    
    APP.getIds = function(){
        return Data.getData.apply(Data);
    }
    
    APP.clean = function(){
        return Data.cleanData.apply(Data);
    }
    
    APP.getShelfs = function(){
        
    }
    
    APP.config = function(obj){
       Config.set.apply(Config, [obj]);
    },
        
    APP.getConfig = function(){
        return Config.get.apply(Config, []);
    }
    
})( window.vtexCustomWishlist, window);