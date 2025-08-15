---
title: Third-party integrations
description: Explore our comprehensive catalogue of third-party integrations, showcasing diverse methods and solutions tailored to your needs.
last_updated: July 9, 2025
template: default
layout: custom_new
---

{% raw %}

<div class="page-layout">
  <aside class="filters-sidebar">
      <button class="mobile-filter-toggle">Show Filters</button>
      <div class="mobile-filter-panel">
          <div class="search-container">
              <input type="search" id="nameSearch" placeholder="Search by name...">
          </div>
          <div class="filters-container" id="filtersContainer">
              </div>
      </div>
  </aside>

  <main class="content-area">
      <div id="featuredContainer" style="display: none;">
          <h2>Featured Integrations</h2>
          <div class="cards" id="featuredCards"></div>
          <hr/>
      </div>
      <div class="cards" id="cardContainer"></div>
      <!-- <div class="cont_us">
        <p class="cont_title">Can not find what you are looking for?</p>
        <p class="cont_subtext"> Get in touch to discuss further a solution that is perfect for you!</p>
        <button> contact us </button>
      </div> -->
  </main>
</div>

<div class="modal" id="modal">
  <div class="modal-content">
    <span class="close" onclick="closeModal()">&times;</span>
    <div id="modalInfo" style="display: none;"></div>
    <img id="modalLogo" class="logo" alt="Logo" />
    <h2 id="modalName"></h2>
    <p id="modalAuthor" class="author_name"></p>
    <p id="modalDescription"></p>
    <hr>
    <div class="tags" id="modalTags"></div>
    <hr>
    <div class="doc-links" id="modalDocs"></div>
    <hr>
    <div class="cat_art" id="cat_art"></div>
    <div id="modalNotice" style="display: none;"></div>
  </div>
</div>

<script src="/js/integrations/int_catalog.js"></script>

{% endraw %}