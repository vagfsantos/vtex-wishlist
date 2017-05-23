(function(APP, GLOBAL){
    // cheking if the namespace is already set
    if( !APP ){
        GLOBAL.vtexCustomWishlist = {};
        APP = GLOBAL.vtexCustomWishlist;
        
        if( !APP._Util ){
            APP._Util = {};
        }
    }
    
    /*
    Default Configuration Variable
    */
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
    
    /*
    Config Controller API
    Util object interface, resposable for manipulating the defaults settings
    */
    var Config = {
        // set and subscribe the default configuration
        set: function(obj){
            for( var i in obj ){
                if( obj.hasOwnProperty(i) ){
                    _defaultConfig[i] = obj[i]
                }
            }
        },
        
        // returns the current configuration
        get: function(){
            return _defaultConfig;
        },
        
        // handles activities, when the user is not logged in
        completeRegistration: function(){
            if( _defaultConfig.onIncompleteRegistration ){
                if( _defaultConfig.onIncompleteRegistration.call() ){
                    _defaultConfig.onIncompleteRegistration();
                    return;
                }
            }
            
            throw new Error('The parameter "onIncompleteRegistration" was not set correctly, please pass a function as parameter');
        }
    }
    
    // apply the object into the global namespace
    APP._Util.Config = Config;
    
})( window.vtexCustomWishlist, window);