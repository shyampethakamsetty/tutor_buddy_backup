import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { authenticateUser } from '@/lib/auth';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    console.log('🔍 Debug: Tutors endpoint called');
    const { user, error } = await authenticateUser(req);
    
    console.log('🔍 Debug: Authentication result:', { user: user ? 'found' : 'not found', error });
    
    if (error || !user) {
      console.log('❌ Debug: Returning 401 - Authentication failed');
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.log('✅ Debug: Authentication successful, proceeding to fetch tutors');
    
    // Get query parameters
    const url = new URL(req.url);
    const subject = url.searchParams.get('subject');
    const maxRate = url.searchParams.get('maxRate');
    const minRating = url.searchParams.get('minRating');
    const search = url.searchParams.get('search');

    // Build the where clause
    const where: any = {
      subjects: subject ? { has: subject } : undefined,
      hourlyRate: maxRate ? { lte: parseFloat(maxRate) } : undefined,
      rating: minRating ? { gte: parseFloat(minRating) } : undefined,
    };

    // If search is provided, add name/bio search
    if (search) {
      where.OR = [
        { user: { name: { contains: search, mode: 'insensitive' } } },
        { bio: { contains: search, mode: 'insensitive' } },
      ];
    }

    console.log('🔍 Debug: Fetching tutors from database');
    const tutors = await prisma.tutorProfile.findMany({
      where,
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    console.log('🔍 Debug: Found tutors:', tutors.length);

    // Format the response
    const formattedTutors = tutors.map(tutor => ({
      id: tutor.id,
      user: {
        name: tutor.user.name,
      },
      subjects: tutor.subjects,
      hourlyRate: tutor.hourlyRate,
      bio: tutor.bio,
      qualifications: (tutor as any).qualifications || '',
      mode: (tutor as any).mode || '',
      location: (tutor as any).location || '',
      experience: (tutor as any).experience || '',
      contact: (tutor as any).contact || '',
      languages: (tutor as any).languages || [],
      profilePicture: (tutor as any).profilePicture || '',
    }));

    console.log('✅ Debug: Returning tutors successfully');
    return NextResponse.json(formattedTutors);
  } catch (error) {
    console.error('❌ Debug: Error in tutors endpoint:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 