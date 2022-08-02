/**
 * @description: 枚举定义工具
 * @param {*} definition
 * @return {*}
 * 示例：
 * const STATUS = createEnum({
 *     AUDIT_WAIT: [1, '审核中'],
 *     AUDIT_PASS: [2, '审核通过']
 * })
 * 获取枚举值：STATUS.AUDIT_WAIT
 * 获取枚举描述：STATUS.getDesc('AUDIT_WAIT')
 * 通过枚举值获取描述：STATUS.getDescFromValue(STATUS.WAIT)
 */
export default function createEnum(definition) {
  const strToValueMap = {}
  const numToDescMap = {}
  for (const enumName of Object.keys(definition)) {
    const [value, desc] = definition[enumName]
    strToValueMap[enumName] = value
    numToDescMap[value] = desc
  }
  return {
    ...strToValueMap,
    getDesc(enumName) {
      return (definition[enumName] && definition[enumName][1]) || ''
    },
    getDescFromValue(value) {
      return numToDescMap[value] || ''
    }
  }
}
