import store from '../store'
import { showLoader, hideLoader } from '../reducers/loading'
import { updateAuthData, updateError } from '../actions'

const invokeService = ({ serviceUrl, method = 'GET', requestData }) => {
  console.info('serviceName is ', serviceUrl)
  console.info('requestData is ', requestData)

  const data = requestData ? JSON.stringify(requestData) : {}

  // Show loading icon
  store.dispatch(showLoader())

  // sent body object based on method
  const body = method !== 'GET' && method !== 'DELETE' ? { body: data } : {}

  // sent headers based on serviceUrl
  let authorization = {};
  if (serviceUrl.includes('login')
    || serviceUrl.includes('registration')) {
    authorization = {};
  } else {
    authorization = { Authorization: store.getState().auth.userToken };
  }
  const headers = {
    Accept: 'application/json',
    'Content-type': 'application/json; charset=UTF-8',
    ...authorization
  }
  return fetch(
    serviceUrl, // eslint-disable-line
    {
      method,
      headers,
      ...body
    }
  )
    .then((response) => {
      store.dispatch(hideLoader())
      console.info('response :::: ', response)
      if (!response.ok) {
        if (response.status === 500) {
          throw Error('Internal server error')
        }
        if (response.status === 403) {
          store.dispatch(updateAuthData());
        }
        return response.json().then(data => {
          store.dispatch(updateError({
            showError: true,
            errorMessage: data.errorMessage,
            variant: 'danger'
          }))
          return ''
        }
        );
      } else {
        return response.json()
      }
    })
    .catch((error) => {
      store.dispatch(hideLoader())
      console.info('fetch error ::: ', error)
    })
}
export default invokeService
