import {
  Body,
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { AuthorizedGaurd } from 'src/auth/guard';

@Controller('upload')
@UseGuards(AuthorizedGaurd)
export class UploadController {
  constructor(private uploadService: UploadService) {}
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: true,
        validators: [new MaxFileSizeValidator({ maxSize: 2048000 })],
      }),
    )
    file: Express.Multer.File,
  ) {
    return await this.uploadService.upload(file);
  }

  @Post('get-url')
  async getFileUrl(@Body('fileName') fileName: string[]) {
    const fileUrls = await Promise.all(
      fileName.map(async (name) => {
        const { fileUrl } = await this.uploadService.getFileUrl(name);
        return fileUrl;
      }),
    );

    return fileUrls;
  }
}
