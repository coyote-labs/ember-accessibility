export function applyStyles(element, values) {
  Object.keys(values).forEach((styleprop) => {
    element.style[styleprop] = values[styleprop];
  });
}

export function resetStyles(element, values) {
  if (values) {
    values.forEach((styleprop) => {
      element.style[styleprop] = '';
    });
  } else {
    element.style = '';
  }
}

export default { applyStyles, resetStyles };
