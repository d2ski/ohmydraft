import { derived, writable } from "svelte/store";

export const versions = writable([
  {
    type: "doc",
    updated: Date.now(),
    content: [
      {
        type: "heading",
        attrs: {
          level: 2,
        },
        content: [
          {
            type: "text",
            text: "What is this?",
          },
        ],
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text:
              "'Oh my draft' editor is intended for writing and comparing different versions of text drafts for their readability. It was inspired by Hemingway Editor app. ",
          },
        ],
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text:
              "Readability is calculated based on Automated Readability Index per each sentence and per each draft version. Hard readability sentences are underlined in grey, very hard — in red. The same way hard readability versions are marked in grey, very hard — in red.",
          },
        ],
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text:
              "Sidebar on the left is used for adding, deleting (right-click) and switching between different draft versions. ",
          },
        ],
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "The application is still in beta testing.",
          },
        ],
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text:
              "If you have any questions, please email to dmitrii@ohmychart.com",
          },
        ],
      },
    ],
    words: 101,
    sentences: [
      {
        from: 1,
        to: 14,
        readability: 0,
      },
      {
        from: 16,
        to: 131,
        readability: 13,
      },
      {
        from: 132,
        to: 172,
        readability: 5,
      },
      {
        from: 175,
        to: 283,
        readability: 14,
      },
      {
        from: 284,
        to: 354,
        readability: 9,
      },
      {
        from: 355,
        to: 433,
        readability: 7,
      },
      {
        from: 435,
        to: 545,
        readability: 15,
      },
      {
        from: 548,
        to: 589,
        readability: 6,
      },
      {
        from: 591,
        to: 656,
        readability: 12,
      },
    ],
    readTime: 0.505,
    readability: 10,
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
