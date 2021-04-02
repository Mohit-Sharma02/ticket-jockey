function permutations(arr) {
  if (!arr.length) {
    return arr
  }

  return arr.map((item, i) => {
    return permutations([...arr.slice(0, i), ...arr.slice(i + 1)]).map(t => [
      item,
      ...t
    ])
  })
}
