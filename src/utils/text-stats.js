import rs from "text-readability";

const WORDS_PER_MINUTE = 200;

export const getWordsCount = function (text) {
  return rs.lexiconCount(text, true);
};

export const getReadingTime = function (words) {
  const minutes = words / WORDS_PER_MINUTE;

  return minutes;
};

export const getARI = function (text) {
  return rs.automatedReadabilityIndex(text);
};
