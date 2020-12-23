<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import { renderer } from 'electron-dev-console'
  export default {
    name: 'time-management',
    mounted () {
      renderer.init()
    }
  }
</script>

<style>
  /* CSS */
</style>
