import Cookies from 'js-cookie';
import { authPayloadMock } from '__mocks__';
import Auth from '../auth';

jest.mock('js-cookie');

const mockedCookies = Cookies as jest.Mocked<typeof Cookies>;

describe('Utils - auth', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('auth.getToken should return the token', () => {
    mockedCookies.get.mockReturnValueOnce(JSON.stringify(authPayloadMock));

    expect(Auth.getToken()).toBe(authPayloadMock.token);
  });

  it('auth.getUser should return the User data', () => {
    mockedCookies.get.mockReturnValueOnce(JSON.stringify(authPayloadMock));

    expect(Auth.getUser()).toHaveProperty('role');
  });

  it('auth.setUser should set the cookie', () => {
    Auth.setUser(authPayloadMock);

    expect(mockedCookies.set).toHaveBeenCalledWith(
      'auth/user',
      JSON.stringify(authPayloadMock),
      { expires: 1, sameSite: 'strict' }
    );
  });

  it('auth.removeUser should remove the cookie', () => {
    Auth.setUser(authPayloadMock);
    Auth.removeUser();

    expect(Auth.getToken()).toBe(null);
  });

  it('auth.getForgotPasswordToken should return the token', () => {
    mockedCookies.get.mockReturnValueOnce(JSON.stringify(authPayloadMock));

    expect(Auth.getForgotPasswordToken()).toBe(authPayloadMock.token);
  });

  it('auth.getForgotPasswordUser should return the token', () => {
    mockedCookies.get.mockReturnValueOnce(JSON.stringify(authPayloadMock));

    expect(Auth.getForgotPasswordUser()).toHaveProperty('role');
  });

  it('auth.setForgotPasswordUser should set the cookie', () => {
    Auth.setForgotPasswordUser(authPayloadMock);

    expect(mockedCookies.set).toHaveBeenCalledWith(
      'auth/forgot-password-user',
      JSON.stringify(authPayloadMock),
      { expires: 1 / 24, sameSite: 'strict' }
    );
  });

  it('auth.removeForgotPasswordUser should remove the cookie', () => {
    Auth.setForgotPasswordUser(authPayloadMock);
    Auth.removeForgotPasswordUser();

    expect(Auth.getForgotPasswordUser()).toBe(null);
  });
});
