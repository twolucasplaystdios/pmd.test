const transportExtension = (id, url, extensions) => {
    extensions.extensionURLs.set(id, url);
    extensions.extensionIDs.remove(id);
};

const extensions = {
    "griffpatch": extensions => transportExtension("griffpatch", 'https://extensions.turbowarp.org/box2d.js', extensions),
    "cloudlink": extensions => transportExtension("cloudlink", 'https://extensions.turbowarp.org/cloudlink.js', extensions)
};

module.exports = extensions;
