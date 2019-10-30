import verifyMobile from '../index'

describe('verifyMobile', () => {
  test('empty', () => {
    expect(verifyMobile('')).toBeFalsy()
  })

  test('null', () => {
    expect(verifyMobile(null)).toBeFalsy()
  })

  test('undefined', () => {
    expect(verifyMobile(undefined)).toBeFalsy()
  })

  test('1', () => {
    expect(verifyMobile(1)).toBeFalsy()
  })

  test('12', () => {
    expect(verifyMobile(12)).toBeFalsy()
  })

  test('12', () => {
    expect(verifyMobile(12)).toBeFalsy()
  })

  test('123', () => {
    expect(verifyMobile(123)).toBeFalsy()
  })

  test('13800138000', () => {
    expect(verifyMobile(13800138000)).toBeTruthy()
  })

  test('14800138000', () => {
    expect(verifyMobile(14800138000)).toBeTruthy()
  })

  test('15800138000', () => {
    expect(verifyMobile(15800138000)).toBeTruthy()
  })

  test('16800138000', () => {
    expect(verifyMobile(16800138000)).toBeTruthy()
  })

  test('17800138000', () => {
    expect(verifyMobile(17800138000)).toBeTruthy()
  })

  test('18800138000', () => {
    expect(verifyMobile(18800138000)).toBeTruthy()
  })

  test('19800138000', () => {
    expect(verifyMobile(19800138000)).toBeTruthy()
  })

  test('10800138000', () => {
    expect(verifyMobile(10800138000)).toBeFalsy()
  })

  test('198001380001', () => {
    expect(verifyMobile(198001380001)).toBeFalsy()
  })
})
