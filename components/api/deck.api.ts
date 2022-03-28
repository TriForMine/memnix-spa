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

export async function getEditorAPI() {
  try {
    const { data } = await axiosClient
      .get(
        `v1/decks/editor`,
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

export async function getSubAPI() {
  try {
    const { data } = await axiosClient
      .get(
        `v1/decks/sub`,
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

export async function getAvailableAPI() {
  try {
    const { data } = await axiosClient
      .get(
        `v1/decks/available`,
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

export async function subToDeckAPI(deckID: number) {
  try {
    const { data } = await axiosClient
      .post(
        `v1/decks/${deckID}/subscribe`,
        {},
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

export async function unsubToDeckAPI(deckID: number) {
  try {
    const { data } = await axiosClient
      .post(
        `v1/decks/${deckID}/unsubscribe`,
        {},
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


export async function editDeckAPI(deckObject: Object, deckID: number) {
  try {
    const { data } = await axiosClient
      .put(
        `v1/decks/${deckID}/edit`,
        deckObject,
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

export async function createDeckAPI(deckObject: Object) {
  try {
    const { data } = await axiosClient
      .post(
        `v1/decks/new`,
        deckObject,
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
