"use strict";
require("any-promise/register")("bluebird");


const logger = require("debug")("leaf:mw:react");
const react = require('koa-react-view');
const register = require('babel-register');
const es2015 = require('babel-preset-es2015');
const reactPreset = require('babel-preset-react');
const pathModule = require('path');
const extend = require('extend');

const webpack = require('webpack')

const DEFAULTS = {};
var options;

class middleware {
  constructor(opts) {
    options = extend({}, DEFAULTS, opts || {});
  }

  * initialize(next) {
    logger("using leafjs react template middleware");

    let leaf = this;
    let koa = this.koa;

    let webpackConfig = {};
    logger('Enable webpack dev and HMR middleware')

    const viewDir = pathModule.resolve(leaf.basepath, "app/View");

    react(koa, {
      views: viewDir
    });

    register({
      presets: [es2015, reactPreset],
      extensions: ['.jsx', 'js'],
    });

    yield * next;
  }
}


exports = module.exports = middleware;