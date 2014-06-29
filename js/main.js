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
            // var rect = track[i];
            // ctx.strokeStyle = "rgb(0,255,0)";
            // ctx.strokeRect(rect.x, rect.y, rect.size, rect.size);
            if(track.length == 2){
                ctx.drawImage(img,
                                track[0].x - track[0].size, track[0].y + (track[0].size / 2),
                                    ((track[1].x + track[1].size) - track[0].x) + (track[1].size * 2), track[0].size);

                // var picture = tracking.one('#pic');
                // picture.width = cam.get('width');
                // picture.height = cam.get('height');
                // picture.src = cam.toDataURL();
            }
        }
    }
})