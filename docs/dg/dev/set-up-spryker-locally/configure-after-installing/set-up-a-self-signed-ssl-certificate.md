---
title: Set up a self-signed SSL certificate
description: Learn how to import a self-signed SSL certificate to access your instance via a secure connection.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/setting-up-a-self-signed-ssl-certificate
originalArticleId: 2991edda-38a5-4dd9-b03c-f87b05a32949
redirect_from:
- /docs/scos/dev/set-up-spryker-locally/configure-after-installing/set-up-a-self-signed-ssl-certificate.html
---


## This HowTo describes the steps to import a self-signed SSL (Secure Sockets Layer) certificate.

A *self-signed SSL certificate* is an identity certificate that is signed by the same entity whose identity it certificates. Such a certificate is used only for development purposes. For production purposes, we recommend generating a valid SSL certificate signed by an official certification center like [letsEncrypt](https://letsencrypt.org/).

There is a self-signed SSL certificate shipped with Spryker. It is located in `docker/deployment/default/spryker_ca.crt.` To access your instance via a secure connection, add the certificate to trusted authorities in the host system.

## This HowTo describes the steps to use a custom SSL certificate (Secure Sockets Layer).

To use *your own custom SSL certificate* with Spryker, place two files in the `$HOME/.spryker/certs/` folder:

- **default.crt** – your public X.509 certificate
- **default.key** – the matching private key

> **Note:**
> > Spryker’s Docker setup looks specifically for `default.crt` and `default.key` in `$HOME/.spryker/certs/`.
> >
> > Secure your private key so only you can read it:
> >
> > ```bash
> > chmod 600 "$HOME/.spryker/certs/default.key"
> > ```
> >
> > If you have an intermediate CA chain, concatenate them (leaf first, then intermediates) into `default.crt`:
> >
> > ```bash
> > cat leaf.crt intermediate.crt >> "$HOME/.spryker/certs/default.crt"
> > ```
> >

With those in place, Spryker will load your custom cert/key; otherwise it falls back to the built-in `spryker_ca.crt`.

Depending on the OS, follow the instructions:
- [Set up a self-signed SSL certificate on Windows](#set-up-a-self-signed-ssl-certificate-on-windows)
- [Set up a self-signed SSL certificate on Linux](#set-up-a-self-signed-ssl-certificate-on-linux)
  - [Set up a self-signed SSL certificate in Google Chrome on Linux](#set-up-a-self-signed-ssl-certificate-in-google-chrome-on-linux)
  - [Set up a self-signed SSL certificate in Firefox on Linux](#set-up-a-self-signed-ssl-certificate-in-firefox-on-linux)
- [Set up a self-signed SSL certificate on MacOS](#set-up-a-self-signed-ssl-certificate-on-macos)

## Set up a self-signed SSL certificate on MacOS

To add `spryker_ca.crt` to trusted authorities on MacOS, follow the steps:

1. Open Keychain Access.
2. Select **File&nbsp;<span aria-label="and then">></span> Import Items**.
3. Select `spryker_ca.crt` and click **Open**.
4. Go to the *Certificates* category.
5. Right-click the *Spryker* certificate and select **Get Info**.
![Get info in Safari and Chrome](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/Docker+HowTos/HowTo+Install+Self-Signed+SSL+Certificates/get-info.png)

6. Open the **Trust** drop-down menu.
7. In the **When using this certificate** drop-down menu, select **Always Trust**.
![Make the certificate trusted](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/Docker+HowTos/HowTo+Install+Self-Signed+SSL+Certificates/always-trust.png)

{% info_block warningBox "Verification" %}

Ensure that you can open Yves, Zed, and Glue without warnings via HTTPS.
![HTTPS verification](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/Docker+HowTos/HowTo+Install+Self-Signed+SSL+Certificates/https-verification.png)

{% endinfo_block %}

## Set up a self-signed SSL certificate on Linux

On Linux, you can add the certificate to trusted authorities only in a browser. Below, you can find instructions for importing the certificate in Google Chrome and Firefox.

### Set up a self-signed SSL certificate in Google Chrome on Linux

To add `spryker_ca.crt` to trusted authorities in Google Chrome on Linux, follow the steps:

1. Click **More**![google-chrome-more-button](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/Docker+HowTos/HowTo+Install+Self-Signed+SSL+Certificates/chrome-more-button.png).
2. Select **Settings**.
3. On the *Settings* page, go to **Advanced** > **Manage certificates**.
4. Go to the **Authorities** tab.
5. Select **Import**.
6. Select `spryker_ca.crt` and click **Open**.
7. Select **Trust this certificate for identifying websites**.
8. Click **OK** to save the changes.
9. Restart the browser.

{% info_block warningBox "Verification" %}

Ensure that you can open Yves, Zed, and Glue without warnings via HTTPS.
![HTTPS verification](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/Docker+HowTos/HowTo+Install+Self-Signed+SSL+Certificates/https-verification.png)

{% endinfo_block %}

### Set up a self-signed SSL certificate in Firefox on Linux

To add `spryker_ca.crt` to trusted authorities in Firefox on Linux, follow the steps:

1. Click **Open menu** ![firefox-menu-button](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/Docker+HowTos/HowTo+Install+Self-Signed+SSL+Certificates/firefox-menu-button.png).
2. Select **Options**.
3. On the *Options* page, select **Privacy & Security**.
4. Scroll down to the **Certificates** section.
5. Click **View Certificates**.
6. In the **Authorities** tab, click **Import**.
7. Select `spryker_ca.crt`.
8. Select **Trust this CA to identify websites.**
![Select file in Firefox](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/Docker+HowTos/HowTo+Install+Self-Signed+SSL+Certificates/select-file.png)
9. Click **OK** to save the changes.

{% info_block warningBox "Verification" %}

Ensure that you can open Yves, Zed, and Glue without warnings via HTTPS.
![HTTPS verification](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/Docker+HowTos/HowTo+Install+Self-Signed+SSL+Certificates/https-verification.png)

{% endinfo_block %}


## Set up a self-signed SSL certificate on Windows

To add `spryker_ca.crt` to trusted authorities on Windows, follow the steps:

1. To open the **Run** window, press <kbd>Win+R</kbd>.
2. In the **Open** field, enter `mmc` and press <kbd>Enter</kbd>.
3. To confirm the action, click **Yes**.
4. From the **File** menu, select **Add/Remove Snap-in...**.

{% info_block infoBox %}

Alternatively, to open the **Add or Remove Snap-ins** window, press <kbd>Ctrl+M</kbd>.

{% endinfo_block %}

5. In the **Available snap-ins** list, select **Certificates**.
6. Select **Add >**.
![Add certs](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/Docker+HowTos/HowTo+Install+Self-Signed+SSL+Certificates/add-certs.png)

7. Click **Certificates (local computer)&nbsp;<span aria-label="and then">></span> Trusted Root Authorities**.
8. Right-click the **Certificates** folder and select **All Tasks&nbsp;<span aria-label="and then">></span> Import**.
9. Select the `spryker_ca.crt` file and click **OK**.

{% info_block warningBox "Verification" %}

Ensure that you can open Yves, Zed, and Glue without warnings via HTTPS.

![HTTPS verification](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/Docker+HowTos/HowTo+Install+Self-Signed+SSL+Certificates/https-verification.png)

{% endinfo_block %}
