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
  if (!Array.isArray(list) && typeof list !== 'object') return list;
  
  let i = 0;
  
  context = context || this;
  
  if (Array.isArray(list)) {
    for (i; i < list.length; i++) {
      iteratee.call(context, list[i], i, list);
    }
  } else {
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
    let startIndex = 0;
    let prevIndex = 0;
    let endIndex = arr.length;
    let midIndex = Math.floor(endIndex / 2);

    while ( (arr[midIndex] !== val) && (prevIndex / midIndex !== 1) ) {
      if (arr[midIndex] > val) {
        endIndex = midIndex;
        prevIndex = midIndex;
        midIndex -= (midIndex - startIndex) / 2;
        midIndex = Math.floor(midIndex);
      } else {
        startIndex = midIndex;
        prevIndex = midIndex;
        midIndex += (endIndex - midIndex) / 2;
        midIndex = Math.floor(midIndex);
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
  if (!Array.isArray(list) && typeof list !== 'object') return [];

  let i = 0;
  let res = [];

  context = context || this;

  if (Array.isArray(list)) {
    for (i; i < list.length; i++) {
      if (predicate.call(context, list[i], i , list)) {
        res.push(list[i]);
      };
    }
  } else {
    let keys = Object.keys(list);

    for (i; i < keys.length; i++) {
      if (predicate.call(context, list[keys[i]], keys[i], list)) {
        res.push(list[keys[i]]);
      }
    }
  }

  return res;
};

_.reject = function(list, predicate) {
  if (!Array.isArray(list) && typeof list !== 'object') return [];

  let i = 0;
  let res = [];

  context = context || this;

  if (Array.isArray(list)) {
    for (i; i < list.length; i++) {
      if (!predicate.call(context, list[i], i , list)) {
        res.push(list[i]);
      };
    }
  } else {
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
  if (!Array.isArray(arr)) { return []; }

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
    val = getComparable(val);

    if (seen.indexOf(val) > -1) {
      return true;
    }

    seen.push(val);
    return false;
  }

  function getComparable(val, i, arr) {
    return iteratee ? iteratee(val, i, arr) : val;
  }

  for (let i = 0; i < arr.length; i++) {
    if (!hasBeenSeen(arr[i], i, arr)) {
      res.push(arr[i]);
    }
  }

  return res;
};

_.map = function(list, iteratee, context) {
  if (!Array.isArray(list) && typeof list !== 'object') return [];
  
  let i = 0;
  let res = [];

  context = context || this;

  if (Array.isArray(list)) {
    for (i; i < list.length; i++) {
      let transformed = iteratee.call(context, list[i], i , list);
      res.push(transformed);
    }
  } else {
    let keys = Object.keys(list);

    for (i; i < keys.length; i++) {
      let transformed = iteratee.call(context, list[keys[i]], keys[i], list);
      res.push(transformed);
    }
  }
  
  return res;
};

_.pluck = function(list, prop) {
  if (!Array.isArray(list)) return [];

  let i = 0;
  let res = [];

  for (i; i < list.length; i++) {
    res.push(list[i][prop]);
  }

  return res;
};

_.reduce = function(list, iteratee, memo, context) {
  if (!Array.isArray(list) && typeof list !== 'object') return;
  if (!memo || memo === 0) { memo = 0; }
  
  let i = 0;

  context = context || this;

  if (Array.isArray(list)) {
    for (i; i < list.length; i++) {
      memo = iteratee.call(context, memo, list[i], i, list);  
    }
  } else {
    let keys = Object.keys(list);

    for (i; i < keys.length; i++) {
      memo = iteratee.call(context, memo, list[keys[i]], i, list);
    }
  }

  return memo;
};

_.contains = function(list, value, fromIndex) {
  var i = 0,
      res = false;

  if (Array.isArray(list)) {
    if (fromIndex) { i = fromIndex }

    for (i; i < list.length; i++) {
      if (list[i] === value) {
        return res = true;
      }
    }
  } else {
    keys = Object.keys(list);

    for (i; i < keys.length; i++) {
      if (list[keys[i]] === value) {
        return res = true;
      }
    }
  }
  
  return res;
};

_.every = function(list, fun) {
  var i = 0,
      res = true;

  if (Array.isArray(list)) {
    for (i; i < list.length; i++) {
      if (!fun(list[i])) {
        return false;
      }
    }
  } else {
    keys = Object.keys(list);

    for (i; i < keys.length; i++) {
      if (!fun(list[keys[i]])) {
        return false;
      }
    }
  }

  return res;
};

_.some = function(list, fun) {
  var i = 0,
      res = false;

  if (Array.isArray(list)) {
    for (i; i < list.length; i++) {
      if (fun(list[i])) {
        return true;
      }
    }
  } else {
    keys = Object.keys(list);

    for (i; i < keys.length; i++) {
      if (fun(list[keys[i]])) {
        return true;
      }
    }
  }

  return res;
};

_.extend = function(destination) {
  var source;
  
  for (let i = 1; i < arguments.length; i++) {
    source = arguments[i];
    for (let key in source) {
      destination[key] = source[key];
    }
  }

  return destination;
}

_.defaults = function(object) {
  var defaults;

  for (let i = 1; i < arguments.length; i++) {
    defaults = arguments[i];
    for (let key in defaults) {
      if (!object.hasOwnProperty(key)) {
        object[key] = defaults[key];
      }
    }
  }

  return object;
};

if (typeof module !== 'undefined') {
  module.exports = _;
}
