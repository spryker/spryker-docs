---
title: File Manager feature overview
description: Reduce your bounce rate and create an enhanced shopping experience by providing impactful visuals while maintaining fast response times.
last_updated: Sep 2, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/media-management
originalArticleId: 55cbe64d-f656-4d8d-a3d5-c32998acb947
redirect_from:
  - /docs/scos/user/features/202001.0/file-manager-feature-overview/file-uploader.html
  - /docs/scos/user/features/202200.0/file-manager-feature-overview/file-manager-feature-overview.html
  - /docs/scos/dev/feature-walkthroughs/202204.0/file-manager-feature-walkthrough.html
  - /docs/scos/user/features/202200.0/file-manager-feature-overview/file-uploader.html  
  - /docs/scos/user/features/202204.0/file-manager-feature-overview/file-uploader.html
  - /docs/scos/user/features/202204.0/file-manager-feature-overview/asset-management.html   
  - /docs/pbc/all/content-management-system/202311.0/file-manager-feature-overview.html
  - /docs/pbc/all/content-management-system/202204.0/base-shop/file-manager-feature-overview.html
  - /docs/pbc/all/content-management-system/latest/base-shop/file-manager-feature-overview.html
---

The *File Manager* feature lets you upload and manage your assets (media files) effectively. You can do the following:
- Upload and delete files in bulk.
- Add and delete files manually through the Back Office.
- Maintain multiple versions of individual files.
- Drag and drop to create and update your assets' file structure.
- Manage files from a list view.

A Back Office user can upload files then add them to CMS pages and blocks to display on the Storefront.

Apart from images, you can add many different types of assets to your project, including but not limited to the following ones:
- Presentations
- PDF documents
- Graphics
- Banners

Digital assets let content managers create rich, compelling, and attractive content for your customers. They also let you offer your customers additional information like user manuals or instructions.

## File tree

The files in the Back Office are kept in a tree-like structure. A Back Office user can create folders (also known as directories) under *File Directories Tree* and organize them into a hierarchical system by dragging and dropping them in the file tree.

The changes take effect after **Save** is selected.
![File tree](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/digital-asset-management/pbc-file-tree.png)

A Back Office user can delete any folder within *File Directories Tree* by selecting **Delete Directory**. If the deleted folder contains files, those files are automatically moved to the parent directory. Parent directory in *File Directories Tree* cannot be deleted.

## File List

*Files List* displays all the files uploaded to the Back Office in a table view. The Back Office user can view, edit, and delete files here.
![File list](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Media+Management/File+Uploader/File+Uploader+Feature+Overview/file-list.png)


## Versions

*File Uploader* lets you store multiple versions of any file.

For example: a Back Office user uploads Instruction1.txt file (v.1). The user then updates and reuploads the .txt file (v.2). Next, the user decides that the image instruction is more useful and uploads Instruction.png (v.3).

There are now three versions of the file available: two text files and one image file.
![File versions](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Media+Management/File+Uploader/File+Uploader+Feature+Overview/file-versions.png)

By default, the latest version of the file is displayed to the buyer in the shop application.

## MIME Type Settings

*MIME Type Settings* let you define the file types that can be uploaded to the Back Office.


[MIME type](https://en.wikipedia.org/wiki/Media_type) is a standard that describes the contents of the files. MIME type indicates how a web browser will process a file. For example, if the MIME type is set as `text/html`, the document will open in Notepad. If the MIME type is set as `image/jpeg`, the document will open with an image viewer program.

![MIME type settings](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Media+Management/File+Uploader/File+Uploader+Feature+Overview/mime-type-settings.png)

The Back Office user can only upload files with a MIME type that is selected in the *Is Allowed* column. If no MIME types are defined, files of any type can be uploaded. If you add at least one MIME type, only the files of the added types can be uploaded.

The most popular file types that shop owners allow to be uploaded to the Back Office are:

| TYPE | DESCRIPTION | EXAMPLE OF MIME TYPE |
| --- | --- | --- |
| text | Represents any document that contains text and is theoretically human readable | `text/plain`, `text/html`, `text/css`, `text/javascript`<br>For text documents without specific subtype, `text/plain` must be used.|
|image | Represents any kind of images | `image/gif`, `image/png`, `image/jpeg`, `image/bmp`, `image/webp` |
| audio | Represents any kind of audio files | `audio/midi`, `audio/mpeg`, `audio/webm`, `audio/ogg`, `audio/wav` |
| video | Represents any kind of video files | `video/webm`, `video/ogg` |


## Asset types

There are two types of assets in the Spryker Commerce OS: dynamic and static.

*Dynamic assets* are files added during content and product creation: adding or changing CMS pages and adding product images.

*Static assets* are images, fonts, CSS, JS, HTML, and PHP files that are available and used by default. All static asset files are split into folders according to the application they are used for: Zed, Yves, or Glue. PHP and HTML files stored in static asset directories are used for handling errors and showing the platform maintenance messages.

{% info_block infoBox %}

Except for the error handling files, there are no Glue-related assets.

{% endinfo_block %}

### Location of static assets

By default, static assets are stored locally in the following folders:

- `public/Yves/assets/`
- `public/Zed/assets/`

For organizational or cost and speed optimization purposes, the location of static assets can be changed to an external source.

The following environment variables are used for that:

- `SPRYKER_ZED_ASSETS_BASE_URL`
- `SPRYKER_YVES_ASSETS_URL_PATTERN`

See [Integrating custom location for static assets](/docs/dg/dev/integrate-and-configure/integrate-custom-location-for-static-assets.html) for more details.

## Related Business User documents

|BACK OFFICE USER GUIDES|
|---|
| [Manage file tree](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/manage-in-the-back-office/manage-file-tree.html)   |
| [Manage file list](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/manage-in-the-back-office/manage-file-list.html) |
| [Add and edit MIME types](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/manage-in-the-back-office/add-and-edit-mime-types.html) |

## Related Developer documents

| UPGRADE GUIDES| DATA IMPORT	|
| - | - |
| [Upgrade the FileManager module](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-filemanager-module.html) | ["Import file details: mime_type.csv"](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-mime-type.csv.html) |
| [Upgrade the FileManagerStorage module](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-filemanagerstorage-module.html) | |
| [Upgrade the FileManagerWidget module](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-filemanagerwidget-module.html) | |
