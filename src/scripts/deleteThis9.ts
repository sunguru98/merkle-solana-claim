import { writeJSONSync } from 'fs-extra';
import data from '../json/data.json';

(async function () {
  try {
    const newData = Object.entries(data).reduce((acc: any, [k, v]) => {
      const edition = parseInt(k) - 1;
      acc[edition] = {
        ...v,
        edition,
      };
      return acc;
    }, {});

    writeJSONSync(`${__dirname}/../json/data.json`, newData, { spaces: 2 });
  } catch (err) {
    console.log(err.message);
  }
})();
