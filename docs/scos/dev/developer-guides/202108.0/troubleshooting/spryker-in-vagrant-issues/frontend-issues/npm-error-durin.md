---
title: NPM error during installation
originalLink: https://documentation.spryker.com/2021080/docs/npm-error-during-installation
redirect_from:
  - /2021080/docs/npm-error-during-installation
  - /2021080/docs/en/npm-error-during-installation
---

## Description
During the Spryker Commerce OS installation , you can get the following error:

```bash
npm ERR! code ELIFECYCLE
npm ERR! errno 137
npm ERR! spryker-master-suite@ zed: `node ./node_modules/@spryker/oryx-for-zed/build`
npm ERR! Exit status 137
npm ERR! Failed at the spryker-master-suite@ zed script.
```

## Solution
To fix the error:

1. On the host, execute the following commands:

   ```bash
   vagrant reload
   vagrant ssh
   ```

2. In the code installation directory, delete folder `node_modules` and file `package_lock.json`.

3. Execute the following command inside the VM:

   ```bash
   vendor/bin/install -s frontend
   ```
