<template>
  <nav class="navbar" role="navigation">
    <div class="navbar-menu">
      <div class="navbar-start">
        <div class="navbar-item title">
          Directory Tree Formatter
        </div>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="field">
            <input id="encodingSwitch" type="checkbox" name="encodingSwitch" class="switch is-rounded is-info"
              :value="charset"
              @input="$emit('update:charset', $event.target.checked ? 'utf-8' : 'ascii')"
              checked>
            <label for="encodingSwitch">UTF-8</label>
          </div>
        </div>

        <div class="navbar-item">
          <div class="field">
            <input id="showRootSwitch" type="checkbox" name="showRootSwitch" class="switch is-rounded is-info" 
              :value="rootDot"
              @input="$emit('update:rootDot', $event.target.checked)" >
            <label for="showRootSwitch">Show root dot</label>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
  defineProps({
    charset: String, 
    rootDot: Boolean,
  })
  defineEmits(['update:charset', 'update:rootDot'])
</script>

<style>

</style>