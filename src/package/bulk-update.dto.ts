import { Package } from './package.entity';

export class BulkUpdateDto {
  updates: Package[]; // Records to update
  inserts: Package[]; // Records to insert
  deletions: number[]; // IDs of records to delete
}
