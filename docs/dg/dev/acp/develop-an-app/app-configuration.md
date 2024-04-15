---
title: App configuration
Descriptions: Make configuration to your app, like translation and widgets
template: howto-guide-template
last_updated: Nov 23, 2023
redirec_from:
- /docs/acp/user/app-configuration.html
- /docs/acp/user/develop-an-app/develop-an-app/app-configuration.html
---
Instead of writing different components for different App configurations, we use JSON to determine the form for the configuration of the apps. There is a [playground for NgxSchemaForm](https://guillotina.io/ngx-schema-form). There are predefined form elements and also custom form elements.

{% info_block infoBox "Info" %}

For the app configuration translation, see [App configuration translation](/docs/acp/user/develop-an-app/app-configuration-translation.html). For information about the translation, see  [Translation appendix](#translation-appendix).

{% endinfo_block %}

## Apps configuration form
Configuration widget JSON format:

```json
{
    "properties": {
        <fieldId>: {
            "widget": <widgetId>,
            ...otherFieldProperties
        },
    },
};

```
Example of the configuration widget:

```json
{
  "properties": {
    "client_name": {
      "type": "string",
      "title": "Client Name",
      "placeholder": "Enter the client name",
      "isRequired": true,
      "description": "Name of the client",
      "widget": "string"
    }
  }
}
```
Display on the frontend:

![configuration-widget](https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/dev/app-configuration/configuration-widget.png)

## Widget catalog
Common properties of a widget are:
- `type`: widget type
- `widget`: widgetId—see the available widgetIDs in the following sections
- `title`: display title of the field
- `placeholder`: string as a placeholder for the input field
- `description`: additional description for the field
- `isRequired`: determines if the field is required with the `true` and `false` values
- `default`: default value of the field

### Form input widget

<table>
<thead>
  <tr>
    <th>widgetId</th>
    <th>display</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>string</td>
    <td><img src="https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/dev/app-configuration/string-widget.png"></td>
    <td>Default <code>string</code> input widget that allows the user to input a single line string.</td>
  </tr>
  <tr>
    <td>number</td>
    <td><img src="https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/dev/app-configuration/number-widget.png"><br><img src="https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/dev/app-configuration/number-widget-2.png"></td>
    <td>Allows the user to enter a number.</td>
  </tr>
  <tr>
    <td>date</td>
    <td><img src="https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/dev/app-configuration/date-widget.png"></td>
    <td>Allows the user to enter a date.</td>
  </tr>
  <tr>
    <td>time</td>
    <td><img src="https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/dev/app-configuration/time-widget.png"></td>
    <td>Allows the user to enter time.</td>
  </tr>
  <tr>
    <td>password</td>
    <td><img src="https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/dev/app-configuration/password-widget.png"></td>
    <td>Allows the user to enter a masked string that is used for passwords or API keys.</td>
  </tr>
  <tr>
    <td>textarea</td>
    <td><img src="https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/dev/app-configuration/textarea-widget.png"></td>
    <td>Allows the user to enter a multi-line string.</td>
  </tr>
  <tr>
    <td>file</td>
    <td><img src="https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/dev/app-configuration/file-widget.png"></td>
    <td>Allows the user to upload a file.</td>
  </tr>
  <tr>
    <td>link</td>
    <td>As a tag:<img src="https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/dev/app-configuration/link-as-a-tag.png"><br>As a button:<img src="https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/dev/app-configuration/link-as-a-button.png"></td>
    <td>Displays a link as a tag or a button.<br>Required properties:<br><code>isButtonLink</code>: <i>false</i>—display as a tag, <i>true</i>—display as a button<br>.<code>url</code>: the url<br>.<code>target</code>: set to <code>_blank</code>to open the url in a new tab<br>.<code>variant</code>: (for button only)—primary or secondary button.<br> See the <i>link example</i> under this table.<br></td>
  </tr>
  <tr>
    <td>notification</td>
    <td><img src="https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/dev/app-configuration/notification-widget.png"></td>
    <td>The notification widget is used to inform the user of some additional information. There cannot be any user input for this type of widget.<br>Properties:<ul><li><code>notificationType</code>:<code>info</code>/<code>warning</code>/<code>error</code>/<code>success</code>—type of the notification.</li><li><code>content</code>: Content of the notification widget—accepts an HTML string.</li><br>See<i>notification example</i>under this table.</ul></td>
  </tr>
</tbody>
</table>

<details>
<summary>link example</summary>

```json
{
  "properties": {
    "credentials_clientName": {
      "type": "string",
      "widget": {
        "id": "link"
      },
      "target": "_blank",
      "url": "http://google.com",
      "isButtonLink": true,
      "variant": "primary",
      "title": "click to google"
    }
  }
}
```
</details>

<details open>
<summary>notification example</summary>

```json
{
  "properties": {
    "notification": {
      "type": "string",
      "widget": {
        "id": "notification"
      },
      "notificationType": "info",
      "content": "Don’t have credentials yet? Visit <a href=\"https://google.com/\" target=\"_blank\">admin.usercentrics.eu/#/login</a> to create your account."
    }
  }
}
```
</details>
  
### Selection widget

<table>
<thead>
  <tr>
    <th>widgetId</th>
    <th>display</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>checkbox/ boolean</td>
    <td><img src="https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/dev/app-configuration/selection-checkbox.png"></td>
    <td>This widget is of type <code>boolean</code>, the input value can be either <code>true</code> or <code>false</code>.</td>
  </tr>
  <tr>
    <td>radio</td>
    <td><img src="https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/dev/app-configuration/selection-radio.png"></td>
    <td> The radio widgets rely on the <code>oneOf</code> property. The <code>description</code> is the displayed label for an option, while the <code>enum</code> is the value that is saved in the form. For example, if we select <code>OSX</code> in the form, the actual saved value is <code>osx</code>.<br>Properties:<br><code>oneOf</code>: list of objects used as options.<br>See <i>radio example</i> under this table.</td>
  </tr>
  <tr>
    <td>select</td>
    <td>Single selection: <img src="https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/dev/app-configuration/single-selection.png"> Image Multi-selection: <img src="https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/dev/app-configuration/multi-selection.png"></td>
    <td>Similar to the <code>radio</code> widget, but instead of radio buttons, you can use <code>select</code> for selection in a dropdown. Besides, this widget also allows multiple options selection by setting <code>multiple: true</code>.<br>Properties:<ul><li><code>oneOf</code>: list of objects used as options.</li><li><code>multiple</code>: <code>true</code> or <code>false</code></li><li><code>multipleOptions</code>: list of strings to be used as options. Can be used instead of <code>oneOf</code>.</li>See <i>example for select with oneOf</i> under this table.</ul>In case you don’t need to have separate labels and values, you can use <code>multipleOptions</code> or <code>enum</code> instead of <code>oneOf</code>.<br> See <i>example for select without oneOf</i> under this table.</td>
  </tr>
  <tr>
    <td>app-status</td>
    <td><img src="https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/dev/app-configuration/app-status.png"></td>
    <td>This custom widget shows only <i>Active</i> (<code>true</code>) or <i>Inactive</i> (<code>false</code>) value to fit the design.<br> See <i>app-status example</i> under this table.</td>
  </tr> 
</tbody>
</table>

<details>
<summary>radio example</summary>

```json
{
  "properties": {
    "info": {
      "type": "string",
      "title": "Operation system",
      "description": "Operation system for the demo store",
      "widget": "radio",
      "oneOf": [
        {
          "enum": ["linux"],
          "description": "GNU/Linux"
        },
        {
          "enum": ["osx"],
          "description": "OSX"
        },
        {
          "enum": ["windows"],
          "description": "Windows"
        },
        {
          "enum": ["other"],
          "description": "Other"
        }
      ],
      "default": "other"
    }
  }
}

```
</details>

<details>
<summary>example for select with oneOf</summary>

```json
{
  "properties": {
    "info": {
      "type": "string",
      "title": "Operation system",
      "description": "Operation system for the demo store",
      "widget": "select",
      "multiple": true,
      "oneOf": [
        {
          "enum": ["linux"],
          "description": "GNU/Linux"
        },
        {
          "enum": ["osx"],
          "description": "OSX"
        },
        {
          "enum": ["windows"],
          "description": "Windows"
        },
        {
          "enum": ["other"],
          "description": "Other"
        }
      ],
      "default": "other"
    }
  }
}

```
</details>

<details>
<summary>example for select without oneOf</summary>

```json
{
  "properties": {
    "info": {
      "type": "string",
      "title": "Store",
      "description": "Store location",
      "widget": "select",
      "multipleOptions": [
        "DE",
        "AT",
        "US"
      ],
      "multiple": true
    }
  }
}

```
</details>

<details>
<summary>app-status example</summary>

```json
{
  "properties": {
    "application_status_isActive": {
      "type": "boolean",
      "title": "Application status",
      "hint": "Setting to Active will make the app visible on your Storefront",
      "widget": {
        "id": "app-status"
      },
      "default": false
    }
  }
}

```
</details>

## Form layout
For the form layout, in particular, you should take into consideration the `array` type and the order of fields.

### Array type
Sometimes, you might ask a user to input one or more values of the same field sets. For example, when you ask for all the pets within a household. These values can differ from each other, as there could be 0, or 10, or 100 pets. In these cases, you can use the `array` type of the form:

```json
{
  "properties": {
    "pet": {
      "type": "array",
      "addButtonText": "Add pet",
      "items": {
        "type": "object",
        "properties": {
          "petType": {
            "type": "string",
            "title": "Pet type",
            "placeholder": "Dog/ Cat, etc."
          },
          "petName": {
            "type": "string",
            "title": "Pet name"
          }
        }
      }
    }
  }
}
```
Where:

- `addButtonText`: text of the **Add** button.
- `items`: definition of fields within an item. The form returns an array of objects defined in `items`:
![array-type](https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/dev/app-configuration/array-type.png)
The returned object looks like this:

```json
{
  "pet": [
    {
      "petType": "Dog",
      "petName": "Lulu"
    },
    {
      "petType": "Cat",
      "petName": "Meow meow"
    }
  ]
}
```

### Order of fields
The `properties` within the form configuration are to define the form’s fields and their corresponding widgets. By default, the fields are displayed in that order also. In some cases, you can use the `order` or `fieldsets` property to change the order of the fields.

The `order` property changes the order of the fields within the form:

```json
{
  "properties": {
    "firstName": {
      "type": "string",
      "description": "First name"
    },
    "lastName": {
      "type": "string",
      "description": "Last name"
    },
    "email": {
      "type": "string",
      "description": "Email"
    }
  },
  "order": ["lastName", "firstName", "email"]
}
```
Here is how it looks on the frontend:

![order-property](https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/dev/app-configuration/order-property.png)

To group different fields into different sections, you can define the `fieldsets` property:

```json
{
  "properties": {
    "firstName": {
      "type": "string",
      "description": "First name"
    },
    "lastName": {
      "type": "string",
      "description": "Last name"
    },
    "email": {
      "type": "string",
      "description": "Email"
    }
  },
  "fieldsets": [
    {
      "id": "client_name",
      "title": "Client name",
      "fields": ["firstName", "lastName"]
    },
    {
      "id": "client_email",
      "title": "Client email",
      "fields": ["email"]
    }
  ]
}
```
This is how it looks on the frontend:

![fieldsets-property](https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/dev/app-configuration/fieldsets-property.png)

If you don't want any layout for a section, you can set `noLayout` to the `layout` property:

```xml
{
  "properties": {
    "firstName": {
      "type": "string",
      "description": "First name"
    },
    "lastName": {
      "type": "string",
      "description": "Last name"
    },
    "email": {
      "type": "string",
      "description": "Email"
    }
  },
  "fieldsets": [
    {
      "id": "client_name",
      "title": "Client name",
      "layout": "noLayout",
      "fields": ["firstName", "lastName"]
    },
    {
      "id": "client_email",
      "title": "Client email",
      "fields": ["email"]
    }
  ]
}
```
This is how it looks on the frontend:
![layout-property](https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/dev/app-configuration/layout-property.png)

### Full configuration example
Here is an example of the full configuration:

<details>
<summary>Full configuration example</summary>

```json
{
  "properties": {
    "notification": {
      "type": "string",
      "widget": {
        "id": "notification"
      },
      "notificationType": "info",
      "content": "Don’t have credentials yet? Visit <a href=\"https://google.com/\" target=\"_blank\">admin.usercentrics.eu/#/login</a> to create your account."
    },
    "userCentricIntegrationType": {
      "type": "string",
      "widget": {
        "id": "radio"
      },
      "oneOf": [
        {
          "description": "Enable Smart Data Protector (Default)",
          "enum": ["SMART_DATA_PROTECTOR"]
        },
        {
          "description": "Enable Direct Integration (works only with Google Tag Manager)",
          "enum": ["DIRECT"]
        }
      ]
    },
    "storeSettings": {
      "type": "array",
      "addButtonText": "Add Store Settings",
      "items": {
        "type": "object",
        "properties": {
          "storeName": {
            "type": "string",
            "title": "Store",
            "widget": {
              "id": "select"
            },
            "multiple": true,
            "multipleOptions": [
              "AT",
              "DE",
              "US"
            ]
          },
          "userCentricSettingIdentifier": {
            "type": "string",
            "title": "Setting ID"
          },
          "isActive": {
            "type": "boolean",
            "title": "Store setting is active",
            "widget": {
              "id": "checkbox"
            },
            "default": false
          }
        },
        "fieldsets": [
          {
            "id": "storeSettings",
            "fields": [
              "storeName",
              "userCentricSettingIdentifier",
              "isActive"
            ]
          }
        ],
        "widget": {
          "id": "object"
        }
      },
      "widget": {
        "id": "array"
      }
    }
  },
  "fieldsets": [
    {
      "id": "notifications",
      "layout": "noLayout",
      "fields": ["notification"]
    },
    {
      "id": "usercentric_integration",
      "title": "Usercentric Integration",
      "name": "usercentric_integration",
      "fields": ["userCentricIntegrationType"]
    },
    {
      "id": "usercentric_stories",
      "title": "User consent managment per store",
      "name": "usercentric_integration",
      "fields": ["storeSettings"]
    }
  ]
}
```
</details>

This is how the configuration looks in the Back Office:

![full-configuration](https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/dev/app-configuration/full-configuration.png)

## Translation appendix
Translation for an app configuration is provided in the `app-store-suite/app/config/<app-name>/translation.json` file. Each field defined in the JSON’s `properties` needs to match its corresponding translation entity in the `translation.json` file. For example, to translate the `title` of the widget `isLiveMode`, we provide `"title": "isLiveMode"` in the app configuration JSON.

*translation.json* file example:

```json
{    
    "isLiveMode": {
        "de_DE": "Auswahl des Modus für Payone Umgebung",
        "en_US": "Select Payone Environment Mode"
    },
    "isLiveMode_test": {
        "de_DE": "Test",
        "en_US": "Test"
    },
    "isLiveMode_live": {
        "de_DE": "Live",
        "en_US": "Live"
    },
    "payoneEnvironmentMode": {
        "de_DE": "Payone Umgebung",
        "en_US": "Payone Environment Mode"
    }
}
```
*configuration.json* file example:
```json
{
  "properties": {
      "isLiveMode": {
        "type": "string",
        "title": "isLiveMode",
        "widget": {
            "id": "radio"
        },
        "oneOf": [
            {
                "description": "isLiveMode_test",
                "enum": ["0"]
            },
            {
                "description": "isLiveMode_live",
                "enum": ["1"]
            }
        ]
      },

  }
}
```
This is how the result of the configuration looks on the frontend:

DE shop:
![configuration-de-shop](https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/dev/app-configuration/configuration-de-shop.png)

EN shop:
![configuration-en-shop](https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/dev/app-configuration/configuration-en-shop.png)


## Form validation (server side)

The app will receive the request from the configuration form to the URL defined in your `api.json` file, for example, like this:

```json
{
    "configuration": "/private/configure",
    "disconnection": "/private/disconnect"
}
```

In the cURL request, it will look like:

```bash
curl -x POST 'https://your-app.domain.name/private/configure' \
-H 'Accept-Language: en' \
-H 'X-Tenant-Identifier: tenant-uuid' \
--data-raw '{
  "data": {
    "attributes": {
      "configuration": "{\"fieldName1\":\"value1\", \"fieldName2\":\"value2\"}"
    }
  }
}'
```

The app response format for a valid request is just the HTTP status `200`.

The app response format for an invalid request could be an error for the whole form:

```json
{
  "errors": [
    {
      "code": 443,
      "message": "human readable message for a user, localized",
      "status": 400
    }
  ]
}
```

or field-specific messages in the following format:
```
{
  "errors": [
    {
      "code": 444,
      "message": "{"\"fieldName1\": \"errorMessage\", \"fieldName2\": \"errorMessage\"}",
      "status": 400
    }
  ]
}
```

In both cases HTTP status has to be `400`.

{% info_block warningBox "Error number limitation" %}

The current limitation for the number of displayed errors from the app response is 1.

{% endinfo_block %}
