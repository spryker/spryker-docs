---
title: How to share secrets with the Spryker Support Team
originalLink: https://documentation.spryker.com/2021080/docs/how-to-share-secrets-with-the-spryker-support-team
redirect_from:
  - /2021080/docs/how-to-share-secrets-with-the-spryker-support-team
  - /2021080/docs/en/how-to-share-secrets-with-the-spryker-support-team
---

This document explains how you can securely share secrets or credentials with the Spryker Support Team. In general, the safest way to share secrets is not to share them, but if the situation demands it, we ask you to share secrets only the way described in this document.

{% info_block warningBox %}

Spryker employees never ask for credentials. We delete and don’t work with any credentials received if they were not shared using the process outlined below. Legit use cases for sharing secrets are very limited, so when in doubt, please discuss the issue with us before sharing your secret.

{% endinfo_block %}

## Prerequisites
Register in our [Slack Community](https://spryker.com/en/support/sprykercommunity/).

## Process for sharing the secrets

Please stick to the following process when sharing secrets with the Spryker Support Team:

1. Create a secret message by navigating to [One-Time Secret](https://onetimesecret.com/) and inserting your secret there. Make sure you configure a passphrase for your secret.

{% info_block warningBox %}

Do not include information on what the secret content is for. For example, if you insert a password, do not provide the username for it. Also, don’t include any information on where and how the secret should be used. Please also create a new link for every individual secret you want to share.

{% endinfo_block %}

2. Send the created link to your secret to our Support Team. If you already opened a case, you can include it in the email response. If you have not yet created a case, you can do so via the [Spryker Support portal](https://support.spryker.com/). Here you can include a description of where and how the secrets should be used. Also, make sure to include your name in Slack.

We will name a Support/DevOps representative that will contact you and ask for the passphrase for your link as soon as it is needed. Always check that the person contacting you for the phrase is the one that we named. The secrets in the link will not be stored or saved (unless you share secrets that should be configured in the AWS parameter store).
