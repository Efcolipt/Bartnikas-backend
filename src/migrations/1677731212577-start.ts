import { MigrationInterface, QueryRunner } from "typeorm";

export class start1677731212577 implements MigrationInterface {
    name = 'start1677731212577'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`file\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`original_name\` varchar(255) NOT NULL, \`url\` varchar(255) NOT NULL, \`path\` varchar(255) NOT NULL, \`type\` varchar(255) NOT NULL, \`mimetype\` varchar(255) NOT NULL, \`size\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`project_image\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`project\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`desc\` longtext NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`news\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`desc\` longtext NOT NULL, \`text\` longtext NOT NULL, \`is_hot\` tinyint NOT NULL DEFAULT 0, \`date\` timestamp NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`blog\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`desc\` longtext NOT NULL, \`text\` longtext NOT NULL, \`date\` timestamp NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`project_image_files_file\` (\`projectImageId\` int NOT NULL, \`fileId\` int NOT NULL, INDEX \`IDX_8d7d7ee8535275f2768ea2195c\` (\`projectImageId\`), INDEX \`IDX_b77628d96915d6fb6a9fcbe81b\` (\`fileId\`), PRIMARY KEY (\`projectImageId\`, \`fileId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`project_project_images_project_image\` (\`projectId\` int NOT NULL, \`projectImageId\` int NOT NULL, INDEX \`IDX_cb43a6eac0b1cc401b5606555e\` (\`projectId\`), INDEX \`IDX_8e2c335c087d9d5fbe372b769c\` (\`projectImageId\`), PRIMARY KEY (\`projectId\`, \`projectImageId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`news_images_file\` (\`newsId\` int NOT NULL, \`fileId\` int NOT NULL, INDEX \`IDX_d258ab2b35e97abc65c41e2c7b\` (\`newsId\`), INDEX \`IDX_3f7b33292530ef44137726a691\` (\`fileId\`), PRIMARY KEY (\`newsId\`, \`fileId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`blog_images_file\` (\`blogId\` int NOT NULL, \`fileId\` int NOT NULL, INDEX \`IDX_a86d77b981e40198d4ee593092\` (\`blogId\`), INDEX \`IDX_0b01226ef9d1f772be4bb4efbd\` (\`fileId\`), PRIMARY KEY (\`blogId\`, \`fileId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`project_image_files_file\` ADD CONSTRAINT \`FK_8d7d7ee8535275f2768ea2195c6\` FOREIGN KEY (\`projectImageId\`) REFERENCES \`project_image\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`project_image_files_file\` ADD CONSTRAINT \`FK_b77628d96915d6fb6a9fcbe81bf\` FOREIGN KEY (\`fileId\`) REFERENCES \`file\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`project_project_images_project_image\` ADD CONSTRAINT \`FK_cb43a6eac0b1cc401b5606555e1\` FOREIGN KEY (\`projectId\`) REFERENCES \`project\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`project_project_images_project_image\` ADD CONSTRAINT \`FK_8e2c335c087d9d5fbe372b769ca\` FOREIGN KEY (\`projectImageId\`) REFERENCES \`project_image\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`news_images_file\` ADD CONSTRAINT \`FK_d258ab2b35e97abc65c41e2c7bc\` FOREIGN KEY (\`newsId\`) REFERENCES \`news\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`news_images_file\` ADD CONSTRAINT \`FK_3f7b33292530ef44137726a6910\` FOREIGN KEY (\`fileId\`) REFERENCES \`file\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`blog_images_file\` ADD CONSTRAINT \`FK_a86d77b981e40198d4ee5930925\` FOREIGN KEY (\`blogId\`) REFERENCES \`blog\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`blog_images_file\` ADD CONSTRAINT \`FK_0b01226ef9d1f772be4bb4efbdb\` FOREIGN KEY (\`fileId\`) REFERENCES \`file\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`blog_images_file\` DROP FOREIGN KEY \`FK_0b01226ef9d1f772be4bb4efbdb\``);
        await queryRunner.query(`ALTER TABLE \`blog_images_file\` DROP FOREIGN KEY \`FK_a86d77b981e40198d4ee5930925\``);
        await queryRunner.query(`ALTER TABLE \`news_images_file\` DROP FOREIGN KEY \`FK_3f7b33292530ef44137726a6910\``);
        await queryRunner.query(`ALTER TABLE \`news_images_file\` DROP FOREIGN KEY \`FK_d258ab2b35e97abc65c41e2c7bc\``);
        await queryRunner.query(`ALTER TABLE \`project_project_images_project_image\` DROP FOREIGN KEY \`FK_8e2c335c087d9d5fbe372b769ca\``);
        await queryRunner.query(`ALTER TABLE \`project_project_images_project_image\` DROP FOREIGN KEY \`FK_cb43a6eac0b1cc401b5606555e1\``);
        await queryRunner.query(`ALTER TABLE \`project_image_files_file\` DROP FOREIGN KEY \`FK_b77628d96915d6fb6a9fcbe81bf\``);
        await queryRunner.query(`ALTER TABLE \`project_image_files_file\` DROP FOREIGN KEY \`FK_8d7d7ee8535275f2768ea2195c6\``);
        await queryRunner.query(`DROP INDEX \`IDX_0b01226ef9d1f772be4bb4efbd\` ON \`blog_images_file\``);
        await queryRunner.query(`DROP INDEX \`IDX_a86d77b981e40198d4ee593092\` ON \`blog_images_file\``);
        await queryRunner.query(`DROP TABLE \`blog_images_file\``);
        await queryRunner.query(`DROP INDEX \`IDX_3f7b33292530ef44137726a691\` ON \`news_images_file\``);
        await queryRunner.query(`DROP INDEX \`IDX_d258ab2b35e97abc65c41e2c7b\` ON \`news_images_file\``);
        await queryRunner.query(`DROP TABLE \`news_images_file\``);
        await queryRunner.query(`DROP INDEX \`IDX_8e2c335c087d9d5fbe372b769c\` ON \`project_project_images_project_image\``);
        await queryRunner.query(`DROP INDEX \`IDX_cb43a6eac0b1cc401b5606555e\` ON \`project_project_images_project_image\``);
        await queryRunner.query(`DROP TABLE \`project_project_images_project_image\``);
        await queryRunner.query(`DROP INDEX \`IDX_b77628d96915d6fb6a9fcbe81b\` ON \`project_image_files_file\``);
        await queryRunner.query(`DROP INDEX \`IDX_8d7d7ee8535275f2768ea2195c\` ON \`project_image_files_file\``);
        await queryRunner.query(`DROP TABLE \`project_image_files_file\``);
        await queryRunner.query(`DROP TABLE \`blog\``);
        await queryRunner.query(`DROP TABLE \`news\``);
        await queryRunner.query(`DROP TABLE \`project\``);
        await queryRunner.query(`DROP TABLE \`project_image\``);
        await queryRunner.query(`DROP TABLE \`file\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
