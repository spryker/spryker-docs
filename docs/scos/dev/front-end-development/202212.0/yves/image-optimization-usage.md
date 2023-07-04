---
title: Images optimization usage
description: Learn about the imagemin plugin and how to use it
last_updated: Jul 4, 2023
template: howto-guide-template
---

The `imagemin` plugin is an npm package that compresses a particular image format. For example, `mozjpeg` compresses JPEG files. 
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

1. Add a new command to the `package.json` scripts:

```json
"yves:images-optimization": "node ./frontend/libs/images-optimization-build"
```

2. Create a folder with optimized images (`project/frontend/assets/%namespace%/%theme%/images/optimized-images`): 
```bash
npm run yves:images-optimization
```

3. Replace original images with optimized ones:
```bash
npm run yves:images-optimization --replace
```

If you set the mode value to `true`—for example, `development: true`—when you run `npm run yves`, the build is executed with optimized images by default, and they are added to the `public` folder.

**frontend/settings.js**

```js
enabledInModes: {
    'development': true,
    'development-watch': false,
    'production': false,
},
```