const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Real educational data
const subjects = [
  'Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'History', 
  'Geography', 'Computer Science', 'Economics', 'Literature', 'Art', 'Music'
];

const grades = ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 
                'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12'];

const locations = [
  'Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 
  'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Kanpur', 'Nagpur'
];

const qualifications = [
  'B.Tech Computer Science', 'M.Tech Computer Science', 'B.Sc Mathematics', 
  'M.Sc Mathematics', 'B.Sc Physics', 'M.Sc Physics', 'B.Sc Chemistry', 
  'M.Sc Chemistry', 'B.Sc Biology', 'M.Sc Biology', 'B.A English', 'M.A English',
  'Ph.D Mathematics', 'Ph.D Physics', 'Ph.D Chemistry', 'Ph.D Biology'
];

const languages = ['English', 'Hindi', 'Spanish', 'French', 'German', 'Chinese', 'Japanese'];

// Generate realistic names
const firstNames = [
  'Arjun', 'Priya', 'Rahul', 'Anita', 'Vikram', 'Sneha', 'Aditya', 'Meera',
  'Karan', 'Zara', 'Rohan', 'Isha', 'Aryan', 'Diya', 'Shaurya', 'Ananya',
  'Vivaan', 'Kiara', 'Dhruv', 'Aisha', 'Arnav', 'Myra', 'Krish', 'Riya',
  'Advait', 'Tara', 'Ishaan', 'Zara', 'Vedant', 'Aria', 'Shaan', 'Nisha'
];

