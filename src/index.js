// if (global && !global.location) global.location = {href: 'http://localhost'};
// if (!location.search) location.search = '';

const VirtualMachine = require('./virtual-machine');
// if (typeof window !== 'undefined') {
//     const returnFalseDebugger = (line, ...args) => {
//         console.log("debugger at", line);
//         console.log(args);
//         debugger;
//         return false;
//     }
//     const isWebpack = (code) => {
//         let check = String(code).replace(/[\t\r; ]*/gmi, "");
//         if (!check.startsWith("module.exports=")) {
//             check = "module.exports=" + check;
//         }

//         const split = check.split("\n");
//         if (split.length > 1) {
//             for (let i = 0; i < split.length; i++) {
//                 if (i == 0) continue;
//                 const line = split[i];
//                 if (line.replace(/[\t\r; ]/gmi, "") !== "") {
//                     if (!line.startsWith("//")) return returnFalseDebugger(21, line);
//                 }
//             }
//         }
        
//         const line = String(split[0]).replace(/\/\*[^*]*\*\//gmi, "");
//         if (!line.startsWith("module.exports=__webpack_require__(")) return returnFalseDebugger(27, line);
//         if (!line.endsWith(")")) return returnFalseDebugger(28, line);
//         const quotationRegexUsed = line.includes("'") ? /'/gmi : /"/gmi;
//         const quotationUsed = line.includes("'") ? "'" : '"';
//         const matches = line.match(quotationRegexUsed);
//         if (!matches) return returnFalseDebugger(32, line);
//         if (matches.length !== 2) return returnFalseDebugger(33, line, matches);

//         if (!line.startsWith("module.exports=__webpack_require__(" + quotationUsed)) return returnFalseDebugger(35, line);
//         if (!line.endsWith(quotationUsed + ")")) return returnFalseDebugger(36, line);

//         return true;
//     }
//     const oldEval = window.eval;
//     window.eval = (c) => {
//         // idk
//         if (c === "require('buffer').Buffer") {
//             return oldEval(c);
//         }
//         // support webpack shtuff
//         if (isWebpack(c)) {
//             return oldEval(c);
//         }
//         console.warn("eval is no longer usable in PenguinMod. Please do not use it.");
//         console.warn(c);
//         return;
//     }
// }

module.exports = VirtualMachine;
