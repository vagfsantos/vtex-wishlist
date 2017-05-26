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
    
    //createPromisse
    var createPromisse = APP._Util.Helper.createPromisse;
    var event = APP._Util.Helper.eventTrigger;
    
    var Data = {
        // it adds a product id in the stored array
        // triggers the 'added' event in success case
        add: function(id){
            var promise = createPromisse();
            
            if( _storedValues.indexOf(id) === -1 ){
                _storedValues.push(id);
                event.on('added', );
                console.log('### wishlist: o id: ' +id+ ' foi adicionado a store');
            }else{
                console.log('### wishlist: o id: ' +id+ ' já estava adicionado na store');
            }
            
            return promise;
        },
        
        // it deletes a product id in the stored array
        delete: function(id){
            var promise = createPromisse();
            
            var index = _storedValues.indexOf(id);
            if( index !== -1 ){
                _storedValues.splice(index, 1);
                console.log('### wishlist: o id: '+id+ ' foi deletado da store');
                return;
            }
            
            console.log('### wishlist: o id: ' +id+ ' não foi encontrado na store');
            return promise;
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
    
    
    
    // apply the object into the global namespace
    APP._Util.Data = Data;
    
})( window.vtexCustomWishlist, window);