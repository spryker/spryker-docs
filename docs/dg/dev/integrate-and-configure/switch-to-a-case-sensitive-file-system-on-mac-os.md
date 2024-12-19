---
title: Switch to a case-sensitive file system on Mac OS
description: Use the guide to change the case-sensitive file system on Mac OS within your Spryker based projects.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/ht-case-sensitive-file-system-mac
originalArticleId: e2843984-3d25-4bef-b0d3-d7eb764591bd
redirect_from:
- /docs/scos/dev/tutorials-and-howtos/howtos/howto-handle-case-sensitive-file-system-on-mac-os.html
---

By default, Mac OS uses a case-insensitive file system to support compatibility with applications (for example, Photoshop) provided for the operating system. The file system itself is capable of working in a case-sensitive mode. There are three options on how to change case sensitivity:
1. Repartition the entire hard drive with case sensitivity turned on.
2. Create a new partition and re-format only this new partition with the case-sensitive file system.
3. Create a disk image, format that image with the case-sensitive file system, and mount this disk image.

Options 1 and 2 require tampering with an existing hard drive that contains your operating system. Option 3 is the least destructive and requires minimal effort.

## Create the disk image

You can use Mac OS' Disk Utility application to create a disk image. You create a growing image with decent size, so you don't waste any hard drive space but still keep enough room for many projects.

1. Open **Disk Utility** by opening Spotlight (<kbd>Cmd + Space</kbd>) and entering `disk utility`.
2. Select **File&nbsp;<span aria-label="and then">></span> New Image&nbsp;<span aria-label="and then">></span> Blank Image**.
3. Enter a file name for the disk image—for example, `case-sensitive-file-system`.
4. Select the place to store the image—for example, your home folder.
5. Enter a name for the image—for example, `workspace`. This name is shown in Finder when the image is mounted.<br>We recommend having matching names for the mount point and disk image name. This way, Finder displays it nicely. For your local setup, use workspace as the image's name and mount-point.
6. Enter a decent value for the size so the image can accommodate all your projects—for example, `100GB`.
7. Select the format: **Mac OS Extended** (Case-sensitive, Journaled).
8. You can leave encryption and partitions as is.
9. Select the image format: **Sparse**. Note that sometimes, changing the image format resets the setting for image size.

The resulting dialog looks as follows:
![Case sensitive file system](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/HowTo+-+Handle+Case+Sensitive+File-System/case+sensitive+system.png)

After the disk has been created, you can see it being mounted in Finder already.

## Copy existing projects

You can copy all existing projects to the newly created box. If it is not mounted, double-click the disk image file in Finder. After copying all your projects, you can replace your current project directory with the mount-point for the disk image so that you don't have to adjust any paths you already set up. For details, see the following section.

## mount the disk image at boot automatically

To avoid manually mounting the disk image every time you restart your system, create a Launch Agent that can take care of this.

To create a Launch Agent, follow these steps:
1. Create a new file for the definition of the Launch Agent under—for example, `~Library/LaunchAgents/local.mount-case-sensitive-file-system.plist`.

```
vim ~Library/LaunchAgents/local.mount-case-sensitive-file-system.plist
```

2. Place the following content inside the file:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
    <dict>
        <key>RunAtLoad</key>
       <true/>
        <key>Label</key>
        <string>local.mount-case-sensitive-file-system</string>
        <key>ProgramArguments</key>
        <array>
            <string>hdiutil</string>
            <string>attach</string>
            <string>[ABSOLUTE_PATH_TO_DISK_IMAGE]</string>
            <string>-mountpoint</string>
            <string>[ABSOLUTE_PATH_TO_MOUNT_POINT]</string>
            <string>-nobrowse</string>
        </array>
    </dict>
</plist>
```

Put in some values for `[ABSOLUTE_PATH_TO_DISK_IMAGE]` (for example, `/Users/joeaverage/case-sensitive-file-system.sparseimage`) and `[ABSOLUTE_PATH_TO_MOUNT_POINT]` (for example, `/Users/joeaverage/workspace`). Also, make sure that the `mount-point` folder exists and is empty.

## Configure PhpStorm

The first time you open one of the projects from the disk image, you may notice a warning about case-sensitive file systems. PhpStorm for Mac OS is configured to work with a case-insensitive file system and reports a warning if it detects a case-sensitive file system. Unfortunately, there is no way to configure PhpStorm on a per-project level, but you can let PhpStorm know that all your projects are stored in a case-sensitive file system.

To let PhpStorm know that all your projects are stored in a case-sensitive file system, follow these steps:
1. In PHPStorm, go to **Help&nbsp;<span aria-label="and then">></span> Edit Custom Properties**.
2. Add the `idea.case.sensitive.fs=true` option.
3. Save and close.

For more information, see [Filesystem Case-Sensitivity Mismatch](https://confluence.jetbrains.com/display/IDEADEV/Filesystem+Case-Sensitivity+Mismatch).
