import axios from 'axios'

export default function ({ redirect }) {
  axios
    .get(`https://api-memnix.yumenetwork.net/api/user/`, {
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
    .catch((_error) => {
      // eslint-disable-next-line no-console


    })
}
