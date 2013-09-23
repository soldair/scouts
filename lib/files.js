var fs = require('fs')
var cache = {};

module.exports = function(file,cb){
  if(cache[file]){
    if(Array.isArray(cache[file])) {
      cache[file].push(cb);
    } else {
      cb(false,cache[file]);
    }
    return;
  }

  cache[file] = [cb];

  fs.readFile(file,function(err,buf){
    var cbs = cache[file];
    cache[file] = buf; 
    while(cbs.length) cbs.shift()(err,buf);
  });
}

module.exports.flush = function(){
  Object.keys(cache).forEach(function(k){
    if(Buffer.isBuffer(cache[k])){
      delete cache[k];
    }
  })
}
