const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function(eleventyConfig) {

  // Static assets pass-through
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/demos");
  eleventyConfig.addPassthroughCopy("src/fonts");

  // PWA & Config files
  eleventyConfig.addPassthroughCopy("src/sw.js");
  eleventyConfig.addPassthroughCopy("src/manifest.webmanifest");
  eleventyConfig.addPassthroughCopy("src/robots.txt");
  eleventyConfig.addPassthroughCopy("src/llms.txt");
  eleventyConfig.addPassthroughCopy("src/_headers");
  
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
