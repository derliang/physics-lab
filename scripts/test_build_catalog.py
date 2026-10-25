#!/usr/bin/env python3
# Copyright (c) 2026 derliang. All rights reserved.
# Non-commercial use only. See LICENSE.md.
# Contact: derliang@gmail.com
"""Tests for build_catalog.py. Run: python scripts/test_build_catalog.py"""
import copy
import json
import sys
import tempfile
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import build_catalog as bc  # noqa: E402

GOOD = {
    "manifestVersion": 2,
    "title": "測試動畫",
    "subtitle": "副標題文字",
    "category": "waves",
    "description": "這是一段用來測試目錄產生器的動畫簡介文字，長度需要超過三十個字才會通過檢查。",
    "keywords": ["駐波", "共振", "頻率"],
    "highlights": ["比較兩種邊界條件下駐波的形成方式。", "改變階數並數出波節與波腹的數目。", "調整張力，觀察波速與頻率的變化。"],
    "howto": "先選擇邊界類型，再拖動弦長與張力滑桿，畫面會即時更新並顯示對應數值。",
    "model": "理想弦的線性駐波模型，波速由張力與線密度決定，忽略阻尼與端點的能量損失。",
    "devices": ["ipad-landscape", "desktop"],
    "tint": "navy",
    "status": "published",
    "updated": "2026-10-25",
}
ICON = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72" fill="none"><path d="M8 36H{x}" stroke="#1f3a68" stroke-width="3"/><circle cx="36" cy="36" r="4" fill="#ec9730"/></svg>'


def webp_header(w, h):
    body = b"VP8X" + (10).to_bytes(4, "little") + b"\0\0\0\0" + (w - 1).to_bytes(3, "little") + (h - 1).to_bytes(3, "little")
    return b"RIFF" + (len(body) + 4).to_bytes(4, "little") + b"WEBP" + body


