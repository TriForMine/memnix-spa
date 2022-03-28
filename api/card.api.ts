import {axiosClient} from "~/api/api";
import {Card, CardResponseValidation, Mcq} from "~/types/types"

export async function getTodayAPI(): Promise<[any] | [any, { data: { Card: Card, Answers: string }[] }]> {
  try {
    const { data } = await axiosClient
      .get<{data: {Card: Card, Answers: string}[]}>(
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

export async function getTrainingAPI(ID: number): Promise<[any] | [any, { data: { Card: Card, Answers: string }[] }]> {
  try {
    const { data } = await axiosClient
      .get<{data: {Card: Card, Answers: string}[]}>(
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

export async function getCardsAPI(ID: number): Promise<[any] | [any, { data: Card[] }]> {
  try {
    const { data } = await axiosClient
      .get<{data: Card[]}>(
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

export async function getMCQSAPI(ID: number): Promise<[any] | [any, { data: Mcq[] }]> {
  try {
    const { data } = await axiosClient
      .get<{data: Mcq[]}>(
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

export async function postAnswerAPI(cardID: number, answer: string, training: boolean): Promise<[any] | [any, { data: CardResponseValidation }]> {
  try {
    const { data } = await axiosClient
      .post<{data: CardResponseValidation}>(
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

export async function editMCQAPI(mcqObject: Pick<Mcq, "mcq_name" | "deck_id" | "mcq_type" | "mcq_answers">, mcqID: number) {
  try {
    const { data } = await axiosClient
      .put(
        `v1/mcqs/${mcqID}/edit`,
        mcqObject,
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

export async function createMCQAPI(mcqObject: Pick<Mcq, "mcq_name" | "deck_id" | "mcq_type" | "mcq_answers">) {
  try {
    const { data } = await axiosClient
      .post(
        `v1/mcqs/new`,
        mcqObject,
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

export async function editCardAPI(cardObject: Omit<Card, "ID" | "Mcq" | "deck">, cardID: number) {
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

export async function createCardAPI(cardObject: Omit<Card, "ID" | "Mcq" | "deck">) {
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
