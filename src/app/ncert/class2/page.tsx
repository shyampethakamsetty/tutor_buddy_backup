"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  BookOpen, 
  ChevronRight,
  ArrowLeft,
  FileText,
  Calculator,
  Globe,
  Clock,
  BookMarked
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

// Class content structure
const classData = {
  title: "Class 2",
  description: "NCERT Class 2 syllabus with interactive learning tools and resources",
  subjects: [
    {
      id: 1,
      title: "English",
      description: "Advanced reading and writing skills",
      units: 3,
      chapters: 6,
      progress: 0,
      image: "/images/logo.jpeg",
      color: "bg-blue-100 dark:bg-blue-900",
      iconColor: "text-blue-600 dark:text-blue-400",
      url: "/ncert/class2/english"
    },
    {
      id: 2,
      title: "Mathematics",
      description: "Numbers, addition, subtraction and basic geometry",
      units: 3,
      chapters: 6,
      progress: 0,
      image: "/images/logo.jpeg",
      color: "bg-purple-100 dark:bg-purple-900",
      iconColor: "text-purple-600 dark:text-purple-400",
      url: "/ncert/class2/mathematics"
    },
    {
      id: 3,
      title: "Hindi",
      description: "Intermediate Hindi reading and writing skills",
      units: 3,
      chapters: 6,
      progress: 0,
      image: "/images/logo.jpeg",
      color: "bg-green-100 dark:bg-green-900",
      iconColor: "text-green-600 dark:text-green-400",
      url: "/ncert/class2/hindi"
    },
    {
      id: 4,
      title: "Environmental Studies",
      description: "Learning about environment and surroundings",
      units: 3,
      chapters: 6,
      progress: 0,
      image: "/images/logo.jpeg",
      color: "bg-amber-100 dark:bg-amber-900",
      iconColor: "text-amber-600 dark:text-amber-400",
      url: "/ncert/class2/evs"
    }
  ],
  totalProgress: 0
};

export default function Class2Page() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
  const [classInfo] = useState(classData)

  // Function to render the appropriate subject icon
  const renderSubjectIcon = (subjectTitle: string) => {
    switch (subjectTitle.toLowerCase()) {
      case 'english':
        return <BookOpen className="w-6 h-6" />
      case 'mathematics':
        return <Calculator className="w-6 h-6" />
      case 'hindi':
        return <BookOpen className="w-6 h-6" />
      case 'environmental studies':
        return <Globe className="w-6 h-6" />
      default:
        return <BookOpen className="w-6 h-6" />
    }
  }

  return (
    <div className="container mx-auto pb-12 px-4">
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <Link href="/ncert" className="text-blue-600 hover:underline flex items-center">
            <ArrowLeft className="w-4 h-4 mr-1" />
            NCERT
          </Link>
          <span className="text-gray-500">/</span>
          <span>Class 2</span>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">NCERT {classInfo.title}</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              {classInfo.description}
            </p>
          </div>
          
          <Button 
            className="bg-gradient-to-r from-purple-600 to-indigo-600 shadow-md"
            onClick={() => router.push(classInfo.subjects[0].url)}
          >
            Start Learning
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center">
            <BookMarked className="w-5 h-5 mr-2 text-purple-600" />
            Subjects
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {classInfo.subjects.map((subject) => (
              <Card key={subject.id} className="overflow-hidden border border-gray-200 dark:border-gray-800">
                <div className="flex flex-col">
                  <div className={`p-6 ${subject.color}`}>
                    <div className={`w-12 h-12 rounded-full bg-white dark:bg-gray-800 ${subject.iconColor} flex items-center justify-center`}>
                      {renderSubjectIcon(subject.title)}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex flex-col gap-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{subject.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          {subject.description}
                        </p>
                        <div className="flex items-center gap-4 mb-4">
                          <Badge variant="secondary" className="flex items-center">
                            <BookOpen className="w-3 h-3 mr-1" />
                            {subject.chapters} Chapters
                          </Badge>
                          <Badge variant="outline" className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {subject.units} Units
                          </Badge>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-gray-600 dark:text-gray-400">Progress</span>
                          <span className="text-purple-600 font-medium">{subject.progress}%</span>
                        </div>
                        <Progress value={subject.progress} className="h-2 mb-4" />
                      </div>
                      <Button 
                        onClick={() => router.push(subject.url)}
                        className={`bg-gradient-to-r from-purple-600 to-indigo-600`}
                      >
                        Start Learning
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
        
        <div className="mt-8 border-t pt-6">
          <h2 className="text-xl font-semibold mb-4">Additional Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-purple-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 7V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V7C3 4 4.5 2 8 2H16C19.5 2 21 4 21 7Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M14.5 4.5V6.5C14.5 7.6 15.4 8.5 16.5 8.5H18.5" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 13H12" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 17H16" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Full Syllabus
                </CardTitle>
                <CardDescription>
                  Complete syllabus for Class 2 subjects
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => window.open('/pdfs/class2/syllabus.pdf', '_blank')}
                >
                  View Syllabus
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-purple-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9.1 12V10.5C9.1 8.5 10.6 7.6 12.4 8.7L13.7 9.4L15 10.1C16.8 11.2 16.8 13 15 14.1L13.7 14.8L12.4 15.5C10.6 16.6 9.1 15.7 9.1 13.7V12Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Video Lessons
                </CardTitle>
                <CardDescription>
                  Engaging video lessons for all subjects
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => router.push('/ncert/class2/videos')}
                >
                  Watch Videos
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-purple-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.5 10.65H9.5" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 8.21V13.21" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16.8199 2H7.17995C5.04995 2 3.31995 3.74 3.31995 5.86V19.95C3.31995 21.75 4.60995 22.51 6.18995 21.64L11.0699 18.93C11.5899 18.64 12.4299 18.64 12.9399 18.93L17.8199 21.64C19.3999 22.52 20.6899 21.76 20.6899 19.95V5.86C20.6799 3.74 18.9499 2 16.8199 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Activity Books
                </CardTitle>
                <CardDescription>
                  Interactive workbooks and activities
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => router.push('/ncert/class2/activities')}
                >
                  Explore Activities
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
        
        <div className="mt-8 pt-6">
          <Button
            variant="outline"
            className="flex items-center"
            onClick={() => {
              router.push('/ncert')
            }}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to NCERT
          </Button>
        </div>
      </div>
    </div>
  )
}