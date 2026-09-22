import os
import re
import sys

# Unicode Emoji regex pattern matching standard emoji ranges
EMOJI_PATTERN = re.compile(
    r"([\U0001F300-\U0001FAFF\u2600-\u27BF\u2B50\u2B55\u3030\u303D\u3297\u3299]+(?:[\ufe0e\ufe0f]|\ud83c[\udffb-\udfff])?(?:\u200d[\U0001F300-\U0001FAFF\u2600-\u27BF\u2B50\u2B55\u3030\u303D\u3297\u3299]+(?:[\ufe0e\ufe0f]|\ud83c[\udffb-\udfff])?)*)"
)

def wrap_emoji_in_html(html_str):
    # Process text chunks outside tags to avoid modifying HTML attributes/tags,
    # and strictly skip script, style, code, pre, and math blocks (displaymath/process-math/latex-macros).
    tokens = re.split(r'(<[^>]+>)', html_str)
    result = []
    in_emoji_span = False
    skip_stack = []

    for token in tokens:
        if token.startswith('<'):
            tag_match = re.match(r'<(/?)(\w+)([^>]*)>', token, re.IGNORECASE)
            if tag_match:
                is_close, tag_name, attrs = tag_match.groups()
                tag_name = tag_name.lower()

                # Check for tags/elements to skip
                is_skip_tag = tag_name in ['script', 'style', 'code', 'pre', 'math', 'svg']
                has_skip_class = bool(re.search(r'class="[^"]*(?:process-math|displaymath|tex2jax_ignore|MathJax|mjx-)[^"]*"', attrs, re.IGNORECASE))
                has_skip_id = bool(re.search(r'id="[^"]*(?:latex-macros)[^"]*"', attrs, re.IGNORECASE))

                if not is_close:
                    if re.match(r'<span[^>]*class="[^"]*(?:toc-emoji|twemoji|emoji)[^"]*"', token):
                        in_emoji_span = True
                    if is_skip_tag or has_skip_class or has_skip_id:
                        skip_stack.append(tag_name)
                else:
                    if in_emoji_span and tag_name == 'span':
                        in_emoji_span = False
                    if skip_stack and tag_name in skip_stack:
                        # Pop matching tag from stack
                        idx = len(skip_stack) - 1 - skip_stack[::-1].index(tag_name)
                        skip_stack.pop(idx)

            result.append(token)
        else:
            if not in_emoji_span and not skip_stack and token:
                token = EMOJI_PATTERN.sub(r'<span class="toc-emoji">\1</span>', token)
            result.append(token)
    return ''.join(result)

