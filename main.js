import { getWordsOflength } from "./wordList.js";
import { solveChain } from "./chainSolver.js";

const startWord = "skull";
const endWord = "mails";
const words = getWordsOflength(startWord.length);

function getLetterDifference(word1, word2) {
    let difference = 0;

    for (let i = 0; i < Math.max(word1.length, word2.length); i++) {
        if (word1[i] === word2[i]) continue;

        difference++;
    }

    return difference;
}

function connectorFunc(a, b) {
    return getLetterDifference(a, b) === 1;
}

function randomChoice(array) {
    return array[Math.floor(Math.random() * array.length)];
}

const chain = solveChain(words, connectorFunc, startWord, endWord);

console.log(chain);
