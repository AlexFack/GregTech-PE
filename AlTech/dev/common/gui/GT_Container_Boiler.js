var guiHighPressureCoalBoiler = new UI.StandartWindow({
    standart: {header: {text: {text: "High Pressure Coal Boiler"}}, inventory: {standart: true}, background: { bitmap: "SteelBG"}},
	params: {slot: "SteelSlot", invSlot: "SteelSlot"},
    drawing: [{type: "bitmap", x: 446, y: 200, bitmap: "SteelFuelIcon", scale: 3.2},
            {type: "bitmap", x: 530, y: 140, bitmap: "SteelFuelBG", scale: 3.2},  
            {type: "bitmap", x: 590, y: 140, bitmap: "SteelFuelBG", scale: 3.2}, 
            {type: "bitmap", x: 650, y: 140, bitmap: "SteelFuelBG", scale: 3.2}, 
            {type: "bitmap", x: 714, y: 200, bitmap: "SteelBurnBG", scale: 3.2},
            {type: "bitmap", x: 900, y: 400, bitmap: "GTLogoSteel", scale: 4},     
    ],
    elements: {
        "slotWater": {type: "slot", x: 441, y: 132, bitmap:"SteelSlotIN"},
		"slotNull": {type: "slot", x: 441, y: 262, bitmap:"SteelSlotOUT"},
		"slotFuelD": {type: "slot", x: 711, y: 132, bitmap:"SteelSlotDust"},
		"slotFuel": {type: "slot", x: 711, y: 262, bitmap:"SteelSlotFuel"},
		"steamScale": {type: "scale", x: 530, y: 140, direction: 1, value: 0, bitmap: "SteamScale", scale: 3.2},
		"waterScale": {type: "scale", x: 590, y: 140, direction: 1, value: 0, bitmap: "WaterScale", scale: 3.2},
		"fuelScale": {type: "scale", x: 650, y: 140, direction: 1, value: 0, bitmap: "FuelScale", scale: 3.2},
		"burningScale": {type: "scale", x: 714, y: 200, direction: 1, value: 0.5, bitmap: "SteelBurnScale", scale: 3.2},
    }
});

var guiHighPressureLavaBoiler = new UI.StandartWindow({
    standart: {header: {text: {text: "High Pressure Lava Boiler"}}, inventory: {standart: true}, background: { bitmap: "SteelBG"}},
	params: {slot: "SteelSlot", invSlot: "SteelSlot"}, 
    drawing: [
            {type: "bitmap", x: 446, y: 200, bitmap: "SteelFuelIcon", scale: 3.2},
            {type: "bitmap", x: 530, y: 140, bitmap: "SteelFuelBG", scale: 3.2},  
            {type: "bitmap", x: 590, y: 140, bitmap: "SteelFuelBG", scale: 3.2}, 
            {type: "bitmap", x: 650, y: 140, bitmap: "SteelFuelBG", scale: 3.2}, 
            {type: "bitmap", x: 714, y: 200, bitmap: "SteelBurnBG", scale: 3.2},
            {type: "bitmap", x: 900, y: 400, bitmap: "GTLogoSteel", scale: 4},     
    ], 
    elements: {
        "slotWater": {type: "slot", x: 441, y: 132, bitmap:"SteelSlotIN"},
		"slotNull": {type: "slot", x: 441, y: 262, bitmap:"SteelSlotOUT"},
		"slotFuelD": {type: "slot", x: 711, y: 132, bitmap:"SteelSlotDust"},
		"slotFuel": {type: "slot", x: 711, y: 262, bitmap:"SteelSlotFuel"},
		"steamScale": {type: "scale", x: 530, y: 140, direction: 1, value: 0, bitmap: "SteamScale", scale: 3.2},
		"waterScale": {type: "scale", x: 590, y: 140, direction: 1, value: 0, bitmap: "WaterScale", scale: 3.2},
		"fuelScale": {type: "scale", x: 650, y: 140, direction: 1, value: 0, bitmap: "FuelScale", scale: 3.2},
		"burningScale": {type: "scale", x: 714, y: 200, direction: 1, value: 0.5, bitmap: "SteelBurnScale", scale: 3.2},
    }
});

