var cam = new tracking.VideoCamera().hide().render().renderVideoCanvas();
var ctx = cam.canvas.context;

var img = new Image();
img.src = 'img/glasses.png';

// investigate on this
cam.set('audio', false);

cam.track({
    type: 'human',
    data: 'eye',
    onFound: function(track){
        for (var i = 0, len = track.length; i < len; i++) {
            if(track.length == 2){
                ctx.drawImage(img,
                                track[0].x - track[0].size, track[0].y + (track[0].size / 3),
                                    ((track[1].x + track[1].size) - track[0].x) + (track[1].size * 2), track[0].size);
                ctx.font = "bold 16px Arial";
                ctx.fillStyle = 'white';
                ctx.fillText('DEAL WITH IT', 30, 30);
            }
        }
    }
})
