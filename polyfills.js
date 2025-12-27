// Polyfills críticos para Safari 11-15
// Se carga ANTES de React para asegurar compatibilidad

// IntersectionObserver polyfill (Safari 11-12)
if (typeof IntersectionObserver === 'undefined') {
  window.IntersectionObserver = class IntersectionObserver {
    constructor(callback, options = {}) {
      this.callback = callback;
      this.elements = new Set();
      this.options = options;
    }
    observe(element) {
      this.elements.add(element);
      // Fallback: trigger inmediatamente como visible
      requestAnimationFrame(() => {
        this.callback([{ target: element, isIntersecting: true }], this);
      });
    }
    unobserve(element) {
      this.elements.delete(element);
    }
    disconnect() {
      this.elements.clear();
    }
  };
}

// Object.hasOwn polyfill (Safari < 15.4)
if (!Object.hasOwn) {
  Object.hasOwn = function (obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
  };
}

// Array.prototype.at polyfill (Safari < 15.4)
if (!Array.prototype.at) {
  Array.prototype.at = function (index) {
    var len = this.length >>> 0;
    var relativeIndex = index >> 0;
    var k = relativeIndex >= 0 ? relativeIndex : len + relativeIndex;
    if (k < 0 || k >= len) return undefined;
    return this[k];
  };
}

// structuredClone polyfill (Safari < 15.4)
if (typeof structuredClone === 'undefined') {
  window.structuredClone = function (obj) {
    return JSON.parse(JSON.stringify(obj));
  };
}

// Promise.allSettled polyfill (Safari < 13)
if (!Promise.allSettled) {
  Promise.allSettled = function (promises) {
    return Promise.all(
      promises.map(function (promise) {
        return Promise.resolve(promise)
          .then(function (value) {
            return { status: 'fulfilled', value: value };
          })
          .catch(function (reason) {
            return { status: 'rejected', reason: reason };
          });
      })
    );
  };
}

// Proxy trap fix para Safari 13-14 (fix para framer-motion)
if (typeof Proxy !== 'undefined') {
  var OriginalProxy = Proxy;
  window.Proxy = function (target, handler) {
    // Safari bug: handler.get puede fallar en animaciones
    if (handler && typeof handler.get === 'function') {
      var originalGet = handler.get;
      handler.get = function (target, prop, receiver) {
        try {
          return originalGet.call(this, target, prop, receiver);
        } catch (e) {
          // Fallback silencioso
          return target[prop];
        }
      };
    }
    return new OriginalProxy(target, handler);
  };
  window.Proxy.revocable = OriginalProxy.revocable;
}
