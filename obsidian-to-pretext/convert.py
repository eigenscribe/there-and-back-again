#!/usr/bin/env python3
"""
Obsidian to PreTeXt Conversion Pipeline

Converts Obsidian Markdown notes to PreTeXt XML format, handling:
- YAML frontmatter (tags, aliases, dates)
- Obsidian-style [[wikilinks]]
- MathJax equations ($inline$ and $$block$$)
- One note → one <section>
- Stable xml:id generation
- Backlink tracking

Usage:
    python convert.py input_dir output_dir [--generate-graph]
"""

import re
import os
import sys
import json
import argparse
import hashlib
from pathlib import Path
from datetime import datetime
from typing import Dict, List, Optional, Set, Tuple
from dataclasses import dataclass, field

try:
    import yaml
except ImportError:
    print("PyYAML required: pip install pyyaml")
    sys.exit(1)


@dataclass
class Note:
    """Represents a parsed Obsidian note."""
    filepath: Path
    title: str
    xml_id: str
    content: str
    tags: List[str] = field(default_factory=list)
    aliases: List[str] = field(default_factory=list)
    created: Optional[str] = None
    modified: Optional[str] = None
    links_to: Set[str] = field(default_factory=set)
    backlinks: Set[str] = field(default_factory=set)
    frontmatter: Dict = field(default_factory=dict)


