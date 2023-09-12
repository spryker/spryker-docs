# Notes

### About this application

Implemented functional allowed to collect information from Travis CI and save information about status of builds in database.  

### Structure of application

#### Database

How storage this information in database. 

Have 4 tables for save data
1. `ci_flickery_tests_builds` - for save id and checked time for builds
2. `ci_flickery_tests_jobs` - for save information about jobs
3. `ci_flickery_tests_job_logs` - for save information historical state of jobs
4. `ci_flickery_tests_failed_tests` - for save information about failed tests.

### Console commands

- `ci_flickery_tests_fetch_failed_jobs` - fetch new builds with failed jobs from Travis CI and save in database
- `ci_flickery_tests_update_failed_jobs` - update information about failed jobs in database

Example of usage:

```bash
bin/cake ci_flickery_tests_fetch_failed_jobs
bin/cake ci_flickery_tests_update_failed_jobs
```


### Travis cache

During development process I often use Travis CI API.
But Travis CI API have limit for requests.  And woried about this limit, because I can be banned for some time.
So I implemented simple cache for Travis CI API.
This cache helped me to reduce number of requests to Travis CI API.
Cache save in ` ` directory.

### How its work

So, Durring prepare to damo I prepared some files for cache. For speed up process.

1. Fetch new builds from Travis CI API.


```bash

sh tc_init.sh

bin/cake ci_flickery_tests_fetch_failed_jobs

```
Process is simple.
- Fetch latest builds  with some limit settings in configuration.
- Checked if build failed
- Fetch data about build jobs.
- Fetch raw log for failed jobs.
- Parse this jobs and save information about failed tests in database.

I adjusted some log files for cache for siplify demo process.

__Show database changes__



2. Update information about failed jobs in database

For example we want to restrat some flickery jobs for second build.
But both jobs failed again. But first jobs failed again with same test and second jobs failed with another test.

Again copy adjusted files for demo and run command for update

```bash
sh tc_upd.sh

```
```bash

bin/cake ci_flickery_tests_update_failed_jobs
```
This command updated cache files. I adjusted log and json files for cache for simplify demo process.

I updated `started_at` and `finished_at` for both jobs in second build.

Update process:
- Find latest build in database but sort by checked time.
- Fetch jobs for this build from Travis CI API.
- Checked state and finished time for this jobs.
- If time or state was changed fetch raw log for failed jobs and parse it.
- Then update information in database.

So now we have new information about restarted jobs in database.

One job failed again with same test and second jobs failed with another test.
This happans some time in real life.



3. Get information about passed jobs from database

So we restarted again two last jobs. But now both jobs passed.

```bash
sh tc_passed.sh

bin/cake ci_flickery_tests_update_failed_jobs
```

So finally if job passed it flickery job.
