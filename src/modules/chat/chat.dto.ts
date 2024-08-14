import { IsNumber } from 'class-validator';

export class createChatDto {
  @IsNumber()
  userID: number;
}

export class saveMessageDto {
  @IsNumber()
  userID: number;

  @IsNumber()
  chatID: number;

  message: string;
}
