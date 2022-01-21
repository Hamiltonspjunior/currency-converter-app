const apiKey = '969cf91664fd99633c6a90b2'
const baseURL = `https://v6.exchangerate-api.com/v6/${apiKey}/`
const supportedCodesURL = `${baseURL}/codes`

const getPairExchangeURL = (baseCode, targetCode, amount) => 
  `${baseURL}/pair/${baseCode}/${targetCode}/${amount}`


const fetchExchangeRateData = async (endpoint) => {
  try {
    const response = await fetch(endpoint)
    
    if (!response.ok) {
      throw new Error('Não foi possível obter os dados')
    }
    
    return response.json()
  } catch ({name, message}) {
    console.log(`${name}: ${message}`)
  }
}

const getSupportedCodesData = () => fetchExchangeRateData(supportedCodesURL)

const getPairExchangeData = (baseCode, targetCode, amount) => 
  fetchExchangeRateData(getPairExchangeURL(baseCode, targetCode, amount))