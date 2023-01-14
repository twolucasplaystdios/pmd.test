const Cast = require('../util/cast.js');
const MathUtil = require('../util/math-util.js');

class Scratch3OperatorsBlocks {
    constructor (runtime) {
        /**
         * The runtime instantiating this block package.
         * @type {Runtime}
         */
        this.runtime = runtime;
    }

    /**
     * Retrieve the block primitives implemented by this package.
     * @return {object.<string, Function>} Mapping of opcode to Function.
     */
    getPrimitives () {
        return {
            operator_add: this.add,
            operator_subtract: this.subtract,
            operator_multiply: this.multiply,
            operator_divide: this.divide,
            operator_lt: this.lt,
            operator_equals: this.equals,
            operator_gt: this.gt,
            operator_and: this.and,
            operator_or: this.or,
            operator_not: this.not,
            operator_random: this.random,
            operator_join: this.join,
            operator_letter_of: this.letterOf,
            operator_length: this.length,
            operator_contains: this.contains,
            operator_mod: this.mod,
            operator_round: this.round,
            operator_mathop: this.mathop,
            operator_advlog: this.advlog,
            operator_regexmatch: this.regexmatch,
            operator_replaceAll: this.replaceAll,
            operator_getLettersFromIndexToIndexInText: this.getLettersFromIndexToIndexInText,
            operator_readLineInMultilineText: this.readLineInMultilineText,
            operator_newLine: this.newLine,
            operator_stringify: this.stringify,
            operator_lerpFunc: this.lerpFunc,
            operator_advMath: this.advMath,
            operator_constrainnumber: this.constrainnumber,
            operator_trueBoolean: this.true,
            operator_falseBoolean: this.false,
            operator_randomBoolean: this.randomBoolean,
            operator_indexOfTextInText: this.indexOfTextInText,
        };
    }

    indexOfTextInText(args, util) {
        const lookfor = String(args.TEXT1);
        const searchin = String(args.TEXT2);
        let index = 0;
        if (searchin.includes(lookfor)) {
            index = searchin.indexOf(lookfor) + 1;
        }
        return index;
    }

    true() {return true}
    false() {return false}
    randomBoolean() {return Boolean(Math.round(Math.random()))}

    constrainnumber(args) {
        return Math.min(Math.max(args.min, args.inp), args.max)
    }

    lerpFunc(args, util) {
        const one = isNaN(Number(args.ONE)) ? 0 : Number(args.ONE);
        const two = isNaN(Number(args.TWO)) ? 0 : Number(args.TWO);
        const amount = isNaN(Number(args.AMOUNT)) ? 0 : Number(args.AMOUNT);
        let lerped = one;
        lerped += ((two - one) / (amount / (amount * amount)));
        return lerped;
    }
    advMath(args, util) {
        const one = isNaN(Number(args.ONE)) ? 0 : Number(args.ONE)
        const two = isNaN(Number(args.TWO)) ? 0 : Number(args.TWO)
        const operator = String(args.OPTION)
        switch(operator) {
            case "^": return one ** two
            case "root": return one ** 1/two
            case "log": return Math.log(two) / Math.log(one)
            default: return 0
        }
    }

    stringify(args, util) {return args.ONE}

    newLine() { return "\n" }

    readLineInMultilineText(args, util) {
        const line = (Number(args.LINE) ? Number(args.LINE) : 1) - 1;
        const text = String(args.TEXT);
        const readline = text.split("\n")[line] || "";
        return readline;
    }

    getLettersFromIndexToIndexInText(args, util) {
        const index1 = (Number(args.INDEX1) ? Number(args.INDEX1) : 1) - 1;
        const index2 = (Number(args.INDEX2) ? Number(args.INDEX2) : 1) - 1;
        const string = String(args.TEXT);
        const substring = string.substring(index1, index2);
        return substring;
    }

    replaceAll(args) {
        return args.text.replaceAll(args.term, args.res)
    }

    regexmatch(args) {
        if (!validateRegex(args.reg)) return "[]"
        const regex = new RegExp(args.reg)
        const matches = args.text.match(regex)
        return JSON.stringify(matches ? matches : [])
    }

