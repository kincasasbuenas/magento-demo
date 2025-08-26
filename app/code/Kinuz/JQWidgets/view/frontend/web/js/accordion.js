define([
    'jquery',
    'accordion' 
], function ($) {
    'use strict';

    return function (config, element) {
        $(element).accordion({
            active: false,             // por defecto cerrado
            collapsible: true,         // permite cerrar todos
            openedState: "active",     // clase CSS cuando está abierto
            multipleCollapsible: false, // solo un panel abierto
        });

        $(element).on("beforeOpen", function () {
            // do something before opening the content
            console.log("beforeOpen");
        });

    };
});