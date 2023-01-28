class extensionsPatch {
    /**
     * constructor
     * @param {Runtime} runtime runtime
     */
    constructor (runtime) {
        this.runtime = runtime;
        this.extensions = {};
        this.loaded = {};
    }

    /**
     * replaces a core extension with a external extension for the loader
     * @param {String} id extension id
     * @param {String} url new extension url
     * @param {Object} extensions sb3 loader extension object
     */
    basicPatch (id, url, newIDs, extensions) {
        newIDs.forEach(newId => {
            extensions.extensionURLs.set(newId, url);
            if (!id === newId) {
                extensions.extensionIDs.delete(id);
                extensions.extensionIDs.add(newId);
            }
        });
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
            if (!this.loaded[id]) {
                // patch to fix added urls not loading
                this.runtime.extensionManager.loadExtensionURL(patch.url)
                    .then(extensionIDs => {
                        this.loaded[id] = extensionIDs;
                    });
            }
            this.basicPatch(patch.id, patch.url, this.loaded[id], extensions);
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
