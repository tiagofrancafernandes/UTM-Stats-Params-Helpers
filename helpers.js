class LocalStorageHelper {
  storage_name = 'storage_items'
  constructor (storageName = 'storage_items') {
    if (typeof storageName !== 'string') {
      storageName = 'storage_items'
    }

    this.storage_name = storageName
  }

  static isJson (value) {
    try {
      if (typeof value !== 'string') {
        return false
      }

      JSON.parse(value)
      return true
    } catch (error) {
      return false
    }
    return false
  }

  get items () {
    let value = localStorage.getItem(this.storage_name)

    return isJson(value) ? JSON.parse(value) || {} : {}
  }

  toJson () {
    return JSON.stringify(this.items)
  }

  toString () {
    return this.toJson()
  }

  setItems (content) {
    localStorage.setItem(this.storage_name, JSON.stringify(content))

    return this
  }

  setItem (key, value) {
    if (typeof key !== 'string') {
      return this
    }

    let items = this.items || {}
    items[key] = value

    return this.setItems(items)
  }

  hasItem (key) {
    if (typeof key !== 'string') {
      return false
    }

    let items = this.items || {}

    if (items.hasOwnProperty(key)) {
      return true
    }

    return false
  }

  getItem (key, defaultValue = null) {
    if (typeof key !== 'string') {
      return defaultValue
    }

    if (!this.hasItem(key)) {
      return defaultValue
    }

    let items = this.items || {}
    return items[key]
  }

  getOrSet (key, value) {
    if (typeof key !== 'string') {
      return value
    }

    if (!this.hasItem(key)) {
      this.setItem(key, value)
    }

    return this.getItem(key, value)
  }
}
