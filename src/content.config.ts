import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { siteConfig } from './lib/config.ts';

// Projects Collection
const projects = defineCollection({
  loader: file('src/content/projects/projects.json'),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    impact: z.string(),
    year: z.string(),
    tech: z.array(z.string()),
    visual: z.string().optional(),
    summary: z.string(),
    link: z.string().url(),
    priority: z.boolean(),
  }),
});

// Experiences Collection
const experiences = defineCollection({
  loader: file('src/content/experiences/experiences.json'),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    company: z.string(),
    location: z.string(),
    period: z.string(),
    description: z.string(),
    achievements: z.array(z.string()),
    technologies: z.array(z.string()),
  }),
});

// Education Collection
const education = defineCollection({
  loader: file('src/content/education/education.json'),
  schema: z.object({
    id: z.string(),
    university: z.string(),
    logo: z.string(),
    degree: z.string(),
    concentration: z.string(),
    gradDate: z.string(),
    description: z.string().optional(),
    link: z.string().url().optional(),
  }),
});

// Certifications Collection
const certifications = defineCollection({
  loader: file('src/content/certifications/certifications.json'),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    issuer: z.string(),
    date: z.string(),
    description: z.string(),
  }),
});

// Skills Collection
const skills = defineCollection({
  loader: file('src/content/skills/skills.json'),
  schema: z.object({
    id: z.string(),
    category: z.string(),
    skills: z.array(z.string()),
  }),
});

const blog_categories = siteConfig.blog_categories.map((category) => category.name) as [string, ...string[]];

// Blog Posts Collection
const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()),
    category: z.enum(blog_categories),
    featured: z.boolean().default(false),
    readingTime: z.number().optional(), // in minutes
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    author: z.string().default(siteConfig.author.name),
    draft: z.boolean().default(false),
  }),
});

export const collections = { 
  projects, 
  experiences, 
  education, 
  certifications, 
  skills,
  blog
};
