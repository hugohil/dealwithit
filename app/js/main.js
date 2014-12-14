window.onload = function() {

    var video = document.getElementById('video');
    var img = document.getElementById('img');
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var mode = null;
    var socket = io.connect('http://127.0.0.1:1337');

    if (navigator.getUserMedia)
        navigator.getUserMedia({video: true}, handleVideo, videoError);

    function handleVideo(stream){
        video.src = window.URL.createObjectURL(stream);
    }

    function videoError(){
        console.log('No webcam found ... sorry :(');
    }

    var glasses = new Image();
    glasses.src = 'img/glasses.png';

    var tracker = new tracking.ObjectTracker('face');
    tracker.setInitialScale(4);
    tracker.setStepSize(2);
    tracker.setEdgesDensity(0.1);

    window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

    tracker.on('track', function(event) {
        event.data.forEach(function(rect) {
            if(event.data.length == 1){ // make sure just one image is drawn

                ctx.drawImage(glasses, rect.x, rect.y + (rect.height / 3), rect.width, rect.width / (glasses.width / glasses.height));

                ctx.font = "bold 46px Arial";
                ctx.strokeStyle = '#000';
                ctx.lineWidth = 5;
                ctx.strokeText('DEAL WITH IT', 50, 50);
                ctx.fillStyle = '#FFF';
                ctx.fillText('DEAL WITH IT', 50, 50);
            }
            // img.src = canvas.toDataURL('image/png');
        });

    });

    function play(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        if(mode == 'dealing'){
            tracking.track('#canvas', tracker);
        }

        requestAnimationFrame(play);
    }
    requestAnimationFrame(play);

    $('body').keyup(function (event){
        if(event.keyCode == 68){
            mode = (mode == 'dealing') ? null : 'dealing';
        }
    })

    socket.on('connect', function(){
        $('body').keyup(function (event){
            if(event.keyCode == 32){
                socket.emit('save-img', canvas.toDataURL('image/png'));
                event.preventDefault();
            }
        })
    });

};