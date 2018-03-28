var guiHighPressureFurnace = new UI.StandartWindow({
    standart: {header: {text: {text: "High Pressure Furnace"}}, inventory: {standart: true}, background: { bitmap: "SteelBG"}},
	params: {slot: "SteelSlot", invSlot: "SteelSlot"},
    drawing: [
            {type: "bitmap", x: 530, y: 153, bitmap: "SteelProgressBG", scale: 3.2},
            {type: "bitmap", x: 900, y: 400, bitmap: "GTLogoSteel", scale: 4},     
    ],
    elements: {
        "slotSource": {type: "slot", x: 441, y: 150, bitmap: "steelSlotFire"},
		"slotResult": {type: "slot", x: 625, y: 150},		
		"progressScale": {type: "scale", x: 530, y: 150, direction: 0, value: 0, bitmap: "SteelProgressScale", scale: 3.2},
    }
});

var guiHighPressureMacerator = new UI.StandartWindow({
    standart: {header: {text: {text: "High Pressure Macerator"}}, inventory: {standart: true}, background: { bitmap: "SteelBG"}},
	params: {slot: "SteelSlot", invSlot: "SteelSlot"},
    drawing: [
            {type: "bitmap", x: 530, y: 153, bitmap: "SteelMaceratorBG", scale: 3.2},
            {type: "bitmap", x: 900, y: 400, bitmap: "GTLogoSteel", scale: 4},     
    ],
    elements: {
        "slotSource": {type: "slot", x: 441, y: 153, bitmap: "steelSlotMacerator"},
		"slotResult": {type: "slot", x: 625, y: 153},		
		"progressScale": {type: "scale", x: 530, y: 153, direction: 0, value: 0, bitmap: "SteelMaceratorScale", scale: 3.2},
    }
});

var guiHighPressureExtractor = new UI.StandartWindow({
    standart: {header: {text: {text: "High Pressure Extractor"}},inventory: {standart: true},background: { bitmap: "SteelBG"}},
	params: {slot: "SteelSlot", invSlot: "SteelSlot"},
    drawing: [
            {type: "bitmap", x: 530, y: 158, bitmap: "SteelExtractorBG", scale: 3.2},
            {type: "bitmap", x: 900, y: 400, bitmap: "GTLogoSteel", scale: 4},     
    ],
    elements: {
        "slotSource": {type: "slot", x: 441, y: 158, bitmap: "steelSlotExtractor"},
		"slotResult": {type: "slot", x: 625, y: 158},		
		"progressScale": {type: "scale", x: 530, y: 158, direction: 0, value: 0, bitmap: "SteelExtractorScale", scale: 3.2},	
    }
});

var guiHighPressureForgeHammer = new UI.StandartWindow({
    standart: {header: {text: {text: "High Pressure Forge Hammer"}},inventory: {standart: true},background: { bitmap: "BronzeBG"}},
	params: {slot: "SteelSlot", invSlot: "SteelSlot"},
    drawing: [
            {type: "bitmap", x: 530, y: 150, bitmap: "SteelHammerBG", scale: 3.2},
            {type: "bitmap", x: 900, y: 400, bitmap: "GTLogoSteel", scale: 4},     
    ],
    elements: {
        "slotSource": {type: "slot", x: 441, y: 150, bitmap: "steelSlotHammer"},
		"slotResult": {type: "slot", x: 625, y: 150},		
		"progressScale": {type: "scale", x: 530, y: 150, direction: 3, value: 0, bitmap: "SteelHammerScale", scale: 3.2},
    }
});

var guiHighPressureComressor = new UI.StandartWindow({
    standart: {header: {text: {text: "High Pressure Compressor"}},inventory: {standart: true},background: { bitmap: "SteelBG"}},
	params: {slot: "SteelSlot", invSlot: "SteelSlot"},
    drawing: [
            {type: "bitmap", x: 530, y: 153, bitmap: "SteelCompressorBG", scale: 3.2},
            {type: "bitmap", x: 900, y: 400, bitmap: "GTLogoSteel", scale: 4},     
    ],
    elements: {
        "slotSource": {type: "slot", x: 441, y: 153, bitmap:"steelSlotCompress"},
		"slotResult": {type: "slot", x: 625, y: 153},		
		"progressScale": {type: "scale", x: 530, y: 153, direction: 0, value: 0, bitmap: "SteelCompressorScale", scale: 3.2},
    }
});

var guiHighPressureAlloySmelter = new UI.StandartWindow({
    standart: {header: {text: {text: "High Pressure Alloy Smelter"}}, inventory: {standart: true}, background: { bitmap: "SteelBG"}},
	params: {slot: "SteelSlot", invSlot: "SteelSlot"},
    drawing: [
            {type: "bitmap", x: 530, y: 153, bitmap: "SteelProgressBG", scale: 3.2},
            {type: "bitmap", x: 900, y: 400, bitmap: "GTLogoSteel", scale: 4},     
    ],
    elements: {
        "slotSource": {type: "slot", x: 381, y: 150, bitmap: "steelSlotFire"},
		"slotSource2": {type: "slot", x: 441, y: 150, bitmap: "steelSlotFire"},
		"slotResult": {type: "slot", x: 625, y: 150},		
		"progressScale": {type: "scale", x: 530, y: 150, direction: 0, value: 0, bitmap: "SteelProgressScale", scale: 3.2},
    }
});