import axios from 'axios'

export default function ({ store, redirect }) {
  axios
    .get(`https://api-memnix.yumenetwork.net/api/user/`, {
      'X-Requested-With': 'XMLHttpRequest',
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      withCredentials: true,
    })
    .then((response) => {

      if (response.status === 200 && response.data.success === true) {
        return redirect('/today')
      }
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
        console.log(error.message)

    })
}
