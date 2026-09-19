import os
import re
import sys

# Unicode Emoji regex pattern matching single and composite emojis
EMOJI_PATTERN = re.compile(
    r"([\U00010000-\U0010ffff\u2600-\u27bf\u2300-\u23ff\u2b50\u2b55\u3030\u303d\u3297\u3299]+(?:[\ufe0e\ufe0f]|\ud83c[\udffb-\udfff])?(?:\u200d[\U00010000-\U0010ffff\u2600-\u27bf\u2300-\u23ff\u2b50\u2b55\u3030\u303d\u3297\u3299]+(?:[\ufe0e\ufe0f]|\ud83c[\udffb-\udfff])?)*)"
)

def wrap_emoji_in_html(html_str):
    # Process text chunks outside tags to avoid modifying HTML attributes/tags
    tokens = re.split(r'(<[^>]+>)', html_str)
    result = []
    in_emoji_span = False
    for token in tokens:
        if token.startswith('<'):
            if re.match(r'<span[^>]*class="[^"]*(?:toc-emoji|twemoji|emoji)[^"]*"', token):
                in_emoji_span = True
            elif in_emoji_span and token.startswith('</span'):
                in_emoji_span = False
            result.append(token)
        else:
            if not in_emoji_span and token:
                token = EMOJI_PATTERN.sub(r'<span class="toc-emoji">\1</span>', token)
            result.append(token)
    return ''.join(result)

def postprocess_file(file_path):
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

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

def main():
    web_dir = os.path.join('output', 'web')
    if not os.path.exists(web_dir):
        print(f"Directory {web_dir} does not exist.")
        return

    count = 0
    for root, _, files in os.walk(web_dir):
        for file in files:
            if file.endswith('.html'):
                postprocess_file(os.path.join(root, file))
                count += 1
    print(f"Successfully postprocessed {count} HTML files for emojis and formatting.")

if __name__ == '__main__':
    main()
