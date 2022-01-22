const $currencyOne = document.querySelector('[data-js="currency-one"]')
const $currencyTwo = document.querySelector('[data-js="currency-two"]')
const $currencyOneTimes = document.querySelector('[data-js="currency-one-times"]')
const $convertedValue = document.querySelector('[data-js="converted-value"]')
const $conversionPrecision = document.querySelector('[data-js="conversion-precision"]')

const updateResults = async () => {
  const currencyOneValue = $currencyOne.value
  const currencyTwoValue = $currencyTwo.value
  const currencyOneTimesValue = $currencyOneTimes.value

  const { conversion_result, conversion_rate } = await 
    getPairExchangeData(currencyOneValue, currencyTwoValue, currencyOneTimesValue)

  $convertedValue.textContent = conversion_result.toFixed(2)
  $conversionPrecision.textContent = `1 ${currencyOneValue} = ${conversion_rate} ${currencyTwoValue}`
}

const populateSelects = (supported_codes, defaultBaseCode, defaultTargetCode) => {
  supported_codes.forEach(([code, desc], index) => {
    const currencyOneDefaultSelected = code === defaultBaseCode
    const currencyTwoDefaultSelected = code === defaultTargetCode

    $currencyOne[index] = new Option(`${code} - ${desc}`, code, currencyOneDefaultSelected, currencyOneDefaultSelected)
    $currencyTwo[index] = new Option(`${code} - ${desc}`, code, currencyTwoDefaultSelected, currencyTwoDefaultSelected)
  })
}

const makeFirstRequest = async (defaultBaseCode, defaultTargetCode) => {
  const { supported_codes } = await getSupportedCodesData()
  
  populateSelects(supported_codes, defaultBaseCode, defaultTargetCode)
  updateResults()
}

makeFirstRequest('USD', 'BRL')
document.addEventListener('input', updateResults)