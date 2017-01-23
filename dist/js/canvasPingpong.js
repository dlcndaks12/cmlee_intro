function backingScale(context) {
    if ("devicePixelRatio" in window) {
        if (window.devicePixelRatio > 1) {
            return window.devicePixelRatio;
        }
    }
    return 1;
}

window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

/* 원 객체 */
var Circle = function(ctx, x, y, r) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.r = r;
    this.flagX = 1;
    this.flagY = 1;
    this.vel = 400;
};

Circle.prototype = {
    update: function(dt) {
        if (this.y + this.r > canvas.height) this.flagY = -1;
        if (this.y - this.r < 0) this.flagY = 1;
        if (this.x + this.r > canvas.width) this.flagX = -1;
        if (this.x - this.r < 0) this.flagX = 1;
        var newX = this.vel * dt * this.flagX;
        var newY = this.vel * dt * this.flagY;
        this.x += newX;
        this.y += newY;
    },
    draw: function() {
        this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
        this.ctx.closePath();
        this.ctx.fillStyle = "#8ED6FF";
        this.ctx.fill();
    }
};

/* /원 객체 */
var previousTime;

var circle, circle1;

var canvas = document.getElementById("myCanvas");

var ctx = canvas.getContext("2d");

var scaleFactor = backingScale(ctx);

canvas.width = window.innerWidth * scaleFactor;

canvas.height = window.innerHeight * scaleFactor;

function init() {
    previousTime = +new Date();
    circle = new Circle(ctx, 50, 50, 20);
}

function loop() {
    var curTime = new Date();
    var dt = (curTime - previousTime) / 1e3;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.ctx.beginPath();
    circle.update(dt);
    circle.draw();
    /* circle1.update(dt);
     circle1.draw(); */
    previousTime = curTime;
    requestAnimationFrame(loop);
}

init();

loop();