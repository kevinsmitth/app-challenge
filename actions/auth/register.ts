import actions from "..";

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export async function register(form: RegisterForm) {
  await usePost("register", { body: form });

  await actions.auth.fetchUser();
}
