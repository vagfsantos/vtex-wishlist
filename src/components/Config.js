(function(APP, GLOBAL){
    // CHECK IF vtexCustomWishlist GLOBAL IS SET
    if( !APP ){
        GLOBAL.vtexCustomWishlist = {};
        APP = GLOBAL.vtexCustomWishlist;
        
        if( !APP._Util ){
            APP._Util = {};
        }
    }
    
    // GLOBAL vtexCustomWishlist CONFIGURATION
    var _defaultConfig = {
        headers: {
            'Accept': 'application/vnd.vtex.ds.v10+json',
            'Content-Type': 'application/json'
        },
        
        storeName: null,
        dbName: null,
        dbAlias: null,
        columnId: null,
        columnUser: null,
        onIncompleteRegistration: null,
        
        userEmail: null,
        urlSearchClient: function(){
            return 'https://api.vtexcrm.com.br/'+this.storeName+'/dataentities/CL/search?_where=email=' + this.userEmail +'&_fields=id'
        }
    }
    
    var Config = {
        // SET AND SUBSCRIBE THE DEFAULT CONFIGURATION
        set: function(obj){
            for( var i in obj ){
                if( obj.hasOwnProperty(i) ){
                    _defaultConfig[i] = obj[i]
                }
            }
        },
        
        // RETURNS CONFIGURATION
        get: function(){
            return _defaultConfig;
        },
        
        completeRegistration: function(){
            if( typeof _defaultConfig.onIncompleteRegistration === 'function' ){
                _defaultConfig.onIncompleteRegistration();
            }else{
                console.log('o parâmetro "onIncompleteRegistration" não foi passado corretamente, certifique-se de ter passado uma função');
            }
        }
    }
    
    APP._Util.Config = Config;
    
})( window.vtexCustomWishlist, window);