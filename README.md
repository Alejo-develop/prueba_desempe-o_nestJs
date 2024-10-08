<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

 
## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

### Begin the project


```bash
nest new nameofproject
```

### App config

```typescript

import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TournamentsModule } from './tournaments/tournaments.module';
import { PlayerTournamentsModule } from './player_tournaments/player_tournaments.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ 
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'b1wb69iwv0wvloksunny-mysql.services.clever-cloud.com',
      port: 3306,
      username: 'ucfc87q6hcarwx17',
      password: 'LAxdmR73kRpAzagdtifM',
      database: 'b1wb69iwv0wvloksunny',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true
    }),UsersModule, TournamentsModule, PlayerTournamentsModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

```

### Install ORM and mysql

```bash
npm install --save @nestjs/typeorm typeorm mysql 

```

### install ConfigModule forn .env

```bash
npm i @nestjs/config
```

### Install swagger

```bash
npm install @nestjs/swagger swagger-ui-express
```

### Install bcrypt

```bash
npm install bcrypt
npm install @types/bcrypt --save-dev
```

### Install JWT (JSON Web Token)

```bash
npm install @nestjs/jwt passport-jwt
npm install @types/passport-jwt --save-dev
```

### Install class-validator


```bash
npm install class-validator
npm install class-transformer
```


```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './filters/exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('riwi-test');
  dotenv.config();

  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('riwi test')
    .setDescription('test')
    .setVersion('1.0')
    .addTag('riwi-test-nestjs')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
```


### Made commons

```bash
mkdir src\common
mkdir src\common\enums
mkdir src\common\guards
mkdir src\common\services
```

### GenericService

```typescript

import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, DeepPartial } from 'typeorm';
import { BaseEntity } from 'typeorm';

@Injectable()
export class GenericService<T extends BaseEntity> {
  constructor(private readonly repository: Repository<T>) {}

  async create(createDto: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(createDto);
    return await this.repository.save(entity);
  }

  async findAll(): Promise<T[]> {
    return await this.repository.find();
  }

  async findOne(id: string): Promise<T> {
    const entity = await this.repository.findOne({ where: { id } as any });
    if (!entity) {
      throw new NotFoundException(`Entity with id ${id} not found`);
    }
    return entity;
  }
  
  async update(id: string, updateDto: DeepPartial<T>): Promise<T> { 
    const entity = await this.findOne(id);
    this.repository.merge(entity, updateDto);
    return await this.repository.save(entity);
  }

  async delete(id: string): Promise<T> {
    const deletedItem = await this.repository.findOne({ where: { id } as any });
    if (!deletedItem) {
      throw new NotFoundException(`Entity with ID ${id} not found`);
    }
    await this.repository.softDelete(id);
    return deletedItem;
  }
}
```







Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).