"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  BookOpen, 
  Users, 
  Star, 
  Clock, 
  DollarSign, 
  CheckCircle, 
  ArrowRight, 
  Play,
  GraduationCap,
  Target,
  Award,
  Heart,
  Zap,
  Shield,
  Globe,
  MessageSquare,
  Video,
  Calendar,
  TrendingUp,
  Sparkles,
  MapPin,
  Brain,
  Smartphone,
  Monitor,
  BookMarked,
  Trophy,
  Lightbulb,
  Mic,
  Languages,
  Bot,
  School,
  UserCheck,
  Clock4,
  Phone,
  Mail,
  MessageCircle
} from 'lucide-react'
import { LearningToolsProvider, ToolsLauncher } from '@/components/learning-tools';
import { useAuthPopup } from '@/hooks/useAuthPopup';
import { useAuth } from '@/contexts/AuthContext';

export default function Home() {
  const { openPopup } = useAuthPopup();
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  // Redirect authenticated users to their appropriate dashboard
  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === 'STUDENT') {
        router.push('/student/dashboard');
      } else if (user.role === 'TUTOR') {
        router.push('/tutor/dashboard');
      } else {
        router.push('/dashboard'); // fallback
      }
    }
  }, [isAuthenticated, user, router]);

  // Show loading or return null while redirecting
  if (isAuthenticated && user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Redirecting to your dashboard...</p>
        </div>
      </div>
    );
  }
  
  const delhiLocations = [
    { name: "Lajpat Nagar", students: 150, tutors: 25, rating: 4.8 },
    { name: "Rohini", students: 120, tutors: 20, rating: 4.7 },
    { name: "Dwarka", students: 180, tutors: 30, rating: 4.9 },
    { name: "Saket", students: 90, tutors: 15, rating: 4.6 },
    { name: "Pitampura", students: 110, tutors: 18, rating: 4.5 },
    { name: "Janakpuri", students: 95, tutors: 16, rating: 4.7 }
  ]

  const courseCategories = [
    { name: "Kindergarten", icon: <School className="h-6 w-6" />, color: "bg-pink-500", courses: 12 },
    { name: "Primary (1-5)", icon: <BookOpen className="h-6 w-6" />, color: "bg-blue-500", courses: 25 },
    { name: "Middle (6-8)", icon: <GraduationCap className="h-6 w-6" />, color: "bg-green-500", courses: 30 },
    { name: "Secondary (9-10)", icon: <Target className="h-6 w-6" />, color: "bg-purple-500", courses: 35 },
    { name: "Senior Secondary", icon: <Trophy className="h-6 w-6" />, color: "bg-orange-500", courses: 40 },
    { name: "Competitive Exams", icon: <Award className="h-6 w-6" />, color: "bg-red-500", courses: 20 }
  ]

  const features = [
    {
      icon: <Brain className="h-8 w-8" />,
      title: "AI-Powered Learning",
      description: "Personalized learning paths with AI recommendations and smart assessments"
    },
    {
      icon: <Monitor className="h-8 w-8" />,
      title: "Online & Offline",
      description: "Flexible learning modes - attend classes online or meet tutors in Delhi"
    },
    {
      icon: <Mic className="h-8 w-8" />,
      title: "Voice Support",
      description: "Multilingual voice support in Indian languages for better understanding"
    },
    {
      icon: <Bot className="h-8 w-8" />,
      title: "AI Teaching Assistant",
      description: "24/7 AI chatbot for instant doubt resolution and course guidance"
    }
  ]

  const stats = [
    { number: "50,000+", label: "Students Enrolled" },
    { number: "2,000+", label: "Expert Tutors" },
    { number: "100+", label: "Delhi Locations" },
    { number: "95%", label: "Success Rate" }
  ]

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Class 10 Student",
      avatar: "/avatars/priya.jpg",
      content: "The AI-powered learning helped me understand complex topics easily. My grades improved from 65% to 92%!",
      rating: 5,
      subject: "Mathematics & Science",
      location: "Lajpat Nagar"
    },
    {
      name: "Rahul Kumar",
      role: "JEE Aspirant",
      avatar: "/avatars/rahul.jpg",
      content: "The competitive exam preparation with AI assistance is amazing. Cleared my doubts instantly!",
      rating: 5,
      subject: "Physics & Chemistry",
      location: "Dwarka"
    },
    {
      name: "Mrs. Mehta",
      role: "Parent",
      avatar: "/avatars/mehta.jpg",
      content: "My daughter's confidence has improved tremendously. The offline sessions in Saket are very convenient.",
      rating: 5,
      subject: "English & Hindi",
      location: "Saket"
    }
  ]

  return (
    <LearningToolsProvider questionRef="home-page" initialText="">
      <ToolsLauncher />
      <div className="min-h-screen bg-background">
        
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
          <div className="relative px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <div className="text-center">
                <div className="flex items-center justify-center mb-6">
                  <Badge variant="secondary" className="px-4 py-2 text-sm font-medium">
                    <Sparkles className="h-4 w-4 mr-2" />
                    #1 AI-Powered Learning Platform
                  </Badge>
                </div>
                
                <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
                  Smart Teaching. Smarter Students
                  <br />
                  <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">Fueling Futures with AI</span>
                </h1>
                
                <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
                  Experience personalized learning with AI assistance. Choose from online classes or offline sessions 
                  across Delhi. Expert tutors, smart recommendations, and voice support in Indian languages.
                </p>
                
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button size="lg" className="px-8 py-3 text-lg" onClick={() => openPopup('register', 'STUDENT')}>
                    <UserCheck className="mr-2 h-5 w-5" />
                    Register as Student
                  </Button>
                  <Button variant="outline" size="lg" className="px-8 py-3 text-lg" onClick={() => openPopup('register', 'TUTOR')}>
                    <GraduationCap className="mr-2 h-5 w-5" />
                    Register as Tutor
                  </Button>
                  <Button variant="outline" size="lg" className="px-8 py-3 text-lg" asChild>
                    <Link href="/courses">
                      <BookOpen className="mr-2 h-5 w-5" />
                      Explore Courses
                </Link>
                  </Button>
                </div>

                {/* Stats */}
                <div className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-4">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-3xl font-bold text-foreground">{stat.number}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 px-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Why Choose Our Platform?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Advanced AI technology meets traditional learning excellence
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-card to-card/50">
                  <CardHeader>
                    <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Course Categories Section */}
        <section className="py-24 px-6 sm:px-6 lg:px-8 bg-muted/30">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Courses for Every Level
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                From Kindergarten to Competitive Exams - We've got you covered
              </p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {courseCategories.map((category, index) => (
                <Link key={index} href="/courses" className="block">
                  <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-0 bg-gradient-to-br from-card to-card/50">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}>
                          {category.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{category.name}</h3>
                          <p className="text-sm text-muted-foreground">{category.courses} courses available</p>
                        </div>
                        <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Delhi Offline Locations Section */}
        <section className="py-24 px-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Offline Meet Locations in Delhi
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Convenient locations across Delhi for in-person learning sessions
              </p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {delhiLocations.map((location, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-card to-card/50">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                          <MapPin className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{location.name}</h3>
                          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span>{location.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <div className="font-semibold text-foreground">{location.students}</div>
                        <div className="text-muted-foreground">Students</div>
                      </div>
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <div className="font-semibold text-foreground">{location.tutors}</div>
                        <div className="text-muted-foreground">Tutors</div>
                      </div>
                    </div>
                    
                    <Button className="w-full mt-4" size="sm" asChild>
                      <Link href="/offline-meet">
                        <Calendar className="mr-2 h-4 w-4" />
                        Book Session
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
                </div>
        </section>

        {/* AI Chatbot Section */}
        <section className="py-24 px-6 sm:px-6 lg:px-8 bg-muted/30">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-6">
                  Meet ब्रह्मांड Ai - Your Learning Assistant
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Get instant answers to your questions, personalized course recommendations, and 24/7 learning support. 
                  Our AI assistant supports multiple Indian languages and voice interactions.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Instant doubt resolution</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Personalized course recommendations</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Voice support in Indian languages</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>24/7 learning assistance</span>
                </div>
                </div>
                
                <Button className="mt-8" size="lg" asChild>
                  <Link href="/ai-teaching">
                    <Bot className="mr-2 h-5 w-5" />
                    Start Chatting with AI
                  </Link>
                </Button>
              </div>
              
              <div className="relative">
                <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl p-8 border-0 shadow-lg">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <Bot className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">ब्रह्मांड Ai</h3>
                      <p className="text-sm text-muted-foreground">Online • Learning Assistant</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-background rounded-lg p-4">
                      <p className="text-sm">Hello! I'm here to help you with your studies. What would you like to learn today?</p>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Mic className="mr-2 h-4 w-4" />
                        Voice
                      </Button>
                      <Button size="sm" variant="outline">
                        <Languages className="mr-2 h-4 w-4" />
                        हिंदी
                      </Button>
                      <Button size="sm" variant="outline">
                        <BookOpen className="mr-2 h-4 w-4" />
                        Courses
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24 px-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                What Our Students Say
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Real stories from students across Delhi
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="border-0 bg-gradient-to-br from-card to-card/50 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-center space-x-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-6 italic">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                        <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="secondary">
                            {testimonial.subject}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {testimonial.location}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl p-12">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-6">
                Ready to Start Your Learning Journey?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of students who are already learning smart with AI. 
                Choose your preferred mode - online or offline sessions in Delhi.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="px-8 py-3 text-lg" onClick={() => openPopup('register', 'STUDENT')}>
                  <UserCheck className="mr-2 h-5 w-5" />
                  Register as Student
                </Button>
                <Button variant="outline" size="lg" className="px-8 py-3 text-lg" onClick={() => openPopup('register', 'TUTOR')}>
                  <GraduationCap className="mr-2 h-5 w-5" />
                  Become a Tutor
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </LearningToolsProvider>
  )
} 
