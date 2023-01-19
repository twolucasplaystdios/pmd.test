const transportExtension = (id, url, extensions) => {
    extensions.extensionURLs.add(url);
    extensions.extensionIDs.remove(id);
};

const extensions = {
    "griffpatch": extensions => transportExtension("griffpatch", 'https://extensions.turbowarp.org/box2d.js', extensions)
};

module.exports = extensions;
