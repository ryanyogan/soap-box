
import axios from 'axios';

import conf from '../config.json';
import { onlyTitle, onlyDate } from '../utils';

const API = 'https://api.github.com';

/**
 * Format GitHub API url for content list
 * @returns {string}
 */
const getListUrl = () => {
  let url = `${API}/repos/${conf.repo}/contents/`;

  if (conf.path) {
    url += conf.path;
  }

  if (conf.branch) {
    url += `?ref=${conf.branch}`;
  }

  return url;
};

/**
 * Format GitHub API Url for file content
 * @param {string} hash
 * @returns {string}
 */
const getPostUrl = hash => (
  `${API}/repos/${conf.repo}/git/blobs/${hash}`
);

export default {
  getList() {
    return axios.get(getListUrl())
      .then(res => res.data)
      .then((data) => {
        const list = data.map(({ name, sha, size }) => ({
          title: onlyTitle(name),
          date: onlyDate(name),
          sha,
          size,
        }));

        return list;
      });
  },

  getDetail(hash) {
    const headers = {
      headers: { Accept: 'application/vnd.github.v3.raw' },
    };
    const cacheKey = `post.${hash}`;

    return axios.get(getPostUrl(hash), headers)
      .then(res => res.data);
  },
};
