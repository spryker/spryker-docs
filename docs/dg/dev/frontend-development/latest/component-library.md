---
title: B2B component library
description: Browse the ShopUi component library of the Spryker B2B Demo Shop, with every component rendered together with its variants and markup.
last_updated: August 6, 2026
template: concept-topic-template
---

The B2B component library is a browsable reference of the ShopUi components that ship with the Spryker B2B Demo Shop. Each entry renders the component itself, the variants it supports, and the markup that produces it, so you can compare an implementation against the shipped baseline before you override or extend it.

The library is published per release. The version shown below matches the documentation version you are reading, so you only see components that exist in your release. To learn how the visual constants behind these components are defined, see [Design tokens](/docs/dg/dev/frontend-development/latest/design-tokens.html).

{% capture all_tags_raw %}{% for v in site.versions %}{% if v[0] == 'latest' %}{{ site.release_version }}{% else %}{{ v[0] }}{% endif %},{% endfor %}{% endcapture %}
{% assign all_tags = all_tags_raw | split: ',' | sort | reverse %}
{% assign page_tag_num = page.release_tag | times: 1 %}
{% capture candidates %}{% for t in all_tags %}{% assign t_num = t | times: 1 %}{% if t_num <= page_tag_num %}{{ t }},{% endif %}{% endfor %}{% endcapture %}
{% assign candidate_list = candidates | split: ',' | join: ',' %}

<style>
.storybook-embed {
    margin: 3% 0;
}

.storybook-embed iframe {
    display: block;
    width: 100%;
    height: 900px;
    border: 1px solid #dddddd;
    border-radius: 10px;
}

.storybook-embed__notice {
    margin-bottom: 2%;
    padding: 2%;
    background: #f5f5f5;
    border-left: 4px solid #dddddd;
    border-radius: 4px;
}

@media (max-width: 900px) {
    .storybook-embed iframe {
        height: 70vh;
        min-height: 480px;
    }
}
</style>

<div class="storybook-embed"
     data-base="https://spryker.s3.eu-central-1.amazonaws.com/docs/storybook"
     data-candidates="{{ candidate_list }}"
     data-page-tag="{{ page.release_tag }}">
  <div class="storybook-embed__notice" hidden></div>
  <iframe title="Spryker B2B component library" loading="lazy" hidden></iframe>
</div>

<script>
(async function () {
  const box = document.querySelector('.storybook-embed');
  if (!box) { return; }

  const base = box.dataset.base;
  const pageTag = box.dataset.pageTag;
  const candidates = box.dataset.candidates.split(',').filter(Boolean);
  const frame = box.querySelector('iframe');
  const notice = box.querySelector('.storybook-embed__notice');

  function show(tag, lastModified) {
    frame.src = base + '/' + tag + '/index.html';
    frame.hidden = false;

    if (tag !== pageTag) {
      notice.textContent =
        'No component library was published for release ' + pageTag +
        '. Showing the library from release ' + tag + '.';
      notice.hidden = false;
    }

    if (!lastModified) { return; }
    const date = new Date(lastModified);
    const timeEl = document.querySelector('.post-meta time');
    if (timeEl) {
      timeEl.textContent = date.toLocaleDateString('en-GB',
        { day: '2-digit', month: 'long', year: 'numeric' });
      timeEl.setAttribute('datetime', date.toISOString().slice(0, 10));
    }
  }

  for (const tag of candidates) {
    let response;
    try {
      response = await fetch(base + '/' + tag + '/index.html', { method: 'HEAD' });
    } catch (err) {
      // The origin is not in the bucket CORS list, which is normal on a local
      // preview. Existence cannot be checked here, so load the best candidate
      // and let the iframe render whatever it gets.
      show(tag, null);
      return;
    }
    if (response.ok) {
      show(tag, response.headers.get('Last-Modified'));
      return;
    }
  }

  notice.textContent =
    'The component library is not published for release ' + pageTag + '.';
  notice.hidden = false;
})();
</script>
