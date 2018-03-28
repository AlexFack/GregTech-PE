Callback.addCallback("PostLoaded", function(){
	//Alloy
	GT_Recipe.AlloySmelterRecipe.add({slot1: {id: ItemID.dustCopper, count: 3}, slot2: {id: ItemID.dustTin, count: 1}, output: {id: ItemID.ingotBronze, data: 0, count: 4},adv: {time: GT_Material.RetArgFromID(ItemID.ingotBronze, "long") * 20, level: GT_Material.RetArgFromID(ItemID.ingotBronze, "lvl"), isShape: false}});
	GT_Recipe.AlloySmelterRecipe.add({slot1: {id: ItemID.ingotCopper, count: 3}, slot2: {id: ItemID.ingotTin, count: 1}, output: {id: ItemID.ingotBronze, data: 0, count: 4},adv: {time: GT_Material.RetArgFromID(ItemID.ingotBronze, "long") * 20, level: GT_Material.RetArgFromID(ItemID.ingotBronze, "lvl"), isShape: false}});
	GT_Recipe.AlloySmelterRecipe.add({slot1: {id: ItemID.dustCopper, count: 3}, slot2: {id: ItemID.ingotTin, count: 1}, output: {id: ItemID.ingotBronze, data: 0, count: 4},adv: {time: GT_Material.RetArgFromID(ItemID.ingotBronze, "long") * 20, level: GT_Material.RetArgFromID(ItemID.ingotBronze, "lvl"), isShape: false}});
	GT_Recipe.AlloySmelterRecipe.add({slot1: {id: ItemID.ingotCopper, count: 3}, slot2: {id: ItemID.dustTin, count: 1}, output: {id: ItemID.ingotBronze, data: 0, count: 4},adv: {time: GT_Material.RetArgFromID(ItemID.ingotBronze, "long") * 20, level: GT_Material.RetArgFromID(ItemID.ingotBronze, "lvl"), isShape: false}});
    GT_Recipe.AlloySmelterRecipe.add({slot1: {id: ItemID.dustGlass, count: 1}, slot2: {id: ItemID.MoldBall, count: 1}, output: {id: ItemID.glasstube, data: 0, count: 1},adv: {time: 120, level: 1, isShape: true}});
	//extractor
	ICore.Recipe.registerRecipesFor("extractor", {
		"ItemID.latex": {id: ItemID.dustRubber, count: 3, data: 0, level: 1, time: 150},
		"BlockID.rubberTreeLog": {id: ItemID.dustRubber, count: 1, data: 0, level: 1, time: 150},
		289: {id: ItemID.dustSulfur, count: 1, data: 0, level: 1, time: 150},		
		37: {id: 351, count: 2, data: 11, level: 1, time: 150},
		38: {id: 351, count: 2, data: 1, level: 1, time: 150},
		"38:2": {id: 351, count: 2, data: 13, level: 1, time: 150},
		"38:3": {id: 351, count: 2, data: 7, level: 1, time: 150},
		"38:4": {id: 351, count: 2, data: 1, level: 1, time: 150},
		"38:5": {id: 351, count: 2, data: 14, level: 1, time: 150},
		"38:6": {id: 351, count: 2, data: 7, level: 1, time: 150},
		"38:7": {id: 351, count: 2, data: 9, level: 1, time: 150},
		"38:8": {id: 351, count: 2, data: 7, level: 1, time: 150},
		45: {id: 336, count: 4, data: 0, level: 1, time: 150},
		47: {id: 340, count: 3, data: 0, level: 1, time: 150},
		80: {id: 332, count: 4, data: 0, level: 1, time: 150},
		82: {id: 337, count: 4, data: 0, level: 1, time: 150},
		112: {id: 405, count: 4, data: 0, level: 1, time: 150},
		175: {id: 351, count: 3, data: 11, level: 1, time: 150},
		"175:1": {id: 351, count: 3, data: 13, level: 1, time: 150},
		"175:4": {id: 351, count: 3, data: 1, level: 1, time: 150},
		"175:5": {id: 351, count: 3, data: 9, level: 1, time: 150},
	}, true);
	
	
	//metalformer
	for(var p in GT_Material.plates){
		    for(var i in GT_Material.ingots){
			    var ingots = GT_Material.ingots[i];
			    var plates = GT_Material.plates[p];
			    if(plates.Material == ingots.Material){
		            ICore.Recipe.addRecipeFor("metalFormer0", ingots.id, {id: plates.id, count: 1});
		        }
		   }
    }
	
	//macerator
	for(var keys in GT_Recipe.MaceratorRecipe.recipe){
         var r = GT_Recipe.MaceratorRecipe.recipe[keys];      
            ICore.Recipe.addRecipeFor("macerator", r.recipe.id, {id: r.result.id, count: r.result.count, data: r.result.data, time: r.adv.long, lvl: r.adv.lvl});        
    }
	ICore.Recipe.addRecipeFor("macerator", 297, {id: ItemID.flour, count: 1, data: 0, time: 30, lvl: 1});
    ICore.Recipe.addRecipeFor("macerator", "351:3", {id: ItemID.dustCocoa, count: 1, data: 0, time: 30, lvl: 1}); 
    ICore.Recipe.addRecipeFor("macerator", 17, {id: ItemID.dustWood, count: 6, data: 0, time: GT_Material.RetArgFromID(ItemID.dustWood, "long") * 10, lvl: GT_Material.RetArgFromID(ItemID.dustWood, "lvl")});
    ICore.Recipe.addRecipeFor("macerator", "17:1", {id: ItemID.dustWood, count: 6, data: 0, time: GT_Material.RetArgFromID(ItemID.dustWood, "long") * 10, lvl: GT_Material.RetArgFromID(ItemID.dustWood, "lvl")});
    ICore.Recipe.addRecipeFor("macerator", "17:2", {id: ItemID.dustWood, count: 6, data: 0, time: GT_Material.RetArgFromID(ItemID.dustWood, "long") * 10, lvl: GT_Material.RetArgFromID(ItemID.dustWood, "lvl")});
    ICore.Recipe.addRecipeFor("macerator", "17:3", {id: ItemID.dustWood, count: 6, data: 0, time: GT_Material.RetArgFromID(ItemID.dustWood, "long") * 10, lvl: GT_Material.RetArgFromID(ItemID.dustWood, "lvl")});		
	
	//forgehammer
	ICore.Recipe.registerRecipesFor("forgehammer", {}, true);
	for(var keys in GT_Recipe.ForgeHammerRecipe.recipe){
         var r = GT_Recipe.ForgeHammerRecipe.recipe[keys];      
            ICore.Recipe.addRecipeFor("forgehammer", r.recipe.id, {id: r.result.id, count: r.result.count, data: r.result.data, time: r.adv.long, lvl: r.adv.lvl});        
    }
	ICore.Recipe.addRecipeFor("forgehammer", 20, {id: ItemID.dustGlass, count: 1, data: 0, time: 30, lvl: 2});   
    ICore.Recipe.addRecipeFor("forgehammer", 138, {id: ItemID.dustGlass, count: 5, data: 0, time: 30, lvl: 2});    	
	//compressor
	for(var keys in GT_Recipe.CompressorRecipe.recipe){
         var r = GT_Recipe.CompressorRecipe.recipe[keys];      
            ICore.Recipe.addRecipeFor("compressor", r.recipe.id, {id: r.result.id, count: r.result.count, data: r.result.data, time: r.adv.long, lvl: r.adv.lvl, ingredientCount: r.recipe.count});        
    }
	//blastfurnace
	GT_Recipe.BlastFurnaceRecipe.add({id: ItemID.ingotSteel, data: 0, count: 1}, {id: 265, data: 0, count: 1}, {long: 7200, lvl: 2});
	ICore.Recipe.registerRecipesFor("blastfurnace", {}, true);
	for(var keys in GT_Recipe.BlastFurnaceRecipe.recipe){
         var r = GT_Recipe.BlastFurnaceRecipe.recipe[keys];      
            ICore.Recipe.addRecipeFor("blastfurnace", r.recipe.id, {id: r.result.id, count: r.result.count, data: r.result.data, time: r.adv.long, lvl: r.adv.lvl});        
    }
}); 