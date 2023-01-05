const formatMessage = require('format-message');
const BlockType = require('../../extension-support/block-type');
const ArgumentType = require('../../extension-support/argument-type');
// const Cast = require('../../util/cast');

/**
 * Class for PostLit blocks
 * @constructor
 */
class jwPostLit {
    constructor(runtime) {
        /**
         * The runtime instantiating this block package.
         * @type {Runtime}
         */
        this.runtime = runtime;
    }

    token = ''

    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo() {
        return {
            id: 'jwPostLit',
            name: 'postLit',
            //blockIconURI: blockIconURI,
            color1: '#14f789',
            color2: '#0fd173',
            blocks: [
                {
                    opcode: 'signIn',
                    text: formatMessage({
                        id: 'jwPostLit.blocks.signIn',
                        default: 'sign in [USER] [PASS]',
                        description: 'Sign in to postLit.'
                    }),
                    disableMonitor: true,
                    blockType: BlockType.COMMAND,
                    arguments: {
                        USER: {
                            type: ArgumentType.STRING,
                            defaultValue: "username"
                        },
                        PASS: {
                            type: ArgumentType.STRING,
                            defaultValue: "password"
                        }
                    }
                }
            ]
        };
    }

    signIn(args, util) {
        const username = String(args.USER)
        const password = String(args.PASS)
        var response = await fetch("https://postlit.dev/signin/", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        var data = await response.json()
        if (data.success) {
            this.token = data.token
            console.log("zamn it signed in pretty cool, heres the token: " + this.token)
        }
    }
}

module.exports = jwPostLit;
