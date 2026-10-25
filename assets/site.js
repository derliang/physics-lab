/*
Copyright (c) 2026 derliang. All rights reserved.
Non-commercial use only. See LICENSE.md.
Authorization inquiries: derliang@gmail.com
*/
// Physics Lab 平台共用程式：首頁與介紹頁都只從 simulations.json 產生畫面。
// 動畫上架只交資料（manifest.json、icon.svg），不得修改本檔。規範見 PUBLISHING.md。
(function () {
  'use strict';

  const TOPICS = [
    { id: 'mechanics', no: '01', name: '力學', desc: '運動、力、動量、能量、圓周運動' },
    { id: 'thermal', no: '02', name: '熱學', desc: '溫度、熱量、熱傳、氣體定律' },
    { id: 'waves', no: '03', name: '波動', desc: '行進波、駐波、干涉、繞射' },
    { id: 'electromagnetism', no: '04', name: '電磁學', desc: '電場、磁場、電路、電磁感應' },
    { id: 'optics', no: '05', name: '光學', desc: '反射、折射、透鏡、光的干涉' },
    { id: 'modern', no: '06', name: '近代物理', desc: '原子模型、量子、核物理' },
    { id: 'experiments', no: '07', name: '實驗與數據', desc: '測量、圖表、數據分析' }
  ];
  const TINTS = ['navy', 'teal', 'ochre', 'plum', 'rose', 'slate'];
  const DEVICES = { 'ipad-landscape': 'iPad 橫向', 'desktop': '桌機', 'phone-landscape': '手機橫向', 'phone-portrait': '手機直向' };
  const SLUG = '[a-z0-9]+(?:-[a-z0-9]+)*';
  const topicById = (id) => TOPICS.find((t) => t.id === id);

  // ── 小工具：一律以 textContent 寫入資料，不使用 innerHTML ──
  function el(tag, attrs, children) {
    const node = document.createElement(tag);
    for (const [key, value] of Object.entries(attrs || {})) {
      if (value === null || value === undefined || value === false) continue;
      if (key === 'text') node.textContent = value;
      else if (key === 'className') node.className = value;
      else node.setAttribute(key, value === true ? '' : String(value));
    }
    for (const child of [].concat(children || [])) {
      if (child) node.append(child);
    }
    return node;
  }
  const isText = (v, max) => typeof v === 'string' && v.trim().length > 0 && v.length <= max;
  const isTextList = (v, min, max, len) => Array.isArray(v) && v.length >= min && v.length <= max && v.every((s) => isText(s, len));

  function validEntry(x) {
    if (!x || typeof x !== 'object' || !topicById(x.category)) return false;
    const path = new RegExp('^simulations/' + x.category + '/' + SLUG + '/$');
    return path.test(x.path) &&
      x.icon === x.path + 'icon.svg' &&
      (x.cover === null || x.cover === x.path + 'cover.webp') &&
      isText(x.title, 20) && (x.subtitle === undefined || isText(x.subtitle, 20)) &&
      isText(x.description, 120) && isText(x.howto, 150) && isText(x.model, 200) &&
      isTextList(x.keywords, 3, 12, 12) && isTextList(x.highlights, 3, 5, 60) &&
      Array.isArray(x.devices) && x.devices.length > 0 && x.devices.every((d) => DEVICES[d]) &&
      TINTS.includes(x.tint) && /^\d{4}-\d{2}-\d{2}$/.test(x.updated);
  }

  async function loadCatalog() {
    const response = await fetch('./simulations.json', { cache: 'no-store' });
    if (!response.ok) throw new Error('catalog unavailable');
    const data = await response.json();
    if (!Array.isArray(data) || !data.every(validEntry)) throw new Error('invalid catalog');
    return data;
  }

  const simId = (x) => x.path.replace(/^simulations\//, '').replace(/\/$/, '');
  const infoHref = (x) => 'info.html?sim=' + simId(x);

  function plate(x, className) {
    return el('div', { className: 'plate' + (className ? ' ' + className : ''), 'data-tint': x.tint, 'aria-hidden': 'true' },
      el('img', { src: x.icon, alt: '', width: 72, height: 72, loading: 'lazy', decoding: 'async' }));
  }

  // 手機版的搜尋列預設收合，按放大鏡展開。
  function setupSearchToggle() {
    const toggle = document.querySelector('.search-toggle');
    const form = document.querySelector('.search-form');
    if (!toggle || !form) return;
    toggle.addEventListener('click', () => {
      const open = !form.classList.contains('is-open');
      form.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      if (open) form.querySelector('input').focus();
    });
  }

  // ── 首頁 ──
  function initHome() {
    const nav = document.getElementById('topic-nav');
    const content = document.getElementById('content');
    const hero = document.getElementById('hero');
    const heroCta = document.getElementById('hero-cta');
    const heroMeta = document.getElementById('hero-meta');
    const form = document.querySelector('.search-form');
    const search = document.getElementById('search');
    const params = new URLSearchParams(location.search);
    if (params.get('q')) search.value = params.get('q');

    let sims = [];
    let state = 'loading';
    const byTopic = (id) => sims.filter((x) => x.category === id);
    // 沒有動畫的主題不可選；網址指到空主題時一律回到「全部」。
    const currentTopic = () => {
      const id = decodeURIComponent(location.hash.slice(1));
      return topicById(id) && byTopic(id).length ? id : 'all';
    };

    function card(x) {
      const label = x.title + (x.subtitle ? '｜' + x.subtitle : '') + '，閱讀介紹';
      return el('a', { className: 'card', href: infoHref(x), 'aria-label': label }, [
        plate(x),
        el('div', { className: 'card-body' }, [
          el('h3', { text: x.title }),
          x.subtitle ? el('span', { className: 'card-sub', text: x.subtitle }) : null,
          el('p', { className: 'card-desc', text: x.description }),
          el('span', { className: 'card-kw', text: x.keywords.slice(0, 3).join('・') }),
          el('span', { className: 'card-more', 'aria-hidden': 'true', text: '閱讀介紹 →' })
        ])
      ]);
    }

    function sectionHead(no, title, desc, count) {
      return el('div', { className: 'section-head' }, [
        el('div', { className: 'section-title' }, [
          no ? el('span', { className: 'section-no', text: no }) : null,
          el('h2', { text: title }),
          desc ? el('span', { className: 'section-desc', text: desc }) : null
        ]),
        count ? el('span', { className: 'section-count', text: count }) : null
      ]);
    }

    function topicSection(t) {
      const list = byTopic(t.id);
      return el('section', { className: 'section', 'aria-label': t.name }, [
        sectionHead(t.no, t.name, t.desc, list.length + ' 支動畫'),
        el('div', { className: 'cards' }, list.map(card))
      ]);
    }

    function notice(text, linkText, href) {
      return el('div', { className: 'notice', role: 'status' }, [
        el('div', { text }),
        linkText ? el('a', { href, text: linkText }) : null
      ]);
    }

    // 有動畫的主題是連結並顯示支數；沒有動畫的主題只顯示名稱、不可點選。
    function renderNav(active) {
      const items = [{ id: 'all', name: '全部', count: sims.length }].concat(
        TOPICS.map((t) => ({ id: t.id, name: t.name, count: byTopic(t.id).length })));
      nav.replaceChildren(...items.map((t) => {
        const meta = el('span', { className: 'topic-meta', text: state === 'ready' && t.count ? t.count + ' 支' : '' });
        if (state === 'ready' && !t.count && t.id !== 'all') {
          return el('span', { className: 'topic is-empty', 'aria-disabled': 'true' }, [el('span', { className: 'topic-name', text: t.name }), meta]);
        }
        return el('a', { className: 'topic', href: '#' + t.id, 'aria-current': t.id === active ? 'page' : null }, [
          el('span', { className: 'topic-name', text: t.name }), meta]);
      }));
    }

    function render() {
      const active = currentTopic();
      const query = search.value.trim().toLocaleLowerCase();
      renderNav(query ? null : active);
      const blocks = [];
      hero.hidden = Boolean(query) || active !== 'all';
      if (state === 'loading') blocks.push(notice('動畫目錄載入中…'));
      else if (state === 'error') blocks.push(notice('動畫目錄無法載入，請稍後重新整理。'));
      else if (query) {
        const hits = sims.filter((x) => [x.title, x.subtitle || '', x.description, x.keywords.join(' '), topicById(x.category).name].join(' ').toLocaleLowerCase().includes(query));
        blocks.push(el('section', { className: 'section', 'aria-label': '搜尋結果' }, [
          sectionHead('', '搜尋結果', '「' + search.value.trim() + '」', hits.length + ' 支動畫'),
          hits.length ? el('div', { className: 'cards' }, hits.map(card)) : notice('目前沒有符合條件的動畫，可以換個關鍵字或清除搜尋。')
        ]));
      } else if (active === 'all') {
        const open = TOPICS.filter((t) => byTopic(t.id).length);
        open.forEach((t) => blocks.push(topicSection(t)));
        if (!open.length) blocks.push(notice('目前尚無已上架的動畫。'));
      } else {
        blocks.push(topicSection(topicById(active)));
      }
      content.replaceChildren(...blocks);
      const topic = topicById(active);
      document.title = (query ? '搜尋「' + search.value.trim() + '」' : topic ? topic.name : '互動物理實驗室') + '｜Physics Lab';
    }

    function renderHero() {
      const open = TOPICS.filter((t) => byTopic(t.id).length);
      heroMeta.textContent = '已開放 ' + open.length + ' 個主題・' + sims.length + ' 支動畫';
      if (open.length === 1) {
        heroCta.textContent = '瀏覽' + open[0].name + '動畫';
        heroCta.setAttribute('href', '#' + open[0].id);
      }
    }

    form.addEventListener('submit', (ev) => { ev.preventDefault(); render(); });
    search.addEventListener('input', render);
    window.addEventListener('hashchange', () => {
      search.value = '';
      render();
      if (currentTopic() !== 'all') nav.scrollIntoView({ block: 'start' });
    });
    setupSearchToggle();
    render();
    loadCatalog().then((data) => { sims = data; state = 'ready'; renderHero(); }, () => { state = 'error'; }).then(render);
  }

  // ── 介紹頁 ──
  function initInfo() {
    const main = document.getElementById('info');
    const crumbs = document.getElementById('crumbs');
    setupSearchToggle();
    const sim = new URLSearchParams(location.search).get('sim') || '';

    function notFound(text) {
      crumbs.replaceChildren(
        el('li', {}, el('a', { href: 'index.html', text: '首頁' })),
        el('li', { 'aria-hidden': 'true', text: '›' }),
        el('li', { 'aria-current': 'page', text: '找不到動畫' }));
      main.replaceChildren(el('div', { className: 'notice', role: 'status' }, [
        el('div', { text }), el('a', { href: 'index.html', text: '← 回到首頁' })]));
    }

    if (!new RegExp('^[a-z]+/' + SLUG + '$').test(sim)) { notFound('網址格式不正確，找不到這支動畫。'); return; }
    loadCatalog().then((sims) => {
      const x = sims.find((s) => simId(s) === sim);
      if (!x) { notFound('找不到這支動畫，可能已經下架或網址有誤。'); return; }
      const topic = topicById(x.category);
      document.title = x.title + '｜Physics Lab';
      const description = document.querySelector('meta[name="description"]');
      if (description) description.setAttribute('content', x.description);

      crumbs.replaceChildren(
        el('li', {}, el('a', { href: 'index.html', text: '首頁' })),
        el('li', { 'aria-hidden': 'true', text: '›' }),
        el('li', {}, el('a', { href: 'index.html#' + topic.id, text: topic.name })),
        el('li', { 'aria-hidden': 'true', text: '›' }),
        el('li', { 'aria-current': 'page', text: x.title }));

      const start = () => el('a', { className: 'btn', href: x.path }, ['開始實驗', el('span', { 'aria-hidden': 'true', text: '↗' })]);
      const figure = x.cover
        ? el('figure', { className: 'figure info-figure' }, [
          el('img', { className: 'cover', src: x.cover, alt: x.title + '的動畫畫面', width: 1600, height: 900 }),
          el('figcaption', {}, [el('span', { className: 'fig-label', text: 'FIG.' }), x.title + '的動畫畫面'])])
        : el('figure', { className: 'figure info-figure' }, plate(x));
      const related = sims.filter((s) => s.category === x.category && s !== x).slice(0, 3);

      main.replaceChildren(el('div', { className: 'info-layout' }, [
        el('article', { className: 'info-main' }, [
          el('div', { className: 'info-head' }, [
            el('span', { className: 'eyebrow', text: topic.name + '｜互動模擬' }),
            el('h1', { text: x.title }),
            x.subtitle ? el('span', { className: 'info-sub', text: x.subtitle }) : null,
            el('p', { className: 'lede', text: x.description })
          ]),
          figure,
          el('div', { className: 'cta-inline' }, [start(),
            x.devices.includes('phone-portrait') ? null : el('span', { className: 'cta-hint', text: '建議將手機轉為橫向操作' })]),
          el('section', { className: 'info-section' }, [
            el('h2', { text: '觀察重點' }),
            el('ol', { className: 'highlights' }, x.highlights.map((h) => el('li', { text: h })))
          ]),
          el('div', { className: 'info-pair' }, [
            el('section', { className: 'info-section' }, [el('h2', { text: '操作方式' }), el('p', { text: x.howto })]),
            el('section', { className: 'info-section' }, [el('h2', { text: '物理模型與限制' }), el('p', { text: x.model })])
          ])
        ]),
        el('aside', { className: 'info-aside', 'aria-label': '動畫資訊' }, [
          el('div', { className: 'aside-card' }, [
            x.cover ? plate(x) : null,
            start(),
            el('dl', { className: 'meta' }, [
              el('dt', { text: '主題' }), el('dd', { text: topic.name }),
              el('dt', { text: '建議裝置' }), el('dd', { text: x.devices.map((d) => DEVICES[d]).join('・') }),
              el('dt', { text: '更新日期' }), el('dd', { text: x.updated })
            ]),
            el('div', { className: 'tags', 'aria-label': '關鍵字' }, x.keywords.map((k) => el('span', { className: 'tag', text: k })))
          ]),
          el('nav', { className: 'related', 'aria-label': '同主題動畫' }, [
            related.length ? el('div', { className: 'related-title', text: '同主題動畫' }) : null,
            ...related.map((s) => el('a', { className: 'related-item', href: infoHref(s) }, [plate(s), s.title])),
            el('a', { className: 'back-link', href: 'index.html#' + topic.id, text: '← 回到' + topic.name + '全部動畫' })
          ])
        ])
      ]));
    }, () => notFound('動畫目錄無法載入，請稍後重新整理。'));
  }

  document.addEventListener('DOMContentLoaded', () => {
    const page = document.body.dataset.page;
    if (page === 'home') initHome();
    if (page === 'info') initInfo();
    if (page === 'about') setupSearchToggle();
  });
})();
