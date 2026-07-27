---
title: Architecture Sniffer
description: Use Architecture Sniffer to ensure the quality of Spryker architecture for both core and project
last_updated: Jul 27, 2026
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/architecture-sniffer
originalArticleId: 33ab1b5b-fce7-4439-8722-87e5ecd9f3c5
redirect_from:
  - /docs/sdk/dev/development-tools/architecture-sniffer.html
  - /docs/scos/dev/sdk/201811.0/development-tools/architecture-sniffer.html
  - /docs/scos/dev/sdk/201903.0/development-tools/architecture-sniffer.html
  - /docs/scos/dev/sdk/201907.0/development-tools/architecture-sniffer.html
  - /docs/scos/dev/sdk/202001.0/development-tools/architecture-sniffer.html
  - /docs/scos/dev/sdk/202005.0/development-tools/architecture-sniffer.html
  - /docs/scos/dev/sdk/202009.0/development-tools/architecture-sniffer.html
  - /docs/scos/dev/sdk/202108.0/development-tools/architecture-sniffer.html
  - /docs/scos/dev/sdk/development-tools/development-tools.html
  - /docs/scos/dev/sdk/development-tools/architecture-sniffer.html
  - /docs/dg/dev/sdks/sdk/development-tools/project-architecture-sniffer.html
related:
  - title: Code sniffer
    link: docs/dg/dev/sdks/sdk/development-tools/code-sniffer.html
  - title: Formatter
    link: docs/dg/dev/sdks/sdk/development-tools/formatter.html
  - title: Performance audit tool- Benchmark
    link: docs/dg/dev/sdks/sdk/development-tools/benchmark-performance-audit-tool.html
  - title: PHPStan
    link: docs/dg/dev/sdks/sdk/development-tools/phpstan.html
  - title: SCSS linter
    link: docs/dg/dev/sdks/sdk/development-tools/scss-linter.html
  - title: TS linter
    link: docs/dg/dev/sdks/sdk/development-tools/ts-linter.html
  - title: Spryk code generator
    link: docs/dg/dev/sdks/sdk/spryks/spryks.html
  - title: Static Security Checker
    link: docs/dg/dev/sdks/sdk/development-tools/static-security-checker.html
  - title: Tooling config file
    link: docs/dg/dev/sdks/sdk/development-tools/tooling-configuration-file.html
---

