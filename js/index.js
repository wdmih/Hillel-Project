import router from './router/Router';
import routeHandlers from './router/route-handlers';

router.add('/', routeHandlers.indexPage);
router.add('/:slug', routeHandlers.detailPage);
router.add('/schedule', routeHandlers.schedule);
router.add('/admin-panel', routeHandlers.adminPanel);

router.init();

window.addEventListener('load', function(e) {
  router.nav(window.location.pathname);
});

// Перехват ссылок
let navitems = document.getElementById('main-menu');
navitems.addEventListener('click', function(e) {
  e.preventDefault();
  let target = e.target;
  if (target.tagName === 'A') {
    router.nav(target.attributes['href'].value);
  }
});

window.addEventListener('popstate', function(e) {
  router.nav(window.location.pathname);
});
