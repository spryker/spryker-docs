---
title: Monitorable process guidelines
description: Guidelines for log generation and metric generation to enable Operations Teams to track and correlate issues in operated and deployed applications.
last_updated: April 23, 2024
template: concept-topic-template
related:
  - title: NFR guidelines
    link: docs/dg/dev/best-practices/non-functional-requirement-templates/operational-and-deployment-guidelines.html
  - title: Operatable feature guidelines
    link: docs/dg/dev/best-practices/non-functional-requirement-templates/operatable-feature-guidelines.html
  - title: Process documentation guidelines
    link: docs/dg/dev/best-practices/non-functional-requirement-templates/process-documentation-guidelines.html
---

This document provides guideline templates for development teams striving for high-quality software. These templates are flexible and serve as a starting point, so make sure to adjust them to your project's requirements. Defining and following these guidelines may be necessary to fulfill project Service Level Agreements (SLAs), with each guideline explicitly outlining the responsible team. Alignment with all involved teams is essential for ensuring a functioning concept.


Enable your Operations Team to track and correlate issues within deployed applications by implementing the following practices:
- Ensure comprehensive logging mechanisms for capturing relevant events and errors.
- Implement metric generation techniques to gather key health indicators.

These practices provide essential data for troubleshooting and monitoring application health.

## Log generation
Applies to all application components.

### Log entry best practices
* Unified format: The format and text taxonomy of log entries must be unified across all log providers for ease of human processing.
* No PII: Log entries, under no circumstances, can contain Personal Identifiable Information (PII) for security reasons.
* No encryption keys or secrets: Log entries must not contain any encryption keys or secrets.
* Single event reflection: To ensure determinability, each log entry must reflect a single event and the other way around.
* Language use: Log entries must use simple English language or widely recognized characters, especially when representing complex data.
* Meaningful messages: Log entry messages must be meaningful and provide context to the event. For example, avoid vague messages like "Error occurred".
* State preservation: When creating log entries, avoid passing arguments to log statements that could alter the state of an object. This is crucial for traceability and readability.
* Cross-component tracing ID: Include a cross component tracing ID in log entries to enable tracking of all generated logs across multiple components.
* Data residency compliance: Ensure that logs comply with data residency requirements.

### What to log?
* Requests: Incoming requests to a local component.
* Remote calls: All outgoing requests to a remote service. Log the duration of the call and the response, such as success or error, for future debugging.
* Scheduled tasks: All initiated scheduled tasks with their end results: error, success, interrupt.
* Application scoped resource issues:
    * Exhausted resources
    * Exceeded capacities
    * Session management failures
    * Connectivity issues
* Threats: Suspicious or malicious activities against the application, as well as successes and failures in authentication or authorization.
* Exceptions:
    * Handled and unhandled application errors
    * Stack traces
    * Troubleshooting instances
    * Thrown exceptions
* Silenced exceptions: Instances of an exception being consumed by an empty `catch()` clause.
* Significant user actions and events:
    * Help requests
    * Cancelled actions
* Notable user actions:
    * Successful logins
    * Privilege elevations
    * Data validation failures
    * Payment and transaction events
    * Significant user journey events

### What not to log?
* Unreasonable logging: Avoid logging without a clear purpose. When deciding to create a log entry, identify at least one use case for the data.
* Performance critical places: Minimize logging in areas where performance is critical. If there's a performance-critical process or a large cycle as a sub-process element, try to strike a balance between performance and traceability.
* Audit trail: While it's recommended to log the audit trails of significant entity changes, these logs shouldn't be sent to the regular log system due to the sensitive nature of the data typically involved in authentication and authorization.

### Log levels
Appropriately implement the following log levels in application workflows to simplify issue investigations and resolutions. The log levels are based on Syslog [RFC 5424](https://datatracker.ietf.org/doc/html/rfc5424).

| Level | Description |
|-------|-------------|
| Debug | Provides detailed data that's mostly used for debugging. These logs allow to check variable values and/or error stacks. |
| Info |  Provides information about the normal operation of the application. This level is often used to record the progress of a task or operation. |
| Notice | Provides information about normal, but significant, events that occur within the application. |
| Warning | Describes events that are less destructive than errors. They usually don't result in any reduction of the system's functionality or its full failure. Undesirable things that are not necessarily wrong. |
| Error | Identifies error events that may still let the software run but with restricted capabilities in the impacted routes. |
| Critical | Identifies extremely serious error events that are likely to cause the system to abort. Typically, this leads to catastrophic failures. |
| Alert | Indicates a situation that requires immediate attention. |
| Emergency | Indicates a severe problem that requires immediate action to prevent damage or loss. |

### Log entry format
A log entry must always answer the following items and follow the describes structure:
* *who* caused an event.
* *when* exactly did the event happen.
* *where* did the event take place, for example-context, component or application.
* *what* happened and/or why it happened.
* *result* of event: exception, success details, information details.

The following are examples of log structure. When designing your own log structure, take into account recommendations from [CloudWatch](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-metric-streams-formats-json.html) and  [Cloud Handler](https://github.com/maxbanton/cwh).

<details>
  <summary>Log structure example</summary>

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

</details>

<details>
  <summary>Log structure with example values</summary>

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

</details>


<details>
  <summary>Log structure with example error values</summary>

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

</details>

## Metric generation

Each metric represents a condition of system attributes. There can be many of them, and they can be correlated with each other.

* Every service or component can define and generate project-appropriate metrics for key processes to enable tracking of such events and reacting when they reach undesired scores. These metrics are generated with a basic dimension of the duration and outcome of the operation, such as success or failure.
  * The start and end of a process must be recorded to enable tracking and tuning of the infrastructure.
  * Instances of communication duration with remote services must be recorded to understand if a local process is delayed for a good reason.
* Critical metrics, along with their threshold values, must be highlighted in the [Operational guidelines](/docs/dg/dev/best-practices/non-functional-requirement-templates/process-documentation-guidelines.html#operational-guidelines) to enable the setting up of a monitoring system.
* Deployment and rollback flows can generate metrics to enable tracking and interaction with these processes.
