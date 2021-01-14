/**
 * Created by garusis on 28/05/18.
 */

const JSON_Utils = {};

JSON_Utils.unflatten = function (data) {
  if (Object(data) !== data || Array.isArray(data)) {
    return data;
  }

  const result = {};
  let cur;
  let prop;
  let parts;
  let idx;
  for (const p in data) {
    cur = result;
    prop = '';
    parts = p.split('.');
    for (let i = 0; i < parts.length; i++) {
      idx = !isNaN(parseInt(parts[i], 10));
      cur = cur[prop] || (cur[prop] = (idx ? [] : {}));
      prop = parts[i];
    }
    cur[prop] = data[p];
  }
  return result[''];
};

module.exports = JSON_Utils;
