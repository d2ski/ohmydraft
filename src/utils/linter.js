import { Decoration, DecorationSet } from "prosemirror-view";
import { Plugin } from "prosemirror-state";
import { Extension } from "@tiptap/core";

import { versions, currentVersion } from "$stores/versions";
import { get } from "svelte/store";

function lint() {
  // let result = [];
  // let docSentences = [];

  // function record(msg, from, to, fix) {
  //   result.push({ msg, from, to, fix });
  // }

  // // For each node in the document
  // doc.descendants((node, pos) => {
  //   if (node.isText) {
  //     [...node.text.matchAll(SENTENCE_MATCH)].forEach((match) => {
  //       // lint
  //       const posFrom = pos + match.index;
  //       const posTo = posFrom + match[0].length;
  //       const sentence = match[0];
  //       record("Message", posFrom, posTo);

  //       // save sentences
  //       docSentences.push({ posFrom, posTo });

  //       console.log(match, posFrom, posTo, sentence);
  //     });
  //   }
  // });

  // sentences.set(docSentences);

  // return result;

  const ver = get(versions);
  const currentVer = get(currentVersion);

  return ver[currentVer].sentences;
}

function lintDeco(doc) {
  let decos = [];
  lint().forEach((sent) => {
    if (sent.readability > 10) {
      decos.push(
        Decoration.inline(sent.from, sent.to, { class: "sentence-highlight" })
      );
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
