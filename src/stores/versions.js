import { derived, writable } from "svelte/store";

export const versions = writable([
  {
    type: "doc",
    updated: 123456789,
    content: [
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text:
              "На краю дороги стоял дуб. Вероятно, в десять раз старше берез, составлявших лес, он был в десять раз толще, и в два раза выше каждой березы. Это был огромный, в два обхвата дуб, с обломанными, давно, видно, суками и с обломанной корой, заросшей старыми болячками. С огромными своими неуклюже, несимметрично растопыренными корявыми руками и пальцами, он старым, сердитым и презрительным уродом стоял между улыбающимися березами. Только он один не хотел подчиняться обаянию весны и не хотел видеть ни весны, ни солнца.",
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
