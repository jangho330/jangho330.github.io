/* Publications: year filter + search */
(function () {
  var chips = document.querySelectorAll('#publications .chip');
  var pubs = document.querySelectorAll('#pub-list .pub');
  var q = document.querySelector('#publications .search');
  var empty = document.getElementById('pub-empty');
  if (!chips.length || !pubs.length) return;
  // Start on whichever chip is pre-selected in the HTML (the most recent year)
  var pressed = document.querySelector('#publications .chip[aria-pressed="true"]');
  var yr = pressed ? pressed.getAttribute('data-yr') : 'all';
  function apply() {
    var s = q ? q.value.trim().toLowerCase() : '';
    var shown = 0;
    pubs.forEach(function (p) {
      var okYr = yr === 'all' || p.getAttribute('data-yr') === yr;
      var okQ = !s || p.textContent.toLowerCase().indexOf(s) !== -1;
      var show = okYr && okQ;
      p.hidden = !show;
      if (show) shown++;
    });
    if (empty) empty.hidden = shown > 0;
  }
  chips.forEach(function (c) {
    c.addEventListener('click', function () {
      chips.forEach(function (x) { x.setAttribute('aria-pressed', 'false'); });
      c.setAttribute('aria-pressed', 'true');
      yr = c.getAttribute('data-yr');
      apply();
    });
  });
  if (q) q.addEventListener('input', apply);
  apply();
})();

/* Posts index: tag filter (also reads ?tag= from the URL) */
(function () {
  var list = document.getElementById('post-list');
  if (!list) return;
  var chips = document.querySelectorAll('.page .chip[data-tag]');
  var cards = list.querySelectorAll('.card');
  var empty = document.getElementById('post-empty');
  function select(tag) {
    var shown = 0;
    chips.forEach(function (c) { c.setAttribute('aria-pressed', c.getAttribute('data-tag') === tag ? 'true' : 'false'); });
    cards.forEach(function (card) {
      var tags = (card.getAttribute('data-tags') || '').split('|');
      var show = tag === 'all' || tags.indexOf(tag) !== -1;
      card.hidden = !show;
      if (show) shown++;
    });
    if (empty) empty.hidden = shown > 0;
  }
  chips.forEach(function (c) {
    c.addEventListener('click', function () {
      var tag = c.getAttribute('data-tag');
      select(tag);
      var url = new URL(window.location);
      if (tag === 'all') url.searchParams.delete('tag'); else url.searchParams.set('tag', tag);
      history.replaceState(null, '', url);
    });
  });
  var initial = new URLSearchParams(window.location.search).get('tag');
  if (initial) {
    var match = Array.prototype.some.call(chips, function (c) { return c.getAttribute('data-tag') === initial; });
    if (match) select(initial);
  }
})();

/* Posts: turn a bare YouTube URL on its own line into an embedded player */
(function () {
  var paras = document.querySelectorAll('.post-content p');
  if (!paras.length) return;
  var re = /^(?:https?:\/\/)?(?:www\.|m\.)?(?:youtube\.com\/(?:watch\?(?:[^#\s]*&)?v=|shorts\/|embed\/|live\/)|youtu\.be\/)([\w-]{11})(?:[?&#][^\s]*)?$/;
  paras.forEach(function (p) {
    var onlyLink = p.children.length === 0 || (p.children.length === 1 && p.children[0].tagName === 'A');
    if (!onlyLink) return;
    var m = p.textContent.trim().match(re);
    if (!m) return;
    var wrap = document.createElement('div');
    wrap.className = 'video';
    var f = document.createElement('iframe');
    f.src = 'https://www.youtube-nocookie.com/embed/' + m[1];
    f.title = 'YouTube video';
    f.loading = 'lazy';
    f.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    f.referrerPolicy = 'strict-origin-when-cross-origin';
    f.allowFullscreen = true;
    wrap.appendChild(f);
    p.replaceWith(wrap);
  });
})();
