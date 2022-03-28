import axios from 'axios'
import {Middleware} from "@nuxt/types";

const guestMiddleware: Middleware = ({ redirect }) => {
  axios
    .get(`https://api.memnix.app/api/user/`, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true,
    })
    .then((response) => {

      if (response.status === 200 && response.data.success === true) {
        return redirect('/today')
      }
    })
    .catch(() => {
      // eslint-disable-next-line no-console


    })
}

export default guestMiddleware
