---
title: Managing File Tree
originalLink: https://documentation.spryker.com/v2/docs/managing-file-tree
redirect_from:
  - /v2/docs/managing-file-tree
  - /v2/docs/en/managing-file-tree
---

The File Tree section is used to upload the files, create/delete the directories and manage the files/directories order.

This article describes the procedures that you can follow to manage the file tree.
***
To start managing file tree elements, navigate to the **File Manager > File Tree** section.
***
**Prerequisites**
If there are no MIME types defined in the MIME Type Settings section, you will be able to download any type of file. If you have at least one MIME type defined as Is Allowed, you will be able to download only the files of that type, unless you add more allowed types. See [Managing MIME Type Settings](/docs/scos/dev/user-guides/201903.0/back-office-user-guide/file-manager/managing-mime-t) for more details.
***
## Creating a File Directory
To preserve a logical structure of the files that are going to be uploaded to the system and used for the marketing campaigns, you should define the structure according to which your files are going to be stored. Structured marketing campaign materials will also help the other Marketing Team members to work with the File Manager section.

To create a file directory:
1. On the **Overview of File Tree** page, click **Create File Directory**  in the top right corner.
2. On the **Create Directory Element** page, enter the name of your directory to the **Name** field and populate the **Title** field for all locales. 
3. Once done, click **Save**.

The created folder will be displayed on the left of the **Overview of File Tree** page.
You can create multilevel structures by changing the directory order.
***
## Reordering Directories

To reorder directories, drag and drop them to the necessary place.
![Reordering directories](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/File+Manager/Managing+File+Tree/reordering-directories.gif)

Once you are satisfied with the order, click **Save Order**.
***
## Deleting Directories
To delete a directory:
1. Click on the directory in the **File Tree** section.
2. Click **Delete Directory** in the top right corner of the page.
3. On the system message pop-up, click **Confirm** to confirm the action.
![Deleting directories](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/File+Manager/Managing+File+Tree/deleting-directories.gif)
***
## Uploading Files
Once you have set up the directory structure you can proceed with uploading files to those folders.

To upload a file:
1. Click on the directory to which a file needs to be uploaded.
2. In the top right corner of the **Files List** section, click **Add File**.
3. On the **Add a file** page, do the following:
    * Enter the file name. 
        You can leave this field blank and select the use file name checkbox. In this case, the uploaded file name is going to be used.
     * Click **Browse...** and select the file to upload.
     * Select the **Use file name** checkbox if you want the file name be used instead of the entered file name.
     * Optionally, populate the **Alt** and **Title** fields for each locale.
4. Once done, click **Save**.
The file is uploaded to the selected folder.
***
## Managing Files
Once the file is uploaded, you can manage it from two locations: 
* File List (see [Managing File List](/docs/scos/dev/user-guides/201903.0/back-office-user-guide/file-manager/managing-file-l) for more details)
* File Tree

**To manage a file:**
1. Navigate to the folder where the file locates and click on it.
2. In the **Files list** section, select one of the following in the _Actions_ column for a file:
    1. **View** to view the file. You are redirected to the View file page where you can download it by clicking **Download** in the _Actions_ column.
    2. **Edit** to edit the file. You will be redirected to the Edit file page where you can update the file information. You can even download another file instead of the one that is already in use. 
    3. **Delete** to delete a file.
