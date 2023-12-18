<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import Menu from './components/Menu.vue'
import Input from './components/Input.vue'
import { generateTree } from './lib/generate-tree'
import { parseInput } from './lib/parse-input'
import { defaultInput } from './lib/default-input'

const input = ref(defaultInput)
const tree = ref()
const generateTreeOptions = reactive({
  charset: 'utf-8',
  rootDot: false,
})

watch(input, async (newInput) => {
  tree.value = generateTree(parseInput(newInput), generateTreeOptions)
}, { immediate: true })

watch(generateTreeOptions, (newOptions) => {
  tree.value = generateTree(parseInput(input.value), newOptions )
})

const treeCopied = ref(false)
const copyTree = () => {
  let tree = document.getElementById('tree-output')?.innerHTML
  navigator.clipboard.writeText(tree)
  treeCopied.value = true
  setTimeout( () => treeCopied.value = false, 3000 )
}
</script>

<template>
  <Menu 
    v-model:charset="generateTreeOptions.charset" 
    v-model:root-dot="generateTreeOptions.rootDot"  
  />

  <section class="section">
    <div class="columns">

      <div class="column">
        <Input v-model="input" />
      </div>

      <div class="column">
        <div class="box tree is-size-4">
          <span class="icon-text is-pulled-right" :class="{'has-text-success': treeCopied}">
            <span class="is-size-7 is-success" v-show="treeCopied">Tree copied to clipboard!</span>
            <span class="icon is-clickable" @click="copyTree">
              <ion-icon name="copy-outline"></ion-icon>
            </span>
          </span>

          <div id="tree-output">
            {{ tree }}
          </div>
        </div>
      </div>

    </div>
  </section>

  <footer class="footer level">
    <div class="level-item has-text-centered">
      <a href="https://gitlab.com/nfriend/tree-online">Based on Tree Online</a>
      <figure class="image is-32x32">
        <img src="./assets/gitlab-logo.svg">
      </figure>
    </div>
  </footer>
</template>

<style>
  section, .columns, .textarea, .tree {
    height: 100%;
  }

  .textarea:not([rows]) {
    resize: none;
    max-height: none;
  }

  .tree {
    white-space: pre;
    background-color: gainsboro;
  }
</style>
