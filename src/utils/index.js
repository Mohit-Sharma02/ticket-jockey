export const callFunAfterFirstTime = fn => {
  let initial = true

  return () => {
    initial ? (initial = false) : fn()
  }
}

export const strToArr = (str, separator = ",") => {
  if (!str) return []
  if (Array.isArray(str)) return str

  return str
    .split(separator)
    .filter(ele => ele)
    .map(ele => ele.trim())
}

export * from "./date"
export * from "./sortFun"
