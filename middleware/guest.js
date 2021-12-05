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

      if (response.status === 200) {
        return redirect('/today')
      }
    })
    .catch((error) => {
        console.log(error.message)

    })
}
