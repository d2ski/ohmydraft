import rs from "text-readability";
import { versions, currentVersion } from "$stores/versions";
import { get } from "svelte/store";

const WORDS_PER_MINUTE = 200;
export const SENTENCE_SPLIT = /[\.\!]+(?!\d)\s*|\n+\s*/;
export const SENTENCE_MATCH = /[^.!?\s][^.!?\n]*(?:[.!?](?!['"]?\s|$)[^.!?]*)*[.!?]?['"]?(?=\s|$)/g;

export const getWordsCount = function (text) {
  return rs.lexiconCount(text, true);
};

export const getCharsCount = function (text) {
  return rs.charCount(text);
}

export const getSentenceCount = function () {
  const ver = get(versions);
  const currentVer = get(currentVersion);

  return ver[currentVer].sentences.length;
};

export const getReadingTime = function (words) {
  const minutes = words / WORDS_PER_MINUTE;

  return minutes;
};

export const calcARI = function (characters, words, sentences) {
  const averageCharacterPerWord = characters / words;
  const averageWordPerSentence = words / sentences;
  const readability =
    4.71 * Math.legacyRound(averageCharacterPerWord, 2) +
    0.5 * Math.legacyRound(averageWordPerSentence, 2) -
    21.43;
  const returnVal = Math.legacyRound(readability, 0);

  return !isNaN(returnVal) && returnVal > 0 ? returnVal : 0;
};

export const getARI = function (text, isSentence = false) {
  console.log("getARI");
  const characters = rs.charCount(text);
  const words = rs.lexiconCount(text);
  const sentences = isSentence ? 1 : getSentenceCount();

  const averageCharacterPerWord = characters / words;
  const averageWordPerSentence = words / sentences;
  const readability =
    4.71 * Math.legacyRound(averageCharacterPerWord, 2) +
    0.5 * Math.legacyRound(averageWordPerSentence, 2) -
    21.43;
  const returnVal = Math.legacyRound(readability, 0);

  return !isNaN(returnVal) && returnVal > 0 ? returnVal : 0;
};

export const docSentencesData = function (doc) {
  let result = [];

  function record(from, to, readability) {
    result.push({ from, to, readability });
  }

  doc.descendants((node, pos) => {
    if (node.isText) {
      [...node.text.matchAll(SENTENCE_MATCH)].forEach((match) => {
        const posFrom = pos + match.index;
        const posTo = posFrom + match[0].length;
        const sentence = match[0];
        const readability = getARI(sentence, true);
        record(posFrom, posTo, readability);
      });
    }
  });

  return result;
};
