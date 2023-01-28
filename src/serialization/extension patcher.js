class extensionsPatch {
    constructor (vm) {
        this.vm = vm;
        this.extensions = {};
    }
    basicPatch (id, url, extensions) {
        extensions.extensionURLs.set(id, url);
        extensions.extensionIDs.delete(id);
        // patch to fix added urls not loading(?)
        this.vm.extensionManager.loadExtensionURL(url);
    }

    /**
     * runs the patch for an extension
     * @param {String} id the extension to patch
     * @param {Object} extensions the extensions object
     * @param {Blocks} blocks all of the blocks
     */
    runExtensionPatch (id, extensions, blocks) {
        // blocks is still included for future proofing even though its not used
        this.extensions[id](extensions, blocks, this.vm);
    }

    /**
     * registers extension patches to the patcher
     * @param {Object} list a list of patches to register
     */
    registerExtensions (list) {
        this.extensions = Object.assign(this.extensions, list);
    }

    /**
     * gets if a patch exists for an extension
     * @param {String} id the extension id to check
     * @returns {Boolean} if the given extension exists
     */
    patchExists (id) {
        return !!this.extensions[id];
    }
}

module.exports = extensionsPatch;
