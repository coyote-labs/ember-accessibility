export default function(popOverElem, buttonElem) {
  let buttonElemPos = buttonElem.getBoundingClientRect();
  let topPos = buttonElemPos.top - (popOverElem.clientHeight / 2) + (buttonElemPos.height *  0.5) + window.scrollY;
  let leftRightPos = buttonElemPos.left - popOverElem.clientWidth - (buttonElemPos.width *  0.5);
  let arrowPos = '';

  if (topPos < 0) {
    arrowPos = buttonElemPos.top + (buttonElemPos.height *  0.5);
    topPos = 0;
  }

  let popOverPos;
  let calcPopOverPos = buttonElemPos.left + popOverElem.clientWidth;
  if (calcPopOverPos > window.innerWidth) {
    popOverPos = 'left';
  } else {
    leftRightPos = buttonElemPos.left + (buttonElemPos.width * 1.5);
    popOverPos = 'right';
  }

  return {
    popOverPos,
    topPos,
    leftRightPos,
    arrowPos
  };

}
