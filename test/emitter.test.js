const Emitter = require('../emitter');
let emitter;

beforeEach(() => {
  emitter = new Emitter();
});

describe("Basic emitter", () => {
  it("should react to created events", () =>
    new Promise((resolve, reject) => {
      const eventName = 'test-event';
      const eventArg = 'test arg';
      emitter.listen(eventName, arg => {
        expect(arg).toEqual(eventArg);
        resolve();
      });
      emitter.emit(eventName, eventArg);
    })
  , 100);

  it("should behave normally with a ttl specified", () =>
    new Promise((resolve, reject) => {
      const eventName = 'test-event';
      const eventArg = 'test arg';
      emitter.listen(eventName, arg => {
        expect(arg).toEqual(eventArg);
        resolve();
      }, '10 minutes');
      setTimeout(() => {
        emitter.emit(eventName, eventArg);
      }, 500);
    })
  , 1000);

  it("should not react on expired events", () =>
    new Promise((resolve, reject) => {
      const eventName = 'test-event';
      const eventArg = 'test arg';
      emitter.listen(eventName, arg => {
        reject('Emitter reacted to an expired event');
      }, '2 seconds');
      setTimeout(() => {
        emitter.emit(eventName, eventArg);
      }, 2100);
      setTimeout(() => {
        resolve();
      }, 2200);
    })
  , 5000);

  it("should throw an error on wrong ttl format", () => {
    expect(() => emitter.listen('test', () => {}, '2 suconds')).toThrow('TTL format is wrong');
  }, 5000);

  it("shouldn't throw an error when only miliseconds are specified", () => {
    expect(() => emitter.listen('test', () => {}, '3000')).not.toThrow();
  }, 5000);

  it("should work when only miliseconds are specified", () => 
    new Promise((resolve, reject) => {
      const eventName = 'test-event';
      const eventArg = 'test arg';
      emitter.listen(eventName, arg => {
        expect(arg).toEqual(eventArg);
        resolve();
      }, '2 seconds');
      setTimeout(() => {
        emitter.emit(eventName, eventArg);
      }, 100);
    })
  , 200);
});