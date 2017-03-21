var _ = {};

_.identity = function() {
  return arguments[0];
};

_.first = function(arr, n) {
  if (!Array.isArray(arr)) return;
  if (Array.isArray(n)) n = n[0] || 1;
  
  return !n ? arr[0] : arr.slice(0, n);
};

_.last = function(arr, n) {
  return n === 1 || !n ? arr[arr.length - 1] : arr.slice(-n);
};

_.each = function(list, fun) {
  var i = 0;

  if (Array.isArray(list)) {
    for (i; i < list.length; i++) {
      fun(list[i], i, list);
    }
  } else {
    var keys = Object.keys(list);

    for (i; i < keys.length; i++) {
      fun(list[keys[i]], keys[i], list);
    }
  }

  return list;
};

_.indexOf = function(arr, value, isSorted) {
  var i = 0,
      res = -1;

  for (i; i < arr.length; i++) {
    if (arr[i] === value) {
      return res = i;
    }
  }

  return res;
};

_.filter = function(list, fun, isSorted) {
  var i = 0,
      res = [],
      keys;
  
  if (typeof isSorted === 'number') { list = list.slice(isSorted) };

  if (Array.isArray(list)) {
    for (i; i < list.length; i++) {
      if (fun(list[i], i , list)) {
        res.push(list[i]);
      };
    }
  } else {
    keys = Object.keys(list);

    for (i; i < keys.length; i++) {
      if (fun(list[keys[i]], keys[i], list)) {
        res.push(list[keys[i]]);
      }
    }
  }

  return res;
};

_.reject = function(list, fun) {
  var i = 0,
      res = [],
      keys;

  if (Array.isArray(list)) {
    for (i; i < list.length; i++) {
      if (!fun(list[i], i , list)) {
        res.push(list[i]);
      };
    }
  } else {
    keys = Object.keys(list);

    for (i; i < keys.length; i++) {
      if (!fun(list[keys[i]], keys[i], list)) {
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

_.map = function(list, fun) {
  var i = 0,
      res = [],
      keys;

  if (Array.isArray(list)) {
    for (i; i < list.length; i++) {
      res.push(fun(list[i], i , list));
    }
  } else {
    keys = Object.keys(list);

    for (i; i < keys.length; i++) {
      res.push(fun(list[keys[i]], keys[i], list));
    }
  }
  return res;
};

_.pluck = function(list, prop) {
  var i = 0,
      res = [],
      keys = Object.keys(list);

  for (i; i < keys.length; i++) {
    res.push(list[keys[i]][prop]);
  }

  return res;
};

_.reduce = function(list, fun, memo) {
  if (!memo || memo === 0) { memo = 0; }
  
  var i = 0;

  if (Array.isArray(list)) {
    for (i; i < list.length; i++) {
      memo = fun(memo, list[i], i, list);  
    }
  } else {
    keys = Object.keys(list);

    for (i; i < keys.length; i++) {
      memo = fun(memo, list[keys[i]], i, list);
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
