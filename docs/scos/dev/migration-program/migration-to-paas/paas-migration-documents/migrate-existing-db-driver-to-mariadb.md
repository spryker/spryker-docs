---
title: Migrate existing DB driver to MariaDB
description: This document describes how to migrate existing DB driver to MariaDB.
template: howto-guide-template
---

## Resources for migration

* Backend
* DevOps

{% endinfo_block %}

## Migrate from MySQL/MariaDB to MariaDB

1. Make sure the version of MySQL/MariaDB in the old system is the same as in the new Spryker Cloud system.
2. Run the following query against the DB and save the output data. You will need this later to validate the DB restoration.
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
3. Ask the customer to create a database dump as follows:
    ```bash
    mysqldump -u local_user \
     --databases database_name \
     --single-transaction \
     --compress \
     --order-by-primary  \
     --column-statistics=0 \
     -plocal_password | gzip > /path/to/outputfile.sql.gz
    ```
   For more information about creating DB dumps, see [Importing data from a MariaDB or MySQL database to a MariaDB or MySQL DB instance](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/MySQL.Procedural.Importing.SmallExisting.html).

4. Ask the customer to upload the database dump to an AWS S3 bucket of the production environment using the AWS Management Console.
5. Connect to the EC2 instance. Details can be found [here](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/MySQL.Procedural.Importing.NonRDSRepl.html#MySQL.Procedural.Importing.Import.Database).

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
6. In the AWS Management Console, go to **Parameter Store**.
7. To find the database credentials, filter the parameters by `DB`.
8. Import the database:
```bash
mysql -u<SPRYKER_DB_USERNAME> -p<SPRYKER_DB_PASSWORD> -h <Endpoint> <DB name> < <dump_name>.sql &
```

7. Repeat step 2 against the restored database. To make sure the migration is successful, compare the outputs from the queries you've run for the original and restored DBs. They should be the same.

## PostgreSQL/MariDB to MariaDB


PostgreSQL DB must be converted to MariaDB compatible dump. More information can be found [here](https://mariadb.com/kb/en/migrating-to-mariadb-from-postgresql/).
Converted dump can be uploaded to Spryker cloud using **MySQL/MariaDB to MariaDB** guide.
