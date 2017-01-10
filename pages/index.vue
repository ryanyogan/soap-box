<template>
  <post-list
    v-if="posts"
    :posts="posts"
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

  data({ isClient, params }) {
    return api.getList(isClient)
      .then(posts => ({ posts }))
      .catch(err => console.log(err));
  },
};
</script>
