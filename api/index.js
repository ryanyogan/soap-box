
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

const sessionLookup = key => (
  window.sessionStorage &&
    window.sessionStorage.hasOwnProperty(key)
);

const setSession = ({ key, posts }) => (
  window.sessionStorage &&
    window.sessionStorage.setItem(key, JSON.stringify(posts))
);

const getSession = key => (
  window.sessionStorage &&
    window.sessionStorage.getItem(key)
);

export default {
  getList(isClient) {
    if (isClient && sessionLookup('posts')) {
      return Promise.resolve(JSON.parse(getSession('posts')));
    }

    return axios.get(getListUrl())
      .then(res => res.data)
      .then((data) => {
        const posts = data.map(({ name, sha, size }) => ({
          title: onlyTitle(name),
          date: onlyDate(name),
          sha,
          size,
        }));

        if (isClient) {
          setSession({ key: 'posts', posts });
        }

        return posts;
      });
  },

  getDetail(isClient, hash) {
    const headers = {
      headers: { Accept: 'application/vnd.github.v3.raw' },
    };
    const cacheKey = `post.${hash}`;

    if (isClient && sessionLookup(cacheKey)) {
      return Promise.resolve(JSON.parse(getSession(cacheKey)));
    }

    return axios.get(getPostUrl(hash), headers)
      .then(res => res.data)
      .then((content) => {
        if (isClient) {
          setSession({ key: cacheKey, posts: content });
        }
        return content;
      });
  },
};
