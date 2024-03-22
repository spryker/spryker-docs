---
title: Monitorable process guidelines
description: Guidelines for log generation and metric generation to enable Operations Teams to track and correlate issues in operated and deployed applications.
last_updated:
template: concept-topic-template
related:
- title: NFR guidelines
  link: docs/scos/dev/guidelines/nfr-guidelines.html
- title: Operatable feature guidelines
  link: docs/scos/dev/guidelines/operatable-feature-guidelines.html
- title: Process documentation guidelines
  link: docs/scos/dev/guidelines/process-documentation-guidelines.html
---

In order to enable your Operations Team to track/correlate issues in the operated/deployed applications, the following elements need to be applied over
* log generation
* and metric generation.

{% info_block warningBox "Warning" %}

This page offers guidelines - not strict requirements - for project development, serving as a template and starting point, with the aim of assisting development teams in realizing high-quality software. To achieve a smoothly working concept, it's crucial to align the actual requirements and commitments with all involved parties.

{% endinfo_block %}

## Log generation
Applies to all application components.

### Log Entry Best Practices
* **Unified Format**: The format and text taxonomy of log entries must be unified across all log providers for ease of human processing.
* **No PII**: Log entries, under no circumstances, should contain Personal Identifiable Information (PII) due to security reasons.
* **No Encryption Keys or Secrets**: Log entries should not contain any encryption keys or secrets.
* **Single Event Reflection**: Each log entry must reflect a single event and vice versa to ensure determinability.
* **Language Use**: Log entries must use simple English language or widely recognized characters, especially when representing complex data.
* **Meaningful Messages**: Log entry messages must be meaningful and provide context to the event. For instance, avoid vague messages like "Error occurred".
* **State Preservation**: When creating log entries, avoid passing arguments to log statements that could alter the state of an object. This is crucial for traceability and readability.
* **Cross Component Tracing ID**: Include a "cross component tracing ID" in log entries to enable tracking of all generated logs across multiple components.
* **Data Residency Compliance**: Ensure that logs comply with data residency requirements.

### What to log?
* **Requests**: Log all incoming requests to a local component.
* **Remote Calls**: Log all outgoing requests to a remote service. It's crucial to log the duration of the call and the result of the remote response (success, error) for future debugging.
* **Scheduled Tasks**: Log all initiated scheduled tasks along with their end-results (error, success, interrupt).
* **Application Scoped Resources**: Log resource issues, including exhausted resources, exceeded capacities, session management failures, and connectivity issues.
* **Threats**: Log suspicious or malicious activities against the application, as well as successes and failures in authentication or authorization.
* **Exceptions**: Log both handled and unhandled application errors, stack traces, troubleshooting instances, and thrown exceptions.
* **Silenced Exceptions**: Log instances where an exception is consumed by an empty “catch()” clause.
* **Significant User Actions/Events**: Log significant user actions and events, such as help requests, cancelled actions, notable user actions like successful logins or privilege elevations, data validation failures, payment and transaction events, and significant user journey events.

### What NOT to Log?
* **Unreasonable Logging**: Avoid logging without a clear purpose. When deciding to create a log entry, there should be at least one use-case where the related data would be beneficial.
* **Performance Critical Places**: Minimize logging in areas where performance is critical. If there's a performance-critical process or a large cycle as a sub-process element, a careful decision between performance and traceability is necessary.
* **Audit Trail**: While it's recommended to log the audit trails of significant entity changes, these logs should not be sent to the regular log system due to the sensitive nature of the data typically involved in authentication and authorization.

### Log levels
The following log levels MUST be utilised appropriately during application workflows to allow easy track down particular problems / investigations 
in the System. A wrong category selection MAY de-rail a fellow inspector.

| Level | Description |
|-------|-------------|
| Debug | Provides detailed data, which is mostly used for debugging. These logs allow to check variable values and/or error stacks. |
| Info |  Provides information about the normal operation of the application. This level is often used to record the progress of a task or operation. |
| Notice | Provides information about normal, but significant, events that occur within the application. |
| Warning | Describes events that are less destructive than errors. They usually do not result in any reduction of the program's functionality or its full failure. Undesirable things that are not necessarily wrong. |
| Error | Identifies error events that may still let the software run, but with restricted capabilities in the impacted routes. |
| Critical | Identifies extremely serious error events that are likely to cause the program to abort. Typically, this leads to catastrophic failures. |
| Alert | Indicates a situation that requires immediate attention. |
| Emergency | Indicates a severe problem that requires immediate action to prevent damage or loss. |

### Log entry format
A log entry MUST always answer the following items and follow the below describes structure
* **who** caused the event
* **when** exactly did the event happened
* **where** did the event took place (context, component, application, etc.)
* **what** has happened and/or why has it happened
* **result** of event (exception, success details, information details)

