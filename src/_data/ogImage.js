const Image = require("@11ty/eleventy-img");

module.exports = async function() {
  const metadata = await Image("./src/assets/og-default.jpg", {
    widths: [1200],
    formats: ["jpeg"],
    outputDir: "./_site/assets/",
    urlPath: "/assets/",
    filenameFormat: function (id, src, width, format) {
      return `og-default-optimized.jpg`;
    },
    sharpJpegOptions: {
      quality: 85,
      progressive: true,
      mozjpeg: true
    }
  });

  return metadata.jpeg[0].url;
};
