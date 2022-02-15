const api = 'pk.6d8f36ffb7c400d2fe02117015c63fe7';
const countryCode = 'no'

const BASE_URL = `https://eu1.locationiq.com/v1/search.php?key=${api}&countrycodes=${countryCode}&format=json&q=`


const tryCatchFetch = async (url, init = null) => {
  try {
    const response = await fetch(url, init)
    if (response.ok) {
      return await response.json()
    }
    else {
      throw new Error(`Bad response: ${response.status} ${response.statusText}`)
    }
  }
  catch (e) {
    console.error(e)
    return null
  }
}


const fetchLatLongFromStore = async (storeName) => {
  const url = BASE_URL + storeName
  return await tryCatchFetch(url)
}


const exportItems = {
  fetchLatLongFromStore
}

export default exportItems
