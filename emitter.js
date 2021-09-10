class EventEmitter11 {
  constructor() {
    this.events = {};

    this.ttlKeywords = {
      '': 1,
      'seconds': 1000,
      'minutes': 60 * 1000,
      'hours': 60 * 60 * 1000,
      'days': 24 * 60 * 60 * 1000
    }
  }

  _parseTTL(ttl) {
    if (!ttl.match(/\d+(|seconds|minutes|hours|days)/g))
      throw new Error('TTL format is wrong');
    const [n, w] = ttl.split(' ');
    return this.ttlKeywords[w] * parseInt(n);
  }

  listen(name, func, ttl) {
    if (!this.events[name])
      this.events[name] = [];
    const expiration = !ttl ? -1 : Date.now() + _parseTTL(ttl);
    this.events[name].push({
      func,
      expiration
    });
  }

  emit(name, ...args) {
    const now = Date.now();
    this.events[name].filter(e => e.expiration < now).forEach(e => e.func(...args));
  }
}