import rs from "text-readability";

const WORDS_PER_MINUTE = 200;

export const getWordsCount = function (text) {
  return rs.lexiconCount(text, true);
};

export const getSentenceCount = function (text) {
  let ignoreCount = 0;
  let sentences = text.split(/[\.\!]+(?!\d)\s*|\n+\s*/);
  for (let sentence of sentences) {
    if (rs.lexiconCount(sentence) <= 2) ignoreCount += 1;
  }
  const validSentences = sentences.length - ignoreCount;
  return validSentences > 1 ? validSentences : 1;
};

export const getReadingTime = function (words) {
  const minutes = words / WORDS_PER_MINUTE;

  return minutes;
};

export const getARI = function (text) {
  const characters = rs.charCount(text);
  const words = rs.lexiconCount(text);
  const sentences = getSentenceCount(text);

  const averageCharacterPerWord = characters / words;
  const averageWordPerSentence = words / sentences;
  const readability =
    4.71 * Math.legacyRound(averageCharacterPerWord, 2) +
    0.5 * Math.legacyRound(averageWordPerSentence, 2) -
    21.43;
  const returnVal = Math.legacyRound(readability, 0);

  return !isNaN(returnVal) && returnVal > 0 ? returnVal : 0;
};
