"use client"

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
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
  ArrowLeft,
  ChevronRight,
  Play,
  Clock,
  CheckCircle2,
  Lock,
  Crown,
  MessageSquare,
  Mic,
  FileText,
  BarChart3,
  Camera
} from 'lucide-react'
import { getCompleteClassData } from '@/data/ncertDataIntegration'
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

export default function ClassDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
  
  // Extract class number from className parameter (e.g., "class-6" -> 6 or "class6" -> 6)
  const className = params.className as string
  let classNumber: number | null = null
  
  if (className) {
    // Handle both formats: "class-1" and "class1"
    if (className.includes('-')) {
      classNumber = parseInt(className.replace('class-', ''))
    } else {
      classNumber = parseInt(className.replace('class', ''))
    }
  }
  
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null)
  
  if (!classNumber) {
    return <div>Invalid class number</div>
  }
  
  const classData = getCompleteClassData(classNumber)
  
  if (!classData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Class Not Found</h1>
          <p className="text-gray-600 mb-4">The requested class data is not available.</p>
          <Link href="/ncert">
            <Button>Back to Classes</Button>
          </Link>
        </Card>
      </div>
    )
  }

  // Sample progress data
  const getSubjectProgress = (subjectId: string) => {
    const progressData = {
      'math-6': { completed: 8, total: 14, timeSpent: 420, averageScore: 87 },
      'sci-6': { completed: 12, total: 16, timeSpent: 360, averageScore: 92 },
      'eng-6': { completed: 7, total: 10, timeSpent: 280, averageScore: 85 },
      'hindi-6': { completed: 6, total: 12, timeSpent: 240, averageScore: 89 },
      'sst-6': { completed: 10, total: 18, timeSpent: 320, averageScore: 83 }
    };
    return progressData[subjectId as keyof typeof progressData] || { completed: 0, total: 10, timeSpent: 0, averageScore: 0 };
  };

  const aiTools = [
    { id: 'summary', name: 'AI Summary', description: 'Get chapter summaries', icon: FileText, color: 'bg-blue-500' },
    { id: 'flashcards', name: 'Smart Flashcards', description: 'Auto-generate flashcards', icon: Star, color: 'bg-green-500' },
    { id: 'quiz', name: 'Quick Quiz', description: 'Practice questions', icon: Target, color: 'bg-purple-500' },
    { id: 'tutor', name: 'Ask TutorBuddy', description: 'Get instant help', icon: MessageSquare, color: 'bg-orange-500' },
    { id: 'voice', name: 'Voice Tutor', description: 'Listen to explanations', icon: Mic, color: 'bg-pink-500' },
    { id: 'explain', name: 'Magic Explain', description: 'Simplify concepts', icon: Sparkles, color: 'bg-indigo-500' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => router.back()}
              className="flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {classData.className}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                {classData.ageGroup} • {classData.description}
              </p>
            </div>
          </div>
          
          {isAuthenticated && user && (
            <div className="flex items-center space-x-3">
              <Badge variant="outline" className="px-3 py-1">
                <Crown className="w-4 h-4 mr-1" />
                Premium Access
              </Badge>
            </div>
          )}
        </div>

        {/* AI Learning Tools Section */}
        <Card className="mb-8 border-0 shadow-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <Brain className="w-6 h-6 mr-2" />
              AI Learning Tools
            </CardTitle>
            <CardDescription className="text-white/80">
              Enhance your learning with AI-powered features
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {aiTools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <div
                    key={tool.id}
                    className="flex flex-col items-center p-4 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all duration-300 cursor-pointer group"
                  >
                    <div className={`w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-sm font-medium text-center">{tool.name}</span>
                    <span className="text-xs text-white/70 text-center mt-1">{tool.description}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Class Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Subjects', value: classData.subjects.length.toString(), icon: BookOpen, color: 'from-blue-400 to-blue-600' },
            { label: 'Chapters Available', value: classData.subjects.reduce((sum, subject) => sum + subject.totalChapters, 0).toString(), icon: FileText, color: 'from-green-400 to-green-600' },
            { label: 'AI Tools', value: aiTools.length.toString(), icon: Brain, color: 'from-purple-400 to-purple-600' },
            { label: 'Interactive Features', value: '25+', icon: Zap, color: 'from-orange-400 to-orange-600' }
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

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classData.subjects.map((subject) => {
            const progress = getSubjectProgress(subject.id);
            const progressPercentage = Math.round((progress.completed / progress.total) * 100);
            const IconComponent = iconMap[subject.icon as keyof typeof iconMap];
            
            return (
              <div
                key={subject.id}
                className="transform transition-all duration-300 hover:scale-105 hover:-translate-y-2"
              >
                <Link href={`/ncert/${className}/${subject.code.toLowerCase()}`}>
                  <Card className={`relative overflow-hidden border-0 shadow-xl cursor-pointer transition-all duration-300 bg-gradient-to-br ${subject.gradient} group`}>
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                      <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-12 translate-x-12" />
                      <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-8 -translate-x-8" />
                    </div>

                    <CardHeader className="relative z-10 pb-2">
                      <div className="flex items-center justify-between">
                        <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          {IconComponent && <IconComponent className="w-7 h-7 text-white" />}
                        </div>
                        <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                          {subject.totalChapters} chapters
                        </Badge>
                      </div>
                      
                      <CardTitle className="text-xl font-bold text-white group-hover:text-yellow-200 transition-colors mt-3">
                        {subject.name}
                      </CardTitle>
                      
                      <CardDescription className="text-white/80 text-sm">
                        {subject.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="relative z-10 space-y-4">
                      <div className="flex items-center justify-between text-white/90 text-sm">
                        <span>Progress</span>
                        <span>{progressPercentage}% Complete</span>
                      </div>
                      
                      <Progress 
                        value={progressPercentage} 
                        className="h-2 bg-white/20"
                      />
                      
                      <div className="flex items-center justify-between text-white/90 text-xs">
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          <span>{Math.round(progress.timeSpent / 60)}h studied</span>
                        </div>
                        <div className="flex items-center">
                          <BarChart3 className="w-3 h-3 mr-1" />
                          <span>{progress.averageScore}% avg score</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center text-white/90 text-sm">
                          <CheckCircle2 className="w-4 h-4 mr-1" />
                          <span>{progress.completed}/{progress.total} chapters</span>
                        </div>
                        
                        <ChevronRight className="w-5 h-5 text-white group-hover:text-yellow-200 transform group-hover:translate-x-1 transition-all" />
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

        {/* Study Plan Recommendation */}
        <Card className="mt-8 border-0 shadow-lg bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
          <CardHeader>
            <CardTitle className="flex items-center text-gray-900 dark:text-white">
              <Target className="w-6 h-6 mr-2 text-green-600" />
              Recommended Study Plan
            </CardTitle>
            <CardDescription>
              AI-powered personalized study recommendations for {classData.className}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold text-green-600 mb-2">Today's Goals</h4>
                <ul className="text-sm space-y-1">
                  <li>• Complete Math Chapter 2</li>
                  <li>• Practice Science flashcards</li>
                  <li>• Take English quiz</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-600 mb-2">This Week</h4>
                <ul className="text-sm space-y-1">
                  <li>• Finish 3 chapters across subjects</li>
                  <li>• Complete 5 AI-generated quizzes</li>
                  <li>• Ask 10 questions to TutorBuddy</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-600 mb-2">Study Tips</h4>
                <ul className="text-sm space-y-1">
                  <li>• Use voice tutor for difficult concepts</li>
                  <li>• Create flashcards after each chapter</li>
                  <li>• Review with AI summaries</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 text-center">
              <Button className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
                Start Today's Learning
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}