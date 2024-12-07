import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {
  PutObjectCommand,
  GetObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
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

  async upload(file: Express.Multer.File): Promise<{ fileName: string }> {
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
      });
      await this.s3Client.send(command);

      return { fileName };
    } catch (error) {
      console.error('Error uploading file to S3:', error);
      throw new InternalServerErrorException('Failed to upload file.');
    }
  }

  async getFileUrl(fileName: string): Promise<{ fileUrl: string }> {
    try {
      const command = new GetObjectCommand({
        Bucket: this.bucketName,
        Key: fileName,
      });
      const url = await getSignedUrl(this.s3Client, command, {
        expiresIn: 43200,
      });
      return { fileUrl: url };
    } catch (err) {
      console.error('Error getting upload url:', err);
      throw new InternalServerErrorException('Failed to get upload url.');
    }
  }
}
