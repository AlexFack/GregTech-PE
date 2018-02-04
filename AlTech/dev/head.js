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

var industrial_craft = __config__.access("compability.industrial_craft") == true;
var furnaceRecipes = ATMech.furnaceRecipes
var furnaceFuel = ATMech.furnaceFuel

var round = function(num, x){
	var multiplier = Math.pow(10, x)
	return Math.floor(num * multiplier) / multiplier
}

var random = function(min, max){
	return Math.floor(Math.random() * (max - min + 1)) + min;
}