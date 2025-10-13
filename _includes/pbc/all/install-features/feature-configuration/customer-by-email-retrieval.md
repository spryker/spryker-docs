7. Optional: Configure case sensitivity for customer email validation by adjusting the `CustomerConfig::isCustomerEmailValidationCaseSensitive()` method:

```php
<?php

namespace Pyz\Zed\Customer;

use Spryker\Zed\Customer\CustomerConfig as SprykerCustomerConfig;

class CustomerConfig extends SprykerCustomerConfig
{
    /**
     * @return bool
     */
    public function isCustomerEmailValidationCaseSensitive(): bool
    {
        return true;
    }
}
```

{% info_block infoBox "Performance considerations" %}

The `isCustomerEmailValidationCaseSensitive` flag controls how customer emails are compared during validation operations such as checking email availability during registration. This configuration has significant performance implications:

**How it works:**

When this flag is set to `false` (default), the system uses case-insensitive comparison via the `UPPER()` SQL function when querying customer records by email. This behavior is controlled by Propel's `\Propel\Runtime\ActiveQuery\Criterion\BasicCriterion` class (see `appendPsForUniqueClauseTo()` method) which calls `\Propel\Runtime\Adapter\Pdo\PdoAdapter::ignoreCase()` to wrap columns in `UPPER()`. The Spryker implementation in `\Spryker\Zed\Customer\Persistence\Propel\AbstractSpyCustomerQuery::filterByEmail()` allows controlling this behavior via the `$ignoreCase` parameter, which is set by `\Spryker\Zed\Customer\Persistence\CustomerRepository::isEmailAvailableForCustomer()` based on the `isCustomerEmailValidationCaseSensitive()` configuration.

**Performance impact:**

- With case-insensitive validation (default: `false`), queries use `UPPER(email) = UPPER(?)` for comparisons
- SQL functions like `UPPER()` on indexed columns prevent the database (MariaDB/MySQL) from using indexes efficiently
- The database cannot use the email column index because it's wrapped in a function
- As the `spy_customer` table grows (e.g., 300,000+ records), queries can slow down significantly (3-4 seconds or more)
- This is particularly problematic during customer registration and login flows

**When to enable case-sensitive validation (`true`):**

✓ **Recommended for most projects:**
- Most Spryker projects use case-insensitive database collation by default (e.g., `utf8mb4_unicode_ci`)
- When your database collation is already case-insensitive, using `UPPER()` is redundant
- Enabling this flag removes the unnecessary `UPPER()` function, allowing proper index usage
- This improves query performance from seconds to milliseconds for large customer tables

✓ **Benefits:**
- Significantly faster customer registration and login processes
- Reduced database load
- Better scalability as customer base grows
- Proper utilization of database indexes

**When to keep case-insensitive validation (`false`):**

✗ **Only if:**
- Your database uses a case-sensitive collation (e.g., `utf8mb4_bin`)
- You have a specific business requirement to distinguish between `user@example.com` and `User@example.com` as different accounts
- Note: This scenario is uncommon and not recommended for most e-commerce applications

**Recommendation:**

For optimal performance, set `isCustomerEmailValidationCaseSensitive()` to return `true` if your database uses case-insensitive collation (which is the default for most Spryker installations). This change is safe and backward-compatible as long as you haven't relied on case-sensitive email distinction.

**Migration consideration:**

If you're enabling this flag on an existing system, ensure you don't have duplicate customer records with emails that differ only in case (e.g., `user@example.com` and `User@example.com`). Run a query to check for duplicates before making this change:

```sql
SELECT LOWER(email) as email_lower, COUNT(*) as count
FROM spy_customer
GROUP BY LOWER(email)
HAVING count > 1;
```

{% endinfo_block %}
