/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// Need jQuery? Install it with "yarn add jquery", then uncomment to require it.
// var $ = require('jquery');

console.log('Hello Webpack Encore! Edit me in assets/js/app.js');

import 'bootstrap';

// Loading external lib
var $ = require('jquery');
var greet = require('greet');

// Loading internal lib
var ftl = require('./lib/ftl');
