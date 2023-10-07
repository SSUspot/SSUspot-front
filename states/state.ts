import { atom } from "recoil";

interface AccessTokenInfo {
  accessToken: string | null;
  accessTokenExpiredIn: number | null;
  refreshToken: string | null;
  refreshTokenExpiredIn: number | null;
}

export const accessTokenState = atom<AccessTokenInfo>({
  key: "accessTokenState",
  default: {
    accessToken: null,
    accessTokenExpiredIn: null,
    refreshToken: null,
    refreshTokenExpiredIn: null,
  },
});
