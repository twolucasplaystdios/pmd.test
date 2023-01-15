const BlockType = require('../../extension-support/block-type');
const ArgumentType = require('../../extension-support/argument-type');

/**
 * Class
 * @constructor
 */
class JgJSONBlocks {
    constructor(runtime) {
        /**
         * The runtime instantiating this block package.
         * @type {runtime}
         */
        this.runtime = runtime;
    }

    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo() {
        return {
            id: 'canvas',
            name: 'html canvas',
            color1: '#0069c2',
            blocks: [
                {
                    opcode: 'creatNewCanvas',
                    blockType: BlockType.BUTTON,
                    text: 'create new canvas'
                }, 
                {
                    blockType: BlockType.LABEL,
                    text: "2D"
                },
                {
                    opcode: '',
                    blockType: BlockType.BOOLEAN,
                    arguments: {
                        json: {
                            type: ArgumentType.STRING,
                            defaultValue: "{}"
                        }
                    },
                    text: 'is json [json] valid?'
                }, 
                {
                    blockType: BlockType.LABEL,
                    text: "3D"
                },
                {
                    opcode: 'json_array_validate',
                    blockType: BlockType.BOOLEAN,
                    arguments: {
                        array: {
                            type: ArgumentType.STRING,
                            defaultValue: "[]"
                        }
                    },
                    text: 'is array [array] valid?'
                }, 
            ],
            menus: {
                lists: 'getAllLists'
            }
        };
    }

    createNewCanvas() {
        console.log('button clicked')
    }

    getValueFromJSON(args) {
        console.log('your fat')
        const key = args.VALUE;
        const json = validateJSON(args.JSON).object;

        return valueToString(json[key]);
    }
    setValueToKeyInJSON(args) {
        let json = validateJSON(args.JSON).object;
        const key = args.KEY;
        const value = args.VALUE;

        json[key] = stringToEqivalint(value)

        return JSON.stringify(json)
    }

    json_has(args, util) {
        const json = validateJSON(args.json).object;
        const key = args.key;

        return json.hasOwnProperty(key);
    }

    json_delete(args, util) {
        let json = validateJSON(args.json).object;
        const key = args.key;

        if (!json.hasOwnProperty(key)) return json

        delete json[key]

        return JSON.stringify(json);
    }

    json_values(args, util) {
        const json = validateJSON(args.json).object;

        return JSON.stringify(Object.values(json));
    }

    json_keys(args, util) {
        const json = validateJSON(args.json).object;

        return JSON.stringify(Object.keys(json));
    }

    json_array_length(args, util) {
        const array = validateArray(args.array).array;

        return array.length;
    }

    json_array_isempty(args, util) {
        const array = validateArray(args.array).array;

        return !array.length;
    }

    json_array_contains(args, util) {
        const array = validateArray(args.array).array;
        const value = args.value;

        return array.includes(stringToEqivalint(value));
    }

    json_array_reverse(args, util) {
        let array = validateArray(args.array).array;

        return JSON.stringify(array.reverse());
    }

    json_array_indexof(args, util) {
        const array = validateArray(args.array).array;
        const number = args.number;
        const value = args.value;

        return array.indexOf(stringToEqivalint(value), number);
    }

    json_array_set(args, util) {
        let array = validateArray(args.array).array;
        const index = args.index;
        const value = args.value;

        array[index] = stringToEqivalint(value)

        return JSON.stringify(array);
    }

    json_array_insert(args, util) {
        let array = validateArray(args.array).array;
        const index = args.index;
        const value = args.value;

        array.splice(index, 0, stringToEqivalint(value))

        return JSON.stringify(array);
    }

    json_array_get(args, util) {
        const array = validateArray(args.array).array;
        const index = args.index;

        return valueToString(array[index]);
    }

    json_array_getrange(args, util) {
        let array = validateArray(args.array).array;
        const index1 = args.index1;
        const index2 = args.index2;

        return JSON.stringify(array.slice(index1, index2));
    }

    json_array_push(args, util) {
        let array = validateArray(args.array).array;
        const value = args.item;

        array.push(stringToEqivalint(value))

        return JSON.stringify(array);
    }

    json_array_tolist(args, util) {
        let list;
        try {
            list = JSON.parse(args.list);
        } catch {
            return
        }
        const array = validateArray(args.array).array;
        const content = util.target.lookupOrCreateList(list.id, list.name)

        content.value = array.map(x => {
            return valueToString(x)
        })
    }

    json_array_listtoarray(args, util) {
        let list;
        try {
            list = JSON.parse(args.list);
        } catch {
            return
        }
        const content = util.target.lookupOrCreateList(list.id, list.name).value

        return JSON.stringify(content.map(x => {
            return stringToEqivalint(x)
        }));
    }

    json_array_delete(args, util) {
        let array = validateArray(args.array).array
        const index = args.index

        delete array[index]

        return JSON.stringify(array.filter(x => Boolean(x)))
    }

    json_array_split(args) {
        if (validateRegex(args.delimeter)) args.delimeter = new RegExp(args.delimeter)
        return JSON.stringify(args.text.split(args.delimeter))
    }
    json_array_join(args) {
        return validateArray(args.array).array.join(args.delimeter)
    }

    json_validate(args) {
        return validateJSON(args.json).isValid
    }
    json_array_validate(args) {
        return validateArray(args.array).isValid
    }
}

module.exports = JgJSONBlocks;
