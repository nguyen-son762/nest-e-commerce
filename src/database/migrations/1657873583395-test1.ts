import { MigrationInterface, QueryRunner } from 'typeorm';

export class test11657873583395 implements MigrationInterface {
  name = 'test11657873583395';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`color\` (\`color_id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`code\` varchar(255) NOT NULL, PRIMARY KEY (\`color_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`category\` (\`category_id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`category_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`product\` (\`product_id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`price\` int NOT NULL, \`promotion\` int NULL, \`categoryCategoryId\` int NULL, UNIQUE INDEX \`REL_8b4d0e2be5e945a828f313b4f3\` (\`categoryCategoryId\`), PRIMARY KEY (\`product_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`size\` (\`size_id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`size_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`product_detail\` (\`product_detail_id\` int NOT NULL AUTO_INCREMENT, \`amount\` int NOT NULL, \`productProductId\` int NULL, \`sizeSizeId\` int NULL, \`colorColorId\` int NULL, UNIQUE INDEX \`REL_27e369ec3caf92a7a944654776\` (\`productProductId\`), UNIQUE INDEX \`REL_625d9209f6918a5af17805a99e\` (\`sizeSizeId\`), UNIQUE INDEX \`REL_b4845cf6c009a8501d1ce3179c\` (\`colorColorId\`), PRIMARY KEY (\`product_detail_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`user_id\` int NOT NULL AUTO_INCREMENT, \`first_name\` varchar(255) NOT NULL, \`last_name\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`phonenumber\` varchar(255) NOT NULL, \`created_at\` datetime NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` datetime NULL DEFAULT CURRENT_TIMESTAMP, UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`user_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`order\` (\`order_id\` int NOT NULL AUTO_INCREMENT, \`status\` int NOT NULL, \`amount\` int NOT NULL, \`email\` varchar(255) NULL, \`address\` varchar(255) NULL, \`phonenumber\` varchar(255) NULL, \`created_at\` datetime NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` datetime NULL DEFAULT CURRENT_TIMESTAMP, \`userUserId\` int NULL, \`productDetailProductDetailId\` int NULL, PRIMARY KEY (\`order_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD CONSTRAINT \`FK_8b4d0e2be5e945a828f313b4f30\` FOREIGN KEY (\`categoryCategoryId\`) REFERENCES \`category\`(\`category_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_detail\` ADD CONSTRAINT \`FK_27e369ec3caf92a7a9446547762\` FOREIGN KEY (\`productProductId\`) REFERENCES \`product\`(\`product_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_detail\` ADD CONSTRAINT \`FK_625d9209f6918a5af17805a99ea\` FOREIGN KEY (\`sizeSizeId\`) REFERENCES \`size\`(\`size_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_detail\` ADD CONSTRAINT \`FK_b4845cf6c009a8501d1ce3179c9\` FOREIGN KEY (\`colorColorId\`) REFERENCES \`color\`(\`color_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` ADD CONSTRAINT \`FK_f2118217784d0e73e2b050bd564\` FOREIGN KEY (\`userUserId\`) REFERENCES \`user\`(\`user_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` ADD CONSTRAINT \`FK_f8137abd4997c1454fd5326adfd\` FOREIGN KEY (\`productDetailProductDetailId\`) REFERENCES \`product_detail\`(\`product_detail_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_f8137abd4997c1454fd5326adfd\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_f2118217784d0e73e2b050bd564\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_detail\` DROP FOREIGN KEY \`FK_b4845cf6c009a8501d1ce3179c9\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_detail\` DROP FOREIGN KEY \`FK_625d9209f6918a5af17805a99ea\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_detail\` DROP FOREIGN KEY \`FK_27e369ec3caf92a7a9446547762\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_8b4d0e2be5e945a828f313b4f30\``,
    );
    await queryRunner.query(`DROP TABLE \`order\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``,
    );
    await queryRunner.query(`DROP TABLE \`user\``);
    await queryRunner.query(
      `DROP INDEX \`REL_b4845cf6c009a8501d1ce3179c\` ON \`product_detail\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_625d9209f6918a5af17805a99e\` ON \`product_detail\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_27e369ec3caf92a7a944654776\` ON \`product_detail\``,
    );
    await queryRunner.query(`DROP TABLE \`product_detail\``);
    await queryRunner.query(`DROP TABLE \`size\``);
    await queryRunner.query(
      `DROP INDEX \`REL_8b4d0e2be5e945a828f313b4f3\` ON \`product\``,
    );
    await queryRunner.query(`DROP TABLE \`product\``);
    await queryRunner.query(`DROP TABLE \`category\``);
    await queryRunner.query(`DROP TABLE \`color\``);
  }
}
