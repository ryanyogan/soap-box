<template>
  <time
    pubdate="pubdate"
    :datetime="date | formatDate"
    :title="date | formatDate"
    class="item-date"
  >
    {{ date | timeago }}
  </time>
</template>

<script>
export default {
  name: 'posts-time',
  props: ['date'],
};
</script>
