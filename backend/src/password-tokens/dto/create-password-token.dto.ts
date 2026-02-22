import { IsUUID, IsString, IsDate, IsBoolean } from 'class-validator';

export class CreatePasswordTokenDto {
  @IsString()
  token: string;

  @IsDate()
  expiry: Date;

  @IsBoolean()
  isUsed: boolean;

  @IsUUID()
  userId: string;
}
