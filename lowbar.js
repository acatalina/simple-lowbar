var _ = {};

_.identity = function() {
  return arguments[0]; 
};

_.first = function(arr, n) {
  return n === 1 || !n ? arr[0] : arr.slice(0, n);
};

_.last = function(arr, n) {
  return n === 1 || !n ? arr[arr.length - 1] : arr.slice(-n);
};

_.each = function(list, fun) {
  var i = 0;

  if(Array.isArray(list)) {
    for(i; i < list.length; i++) {
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

  for(i; i < arr.length; i++) {
    if(arr[i] === value) {
      return res = i;
    }
  }

  return res;
};

_.filter = function(list, fun, isSorted) {
  var i = 0,
      res = [],
      keys;
  
  if(typeof isSorted === 'number') { list = list.slice(isSorted) };

  if(Array.isArray(list)) {
    for(i; i < list.length; i++) {
      if(fun(list[i], i , list)) {
        res.push(list[i]);
      };
    }
  } else {
    keys = Object.keys(list);

    for(i; i < keys.length; i++) {
      if(fun(list[keys[i]], keys[i], list)) {
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

  if(Array.isArray(list)) {
    for(i; i < list.length; i++) {
      if(!fun(list[i], i , list)) {
        res.push(list[i]);
      };
    }
  } else {
    keys = Object.keys(list);

    for(i; i < keys.length; i++) {
      if(!fun(list[keys[i]], keys[i], list)) {
        res.push(list[keys[i]]);
      }
    }
  }

  return res;
};

_.uniq = function(arr, isSorted, iteratee) {

};

_.map = function(list, fun) {
  var i = 0,
      res = [],
      keys;

  if(Array.isArray(list)) {
    for(i; i < list.length; i++) {
      res.push(fun(list[i], i , list));
    }
  } else {
    keys = Object.keys(list);

    for(i; i < keys.length; i++) {
      res.push(fun(list[keys[i]], keys[i], list));
    }
  }
  return res;
};

_.pluck = function(list, prop) {
  var i = 0,
      res = [],
      keys = Object.keys(list);

  for(i; i < keys.length; i++) {
    res.push(list[keys[i]][prop]);
  }

  return res;
};

_.reduce = function(list, fun, memo) {
  if(!memo || memo === 0) { memo = 0; }
  
  var i = 0;

  if(Array.isArray(list)) {
    for(i; i < list.length; i++) {
      memo = fun(memo, list[i], i, list);  
    }
  } else {
    keys = Object.keys(list);

    for(i; i < keys.length; i++) {
      memo = fun(memo, list[keys[i]], i, list);
    }
  }

  return memo;
};

_.contains = function(list, value, fromIndex) {
  var i = 0,
      res = false;

  if(Array.isArray(list)) {
    if(fromIndex) { i = fromIndex }

    for(i; i < list.length; i++) {
      if(list[i] === value) {
        return res = true;
      }
    }
  } else {
    keys = Object.keys(list);

    for(i; i < keys.length; i++) {
      if(list[keys[i]] === value) {
        return res = true;
      }
    }
  }
  
  return res;
};

_.every = function(list, fun) {
  var i = 0,
      res = true;

  if(Array.isArray(list)) {
    for(i; i < list.length; i++) {
      if(!fun(list[i])) {
        return false;
      }
    }
  } else {
    keys = Object.keys(list);

    for(i; i < keys.length; i++) {
      if(!fun(list[keys[i]])) {
        return false;
      }
    }
  }

  return res;
};

_.some = function(list, fun) {
  var i = 0,
      res = false;

  if(Array.isArray(list)) {
    for(i; i < list.length; i++) {
      if(fun(list[i])) {
        return true;
      }
    }
  } else {
    keys = Object.keys(list);

    for(i; i < keys.length; i++) {
      if(fun(list[keys[i]])) {
        return true;
      }
    }
  }

  return res;
};
/*
_.extend = function(dst, src) {
  var i = 0;

  keys = Object.keys(sources);

  for(i; i < keys.length; i++) {
    dst.src[keys] = dst.src[keys[i]];
  }

  return dst;
};
*/
if (typeof module !== 'undefined') {
  module.exports = _;
}
