// 목차: 좁은 화면에서는 접어 두고, 지금 읽는 제목을 목차에 표시한다. (tools/build-site.mjs가 만든다)
(function () {
  var toc = document.querySelector('.toc');
  if (!toc) return;
  var narrow = window.matchMedia('(max-width: 1023px)');
  if (narrow.matches) toc.open = false;
  toc.addEventListener('click', function (e) { if (e.target.closest('a') && narrow.matches) toc.open = false; });
  var links = {};
  toc.querySelectorAll('a[href^="#"]').forEach(function (a) { links[decodeURIComponent(a.getAttribute('href').slice(1))] = a; });
  if (!('IntersectionObserver' in window)) return;
  var current = null;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      var a = links[e.target.id];
      if (!e.isIntersecting || !a) return;
      if (current) current.classList.remove('active');
      current = a;
      a.classList.add('active');
    });
  }, { rootMargin: '0px 0px -70% 0px' });
  document.querySelectorAll('.md h2[id], .md h3[id]').forEach(function (h) { io.observe(h); });
})();
