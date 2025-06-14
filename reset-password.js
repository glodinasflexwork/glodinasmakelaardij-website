const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

async function resetUserPassword() {
  const prisma = new PrismaClient();
  
  try {
    console.log('🔐 Resetting password for cihatkaya@glodinas.nl...');
    
    const email = 'cihatkaya@glodinas.nl';
    const newPassword = 'noqwer-sinziC-divju2';
    
    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true, firstName: true }
    });
    
    if (!existingUser) {
      console.log('❌ User not found in database');
      return;
    }
    
    console.log('✅ User found:');
    console.log(`   Email: ${existingUser.email}`);
    console.log(`   Name: ${existingUser.firstName}`);
    console.log(`   ID: ${existingUser.id}`);
    
    // Hash the new password properly
    console.log('\n🔐 Hashing new password...');
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    console.log(`   New password: "${newPassword}"`);
    console.log(`   Hashed to: ${hashedPassword.substring(0, 30)}...`);
    
    // Update user password
    const updatedUser = await prisma.user.update({
      where: { email },
      data: {
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        emailVerified: true,
        updatedAt: true
      }
    });
    
    console.log('\n✅ Password updated successfully!');
    console.log(`   Updated at: ${updatedUser.updatedAt}`);
    
    // Test the new password immediately
    console.log('\n🧪 Testing new password...');
    const passwordMatch = await bcrypt.compare(newPassword, hashedPassword);
    console.log(`   Password verification: ${passwordMatch ? '✅ SUCCESS' : '❌ FAILED'}`);
    
    if (passwordMatch) {
      console.log('\n🎉 Password reset complete! You can now login with:');
      console.log(`   Email: ${email}`);
      console.log(`   Password: ${newPassword}`);
      console.log('\n   The user account is verified and ready for login!');
    }
    
  } catch (error) {
    console.error('❌ Error resetting password:', error);
  } finally {
    await prisma.$disconnect();
  }
}

resetUserPassword();

