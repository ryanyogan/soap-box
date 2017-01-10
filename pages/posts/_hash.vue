<template>
  <post-view></post-view>
</template>

<script>
import fm from 'front-matter';
import api from '../../api';
import conf from '../../config.json';

import PostView from '~components/posts/PostView';

export default {
  name: 'post-hash',

  components: {
    PostView,
  },

  fetch({ isClient, store, params }) {
    return api.getDetail(isClient, params.hash)
      .then((data) => {
        const content = fm(data);
        store.commit('setPost', content);
      });
  },

  head() {
    return {
      title: `${this.title} - ${conf.blogTitle}`,
    };
  },
};
</script>
