import { writable } from "svelte/store";

export const versions = writable([
  {
    content:
      "С 8 июня физлица могут переводить из России на счета за рубеж до 150 тыс. долларов в месяц или эквивалентную сумму в другой валюте. Такую же сумму могут переводить на зарубежные счета нерезиденты — физлица из «дружественных» стран. ",
  },
  {
    content: "second",
  },
]);

export const currentVersion = writable(0);

export const editorContent = writable();