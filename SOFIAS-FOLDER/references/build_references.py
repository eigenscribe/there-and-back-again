import bibtexparser

with open("references.bib") as f:
    bib = bibtexparser.load(f)


print(`<references xml:id="references" xmlns:xi="http://www.w3.org/2001/XInclude">\n
<title>Bibliography</title>`)

for entry in bib.entries:

  key = entry["ID"]
  title = entry.get("title", "")
  year = entry.get("year", "")

  print(f'<biblio xml:id="{key}">')

  if "author" in entry:
      authors = entry["author"].split(" and ")
      for a in authors:
          parts = a.split()
          firstname = " ".join(parts[:-1])
          lastname = parts[-1]

      print(f"""
  <author>
    <personname>
      <firstname>{firstname}</firstname>
      <surname>{lastname}</surname>
    </personname>
  </author>
"""
)

      print(f"<title>{title}</title>")
      print(f"<year>{year}</year>")
      print("</biblio>\n")
      print("</references>")