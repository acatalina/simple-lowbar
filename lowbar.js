var _ = {};

_.identity = function() {
  return arguments[0];
};

_.first = function(arr, n) {
  if (!Array.isArray(arr)) return;
  if (typeof n === 'boolean') {
    if (n) { n = 0; } else { return []; }
  }
  if (Array.isArray(n)) n = n[0] || 1;
  
  return !n ? arr[0] : arr.slice(0, n);
};

_.last = function(arr, n) {
  if (!Array.isArray(arr)) return;
  if (typeof n === 'boolean') {
    if (n) { n = 0; } else { return []; }
  }
  if (Array.isArray(n)) n = n[0] || 1;

  return !n ? arr[arr.length - 1] : arr.slice(-n);
};

_.each = function(list, iteratee, context) {
  let i = 0;
  
  context = context || this;
  
  if (Array.isArray(list)) {
    for (i; i < list.length; i++) {
      iteratee.call(context, list[i], i, list);
    }
  } else if (typeof list === 'object') {
    let keys = Object.keys(list);

    for (i; i < keys.length; i++) {
      iteratee.call(context, list[keys[i]], keys[i], list);
    }
  }

  return list;
};

_.indexOf = function(arr, val, isSorted) {
  if (!Array.isArray(arr) || !val) return -1;

  if (isSorted === true) {
    let prevIndex = 0;
    let endIndex = arr.length;
    let midIndex;

    while (prevIndex < endIndex && arr[midIndex] !== val) {
      midIndex = Math.floor((prevIndex + endIndex) / 2);
      
      if (arr[midIndex] > val) {
        endIndex = midIndex;
      } else {
        prevIndex = midIndex + 1;
      }
    }
    
    return arr[midIndex] === val ? midIndex : -1;
  } else {
    isSorted = isSorted || 0;
    
    for (let i = isSorted; i < arr.length; i++) {
      if (arr[i] === val) {
        return i;
      }
    }

    return -1;
  }
};

_.filter = function(list, predicate, context) {
  let i = 0;
  let res = [];

  context = context || this;

  if (Array.isArray(list)) {
    for (i; i < list.length; i++) {
      if (predicate.call(context, list[i], i , list)) {
        res.push(list[i]);
      };
    }
  } else if (typeof list === 'object') {
    let keys = Object.keys(list);

    for (i; i < keys.length; i++) {
      if (predicate.call(context, list[keys[i]], keys[i], list)) {
        res.push(list[keys[i]]);
      }
    }
  }

  return res;
};

_.reject = function(list, predicate, context) {
  let i = 0;
  let res = [];

  context = context || this;

  if (Array.isArray(list)) {
    for (i; i < list.length; i++) {
      if (!predicate.call(context, list[i], i , list)) {
        res.push(list[i]);
      }
    }
  } else if (typeof list === 'object') {
    let keys = Object.keys(list);

    for (i; i < keys.length; i++) {
      if (!predicate.call(context, list[keys[i]], keys[i], list)) {
        res.push(list[keys[i]]);
      }
    }
  }

  return res;
};

_.uniq = function(arr, isSorted, iteratee) {
  if (iteratee === undefined && typeof isSorted === 'function') {
    iteratee = isSorted;
    isSorted = false;
  }

  let res = [];
  let seen = isSorted ? undefined : [];
  let hasBeenSeen = isSorted ? hasBeenSeenSorted : hasBeenSeenUnsorted;
  
  function hasBeenSeenSorted(val, i, arr) {
    val = getComparable(val, i, arr);

    if (seen === val) {
      return true;
    }

    seen = val;
    return false;
  }

  function hasBeenSeenUnsorted(val, i, arr) {
    val = getComparable(val, i, arr);

    if (seen.indexOf(val) > -1) {
      return true;
    }

    seen.push(val);
    return false;
  }

  function getComparable(val, i, arr) {
    return iteratee ? iteratee(val, i, arr) : val;
  }
  
  if (Array.isArray(arr)) {
    for (let i = 0; i < arr.length; i++) {
      if (!hasBeenSeen(arr[i], i, arr)) {
        res.push(arr[i]);
      }
    }
  }

  return res;
};

