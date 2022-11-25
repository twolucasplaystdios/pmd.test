// create by scratch3-extension generator
const ArgumentType = Scratch.ArgumentType;
const BlockType = Scratch.BlockType;
const formatMessage = Scratch.formatMessage;
const log = Scratch.log;

const menuIconURI = null;
const blockIconURI = null;

class jsonblocks {
    constructor(runtime) {
        this.runtime = runtime;
        // communication related
        this.comm = runtime.ioDevices.comm;
        this.session = null;
        this.runtime.registerPeripheralExtension('jsonblocks', this);
        // session callbacks
        this.reporter = null;
        this.onmessage = this.onmessage.bind(this);
        this.onclose = this.onclose.bind(this);
        this.write = this.write.bind(this);
        // string op
        this.decoder = new TextDecoder();
        this.lineBuffer = '';
    }

    onclose() {
        this.session = null;
    }

    write(data, parser = null) {
        if (this.session) {
            return new Promise(resolve => {
                if (parser) {
                    this.reporter = {
                        parser,
                        resolve
                    }
                }
                this.session.write(data);
            })
        }
    }

    onmessage(data) {
        const dataStr = this.decoder.decode(data);
        this.lineBuffer += dataStr;
        if (this.lineBuffer.indexOf('\n') !== -1) {
            const lines = this.lineBuffer.split('\n');
            this.lineBuffer = lines.pop();
            for (const l of lines) {
                if (this.reporter) {
                    const {
                        parser, resolve
                    } = this.reporter;
                    resolve(parser(l));
                };
            }
        }
    }

    scan() {
        this.comm.getDeviceList().then(result => {
            this.runtime.emit(this.runtime.constructor.PERIPHERAL_LIST_UPDATE, result);
        });
    }

    getInfo() {
        return {
            id: 'jsonblocks',
            name: 'JSON',
            color1: '#ba4a9a',
            color2: '#ba4a9a',
            menuIconURI: menuIconURI,
            blockIconURI: blockIconURI,
            blocks: [{
                opcode: 'json_set',
                blockType: BlockType.REPORTER,
                arguments: {
                    key: {
                        type: ArgumentType.STRING
                    },
                    value: {
                        type: ArgumentType.STRING
                    },
                    json: {
                        type: ArgumentType.STRING
                    }
                },
                text: 'set key [key] to value [value] in json [json]'
            }, {
                opcode: 'json_get',
                blockType: BlockType.REPORTER,
                arguments: {
                    key: {
                        type: ArgumentType.STRING
                    },
                    json: {
                        type: ArgumentType.STRING
                    }
                },
                text: 'get key [key] from json [json]'
            }, {
                opcode: 'json_has',
                blockType: BlockType.BOOLEAN,
                arguments: {
                    json: {
                        type: ArgumentType.STRING
                    },
                    key: {
                        type: ArgumentType.STRING
                    }
                },
                text: 'json [json] has key [key] ?'
            }, {
                opcode: 'json_delete',
                blockType: BlockType.REPORTER,
                arguments: {
                    json: {
                        type: ArgumentType.STRING
                    },
                    key: {
                        type: ArgumentType.STRING
                    }
                },
                text: 'in json [json] delete key [key]'
            }, {
                opcode: 'json_values',
                blockType: BlockType.REPORTER,
                arguments: {
                    json: {
                        type: ArgumentType.STRING
                    }
                },
                text: 'get all values from json [json]'
            }, {
                opcode: 'json_keys',
                blockType: BlockType.REPORTER,
                arguments: {
                    json: {
                        type: ArgumentType.STRING
                    }
                },
                text: 'get all keys from json [json]'
            }, {
                opcode: 'json_array_length',
                blockType: BlockType.REPORTER,
                arguments: {
                    array: {
                        type: ArgumentType.STRING
                    }
                },
                text: 'length of array [array]'
            }, {
                opcode: 'json_array_isempty',
                blockType: BlockType.BOOLEAN,
                arguments: {
                    array: {
                        type: ArgumentType.STRING
                    }
                },
                text: 'is array [array] empty?'
            }, {
                opcode: 'json_array_contains',
                blockType: BlockType.BOOLEAN,
                arguments: {
                    array: {
                        type: ArgumentType.STRING
                    },
                    value: {
                        type: ArgumentType.STRING
                    }
                },
                text: 'array [array] contains [value] ?'
            }, {
                opcode: 'json_array_reverse',
                blockType: BlockType.REPORTER,
                arguments: {
                    array: {
                        type: ArgumentType.STRING
                    }
                },
                text: 'reverse array [array]'
            }, {
                opcode: 'json_array_indexof',
                blockType: BlockType.REPORTER,
                arguments: {
                    array: {
                        type: ArgumentType.STRING
                    },
                    number: {
                        type: ArgumentType.STRING
                    },
                    value: {
                        type: ArgumentType.STRING
                    }
                },
                text: 'in array [array] get [number] index of [value]'
            }, {
                opcode: 'json_array_set',
                blockType: BlockType.REPORTER,
                arguments: {
                    array: {
                        type: ArgumentType.STRING
                    },
                    index: {
                        type: ArgumentType.STRING
                    },
                    value: {
                        type: ArgumentType.STRING
                    }
                },
                text: 'in array [array] set [index] to [value]'
            }, {
                opcode: 'json_array_get',
                blockType: BlockType.REPORTER,
                arguments: {
                    array: {
                        type: ArgumentType.STRING
                    },
                    index: {
                        type: ArgumentType.STRING
                    }
                },
                text: 'in array [array] get [index]'
            }, {
                opcode: 'json_array_getrange',
                blockType: BlockType.REPORTER,
                arguments: {
                    array: {
                        type: ArgumentType.STRING
                    },
                    index1: {
                        type: ArgumentType.STRING
                    },
                    index2: {
                        type: ArgumentType.STRING
                    }
                },
                text: 'in array [array] get all items from [index1] to [index2]'
            }, {
                opcode: 'json_array_push',
                blockType: BlockType.REPORTER,
                arguments: {
                    array: {
                        type: ArgumentType.STRING
                    },
                    item: {
                        type: ArgumentType.STRING
                    }
                },
                text: 'in array [array] add [item]'
            }, {
                opcode: 'json_array_tolist',
                blockType: BlockType.COMMAND,
                arguments: {
                    list: {
                        type: Scratch.ArgumentType.STRING,
                        defaultValue: 'select a list',
                        menu: 'lists'
                    },
                    array: {
                        type: ArgumentType.STRING
                    }
                },
                text: 'set contents of list [list] to contents of array [array]'
            }, {
                opcode: 'json_array_listtoarray',
                blockType: BlockType.REPORTER,
                arguments: {
                    list: {
                        type: Scratch.ArgumentType.STRING,
                        defaultValue: 'select a list',
                        menu: 'lists'
                    }
                },
                text: 'get contents of list [list] as array'
            }],
            menus: {
                lists: 'getAllLists'
            }
        }
    }

