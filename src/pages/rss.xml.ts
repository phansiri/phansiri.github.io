import { getCollection } from 'astro:content';
import { siteConfig, getFullUrl, getImageUrl } from '../lib/config';

export async function GET() {
  const posts = await getCollection('blog');
  const publishedPosts = posts
    .filter(post => !post.data.draft)
    .sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf());

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>Lit Phansiri - AI/ML &amp; Technology Blog</title>
    <description>Insights on AI/ML, computer systems, and technology from a full-stack data scientist's perspective. Covering neural networks, transformers, AWS Bedrock, LangGraph, and more.</description>
    <link>${getFullUrl('/blog')}</link>
    <atom:link href="${getFullUrl('/rss.xml')}" rel="self" type="application/rss+xml"/>
    <language>en-US</language>
    <managingEditor>${siteConfig.author.email} (${siteConfig.author.name})</managingEditor>
    <webMaster>${siteConfig.author.email} (${siteConfig.author.name})</webMaster>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <generator>Astro Static Site Generator</generator>
    <copyright>Copyright © ${new Date().getFullYear()} ${siteConfig.author.name}. All rights reserved.</copyright>
    <category>Technology</category>
    <category>Artificial Intelligence</category>
    <category>Machine Learning</category>
    <category>Data Science</category>
    <image>
      <url>${getImageUrl(siteConfig.author.image)}</url>
      <title>${siteConfig.author.name}</title>
      <link>${siteConfig.url}</link>
      <width>144</width>
      <height>144</height>
    </image>
    ${publishedPosts.map(post => `
    <item>
      <title><![CDATA[${post.data.title}]]></title>
      <description><![CDATA[${post.data.description}]]></description>
      <content:encoded><![CDATA[${post.data.description}]]></content:encoded>
      <link>${getFullUrl(`/blog/${post.slug}`)}</link>
      <guid isPermaLink="true">${getFullUrl(`/blog/${post.slug}`)}</guid>
      <pubDate>${post.data.publishDate.toUTCString()}</pubDate>
      <dc:creator><![CDATA[${siteConfig.author.name}]]></dc:creator>
      <author>${siteConfig.author.email} (${siteConfig.author.name})</author>
      <category><![CDATA[${post.data.category}]]></category>
      ${post.data.tags.map(tag => `<category><![CDATA[${tag}]]></category>`).join('')}
      <enclosure url="${getImageUrl(post.data.image || '')}" type="image/svg+xml" />
    </item>`).join('')}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
