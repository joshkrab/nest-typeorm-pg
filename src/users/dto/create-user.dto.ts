import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString({ message: 'Must be a string' })
  @IsEmail({}, { message: 'Not correct email' })
  readonly email: string;

  @IsNotEmpty()
  @IsString({ message: 'Must be a string' })
  @Length(4, 16, { message: 'Min 4, Max 16 characters!' })
  readonly password: string;
}
