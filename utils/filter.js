/* Global Vue.js Filters */
import Timeago from 'timeago.js';

export default (Vue) => {
  Vue.filter('timeago', (str) => {
    if (!str) {
      return '';
    }
    return new Timeago().format(new Date(str));
  });

  Vue.filter('formatDate', date => (
    new Date(date).toLocaleDateString()
  ));
};
