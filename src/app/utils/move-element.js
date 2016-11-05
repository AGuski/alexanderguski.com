export default function moveElement(options) {
  let params = {
    element: options.element,
    duration: options.duration || 0,
    offsetX: options.offsetX || false,
    offsetY: options.offsetY || false,
    callback: options.onComplete
  };

  let currentPos = {
    x: params.element.offsetLeft + params.element.offsetWidth/2,
    y: params.element.offsetTop + params.element.offsetHeight/2
  }

  let amount = {
    x: params.offsetX ? -currentPos.x+params.offsetX : 0,
    y: params.offsetY ? -currentPos.y+params.offsetY : 0
  }

  TweenMax.to(params.element, params.duration, {
    transform: `translateX(${amount.x}px) translateY(${amount.y}px)`,
    ease: Power3.easeOut,
    onComplete: () => {
      params.callback(params.element);
    }
  });
}