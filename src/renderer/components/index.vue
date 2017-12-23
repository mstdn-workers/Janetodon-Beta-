<template>
  <div>
    <div class="main">
      <h1>Hello electron-vue. My name is {{ name }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: 'sa2taka'
    }
  },
  name: 'index'
}
</script>

<style>
html, body, main {
  height: 100%;
}
main {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
