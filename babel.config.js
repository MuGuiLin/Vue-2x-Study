module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    ["prismjs", {
      "languages": ["javascript", "css", "markup", "java", "php", "c", "cpp"],
      "plugins": ["line-numbers"],
      "theme": "okaidia", // node_modules/prismjs/themes/prism-xxx.css | coy、dark、funky、okaidia、solarizedlight、tomorrow、 twilight
      "css": true
    }]
  ]
}