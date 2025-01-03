---
title: "Implementing graceful shutdown"
description: Implement a graceful shutdown for your project to make sure the uncompleted processes are not stopped by signals like SIGTERM.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/howto-handle-graceful-shutdown
originalArticleId: d4a9a278-36a6-490b-8333-c4fdfa5e4e1b
redirect_from:
- /docs/scos/dev/tutorials-and-howtos/howtos/howto-handle-graceful-shutdown.html
---

When a running process is stopped by, for example, signals like `SIGTERM` and `SIGINT`, the process is stopped right away, no matter if it's completed or not. Sometimes, such behavior is not acceptable—for example, in the case of half imported data set.

To make sure that a process is shut down gracefully, use the `GracefulRunner` module and pass `\Generator` to its `GracefulRunnerFacadeInterface::run()` method. `GracefulRunnerFacadeInterface::run()` uses the [signal handler](https://github.com/Seldaek/signal-handler) to register a new handler [with pcntl_signal](https://www.php.net/manual/en/function.pcntl-signal.php), and wraps the passed `\Generator`.  Until a signal is sent, the `\Generator::next()` method is executed to make sure that one step of your process is fully completed before the script shuts down.

Example:

```php
public function import(Collection $collection): void
{
    $this->gracefulRunnerFacade->run(
        $this->createImportGenerator($collection)
    );
}

protected function createImportGenerator(Collection $collection): \Generator
{
    foreach ($collections as $collectionItem) {
        yield; // Turns this method into a `\Generator`

        // Code that needs to completely run before script is shutdown.
        // The GracefulRunner takes care of execution and will stop
        // after an iteration was completed when a signal was received.
    }
}
```

<!--
{% info_block infoBox %}

To learn more about the Generators, see the Generators documentation.

{% endinfo_block %}
-->

## Handle exceptions

To throw an exception into the Generator code, you can use the second argument of the `GracefulRunnerFacadeInterface::run()` method. It’s the class name that must be thrown into the Generator when a signal is handled. The following example explains it in more detail:

```php
public function import(Collection $collection): void
{
    $this->gracefulRunnerFacade->run(
        $this->createImportGenerator($collection, YourException::class)
    );
}

protected function createImportGenerator(Collection $collection): \Generator
{
    foreach ($collections as $collectionItem) {
        yield; // Turns this method into a `\Generator`

        try {
            // Code that needs to run completely before the script is shut down.
            // The GracefulRunner takes care of the execution and will stop
            // after an iteration was completed when a signal was received.
        } catch (YourException $exception) {
            // When a signal is handled you end up here.
        }
    }
}
```
