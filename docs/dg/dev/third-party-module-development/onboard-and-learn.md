---
title: Onboard & Learn
description: Onboard & Learn
last_updated: Jun 7, 2024
template: howto-guide-template

---

Basic rules of the module development can be found at https://docs.spryker.com/docs/dg/dev/architecture/architectural-convention.html (With **module development** remarks)

Whenever we provide different versions of our module, we need to follow the basic Semantic Versioning rules that can be found at http://semver.org/ with one exceptions:
- Breaking private **API** contract leads to **minor** release, even if it is a bugfix and according to semver has to be a **patch**. (An exception from this rule - if we fix the functionality that does not work completely, in this case fix can be released as **patch**)
- The differences between public and private API can be found here https://docs.spryker.com/docs/dg/dev/architecture/module-api/declaration-of-module-apis-public-and-private.html#public-api
- More details about Semantic versioning can be found here https://docs.spryker.com/docs/dg/de