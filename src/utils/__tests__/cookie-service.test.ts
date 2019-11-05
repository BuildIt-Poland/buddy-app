import Cookies from 'js-cookie';
import cookieService from '../cookie-service';

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

  it('auth.get should get the cookie', () => {
    mockedCookies.get.mockReturnValueOnce('DUMMY');

    expect(cookieService.getToken()).toBe('DUMMY');
  });

  it('auth.set should set the cookie', () => {
    cookieService.setToken('sample');

    expect(mockedCookies.set).toHaveBeenCalledWith('_t', 'sample');
  });
});
