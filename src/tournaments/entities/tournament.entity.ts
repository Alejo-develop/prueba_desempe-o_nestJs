import { User } from "../../users/entities/user.entity";
import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Tournament extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string;

    @Column()
    date: Date

    @ManyToOne(() => User)
    @JoinColumn({ name: 'winnerId' , referencedColumnName: 'id'})
    user: User

    @Column({ nullable: true })
    winnerId?: string;

    @CreateDateColumn({ select: false })
    createdAt: Date;
  
    @UpdateDateColumn({ select: false })
    updatedAt: Date;

    @DeleteDateColumn({ select: false})
    deleteAt: Date
}
