import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { Stream } from 'openai/streaming';

@Injectable()
export default class OmniStreamService {
  private connection: OpenAI;
  private model: string = 'gpt-4o';

  constructor() {
    this.connection = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async sendMessage(
    message: OpenAI.Chat.Completions.ChatCompletionMessageParam,
  ): Promise<Stream<OpenAI.Chat.Completions.ChatCompletionChunk> | void> {
    try {
      const stream = await this.connection.chat.completions.create({
        model: this.model,
        messages: [message],
        stream: true,
      });
      return stream;
    } catch (error) {
      console.log({ error });
    }
  }
}
