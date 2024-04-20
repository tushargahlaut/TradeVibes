interface Payload {
  name: string;
  email: string;
  encryptedString: string;
}

export interface JWTInterface {
  payload: Payload;
  iat: number;
  exp: number;
}
