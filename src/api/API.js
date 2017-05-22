(function(APP, GLOBAL){
    // CHECK IF vtexCustomWishlist GLOBAL IS SET
    if( !APP ){
        GLOBAL.vtexCustomWishlist = {};
        APP = GLOBAL.vtexCustomWishlist;
    }
    
    var Core = APP._Util.Core;
    var Data = APP._Util.Data;
    var Config = APP._Util.Config;
    
    /** This is a description of the foo function. */
    APP.add = function(id){
        Data.add.apply(Data, [id]);
        return this;
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