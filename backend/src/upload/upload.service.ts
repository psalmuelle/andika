import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { nanoid } from 'nanoid';
import * as sharp from 'sharp';

@Injectable()
export class UploadService {
  private readonly s3Client: S3Client;
  private readonly bucketName: string;

  constructor(private readonly configService: ConfigService) {
    this.s3Client = new S3Client({
      region: this.configService.getOrThrow('AWS_S3_REGION'),
      credentials: {
        accessKeyId: this.configService.getOrThrow('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.getOrThrow('AWS_SECRET_ACCESS_KEY'),
      },
    });
    this.bucketName = this.configService.getOrThrow('AWS_S3_BUCKET_NAME');
  }

  async upload(file: Express.Multer.File): Promise<{ fileUrl: string }> {
    try {
      const fileName = `${nanoid(16)}-${file.originalname}`;
      let fileBuffer = file.buffer;

      if (file.mimetype.startsWith('image/')) {
        fileBuffer = await sharp(file.buffer)
          .resize(800, 800, {
            fit: 'inside',
            withoutEnlargement: true,
          })
          .toBuffer();
      }

      const command = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: fileName,
        Body: fileBuffer,
        ContentType: file.mimetype,
        ACL: 'public-read',
      });
      await this.s3Client.send(command);

      const encodedFileName = encodeURIComponent(fileName);
      const region = this.configService.getOrThrow('AWS_S3_REGION');

      const fileUrl = `https://${this.bucketName}.s3.${region}.amazonaws.com/${encodedFileName}`;

      return { fileUrl };
    } catch (error) {
      console.error('Error uploading file to S3:', error);
      throw new InternalServerErrorException('Failed to upload file.');
    }
  }
}
