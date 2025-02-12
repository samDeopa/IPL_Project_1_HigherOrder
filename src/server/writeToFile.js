const fs = require("fs");
const writeToFile = (fileName, data) => {
  fs.writeFileSync(`../public/output/${fileName}.json`, data);
};

module.exports = { writeToFile };
