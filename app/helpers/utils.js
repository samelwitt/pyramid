import Modernizr from '../_lib/modernizr-custom';
import _throttle from 'lodash.throttle';
import $ from 'jquery';

export const isTruthy = (val = false) => {
  return (val === true) || (val === 'true') || (val.constructor === Object) || (val !== null && val !== 'false' && !val && val != 0 && val.length > 0);
};

export const toComponentName = (str) => {
  str = str.replace(/_/,'');
  str = str.substr(0,1).toUpperCase() + str.substr(1).toLowerCase();
  str = str.replace(/(-[a-z])/g, function($1){return $1.toUpperCase().replace('-','');});
  return str;
};

export const viewport = () => {

  if (Modernizr.mq('(min-width: 1024px)')) {
    return 'desktop'
  }
  else if (Modernizr.mq('(min-width: 800px)')) {
    return 'medium'
  }
  else if (Modernizr.mq('(min-width: 550px)')) {
    return 'medium'
  }
  else {
    return 'mobile'
  }
};

export const throttle = (el, evt, cb, t = 100) => {
  $(el).on(evt, _throttle(cb, t));
};

export const deThrottle = (el, evt, cb, t = 100) => {
  $(el).off(evt, _throttle(cb, t));
};