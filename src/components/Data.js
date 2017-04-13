(function(APP, GLOBAL){
    // CHECK IF WISHLIST GLOBAL IS SET
    if( !APP ){
        GLOBAL.WISHLIST = {};
        APP = GLOBAL.WISHLIST;
        
        if( !APP._Util ){
            APP._Util = {};
        }
    }
    
    // PRIVATE VALUES FOR PRODUCT IDS CACHED
    var _storedValues = [];
    
    var Data = {
        // ADD A PRODUCT ID TO STORED ARRAY
        add: function(id){
            if( _storedValues.indexOf(id) === -1 ){
                _storedValues.push(id);
                Event.on('added');
                console.log('o id: ' +id+ ' foi adicionado a store');
            }else{
                console.log('o id: ' +id+ ' já estava adicionado na store');
            }
        },
        
        // DELETE A PRODUCT ID TO STORED ARRAY
        delete: function(id){
            var index = _storedValues.indexOf(id);
            if( index !== -1 ){
                _storedValues.splice(index, 1);
                console.log('o id: '+id+ ' foi deletado da store');
                return;
            }
            
            console.log('o id: ' +id+ ' não foi encontrado na store');
        },
        
        // RETURN DATA STORAGED
        getData: function(){
            return _storedValues;
        },
        
        cleanData: function(){
            _storedValues = [];
        }
    };
    
    var Event = {
        types: {
            config: {
                lastInteration: 0,
                delay: 500
            },
            
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
        
        on: function(eventName){
            if( this.types[eventName] ){
                this.types[eventName]();
            }
        }
    }
    
    APP._Util.Data = Data;
    
})( window.WISHLIST, window);