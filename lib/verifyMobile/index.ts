/**
 * verify mobile
 * @param {*} mobile
 */
export default function verifyMobile (mobile: any) {
  return /^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(mobile)
}
