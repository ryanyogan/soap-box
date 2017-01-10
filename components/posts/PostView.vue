<template>
  <section class="post-view">
    <div v-if="!post">Loading...</div>
    <h1 class="post-title">
      {{ post.title }}
      <time
        pubdate="pubdate"
        :datetime="post.date | formatDate"
        :title="post.date | formatDate"
        class="post-date"
      >
        {{ post.date | timeago }}
      </time>
    </h1>
    <article
      v-if="post"
      v-html="htmlFromMarkdown"
    ></article>
  </section>
</template>

<script>
import Vue from 'vue';
import marked from '../../utils/render';

export default {
  name: 'post-view',

  computed: {
    post() {
      const { body, attributes } = this.$store.state.post;
      return {
        title: attributes.title,
        content: body,
        date: attributes.date,
      };
    },

    htmlFromMarkdown() {
      return marked(this.post.content);
    },
  },

  mounted() {
    Vue.nextTick(() => {
      const linksArray = Array.from(document.querySelectorAll('a'));
      const currentHost = window.location.host;

      linksArray.forEach((el) => {
        if (el.href && el.host !== currentHost) {
          el.target = '_blank';
          el.rel = 'noopener noreferrer';
        }
      });
    });
  },
};
</script>
