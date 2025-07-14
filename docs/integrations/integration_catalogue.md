---
title: Integrations Catalogue
description: Catalogue of our integration vendors.
last_updated: 7 April 2025
article_status: published
---

{% raw %}
  <style>
    /* --- Main Page Layout --- */
    .page-layout {
        display: flex;
        flex-direction: row;
        gap: 2rem;
        align-items: flex-start;
    }

    .filters-sidebar {
        width: 280px;
        flex-shrink: 0;
        position: sticky;
        top: 2rem;
        height: calc(100vh - 4rem);
        overflow-y: auto;
    }

    .content-area {
        flex-grow: 1;
    }

    /* Hide Mobile Toggle on Desktop */
    .mobile-filter-toggle {
        display: none;
    }

    /* --- Search Input Styles --- */
    .search-container {
        margin-bottom: 1.5rem;
    }
    .search-container input[type="search"] {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid #d1d5db;
        border-radius: 0.5rem;
        font-size: 1rem;
    }

    /* --- Accordion Filter Styles --- */
    .filters-container {
        border: 1px solid #e5e7eb;
        border-radius: 0.75rem;
        overflow: hidden;
    }

    .filter-group .accordion-header {
        width: 100%;
        background-color: #f9fafb;
        border: none;
        border-top: 1px solid #e5e7eb;
        padding: 1rem;
        text-align: left;
        font-size: 1rem;
        font-weight: 600;
        color: #374151;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .filter-group:first-child .accordion-header {
      border-top: none;
    }

    .filter-group .accordion-header::after {
        content: '+';
        font-size: 1.25rem;
        font-weight: bold;
        color: #9ca3af;
    }

    .filter-group .accordion-header.active::after {
        content: '−';
    }

    .filter-group .accordion-panel {
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.3s ease-out;
        background-color: white;
        padding: 0 1rem;
    }

    .accordion-panel-content {
        padding: 1rem 0;
        display: flex;
        flex-direction: column;
    }

    .accordion-panel label {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 0.5rem;
        font-size: 0.875rem;
        color: #4b5563;
        cursor: pointer;
    }

    .accordion-panel input[type="checkbox"] {
        width: 1rem;
        height: 1rem;
        border-radius: 0.25rem;
        border: 1px solid #d1d5db;
        cursor: pointer;
    }

    /* --- Card & Modal Styles --- */
    .cards {
       display: grid;
       grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
       gap: 1.5rem;
    }

    #featuredContainer ~ .cards {
      margin-top:2%;
    }

    .card {
       background-color: white;
       border-radius: 0.75rem;
       box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
       overflow: hidden;
       padding: 1.5rem;
       width: 100%;
       display: flex;
       flex-direction: column;
    }

    .card .logo {
       width: 100%;
       height: 150px;
       object-fit: contain;
       border-radius: 0.5rem;
       margin-bottom: 1rem;
    }

    .card h3 {
       font-size: 1.25rem;
       font-weight: 600;
       color: #111827;
       text-transform: capitalize;
       margin-bottom: 0.5rem;
    }

    .tags { margin-bottom: 1rem; }

    .tag {
       display: inline-block;
       padding: 0.25rem 0.75rem;
       border-radius: 9999px;
       font-size: 0.75rem;
       font-weight: 500;
       margin-right: 0.5rem;
       margin-bottom: 0.5rem;
       background-color: #e5e7eb;
       color: #374151;
    }

    .tag.eco, .tag.acp, .tag.community { background-color: #d1fae5; color: #065f46; }
    .tag.comm { background-color: #e6f4fe; color: #0090ff; text-transform:uppercase; }

    .author-info {
       margin-top: auto;
       padding-top: 1rem;
       border-top: 1px solid #f3f4f6;
    }

    .author_name { font-size: 0.875rem; color: #6b7280; }

    .modal { z-index:100; display: none; position: fixed; inset: 0; background: rgba(0, 0, 0, 0.5); justify-content: center; align-items: center; }
    .modal-content { background: white; padding: 2rem; border-radius: 12px; max-width: 500px; width: 90%; position: relative; }
    .modal-content h2 { text-transform: capitalize; }
    .close { position: absolute; top: 1rem; right: 1rem; cursor: pointer; font-size: 1.5rem; }
    .doc-links a { display: block; margin-top: 0.5rem; color: #007bff; }
    #modalNotice { background: #ffd688; border-radius: 10px; color: black; padding: 1rem; border: #ffae2c solid 1px;font-weight:bold; margin-bottom: 1rem;}

    /* --- MOBILE STYLES --- */
    @media (max-width: 992px) {
        .page-layout {
            flex-direction: column;
        }

        .filters-sidebar {
            position: static;
            width: 100%;
            height: auto;
            overflow-y: visible;
            margin-bottom: 2rem;
        }

        .mobile-filter-toggle {
            display: block;
            width: 100%;
            padding: 0.75rem 1rem;
            font-size: 1rem;
            font-weight: 600;
            color: #fff;
            background-color: #007bff;
            border: none;
            border-radius: 0.5rem;
            cursor: pointer;
            margin-bottom: 1rem;
        }

        .mobile-filter-panel {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.5s ease-in-out;
        }

        .mobile-filter-toggle.active + .mobile-filter-panel {
            max-height: 1000px;
        }
    }

  </style>

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
    <img id="modalLogo" class="logo" alt="Logo" />
    <h2 id="modalName"></h2>
    <div id="modalNotice" style="display: none;"></div>
    <p id="modalDescription"></p>
    <div class="tags" id="modalTags"></div>
    <div class="doc-links" id="modalDocs"></div>
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
                  <img src="${partner.Logo}" class="logo" alt="${partner.Partner} Logo" onerror="this.onerror=null;this.src='https://placehold.co/600x400/eee/ccc?text=Logo'"/>
                  <h3>${partner.Partner}</h3>
                  <div class="tags">
                    ${partner.category ? `<span class="tag">${partner.category}</span>` : ''}
                    ${methodTags}
                    ${partner.commerce ? `<span class="tag comm">${partner.commerce}</span>` : ''}
                  </div>
                  <div class="author-info">
                     <div class="author_name">Created by: ${partner.Author}</div>
                  </div>
                `;
                containerElement.appendChild(card);
            });
        }

        window.openModal = function(partner) {
            document.getElementById('modalLogo').src = partner.Logo;
            document.getElementById('modalName').textContent = partner.Partner;
            const modalNotice = document.getElementById('modalNotice');

            if (partner.method && partner.method.some(m => m.toLowerCase() === 'community')) {
                modalNotice.innerHTML = '<p><strong>This is a community built integration. Please check the author\'s documentation and repository for more information.</strong></p>';
                modalNotice.style.display = 'block';
            } else {
                modalNotice.style.display = 'none';
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