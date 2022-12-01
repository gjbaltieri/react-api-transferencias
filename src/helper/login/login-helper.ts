import { tokenModel } from '../setUserToken';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

interface loginHelperModel {
  username: string;
  balance: number;
  token: string;
}

export async function loginHelper(
  username: string,
  password: string
): Promise<loginHelperModel> {
  const { data } = await axios.post(
    'https://api-transferencias.onrender.com/login',
    {
      username,
      password,
    }
  );
  const jwtDecode = jwt_decode<tokenModel>(data.token) as unknown as tokenModel;
  localStorage.removeItem('token');
  localStorage.setItem('token', data.token);
  const user = {
    username: jwtDecode.username,
    balance: jwtDecode.balance,
    token: data.token,
  };
  return user;
}
