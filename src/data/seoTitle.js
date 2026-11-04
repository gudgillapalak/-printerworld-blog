// Adds the brand to a page title when it fits in a normal 70-character search title.
export function pageTitle(seoTitle) {
  const suffix = ' | Printerworld'
  return seoTitle.length + suffix.length <= 70 ? seoTitle + suffix : seoTitle
}
