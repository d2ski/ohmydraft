<script>
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import Highlight from '@tiptap/extension-highlight';
	import { versions, currentVersion, editorContent } from '$stores/versions';
	import { getWordsCount, getCharsCount, getReadingTime, calcARI } from '$utils/text-stats';

	import { Linter } from '$utils/linter.js';

	let element;

	onMount(() => {
		$editorContent = new Editor({
			element: element,
			editorProps: {
				attributes: {
					class: 'editor__content'
				}
			},
			extensions: [
				StarterKit,
				Highlight.configure({
					multicolor: true
				}),
				Linter
			],
			content: $versions[$currentVersion],
			onTransaction: () => {
				// force re-render so `editor.isActive` works as expected
				$editorContent = $editorContent;
			},
			onUpdate: ({ editor }) => {
				const sentences = $versions[$currentVersion].sentences;
				const json = editor.getJSON();
				const text = editor.getText();
				const words = getWordsCount(text);
				const chars = getCharsCount(text);
				const readTime = getReadingTime(words);
				const updated = Date.now();
				const readability = calcARI(chars, words, sentences.length);

				$versions[$currentVersion] = {
					...json,
					words,
					sentences,
					readTime,
					readability,
					updated
				};

				console.log($versions[$currentVersion])
			}
		});
	});

	onDestroy(() => {
		if ($editorContent) {
			$editorContent.destroy();
		}
	});
</script>

<div bind:this={element} spellcheck="true" />
