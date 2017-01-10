<template>
  <div id="app">
    <nav-bar></nav-bar>
    <nuxt />
  </div>
</template>

<script>
import '../utils/init';

import NavBar from '~components/shared/NavBar';

export default {
  name: 'default',

  components: {
    NavBar,
  },
};
</script>
