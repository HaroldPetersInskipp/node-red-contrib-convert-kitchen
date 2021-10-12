module.exports = function(RED) {
    function ConvertKitchenNode(config) {
        RED.nodes.createNode(this,config);
        this.sys = config.sys;
        this.value = config.value;
        this.unit = config.unit;
        this.finalUnit = config.finalUnit;
        var node = this;
        node.on('input', function(msg) {
            
            let finalValue;
            
            if (!msg.value) {
                msg.value = parseFloat(node.value);
            };
            if (!msg.unit) {
                msg.unit = node.unit;
            };
            if (!msg.finalUnit) {
                msg.finalUnit = node.finalUnit;
            };
            if (!msg.sys) {
                msg.sys = node.sys;
            };
            let sys = msg.sys.toLowerCase();

            // Check input types and handle errors
            if (typeof (msg.value) !== 'number') {
                throw new Error("msg.value is not a number");
            };
            if (typeof (msg.unit) !== 'string') {
                throw new Error("msg.unit is not a string");
            };
            if (typeof (msg.finalUnit) !== 'string') {
                throw new Error("msg.finalUnit is not a string");
            };
            if (typeof (msg.sys) !== 'string') {
                throw new Error("msg.sys is not a string");
            };
            if (msg.unit === '') {
                return;
            } else if (msg.unit === msg.finalUnit) {
                throw new Error("msg.unit and msg.finalUnit can't be the same");
            };

            // Handle case sensitivity and pluralization of inputs, and alternate spellings
            msg.unit = msg.unit.toLowerCase();
            if (msg.unit.endsWith("s")) {
                msg.unit = msg.unit.substr(0, msg.unit.length - 1);
            };
            msg.finalUnit = msg.finalUnit.toLowerCase();
            if (msg.finalUnit.endsWith("s")) {
                msg.finalUnit = msg.finalUnit.substr(0, msg.finalUnit.length - 1);
            };
            if (msg.finalUnit === 'ounce') {
                msg.finalUnit = 'oz';
            };
            if (msg.unit === 'ounce') {
                msg.unit = 'oz';
            };
            if (msg.unit === 'litre') {
                msg.unit = 'liter';
            };
            if (msg.finalUnit === 'litre') {
                msg.finalUnit = 'liter';
            };
            if (msg.unit === 'millilitre') {
                msg.unit = 'milliliter';
            };
            if (msg.finalUnit === 'millilitre') {
                msg.finalUnit = 'milliliter';
            };                    

            // Convert input unit and value to finalUnit and finalValue
            // logic for US system
            if (sys === 'us'){
                if (msg.unit == 'cup' && msg.finalUnit == 'gallon') {
                    finalValue = msg.value / 16;
                } else if (msg.unit == 'cup' && msg.finalUnit == 'quart') {
                    finalValue = msg.value / 4;
                } else if (msg.unit == 'cup' && msg.finalUnit == 'liter') {
                    finalValue = msg.value / 4.22675;
                } else if (msg.unit == 'cup' && msg.finalUnit == 'pint') {
                    finalValue = msg.value / 2;
                } else if (msg.unit == 'cup' && msg.finalUnit == 'oz') {
                    finalValue = msg.value * 8;
                } else if (msg.unit == 'cup' && msg.finalUnit == 'tablespoon') {
                    finalValue = msg.value * 16;
                } else if (msg.unit == 'cup' && msg.finalUnit == 'teaspoon') {
                    finalValue = msg.value * 48;
                } else if (msg.unit == 'cup' && msg.finalUnit == 'milliliter') {
                    finalValue = msg.value * 237;
                } else if (msg.unit == 'gallon' && msg.finalUnit == 'cup') {
                    finalValue = msg.value * 16;
                } else if (msg.unit == 'gallon' && msg.finalUnit == 'quart') {
                    finalValue = msg.value * 4;
                } else if (msg.unit == 'gallon' && msg.finalUnit == 'liter') {
                    finalValue = msg.value * 3.78541;
                } else if (msg.unit == 'gallon' && msg.finalUnit == 'pint') {
                    finalValue = msg.value * 8;
                } else if (msg.unit == 'gallon' && msg.finalUnit == 'oz') {
                    finalValue = msg.value * 128;
                } else if (msg.unit == 'gallon' && msg.finalUnit == 'tablespoon') {
                    finalValue = msg.value * 256;
                } else if (msg.unit == 'gallon' && msg.finalUnit == 'teaspoon') {
                    finalValue = msg.value * 768;
                } else if (msg.unit == 'gallon' && msg.finalUnit == 'milliliter') {
                    finalValue = msg.value * 3785.41;
                } else if (msg.unit == 'quart' && msg.finalUnit == 'cup') {
                    finalValue = msg.value * 4;
                } else if (msg.unit == 'quart' && msg.finalUnit == 'gallon') {
                    finalValue = msg.value / 4;
                } else if (msg.unit == 'quart' && msg.finalUnit == 'liter') {
                    finalValue = msg.value * 0.946353;
                } else if (msg.unit == 'quart' && msg.finalUnit == 'pint') {
                    finalValue = msg.value / 2;
                } else if (msg.unit == 'quart' && msg.finalUnit == 'oz') {
                    finalValue = msg.value * 32;
                } else if (msg.unit == 'quart' && msg.finalUnit == 'tablespoon') {
                    finalValue = msg.value * 64;
                } else if (msg.unit == 'quart' && msg.finalUnit == 'teaspoon') {
                    finalValue = msg.value * 192;
                } else if (msg.unit == 'quart' && msg.finalUnit == 'milliliter') {
                    finalValue = msg.value * 946.353;
                } else if (msg.unit == 'liter' && msg.finalUnit == 'cup') {
                    finalValue = msg.value * 4.22675;
                } else if (msg.unit == 'liter' && msg.finalUnit == 'gallon') {
                    finalValue = msg.value / 3.785;
                } else if (msg.unit == 'liter' && msg.finalUnit == 'quart') {
                    finalValue = msg.value / 1.057;
                } else if (msg.unit == 'liter' && msg.finalUnit == 'pint') {
                    finalValue = msg.value * 2.11338;
                } else if (msg.unit == 'liter' && msg.finalUnit == 'oz') {
                    finalValue = msg.value * 33.814;
                } else if (msg.unit == 'liter' && msg.finalUnit == 'tablespoon') {
                    finalValue = msg.value * 67.628;
                } else if (msg.unit == 'liter' && msg.finalUnit == 'teaspoon') {
                    finalValue = msg.value * 202.884;
                } else if (msg.unit == 'liter' && msg.finalUnit == 'milliliter') {
                    finalValue = msg.value * 1000;
                } else if (msg.unit == 'pint' && msg.finalUnit == 'cup') {
                    finalValue = msg.value * 2;
                } else if (msg.unit == 'pint' && msg.finalUnit == 'gallon') {
                    finalValue = msg.value / 8;
                } else if (msg.unit == 'pint' && msg.finalUnit == 'quart') {
                    finalValue = msg.value / 2;
                } else if (msg.unit == 'pint' && msg.finalUnit == 'liter') {
                    finalValue = msg.value / 2.11376;
                } else if (msg.unit == 'pint' && msg.finalUnit == 'oz') {
                    finalValue = msg.value * 16;
                } else if (msg.unit == 'pint' && msg.finalUnit == 'tablespoon') {
                    finalValue = msg.value * 32;
                } else if (msg.unit == 'pint' && msg.finalUnit == 'teaspoon') {
                    finalValue = msg.value * 96;
                } else if (msg.unit == 'pint' && msg.finalUnit == 'milliliter') {
                    finalValue = msg.value * 473.176;
                } else if (msg.unit == 'oz' && msg.finalUnit == 'cup') {
                    finalValue = msg.value / 8;
                } else if (msg.unit == 'oz' && msg.finalUnit == 'gallon') {
                    finalValue = msg.value / 128;
                } else if (msg.unit == 'oz' && msg.finalUnit == 'quart') {
                    finalValue = msg.value / 32;
                } else if (msg.unit == 'oz' && msg.finalUnit == 'liter') {
                    finalValue = msg.value / 33.814;
                } else if (msg.unit == 'oz' && msg.finalUnit == 'pint') {
                    finalValue = msg.value / 16;
                } else if (msg.unit == 'oz' && msg.finalUnit == 'tablespoon') {
                    finalValue = msg.value * 2;
                } else if (msg.unit == 'oz' && msg.finalUnit == 'teaspoon') {
                    finalValue = msg.value * 6;
                } else if (msg.unit == 'oz' && msg.finalUnit == 'milliliter') {
                    finalValue = msg.value * 29.5735;
                } else if (msg.unit == 'tablespoon' && msg.finalUnit == 'cup') {
                    finalValue = msg.value / 16;
                } else if (msg.unit == 'tablespoon' && msg.finalUnit == 'gallon') {
                    finalValue = msg.value / 256;
                } else if (msg.unit == 'tablespoon' && msg.finalUnit == 'quart') {
                    finalValue = msg.value / 64;
                } else if (msg.unit == 'tablespoon' && msg.finalUnit == 'liter') {
                    finalValue = msg.value / 67.628;
                } else if (msg.unit == 'tablespoon' && msg.finalUnit == 'pint') {
                    finalValue = msg.value / 32;
                } else if (msg.unit == 'tablespoon' && msg.finalUnit == 'oz') {
                    finalValue = msg.value / 2;
                } else if (msg.unit == 'tablespoon' && msg.finalUnit == 'teaspoon') {
                    finalValue = msg.value * 3;
                } else if (msg.unit == 'tablespoon' && msg.finalUnit == 'milliliter') {
                    finalValue = msg.value * 14.7868;
                } else if (msg.unit == 'teaspoon' && msg.finalUnit == 'cup') {
                    finalValue = msg.value / 48;
                } else if (msg.unit == 'teaspoon' && msg.finalUnit == 'gallon') {
                    finalValue = msg.value / 768;
                } else if (msg.unit == 'teaspoon' && msg.finalUnit == 'quart') {
                    finalValue = msg.value / 192;
                } else if (msg.unit == 'teaspoon' && msg.finalUnit == 'liter') {
                    finalValue = msg.value / 203;
                } else if (msg.unit == 'teaspoon' && msg.finalUnit == 'pint') {
                    finalValue = msg.value / 96;
                } else if (msg.unit == 'teaspoon' && msg.finalUnit == 'oz') {
                    finalValue = msg.value / 6;
                } else if (msg.unit == 'teaspoon' && msg.finalUnit == 'tablespoon') {
                    finalValue = msg.value / 3;
                } else if (msg.unit == 'teaspoon' && msg.finalUnit == 'milliliter') {
                    finalValue = msg.value * 4.92892;
                } else if (msg.unit == 'milliliter' && msg.finalUnit == 'cup') {
                    finalValue = msg.value / 237;
                } else if (msg.unit == 'milliliter' && msg.finalUnit == 'gallon') {
                    finalValue = msg.value / 3785;
                } else if (msg.unit == 'milliliter' && msg.finalUnit == 'quart') {
                    finalValue = msg.value / 946;
                } else if (msg.unit == 'milliliter' && msg.finalUnit == 'liter') {
                    finalValue = msg.value / 1000;
                } else if (msg.unit == 'milliliter' && msg.finalUnit == 'pint') {
                    finalValue = msg.value / 473;
                } else if (msg.unit == 'milliliter' && msg.finalUnit == 'oz') {
                    finalValue = msg.value / 29.574;
                } else if (msg.unit == 'milliliter' && msg.finalUnit == 'tablespoon') {
                    finalValue = msg.value / 14.787;
                } else if (msg.unit == 'milliliter' && msg.finalUnit == 'teaspoon') {
                    finalValue = msg.value / 4.929;
                } else {
                    // Throw error if expected inputs are not found
                    throw new Error("This node expects msg.value as a Number, msg.sys to be 'us' or 'imperial', and msg.unit/msg.finalUnit each to be one of 'gallon', 'quart', 'liter', 'pint', 'cup', 'oz', 'tablespoon', 'teaspoon' or 'milliliter'.");
                };
            };
            // logic for imperial system
            if (sys === 'imperial') {
                if (msg.unit == 'cup' && msg.finalUnit == 'gallon') {
                    finalValue = msg.value / 16;
                } else if (msg.unit == 'cup' && msg.finalUnit == 'quart') {
                    finalValue = msg.value / 4;
                } else if (msg.unit == 'cup' && msg.finalUnit == 'liter') {
                    finalValue = msg.value / 3.51951;
                } else if (msg.unit == 'cup' && msg.finalUnit == 'pint') {
                    finalValue = msg.value / 2;
                } else if (msg.unit == 'cup' && msg.finalUnit == 'oz') {
                    finalValue = msg.value * 10;
                } else if (msg.unit == 'cup' && msg.finalUnit == 'tablespoon') {
                    finalValue = msg.value * 16;
                } else if (msg.unit == 'cup' && msg.finalUnit == 'teaspoon') {
                    finalValue = msg.value * 48;
                } else if (msg.unit == 'cup' && msg.finalUnit == 'milliliter') {
                    finalValue = msg.value * 284;
                } else if (msg.unit == 'gallon' && msg.finalUnit == 'cup') {
                    finalValue = msg.value * 16;
                } else if (msg.unit == 'gallon' && msg.finalUnit == 'quart') {
                    finalValue = msg.value * 4;
                } else if (msg.unit == 'gallon' && msg.finalUnit == 'liter') {
                    finalValue = msg.value * 4.54609;
                } else if (msg.unit == 'gallon' && msg.finalUnit == 'pint') {
                    finalValue = msg.value * 8;
                } else if (msg.unit == 'gallon' && msg.finalUnit == 'oz') {
                    finalValue = msg.value * 160;
                } else if (msg.unit == 'gallon' && msg.finalUnit == 'tablespoon') {
                    finalValue = msg.value * 256;
                } else if (msg.unit == 'gallon' && msg.finalUnit == 'teaspoon') {
                    finalValue = msg.value * 768;
                } else if (msg.unit == 'gallon' && msg.finalUnit == 'milliliter') {
                    finalValue = msg.value * 4546.09;
                } else if (msg.unit == 'quart' && msg.finalUnit == 'cup') {
                    finalValue = msg.value * 4;
                } else if (msg.unit == 'quart' && msg.finalUnit == 'gallon') {
                    finalValue = msg.value / 4;
                } else if (msg.unit == 'quart' && msg.finalUnit == 'liter') {
                    finalValue = msg.value * 1.13652;
                } else if (msg.unit == 'quart' && msg.finalUnit == 'pint') {
                    finalValue = msg.value * 2;
                } else if (msg.unit == 'quart' && msg.finalUnit == 'oz') {
                    finalValue = msg.value * 40;
                } else if (msg.unit == 'quart' && msg.finalUnit == 'tablespoon') {
                    finalValue = msg.value * 64;
                } else if (msg.unit == 'quart' && msg.finalUnit == 'teaspoon') {
                    finalValue = msg.value * 192;
                } else if (msg.unit == 'quart' && msg.finalUnit == 'milliliter') {
                    finalValue = msg.value * 1136.52;
                } else if (msg.unit == 'liter' && msg.finalUnit == 'cup') {
                    finalValue = msg.value * 3.51951;
                } else if (msg.unit == 'liter' && msg.finalUnit == 'gallon') {
                    finalValue = msg.value / 4.546;
                } else if (msg.unit == 'liter' && msg.finalUnit == 'quart') {
                    finalValue = msg.value * 0.879877;
                } else if (msg.unit == 'liter' && msg.finalUnit == 'pint') {
                    finalValue = msg.value * 1.75975;
                } else if (msg.unit == 'liter' && msg.finalUnit == 'oz') {
                    finalValue = msg.value * 35.1951;
                } else if (msg.unit == 'liter' && msg.finalUnit == 'tablespoon') {
                    finalValue = msg.value * 56.3121;
                } else if (msg.unit == 'liter' && msg.finalUnit == 'teaspoon') {
                    finalValue = msg.value * 168.936;
                } else if (msg.unit == 'liter' && msg.finalUnit == 'milliliter') {
                    finalValue = msg.value * 1000;
                } else if (msg.unit == 'pint' && msg.finalUnit == 'cup') {
                    finalValue = msg.value * 2;
                } else if (msg.unit == 'pint' && msg.finalUnit == 'gallon') {
                    finalValue = msg.value / 8;
                } else if (msg.unit == 'pint' && msg.finalUnit == 'quart') {
                    finalValue = msg.value / 2;
                } else if (msg.unit == 'pint' && msg.finalUnit == 'liter') {
                    finalValue = msg.value * 0.568261;
                } else if (msg.unit == 'pint' && msg.finalUnit == 'oz') {
                    finalValue = msg.value * 20;
                } else if (msg.unit == 'pint' && msg.finalUnit == 'tablespoon') {
                    finalValue = msg.value * 32;
                } else if (msg.unit == 'pint' && msg.finalUnit == 'teaspoon') {
                    finalValue = msg.value * 96;
                } else if (msg.unit == 'pint' && msg.finalUnit == 'milliliter') {
                    finalValue = msg.value * 568.261;
                } else if (msg.unit == 'oz' && msg.finalUnit == 'cup') {
                    finalValue = msg.value / 10;
                } else if (msg.unit == 'oz' && msg.finalUnit == 'gallon') {
                    finalValue = msg.value / 160;
                } else if (msg.unit == 'oz' && msg.finalUnit == 'quart') {
                    finalValue = msg.value / 40;
                } else if (msg.unit == 'oz' && msg.finalUnit == 'liter') {
                    finalValue = msg.value / 35.1951;
                } else if (msg.unit == 'oz' && msg.finalUnit == 'pint') {
                    finalValue = msg.value / 20;
                } else if (msg.unit == 'oz' && msg.finalUnit == 'tablespoon') {
                    finalValue = msg.value * 1.6;
                } else if (msg.unit == 'oz' && msg.finalUnit == 'teaspoon') {
                    finalValue = msg.value * 4.8;
                } else if (msg.unit == 'oz' && msg.finalUnit == 'milliliter') {
                    finalValue = msg.value * 28.4131;
                } else if (msg.unit == 'tablespoon' && msg.finalUnit == 'cup') {
                    finalValue = msg.value / 16;
                } else if (msg.unit == 'tablespoon' && msg.finalUnit == 'gallon') {
                    finalValue = msg.value / 256;
                } else if (msg.unit == 'tablespoon' && msg.finalUnit == 'quart') {
                    finalValue = msg.value / 64;
                } else if (msg.unit == 'tablespoon' && msg.finalUnit == 'liter') {
                    finalValue = msg.value / 56.312;
                } else if (msg.unit == 'tablespoon' && msg.finalUnit == 'pint') {
                    finalValue = msg.value / 32;
                } else if (msg.unit == 'tablespoon' && msg.finalUnit == 'oz') {
                    finalValue = msg.value / 1.6;
                } else if (msg.unit == 'tablespoon' && msg.finalUnit == 'teaspoon') {
                    finalValue = msg.value * 1.6;
                } else if (msg.unit == 'tablespoon' && msg.finalUnit == 'milliliter') {
                    finalValue = msg.value * 28.4131;
                } else if (msg.unit == 'teaspoon' && msg.finalUnit == 'cup') {
                    finalValue = msg.value / 48;
                } else if (msg.unit == 'teaspoon' && msg.finalUnit == 'gallon') {
                    finalValue = msg.value * 0.00130208;
                } else if (msg.unit == 'teaspoon' && msg.finalUnit == 'quart') {
                    finalValue = msg.value / 192;
                } else if (msg.unit == 'teaspoon' && msg.finalUnit == 'liter') {
                    finalValue = msg.value * 0.00591939;
                } else if (msg.unit == 'teaspoon' && msg.finalUnit == 'pint') {
                    finalValue = msg.value / 96;
                } else if (msg.unit == 'teaspoon' && msg.finalUnit == 'oz') {
                    finalValue = msg.value / 4.8;
                } else if (msg.unit == 'teaspoon' && msg.finalUnit == 'tablespoon') {
                    finalValue = msg.value / 3;
                } else if (msg.unit == 'teaspoon' && msg.finalUnit == 'milliliter') {
                    finalValue = msg.value * 5.91939;
                } else if (msg.unit == 'milliliter' && msg.finalUnit == 'cup') {
                    finalValue = msg.value * 0.00351951;
                } else if (msg.unit == 'milliliter' && msg.finalUnit == 'gallon') {
                    finalValue = msg.value * 0.000219969;
                } else if (msg.unit == 'milliliter' && msg.finalUnit == 'quart') {
                    finalValue = msg.value * 0.000879877;
                } else if (msg.unit == 'milliliter' && msg.finalUnit == 'liter') {
                    finalValue = msg.value / 1000;
                } else if (msg.unit == 'milliliter' && msg.finalUnit == 'pint') {
                    finalValue = msg.value * 0.00175975;
                } else if (msg.unit == 'milliliter' && msg.finalUnit == 'oz') {
                    finalValue = msg.value / 28.413;
                } else if (msg.unit == 'milliliter' && msg.finalUnit == 'tablespoon') {
                    finalValue = msg.value * 0.0563121;
                } else if (msg.unit == 'milliliter' && msg.finalUnit == 'teaspoon') {
                    finalValue = msg.value * 0.168936;
                } else {
                    // Throw error if expected inputs are not found
                    throw new Error("This node expects msg.value as a Number, msg.sys to be 'us' or 'imperial', and msg.unit/msg.finalUnit each to be one of 'gallon', 'quart', 'liter', 'pint', 'cup', 'oz', 'tablespoon', 'teaspoon' or 'milliliter'.");
                };
            };

            // Return formatted object with results rounded to two decimal places
            node.send({ "payload": Math.round(finalValue*100)/100, "value": msg.value, "unit": msg.unit, "finalUnit": msg.finalUnit, "sys": msg.sys});
        });
    };
    RED.nodes.registerType("convert-kitchen",ConvertKitchenNode);
};