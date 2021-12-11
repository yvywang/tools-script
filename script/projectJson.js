// build project manager JSON Data

const fs = require("fs");
const path = require("path");

const dir = "/Users/wangyu/Documents/";

const exclude = [];
const reduceJSON = (dir, options = {}) => {
  const JSON = (dir, tag = false) => {
    return fs.readdirSync(dir, { withFileTypes: true }).reduce((ret, item) => {
      const { name } = item;
      if (exclude.includes(name) || !item.isDirectory()) return ret;
      const tags = [];
      const rootPath = dir + "/" + name;
      if (tag) tags.push(path.resolve(rootPath, "../").split("/").pop());
      const obj = { name, rootPath, enabled: true, tags };
      return [...ret, obj];
    }, []);
  };
  let { tag = false } = options;
  const test = fs.readdirSync(dir, { withFileTypes: true });
  if (tag) {
    return test
      .filter((item) => item.isDirectory())
      .map((item) => JSON(dir + item.name, true))
      .flat(Infinity);
  } else {
    return JSON(dir);
  }
};

const result = reduceJSON(dir, { tag: true });
const data = JSON.stringify(result);
fs.writeFileSync("test.json", data);
