<script>
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import Highlight from '@tiptap/extension-highlight';
	import { versions, currentVersion, editorContent } from '$stores/versions';
	import { getWordsCount, getCharsCount, getReadingTime, calcARI, docSentencesData } from '$utils/text-stats';

	import {Linter} from '$utils/linter.js';

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
				Linter,
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
				const chars = getCharsCount(text);
				const readTime = getReadingTime(words);
				const updated = Date.now();

				const sentences = docSentencesData(editor.state.doc);
				const readability = calcARI(chars, words, sentences.length);

				$versions[$currentVersion] = {
					...json,
					words,
					sentences,
					readTime,
					readability,
					updated
				};

				// editor.state.doc.descendants((node, pos, parent, index) => {
				// 	console.log('------')
				// 	console.log('node', node)
				// 	console.log('pos', pos)
				// 	console.log('parent', parent)
				// 	console.log('index', index)
				// });

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