We use our [Architecture Sniffer Tool](https://github.com/spryker/architecture-sniffer) to ensure the quality of Spryker architecture for both core and project. The tool builds on [PHP Mess Detector](https://phpmd.org) and ships two independent rulesets:

| Ruleset | Use it for | Path |
| --- | --- | --- |
| Core | Spryker core, ecosystem, and module development | `vendor/spryker/architecture-sniffer/src/ruleset.xml` |
| Project | Project development and customisations | `vendor/spryker/architecture-sniffer/src/Project/ruleset.xml` |

In both rulesets, lower priorities include the higher ones: a run with `--minimumpriority=3` also reports violations of priority `1` and `2`.

## Install Architecture Sniffer

Include the sniffer as a `require-dev` dependency:

```bash
composer require --dev spryker/architecture-sniffer:"^0.6.0"
```

The project ruleset requires version `0.6.0` or later.

## Running the tool

Run the ruleset that matches what you are working on: the core ruleset for core, ecosystem, and module development, or the project ruleset for application development.

### Core development

Use the core ruleset for Spryker core, ecosystem, and module development.

#### Core priority levels

- `1`: API and critical
- `2`: Non-critical (nice to have)
- `3`: Experimental—the inspected code needs further fixing

We recommend a minimum priority of `2` for local and CI checks.

#### Run the core ruleset

The sniffer can find a lot of violations and reports them:

```bash
vendor/bin/console code:sniff:architecture

# Sniff a specific subfolder of your project with verbose output
vendor/bin/console code:sniff:architecture src/Pyz/Zed -v

# Sniff a specific module
vendor/bin/console code:sniff:architecture -m Customer
```

{% info_block infoBox "Tip" %}

You can use `c:s:a` as a shortcut.

{% endinfo_block %}

Additional options:

- `-p`: Priority [1 (highest), 2 (medium), 3 (experimental)]. Defaults to `2`.
- `-s`: Strict—also reports nodes with a `@SuppressWarnings` annotation.
- `-d`: Dry run—only outputs the command to be run.

To get help about all available options, run `--help` or `-h`.

You can also run the core ruleset directly:

```bash
vendor/bin/phpmd src/Pyz/ text vendor/spryker/architecture-sniffer/src/ruleset.xml --minimumpriority=2
```

#### Include the core ruleset in PhpStorm

1. In PhpStorm, go to **Editor&nbsp;→&nbsp;Inspections&nbsp;→&nbsp;PHP&nbsp;→&nbsp;PHP Mess Detector validation** and add a custom ruleset named `Architecture Sniffer` that points to `vendor/spryker/architecture-sniffer/src/ruleset.xml`.
2. Go to **Framework & Languages&nbsp;→&nbsp;PHP&nbsp;→&nbsp;Mess Detector** and set the path to your phpmd binary: `vendor/bin/phpmd`.
3. Select **Validate** to confirm that the setup works.

### Project development

Use the project ruleset for application development. It bundles adapted PHPMD rules, Spryker architecture rules, and project-only rules.

#### Project priority levels

- `1`: Critical
- `2`: Major
- `3`: Medium
- `4`: Minor

We recommend the following minimum priority based on project maturity:

- `1` and `2`: for all projects, including those with legacy code
- `3`: for all new projects
- `4`: for a modern AI-assisted development flow

#### Set up the project ruleset

The project ruleset is meant to be tuned per project, so do not run the vendor file directly. Instead, create a thin `phpmd.xml` file in your project root—the conventional default file name of PHPMD. This file references the vendor project ruleset, and you layer your customizations on top of it:

**phpmd.xml**

```xml
<?xml version="1.0"?>
<ruleset name="Spryker Project"
         xmlns="http://pmd.sf.net/ruleset/1.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <description>Project architecture ruleset.</description>

    <!-- File and path exclusions: filter which files are analyzed -->
    <exclude-pattern>*/Generated/*</exclude-pattern>
    <exclude-pattern>*/Orm/*</exclude-pattern>

    <!-- Import the vendor project ruleset -->
    <rule ref="vendor/spryker/architecture-sniffer/src/Project/ruleset.xml" />
</ruleset>
```

Commit `phpmd.xml` to version control so that all developers and the CI pipeline use the same configuration.

#### Run the project ruleset

Run phpmd against your project-level `phpmd.xml`:

```bash
vendor/bin/phpmd src/ text phpmd.xml --minimumpriority=4
```

Supported report formats are `json`, `text`, and `html`. For all command options, see [Command line options](https://phpmd.org/documentation/index.html).

#### Adjust the project ruleset

Customize `phpmd.xml` to exclude modules, drop rules, change priorities, or set rule properties without touching the vendor package.

PHPMD keeps the first copy of a rule that it imports by name. Therefore, place every `<exclude>` element inside the aggregate `<rule ref>` block that imports the vendor ruleset. A separate `<rule ref>` element placed after that block is ignored unless you exclude the same rule inside the block first.

**Exclude paths from the analysis**

Use `<exclude-pattern>` to filter which files are analyzed:

```xml
<exclude-pattern>Persistence/Propel</exclude-pattern>
<exclude-pattern>Presentation</exclude-pattern>
<exclude-pattern>*/Generated/*</exclude-pattern>
<exclude-pattern>*/Orm/*</exclude-pattern>
<exclude-pattern>*DataImport*</exclude-pattern>
```

**Drop a rule**

To remove a rule from the analysis, add an `<exclude>` element inside the aggregate block:

```xml
<rule ref="vendor/spryker/architecture-sniffer/src/Project/ruleset.xml">
    <exclude name="FacadeSingleFactoryCallRule" />
    <exclude name="FacadeNoLogicRule" />
</rule>
```

**Change the priority of a rule**

Exclude the rule in the aggregate block, then re-add the single rule with a new priority. A lower number means a more severe violation:

```xml
<rule ref="vendor/spryker/architecture-sniffer/src/Project/ruleset.xml">
    <exclude name="FacadeRule" />
</rule>

<rule ref="vendor/spryker/architecture-sniffer/src/Project/Zed/ruleset.xml/FacadeRule">
    <priority>3</priority>
</rule>
```

**Pass a property to a rule**

Some rules expose tunable properties, such as `ignoreclasspattern`, which skips classes that match a regular expression:

```xml
<rule ref="vendor/spryker/architecture-sniffer/src/Project/ruleset.xml">
    <exclude name="OrmNewEntityNotInCommunicationRule" />
</rule>

<rule ref="vendor/spryker/architecture-sniffer/src/Project/Zed/ruleset.xml/OrmNewEntityNotInCommunicationRule">
    <properties>
        <property name="ignoreclasspattern" value="#\\SomeModule\\#" />
    </properties>
</rule>
```

#### Complete example

The following example is the [phpmd.xml](https://github.com/spryker-shop/b2b-demo-marketplace/blob/master/phpmd.xml) file of the B2B Demo Marketplace. It combines all of the preceding customizations, with the rule-level ones commented out for reference.

**phpmd.xml**

```xml
<?xml version="1.0"?>
<ruleset name="Spryker Project"
         xmlns="http://pmd.sf.net/ruleset/1.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://pmd.sf.net/ruleset/1.0.0
                     http://pmd.sf.net/ruleset_xml_schema.xsd"
         xsi:noNamespaceSchemaLocation="
                     http://pmd.sf.net/ruleset_xml_schema.xsd">
    <description>
        Asserting clean code architecture with Spryker project.
    </description>

    <!-- ============================================================= -->
    <!-- File / path exclusions (filters WHICH files are analyzed).    -->
    <!-- Note: this is different from <exclude name="..."/> below,     -->
    <!-- which removes a RULE. exclude-pattern filters PATHS.          -->
    <!-- ============================================================= -->
    <exclude-pattern>Persistence/Propel</exclude-pattern>
    <exclude-pattern>Presentation</exclude-pattern>
    <exclude-pattern>tests/_data</exclude-pattern>
    <exclude-pattern>tests/_output</exclude-pattern>
    <exclude-pattern>tests/_support</exclude-pattern>

    <exclude-pattern>*/Orm/*</exclude-pattern>
    <exclude-pattern>*/Generated/*</exclude-pattern>
    <exclude-pattern>*/SprykerConfig/*</exclude-pattern>

    <!-- Exclude DataImport and all *DataImport* modules (current and future) -->
    <exclude-pattern>*DataImport*</exclude-pattern>

    <!-- Exclude specific Example modules -->
    <exclude-pattern>*/ClickAndCollectExample/*</exclude-pattern>
    <exclude-pattern>*/ClickAndCollectPageExample/*</exclude-pattern>
    <exclude-pattern>*/ExampleChart/*</exclude-pattern>
    <exclude-pattern>*/ExampleProductSalePage/*</exclude-pattern>
    <exclude-pattern>*/ExampleStateMachine/*</exclude-pattern>
    <exclude-pattern>*/WaterTreatmentConfiguratorPageExample/*</exclude-pattern>

    <!-- ============================================================= -->
    <!-- Import the vendor project ruleset (single aggregate file).     -->
    <!-- Pulls in PhpMd + Client/Service/Shared/Yves/Zed/Glue/Common    -->
    <!-- project-level rules. These are the project-level (relaxed +    -->
    <!-- project-specific) rules, not the strict core-framework ones.   -->
    <!--                                                               -->
    <!-- To EXCLUDE rules, add <exclude name="..."/> children to THIS   -->
    <!-- block (see customization 1 below). To OVERRIDE a rule's        -->
    <!-- priority or properties, exclude it here and re-add it below    -->
    <!-- (customizations 2 and 3).                                      -->
    <!-- ============================================================= -->
    <rule ref="vendor/spryker/architecture-sniffer/src/Project/ruleset.xml">

        <!-- 1) EXCLUDE a rule (drop it entirely). The <exclude> MUST live
             inside this aggregate <rule ref> block — a separate <rule ref>
             below is silently ignored, because PHPMD keeps the first copy
             of a rule it imports by name.
        <exclude name="FacadeSingleFactoryCallRule" />
        <exclude name="FacadeNoLogicRule" />
        -->

        <!-- To OVERRIDE (not drop) a rule, also exclude it here so the
             re-added copy below wins, e.g.:
        <exclude name="FacadeRule" />
        <exclude name="OrmNewEntityNotInCommunicationRule" />
        -->

    </rule>

    <!-- ============================================================= -->
    <!-- CUSTOMIZATIONS (priority / property overrides)               -->
    <!-- Each override re-adds a SINGLE rule with the same name that    -->
    <!-- was <exclude>d in the aggregate block above. Without the       -->
    <!-- matching <exclude> above, the override below has no effect.    -->
    <!-- ============================================================= -->

    <!-- 2) CHANGE SEVERITY (priority) of a rule.
         Requires <exclude name="FacadeRule"/> in the aggregate block above.
         Lower priority number = more severe (1 = highest).

    <rule ref="vendor/spryker/architecture-sniffer/src/Project/Zed/ruleset.xml/FacadeRule">
        <priority>3</priority>
    </rule>
    -->

    <!-- 3) PASS A PARAMETER (property) to a rule.
         Requires <exclude name="OrmNewEntityNotInCommunicationRule"/> above.
         Some project rules expose tunable properties (e.g.
         `ignoreclasspattern` to skip classes matching a regex).

    <rule ref="vendor/spryker/architecture-sniffer/src/Project/Zed/ruleset.xml/OrmNewEntityNotInCommunicationRule">
        <properties>
            <property name="ignoreclasspattern" value="#\\SomeModule\\#" />
        </properties>
    </rule>
    -->

</ruleset>
```

#### Violation baseline

When you adopt the project ruleset on an existing project, the sniffer may reveal violations introduced in the past.

If the number of violations is small, you can refactor them right away. However, a large number of violations may be hard to refactor at once. For such cases, generate a [violation baseline](https://phpmd.org/documentation/#baseline), and then move forward writing violation-free code:

```bash
# Generate phpmd.baseline.xml in the project root
vendor/bin/phpmd src/ text phpmd.xml --generate-baseline

# Subsequent runs ignore baselined violations
vendor/bin/phpmd src/ text phpmd.xml --baseline-file phpmd.baseline.xml
```

To drop violations that no longer exist, use `--update-baseline`. Store the baseline in version control and shrink it over time.

You can also [suppress rules](https://phpmd.org/documentation/suppress-warnings.html) on a case-by-case basis. However, we strongly recommend using the baseline because ignoring violations may hide consequential ones.

{% info_block infoBox %}

Spryker demo shops may contain violations when analyzed with the project ruleset because it includes more project-specific rules by default.

We recommend generating a baseline during the initialization phase of your project development. This lets you focus on addressing violations related to project-level integrations.

{% endinfo_block %}

#### Debug rules

To step through rule code, enable Xdebug for phpmd:

```bash
docker/sdk cli -x
```

```bash
PHPMD_ALLOW_XDEBUG=true vendor/bin/phpmd src/Pyz/ text phpmd.xml
```

## Conventions and guidelines

If you have a running demo shop, go to **Maintenance&nbsp;→&nbsp;Architecture sniffer** in the Back Office to get an overview of all currently implemented rules.

For details and information on how to set up the sniffer in your CI system as a check for each pull request, see [Continuous Integration](/docs/dg/dev/ci.html) and the [Architecture Sniffer documentation](https://github.com/spryker/architecture-sniffer).