class ObsidianToPreText:
    """Converts Obsidian vault to PreTeXt XML."""

    FRONTMATTER_PATTERN = re.compile(r'^---\s*\n(.*?)\n---\s*\n', re.DOTALL)
    WIKILINK_PATTERN = re.compile(r'\[\[([^\]|]+)(?:\|([^\]]+))?\]\]')
    INLINE_MATH_PATTERN = re.compile(r'(?<!\$)\$(?!\$)(.+?)(?<!\$)\$(?!\$)')
    BLOCK_MATH_PATTERN = re.compile(r'\$\$(.*?)\$\$', re.DOTALL)
    HEADER_PATTERN = re.compile(r'^(#{1,6})\s+(.+)$', re.MULTILINE)
    BOLD_PATTERN = re.compile(r'\*\*(.+?)\*\*')
    ITALIC_PATTERN = re.compile(r'(?<!\*)\*([^*]+)\*(?!\*)')
    CODE_INLINE_PATTERN = re.compile(r'`([^`]+)`')
    CODE_BLOCK_PATTERN = re.compile(r'```(\w*)\n(.*?)```', re.DOTALL)
    UNORDERED_LIST_PATTERN = re.compile(r'^(\s*)[-*+]\s+(.+)$', re.MULTILINE)
    ORDERED_LIST_PATTERN = re.compile(r'^(\s*)\d+\.\s+(.+)$', re.MULTILINE)
    BLOCKQUOTE_PATTERN = re.compile(r'^>\s*(.+)$', re.MULTILINE)
    IMAGE_PATTERN = re.compile(r'!\[\[([^\]]+)\]\]|!\[([^\]]*)\]\(([^)]+)\)')
    LINK_PATTERN = re.compile(r'\[([^\]]+)\]\(([^)]+)\)')
    CALLOUT_PATTERN = re.compile(r'^>\s*\[!(\w+)\][-+]?\s*(.*?)$', re.MULTILINE)

    MARKDOWN_TO_PRETEXT = {
        'bold': ('<term>', '</term>'),
        'italic': ('<em>', '</em>'),
        'code_inline': ('<c>', '</c>'),
    }

    def __init__(self, input_dir: str, output_dir: str, verbose: bool = False):
        self.input_dir = Path(input_dir)
        self.output_dir = Path(output_dir)
        self.verbose = verbose
        self.notes: Dict[str, Note] = {}
        self.title_to_id: Dict[str, str] = {}
        self.alias_to_id: Dict[str, str] = {}

    def log(self, message: str):
        if self.verbose:
            print(f"[INFO] {message}")

    def generate_xml_id(self, title: str, filepath: Path) -> str:
        """
        Generate a stable xml:id from title and filepath.
        
        Rules:
        1. Lowercase the title
        2. Replace spaces and special chars with hyphens
        3. Remove consecutive hyphens
        4. Prefix with 'sec-' for sections
        5. Add hash suffix if collision detected
        """
        base = title.lower()
        base = re.sub(r'[^\w\s-]', '', base)
        base = re.sub(r'[\s_]+', '-', base)
        base = re.sub(r'-+', '-', base)
        base = base.strip('-')
        
        if not base:
            base = filepath.stem.lower()
            base = re.sub(r'[^\w-]', '-', base)
        
        xml_id = f"sec-{base}"
        
        if xml_id in [n.xml_id for n in self.notes.values()]:
            hash_suffix = hashlib.md5(str(filepath).encode()).hexdigest()[:6]
            xml_id = f"{xml_id}-{hash_suffix}"
        
        return xml_id

    def parse_frontmatter(self, content: str) -> Tuple[Dict, str]:
        """Extract and parse YAML frontmatter."""
        match = self.FRONTMATTER_PATTERN.match(content)
        if match:
            try:
                frontmatter = yaml.safe_load(match.group(1)) or {}
                remaining = content[match.end():]
                return frontmatter, remaining
            except yaml.YAMLError as e:
                self.log(f"YAML parse error: {e}")
                return {}, content
        return {}, content

    def extract_wikilinks(self, content: str) -> Set[str]:
        """Extract all [[wikilink]] targets from content."""
        links = set()
        for match in self.WIKILINK_PATTERN.finditer(content):
            target = match.group(1).strip()
            if '#' in target:
                target = target.split('#')[0]
            if target:
                links.add(target)
        return links

    def convert_wikilinks(self, content: str) -> str:
        """Convert [[wikilinks]] to PreTeXt <xref> elements."""
        def replace_link(match):
            target = match.group(1).strip()
            display = match.group(2) or target
            
            heading = None
            if '#' in target:
                target, heading = target.split('#', 1)
            
            xml_id = self.title_to_id.get(target.lower())
            if not xml_id:
                xml_id = self.alias_to_id.get(target.lower())
            
            if xml_id:
                if heading:
                    return f'<xref ref="{xml_id}" text="custom">{display}</xref>'
                return f'<xref ref="{xml_id}"/>'
            else:
                return f'<em>{display}</em>'
        
        return self.WIKILINK_PATTERN.sub(replace_link, content)

    def escape_math_xml(self, math: str) -> str:
        """Escape XML special characters in math content for PreTeXt."""
        math = math.replace('&', '&amp;')
        math = math.replace('<', '\\lt ')
        math = math.replace('>', '\\gt ')
        return math

    def convert_math(self, content: str) -> str:
        """Convert MathJax equations to PreTeXt format."""
        def block_replace(match):
            math = self.escape_math_xml(match.group(1).strip())
            return f'__BLOCK_MATH_START__{math}__BLOCK_MATH_END__'
        
        content = self.BLOCK_MATH_PATTERN.sub(block_replace, content)
        
        def inline_replace(match):
            math = self.escape_math_xml(match.group(1))
            return f'<m>{math}</m>'
        
        content = self.INLINE_MATH_PATTERN.sub(inline_replace, content)
        
        return content

    def convert_headers(self, content: str) -> str:
        """Convert Markdown headers to header markers for later processing."""
        def replace_header(match):
            level = len(match.group(1))
            text = match.group(2).strip()
            
            header_id = text.lower()
            header_id = re.sub(r'[^\w\s-]', '', header_id)
            header_id = re.sub(r'\s+', '-', header_id)
            
            return f'__HEADER_{level}_{header_id}__|{text}|__END_HEADER__'
        
        return self.HEADER_PATTERN.sub(replace_header, content)

    def convert_lists(self, content: str) -> str:
        """Convert Markdown lists to PreTeXt."""
        lines = content.split('\n')
        result = []
        in_ul = False
        in_ol = False
        
        for line in lines:
            ul_match = re.match(r'^(\s*)[-*+]\s+(.+)$', line)
            ol_match = re.match(r'^(\s*)\d+\.\s+(.+)$', line)
            
            if ul_match:
                if not in_ul:
                    if in_ol:
                        result.append('</ol>')
                        in_ol = False
                    result.append('<ul>')
                    in_ul = True
                result.append(f'<li><p>{ul_match.group(2)}</p></li>')
            elif ol_match:
                if not in_ol:
                    if in_ul:
                        result.append('</ul>')
                        in_ul = False
                    result.append('<ol>')
                    in_ol = True
                result.append(f'<li><p>{ol_match.group(2)}</p></li>')
            else:
                if in_ul:
                    result.append('</ul>')
                    in_ul = False
                if in_ol:
                    result.append('</ol>')
                    in_ol = False
                result.append(line)
        
        if in_ul:
            result.append('</ul>')
        if in_ol:
            result.append('</ol>')
        
        return '\n'.join(result)

    def convert_inline_formatting(self, content: str) -> str:
        """Convert bold, italic, inline code."""
        content = self.BOLD_PATTERN.sub(r'<term>\1</term>', content)
        content = self.ITALIC_PATTERN.sub(r'<em>\1</em>', content)
        content = self.CODE_INLINE_PATTERN.sub(r'<c>\1</c>', content)
        return content

    def convert_code_blocks(self, content: str) -> str:
        """Convert fenced code blocks to PreTeXt."""
        def replace_block(match):
            lang = match.group(1) or 'text'
            code = match.group(2)
            code = code.replace('&', '&amp;')
            code = code.replace('<', '&lt;')
            code = code.replace('>', '&gt;')
            return f'<program language="{lang}">\n<code>\n{code}</code>\n</program>'
        
        return self.CODE_BLOCK_PATTERN.sub(replace_block, content)

    def process_callouts(self, content: str) -> str:
        """Process Obsidian callouts before other conversions."""
        callout_block_pattern = re.compile(
            r'^>\s*\[!(\w+)\][-+]?\s*(.*?)$\n((?:>\s*.*\n?)*)', 
            re.MULTILINE
        )
        
        def replace_callout(match):
            callout_type = match.group(1).lower()
            callout_title = match.group(2).strip()
            callout_body = match.group(3)
            
            callout_body = re.sub(r'^>\s*', '', callout_body, flags=re.MULTILINE)
            callout_body = callout_body.strip()
            
            type_map = {
                'note': 'note',
                'warning': 'warning',
                'tip': 'insight',
                'important': 'warning',
                'example': 'example',
                'info': 'note',
                'eigenote': 'note',
                'favicon': 'note',
                'ember': 'note',
            }
            ptx_type = type_map.get(callout_type, 'note')
            
            if callout_type == 'eigenote':
                if not callout_title:
                    callout_title = ":eigenote: Eigenote"
                elif ":eigenote:" not in callout_title:
                    callout_title = f":eigenote: {callout_title}"
            elif callout_type == 'favicon':
                if not callout_title:
                    callout_title = ":favicon: Observation"
                elif ":favicon:" not in callout_title:
                    callout_title = f":favicon: {callout_title}"
            elif callout_type == 'ember':
                if not callout_title:
                    callout_title = ":ember: Heuristic"
                elif ":ember:" not in callout_title:
                    callout_title = f":ember: {callout_title}"
            
            if callout_title:
                return f'__CALLOUT_START_{ptx_type}__|{callout_title}|__CALLOUT_BODY__|{callout_body}|__CALLOUT_END__'
            return f'__CALLOUT_START_{ptx_type}__|__CALLOUT_BODY__|{callout_body}|__CALLOUT_END__'
        
        return callout_block_pattern.sub(replace_callout, content)

    def convert_blockquotes(self, content: str) -> str:
        """Convert simple blockquotes to PreTeXt."""
        def replace_quote(match):
            text = match.group(1)
            return f'__BLOCKQUOTE__|{text}|__END_BLOCKQUOTE__'
        
        return self.BLOCKQUOTE_PATTERN.sub(replace_quote, content)

    def convert_links(self, content: str) -> str:
        """Convert Markdown links to PreTeXt."""
        def replace_link(match):
            text = match.group(1)
            url = match.group(2)
            return f'<url href="{url}">{text}</url>'
        
        return self.LINK_PATTERN.sub(replace_link, content)

    def finalize_structure(self, content: str) -> str:
        """Convert markers to proper PreTeXt structure and wrap paragraphs."""
        block_math_pattern = re.compile(r'__BLOCK_MATH_START__(.+?)__BLOCK_MATH_END__')
        content = block_math_pattern.sub(r'<md>\1</md>', content)
        
        lines = content.split('\n')
        result = []
        current_para = []
        open_stack = []
        
        def flush_para():
            nonlocal current_para
            if current_para:
                text = ' '.join(current_para).strip()
                if text:
                    result.append(f'<p>{text}</p>')
                current_para = []
        
        def close_containers_to_level(target_level):
            """Close containers until we reach the target level or lower."""
            while open_stack:
                stack_level, tag = open_stack[-1]
                if stack_level >= target_level:
                    open_stack.pop()
                    result.append(f'</{tag}>')
                else:
                    break
        
        i = 0
        while i < len(lines):
            line = lines[i].strip()
            
            if not line:
                flush_para()
                i += 1
                continue
            
            header_match = re.match(r'__HEADER_(\d+)_([^|]+)\|([^|]+)\|__END_HEADER__', line)
            if header_match:
                flush_para()
                level = int(header_match.group(1))
                header_id = header_match.group(2).rstrip('_')
                title = header_match.group(3)
                
                close_containers_to_level(level)
                
                if level == 1:
                    result.append(f'<subsection xml:id="subsec-{header_id}">')
                    result.append(f'<title>{title}</title>')
                    open_stack.append((level, 'subsection'))
                else:
                    result.append(f'<paragraphs xml:id="para-{header_id}">')
                    result.append(f'<title>{title}</title>')
                    open_stack.append((level, 'paragraphs'))
                i += 1
                continue
            
            callout_match = re.match(r'__CALLOUT_START_(\w+)\|([^|]*)\|__CALLOUT_BODY__\|(.+)\|__CALLOUT_END__', line)
            if callout_match:
                flush_para()
                ptx_type = callout_match.group(1).rstrip('_')
                title = callout_match.group(2)
                body = callout_match.group(3)
                
                if title:
                    result.append(f'<{ptx_type}>')
                    result.append(f'<title>{title}</title>')
                    result.append(f'<p>{body}</p>')
                    result.append(f'</{ptx_type}>')
                else:
                    result.append(f'<{ptx_type}>')
                    result.append(f'<p>{body}</p>')
                    result.append(f'</{ptx_type}>')
                i += 1
                continue
            
            blockquote_match = re.match(r'__BLOCKQUOTE__\|(.+)\|__END_BLOCKQUOTE__', line)
            if blockquote_match:
                flush_para()
                text = blockquote_match.group(1)
                result.append(f'<blockquote><p>{text}</p></blockquote>')
                i += 1
                continue
            
            if line.startswith('<ul>') or line.startswith('<ol>'):
                flush_para()
                result.append(line)
                i += 1
                continue
            
            if line.startswith('<li>') or line.startswith('</ul>') or line.startswith('</ol>'):
                result.append(line)
                i += 1
                continue
            
            if line.startswith('<md>'):
                flush_para()
                result.append(line)
                i += 1
                continue
            
            if line.startswith('<program'):
                flush_para()
                result.append(line)
                i += 1
                continue
            
            if line.startswith('</md>') or line.startswith('</program>') or line.startswith('</code>') or line.startswith('<code>'):
                result.append(line)
                i += 1
                continue
            
            current_para.append(line)
            i += 1
        
        flush_para()
        
        while open_stack:
            _, tag = open_stack.pop()
            result.append(f'</{tag}>')
        
        return '\n'.join(result)

    def convert_content(self, content: str) -> str:
        """Apply all conversions to content."""
        content = self.process_callouts(content)
        content = self.convert_code_blocks(content)
        content = self.convert_math(content)
        content = self.convert_wikilinks(content)
        content = self.convert_links(content)
        content = self.convert_headers(content)
        content = self.convert_lists(content)
        content = self.convert_blockquotes(content)
        content = self.convert_inline_formatting(content)
        content = self.finalize_structure(content)
        
        content = re.sub(r'<p>\s*</p>', '', content)
        content = re.sub(r'\n{3,}', '\n\n', content)
        
        return content.strip()

    def parse_note(self, filepath: Path) -> Note:
        """Parse a single Obsidian note."""
        with open(filepath, 'r', encoding='utf-8') as f:
            raw_content = f.read()
        
        frontmatter, content = self.parse_frontmatter(raw_content)
        
        title = frontmatter.get('title', filepath.stem)
        tags = frontmatter.get('tags', [])
        if isinstance(tags, str):
            tags = [t.strip() for t in tags.split(',')]
        
        aliases = frontmatter.get('aliases', [])
        if isinstance(aliases, str):
            aliases = [a.strip() for a in aliases.split(',')]
        
        xml_id = self.generate_xml_id(title, filepath)
        links_to = self.extract_wikilinks(content)
        
        return Note(
            filepath=filepath,
            title=title,
            xml_id=xml_id,
            content=content,
            tags=tags,
            aliases=aliases,
            created=frontmatter.get('created'),
            modified=frontmatter.get('modified'),
            links_to=links_to,
            frontmatter=frontmatter
        )

    def build_lookup_tables(self):
        """Build title/alias to xml:id lookup tables."""
        for note in self.notes.values():
            self.title_to_id[note.title.lower()] = note.xml_id
            self.title_to_id[note.filepath.stem.lower()] = note.xml_id
            
            for alias in note.aliases:
                self.alias_to_id[alias.lower()] = note.xml_id

    def compute_backlinks(self):
        """Compute backlinks for all notes."""
        for source_id, source_note in self.notes.items():
            for target_title in source_note.links_to:
                target_id = self.title_to_id.get(target_title.lower())
                if not target_id:
                    target_id = self.alias_to_id.get(target_title.lower())
                
                if target_id and target_id in self.notes:
                    self.notes[target_id].backlinks.add(source_note.xml_id)

    def generate_pretext_section(self, note: Note) -> str:
        """Generate PreTeXt XML for a single note."""
        converted_content = self.convert_content(note.content)
        
        tags_comment = ''
        if note.tags:
            tags_comment = f'<!-- tags: {", ".join(note.tags)} -->\n'
        
        backlinks_section = ''
        if note.backlinks:
            backlinks_section = '\n<paragraphs>\n<title>Backlinks</title>\n<p>\n'
            backlinks_section += 'This note is referenced by: '
            refs = [f'<xref ref="{bl}"/>' for bl in sorted(note.backlinks)]
            backlinks_section += ', '.join(refs)
            backlinks_section += '\n</p>\n</paragraphs>'
        
        return f'''{tags_comment}<section xml:id="{note.xml_id}">
<title>{note.title}</title>

{converted_content}
{backlinks_section}
</section>
'''

    def scan_notes(self):
        """Scan input directory for Markdown files."""
        self.log(f"Scanning {self.input_dir} for notes...")
        
        for md_file in self.input_dir.rglob('*.md'):
            if md_file.name.startswith('.'):
                continue
            
            try:
                note = self.parse_note(md_file)
                self.notes[note.xml_id] = note
                self.log(f"Parsed: {note.title} -> {note.xml_id}")
            except Exception as e:
                print(f"[ERROR] Failed to parse {md_file}: {e}")

    def convert_all(self):
        """Convert all notes to PreTeXt."""
        self.scan_notes()
        self.build_lookup_tables()
        self.compute_backlinks()
        
        self.output_dir.mkdir(parents=True, exist_ok=True)
        
        for note in self.notes.values():
            pretext_content = self.generate_pretext_section(note)
            
            output_file = self.output_dir / f"{note.xml_id}.ptx"
            with open(output_file, 'w', encoding='utf-8') as f:
                f.write(pretext_content)
            
            self.log(f"Written: {output_file}")
        
        self.generate_includes_file()
        
        print(f"\nConverted {len(self.notes)} notes to {self.output_dir}")

    def generate_includes_file(self):
        """Generate a file with xi:include statements for all notes."""
        includes = []
        for note in sorted(self.notes.values(), key=lambda n: n.title.lower()):
            includes.append(f'<xi:include href="{note.xml_id}.ptx"/>')
        
        includes_content = '\n'.join(includes)
        output_file = self.output_dir / '_includes.ptx'
        
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(f'''<!-- Auto-generated includes for converted notes -->
<!-- Copy these into your chapter file -->

{includes_content}
''')
        
        self.log(f"Generated includes file: {output_file}")

    def generate_graph_json(self, output_path: str):
        """Generate notes-graph.json for graph visualization."""
        nodes = []
        links = []
        
        for note in self.notes.values():
            nodes.append({
                'id': note.xml_id,
                'title': note.title,
                'url': f'{note.xml_id}.html',
                'tags': note.tags,
                'aliases': note.aliases,
                'description': note.content[:100].strip() + '...' if len(note.content) > 100 else note.content.strip()
            })
            
            for target_title in note.links_to:
                target_id = self.title_to_id.get(target_title.lower())
                if not target_id:
                    target_id = self.alias_to_id.get(target_title.lower())
                
                if target_id:
                    links.append({
                        'source': note.xml_id,
                        'target': target_id,
                        'type': 'reference'
                    })
            
            for backlink_id in note.backlinks:
                links.append({
                    'source': backlink_id,
                    'target': note.xml_id,
                    'type': 'backlink'
                })
        
        unique_links = []
        seen = set()
        for link in links:
            key = (link['source'], link['target'])
            if key not in seen:
                seen.add(key)
                unique_links.append(link)
        
        graph_data = {
            'nodes': nodes,
            'links': unique_links
        }
        
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(graph_data, f, indent=2)
        
        print(f"Generated graph data: {output_path}")


def main():
    parser = argparse.ArgumentParser(
        description='Convert Obsidian Markdown notes to PreTeXt XML'
    )
    parser.add_argument('input_dir', help='Obsidian vault or notes directory')
    parser.add_argument('output_dir', help='Output directory for PreTeXt files')
    parser.add_argument('-v', '--verbose', action='store_true', help='Verbose output')
    parser.add_argument('--generate-graph', action='store_true', 
                        help='Generate notes-graph.json for visualization')
    parser.add_argument('--graph-output', default='notes-graph.json',
                        help='Path for graph JSON output')
    
    args = parser.parse_args()
    
    if not os.path.isdir(args.input_dir):
        print(f"Error: Input directory not found: {args.input_dir}")
        sys.exit(1)
    
    converter = ObsidianToPreText(
        args.input_dir,
        args.output_dir,
        verbose=args.verbose
    )
    
    converter.convert_all()
    
    if args.generate_graph:
        converter.generate_graph_json(args.graph_output)


if __name__ == '__main__':
    main()
