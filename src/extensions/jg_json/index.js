const formatMessage = require('format-message');
const BlockType = require('../../extension-support/block-type');
const ArgumentType = require('../../extension-support/argument-type');
// const Cast = require('../../util/cast');

/**
 * Class for JSON blocks
 * @constructor
 */
class JgJSONBlocks {
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
            id: 'jgJSON',
            name: 'JSON',
            color1: '#0FBD8C',
            color2: '#0EAF82',
            blocks: [
                {
                    opcode: 'getValueFromJSON',
                    text: formatMessage({
                        id: 'jgJSON.blocks.getValueFromJSON',
                        default: 'get [VALUE] from [JSON]',
                        description: 'Gets a value from a JSON object.'
                    }),
                    disableMonitor: true,
                    blockType: BlockType.REPORTER,
                    arguments: {
                        VALUE: {
                            type: ArgumentType.STRING,
                            defaultValue: formatMessage({
                                id: 'jgJSON.getValueFromJSON_value',
                                default: 'key',
                                description: 'The name of the item you want to get from the JSON.'
                            })
                        },
                        JSON: {
                            type: ArgumentType.STRING,
                            defaultValue: formatMessage({
                                id: 'jgJSON.getValueFromJSON_json',
                                default: '{"key": "value"}',
                                description: 'The JSON to get a value from.'
                            })
                        }
                    }
                },
                {
                    opcode: 'setValueToKeyInJSON',
                    text: formatMessage({
                        id: 'jgJSON.blocks.setValueToKeyInJSON',
                        default: 'set [VALUE] to [KEY] in [JSON]',
                        description: 'Returns the JSON with the key set to the value.'
                    }),
                    disableMonitor: true,
                    blockType: BlockType.REPORTER,
                    arguments: {
                        VALUE: {
                            type: ArgumentType.STRING,
                            defaultValue: formatMessage({
                                id: 'jgJSON.setValueToKeyInJSON_value',
                                default: 'value',
                                description: 'The value of the key you are setting.'
                            })
                        },
                        KEY: {
                            type: ArgumentType.STRING,
                            defaultValue: formatMessage({
                                id: 'jgJSON.setValueToKeyInJSON_key',
                                default: 'key',
                                description: 'The key you are setting in the JSON.'
                            })
                        },
                        JSON: {
                            type: ArgumentType.STRING,
                            defaultValue: formatMessage({
                                id: 'jgJSON.setValueToKeyInJSON_json',
                                default: '{}',
                                description: 'The JSON to set a key in.'
                            })
                        }
                    }
                }
            ]
        };
    }
    getValueFromJSON(args) {
        const jsonString = String(args.JSON);
        const key = String(args.VALUE);
        let canParseJSON = true;
        try {
            JSON.parse(jsonString);
        } catch {
            canParseJSON = false;
        }
        if (!canParseJSON) return "";
        const json = JSON.parse(jsonString);
        const checking = json[key];
        return checking == true ? true :
            checking == false ? false :
                Number(checking) ? Number(checking) :
                    checking == null ? "null" :
                        typeof checking == "object" || Array.isArray(checking) ? JSON.stringify(checking) :
                            String(checking);
    }
    setValueToKeyInJSON(args) {
        const jsonString = String(args.JSON);
        const key = String(args.KEY);
        const value = String(args.VALUE);
        let canParseJSON = true;
        try {
            JSON.parse(jsonString);
        } catch {
            canParseJSON = false;
        }
        if (!canParseJSON) return "";
        const json = JSON.parse(jsonString);
        canParseJSON = true;
        try {
            JSON.parse(value);
        } catch {
            canParseJSON = false;
        }
        const checking = String(value);
        json[key] = checking == "true" ? true :
            checking == "false" ? false :
                Number(checking) ? Number(checking) :
                    checking == "null" ? null :
                        canJSONParse ? JSON.parse(checking) :
                            checking;
        return JSON.stringify(json)
    }
}

module.exports = JgJSONBlocks;
