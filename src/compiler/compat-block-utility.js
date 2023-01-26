const BlockUtility = require('../engine/block-utility');

class CompatibilityLayerBlockUtility extends BlockUtility {
    constructor () {
        super();

        /**
         * @type {string|null}
         */
        this._fakeBlockId = null;
    }

    // Branching operations are not supported.
    startBranch () {
        throw new Error('startBranch is not supported by this BlockUtility');
    }

    /**
     * runs any given procedure
     * @param {String} proccode the procedure to start
     * @param {Object} args 
     * @returns the return value of the procedure, returns undefined if statement
     */
    startProcedure (proccode, args) {
        if (!args)
            return this.thread.procedures[proccode]();
        if (!(typeof args === 'object'))
            throw new Error(`procedure arguments can only be of type undefined|object. instead got "${typeof args}"`);
        let evaluate = `this.thread.procedures[proccode](`;
        const inputs = [];
        for (const arg in args) {
            inputs.push(String(args[arg]));
        }
        evaluate += `${inputs.join(',')})`;
        return new Function(`Procedure ${proccode}`, evaluate)();
    }

    // Parameters are not used by compiled scripts.
    initParams () {
        throw new Error('initParams is not supported by this BlockUtility');
    }
    pushParam () {
        throw new Error('pushParam is not supported by this BlockUtility');
    }
    getParam () {
        throw new Error('getParam is not supported by this BlockUtility');
    }

    init (thread, fakeBlockId) {
        this.thread = thread;
        this.sequencer = thread.target.runtime.sequencer;
        thread.stack[0] = fakeBlockId;
    }
}

// Export a single instance to be reused.
module.exports = new CompatibilityLayerBlockUtility();
