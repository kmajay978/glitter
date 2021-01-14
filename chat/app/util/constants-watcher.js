/**
 * Created by garusis on 6/06/18.
 */
const fs = require('fs');
const _ = require('lodash');
const nodeEval = require('node-eval');
const config = require('config');

const modulePath = require.resolve('../routes/constants.js');

const constants = require(modulePath);

function reloadConstants() {
  if (global.scopeworker_process_started) {
    fs.readFile(modulePath, 'utf-8', (err, contents) => {
      const newConstants = nodeEval(contents, modulePath);
      _.assign(constants, newConstants);
      constants.refreshVersions();
      constants.fetchDatabaseTables(config.get('databaseSettings.database'));
      constants.fetchCompanyAddonConfiguration();
    });
  }
}

fs.watch('./terms', reloadConstants);
