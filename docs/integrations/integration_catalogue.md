---
title: Third Party Integrations
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
      <div class="cont_us">
        <p class="cont_title">Can not find what you are looking for?</p>
        <p class="cont_subtext"> Get in touch to discuss further a solution that is perfect for you!</p>
        <button> contact us </button>
      </div>
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
    <div id="modalNotice" style="display: none;"></div>
  </div>
</div>

<script>
    document.addEventListener('DOMContentLoaded', () => {
        const dataUrl = 'custom_scripts/tpi_list.json';
        let allPartners = [];

        function createAccordionFilter(container, title, items, groupName, changeHandler) {
            if (!items || items.length === 0) return;
            const filterGroup = document.createElement('div');
            filterGroup.className = 'filter-group';
            const button = document.createElement('button');
            button.className = 'accordion-header';
            button.textContent = title;
            const panel = document.createElement('div');
            panel.className = 'accordion-panel';
            const panelContent = document.createElement('div');
            panelContent.className = 'accordion-panel-content';
            items.forEach(item => {
                const label = document.createElement('label');
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.name = groupName;
                checkbox.value = item;
                checkbox.addEventListener('change', changeHandler);
                label.appendChild(checkbox);
                label.appendChild(document.createTextNode(` ${item}`));
                panelContent.appendChild(label);
            });
            panel.appendChild(panelContent);
            filterGroup.appendChild(button);
            filterGroup.appendChild(panel);
            container.appendChild(filterGroup);
        }

        function addAccordionFunctionality() {
            document.querySelectorAll('.accordion-header').forEach(header => {
                header.addEventListener('click', () => {
                    header.classList.toggle('active');
                    const panel = header.nextElementSibling;
                    panel.style.maxHeight = panel.style.maxHeight ? null : panel.scrollHeight + "px";
                });
            });
        }

        function addMobileToggleFunctionality() {
            const toggleButton = document.querySelector('.mobile-filter-toggle');
            if (toggleButton) {
                toggleButton.addEventListener('click', () => {
                    toggleButton.classList.toggle('active');
                    toggleButton.textContent = toggleButton.classList.contains('active') ? 'Hide Filters' : 'Show Filters';
                });
            }
        }

        fetch(dataUrl)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                allPartners = data; // Directly use the flat array from JSON

                const cardContainer = document.getElementById('cardContainer');
                const featuredContainer = document.getElementById('featuredContainer');
                const featuredCardsContainer = document.getElementById('featuredCards');
                const filtersContainer = document.getElementById('filtersContainer');
                const nameSearchInput = document.getElementById('nameSearch');

                const featuredPartners = allPartners.filter(p => p.featured);
                allPartners.sort((a, b) => a.Partner.localeCompare(b.Partner));

                if (featuredPartners.length > 0) {
                    renderCards(featuredPartners, featuredCardsContainer);
                    featuredContainer.style.display = 'block';
                }

                const filterChangeHandler = () => applyFilters();
                nameSearchInput.addEventListener('input', filterChangeHandler);

                filtersContainer.innerHTML = '';
                const categories = [...new Set(allPartners.map(p => p.category).filter(Boolean))].sort();
                createAccordionFilter(filtersContainer, 'Categories', categories, 'category', filterChangeHandler);

                const methods = [...new Set(allPartners.flatMap(p => p.method || []))].sort();
                createAccordionFilter(filtersContainer, 'Method', methods, 'method', filterChangeHandler);

                const authors = [...new Set(allPartners.map(p => p.Author).filter(Boolean))].sort();
                createAccordionFilter(filtersContainer, 'Authors', authors, 'author', filterChangeHandler);

                addAccordionFunctionality();
                addMobileToggleFunctionality();

                applyFiltersFromURL();
                applyFilters();
            })
            .catch(e => {
                console.error("Failed to load or process partner data:", e);
                document.getElementById('cardContainer').innerHTML = '<p>Error: Could not load integration data. Please check the console for details.</p>';
            });

        function renderCards(partners, containerElement) {
            containerElement.innerHTML = '';
            if (partners.length === 0) {
                containerElement.innerHTML = '<p>No integrations match your criteria.</p>';
                return;
            }
            partners.forEach(partner => {
                const card = document.createElement('div');
                card.className = 'card';
                card.onclick = () => openModal(partner);

                const methodTags = (partner.method || []).map(m => {
                    let tagClass = 'tag';
                    const lower_m = m.toLowerCase();
                    if (lower_m === 'acp') tagClass = 'tag acp';
                    else if (lower_m === 'eco') tagClass = 'tag eco';
                    else if (lower_m === 'community') tagClass = 'tag community';
                    return `<span class="${tagClass}">${m}</span>`;
                }).join('');

                card.innerHTML = `
                  <div class="ven-data">
                    <div class="ven-col image">
                    <img src="${partner.Logo}" class="logo" alt="${partner.Partner} Logo" onerror="this.onerror=null;this.src='https://placehold.co/600x400/eee/ccc?text=Logo'"/>
                    </div>
                    <div class="ven-col data">
                        <h3>${partner.Partner}</h3>
                        <p class="ven-short-desc">${partner.shortDescription}</p>
                        </div>
                  </div>
                  <div class="tags">
                    ${partner.category ? `<span class="tag">${partner.category}</span>` : ''}
                    ${methodTags}
                    ${partner.commerce ? `<span class="tag comm">${partner.commerce}</span>` : ''}
                  </div>
                  <div class="author-info">
                    <div class="author_name">Created by: ${partner.Author}</div>
                    ${partner.tp_partner ? `<div class="spryker_tp_partner">Spryker Partner</div>` : ''}
                  </div>
                `;
                containerElement.appendChild(card);
            });
        }

        window.openModal = function(partner) {
            document.getElementById('modalLogo').src = partner.Logo;
            document.getElementById('modalName').textContent = partner.Partner;
            document.getElementById('modalAuthor').textContent = "Created By: " + partner.Author;
            const modalNotice = document.getElementById('modalNotice');

            if (partner.method && partner.method.some(m => m.toLowerCase() === 'community')) {
                modalNotice.innerHTML = '<p class="vendor_notice">Community Contributions are not part of the paid Spryker Products or Services. Customers cannot claim maintenance of or updates for Community Contributions. Spryker cannot be held liable for any use of this kind of integration.</p>';
                modalNotice.style.display = 'block';
            } else {
                modalNotice.style.display = 'none';
            }

            if (partner.tp_partner === true) {
                modalInfo.innerHTML = '<div class="spryker_tp_partner">Spryker Partner</div>';
                modalInfo.style.display = 'block';
            } else {
                modalInfo.style.display = 'none';
            }

            document.getElementById('modalDescription').textContent = partner.Description;
            document.getElementById('modalTags').innerHTML = `
                ${partner.category ? `<span class="tag">${partner.category}</span>` : ''}
                ${(partner.method || []).map(m => `<span class="tag">${m}</span>`).join('')}
            `;

            const docs = [];
            if (partner.ACP_Doc) docs.push(`<a href="${partner.ACP_Doc}" target="_blank">ACP Documentation</a>`);
            if (partner.Eco_Doc) docs.push(`<a href="${partner.Eco_Doc}" target="_blank">Eco Documentation</a>`);
            if (partner.Comm_Doc) docs.push(`<a href="${partner.Comm_Doc}" target="_blank">Community Documentation</a>`);
            document.getElementById('modalDocs').innerHTML = docs.join('');

            document.getElementById('modal').style.display = 'flex';

            gtag('event', 'vendor_card_click', {
                event_category: 'vendor_catalog',
                event_label: partner.Partner,
                vendor_name: partner.Partner,
                vendor_tp: partner.tp_partner,
                vendor_cat: partner.category,
                vendor_method: partner.method.join(',')
            });

            const key = 'vendors_viewed';
                let viewedVendors = JSON.parse(localStorage.getItem(key)) || [];

                // Avoid duplicates
                if (!viewedVendors.includes(partner.Partner)) {
                    viewedVendors.push(partner.Partner);
                    localStorage.setItem(key, JSON.stringify(viewedVendors));
                }
        }

        window.closeModal = function() {
            document.getElementById('modal').style.display = 'none';
        }

        function applyFiltersFromURL() {
            const urlParams = new URLSearchParams(window.location.search);
            const searchTerm = urlParams.get('q');
            if (searchTerm) {
                document.getElementById('nameSearch').value = searchTerm;
            }
            urlParams.forEach((value, key) => {
                if (key === 'q') return;
                document.querySelectorAll(`input[name="${key}"][value="${value}"]`).forEach(checkbox => {
                    checkbox.checked = true;
                    const panel = checkbox.closest('.accordion-panel');
                    if (panel && !panel.style.maxHeight) {
                        const header = panel.previousElementSibling;
                        header.classList.add('active');
                        panel.style.maxHeight = panel.scrollHeight + 'px';
                    }
                });
            });
        }

        function applyFilters() {
            const getSelected = (name) => Array.from(document.querySelectorAll(`input[name="${name}"]:checked`)).map(cb => cb.value);
            const searchTerm = document.getElementById('nameSearch').value.toLowerCase().trim();

            const selectedCategories = getSelected('category');
            const selectedMethods = getSelected('method');
            const selectedAuthors = getSelected('author');

            const filtered = allPartners.filter(p => {
                const searchMatch = !searchTerm || p.Partner.toLowerCase().includes(searchTerm);
                const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(p.category);
                const authorMatch = selectedAuthors.length === 0 || selectedAuthors.includes(p.Author);
                const methodMatch = selectedMethods.length === 0 || (p.method && selectedMethods.some(sm => p.method.includes(sm)));

                return searchMatch && categoryMatch && authorMatch && methodMatch;
            });

            renderCards(filtered, document.getElementById('cardContainer'));
            updateURL();
        }

        function updateURL() {
            const urlParams = new URLSearchParams();
            const searchTerm = document.getElementById('nameSearch').value.trim();
            if (searchTerm) {
                urlParams.set('q', searchTerm);
            }
            const addParams = (name) => {
                const selected = Array.from(document.querySelectorAll(`input[name="${name}"]:checked`)).map(cb => cb.value);
                selected.forEach(value => urlParams.append(name, value));
            };
            addParams('category');
            addParams('method');
            addParams('author');
            const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
            if(window.history.pushState) {
                window.history.pushState({path:newUrl}, '', newUrl);
            }
        }
    });
</script>
{% endraw %}