<template>
  <section class="list-view">
    <div v-if="!lists">Loading...</div>
    <ol v-if="lists" class="list">
      <li v-for="{ title, sha, date } in filteredList" track-by="sha" class="list-item">
        <nuxt-link :to="`/posts/${sha}`" class="item-title">
          {{ title }}
        </nuxt-link>
        <br />

        <time
          pubdate="pubdate"
          :datetime="date | formatDate"
          :title="date | formatDate"
          class="item-date"
        >
          {{ date | timeago }}
        </time>
      </li>
    </ol>
  </section>
</template>

<script>
import api from '../api';
import conf from '../config.json';

export default {
  name: 'list-view',

  head: {
    title: conf.blogTitle,
  },

  data({ params }) {
    return api.getList()
      .then(lists => ({
        lists,
      }))
      .catch(err => console.log(err));
  },

  computed: {
    filteredList() {
      const keyword = (this.$route.query.keyword || '').toLowerCase();

      return this.lists
        .filter(item => (item.title.toLowerCase().indexOf(keyword) !== -1))
        .sort((itemA, itemB) => (new Date(itemB.date) - new Date(itemA.date)));
    },
  },
};
</script>
