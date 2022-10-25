import { MailerService } from '@nestjs-modules/mailer';
import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Get,
  Param,
  ParseIntPipe,
  Delete,
  Patch,
  UseInterceptors,
  CacheInterceptor,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CreateUserDto } from './dto/create-user.dto';
import { RedisService } from './redis.service';
import { UsersService } from './users.service';

@Controller('users')
@UseInterceptors(CacheInterceptor)
export class UsersController {
  constructor(
    private userService: UsersService,
    private redisService: RedisService,
    private mailService: MailerService,
  ) {}

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() dto: CreateUserDto): Promise<string> {
    return await this.userService.addUser(dto);
  }

  @Post('/redis')
  async writeRedisToDb(): Promise<any> {
    return await this.redisService.writeRedisToDb();
  }

  @Post('/upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './files',
        filename: (req, file, callback) => {
          // const suffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          // const ext = extname(file.originalname);
          // const filename = `${file.originalname}-${suffix}${ext}`;
          callback(null, file.originalname);
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);

    await this.mailService.sendMail({
      to: 'joshkrab@gmail.com',
      from: 'neizvestnyi.igor@gmail.com',
      subject: 'Email from Nest',
      html: '<h1>File Attachment</h1>',
      attachments: [
        {
          path: file.path,
          filename: file.filename,
          contentDisposition: 'attachment',
        },
      ],
    });

    return `File saved: ${file.path}`;
  }

  @Get('/redis')
  async getCacheFromDb() {
    return this.redisService.getCacheFromDb();
  }

  @Get('/:id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUserById(id);
  }

  @Get('/redis/:key')
  async getByCacheKey(@Param('key') key: string) {
    return this.userService.getByCacheKey(key);
  }

  @Delete('/redis/:key')
  async deleteByCacheKey(@Param('key') key: string) {
    return this.userService.deleteByCacheKey(key);
  }

  @Patch('/redis/:key')
  async updateByCacheKey(
    @Body() dto: CreateUserDto,
    @Param('key') key: string,
  ) {
    return this.userService.updateByCacheKey(key, dto);
  }
}
