interface Payload {
  name: string;
  email: string;
}

export interface JWTInterface {
  payload: Payload;
  iat: number;
  exp: number;
}
