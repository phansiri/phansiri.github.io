import { defineCollection, z } from 'astro:content';

// Projects Collection
const projects = defineCollection({
  type: 'data',
  schema: z.array(z.object({
    id: z.string(),
    title: z.string(),
    impact: z.string(),
    year: z.string(),
    tech: z.array(z.string()),
    visual: z.string().optional(),
    summary: z.string(),
    link: z.string().url(),
    priority: z.boolean(),
  })),
});

// Experiences Collection
const experiences = defineCollection({
  type: 'data',
  schema: z.array(z.object({
    id: z.string(),
    title: z.string(),
    company: z.string(),
    location: z.string(),
    period: z.string(),
    description: z.string(),
    achievements: z.array(z.string()),
    technologies: z.array(z.string()),
  })),
});

// Education Collection
const education = defineCollection({
  type: 'data',
  schema: z.array(z.object({
    id: z.string(),
    university: z.string(),
    logo: z.string(),
    degree: z.string(),
    concentration: z.string(),
    gradDate: z.string(),
    description: z.string().optional(),
    link: z.string().url().optional(),
  })),
});

// Certifications Collection
const certifications = defineCollection({
  type: 'data',
  schema: z.array(z.object({
    id: z.string(),
    name: z.string(),
    issuer: z.string(),
    date: z.string(),
    description: z.string(),
  })),
});

// Skills Collection
const skills = defineCollection({
  type: 'data',
  schema: z.array(z.object({
    id: z.string(),
    category: z.string(),
    skills: z.array(z.string()),
  })),
});

// Blog Posts Collection
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()),
    category: z.enum(['AI/ML', 'Computer Systems', 'Data Science', 'Technology', 'Career', 'Tutorial']),
    featured: z.boolean().default(false),
    readingTime: z.number().optional(), // in minutes
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    author: z.string().default('Lit Phansiri'),
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
