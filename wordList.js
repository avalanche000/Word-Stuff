const wordListLink = "https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt";

async function loadWordList() {
    const text = await fetch(wordListLink, { headers: { "Content-Type": "application/json" } }).then(res => res.text());

    return text.split("\r\n");
}

const wordList = await loadWordList();

function getWordsOflength(length) {
    return wordList.filter(word => word.length === length);
}

export { loadWordList, getWordsOflength };
