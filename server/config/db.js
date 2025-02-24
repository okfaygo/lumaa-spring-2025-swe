import pkg from 'pg';
const { Client } = pkg;

import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file

// Create a new PostgreSQL client using environment variables
const client = new Client({
    connectionString: process.env.DB_URL || `postgresql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
});

// Connect to the PostgreSQL database
(async () => {
    try {
        await client.connect();
        console.log("✅ Connected to PostgreSQL");

        // Create users table if it does not exist
        await client.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL
            );
        `);
        console.log("✅ Created users");


        // Create a new table if it does not exist
        await client.query(`
            CREATE TABLE IF NOT EXISTS tasks (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description TEXT,
                is_completed BOOLEAN DEFAULT FALSE,
                user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log("✅ Created tasks table");

    } catch (err) {
        console.error("❌ PostgreSQL Connection Error:", err);
        process.exit(1);
    }
})();

// Export the client for use in other parts of the application
export default client; 