    add (args) {
        return Cast.toNumber(args.NUM1) + Cast.toNumber(args.NUM2);
    }

    subtract (args) {
        return Cast.toNumber(args.NUM1) - Cast.toNumber(args.NUM2);
    }

    multiply (args) {
        return Cast.toNumber(args.NUM1) * Cast.toNumber(args.NUM2);
    }

    divide (args) {
        return Cast.toNumber(args.NUM1) / Cast.toNumber(args.NUM2);
    }

    lt (args) {
        return Cast.compare(args.OPERAND1, args.OPERAND2) < 0;
    }

    equals (args) {
        return Cast.compare(args.OPERAND1, args.OPERAND2) === 0;
    }

    gt (args) {
        return Cast.compare(args.OPERAND1, args.OPERAND2) > 0;
    }

    and (args) {
        return Cast.toBoolean(args.OPERAND1) && Cast.toBoolean(args.OPERAND2);
    }

    or (args) {
        return Cast.toBoolean(args.OPERAND1) || Cast.toBoolean(args.OPERAND2);
    }

    not (args) {
        return !Cast.toBoolean(args.OPERAND);
    }

    random (args) {
        return this._random(args.FROM, args.TO);
    }
    _random (from, to) { // used by compiler
        const nFrom = Cast.toNumber(from);
        const nTo = Cast.toNumber(to);
        const low = nFrom <= nTo ? nFrom : nTo;
        const high = nFrom <= nTo ? nTo : nFrom;
        if (low === high) return low;
        // If both arguments are ints, truncate the result to an int.
        if (Cast.isInt(from) && Cast.isInt(to)) {
            return low + Math.floor(Math.random() * ((high + 1) - low));
        }
        return (Math.random() * (high - low)) + low;
    }

    join (args) {
        return Cast.toString(args.STRING1) + Cast.toString(args.STRING2);
    }

    letterOf (args) {
        const index = Cast.toNumber(args.LETTER) - 1;
        const str = Cast.toString(args.STRING);
        // Out of bounds?
        if (index < 0 || index >= str.length) {
            return '';
        }
        return str.charAt(index);
    }

    length (args) {
        return Cast.toString(args.STRING).length;
    }

    contains (args) {
        const format = function (string) {
            return Cast.toString(string).toLowerCase();
        };
        return format(args.STRING1).includes(format(args.STRING2));
    }

    mod (args) {
        const n = Cast.toNumber(args.NUM1);
        const modulus = Cast.toNumber(args.NUM2);
        let result = n % modulus;
        // Scratch mod uses floored division instead of truncated division.
        if (result / modulus < 0) result += modulus;
        return result;
    }

    round (args) {
        return Math.round(Cast.toNumber(args.NUM));
    }

    mathop (args) {
        const operator = Cast.toString(args.OPERATOR).toLowerCase();
        const n = Cast.toNumber(args.NUM);
        switch (operator) {
        case 'abs': return Math.abs(n);
        case 'floor': return Math.floor(n);
        case 'ceiling': return Math.ceil(n);
        case 'sqrt': return Math.sqrt(n);
        case 'sin': return Math.round(Math.sin((Math.PI * n) / 180) * 1e10) / 1e10;
        case 'cos': return Math.round(Math.cos((Math.PI * n) / 180) * 1e10) / 1e10;
        case 'tan': return MathUtil.tan(n);
        case 'asin': return (Math.asin(n) * 180) / Math.PI;
        case 'acos': return (Math.acos(n) * 180) / Math.PI;
        case 'atan': return (Math.atan(n) * 180) / Math.PI;
        case 'ln': return Math.log(n);
        case 'log': return Math.log(n) / Math.LN10;
        case 'e ^': return Math.exp(n);
        case '10 ^': return Math.pow(10, n);
        }
        return 0;
    }
    
    advlog (args) {
        return (Math.log(Cast.toNumber(args.NUM2)) / Math.log(Cast.toNumber(args.NUM1)))
    }
}

module.exports = Scratch3OperatorsBlocks;
