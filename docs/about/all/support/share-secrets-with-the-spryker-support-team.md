---
title: Share secrets with the Spryker Support Team
description: Learn the secure steps for sharing secrets or credentials with the Spryker Support Team, ensuring sensitive information is handled safely and appropriately.
last_updated: Jun 16, 2021
template: concept-topic-template
keywords: username password credentials
originalLink: https://documentation.spryker.com/2021080/docs/how-to-share-secrets-with-the-spryker-support-team
originalArticleId: a52e18a4-1aee-4f08-a132-82940f1f207e
redirect_from:
- /docs/scos/user/intro-to-spryker/support/share-secrets-with-the-spryker-support-team.html
---

This document explains how to securely share secrets and credentials with the [Spryker Support Team](/docs/about/all/support/getting-support.html). We recommend avoiding sharing secrets whenever possible. If you have to share them, do it only as described in this document.

{% info_block warningBox %}

We work only with credentials shared in the way described below and delete credentials shared in any other way. Don't share credentials or secrets unless we specifically request them because they are not needed in most cases.

{% endinfo_block %}

## Retrieve a secret
If you have received a Secret Link from our Team, please check the related case's Link Passphrase field. In it you should find the password for the link. Please let us know immediately if the passphrase does not work.

## Share a secret

1. Using [One-Time Secret](https://onetimesecret.com/), create a secret message by entering the secret and configuring a passphrase.

{% info_block warningBox %}

Don't include information on what the secret content is for—for example, if you insert a password, don't provide the username for it. Also, don’t include any information about where and how to use the secret.

Create a new link for every individual secret you want to share.

{% endinfo_block %}

2. In the **Case Details**, in the **Link Passphrase** field add the secret link.
3. Create a comment on the case that the team must retrieve the secret link for.
3. The team retrieves the link and then clears the field and provides a comment.
4. Add the passphrase to the link in the same — now empty— field.
