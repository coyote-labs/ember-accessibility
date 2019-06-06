function getElementStyles(node, prop) {
  return getComputedStyle(node, null).getPropertyValue(prop);
}

function doesElementHasScroll(node) {
  let regex = /(auto|scroll)/;
  return regex.test(
    getElementStyles(node, 'overflow')
    + getElementStyles(node, 'overflow-y')
    + getElementStyles(node, 'overflow-x')
  );
}

function findScrollContainer(node) {
  if (!node || node === document.body) {
    return document;
  }

  if (doesElementHasScroll(node)) {
    return node;
  }

  return findScrollContainer(node.parentNode);
}

export default function(node) {
  return findScrollContainer(node);
}
