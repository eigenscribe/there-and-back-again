/**
 * Source / Preview Interactive Tabs
 * Eigenscribe PreTeXt Interactive Tabbed Component
 */
(function () {
  'use strict';

  function initSourcePreviewTabs() {
    // 1. Process explicit containers (.source-preview-tab or .source-preview-card)
    var explicitContainers = document.querySelectorAll('.source-preview-tab, .source-preview-card, [data-component="source-preview"]');
    explicitContainers.forEach(function (container) {
      if (container.dataset.tabsInitialized) return;
      container.dataset.tabsInitialized = 'true';

      var codeBlock = container.querySelector('.code-box, pre.program');
      if (!codeBlock) return;

      var previewElements = [];
      Array.from(container.children).forEach(function (child) {
        if (child !== codeBlock && !child.contains(codeBlock) && !child.classList.contains('source-preview-tab-bar') && !child.classList.contains('source-preview-panels')) {
          var alertEl = child.querySelector('em.alert, .alert');
          if (alertEl && /^preview\b/i.test(alertEl.textContent.trim()) && child.textContent.trim().length < 40) {
            return; // skip redundant label
          }
          previewElements.push(child);
        }
      });

      if (previewElements.length > 0) {
        wrapInTabCard(container, codeBlock, previewElements);
      }
    });

    // 2. Auto-detect adjacent <program> / .code-box followed by Preview: alert
    var codeBoxes = document.querySelectorAll('.code-box, pre.program');
    codeBoxes.forEach(function (codeBox) {
      var sourceContainer = codeBox.closest('.code-box') || codeBox;
      if (sourceContainer.dataset.tabWrapped || sourceContainer.closest('.source-preview-tab-card')) {
        return;
      }

      var next = sourceContainer.nextElementSibling;
      if (!next) return;

      // Check if next contains a preview alert label
      var alertEl = next.querySelector('em.alert, .alert');
      var isPreviewLabel = alertEl && /^preview\b/i.test(alertEl.textContent.trim());

      if (isPreviewLabel) {
        var previewElements = [];
        var labelToRemove = null;

        var hasDisplayMath = next.querySelector('.displaymath, math, table, .tabular');
        var textContent = next.textContent || '';
        var alertText = alertEl.textContent || '';
        var permalink = next.querySelector('.autopermalink');
        var permalinkText = permalink ? permalink.textContent : '';
        var remainingText = textContent.replace(alertText, '').replace(permalinkText, '').trim();

        if (hasDisplayMath || (remainingText.length > 0 && !permalink)) {
          // The preview is directly inside `next` (e.g. .para.logical containing math)
          var labelContainer = alertEl.closest('.para');
          if (labelContainer && labelContainer !== next) {
            labelContainer.remove();
          } else {
            alertEl.remove();
          }
          previewElements.push(next);
        } else {
          // `next` is purely the label paragraph, preview target is the sibling element right after `next`
          labelToRemove = next;
          var previewTarget = next.nextElementSibling;
          if (previewTarget) {
            previewElements.push(previewTarget);
          }
        }

        if (previewElements.length > 0) {
          sourceContainer.dataset.tabWrapped = 'true';
          if (labelToRemove) {
            labelToRemove.remove();
          }
          createTabCard(sourceContainer, previewElements);
        }
      }
    });
  }

  function createTabCard(sourceContainer, previewElements) {
    var card = document.createElement('div');
    card.className = 'source-preview-tab-card';
    card.setAttribute('role', 'region');
    card.setAttribute('aria-label', 'Code Example and Preview');

    sourceContainer.parentNode.insertBefore(card, sourceContainer);
    wrapInTabCard(card, sourceContainer, previewElements);
  }

  function wrapInTabCard(card, sourceContainer, previewElements) {
    card.classList.add('source-preview-tab-card');

    var tabBar = document.createElement('div');
    tabBar.className = 'source-preview-tab-bar';
    tabBar.setAttribute('role', 'tablist');

    var uniqueId = 'tab-' + Math.random().toString(36).substring(2, 9);
    var previewTabId = uniqueId + '-prev-tab';
    var sourceTabId = uniqueId + '-src-tab';
    var previewPanelId = uniqueId + '-prev-panel';
    var sourcePanelId = uniqueId + '-src-panel';

    // Source Tab Button (Active by default on the left)
    var srcBtn = document.createElement('button');
    srcBtn.className = 'source-preview-tab-btn tab-btn-source active';
    srcBtn.id = sourceTabId;
    srcBtn.setAttribute('role', 'tab');
    srcBtn.setAttribute('type', 'button');
    srcBtn.setAttribute('aria-selected', 'true');
    srcBtn.setAttribute('aria-controls', sourcePanelId);
    srcBtn.innerHTML = '<span class="tab-emoji tab-emoji-source">💻</span><span class="tab-label tab-label-source">Source</span>';

    // Preview Tab Button (On the right)
    var prevBtn = document.createElement('button');
    prevBtn.className = 'source-preview-tab-btn tab-btn-preview';
    prevBtn.id = previewTabId;
    prevBtn.setAttribute('role', 'tab');
    prevBtn.setAttribute('type', 'button');
    prevBtn.setAttribute('aria-selected', 'false');
    prevBtn.setAttribute('aria-controls', previewPanelId);
    prevBtn.setAttribute('tabindex', '-1');
    prevBtn.innerHTML = '<span class="tab-emoji tab-emoji-preview">✨</span><span class="tab-label tab-label-preview">Preview</span>';

    tabBar.appendChild(srcBtn);
    tabBar.appendChild(prevBtn);

    var panelsContainer = document.createElement('div');
    panelsContainer.className = 'source-preview-panels';

    var sourcePanel = document.createElement('div');
    sourcePanel.className = 'source-preview-panel panel-source active';
    sourcePanel.id = sourcePanelId;
    sourcePanel.setAttribute('role', 'tabpanel');
    sourcePanel.setAttribute('aria-labelledby', sourceTabId);

    var previewPanel = document.createElement('div');
    previewPanel.className = 'source-preview-panel panel-preview';
    previewPanel.id = previewPanelId;
    previewPanel.setAttribute('role', 'tabpanel');
    previewPanel.setAttribute('aria-labelledby', previewTabId);
    previewPanel.setAttribute('hidden', 'until-found');
    previewPanel.style.display = 'none';

    // Move sourceContainer into sourcePanel
    sourcePanel.appendChild(sourceContainer);

    // Move previewElements into previewPanel
    previewElements.forEach(function (el) {
      previewPanel.appendChild(el);
    });

    panelsContainer.appendChild(previewPanel);
    panelsContainer.appendChild(sourcePanel);

    card.appendChild(tabBar);
    card.appendChild(panelsContainer);

    function switchTab(showPreview) {
      if (showPreview) {
        prevBtn.classList.add('active');
        prevBtn.setAttribute('aria-selected', 'true');
        prevBtn.removeAttribute('tabindex');

        srcBtn.classList.remove('active');
        srcBtn.setAttribute('aria-selected', 'false');
        srcBtn.setAttribute('tabindex', '-1');

        previewPanel.classList.add('active');
        previewPanel.style.display = 'block';
        previewPanel.removeAttribute('hidden');

        sourcePanel.classList.remove('active');
        sourcePanel.style.display = 'none';
        sourcePanel.setAttribute('hidden', 'until-found');
      } else {
        srcBtn.classList.add('active');
        srcBtn.setAttribute('aria-selected', 'true');
        srcBtn.removeAttribute('tabindex');

        prevBtn.classList.remove('active');
        prevBtn.setAttribute('aria-selected', 'false');
        prevBtn.setAttribute('tabindex', '-1');

        sourcePanel.classList.add('active');
        sourcePanel.style.display = 'block';
        sourcePanel.removeAttribute('hidden');

        previewPanel.classList.remove('active');
        previewPanel.style.display = 'none';
        previewPanel.setAttribute('hidden', 'until-found');
      }
    }

    prevBtn.addEventListener('click', function () {
      switchTab(true);
    });

    srcBtn.addEventListener('click', function () {
      switchTab(false);
    });

    tabBar.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault();
        if (prevBtn.classList.contains('active')) {
          srcBtn.focus();
          switchTab(false);
        } else {
          prevBtn.focus();
          switchTab(true);
        }
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSourcePreviewTabs);
  } else {
    initSourcePreviewTabs();
  }
  window.addEventListener('load', initSourcePreviewTabs);
})();
