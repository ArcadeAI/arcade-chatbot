import { OpenAI } from 'openai';

import { systemPrompt } from '@/ai/prompts';
import { StreamContext } from '@/app/(chat)/api/chat/types';

const BASE_URL =
  process.env.ARCADE_ENGINE_URL ?? 'https://api.arcade-ai.com/v1'; // Default to the cloud engine

// Initialize the OpenAI client
export const client = new OpenAI({
  baseURL: BASE_URL,
  apiKey: process.env.ARCADE_API_KEY,
});

// Function to create chat completions
export const createCompletion = (
  userId: string,
  props: Pick<StreamContext, 'model' | 'messages'>
) => {
  const { model, messages } = props;
  messages.unshift({
    role: 'system',
    content: systemPrompt,
  });
  return client.chat.completions.create({
    model: model.apiIdentifier,
    user: userId,
    messages,
    tool_choice: 'auto',
    stream: true,
  });
};
