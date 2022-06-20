import { Decoration, DecorationSet } from "prosemirror-view";
import { Plugin } from "prosemirror-state";
import { Extension } from "@tiptap/core";

import { versions, currentVersion } from "$stores/versions";
import { get } from "svelte/store";
import { docSentencesData, READABILITY_LEVELS } from "$utils/text-stats";

function lint(doc) {
  const ver = get(versions);
  const currentVer = get(currentVersion);
  const sentences = docSentencesData(doc);

  ver[currentVer].sentences = sentences;
  versions.set(ver);

  return sentences;
}

function lintDeco(doc) {
  let decos = [];
  lint(doc).forEach((sent) => {
    if (sent.readability >= READABILITY_LEVELS.NORMAL) {
      const level =
        sent.readability <= READABILITY_LEVELS.HARD
          ? "readability-hard"
          : "readability-very-hard";
      decos.push(Decoration.inline(sent.from, sent.to, { class: level }));
    }
  });
  return DecorationSet.create(doc, decos);
}

// Plugin
const lintPlugin = new Plugin({
  state: {
    init(_, { doc }) {
      return lintDeco(doc);
    },
    apply(tr, old) {
      return tr.docChanged ? lintDeco(tr.doc) : old;
    },
  },
  props: {
    decorations(state) {
      return this.getState(state);
    },
  },
});

// Tiptap wrapper
export const Linter = Extension.create({
  addProseMirrorPlugins() {
    return [lintPlugin];
  },
});
