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

This page contains guidelines for project development, not a list of strict requirements. While it is suggested that
development teams consider these recommendations, they are not hard requirements that must be followed. The purpose of these guidelines
is to help development teams achieve high quality software.

{% endinfo_block %}

## Log generation
Applies to all application components.

### Log entry best practices
* Log entry format and text taxonomy MUST be unified across all log providers for easy human processing.
* Log entries (in any case) MUST NOT contain Personal Identifiable Information (PII) for security reasons.
* Each log entry MUST reflect a single event and vice-versa for determinability.
* Log entries MUST use simple English language or widely recognised characters (when solving complex data representations).
* Log entry messages MUST be meaningful and explain the event’s context (counter-example: “Error occurred”)
* Log entry creation MUST NOT pass arguments to log statements whose evaluation will change object state for traceability and readability.
* A “cross component tracing ID” MUST be included to allow tracking all generated logs across the multiple components for traceability.

### What to log?
* Requests: all incoming request to a local component.
* Remote calls: all outgoing request to a remote service. In such requests, it is crucial to log the duration of call for later debugging, 
just as the result of remote response (success, error).
* Scheduled tasks: all started scheduled tasks and accordingly their end-results (error, success, interrupt).
* Application scoped resources: resource issues including exhausted resources, exceeded capacities and connectivity issues.
* Threats: Suspicious/malicious activities against the application.
* Unhandled/handled exceptions
* Silenced exceptions: In case an empty “catch()” clause consumes the exception.
* Significant user actions/events (including: help requests / cancelled actions)

### What NOT to log?
* Avoid logging unreasonably. When you decide to have a log-entry, you should have at least 1 use-case in mind where the related data 
can be considered a helpful addition.
* Minimize logging in performance critical places. In case there is a performance critical process or an unusually large cycle as a sub-process
element, you should make a careful decision between performance vs traceability.
* Audit trail (including authentication & authorization): it is recommended to log the audit trails of important entity changes, but it should 
not be sent to the regular log system since the typical data here consists mainly of sensitive data.

### Log levels
The following log levels MUST be utilised appropriately during application workflows to allow easy track down particular problems / investigations 
in the System. A wrong category selection MAY de-rail a fellow inspector.


| Level | Description |
|-------|-------------|
| Debug | Provides detailed data, which is mostly used for debugging. These logs allow to check variable values and/or error stacks. |
| Info | Interesting events for business or tech. |
| Notice | Uncommon events. |
| Warning | Describes events that are less destructive than errors. They usually do not result in any reduction of the program's functionality or its full failure. Undesirable things that are not necessarily wrong. |
| Error | Identifies error events that may still let the software run, but with restricted capabilities in the impacted routes. |
| Critical | Identifies extremely serious error events that are likely to cause the program to abort. Typically, this leads to catastrophic failures. |
| Alert | Action must be taken immediately. |
| Emergency | An urgent alert. |

### Log entry format
A log entry MUST always answer the following items and follow the below describes structure
* **who** caused the event
* **when** exactly did the event happened
* **where** did the event took place (context, component, application, etc.)
* **what** has happened and/or why has it happened
* **result** of event (exception, success details, information details)

Draft:
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

Log structure with error values:

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
Each metric represents a condition of some system attributes. There can be many of them, and they can be correlated with each other.

* Every service/component should define and generate project-appropriate metrics for key processes (with a basic dimension of the outcome 
of the operation (success, failure) and duration) to enable tracking of such events and reacting when they reach undesired scores.
  * The start and end of a process must be recorded to enable tracking and tuning of the infrastructure.
  * Communication durations with remote services must be recorded to understand whether the local process is delayed for a good reason.
* Critical metrics, along with their threshold values, should be highlighted in the 
[Operational guidelines](docs/scos/dev/guidelines/process-documentation-guidelines.html#operational-guidelines) to enable the setting 
up of a monitoring system.
* Deployment and rollback flows should generate metrics to enable tracking and interaction with these processes.
