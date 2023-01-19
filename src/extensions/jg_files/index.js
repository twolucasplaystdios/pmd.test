const BlockType = require('../../extension-support/block-type');
const ArgumentType = require('../../extension-support/argument-type');
const {validateArray} = require('../../util/json-block-utilities');

/**
 * Class for File blocks
 * @constructor
 */
class JgFilesBlocks {
    constructor (runtime) {
        /**
         * The runtime instantiating this block package.
         * @type {Runtime}
         */
        this.runtime = runtime;
    }

    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo () {
        return {
            id: 'jgFiles',
            name: 'Files',
            color1: '#ffbb00',
            color2: '#ffaa00',
            // docsURI: 'https://docs.turbowarp.org/blocks',
            blocks: [
                {
                    opcode: 'isFileReaderSupported',
                    text: 'can files be used?',
                    disableMonitor: false,
                    blockType: BlockType.BOOLEAN
                },
                {
                    opcode: 'askUserForFileOfType',
                    text: 'ask user for a file of type [FILE_TYPE]',
                    disableMonitor: true,
                    blockType: BlockType.REPORTER,
                    arguments: {
                        FILE_TYPE: {
                            type: ArgumentType.STRING,
                            defaultValue: 'txt savefile'
                        }
                    }
                },
                {
                    opcode: 'filesaveas',
                    text: 'save [FILE_CONTENT] as with suggested file name [FILE_NAME]',
                    blockType: BlockType.COMMAND,
                    arguments: {
                        FILE_CONTENT: {
                            type: ArgumentType.STRING,
                            defaultValue: 'Hello!'
                        },
                        FILE_NAME: {
                            type: ArgumentType.STRING,
                            defaultValue: 'text.txt'
                        }
                    }
                },
                {
                    opcode: 'downloadFile',
                    text: 'download content [FILE_CONTENT] as file name [FILE_NAME]',
                    blockType: BlockType.COMMAND,
                    arguments: {
                        FILE_CONTENT: {
                            type: ArgumentType.STRING,
                            defaultValue: 'Hello!'
                        },
                        FILE_NAME: {
                            type: ArgumentType.STRING,
                            defaultValue: 'text.txt'
                        }
                    }
                }
            ]
        };
    }

    isFileReaderSupported () {
        return (window.FileReader !== null) && (window.document !== null);
    }

    __askUserForFile (acceptTypes) {
        return new Promise(resolve => {
            const fileReader = new FileReader();
            fileReader.onload = e => {
                resolve(JSON.stringify(e.target.result));
            };
            const input = document.createElement("input");
            input.type = "file";
            if (acceptTypes !== null) {
                input.accept = acceptTypes;
            }
            input.style.display = "none";
            document.body.append(input);
            input.onchange = () => {
                const file = input.files[0];
                if (!file) {
                    resolve("[]");
                    return;
                }
                fileReader.readAsArrayBuffer(file);
                input.remove();
            };
            input.onblur = () => {
                input.onchange();
            };
            input.focus();
            input.click();
        });
    }

    askUserForFileOfType (args) {
        const fileTypesAllowed = [];
        const input = args.FILE_TYPE
            .toLowerCase()
            .replace(/.,/gmi, "");
        if (input === "any") return this.__askUserForFile(null);
        input.split(" ").forEach(type => {
            fileTypesAllowed.push("." + type);
        });
        return this.__askUserForFile(fileTypesAllowed.join(","));
    }
    filesaveas(args,util) {
        try {
        var myArray = args.FILE_NAME.split('.').length - 1;;
        var myArray = args.FILE_NAME.split('.')[myArray]
        const handle = showSaveFilePicker({
        suggestedName: `${args.FILE_NAME}`,
        types: [{
            description: 'file',
            accept: {'text/plain': [`.${myArray}`]},
        }],
        });

        const blob = new Blob([args.FILE_CONTENT]);

        const writableStream = handle.createWritable();
        writableStream.write(blob);
        writableStream.close();
    } catch (e) {return;}}

    downloadFile (args) {
        let content = "";
        let fileName = "text.txt";

        content = String(args.FILE_CONTENT) || content;
        fileName = String(args.FILE_NAME) || fileName;

        const array = validateArray(args.FILE_CONTENT);
        if (array.length > 0 && typeof array[0] === 'number') {
            content = array;
            fileName = (fileName === 'text.txt' ? 'raw.bin' : fileName);
        }

        const blob = new Blob([content]);
        const a = document.createElement("a");
        a.style.display = "none";
        document.body.append(a);
        const url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
    }
}

module.exports = JgFilesBlocks;
