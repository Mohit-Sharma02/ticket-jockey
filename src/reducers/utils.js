export const deleteItemFromStateById = state => id => {
  if (!state) return {}

  const { ids, dict } = state

  const index = ids.indexOf(id)

  if (index !== -1) {
    const newDict = { ...dict }
    delete newDict[id]

    return {
      ids: [...ids.slice(0, index), ...ids.slice(index + 1)],
      dict: newDict
    }
  } else {
    return state
  }
}
