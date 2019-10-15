import Cookies from 'js-cookie';

enum AUTH {
  TOKEN = '_t',
}

class Auth {
  getToken() {
    return Cookies.get(AUTH.TOKEN);
  }

  setToken(newToken: string) {
    return Cookies.set(AUTH.TOKEN, newToken);
  }
}

const instance = new Auth();
Object.freeze(instance);

export default instance;
