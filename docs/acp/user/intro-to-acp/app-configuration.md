---
title: App configuration
Descriptions: 
template: howto-guide-template
---
Instead of writing different components for different App configurations, we use JSON to determine the form for the configuration of the apps. There is a [playground for NgxSchemaForm](https://guillotina.io/ngx-schema-form). There are predefined form elements, and also custom form elements.

{% info_block infoBox "Info" %}

For the app configuration translation, see [App configuration translation](LINK). Some insights about the translation see in the [Translation appendix](#translation-appendix) 

{% endinfo_block %}

## Apps configuration
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
Example of the configuraiton widget:

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
![configuration-widget](https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/dev/app-configuration/configuration-widget.png)

## Widget catalog
Common properties of a widget are:
- `type`: widget type
- `widget`: widgetId - see the available widgetIds in the following sections
- `title`: the display title of the field
- `placeholder`: string as a placeholder for the input field
- `description`: additional description for the field
- `isRequired`: true / false—if the field is required
- `default`: default value of the field

### Form input widget

<table>
<thead>
  <tr>
    <th">widgetId<br></th>
    <th>display<br></th>
    <th>Description<br></th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>string</td>
    <td><br><img src="https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/dev/app-configuration/string-widget.png"><br></td>
    <td>Default <code>string</code> input widget that allows the user to input a single line string.</td>
  </tr>
  <tr>
    <td>number</td>
    <td><br><img src="https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/dev/app-configuration/number-widget.png"><br><br><br><img src="https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/dev/app-configuration/number-widget-2.png"><br><br> </td>
    <td>Allows the user to enter a number.</td>
  </tr>
  <tr>
    <td>date</td>
    <td><br><img src="https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/dev/app-configuration/date-widget.png"><br><br> </td>
    <td>Allow the user to enter a date.</td>
  </tr>
  <tr>
    <td>time</td>
    <td><br><img src="https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/dev/app-configuration/time-widget.png"><br><br> </td>
    <td> <br>Allow the user to enter a time.</td>
  </tr>
  <tr>
    <td>password</td>
    <td><br><img src="https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/dev/app-configuration/password-widget.png"><br><br> </td>
    <td>Allow the user to enter a masked string that is used for passwords or API keys.</td>
  </tr>
  <tr>
    <td>textarea</td>
    <td><br><img src="https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/dev/app-configuration/textarea-widget.png"><br><br> </td>
    <td>Allows the user to enter a multi-line string.</td>
  </tr>
  <tr>
    <td>file</td>
    <td><br><img src="https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/dev/app-configuration/file-widget.png"><br></td>
    <td>Allows the user to upload a file.</td>
  </tr>
  <tr>
    <td>link</td>
    <td>As a tag:<br><br><img src="https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/dev/app-configuration/link-as-a-tag.png"><br>As a button:<br><br><img src="https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/dev/app-configuration/link-as-a-button.png"><br></td>
    <td>Displays a link as a tag or a button.<br>Required properties:<br><code><isButtonLink</code>: <i>false</i> - display as a tag, <i>true</i> - display as a button<br>url: the url<br>target: set to <code><_blank</code>< to open the url in a new tab<br>variant: (for button only) - primary or secondary button<br>See the <i>link example</i> example under this table.<br></td>
  </tr>
  <tr>
    <td>notification</td>
    <td><img src="https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/dev/app-configuration/notification-widget.png"></td>
    <td>The notification widget is used to inform the user of some additional information. There won’t be any user input for this type of widget. <br>Properties:<ul><li><code>notificationType</code>: <code>info</code>/ <code>warning</code> / <code>error</code> / <code>success</code> - type of the notification</code></li><li><code>content</code>: Content of the notification widget - accepts an HTML string.</li> See <i>notification example</i> under this table.</ul></td>
  </tr>
</tbody>
</table>

<details open>
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
    <th>display<br></th>
    <th>Description<br></th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>checkbox/ boolean</td>
    <td><br><img src="https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/dev/app-configuration/selection-checkbox.png"><br></td>
    <td>This widget is of type <code>boolean</code>, the input value will be either <code>true</code> or <code>false</code><br> </td>
  </tr>
  <tr>
    <td>radio</td>
    <td><br><img src="https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/dev/app-configuration/selection-radio.png"><br></td>
    <td> The radio widgets rely on the <code>oneOf</code> property. The <code>description</code> is the displayed label for an option, while the <code>enum</code> is the value that is saved in the form. For example, if we select <code>OSX</code> in the form, the actual saved value is <code>osx</code>.<br>Properties:<br><code>oneOf</code>: list of objects used as the options<br>See <i>radio example</i> under this table.<br></td>
  </tr>
  <tr>
    <td>select</td>
    <td>Single selection: <img src="https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/dev/app-configuration/single-selection.png"> Image Multi-selection: <img src="https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/dev/app-configuration/multi-selection.png"></td>
    <td>Similar to the <code>radio</code> widget, but instead of radio buttons, we can use <code>select</code> for selection using a dropdown. Besides, this widget also allows multiple options selection by setting <code>multiple: true</code>.<br>Properties:<ul><li><code>oneOf</code>: list of objects used as the options</li><li><code>multiple</code>: <code>true</code> or <code>false</code></li><li><code>multipleOptions</code>: list of strings to be used as the options. Can be used instead of <code>oneOf</code></li>See <i>Example for select with oneOf</i>under this table.</ul>In case you don’t need to have separate labels and values, you can use <code>multipleOptions</code> or <code>enum</code> instead of <code>oneOf</code>. See <i>Example for select without oneOf</i>under this table.</td>
  </tr>
  <tr>
    <td>app-status</td>
    <td><img src="https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/dev/app-configuration/app-status.png"></td>
    <td>This custom widget shows only the Active (<code>true</code>) or Inactive (<code>false</code>) value to fit the design. See <i>app-status example</i> under this table.</td>
  </tr> 
</tbody>
</table>

<details open>
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

<details open>
<summary>Example for select with oneOf</summary>

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

<details open>
<summary>Example for select without oneOf</summary>

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

<details open>
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
For the form layout, in particular, you should take into consideration the `array` type and order of the fields.

### Array type
Sometimes, you might ask a user to input one or more values of the same field sets. For example, when you ask for all the pets within a household. These values can can differ from each other, and there could be 0, or 10, or 100 pets. In these cases, you can use an `array` type of the form:

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
- `items`: definition of fields within an item. The form returns an array of objects defined in the items:
![array-type](https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/dev/app-configuration/array-type.png)

## Translation appendix