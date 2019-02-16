let title = document.getElementById('page-title');
let titleBackdrop = document.getElementById('title-backdrop');
export default function doPushState(pageTitle, pagePath) {
  let state = {};
  title.innerHTML = titleBackdrop.innerHTML = pageTitle;
  let path = pagePath;
  history.pushState(state, title, path);
};
