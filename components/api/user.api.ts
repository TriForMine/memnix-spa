import { axiosClient } from "~/components/api/api";

export async function register(email: string, password: string, username: string) {
  try {
    const { data } = await axiosClient.post(
      `register/`,
      {
        username,
        email,
        password,
      },
      {
        headers: {
          'Content-Type': 'application/json'
        },
      }
    )
    return [null, data];
  } catch (e: any) {
    return [e];
  }
}

export async function login(email: string, password: string) {
  try {
    const { data } = await axiosClient
      .post(
        `login/`,
        {
          email: email.toLowerCase(),
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true,
        }
      )

    return [null, data];
  } catch (e: any) {
    return [e];
  }
}

export async function user() {
  try {
    const { data } = await axiosClient
      .get(
        `user/`,
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true,
        }
      )
    return [null, data];
  } catch (e: any) {
    return [e];
  }
}
