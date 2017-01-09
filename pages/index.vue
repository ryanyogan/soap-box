<template>
  <section class="list-view">
    <div v-if="!lists">Loading...</div>
    <ol v-if="lists" class="list">
      <li v-for="{ title, sha, date } in filteredList" :key="sha" class="list-item">
        <router-link :to="`/post/${sha}`" class="item-title">
          {{ title }}
        </router-link>
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

  data() {
    return {
      lists: null,
      date: null,
    };
  },

  created() {
    this.loadList();
  },

  computed: {
    filteredList() {
      const keyword = (this.$route.query.keyword || '').toLowerCase();

      return this.lists
        .filter(item => (item.title.toLowerCase().indexOf(keyword) !== -1))
        .sort((itemA, itemB) => (new Date(itemB.date) - new Date(itemA.date)));
    },
  },

  methods: {
    loadList() {
      api.getList()
        .then(list => this.lists = list)
        .catch(err => console.log(err));
    },
  },

  watch: {
    $route: 'loadList',
  },
};
</script>
