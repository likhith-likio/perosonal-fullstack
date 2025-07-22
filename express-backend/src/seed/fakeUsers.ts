import { db } from '../config/db';
import bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';

const seedFakeUsers = async () => {
  try {
    const hashedPassword = await bcrypt.hash('admin@123', 10);

    for (let i = 0; i < 100; i++) {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const email = faker.internet.email({ firstName, lastName });
      const dob = faker.date.birthdate({ min: 18, max: 65, mode: 'age' });

      await db.query(`
        INSERT INTO users (first_name, last_name, email, dob, password)
        VALUES (?, ?, ?, ?, ?)`,
        [firstName, lastName, email, dob, hashedPassword]
      );
    }

    console.log('✅ Seeded 100 fake users');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seedFakeUsers();
