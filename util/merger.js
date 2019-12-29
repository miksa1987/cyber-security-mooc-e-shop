const sortFunction = (a, b) => ('' + a.name).localeCompare(b.name)

export const countAndMergeItems = (items) => {
  let cartWithoutDuplicates = []
  let counter = 0

  items.sort(sortFunction).forEach((item, idx) => {
    if (idx === items.length - 1 && item.name !== items[idx -1].name) {
      cartWithoutDuplicates.push({ ...item, qty: 1 })
    }
    if (idx === items.length && item.name === items[idx -1].name) {
      cartWithoutDuplicates.push({ ...item, qty: counter })
    }
    if (idx > 0 && item.name !== items[idx -1].name) {
      cartWithoutDuplicates.push({ ...items[idx - 1], qty: counter })
      counter = 1
      return
    }

    counter++    
  })

  return cartWithoutDuplicates
}
