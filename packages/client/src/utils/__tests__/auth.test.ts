import Cookies from 'js-cookie';
import { AuthPayload, UserRole } from '@buddy-app/schema';
import Auth from '../auth';

jest.mock('js-cookie');

const mockedCookies = Cookies as jest.Mocked<typeof Cookies>;

describe('Utils - auth', () => {
  const authPayload: AuthPayload = {
    role: UserRole.Buddy,
    token: 'test',
    userId: 'randomId',
  };

  beforeEach(() => {
    jest.resetModules();
  });

  it('auth.getToken should return the token', () => {
    mockedCookies.get.mockReturnValueOnce(JSON.stringify(authPayload));

    expect(Auth.getToken()).toBe(authPayload.token);
  });

  it('auth.getUser should return the User data', () => {
    mockedCookies.get.mockReturnValueOnce(JSON.stringify(authPayload));

    expect(Auth.getUser()).toHaveProperty('role');
  });

  it('auth.setUser should set the cookie', () => {
    Auth.setUser(authPayload);

    expect(mockedCookies.set).toHaveBeenCalledWith(
      'auth/user',
      JSON.stringify(authPayload),
      { expires: 1, sameSite: 'strict' }
    );
  });

  it('auth.removeUser should remove the cookie', () => {
    Auth.setUser(authPayload);
    Auth.removeUser();

    expect(Auth.getToken()).toBe(null);
  });

  it('auth.getForgotPasswordToken should return the token', () => {
    mockedCookies.get.mockReturnValueOnce(JSON.stringify(authPayload));

    expect(Auth.getForgotPasswordToken()).toBe(authPayload.token);
  });

  it('auth.getForgotPasswordUser should return the token', () => {
    mockedCookies.get.mockReturnValueOnce(JSON.stringify(authPayload));

    expect(Auth.getForgotPasswordUser()).toHaveProperty('role');
  });

  it('auth.setForgotPasswordUser should set the cookie', () => {
    Auth.setForgotPasswordUser(authPayload);

    expect(mockedCookies.set).toHaveBeenCalledWith(
      'auth/forgot-password',
      JSON.stringify(authPayload),
      { expires: 1 / 24, sameSite: 'strict' }
    );
  });

  it('auth.removeForgotPasswordUser should remove the cookie', () => {
    Auth.setForgotPasswordUser(authPayload);
    Auth.removeForgotPasswordUser();

    expect(Auth.getForgotPasswordUser()).toBe(null);
  });
});
