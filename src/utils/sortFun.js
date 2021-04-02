export const boolSortFunc = (a, b, order, sortField) => {
  let diff = 0

  if (a[sortField] === true && b[sortField] === true) {
    return 0
  } else if (a[sortField] === false && b[sortField] === false) {
    return 0
  } else if (a[sortField] === true && b[sortField] === false) {
    diff = 1
  } else {
    diff = -1
  }

  return order === "desc" ? diff * -1 : diff
}
