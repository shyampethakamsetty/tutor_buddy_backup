const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function addPasswordsToMockUsers() {
  try {
    console.log('🔐 Adding passwords to mock users...');
    
    // Get all users (we'll add passwords to all mock users)
    const usersWithoutPasswords = await prisma.user.findMany();
    
    console.log(`Found ${usersWithoutPasswords.length} users without passwords`);
    
    // Default password for all mock users
    const defaultPassword = 'password123';
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);
    
    // Update all users with the default password
    const updatePromises = usersWithoutPasswords.map(user => 
      prisma.user.update({
        where: { id: user.id },
        data: { password: hashedPassword }
      })
    );
    
    await Promise.all(updatePromises);
    
    console.log('✅ Successfully added passwords to all mock users');
    console.log('🔑 Default password for all mock users: password123');
    console.log('\n📋 Login Credentials:');
    console.log('You can now login with any of these mock users:');
    
    // Display some sample login credentials
    const sampleUsers = usersWithoutPasswords.slice(0, 10); // Show first 10
    sampleUsers.forEach(user => {
      console.log(`   Email: ${user.email} | Password: password123 | Role: ${user.role}`);
    });
    
    if (usersWithoutPasswords.length > 10) {
      console.log(`   ... and ${usersWithoutPasswords.length - 10} more users`);
    }
    
    console.log('\n💡 Tip: You can use these credentials to test the application!');
    
  } catch (error) {
    console.error('❌ Error adding passwords:', error);
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  addPasswordsToMockUsers();
}

module.exports = { addPasswordsToMockUsers }; 