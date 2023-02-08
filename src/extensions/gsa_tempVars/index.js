const BlockType = require('../../extension-support/block-type');
const ArgumentType = require('../../extension-support/argument-type');

/**
 * Class
 * @constructor
 */
class tempVars {
    constructor (runtime) {
        /**
         * The runtime instantiating this block package.
         * @type {runtime}
         */
        this.runtime = runtime;
    }

    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo () {
        return {
            id: 'tempVars',
            name: 'temp variables',
            color1: '#0069c2',
            color2: '#0060B4',
            color3: '#0060B4',
            blocks: [
                {
                    opcode: 'setVariable',
                    text: 'set [name] to [value]',
                    arguments: {
                        name: {
                            type: ArgumentType.STRING,
                            default: 'Variable'
                        },
                        value: {
                            type: ArgumentType.STRING,
                            default: 'Value'
                        }
                    },
                    blockType: BlockType.COMMAND
                },
                {
                    opcode: 'changeVariable',
                    text: 'change [name] by [value]',
                    arguments: {
                        name: {
                            type: ArgumentType.STRING,
                            default: 'Variable'
                        },
                        value: {
                            type: ArgumentType.NUMBER,
                            default: '1'
                        }
                    },
                    blockType: BlockType.COMMAND
                },
                {
                    opcode: 'getVariable',
                    text: 'get [name]',
                    arguments: {
                        name: {
                            type: ArgumentType.STRING,
                            default: 'Variable'
                        }
                    },
                    blockType: BlockType.REPORTER
                }
            ]
        };
    }

    setVariable (args, util) {
        const name = `threadVar_${args.name}`;
        util.thread[name] = args.value;
    }

    changeVariable (args, util) {
        const name = `threadVar_${args.name}`;
        const oldNum = Number(util.stackFrame[name]);
        const newNum = oldNum + args.value;
        if (!util.thread[name] || !oldNum) {
            util.thread[name] = Number(args.value);
            return;
        }
        util.thread[name] = newNum;
    }

    getVariable (args, util) {
        const name = `threadVar_${args.name}`;
        const value = util.thread[name];
        if (!value) return '';
        return value;
    }
}

module.exports = tempVars;
