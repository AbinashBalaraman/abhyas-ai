import { getUserProgress, saveUserProgress } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Fetch individual progress metrics from user_progress table
    const chaptersReadVal = await getUserProgress('chapters_read', '24');
    const quizzesTakenVal = await getUserProgress('quizzes_taken', '8');
    const weakAreasVal = await getUserProgress('weak_areas', '["Algebra", "Ohm\'s Law", "RBI Monetary Policy"]');
    const completionPercentageVal = await getUserProgress('completion_percentage', '28');
    const weeklyProgressVal = await getUserProgress(
      'weekly_progress',
      '[{"week": "Week 1", "score": 65}, {"week": "Week 2", "score": 72}, {"week": "Week 3", "score": 85}, {"week": "Week 4", "score": 90}]'
    );

    return NextResponse.json({
      chaptersRead: parseInt(chaptersReadVal),
      quizzesTaken: parseInt(quizzesTakenVal),
      weakAreas: JSON.parse(weakAreasVal),
      completionPercentage: parseInt(completionPercentageVal),
      weeklyProgress: JSON.parse(weeklyProgressVal)
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch user progress: " + error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { key, value } = await request.json();
    if (!key) {
      return NextResponse.json({ error: "Key is required" }, { status: 400 });
    }
    
    // Save to PostgreSQL DB
    await saveUserProgress(key, typeof value === 'string' ? value : JSON.stringify(value));
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to save progress: " + error.message },
      { status: 500 }
    );
  }
}
export const dynamic = 'force-dynamic';
