importLib("ATAPI", "*");
importLib("ToolType", "*");
importLib("Chemistry", "*");

__config__.checkAndRestore({ 
compability: {
   industrial_craft:false
}, 
furnaceOptions: {
   blastFurnaceFuelFlowEfficiencyPercent:100,
   blastFurnaceRecipesEfficiencyPercent:150,
   blastFurnaceFuseLong:33,
   blastFurnaceMaxTemp:2000,
      
   compactedFurnaceFuelFlowEfficiencyPercent:100,
   compactedFurnaceRecipesEfficiencyPercent:150,
   compactedFurnaceFuseLongFromLongRecipePercent:33,
   compactedFurnaceMaxTemp:600
}
});

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

var industrial_craft = __config__.access("compability.industrial_craft") == true;
var furnaceRecipes = ATMech.furnaceRecipes
var furnaceFuel = ATMech.furnaceFuel

var ironTemp = 1600
var ironLong = 40

var goldTemp = 1000
var goldLong = 30

var copperTemp = 1000
var copperLong = 30

var tinTemp = 200
var tinLong = 10

var steelLong = 240
var steelTemp = 1600