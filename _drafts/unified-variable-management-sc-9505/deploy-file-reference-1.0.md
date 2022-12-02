...

### environment-configuration: secrets:

Defines secrets and their configuration:

* `environment-configuration: secrets: name:`—secret's name.
* `environment-configuration: secrets: grant:`—users' permissions. `limited` provides read while `public` provides read and write permissions. The default one is `limited`.
* `environment-configuration: secrets: bucket:`—defines what the secret is used for. Acceptable values are `app`, `scheduler`, `pipeline`, and `common`. `common` is the default value. Common secrets can be used by all the buckets.

### environment-configuration: params:

Defines parameters and their configuration:

* `environment-configuration: params: name:`—parameter's name.
* `environment-configuration: params: bucket:`—defines what the parameter  is used for. Acceptable values are `app`, `scheduler`, `pipeline`, and `common`. `common` is the default value. Common secrets can be used by all the buckets.
* `environment-configuration: params: default:`—parameter's default value. Accepts string, number, and json values.
* `environment-configuration: params: grant:`—IAM users' permissions. `limited` provides read while `public` provides read and write permissions. The default one is `limited`.

...
