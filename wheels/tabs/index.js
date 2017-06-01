class Tabs {
  constructor (options) {
    let defaultOptions = {
      element: '',
      navSelector: '[data-role="tabs-nav"]',
      panesSelector: '[data-role="tabs-panes"]',
      activeClassName: 'active'
    }

    this.options = Object.assign({}, defaultOptions, options);
    this.checkOptions().bindEvents().setDefault()
  }

  checkOptions() {
    if (!this.options.element) {
      throw new Error('element is required')
    }
    return this
  }

  bindEvents() {
    dom.on(this.options.element, 'click', `${this.options.navSelector} > li`, (event, element) => {
      let selectIndex = dom.index(element);
      let areaEle = this.options.element.querySelector(this.options.panesSelector).children
      dom.uniqueClass(element, this.options.activeClassName)
      dom.uniqueClass(areaEle[selectIndex], this.options.activeClassName)
    })
    return this
  }

  setDefault () {
    document.querySelector(`${this.options.navSelector} > li:first-child`).click()
    return this
  }
}