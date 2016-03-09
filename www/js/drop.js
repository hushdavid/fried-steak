function Drop() {
    this.x = Math.floor(Math.random() * (400 - 10));
    this.y = Math.floor(Math.random() * (800 - 10));
    this.speed = 1;
};

Drop.prototype.draw = function(context) {
    //context.arc(this.x, window.innerHeight - 200, 20, 0, 2 * Math.PI);
    context.fillRect(this.x, this.y, 10, 10);
};

Drop.prototype.update = function() {
    this.y -= this.speed;
};
