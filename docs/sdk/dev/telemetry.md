Telemetry

All the configuration related to telemetry resides in `config/packages/telemetry.yaml`:

```yaml
parameters:
  telemetry_enabled: "%env(default:telemetry_enabled_default:bool:TELEMETRY_ENABLED)%"
  telemetry_enabled_default: true

  telemetry_transport: "%env(default:telemetry_transport_default:string:TELEMETRY_TRANSPORT)%"
  telemetry_transport_default: 'file'

  telemetry_server_url: "%env(default:telemetry_server_url_default:string:TELEMETRY_SERVER_URL)%"
  telemetry_server_url_default: ''

  telemetry_synchronizer_batch_size: 200
  telemetry_synchronizer_max_sync_attempts: 3
  telemetry_synchronizer_max_event_ttl_days: 90
  telemetry_synchronizer_lock_ttl_sec: 300

  telemetry_sender_data_lake_timeout_sec: 10
  telemetry_sender_data_lake_connection_timeout_sec: 4

  telemetry_sender_file_report_file_name: 'telemetry_events.json'
  telemetry_sender_file_report_format: 'json'
```

## Events
To implement custom events or extend current ones, you must implement the following interfaces:

`SprykerSdk\SdkContracts\Entity\Telemetry\TelemetryEventInterface` - generic event data.
`SprykerSdk\SdkContracts\Entity\Telemetry\TelemetryEventPayloadInterface` - event specific data.
`SprykerSdk\SdkContracts\Entity\Telemetry\TelemetryEventMetadataInterface` - event metadata.

## Event transport
To collect and send events to remote storage, `SprykerSdk\Sdk\Core\Application\Telemetry\TelemetryEventsSynchronizerInterface` is used.
This interface uses `SprykerSdk\Sdk\Core\Application\Dependency\Service\Telemetry\TelemetryEventSenderInterface` to send events to the remote server.
To implement the custom sender, you need to implement this interface and make sure to throw `SprykerSdk\Sdk\Core\Application\Exception\TelemetryServerUnreachableException` when the destination server is unreachable.

## Task console event collecting
Currently, only task commands are collected. This behavior is implemented by listening to the generic console events.
All the event listeners reside in `SprykerSdk\Sdk\Infrastructure\Event\Telemetry\TelemetryConsoleEventListener`.
To filter the appropriate events, `\SprykerSdk\Sdk\Infrastructure\Event\Telemetry\TelemetryConsoleEventValidatorInterface` is used.

## Metadata
Project settings `developer_email` and `developer_github_account` are used for user identification.
The project `composer.json` is used to populate the project name. All this data is sent in the event's metadata.

## How to disable telemetry
By default, telemetry is enabled. To disable it, set `TELEMETRY_ENABLED=false` in the `env` variable or update the `.env` file.

## Using in CI
To run SDK in a CI, it must be executed with the `SDK_CI_EXECUTION=1` env variable and with a `-n` (non-interactive) flag.
Example:

```shell
SDK_CI_EXECUTION=1 spryker-sdk sdk:init:sdk -n
```

