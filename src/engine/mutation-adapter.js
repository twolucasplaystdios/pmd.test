const decodeHtml = require('decode-html');

/**
 * Convert a part of a mutation DOM to a mutation VM object, recursively.
 * @param {object} dom DOM object for mutation tag.
 * @return {object} Object representing useful parts of this mutation.
 */
const mutatorTagToObject = function (dom) {
    const obj = Object.create(null);
    obj.tagName = dom.tagName;
    obj.children = [];
    for (const prop in dom.attributes) {
        const attrib = dom.attributes[prop]
        if (attrib.name === 'xmlns') continue;
        obj[prop] = attrib.value;
        // Note: the capitalization of block info in the following lines is important.
        // The lowercase is read in from xml which normalizes case. The VM uses camel case everywhere else.
        // your mom uses camal case everywhere else
        if (attrib.name === 'blockinfo') {
            obj.blockInfo = JSON.parse(obj.blockinfo);
            delete obj.blockinfo;
        }
    }
    for (let i = 0; i < dom.children.length; i++) {
        obj.children.push(
            mutatorTagToObject(dom.children[i])
        );
    }
    return obj;
};

/**
 * Adapter between mutator XML or DOM and block representation which can be
 * used by the Scratch runtime.
 * @param {(object|string)} mutation Mutation XML string or DOM.
 * @return {object} Object representing the mutation.
 */
const mutationAdpater = function (mutation) {
    let mutationParsed;
    // Check if the mutation is already parsed; if not, parse it.
    if (typeof mutation === 'object') {
        mutationParsed = mutation;
    } else {
        const parser = new DOMParser();
        const doc = parser.parseFromString(mutation, "application/xml");
        mutationParsed = doc;
    }
    return mutatorTagToObject(mutationParsed);
};

module.exports = mutationAdpater;
