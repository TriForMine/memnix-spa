import axios from 'axios'

export default function ({ redirect }) {

    axios.get(
        `https://api-memnix.yumenetwork.net/api/user/`,
        {
          'X-Requested-With': 'XMLHttpRequest',
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          withCredentials: true
        }
      ).then((response) => {

      if (response.status !== 200 || response.data.ID === 0 || response.data.success === false) {
        return redirect('/login')
      }})
      .catch((error) => {
        // eslint-disable-next-line no-console
        

        return redirect('/login')
      })
  }
