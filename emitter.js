class EventEmitter11 {
  constructor() {
    this.events = {};

    this.ttlKeywords = {
      '': 1,
      'second': 1000,
      'minute': 60 * 1000,
      'hour': 60 * 60 * 1000,
      'day': 24 * 60 * 60 * 1000
    }
  }

  _parseTTL(ttl) {
    if (!ttl.match(/^\d+(| ((second|minute|hour|day)(|s)))$/g))
      throw new Error('TTL format is wrong: ', ttl);
    const [n, w] = ttl.split(' ');
    return this.ttlKeywords[(w || '').replace(/s$/g, '')] * parseInt(n);
  }

  listen(name, func, ttl) {
    if (!this.events[name])
      this.events[name] = [];
    const expiration = !ttl ? -1 : Date.now() + this._parseTTL(ttl);
    this.events[name].push({
      func,
      expiration
    });
  }

  emit(name, ...args) {
    const now = Date.now();
    this.events[name]
      .filter(e => e.expiration > 0 && e.expiration < now)
      .forEach(e => this.events[name].splice(this.events[name].indexOf(e), 1));
    this.events[name].forEach(e => e.func(...args));
  }
}

module.exports = EventEmitter11;