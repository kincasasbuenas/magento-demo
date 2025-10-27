define(['jquery', 'mage/translate'], function($, $t) {
    'use strict';

    return function(mageValidation) {

        $.validator.addMethod(
            'validate-celular-co', // Nombre de la regla
            function(value, element) {
                // Si está vacío, no lo validamos (para eso usamos 'required-entry')
                if (!value || value.length === 0) {
                    return true;
                }
                
                // 1. Limpiar el valor de espacios, guiones, paréntesis o el signo '+'
                let cleanValue = value.replace(/[\s\-\(\)\+]/g, '');

                // 2. Manejar prefijo de país opcional (57)
                if (cleanValue.startsWith('57')) {
                    cleanValue = cleanValue.substring(2);
                }

                // 3. Validar el formato final: 10 dígitos y debe empezar por 3
                //    Regex: ^ (inicio) 3 (debe empezar con 3) \d{9} (seguido de 9 dígitos) $ (fin)
                return /^(3\d{9})$/.test(cleanValue);
            },
            $t('Please, enter a number cellphone valid (10 dígitos, ej: 3101234567).')
        );

        // Devolvemos el componente original; esto es crucial
        return mageValidation;
    };
});