<template>
  <post-list
    v-if="posts"
  ></post-list>
</template>

<script>
import api from '../api';
import conf from '../config.json';

import PostList from '~components/posts/PostList';

export default {
  name: 'list-view',

  head: {
    title: conf.blogTitle,
  },

  components: {
    PostList,
  },

  fetch({ isClient, store, params}) {
    return api.getList(isClient)
      .then((res) => {
        store.commit('setPosts', res);
      });
  },

  computed: {
    posts() {
      return this.$store.state.posts;
    },
  },
};
</script>
