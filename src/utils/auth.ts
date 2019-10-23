import Cookies from 'js-cookie';

enum AUTH {
  TOKEN = '_t',
}

class Auth {
  getToken() {
    return Cookies.get(process.env.REACT_APP_AUTH_TOKEN || AUTH.TOKEN);
  }

  setToken(newToken: string) {
    return Cookies.set(process.env.REACT_APP_AUTH_TOKEN || AUTH.TOKEN, newToken);
  }
}

const instance = new Auth();
Object.freeze(instance);

export default instance;