var guiSimpleSolarBoiler = new UI.StandartWindow({
    standart: {header: {text: {text: "Simple Solar Boiler"}}, inventory: {standart: true}, background: { bitmap: "BronzeBG"}},
	params: {slot: "BronzeSlot", invSlot: "BronzeSlot"},
    drawing: [
            {type: "bitmap", x: 446, y: 200, bitmap: "FuelIcon", scale: 3.2},
            {type: "bitmap", x: 530, y: 140, bitmap: "BronzeFuelBG", scale: 3.2},  
            {type: "bitmap", x: 590, y: 140, bitmap: "BronzeFuelBG", scale: 3.2}, 
            {type: "bitmap", x: 650, y: 140, bitmap: "BronzeFuelBG", scale: 3.2}, 
            {type: "bitmap", x: 714, y: 200, bitmap: "BronzeFuelScaleBG", scale: 3.2},
            {type: "bitmap", x: 900, y: 400, bitmap: "GTLogoBronze", scale: 4},     
    ],
    elements: {
        "slotWater": {type: "slot", x: 441, y: 132, bitmap: "bronzeSlotIN"},
		"slotNull": {type: "slot", x: 441, y: 262, bitmap: "bronzeSlotOUT"},
		"steamScale": {type: "scale", x: 530, y: 140, direction: 1, value: 0, bitmap: "SteamScale", scale: 3.2},
		"waterScale": {type: "scale", x: 590, y: 140, direction: 1, value: 0, bitmap: "WaterScale", scale: 3.2},
		"fuelScale": {type: "scale", x: 650, y: 140, direction: 1, value: 0, bitmap: "FuelScale", scale: 3.2},
		"burningScale": {type: "scale", x: 714, y: 200, direction: 1, value: 0.5, bitmap: "BronzeFuelScale", scale: 3.2},
    }
});


var guiSmallBoiler = new UI.StandartWindow({
    standart: {header: {text: {text: "Small Coal Boiler"}}, inventory: {standart: true}, background: { bitmap: "BronzeBG"}},
	params: {slot: "BronzeSlot", invSlot: "BronzeSlot"}, 
    drawing: [
            {type: "bitmap", x: 446, y: 200, bitmap: "FuelIcon", scale: 3.2},
            {type: "bitmap", x: 530, y: 140, bitmap: "BronzeFuelBG", scale: 3.2},  
            {type: "bitmap", x: 590, y: 140, bitmap: "BronzeFuelBG", scale: 3.2}, 
            {type: "bitmap", x: 650, y: 140, bitmap: "BronzeFuelBG", scale: 3.2}, 
            {type: "bitmap", x: 714, y: 200, bitmap: "BronzeFuelScaleBG", scale: 3.2},
            {type: "bitmap", x: 900, y: 400, bitmap: "GTLogoBronze", scale: 4},     
    ], 
    elements: {
        "slotWater": {type: "slot", x: 441, y: 132, bitmap:"bronzeSlotIN"},
		"slotNull": {type: "slot", x: 441, y: 262, bitmap:"bronzeSlotOUT"},
		"slotFuelD": {type: "slot", x: 711, y: 132, bitmap:"bronzeSlotDust"},
		"slotFuel": {type: "slot", x: 711, y: 262, bitmap:"bronzeSlotFuel"},
		"steamScale": {type: "scale", x: 530, y: 140, direction: 1, value: 0, bitmap: "SteamScale", scale: 3.2},
		"waterScale": {type: "scale", x: 590, y: 140, direction: 1, value: 0, bitmap: "WaterScale", scale: 3.2},
		"fuelScale": {type: "scale", x: 650, y: 140, direction: 1, value: 0, bitmap: "FuelScale", scale: 3.2},
		"burningScale": {type: "scale", x: 714, y: 200, direction: 1, value: 0.5, bitmap: "BronzeFuelScale", scale: 3.2},
    }
});