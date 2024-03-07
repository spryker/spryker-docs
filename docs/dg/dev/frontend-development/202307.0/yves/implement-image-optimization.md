---
title: Images optimization usage
description: Learn about the imagemin plugin and how to use it
last_updated: Jul 12, 2023
template: howto-guide-template
redirect_from:
- /docs/scos/dev/front-end-development/202307.0/yves/image-optimization-usage.html

---

The `imagemin` plugin is a npm package that compresses a particular image format. For example, `mozjpeg` compresses JPEG files.
Popular image formats may have multiple plugins to choose from.

## Prerequisites

Add the following plugins to the `package.json` and install them using the `npm install` command:

| NAME | VERSION |
|---|---|
| imagemin | ~7.0.1 |
| imagemin-gifsicle | ~6.0.1 |
| imagemin-mozjpeg | ~8.0.0 |
| imagemin-pngquant | ~8.0.0 |
| imagemin-svgo | ~7.1.0 |

## Use Images optimization

1. Add a new commands to the `package.json` scripts:

```json
"yves:images-optimization": "node ./frontend/libs/images-optimization-build"
"yves:images-optimization:replace": "node ./frontend/libs/images-optimization-build --replace",
```

2. Create the folder with optimized images (`project/frontend/assets/%namespace%/%theme%/images/optimized-images`):

```bash
npm run yves:images-optimization
```

3. Replace original images with optimized ones:

```bash
npm run yves:images-optimization:replace
```

If you set the mode value to `true`—for example, `production: true`—when you run `npm run yves:production`,
the build is executed with optimized images by default, and they are added to the `public` folder.

**frontend/settings.js**

```js
enabledInModes: {
    'development': false,
    'development-watch': false,
    'production': true,
},
```
