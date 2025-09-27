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
  Clock,
  BookMarked
} from 'lucide-react'

// Subject content structure
const subjectData = {
  title: "English",
  description: "NCERT Class 1 English syllabus with interactive learning resources",
  units: [
    {
      id: 1,
      title: "Unit 1: My Family and Me",
      description: "Introduction to family relationships and personal connections",
      chapters: 2,
      progress: 0,
      image: "/images/logo.jpeg",
      url: "/ncert/class1/english/unit1"
    },
    {
      id: 2,
      title: "Unit 2: Life Around Us",
      description: "Exploration of the environment and world around us",
      chapters: 3,
      progress: 0,
      image: "/images/logo.jpeg",
      url: "/ncert/class1/english/unit2"
    },
    {
      id: 3,
      title: "Unit 3: Food",
      description: "Learning about different types of food and healthy eating",
      chapters: 2,
      progress: 0,
      image: "/images/logo.jpeg",
      url: "/ncert/class1/english/unit3"
    },
    {
      id: 4,
      title: "Unit 4: Seasons",
      description: "Understanding different seasons and weather patterns",
      chapters: 2,
      progress: 0,
      image: "/images/logo.jpeg",
      url: "/ncert/class1/english/unit4"
    }
  ],
  totalProgress: 0
}

export default function EnglishPage() {
  const router = useRouter()
  const [subject] = useState(subjectData)

  return (
    <div className="container mx-auto pb-12 px-4">
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <Link href="/ncert/class1" className="text-blue-600 hover:underline flex items-center">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Class 1
          </Link>
          <span className="text-gray-500">/</span>
          <span>English</span>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">NCERT Class 1 - {subject.title}</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              {subject.description}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              variant="outline" 
              className="flex items-center"
              onClick={() => window.open('/pdfs/class1/english/aemr1.pdf', '_blank')}
            >
              <FileText className="w-4 h-4 mr-2" />
              Full Book PDF
            </Button>
            <Button 
              className="bg-gradient-to-r from-purple-600 to-indigo-600 shadow-md"
              onClick={() => router.push(subject.units[0].url)}
            >
              Start Learning
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center">
            <BookMarked className="w-5 h-5 mr-2 text-purple-600" />
            Units
          </h2>
          
          {subject.units.map((unit) => (
            <Card key={unit.id} className="overflow-hidden border border-gray-200 dark:border-gray-800">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/4 bg-gray-100 dark:bg-gray-800 p-4 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 flex items-center justify-center text-xl font-bold">
                    {unit.id}
                  </div>
                </div>
                <div className="flex-1 p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{unit.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {unit.description}
                      </p>
                      <div className="flex items-center gap-4 mb-4">
                        <Badge variant="secondary" className="flex items-center">
                          <BookOpen className="w-3 h-3 mr-1" />
                          {unit.chapters} Chapters
                        </Badge>
                        <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          ~30 min
                        </span>
                      </div>
                    </div>
                    <Button 
                      onClick={() => router.push(unit.url)}
                      className="bg-gradient-to-r from-purple-600 to-indigo-600"
                    >
                      Start Unit
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-600 dark:text-gray-400">Progress</span>
                      <span className="text-purple-600 font-medium">{unit.progress}%</span>
                    </div>
                    <Progress value={unit.progress} className="h-2" />
                  </div>
                </div>
              </div>
            </Card>
          ))}
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
                  Worksheets
                </CardTitle>
                <CardDescription>
                  Printable activities to practice what you've learned
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => window.open('/pdfs/class1/english/worksheets.pdf', '_blank')}
                >
                  View Worksheets
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
                  Engaging video lessons for each chapter
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => router.push('/ncert/class1/english/videos')}
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
                  Flashcards
                </CardTitle>
                <CardDescription>
                  Interactive flashcards to help memorize vocabulary
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => router.push('/flashcards?subject=english&class=1')}
                >
                  Study Flashcards
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
              router.push('/ncert/class1')
            }}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Class 1
          </Button>
        </div>
      </div>
    </div>
  )
}