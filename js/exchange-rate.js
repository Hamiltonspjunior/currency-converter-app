const apiKey = '969cf91664fd99633c6a90b2'
const baseURL = `https://v6.exchangerate-api.com/v6/${apiKey}/`
const supportedCodesURL = `${baseURL}/codes`

const getPairExchangeURL = (baseCode, targetCode, amount) => 
  `${baseURL}/pair/${baseCode}/${targetCode}/${amount}`


const fetchExchangeRate = async (endpoint) => {
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

const getSupportedCodes = () => fetchExchangeRate(supportedCodesURL)

const getPairExchange = ({ baseCode, targetCode, amount }) => 
  fetchExchangeRate(getPairExchangeURL(baseCode, targetCode, amount))