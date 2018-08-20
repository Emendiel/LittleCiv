var $ = require('jquery');

window.ftl = (function () {

    return window.ftl || {
        config: {
            debug: true,
            version: '1.0.0'
        },
        data: {},

        /**
         * Init
         */
        init: function () {
            var regexp = new RegExp(/dev=true/),
                debug = !!regexp.exec(document.location.search);

            if (window.config) {
                ftl.apply(ftl.config, window.config);
            }

            this.config.debug  = this.config.debug || debug;

            if(this.config.debug) {
                console.log("Debug activé");
            }
        },

        /**
         * Copies all the properties of config to obj.
         *
         * @param {Object} obj The receiver of the properties
         * @param {Object} config The source of the properties
         * @param {Object} defaults A different object that will also be applied for
         *                 default values
         * @return {Object} returns obj
         */
        apply: function (obj, config, defaults) {
            var name;

            // no "this" reference for friendly out of scope calls
            if (defaults) {
                ftl.apply(obj, defaults);
            }

            if (obj && config && typeof config === 'object') {
                for (name in config) {
                    if (config.hasOwnProperty(name)) {
                        obj[name] = config[name];
                    }
                }
            }
            return obj;
        },
    }
}());

var ftl = window.ftl || {};

/**
 * Console / Logger
 */
if (!ftl.console) {
    ftl.console = {
        prefix: "[ftl] ",

        /**
         * log data on the console
         *
         * @param data
         * @param level
         * @returns {boolean}
         */
        logger : function logger(data, level) {
            level = level || "log";
            data = data || [];

            if (!ftl.config.debug) {
                return true;
            }

            if(this.prefix) {
                data.unshift(this.prefix);
            }

            if (!window.console) {
                return;
            }

            if(typeof window.console !== "object" || typeof window.console[level] !== "function") {
                level = "log";
            }

            try {
                window.console[level].apply(window.console, data);
            } catch(err) {
                try {
                    window.console[level](data.join(", "));

                } catch(err2) {}
            }
        },

        /**
         * log data with a "debug" level
         *
         * @param object data data to log
         */
        debug : function debug() {
            this.logger(Array.prototype.slice.call(arguments), "debug");
        },

        /**
         * log data with a "log" level
         *
         * @param object data data to log
         */
        log : function log() {
            this.logger(Array.prototype.slice.call(arguments), "log");
        },

        /**
         * log data with a "info" level
         *
         * @param object data data to log
         */
        info : function info() {
            this.logger(Array.prototype.slice.call(arguments), "info");
        },

        /**
         * log data with a "warn" level
         *
         * @param object data data to log
         */
        warn : function warn() {
            this.logger(Array.prototype.slice.call(arguments), "warn");
        },

        /**
         * log data with a "error" level
         *
         * @param object data data to log
         */
        error : function error() {
            this.logger(Array.prototype.slice.call(arguments), "error");
        },

        /**
         * log data with a "trace" level
         *
         * @param object data data to log
         */
        trace : function trace() {
            this.logger(Array.prototype.slice.call(arguments), "trace");
        }};

    ftl.internalConsole = {};
    ftl.apply(ftl.internalConsole, ftl.console, {prefix: "[ftl] "});
}

/**
 * moteur
 */
if (!ftl.moteur) {

    ftl.moteur = {
        config: {
            grid: {
                x: 10,
                y: 10,
            }
        },

        map: {
            class: '.map',
            plan: []
        },

        init: function init() {

            if (!$( ftl.moteur.map.class ).length) {
                ftl.console.error('Canvas map not found');
                return false;
            }

            this.mapper();
            this.draw();

        },

        mapper: function mapper() {

            for (var y = 0; y < ftl.moteur.config.grid.y; y++) {
                ftl.moteur.map.plan[y] = [];

                for (var x = 0; x < ftl.moteur.config.grid.x; x++) {

                    ftl.moteur.map.plan[y][x] = {
                        field: {
                            type: 0,
                            coord: {
                                x: x,
                                y: y,
                            }
                        },
                        unit: {}
                    }

                }
            }

            ftl.moteur.map.plan[4][5].field.type = 2;
            ftl.moteur.map.plan[5][5].field.type = 2;
        },

        draw: function draw() {
            var map = $( ftl.moteur.map.class );

            for (var line in ftl.moteur.map.plan) {

                map.append('<div class="row line-' + line + '"></div>');

                for (var cell in ftl.moteur.map.plan[line]) {

                    var zone = ftl.moteur.map.plan[line][cell];

                    var lineBuild = $('.line-' + line);

                    lineBuild.append('<div class="col cell cell-' + cell + ' field-' + zone.field.type + '">&nbsp;</div>');
                }
            }

        }
    }
}

$(document).ready(function() {
    ftl.init();

    ftl.moteur.init();
});