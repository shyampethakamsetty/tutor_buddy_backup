'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  BookOpen, 
  Target, 
  CheckCircle, 
  Clock, 
  TrendingUp,
  FileText,
  MessageCircle,
  Calendar,
  Award,
  Users,
  BarChart3,
  GraduationCap,
  ChevronRight,
  Play,
  PauseCircle,
  RotateCcw,
  Star,
  Lightbulb,
  Zap
} from 'lucide-react';

// Types
interface Subject {
  id: string;
  name: string;
  icon: string;
  color: string;
  chapters: Chapter[];
  totalProgress: number;
}

interface Chapter {
  id: string;
  name: string;
  description: string;
  duration: string;
  completed: boolean;
  progress: number;
  topics: Topic[];
}

interface Topic {
  id: string;
  name: string;
  completed: boolean;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

interface ClassData {
  id: string;
  name: string;
  subjects: Subject[];
}

// Sample data - in real app, this would come from API
const classesData: ClassData[] = [
  {
    id: 'class-10',
    name: 'Class 10',
    subjects: [
      {
        id: 'mathematics',
        name: 'Mathematics',
        icon: '🧮',
        color: 'blue',
        totalProgress: 65,
        chapters: [
          {
            id: 'real-numbers',
            name: 'Real Numbers',
            description: 'Euclid\'s division lemma, HCF, LCM, and rational numbers',
            duration: '2 weeks',
            completed: true,
            progress: 100,
            topics: [
              { id: 'euclid-lemma', name: 'Euclid\'s Division Lemma', completed: true, difficulty: 'Medium' },
              { id: 'hcf-lcm', name: 'HCF and LCM', completed: true, difficulty: 'Easy' },
              { id: 'rational-numbers', name: 'Rational Numbers', completed: true, difficulty: 'Hard' }
            ]
          },
          {
            id: 'polynomials',
            name: 'Polynomials',
            description: 'Polynomials, zeros, and factorization',
            duration: '3 weeks',
            completed: false,
            progress: 40,
            topics: [
              { id: 'polynomial-basics', name: 'Polynomial Basics', completed: true, difficulty: 'Easy' },
              { id: 'zeros-polynomials', name: 'Zeros of Polynomials', completed: false, difficulty: 'Medium' },
              { id: 'factorization', name: 'Factorization', completed: false, difficulty: 'Hard' }
            ]
          }
        ]
      },
      {
        id: 'science',
        name: 'Science',
        icon: '🔬',
        color: 'green',
        totalProgress: 45,
        chapters: [
          {
            id: 'light',
            name: 'Light - Reflection and Refraction',
            description: 'Laws of reflection, refraction, and optical instruments',
            duration: '4 weeks',
            completed: false,
            progress: 60,
            topics: [
              { id: 'reflection', name: 'Reflection of Light', completed: true, difficulty: 'Medium' },
              { id: 'refraction', name: 'Refraction of Light', completed: false, difficulty: 'Hard' },
              { id: 'lenses', name: 'Lenses and Mirrors', completed: false, difficulty: 'Hard' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'class-12',
    name: 'Class 12',
    subjects: [
      {
        id: 'physics',
        name: 'Physics',
        icon: '⚛️',
        color: 'purple',
        totalProgress: 30,
        chapters: [
          {
            id: 'electric-charges',
            name: 'Electric Charges and Fields',
            description: 'Coulomb\'s law, electric field, and Gauss\'s law',
            duration: '3 weeks',
            completed: false,
            progress: 20,
            topics: [
              { id: 'coulombs-law', name: 'Coulomb\'s Law', completed: false, difficulty: 'Medium' },
              { id: 'electric-field', name: 'Electric Field', completed: false, difficulty: 'Hard' }
            ]
          }
        ]
      }
    ]
  }
];

export default function AITutorPage() {
  const [selectedClass, setSelectedClass] = useState<ClassData>(classesData[0]);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [activeTab, setActiveTab] = useState('syllabus');

  useEffect(() => {
    if (selectedClass && selectedClass.subjects.length > 0) {
      setSelectedSubject(selectedClass.subjects[0]);
    }
  }, [selectedClass]);

  const handleStartChapter = (chapter: Chapter) => {
    setSelectedChapter(chapter);
    setActiveTab('lesson');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-500 rounded-xl">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">AI Tutor</h1>
              <p className="text-gray-600 dark:text-gray-400">Personalized learning with AI-powered syllabus management</p>
            </div>
          </div>

          {/* Class Selection */}
          <div className="flex gap-3 mb-6">
            {classesData.map((classItem) => (
              <Button
                key={classItem.id}
                variant={selectedClass.id === classItem.id ? "default" : "outline"}
                onClick={() => setSelectedClass(classItem)}
                className="flex items-center gap-2"
              >
                <GraduationCap className="h-4 w-4" />
                {classItem.name}
              </Button>
            ))}
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="syllabus">📚 Syllabus Manager</TabsTrigger>
            <TabsTrigger value="lesson">🎯 Lesson Planner</TabsTrigger>
            <TabsTrigger value="progress">📊 Progress Tracker</TabsTrigger>
            <TabsTrigger value="chat">🧠 AI Tutor Chat</TabsTrigger>
          </TabsList>

          {/* Syllabus Manager Tab */}
          <TabsContent value="syllabus" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Subjects List */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      Subjects
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {selectedClass.subjects.map((subject) => (
                      <div
                        key={subject.id}
                        className={`p-4 rounded-lg border cursor-pointer transition-all ${
                          selectedSubject?.id === subject.id
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                        }`}
                        onClick={() => setSelectedSubject(subject)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{subject.icon}</span>
                            <span className="font-medium">{subject.name}</span>
                          </div>
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <Progress value={subject.totalProgress} className="flex-1" />
                          <span>{subject.totalProgress}%</span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Chapters List */}
              <div className="lg:col-span-2">
                {selectedSubject && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <span className="text-xl">{selectedSubject.icon}</span>
                        {selectedSubject.name} - Chapters
                      </CardTitle>
                      <CardDescription>
                        {selectedSubject.chapters.length} chapters • {selectedSubject.totalProgress}% completed
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {selectedSubject.chapters.map((chapter) => (
                        <div key={chapter.id} className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="font-semibold text-lg">{chapter.name}</h3>
                                {chapter.completed && (
                                  <Badge variant="default" className="bg-green-500">
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                    Completed
                                  </Badge>
                                )}
                              </div>
                              <p className="text-gray-600 dark:text-gray-400 mb-3">{chapter.description}</p>
                              
                              {/* Topics */}
                              <div className="flex flex-wrap gap-2 mb-3">
                                {chapter.topics.map((topic) => (
                                  <Badge
                                    key={topic.id}
                                    variant={topic.completed ? "default" : "outline"}
                                    className={`text-xs ${
                                      topic.difficulty === 'Easy' ? 'border-green-500 text-green-700' :
                                      topic.difficulty === 'Medium' ? 'border-yellow-500 text-yellow-700' :
                                      'border-red-500 text-red-700'
                                    }`}
                                  >
                                    {topic.name}
                                  </Badge>
                                ))}
                              </div>

                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                <div className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  {chapter.duration}
                                </div>
                                <div className="flex items-center gap-2">
                                  <Progress value={chapter.progress} className="w-20" />
                                  <span>{chapter.progress}%</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex flex-col gap-2">
                              <Button
                                size="sm"
                                onClick={() => handleStartChapter(chapter)}
                                className="flex items-center gap-2"
                              >
                                {chapter.progress > 0 ? (
                                  <>
                                    <Play className="h-4 w-4" />
                                    Continue
                                  </>
                                ) : (
                                  <>
                                    <Play className="h-4 w-4" />
                                    Start
                                  </>
                                )}
                              </Button>
                              {chapter.progress > 0 && (
                                <Button size="sm" variant="outline">
                                  <RotateCcw className="h-4 w-4 mr-2" />
                                  Review
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Lesson Planner Tab */}
          <TabsContent value="lesson" className="space-y-6">
            {selectedChapter ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Lesson: {selectedChapter.name}
                  </CardTitle>
                  <CardDescription>{selectedChapter.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Lesson Content */}
                    <div className="lg:col-span-2 space-y-4">
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                        <h3 className="font-semibold text-lg mb-3">📖 Today's Learning Objectives</h3>
                        <ul className="space-y-2">
                          {selectedChapter.topics.map((topic) => (
                            <li key={topic.id} className="flex items-center gap-3">
                              <div className={`w-4 h-4 rounded-full border-2 ${
                                topic.completed ? 'bg-green-500 border-green-500' : 'border-gray-300'
                              }`}>
                                {topic.completed && <CheckCircle className="h-3 w-3 text-white" />}
                              </div>
                              <span className={topic.completed ? 'line-through text-gray-500' : ''}>{topic.name}</span>
                              <Badge variant="outline">{topic.difficulty}</Badge>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="border rounded-lg p-6">
                        <h3 className="font-semibold text-lg mb-4">🧠 AI-Generated Lesson Plan</h3>
                        <div className="space-y-4">
                          <div className="border-l-4 border-blue-500 pl-4">
                            <h4 className="font-medium">Introduction (10 mins)</h4>
                            <p className="text-gray-600 dark:text-gray-400">Review previous concepts and introduce new topics with real-world examples.</p>
                          </div>
                          <div className="border-l-4 border-green-500 pl-4">
                            <h4 className="font-medium">Core Concepts (25 mins)</h4>
                            <p className="text-gray-600 dark:text-gray-400">Deep dive into {selectedChapter.name} with interactive examples and practice problems.</p>
                          </div>
                          <div className="border-l-4 border-yellow-500 pl-4">
                            <h4 className="font-medium">Practice & Assessment (15 mins)</h4>
                            <p className="text-gray-600 dark:text-gray-400">Solve practice problems and take a quick quiz to test understanding.</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Lesson Tools */}
                    <div className="space-y-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Lesson Tools</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <Button className="w-full flex items-center gap-2">
                            <Lightbulb className="h-4 w-4" />
                            Magic Explain
                          </Button>
                          <Button className="w-full flex items-center gap-2" variant="outline">
                            <Star className="h-4 w-4" />
                            Generate Quiz
                          </Button>
                          <Button className="w-full flex items-center gap-2" variant="outline">
                            <MessageCircle className="h-4 w-4" />
                            Ask AI Tutor
                          </Button>
                          <Button className="w-full flex items-center gap-2" variant="outline">
                            <FileText className="h-4 w-4" />
                            Notes & Summary
                          </Button>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Progress</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                              <span>Chapter Progress</span>
                              <span>{selectedChapter.progress}%</span>
                            </div>
                            <Progress value={selectedChapter.progress} />
                            <div className="text-xs text-gray-500">
                              {selectedChapter.topics.filter(t => t.completed).length} of {selectedChapter.topics.length} topics completed
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Select a Chapter to Start Learning</h3>
                  <p className="text-gray-600 dark:text-gray-400">Choose a chapter from the Syllabus Manager to begin your AI-powered lesson.</p>
                  <Button 
                    className="mt-4" 
                    onClick={() => setActiveTab('syllabus')}
                  >
                    Browse Syllabus
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Progress Tracker Tab */}
          <TabsContent value="progress" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                      <BookOpen className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Subjects</p>
                      <p className="text-2xl font-bold">{selectedClass.subjects.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completed Chapters</p>
                      <p className="text-2xl font-bold">
                        {selectedClass.subjects.reduce((acc, subject) => 
                          acc + subject.chapters.filter(chapter => chapter.completed).length, 0
                        )}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
                      <Clock className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Study Streak</p>
                      <p className="text-2xl font-bold">7 days</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                      <Award className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Average Score</p>
                      <p className="text-2xl font-bold">85%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Subject Progress
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedClass.subjects.map((subject) => (
                    <div key={subject.id}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{subject.icon}</span>
                          <span className="font-medium">{subject.name}</span>
                        </div>
                        <span className="text-sm font-medium">{subject.totalProgress}%</span>
                      </div>
                      <Progress value={subject.totalProgress} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <div className="flex-1">
                        <p className="font-medium">Completed Real Numbers</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Mathematics • 2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <Play className="h-5 w-5 text-blue-600" />
                      <div className="flex-1">
                        <p className="font-medium">Started Polynomials</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Mathematics • 1 day ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                      <Star className="h-5 w-5 text-yellow-600" />
                      <div className="flex-1">
                        <p className="font-medium">Quiz Score: 92%</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Science • 2 days ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* AI Tutor Chat Tab */}
          <TabsContent value="chat" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  Personal AI Tutor
                </CardTitle>
                <CardDescription>
                  Ask questions, get explanations, and receive personalized study guidance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg h-96 flex items-center justify-center bg-gray-50 dark:bg-gray-800/50">
                  <div className="text-center">
                    <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">AI Tutor Chat</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">Start a conversation with your personal AI tutor</p>
                    <Button className="flex items-center gap-2">
                      <Zap className="h-4 w-4" />
                      Start Chatting
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 