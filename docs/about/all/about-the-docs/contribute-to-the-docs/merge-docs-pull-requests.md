---
title: Merge docs pull requests
description: Learn how you can merge pull requests without a Technical Writer's review.
last_updated: May 18, 2024
template: howto-guide-template
---

This document describes how to merge pull requests (PRs) without a Technical Writer's review. This should only happen in rare cases, for example—when you need to merge an urgent PR. When you merge a PR without a Technical Writer's review, it's your responsibility to make sure the PR is reviewed retrospectively.

This process is available only to architects. To merge a docs PR, take the steps in the following sections.

## Add changes

To retain the quality of information architecture in the docs, you can only merge PRs that introduce changes to existing docs. For instructions on adding changes, see [Edit the docs locally](/docs/about/all/about-the-docs/contribute-to-the-docs/edit-the-docs-locally.html).


## Evaluate information fit

Read the document as a whole and evaluate if your changes blend in naturally into the document's structure and story. Avoid notes at all costs and use AI tools to integrate your changes effectively.

## Process changes using AI

1. Request an AI agent of your choice to process your changes using the following prompt:

```text
Purpose and Goals: * Evaluate user-provided code intended for documentation on docs.spryker.com.  * Ensure the code, written in Markdown for Jekyll, meets high-quality standards in tone, writing style, grammar, and web best practices.  * Provide specific, actionable amendments to improve the article.  * Only show the amendments , do not show "no change"     Analysis Guidelines:    Grammar and Sentence Structure:  * Identify grammatical errors (e.g., typos, incorrect verb tense, subject-verb agreement issues, incorrect punctuation) and formulate corrections.  * Evaluate sentence structure for clarity and conciseness. Identify sentences that are too long, complex, or unclear.  * Formulate improved sentence structures for better readability.  * Ensure that the Markdown is correct and the content conforms with best web practices, like alt text and no skipped headings.    Tone of Voice:  * Analyze the overall tone. Ensure it aligns with principles commonly found in technical documentation styles like the Google developer documentation style guide and the Microsoft Style Guide, aiming for a tone that is: formal yet helpful, encouraging, clear, concise, consistent, warm, relaxed, and ready to lend a hand.  * Specifically check for and formulate changes to encourage:  * Use of the second person ('you') to address the reader directly.  * Use of the active voice for clarity.  * Use of the present tense where appropriate for immediacy.  * Avoidance of contractions (e.g., use 'do not' instead of 'don't').  * Appropriate use of technical terms, avoiding unnecessary jargon.    Writing Style and Markup:  * Ensure that American spelling is used consistently. Formulate corrections for any deviations.  * Verify that the content is correctly formatted using Markdown syntax. Check for proper use of headings, lists, code blocks, links, bolding, italics, etc., and formulate corrections for improper usage.    Present all suggestions in a numbered list, each item must have:  * The original markdown code.  * The new markdown code.  * A summary of the change.
```

2. Review all suggestions and changes. AI doesn't have the full context, so it can change the intended meaning. 



## Add labels

Add the following labels to the PR:

* **Updated**: because you can merge PRs with updated and not new docs.
* **Bypassed TW Review**: this lets us track and retrospectively review such PRs.

## Make CI green

The CI ensures no bugs or broken links are deployed to the production website. Before you merge a PR, you must wait for the CI checks to finish. If a check is failed, you must fix the error. You can merge a PR when the following checks are successful:

| CI CHECK | DESCRIPTION |
| - | - |
| Enforce PR labels / enforce-label | Checks for required labels. To learn about the required labels, see [Add labels](#add-labels). |
| CI / Build | Checks if the website can be built with your changes. |
| CI / Page validation | Checks for bugs in the pages. |
| CI / Links validation (check_about) | Checks for 404s in the About Spryker section. |
| CI / Links validation (check_ca) | Checks for 404s in the Cloud Administration section. |
| CI / Links validation (check_pbc) | Checks for 404s in the Packaged Business Capabilities section. |
| CI / Links validation (check_dg) | Checks for 404s in the Development Guide section. |
| Is formatting great? / vale-lint | Checks for style and formatting issues. |

### Fixing build and page validation

There isn't any specific pattern to the errors of these checks. When one of these fails, you need to check the details for the specific errors and fix them.

### Fixing links validation

In the context of fixing broken links, you are going to deal with internal and external links. If one of the links validation checks fails, go to the details and check each link individually.

#### Fixing external links

For external links, there is a high chance for false positives. So, when a check fails because of an external link, check if it's available by accessing the link in your browser. If the page is available, you can consider it a false positive and ignore it. If the link is not available, there are a few things to do:
* If you know it's a temporary bug that's going to be resolved within a few days, ignore the link.
* If it's a 404, check if the page is available at another location on the website.
* If the website is completely down or broken, find an alternative source of information.
* If the cause of the issue is unclear, and there are no alternative sources of information, comment out or remove the link. Make sure to update the paragraph to retain the context of the information without the link being available.

#### Fixing internal links

For fixing internal links, you need to understand their structure:

* Non-versioned link example: `/docs/about/all/about-the-docs/run-the-docs-locally.html`.
* Versioned link example: `/docs/dg/dev/frontend-development/{{site.version}}/create-angular-modules.html`

The easiest way to fix a broken link is as follows:
1. Copy the relative path to the target document, starting from `docs`: `docs/dg/dev/frontend-development/202404.0/create-angular-modules.md`.
2. Add a slash in the beginning: `/docs/dg/dev/frontend-development/202404.0/create-angular-modules.md`.
3. Replace `.md` with `.html`: `/docs/dg/dev/frontend-development/202404.0/create-angular-modules.html`.
4. If it's a versioned link, replace the version with a version placeholder: `/docs/dg/dev/frontend-development/{{site.version}}/create-angular-modules.html`.
5. Replace the broken link with this new link.


### Fixing formatting

1. Check the details for the specific errors and fix them.
2. Recheck your changes locally:
```bash
vale --minAlertLevel=error {FILE_PATH}
```

You can also push your changes and let the CI recheck your file. 

## Peer-review the changes 

Have another architect peer-review the changes. 


## Merge the PR

1. Select **Merge without waiting for requirements to be met (bypass branch protections)**.
2. Click **Merge pull request**.
3. Click **Confirm merge**.
    This merges the branch and starts the deploy to production. The changes will be visible on the website in up to an hour.










































