const mysql = require('../node-mysql-api/node_modules/mysql2/promise');

async function testConnection() {
    try {
        console.log("Attempting to connect to the database...");
        const connection = await mysql.createConnection({
            host: '153.92.15.31',
            user: 'u875409848_montecillo',
            password: '2qW^sUg=M',
            database: 'u875409848_montecillo',
            connectTimeout: 10000 // 10 seconds timeout
        });
        console.log("✅ SUCCESS! Connected to the remote database.");
        await connection.end();
    } catch (error) {
        console.error("❌ FAILED to connect to the database.");
        console.error(error.message);
        console.error("Error Code:", error.code);
        if (error.code === 'ER_HOST_NOT_PRIVILEGED' || error.message.includes('Access denied')) {
             console.error("\n💡 HINT: Your current IP address is not allowed to connect. You must go to your hosting dashboard (e.g., Hostinger) and add your IP address to the 'Remote MySQL' section.");
        }
    }
}

testConnection();
