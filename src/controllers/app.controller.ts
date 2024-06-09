import { OpenAI } from 'openai';
import { Body, Controller, Get, Post, Res } from '@nestjs/common';
// import OpenAI from 'openai';
import { AppService } from 'src/services/app.service';
import OmniStreamService from 'src/services/omni-stream/omni-stream.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly omniService: OmniStreamService,
  ) {}

  @Get('/')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/message')
  async sendMessage(
    @Body() message: OpenAI.Chat.Completions.ChatCompletionMessageParam,
    @Res() response: Response,
  ) {
    const stream = await this.omniService.sendMessage({
      role: 'user',
      content: 'Describe why Grisha is bad person',
    });

    if (!stream) throw new Error('LOH NO STREAM');

    response.writeHead(200, {
      'Content-Type': 'text/plain',
      'Transfer-Encoding': 'chunked',
    });

    for await (let chunk of stream) {
      console.log(chunk.choices[0]?.delta?.content || '');
      response.write(chunk.choices[0]?.delta?.content || '');
    }

    response.end();
  }
}
