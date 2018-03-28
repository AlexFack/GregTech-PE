ModAPI.addAPICallback("ForestryAPI", function(api){
	Callback.addCallback("PostLoaded", function(){
	//Recipes.deleteRecipe({id: ItemID.bronzePickaxe, count:1, data:0})
	//Recipes.deleteRecipe({id: ItemID.bronzeShovel, count:1, data:0})
	
	Recipes.deleteRecipe({id: ItemID.canEmpty, count: 12, data: 0});
	Recipes.deleteRecipe({id: ItemID.waxCapsuleEmpty, count: 4, data: 0});
	Recipes.deleteRecipe({id: ItemID.refractoryEmpty, count: 4, data: 0});
	
	GT_Recipe.ReplaceRecipeWithTool({id: ItemID.sturdyMachine, count:1, data:0},['aaa', 'aha', 'aaa'], ['a', ItemID.plateBronze, 0], [GT_Material.hammers], 2);
	
	GT_Recipe.CreateRecipeWithTool({id: ItemID.canEmpty, count: 4, data: 0}, [" x ","xhx"," x "], ['x', ItemID.plateTin, 0], [GT_Material.hammers], 2);
    
    Recipes.addShaped({id: ItemID.waxCapsuleEmpty, count: 1, data: 0}, [" x ","xax"," x "], ['x', ItemID.beeswax, 0, 'a', ItemID.canEmpty, 0]);
    
	Recipes.addShaped({id: ItemID.refractoryEmpty, count: 1, data: 0}, [" x ","xax"," x "], ['x', ItemID.refractoryWax, 0, 'a', ItemID.canEmpty, 0]);
    
	});
	Callback.addCallback("PreLoaded", function(){
		BlockID.oreCopper = 1;
		BlockID.oreTin = 1;
		BlockID.oreApatite = 1;
		Translation.addTranslation("Apatite Ore", {ru: "Апатитовая руда",  zh: "磷灰石矿"});
	    GT_Material.OreRegister("Apatite", [["apatite", 3],  ["Lapis", 1], ["Saphire", 0]], ["Stone"], true);
	    GT_Worldgen.RegisterLargeOreDepositeOnEarth([BlockID.oreApatiteStone, BlockID.oreApatiteStone, BlockID.oreLapisStone, BlockID.oreLapisStone, BlockID.oreApatiteStone, BlockID.oreApatiteStone, BlockID.oreApatiteStone, BlockID.oreApatiteStone], 80, tileTemplate, 32, 48, {x:40, y:8, z:40}, 20, 1);
	});
});