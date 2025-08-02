const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkMockUsers() {
  try {
    console.log('🔍 Checking mock users in database...');
    
    // Get all users
    const allUsers = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        provider: true,
        password: true,
        emailVerified: true,
        lastLogin: true
      }
    });
    
    console.log(`📊 Total users found: ${allUsers.length}`);
    
    // Check users with and without passwords
    const usersWithPasswords = allUsers.filter(user => user.password !== null);
    const usersWithoutPasswords = allUsers.filter(user => user.password === null);
    
    console.log(`🔐 Users with passwords: ${usersWithPasswords.length}`);
    console.log(`❌ Users without passwords: ${usersWithoutPasswords.length}`);
    
    console.log('\n📋 Sample Users (first 10):');
    allUsers.slice(0, 10).forEach((user, index) => {
      console.log(`${index + 1}. ${user.name} (${user.email})`);
      console.log(`   Role: ${user.role} | Provider: ${user.provider}`);
      console.log(`   Password: ${user.password ? '✅ Set' : '❌ Not set'}`);
      console.log(`   Email Verified: ${user.emailVerified ? '✅ Yes' : '❌ No'}`);
      console.log('');
    });
    
    if (usersWithPasswords.length > 0) {
      console.log('✅ You can login with users that have passwords!');
      console.log('🔑 If you need the password, check the original seed file or reset the database.');
    } else {
      console.log('❌ No users have passwords set. You cannot login with email/password.');
      console.log('💡 You can use Google OAuth instead, or run the add-passwords script.');
    }
    
  } catch (error) {
    console.error('❌ Error checking users:', error);
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  checkMockUsers();
}

module.exports = { checkMockUsers }; 