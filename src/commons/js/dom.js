  export function getRect(el) {
      if (el instanceof window.SVGElement) {
          let rect = el.getBoundingClientRect()
          return {
              top: rect.top,
              left: rect.left,
              width: rect.width,
              height: rect.height   
          }
      } else {
          return {
              top: el.offsetTop,
              left: el.offsetLeft,
              width: el.offsetWidth,
              height: el.offsetHeight
          }
      }
  }

  export function hasClass (el, className) {
      if (!el || !className) {
          return
      }
      let reg = new RegExp(`(^|\\s)${ className }(\\s|$)`)
      return reg.test(el.className)
  }

  export function addClass (el, className) {
      if (!el || !className) {
        return
      }

      if (!hasClass(el, className)) {
        const classNames = el.className.split(' ')
        classNames.push(className)
        el.className = classNames.join(' ')
      }
  }

  export function removeClass (el, className) {
    if (!el || !className) {
        return 
    }

    if (hasClass(el, className)) {
        const reg = new RegExp(`(^|\\s)${ className }(\\s|$)`, 'g')
        el.className = el.className.replace(reg, '')
    }
  }

  export function getData (el, name, val)  {
      let prefix = 'data-'
      if (val) {
          return el.setAttribute(prefix + name, val)
      } else {
          return el.getAttribute(prefix + name)
      }
  }