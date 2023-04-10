/*
todo:
literally every function is not done yet
*/

const BlockType = require('../../extension-support/block-type');
const ArgumentType = require('../../extension-support/argument-type');
const Cast = require('../../util/cast');
const Timer = require('./Timer');

/**
 * Class for Timers blocks
 * @constructor
 */
class JgTimersBlocks {
    constructor(runtime) {
        /**
         * The runtime instantiating this block package.
         * @type {Runtime}
         */
        this.runtime = runtime;
        this.timers = {};
    }

    // util

    _getTimersArray() {
        return Object.values(this.timers);
    }

    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo() {
        return {
            id: 'jgTimers',
            name: 'Multiple Timers',
            color1: '#0093FE',
            color2: '#1177FC',
            blocks: [
                {
                    opcode: 'createTimer',
                    text: 'create timer named [NAME]',
                    blockType: BlockType.COMMAND,
                    arguments: {
                        NAME: { type: ArgumentType.STRING, defaultValue: "timer" }
                    }
                },
                {
                    opcode: 'deleteTimer',
                    text: 'delete timer named [NAME]',
                    blockType: BlockType.COMMAND,
                    arguments: {
                        NAME: { type: ArgumentType.STRING, defaultValue: "timer" }
                    }
                },

                { text: "Values", blockType: BlockType.LABEL, },

                {
                    opcode: 'getTimer',
                    text: 'get timer named [NAME]',
                    blockType: BlockType.REPORTER,
                    disableMonitor: false,
                    arguments: {
                        NAME: { type: ArgumentType.STRING, defaultValue: "timer" }
                    }
                },
                {
                    opcode: 'existsTimer',
                    text: 'timer named [NAME] exists?',
                    blockType: BlockType.BOOLEAN,
                    disableMonitor: false,
                    arguments: {
                        NAME: { type: ArgumentType.STRING, defaultValue: "timer" }
                    }
                },

                { text: "Operations", blockType: BlockType.LABEL, },

                {
                    opcode: 'startTimer',
                    text: 'start timer [NAME]',
                    blockType: BlockType.COMMAND,
                    arguments: {
                        NAME: { type: ArgumentType.STRING, defaultValue: "timer" }
                    }
                },
                {
                    opcode: 'pauseTimer',
                    text: 'pause timer [NAME]',
                    blockType: BlockType.COMMAND,
                    arguments: {
                        NAME: { type: ArgumentType.STRING, defaultValue: "timer" }
                    }
                },
                {
                    opcode: 'stopTimer',
                    text: 'stop timer [NAME]',
                    blockType: BlockType.COMMAND,
                    arguments: {
                        NAME: { type: ArgumentType.STRING, defaultValue: "timer" }
                    }
                },
                {
                    opcode: 'addTimer',
                    text: 'add [SECONDS] seconds to timer [NAME]',
                    blockType: BlockType.COMMAND,
                    arguments: {
                        SECONDS: { type: ArgumentType.NUMBER, defaultValue: 5 },
                        NAME: { type: ArgumentType.STRING, defaultValue: "timer" }
                    }
                },
            ]
        };
    }

    // blocks

    createTimer(args) {
        const timer = this.timers[args.NAME];
        if (timer) return;
        this.timers[args.NAME] = {
            name: Cast.toString(args.NAME),
            instance: new Timer()
        };
    }
    deleteTimer(args) {
        const timer = this.timers[args.NAME];
        if (!timer) return;
        delete this.timers[args.NAME];
    }

    getTimer(args) {
        const timer = this.timers[args.NAME];
        if (!timer) return "";
        const time = timer.instance.getTime(true);
        return Cast.toNumber(time);
    }
    existsTimer(args) {
        const timer = this.timers[args.NAME];
        if (!timer) return false;
        return true;
    }

    startTimer(args) {
        const timer = this.timers[args.NAME];
        if (!timer) return;
        timer.instance.start();
    }
    pauseTimer(args) {
        const timer = this.timers[args.NAME];
        if (!timer) return;
        timer.instance.pause();
    }
    stopTimer(args) {
        const timer = this.timers[args.NAME];
        if (!timer) return;
        timer.instance.stop();
    }

    addTimer(args) {
        const timer = this.timers[args.NAME];
        if (!timer) return;
        const seconds = Cast.toNumber(args.SECONDS);
        timer.instance.add(seconds * 1000);
    }
}

module.exports = JgTimersBlocks;
