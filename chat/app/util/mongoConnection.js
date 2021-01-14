/**
 * Created by garusis on 7/06/18.
 */
const MongoClient = require('mongodb').MongoClient;

global.mongoConn = config.get('databaseSettings.mongo_db_connection') || process.env.MONGO_STRING;
global.mongoose = require('mongoose');

const listeners = {
  post: [],
  close: [],
};
let isActive = false;


exports.addPostConnectionListener = function (cb) {
  listeners.post.push(cb);
  if (isActive) {
    process.nextTick(() => cb());
  }
};

exports.addCloseConnectionListener = function (cb) {
  listeners.close.push(cb);
};

exports.start = function () {
  process.nextTick(() => startMongo());
};

function startMongo() {
  MongoClient.connect(mongoConn, (err, database) => {
    if (err) {
      console.log('=====err', err);
      setTimeout(() => {
        startMongo();
      }, 4000);
    }
    isActive = true;
    global.db = database;

    mongoose.connect(mongoConn, { useMongoClient: true });
    listeners.post.forEach(listener => listener());

    db.on('close', function () {
      console.log('=====stating mongo again');
      listeners.close.forEach(listener => listener());
      setTimeout(() => {
        startMongo();
      }, 4000);

    });
  });
}