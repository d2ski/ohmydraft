<script>
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import Highlight from '@tiptap/extension-highlight';
	import { versions, currentVersion, editorContent } from '$stores/versions';
	import { getWordsCount, getSentenceCount, getReadingTime, getARI } from '$utils/text-stats';

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
				})
			],
			content: $versions[$currentVersion],
			onTransaction: () => {
				// force re-render so `editor.isActive` works as expected
				$editorContent = $editorContent;
			},
			onUpdate: ({ editor }) => {
				const json = editor.getJSON();
				const text = editor.getText()
				const words = getWordsCount(text);
				const sentences = getSentenceCount(text);
				const readTime = getReadingTime(words);
				const readability = getARI(text);
				const updated = Date.now();
				$versions[$currentVersion] = {
					...json,
					words,
					sentences,
					readTime,
					readability,
					updated
				};
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
