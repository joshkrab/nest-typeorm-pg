import {MigrationInterface, QueryRunner} from "typeorm";

export class redis1666182553984 implements MigrationInterface {
    name = 'redis1666182553984'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "redis" ("userId" SERIAL NOT NULL, "key" character varying NOT NULL, "value" character varying NOT NULL, CONSTRAINT "PK_c89bf2bbbe102a9b1d14d6f11d4" PRIMARY KEY ("userId")); COMMENT ON COLUMN "redis"."userId" IS 'Auto inc'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "redis"`);
    }

}
