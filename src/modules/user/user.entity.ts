import { Entity, Column, PrimaryColumn} from 'typeorm';

@Entity("user")
export default class User {
  @PrimaryColumn()
  name: string;

  @Column()
  age: string;

  @Column()
  sex: string;

}