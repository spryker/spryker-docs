---
title: 'Step 13: Migrate database'
description: To migrate to PaaS, one of the steps, is migrating the database
template: howto-guide-template
---

After you have chosen a multi-store setup, your next step is migrating the database. As Spryker PaaS supports only MariaDB, if you have MySQL or PostgreSQL, you must migrate to MariaDB. 

## Migrating MySQL or MariDB to MariaDB

To migrate the MySQL or MariaDB database to MariaDB in Paas, follow these steps.

1. Make sure the version of MySQL or MariaDB in the old system is compatible with the new Spryker Cloud system.
2. Run the following queries against source DB and save this data. You'll need them later to validate that the restoration went successfully:

```php
<?php
$dbName = 'database_maria';
$db = new PDO("mysql:host=localhost;dbname=$dbName", 'root', 'password');
$tableNames = $db->query("SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = '" . $dbName . "'")->fetchAll(PDO::FETCH_ASSOC);
$tablesCount = count($tableNames);
foreach ($tableNames as $key => $tableName){
	$count = $db->query("SELECT count(*) as `count` from " . $tableName['TABLE_NAME'])->fetchColumn();
    file_put_contents($dbName . "-health-check.csv", $tableName['TABLE_NAME'] . "," . $count . PHP_EOL, FILE_APPEND);
    echo $tableName['TABLE_NAME'] . "," . $count . " - " . $key . "/" . $tablesCount . PHP_EOL;
}

```
3. Create a database snapshot like in this example:

```bash
mysqldump -u local_user \
    --databases database_name \
    --single-transaction \
    --compress \
    --order-by-primary  \
    --column-statistics=0 \
    -plocal_password | gzip > /path/to/outputfile.sql.gz
```
For additional information about this step, see [Importing data from a MariaDB or MySQL database to a MariaDB or MySQL DB instance](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/MySQL.Procedural.Importing.SmallExisting.html).
4. Upload the database dump to an AWS S3 bucket of the production environment using the AWS Management Console.
5. Connect to the EC2 instance. For details on how to do this, see [Create an Amazon EC2 instance and copy the compressed database](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/MySQL.Procedural.Importing.NonRDSRepl.html#MySQL.Procedural.Importing.Import.Database).

Optional: for the Spryker Cloud environment, we recommend using a Scheduler instance for backup/restore purposes.
* AWS → EC2 → Instances → <env_name>-<[/d/w]*> → Connect via Session Manager
  ![Scheduler Container example](../images/scheduler-container-example.png "Scheduler Container example")
* Find AWS credentials here:
  ![AWS S3 credentials](../images/aws-s3-credentials.png "AWS S3 credentials")
* Execute the following to copy DB dump from S3 bucket to Scheduler container:
      
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
8. Restore snapshot to a new Spryker Cloud DB:

```bash
mysql -u<SPRYKER_DB_USERNAME> -p<SPRYKER_DB_PASSWORD> -h <Endpoint> <DB name> < <dump_name>.sql
```
9. Repeat step 2 against the restored database. To make sure the migration is successful, compare the outputs from the queries you've run for the original and restored DBs. They should be the same.

## PostgreSQL to MariaDB
PostgreSQL DB must be converted to MariaDB compatible dump. More information can be found [here](https://mariadb.com/kb/en/migrating-to-mariadb-from-postgresql/).

There is approach to migrate PostgreSQL DB to MariaDB using [AWS Database Migration Service](https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Source.PostgreSQL.html). This is not something Spryker offers outside of the box therefore configuration should be requested additionally via [Spryker Support portal](https://support.spryker.com/).

The following queries can be used for verification purposes to ensure that the data has been migrated in a consistent way:
```sql
-- count entire database rows;
WITH tbl AS
  (SELECT table_schema,
          TABLE_NAME
   FROM information_schema.tables
   WHERE TABLE_NAME not like 'pg_%'
     AND table_schema in ('public'))
SELECT 
       SUM((xpath('/row/c/text()', query_to_xml(format('select count(*) as c from %I.%I', table_schema, TABLE_NAME), FALSE, TRUE, '')))[1]::text::int) AS rows_n
FROM tbl
ORDER BY rows_n DESC;

-- count database rows per table;
WITH tbl AS
  (SELECT table_schema,
          TABLE_NAME
   FROM information_schema.tables
   WHERE TABLE_NAME not like 'pg_%'
     AND table_schema in ('public'))
SELECT table_schema,
       TABLE_NAME,
       (xpath('/row/c/text()', query_to_xml(format('select count(*) as c from %I.%I', table_schema, TABLE_NAME), FALSE, TRUE, '')))[1]::text::int AS rows_n
FROM tbl
ORDER BY rows_n DESC;
```
