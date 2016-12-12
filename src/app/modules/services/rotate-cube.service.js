export default function ($q) {
  'ngInject';
  let deferred = $q.defer();
  let callbackFn = () => {};

  return {
    subscribeToStateChange: (callback) => {
      callbackFn = callback;
    },
    rotateTo: (state) => {
      callbackFn(state);
      deferred = $q.defer();
    },
    done: () => {
      deferred.resolve(true);
    },
    rotationEnded: () => {
      return deferred.promise;
    }
  }
}