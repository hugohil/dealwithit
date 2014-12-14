var io  = require('socket.io').listen(1337),
    dl  = require('delivery'),
    fs  = require('fs');

io.sockets.on('connection', function(socket){
  socket.on('save-img', function (img){
      var png = img.replace(/^data:image\/png;base64,/, "");
      var timestamp = new Date().getTime();
      var file = process.env.PWD + '/snaps/' + timestamp + ".png";
     require("fs").writeFile(file, png, 'base64', function (err) {
      if(err){
        throw err;
      } else {
        console.log('File saved.');
      }
    });
  })

  // var delivery = dl.listen(socket);
  // delivery.on('receive.success',function(file){

  //   fs.writeFile(file.name,file.buffer, function(err){
  //     if(err){
  //       console.log('File could not be saved.');
  //     }else{
  //       console.log('File saved.');
  //     };
  //   });
  // });
});