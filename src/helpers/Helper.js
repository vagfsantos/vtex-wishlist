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
    Helpers
    Util object interface, resposable for serve helper functions for the components
    */
    var Helper = {
        // create a simple promisse template
        createPromisse: function(){
            return {
                success: function(callback){
                    if( callback ){
                        this.success = callback;
                    }
                    return this;
                },

                fail: function(callback){
                    if( callback ){
                        this.fail = callback;
                    }
                    return this;
                }
            };
        },
        
        // It Handles some data state events
        eventTrigger: {
            _types: {
                config: {
                    lastInteration: 0,
                    delay: 500
                },

                // it is triggered, when a product have been just added into the store
                // it gets a delay before sending for the actual saving
                added: function(callback_obj){
                    var _this = this;
                    var MasterData = APP._Util.MasterData;

                    window.setTimeout(function(){
                        var current = new Date().getTime();
                        var diff = current - this.lastInteration;
                        if( diff > _this.config.delay - 100 ){
                            MasterData.saveProducts(callback_obj);
                        }
                    }, _this.config.delay);

                    lastInteration = new Date().getTime();
                }
            },

            // the interface for manipulating the events
            on: function(eventName, handler){
                if( this._types[eventName] ){
                    this._types[eventName].call(this._types, handler);
                }
            }
        }
    }
    
    // apply the object into the global namespace
    APP._Util.Helper = Helper;
    
})( window.vtexCustomWishlist, window);