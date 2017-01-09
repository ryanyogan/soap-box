/**
 * Get title from the file name
 *
 * @exports
 * @param {string} title
 * @returns {string}
 */
export const onlyTitle = title => (
 title.replace(/\.md$/, '')
  .replace(/^\d{4}-\d{1,2}-\d{1,2}-/, '')
);

/**
* Retreive the publish date from the file name
*
* @exports
* @param {string} title
* @returns {string}
*/
export const onlyDate = title => (
  /^\d{4}-\d{1,2}-\d{1,2}/.exec(title)[0]
);
