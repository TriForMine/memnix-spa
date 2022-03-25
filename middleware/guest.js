import axios from 'axios'

export default function ({ redirect }) {
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
