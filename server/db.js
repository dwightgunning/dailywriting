const pg = require('pg');

pg.defaults.ssl = true;

const db = {
  const connect = (dbUrl) => {
    pg.connect(dbUrl, function(err, client) {
      if (err) throw err;
      console.log('Connected to postgres! Getting schemas...');

      client
        .query('SELECT table_schema,table_name FROM information_schema.tables;')
        .on('row', function(row) {
          console.log(JSON.stringify(row));
        });
    });
  }
};

module.exports = db;
