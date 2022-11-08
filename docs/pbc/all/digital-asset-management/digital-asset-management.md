---
title: Digital Asset Management
description: Reduce your bounce rate and create an enhanced shopping experience by providing impactful visuals while maintaining fast response times.
last_updated: Sep 2, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/media-management
originalArticleId: 55cbe64d-f656-4d8d-a3d5-c32998acb947
redirect_from:
  - /2021080/docs/media-management
  - /2021080/docs/en/media-management
  - /docs/media-management
  - /docs/en/media-management
  - /docs/scos/user/features/202200.0/file-manager-feature-overview/file-manager-feature-overview.html
  - /docs/scos/dev/feature-walkthroughs/202204.0/file-manager-feature-walkthrough.html
  - /docs/scos/user/features/202200.0/file-manager-feature-overview/file-uploader.html  
  - /docs/scos/user/features/202204.0/file-manager-feature-overview/file-uploader.html
  - /docs/scos/user/features/202204.0/file-manager-feature-overview/asset-management.html   
---

The *Digital Asset Management* capability lets you upload and manage your assets effectively.

A Back Office user can upload files and add them to CMS pages and blocks to display on the Storefront.

Apart from images, you can add a variety of different types of assets to your project, including but not limited to:
* Presentations
* PDF documents
* Graphics
* Banners

Digital assets let content managers create rich, compelling, and attractive content for your customers. They also allow you to offer your customers additional information like user manuals or instructions.

## File tree

The files in the Back Office are kept in a tree-like structure. A Back Office user can create folders under **File Directories Tree** in a hierarchical system and manage the folders by dragging and dropping them in the file tree.

The changes take effect after **Save** is selected.
![File tree](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Media+Management/File+Uploader/File+Uploader+Feature+Overview/file-tree.png)

Every folder within File Directories Tree can be deleted by selecting **Delete Directory**. If the folder that is being deleted contains files in it, the files are automatically moved to the parent directory. Parent directory File Directories Tree cannot be deleted.

## File List

File List submenu represents a table listing all the files uploaded to the Back Office:
![File list](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Media+Management/File+Uploader/File+Uploader+Feature+Overview/file-list.png)


## Versions

**File Uploader** feature lets a Back Office user have several versions for every file.

For example, at first, you upload `Instruction1.txt` file (`v.1`), then you update and reupload it to the Back Office as `v.2`.
After that, you decide that the image instruction is more useful in this case and upload `Instruction.png` (`v.3`) to the file.

Thus, you have three versions of a file available: two text instructions and one image instruction.
![File versions](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Media+Management/File+Uploader/File+Uploader+Feature+Overview/file-versions.png)

By default, the latest version of all available is shown to the buyer in the shop application.

## MIME Type Settings

The **MIME Type Settings** submenu lets a Back Office user define the file types that can be uploaded to the Back Office based on their nature and format.

[MIME type](https://en.wikipedia.org/wiki/Media_type) is a standard that describes the contents of the files. MIME type helps browsers decide how to process a document. For example, if the MIME type is set as `text/html`, then a client opens the document in Notepad, if the MIME type is set as `image/jpeg`, then the client opens it with the image viewer program.

![MIME type settings](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Media+Management/File+Uploader/File+Uploader+Feature+Overview/mime-type-settings.png)

Only files with the MIME types ticked in the **Is Allowed** column are allowed for uploading to the Administration Interface.

Most popular file types that a shop owner can allow uploading to the Back Office are:

| TYPE | DESCRIPTION | EXAMPLE OF MIME TYPE |
| --- | --- | --- |
| text | Represents any document that contains text and is theoretically human readable | `text/plain`, `text/html`, `text/css`, `text/javascript`<br>For text documents without specific subtype, `text/plain` must be used.|
|image | Represents any kind of images | `image/gif`, `image/png`, `image/jpeg`, `image/bmp`, `image/webp` |
| audio | Represents any kind of audio files | `audio/midi`, `audio/mpeg`, `audio/webm`, `audio/ogg`, `audio/wav` |
| video | Represents any kind of video files | `video/webm`, `video/ogg` |


## Asset types

There are two types of assets in the Spryker Commerce OS: dynamic and static.

*Dynamic assets* are files added during content and product creation: adding or changing CMS pages and adding product images.

*Static assets* are images, fonts, CSS, JS, and HTML and PHP files that are available and used by default. All the files are split into folders according to the application they are used for: Zed, Yves, or Glue. PHP and HTML files stored in static asset directories are used for handling errors and showing the platform maintenance messages.

{% info_block infoBox %}

Except for the error handling files, there are no Glue-related assets.

{% endinfo_block %}

### Location of assets

By default, static assets are stored locally in the following folders:

* `public/Yves/assets/`
* `public/Zed/assets/`

For organizational or cost and speed optimization purposes, the location of static assets can be changed to an external source.

The following environment variables are used for that:

* `SPRYKER_ZED_ASSETS_BASE_URL`
* `SPRYKER_YVES_ASSETS_URL_PATTERN`

Check [Integrating custom location for static assets](/docs/scos/dev/technical-enhancement-integration-guides/integrating-custom-location-for-static-assets.html) for more details.


## Related Business User articles

| OVERVIEWS |BACK OFFICE USER GUIDES|
| - | - |
| [Asset management](/docs/pbc/all/digital-asset-management/digital-asset-management.html) | [Upload files to the Back Office](/docs/pbc/all/digital-asset-management/manage-in-the-back-office/manage-file-tree.html#uploading-files) |

## Related Business User articles

|BACK OFFICE USER GUIDES|
|---|
| [Get a general idea of asset measurement](/docs/scos/user/features/{{site.version}}/file-manager-feature-overview/asset-management.html)  |
| [Get a general idea of the file uploader](/docs/scos/user/features/{{site.version}}/file-manager-feature-overview/file-uploader.html)  |
| [Manage file tree](/docs/pbc/all/digital-asset-management/manage-in-the-back-office/manage-file-tree.html)   |
| [Manage file list](/docs/pbc/all/digital-asset-management/manage-in-the-back-office/manage-file-list.html) |
