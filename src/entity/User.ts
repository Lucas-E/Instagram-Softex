import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Column,
    Unique,
    OneToMany,
    DeleteDateColumn,
  } from 'typeorm';
  import { Post } from './Post';
  import { Comment } from './Comment';
  import { Like } from './Like';

  @Entity()
  @Unique(['email'])
  export class User {
    @PrimaryGeneratedColumn()
    id: number;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  
    @DeleteDateColumn({ nullable: true })
    deleted_at: Date;
  
    @Column()
    username: string;
  
    @Column()
    password: string;
  
    @Column()
    email: string;
  
    @Column({ nullable: true })
    bio: string;
  
    @Column({default: 0, nullable:true})
    followers: number;
  
    @OneToMany(() => Post, post => post.user, { cascade: true })
    posts: Post[];
  
    @OneToMany(() => Comment, comment => comment.user, { cascade: true })
    comments: Comment[];
  
    @OneToMany(() => Like, like => like.user, { cascade: true })
    likes: Like[];
  }
  