def postprocess_file(file_path, is_top_level=False):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Custom emoji spans
    content = content.replace(':favicon:', '<span class="twemoji" title=":favicon:"></span>')
    content = content.replace(':proofmark:', '<span class="twemoji" title=":proofmark:"></span>')
    content = content.replace(':eigenote:', '<span class="twemoji" title=":eigenote:"></span>')
    content = content.replace(':ember:', '<span class="twemoji" title=":ember:"></span>')
    content = content.replace(':logo:', '<span class="twemoji" title=":logo:"></span>')

    # 2. Wrap Unicode emojis in TOC and headings
    content = wrap_emoji_in_html(content)

    # 3. Remove brackets from <tag> elements
    content = re.sub(r'(<code class="code-inline tex2jax_ignore">)&lt;(.*?)&gt;(<\/code>)', r'\1\2\3', content)

    # 4. Convert language-none in program blocks to language-bash
    content = re.sub(r'(<pre class="program[^"]*"><code class=")language-none(")', r'\1language-bash\2', content)

    # 5. Top-level specific injections
    if is_top_level:
        if 'custom-theme.css' not in content:
            content = content.replace('</head>', '<link rel="stylesheet" type="text/css" href="external/custom-theme.css">\n</head>')

        if 'family=Aclonica' not in content:
            content = content.replace('</head>', '<link href="https://fonts.googleapis.com/css2?family=Aclonica&display=swap" rel="stylesheet">\n</head>')

        if 'graph-toggle.js' not in content:
            content = content.replace('</body>', '<script src="graph/d3.min.js"></script>\n<script src="graph/graph-toggle.js"></script>\n</body>')

        if 'elements/tabs.js' not in content:
            content = content.replace('</body>', '<script src="external/elements/tabs.js"></script>\n</body>')

        if 'search-fix' not in content:
            search_fix_style = (
                '<style id="search-fix">#searchresultsplaceholder, .searchresultsplaceholder { '
                'display: none !important; position: fixed !important; top: 50% !important; left: 50% !important; '
                'transform: translate(-50%, -50%) !important; width: 560px !important; min-width: 560px !important; '
                'max-width: 560px !important; min-height: 280px !important; padding: 1.5rem !important; '
                'background: rgba(13, 17, 23, 0.97) !important; border: 1px solid rgba(20, 181, 255, 0.25) !important; '
                'border-radius: 16px !important; z-index: 10000 !important; flex-direction: column !important; '
                'gap: 1rem !important; box-sizing: border-box !important; overflow: visible !important; } '
                '#searchresultsplaceholder.search-active, .searchresultsplaceholder.search-active { display: flex !important; } '
                '.search-results-controls { display: flex !important; align-items: center !important; gap: 0.75rem !important; '
                'width: 100% !important; min-height: 48px !important; box-sizing: border-box !important; } '
                '#ptxsearch { flex: 1 !important; min-width: 0 !important; height: 44px !important; padding: 0 16px !important; '
                'background: rgba(18, 22, 30, 0.95) !important; border: 1px solid rgba(20, 181, 255, 0.25) !important; '
                'border-radius: 10px !important; color: #e0e0e0 !important; font-size: 14px !important; box-sizing: border-box !important; } '
                '#closesearchresults { width: 44px !important; height: 44px !important; min-width: 44px !important; '
                'min-height: 44px !important; flex-shrink: 0 !important; background: rgba(20, 181, 255, 0.12) !important; '
                'border: 1px solid rgba(20, 181, 255, 0.25) !important; border-radius: 10px !important; color: #14b5ff !important; '
                'cursor: pointer !important; display: flex !important; align-items: center !important; justify-content: center !important; '
                'box-sizing: border-box !important; }</style>'
            )
            search_fix_script = (
                '<script>(function(){var sp=document.getElementById("searchresultsplaceholder");'
                'var sb=document.getElementById("searchbutton");var cb=document.getElementById("closesearchresults");'
                'if(sp)sp.style.display="none";if(sb)sb.addEventListener("click",function(){if(sp){sp.classList.add("search-active");sp.style.display="flex";}});'
                'if(cb)cb.addEventListener("click",function(){if(sp){sp.classList.remove("search-active");sp.style.display="none";}});})();</script>'
            )
            content = content.replace('</head>', f'{search_fix_style}\n</head>')
            content = content.replace('</body>', f'{search_fix_script}\n</body>')

        if 'favicon.png' not in content:
            content = content.replace('</head>', '<link rel="icon" type="image/png" href="favicon.png">\n</head>')

        # Move #cover-image above .abstract if it is inside .abstract
        cover_match = re.search(r'(<figure[^>]*id="cover-image"[^>]*>.*?</figure>)', content, flags=re.DOTALL)
        if cover_match and '<div class="abstract"' in content:
            cover_html = cover_match.group(1)
            content = content.replace(cover_html, '')
            content = re.sub(r'(<div class="abstract")', f'{cover_html}\n\\1', content, count=1)

        content = re.sub(
            r'<footer class="ptx-content-footer">.*?</footer>',
            '<footer class="ptx-content-footer"><span class="copyright">eigenscribe © 2025-2026</span></footer>',
            content,
            flags=re.DOTALL
        )

        new_footer = (
            '<div id="ptx-page-footer" class="ptx-page-footer" style="background: rgba(0, 0, 0, 0.7); '
            'border-top: 1px solid rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px); padding: 1.5rem 1rem; '
            'display: flex; align-items: center; justify-content: center; gap: 0.75rem;">\n'
            '<img src="external/logo.png" alt="eigenscribe logo" style="width: 35px; height: 35px; filter: drop-shadow(0 0 8px rgba(0, 232, 255, 0.5));">\n'
            '<p style="font-family: Aclonica, sans-serif; background: linear-gradient(130deg, #00ffee, #0a95eb); '
            '-webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; font-size: 1rem; margin: 0;">eigenscribe © 2025-2026</p>\n'
            '</div>'
        )
        content = re.sub(
            r'<div id="ptx-page-footer" class="ptx-page-footer">.*?</div>(\s*<script)',
            f'{new_footer}\\1',
            content,
            flags=re.DOTALL
        )

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

def clean_search_index(web_dir):
    search_index_path = os.path.join(web_dir, 'lunr-pretext-search-index.js')
    if os.path.exists(search_index_path):
        with open(search_index_path, 'r', encoding='utf-8') as f:
            idx = f.read()
        idx = re.sub(r'<(\d{12})>', r'\1', idx)
        idx = re.sub(r'Tags:\s+<([^>]+)>', r'Tags: \1', idx)
        idx = re.sub(r'\s+,\s+<([^>]+)>', r' , \1', idx)
        with open(search_index_path, 'w', encoding='utf-8') as f:
            f.write(idx)

def main():
    web_dir = os.path.join('output', 'web')
    if not os.path.exists(web_dir):
        print(f"Directory {web_dir} does not exist.")
        return

    count = 0
    for root, _, files in os.walk(web_dir):
        is_top_level = (os.path.abspath(root) == os.path.abspath(web_dir))
        for file in files:
            if file.endswith('.html'):
                postprocess_file(os.path.join(root, file), is_top_level=is_top_level)
                count += 1
    clean_search_index(web_dir)
    print(f"Successfully postprocessed {count} HTML files for emojis, styling injections, and search index.")

if __name__ == '__main__':
    main()
