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
      var previewFirst = false;
      var foundCodeBlock = false;

      Array.from(container.children).forEach(function (child) {
        if (child === codeBlock || child.contains(codeBlock)) {
          foundCodeBlock = true;
          return;
        }
        if (child.classList.contains('source-preview-tab-bar') || child.classList.contains('source-preview-panels')) {
          return;
        }
        var alertEl = child.querySelector('em.alert, .alert');
        if (alertEl && /^preview\b/i.test(alertEl.textContent.trim()) && child.textContent.trim().length < 40) {
          return; // skip redundant label
        }
        if (!foundCodeBlock) {
          previewFirst = true;
        }
        previewElements.push(child);
      });

      if (previewElements.length > 0) {
        wrapInTabCard(container, codeBlock, previewElements, previewFirst);
      }
    });

    // 2. Auto-detect adjacent <program> / .code-box paired with Preview: alert
    var codeBoxes = document.querySelectorAll('.code-box, pre.program');
    codeBoxes.forEach(function (codeBox) {
      var sourceContainer = codeBox.closest('.code-box') || codeBox;
      if (sourceContainer.dataset.tabWrapped === 'true' || sourceContainer.closest('.source-preview-tab-card')) {
        return;
      }

      var previewElements = [];
      var labelToRemove = null;
      var previewFirst = false;

      // Check Case A: Preview is BEFORE sourceContainer
      var prev = sourceContainer.previousElementSibling;
      if (prev && prev.dataset.tabWrapped !== 'true' && !prev.closest('.source-preview-tab-card')) {
        var prevAlertEl = prev.querySelector('em.alert, .alert');
        var prevIsPreviewLabel = prevAlertEl && /^preview\b/i.test(prevAlertEl.textContent.trim());

        if (prevIsPreviewLabel) {
          var hasDisplayMath = prev.querySelector('.displaymath, math, table, .tabular');
          var textContent = prev.textContent || '';
          var alertText = prevAlertEl.textContent || '';
          var permalink = prev.querySelector('.autopermalink');
          var permalinkText = permalink ? permalink.textContent : '';
          var remainingText = textContent.replace(alertText, '').replace(permalinkText, '').trim();

          if (hasDisplayMath || (remainingText.length > 0 && !permalink)) {
            var labelContainer = prevAlertEl.closest('.para');
            if (labelContainer && labelContainer !== prev) {
              labelContainer.remove();
            } else {
              prevAlertEl.remove();
            }
            previewElements.push(prev);
            previewFirst = true;
          }
        } else {
          var candidateLabel = prev.previousElementSibling;
          if (candidateLabel) {
            var candAlert = candidateLabel.querySelector('em.alert, .alert');
            if (candAlert && /^preview\b/i.test(candAlert.textContent.trim())) {
              var candText = candidateLabel.textContent || '';
              var candAlertText = candAlert.textContent || '';
              var candPermalink = candidateLabel.querySelector('.autopermalink');
              var candPermalinkText = candPermalink ? candPermalink.textContent : '';
              var candRemaining = candText.replace(candAlertText, '').replace(candPermalinkText, '').trim();

              if (candRemaining.length < 60) {
                labelToRemove = candidateLabel;
                previewElements.push(prev);
                previewFirst = true;
              }
            }
          }
        }
      }

      // Check Case B: Preview is AFTER sourceContainer (if not found before)
      if (previewElements.length === 0) {
        var next = sourceContainer.nextElementSibling;
        if (next && next.dataset.tabWrapped !== 'true' && !next.closest('.source-preview-tab-card')) {
          var nextAlertEl = next.querySelector('em.alert, .alert');
          var nextIsPreviewLabel = nextAlertEl && /^preview\b/i.test(nextAlertEl.textContent.trim());

          if (nextIsPreviewLabel) {
            var hasDisplayMathNext = next.querySelector('.displaymath, math, table, .tabular');
            var textContentNext = next.textContent || '';
            var alertTextNext = nextAlertEl.textContent || '';
            var permalinkNext = next.querySelector('.autopermalink');
            var permalinkTextNext = permalinkNext ? permalinkNext.textContent : '';
            var remainingTextNext = textContentNext.replace(alertTextNext, '').replace(permalinkTextNext, '').trim();

            if (hasDisplayMathNext || (remainingTextNext.length > 0 && !permalinkNext)) {
              var labelContainerNext = nextAlertEl.closest('.para');
              if (labelContainerNext && labelContainerNext !== next) {
                labelContainerNext.remove();
              } else {
                nextAlertEl.remove();
              }
              previewElements.push(next);
              previewFirst = false;
            } else {
              labelToRemove = next;
              var previewTarget = next.nextElementSibling;
              if (previewTarget) {
                previewElements.push(previewTarget);
                previewFirst = false;
              }
            }
          }
        }
      }

      if (previewElements.length > 0) {
        sourceContainer.dataset.tabWrapped = 'true';
        previewElements.forEach(function (el) {
          el.dataset.tabWrapped = 'true';
        });

        var insertBeforeTarget = (previewFirst && labelToRemove)
          ? labelToRemove
          : (previewFirst && previewElements.length > 0)
            ? previewElements[0]
            : sourceContainer;

        var card = document.createElement('div');
        card.className = 'source-preview-tab-card';
        card.setAttribute('role', 'region');
        card.setAttribute('aria-label', 'Code Example and Preview');

        insertBeforeTarget.parentNode.insertBefore(card, insertBeforeTarget);

        if (labelToRemove) {
          labelToRemove.remove();
        }

        wrapInTabCard(card, sourceContainer, previewElements, previewFirst);
      }
    });
  }

  function wrapInTabCard(card, sourceContainer, previewElements, previewFirst) {
    card.classList.add('source-preview-tab-card');

    var tabBar = document.createElement('div');
    tabBar.className = 'source-preview-tab-bar';
    tabBar.setAttribute('role', 'tablist');

    var uniqueId = 'tab-' + Math.random().toString(36).substring(2, 9);
    var previewTabId = uniqueId + '-prev-tab';
    var sourceTabId = uniqueId + '-src-tab';
    var previewPanelId = uniqueId + '-prev-panel';
    var sourcePanelId = uniqueId + '-src-panel';

    // Source Tab Button
    var srcBtn = document.createElement('button');
    srcBtn.className = 'source-preview-tab-btn tab-btn-source';
    srcBtn.id = sourceTabId;
    srcBtn.setAttribute('role', 'tab');
    srcBtn.setAttribute('type', 'button');
    srcBtn.setAttribute('aria-controls', sourcePanelId);
    srcBtn.innerHTML = '<span class="tab-emoji tab-emoji-source">💻</span><span class="tab-label tab-label-source">Source</span>';

    // Preview Tab Button
    var prevBtn = document.createElement('button');
    prevBtn.className = 'source-preview-tab-btn tab-btn-preview';
    prevBtn.id = previewTabId;
    prevBtn.setAttribute('role', 'tab');
    prevBtn.setAttribute('type', 'button');
    prevBtn.setAttribute('aria-controls', previewPanelId);
    prevBtn.innerHTML = '<span class="tab-emoji tab-emoji-preview">✨</span><span class="tab-label tab-label-preview">Preview</span>';

    if (previewFirst) {
      prevBtn.classList.add('active');
      prevBtn.setAttribute('aria-selected', 'true');
      srcBtn.setAttribute('aria-selected', 'false');
      srcBtn.setAttribute('tabindex', '-1');

      tabBar.appendChild(prevBtn);
      tabBar.appendChild(srcBtn);
    } else {
      srcBtn.classList.add('active');
      srcBtn.setAttribute('aria-selected', 'true');
      prevBtn.setAttribute('aria-selected', 'false');
      prevBtn.setAttribute('tabindex', '-1');

      tabBar.appendChild(srcBtn);
      tabBar.appendChild(prevBtn);
    }

    var panelsContainer = document.createElement('div');
    panelsContainer.className = 'source-preview-panels';

    var sourcePanel = document.createElement('div');
    sourcePanel.className = 'source-preview-panel panel-source';
    sourcePanel.id = sourcePanelId;
    sourcePanel.setAttribute('role', 'tabpanel');
    sourcePanel.setAttribute('aria-labelledby', sourceTabId);

    var previewPanel = document.createElement('div');
    previewPanel.className = 'source-preview-panel panel-preview';
    previewPanel.id = previewPanelId;
    previewPanel.setAttribute('role', 'tabpanel');
    previewPanel.setAttribute('aria-labelledby', previewTabId);

    if (previewFirst) {
      previewPanel.classList.add('active');
      previewPanel.style.display = 'block';
      sourcePanel.style.display = 'none';
      sourcePanel.setAttribute('hidden', 'until-found');
    } else {
      sourcePanel.classList.add('active');
      sourcePanel.style.display = 'block';
      previewPanel.style.display = 'none';
      previewPanel.setAttribute('hidden', 'until-found');
    }

    // Move sourceContainer into sourcePanel
    sourcePanel.appendChild(sourceContainer);

    // Move previewElements into previewPanel
    previewElements.forEach(function (el) {
      previewPanel.appendChild(el);
    });

    if (previewFirst) {
      panelsContainer.appendChild(previewPanel);
      panelsContainer.appendChild(sourcePanel);
    } else {
      panelsContainer.appendChild(sourcePanel);
      panelsContainer.appendChild(previewPanel);
    }

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
        var isPrevActive = prevBtn.classList.contains('active');
        if (isPrevActive) {
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
