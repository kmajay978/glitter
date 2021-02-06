"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.returnDefaultImage = exports.addDefaultSrc = void 0;

var addDefaultSrc = function addDefaultSrc(ev) {
  ev.target.src = '/assets/images/image-placeholder.jpg';
};

exports.addDefaultSrc = addDefaultSrc;

var returnDefaultImage = function returnDefaultImage(ev) {
  return '/assets/images/image-placeholder.jpg';
};

exports.returnDefaultImage = returnDefaultImage;