const formatMessage = require('format-message');
const BlockType = require('../../extension-support/block-type');
const ArgumentType = require('../../extension-support/argument-type');
// const Cast = require('../../util/cast');

//const blockIconURI = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUAAAAFACAMAAAD6TlWYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAPUExURQAAAP+xNQDiGgCU/wAAAJEQGGoAAAAFdFJOU/////8A+7YOUwAAAAlwSFlzAAAOwwAADsMBx2+oZAAABA5JREFUeF7t0EtuW0EUA9F8vP81Z8JRAwzbLuk5COoMBb1LdP34EGJAyICQASEDQgaEDAgZEDIgZEDIgJABIQNCBoQMCBkQMiBkQMiAkAEhA0IGhAwIGRAyIGRAyICQASEDQgaEDAgZEHos4M+HZfbtDAgZEDIgZEDIgJABIQNCBoQMCBkQMiBkQMiAkAEhA0IGhAwIGRAyIGRAyICQASEDQgaEDAgZEDIgZEDIgJABIQNCBoQMCBkQMiBkQMiAkAEhA0IGhAwIGRAyIGRAyICQASEDQgaEDAgZEDIgZEDIgJABIQNCBoQMCBkQMiBkQMiAkAEhA0IGhAwIGRAyIGRAyICQASEDQgaEDAgZEDIgZEDIgJABIQNCBoQMCBkQMiBkQMiAkAEhA0IGhAwIGRAyIGRAyICQASEDQgaEDAgZEDIgZEDIgJABIQNCBoQMCBkQMiBkQMiAkAEhA0KPBfxfGRAyIGRAyICQASEDQgaEDAgZEDIgZEDIgJABIQNCBoQMCBkQMiBkQMiAkAEhA0IGhAwIGRAyIGRAyICQASEDQgaEZsBfh/z8z/r9SfnsywwIGRAyIGRAyICQASEDQp8OeMrfvk06vEzOXjPgIWevGfCQs9cMeMjZawY85Ow1Ax5y9poBDzl7zYCHnL2GA57y2dvlvW+TmcmARWYmAxaZmQxYZGYyYJGZyYBFZiYDFpmZDFhkZnp5wFPOvFze+TaZmQxYZGYyYJGZyYBFZiYDFpmZDFhkZjJgkZnJgEVmprcHPOXsl+V9j8lsZcAhs5UBh8xWBhwyWxlwyGxlwCGzlQGHzFYGHDJbPR7wlJlreddjMlsZcMhsZcAhs5UBh8xWBhwyWxlwyGxlwCGzlQGHzFbfHvCU2SrvekxmKwMOma0MOGS2MuCQ2cqAQ2YrAw6ZrQw4ZLYy4JDZyoBDZisDDpmtDDhktjLgkNnKgENmKwMOma0MOGS2MuCQ2erbA2bmWt71mMxWBhwyWxlwyGxlwCGzlQGHzFYGHDJbGXDIbGXAIbPV4wFz9svyrsdktjLgkNnKgENmKwMOma0MOGS2MuCQ2cqAQ2YrAw6Zrd4eMGdeLu97m8xMBiwyMxmwyMxkwCIzkwGLzEwGLDIzGbDIzGTAIjPTywPms7fLO98mM5MBi8xMBiwyMxmwyMxkwCIzkwGLzEwGLDIzGbDIzIQD5m/fJu99mZy9ZsBDzl4z4CFnrxnwkLPXDHjI2WsGPOTsNQMecvaaAQ85e+3TAfPzPysdruWzLzMgZEDIgJABIQNCBoQMCM2A+jsDQgaEDAgZEDIgZEDIgJABIQNCBoQMCBkQMiBkQMiAkAEhA0IGhAwIGRAyIGRAyICQASEDQgaEDAgZEDIgZEDIgMjHxx+IPExM0h8siAAAAABJRU5ErkJggg=="

/**
 * Class for Proto blocks
 * @constructor
 */
class jwProto {
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
            id: 'jwProto',
            name: 'Proto',
            //blockIconURI: blockIconURI,
            color1: '#ffdc7a',
            color2: '#ffd45e',
            blocks: [
                {
                    opcode: 'labelFunction',
                    text: formatMessage({
                        id: 'jwProto.blocks.labelFunction',
                        default: 'label [LABEL]',
                        description: 'Runs blocks when set boolean is true'
                    }),
                    disableMonitor: true,
                    blockType: BlockType.COMMAND,
                    branches: 1,
                    arguments: {
                        LABEL: {
                            type: ArgumentType.STRING,
                            defaultValue: "label"
                        }
                    }
                }
            ]
        };
    }

    labelFunction(args, util) {
        util.startBranch(1, false)
    }
}

module.exports = jwProto;
