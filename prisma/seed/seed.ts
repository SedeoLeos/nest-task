import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';


const prisma = new PrismaClient();

async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

async function main() {
  console.log('Seeding users...');
  const users = [
    {
      email: 'john.doe@example.com',
      firstName: 'John',
      lastName: 'Doe',
      password: await hashPassword('password123'),
    },
    {
      email: 'jane.doe@example.com',
      firstName: 'Jane',
      lastName: 'Doe',
      password: await hashPassword('securepassword'),
    },
  ];

  for (const user of users) {
    const existingUser = await prisma.user.findUnique({
      where: { email: user.email },
    });

    if (existingUser) {
      console.log(`User with email ${user.email} already exists.`);
    } else {
      await prisma.user.create({
        data: {
          ...user,
        },
      });
      console.log(`User with email ${user.email} created.`);
    }
  }

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