const lastNames = [
  'Sharma', 'Patel', 'Singh', 'Kumar', 'Verma', 'Gupta', 'Malhotra', 'Kapoor',
  'Joshi', 'Yadav', 'Chopra', 'Reddy', 'Kaur', 'Khan', 'Mehta', 'Chauhan',
  'Tiwari', 'Mishra', 'Agarwal', 'Bhatt', 'Nair', 'Iyer', 'Menon', 'Pillai'
];

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomElements(array, count) {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function generateRandomName() {
  return `${getRandomElement(firstNames)} ${getRandomElement(lastNames)}`;
}

function generateRandomEmail(name) {
  const cleanName = name.toLowerCase().replace(/\s+/g, '');
  const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com'];
  return `${cleanName}${Math.floor(Math.random() * 1000)}@${getRandomElement(domains)}`;
}

function generateAvailability() {
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const availability = {};
  
  days.forEach(day => {
    availability[day] = {
      available: Math.random() > 0.3, // 70% chance of being available
      slots: []
    };
    
    if (availability[day].available) {
      // Generate 2-4 time slots per day
      const numSlots = Math.floor(Math.random() * 3) + 2;
      for (let i = 0; i < numSlots; i++) {
        const startHour = 9 + Math.floor(Math.random() * 10); // 9 AM to 7 PM
        const endHour = startHour + 1;
        availability[day].slots.push({
          start: `${startHour.toString().padStart(2, '0')}:00`,
          end: `${endHour.toString().padStart(2, '0')}:00`
        });
      }
    }
  });
  
  return availability;
}

async function createUsers() {
  console.log('🔄 Creating users...');
  
  const users = [];
  
  // Create 20 students
  for (let i = 0; i < 20; i++) {
    const name = generateRandomName();
    const email = generateRandomEmail(name);
    
    const user = await prisma.user.create({
      data: {
        email,
        name,
        role: 'STUDENT',
        provider: 'email',
        emailVerified: true,
        lastLogin: new Date(),
        studentProfile: {
          create: {
            grade: getRandomElement(grades),
            subjects: getRandomElements(subjects, Math.floor(Math.random() * 4) + 2)
          }
        }
      }
    });
    
    users.push(user);
    console.log(`✅ Created student: ${name}`);
  }
  
  // Create 15 tutors
  for (let i = 0; i < 15; i++) {
    const name = generateRandomName();
    const email = generateRandomEmail(name);
    
    const user = await prisma.user.create({
      data: {
        email,
        name,
        role: 'TUTOR',
        provider: 'email',
        emailVerified: true,
        lastLogin: new Date(),
        tutorProfile: {
          create: {
            bio: `Experienced ${getRandomElement(subjects)} tutor with ${Math.floor(Math.random() * 10) + 2} years of teaching experience.`,
            subjects: getRandomElements(subjects, Math.floor(Math.random() * 3) + 1),
            hourlyRate: Math.floor(Math.random() * 500) + 200, // ₹200-700 per hour
            availability: generateAvailability(),
            qualifications: getRandomElement(qualifications),
            mode: getRandomElement(['online', 'offline', 'hybrid']),
            location: getRandomElement(locations),
            experience: `${Math.floor(Math.random() * 10) + 2} years`,
            contact: `+91${Math.floor(Math.random() * 9000000000) + 1000000000}`,
            languages: getRandomElements(languages, Math.floor(Math.random() * 3) + 1),
            profilePicture: `/avatars/tutor-${i + 1}.jpg`
          }
        }
      }
    });
    
    users.push(user);
    console.log(`✅ Created tutor: ${name}`);
  }
  
  return users;
}

async function createBookings(users) {
  console.log('🔄 Creating bookings...');
  
  const students = users.filter(u => u.role === 'STUDENT');
  const tutors = users.filter(u => u.role === 'TUTOR');
  
  const bookings = [];
  
  // Create 50 bookings
  for (let i = 0; i < 50; i++) {
    const student = getRandomElement(students);
    const tutor = getRandomElement(tutors);
    
    // Get student and tutor profiles
    const studentProfile = await prisma.studentProfile.findUnique({
      where: { userId: student.id }
    });
    
    const tutorProfile = await prisma.tutorProfile.findUnique({
      where: { userId: tutor.id }
    });
    
    if (!studentProfile || !tutorProfile) continue;
    
    // Generate random date (within last 30 days to next 30 days)
    const daysOffset = Math.floor(Math.random() * 60) - 30;
    const startTime = new Date();
    startTime.setDate(startTime.getDate() + daysOffset);
    startTime.setHours(9 + Math.floor(Math.random() * 10), Math.floor(Math.random() * 4) * 15);
    
    const endTime = new Date(startTime);
    endTime.setHours(endTime.getHours() + (Math.floor(Math.random() * 2) + 1)); // 1-2 hours
    
    const statuses = ['pending', 'confirmed', 'completed', 'cancelled'];
    const status = getRandomElement(statuses);
    
    const booking = await prisma.booking.create({
      data: {
        studentId: studentProfile.id,
        tutorId: tutorProfile.id,
        startTime,
        endTime,
        subject: getRandomElement(tutorProfile.subjects),
        status
      }
    });
    
    bookings.push(booking);
    console.log(`✅ Created booking: ${student.name} with ${tutor.name} - ${booking.subject}`);
  }
  
  return bookings;
}

async function createConversations(users) {
  console.log('🔄 Creating conversations...');
  
  const students = users.filter(u => u.role === 'STUDENT');
  const tutors = users.filter(u => u.role === 'TUTOR');
  
  const conversations = [];
  
  // Create 30 conversations
  for (let i = 0; i < 30; i++) {
    const student = getRandomElement(students);
    const tutor = getRandomElement(tutors);
    
    // Get student and tutor profiles
    const studentProfile = await prisma.studentProfile.findUnique({
      where: { userId: student.id }
    });
    
    const tutorProfile = await prisma.tutorProfile.findUnique({
      where: { userId: tutor.id }
    });
    
    if (!studentProfile || !tutorProfile) continue;
    
    const conversation = await prisma.conversation.create({
      data: {
        studentId: studentProfile.id,
        tutorId: tutorProfile.id
      }
    });
    
    conversations.push(conversation);
    console.log(`✅ Created conversation: ${student.name} with ${tutor.name}`);
  }
  
  return conversations;
}

async function createMessages(conversations, users) {
  console.log('🔄 Creating messages...');
  
  const messageTemplates = [
    "Hi! I'm interested in learning {subject}. Are you available?",
    "Hello! I need help with {subject}. Can we schedule a session?",
    "Hi there! I'm looking for a {subject} tutor. What are your rates?",
    "Hello! I have some questions about {subject}. Can you help me?",
    "Hi! I'm preparing for my {subject} exam. Do you offer test prep?",
    "Sure! I'd be happy to help you with {subject}. When would you like to start?",
    "Of course! I'm available for {subject} tutoring. What's your schedule like?",
    "Great! I can definitely help with {subject}. Let's discuss your goals.",
    "Perfect! I have experience teaching {subject}. What specific topics do you need help with?",
    "Excellent! I'm available for {subject} sessions. What's your current level?"
  ];
  
  for (const conversation of conversations) {
    // Get conversation details
    const conv = await prisma.conversation.findUnique({
      where: { id: conversation.id },
      include: {
        student: { include: { user: true } },
        tutor: { include: { user: true } }
      }
    });
    
    if (!conv) continue;
    
    // Create 3-8 messages per conversation
    const numMessages = Math.floor(Math.random() * 6) + 3;
    
    for (let i = 0; i < numMessages; i++) {
      const isStudentMessage = i % 2 === 0;
      const sender = isStudentMessage ? conv.student.user : conv.tutor.user;
      const receiver = isStudentMessage ? conv.tutor.user : conv.student.user;
      
      let content;
      if (i === 0) {
        // First message - use template
        const template = getRandomElement(messageTemplates);
        const subject = getRandomElement(subjects);
        content = template.replace('{subject}', subject);
      } else {
        // Subsequent messages - simple responses
        const responses = [
          "That sounds great!",
          "I'm looking forward to our session.",
          "Thank you for the information.",
          "Perfect! See you then.",
          "I have a few questions...",
          "Can you explain that further?",
          "That works for me!",
          "I'll prepare some questions.",
          "Looking forward to learning!",
          "Thanks for your help!"
        ];
        content = getRandomElement(responses);
      }
      
      await prisma.message.create({
        data: {
          conversationId: conversation.id,
          senderId: sender.id,
          receiverId: receiver.id,
          content
        }
      });
    }
    
    console.log(`✅ Created ${numMessages} messages for conversation: ${conv.student.user.name} ↔ ${conv.tutor.user.name}`);
  }
}

async function createNotifications(users) {
  console.log('🔄 Creating notifications...');
  
  const notificationTypes = ['message', 'booking', 'payment', 'system'];
  const notificationTitles = [
    'New Message', 'Booking Confirmed', 'Payment Received', 'System Update',
    'Session Reminder', 'Profile Updated', 'New Student', 'Payment Due'
  ];
  
  const notificationMessages = [
    'You have a new message from your tutor.',
    'Your booking has been confirmed.',
    'Payment has been processed successfully.',
    'System maintenance scheduled for tonight.',
    'Your session starts in 15 minutes.',
    'Your profile has been updated successfully.',
    'A new student has booked a session with you.',
    'Payment is due for your upcoming session.'
  ];
  
  for (const user of users) {
    // Create 2-5 notifications per user
    const numNotifications = Math.floor(Math.random() * 4) + 2;
    
    for (let i = 0; i < numNotifications; i++) {
      const type = getRandomElement(notificationTypes);
      const title = getRandomElement(notificationTitles);
      const message = getRandomElement(notificationMessages);
      
      await prisma.notification.create({
        data: {
          type,
          title,
          message,
          read: Math.random() > 0.7, // 30% chance of being read
          userId: user.id
        }
      });
    }
    
    console.log(`✅ Created ${numNotifications} notifications for ${user.name}`);
  }
}

async function main() {
  try {
    console.log('🚀 Starting real data ingestion...');
    
    // Clear existing data
    console.log('🧹 Clearing existing data...');
    await prisma.notification.deleteMany();
    await prisma.message.deleteMany();
    await prisma.conversation.deleteMany();
    await prisma.booking.deleteMany();
    await prisma.studentProfile.deleteMany();
    await prisma.tutorProfile.deleteMany();
    await prisma.user.deleteMany();
    
    console.log('✅ Existing data cleared');
    
    // Create users (students and tutors)
    const users = await createUsers();
    
    // Create bookings
    const bookings = await createBookings(users);
    
    // Create conversations
    const conversations = await createConversations(users);
    
    // Create messages
    await createMessages(conversations, users);
    
    // Create notifications
    await createNotifications(users);
    
    console.log('🎉 Real data ingestion completed successfully!');
    console.log(`📊 Created:`);
    console.log(`   - ${users.length} users (${users.filter(u => u.role === 'STUDENT').length} students, ${users.filter(u => u.role === 'TUTOR').length} tutors)`);
    console.log(`   - ${bookings.length} bookings`);
    console.log(`   - ${conversations.length} conversations`);
    console.log(`   - Multiple messages and notifications`);
    
  } catch (error) {
    console.error('❌ Error during data ingestion:', error);
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  main();
}

module.exports = { main }; 