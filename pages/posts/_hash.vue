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
import Vue from 'vue';
import fm from 'front-matter';
import api from '../../api';
import conf from '../../config.json';
import marked from '../../utils/render';

export default {
  name: 'post-view',

  data() {
    return {
      title: '',
      date: null,
      content: '',
    };
  },

  computed: {
    htmlFromMarkdown() {
      return marked(this.content);
    },
  },

  created() {
    this.loadPost();
  },

  methods: {
    loadPost() {
      api.getDetail(this.$route.params.hash)
        .then((text) => {
          const content = fm(text);
          this.content = content.body;
          this.title = content.attributes.title;
          this.date = content.attributes.date;
        })
        // eslint-disable-next-line
        .catch(err => console.log(err));
    },
  },
};
</script>
