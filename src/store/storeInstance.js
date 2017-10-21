const wrapper = {
  instance: null,
}

module.exports = {
  register: function register(instance) {
    wrapper.instance = instance;
  },

  get instance() {
    return wrapper.instance;
  },

  get dispatch() {
    return wrapper.instance.dispatch;
  }
}
