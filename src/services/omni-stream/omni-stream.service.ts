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

  private async createCompletion(
    message: OpenAI.Chat.Completions.ChatCompletionMessageParam,
    stream?: boolean,
  ) {
    return await this.connection.chat.completions.create({
      model: this.model,
      messages: [message],
      stream: stream ? true : false,
    });
  }

  async sendMessage(
    message: OpenAI.Chat.Completions.ChatCompletionMessageParam,
  ): Promise<OpenAI.Chat.Completions.ChatCompletion | void> {
    try {
      const response = await this.createCompletion(message);
      return response;
    } catch (error) {
      console.log({ error });
    }
  }

  async sendMessageStream(
    message: OpenAI.Chat.Completions.ChatCompletionMessageParam,
  ): Promise<Stream<OpenAI.Chat.Completions.ChatCompletionChunk>> {
    try {
      const stream = await this.createCompletion(message, true);
    } catch (error) {}
  }
}
