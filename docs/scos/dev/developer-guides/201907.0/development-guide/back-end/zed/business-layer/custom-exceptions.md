---
title: Custom Exceptions
description: When you need to throw an exception, you should define your own type of exception.
originalLink: https://documentation.spryker.com/v3/docs/custom-exceptions
originalArticleId: c2f665c1-f39e-4cfb-b877-c03b0d9a6397
redirect_from:
  - /v3/docs/custom-exceptions
  - /v3/docs/en/custom-exceptions
---

When you need to throw an exception, you should define your own type of exception. Later it is much easier to handle exceptions when the type represents a specific type of error.

{% info_block errorBox %}
In Spryker **exceptions** are **errors**  are handled in a central error handler that will stop the execution. Do not use exceptions as events to control the workflow. Only expected exceptions are caught, for instance when you deal with external systems or when you must guarantee the execution (e.g. when you send an email in the checkout then this must not break the execution
{% endinfo_block %}.)

Usually, exceptions have an empty body and extend the  `global \Exception` class.

```php
<?php

namespace Pyz\Zed\Glossary\Business\Exception;

use Exception;

class KeyExistsException extends Exception
{
}
```


