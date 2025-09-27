"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  BookOpen, 
  Calculator, 
  Globe, 
  Atom, 
  History, 
  Languages, 
  Users, 
  Microscope,
  FlaskConical,
  MapPin,
  Brain,
  Star,
  Trophy,
  GraduationCap,
  Award,
  Target,
  Lightbulb,
  BookMarked,
  Zap,
  Sparkles,
  Rocket,
  Crown,
  ChevronRight,
  TrendingUp
} from 'lucide-react'
import { getAllCompleteClasses } from '@/data/ncertDataIntegration'
import { useAuth } from '@/contexts/AuthContext'

// Icon mapping for dynamic icon rendering
const iconMap = {
  BookOpen,
  Calculator,
  Globe,
  Atom,
  History,
  Languages,
  Users,
  Microscope,
  FlaskConical,
  MapPin,
  Brain,
  Star,
  Trophy,
  GraduationCap,
  Award,
  Target,
  Lightbulb,
  BookMarked,
  Zap
};

export default function NCERTLearningPage() {
  const [selectedAgeGroup, setSelectedAgeGroup] = useState('all')
  const [hoveredClass, setHoveredClass] = useState<number | null>(null)
  const { user, isAuthenticated } = useAuth()
  
  const ncertClasses = getAllCompleteClasses()

  // Sample progress data (this would come from your database)
  const getUserProgress = (classNumber: number) => {
    const progressData = {
      1: { completed: 85, total: 120, streakDays: 7 },
      2: { completed: 78, total: 130, streakDays: 4 },
      3: { completed: 92, total: 140, streakDays: 12 },
      4: { completed: 88, total: 150, streakDays: 8 },
      5: { completed: 76, total: 160, streakDays: 5 },
      6: { completed: 84, total: 180, streakDays: 15 },
      7: { completed: 91, total: 200, streakDays: 21 },
      8: { completed: 87, total: 220, streakDays: 9 },
      9: { completed: 73, total: 250, streakDays: 6 },
      10: { completed: 95, total: 300, streakDays: 30 },
      11: { completed: 68, total: 350, streakDays: 14 },
      12: { completed: 82, total: 400, streakDays: 18 }
    };
    return progressData[classNumber as keyof typeof progressData] || { completed: 0, total: 100, streakDays: 0 };
  };

  const ageGroups = [
    { id: 'all', label: 'All Classes', range: '1-12' },
    { id: 'primary', label: 'Primary', range: '1-5' },
    { id: 'middle', label: 'Middle School', range: '6-8' },
    { id: 'secondary', label: 'Secondary', range: '9-10' },
    { id: 'senior', label: 'Senior Secondary', range: '11-12' }
  ];

  const filteredClasses = ncertClasses.filter((cls) => {
    if (selectedAgeGroup === 'all') return true;
    if (selectedAgeGroup === 'primary') return cls.classNumber <= 5;
    if (selectedAgeGroup === 'middle') return cls.classNumber >= 6 && cls.classNumber <= 8;
    if (selectedAgeGroup === 'secondary') return cls.classNumber >= 9 && cls.classNumber <= 10;
    if (selectedAgeGroup === 'senior') return cls.classNumber >= 11;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full opacity-20 blur-xl animate-pulse" />
        <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-20 blur-xl animate-pulse" />
        <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full opacity-20 blur-xl animate-pulse" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 mb-6">
            <Sparkles className="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400" />
            <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
              NCERT Learning Platform
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
              Choose Your
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-teal-600 to-green-600 bg-clip-text text-transparent">
              Learning Adventure
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            🎯 Interactive NCERT learning • 🤖 AI-powered tutoring • 🎮 Gamified progress • 📚 Classes 1-12
          </p>

          {isAuthenticated && user && (
            <div className="inline-flex items-center px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg">
              <Crown className="w-5 h-5 mr-2" />
              <span className="font-medium">Welcome back, {user.name}! 🌟</span>
            </div>
          )}
        </div>

        {/* Age Group Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {ageGroups.map((group) => (
            <Button
              key={group.id}
              variant={selectedAgeGroup === group.id ? "default" : "outline"}
              onClick={() => setSelectedAgeGroup(group.id)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105 hover:shadow-md ${
                selectedAgeGroup === group.id
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                  : ""
              }`}
            >
              {group.label}
              <Badge variant="secondary" className="ml-2">
                {group.range}
              </Badge>
            </Button>
          ))}
        </div>

        {/* Stats Overview */}
        {isAuthenticated && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { label: 'Chapters Completed', value: '47', icon: Trophy, color: 'from-yellow-400 to-orange-500' },
              { label: 'Study Streak', value: '12 days', icon: Zap, color: 'from-orange-400 to-red-500' },
              { label: 'AI Questions Asked', value: '234', icon: Brain, color: 'from-purple-400 to-pink-500' },
              { label: 'Quiz Score Average', value: '87%', icon: Target, color: 'from-green-400 to-blue-500' }
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="text-center border-0 shadow-lg">
                  <CardContent className="p-4">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center mx-auto mb-2`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Classes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredClasses.map((classData: any) => {
            const progress = getUserProgress(classData.classNumber);
            const progressPercentage = Math.round((progress.completed / progress.total) * 100);
            const IconComponent = iconMap[classData.icon as keyof typeof iconMap];

            return (
              <div
                key={classData.id}
                className="transform transition-all duration-300 hover:scale-105 hover:-translate-y-2"
                onMouseEnter={() => setHoveredClass(classData.classNumber)}
                onMouseLeave={() => setHoveredClass(null)}
              >
                <Link href={`/ncert/class${classData.classNumber}`}>
                  <Card className={`relative overflow-hidden border-0 shadow-xl cursor-pointer transition-all duration-300 bg-gradient-to-br ${classData.gradient} group`}>
                    {/* Animated Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12" />
                    </div>

                    <CardHeader className="relative z-10 pb-2">
                      <div className="flex items-center justify-between">
                        <div className={`w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                          {IconComponent && <IconComponent className="w-8 h-8 text-white" />}
                        </div>
                        {progress.streakDays > 0 && (
                          <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                            🔥 {progress.streakDays} day streak
                          </Badge>
                        )}
                      </div>
                      
                      <CardTitle className="text-2xl font-bold text-white group-hover:text-yellow-200 transition-colors">
                        {classData.className}
                      </CardTitle>
                      
                      <CardDescription className="text-white/80 text-sm">
                        {classData.ageGroup} • {classData.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="relative z-10 space-y-4">
                      <div className="flex items-center justify-between text-white/90 text-sm">
                        <span>{classData.subjects.length} Subjects</span>
                        <span>{progressPercentage}% Complete</span>
                      </div>
                      
                      <Progress 
                        value={progressPercentage} 
                        className="h-2 bg-white/20"
                      />
                      
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center text-white/90 text-sm">
                          <BookOpen className="w-4 h-4 mr-1" />
                          <span>{progress.completed}/{progress.total} lessons</span>
                        </div>
                        
                        <div className={`transform transition-transform duration-200 ${hoveredClass === classData.classNumber ? 'translate-x-1' : ''}`}>
                          <ChevronRight className="w-5 h-5 text-white group-hover:text-yellow-200" />
                        </div>
                      </div>
                    </CardContent>

                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Card>
                </Link>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Card className="inline-block border-0 shadow-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-1">
            <div className="bg-white dark:bg-gray-900 rounded-lg p-8">
              <Rocket className="w-16 h-16 mx-auto mb-4 text-purple-600" />
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Ready to Start Your Learning Journey?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
                Join thousands of students already learning with our AI-powered NCERT platform
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {!isAuthenticated && (
                  <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-xl">
                    Sign Up Free
                  </Button>
                )}
                <Link href="/learning-tools">
                  <Button variant="outline" size="lg" className="px-8 py-3 rounded-xl">
                    Explore AI Tools
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}