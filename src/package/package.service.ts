import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Package } from './package.entity';
import { PackagePost } from './package.interface';

@Injectable()
export class PackageService {
  constructor(
    @InjectRepository(Package)
    private readonly packageRepository: Repository<Package>,
  ) {}

  async create(packageData: PackagePost): Promise<Package> {
    const newPackage = this.packageRepository.create(packageData);
    return await this.packageRepository.save(newPackage);
  }

  async findAll(): Promise<Package[]> {
    return await this.packageRepository.find();
  }

  async findOne(id: number): Promise<Package | undefined> {
    return await this.packageRepository.findOne({ where: { package_id: id } });
  }

  async update(id: number, packageData: Package): Promise<Package | undefined> {
    await this.packageRepository.update(id, packageData);
    return this.packageRepository.findOne({ where: { package_id: id } });
  }

  async remove(id: number): Promise<void> {
    await this.packageRepository.delete(id);
  }
}
