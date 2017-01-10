<template>
  <section class="post-view">
    <div v-if="!content">Loading...</div>
    <h1 class="post-title">
      {{ title }}
      <time
        pubdate="pubdate"
        :datetime="this.date | formatDate"
        :title="this.date | formatDate"
        class="post-date"
      >
        {{ this.date | timeago }}
      </time>
    </h1>
    <article
      v-if="content"
      v-html="htmlFromMarkdown"
    ></article>
  </section>
</template>

<script>
import marked from '../../utils/render';

export default {
  name: 'post-view',

  props: ['content', 'title', 'date'],

  computed: {
    htmlFromMarkdown() {
      return marked(this.content);
    },
  },
};
</script>
