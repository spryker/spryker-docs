---
title: Getting the most out of Spryker Support
description: Find help and guidance on how to get the most out of Spryker Support, including tips on issue reporting, contacting support, and maximizing resources.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/how-to-get-the-most-out-of-spryker-support
originalArticleId: 3ab286da-5f06-4035-bc52-0b0237ed410f
redirect_from:
- /docs/scos/user/intro-to-spryker/support/getting-the-most-out-of-spryker-support.html
related:
  - title: How Spryker Support works
    link: docs/about/all/support/how-spryker-support-works.html
  - title: How to use the Support Portal
    link: docs/about/all/support/using-the-support-portal.html
---


[Spryker Support Portal](https://support.spryker.com/s/) is the main portal for interacting with Spryker support. In the portal, you can have 3 (Standard Access) or 10 (Premier Access) licenses. To get access to the support portal [fill out the Portal Access Request
 form](https://www.surveymonkey.com/r/XYK5R26).

## Best practices for Partners and SIs

Ask your customer to request Support Portal licenses for your project's team. Customers can request licenses using the [Portal Access Request form](https://www.surveymonkey.com/r/XYK5R26). This lets your team request changes and report issues on the customer's behalf.

If you're working with multiple Spryker projects and customers, each of those customers needs to request licenses for you.

{% info_block infoBox %}

Only customers can request Support Portal access because it's part of their contractual agreement with Spryker.

{% endinfo_block %}

### Spryker partner portal deprecation

Support cases can no longer be created in Spryker Partner Portal. Use the Support Portal instead.

Using the Support Portal over the Partner Portal has the following advantages:
* Partners and customers can see their cases and collaborate on them.
* Advanced relation between change requests, support cases, and infrastructure environments.
* When creating a case, you can select a needed environment from a list of owned environments, preventing human errors.

 <!-- Upcoming support for MFA -->

## Whitelist our email addresses

To make sure our quick responses don't end up in spam and reach you, whitelist the email addresses we're using to provide updates on your cases:

* support@spryker.com

* noreply@spryker.com

If you need help with whitelisting the email addresses, forward this request to your IT department or help desk.

<!--
![image.png](https://cdn.document360.io/9fafa0d5-d76f-40c5-8b02-ab9515d3e879/Images/Documentation/image%28136%29.png)

*Photo by [@Startup-Stock-Photos](https://www.pexels.com/@startup-stock-photos)*

-->

## Adjust auto replies

Automatic responses to updates and notifications we send you can lead to cases being created accidentally. Make sure automatic replies are disabled for support@spryker.com.

If you are using the email address of a ticket system or any other automated system to receive our communications and notifications, make sure that that system also doesn't send automatic replies to support@spryker.com.

## Provide all the information

Our goal is to increase the number of tickets that are solved with the first engagement. This is more likely to happen when a support case is opened with all the information needed to assess, reproduce, and solve the problem. Such cases may be resolved with the first response.

Even though this is hard to achieve with a complex product like Spryker, we strive to reduce the interactions necessary to solve a case. To reduce the interactions necessary to solve a case, we need your help. Here are the most important pieces of information that should go into any ticket you open with us.

| INFORMATION | QUESTIONS THAT HELP YOU | EXPLANATION |
| --- | --- | --- |
| Prerequisites and steps to reproduce | What prerequisites must be met, so they can see the problem occures? Am I using Spryker Suite/B2B/B2C Demo Shop? Am I using Spryker hosting? What project-level adjustments have been made that might have an influence on the problem? What do they need to do, step by step, to arrive at the same point as me and see the error? | For a new issue, one of the first steps we do is trying to reproduce it in our latest version of Spryker. In order to do so quickly and targeted, we need clear, step-by-step instructions. Occasionally, we will ask you to provide your `composer.lock` file. This file also contains all the version information for all the components and models you are using and is very helpful in diagnosing more complex problems. It might seem tedious, but providing a good description of how we can reproduce your problem is the biggest time saver.|
| Expected behavior | What did I expect would happen if I executed the actions described above? | Sometimes, it's just not obvious enough that the outcome you expected and tell us helps us avoid misdiagnosing an issue or research in the wrong direction.  |
| Actual behavior | What was the unexpected thing that happened? Where there any error messages? What happened that should not have happened? | This is what we will look out for when we are reproducing your issue. Please be specific and precise and share error messages. |
| Your contact details | Did I write my email address correctly? Is it ideally the one that we included in our SLA as a named contact? | It might sound strange, however, misspelled email addresses are almost impossible to detect from a support perspective and can immediately introduce a communication problem.  |
| The Company this issue applies to | Am I a Spryker partner, and the issue impacts a customer of mine? Or is this a Spryker-led project, and I am a direct customer of Spryker? | This information is important so that we can map the correct SLA for you and know exactly with whom to speak in Spryker to get more contextual information on your case. It makes a big difference for us, so please always include info that tells us who company impacted by the problem |
| Cloud | Am I using Spryker's PaaS offering, or is the shop hosted elsewhere? | If you are using Spryker's PaaS offering, this is an important piece of information to include in your case. Since you are hosted with us, we can coordinate closely with our DevOps during the investigation and might not have to ask as many questions regarding your setup as we might need to if you are hosted elsewhere. |
| Type of issue | Is this an infrastructure issue, or is this a software issue? | If you are a Spryker PaaS customer, you are benefiting from strict SLA times, and we want to know immediately if you suspect that there is something wrong with our PaaS offering. Inform us if you suspect your issue to be hosting-related. If you suspect your problem is software-related, it might save us time and allow us to exclude infrastructure as a factor. |

If you include all of the above, your chances of getting a fast resolution of your problems without much back and forth are significantly higher because we can concentrate on what matters and have all the info readily available.

## Avoid out-of-band communication

With pressing measures, it might seem like a good idea to reach out to as many people as possible to make sure a message is heard. However, the undoubtedly engaged, highly motivated people you messaged will scramble and try to get things done for you without clear coordination. Solutions will get implemented on top of each other and things will be done multiple times, creating confusion and more issues.

Regardless of your issue, the only channel you need to communicate to is Spryker Support. With clearly defined [escalation rules], we will contact all the people that need to be involved in solving an issue. Raising a case with support also ensures SLA coverage, orderly tracking of all communication in a central, audited, and secure place.

## Provide feedback
<!--
![image.png](https://cdn.document360.io/9fafa0d5-d76f-40c5-8b02-ab9515d3e879/Images/Documentation/image%28135%29.png)
*Photo by [athree23](https://pixabay.com/de/users/athree23-6195572/)*
-->
We want to measure ourselves to your high standards and exceed expectations. One important step towards our goal of providing the best support experience in the industry is receiving feedback. When we close a case with you, the notification email includes a link to a short survey. Provide an honest, stern feedback. Tell us how unsatisfied or satisfied you are with our service and how easy or hard it's for you to work with us. If you have any thoughts, make sure to add them to the comments section.

We take your feedback very seriously. Our Support Lead will read and follow up on your feedback.
