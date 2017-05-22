function it(description, callback){
    if( typeof callback === "function" ){
        if( callback() ){
            console.debug('test succeed: '+description);
        }else{
            console.assert(false, 'Fail: '+ description);
        }
    }
}

it('should add an id to storage', function(){
    vtexCustomWishlist.add('15');
    var result = vtexCustomWishlist.getIds();
    if( result.indexOf('15') >= 0 ){
        return true;
    }
});

it('should return all ids into the storage', function(){
    var result = vtexCustomWishlist.getIds();
    if( Array.isArray(result) ){
        return true;
    }
});

it('should remove an id to storage', function(){
    vtexCustomWishlist.delete('15');
    var result = vtexCustomWishlist.getIds();
    if( result.indexOf('15') === -1 ){
        return true;
    }
});

it('should clean all storage', function(){
    vtexCustomWishlist.clean();
    var result = vtexCustomWishlist.getIds();
    if( result.length === 0 ){
        return true;
    }
});

it('should not allow 2 equal ids in the store', function(){
    vtexCustomWishlist.add('15').add('15');
    var result = vtexCustomWishlist.getIds();
    var count = 0;
    
    result.forEach(function(item){
        if( item === '15' ){
            count++;
        }
    });
    
    if( count === 1 ){
        return true;
    }
});

it('should config properly the app', function(){
    vtexCustomWishlist.config({
        test: 'test'
    });
    
    var result = vtexCustomWishlist.getConfig();
    
    if( result.test === 'test' ){
        return true;
    }
});


vtexCustomWishlist.clean();
for(var i = 0; i < 5; i++){
    (function(i){
        setTimeout(function(){
            vtexCustomWishlist.add(i);
            if( i === 4 ){
                it('should save various products in a row', function(){
                    return vtexCustomWishlist.getIds().length === 5;
                })
            }
        }, 400 * i);
    })(i);
}
