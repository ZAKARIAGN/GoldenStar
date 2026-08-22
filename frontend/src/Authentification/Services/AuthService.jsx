import Api from "../../Services/api";

export const RegisterService = async (userData) => {
  const res = await Api.post('/auth/register',userData);
  return res;
};

export const LoginService = async (user) => {
    const res = await Api.post("/auth/login", user);
    return res;
};
