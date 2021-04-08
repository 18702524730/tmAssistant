/**
 * 
 * @param {*} fn 
 * @param {*} delay 延迟 
 * @param {*} immediate 是否立即执行
 */
export function _debounce (fn, delay, immediate) {
  var timer;
  return function (...rest) {
    if (!timer && immediate) {
      fn.apply(this, rest);
    }
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      timer = null;
      if (!immediate) {
        fn.apply(this, rest)
      }
    }, delay);
  }
}

export function _throttle (fn, delay) {
  var timer, start;
  return function (...rest) {
    var now = +new Date();
    if (!start) {
      start = now
    }
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    if (start - now > delay) {
      fn.apply(this, rest);
      start = now;
    }
    timer = setTimeout(() => {
      fn.apply(this, fn);
      timer = null;
    }, delay)
  }
}
