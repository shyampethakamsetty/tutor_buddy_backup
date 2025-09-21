'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
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
  GraduationCap
} from 'lucide-react';

export default function AITutorPage() {
  const [selectedClass, setSelectedClass] = useState('10');
  const [selectedSubject, setSelectedSubject] = useState('');

  // Classes data for grades 1-10
  const classesData = {
    '1': {
      subjects: [
        { name: 'English', icon: Languages, color: 'bg-blue-500', description: 'Basic reading, writing, and speaking skills' },
        { name: 'Mathematics', icon: Calculator, color: 'bg-green-500', description: 'Numbers, counting, and basic operations' },
        { name: 'Environmental Studies', icon: Globe, color: 'bg-amber-500', description: 'Nature, family, and surroundings' }
      ],
      progress: 85,
      totalLessons: 120,
      completedLessons: 102
    },
    '2': {
      subjects: [
        { name: 'English', icon: Languages, color: 'bg-blue-500', description: 'Improved vocabulary and sentence formation' },
        { name: 'Mathematics', icon: Calculator, color: 'bg-green-500', description: 'Addition, subtraction, and patterns' },
        { name: 'Environmental Studies', icon: Globe, color: 'bg-amber-500', description: 'Community helpers and seasons' }
      ],
      progress: 78,
      totalLessons: 130,
      completedLessons: 101
    },
    '3': {
      subjects: [
        { name: 'English', icon: Languages, color: 'bg-blue-500', description: 'Grammar basics and story writing' },
        { name: 'Mathematics', icon: Calculator, color: 'bg-green-500', description: 'Multiplication, division, and fractions' },
        { name: 'Environmental Studies', icon: Globe, color: 'bg-amber-500', description: 'Plants, animals, and food' },
        { name: 'Science', icon: Microscope, color: 'bg-purple-500', description: 'Basic scientific concepts' }
      ],
      progress: 92,
      totalLessons: 140,
      completedLessons: 129
    },
    '4': {
      subjects: [
        { name: 'English', icon: Languages, color: 'bg-blue-500', description: 'Advanced reading and comprehension' },
        { name: 'Mathematics', icon: Calculator, color: 'bg-green-500', description: 'Geometry, measurement, and data' },
        { name: 'Science', icon: Microscope, color: 'bg-purple-500', description: 'Matter, forces, and living things' },
        { name: 'Social Studies', icon: Users, color: 'bg-orange-500', description: 'Community and basic geography' }
      ],
      progress: 88,
      totalLessons: 150,
      completedLessons: 132
    },
    '5': {
      subjects: [
        { name: 'English', icon: Languages, color: 'bg-blue-500', description: 'Literature and creative writing' },
        { name: 'Mathematics', icon: Calculator, color: 'bg-green-500', description: 'Decimals, percentages, and algebra basics' },
        { name: 'Science', icon: Microscope, color: 'bg-purple-500', description: 'Earth science and human body' },
        { name: 'Social Studies', icon: Users, color: 'bg-orange-500', description: 'History and civics introduction' }
      ],
      progress: 76,
      totalLessons: 160,
      completedLessons: 122
    },
    '6': {
      subjects: [
        { name: 'English', icon: Languages, color: 'bg-blue-500', description: 'Advanced grammar and literature' },
        { name: 'Mathematics', icon: Calculator, color: 'bg-green-500', description: 'Ratios, proportions, and integers' },
        { name: 'Science', icon: FlaskConical, color: 'bg-purple-500', description: 'Physics, chemistry, and biology' },
        { name: 'Social Studies', icon: MapPin, color: 'bg-orange-500', description: 'World geography and ancient history' },
        { name: 'Hindi', icon: Languages, color: 'bg-red-500', description: 'Language and literature' }
      ],
      progress: 84,
      totalLessons: 180,
      completedLessons: 151
    },
    '7': {
      subjects: [
        { name: 'English', icon: Languages, color: 'bg-blue-500', description: 'Poetry, prose, and composition' },
        { name: 'Mathematics', icon: Calculator, color: 'bg-green-500', description: 'Linear equations and geometry' },
        { name: 'Science', icon: Atom, color: 'bg-purple-500', description: 'Detailed physics, chemistry, biology' },
        { name: 'Social Studies', icon: History, color: 'bg-orange-500', description: 'Medieval history and civics' },
        { name: 'Hindi', icon: Languages, color: 'bg-red-500', description: 'Advanced language skills' }
      ],
      progress: 91,
      totalLessons: 200,
      completedLessons: 182
    },
    '8': {
      subjects: [
        { name: 'English', icon: Languages, color: 'bg-blue-500', description: 'Drama, poetry, and advanced writing' },
        { name: 'Mathematics', icon: Calculator, color: 'bg-green-500', description: 'Quadratic equations and mensuration' },
        { name: 'Science', icon: Atom, color: 'bg-purple-500', description: 'Advanced scientific concepts' },
        { name: 'Social Studies', icon: History, color: 'bg-orange-500', description: 'Modern history and economics' },
        { name: 'Hindi', icon: Languages, color: 'bg-red-500', description: 'Literature and composition' }
      ],
      progress: 87,
      totalLessons: 220,
      completedLessons: 191
    },
    '9': {
      subjects: [
        { name: 'English', icon: Languages, color: 'bg-blue-500', description: 'Literature analysis and writing skills' },
        { name: 'Mathematics', icon: Calculator, color: 'bg-green-500', description: 'Coordinate geometry and statistics' },
        { name: 'Science', icon: Atom, color: 'bg-purple-500', description: 'Physics, chemistry, biology in depth' },
        { name: 'Social Studies', icon: History, color: 'bg-orange-500', description: 'Democratic politics and economics' },
        { name: 'Hindi', icon: Languages, color: 'bg-red-500', description: 'Classical and modern literature' }
      ],
      progress: 73,
      totalLessons: 250,
      completedLessons: 183
    },
    '10': {
      subjects: [
        { name: 'English', icon: Languages, color: 'bg-blue-500', description: 'Board exam preparation and literature' },
        { name: 'Mathematics', icon: Calculator, color: 'bg-green-500', description: 'Trigonometry and probability' },
        { name: 'Science', icon: Atom, color: 'bg-purple-500', description: 'Board level physics, chemistry, biology' },
        { name: 'Social Studies', icon: History, color: 'bg-orange-500', description: 'Contemporary India and world' },
        { name: 'Hindi', icon: Languages, color: 'bg-red-500', description: 'Board exam literature and language' }
      ],
      progress: 95,
      totalLessons: 300,
      completedLessons: 285
    },
    '11': {
      subjects: [
        { name: 'Physics', icon: Atom, color: 'bg-indigo-500', description: 'Mechanics, thermodynamics, and optics' },
        { name: 'Chemistry', icon: FlaskConical, color: 'bg-emerald-500', description: 'Organic, inorganic, and physical chemistry' },
        { name: 'Mathematics', icon: Calculator, color: 'bg-green-500', description: 'Calculus, algebra, and coordinate geometry' },
        { name: 'Biology', icon: Microscope, color: 'bg-teal-500', description: 'Plant and animal physiology' },
        { name: 'English', icon: Languages, color: 'bg-blue-500', description: 'Advanced literature and communication' },
        { name: 'Computer Science', icon: Brain, color: 'bg-violet-500', description: 'Programming and data structures' }
      ],
      progress: 68,
      totalLessons: 350,
      completedLessons: 238
    },
    '12': {
      subjects: [
        { name: 'Physics', icon: Atom, color: 'bg-indigo-500', description: 'Electromagnetism, modern physics, and waves' },
        { name: 'Chemistry', icon: FlaskConical, color: 'bg-emerald-500', description: 'Advanced organic and analytical chemistry' },
        { name: 'Mathematics', icon: Calculator, color: 'bg-green-500', description: 'Differential calculus and integration' },
        { name: 'Biology', icon: Microscope, color: 'bg-teal-500', description: 'Genetics, evolution, and biotechnology' },
        { name: 'English', icon: Languages, color: 'bg-blue-500', description: 'Board exam preparation and advanced writing' },
        { name: 'Computer Science', icon: Brain, color: 'bg-violet-500', description: 'Advanced programming and algorithms' }
      ],
      progress: 82,
      totalLessons: 400,
      completedLessons: 328
    }
  };

  const currentClassData = classesData[selectedClass as keyof typeof classesData];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 mb-4">
            <Brain className="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400" />
            <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
              AI-Powered Learning
            </span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            AI Tutor Dashboard
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Personalized learning experience tailored for every grade level from Class 1 to 12 with intelligent AI assistance
          </p>
        </div>

        {/* Class Selection */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Select Your Class</h2>
          <div className="grid grid-cols-6 md:grid-cols-12 gap-3">
            {Object.keys(classesData).map((classNum) => (
              <Button
                key={classNum}
                variant={selectedClass === classNum ? "default" : "outline"}
                className={`h-12 font-semibold transition-all duration-200 ${
                  selectedClass === classNum 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg transform scale-105' 
                    : 'hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:border-purple-300'
                }`}
                onClick={() => setSelectedClass(classNum)}
              >
                Class {classNum}
              </Button>
            ))}
          </div>
        </div>

        {/* Selected Class Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-blue-700 dark:text-blue-300">Overall Progress</CardTitle>
                <Trophy className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Completed</span>
                  <span className="font-semibold text-blue-700 dark:text-blue-300">
                    {currentClassData.completedLessons}/{currentClassData.totalLessons}
                  </span>
                </div>
                <Progress value={currentClassData.progress} className="h-2" />
                <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                  {currentClassData.progress}%
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-green-700 dark:text-green-300">Subjects</CardTitle>
                <BookOpen className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-2xl font-bold text-green-700 dark:text-green-300">
                  {currentClassData.subjects.length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Active subjects in Class {selectedClass}
                </p>
                <div className="flex flex-wrap gap-1 mt-3">
                  {currentClassData.subjects.slice(0, 3).map((subject, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {subject.name}
                    </Badge>
                  ))}
                  {currentClassData.subjects.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{currentClassData.subjects.length - 3}
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-purple-700 dark:text-purple-300">AI Assistance</CardTitle>
                <Brain className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                  24/7
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Available for instant help
                </p>
                <Button 
                  size="sm" 
                  className="w-full mt-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  Start Chat
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Subjects Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <GraduationCap className="w-6 h-6 text-purple-600" />
              Class {selectedClass} Subjects
            </CardTitle>
            <CardDescription>
              Choose a subject to start your personalized learning journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentClassData.subjects.map((subject, index) => {
                const IconComponent = subject.icon;
                return (
                  <Card 
                    key={index} 
                    className={`cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 border-2 ${
                      selectedSubject === subject.name 
                        ? 'border-purple-300 bg-purple-50 dark:bg-purple-900/20' 
                        : 'border-gray-200 dark:border-gray-700 hover:border-purple-200'
                    }`}
                    onClick={() => setSelectedSubject(subject.name)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${subject.color} bg-opacity-20`}>
                            <IconComponent className="w-5 h-5 text-white" />
                          </div>
                          <CardTitle className="text-lg">{subject.name}</CardTitle>
                        </div>
                        {selectedSubject === subject.name && (
                          <Star className="w-5 h-5 text-purple-500 fill-current" />
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {subject.description}
                      </p>
                      <Button 
                        size="sm" 
                        className="w-full bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700"
                      >
                        Start Learning
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
