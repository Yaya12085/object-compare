const { generateID } = require("../dist/index");

const id = generateID({
  lang: "fr",
  length: 2,
  separator: "",
  capitalize: true,
  adjectiveCount: 0,
  addAdverb: true,
});

console.log(id);
