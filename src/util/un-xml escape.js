/**
 * Escape a string to be safe to use in XML content.
 * CC-BY-SA: hgoebl
 * https://stackoverflow.com/questions/7918868/
 * how-to-escape-xml-entities-in-javascript
 * @param {!string | !Array.<string>} unsafe Unsafe string.
 * @return {string} XML-escaped string, for use within an XML tag.
 */
const xmlEscape = function (safe) {
    return String(safe).replace(/&lt;|&gt;|&amp;|&apos;|&quot;/g, c => {
        switch (c) {
        case '&lt;': return '<';
        case '&gt;': return '>';
        case '&amp;': return '&';
        case '&apos;': return '\'';
        case '&quot;': return '"';
        }
    });
};

module.exports = xmlEscape;
