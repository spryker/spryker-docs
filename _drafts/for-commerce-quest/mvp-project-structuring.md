---
title: MVP project structuring
description: This article helps with the project planning stage.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/mvp-project-structuring
originalArticleId: 2a0c62a9-d1e4-43e0-8b10-b44f200a1bb0
redirect_from:
- /docs/scos/user/intro-to-spryker/mvp-project-structuring.html
---

The purpose of these guidelines described in this topic is to help with the project planning stage.
In general, good products are built on strong foundations, and cost-effective projects are managed through clarity, communication, and minimal change.

## Decoupling IT and business
Understanding different stakeholders and creating a clear separation between them significantly improves the decision-making process and helps assign responsibilities to their correct owners.

IT and business stakeholders have different agendas, skills, and responsibilities.

If not clearly defined, the boundaries between responsibilities become unclear, leading to miscommunication and prolonged decision-making. Moreover, in most cases, the business side is responsible for supporting IT by providing the necessary approvals and resources. Unclear separation of responsibilities inevitably leads to the wrong people spending time on the wrong tasks.

The division of responsibilities should be made clear:

| BUSINESS-FOCUSED RESPONSIBILITIES |IT-FOCUSED RESPONSIBILITIES |
| --- | --- |
| <ul><li>reporting</li><li>accounting</li><li>budgeting</li><li>contracts</li><li>OKRs</li><li>HR</li></ul>  | <ul><li>development</li><li>architecture</li><li>design</li><li>usability</li></ul>  |

{% info_block warningBox %}

Clear responsibilities must be used to support cooperation and communication.

{% endinfo_block %}

## Communication and ceremonies
Tools and meetings are perfect conduits for creating an environment of clarity and communication, just as long as you don't go too far. Too many systems and meetings can create necessary overload and quickly turn into costly, time-consuming tasks.

As a general rule, create a set communication method and make clear what the endorsed tool of communication is. Discourage the use of multiple tools when possible.

The same goes for meetings, dallies, spec workshops, sprint plannings, and retrospectives. Those are great tools for bringing teams together with a clear purpose. However, to turn meetings into ceremonies, make sure they are held on time, have a specific structure, are short and to the point, and support decision-making and communicating information. Most importantly is that everyone's time is respected.

## Specifications
The specification process can be a challenge. There are a few practical suggestions that can make the process more efficient.

* Start early with the designs.
* Start early with the specifications.
* Talk to every single stakeholder from the start.

{% info_block warningBox "Tip" %}

This is the best way to learn about edge cases and be able to do something about them early on.

{% endinfo_block %}

* Manage your stakeholders and their expectations.

{% info_block warningBox "Tip" %}

Plan specifications to be iterative and clarify the impact development has on the timeline.

{% endinfo_block %}

* Be flexible with timelines.

{% info_block warningBox "Tip" %}

Early design and specifications always take longer than expected, and there are always hidden and surprise requirements that you find out along the way.

{% endinfo_block %}

* Make the initial specifications a basic subset of the essential parts.
* Build a workable version as soon as possible to validate the design and specifications on a working prototype.
* Be prepared to have several sprints.
* *Launch early = learn longer + reduce waste*.

![MVP car](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/About+Spryker/MVP+Project+Structuring/mvp_car.jpg)

* Maximize your time at the market.
* Design features with milestones for early testing throughout the development process as opposed to developing a feature and testing it when it's complete.

## Lean MVP

*What is your minimum viable product?* *What features are essential, and what can you live without or are comfortable introducing later when the development matures?* These are the questions you should be asking. The decisions you make not only help the development process but also help you as an organization to define and clarify what are the most important features to you.

{% info_block warningBox "Tip" %}

Initially, to define your MVP, try not to match features one by one. Instead, remove features that are rarely used.

{% endinfo_block %}

### Feature-value mapping
To create a lean MVP, the first step is to evaluate the importance of features by the added value they provide. A mapping matrix can help with the evaluation process.

{% info_block infoBox %}

The following image below is an example of how to map functionality to assess the value added and effort

