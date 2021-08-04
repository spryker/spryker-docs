---
title: Console Commands in Spryker
originalLink: https://documentation.spryker.com/2021080/docs/console
redirect_from:
  - /2021080/docs/console
  - /2021080/docs/en/console
---

The [list of console commands](https://documentation.spryker.com/docs/getting-the-list-of-console-commands-and-available-options) contains the command names together with a short description of what the command does. The most important commands in Spryker can be split into 4 categories : collector commands, order management system commands, setup commands, and frontend-related commands. This article provides details on each of the commands.

## Collector commands

Collector commands are responsible of exporting the data in the SQL database to the front-end data storages (Redis and Elasticsearch)

* `collector:search:export` - exports data to the Elasticsearch storage
* `collector:search:update` - updates the data in the Elasticsearch storage
* `collector:storage:export` - exports data to Key-Value storage (Redis)

## Order Management System commands
Check if conditions are satisfied for the orders that are in the state that is the source state for the transition that has a condition attached.
```bash
console oms:check-condition
```
Options:
* `-s`, `--store=store` - filter by the given store
* `-l`, `--limit=limit` - limit the number of orders

Examples:
```bash
$ console oms:check-condition -s DE
$ console oms:check-condition --limit=100 --store=DE
```

---
Check if timeout was reached for the orders that are in the state that is the source state for the transition that has a timeout attached.
```bash
console oms:check-timeout
```

Options:
* `-s`, `--store=store` - filter by the given store
* `-l`, `--limit=limit` - limit the number of orders

Examples:
```bash
$ console oms:check-timeout --store=DE --limit=100
$ console oms:check-timeout -l 100
```

## Installation setup commands

`setup:install` - runs a set of commands, necessary for installing or updating the application. The following steps are performed when running this command:

1. delete all cache files for all stores (`cache:delete-all`)
2. remove the directory that contains the generated files, such as transfer classes, merged database schema XML files or autocompletion classes (`setup:remove-generated-directory`)
3. create or migrate the database (`setup:propel`)
4. generate transfer classes for each of the objects defined in the XML transfer files (`transfer:generate`)
5. initialize the database with required data (`setup:init-db`)
6. generate ide auto-completion files to enable navigation to referenced classes (`dev:ide:generate-auto-completion`). Generated auto-completion classes will be found for each application under the generated folder.
7. build the project resources for Yves and Zed
8. build the navigation tree (`application:build-navigation-tree`)

{% info_block infoBox %}
Each of the commands contained in the steps above can also be executed individually.
{% endinfo_block %}

`setup:install:demo-data` - inserts demo data into the database for testing reasons

`setup:propel` - runs a set of commands, necessary for creating or migrating the database. The following steps are performed when running this command:

1. write propel configuration (`setup:propel:config:convert`)
2. creates the database if it doesn’t exist yet, based on the configuration set in the previous step (`setup:propel:database:create`)
3. ensure compatibility with Postgresql if necessary, by adjusting the Propel XML schema files (`setup:propel:pg-sql-compat`)
4. copy schema files from Spryker and project packages to the generated folder (`setup:propel:schema:copy`)
5. build Propel classes based on the XML schema files (`setup:propel:model:build`)
6. compare the propel models with the database tables and generate the diff, in order to prepare for migration (`setup:propel:diff`)
7. migrate the database: update the database so that’s in sync with the propel models in the project (`setup:propel:migrate`)

## Jenkins setup commands

Cron jobs are scheduled by using Jenkins. For setting up Jenkins, the following console commands can be used from the command line:

* `scheduler:resume` - starts the Jenkins service
* `scheduler:suspend` - shut downs the Jenkins service
* `scheduler:setup` - sets up the cron jobs based on the definitions contained in the configuration file (the config file for jobs is placed in `/config/Zed/cronjobs/jobs.php`)
* `scheduler:clean` - cleans Jenkins jobs

{% info_block infoBox "Git Commands" %}

Git commands are enabled through console commands and they have effect on the Spryker packages.

{% endinfo_block %}

## Frontend-related commands
Depending on your environments and needs, there is a number of commands you can run. The table below provides an overview of such commands.
{% info_block infoBox %}

To use the NPM commands, you need to download and install [Node.js](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm). Minimum versions for Node.js is **8.x** and for NPM it is **5.x**. Then you can use the appropriate commands listed in the table.

{% endinfo_block %}
<table>
    <thead>
        <tr>
            <th>Environment</th>
            <th>Command description</th>
            <th>Local command</th>
            <th>VM command</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td rowspan=6>Project/Core</td>
                   </tr>
            <tr>
            <td>Removes the entire content from the cache directories.</td>
            <td></td>
             <td>console cache:empty-all</td>
        </tr>
        <tr>
            <td>Executes your importers (full-import).</td>
            <td></td>
            <td>console data:import </td>
        </tr>
        <tr>
            <td>Imports all text translations for the core/project level.</td>
             <td></td>
            <td>console data:import:glossary</td>
        </tr>
         <tr>
            <td>Generates transfer objects from transfer XML definition files.</td>
             <td></td>
            <td>console transfer:generate</td>
        </tr>
             <tr>
            <td>Generates a cache file for the twig templates.</td>
             <td></td>
            <td>console twig:cache:warmer</td>
        </tr>
        </tbody>
      <tbody>
        <tr>
            <td rowspan=10>Yves</td>
            <td >Dependencies installation (from the project level).</td>
            <td>npm install</td>
            <td>console frontend:project:install-dependencies
</td>
        </tr>
        <tr>
            <td>Builds the core/project scripts, styles, fonts, and images to the <var>public/Yves/assets</var> folder.</td>
            <td>npm run yves</td>
            <td>console frontend:yves:build </td>
        </tr>
        <tr>
            <td>Runs a build command every time the core/project scripts or style files change during the development.</td>
            <td>npm run yves:watch</td>
            <td></td>
        </tr>
        <tr>
            <td>Runs a production build which compresses and minifies the core/project scripts, styles, fonts, and images to the <var>public/Yves/assets</var> folder.</td>
            <td>npm run yves:production </td>
            <td>console frontend:yves:build environment production </td>
         </tr>
          <tr>
            <td>Builds the core/project scripts, styles, fonts, and images to the <var>public/Yves/assets</var> folder for development environment. Scripts are building in ES6 mode in this case.</td>
            <td>npm run yves:development:esm</td>
            <td></td>
         </tr>
          <tr>
            <td>Builds the core/project scripts, styles, fonts, and images to the <var>public/Yves/assets</var> folder for development environment. Scripts are building in ES5 mode in this case.</td>
            <td>npm run yves:development:legacy</td>
            <td></td>
         </tr>
          <tr>
            <td>Runs a production build which compresses and minifies the core/project scripts, styles, fonts, and images to the <var>public/Yves/assets</var> folder. Scripts are building in ES6 mode in this case.</td>
            <td>npm run yves:production:esm</td>
            <td></td>
         </tr>
          <tr>
            <td>Runs a production build which compresses and minifies the core/project scripts, styles, fonts, and images to the <var>public/Yves/assets</var> folder. Scripts are building in ES5 mode in this case.</td>
            <td>npm run yves:production:legacy</td>
            <td></td>
         </tr>
          <tr>
            <td>Runs a build command for development environment every time the core/project scripts or style files change during the development. Scripts are building in ES6 mode in this case.</td>
            <td>npm run yves:watch:esm</td>
            <td></td>
         </tr>
          <tr>
            <td>Runs a build command for development environment every time the core/project scripts or style files change during the development. Scripts are building in ES5 mode in this case.</td>
            <td>npm run yves:watch:legacy</td>
            <td></td>
         </tr>
        </tbody>
      <tbody>
           <tr>
            <td rowspan=4>Zed</td>
            <td >Dependencies installation. Will install and package all modules from <var>vendor/spryker</var> folder (for the split version) and from <var>vendor/spryker/spryker</var> folder (for the nonsplit version).</td>
               <td></td>
               <td>console frontend:zed:install-dependencies</td>
        </tr>
        <tr>
            <td>Builds Zed scripts, styles, fonts, and images to the <var>public/Zed/assets</var> folder.</td>
            <td>npm run zed</td>
             <td>console frontend:zed:build </td>
        </tr>
        <tr>
            <td>Runs a build command every time when Zed scripts or style files change during the development.</td>
            <td>npm run zed:watch</td>
             <td></td>
        </tr>
          <tr>
            <td>Runs a production build which compresses and minifies Zed scripts, styles, fonts, and images to the <var>public/Zed/assets</var> folder.</td>
            <td>npm run zed:production</td>
             <td>vendor/bin/console frontend:yves:build --environment production</td>
        </tr>
        </tbody>
    <tbody>
           <tr>
               <td rowspan=4>Legacy Demoshop</br>Yves</td>
            <td >Dependencies installation (from the project level).</td>
               <td>npm install</td>
               <td>console frontend:project:install-dependencies</td>
        </tr>
        <tr>
            <td>Builds the core/project scripts, styles, fonts, and images to the <var>public/Yves/assets/default</var> folder.</td>
            <td>npm run yves</td>
             <td>console frontend:yves:build </td>
        </tr>
        <tr>
            <td>Runs a build command every time when the core/project scripts or style files change during the development.</td>
            <td>npm run yves:dev</td>
             <td></td>
        </tr>
          <tr>
            <td>Runs a production build which compresses and minifies the core/project scripts, styles, fonts, and images to the public/Yves/assets/default folder.</td>
            <td>npm run yves:prod</td>
             <td>vendor/bin/console frontend:yves:build --environment production</td>
        </tr>
         </tbody>
            <tbody>
           <tr>
               <td rowspan=4>Legacy Demoshop</br>Zed</td>
            <td >Dependencies installation. Will install and package all modules from the <var>vendor/spryker</var> folder (for the <i>split</i> version) and from <var>vendor/spryker/spryker</var> folder (for the <i>nonsplit</i> version).</td>
               <td></td>
               <td>console frontend:zed:install-dependencies</td>
        </tr>
        <tr>
    <td>Builds Zed scripts, styles, fonts, and images to the <var>public/Zed/assets</var> folder.</td>
            <td>npm run zed</td>
             <td>console frontend:zed:build</td>
        </tr>
        <tr>
            <td>Runs a build command every time Zed scripts or styles files change during development.</td>
            <td>npm run zed:dev</td>
             <td></td>
        </tr>
          <tr>
            <td>Runs a production build which compresses and minifies Zed scripts, styles, fonts, and images to the public/Zed/assets folder.</td>
            <td>npm run zed:prod</td>
             <td></td>
        </tr>
</table>
