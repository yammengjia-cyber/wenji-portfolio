import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();
    const apiKey = process.env.GOOGLE_GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { reply: '抱歉，AI 服务暂时不可用。我推荐您去云南大理体验白族文化，那里有丰富的扎染、银器制作等非遗体验！' },
        { status: 200 }
      );
    }

    const conversationHistory = messages.map((msg: { role: string; content: string }) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }],
    }));

    const systemInstruction = `你是"文迹"非遗文化体验旅行平台的AI旅行助手。你的任务是帮助用户规划以中国非物质文化遗产体验为主题的旅行。

你应该：
1. 热情友好地与用户交流
2. 根据用户的偏好推荐文化体验目的地（如云南大理扎染、景德镇陶瓷、贵州苗绣等）
3. 能制定详细的旅行行程
4. 介绍非遗文化背景知识
5. 推荐当地特色美食和住宿
6. 回复要简洁但信息丰富，每次回复控制在100字以内

请用中文回复。`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: systemInstruction }],
          },
          contents: conversationHistory,
          generationConfig: {
            temperature: 0.8,
            maxOutputTokens: 300,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Gemini API error:', errorData);
      return NextResponse.json(
        { reply: '根据您的需求，我推荐去云南大理体验白族文化！那里有扎染、编织等丰富的非遗体验，我可以为您制定一个详细的行程计划。' },
        { status: 200 }
      );
    }

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text ||
      '抱歉，我暂时无法理解您的问题。您可以告诉我您想体验什么样的文化活动，我来帮您推荐。';

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { reply: '我推荐您体验云南的扎染工艺或景德镇的制瓷技艺，这些都是非常有趣的非遗文化体验！' },
      { status: 200 }
    );
  }
}
