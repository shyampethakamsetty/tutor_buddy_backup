const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

// Helper function to hash passwords
async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

// Helper function to create date in DD/MM/YYYY format
function formatDate(date) {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

async function main() {
  console.log('🚀 Starting comprehensive data ingestion...');

  // Clear existing data
  console.log('🧹 Clearing existing data...');
  try {
    await prisma.notification.deleteMany();
    await prisma.message.deleteMany();
    await prisma.conversation.deleteMany();
    await prisma.booking.deleteMany();
    await prisma.tutorProfile.deleteMany();
    await prisma.studentProfile.deleteMany();
    await prisma.user.deleteMany();
  } catch (error) {
    console.log('⚠️ Some collections may not exist yet, continuing...');
  }

  // Create users with passwords
  console.log('👥 Creating users...');
  
  // Students
  const students = [
    {
      email: 'alice.student@example.com',
      name: 'Alice Johnson',
      role: 'STUDENT',
      password: 'password123',
      profile: {
        grade: '12th Grade',
        subjects: ['Mathematics', 'Physics', 'Chemistry'],
        learningGoals: 'Prepare for college entrance exams',
        preferredLearningStyle: 'Visual and hands-on',
        timezone: 'America/New_York'
      }
    },
    {
      email: 'bob.student@example.com',
      name: 'Bob Smith',
      role: 'STUDENT',
      password: 'password123',
      profile: {
        grade: '10th Grade',
        subjects: ['English', 'History', 'Biology'],
        learningGoals: 'Improve writing skills and understanding of historical events',
        preferredLearningStyle: 'Discussion-based',
        timezone: 'America/Chicago'
      }
    },
    {
      email: 'carol.student@example.com',
      name: 'Carol Davis',
      role: 'STUDENT',
      password: 'password123',
      profile: {
        grade: '11th Grade',
        subjects: ['Mathematics', 'Computer Science', 'Spanish'],
        learningGoals: 'Learn programming and prepare for AP exams',
        preferredLearningStyle: 'Project-based',
        timezone: 'America/Los_Angeles'
      }
    },
    {
      email: 'david.student@example.com',
      name: 'David Wilson',
      role: 'STUDENT',
      password: 'password123',
      profile: {
        grade: '9th Grade',
        subjects: ['Mathematics', 'Science', 'English'],
        learningGoals: 'Build strong foundation for high school',
        preferredLearningStyle: 'Interactive',
        timezone: 'America/Denver'
      }
    }
  ];

  // Tutors
  const tutors = [
    {
      email: 'dr.sarah.math@example.com',
      name: 'Dr. Sarah Chen',
      role: 'TUTOR',
      password: 'password123',
      profile: {
        subjects: ['Mathematics', 'Calculus', 'Statistics'],
        experience: '8 years teaching experience',
        education: 'PhD in Mathematics from MIT',
        hourlyRate: 75,
        availability: {
          monday: { available: true, slots: ['09:00-10:00', '14:00-15:00', '16:00-17:00'] },
          tuesday: { available: true, slots: ['10:00-11:00', '13:00-14:00', '15:00-16:00'] },
          wednesday: { available: true, slots: ['09:00-10:00', '14:00-15:00', '16:00-17:00'] },
          thursday: { available: true, slots: ['10:00-11:00', '13:00-14:00', '15:00-16:00'] },
          friday: { available: true, slots: ['09:00-10:00', '14:00-15:00'] },
          saturday: { available: true, slots: ['10:00-11:00', '13:00-14:00'] },
          sunday: { available: false, slots: [] }
        },
        bio: 'Experienced mathematics tutor with a passion for making complex concepts accessible to students.',
        timezone: 'America/New_York'
      }
    },
    {
      email: 'prof.john.physics@example.com',
      name: 'Prof. John Rodriguez',
      role: 'TUTOR',
      password: 'password123',
      profile: {
        subjects: ['Physics', 'Chemistry', 'Engineering'],
        experience: '12 years teaching experience',
        education: 'PhD in Physics from Stanford University',
        hourlyRate: 85,
        availability: {
          monday: { available: false, slots: [] },
          tuesday: { available: true, slots: ['15:00-16:00', '17:00-18:00', '19:00-20:00'] },
          wednesday: { available: true, slots: ['14:00-15:00', '16:00-17:00', '18:00-19:00'] },
          thursday: { available: true, slots: ['15:00-16:00', '17:00-18:00', '19:00-20:00'] },
          friday: { available: true, slots: ['14:00-15:00', '16:00-17:00'] },
          saturday: { available: true, slots: ['10:00-11:00', '11:00-12:00', '13:00-14:00'] },
          sunday: { available: true, slots: ['14:00-15:00', '15:00-16:00'] }
        },
        bio: 'University professor specializing in physics and chemistry with a focus on practical applications.',
        timezone: 'America/Chicago'
      }
    },
    {
      email: 'ms.emma.english@example.com',
      name: 'Ms. Emma Thompson',
      role: 'TUTOR',
      password: 'password123',
      profile: {
        subjects: ['English', 'Literature', 'Writing'],
        experience: '6 years teaching experience',
        education: 'MA in English Literature from Columbia University',
        hourlyRate: 65,
        availability: {
          monday: { available: true, slots: ['10:00-11:00', '13:00-14:00', '15:00-16:00'] },
          tuesday: { available: true, slots: ['09:00-10:00', '14:00-15:00', '16:00-17:00'] },
          wednesday: { available: false, slots: [] },
          thursday: { available: true, slots: ['10:00-11:00', '13:00-14:00', '15:00-16:00'] },
          friday: { available: true, slots: ['09:00-10:00', '14:00-15:00', '16:00-17:00'] },
          saturday: { available: true, slots: ['11:00-12:00', '12:00-13:00'] },
          sunday: { available: false, slots: [] }
        },
        bio: 'Passionate English tutor helping students develop strong writing and analytical skills.',
        timezone: 'America/Los_Angeles'
      }
    },
    {
      email: 'mr.mike.cs@example.com',
      name: 'Mr. Mike Johnson',
      role: 'TUTOR',
      password: 'password123',
      profile: {
        subjects: ['Computer Science', 'Programming', 'Web Development'],
        experience: '5 years industry experience + 3 years teaching',
        education: 'MS in Computer Science from UC Berkeley',
        hourlyRate: 70,
        availability: {
          monday: { available: true, slots: ['16:00-17:00', '18:00-19:00', '20:00-21:00'] },
          tuesday: { available: true, slots: ['17:00-18:00', '19:00-20:00', '21:00-22:00'] },
          wednesday: { available: true, slots: ['16:00-17:00', '18:00-19:00', '20:00-21:00'] },
          thursday: { available: true, slots: ['17:00-18:00', '19:00-20:00', '21:00-22:00'] },
          friday: { available: true, slots: ['16:00-17:00', '18:00-19:00'] },
          saturday: { available: true, slots: ['13:00-14:00', '14:00-15:00', '15:00-16:00'] },
          sunday: { available: true, slots: ['14:00-15:00', '15:00-16:00', '16:00-17:00'] }
        },
        bio: 'Software engineer turned educator, specializing in programming and web development.',
        timezone: 'America/Denver'
      }
    }
  ];

  // Create students
  const createdStudents = [];
  for (const studentData of students) {
    const hashedPassword = await hashPassword(studentData.password);
    const user = await prisma.user.create({
      data: {
        email: studentData.email,
        name: studentData.name,
        role: studentData.role,
        password: hashedPassword,
        provider: 'email'
      }
    });

    const profile = await prisma.studentProfile.create({
      data: {
        userId: user.id,
        grade: studentData.profile.grade,
        subjects: studentData.profile.subjects
      }
    });

    createdStudents.push({ user, profile });
    console.log(`✅ Created student: ${user.name} (${user.email})`);
  }

  // Create tutors
  const createdTutors = [];
  for (const tutorData of tutors) {
    const hashedPassword = await hashPassword(tutorData.password);
    const user = await prisma.user.create({
      data: {
        email: tutorData.email,
        name: tutorData.name,
        role: tutorData.role,
        password: hashedPassword,
        provider: 'email'
      }
    });

    const profile = await prisma.tutorProfile.create({
      data: {
        userId: user.id,
        subjects: tutorData.profile.subjects,
        experience: tutorData.profile.experience,
        qualifications: tutorData.profile.education,
        hourlyRate: tutorData.profile.hourlyRate,
        availability: tutorData.profile.availability,
        bio: tutorData.profile.bio,
        mode: 'online',
        location: 'Remote',
        contact: tutorData.email,
        languages: ['English'],
        profilePicture: ''
      }
    });

    createdTutors.push({ user, profile });
    console.log(`✅ Created tutor: ${user.name} (${user.email})`);
  }

  // Create bookings with different statuses
  console.log('📅 Creating bookings...');
  const bookings = [];
  
  // Past completed bookings
  const pastDate = new Date();
  pastDate.setDate(pastDate.getDate() - 7);
  
  for (let i = 0; i < 3; i++) {
    const bookingDate = new Date(pastDate);
    bookingDate.setDate(bookingDate.getDate() + i);
    bookingDate.setHours(14 + i, 0, 0, 0); // 2 PM, 3 PM, 4 PM
    
    const booking = await prisma.booking.create({
      data: {
        studentId: createdStudents[i % createdStudents.length].profile.id,
        tutorId: createdTutors[i % createdTutors.length].profile.id,
        startTime: bookingDate,
        endTime: new Date(bookingDate.getTime() + 60 * 60 * 1000), // 1 hour later
        status: 'completed',
        subject: createdTutors[i % createdTutors.length].profile.subjects[0]
      }
    });
    bookings.push(booking);
  }

  // Upcoming confirmed bookings
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 3);
  
  for (let i = 0; i < 2; i++) {
    const bookingDate = new Date(futureDate);
    bookingDate.setDate(bookingDate.getDate() + i);
    bookingDate.setHours(15 + i, 0, 0, 0); // 3 PM, 4 PM
    
    const booking = await prisma.booking.create({
      data: {
        studentId: createdStudents[i % createdStudents.length].profile.id,
        tutorId: createdTutors[i % createdTutors.length].profile.id,
        startTime: bookingDate,
        endTime: new Date(bookingDate.getTime() + 60 * 60 * 1000), // 1 hour later
        status: 'upcoming',
        subject: createdTutors[i % createdTutors.length].profile.subjects[0]
      }
    });
    bookings.push(booking);
  }

  // Pending bookings
  const pendingDate = new Date();
  pendingDate.setDate(pendingDate.getDate() + 5);
  
  for (let i = 0; i < 2; i++) {
    const bookingDate = new Date(pendingDate);
    bookingDate.setDate(bookingDate.getDate() + i);
    bookingDate.setHours(16 + i, 0, 0, 0); // 4 PM, 5 PM
    
    const booking = await prisma.booking.create({
      data: {
        studentId: createdStudents[(i + 2) % createdStudents.length].profile.id,
        tutorId: createdTutors[(i + 2) % createdTutors.length].profile.id,
        startTime: bookingDate,
        endTime: new Date(bookingDate.getTime() + 60 * 60 * 1000), // 1 hour later
        status: 'pending',
        subject: createdTutors[(i + 2) % createdTutors.length].profile.subjects[0]
      }
    });
    bookings.push(booking);
  }

  console.log(`✅ Created ${bookings.length} bookings`);

  // Create conversations and messages
  console.log('💬 Creating conversations and messages...');
  const conversations = [];
  
  for (let i = 0; i < 4; i++) {
    const student = createdStudents[i % createdStudents.length];
    const tutor = createdTutors[i % createdTutors.length];
    
    const conversation = await prisma.conversation.create({
      data: {
        studentId: student.profile.id,
        tutorId: tutor.profile.id
      }
    });
    conversations.push(conversation);

    // Create some messages in each conversation
    const messages = [
      {
        content: `Hi ${tutor.user.name}, I'm interested in learning ${tutor.profile.subjects[0]}. Are you available for tutoring?`,
        senderId: student.user.id,
        receiverId: tutor.user.id,
        conversationId: conversation.id
      },
      {
        content: `Hello ${student.user.name}! Yes, I'd be happy to help you with ${tutor.profile.subjects[0]}. What specific topics would you like to focus on?`,
        senderId: tutor.user.id,
        receiverId: student.user.id,
        conversationId: conversation.id
      },
      {
        content: `I'm struggling with the fundamentals. Could we start with the basics?`,
        senderId: student.user.id,
        receiverId: tutor.user.id,
        conversationId: conversation.id
      },
      {
        content: `Absolutely! Let's start with the fundamentals. I'll prepare some materials for our first session.`,
        senderId: tutor.user.id,
        receiverId: student.user.id,
        conversationId: conversation.id
      }
    ];

    for (const messageData of messages) {
      await prisma.message.create({
        data: {
          ...messageData,
          createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000) // Random time in last 7 days
        }
      });
    }
  }

  console.log(`✅ Created ${conversations.length} conversations with messages`);

  // Create notifications
  console.log('🔔 Creating notifications...');
  const notifications = [];
  
  // Booking notifications
  for (const booking of bookings) {
    if (booking.status === 'pending') {
      // Notification for tutor about new booking
      await prisma.notification.create({
        data: {
          userId: createdTutors.find(t => t.profile.id === booking.tutorId).user.id,
          type: 'BOOKING_REQUEST',
          title: 'New Booking Request',
          message: `You have a new booking request from ${createdStudents.find(s => s.profile.id === booking.studentId).user.name}`,
          read: false
        }
      });
    } else if (booking.status === 'upcoming') {
      // Notification for student about upcoming session
      await prisma.notification.create({
        data: {
          userId: createdStudents.find(s => s.profile.id === booking.studentId).user.id,
          type: 'UPCOMING_SESSION',
          title: 'Upcoming Session Reminder',
          message: `Your session with ${createdTutors.find(t => t.profile.id === booking.tutorId).user.name} is tomorrow`,
          read: false
        }
      });
    }
  }

  // Message notifications
  for (const conversation of conversations) {
    await prisma.notification.create({
      data: {
        userId: createdStudents.find(s => s.profile.id === conversation.studentId).user.id,
        type: 'NEW_MESSAGE',
        title: 'New Message',
        message: `You have a new message from ${createdTutors.find(t => t.profile.id === conversation.tutorId).user.name}`,
        read: false
      }
    });
  }

  console.log('✅ Created notifications');

  console.log('\n🎉 Comprehensive data ingestion completed!');
  console.log('\n📋 Summary:');
  console.log(`- ${createdStudents.length} students created`);
  console.log(`- ${createdTutors.length} tutors created`);
  console.log(`- ${bookings.length} bookings created (completed, upcoming, pending)`);
  console.log(`- ${conversations.length} conversations with messages created`);
  console.log('- Notifications created for various events');
  
  console.log('\n🔑 Login Credentials:');
  console.log('Students:');
  createdStudents.forEach(student => {
    console.log(`  ${student.user.email} / password123`);
  });
  console.log('\nTutors:');
  createdTutors.forEach(tutor => {
    console.log(`  ${tutor.user.email} / password123`);
  });
  
  console.log('\n✨ All users have password: password123');
}

main()
  .catch((e) => {
    console.error('❌ Error during data ingestion:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 