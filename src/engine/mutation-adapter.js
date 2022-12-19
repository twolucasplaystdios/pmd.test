/**
 * Convert a part of a mutation DOM to a mutation VM object, recursively.
 * @param {object} dom DOM object for mutation tag.
 * @return {object} Object representing useful parts of this mutation.
 */
const mutatorTagToObject = function (dom) {
    const obj = Object.create(null);
    if (!typeof dom.tagName === 'string') throw new Error('con not parse dom because it is invalid', dom)
    obj.tagName = dom.tagName;
    obj.children = [];
    try {
        for (let idx = 0; idx < dom.attributes.length; idx++) {
            const attrib = dom.attributes[idx]
            const attribName = attrib.name
            if (attribName === 'xmlns') continue;
            obj[attribName] = attrib.value;
            // Note: the capitalization of block info in the following lines is important.
            // The lowercase is read in from xml which normalizes case. The VM uses camel case everywhere else.
            if (attribName === 'blockinfo') {
                obj.blockInfo = JSON.parse(obj.blockinfo);
                delete obj.blockinfo;
            }
        }
    } catch (err) {
        console.warn('failed to parse mutator attributes: ', err, dom)
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
