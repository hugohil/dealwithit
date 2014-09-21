window.onload = function() {
    var video = document.getElementById('video');
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    var img = new Image();
    img.src = '../img/glasses.png';

    var tracker = new tracking.ObjectTracker('face');
    tracker.setInitialScale(4);
    tracker.setStepSize(2);
    tracker.setEdgesDensity(0.1);

    tracking.track('#video', tracker, { camera: true });

    tracker.on('track', function(event) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        var ratio = img.width / img.height;

        event.data.forEach(function(rect) {
            if(event.data.length == 1){ // make sure just one image is drawn
                ctx.drawImage(img, rect.x, rect.y + (rect.height / 3), rect.width, rect.width / ratio );
                ctx.font = "bold 46px Arial";
                ctx.strokeStyle = '#000';
                ctx.lineWidth = 5;
                ctx.strokeText('DEAL WITH IT', 50, 50);
                ctx.fillStyle = '#FFF';
                ctx.fillText('DEAL WITH IT', 50, 50);
            }
        });
    });
};