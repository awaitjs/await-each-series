function await_each_series (items, iterator) {
  return new Promise((resolve, reject) => {
    let completed = 0
    let total = items.length

    let iterate = () => {
      let item = items[completed]
      iterator(item)
        .then(complete)
        .catch(reject)
    }

    let complete = () => {
      completed += 1
      if (completed === total) {
        resolve()
        return
      }
      iterate()
    }

    if (total === 0) {
      resolve()
      return
    }

    iterate()
  })
}

module.exports = await_each_series
