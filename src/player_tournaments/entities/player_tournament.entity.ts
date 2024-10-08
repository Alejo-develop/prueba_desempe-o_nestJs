import { Tournament } from "../../tournaments/entities/tournament.entity";
import { User } from "../../users/entities/user.entity";
import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class PlayerTournament extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userId' , referencedColumnName: 'id'})
    user: User

    @Column()
    userId: string;

    @ManyToOne(() => Tournament)
    @JoinColumn({ name: 'tournamentId' , referencedColumnName: 'id'})
    tournament: Tournament

    @Column()
    tournamentId: string;

    @Column({ nullable: true })
    points?: number;

    @CreateDateColumn({ select: false })
    createdAt: Date;
  
    @UpdateDateColumn({ select: false })
    updatedAt: Date;

    @DeleteDateColumn({ select: false})
    deleteAt: Date
}
