import Cookies from 'js-cookie';
import cookieService from '../cookie-service';
import { UserRole } from '../../../server/src/generated/schema-types';

jest.mock('js-cookie');

const mockedCookies = Cookies as jest.Mocked<typeof Cookies>;

describe('Utils - cookieService', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
    delete process.env.REACT_APP_AUTH_TOKEN;
  });

  afterEach(() => {
    process.env = OLD_ENV;
  });

  it('cookieService get should get the cookie', () => {
    mockedCookies.get.mockReturnValueOnce('DUMMY');

    expect(cookieService.getToken()).toBe('DUMMY');
  });

  it('cookieService set should set the cookie', () => {
    cookieService.setToken('sample');

    expect(mockedCookies.set).toHaveBeenCalledWith('_t', 'sample');
  });

  it('cookieService set should delete user token from cookies', () => {
    cookieService.deleteToken();
    expect(mockedCookies.remove).toHaveBeenCalledWith('_t');
  });

  it('cookieService set should delete user data from cookies', () => {
    cookieService.deleteUser();
    expect(mockedCookies.remove).toHaveBeenCalledWith('user');
  });

  it('cookieService set should save user data in cookies', () => {
    const user = { id: 'id', role: UserRole.Buddy };
    cookieService.setUser(user);
    expect(mockedCookies.set).toHaveBeenCalledWith('user', user);
  });

  it('cookieService set should get user data from cookies', () => {
    const user = { id: 'id', role: UserRole.Buddy };
    mockedCookies.get.mockReturnValueOnce(JSON.stringify(user) as any);
    const expectedUser = cookieService.getUser();
    expect(expectedUser).toEqual(user);
  });
});