    getAllLists() {
        const variables = [
            ...Object.values(Scratch.vm.runtime.getTargetForStage().variables),
            ...Object.values(Scratch.vm.editingTarget.variables)
        ];
        const lists = variables.filter(i => i.type === 'list');
        if (lists.length === 0) {
            return [
                {
                    text: 'select a list',
                    value: 'select a list'
                }
            ];
        }
        return lists.map(i => ({
            text: i.name,
            value: JSON.stringify({
                id: i.id,
                name: i.name
            })
        }));
    }

    json_set(args, util) {
        const key = args.key;
        let value;
        const json = args.json;

        // is this json valid? if not create an empty one
        let object;
        try {
            object = JSON.parse(json)
        } catch {
            object = {}
        }
        // is the value a valid json? if so convert to one else do nothing
        try {
            value = JSON.parse(args.value)
        } catch {
            value = args.value
        }
        // is the value a number? if so convert it to a number
        if (String(Number(value) == value)) value = Number(value)
        // is the value a boolean? if so convert it to one
        if (value == 'true' || value == 'false') value = value == 'true'

        object[key] = value

        return JSON.stringify(object)
    }

    json_get(args, util) {
        const key = args.key;
        const json = args.json;

        // is this json valid? if not create an empty one
        let object;
        try {
            object = JSON.parse(json)
        } catch {
            object = {}
        }

        let value = object[key]

        // is the value a number? if so convert value to one
        if (typeof value == 'number') value = String(value)

        // is the value a valid json? if so make it into a string
        try {
            value = JSON.stringify(value)
        } catch {}

        // is the value a boolean? if so make it into a string
        if (typeof value == 'boolean') value = String(value)

        return value;
    }

    json_has(args, util) {
        const json = args.json;
        const key = args.key;

        // is this json valid? if not create an empty one
        let object;
        try {
            object = JSON.parse(json)
        } catch {
            object = {}
        }

        return object.hasOwnProperty(key);
    }

    json_delete(args, util) {
        const json = args.json;
        const key = args.key;

        // is this json valid? if not create an empty one
        let object;
        try {
            object = JSON.parse(json)
        } catch {
            object = {}
        }

        if (!object.hasOwnProperty(key)) return object

        delete object[key]

        return object;
    }

    json_values(args, util) {
        const json = args.json;

        // is this json valid? if not create an empty one
        let object;
        try {
            object = JSON.parse(json)
        } catch {
            object = {}
        }

        return JSON.stringify(Object.keys(object));
    }

    json_keys(args, util) {
        const json = args.json;

        // is this json valid? if not create an empty one
        let object;
        try {
            object = JSON.parse(json)
        } catch {
            object = {}
        }

        return JSON.stringify(Object.values(object));
    }

    json_array_length(args, util) {
        const array = args.array;

        // is this json valid? if not create an empty one
        let object;
        try {
            if (!array.startsWith('[')) throw new error('error lol')
            object = JSON.parse(array)
        } catch {
            object = []
        }

        return object.length;
    }

