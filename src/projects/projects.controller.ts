import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import {
  CreateProjectDto,
  UpdateProjectDto,
  CreateProjectImageDto,
  UpdateProjectImageDto,
} from './dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  findAll() {
    return this.projectsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.projectsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(id, updateProjectDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.projectsService.remove(id);
  }

  // @UseGuards(JwtAuthGuard)
  // @Delete(':id/image/:imageId')
  // removeImage(@Param('id') id: number, @Param('imageId') imageId: number) {
  //   return this.projectsService.removeImage(id, imageId);
  // }

  // Image
  @UseGuards(JwtAuthGuard)
  @Post(':projectId/image')
  createImage(
    @Param('projectId') projectId: number,
    @Body() createProjectImageDto: CreateProjectImageDto,
  ) {
    return this.projectsService.createImage(projectId, createProjectImageDto);
  }

  @Get(':projectId/image/:imageId')
  findOneImage(
    @Param('projectId') projectId: number,
    @Param('imageId') imageId: number,
  ) {
    return this.projectsService.findOneImage(projectId, imageId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':projectId/image/:imageId')
  updateImage(
    @Param('projectId') projectId: number,
    @Param('imageId') imageId: number,
    @Body() updateProjectImageDto: UpdateProjectImageDto,
  ) {
    return this.projectsService.updateImage(
      projectId,
      imageId,
      updateProjectImageDto,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':projectId/image/:imageId')
  removeImage(
    @Param('projectId') projectId: number,
    @Param('imageId') imageId: number,
  ) {
    return this.projectsService.removeImage(projectId, imageId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':imageId/image-remove/:fileId')
  removeImageFile(
    @Param('imageId') imageId: number,
    @Param('fileId') fileId: number,
  ) {
    return this.projectsService.removeImageFile(imageId, fileId);
  }
}
