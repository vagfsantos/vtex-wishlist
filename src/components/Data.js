(function(APP, GLOBAL){
    // cheking if the namespace is already set
    if( !APP ){
        GLOBAL.vtexCustomWishlist = {};
        APP = GLOBAL.vtexCustomWishlist;
        
        if( !APP._Util ){
            APP._Util = {};
        }
    }
    
    // private variable for caching the product id values
    var _storedValues = [];
    
    var Data = {
        // it adds a product id in the stored array
        // triggers the 'added' event in success case
        add: function(id){
            if( _storedValues.indexOf(id) === -1 ){
                _storedValues.push(id);
                Event.on('added');
                console.log('o id: ' +id+ ' foi adicionado a store');
            }else{
                console.log('o id: ' +id+ ' já estava adicionado na store');
            }
        },
        
        // it deletes a product id in the stored array
        delete: function(id){
            var index = _storedValues.indexOf(id);
            if( index !== -1 ){
                _storedValues.splice(index, 1);
                console.log('o id: '+id+ ' foi deletado da store');
                return;
            }
            
            console.log('o id: ' +id+ ' não foi encontrado na store');
        },
        
        // it returns the current ids
        getData: function(){
            return _storedValues;
        },
        
        // it cleans the entire id
        cleanData: function(){
            _storedValues = [];
        }
    };
    
    /*
    Event Object
    It Handles some data state events
    */
    
    var Event = {
        types: {
            config: {
                lastInteration: 0,
                delay: 500
            },
            
            // it is triggered, when a product have been just added into the store
            // it gets a delay before sending for the actual saving
            added: function(){
                var _this = this;
                var MasterData = APP._Util.MasterData;
                
                window.setTimeout(function(){
                    var current = new Date().getTime();
                    var diff = current - this.lastInteration;
                    if( diff > _this.config.delay - 100 ){
                        MasterData.saveProducts();
                        console.log(_storedValues);
                    }
                }, _this.config.delay);
                
                lastInteration = new Date().getTime();
            }
        },
        
        // the interface for manipulating the events
        on: function(eventName){
            if( this.types[eventName] ){
                this.types[eventName]();
            }
        }
    }
    
    // apply the object into the global namespace
    APP._Util.Data = Data;
    
})( window.vtexCustomWishlist, window);