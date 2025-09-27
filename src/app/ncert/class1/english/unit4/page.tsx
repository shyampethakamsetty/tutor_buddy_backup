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
  title: "Unit 4: Seasons",
  description: "Understanding different seasons and weather patterns",
  chapters: [
    {
      id: 1,
      title: "Mittu and the Yellow Mango",
      description: "A story about seasons and fruits",
      estimatedTime: "15 min",
      progress: 0,
      pdfUrl: "/pdfs/class1/english/aemru4c1.pdf",
      pageUrl: "/ncert/class1/english/unit4/chapter1"
    },
    {
      id: 2,
      title: "Circles",
      description: "Learning about shapes in nature and seasons",
      estimatedTime: "15 min",
      progress: 0,
      pdfUrl: "/pdfs/class1/english/aemru4c2.pdf",
      pageUrl: "/ncert/class1/english/unit4/chapter2"
    }
  ],
  totalProgress: 0
}

export default function Unit4Page() {
  const router = useRouter()
  const [unit] = useState(unitData)

  return (
    <div className="container mx-auto pb-12 px-4">
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <Link href="/ncert/class1/english" className="text-blue-600 hover:underline flex items-center">
            <ArrowLeft className="w-4 h-4 mr-1" />
            English
          </Link>
          <span className="text-gray-500">/</span>
          <span>Unit 4</span>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">{unit.title}</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              {unit.description}
            </p>
          </div>
          
          <Button 
            className="bg-gradient-to-r from-purple-600 to-indigo-600 shadow-md"
            onClick={() => router.push(unit.chapters[0].pageUrl)}
          >
            Start Unit
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
      
      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold flex items-center mb-4">
            <BookMarked className="w-5 h-5 mr-2 text-purple-600" />
            Chapters
          </h2>
          
          <div className="space-y-4">
            {unit.chapters.map((chapter, index) => (
              <Card key={chapter.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-0">
                  <div className="flex flex-col md:flex-row md:items-center">
                    <div className="md:w-20 bg-purple-100 dark:bg-purple-900 p-6 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 text-purple-800 dark:text-purple-200 flex items-center justify-center text-xl font-bold">
                        {index + 1}
                      </div>
                    </div>
                    
                    <div className="flex-1 p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold mb-2">{chapter.title}</h3>
                          <p className="text-gray-600 dark:text-gray-400 mb-4">
                            {chapter.description}
                          </p>
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {chapter.estimatedTime}
                            </span>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="text-xs"
                              onClick={() => window.open(chapter.pdfUrl, '_blank')}
                            >
                              View PDF
                            </Button>
                          </div>
                        </div>
                        
                        <div className="flex flex-col gap-4">
                          <div>
                            <div className="flex items-center justify-between text-sm mb-1">
                              <span className="text-gray-600 dark:text-gray-400">Progress</span>
                              <span className="text-purple-600 font-medium">{chapter.progress}%</span>
                            </div>
                            <Progress value={chapter.progress} className="h-2 w-full md:w-24" />
                          </div>
                          
                          <Button 
                            onClick={() => router.push(chapter.pageUrl)}
                            className="bg-gradient-to-r from-purple-600 to-indigo-600"
                          >
                            Start
                            <ChevronRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
        
        <div className="mt-8 pt-6">
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="flex items-center"
              onClick={() => {
                router.push('/ncert/class1/english')
              }}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to English
            </Button>
            
            <Button
              className="bg-gradient-to-r from-purple-600 to-indigo-600"
              onClick={() => {
                router.push(unit.chapters[0].pageUrl)
              }}
            >
              Start Unit
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}