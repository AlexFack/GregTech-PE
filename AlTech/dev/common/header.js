IMPORT("ToolType", "*");
IMPORT("Chemistry", "*");
IMPORT("SoundAPI", "*");
IMPORT("energylib", "*");

var EU = EnergyTypeRegistry.assureEnergyType("Eu", 1);
var ST = EnergyTypeRegistry.assureEnergyType("St", 1);
var explode = ModAPI.requireGlobal("Level.explode");
var setLoadingTip = ModAPI.requireGlobal("MCSystem.setLoadingTip");

LiquidRegistry.registerLiquid("steam", "Steam", ["fluid_steam_bg"]);

var round = function(num, x){
	var multiplier = Math.pow(10, x)
	return Math.floor(num * multiplier) / multiplier
}


var random = function(min, max){
	return Math.floor(java.lang.Math.random() * (max - min + 1)) + min;
}

var rollPercentage = function(pr){
    return pr>=round(Math.random()*100, 2)
}