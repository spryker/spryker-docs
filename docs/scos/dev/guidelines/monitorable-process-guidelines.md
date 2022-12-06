---
title: Monitorable process guidelines
description: @TODO
last_updated: @TODO
template: concept-topic-template
related:
- title: NFR guidelines
  link: docs/scos/dev/guidelines/nfr-guidelines.html
- title: Operatable feature guidelines
  link: docs/scos/dev/guidelines/operatable-feature-guidelines.html
- title: Process documentation guidelines
  link: docs/scos/dev/guidelines/process-documentation-guidelines.html
---

In order to enable Operations Team to track/correlate issues in the operated/deployed applications, the following elements need to be applied over
* log generation
* and metric generation.

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
* Avoid logging in performance critical places. In case there is a performance critical process or an unusually large cycle as a sub-process
element, you should make a careful decision between performance vs traceability.
* Audit trail (including authentication & authorization): it is recommended to log the audit trails of important entity changes but it should 
not be sent to the regular log system since the typical data here consists mainly of sensitive data.

### Log levels
The following log levels MUST be utilised appropriately during application workflows to allow easy track down particular problems / investigations 
in the System. A wrong category selection MAY de-rail a fellow inspector.


| Level | Description |
|-------|-------------|
| Debug | Provides detailed data, which is mostly used for debugging. These logs allow to check variable values and/or error stacks. |
| Info | Interesting events. |
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

**TODO: add code example blocks from https://spryker.atlassian.net/wiki/spaces/ALO/pages/3388014860/Monitorable+process+guidelines**

## Metric generation
Applies to all application components under ACI scoped processes.

Each metric represents a condition of some system attribute. You can have a lot of them and correlate them with each other.

* Every service / component should define and generate project appropriate metrics for key processes (with basic dimension of the outcome 
of the operation (success, failure) and duration) to enable us tracking such events and react when they reach undesired scores.
   * Start and end of a process must be sent to enable us tracking and tuning infrastructure.
   * Communication durations with remote services must be sent to us to enable us understanding that the local process is delayed for a good reason.
* Critical metrics together with their threshold vision must be highlighted in the Operational guideline to enable us setting up monitoring system.
* The deployment & rollback flows should generate metrics in order to enable us tracking and interact with such processes.
