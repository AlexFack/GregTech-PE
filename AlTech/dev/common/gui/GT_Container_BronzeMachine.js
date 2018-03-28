var guiCharcoalPit = new UI.StandartWindow({
    standart: {header: {text: {text: "Charcoal Pit"}}, inventory: {standart: true}, background: { bitmap: "BronzeBG"}},
    drawing: [
            {type: "bitmap", x: 515, y: 82, bitmap: "BronzeGuiScale", scale: 4},
            {type: "bitmap", x: 900, y: 400, bitmap: "GTLogoBronze", scale: 4},     
    ], 
    elements: {
    "text1": {type: "text", x: 585, y: 90, width: 300, height: 32, text: "Working"},
    "text2": {type: "text", x: 588, y: 113, width: 300, height: 32, text: "Size"},
    "text3": {type: "text", x: 550, y: 134, width: 300, height: 32, text: "Block Checking"},
    "BronzeButton": {type: "button",  x: 580, y: 165, bitmap: "BronzeButton", bitmap2: "BronzeButtonDown", scale: 3.2, clicker: {onClick: function(){if(CharcoalActive == 1){CharcoalActive = 0;}}}},
	"BronzeButton1": {type: "button",  x: 685, y: 165, bitmap: "BronzeButton1", bitmap2: "BronzeButtonDown1", scale: 3.2, clicker: {onClick: function(){if(CharcoalActive == 0){CharcoalActive = 1;}}}},
	}
});

var guiSteamAlloySmelter = new UI.StandartWindow({
    standart: {header: {text: {text: "Steam Alloy Smelter"}}, inventory: {standart: true}, background: { bitmap: "BronzeBG"}},
	params: {slot: "BronzeSlot",invSlot: "BronzeSlot"},
    drawing: [
            {type: "bitmap", x: 530, y: 153, bitmap: "BronzeProgressBG", scale: 3.2},
            {type: "bitmap", x: 900, y: 400, bitmap: "GTLogoBronze", scale: 4},     
    ],
    elements: {
        "slotSource": {type: "slot", x: 381, y: 150, bitmap: "bronzeSlotFire"},
		"slotSource2": {type: "slot", x: 441, y: 150, bitmap: "bronzeSlotFire"},
		"slotResult": {type: "slot", x: 625, y: 150},		
		"progressScale": {type: "scale", x: 530, y: 150, direction: 0, value: 0, bitmap: "BronzeProgressScale", scale: 3.2},
    }
});

var guiSteamComressor = new UI.StandartWindow({
    standart: {header: {text: {text: "Steam Compressor"}}, inventory: {standart: true}, background: { bitmap: "BronzeBG"}},
	params: {slot: "BronzeSlot", invSlot: "BronzeSlot"},
    drawing: [
            {type: "bitmap", x: 530, y: 153, bitmap: "BronzeCompressorBG", scale: 3.2},
            {type: "bitmap", x: 900, y: 400, bitmap: "GTLogoBronze", scale: 4},     
    ],
    elements: {
        "slotSource": {type: "slot", x: 441, y: 153, bitmap:"bronzeSlotCompress"},
		"slotResult": {type: "slot", x: 625, y: 153},		
		"progressScale": {type: "scale", x: 530, y: 153, direction: 0, value: 0, bitmap: "BronzeCompressorScale", scale: 3.2},
    }
});

var guiSteamExtractor = new UI.StandartWindow({
    standart: {header: {text: {text: "Steam Extractor"}},inventory: {standart: true}, background: { bitmap: "BronzeBG"}},
	params: {slot: "BronzeSlot", invSlot: "BronzeSlot"},
    drawing: [
            {type: "bitmap", x: 530, y: 158, bitmap: "BronzeExtractorBG", scale: 3.2},
            {type: "bitmap", x: 900, y: 400, bitmap: "GTLogoBronze", scale: 4},     
    ],
    elements: {
        "slotSource": {type: "slot", x: 441, y: 158, bitmap: "bronzeSlotExtractor"},
		"slotResult": {type: "slot", x: 625, y: 158},		
		"progressScale": {type: "scale", x: 530, y: 158, direction: 0, value: 0, bitmap: "BronzeExtractorScale", scale: 3.2},
		
    }
});

