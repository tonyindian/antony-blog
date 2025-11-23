const pluginRss = require("@11ty/eleventy-plugin-rss");
const Image = require("@11ty/eleventy-img");

/**
 * Image optimization shortcode
 * Generates responsive images in AVIF, WebP, and JPEG formats
 */
async function imageShortcode(src, alt, sizes = "100vw") {
  const metadata = await Image(src, {
    widths: [400, 800, 1200, 1800],
    formats: ["avif", "webp", "jpeg"],
    outputDir: "./_site/assets/images/",
    urlPath: "/assets/images/",
    filenameFormat: function (id, src, width, format) {
      const extension = format;
      const name = src.split('/').pop().split('.')[0];
      return `${name}-${width}w.${extension}`;
    }
  });

  const imageAttributes = {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
  };

  return Image.generateHTML(metadata, imageAttributes);
}

/**
 * OG Image optimization (single size, high quality)
 */
async function ogImageShortcode(src) {
  const metadata = await Image(src, {
    widths: [1200],
    formats: ["jpeg"],
    outputDir: "./_site/assets/",
    urlPath: "/assets/",
    filenameFormat: function (id, src, width, format) {
      return `og-default.jpg`;
    },
    sharpJpegOptions: {
      quality: 85,
      progressive: true
    }
  });

  const data = metadata.jpeg[0];
  return data.url;
}

module.exports = function(eleventyConfig) {

  // Static assets pass-through (exclude images, they're processed)
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/assets/icons");
  eleventyConfig.addPassthroughCopy("src/assets/js");
  eleventyConfig.addPassthroughCopy("src/demos");
  eleventyConfig.addPassthroughCopy("src/fonts");

  // PWA & Config files
  eleventyConfig.addPassthroughCopy("src/sw.js");
  eleventyConfig.addPassthroughCopy("src/manifest.webmanifest");
  eleventyConfig.addPassthroughCopy("src/robots.txt");
  eleventyConfig.addPassthroughCopy("src/llms.txt");
  eleventyConfig.addPassthroughCopy("src/_headers");

  // Image optimization shortcodes
  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
  eleventyConfig.addLiquidShortcode("image", imageShortcode);
  eleventyConfig.addNunjucksAsyncShortcode("ogImage", ogImageShortcode);

  eleventyConfig.addPlugin(pluginRss);
  
  // RSS Filter manuell registrieren
  eleventyConfig.addNunjucksFilter("dateToRfc3339", pluginRss.dateToRfc3339);
  eleventyConfig.addNunjucksFilter("getNewestCollectionItemDate", pluginRss.getNewestCollectionItemDate);
  eleventyConfig.addNunjucksFilter("absoluteUrl", pluginRss.absoluteUrl);
  eleventyConfig.addNunjucksAsyncFilter("htmlToAbsoluteUrls", pluginRss.convertHtmlToAbsoluteUrls);
  
  // Date Filter: ISO Format
  eleventyConfig.addFilter("dateIso", (dateObj) => {
    return new Date(dateObj).toISOString();
  });
  
  // Date Filter: Human-readable
  eleventyConfig.addFilter("dateReadable", (dateObj) => {
    return new Date(dateObj).toLocaleDateString('de-CH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  });
  
  // Global Data
  eleventyConfig.addGlobalData("site", {
    url: "https://www.antony.ch",
    title: "Antony Alex",
    description: "Renaissance-Typ mit vielen Instrumenten"
  });
  
  // Posts Collection
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/posts/*.md")
      .sort((a, b) => b.date - a.date);
  });
  
  return {
    dir: {
      input: "src",
      output: "_site"
    },
    templateFormats: ["md", "html", "njk"],
    markdownTemplateEngine: "njk"
  };
};
