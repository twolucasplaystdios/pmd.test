const formatMessage = require('format-message');
const BlockType = require('../../extension-support/block-type');
const ArgumentType = require('../../extension-support/argument-type');
/**
 * Class for perlin noise extension.
 * @constructor
 */

// noise generation code from p5.js

class iygPerlin {
    constructor(runtime) {
        console.log("perlin noise extension loading oh ma gah");
        /**
         * The runtime instantiating this block package.
         * @type {Runtime}
         */
        this.runtime = runtime;
        this.noise;
    }

    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo() {
        return {
            id: 'iygPerlin',
            name: 'Perlin Noise',
            color1: '#525252',
            color2: '#636363',
            blocks: [
                {
                    opcode: 'GenerateNoise',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'iygPerlin.GenerateNoise',
                        default: 'Generate noise with seed [SEED], octave [OCTAVE], width [width], height [height]',
                        description: 'Generate noise with a specified seed and size.'
                    }),
                    arguments: {
                        SEED: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 12345
                        },
                        OCTAVE: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 4
                        },
                        SIZE: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 256
                        }
                    }
                },
                {
                    opcode: 'GetNoise',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'iygPerlin.GetNoise',
                        default: 'Get noise at x [X] y [Y]',
                        description: 'Get noise at a specified x and y.'
                    }),
                    arguments: {
                        X: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0
                        },
                        Y: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0
                        }
                    }
                }
            ]
        };
    }

    GenerateNoise(args, util) {
        let seed = args.SEED;
        let octave = args.OCTAVE;
        let size = args.SIZE;
        const lcg = (() => {
            // Set to values from http://en.wikipedia.org/wiki/Numerical_Recipes
            // m is basically chosen to be large (as it is the max period)
            // and for its relationships to a and c
            const m = 4294967296;
            // a - 1 should be divisible by m's prime factors
            const a = 1664525;
            // c and m should be co-prime
            const c = 1013904223;
            let seed, z;
            return {
              setSeed(val) {
                // pick a random seed if val is undefined or null
                // the >>> 0 casts the seed to an unsigned 32-bit integer
                z = seed = (val == null ? Math.random() * m : val) >>> 0;
              },
              getSeed() {
                return seed;
              },
              rand() {
                // define the recurrence relationship
                z = (a * z + c) % m;
                // return a float in [0, 1)
                // if z = m then z / m = 0 therefore (z % m) / m < 1 always
                return z / m;
              }
            };
          })();
        
          lcg.setSeed(seed);
          this.noise = new Array(size);
          for (let i = 0; i < size; i++) {
            this.noise[i] = lcg.rand();
          }

    }

    GetNoise(args, util) {
        if (!this.noise || isNaN(args.X) || isNaN(args.Y)) {
            return 0;
        }
        let x = args.X;
        let y = args.Y;
        console.log(this.noise, x, y);
        return this.noise[x][y];
    }
}

module.exports = iygPerlin;