---
title: Manage file list
description: Use the procedures to view, edit, and delete files from the system in the Back Office.
last_updated: Jul 9, 2021
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/managing-file-list
originalArticleId: b5a71151-eac1-4dd9-84e5-28ce7beb346a
redirect_from:
  - /2021080/docs/managing-file-list
  - /2021080/docs/en/managing-file-list
  - /docs/managing-file-list
  - /docs/en/managing-file-list
  - /docs/scos/user/back-office-user-guides/202200.0/content/file-manager/managing-file-list.html
  - /docs/scos/user/back-office-user-guides/202204.0/content/file-manager/managing-file-list.html  
  - /docs/pbc/all/content-management-system/202311.0/manage-in-the-back-office/manage-file-list.html
  - /docs/pbc/all/content-management-system/202204.0/base-shop/manage-in-the-back-office/manage-file-list.html  
related:
  - title: Managing File Tree
    link: docs/pbc/all/content-management-system/page.version/base-shop/manage-in-the-back-office/manage-file-tree.html
  - title: Add and edit MIME types
    link: docs/pbc/all/content-management-system/page.version/base-shop/manage-in-the-back-office/add-and-edit-mime-types.html
  - title: File Manager feature overview
    link: docs/pbc/all/content-management-system/page.version/base-shop/file-manager-feature-overview.html
---

The *File List* section is a way to quickly review all the files from the file tree.

## Prerequisites

In the *File List* section, you can manage files that have already been uploaded to the file tree.

To start working with the file list, navigate to **File Manager>File List**.

## Viewing files

*View file* lets you view and download a file.

To view a file:

1. On the *File List* page in the *Actions* column, click **View**.
2. On the *View File* page, you see the version, file name, the date and time when the file was uploaded.

{% info_block infoBox "Info" %}

You can maintain multiple versions of any file. See [Versions](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/file-manager-feature-overview.html#versions) for more information. [Editing files](#editing-files) below explains how to add multiple versions of a file.

{% endinfo_block %}

### Tips and tricks

On this page, you can download the file:

1. Click **Download** in the *Actions* column.
2. Follow the download pop-up instructions.

## Editing files

*Edit file* lets you edit a file's attributes, upload multiple versions of a file, and manage file versions.

To edit a file's attributes:

1. On the *File List* page in the *Actions* column, click **Edit**.
2. On the *Edit File* page, on the *File* tab, update the attributes.
3. Click **Save**.

 To upload another version of a file:

 1. In the *File Upload* section, click **Choose File**.
 2. Optionally change the file name and the *Alt* and *Title* fields for each locale.
 3. Click **Save**.

{% info_block infoBox "Creating a new version of a file" %}

- A new version is created when you upload a new file.
- If you only edit the attributes, no new version is created.

{% endinfo_block %}

The *Edit File* page also displays an additional tab named *File versions*. The *File versions* tab lists the version of the file and lets you manage versions of a file.

### Tips and tricks

In the *File versions* tab, you can manage versions of a file by:

- Removing unneeded versions. To permanently remove a version of the file, click **Delete** in the *Actions* column. Before deleting, read [Deleting files](#deleting-files) below.
- Downloading a specific version of the file. Click **Download** in the *Actions* column.

## Deleting files

If the file is no longer needed, you can permanently delete it from the system.

To delete a file, in the *Actions* column, click **Delete** for a file you want to remove.

{% info_block warningBox "Warning" %}

Selecting **Delete** in the *Actions* column immediately deletes the file. There is no confirmation message before the delete occurs. The delete action cannot be undone.

{% endinfo_block %}
