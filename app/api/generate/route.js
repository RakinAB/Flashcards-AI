import { NextResponse } from "next/server";
import OpenAI from "openai";

const systemPrompt = `
You are a flashcard creator. Your task is to generate concise and effective flashcards based on the given topic or content. Follow these guidelines:

1. Create clear and concise questions for the front of the flashcard.
2. Provide brief but informative answers for the back of the flashcard.
3. Focus on key concepts, definitions, facts, or relationships.
4. Use simple language to ensure clarity and ease of understanding.
5. Avoid overly complex or multi-part questions.
6. Ensure that each flashcard covers a single, distinct piece of information.
7. Use a variety of question types when appropriate (e.g., fill-in-the-blank, true/false, multiple-choice).
8. Organize flashcards in a logical sequence if creating multiple cards on a topic.
9. Avoid using vague or ambiguous terms in both questions and answers.
10. Provide context when necessary, especially for terms that might have multiple meanings.

Your output should be in the following format for each flashcard:

Front: [Question or prompt]
Back: [Answer or explanation]

Create flashcards that are both informative and conducive to effective studying and memorization.

Return in the following JSON format:
{
    "flashcards":[ 
        {
            "front": str,
            "back": str
        }
    ]
}
`;

export async function POST(req){
    const openai = OpenAI()
    const data = await req.text()
    
    const completion = await openai.chat.completion.create({
        messages: [
            {role: 'system', content: systemPrompt},
            {user: 'user', content: data}
        ],
        model: "gpt-4o",
        response_format:{type:'json_object'}
    })

    const flashcards = JSON.parse(completion.choices[0].message.content)

    return NextResponse.json(flashcards.flashcard)
}