var level = require('level');
var sublevel = require('level-sublevel');
var db = sublevel(level(__dirname+'/../db',{keyEncoding:'json',valueEncoding:'json'}));
module.exports = function(){
  return db;
}


