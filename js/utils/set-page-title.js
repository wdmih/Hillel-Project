const pageTitle = document.getElementById('page-title');
const pageTitleBackdrop = document.getElementById('title-backdrop');

export default function setPageTitle(title) {
  pageTitle.innerHTML = pageTitleBackdrop.innerHTML = title;
}
