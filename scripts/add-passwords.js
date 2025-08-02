const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

async function addPasswords() {
  try {
    console.log('🔐 Adding passwords to existing users...');
    
    // Get all users without passwords
    const users = await prisma.user.findMany({
      where: {
        password: null
      }
    });
    
    console.log(`Found ${users.length} users without passwords`);
    
    // Add passwords to each user
    for (const user of users) {
      const password = 'password123'; // Simple password for testing
      const hashedPassword = await hashPassword(password);
      
      await prisma.user.update({
        where: { id: user.id },
        data: { password: hashedPassword }
      });
      
      console.log(`✅ Added password for ${user.name} (${user.email})`);
      console.log(`   Email: ${user.email}`);
      console.log(`   Password: ${password}`);
      console.log(`   Role: ${user.role}`);
      console.log('---');
    }
    
    console.log('🎉 All passwords added successfully!');
    
  } catch (error) {
    console.error('❌ Error adding passwords:', error);
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  addPasswords();
}

module.exports = { addPasswords }; 