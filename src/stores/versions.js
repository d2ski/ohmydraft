import { derived, writable } from "svelte/store";

export const versions = writable([
  {
    type: "doc",
    updated: Date.now(),
    sentences: [{from: 0, to: 0}],
    content: [
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text:
              "",
          },
        ],
      },
    ],
  },
]);

export const currentVersion = writable(0);

export const versionsTimeExtent = derived(versions, ($versions) => {
  const times = $versions.map((v) => v.updated);
  return [Math.min(...times), Math.max(...times)];
});

export const versionsReadabilityExtent = derived(versions, ($versions) => {
  const scores = $versions.map((v) => v.readability);
  return [0, Math.max(...scores)];
});

export const versionsWordsExtent = derived(versions, ($versions) => {
  const words = $versions.map((v) => v.words);
  return [0, Math.max(...words)];
});

export const editorContent = writable();
