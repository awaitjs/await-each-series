export function (array, iterator) {
  var defer = Promise.defer();
  var promise = defer.promise;

  var completed = 0;
  var total = array.length;

  var complete = function () {
    completed += 1;
    if (completed === total) {
      defer.resolve();
      return;
    }
    iterate();
  };
  
  var iterate = function () {
    iterator(array[completed])
      .then(complete)
      .catch(defer.reject);
  };

  if (total === 0) {
    defer.resolve();
    return promise;
  }

  iterate();

  return promise;
}
