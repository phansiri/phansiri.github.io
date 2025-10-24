// src/lib/config.ts
export const siteConfig = {
  // Site Information
  url: 'https://phansiri.github.io',
  name: 'Lit Phansiri Portfolio',
  description: 'Portfolio and blog of Lit Phansiri, Full Stack Data Scientist',
  
  // Author Information
  author: {
    name: 'Lit Phansiri',
    email: 'lit@phansiri.dev',
    image: '/portfolio/lit_profile.png',
    github: 'https://github.com/phansiri',
    linkedin: 'https://linkedin.com/in/litphansiri',
  },
  
  // Site Features
  features: {
    blog: true,
    portfolio: true,
    rss: true,
    sitemap: true,
  },
  
  // Social Links
  social: {
    github: 'https://github.com/phansiri',
    linkedin: 'https://linkedin.com/in/litphansiri',
  },
  
  // Future extensibility - you can add more config here
  seo: {
    defaultImage: '/portfolio/lit_profile.png',
    twitterHandle: '@litphansiri', // if you have one
  },
  
  // Navigation
  navigation: {
    main: [
      { name: 'Home', href: '/' },
      { name: 'About', href: '/about' },
      { name: 'Blog', href: '/blog' },
      { name: 'Projects', href: '/projects' },
      { name: 'Experiences', href: '/experiences' },
      { name: 'Education', href: '/education' },
      { name: 'Contact', href: '/contact' },
    ],
  },
} as const;

// Helper functions for common URL operations
export const getFullUrl = (path: string = '') => {
  return `${siteConfig.url}${path.startsWith('/') ? path : `/${path}`}`;
};

export const getImageUrl = (imagePath: string) => {
  return getFullUrl(imagePath);
};
