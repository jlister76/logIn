module.exports = function(Employee) {
  var os = require('os'),
      fs = require('fs'),
      path = require('path');

  Employee.os = function (cb){
    var platform = os.platform();
    var osType = os.type();
    var osRelease = os.release();
    var hostname = os.hostname();
    var arch = os.arch();
    var networkxfaces = os.networkInterfaces();

    cb(null,{plat: platform, type: osType, release: osRelease, host: hostname, arc: arch, iface: networkxfaces});
  };

  Employee.remoteMethod('os',
    {
      http: {path: '/os', verb:'get'},
      returns: {arg: 'OSystem', type: 'object'}
    });

  /*function getDirectories(){
    var p = 'updates';
   fs.readdir(p, function(err,files){
     if (err) {throw err;}
     files.map(function (file) {
       return path.join(p, file);
     }).forEach(function (file) {
       console.log(file, path.extname(file));
     });
     return files;
   })
  }
  Employee.dir = function (cb) {
      var dir = getDirectories();
    //code goes here
    console.error(dir);
    cb(null, dir);
  };

  Employee.remoteMethod('dir',
    {
      http: {path: '/dir', verb:'get'},
      returns: {arg: 'Dirs', type: 'Array'}
    });*/

};
