import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('packages')
export class Package {
  
  @PrimaryGeneratedColumn()
  package_id: number;

  @Column({default: ''})
  name: string;

  @Column({default: ''})
  color: string;

  @Column({default: 0})
  length: Number;

  @Column({default: 0})
  width: Number;

  @Column({default: 0})
  height: Number;

  @Column({default: 0})
  weight: Number;

  @Column({default: 0})
  quantity: Number;

  @Column({default: false})
  stackable: Boolean;

  @Column({default: false})
  tiltable: Boolean;
}
