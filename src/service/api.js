import { API_URL, API_KEY } from '@env';

class API {
  constructor(opts) {
    this.options = opts || {};
    this.defaults = {
      api_key: this.options.apiKey,
      api_secret: this.options.apiSecret,
      user: this.options.user,
      password: this.options.password,
      format: 'json'
    };

  }
  async get(opt) {
    let url = new URL(API_URL);
    for (const key in Object.assign(opt, this.defaults)) {
      if (Object.prototype.hasOwnProperty.call(opt, key)) {
        url.searchParams.set(key, opt[key])
      }
    }
    const response = await fetch(url);
    const data = await response.json();

    if (response?.ok) {
      return Promise.resolve(data)
    }
    return Promise.reject(data)
  }
}

export const api = new API({ apiKey: API_KEY })
