import marked from 'marked';
import Prism from 'prismjs';

const renderer = new marked.Renderer();

/**
 * Syntax highlighting for code in blog
 *
 * @override
 * @param {any} code
 * @param {any} lang
 * @returns {string}
 */
renderer.code = (code, lang) => {
  const highlight = Prism.highlight(code, Prism.langauges[lang]
    || Prism.langauges.javascript);

  return `<pre><code class="lang-${escape(lang, true)}">${highlight}</code></pre>`;
};

marked.setOptions({
  renderer,
  breaks: true,
  gfm: true,
});

export default marked;
