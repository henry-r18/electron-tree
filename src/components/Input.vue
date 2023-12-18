<template>
    <textarea id="treeInput" class="textarea is-large has-fixed-size" :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        @keydown="handleTab"
        ></textarea>
</template>

<script setup lang="ts">
    // Make tab key usable in textarea. See @https://stackoverflow.com/a/45396754
    import { handleTab } from '../lib/handle-tab'

    defineProps(['modelValue'])
    defineEmits(['update:modelValue'])
</script>