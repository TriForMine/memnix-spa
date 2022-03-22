import axios from 'axios'

export default function ({ redirect }) {

  axios.get(
    `https://api.memnix.app/api/user/`,
    {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true,
    }
  ).then((response) => {

    if (response.status !== 200 || response.data.ID === 0 || response.data.success === false) {
      return redirect('/login')
    }})
    .catch(() => {
      // eslint-disable-next-line no-console


      return redirect('/login')
    })
}
