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
      stream: Boolean(stream),
    });
  }

  async sendMessage(
    message: OpenAI.Chat.Completions.ChatCompletionMessageParam,
  ) {
    try {
      const response = await this.createCompletion(message);
      return response as OpenAI.Chat.Completions.ChatCompletion;
    } catch (error) {
      console.log({ error });
    }
  }

  async sendMessageStream(
    message: OpenAI.Chat.Completions.ChatCompletionMessageParam,
  ) {
    try {
      return (await this.createCompletion(
        message,
        true,
      )) as Stream<OpenAI.Chat.Completions.ChatCompletionChunk>;
    } catch (error) {
      console.log({ error });
    }
  }
}
