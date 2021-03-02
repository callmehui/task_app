
/**
 * 校验手机号是否正确
 * @param phoneNumber 电话号码
 */        
export function validateMobile(phoneNumber: string) {
  return /^1[3|4|5|7|8][0-9]{9}$/.test(phoneNumber);
}