Log structure example (consider using [CloudWatch](#https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-metric-streams-formats-json.html) and/or [Cloud Handler](#https://github.com/maxbanton/cwh) recommendations):
```JSON
{
  "actor": {
      "actorId": "end-user-1",
      "sessionId": "end-user-1-session-27",
      "transactionId": "end-to-end-transaction-555",
      "parentTransactionId": "end-to-end-transaction-554",
  },
  "service": {
    "host": "ip-11-111-1-111.eu-central-1.compute.internal",
    "componentType": "GLUE",
    "component": "StorefrontApi",
    "activityId": "address-search-suggestions",
  },
  "@timestamp": "2022-08-01T18:20:22.602934+00:00",
  "message":"StorefrontAPI : GET : v2/stores/delivery : start",
  "messageId":"unique-message-id",
  "level": 0,
  "levelCode": 0,
  "extra" : {
     "exception": {...}
     "environment": {
            "application": "",
            "environment": "",
            "store": "",
            "codeBucket": "",
            "locale": ""
     },
     "server": {
            "url": "",
            "isHttps": true,
            "hostname": "",
            "requestMethod": "",
            "referer": null       
     },
    "request": {
            "requestId": "",
            "type": "",
            "requestParams": {}
    },
    "externalRequest" : {
      "externalDuration":"0",
      "externalResponseCode": "remote-service-unique-answer-code"
    },
}
```

Log structure with example values:
```JSON
{
    "@timestamp": "2022-08-01T18:20:22.602934+00:00",
    "@version": 1,
    "host": "ip-10-105-6-175.eu-central-1.compute.internal",
    "message": "StorefrontAPI : Request : v2/stores/delivery",
    "type": "GLUE",
    "channel": "Glue",
    "level": "INFO",
    "monolog_level": 200,
    "extra": {
        "environment": {
            "application": "GLUE",
            "environment": "docker.dev",
            "store": null,
            "codeBucket": "US",
            "locale": "en_US"
        },
        "server": {
            "url": "https://api.com/v1/action-name?param1=abc",
            "is_https": true,
            "hostname": "api.com",
            "user_agent": "cypress/test-automation",
            "user_ip": "35.205.30.220",
            "request_method": "GET",
            "referer": null
        },
        "request": {
            "requestId": "3c1f60f1",
            "type": "WEB",
            "request_params": {
                "currency": "USD",
                "service_type": "delivery",
                "zip_code": "32773-5600",
                "address": "3707 S Orlando Dr"
            }
        }
    },
    "context": {
        "payload": {
            "find_by": []
        }
    }
}
```

Log structure with example error values:

```JSON
{
  "@timestamp": "2021-08-19T14:54:23.447685+00:00",
  "@version": 1,
  "host": "localhost",
  "message": "Exception - Sniffer run was not successful: Unknown error in \"/.../vendor/spryker/development/src/Spryker/Zed/Development/Business/ArchitectureSniffer/ArchitectureSniffer.php::165\"",
  "type": "ZED",
  "channel": "Zed",
  "level": "CRITICAL",
  "monolog_level": 500,
  "extra": {
    "environment": {
      "application": "ZED",
      "environment": "development",
      "store": "US",
      "codeBucket": "US",
      "locale": "en_US"
    },
    "server": {
      "url": "http://:/",
      "is_https": false,
      "hostname": "",
      "user_agent": null,
      "user_ip": null,
      "request_method": "cli",
      "referer": null
    },
    "request": {
      "requestId": "ad26d9e1",
      "type": "CLI",
      "request_params": []
    }
  },
  "context": {
    "exception": {
      "class": "Exception",
      "message": "Sniffer run was not successful: Unknown error",
      "code": 0,
      "file": "/.../vendor/spryker/development/src/Spryker/Zed/Development/Business/ArchitectureSniffer/ArchitectureSniffer.php:165",
      "trace": [
        "/.../vendor/spryker/development/src/Spryker/Zed/Development/Business/ArchitectureSniffer/ArchitectureSniffer.php:117",
        "/.../vendor/spryker/development/src/Spryker/Zed/Development/Business/DevelopmentFacade.php:484",
        "/.../vendor/spryker/development/src/Spryker/Zed/Development/Communication/Console/CodeArchitectureSnifferConsole.php:286",
        "/.../vendor/spryker/development/src/Spryker/Zed/Development/Communication/Console/CodeArchitectureSnifferConsole.php:93",
        "/.../vendor/symfony/console/Command/Command.php:258",
        "/.../vendor/symfony/console/Application.php:938",
        "/.../vendor/symfony/console/Application.php:266",
        "/.../vendor/spryker/console/src/Spryker/Zed/Console/Communication/Bootstrap/ConsoleBootstrap.php:111",
        "/.../vendor/symfony/console/Application.php:142",
        "/.../vendor/spryker/console/bin/console:27"      
      ]
    }
  }
}
```

## Metric generation
Each metric represents a condition of system attributes. There can be many of them, and they can be correlated with each other.

* Every service/component MAY define and generate project-appropriate metrics for key processes (with a basic dimension of the outcome 
of the operation (success, failure) and duration) to enable tracking of such events and reacting when they reach undesired scores.
  * The start and end of a process must be recorded to enable tracking and tuning of the infrastructure.
  * Communication durations with remote services must be recorded to understand whether the local process is delayed for a good reason.
* Critical metrics, along with their threshold values, must be highlighted in the 
[Operational guidelines](docs/scos/dev/guidelines/process-documentation-guidelines.html#operational-guidelines) to enable the setting 
up of a monitoring system.
* Deployment and rollback flows MAY generate metrics to enable tracking and interaction with these processes.
