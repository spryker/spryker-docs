---
title: Propel
originalLink: https://documentation.spryker.com/v5/docs/propel
redirect_from:
  - /v5/docs/propel
  - /v5/docs/en/propel
---

## Propel helper

### TransactionHelper
Eensures that a connection to the database can be established. Additionally, this helper wraps each test in a transaction. This will let you test against the database without the requirement to mock the database away and rollback after each test.