    json_array_isempty(args, util) {
        const array = args.array;

        // is this json valid? if not create an empty one
        let object;
        try {
            if (!array.startsWith('[')) throw new error('error lol')
            object = JSON.parse(array)
        } catch {
            object = []
        }

        return !object.length;
    }

    json_array_contains(args, util) {
        const array = args.array;
        const value = args.value;

        // is this json valid? if not create an empty one
        let object;
        try {
            if (!array.startsWith('[')) throw new error('error lol')
            object = JSON.parse(array)
        } catch {
            object = []
        }

        return object.includes(value);
    }

    json_array_reverse(args, util) {
        const array = args.array;

        // is this json valid? if not create an empty one
        let object;
        try {
            if (!array.startsWith('[')) throw new error('error lol')
            object = JSON.parse(array)
        } catch {
            object = []
        }

        return JSON.stringify(object.reverse());
    }

    json_array_indexof(args, util) {
        const array = args.array;
        const number = args.number;
        const value = args.value;

        // is this json valid? if not create an empty one
        let object;
        try {
            if (!array.startsWith('[')) throw new error('error lol')
            object = JSON.parse(array)
        } catch {
            object = []
        }

        return object.indexof(value, number);
    }

    json_array_set(args, util) {
        const array = args.array;
        const index = args.index;
        let value = args.value;

        // is this json valid? if not create an empty one
        let object;
        try {
            if (!array.startsWith('[')) throw new error('error lol')
            object = JSON.parse(array)
        } catch {
            object = []
        }
        // is the value a valid json? if so convert to one else do nothing
        try {
            value = JSON.parse(args.value)
        } catch {
            value = args.value
        }
        // is the value a number? if so convert it to a number
        if (String(Number(value) == value)) value = Number(value)
        // is the value a boolean? if so convert it to one
        if (value == 'true' || value == 'false') value = value == 'true'

        object[index] = value

        return JSON.stringify(object);
    }

    json_array_get(args, util) {
        const array = args.array;
        const index = args.index;

        // is this json valid? if not create an empty one
        let object;
        try {
            if (!array.startsWith('[')) throw new error('error lol')
            object = JSON.parse(array)
        } catch {
            object = []
        }

        let value = object[index]

        // is the value a number? if so convert value to one
        if (typeof value == 'number') value = String(value)

        // is the value a valid json? if so make it into a string
        try {
            value = JSON.stringify(value)
        } catch {}

        // is the value a boolean? if so make it into a string
        if (typeof value == 'boolean') value = String(value)

        return value;
    }

    json_array_getrange(args, util) {
        const array = args.array;
        const index1 = args.index1;
        const index2 = args.index2;

        // is this json valid? if not create an empty one
        let object;
        try {
            if (!array.startsWith('[')) throw new error('error lol')
            object = JSON.parse(array)
        } catch {
            object = []
        }

        return JSON.stringify(object.slice(index1, index2));
    }

    json_array_push(args, util) {
        const array = args.array;

        // is this json valid? if not create an empty one
        let object;
        try {
            if (!array.startsWith('[')) throw new error('error lol')
            object = JSON.parse(array)
        } catch {
            object = []
        }

        let value;
        // is the value a valid json? if so convert to one else do nothing
        try {
            value = JSON.parse(args.item)
        } catch {
            value = args.item
        }
        // is the value a number? if so convert it to a number
        if (String(Number(value) == value)) value = Number(value)
        // is the value a boolean? if so convert it to one
        if (value == 'true' || value == 'false') value = value == 'true'

        object.push(value)

        return JSON.stringify(object);
    }

    json_array_tolist(args, util) {
        const list = JSON.parse(args.list);
        const array = args.array;
        const content = util.target.lookupOrCreateList(list.id, list.name)

        // is this json valid? if not create an empty one
        let object
        try {
            if (!array.startsWith('[')) throw new error('error lol')
            object = JSON.parse(array)
        } catch {
            object = []
        }
        content.value = object.map(x => {
            let value = x

            // is the value a number or boolean? if so convert value to one
            if ((typeof value == 'number') || (typeof value == 'boolean')) value = String(value)
    
            // is the value a valid json? if so make it into a string
            try {
                value = JSON.stringify(value)
            } catch {}
            return value
        })
    }

    json_array_listtoarray(args, util) {
        const list = JSON.parse(args.list);
        const content = util.target.lookupOrCreateList(list.id, list.name).value

        content.map(x => {
            let value;
            // is the value a valid json? if so convert to one else do nothing
            try {
                value = JSON.parse(x)
            } catch {
                value = x
            }
            // is the value a number? if so convert it to a number
            if (String(Number(value) == value)) value = Number(value)
            // is the value a boolean? if so convert it to one
            if (value == 'true' || value == 'false') value = value == 'true'
            return value
        })

        return JSON.stringify(content);
    }

}

module.exports = jsonblocks;