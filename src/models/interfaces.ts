export interface INote {
  id?: string;
  title: string;
  content: string;
  userId: string;
}

export interface IThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

export interface ISignInData {
  email: string;
  password: string;
};

export interface ISignUpData {
  email: string;
  password: string;
  confirmPassword: string;
};
