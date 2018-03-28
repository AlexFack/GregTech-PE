var guiBasicSteamTurbine = new UI.StandartWindow({
    standart: {header: {text: {text: "Basic Steam Turbine"}}, inventory: {standart: true}, background: {standart: true}},
    drawing: [
            {type: "bitmap", x: 320, y: 40, bitmap: "InfoBG", scale: 5},
			{type: "bitmap", x: 695, y: 125, bitmap: "TankScaleBG", scale: 3.8},
            {type: "bitmap", x: 900, y: 380, bitmap: "GTLogoGold", scale: 4},     
    ],  
    elements: {
        "slotSteam": {type: "slot", x: 690, y: 60, bitmap:"ESlotIN"},
		"slotNull": {type: "slot", x: 690, y: 190, bitmap:"ESlotOUT"},
		"text1": {type: "text", text: "Liquid Amount",  width: 100, height: 50, x: 340, y: 60},
		"text2": {type: "text", text: "0", width: 100, height: 50, x: 340, y: 90},
		"Liquid": {type: "image", x: 600, y: 185, bitmap: "fluid_none_bg", scale: 4}
    }
});