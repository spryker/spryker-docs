---
title: Preventing update issues
description: Learn how to prevent update issues
last_updated: Apr 3, 2023
template: concept-topic-template
---

One of the issues projects face during an upgrade is when a Spryker class that was inherited on the project level gets updated on the core level. This can result in code syntax issues or logical issues, and it's completely in the project's team hands to spot and fix such issues. To avoid such issues, use the following best practices:

## Avoiding inheritance

*Minimizing the number of inheritance cases* is the best approach to avoid inheritance issues.

Usually, when you're inheriting a class from Spryker, you want to change its behavior. But before extending the class, check if you can do the following:
* *Configure the behavior*. Check your environment and module configs. If configuration can fit your needs, that is the best solution.
* Change the behavior by *introducing a new plugin or an event listener*. If the behavior you want to inherit is triggered by one of the plugins in a plugin stack or by an event listener, just add a new plugin and introduce a new class at the project level (potentially, implementing some interface). You don't need inheritance in this case.
* *Use a composition pattern*. There is a lot of information on the internet about *composition vs. inheritance* that will help you to understand the pattern. The main idea is to introduce a new class on the project level and to use the class you wanted to inherit as a constructor dependency, for example, as a kind of "wrapping". Even though this is a good practice, it might not work when changing protected methods.
* *Introduce a new class*. In case of heavy customizations, consider introducing a new class on the project level and instantiating it in the corresponding factory instead of the core one.

## Inheritance best practices

Sometimes inheritance is exactly what you need, and none of the above strategies work for you. In this case, *minimizing the amount of inherited code* is a rule of thumb. To follow this rule, you can take this approach:
* *Reduce the number of extended methods in a class*. Sometimes, developers just copy-paste the whole class to the project namespace, change the methods they want, and leave the rest as is. Instead, remove the methods you didn't touch.
* Focusing on the method you change, *reduce the amount of the inherited code*, delegating the rest to the `parent:: class` call. Ideally, you should have only project-specific logic in the  inherited class.
* There are some complicated cases. For example, if you want to remove or add a line from the middle of the original method and none of the prior techniques work, surround your change with a meaningful comment. The comment should explain why you made the change, ideally linking to a related ticket in Jira or other project-tracking software. This helps the person who does an update understand your goal and take the necessary steps.

## Locking module versions after inheriting from the core

If you inherit a class from the core, you can "protect" the code during an update by locking the module's version to the current minor. You can do this in your `composer.json` by, for example, replacing the *carret* module version (“^1.3.2”) with the *tilde* version (“~1.3.2”). Next time when the class you updated gets minor changes in the core, Composer will warn you about the locked version, and you will have to investigate why this module was locked. When locking the module, make sure to leave a meaningful comment in your VCS for the person who will be investigating that.

We provide the [Composer Constrainer](/docs/scos/dev/architecture/module-api/using-composer-constraint-for-customized-modules.html) tool that automates locking the modules by searching for inherited classes in your project namespace.
