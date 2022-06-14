<script>
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
  import Highlight from '@tiptap/extension-highlight'
	import { versions, currentVersion, editorContent } from '$stores/content.js';

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
      onUpdate: ({editor}) => {
        const json = editor.getJSON();
        $versions[$currentVersion] = json;
      }
		});
	});

	onDestroy(() => {
		if ($editorContent) {
			$editorContent.destroy();
		}
	});
</script>

<div bind:this={element} spellcheck="true"/>
