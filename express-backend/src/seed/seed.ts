import { db } from '../config/db';
import bcrypt from 'bcrypt';

(async () => {
  await db.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      first_name VARCHAR(100),
      last_name VARCHAR(100),
      email VARCHAR(100) UNIQUE,
      dob DATE,
      password VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `);

  const hashedPassword = await bcrypt.hash('admin@123', 10);
  await db.query(`
    INSERT IGNORE INTO users (first_name, last_name, email, dob, password)
    VALUES (?, ?, ?, ?, ?)`,
    ['Admin', 'User', 'admin@email.com', '2000-01-01', hashedPassword]
  );

  console.log('✅ Table created and admin seeded.');
  process.exit();
})();
