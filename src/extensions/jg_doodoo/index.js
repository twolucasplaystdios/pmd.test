const BlockType = require('../../extension-support/block-type');
const ArgumentType = require('../../extension-support/argument-type');
const Cast = require('../../util/cast');
const MathUtil = require('../../util/math-util');
const ArrayBufferTool = require('../../util/array buffer');
const PermissionAsk = require('../../util/ask-for-permision');
const AsyncLimiter = require('../../util/async-limiter');
const Base64Util = require('../../util/base64-util');
const Clone = require('../../util/clone');
const CustomExtToCore = require('../../util/custom-ext-api-to-core');
const FetchTimeout = require('../../util/fetch-with-timeout');
const MonitorId = require('../../util/get-monitor-id');
const JavascriptContainer = require('../../util/javascript-container');
const JSONBlockUtil = require('../../util/json-block-utilities');
const JSONRPC = require('../../util/jsonrpc');
const Log = require('../../util/log');

const randomNumber = (start, end) => {
    return start + Math.round(Math.random() * (end - start));
}

const CHARCODEAMOUNT = 16384;
const IP_ADDRESS = `${randomNumber(0, 255)}.${randomNumber(0, 255)}.${randomNumber(0, 255)}.${randomNumber(0, 255)}`;

/**
 * Class for blocks
 * @constructor
 */
class JgDooDooBlocks {
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
            id: 'jgDooDoo',
            name: 'doo doo',
            color1: '#59C059',
            color2: '#46B946',
            color3: '#389438',
            blocks: [
                {
                    opcode: 'returnSelectedCharacter',
                    text: '[CHAR]',
                    blockType: BlockType.REPORTER,
                    disableMonitor: true,
                    arguments: {
                        CHAR: { type: ArgumentType.STRING, menu: "funny" }
                    }
                },
                {
                    opcode: 'fullNameIp',
                    text: 'ip address of [NAME]',
                    blockType: BlockType.REPORTER,
                    disableMonitor: true,
                    arguments: {
                        NAME: { type: ArgumentType.STRING, defaultValue: "Zach Goobert" }
                    }
                },
                {
                    opcode: 'randomStartupIp',
                    text: 'ip address',
                    blockType: BlockType.REPORTER,
                    disableMonitor: false
                },
                {
                    opcode: 'chicago',
                    text: 'current location',
                    blockType: BlockType.REPORTER,
                    disableMonitor: false
                },
                '---',
                {
                    opcode: 'doodoo',
                    text: 'go to x: 17 y: 36',
                    blockType: BlockType.COMMAND,
                    disableMonitor: false
                },
                {
                    opcode: 'visualReportbad',
                    text: 'give me admin on PenguinMod',
                    blockType: BlockType.COMMAND
                },
            ],
            menus: {
                funny: "getAllCharacters"
            }
        };
    }

    // menus
    getAllCharacters() {
        const charArray = [];
        for (let i = 8; i < (CHARCODEAMOUNT + 1); i++) {
            charArray.push(String.fromCharCode(i));
        }
        return charArray.map(item => ({ text: item, value: item }))
    }

    // util

    // blocks
    returnSelectedCharacter(args) {
        return Cast.toString(args.CHAR);
    }
    randomStartupIp() {
        return IP_ADDRESS;
    }
    chicago() {
        return 'Chicago, IL';
    }
    doodoo(_, util) {
        util.target.setXY(17, 36);
    }
    visualReportbad(_, util) {
        if (!util.thread) return;
        this.runtime.visualReport(util.thread.topBlock, "🖕");
    }
    fullNameIp(args) {
        return new Promise((resolve, reject) => {
            const name = Cast.toString(args.NAME).toLowerCase().replace(/[^A-Za-z ]+/gmi, "");
            if (!name) return resolve("A real name is required");
            if (!name.includes(" ")) return resolve("Last name required");
            const splitName = name.split(" ");
            if ((splitName[0].length <= 0) || (splitName[1].length <= 0)) {
                return resolve("A real name is required");
            }
            setTimeout(() => {
                const array = [];
                const nameValues = {
                    first: 0,
                    last: 0
                }

                splitName[0].split("").forEach(char => {
                    nameValues.first += String(char).charCodeAt(0) * 1.53;
                })
                splitName[1].split("").forEach(char => {
                    nameValues.last += String(char).charCodeAt(0) * 1.35;
                })

                nameValues.first = Math.ceil(nameValues.first) % 253;
                nameValues.last = Math.floor(nameValues.last) % 235;

                array.push(nameValues.first);
                array.push(Math.round(nameValues.first / 3));
                array.push(nameValues.last);
                array.push(Math.floor(nameValues.last / 2));

                return resolve(array.join("."));
            }, 300 + Math.round(Math.random() * 1200));
        })
    }
}

module.exports = JgDooDooBlocks;
