import { getAnswer } from '@/lib/ai/rag';
import { getChatHistory, saveChatMessage } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const history = await getChatHistory();
    return NextResponse.json({ history });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch chat history: " + error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const question = body.question || body.message;
    const model = body.model || 'gemini';
    
    if (!question || !question.trim()) {
      return NextResponse.json(
        { error: "Question/Message is required" },
        { status: 400 }
      );
    }

    // Save user message to database
    await saveChatMessage('user', question);

    // Get answer from RAG
    const { response, sources } = await getAnswer(question, model);

    // Save AI response to database
    await saveChatMessage('ai', response, sources);

    return NextResponse.json({ response, sources, rag_used: !!sources?.length });
  } catch (error: any) {
    console.error('Error in chat API route:', error);
    return NextResponse.json(
      { error: "Failed to process your question: " + error.message },
      { status: 500 }
    );
  }
}
export const dynamic = 'force-dynamic';