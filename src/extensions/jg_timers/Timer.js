class Timer {
    constructor (startingTime, pausingTime) {
        this.startTime = startingTime ? startingTime : Date.now();
        if (pausingTime) {
            this.pauseTime = pausingTime;
        }
        this.stopped = true;
    }

    start () {
        if (this.stopped) {
            this.startTime = Date.now();
        } else {
            // we are unpausing
            this.startTime += Date.now() - this.pauseTime;
        }
        this.pauseTime = null;
        this.stopped = false;
    }
    pause () {
        const paused = (this.pauseTime !== null);
        if (paused) return;
        this.pauseTime = Date.now();
    }
    stop () {
        this.stopped = true;
        this.pauseTime = Date.now();
    }

    add (seconds) {
        this.startTime -= seconds;
    }

    getTime (inSeconds) {
        const paused = (this.pauseTime !== null);

        const pausedTime = Number(this.pauseTime) - this.startTime;
        const normalTime = Date.now() - this.startTime;

        const divisor = inSeconds ? 1000 : 1;

        return (paused ? pausedTime : normalTime) / divisor;
    }
}

module.exports = Timer;
