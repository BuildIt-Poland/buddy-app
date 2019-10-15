import Cookies from 'js-cookie';
import Auth from '../auth';

jest.mock('js-cookie');

const mockedCookies = Cookies as jest.Mocked<typeof Cookies>;

describe('Utils - auth', () => {
  it('auth.get should get the cookie', () => {
    mockedCookies.get.mockReturnValueOnce('DUMMY');

    expect(Auth.getToken()).toBe('DUMMY');
  });

  it('auth.set should set the cookie', () => {
    Auth.setToken('sample');

    expect(mockedCookies.set).toHaveBeenCalledWith('_t', 'sample');
  });
});