![MVP feature mapping](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/About+Spryker/MVP+Project+Structuring/mvp_feature_mapping.png)

{% endinfo_block %}

Once functionality has been mapped, it's easier to assess the scope, importance, and cost of each feature.

The next step is to map features to specific releases. With this method, you can formulate a fair assessment of the progression of your release scope and plan your work and resources accordingly.

![MVP feature release](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/About+Spryker/MVP+Project+Structuring/mvp_feature_mapping_release.png)

## Controlling your backlog
Giving people a voice is positive, but controlling the voice is necessary. If everyone gets to have equal input, things can get out of hand very fast. A high level of involvement at the beginning of a project leads to an excessive and unmaintainable backlog. Subsequently, the ability to keep accurate estimates is compromised, and the sheer volume is not only time-consuming but leads to shifting from planning based on micro factors that are not part of the bigger picture.

To control your backlog, you need to put a gatekeeper into place. The gatekeeper can be a business analyst (BA), project manager (PM), or product owner (PO), and their responsibilities should include the following:

* Enforcing a minimal ticket standard (structure and content).
* Identifying and removing duplicates.
* Making an initial evaluation of each ticket's relevance and timing.
* Assigning tickets to a specific release either by routing tickets from main to releases or limiting reporting to a specific release.

## Planning for major features
The project development life cycle has ups and downs in activity during certain milestones, primarily major feature development. There are two main approaches to handling it:

* Spike tickets for larger technical tasks.

{% info_block infoBox %}

Where a single developer or expert attacks the feature, dedicating all effort and time to assessing the feature.

{% endinfo_block %}

* Kick-offs and plan-of-attacks are usually better for smaller but complex tickets.

{% info_block infoBox %}

Organized by the product owner, they lead the meeting and capture the information.

{% endinfo_block %}

Both methods result in a document listing the tasks, resources, and timeline needed to realign and fix the functionality. This reduces the risk of doing the wrong thing and improves estimates.

{% info_block infoBox "Examples:" %}

The Data Export functionality is ideal to be tackled with the spike tickets approach because it's a single functionality with no other external dependencies that need to be considered.<br><br>On the other hand, something like an ERP Connection that spans many processes and many edge cases needs in-depth analysis.

So you would have a plan of attack workshops with the shop and ERP team and also with logistics and payment experts and combine the conclusions into a single plan.

{% endinfo_block %}

## Launch scenarios
The bottom line is that for each launch, you need to find the scenario that works for you.

There are three main approaches to launching a product:

* *Canary*. Roll out features to a small audience. You can measure reactions to a feature in a controlled environment.
* *Per-(county|brand|…)*. Release a new feature to a controlled subcategory such as a country, group, or certain brand.
* *Big bang*. Release everything with all the fanfare and issue fixes and changes to the live product.

Choose the launch scenario that best suits the nature of the functionality that you want to release and the level of risk that you can take.

{% info_block infoBox %}

For example, if the new feature has to do with financial or highly sensitive information, it's better to choose the more conservative canary appropriate.

{% endinfo_block %}

## Real-life testing
Nothing compares to testing out an actual working demo or prototype. In the development process, changes are inevitable, and a product evolves from a specification fast. Having a working prototype allows you to test out the initial design and align the development and direction accordingly. Therefore, to increase the project's productivity, have a working system running from day 1.

Make sure that you leverage the working system by using it to receive stakeholder feedback and learn and understand how operations work.

Using focus groups at any stage can help provide not only the user's perspective but also a fresh set of eyes and an outside opinion that is not influenced by cost, timing, and resources.

## Time management
One of the major stress factors in project management is when the project begins because you start focusing on when the project ends. Not only does that introduce stress to the process, but it also distracts from focusing on managing the project and detracts from the ability to deliver and adhere to plans.

Planning adequate time ensures that additional time-consuming distractions can be avoided.

When working with a very light MVP, usually things go slower than expected, and the scope (at least slightly) increases. Time management also means stakeholder expectation management, defining not only when the project progresses but also what it entails.
