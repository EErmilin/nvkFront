export interface AuthTypes {
  token: string | null;
  logged: boolean;
  regionScreen: boolean;
  carousel: boolean;
  notification: boolean;
  isRadio: boolean;
}

export interface ILoginInput {
  phone: string;
  password: string;
}
