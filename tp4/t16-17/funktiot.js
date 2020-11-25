'use strict'

module.exports =
    {
        potenssitoinen : function(numero) {
            return numero * numero;
        },
        validhlotunnus : function(tunnus) {
            return /^[0-9]{6}(?:\-|A|\+)[0-9]{3}(?:[0-9]|[a-zA-Z])$/.test(tunnus)
        }
    }