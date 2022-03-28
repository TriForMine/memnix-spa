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

export async function getTrainingAPI(ID: number) {
  try {
    const { data } = await axiosClient
      .get(
        `v1/cards/${ID}/training`,
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

export async function getCardsAPI(ID: number) {
  try {
    const { data } = await axiosClient
      .get(
        `v1/cards/deck/${ID}`,
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

export async function getMCQSAPI(ID: number) {
  try {
    const { data } = await axiosClient
      .get(
        `v1/mcqs/${ID}`,
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

export async function postAnswerAPI(cardID: number, answer: string, training: boolean) {
  try {
    const { data } = await axiosClient
      .post(
        `v1/cards/response`,
        {
          card_id: cardID,
          response: answer,
          training,
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

export async function editCardAPI(cardObject: Object, cardID: number) {
  try {
    const { data } = await axiosClient
      .put(
        `v1/cards/${cardID}/edit`,
        cardObject,
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

export async function createCardAPI(cardObject: Object) {
  try {
    const { data } = await axiosClient
      .post(
        `v1/cards/new`,
        cardObject,
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

export async function deleteCardAPI(cardID: number) {
  try {
    const { data } = await axiosClient
      .delete(
        `v1/cards/${cardID}`,
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

export async function deleteMCQAPI(cardID: number) {
  try {
    const { data } = await axiosClient
      .delete(
        `v1/mcqs/${cardID}`,
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
