"use strict";

var _require = require('pg'),
    Client = _require.Client;

var fs = require('fs'); // Read SQL file


var sql = fs.readFileSync('data.sql', 'utf8'); // Connect to Supabase (use the verified connection string)

var client = new Client({
  host: 'db.njepuedyhcwopzluitbo.supabase.co',
  // UPDATED: Use the correct format
  port: 5432,
  database: 'postgres',
  user: 'postgres.njepuedyhcwopzluitbo',
  // Double-check this
  password: 'Abranshis@2807',
  ssl: {
    rejectUnauthorized: false
  }
});

function importData() {
  return regeneratorRuntime.async(function importData$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(client.connect());

        case 3:
          console.log('Connected to Supabase'); // Execute the SQL

          console.log('Importing data...');
          _context.next = 7;
          return regeneratorRuntime.awrap(client.query(sql));

        case 7:
          console.log('Data import completed successfully');
          _context.next = 13;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          console.error('Error importing data:', _context.t0);

        case 13:
          _context.prev = 13;
          _context.next = 16;
          return regeneratorRuntime.awrap(client.end());

        case 16:
          return _context.finish(13);

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 10, 13, 17]]);
}

importData();