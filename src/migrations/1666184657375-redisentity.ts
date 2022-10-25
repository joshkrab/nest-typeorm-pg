import {MigrationInterface, QueryRunner} from "typeorm";

export class redisentity1666184657375 implements MigrationInterface {
    name = 'redisentity1666184657375'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "redis" DROP CONSTRAINT "PK_c89bf2bbbe102a9b1d14d6f11d4"`);
        await queryRunner.query(`ALTER TABLE "redis" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "redis" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "redis" ADD CONSTRAINT "PK_2db5551ac6ae0611dce515f97b8" PRIMARY KEY ("id")`);
        await queryRunner.query(`COMMENT ON COLUMN "redis"."id" IS 'Auto inc'`);
        await queryRunner.query(`ALTER TABLE "redis" ALTER COLUMN "key" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "redis" ALTER COLUMN "value" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "redis" ALTER COLUMN "value" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "redis" ALTER COLUMN "key" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "redis"."id" IS 'Auto inc'`);
        await queryRunner.query(`ALTER TABLE "redis" DROP CONSTRAINT "PK_2db5551ac6ae0611dce515f97b8"`);
        await queryRunner.query(`ALTER TABLE "redis" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "redis" ADD "userId" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "redis" ADD CONSTRAINT "PK_c89bf2bbbe102a9b1d14d6f11d4" PRIMARY KEY ("userId")`);
    }

}
