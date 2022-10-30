const formatMessage = require('format-message');
const BlockType = require('../../extension-support/block-type');
const ArgumentType = require('../../extension-support/argument-type');
// const Cast = require('../../util/cast');

/**
 * Class for Prism blocks
 * @constructor
 */
class JgPrismBlocks {
    constructor(runtime) {
        /**
         * The runtime instantiating this block package.
         * @type {Runtime}
         */
        this.runtime = runtime;
        this.audioPlayer = new Audio();
    }

    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo() {
        return {
            id: 'jgPrism',
            name: 'Prism',
            color1: '#BC7FFF',
            color2: '#AD66FF',
            blocks: [
                {
                    opcode: 'playAudioFromUrl',
                    text: formatMessage({
                        id: 'jgPrism.blocks.playAudioFromUrl',
                        default: 'play audio from [URL]',
                        description: 'Plays sound from a URL.'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        URL: {
                            type: ArgumentType.STRING,
                            defaultValue: 'https://synthesis-service.scratch.mit.edu/synth?locale=en-US&gender=female&text=hello'
                        }
                    }
                },
                {
                    opcode: 'setAudioToLooping',
                    text: formatMessage({
                        id: 'jgPrism.blocks.setAudioToLooping',
                        default: 'set audio to loop',
                        description: 'Sets the audio to be looping.'
                    }),
                    blockType: BlockType.COMMAND
                },
                {
                    opcode: 'setAudioToNotLooping',
                    text: formatMessage({
                        id: 'jgPrism.blocks.setAudioToNotLooping',
                        default: 'set audio to not loop',
                        description: 'Sets the audio to not be looping.'
                    }),
                    blockType: BlockType.COMMAND
                },
                {
                    opcode: 'pauseAudio',
                    text: formatMessage({
                        id: 'jgPrism.blocks.pauseAudio',
                        default: 'pause audio',
                        description: 'Pauses the audio player.'
                    }),
                    blockType: BlockType.COMMAND
                },
                {
                    opcode: 'playAudio',
                    text: formatMessage({
                        id: 'jgPrism.blocks.playAudio',
                        default: 'resume audio',
                        description: 'Resumes the audio player.'
                    }),
                    blockType: BlockType.COMMAND
                },
                {
                    opcode: 'setAudioPlaybackSpeed',
                    text: formatMessage({
                        id: 'jgPrism.blocks.setAudioPlaybackSpeed',
                        default: 'set audio speed to [SPEED]%',
                        description: 'Sets the speed of the audio player.'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        SPEED: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 100
                        }
                    }
                },
                {
                    opcode: 'getAudioPlaybackSpeed',
                    text: formatMessage({
                        id: 'jgRuntime.blocks.getAudioPlaybackSpeed',
                        default: 'audio speed',
                        description: 'Block that returns the playback speed of the audio player.'
                    }),
                    disableMonitor: false,
                    blockType: BlockType.REPORTER
                },
                {
                    opcode: 'setAudioPosition',
                    text: formatMessage({
                        id: 'jgPrism.blocks.setAudioPosition',
                        default: 'set audio position to [POSITION] seconds',
                        description: 'Sets the position of the current audio in the audio player.'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        POSITION: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 5
                        }
                    }
                },
                {
                    opcode: 'getAudioPosition',
                    text: formatMessage({
                        id: 'jgRuntime.blocks.getAudioPosition',
                        default: 'audio position',
                        description: 'Block that returns the position of the audio player in the currently playing audio.'
                    }),
                    disableMonitor: false,
                    blockType: BlockType.REPORTER
                },
                {
                    opcode: 'setAudioVolume',
                    text: formatMessage({
                        id: 'jgPrism.blocks.setAudioVolume',
                        default: 'set audio volume to [VOLUME]%',
                        description: 'Sets the volume of the current audio in the audio player.'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        VOLUME: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 100
                        }
                    }
                },
                {
                    opcode: 'getAudioVolume',
                    text: formatMessage({
                        id: 'jgRuntime.blocks.getAudioVolume',
                        default: 'audio volume',
                        description: 'Block that returns the volume of the audio player.'
                    }),
                    disableMonitor: false,
                    blockType: BlockType.REPORTER
                }
            ]
        };
    }
    playAudioFromUrl(args) {
        this.audioPlayer.pause();
        this.audioPlayer.src = "https://api.allorigins.win/raw?url=" + encodeURIComponent(String(args.URL));
        this.audioPlayer.currentTime = 0;
        this.audioPlayer.play();
    }
    setAudioToLooping() {
        this.audioPlayer.loop = true;
    }
    setAudioToNotLooping() {
        this.audioPlayer.loop = false;
    }
    pauseAudio() {
        this.audioPlayer.pause();
    }
    playAudio() {
        this.audioPlayer.play();
    }
    setAudioPlaybackSpeed(args) {
        this.audioPlayer.playbackRate = (isNaN(Number(args.SPEED)) ? 100 : Number(args.SPEED)) / 100;
    }
    getAudioPlaybackSpeed() {
        return this.audioPlayer.playbackRate * 100;
    }
    setAudioPosition(args) {
        this.audioPlayer.currentTime = isNaN(Number(args.POSITION)) ? 0 : Number(args.POSITION);
    }
    getAudioPosition() {
        return this.audioPlayer.currentTime;
    }
    setAudioVolume(args) {
        this.audioPlayer.volume = (isNaN(Number(args.VOLUME)) ? 100 : Number(args.VOLUME)) / 100;
    }
    getAudioVolume() {
        return this.audioPlayer.volume * 100;
    }
}

module.exports = JgPrismBlocks;
