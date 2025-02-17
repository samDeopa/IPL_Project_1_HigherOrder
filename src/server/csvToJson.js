const fs = require("fs");

const csvToJson = (csvPath) => {
  const data = fs.readFileSync(csvPath, "utf-8").replace(/\r/g, "").split("\n");

  const columns = data[0].split(",");

  data.splice(0, 1);
  const jsonData = [];
  data.forEach((row) => {
    const entry = {};
    row.split(",").forEach((item, index) => {
      entry[columns[index]] = item;
    });
    jsonData.push(entry);
  });

  return jsonData;
};

module.exports = { csvToJson };
