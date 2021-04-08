const isWx = typeof wx == 'object';
const prefix = '' //partner_';

class Store {
  constructor() {
    this.store = isWx ? wx : window.localStorage;
    this.prefix = prefix;
  }
  set(key, value, fn) {
    if (isWx) {
      this.store.setStorageSync(this.prefix + key, value);
    }else{
      try {
        value = JSON.stringify(value);
      } catch (e) {
        value = value;
      }
      this.store.setItem(this.prefix + key, value);
    }

    fn && fn();
  }
  get(key, fn) {
    if (!key) {
      throw new Error('没有找到key。');
      return;
    }
    if (typeof key === 'object') {
      throw new Error('key不能是一个对象。');
      return;
    }
    let value = '';
    if (isWx) {
      value = this.store.getStorageSync(this.prefix + key);
    }else{
      value = this.store.getItem(this.prefix + key);
      if (value !== null) {
        try {
          value = JSON.parse(value);
        } catch (e) {
          value = value;
        }
      }
    }
    return value;
  }
  remove(key) {
    if (isWx) {
      this.store.removeStorageSync(this.prefix + key);
    }else{
      this.store.removeItem(this.prefix + key);
    }
  }
  clear(){
    if (isWx) {
      this.store.clearStorage(); //使用异步
    }else{
      this.store.clear();
    }
  }
}
export default new Store();
