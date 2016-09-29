import ReactDOM from 'react-dom';

export function moveElement(ref, length, offsetX, offsetY, callback) {
  let element = ReactDOM.findDOMNode(ref);

  let currentPos = {
    x: element.offsetLeft + element.offsetWidth/2,
    y: element.offsetTop + element.offsetHeight/2
  }

  TweenMax.to(element, length, {
    transform: `translateX(${-currentPos.x+offsetX}px) translateY(${-currentPos.y+offsetY}px)`,
    ease: Power3.easeOut,
    onComplete: () => {
      callback(element);
    }
  });
}