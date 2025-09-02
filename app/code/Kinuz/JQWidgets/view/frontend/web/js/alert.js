define([
    'jquery',
    'Magento_Ui/js/modal/alert' 
], function ($, alert) {
    'use strict';

    return function (config, element) {
        const buttonsConfig = {
            buttons: [{
                text: $.mage.__('Accept'),
                class: 'action primary accept',
                click: function () {
                    this.closeModal(true);
                }
            }, {
                text: $.mage.__('New Action'),
                class: 'action',
                click: function () {
                    // Lógica para la nueva acción
                    console.log("Nueva acción disparada desde el módulo JS.");
                    this.closeModal(true);
                }
            }]
        };

        let finalConfig = $.extend(true, {}, config, buttonsConfig);
        
        $(element).on('click', function () {
            alert(finalConfig);
        });
    };
});