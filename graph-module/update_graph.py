import os
import json
import xml.etree.ElementTree as ET
import re

def get_title(elem):
    title_elem = elem.find('title')
    if title_elem is not None:
        return "".join(title_elem.itertext()).strip()
    return None

def get_tags(elem):
    tags = []
    # 1. Existing <tag> elements
    for tag in elem.findall('.//tag'):
        text = "".join(tag.itertext()).strip()
        if text:
            if not re.match(r'^\d{8,}', text):
                if ',' in text:
                    tags.extend([t.strip().lower() for t in text.split(',')])
                else:
                    tags.append(text.lower())
    # 2. Index terms <idx><term> or <idx>
    for idx in elem.findall('.//idx'):
        term = idx.find('term')
        if term is not None:
            text = "".join(term.itertext()).strip()
            if text:
                tags.append(text.lower())
        else:
            text = "".join(idx.itertext()).strip()
            if text:
                tags.append(text.lower())
    
    # 3. Hashtags in text #geometric-algebra
    text_content = "".join(elem.itertext())
    hashtags = re.findall(r'#([\w-]+)', text_content)
    tags.extend([h.replace('-', ' ').lower() for h in hashtags])
    
    return sorted(list(set(tags)))

def get_description(elem):
    # Try to find a paragraph that is not metadata
    for p in elem.findall('.//p'):
        text = "".join(p.itertext()).strip()
        if "Note ID:" in text or "Tags:" in text or "🔗" in text or "🖇️" in text:
            continue
        if text:
            text = " ".join(text.split())
            if len(text) > 120: text = text[:117] + "..."
            return text
    # Fallback to statement if no p found or if statement has direct text
    stmt = elem.find('.//statement')
    if stmt is not None:
        text = "".join(stmt.itertext()).strip()
        if text and not any(x in text for x in ["Note ID:", "Tags:", "🔗", "🖇️"]):
            text = " ".join(text.split())
            if len(text) > 120: text = text[:117] + "..."
            return text
    return ""

