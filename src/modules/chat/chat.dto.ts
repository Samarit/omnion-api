import { IsNumber } from 'class-validator';

export class createChatDto {
  @IsNumber()
  user_id: number;
}
