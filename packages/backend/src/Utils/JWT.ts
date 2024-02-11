import {Env} from 'server-side';
import JWT from 'jsonwebtoken';

type SignReturnType =
  | {
      ok: true;
      token: string;
    }
  | {
      ok: false;
      error: Error;
    };

type VerifyReturnType =
  | {
      ok: true;
      decoded: JWT.JwtPayload | string;
    }
  | {
      ok: false;
      error: JWT.VerifyErrors;
    };

export const sign = async (payload: JWT.JwtPayload): Promise<SignReturnType> => {
  return new Promise((resolve) => {
    JWT.sign(
      {
        ...payload,
        iss: payload.iss || 'svej',
        exp:
          payload.exp ||
          (Env.JWT_EXPIRE_TIME ? Math.floor(Date.now() / 1000) + Env.JWT_EXPIRE_TIME : undefined),
      },
      Env.JWT_PRIV_KEY,
      {algorithm: 'HS512'},
      (err, token) => {
        if (err || !token) {
          resolve({ok: false, error: err as Error});
          return;
        }

        resolve({ok: true, token});
      },
    );
  });
};

export const verify = async (token: string): Promise<VerifyReturnType> => {
  return new Promise((resolve) => {
    JWT.verify(token, Env.JWT_PRIV_KEY, (err, decoded) => {
      if (err || !decoded) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        resolve({ok: false, error: err!});
        return;
      }

      resolve({ok: true, decoded});
    });
  });
};
