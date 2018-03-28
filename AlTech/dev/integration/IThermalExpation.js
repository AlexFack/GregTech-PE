ModAPI.addAPICallback("ThermalExpansionAPI", function(api){
	GT_Material.MaterialRegister("Mithril", {isDust:true, generateRecipes:true, isIngot:true, isPlate:true, isNugget:true}, {temp:2300, long:100, lvl:3});
	GT_Material.OreRegister("Mithril", [["Mithril", 2], ["Saphire", 0]], ["Stone"], true);
	GT_Worldgen.RegisterLargeOreDepositeOnEarth([BlockID.oreMithrilStone, BlockID.oreLapisStone], 30, tileTemplate, 10, 20, {x:24, y:6, z:24});
	
	Callback.addCallback("PostLoaded", function(){
	CreateSet("Copper", 1);
	CreateSet("Tin", 1);
	CreateSet("Silver", 2);
	CreateSet("Aluminium", 2);
	CreateSet("Lead", 1);
	CreateSet("Nikel", 1);
	CreateSet("Platinum", 3);
	CreateSet("Steel", 3);
	CreateSet("Electrum", 2);
	CreateSet("Invar", 2);
	CreateSet("Bronze", 2);
	CreateSet("Iridium", 1);
	CreateSet("Mithril", 1);
	
	Recipes.removeFurnaceRecipe(ItemID.dustBronze, 0);
    Recipes.removeFurnaceRecipe(ItemID.dustPlatinum, 0);
    Recipes.removeFurnaceRecipe(ItemID.dustInvar, 0);
    Recipes.removeFurnaceRecipe(ItemID.dustElectrum, 0);
    Recipes.removeFurnaceRecipe(ItemID.dustMithril, 0);
    Recipes.removeFurnaceRecipe(ItemID.dustSteel, 0);
	})
	
	Callback.addCallback("PreLoaded", function(){
	    DeleteOre(BlockID.oreLead);
	    DeleteOre(BlockID.oreSilver);
	    DeleteOre(BlockID.oreAluminium);
	    DeleteOre(BlockID.oreNikel);
	    DeleteOre(BlockID.orePlatinum);
	    DeleteOre(BlockID.oreCopper);
	    DeleteOre(BlockID.oreTin);
	    DeleteOre(BlockID.oreIridium);
	    DeleteOre(BlockID.oreMithril);
	})
})