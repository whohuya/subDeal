import numeral from 'numeral'

export default class NumberHelper {
  static RMB (val) {
    return `&yen; ${numeral(val).format('0,0')}`
  }

  static fixedZero (val) {
    return val * 1 < 10 ? `0${val}` : val
  }
}
