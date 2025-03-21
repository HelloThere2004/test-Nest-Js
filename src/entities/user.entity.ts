import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, OneToMany } from "typeorm";
import { Comment } from "./comment.entity";
import * as bcrypt from 'bcryptjs';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 250 , nullable: false, unique: true})
    name: string;

    @Column({nullable: true})
    age: number;

    @Column({ length: 250 , nullable: false, unique: true})
    email: string;

    @Column({ length: 10, nullable: false})
    phone: string;

    @Column({ length: 250 , nullable: false})
    password: string;

    @OneToMany(() => Comment, comment => comment.user) // Fixed relationship reference
    comments: Comment[];

    @BeforeInsert()
    emailToLowerCase() {
        this.email = this.email.toLowerCase();
    }

    @BeforeInsert()
    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 10);
    }
}