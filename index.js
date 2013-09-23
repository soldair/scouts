var http = require('http')
, files = require('./lib/files')
, path = require('path')
, mime = require('mime')
, port = 8000;

var server = http.createServer(function(req,res){
  // i serve static files.
  if(req.url.indexOf('/static/') === 0) {
    var file = req.url.replace(/\.\./g,'');
    files(path.join(__dirname,file),function(err,data){
      res.setHeader('content-type',mime.lookup(file));
      if(err) {
        if(err.code === 'ENOENT'){
          res.writeHead(404)
        } else {
          res.writeHead(500);
          console.log('500',(new Date())+"",'static file error',err);
        }
      }
      res.end(data);
    })
  } else if(req.url === '/' || req.url == '/index.html') {
    files(path.join(__dirname,'/static/index.html'),function(err,data){
      res.setHeader("content-type","text/html")
      res.end(data);
    }) 
  } else if(req.url.indexOf('/api/') === 0){
    res.end('serve api')
  } else {
    res.writeHead(404);
    res.end('oh no!');
  }
}).listen(port);

