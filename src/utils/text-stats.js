import rs from "text-readability";

const WORDS_PER_MINUTE = 200;

export const getWordsCount = function (text) {
  return rs.lexiconCount(text, true);
};

export const getSentenceCount = function (text) {
  // return rs.sentenceCount(text);

  let ignoreCount = 0;
  // let sentences = text.split(/ *[.?!]['")\]]*[ |\n](?=[A-Z])/g)
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
  return Math.ceil(rs.automatedReadabilityIndex(text));
};
