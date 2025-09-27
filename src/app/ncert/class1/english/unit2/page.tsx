"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { 
  BookOpen, 
  ArrowLeft, 
  ChevronRight, 
  Clock, 
  BookMarked,
  Target
} from 'lucide-react'

// Unit content structure
const unitData = {
  title: "Unit 2: Life Around Us",
  description: "Exploration of the environment and world around us",
  chapters: [
    {
      id: 1,
      title: "Picture Time",
      description: "Learning about animals and numbers through pictures",
      estimatedTime: "15 min",
      progress: 0,
      pdfUrl: "/pdfs/class1/english/aemru2c1.pdf",
      pageUrl: "/ncert/class1/english/unit2/chapter1"
    },
    {
      id: 2,
      title: "One Little Kitten",
      description: "Counting poem about animals",
      estimatedTime: "15 min",
      progress: 0,
      pdfUrl: "/pdfs/class1/english/aemru2c2.pdf",
      pageUrl: "/ncert/class1/english/unit2/chapter2"
    },
    {
      id: 3,
      title: "Once I Saw a Little Bird",
      description: "A poem about birds and nature",
      estimatedTime: "15 min",
      progress: 0,
      pdfUrl: "/pdfs/class1/english/aemru2c3.pdf",
      pageUrl: "/ncert/class1/english/unit2/chapter3"
    }
  ],
  totalProgress: 0
}

export default function Unit2Page() {
  const router = useRouter()
  const [unit] = useState(unitData)

  return (
    <div className="container mx-auto pb-12 px-4">
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <Link href="/ncert/class1" className="text-blue-600 hover:underline flex items-center">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Class 1
          </Link>
          <span className="text-gray-500">/</span>
          <Link href="/ncert/class1/english" className="text-blue-600 hover:underline">
            English
          </Link>
          <span className="text-gray-500">/</span>
          <span>Unit 2</span>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">{unit.title}</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              {unit.description}
            </p>
          </div>
          
          <Button 
            onClick={() => router.push(unit.chapters[0].pageUrl)}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 shadow-md"
          >
            Start Learning
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-6">
          <h2 className="text-xl font-semibold flex items-center">
            <BookMarked className="w-5 h-5 mr-2 text-purple-600" />
            Chapters in this Unit
          </h2>
          
          {unit.chapters.map((chapter, index) => (
            <Card key={chapter.id} className="border border-gray-200 dark:border-gray-800">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 flex items-center justify-center font-medium">
                      {chapter.id}
                    </div>
                    <CardTitle>{chapter.title}</CardTitle>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Clock className="w-4 h-4 mr-1" />
                    {chapter.estimatedTime}
                  </div>
                </div>
                <CardDescription className="mt-2">
                  {chapter.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-600 dark:text-gray-400">Progress</span>
                  <span className="text-purple-600 font-medium">{chapter.progress}%</span>
                </div>
                <Progress value={chapter.progress} className="h-2" />
              </CardContent>
              <CardFooter className="pt-0 flex justify-between">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.open(chapter.pdfUrl, '_blank')}
                >
                  View PDF
                </Button>
                <Button 
                  size="sm"
                  onClick={() => router.push(chapter.pageUrl)}
                  className="flex items-center"
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Read Chapter
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-8 border-t pt-6">
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              className="flex items-center"
              onClick={() => {
                router.push('/ncert/class1/english/unit1')
              }}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Unit
            </Button>
            
            <div className="flex flex-col items-center">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Unit 2 of 2
              </div>
              <Progress value={100} className="w-40 h-1 mt-1" />
            </div>
            
            <Button
              variant="outline"
              className="flex items-center opacity-50 cursor-not-allowed"
              disabled
            >
              Next Unit
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}