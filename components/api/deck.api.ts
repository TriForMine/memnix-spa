import {axiosClient} from "~/components/api/api";

export async function getTodayAPI() {
  try {
    const { data } = await axiosClient
      .get(
        `v1/cards/today`,
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


export async function setSettingsAPI(deckID: number, daily: boolean) {
  try {
    const { data } = await axiosClient
      .post(
        `v1/users/settings/${deckID}/today`,
        {
          settings_today : daily
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
