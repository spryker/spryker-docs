---
title: Migrate existing DB driver to MariaDB
description: This document describes how to migrate existing DB driver to MariaDB.
template: howto-guide-template
---

# Migrate existing DB driver to MariaDB

{% info_block infoBox %}

## Resources for assessment Backend, DevOps

{% endinfo_block %}

## MySQL/MariaDB to MariaDB

1. Make sure the version of MySQL/MariaDB in the old system is the same as in the new Spryker Cloud system.
2. Run the following queries against DB and save this data, we will need this later in order to validate that the
    restoration went successfully:
    ```php
    <?php
        $dbName = 'database_maria';
        $db = new PDO("mysql:host=localhost;dbname=$dbName", 'root', 'password');
        $tableNames = $db->query("SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = '" . $dbName . "'")->fetchAll(PDO::FETCH_ASSOC);
        $tablesCount = count($tableNames);
        foreach ($tableNames as $key => $tableName) {
            $count = $db->query("SELECT count(*) as `count` from " . $tableName['TABLE_NAME'])->fetchColumn();
            file_put_contents($dbName . "-health-check.csv", $tableName['TABLE_NAME'] . "," . $count . PHP_EOL, FILE_APPEND);
            echo $tableName['TABLE_NAME'] . "," . $count . " - " . $key . "/" . $tablesCount . PHP_EOL;
        }
    ```
3. Request customer to create database dump:
    ```bash
    mysqldump -u local_user \
     --databases database_name \
     --single-transaction \
     --compress \
     --order-by-primary  \
     --column-statistics=0 \
     -plocal_password | gzip > /path/to/outputfile.sql.gz
    ```
   Code snippet for creating database dump. Additional information is [here](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/MySQL.Procedural.Importing.SmallExisting.html).
4. Request customer to upload database dump into AWS S3 bucket of the production environment in Spryker Cloud, using AWS console UI.
5. Connect to EC2 instance. Details can be found [here](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/MySQL.Procedural.Importing.NonRDSRepl.html#MySQL.Procedural.Importing.Import.Database).

    *Optional*: for the Spryker Cloud environment we recommend using a Scheduler instance for backup/restore purposes.
    * AWS → EC2 → Instances → <env_name>-<[/d/w]*> → Connect via Session Manager
      ![Scheduler Container example](images/scheduler-container-example.png "Scheduler Container example")
    * Find AWS credentials here:
      ![AWS S3 credentials](images/aws-s3-credentials.png "AWS S3 credentials")
    * Execute the following:
      ```bash
      sudo su
      yum install mysql
      cd /media
      mkdir bkp && cd bkp
      # Copy AWS credentials and paste here
      aws s3 ls //to list buckets
      aws s3 cp s3://<bucket_name>/<dump_name> .
      ```
6. Restore database backup in Spryker Cloud:
    * Go to AWS → Parameter Store and filter by “DB“ in order to find Spryker Cloud DB credentials.
    * Execute the following:
      ```bash
      mysql -u<SPRYKER_DB_USERNAME> -p<SPRYKER_DB_PASSWORD> -h <Endpoint> <DB name> < <dump_name>.sql &
      ```
7. Repeat step 2 against restored database in order to ensure that everything went fine.

## MySQL/MariDB to MariaDB

PostgreSQL DB must be converted to MariaDB compatible dump. More information can be found [here](https://mariadb.com/kb/en/migrating-to-mariadb-from-postgresql/).
Converted dump can be uploaded to Spryker cloud using **MySQL/MariaDB to MariaDB** guide.
