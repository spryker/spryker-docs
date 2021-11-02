---
title: Custom Exceptions
description: When you need to throw an exception, you should define your own type of exception.
last_updated: Sep 27, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/custom-exceptions
originalArticleId: 1da05e1b-f198-45da-aa47-898835725a2d
redirect_from:
  - /2021080/docs/custom-exceptions
  - /2021080/docs/en/custom-exceptions
  - /docs/custom-exceptions
  - /docs/en/custom-exceptions
  - /v6/docs/custom-exceptions
  - /v6/docs/en/custom-exceptions
  - /v5/docs/custom-exceptions
  - /v5/docs/en/custom-exception
  - /v4/docs/custom-exceptions
  - /v4/docs/en/custom-exceptions
  - /v3/docs/custom-exceptions
  - /v3/docs/en/custom-exceptions
  - /v2/docs/custom-exceptions
  - /v2/docs/en/custom-exceptions
  - /v1/docs/custom-exceptions
  - /v1/docs/en/custom-exceptions
---

When you need to throw an exception, you should define your own type of exception. Later it is much easier to handle exceptions when the type represents a specific type of error.

{% info_block errorBox %}
In Spryker **exceptions** and **errors**  are handled in a central error handler that will stop the execution. Do not use exceptions as events to control the workflow. Only expected exceptions are caught, for instance when you deal with external systems or when you must guarantee the execution (e.g. when you send an email in the checkout then this must not break the execution).
{% endinfo_block %}

Usually, exceptions have an empty body and extend the  `global \Exception` class.

```php
<?php

namespace Pyz\Zed\Glossary\Business\Exception;

use Exception;

class KeyExistsException extends Exception
{
}
```


