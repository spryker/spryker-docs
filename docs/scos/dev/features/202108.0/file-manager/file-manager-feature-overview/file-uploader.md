---
title: File uploader
originalLink: https://documentation.spryker.com/2021080/docs/file-uploader
redirect_from:
  - /2021080/docs/file-uploader
  - /2021080/docs/en/file-uploader
---

The **File Uploader** feature is helpful when a Back Office user needs to add instructions or additional documentation to the product as an attachment. These files can further be downloaded to visitors' PCs.

A Back Office user can manage the media files in the **Back Office: File Manager** menu that comprises 3 submenus:

* File Tree
* File List
* MIME Type Settings

## File Tree
The files in the Back Office are kept in a tree-like structure. A Store Administrator can create folders under **File Directories Tree** in a hierarchical system and manage the folders by dragging and dropping them in the file tree.

{% info_block infoBox %}
The files are kept in folders.
{% endinfo_block %}

The changes will take effect after **Save** is selected.
![File tree](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Media+Management/File+Uploader/File+Uploader+Feature+Overview/file-tree.png){height="" width=""}

Every folder within File Directories Tree can be deleted by selecting **Delete Directory**.

{% info_block infoBox %}
If the folder, that is being deleted, contains files in it, the files will automatically move to the parent directory. Parent directory (File Directories Tree
{% endinfo_block %} cannot be deleted.)

### Upload the Files to the Back Office
To upload a file to a particular directory follow the steps:

1. Select the folder you are going to upload files to in the File Directories Tree.
2. In the right section, click on **Add File**:
![Upload files to the Back Office](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Media+Management/File+Uploader/File+Uploader+Feature+Overview/add-file.png){height="" width=""}

3. On the **Add a File page**:
* In the **File name** field, enter the name of the file that will be displayed in the shop.
* In the **File upload** field, click **Choose File** and from your local storage, select the file you are going to upload to the Back Office.

{% info_block infoBox %}
If Use file name option is selected, then File Name field is not required and will be disregarded. In this case, the file will be uploaded with its original name (the one you see in your local storage
{% endinfo_block %}.)

{% info_block warningBox %}
A Store Administrator cannot upload an empty text file.
{% endinfo_block %}
* Add translations for the File Name for every locale, if necessary.
![Add translations](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Media+Management/File+Uploader/File+Uploader+Feature+Overview/add-file+menu.png){height="" width=""}

4. After the file is uploaded it is available in the Files list section in the directory: 
![Files list](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Media+Management/File+Uploader/File+Uploader+Feature+Overview/files-list.png){height="" width=""}

## File List
File List submenu represents a table listing all the files uploaded to the Back Office:
![File list](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Media+Management/File+Uploader/File+Uploader+Feature+Overview/file-list.png){height="" width=""}

A Back Office user can perform the following actions to files:

* **View** - shows the versions the file has.
* **Edit** - You can re-upload an updated version of the file and edit its name.
* **Delete** - delete the file in the directory.

### Versions
**File Uploader** feature allows a Store Administrator to have several versions for every file.

For example, at first you uploaded _**Instruction1.txt**_ file (**_v.1_**), then you updated and re-uploaded it to the Administration Interface as **_v.2_**.
After that you decided that the image instruction would be more useful in this case and uploaded **_Instruction.png_** (**_v.3_**) to the file.

Thus, you will have 3 versions of a file available: 2 text instructions and one image instruction.
![File versions](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Media+Management/File+Uploader/File+Uploader+Feature+Overview/file-versions.png){height="" width=""}

By default, the latest version of all available will be shown to the buyer in the shop application.

{% info_block infoBox %}
A Store Administrator can **Download** and **Delete** the versions.
{% endinfo_block %}

### Add a File to the Shop App
{% info_block errorBox %}
Make sure that the File Uploader feature is enabled.
{% endinfo_block %}

To add a file to the Shop App, follow the steps below:

1. Navigate to the **Back Office: Content Management > Pages**, select the required CMS Page and click **Edit Placeholders**:

2. In the **Content** field, add **cms_file** widget:

3. You will get the string `{% raw %}{{{% endraw %} cms_file('identifier'){% raw %}}}{% endraw %}` where you need to insert the _file ID_ instead of _identifier_:

4. Save the changes and publish the page: 
5. Check the published page in the Shop Application:
The file is available as a download link to the visitor shop visitor.
{% info_block errorBox %}
The shop visitor will download the latest version of the file.
{% endinfo_block %}

## MIME Type Settings
**MIME Type Settings** submenu allows a Store Administrator to define the file types that can be uploaded to the Administration Interface based on their nature and format.

{% info_block infoBox %}
[MIME type](https://en.wikipedia.org/wiki/Media_type
{% endinfo_block %} is a standard that describes the contents of the files. MIME type will help the browser to determine how it will process a document. For example, if the MIME type is set as "text/html", then a client will open the document in Notepad, if the MIME type is set as "image/jpeg", then the client will open it via image viewer program.)
![MIME type settings](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Media+Management/File+Uploader/File+Uploader+Feature+Overview/mime-type-settings.png){height="" width=""}

{% info_block warningBox %}
Only files with the MIME types ticked in "Is Allowed" column will be allowed for uploading to the Administration Interface.
{% endinfo_block %}

Most popular file types that a shop owner can allow for uploading in the Administration Interface are:

| Type | Description | Example of MIME Type |
| --- | --- | --- |
| text | Represents any document that contains text and is theoretically human readable | `text/plain, text/html, text/css, text/javascript`<br>For text documents without specific subtype, text/plain should be used.|
|image | Represents any kind of images | `image/gif, image/png, image/jpeg, image/bmp, image/webp` |
| audio | Represents any kind of audio files | `audio/midi, audio/mpeg, audio/webm, audio/ogg, audio/wav` |
| video | Represents any kind of video files | `video/webm, video/ogg` |

{% info_block infoBox %}
To check the full list of MIME types, refer to the article.
{% endinfo_block %}



## If you are:

<div class="mr-container">
    <div class="mr-list-container">
        <!-- col2 -->
        <div class="mr-col">
            <ul class="mr-list mr-list-blue">
                <li class="mr-title"> Back Office User</li>
                <li><a href="https://documentation.spryker.com/docs/managing-file-tree#uploading-files" class="mr-link">Upload files to the Back Office</a></li>
                <!---<li><a href="https://documentation.spryker.com/docs/adding-content-item-widgets-to-pages-and-blocks#adding-content-item-widgets-to-pages" class="mr-link">Add a File to the Shop Application</a></li>-->
            </ul>
        </div>
    </div>
</div>
