import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Column,
    ManyToOne,
    JoinColumn,
    OneToMany,
    DeleteDateColumn,
  } from 'typeorm';
  import { User } from './User';
  import { Comment } from './Comment';
  import { Like } from './Like';
  
  @Entity()
  export class Post {
    @PrimaryGeneratedColumn()
    id: number;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  
    @DeleteDateColumn({ nullable: true })
    deleted_at: Date;
  
    @Column()
    image: string;
  
    @Column()
    description: string;
  
    @ManyToOne(() => User, user => user.posts, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;
  
    @OneToMany(() => Comment, comment => comment.post, { cascade: true })
    comments: Comment[];
  
    @OneToMany(() => Like, like => like.post, { cascade: true })
    likes: Like[];
  }
  