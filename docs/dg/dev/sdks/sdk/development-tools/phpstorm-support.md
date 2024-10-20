# PHPStorm Support
To integrate Spryker development tools into PHPStorm, developers must execute the `vendor/bin/install-phpstorm-tools.sh` command, which is provided by the `spryker/development` module. This command adds or updates an XML configuration file in PHPStorm's settings directory.

Currently, the tools are supported only on Mac and Linux systems.
It is recommended to rerun this command periodically to ensure that the latest updates are applied.

The following commands are included:
- `console code:sniff:style -f`: Performs style fixes.
- `console code:phpstan`: Executes static analysis.
- `console code:sniff:architecture`: Checks for architecture rule violations.
Each of these commands can be run at either the module or project level.

Within PHPStorm, they are accessible via the External Tools panel, which allows for execution directly from the project directory tree by right-clicking on the desired directory.
