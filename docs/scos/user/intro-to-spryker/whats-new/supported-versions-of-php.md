---
title: Supported versions of PHP
description: This document provides information about the PHP versions Spryker supports.
last_updated: Dezember 1, 2022
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/supported-versions-of-php
originalArticleId: 9eba7382-df72-44fd-b601-a3de5c592455
redirect_from:
  - /2021080/docs/supported-versions-of-php
  - /2021080/docs/en/supported-versions-of-php
  - /docs/supported-versions-of-php
  - /docs/en/supported-versions-of-php
  - /v5/docs/supported-versions-of-php
  - /v5/docs/en/supported-versions-of-php
  - /v4/docs/supported-versions-of-php
  - /v4/docs/en/supported-versions-of-php
  - /v3/docs/supported-versions-of-php
  - /v3/docs/en/supported-versions-of-php
  - /v2/docs/supported-versions-of-php
  - /v2/docs/en/supported-versions-of-php
  - /v1/docs/supported-versions-of-php
  - /v1/docs/en/supported-versions-of-php
  - /v6/docs/supported-versions-of-php
  - /v6/docs/en/supported-versions-of-php
---

## PHP 7

PHP 7.4 is officially EOL for Spryker software since July 2022. 
Please upgrade to 8.0+ immediately to avoid issues with security or critical updates.

## PHP 8

Since October 2021, Spryker has been compatible with PHP 8.0.
- PHP 8.1 support has been added in July 2022.
- PHP 8.2 support has been added in December 2022. Please use with caution.

We **recommend** using **PHP 8.1** currently. Anyone on 8.0 is encouraged to migrate beginning of 2023 to allow a smooth upgrade path.
More and more libraries only deliver releases (incl bugfix and security) only for 8.1+, so this becomes an increasing risk factor for any business.

Before switching PHP versions in production environments, ensure to check this new major version's new features and test it for incompatibilities. For more information, see the following documents:

* [New Features](https://www.php.net/manual/en/migration80.new-features.php)
* [Backward Incompatible Changes](https://www.php.net/manual/en/migration80.incompatible.php)
* [Deprecated Features](https://www.php.net/manual/en/migration80.deprecated.php)
* [Other Changes](https://www.php.net/manual/en/migration80.other-changes.php)

{% info_block infoBox "Info" %}

PHP 8.0+ is a hard requirement from 19.10.2022 due to the modules being PHP 8.0+.

{% endinfo_block %}

## PHP versions supported at Spryker

The following graph shows the timelines of support of different PHP versions.

<div class="mxgraph" style="max-width:100%;border:1px solid transparent;" data-mxgraph="{&quot;highlight&quot;:&quot;#0000ff&quot;,&quot;nav&quot;:true,&quot;resize&quot;:true,&quot;toolbar&quot;:&quot;zoom layers tags lightbox&quot;,&quot;edit&quot;:&quot;_blank&quot;,&quot;xml&quot;:&quot;&lt;mxfile host=\&quot;app.diagrams.net\&quot; modified=\&quot;2022-10-21T14:13:43.299Z\&quot; agent=\&quot;5.0 (Windows)\&quot; etag=\&quot;BTOcxfAcMW6pN6grIwbw\&quot; version=\&quot;20.0.3\&quot;&gt;&lt;diagram id=\&quot;OVbGVjOIz2GsRCfltdi6\&quot; name=\&quot;Page-1\&quot;&gt;7ZxRc5s4EMc/jR/rAQkZ+zFxk6Yz1zY3vcs9y6DYmsqIE3Li5NOfMAiMRK52BmMy8osHL7BY+9OfrFY7GcH5evtF4HT1jceEjYAXb0fw8wiAcArUZ254KQwB8ArDUtC4MPm14Sd9JaVRX7ahMckaF0rOmaRp0xjxJCGRbNiwEPy5edkjZ82npnhJLMPPCDPb+g+N5aqwTpFX2+8IXa70k32vPLPG+uLSkK1wzJ/3TPBmBOeCc1kcrbdzwvLY6bgU992+cbb6YYIk8pAbwlf67+Ih/o5u2J/zF0J+fPl696n08oTZphxw+WPli44ASeKrPJDqW8RwltFoBK9Xcs2UwVeHgm+SmOQP8dS34nYSW1Gtf6ZfDV5NGsLXRIoXdclzHV4d3dVeZLVNEIYlfWq6xyXlZeWuesI9p+rBwCsn5LR0o6dj4DU9ZHwjIlLetB/N//fjA8OPxGJJpOVHHewNujbtWB3BDVy4vY8bAr9xdGJw8ChwCU/IR6bmm9FG78RmOYL9YgvcwjbpCpvpqGdsyClswOsIm+WoZ2wTt7AFXWEzHfWMLXQLm5mSvBub6ahnbFOnsMGuUhLLUc/YZm5h6yolsRz1jE0XNhzhFnSVk1iO+uZ2XKnkw3PrKimxHPXNDVjcgOeHFjtJttIARjL6ihe7C3JkeCN5VhQo89OY0WWijiMFjAhleCJC0gizq/LEmsZxfvN1mo9tN1p0PUKfleWRMjbnjIt6pmRS8F/EMLbNmfwxZHvsrClvmL1B9TeTymS2P38awI6mY9dDFJ2po3R8ODQ8dt1D4Zm5iiccGh67vgG8ar/BNTzVntFg8Nh1DIXHdxUPGhoeu16h8NhZnSN4Bpca2HUJhQc6igcOLjWw6w8KT+AqnqGlBjoLaOJBjuIJhpYagAOqCTqwf+AFYfeKgaQ8D/CCS8nXLZGXPG2izFY4zZ2tt8u8OWe8wBmNxmLXJ1PDACYN3eiyc1GQBzkIqqDs4o0MliMVKG8+9060SPVsWH7QQsvswXgPrW+Thxvy+Pf001X6nf41/RHMI9TSJXN/d68M4djVZM7cj4czZDEKTySoVkR2leeipwqWUYKDk5ktKNinoOyqjxaUq+m3WVuAk+C8gjqg48VdQYWwCQueW1B2IUgLytUFE/BMRmcW1AFNLc4KStFpwvKmtqC8sEdB2bUhLShXl7gABQYjeF5BHdAA8cEEFd7e3nZUj9BiKWGBsOUvlNfrGsouSBSKmo5d3bCAABqQzqyolt3Yi6TqCuxsjJq8ghZR6T6RfkRlZ+laVK5WJuDEszCdOfNr2aa9yKrihYyXoH92UdmZuhaVq9UJGAYGpHNL6oBe8w8mqe5WU2Hz/Yd0+W8fFupTUAd0mA8Xlr/DcsI3oImrZbujX1z2wuqBiEzxyJRVrnDe3alGpz6jjchHyfLRZJs05SoMsaPvSN/sb2nZEqmg9bMnYi+53gKZcPXBeLJU4b6gNFEieDqU6mv9PwCKpuf6HynAm/8A&lt;/diagram&gt;&lt;/mxfile&gt;&quot;}"></div>
<script type="text/javascript" src="https://viewer.diagrams.net/js/viewer-static.min.js"></script>

For more details about the supported versions, see the official [PHP documentation](https://www.php.net/supported-versions.php).
