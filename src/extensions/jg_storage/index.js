const BlockType = require('../../extension-support/block-type');
const ArgumentType = require('../../extension-support/argument-type');
const Cast = require('../../util/cast');

/**
 * Class for storage blocks
 * @constructor
 */
class JgStorageBlocks {
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
            id: 'jgStorage',
            name: 'Storage',
            color1: '#76A8FE',
            color2: '#538EFC',
            blocks: [
                {
                    blockType: BlockType.LABEL,
                    text: "Local Storage"
                },
                {
                    opcode: 'getValue',
                    text: 'get [KEY]',
                    disableMonitor: true,
                    blockType: BlockType.REPORTER,
                    arguments: {
                        KEY: {
                            type: ArgumentType.STRING,
                            defaultValue: "key"
                        },
                    }
                },
                {
                    opcode: 'setValue',
                    text: 'set [KEY] to [VALUE]',
                    blockType: BlockType.COMMAND,
                    arguments: {
                        KEY: {
                            type: ArgumentType.STRING,
                            defaultValue: "key"
                        },
                        VALUE: {
                            type: ArgumentType.STRING,
                            defaultValue: "value"
                        },
                    }
                },
                {
                    opcode: 'deleteValue',
                    text: 'delete [KEY]',
                    blockType: BlockType.COMMAND,
                    arguments: {
                        KEY: {
                            type: ArgumentType.STRING,
                            defaultValue: "key"
                        }
                    }
                },
                {
                    opcode: 'getKeys',
                    text: 'get all stored names',
                    disableMonitor: true,
                    blockType: BlockType.REPORTER
                },
                {
                    blockType: BlockType.LABEL,
                    text: "Local Uploaded Project Storage"
                },
                {
                    opcode: 'getProjectValue',
                    text: 'get project [KEY]',
                    disableMonitor: true,
                    blockType: BlockType.REPORTER,
                    arguments: {
                        KEY: {
                            type: ArgumentType.STRING,
                            defaultValue: "key"
                        },
                    }
                },
                {
                    opcode: 'setProjectValue',
                    text: 'set project [KEY] to [VALUE]',
                    blockType: BlockType.COMMAND,
                    arguments: {
                        KEY: {
                            type: ArgumentType.STRING,
                            defaultValue: "key"
                        },
                        VALUE: {
                            type: ArgumentType.STRING,
                            defaultValue: "value"
                        },
                    }
                },
                {
                    opcode: 'deleteProjectValue',
                    text: 'delete project [KEY]',
                    blockType: BlockType.COMMAND,
                    arguments: {
                        KEY: {
                            type: ArgumentType.STRING,
                            defaultValue: "key"
                        }
                    }
                },
                {
                    opcode: 'getProjectKeys',
                    text: 'get all stored names in this project',
                    disableMonitor: true,
                    blockType: BlockType.REPORTER
                },
                {
                    blockType: BlockType.LABEL,
                    text: "(server storage is in development)"
                },
            ]
        };
    }
    // utilities
    /**
     * @returns {string} Prefix for any keys saved
     */
    getPrefix(projectId) {
        return `PM_PROJECTSTORAGE_EXT_${projectId == null ? "" : `${projectId}_`}`;
    }
    getAllKeys(projectId) {
        return Object.keys(localStorage).filter(key => key.startsWith(this.getPrefix(projectId))).map(key => key.replace(this.getPrefix(projectId), ""));
    }
    getProjectId() {
        /* todo: get the project id in a like 190x better way lol */
        const hash = String(window.location.hash).replace(/#/gmi, "");
        return Cast.toNumber(hash);
    }

    // blocks
    getKeys() {
        return JSON.stringify(this.getAllKeys());
    }
    getValue(args) {
        const key = this.getPrefix() + Cast.toString(args.KEY);

        const returned = localStorage.getItem(key);
        if (returned === null) return "";
        return isNaN(Number(args.KEY)) ? Cast.toString(returned) : Cast.toNumber(returned);
    }
    setValue(args) {
        const key = this.getPrefix() + Cast.toString(args.KEY);
        const value = isNaN(Number(args.VALUE)) ? Cast.toString(args.VALUE) : Cast.toNumber(args.VALUE);

        return localStorage.setItem(key, value);
    }
    deleteValue(args) {
        const key = this.getPrefix() + Cast.toString(args.KEY);

        return localStorage.removeItem(key);
    }

    // project blocks
    getProjectKeys() {
        return JSON.stringify(this.getAllKeys(this.getProjectId()));
    }
    getProjectValue(args) {
        const key = this.getPrefix(this.getProjectId()) + Cast.toString(args.KEY);

        const returned = localStorage.getItem(key);
        if (returned === null) return "";
        return isNaN(Number(args.KEY)) ? Cast.toString(returned) : Cast.toNumber(returned);
    }
    setProjectValue(args) {
        const key = this.getPrefix(this.getProjectId()) + Cast.toString(args.KEY);
        const value = isNaN(Number(args.VALUE)) ? Cast.toString(args.VALUE) : Cast.toNumber(args.VALUE);

        return localStorage.setItem(key, value);
    }
    deleteProjectValue(args) {
        const key = this.getPrefix(this.getProjectId()) + Cast.toString(args.KEY);

        return localStorage.removeItem(key);
    }
}

module.exports = JgStorageBlocks;
