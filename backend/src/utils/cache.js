const fs = require('fs');

function createCache(filePath, calculate) {
  let cache = null;

  function invalidate() {
    cache = null;
  }

  async function get() {
    if (cache) {
      return cache;
    }
    cache = await calculate();
    return cache;
  }

  fs.watchFile(filePath, invalidate);

  return { get, invalidate };
}

module.exports = { createCache };
