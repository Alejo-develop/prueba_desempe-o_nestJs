import { PlayerTournament } from "src/player_tournaments/entities/player_tournament.entity";
import { Role } from "../../common/enum/Roles.enum";
import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Tournament } from "src/tournaments/entities/tournament.entity";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string;

    @Column({ nullable: true })
    secondName?: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

    @Column()
    email: string;

    @Column({ select: false })
    password: string;

    @Column()
    phoneNumber: string;

    @Column({ type: 'enum', enum: Role, default: Role.PLAYER})
    role: Role

    @OneToMany(() => PlayerTournament, (player) => player.user)
    playerTournament: PlayerTournament[]

    @OneToMany(() => Tournament, (torunament) => torunament.user)
    tournament: Tournament[]

    @CreateDateColumn({ select: false })
    createdAt: Date;
  
    @UpdateDateColumn({ select: false })
    updatedAt: Date;

    @DeleteDateColumn({ select: false})
    deleteAt: Date
}
