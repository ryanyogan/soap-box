<template>
  <section class="list-view">
    <div v-if="!posts">Loading...</div>
    <ol v-if="posts" class="list">
      <li v-for="{ title, sha, date } in filteredPosts" track-by="sha" class="list-item">
        <nuxt-link :to="`/posts/${sha}`" class="item-title">
          {{ title }}
        </nuxt-link>
        <br />
        <post-time :date="date"></post-time>
      </li>
    </ol>
  </section>
</template>

<script>
import PostTime from './PostTime';

export default {
  name: 'post-list',

  components: {
    PostTime,
  },

  computed: {
    posts() {
      return this.$store.state.posts;
    },

    filteredPosts() {
      const keyword = (this.$route.query.keyword || '').toLowerCase();

      return this.posts
        .filter(item => (item.title.toLowerCase().indexOf(keyword) !== -1))
        .sort((itemA, itemB) => (new Date(itemB.date) - new Date(itemA.date)));
    },
  },
};
</script>
