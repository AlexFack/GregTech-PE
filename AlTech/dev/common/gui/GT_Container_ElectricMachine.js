var guiBasicElectricFurnace = new UI.StandartWindow({
    standart: {header: {text: {text: "Basic Electric Furnace"}}, inventory: {standart: true}, background: {standart: true}},
    drawing: [
            {type: "bitmap", x: 900, y: 380, bitmap: "GTLogoGold", scale: 4},
            {type: "bitmap", x: 530, y: 146, bitmap: "furnace_bar_background", scale: 3.2},			
    ],
    elements: {
        "progressScale": {type: "scale", x: 530, y: 146, direction: 0, value: 0.5, bitmap: "furnace_bar_scale", scale: 3.2},
		"slotSource": {type: "slot", x: 441, y: 142, bitmap:"SlotFire"},
		"slotResult": {type: "slot", x: 625, y: 142}
		}
});

var guiBasicElectricAlloySmelter = new UI.StandartWindow({
    standart: {header: {text: {text: "Basic Electric Alloy Smelter"}}, inventory: {standart: true}, background: {standart: true}},
    drawing: [
            {type: "bitmap", x: 530, y: 153, bitmap: "furnace_bar_background", scale: 3.2},
            {type: "bitmap", x: 900, y: 380, bitmap: "GTLogoGold", scale: 4},     
    ],
    elements: {
        "slotSource": {type: "slot", x: 381, y: 150, bitmap: "SlotFire"},
		"slotSource2": {type: "slot", x: 441, y: 150, bitmap: "SlotFire"},
		"slotResult": {type: "slot", x: 625, y: 150},		
		"progressScale": {type: "scale", x: 530, y: 150, direction: 0, value: 0, bitmap: "furnace_bar_scale", scale: 3.2},
    }
});

var guiBasicElectricComressor = new UI.StandartWindow({
    standart: {header: {text: {text: "Basic Electric Compressor"}}, inventory: {standart: true}, background: {standart: true}},
    drawing: [
            {type: "bitmap", x: 530, y: 153, bitmap: "compressor_bar_background", scale: 3.2},
            {type: "bitmap", x: 900, y: 380, bitmap: "GTLogoGold", scale: 4},     
    ],
    elements: {
        "slotSource": {type: "slot", x: 441, y: 153, bitmap:"SlotCompress"},
		"slotResult": {type: "slot", x: 625, y: 153},		
		"progressScale": {type: "scale", x: 530, y: 153, direction: 0, value: 0, bitmap: "compressor_bar_scale", scale: 3.2},
    }
});

var guiBasicElectricExtractor = new UI.StandartWindow({
    standart: {header: {text: {text: "Basic Electric Extractor"}},inventory: {standart: true}, background: {standart: true}},
    drawing: [
            {type: "bitmap", x: 530, y: 158, bitmap: "extractor_bar_background", scale: 3.2},
            {type: "bitmap", x: 900, y: 380, bitmap: "GTLogoGold", scale: 4},     
    ],
    elements: {
        "slotSource": {type: "slot", x: 441, y: 158, bitmap: "SlotExtractor"},
		"slotResult": {type: "slot", x: 625, y: 158},		
		"progressScale": {type: "scale", x: 530, y: 158, direction: 0, value: 0, bitmap: "extractor_bar_scale", scale: 3.2},
		
    }
});

var guiBasicElectricMacerator = new UI.StandartWindow({
    standart: {header: {text: {text: "Basic Electric Macerator"}}, inventory: {standart: true}, background: {standart: true}},
    drawing: [
            {type: "bitmap", x: 530, y: 153, bitmap: "macerator_bar_background", scale: 3.2},
            {type: "bitmap", x: 900, y: 380, bitmap: "GTLogoGold", scale: 4},     
    ],
    elements: {
        "slotSource": {type: "slot", x: 441, y: 153, bitmap: "SlotMacerator"},
		"slotResult": {type: "slot", x: 625, y: 153},		
		"progressScale": {type: "scale", x: 530, y: 153, direction: 0, value: 0, bitmap: "macerator_bar_scale", scale: 3.2},
    }
});