const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('urls.db')

db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS Links (Code TEXT UNIQUE, original_url TEXT)')
});

module.exports = db;