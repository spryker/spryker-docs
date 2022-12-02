...

### environment-configuration: secrets:

Defines secrets and their configuration:

* `environment-configuration: secrets: name:`—Secret's name.
* `environment-configuration: secrets: grant:`—Users' permissions. `limited` provides read while `public` provides read and write permissions. The default one is `limited`.
* `environment-configuration: secrets: bucket:`—Defines what the secret is used for. Acceptable values are `app`, `scheduler`, `pipeline`, and `common`. `common` is the default value. Common secrets can be used by all the buckets.

### environment-configuration: params:

Defines parameters and their configuration:

* `environment-configuration: params: name:`—Parameter's name.
* `environment-configuration: params: bucket:`—Defines what the parameter  is used for. Acceptable values are `app`, `scheduler`, `pipeline`, and `common`. `common` is the default value. Common secrets can be used by all the buckets.
* `environment-configuration: params: default:`—Parameter's default value. Accepts string, number, and json values.
* `environment-configuration: params: grant:`—IAM users' permissions. `limited` provides read while `public` provides read and write permissions. The default one is `limited`.

...
