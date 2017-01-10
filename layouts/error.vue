<template>
  <div id="app">
    <header class="header">
      <nuxt-link to="/">{{title}}</nuxt-link>
      <div style="clear: both;"></div>
      <h1 class="title">
        {{ error.statusCode }}
      </h1>
    </header>
    <h2 class="info">
      {{ error.message }}
      <nuxt-link class="button" to="/" v-if="error.statusCode === 404">
        Homepage
      </nuxt-link>
    </h2>
  </div>
</template>

<script>
export default {
  props: ['error']
}
</script>

<style scoped>
.title
{
  margin-top: 15px;
  font-size: 5em;
}
.info
{
  font-weight: 300;
  color: #9aabb1;
  margin: 0;
  text-align: center;
}
</style>
