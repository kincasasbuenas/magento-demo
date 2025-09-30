define([
    'jquery',
    'mage/tabs'
], function ($) {
    'use strict';

    return function (config, element) {
        $(element).tabs({
            openedState: 'active',
            animate: {duration: 100},
            active: 0,
            disabledState: 'disabled'
        });
    };
});