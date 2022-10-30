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
                },
                {
                    opcode: 'indexOfTextInText',
                    text: formatMessage({
                        id: 'jwUnite.blocks.indexOfTextInText',
                        default: 'index of [TEXT1] in [TEXT2]',
                        description: 'Finds the position of some text in another piece of text.'
                    }),
                    disableMonitor: true,
                    blockType: BlockType.REPORTER,
                    arguments: {
                        TEXT1: {
                            type: ArgumentType.STRING,
                            defaultValue: formatMessage({
                                id: 'jwUnite.indexof_textToFind',
                                default: 'world',
                                description: 'The text to look for.'
                            })
                        },
                        TEXT2: {
                            type: ArgumentType.STRING,
                            defaultValue: formatMessage({
                                id: 'jwUnite.indexof_textToSearch',
                                default: 'Hello world!',
                                description: 'The text to search in.'
                            })
                        }
                    }
                },
                {
                    opcode: 'getLettersFromIndexToIndexInText',
                    text: formatMessage({
                        id: 'jwUnite.blocks.getLettersFromIndexToIndexInText',
                        default: 'get letters from [INDEX1] to [INDEX2] in [TEXT]',
                        description: 'Gets a part of text using the indexes specified.'
                    }),
                    disableMonitor: true,
                    blockType: BlockType.REPORTER,
                    arguments: {
                        INDEX1: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 2
                        },
                        INDEX2: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 3
                        },
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: formatMessage({
                                id: 'jwUnite.getLettersFromIndexToIndexInText_text',
                                default: 'Hello!',
                                description: 'The text to get a substring from.'
                            })
                        }
                    }
                },
                {
                    opcode: 'readLineInMultilineText',
                    text: formatMessage({
                        id: 'jwUnite.blocks.readLineInMultilineText',
                        default: 'read line #[LINE] in [TEXT]',
                        description: 'Reads a certain line in text with multiple lines.'
                    }),
                    disableMonitor: true,
                    blockType: BlockType.REPORTER,
                    arguments: {
                        LINE: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        },
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: formatMessage({
                                id: 'jwUnite.readLineInMultilineText_text',
                                default: 'Text with multiple lines here',
                                description: 'The text to read lines from.'
                            })
                        }
                    }
                },
                {
                    opcode: 'newLine',
                    text: formatMessage({
                        id: 'jwUnite.blocks.newLine',
                        default: 'new line',
                        description: 'Represents a new line character.'
                    }),
                    disableMonitor: true,
                    blockType: BlockType.REPORTER
                }
            ]
        };
    }
    whenanything(args, util) {
        return Boolean(args.ANYTHING || false)
    }
    backToGreenFlag(args, util) {
        if (vm) vm.greenFlag()
    }
    indexOfTextInText(args, util) {
        const lookfor = String(args.TEXT1);
        const searchin = String(args.TEXT2);
        let index = 0;
        if (searchin.includes(lookfor)) {
            index = searchin.indexOf(lookfor) + 1;
        }
        return index;
    }
    getLettersFromIndexToIndexInText(args, util) {
        const index1 = (Number(args.INDEX1) ? Number(args.INDEX1) : 1) - 1;
        const index2 = (Number(args.INDEX2) ? Number(args.INDEX2) : 1) - 1;
        const string = String(args.TEXT);
        const substring = string.substring(index1, index2);
        return substring;
    }
    readLineInMultilineText(args, util) {
        const line = (Number(args.LINE) ? Number(args.LINE) : 1) - 1;
        const text = String(args.TEXT);
        const readline = text.split("\n")[line] || "";
        return readline;
    }
    newLine() {
        return "\n";
    }
}

module.exports = jwUnite;
