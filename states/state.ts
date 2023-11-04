import { atom } from 'recoil';

export interface UserInfo {
  id: number | null;
  email: string | null;
  userName: string | null;
  nickname: string | null;
  profileMessage: string | null;
  profileImageLink: string | null;
}

interface AccessTokenInfo {
  accessToken: string | null;
  accessTokenExpiredIn: number | null;
  refreshToken: string | null;
  refreshTokenExpiredIn: number | null;
}

export const accessTokenState = atom<AccessTokenInfo>({
  key: 'accessTokenState',
  default: {
    accessToken: null,
    accessTokenExpiredIn: null,
    refreshToken: null,
    refreshTokenExpiredIn: null,
  },
});

export const userState = atom<UserInfo | null | any>({
  key: 'userState',
  default: () => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  },
});
