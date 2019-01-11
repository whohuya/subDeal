/**
 * Created by zhaoyu on July 10, 2017.
 */
  // validation rules
export const required = (value: string): ?string => (value ? undefined : '该字段为必填项')
export const moreThanOrEqualToSixLetters = (value: string): ?string => (value && value.length > 5 ? undefined : '不得少于6个字符')
export const selectionOptions = (value: string): ?string => {
  if (value) {
    const options = new Set(['A', 'B', 'C', 'D', 'E'])
    const valueSet = new Set([...value])
    for (let letter of valueSet) {
      if (!options.has(letter)) {
        return '该字段只能包含ABCDE五个字母'
      }
    }
  }
  return undefined
}
export const onlyOneLetter = (value: string): ?string => (value && value.length === 1 ? undefined : '该字段仅允许一个字母')
export const lessThanSixLetters = (value: string): ?string => (value && value.length <= 5 ? undefined : '该字段至多允许五个字母')
export const differentLetters = (value: string): ?string => {
  if (value) {
    const valueSet = new Set([...value])
    if (valueSet.size !== value.length) {
      return '该字段不能包含重复字母'
    }
  }
  return undefined
}
export const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? '无效的电子邮箱地址'
    : undefined
export const nameWithId = (value: string): ?string => (/\((\w{4,11})\)/.exec(value) ? undefined : '请输入正确的格式')
export const nonEmptyArray = (value: Object[]): ?Object[] => (value !== null && value !== undefined && value.length > 0 ? undefined : '该字段不能为空')
