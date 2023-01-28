class extensionsPatch {
    /**
     * constructor
     * @param {Runtime} runtime runtime
     */
    constructor (runtime) {
        this.runtime = runtime;
        this.extensions = {};
    }

    /**
     * replaces a core extension with a external extension for the loader
     * @param {String} id extension id
     * @param {String} url new extension url
     * @param {Object} extensions sb3 loader extension object
     */
    basicPatch (id, url, newId, extensions) {
        extensions.extensionURLs.set(newId, url);
        if (!id === newId) {
            extensions.extensionIDs.delete(id);
            extensions.extensionIDs.add(newId);
        }
        // patch to fix added urls not loading
        if (this.runtime.extensionManager.isExtensionLoaded(newId)) return;
        this.runtime.extensionManager.loadExtensionURL(url);
    }

    /**
     * runs the patch for an extension
     * @param {String} id the extension to patch
     * @param {Object} extensions the extensions object
     * @param {Blocks} blocks all of the blocks
     */
    runExtensionPatch (id, extensions, object) {
        const patch = this.extensions[id];
        if (typeof patch === 'object') {
            this.basicPatch(patch.id, patch.url, patch.newId, extensions);
            return;
        }
        patch(extensions, object, this.runtime);
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
