// routes/index.html
const noteRoutes = require('./note_route');
const users =require('./users');
module.exports = function(app, db) {
  noteRoutes(app, db);
  users(app,db);
  // Other route groups could go here, in the future
};