def update_graph():
    source_dir = 'source'
    nodes = {}
    links = []
    id_to_file_id = {}
    supported_tags = ['chapter', 'section', 'subsection', 'appendix', 'claim', 'definition', 'example', 
                      'theorem', 'lemma', 'proposition', 'corollary', 'identity', 'gi', 'glossary']

    # Group colors (Obsidian-like)
    group_colors = {
        "scribing": "#4a90e2",
        "backmatter": "#9013fe",
        "glossary": "#f59e0b",
        "frontmatter": "#7ed321",
        "meta": "#f5a623",
        "bridges": "#50e3c2",
        "eigenotes": "#d0021b",
        "field-notes": "#f8e71c",
        "practice-problems": "#ff6b6b",
        "foundations": "#4ecdc4",
        "default": "#a0a0a0"
    }

    def get_group(filepath):
        parts = filepath.split(os.sep)
        if os.path.basename(filepath) == 'glossary.ptx' or 'glossary' in parts: return 'glossary'
        if 'scribing' in parts:
            idx = parts.index('scribing')
            if idx + 1 < len(parts) and os.path.isdir(os.path.join(*parts[:idx+2])):
                return parts[idx+1]
            return 'scribing'
        if 'backmatter' in parts: return 'backmatter'
        if 'frontmatter' in parts: return 'frontmatter'
        if 'meta' in parts: return 'meta'
        if 'practice-problems' in parts: return 'practice-problems'
        if 'foundations' in parts: return 'foundations'
        # Fallback to the first directory under 'source'
        if 'source' in parts:
            idx = parts.index('source')
            if idx + 1 < len(parts):
                folder = parts[idx+1]
                if not folder.endswith('.ptx'):
                    return folder
        return 'default'

    # Pass 1: Collect Nodes
    for root_dir, dirs, files in os.walk(source_dir):
        for file in files:
            if file.endswith('.ptx'):
                if file == 'prototypes.ptx':
                    continue
                filepath = os.path.join(root_dir, file)
                group = get_group(filepath)
                color = group_colors.get(group, group_colors['default'])
                
                try:
                    tree = ET.parse(filepath)
                    root = tree.getroot()
                    file_main_id = root.get('{http://www.w3.org/XML/1998/namespace}id')
                    for elem in tree.iter():
                        xml_id = elem.get('{http://www.w3.org/XML/1998/namespace}id')
                        if xml_id and elem.tag in supported_tags:
                            title = get_title(elem) or xml_id
                            tags = get_tags(elem)
                            description = get_description(elem)
                            # Logic for foundation: is it in a foundation folder or has foundation tags?
                            is_foundation = 'foundations' in tags or 'geometric algebra' in tags or 'backmatter' in filepath
                            nodes[xml_id] = {
                                "id": xml_id, "title": title, "tags": tags, 
                                "description": description, "file_path": filepath, 
                                "is_foundation": is_foundation, "tag_type": elem.tag,
                                "group": group, "color": color
                            }
                            if elem.tag in ['chapter', 'section', 'appendix', 'glossary']:
                                id_to_file_id[xml_id] = xml_id
                            else:
                                id_to_file_id[xml_id] = file_main_id
                except: continue

    # Pass 2: Collect Links
    for root_dir, dirs, files in os.walk(source_dir):
        for file in files:
            if file.endswith('.ptx'):
                if file == 'prototypes.ptx':
                    continue
                filepath = os.path.join(root_dir, file)
                try:
                    with open(filepath, 'r') as f:
                        content = f.read()
                    
                    # Map IDs to positions for attribution
                    id_positions = []
                    for match in re.finditer(r'xml:id="([^"]+)"', content):
                        mid = match.group(1)
                        if mid in nodes:
                            id_positions.append((match.start(), mid))
                    id_positions.sort()

                    # Find xrefs (including commented out)
                    xref_pattern = re.compile(r'([^<]{0,200})<xref\s+ref="([^"]+)"')
                    for match in xref_pattern.finditer(content):
                        context = match.group(1)
                        ref_id = match.group(2)
                        
                        if ref_id in nodes:
                            # Attribute to nearest preceding node ID
                            source_id = None
                            for pos, xml_id in reversed(id_positions):
                                if pos < match.start():
                                    source_id = xml_id
                                    break
                            
                            if source_id and source_id != ref_id:
                                # Determine link type
                                link_type = "reference"
                                if any(x in context for x in ["Linked Notes", "🔗", "🖇️", "see-also", "Related"]):
                                    link_type = "related"
                                elif "builds on" in context.lower():
                                    link_type = "builds-on"
                                
                                # Prerequisite logic: foundation -> dependent
                                if nodes[ref_id].get('is_foundation') and not nodes[source_id].get('is_foundation'):
                                    links.append({"source": ref_id, "target": source_id, "type": "prerequisite", "weight": 3})
                                elif nodes[source_id].get('is_foundation') and not nodes[ref_id].get('is_foundation'):
                                    links.append({"source": source_id, "target": ref_id, "type": "prerequisite", "weight": 3})
                                else:
                                    links.append({"source": source_id, "target": ref_id, "type": link_type, "weight": 2})
                except: continue

    # Finalize nodes with correct URLs
    final_nodes = []
    for node_id, node_data in nodes.items():
        file_id = id_to_file_id.get(node_id, node_id)
        url = f"{file_id}.html" if file_id == node_id else f"{file_id}.html#{node_id}"
        final_nodes.append({
            "id": node_id,
            "title": node_data['title'],
            "url": url,
            "tags": node_data['tags'],
            "description": node_data['description'],
            "group": node_data['group'],
            "color": node_data['color']
        })

    # Deduplicate links and ensure types are valid
    valid_types = ["reference", "prerequisite", "builds-on", "related", "backlink"]
    unique_links = []
    seen_links = set()
    for link in links:
        if link['type'] not in valid_types: link['type'] = "reference"
        key = (link['source'], link['target'])
        if key not in seen_links:
            unique_links.append(link)
            seen_links.add(key)

    output = {
        "$schema": "notes-graph-schema.json",
        "nodes": final_nodes,
        "links": unique_links
    }
    
    with open('graph-module/notes-graph.json', 'w') as f:
        json.dump(output, f, indent=2)
    
    print(f"Graph updated: {len(final_nodes)} nodes, {len(unique_links)} links.")

if __name__ == "__main__":
    update_graph()