class BuildCatalogTest(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.root = Path(self.tmp.name)
        self.n = 0

    def tearDown(self):
        self.tmp.cleanup()

    def sim(self, slug="test-sim", category="waves", manifest=None, icon=None, report=True, index=True):
        self.n += 1
        folder = self.root / "simulations" / category / slug
        folder.mkdir(parents=True)
        if index:
            (folder / "index.html").write_text("<!doctype html>", encoding="utf-8")
        data = copy.deepcopy(GOOD)
        data["category"] = category
        if manifest is not None:
            manifest(data)
        (folder / "manifest.json").write_text(json.dumps(data, ensure_ascii=False), encoding="utf-8")
        if icon is not False:
            (folder / "icon.svg").write_text(icon or ICON.format(x=60 + self.n), encoding="utf-8")
        if report:
            (folder / "TEST_REPORT.md").write_text("# report", encoding="utf-8")
        return folder

    def errors(self):
        with self.assertRaises(bc.CatalogError) as ctx:
            bc.build(self.root)
        return "\n".join(ctx.exception.errors)

    def test_valid_entry(self):
        self.sim()
        catalog = bc.build(self.root)
        self.assertEqual(len(catalog), 1)
        item = catalog[0]
        self.assertEqual(item["path"], "simulations/waves/test-sim/")
        self.assertEqual(item["icon"], "simulations/waves/test-sim/icon.svg")
        self.assertIsNone(item["cover"])
        self.assertNotIn("status", item)

    def test_hidden_is_validated_but_not_listed(self):
        self.sim("a-sim")
        self.sim("b-sim", manifest=lambda d: d.update(status="hidden"))
        self.assertEqual([x["path"] for x in bc.build(self.root)], ["simulations/waves/a-sim/"])
        self.sim("c-sim", manifest=lambda d: d.update(status="hidden", howto="短"))
        self.assertIn("howto", self.errors())

    def test_optional_subtitle(self):
        self.sim(manifest=lambda d: d.pop("subtitle"))
        self.assertNotIn("subtitle", bc.build(self.root)[0])

    def test_manifest_rules(self):
        cases = {
            "缺少必要欄位": lambda d: d.pop("highlights"),
            "不允許的欄位": lambda d: d.update(path="x/"),
            "manifestVersion": lambda d: d.update(manifestVersion=1),
            "title": lambda d: d.update(title="駐波｜共振"),
            "category": lambda d: d.update(category="optics"),
            "description": lambda d: d.update(description="太短"),
            "keywords": lambda d: d.update(keywords=["駐波", "駐波", "共振"]),
            "highlights": lambda d: d.update(highlights=["太短", "也太短", "還是短"]),
            "model": lambda d: d.update(model="x" * 201),
            "devices": lambda d: d.update(devices=["desktop"]),
            "tint": lambda d: d.update(tint="red"),
            "status": lambda d: d.update(status="draft"),
            "updated": lambda d: d.update(updated="2026-02-30"),
        }
        for expected, change in cases.items():
            with self.subTest(expected):
                self.tearDown(); self.setUp()
                self.sim(manifest=change)
                self.assertIn(expected, self.errors())

    def test_icon_rules(self):
        cases = {
            "不允許的元素 <text>": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72"><text>A</text></svg>',
            "不在色票內": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72"><path d="M0 0H9" stroke="#ff0000" stroke-width="3"/></svg>',
            "不允許的屬性 onload": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72" onload="x()"><path d="M0 0H9" stroke="#1f3a68" stroke-width="3"/></svg>',
            "stroke-width=1": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72"><path d="M0 0H9" stroke="#1f3a68" stroke-width="1"/></svg>',
            "未設定 stroke-width": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72"><path d="M0 0H9" stroke="#1f3a68"/></svg>',
            "viewBox": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M0 0H9" stroke="#1f3a68" stroke-width="3"/></svg>',
            "最多 3 種": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72" stroke-width="3"><path d="M0 0H1" stroke="#1f3a68"/><path d="M0 0H2" stroke="#2f9c90"/><path d="M0 0H3" stroke="#a65f00"/><path d="M0 0H4" stroke="#bd5b84"/></svg>',
            "不是合法的": '<svg xmlns="http://www.w3.org/2000/svg"',
            "DOCTYPE": '<!DOCTYPE svg [<!ENTITY a "b">]><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72"/>',
            "不允許的屬性 href": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 72 72"><path xlink:href="http://x" d="M0 0H9" stroke="#1f3a68" stroke-width="3"/></svg>',
        }
        for expected, svg in cases.items():
            with self.subTest(expected):
                self.tearDown(); self.setUp()
                self.sim(icon=svg)
                self.assertIn(expected, self.errors())

    def test_inherited_stroke_width_is_accepted(self):
        self.sim(icon='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72"><g stroke="#1f3a68" stroke-width="2.5"><path d="M0 0H9"/></g></svg>')
        self.assertEqual(len(bc.build(self.root)), 1)

    def test_duplicate_icon(self):
        self.sim("a-sim", icon=ICON.format(x=60))
        self.sim("b-sim", icon=ICON.format(x=60))
        self.assertIn("完全相同", self.errors())

    def test_required_files(self):
        self.sim("no-icon", icon=False)
        self.sim("no-report", report=False)
        self.sim("no-index", index=False)
        orphan = self.root / "simulations" / "waves" / "orphan"
        orphan.mkdir(parents=True)
        (orphan / "index.html").write_text("x", encoding="utf-8")
        text = self.errors()
        for expected in ("no-icon: 缺少 icon.svg", "no-report: 缺少 TEST_REPORT.md", "no-index: 缺少 index.html", "orphan: 缺少 manifest.json"):
            self.assertIn(expected, text)

    def test_folder_rules(self):
        self.sim("Bad_Slug")
        self.sim("x-sim", category="biology")
        text = self.errors()
        self.assertIn("slug", text)
        self.assertIn("分類 biology", text)

    def test_cover(self):
        folder = self.sim()
        (folder / "cover.webp").write_bytes(webp_header(1600, 900))
        self.assertEqual(bc.build(self.root)[0]["cover"], "simulations/waves/test-sim/cover.webp")
        (folder / "cover.webp").write_bytes(webp_header(1280, 720))
        self.assertIn("1600×900", self.errors())
        (folder / "cover.webp").write_bytes(webp_header(1600, 900) + b"\0" * (300 * 1024))
        self.assertIn("300 KB", self.errors())

    def test_template_text_and_icon_are_rejected(self):
        templates = bc.ROOT / "docs" / "templates"
        template = json.loads((templates / "manifest.json").read_text(encoding="utf-8"))
        self.sim(manifest=lambda d: (d.clear(), d.update(template)))
        (self.root / "docs" / "templates").mkdir(parents=True)
        (self.root / "docs" / "templates" / "icon.svg").write_bytes((templates / "icon.svg").read_bytes())
        self.sim("copied-icon", icon=(templates / "icon.svg").read_text(encoding="utf-8"))
        text = self.errors()
        self.assertIn("【請填】", text)
        self.assertIn("範本", text)

    def test_repository_catalog_passes(self):
        catalog = bc.build(bc.ROOT)
        self.assertTrue(all(x["path"].startswith("simulations/") for x in catalog))


if __name__ == "__main__":
    unittest.main(verbosity=1)
