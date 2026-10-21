#!/usr/bin/env python3
"""Build Physics Lab catalog from isolated simulation manifests."""
import json
import re
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
ALLOWED={"mechanics","thermal","waves","electromagnetism","optics","modern","experiments"}
# Homepage/catalog only: files and direct URLs remain published by GitHub Pages.
HIDDEN_FROM_CATALOG={
    "simulations/waves/ripple-tank-lab/",
    "simulations/waves/ripple-wave-superposition/",
}
catalog=[]
for entry in sorted((ROOT/"simulations").glob("*/*/index.html")):
    if not (entry.parent/"manifest.json").is_file():
        raise SystemExit(f"Missing manifest.json: {entry.parent}")
for file in sorted((ROOT/"simulations").rglob("manifest.json")):
    relative=file.relative_to(ROOT)
    if len(relative.parts) != 4:
        raise SystemExit(f"Invalid manifest location: {relative}")
    category,slug=relative.parts[1],relative.parts[2]
    if category not in ALLOWED:
        raise SystemExit(f"Invalid category: {relative}")
    if not re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", slug):
        raise SystemExit(f"Invalid slug: {slug}")
    entry=file.parent/"index.html"
    if not entry.is_file():
        raise SystemExit(f"Missing animation index.html: {entry}")
    obj=json.loads(file.read_text(encoding="utf-8"))
    if not isinstance(obj,dict) or set(obj)!={"title","category","description","keywords"}:
        raise SystemExit(f"Invalid manifest keys: {file}")
    if obj["category"] != category:
        raise SystemExit(f"Category mismatch: {file}")
    if not all(isinstance(obj[x],str) and 0<len(obj[x])<=180 for x in ("title","description")):
        raise SystemExit(f"Missing/invalid text: {file}")
    if not isinstance(obj["keywords"],list) or len(obj["keywords"])>20 or any(not isinstance(s,str) or not s.strip() or len(s)>50 for s in obj["keywords"]):
        raise SystemExit(f"Invalid keywords: {file}")
    catalog_path=f"simulations/{category}/{slug}/"
    if catalog_path not in HIDDEN_FROM_CATALOG:
        catalog.append({**obj,"path":catalog_path})
(ROOT/"simulations.json").write_text(json.dumps(catalog,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
print(f"Catalog generated: {len(catalog)} animations")

