<template>
  <div id="app">
    <soon-space-container />
  </div>
</template>

<script>

export default {
  name: 'app',
  mounted() {
    // sceneReady
    this.$vse.sceneReady()
      .then(res => {
        console.log('sceneReady', res) // sceneReady true
      })

    // cameraChanged
    this.$vse.$on('cameraChanged', res => {
        console.log('cameraChanged', res) // cameraChanged true
      })

  }
}
</script>

<style>
html,
body,
#app {
  margin: 0;
  width: 100%;
  height: 100%;
}
</style>
