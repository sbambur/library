export const DOMAIN = 'http://localhost:3001';

class Api {
  domain: string;

  constructor(domain: string) {
    this.domain = domain;
  }

  async preform(url?: string, data?: any, config?: { method: string }) {
    const request = await fetch(`${this.domain}/${url}`, {
      ...config,
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json',
      },
    });

    return await request.json();
  }

  async get(path = {}) {
    return await this.preform(`${path}`);
  }

  async post<T>(path: string, payload: T) {
    return await this.preform(path, payload, {
      method: 'POST',
    });
  }

  async put<T>(path: string, payload: T) {
    return await this.preform(path, payload, {
      method: 'PUT',
    });
  }

  async delete(path: string) {
    return await this.preform(path, {
      method: 'DELETE',
    });
  }
}

export default new Api(DOMAIN);
