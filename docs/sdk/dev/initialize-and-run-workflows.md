# Workflow SDK tool

## How to initialize and run workflows

To initialize a project with a specific workflow, execute the following command:

```bash
spryker-sdk init:sdk:project --workflow={workflowName}
```

If the project already has been initialized with the `spryker-sdk init:sdk:project` command, you can manually add workflow to the project config file `{projectDir}/.ssdk/settings`:

```yaml
# {projectDir}/.ssdk/settings
project_key: e9abab71-59f3-e9ff-468c-7a6d28e10724
workflow:
    - app # app workflow
```

---
**Note:** Project is limited to the workflows specified during initialization.
---

To run a workflow, execute the following command in the project directory:

```bash
spryker-sdk sdk:workflow:run {workflowName}
```
You can start any workflow by providing its name in the `sdk:workflow:run` command.

---
**Note:** Two identical top-level workflows can't run inside the same project.
---

## Commands

There are the following commands for the workflow:

- To list all available workflows:
  ```bash
  spryker-sdk sdk:workflow:list
  ```
- To generate and .SVG image for a specific workflow:
  ```bash
  spryker-sdk sdk:workflow:show {workflowName}
  ```
- To initialize project settings with a workflow:
  ```bash
  spryker-sdk sdk:init:project --workflow={workflowName} --workflow={workflowName}
  ```
  ---
  **Note:** If you initialize workflows for the project, you can use only these workflows.
  ---
- To run the workflow process:
  ```bash
  spryker-sdk sdk:workflow:run {workflowName}
  ```

## Configuration reference

In the SDK directory, the workflows are defined in the workflow YAML files either in `config/packages`, or in the configuration of extension bundles.

See the basic workflow documentation in the [Symfony docs](https://symfony.com/doc/current/workflow.html).

Additionally, you can configure and extend the workflow behavior by providing some specific metadata options:
- `transitionResolver`: `sdk:workflow:run`. The `service` should implement `\SprykerSdk\SdkContracts\Workflow\TransitionResolverInterface` as shown in the [example workflow definition](example-workflow-definition).
- `allowToFail: true`: `sdk:workflow:run`. Sets the next place if task failed.
- `re-run: true`: `sdk:workflow:run`. Runs the workflow multiple times when the current one has finished.
- `run: single`: `sdk:workflow:run`. Runs only a single transition and exits. If this setting is omitted, the task runs available transitions one by one, asking which one to run if multiple possible variants exist.
- `before: service_name`. The service `service_name` should implement `\SprykerSdk\Sdk\Extension\Dependency\Event\WorkflowEventHandlerInterface` and is called before the transition occurs.
- `after: service_name`. The service `service_name` should implement `\SprykerSdk\Sdk\Extension\Dependency\Event\WorkflowEventHandlerInterface` and is called after the transition occurs.
- `guard: service_name`. The service `service_name` should implement `\SprykerSdk\Sdk\Extension\Dependency\Event\WorkflowGuardEventHandlerInterface` and is called to determine if the transition is available.
- `task: task_name`. The task `task_name` is executed inside the transition, and the transition can stop depending on its result.
- `workflowBefore: workflow_name`. The workflow `workflow_name` runs inside the transition, and should end before proceeding to the task execution.
- `workflowAfter: workflow_name`. The workflow `workflow_name` runs inside the transition after the task is executed and should end before finishing the transition.

<a name="example-workflow-definition"></a>
<details>
<summary>Example workflow definition in `workflow.yaml`</summary>

```yaml
framework:
  workflows:
    hello_world:
      type: workflow # (state_machine) see the docs at https://symfony.com/doc/current/workflow/workflow-and-state-machine.html
      marking_store:
        type: method
        property: status
      metadata:
        re-run: true # Possibility to re-run workflow when the current one is finished
        guard: guard_service_name # checks transition availability for all transitions
        before: handler_service_name # runs before every transition
        run: single # sdk:workflow:run will only run a single transition and exit
        after: handler_service_name # runs after every transition
      supports:
        - SprykerSdk\SdkContracts\Entity\WorkflowInterface
      initial_marking: start
      places:
        - start
        - done
      transitions:
        go:
          from: start
          to: done
          metadata: # in order of execution
            transitionResolver: # Resolver needs to resolve the next transition
              service: transition_boolean_resolver # Resolver service id. The resolver should implement `\SprykerSdk\SdkContracts\Workflow\TransitionResolverInterface`
              settings: # will be passed to the transition resolver as a second argument
                  failed: bye # transition name for the failed result
                  successful: world # transition name for successful result
            allowToFail: true # Can go to next place if a task failed
            guard: guard_service_name # checks this transition availability
            before: handler_service_name # runs before this transition
            workflowBefore: hello_php # workflow starts and should end before proceeding to the task
            task: hello:world # task is executed inside the transition
            workflowAfter: hello_php # workflow starts and should end before finishing the transition
            after: handler_service_name # runs after this transition
    hello_php: # Minimal workflow definition
      type: state_machine
      marking_store:
        type: method
        property: status
      supports:
        - SprykerSdk\SdkContracts\Entity\WorkflowInterface
      initial_marking: start
      places:
        - start
        - done
      transitions:
        go:
          from: start
          to: done
```
</details>
