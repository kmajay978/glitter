const i18n = require('i18n');
const config = require('config');

i18n.configure({
  locales: ['original', 'sprint_variations'],
  directory: `${__dirname}/../terms`,
  objectNotation: true,
  updateFiles: false,
  autoReload: true,
  register: global,
  defaultLocale: config.has('ENV_TERMS') ? config.get('ENV_TERMS') : 'original'
});

const __ = i18n.__;
i18n.__ = function (term) {
  return __.call(this, term) || '';
};

module.exports = i18n;
