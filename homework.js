let dna = require("./brca1.json");

/////////////////////// SENTENCE CHECKER //////////////////////////
const sentenceChecker = (sentence, letter) => {
    let sanitizedSentence = sentence.replaceAll(".", "").replaceAll(",", "").toLowerCase();
    let arr = sanitizedSentence.split(" ");
    console.log(`There is ${arr.length} words in the sentence`);

    let smallLetter = letter.toLowerCase();
    let counter = 0;
    let letterCounter = 0;
    for (let i = 0; i < sanitizedSentence.length; i++) {
        if (sanitizedSentence[i] === ' ') {
            counter++;
        }
        if (sanitizedSentence[i] === smallLetter) {
            letterCounter++;
        }
    }
    counter++;

    // console.log(`There is ${counter} words in the sentence`);
    console.log(`There is ${letterCounter} letters "${smallLetter}" in the sentence`);

    let obj = {}
    for (let word of arr) {
        let len = word.length;
        if (len in obj) {
            obj[len].push(word)
        } else {
            obj[len] = [word];
        }
    }

    let maxLen = -Infinity;
    for (let key in obj) {
        let val = parseInt(key);
        if (val > maxLen) {
            maxLen = val;
        }
    }
    let maxArr = obj[maxLen];

    console.log(`Length of the longest word is: ${maxLen}.`);
    console.log(maxArr.length > 1 ? `The longest words are: ${maxArr.join(', ')}.` : `The longest word is: ${maxArr.join('')}.`);
}

/////////////////////// GENE FINDER //////////////////////////
const findAllGenes = dna => {
    let START_CODON = "atg";
    let END_CODON = "taa";

    let startIndex = dna.indexOf(START_CODON);
    let endIndex = startIndex;
    let counter = 0;
    let obj = {};

    while (startIndex != -1) {
        endIndex = dna.indexOf(END_CODON, endIndex + 3);

        if (endIndex === -1) {
            startIndex = dna.indexOf(START_CODON, startIndex + 3);
            endIndex = startIndex;
            continue;
        }

        let geneCandidate = dna.slice(startIndex, endIndex + 3);

        if (geneCandidate.length % 3 === 0) {
            let len = geneCandidate.length;
            counter++;
            if (len in obj) {
                obj[len].push(geneCandidate)
            } else {
                obj[len] = [geneCandidate]
            }
            dna = dna.slice(endIndex + 3);
            startIndex = dna.indexOf(START_CODON);
            endIndex = startIndex;
        }

    }
    let maxLen = -Infinity;
    let minLen = Infinity;
    for (let key in obj) {
        let val = parseInt(key);
        if (val > maxLen) {
            maxLen = val;
        }
        if (val < minLen) {
            minLen = val;
        }
    }

    console.log(`Found genes: ${counter}`);
    console.log(`Length of the longest gene: ${maxLen}`);
    console.log(`Length of the shortest gene: ${minLen}`);
}

/////////////////////// MARIO TOWER //////////////////////////
const marioTower = height => {

    for (let i = 1; i <= height; i++) {
        let hashesCount = i;
        let spacesCount = height - i;

        let hashes = "";
        for (let j = 0; j < hashesCount; j++) {
            hashes = hashes + "#";
        }

        let spaces = "";
        for (let k = 0; k < spacesCount; k++) {
            spaces = spaces + " ";
        }
        console.log(spaces + hashes + " " + hashes);
    }
}

/////////////////////// CREDIT CARD VALIDATOR //////////////////////////
const validateCard = cardNumber => {

    if (!luhnCheck(cardNumber)) {
        console.log("INVALID");
        return;
    }

    if ((cardNumber.startsWith("34") || cardNumber.startsWith("37")) && cardNumber.length === 15) {
        console.log("American Express");
    } else if ((cardNumber.startsWith("51")
        || cardNumber.startsWith("52")
        || cardNumber.startsWith("53")
        || cardNumber.startsWith("54")
        || cardNumber.startsWith("55"))
        && cardNumber.length === 16) {
        console.log("Master Card");
    } else if ((cardNumber.startsWith("4")) && (cardNumber.length === 16 || cardNumber.length === 13)) {
        console.log("Visa");
    } else {
        console.log("INVALID");
    }
}

const luhnCheck = value => {
    if (/[^0-9-\s]+/.test(value)) return false;

    var nCheck = 0, nDigit = 0, bEven = false;
    value = value.replace(/\D/g, "");

    for (var n = value.length - 1; n >= 0; n--) {
        var cDigit = value.charAt(n),
            nDigit = parseInt(cDigit, 10);

        if (bEven) {
            if ((nDigit *= 2) > 9) nDigit -= 9;
        }

        nCheck += nDigit;
        bEven = !bEven;
    }
    return (nCheck % 10) == 0;
}

/////////////////////////////////////////////////////////////////

let example1 = "This is an example.";
let example2 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

sentenceChecker(example1, "A");
sentenceChecker(example2, "A");

// findAllGenes(dna);

// marioTower(8);

// const valid1 = "5597507644910558"; // valid Mastercard
// const valid2 = "376462280921451";  // valid American Express
// const valid3 = "4916615639346972"; // valid Visa

// const invalid1 = "4532778771091795"; // invalid
// const invalid2 = "5795593392134643"; // invalid

// validateCard(valid1);
// validateCard(valid2);
// validateCard(valid3);

// validateCard(invalid1);
// validateCard(invalid2);