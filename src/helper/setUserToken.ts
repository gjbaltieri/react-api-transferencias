import jwt_decode from 'jwt-decode';

export interface tokenModel {
  accountId: string;
  balance: any;
  exp: Date;
  iat: Date;
  username: any;
}

const SetUserParams = (token: string) => {
  localStorage.removeItem('token');
  localStorage.setItem('token', token);
  const { balance, username } = jwt_decode<tokenModel>(
    token
  ) as unknown as tokenModel;
  localStorage.removeItem('balance');
  localStorage.setItem('balance', balance);
  const userData = { balance, username };
  return userData;
};
