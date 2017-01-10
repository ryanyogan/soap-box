<template>
  <post-view
    :content="content"
    :title="title"
    :date="date"
  ></post-view>
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

  data({ isClient, params }) {
    return api.getDetail(isClient, params.hash)
      .then((data) => {
        const content = fm(data);
        return {
          title: content.attributes.title,
          content: content.body,
          date: content.attributes.date,
        }
      });
  },

  head() {
    return {
      title: `${this.title} - ${conf.blogTitle}`,
    };
  },
};
</script>