_.map = function(list, iteratee, context) {
  let i = 0;
  let res = [];

  context = context || this;

  if (Array.isArray(list)) {
    for (i; i < list.length; i++) {
      let transformed = iteratee.call(context, list[i], i , list);
      res.push(transformed);
    }
  } else if (typeof list === 'object') {
    let keys = Object.keys(list);

    for (i; i < keys.length; i++) {
      let transformed = iteratee.call(context, list[keys[i]], keys[i], list);
      res.push(transformed);
    }
  }
  
  return res;
};

_.pluck = function(list, prop) {
  let i = 0;
  let res = [];

  if (Array.isArray(list)) {
    for (i; i < list.length; i++) {
      res.push(list[i][prop]);
    }
  }

  return res;
};

_.reduce = function(list, iteratee, memo, context) {
  let i = 0;

  context = context || this;

  if (Array.isArray(list)) {
    if (memo === undefined) {
      memo = list[i];
    }

    for (i; i < list.length; i++) {
      memo = iteratee.call(context, memo, list[i], i, list);  
    }
  } else if (typeof list === 'object') {
    let keys = Object.keys(list);
    
    if (memo === undefined) {
      memo = list[keys[i]];
    }
    
    for (i; i < keys.length; i++) {
      memo = iteratee.call(context, memo, list[keys[i]], i, list);
    }
  }

  return memo;
};

_.contains = function(list, value, fromIndex) {
  let i = 0;

  if (Array.isArray(list)) {
    i = fromIndex || i;

    for (i; i < list.length; i++) {
      if (list[i] === value) {
        return true;
      }
    }
  } else if (typeof list === 'object') {
    let keys = Object.keys(list);

    for (i; i < keys.length; i++) {
      if (list[keys[i]] === value) {
        return true;
      }
    }
  }
  
  return false;
};

_.every = function(list, predicate, context) {
  let i = 0;
  let res = true;

  context = context || this;

  if (Array.isArray(list)) {
    for (i; i < list.length; i++) {
      if (!predicate.call(context, list[i], i, list)) {
        res = false;
        break;
      }
    }
  } else if (typeof list === 'object') {
    let keys = Object.keys(list);

    for (i; i < keys.length; i++) {
      if (!predicate.call(context, list[keys[i]], keys[i], list)) {
        res = false;
        break;
      }
    }
  }

  return res;
};

_.some = function(list, predicate, context) {
  let i = 0;
  let res = false;

  context = context || this;

  if (Array.isArray(list)) {
    for (i; i < list.length; i++) {
      if (predicate.call(context, list[i], i, list)) {
        res = true;
        break;
      }
    }
  } else if (typeof list === 'object') {
    let keys = Object.keys(list);

    for (i; i < keys.length; i++) {
      if (predicate.call(context, list[keys[i]], keys[i], list)) {
        res = true;
        break;
      }
    }
  }

  return res;
};

_.extend = function(destination, source) {
  let keys;

  for (let i = 1; i < arguments.length; i++) {
    source = arguments[i];
    keys = Object.keys(source);
    
    for (let j = 0; j < keys.length; j++) {
      destination[keys[j]] = source[keys[j]];
    }
  }

  return destination;
};

_.defaults = function(object, defaults) {
  for (let i = 1; i < arguments.length; i++) {
    defaults = arguments[i];
    let keys = Object.keys(defaults);
    
    for (let j = 0; j < keys.length; j++) {
      if (!object[keys[j]]) {
        object[keys] = defaults[keys];
      }
    }
  }

  return object;
};

if (typeof module !== 'undefined') {
  module.exports = _;
}
