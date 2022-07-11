<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
html {
  background: #eef2f5;
  //height: 100vh;
}

body {
  min-height: 100vh;
  //height: 100%;
  //width: 100%;
}

#app {
  margin: 0 auto;
  height: 100%;
  max-width: 1240px;
}
</style>
