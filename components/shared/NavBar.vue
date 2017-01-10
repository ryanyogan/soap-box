<template>
  <header class="header">
    <nuxt-link to="/">{{title}}</nuxt-link>
    <div style="clear: both;"></div>
    <input class="search-bar" placeholder="Search..."
      ref="searchBar" v-model="keyword"
      @click="selectSearchText"
      @keyup.esc="resetSearch"
    />
  </header>
</template>

<script>
import conf from '../../config.json';

export default {
  name: 'navbar',

  data() {
    return {
      title: conf.blogTitle,
      keyword: '',
    };
  },

  methods: {
    resetSearch() {
      this.keyword = '';
      this.$refs.searchBar.blur();
    },
    selectSearchText() {
      this.$refs.searchBar.select();
    },
  },

  watch: {
    keyword() {
      if (this.keyword) {
        this.$router.push({ name: 'index', query: { keyword: this.keyword } });
      } else {
        this.$router.push({ name: 'index' });
      }
    },
  },
};
</script>
