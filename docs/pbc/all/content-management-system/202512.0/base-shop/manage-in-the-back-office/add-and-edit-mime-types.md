---
title: Add and edit MIME types
description: Learn how to add and edit MIME types in the Spryker Back Office for different file extensions that can be used in your Spryker projects.
last_updated: Aug 10, 2021
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/managing-mime-type-settings
originalArticleId: 21caa74e-d4c1-4ba6-9cf7-1cd60f7368e8
redirect_from:
  - /2021080/docs/managing-mime-type-settings
  - /2021080/docs/en/managing-mime-type-settings
  - /docs/managing-mime-type-settings
  - /docs/en/managing-mime-type-settings
  - /docs/scos/user/back-office-user-guides/202200.0/administration/mime-type-settings/managing-mime-type-settings.html
  - /docs/scos/user/back-office-user-guides/202204.0/administration/mime-type-settings/managing-mime-type-settings.html
  - /docs/scos/user/back-office-user-guides/202204.0/administration/add-and-edit-mime-types.html   
  - /docs/pbc/all/content-management-system/202311.0/manage-in-the-back-office/add-and-edit-mime-types.html
  - /docs/pbc/all/content-management-system/202204.0/base-shop/manage-in-the-back-office/add-and-edit-mime-types.html   
related:
  - title: Managing File Tree
    link: docs/pbc/all/content-management-system/latest/base-shop/manage-in-the-back-office/manage-file-tree.html
  - title: Managing File List
    link: docs/pbc/all/content-management-system/latest/base-shop/manage-in-the-back-office/manage-file-list.html
  - title: File Manager feature overview
    link: docs/pbc/all/content-management-system/latest/base-shop/file-manager-feature-overview.html
---

This document describes how to define what files types can be uploaded to a shop.

## Prerequisites

To manage MIME types, go to **Administration&nbsp;<span aria-label="and then">></span> MIME Type Settings**.

## Add a MIME type

1. On the *MIME Type Setting* page, click **Add MIME type**.
2. On the *Add MIME type* page, enter a *MIME TYPE*.
3. Optional: Enter a *COMMENT*.
4. Select *IS ALLOWED* to allow this file type to be uploaded.
5. Click **Save**.
    This opens the *MIME Type Setting* page with a success message displayed. The MIME type you just added is displayed in the list.

## Edit a MIME type

1. On the *MIME Type Setting* page, next to the MIME type you want to edit, click **Edit**.
2. On the *Edit MIME type* page, make your changes.
3. Optional: Enter a *COMMENT*.
4. To allow uploading of this file type, select *IS ALLOWED*.
5. Click **Save**.
    This opens the *MIME Type Setting* page with a success message displayed. The changes are reflected in the list.

## Reference information: MIME TYPE

The MIME Type Settings submenu lets a Back Office user define the file types that can be uploaded to the Back Office based on their nature and format.

If no MIME types are defined, files of any type can be uploaded. If you add at least one MIME type, only files with the MIME types checked in the *Is Allowed* column are allowed to be uploaded to the Back Office.

[MIME (Multipurpose Internet Mail Extensions) type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types) is a standard that describes the contents of the files. MIME type indicates how a browser will process a document. For example, if the MIME type is set as image/jpeg, then the browser opens it with an image viewer program.

A MIME type consists of a type and a subtype divided by a slash: type/subtype. The type represents the general category to which the data type belongs, like video or text. The subtype represents an exact kind of data of the specified type. For example, image/png.

## Reference information: COMMENT

Optionally, the user can add any information about a MIME type.

## Reference information: IS ALLOWED

Defines whether files with a specific MIME type can be uploaded. This setting is used for effective management of MIME types. You can add different MIME types and enable or disable them as needed. This is more efficient than adding or deleting MIME types when you need to change MIME type settings.
