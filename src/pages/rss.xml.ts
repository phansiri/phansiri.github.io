import { getCollection } from 'astro:content';

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
    <link>https://phansiri.github.io/blog</link>
    <atom:link href="https://phansiri.github.io/rss.xml" rel="self" type="application/rss+xml"/>
    <language>en-US</language>
    <managingEditor>lit@phansiri.dev (Lit Phansiri)</managingEditor>
    <webMaster>lit@phansiri.dev (Lit Phansiri)</webMaster>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <generator>Astro Static Site Generator</generator>
    <copyright>Copyright © ${new Date().getFullYear()} Lit Phansiri. All rights reserved.</copyright>
    <category>Technology</category>
    <category>Artificial Intelligence</category>
    <category>Machine Learning</category>
    <category>Data Science</category>
    <image>
      <url>https://phansiri.github.io/portfolio/lit_profile.png</url>
      <title>Lit Phansiri</title>
      <link>https://phansiri.github.io</link>
      <width>144</width>
      <height>144</height>
    </image>
    ${publishedPosts.map(post => `
    <item>
      <title><![CDATA[${post.data.title}]]></title>
      <description><![CDATA[${post.data.description}]]></description>
      <content:encoded><![CDATA[${post.data.description}]]></content:encoded>
      <link>https://phansiri.github.io/blog/${post.slug}</link>
      <guid isPermaLink="true">https://phansiri.github.io/blog/${post.slug}</guid>
      <pubDate>${post.data.publishDate.toUTCString()}</pubDate>
      <dc:creator><![CDATA[Lit Phansiri]]></dc:creator>
      <author>lit@phansiri.dev (Lit Phansiri)</author>
      <category><![CDATA[${post.data.category}]]></category>
      ${post.data.tags.map(tag => `<category><![CDATA[${tag}]]></category>`).join('')}
      <enclosure url="https://phansiri.github.io${post.data.image}" type="image/svg+xml" />
    </item>`).join('')}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
