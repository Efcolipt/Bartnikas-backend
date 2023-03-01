import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FilesService } from '../files/files.service';
import {
  CreateProjectDto,
  UpdateProjectDto,
  CreateProjectImageDto,
  UpdateProjectImageDto,
} from './dto';
import { Project } from './entities/project.entity';
import { ProjectImage } from './entities/project-image.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(ProjectImage)
    private readonly imageRepository: Repository<ProjectImage>,
    private readonly filesService: FilesService,
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    const project = new Project();

    //const images = await this.filesService.findByIds(createProjectDto.images);

    project.title = createProjectDto.title;
    project.desc = createProjectDto.desc;
    //project.images = images;

    return await this.projectRepository.save(project);
  }

  async findAll() {
    return await this.projectRepository.find({
      relations: {
        project_images: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.projectRepository.findOne({
      where: { id },
      relations: {
        project_images: true,
      },
    });
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    const toUpdate = await this.projectRepository.findOneBy({ id });
    //const images = await this.filesService.findByIds(updateProjectDto.images);
    const updated = Object.assign(toUpdate, { ...updateProjectDto });
    //const updated = Object.assign(toUpdate, { ...updateProjectDto, images });
    return await this.projectRepository.save(updated);
  }

  async remove(id: number) {
    return await this.projectRepository.delete(id);
  }

  // async removeImage(id: number, imageId: number) {
  //   const project = await this.projectRepository.findOne({
  //     where: { id },
  //     relations: {
  //       images: true,
  //     },
  //   });
  //   project.images = project.images.filter((image) => {
  //     return image.id != imageId;
  //   });
  //   return await this.projectRepository.save(project);
  // }

  // Image
  async createImage(
    projectId: number,
    createProjectImageDto: CreateProjectImageDto,
  ) {
    const image = new ProjectImage();

    const files = await this.filesService.findByIds(
      createProjectImageDto.files,
    );

    image.name = createProjectImageDto.name;
    image.files = files;

    const imageCreated = await this.imageRepository.save(image);
    const project = await this.projectRepository.findOne({
      where: { id: projectId },
      relations: {
        project_images: true,
      },
    });

    await this.projectRepository.save({
      ...project,
      project_images: [...project.project_images, imageCreated],
    });

    return imageCreated;
  }

  async findOneImage(projectId: number, imageId: number) {
    // TODO сделать 1 запросом
    const project = await this.projectRepository.findOne({
      where: { id: projectId },
      relations: {
        project_images: true,
      },
    });
    const image = await this.imageRepository.findOne({
      where: { id: imageId },
      relations: {
        files: true,
      },
    });
    return { ...image, project };
  }

  async updateImage(
    projectId: number,
    imageId: number,
    updateProjectImageDto: UpdateProjectImageDto,
  ) {
    const toUpdate = await this.imageRepository.findOneBy({ id: imageId });
    const files = await this.filesService.findByIds(
      updateProjectImageDto.files,
    );
    const updated = Object.assign(toUpdate, {
      ...updateProjectImageDto,
      files,
    });
    return await this.imageRepository.save(updated);
  }

  async removeImage(projectId: number, imageId: number) {
    return await this.imageRepository.delete(imageId);
  }

  async removeImageFile(imageId: number, fileId: number) {
    const image = await this.imageRepository.findOne({
      where: { id: imageId },
      relations: {
        files: true,
      },
    });
    image.files = image.files.filter((file) => {
      return file.id != fileId;
    });
    return await this.imageRepository.save(image);
  }
}
