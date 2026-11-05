---
title: Upgrade the Back Office rich-text editor to Tiptap
description: Learn how to replace the Summernote rich-text editor with the Tiptap-based editor in the Spryker Back Office, and how to configure and extend it.
last_updated: Nov 5, 2026
template: howto-guide-template
---

Back Office rich-text fields no longer use Summernote. They use a new editor built on [Tiptap 3](https://tiptap.dev), with an HTML source view based on CodeMirror 6. A field gets the editor through the `RichTextEditorType` form type in `spryker/gui`. You extend the editor through the `window.SprykerRichTextEditor` JavaScript registry.

The toolbar items and the stored HTML stay compatible with Summernote. Summernote fields (`textarea.html-editor`) are deprecated and will be removed in the next major release of `spryker/gui`.

## Why the Back Office switched from Summernote to Tiptap

- **Summernote is no longer maintained by its author.** Its bugs and security issues are not fixed upstream, and it does not follow new browser and jQuery versions.
- **Summernote depends on jQuery and the Bootstrap jQuery plugins.** The Back Office is moving away from them. Tiptap is framework-independent and has no jQuery dependency.
- **Tiptap is actively maintained.** It is built on ProseMirror, has a typed extension API, and provides a large set of official extensions, such as tables, links, images, text style, and alignment.
- **Clean extension model.** Summernote customizations were global `window.editorConfiguration.<config>` objects. Tiptap features are registered per editor profile through one registry and receive the Tiptap API of the page, so a project bundle never ships its own copy.
- **New capabilities.** The editor adds features that the Back Office Summernote toolbar did not have: a text style menu with headings, quote, and code block; full screen mode; HTML source with search; image resize handles; contextual menus for links, images, and tables; and a content guard that never silently changes HTML the editor cannot represent.
- **Backward-compatible content.** The editor reads and writes Summernote markup, such as image width, float, and the `note-float-left` class, so existing CMS content keeps its layout.

## Changed modules

| MODULE | RELEASE | CHANGES |
|---|---|---|
| `spryker/gui` | Minor (5.14.0) | `RichTextEditorType`, the editor, the `window.SprykerRichTextEditor` registry, labels and dialog templates in `layout.twig`, `@tiptap/*` and `@codemirror/*` npm dependencies, `--bs-*` theme properties replaced with `--ins-*` |
| `spryker/cms` | Minor (7.23.0) | The `/cms/glossary` form uses `RichTextEditorType`. |
| `spryker/cms-gui` | Minor (5.22.0) | CMS page placeholders use `RichTextEditorType` (`editor_config: cms`). Glossary autocomplete writes through the registry. |
| `spryker/cms-block-gui` | Minor (2.19.0) | CMS block placeholders use `RichTextEditorType` (`editor_config: cms`). |
| `spryker/cms-content-widget` | Minor (1.14.0) | Content widget menu and Twig `<div>` block node for `cms` fields. |
| `spryker/content-gui` | Minor (3.3.0) | Content Item button, node, and menu for `cms` fields. |
| `spryker/merchant-profile-gui` | Minor (1.7.0) | Merchant legal information fields use `RichTextEditorType`. |
| `spryker/ai-foundation` | Patch (0.9.6) | Uses `--ins-*` theme properties. |
| `spryker/state-machine-visualizer` | Patch (0.1.5) | Removed the `chevrotain` npm dependency. |
| `spryker/zed-ui` | Patch (4.6.2) | Jest `testMatch` is limited to Merchant Portal components. |
| `spryker-feature/ai-commerce` | Patch | The Smart CMS content panel reads and writes fields through the registry. |

Every core form checks `class_exists(RichTextEditorType::class)`. With an older version of `spryker/gui`, the form keeps the Summernote textarea.

## New dependencies

The following npm dependencies are added to `assets/Zed/package.json` of `spryker/gui`:

- `@tiptap/core`, `@tiptap/pm`, `@tiptap/starter-kit`, `@tiptap/extensions`, `@tiptap/extension-bubble-menu`, `@tiptap/extension-image`, `@tiptap/extension-link`, `@tiptap/extension-subscript`, `@tiptap/extension-superscript`, `@tiptap/extension-table`, `@tiptap/extension-text-align`, `@tiptap/extension-text-style`: all `~3.31.3`.
- `@codemirror/commands`, `@codemirror/language`, `@codemirror/legacy-modes`, `@codemirror/search`, `@codemirror/state`, `@codemirror/view`: version 6.

No configuration or plugin wiring is required. The Gui layout always loads the registry script. The editor itself is a lazy-loaded chunk, which is fetched by the first rich-text field on a page.

## Deprecations

This upgrade has no breaking changes. The following are deprecated:

- Summernote fields (`textarea.html-editor`), the `data-editor-config` attribute, and `window.editorConfiguration.<config>` customizations.
- A Summernote customization of the `cms` config no longer applies to core CMS fields: they use the new editor as soon as `spryker/gui` 5.14.0 is installed. Port such customizations to a `RichTextEditorFeature`. For details, see [Add a custom toolbar button](#add-a-custom-toolbar-button).

## Upgrade to the Tiptap rich-text editor

To upgrade, follow the steps in this section.

### 1. Update the Composer packages

All modules are released, and the existing caret constraints of the feature packages allow the new versions, so you do not need to change `composer.json`.

```bash
composer update \
    spryker/gui \
    spryker/cms \
    spryker/cms-gui \
    spryker/cms-block-gui \
    spryker/cms-content-widget \
    spryker/content-gui \
    spryker/merchant-profile-gui \
    spryker/ai-foundation \
    spryker/state-machine-visualizer \
    spryker/zed-ui \
    spryker-feature/cms \
    spryker-feature/ai-commerce \
    spryker-feature/marketplace-merchant \
    spryker-feature/marketplace-merchantportal-core \
    --ignore-platform-req=ext-redis --ignore-platform-req=ext-grpc --ignore-platform-req=ext-amqp
```

Make sure that the `composer.lock` diff contains only these packages:

```bash
git diff composer.lock | grep '"name":' | sort -u
```

### 2. Install the npm dependencies and build the Back Office assets

`spryker/gui` is an npm workspace (`spryker-zed-gui`) of the project. `npm install` adds the Tiptap and CodeMirror packages to the root `package-lock.json`. Commit the updated lock file.

```bash
npm install
npm run zed
```

Build the assets with the Gui FrontendBuilder (`npm run zed`). A build with `oryx-for-zed` does not compile `*.entry.ts` files, so `RichTextEditorType` fields stay plain textareas.

### 3. Clear the caches and regenerate the translations

`spryker/gui` ships new `en_US` and `de_DE` translations for the editor labels.

```bash
docker/sdk console cache:empty-all
docker/sdk console translator:generate-cache
docker/sdk console twig:cache:warmer
```

### 4. Check project layout overrides

The editor needs the `spryker-zed-gui-rich-text-editor.js` registry script and the labels, which `@Gui/Layout/layout.twig` renders in its `common_js` block. If a project template overrides `common_js` or `rich_text_editor_labels`, call {% raw %}`{{ parent() }}`{% endraw %} in the override. Otherwise, the browser console logs `spryker-zed-gui-rich-text-editor.js is not on the page`.

{% info_block warningBox "Verification" %}

1. In the Back Office, open a CMS page placeholder, a CMS block placeholder, and the **Legal information** tab of a merchant.
2. Make sure that each field shows the new toolbar and that saving keeps the HTML.
3. Make sure that the browser console has no `Summernote fields (textarea.html-editor) are deprecated` warning. If it has one, a project form still uses a Summernote textarea. Move this field to `RichTextEditorType`.

{% endinfo_block %}

## Add the editor to a field

Use `RichTextEditorType` instead of `TextareaType`. All `TextareaType` options, such as `label`, `required`, `constraints`, `sanitize_xss`, and `allowed_html_tags`, apply.

```php
use Spryker\Zed\Gui\Communication\Form\Type\RichTextEditorType;

$builder->add('description', RichTextEditorType::class, [
    'label' => 'Description',
    'required' => false,
    'editor_config' => 'cms', // optional: feature profile, see below
    'sanitize_xss' => true,
    'allowed_html_tags' => ['iframe'],
]);
```

Render the field as usual. You do not need any extra script or Twig code on the page:

```twig
{% raw %}
{{ form_row(form.description) }}
{% endraw %}
```

The type renders the field configuration as JSON in the `data-spryker-rich-text-editor` attribute of the textarea. On page load, `spryker-zed-gui-init.js` finds the textarea and mounts the editor. The page must extend `@Gui/Layout/layout.twig`, which all Back Office pages do.

| OPTION | DEFAULT | DESCRIPTION |
|---|---|---|
| `editor_config` | `null` | Feature profile name. Features registered for this name and for `'*'` apply to the field. Core CMS fields use `cms`. |
| `toolbar` | `RichTextEditorType::SUPPORTED_TOOLBAR_ITEMS` | Built-in toolbar items to show. |

To show a placeholder in an empty editor, pass `'attr' => ['placeholder' => 'Write a description']`.

### Upgrade a Summernote field

```php
// Before
$builder->add('description', TextareaType::class, [
    'attr' => ['class' => 'html-editor', 'data-editor-config' => 'cms'],
]);

// After
$builder->add('description', RichTextEditorType::class, [
    'editor_config' => 'cms',
]);
```

Code that calls `.summernote('code', …)` on a field must read and write the field through the registry instead:

```js
var registry = window.SprykerRichTextEditor;

// null / false: the field is not a RichTextEditorType field, keep the legacy path.
var html = registry && registry.readHtml(textarea);

if (!(registry && registry.writeHtml(textarea, '<p>Generated</p>'))) {
    $(textarea).summernote('code', '<p>Generated</p>');
}
```

Never call `.summernote()` on a field that the editor owns. To check whether the editor owns a field, use `window.SprykerRichTextEditor.isClaimed(textarea)`.

## Change the toolbar buttons

Pass the `toolbar` option with the built-in items to show. Items always appear in their fixed order, regardless of the order you list them in. An unknown item makes the form fail with an invalid option error.

```php
$builder->add('shortDescription', RichTextEditorType::class, [
    'toolbar' => [
        RichTextEditorType::TOOLBAR_ITEM_BOLD,
        RichTextEditorType::TOOLBAR_ITEM_ITALIC,
        RichTextEditorType::TOOLBAR_ITEM_BULLET_LIST,
        RichTextEditorType::TOOLBAR_ITEM_ORDERED_LIST,
        RichTextEditorType::TOOLBAR_ITEM_LINK,
        RichTextEditorType::TOOLBAR_ITEM_SOURCE,
    ],
]);
```

The built-in items, in display order:

| CONSTANT | VALUE | ITEM |
|---|---|---|
| `TOOLBAR_ITEM_STYLE` | `style` | Text style menu: normal text, Heading 1–6, quote, code block |
| `TOOLBAR_ITEM_BOLD` | `bold` | Bold |
| `TOOLBAR_ITEM_ITALIC` | `italic` | Italic |
| `TOOLBAR_ITEM_UNDERLINE` | `underline` | Underline |
| `TOOLBAR_ITEM_CLEAR` | `clear` | Remove formatting |
| `TOOLBAR_ITEM_STRIKETHROUGH` | `strikethrough` | Strikethrough |
| `TOOLBAR_ITEM_SUPERSCRIPT` | `superscript` | Superscript |
| `TOOLBAR_ITEM_SUBSCRIPT` | `subscript` | Subscript |
| `TOOLBAR_ITEM_FONT_SIZE` | `fontsize` | Font size |
| `TOOLBAR_ITEM_COLOR` | `color` | Text color |
| `TOOLBAR_ITEM_BACKGROUND_COLOR` | `background-color` | Background color |
| `TOOLBAR_ITEM_BULLET_LIST` | `ul` | Bulleted list |
| `TOOLBAR_ITEM_ORDERED_LIST` | `ol` | Numbered list |
| `TOOLBAR_ITEM_PARAGRAPH` | `paragraph` | Alignment and indent |
| `TOOLBAR_ITEM_PICTURE` | `picture` | Image and the image menu |
| `TOOLBAR_ITEM_LINK` | `link` | Link, the link menu, and `Ctrl/⌘+K` |
| `TOOLBAR_ITEM_VIDEO` | `video` | Video embed |
| `TOOLBAR_ITEM_TABLE` | `table` | Table and the table menu |
| `TOOLBAR_ITEM_HORIZONTAL_RULE` | `hr` | Horizontal line |
| `TOOLBAR_ITEM_UNDO` | `undo` | Undo |
| `TOOLBAR_ITEM_REDO` | `redo` | Redo |
| `TOOLBAR_ITEM_FULLSCREEN` | `fullscreen` | Full screen |
| `TOOLBAR_ITEM_SOURCE` | `codeview` | HTML source |

Consider the following:

- Leaving out `link`, `picture`, or `table` also removes the contextual menu of that item.
- Toolbar items added by features are always shown. The `toolbar` option controls only built-in items.
- On CMS pages, the template usually renders the page `<h1>` already. Consider leaving out `style`, or instruct content editors to use Heading 2 and lower.

### Change the toolbar of a core field

Core forms set only `editor_config`, so their fields show every built-in item. To change the toolbar of a core field, override the form type in `src/Pyz` and extend its options method. The following example changes the CMS page placeholder field:

```php
namespace Pyz\Zed\CmsGui\Communication\Form\Glossary;

use Spryker\Zed\CmsGui\Communication\Form\Glossary\CmsGlossaryTranslationFormType as SprykerCmsGlossaryTranslationFormType;
use Spryker\Zed\Gui\Communication\Form\Type\RichTextEditorType;

class CmsGlossaryTranslationFormType extends SprykerCmsGlossaryTranslationFormType
{
    /**
     * @param array<string, mixed> $options
     *
     * @return array<string, mixed>
     */
    protected function getTranslationFieldOptions(array $options): array
    {
        $options = parent::getTranslationFieldOptions($options);

        if ($this->isGuiRichTextEditorTypeAvailable()) {
            $options['toolbar'] = array_values(array_diff(
                RichTextEditorType::SUPPORTED_TOOLBAR_ITEMS,
                [RichTextEditorType::TOOLBAR_ITEM_FONT_SIZE, RichTextEditorType::TOOLBAR_ITEM_VIDEO],
            ));
        }

        return $options;
    }
}
```

This form type is a collection entry type, so you must also make the parent forms use it: override `CmsGlossaryAttributesFormType` (its `entry_type`), `CmsGlossaryFormType`, and the form creation in `CmsGuiCommunicationFactory`.

## Add a custom toolbar button

Custom buttons, nodes, and node menus are features. You register them in JavaScript through `window.SprykerRichTextEditor.registerFeature(configName, feature)`. A feature applies to every field whose `editor_config` equals `configName`. To apply a feature to every field, use `'*'`.

### 1. Create a project entry file

The Gui FrontendBuilder compiles every `*.entry.ts` and `*.entry.js` file under `src/Pyz/Zed/**/Zed/**`. A file named `<name>.entry.ts` is built to `public/Backoffice/assets/js/<name>.js`.

`src/Pyz/Zed/CmsGui/assets/Zed/js/pyz-rich-text-signature.entry.ts`

```ts
window.SprykerRichTextEditor?.registerFeature('cms', {
    name: 'signature',
    order: 30,
    toolbarItems: (context) => [
        {
            id: 'signature',
            label: context.label('signature', 'Insert signature'),
            icon: 'fa fa-signature',
            kind: 'button',
            run: (editor) => editor.chain().focus().insertContent('<p>Kind regards, the team</p>').run(),
        },
    ],
});
```

Toolbar item members (`ToolbarItemDefinition`):

| MEMBER | REQUIRED | DESCRIPTION |
|---|---|---|
| `id` | ✓ | Unique item ID. |
| `label` | ✓ | Tooltip and accessible name. To translate it, use `context.label(key, fallback)`. |
| `kind` | ✓ | `'button'` (command), `'toggle'` (pressed state from `isActive`), or `'menu'` (dropdown of `menuItems`). |
| `run(editor, value?)` | ✓ | Runs the command. `value` is the selected menu entry. |
| `icon` | | Font Awesome 5 class — for example, `fa fa-signature`. |
| `iconShape` | | SVG icon, 24 × 24, drawn in `currentColor`: `{ fill?: [{ d, isEvenOdd? }], stroke?: [d] }`. Shown instead of `icon`. |
| `menuItems` | Required for menus | `[{ value, label, swatch?, isAction?, isEnabled? }]` |
| `isActive(editor)` | | Pressed state of a toggle. |
| `isEnabled(editor)` | | Disables the button when the command cannot run. |
| `activeValue(editor)` | | For menus: the `value` of the checked entry. |
| `shortcut` | | Key binding shown in the tooltip — for example, `Mod-Shift-x`. It does not create the binding. |

Feature members (`RichTextEditorFeature`):

- `name`.
- `order`: position in the feature buttons group. The default value is `100`.
- Optional factories: `toolbarItems(context)`, `nodeMenus(context)`, and `extensions(tiptap, context)`. `extensions` receives the Tiptap API of the page, such as `Node`, `Mark`, `Extension`, `mergeAttributes`, and `Plugin`, for custom nodes and marks.

To import the types, use the following:

```ts
import type { RichTextEditorFeature } from '@zed/gui/js/modules/libs/rich-text-editor/types';
```

### 2. Load the script before the editor mounts

Register the feature before `spryker-zed-gui-init.js` runs. A feature registered later applies only to fields mounted later, and the console shows the `Feature "…" was registered after an editor mounted` warning.

Render the script in the `init_js` block of the page template, before {% raw %}`{{ parent() }}`{% endraw %}. A script rendered anywhere in the page body also runs early enough.

```twig
{% raw %}
{% block init_js %}
    <script src="{{ assetsPath('js/pyz-rich-text-signature.js') }}"></script>
    {{ parent() }}
{% endblock %}
{% endraw %}
```

### 3. Build the assets

```bash
npm run zed
```

## Translate custom button labels

The editor labels follow the language of the Back Office user. Built-in labels come from `@Gui/RichTextEditor/labels.twig`. Gui ships `en_US` and `de_DE` translations.

To translate the labels of a feature, follow these steps:

1. Render the label JSON on the page that loads the feature. The keys are the `context.label(key, fallback)` keys. Put the JSON next to the feature script:

```twig
{% raw %}
{% block init_js %}
    <script type="application/json" data-spryker-rich-text-editor-labels>{{ {
        signature: 'Insert signature' | trans
    } | json_encode(constant('JSON_HEX_TAG') b-or constant('JSON_HEX_AMP')) | raw }}</script>
    <script src="{{ assetsPath('js/pyz-rich-text-signature.js') }}"></script>
    {{ parent() }}
{% endblock %}
{% endraw %}
```

{% info_block warningBox "Warning" %}

Keep `JSON_HEX_TAG`: it prevents a translation from closing the script element.

{% endinfo_block %}

2. Add the translations to the Zed translation files of the project: `src/Pyz/Zed/Translator/data/<Module>/<locale>.csv`. The English text is the translation key.

**src/Pyz/Zed/Translator/data/CmsGui/en_US.csv**

```csv
"Insert signature","Insert signature"
```

**src/Pyz/Zed/Translator/data/CmsGui/de_DE.csv**

```csv
"Insert signature","Signatur einfügen"
```

3. Regenerate the translation cache:

```bash
docker/sdk console translator:generate-cache
```

Without a translation, the editor shows the `fallback` text passed to `context.label()`.

### Override or add translations of built-in labels

- **Add another locale:** Add translations for the English labels, such as `Bold`, `Italic`, and `Text style`, to the Zed translation files of the project, and regenerate the cache. The keys and English texts are defined in `DEFAULT_LABELS` in `vendor/spryker/gui/assets/Zed/js/modules/libs/rich-text-editor/labels.ts`.
- **Replace a label:** Override the `rich_text_editor_labels` block of `layout.twig`. The editor first merges every `data-spryker-rich-text-editor-labels` element, then `#spryker-rich-text-editor-labels`, so this block can replace any label, including feature labels. To keep the core translations, call {% raw %}`{{ parent() }}`{% endraw %} or include `@Gui/RichTextEditor/labels.twig` in the override.

## Other extension points

- **Video hosts:** `window.SprykerRichTextEditor.registerVideoProvider({ name, attributes?, toEmbed(pageUrl), matchesEmbedSrc(src) })`. Built-in providers: `youtube`, `google-drive`, `instagram`, `vimeo`, `dailymotion`, `youku`, `peertube`, `qq`, and `facebook`. A provider with an existing name replaces the existing provider.
- **Field access:** `getEditor(textarea)` and `whenReady(textarea)` return the handle of the field, which provides `getHtml`, `setHtml`, `insertHtml`, `isEmpty`, `setSourceMode`, `setDisabled`, `focus`, and other methods.
- **Events:** The textarea dispatches the bubbling `rich-text-editor:ready`, `rich-text-editor:change`, and `rich-text-editor:mode-change` events.
- **Appearance:** In project SCSS, override the `--rich-text-editor-*` custom properties on `.rich-text-editor` — for example, `--rich-text-editor-radius` or `--rich-text-editor-max-height`. The default value of `--rich-text-editor-max-height` is `600px`.
- **Dialog markup:** Override the `rich_text_editor_templates` block of `layout.twig` for the link, image, and video dialogs, or the `content_item_modal` block of `@ContentGui/Assets/index.twig`.

## Theme properties

The `--bs-*` overrides in `_variables.scss` of the Gui module were replaced with `--ins-*` theme properties. If your project SCSS relies on the removed `--bs-*` overrides, update it.

## Troubleshooting

| SYMPTOM | CAUSE | SOLUTION |
|---|---|---|
| A field still shows Summernote. | The field is a `TextareaType` with the `html-editor` class, or `spryker/gui` is older than 5.14.0. | Use `RichTextEditorType`, and update `spryker/gui`. |
| A `RichTextEditorType` field stays a plain textarea. | The assets were built with `oryx-for-zed` or were not rebuilt. | Run `npm run zed` and hard-reload the page. |
| The console shows `Failed to load the rich-text editor`. | A chunk in `public/Backoffice/assets/js/chunks` is stale or missing. | Run `npm run zed` and reload the page. |
| The console shows `spryker-zed-gui-rich-text-editor.js is not on the page`. | A project layout overrides `common_js` without calling {% raw %}`{{ parent() }}`{% endraw %}. | Call {% raw %}`{{ parent() }}`{% endraw %} in the override. |
| A custom Summernote button is missing. | Summernote customizations do not apply to `RichTextEditorType` fields. | Port the button to a `RichTextEditorFeature`. |
| The console shows `Feature "…" was registered after an editor mounted`. | The feature script loads after `spryker-zed-gui-init.js`. | Render the script in `init_js` before {% raw %}`{{ parent() }}`{% endraw %}. |
| The console shows `Failed to create the rich-text editor for editor config "…"`. | A registered feature threw an error while the editor was created. | Fix the feature. Meanwhile, the field stays a plain textarea. |
| A field opens in HTML source mode with a notice. | The stored HTML contains an element that the editor cannot represent. | Edit the content as HTML. If you do not edit the field, it is saved unchanged. |
| A label is shown in English. | The translation is missing, or the translation cache is stale. | Add the translation and run `console translator:generate-cache`. |
