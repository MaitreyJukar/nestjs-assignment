import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { PackageService } from './package.service';
import { Package } from './package.entity';
import { BulkUpdateDto } from './bulk-update.dto';
import { PackagePost } from './package.interface';

@Controller('packages')
export class PackageController {
  constructor(private readonly packageService: PackageService) {}

  @Get()
  findAll(): Promise<Package[]> {
    return this.packageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Package | undefined> {
    return this.packageService.findOne(id);
  }

  @Post()
  create(@Body() packageData: PackagePost): Promise<Package> {
    return this.packageService.create(packageData);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() packageData: Package,
  ): Promise<Package | undefined> {
    return this.packageService.update(id, packageData);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.packageService.remove(id);
  }

  @Post('bulk')
  bulkUpdate(@Body() bulkUpdateDto: BulkUpdateDto): Promise<Package[]> {
    if (bulkUpdateDto?.updates) {
      for (let packageData of bulkUpdateDto.updates) {
        this.packageService.update(packageData.package_id, packageData);
      }
    }
    if (bulkUpdateDto?.inserts) {
      for (let packageData of bulkUpdateDto.inserts) {
        this.packageService.create(packageData);
      }
    }
    if (bulkUpdateDto?.deletions) {
      for (let packageID of bulkUpdateDto.deletions) {
        this.packageService.remove(packageID);
      }
    }
    return this.packageService.findAll();
  }
}
