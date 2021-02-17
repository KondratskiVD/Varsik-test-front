import Vue from 'vue'

Vue.filter('formattedNumber', (value) => {
  if (value) {
    const re = /\,/g
    return parseFloat(value).toLocaleString('de-DE', {
          style: 'currency',
          currency: 'EUR'
        }).replace(re, '.')
  }
  return 0
})
