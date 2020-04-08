import Cookies from 'js-cookie';
import { AuthPayload } from '@buddy-app/schema';

enum AUTH {
  USER = 'auth/user',
  FORGOT_PASSWORD = 'auth/forgot-password-user',
}

const userKey: string = process.env.REACT_APP_AUTH || AUTH.USER;
const forgotPasswordKey: string = AUTH.FORGOT_PASSWORD;

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
    const data = this._getData(userKey);

    return data ? data.token : null;
  }

  getUser() {
    return this._getData(userKey);
  }

  setUser(auth: AuthPayload) {
    return Cookies.set(userKey, JSON.stringify(auth), {
      expires: 1,
      sameSite: 'strict',
    });
  }

  removeUser() {
    return Cookies.remove(userKey);
  }

  getForgotPasswordToken(): string | null {
    const data = this._getData(forgotPasswordKey);

    return data ? data.token : null;
  }

  getForgotPasswordUser() {
    return this._getData(forgotPasswordKey);
  }

  setForgotPasswordUser(auth: AuthPayload) {
    return Cookies.set(forgotPasswordKey, JSON.stringify(auth), {
      expires: 1 / 24,
      sameSite: 'strict',
    });
  }

  removeForgotPasswordUser() {
    return Cookies.remove(forgotPasswordKey);
  }
}

const instance = new Auth();
Object.freeze(instance);

export default instance;
