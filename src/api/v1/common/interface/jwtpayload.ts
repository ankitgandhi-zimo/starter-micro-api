export interface IJWTPayload {
  email: string;
  user_id: string;
  role: string;
}

export interface IJWTPayloadSecondVersion {
  email: string;
  user_id: string;
}

export interface IRoleValueResponse {
  _id: string;
  name: string;
  menus: any[];
}
