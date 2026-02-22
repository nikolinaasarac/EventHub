import { IsNotEmpty, IsString, Length } from 'class-validator';

export class SetPasswordDto {
  @Length(8)
  @IsString()
  @IsNotEmpty()
  password: string;
}
