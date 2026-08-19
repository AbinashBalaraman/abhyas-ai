import { NextResponse } from 'next/server';
import { callLLM } from '@/lib/ai/llm';

export async function POST(request: Request) {
  try {
    const { examType, weakAreas, model = 'deepseek-free' } = await request.json();
    
    if (!examType) {
      return NextResponse.json(
        { error: "Exam type is required" },
        { status: 400 }
      );
    }

    const weakAreasClause = weakAreas
      ? `The student has identified these weak areas: ${weakAreas}. Focus more on these topics.

`
      : '';

    const systemPrompt = `You are an expert academic advisor and study planner for Indian Competitive Exams (SSC, RRB, Banking, UPSC, etc.).
Your task is to create a detailed, highly structured, and realistic study plan based on the user's exam type and weak areas.
`;

    const userMessage = `Create a detailed study plan for a student preparing for ${examType} exam.

${weakAreasClause}
The plan must:
1. Cover all major subjects for the ${examType} exam (e.g. Quant, Reasoning, English, General Awareness/Science, Banking, or Computer as applicable).
2. Be structured in a weekly format (e.g. Week 1, Week 2, etc.) for a 4-week period.
3. Include recommended daily study hours (e.g., 4-6 hours) and how to distribute them.
4. Suggest specific topics to focus on each week (cross-reference standard syllabus modules).
5. Include revision slots and mock/practice test schedules.
6. Provide general advice on how to improve on the identified weak areas.

Format the plan in beautiful, clean markdown with clear headings, bold text, bullet points, and tables where appropriate.
`;

    const plan = await callLLM(model, systemPrompt, userMessage);
    
    return NextResponse.json({ plan });
  } catch (error: any) {
    console.error('Error in study plan API route:', error);
    return NextResponse.json(
      { error: "Failed to generate study plan: " + error.message },
      { status: 500 }
    );
  }
}
export const dynamic = 'force-dynamic';
export const maxDuration = 60;