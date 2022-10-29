const formatMessage = require('format-message');
const BlockType = require('../../extension-support/block-type');
const ArgumentType = require('../../extension-support/argument-type');
// const Cast = require('../../util/cast');

/**
 * Class for Unite blocks
 * @constructor
 */
class jwUnite {
    constructor(runtime) {
        /**
         * The runtime instantiating this block package.
         * @type {Runtime}
         */
        this.runtime = runtime;
    }

    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo() {
        return {
            id: 'jwUnite',
            name: 'Unite',
            color1: '#7ddcff',
            color2: '#4a98ff',
            blocks: [
                {
                    opcode: 'whenanything',
                    text: formatMessage({
                        id: 'jwUnite.blocks.whenanything',
                        default: 'when [ANYTHING]',
                        description: 'Runs blocks when set boolean is true'
                    }),
                    disableMonitor: true,
                    blockType: BlockType.HAT,
                    arguments: {
                        ANYTHING: {
                            type: ArgumentType.BOOLEAN,
                        }
                    }
                },
                {
                    opcode: 'backToGreenFlag',
                    text: formatMessage({
                        id: 'jwUnite.blocks.backToGreenFlag',
                        default: 'click [FLAG]',
                        description: 'Acts like a click on the flag has been done.'
                    }),
                    terminal: true,
                    blockType: BlockType.COMMAND,
                    arguments: {
                        FLAG: {
                            type: ArgumentType.IMAGE,
                            dataURI: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAACJ0lEQVRIid2Uy09TQRSHv2kv1VR5hhQQqwlYGtqCmtbHokhDTNQtEVz4B/gfmBCDXoyGmLj3kbBwY2LY6MpHWJDUoBukKsTKQ6I2paWGBipCo73jBii30BpI78ZfMpkzMznznTOPAwZLbFgt/ZWY011k9gzysSdZLICStdJXkPRjSns41hcH2Y7EjmAVmESKFyjyCaPqr50AzBtWbeAsEKDE0oy7w4rnfAXNbWU0nlY40CQwmX0kY73UBr4QGw5vu5vndg31Zy6wv3OGhecZfQbrajk3Rp2zXRdCqe0Irg5o8k8w+uwWR9VLmE13eaeNgarRqtoQ4jKKdpUy+wLy+3Hg2vaAQlIsbk51ZUjNJ/n8egBv5CBan2Bf5TL1nlkafGkWYz8YeVy94bIjwHpOpTY/vs7Nc1WAHQCNr5sXTLsA/EOaNBagabph8QEyYzAA3QkZkYGeUOAVyTlWUt/I/M5gLa/GpDjYXFryuumPaCsgMWsl+ilEfLoOSQTBClBBuW2GExcXsVi9hQFSF8RWQGT8MNCLwzXAYHc2nNabbQzdu4/TH6ThpBMhbDmef1iKhRgf8iHFo/wAeEpIfUgoZ/bD9SAB1Us42MPUiJOaxhBVh5YwKYKfib3MhZtYXS5B0sl79VUhQH4Nq6vADbzqHaJTbUQn3QjKECKOlG8Iqblh7apUsFayX661gjLgH/zPgPm1PlFMQPaSHa4HTIcnSFW8LSbAcP0F3uGqEimnx6MAAAAASUVORK5CYII=',
                            alt: 'Blue Flag'
                        }
                    }
                }
            ]
        };
    }
    whenanything(args, util) {
        return Boolean(args.ANYTHING || false)
    }
    backToGreenFlag(args, util) {
        if (window && window.vm) window.vm.greenFlag()
    }
}

module.exports = jwUnite;
