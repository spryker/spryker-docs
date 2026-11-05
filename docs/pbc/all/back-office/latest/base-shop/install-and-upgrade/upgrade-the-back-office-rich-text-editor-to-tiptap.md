---
title: Upgrade the Back Office rich-text editor to Tiptap
description: Learn how to migrate from Summernote to Tiptap in the Spryker Back Office and configure and extend the new rich-text editor.
last_updated: Nov 5, 2026
template: howto-guide-template
---

Back Office rich-text fields now use a new editor built on [Tiptap 3](https://tiptap.dev), with an HTML source view powered by CodeMirror 6. To add the editor to a field, use the `RichTextEditorType` form type from `spryker/gui`. To extend the editor, use the `window.SprykerRichTextEditor` JavaScript registry.

The new editor maintains compatibility with Summernote toolbar items and stored HTML. Summernote fields (`textarea.html-editor`) are deprecated and will be removed in the next major release of `spryker/gui`.

## Why the Back Office switched from Summernote to Tiptap

- **Summernote is no longer maintained by its author.** Its bugs and security issues are not fixed upstream, and it does not support newer browser and jQuery versions.
- **Summernote depends on jQuery and Bootstrap jQuery plugins.** The Back Office is moving away from these dependencies.
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

Every core form checks whether `RichTextEditorType::class` exists by using `class_exists()`. If you use an older version of `spryker/gui`, the form continues to use the Summernote textarea.

## New dependencies

The following npm dependencies are added to `assets/Zed/package.json` of `spryker/gui`:

- `@tiptap/core`, `@tiptap/pm`, `@tiptap/starter-kit`, `@tiptap/extensions`, `@tiptap/extension-bubble-menu`, `@tiptap/extension-image`, `@tiptap/extension-link`, `@tiptap/extension-subscript`, `@tiptap/extension-superscript`, `@tiptap/extension-table`, `@tiptap/extension-text-align`, `@tiptap/extension-text-style`: all `~3.31.3`.
- `@codemirror/commands`, `@codemirror/language`, `@codemirror/legacy-modes`, `@codemirror/search`, `@codemirror/state`, `@codemirror/view`: version 6.

You do not need additional configuration or plugin wiring. The Gui layout automatically loads the registry script. The editor is lazy-loaded when the page initializes its first rich-text field.

## Deprecations

This upgrade has no breaking changes. The following are deprecated:

- Summernote fields (`textarea.html-editor`), the `data-editor-config` attribute, and customizations that use `window.editorConfiguration.<config>`.
- Summernote customizations of the `cms` configuration no longer apply to core CMS fields. These fields use the new editor when you install `spryker/gui` 5.14.0 or later. Migrate these customizations to a `RichTextEditorFeature`. For details, see [Add a custom toolbar button](#add-a-custom-toolbar-button).

## Upgrade to the Tiptap rich-text editor

To upgrade, follow the steps in this section.

### 1. Update the Composer packages

All modules are available in released versions. The existing caret constraints in the feature packages allow Composer to install the new versions without changes to `composer.json`.

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

`spryker/gui` is part of the project's npm workspace (`spryker-zed-gui`). Running `npm install` adds the Tiptap and CodeMirror dependencies to the root `package-lock.json`. Commit the updated lock file to version control.

```bash
npm install
npm run zed
```

Build the assets using the Gui FrontendBuilder by running `npm run zed`. The `oryx-for-zed` build does not compile `*.entry.ts` files. As a result, fields that use `RichTextEditorType` remain plain textareas.

### 3. Clear the caches and regenerate the translations

The `spryker/gui` module includes new `en_US` and `de_DE` translations for the editor labels.

```bash
docker/sdk console cache:empty-all
docker/sdk console translator:generate-cache
docker/sdk console twig:cache:warmer
```

### 4. Check project layout overrides

The editor requires the `spryker-zed-gui-rich-text-editor.js` registry script and its labels. The `@Gui/Layout/layout.twig` template renders these resources in the `common_js` block.

If your project template overrides the `common_js` or `rich_text_editor_labels` block, call `{{ parent() }}` in the override to preserve the parent template's content. Otherwise, the browser console displays the following error:

```text
spryker-zed-gui-rich-text-editor.js is not on the page
```

{% info_block warningBox "Verification" %}

1. In the Back Office, open a CMS page placeholder, a CMS block placeholder, and the **Legal information** tab for a merchant.
2. Verify that each field displays the new toolbar and preserves its HTML content after you save it.
3. Check the browser console for the following deprecation warning: `Summernote fields (textarea.html-editor) are deprecated`. If you see this warning, a project form still uses a Summernote textarea. Replace it with `RichTextEditorType`.

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

The form type renders the field configuration as JSON in the textarea's `data-spryker-rich-text-editor` attribute. When the page loads, `spryker-zed-gui-init.js` locates the textarea and initializes the editor. The page must extend `@Gui/Layout/layout.twig`, as all Back Office pages do.

| OPTION | DEFAULT | DESCRIPTION |
|---|---|---|
| `editor_config` | `null` | Feature profile name. Features registered for this name and for `'*'` apply to the field. Core CMS fields use `cms`. |
| `toolbar` | `RichTextEditorType::SUPPORTED_TOOLBAR_ITEMS` | Built-in toolbar items to show. |

To display placeholder text in an empty editor, set the `placeholder` attribute through the `attr` option:
```php
'attr' => ['placeholder' => 'Write a description'],
```

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

If your code uses `.summernote('code', …)` to read or update a field's content, replace these calls with the registry methods:

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

Use the `toolbar` option to specify which built-in items to display. The editor always displays these items in a predefined order, regardless of the order in which you list them. If you specify an unsupported item, the form returns an invalid option error.

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
- CMS page templates usually render the page's `<h1>` heading automatically. Consider removing `style` from the toolbar or instructing content editors to use Heading 2 or lower.

### Change the toolbar of a core field

Core forms set only the `editor_config` option, so their fields display all built-in toolbar items. To customize the toolbar of a core field, override the form type in `src/Pyz` and extend its options method.

The following example customizes the toolbar for a CMS page placeholder field:

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

You can extend the editor with custom buttons, nodes, and node menus by registering features in JavaScript. Use `window.SprykerRichTextEditor.registerFeature(configName, feature)` to register a feature for a specific editor configuration.

The feature applies to every field whose `editor_config` matches `configName`. To apply the feature to all editor fields, use `'*'` as the configuration name.

### 1. Create a project entry file

The Gui FrontendBuilder compiles all `*.entry.ts` and `*.entry.js` files located under `src/Pyz/Zed/**/Zed/**`.

For example, the file `<name>.entry.ts` is compiled into `public/Backoffice/assets/js/<name>.js`.

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
| `icon` | | Font Awesome 5 CSS class, for example, `fa fa-signature`. |
| `iconShape` | | An SVG icon with a size of 24 × 24, drawn using `currentColor`. Use the following structure: `{ fill?: [{ d, isEvenOdd? }], stroke?: [d] }`. This property takes precedence over `icon`. |
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

Register the feature before `spryker-zed-gui-init.js` runs. If you register a feature after this script runs, the feature applies only to fields initialized afterward. The browser console also displays the following warning:

```text
Feature "…" was registered after an editor mounted
```

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

The editor displays labels in the Back Office user's language. The built-in labels are defined in `@Gui/RichTextEditor/labels.twig`. The Gui module includes translations for `en_US` and `de_DE`.

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

Keep `JSON_HEX_TAG` in the JSON encoding options. It prevents translated text from injecting a closing script tag.

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

- **Add another locale:** Add translations for the English labels, such as `Bold`, `Italic`, and `Text style`, to the project's Zed translation files. Then regenerate the translation cache. The translation keys and their English values are defined in `DEFAULT_LABELS` in `vendor/spryker/gui/assets/Zed/js/modules/libs/rich-text-editor/labels.ts`.
- **Replace a label:** Override the `rich_text_editor_labels` block in `layout.twig`. The editor first merges all `data-spryker-rich-text-editor-labels` elements and then processes `#spryker-rich-text-editor-labels`. This allows you to override any label, including feature labels. To preserve the core translations, call `{{ parent() }}` or include `@Gui/RichTextEditor/labels.twig` in your override.

## Other extension points

- **Video hosts:** Register a video provider by calling `window.SprykerRichTextEditor.registerVideoProvider({ name, attributes?, toEmbed(pageUrl), matchesEmbedSrc(src) })`. Built-in providers include `youtube`, `google-drive`, `instagram`, `vimeo`, `dailymotion`, `youku`, `peertube`, `qq`, and `facebook`. Registering a provider with an existing name replaces the current provider.
- **Field access:** Use `getEditor(textarea)` or `whenReady(textarea)` to retrieve the editor handle for a field. The handle provides methods such as `getHtml`, `setHtml`, `insertHtml`, `isEmpty`, `setSourceMode`, `setDisabled`, and `focus`.
- **Events:** The textarea dispatches the bubbling `rich-text-editor:ready`, `rich-text-editor:change`, and `rich-text-editor:mode-change` events.
- **Appearance:** In project SCSS, override the `--rich-text-editor-*` custom properties on `.rich-text-editor` — for example, `--rich-text-editor-radius` or `--rich-text-editor-max-height`. The default value of `--rich-text-editor-max-height` is `600px`.
- **Dialog markup:** Override the `rich_text_editor_templates` block of `layout.twig` for the link, image, and video dialogs, or the `content_item_modal` block of `@ContentGui/Assets/index.twig`.

## Theme properties

The Gui module replaces the `--bs-*` overrides in `_variables.scss` with `--ins-*` theme properties. If your project SCSS uses the removed `--bs-*` overrides, update your styles to use the corresponding `--ins-*` properties.

## Troubleshooting

| SYMPTOM | CAUSE | SOLUTION |
|---|---|---|
| A field still displays Summernote. | The field uses `TextareaType` with the `html-editor` class, or the installed `spryker/gui` version is older than 5.14.0. | Replace `TextareaType` with `RichTextEditorType` and update `spryker/gui`. |
| A `RichTextEditorType` field displays a plain textarea. | The assets were built with `oryx-for-zed`, or you have not rebuilt them. | Run `npm run zed` and perform a hard reload of the page. |
| The console shows `Failed to load the rich-text editor`. | A chunk in `public/Backoffice/assets/js/chunks` is stale or missing. | Run `npm run zed` and reload the page. |
| The console shows `spryker-zed-gui-rich-text-editor.js is not on the page`. | A project layout overrides `common_js` without calling {% raw %}`{{ parent() }}`{% endraw %}. | Call {% raw %}`{{ parent() }}`{% endraw %} in the override. |
| A custom Summernote button is missing. | Summernote customizations do not apply to fields that use `RichTextEditorType`. | Migrate the button to a `RichTextEditorFeature`. |
| The console shows `Feature "…" was registered after an editor mounted`. | The feature script loads after `spryker-zed-gui-init.js`. | Render the script in `init_js` before {% raw %}`{{ parent() }}`{% endraw %}. |
| The console shows `Failed to create the rich-text editor for editor config "…"`. | A registered feature threw an error while the editor was created. | Fix the feature. Meanwhile, the field stays a plain textarea. |
| A field opens in HTML source mode with a notice. | The stored HTML contains an element that the editor cannot represent. | Edit the content as HTML. If you do not edit the field, it is saved unchanged. |
| A label appears in English instead of the expected language. | The translation is missing, or the translation cache is outdated. | Add the missing translation and regenerate the translation cache by running `docker/sdk console translator:generate-cache`. |
