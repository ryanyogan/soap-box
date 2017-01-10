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

  computed: {
    htmlFromMarkdown() {
      return marked(this.content);
    },
  },
};
</script>