var guiSteamForgeHammer = new UI.StandartWindow({
    standart: {header: {text: {text: "Steam Forge Hammer"}}, inventory: {standart: true}, background: { bitmap: "BronzeBG"}},
	params: {slot: "BronzeSlot", invSlot: "BronzeSlot"},
    drawing: [
            {type: "bitmap", x: 530, y: 150, bitmap: "BronzeHammerBG", scale: 3.2},
            {type: "bitmap", x: 900, y: 400, bitmap: "GTLogoBronze", scale: 4},     
    ],
    elements: {
        "slotSource": {type: "slot", x: 441, y: 150, bitmap: "bronzeSlotHammer"},
		"slotResult": {type: "slot", x: 625, y: 150},		
		"progressScale": {type: "scale", x: 530, y: 150, direction: 3, value: 0, bitmap: "BronzeHammerScale", scale: 3.2},
    }
});

var guiSteamFurnace = new UI.StandartWindow({
    standart: {header: {text: {text: "Steam Furnace"}}, inventory: {standart: true}, background: { bitmap: "BronzeBG"}},
	params: {slot: "BronzeSlot", invSlot: "BronzeSlot"},
    drawing: [
            {type: "bitmap", x: 530, y: 153, bitmap: "BronzeProgressBG", scale: 3.2},
            {type: "bitmap", x: 900, y: 400, bitmap: "GTLogoBronze", scale: 4},     
    ],
    elements: {
        "slotSource": {type: "slot", x: 441, y: 150, bitmap: "bronzeSlotFire"},
		"slotResult": {type: "slot", x: 625, y: 150},		
		"progressScale": {type: "scale", x: 530, y: 150, direction: 0, value: 0, bitmap: "BronzeProgressScale", scale: 3.2},
    }
});

var guiSteamMacerator = new UI.StandartWindow({
    standart: {header: {text: {text: "Steam Macerator"}}, inventory: {standart: true}, background: { bitmap: "BronzeBG"}},
	params: {slot: "BronzeSlot", invSlot: "BronzeSlot"},
    drawing: [
            {type: "bitmap", x: 530, y: 153, bitmap: "BronzeMaceratorBG", scale: 3.2},
            {type: "bitmap", x: 900, y: 400, bitmap: "GTLogoBronze", scale: 4},     
    ],
    elements: {
        "slotSource": {type: "slot", x: 441, y: 153, bitmap: "bronzeSlotMacerator"},
		"slotResult": {type: "slot", x: 625, y: 153},		
		"progressScale": {type: "scale", x: 530, y: 153, direction: 0, value: 0, bitmap: "BronzeMaceratorScale", scale: 3.2},
    }
});

var guiBronzePlatedBlastFurnase = new UI.StandartWindow({
    standart: {header: {text: {text: "Bronze Blast Furnace"}}, inventory: {standart: true}, background: { bitmap: "BronzeBG"}},
	params: {slot: "BronzeSlot", invSlot: "BronzeSlot"}, 
    drawing: [
            {type: "bitmap", x: 530, y: 200, bitmap: "BronzeBlastFurnaceBG", scale: 3.2},
            {type: "bitmap", x: 900, y: 400, bitmap: "GTLogoBronze", scale: 4},     
            {type: "bitmap", x: 800, y: 115, bitmap: "BronzeBlastFurnaceInfo", scale: 4},     
    ],
    elements: {
        "slotSource": {type: "slot", x: 441, y: 155, bitmap: "bronzeSlotIngot"},
		"slotFuel": {type: "slot", x: 441, y: 215, bitmap: "bronzeSlotFuel"},
		"slotResult": {type: "slot", x: 625, y: 185, bitmap: "bronzeSlotIngot"},
        "slotResultDust": {type: "slot", x: 685, y: 185, bitmap: "bronzeSlotDust"},			
		"progressScale": {type: "scale", x: 530, y: 200, direction: 0, value: 0, bitmap: "BronzeBlastFurnaceScale", scale: 3.2},
    }
});