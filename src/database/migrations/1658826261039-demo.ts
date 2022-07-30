import { MigrationInterface, QueryRunner } from 'typeorm';

export class demo1658826261039 implements MigrationInterface {
  name = 'demo1658826261039';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`color\` (\`color_id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`code\` varchar(255) NOT NULL, PRIMARY KEY (\`color_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`category\` (\`category_id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`category_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`image\` (\`image_id\` int NOT NULL AUTO_INCREMENT, \`url\` varchar(255) NOT NULL, \`status\` int NOT NULL, \`productDetailProductDetailId\` int NULL, UNIQUE INDEX \`REL_06173fd2d52ef66b37651bb0e6\` (\`productDetailProductDetailId\`), PRIMARY KEY (\`image_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`size\` (\`size_id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`size_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`product_detail\` (\`product_detail_id\` int NOT NULL AUTO_INCREMENT, \`amount\` int NOT NULL, \`productProductId\` int NULL, \`sizeSizeId\` int NULL, \`colorColorId\` int NULL, PRIMARY KEY (\`product_detail_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`product\` (\`product_id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`price\` int NOT NULL, \`promotion\` int NULL, \`categoryCategoryId\` int NULL, PRIMARY KEY (\`product_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`user_id\` int NOT NULL AUTO_INCREMENT, \`first_name\` varchar(255) NOT NULL, \`last_name\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`phonenumber\` varchar(255) NOT NULL, \`created_at\` datetime NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` datetime NULL DEFAULT CURRENT_TIMESTAMP, UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`user_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`order\` (\`order_id\` int NOT NULL AUTO_INCREMENT, \`status\` int NOT NULL, \`amount\` int NOT NULL, \`email\` varchar(255) NULL, \`address\` varchar(255) NULL, \`phonenumber\` varchar(255) NULL, \`created_at\` datetime NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` datetime NULL DEFAULT CURRENT_TIMESTAMP, \`userUserId\` int NULL, \`productDetailProductDetailId\` int NULL, PRIMARY KEY (\`order_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`image\` ADD CONSTRAINT \`FK_06173fd2d52ef66b37651bb0e6c\` FOREIGN KEY (\`productDetailProductDetailId\`) REFERENCES \`product_detail\`(\`product_detail_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
      `ALTER TABLE \`product\` ADD CONSTRAINT \`FK_8b4d0e2be5e945a828f313b4f30\` FOREIGN KEY (\`categoryCategoryId\`) REFERENCES \`category\`(\`category_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
      `ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_8b4d0e2be5e945a828f313b4f30\``,
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
      `ALTER TABLE \`image\` DROP FOREIGN KEY \`FK_06173fd2d52ef66b37651bb0e6c\``,
    );
    await queryRunner.query(`DROP TABLE \`order\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``,
    );
    await queryRunner.query(`DROP TABLE \`user\``);
    await queryRunner.query(`DROP TABLE \`product\``);
    await queryRunner.query(`DROP TABLE \`product_detail\``);
    await queryRunner.query(`DROP TABLE \`size\``);
    await queryRunner.query(
      `DROP INDEX \`REL_06173fd2d52ef66b37651bb0e6\` ON \`image\``,
    );
    await queryRunner.query(`DROP TABLE \`image\``);
    await queryRunner.query(`DROP TABLE \`category\``);
    await queryRunner.query(`DROP TABLE \`color\``);
  }
}
