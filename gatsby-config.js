require(`dotenv`).config({
  path: `.env`,
})

module.exports = {
  siteMetadata: {
    siteTitle: `Carlos Iriarte`,
    siteTitleAlt: `Carlos Iriarte's Blog`,
    author: `@ciriarte`,
    siteUrl: `https://carlosiriarte.com`,
    siteLanguage: `en`,
    siteDescription: `Mistakes in these writings are solely mine.`,
  },
  plugins: [
    {
      resolve: `@lekoarts/gatsby-theme-minimal-blog`,
      options: {
        navigation: [
          {
            title: `Blog`,
            slug: `/blog`,
          },
          {
            title: `About`,
            slug: `/about`,
          },
          {
            title: `Scheduler`,
            slug: `/projects/scheduler`
          }
        ],
        externalLinks: [
          {
            name: `Sourcehut`,
            url: `https://git.sr.ht/~ciriarte/`,
          },
          {
            name: `Github`,
            url: `https://github.com/ciriarte`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-161624816-1',
      },
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Carlos Iriarte`,
        short_name: `carlosiriarte.com`,
        description: `Mistakes in these writings are solely mine.`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#6B46C1`,
        display: `standalone`,
        icons: [
          {
            src: `/android-chrome-192x192.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `/android-chrome-512x512.png`,
            sizes: `512x512`,
            type: `image/png`,
          },
        ],
      },
    },
    // `gatsby-plugin-offline`,
    `gatsby-plugin-netlify`,
    `gatsby-plugin-sass`,
    // `gatsby-plugin-webpack-bundle-analyser-v2`,
  ],
}
