import { readFileSync, writeJSON } from 'fs-extra';

(async function () {
  try {
    const csvData = readFileSync(`${__dirname}/../hashlist_wl.csv`, {
      encoding: 'utf-8',
    });

    const data = csvData
      .trim()
      .split('\n')
      .map((d) => {
        const [amount, account] = d.split(',');
        return {
          account: account.trim(),
          amount,
        };
      });

    await writeJSON(`${__dirname}/../json/data.json`, data, { spaces: 2 });
  } catch (err) {
    console.error(err);
  }
})();
