/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  Controller,
  Post,
  Get,
  UseInterceptors,
  UploadedFile,
  Param,
  Res,
  UseGuards,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { editFileName, imageFileFilter } from "./utils";
import JwtAuthGuard from "../auth/jwtAuth.guard";
import { ApiConsumes, ApiBody } from "@nestjs/swagger";
import { Response } from "express";
@Controller("uploads")
export class UploadController {
  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor("image", {
      storage: diskStorage({
        destination: "/var/lib/data",
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    })
  )
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    description: "Uploaded image",
  })
  uploadFile(@UploadedFile() file) {
    return file;
  }

  @Get(":imgpath")
  seeUploadedFile(@Param("imgpath") image: string, @Res() res: Response): void {
    return res.sendFile(image, { root: "/var/lib/data" });
  }
}
