import Cookies from 'js-cookie';
import { AuthPayload } from '@buddy-app/schema';

enum AUTH {
  USER = 'auth/user',
}

const key: string = process.env.REACT_APP_AUTH || AUTH.USER;

class Auth {
  _getData = (key: string): AuthPayload | null => {
    const value = Cookies.get(key) || '';
    try {
      return JSON.parse(value);
    } catch (e) {
      return null;
    }
  };

  getToken(): string | null {
    const data = this._getData(key);

    return data ? data.token : null;
  }

  getUser() {
    return this._getData(key);
  }

  setUser(auth: AuthPayload) {
    return Cookies.set(key, JSON.stringify(auth));
  }

  removeUser() {
    return Cookies.remove(key);
  }
}

const instance = new Auth();
Object.freeze(instance);

export default instance;
