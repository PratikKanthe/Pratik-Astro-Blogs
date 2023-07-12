import rss from '@astrojs/rss';

import { formatBlogPosts } from "../js/utils"

const postImportResult = import.meta.glob('./blog/**/*.md', { eager: true });
const posts = formatBlogPosts(Object.values(postImportResult));

export const get = () => rss({
  stylesheet: '/rss/styles.xsl',
  title: 'My Astro Blog',
  description: 'A humble Astronaut’s guide to the stars',
  site: import.meta.env.SITE,
  items: posts.map((post) => ({
    link: post.slug,
    title: post.data.title,
    pubDate: post.data.date,
    description: post.data.description,
    customData: `
      <author>${post.data.author}</author>
    `
  }))
});