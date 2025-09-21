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
  Camera,
  Volume2,
  Download,
  Share2,
  Bookmark,
  Eye,
  PenTool,
  HelpCircle
} from 'lucide-react'
import { getCompleteSubjectData } from '@/data/ncertDataIntegration'
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

export default function SubjectDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
  
  // Extract parameters
  const className = params.className as string
  const subjectCode = params.subjectCode as string
  
  // Handle both formats: "class-1" and "class1"
  let classNumber: number | null = null
  if (className) {
    if (className.includes('-')) {
      classNumber = parseInt(className.replace('class-', ''))
    } else {
      classNumber = parseInt(className.replace('class', ''))
    }
  }
  
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  
  if (!classNumber || !subjectCode) {
    return <div>Invalid parameters</div>
  }
  
  const subjectData = getCompleteSubjectData(classNumber, subjectCode.toUpperCase())
  
  if (!subjectData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Subject Not Found</h1>
          <p className="text-gray-600 mb-4">The requested subject data is not available.</p>
          <Link href={`/ncert/${className}`}>
            <Button>Back to Class</Button>
          </Link>
        </Card>
      </div>
    )
  }

  // Sample chapter progress data
  const getChapterProgress = (chapterId: string) => {
    const progressData = {
      'math-6-ch1': { completed: true, timeSpent: 120, quizScore: 87, lastStudied: '2 days ago' },
      'math-6-ch2': { completed: false, timeSpent: 45, quizScore: null, lastStudied: 'Today' },
      'sci-6-ch1': { completed: true, timeSpent: 90, quizScore: 92, lastStudied: '1 day ago' }
    };
    return progressData[chapterId as keyof typeof progressData] || { 
      completed: false, 
      timeSpent: 0, 
      quizScore: null, 
      lastStudied: 'Not started' 
    };
  };

  const IconComponent = iconMap[subjectData.icon as keyof typeof iconMap];

  const aiLearningModes = [
    { 
      id: 'read', 
      name: 'Read', 
      description: 'NCERT text content', 
      icon: BookOpen, 
      color: 'bg-blue-500',
      action: 'Start Reading'
    },
    { 
      id: 'listen', 
      name: 'Listen', 
      description: 'AI voice narration', 
      icon: Volume2, 
      color: 'bg-green-500',
      action: 'Play Audio'
    },
    { 
      id: 'revise', 
      name: 'Revise', 
      description: 'Smart flashcards', 
      icon: Star, 
      color: 'bg-purple-500',
      action: 'Create Flashcards'
    },
    { 
      id: 'test', 
      name: 'Test', 
      description: 'Practice quiz', 
      icon: Target, 
      color: 'bg-orange-500',
      action: 'Take Quiz'
    },
    { 
      id: 'ask', 
      name: 'Ask', 
      description: 'AI tutor chat', 
      icon: MessageSquare, 
      color: 'bg-pink-500',
      action: 'Ask Question'
    },
    { 
      id: 'explain', 
      name: 'Explain', 
      description: 'Simplified concepts', 
      icon: Sparkles, 
      color: 'bg-indigo-500',
      action: 'Magic Explain'
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Hard': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

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
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${subjectData.gradient} flex items-center justify-center`}>
              {IconComponent && <IconComponent className="w-6 h-6 text-white" />}
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {subjectData.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Class {classNumber} • {subjectData.description}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Badge variant="outline" className="px-3 py-1">
              <Trophy className="w-4 h-4 mr-1" />
              {subjectData.totalChapters} Chapters
            </Badge>
            {isAuthenticated && (
              <Badge variant="outline" className="px-3 py-1">
                <Crown className="w-4 h-4 mr-1" />
                Premium Access
              </Badge>
            )}
          </div>
        </div>

        {/* Subject Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Chapters', value: subjectData.totalChapters.toString(), icon: BookOpen, color: 'from-blue-400 to-blue-600' },
            { label: 'Completed', value: Math.floor(subjectData.totalChapters * 0.6).toString(), icon: CheckCircle2, color: 'from-green-400 to-green-600' },
            { label: 'Average Score', value: '89%', icon: BarChart3, color: 'from-purple-400 to-purple-600' },
            { label: 'Study Time', value: '24h', icon: Clock, color: 'from-orange-400 to-orange-600' }
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

        {/* AI Learning Modes */}
        <Card className="mb-8 border-0 shadow-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <Brain className="w-6 h-6 mr-2" />
              AI Learning Modes
            </CardTitle>
            <CardDescription className="text-white/80">
              Choose how you want to learn each chapter
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {aiLearningModes.map((mode) => {
                const Icon = mode.icon;
                return (
                  <div
                    key={mode.id}
                    className="flex flex-col items-center p-4 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all duration-300 cursor-pointer group"
                  >
                    <div className={`w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-sm font-medium text-center">{mode.name}</span>
                    <span className="text-xs text-white/70 text-center mt-1">{mode.description}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* View Mode Toggle */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Chapters ({subjectData.chapters.length})
          </h2>
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              Grid View
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              List View
            </Button>
          </div>
        </div>

        {/* Chapters Grid/List */}
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
          {subjectData.chapters.map((chapter) => {
            const progress = getChapterProgress(chapter.id);
            const totalTopics = chapter.topics.length;
            const completedTopics = Math.floor(totalTopics * (progress.completed ? 1 : 0.3));
            
            return (
              <div
                key={chapter.id}
                className="transform transition-all duration-300 hover:scale-105 hover:-translate-y-1"
              >
                <Link href={`/ncert/${className}/${subjectCode}/chapter-${chapter.chapterNumber}`}>
                  <Card className={`relative overflow-hidden border-0 shadow-xl cursor-pointer transition-all duration-300 ${
                    viewMode === 'grid' 
                      ? 'bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900' 
                      : 'bg-white dark:bg-gray-800'
                  } group`}>
                    
                    {/* Chapter Number Badge */}
                    <div className="absolute top-4 right-4 z-10">
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${subjectData.gradient} flex items-center justify-center text-white font-bold text-sm`}>
                        {chapter.chapterNumber}
                      </div>
                    </div>

                    {/* Progress Indicator */}
                    {progress.completed && (
                      <div className="absolute top-4 left-4 z-10">
                        <CheckCircle2 className="w-6 h-6 text-green-500" />
                      </div>
                    )}

                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-purple-600 transition-colors pr-12">
                        {chapter.title}
                      </CardTitle>
                      <CardDescription className="text-sm">
                        {chapter.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {/* Topics Preview */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Topics</span>
                          <span className="text-gray-900 dark:text-white font-medium">
                            {completedTopics}/{totalTopics} completed
                          </span>
                        </div>
                        <Progress 
                          value={(completedTopics / totalTopics) * 100} 
                          className="h-2"
                        />
                      </div>

                      {/* Chapter Stats */}
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1 text-gray-500" />
                          <span className="text-gray-600 dark:text-gray-400">
                            {chapter.estimatedTime} min
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Eye className="w-4 h-4 mr-1 text-gray-500" />
                          <span className="text-gray-600 dark:text-gray-400">
                            {progress.lastStudied}
                          </span>
                        </div>
                      </div>

                      {/* Key Points Preview */}
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">Key Points:</h4>
                        <div className="flex flex-wrap gap-1">
                          {chapter.keyPoints.slice(0, 3).map((point, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {point}
                            </Badge>
                          ))}
                          {chapter.keyPoints.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{chapter.keyPoints.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Quick Actions */}
                      <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-center space-x-2">
                          {progress.quizScore && (
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                              {progress.quizScore}% quiz
                            </Badge>
                          )}
                          <Badge variant="outline" className="text-xs">
                            {Math.round(progress.timeSpent / 60)}h studied
                          </Badge>
                        </div>
                        
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transform group-hover:translate-x-1 transition-all" />
                      </div>
                    </CardContent>

                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/5 group-hover:to-pink-500/5 transition-all duration-300 pointer-events-none" />
                  </Card>
                </Link>
              </div>
            );
          })}
        </div>

        {/* Study Resources */}
        <Card className="mt-8 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-gray-900 dark:text-white">
              <Bookmark className="w-6 h-6 mr-2 text-blue-600" />
              Study Resources
            </CardTitle>
            <CardDescription>
              Additional resources to enhance your learning
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div 
                className="flex items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                onClick={() => {
                  // For now we'll use mock URL; in production this would point to actual NCERT PDFs
                  const pdfUrl = `https://ncert.nic.in/textbook/pdf/${subjectCode.toLowerCase()}-${classNumber}-${subjectCode === 'math' ? 'math' : 'textbook'}.pdf`;
                  window.open(pdfUrl, '_blank');
                }}
              >
                <Download className="w-8 h-8 text-blue-600 mr-3" />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Download NCERT PDF</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Official textbook PDF</p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <Share2 className="w-8 h-8 text-green-600 mr-3" />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Share Progress</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">With parents/teachers</p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <HelpCircle className="w-8 h-8 text-purple-600 mr-3" />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Get Help</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Ask our AI tutor</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}