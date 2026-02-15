const mysql = require('mysql2/promise');
require('dotenv').config();

async function setupDatabase() {
    const connection = await mysql.createConnection({
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
    });

    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.MYSQL_DATABASE}\`;`);
    console.log(`Database ${process.env.MYSQL_DATABASE} created or already exists.`);
    await connection.end();
}

setupDatabase().catch(err => {
    console.error('Error setting up database:', err);
    process.exit(1);
});
