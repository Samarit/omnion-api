import { OpenAI } from 'openai';
import { Body, Controller, Get, Logger, Post, Res } from '@nestjs/common';
// import OpenAI from 'openai';
import { AppService } from 'src/services/app.service';
import OmniStreamService from 'src/services/omni-stream/omni-stream.service';
import { Response } from 'express';
import { Stream } from 'openai/streaming';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly omniService: OmniStreamService,
    private logger: Logger,
  ) {}

  @Get('/')
  getHello(): string {
    this.logger.log('Hello World!');
    return this.appService.getHello();
  }

  @Get('/message')
  async sendMessage(@Body() message: string, @Res() response: Response) {
    const data = await this.omniService.sendMessageStream({
      role: 'user',
      content: 'Say Hello Alesha',
    });

    if (!data) throw new Error('LOH NO RESPONSE');

    if (data instanceof Stream) {
      response.writeHead(200, {
        'Content-Type': 'text/plain',
        'Transfer-Encoding': 'chunked',
      });

      for await (let chunk of data) {
        console.log(chunk.choices[0]?.delta?.content || '');
        response.write(chunk.choices[0]?.delta?.content || '');
      }
      response.end();
    } else {
      return data;
    }
  }
}
