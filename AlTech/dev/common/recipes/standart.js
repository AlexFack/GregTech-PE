Callback.addCallback("PostLoaded", function(){
	
	Recipes.addFurnaceFuel(ItemID.Lignite, 0, 1000);

   //stainless dust
   //Recipes.addShaped({id: ItemID.dustStainless, count: 1, data: 0}, ["iin", "inn", "ssc"], ['i', ItemID.dustSmallIron, 0, 'n', ItemID.dustSmallNikel, 0, 's', ItemID.dustSmallManganese, 0, 'c', ItemID.dustSmallChrome, 0]);
   //Recipes.addShaped({id: ItemID.dustStainless, count: 9, data: 0}, ["iin", "inn", "ssc"], ['i', ItemID.dustIron, 0, 'n', ItemID.dustNikel, 0, 's', ItemID.dustManganese, 0, 'c', ItemID.dustChrome, 0]);

   //steel dust
   Recipes.addShapeless({id:ItemID.dustSteel, count:1, data:0}, [{id:ItemID.dustIron, data:0}, {id:ItemID.dustCoal, data:0}]);

   //bronze dust
   GT_Recipe.ReplaceWithShapeless({id:ItemID.dustBronze, count:1, data:0}, [{id:ItemID.dustSmallCopper, data:0}, {id:ItemID.dustSmallCopper, data:0}, {id:ItemID.dustSmallCopper, data:0}, {id:ItemID.dustSmallTin, data:0}]);
   GT_Recipe.ReplaceWithShapeless({id:ItemID.dustBronze, count:4, data:0}, [{id:ItemID.dustCopper, data:0}, {id:ItemID.dustCopper, data:0}, {id:ItemID.dustCopper, data:0}, {id:ItemID.dustTin, data:0}]);
 
   //cobblestone
   GT_Recipe.CreateRecipeWithTool({id:4, count:1, data:0}, ["h ", "bb", "bb"], ['b', 1, 0], [GT_Material.hammers], 1); 


   //replaced recipes

   CreateHelmetRecipe(ItemID.compositeHelmet, "Alloy", 2)
   CreateChestplateRecipe(ItemID.compositeChestplate, "Alloy", 2)
   CreateLeggingsRecipe(ItemID.compositeLeggings, "Alloy", 2)
   CreateBootsRecipe(ItemID.compositeBoots, "Alloy", 2)

   CreateHelmetRecipe(ItemID.bronzeHelmet, "Bronze", 2)
   CreateChestplateRecipe(ItemID.bronzeChestplate, "Bronze", 2)
   CreateLeggingsRecipe(ItemID.bronzeLeggings, "Bronze", 2)
   CreateBootsRecipe(ItemID.bronzeBoots, "Bronze", 2)

   CreatePickaxeRecipe(ItemID.bronzePickaxe, "Bronze", 2)
   CreateAxeRecipe(ItemID.bronzeAxe, "Bronze", 2)
   CreateHoeRecipe(ItemID.bronzeHoe, "Bronze", 2)
   CreateSwordRecipe(ItemID.bronzeSword, "Bronze", 2)
   CreateShovelRecipe(ItemID.bronzeShovel, "Bronze", 2)

   CreateHelmetRecipe(306, "Iron", 2)
   CreateChestplateRecipe(307, "Iron", 2)
   CreateLeggingsRecipe(308, "Iron", 2)
   CreateBootsRecipe(309, "Iron", 2)

   CreatePickaxeRecipe(257, "Iron", 2)
   CreateAxeRecipe(258, "Iron", 2)
   CreateHoeRecipe(292, "Iron", 2)
   CreateSwordRecipe(267, "Iron", 2)
   CreateShovelRecipe(256, "Iron", 2)

   CreateHelmetRecipe(314, "Gold", 2)
   CreateChestplateRecipe(315, "Gold", 2)
   CreateLeggingsRecipe(316, "Gold", 2)
   CreateBootsRecipe(317, "Gold", 2)

   CreatePickaxeRecipe(285, "Gold", 2)
   CreateAxeRecipe(286, "Gold", 2)
   CreateHoeRecipe(294, "Gold", 2)
   CreateSwordRecipe(283, "Gold", 2)
   CreateShovelRecipe(284, "Gold", 2)

   GT_Recipe.ReplaceRecipeWithTool({id:325, count:1, data:0}, ["aha"," a "], ['a', ItemID.plateIron, 0], [GT_Material.hammers], 2); 
   GT_Recipe.ReplaceRecipeWithTool({id:359, count:1, data:0}, ["ah"," a"], ['a', ItemID.plateIron, 0], [GT_Material.hammers], 2); 
   
   GT_Recipe.ReplaceRecipeWithTool({id: 66, data: 0, count: 16}, ["isi", "ihi", "isi"], ['i', ItemID.long_rodIron, 0, 's', 280, 0], [GT_Material.hammers], 2);
   //GT_Recipe.ReplaceRecipeWithTool({id: 126, data: 0, count: 6}, ["wlw", "grg", "sch"], ['w', ItemID.cableGold, 0, 'g', ItemID.long_rodGold, 0, 'r', 280, 0], [GT_Material.solderings, GT_Material.screwdrivers, GT_Material.hammers], 2);
   GT_Recipe.ReplaceWithShaped({id: 259, count:1, data: 0}, ["n ", " c"], ['n', ItemID.nuggetSteel, 0, 'c', 318, 0]);
   GT_Recipe.ReplaceWithShaped({id: 259, count:1, data: 0}, ["n ", " c"], ['n', ItemID.nuggetIron, 0, 'c', 318, 0]);
   GT_Recipe.ReplaceWithShaped({id: 259, count:1, data: 0}, ["n ", " c"], ['n', ItemID.nuggetTin, 0, 'c', 318, 0]);
   GT_Recipe.ReplaceRecipeWithTool({id: 328, count: 1, data: 0}, ["php", "ppp"], ['p', ItemID.plateIron, 0], [GT_Material.hammers], 2);
   GT_Recipe.ReplaceRecipeWithTool({id: 330, count: 1, data: 0}, ["ppw", "pp ", "pp "], ['p', ItemID.plateIron, 0], [GT_Material.wrenchs], 2);
   GT_Recipe.ReplaceWithShaped({id: 345, count:1, data: 0}, [" p ", "prp", " p "], ['p', ItemID.plateIron, 0, 'r', 331, 0]);
   GT_Recipe.ReplaceWithShaped({id: 347, count:1, data: 0}, [" p ", "prp", " p "], ['p', ItemID.plateGold, 0, 'r', 331, 0]);
   GT_Recipe.ReplaceRecipeWithTool({id: 410, count: 1, data: 0}, ["php", "pcp", " p "], ['p', ItemID.plateIron, 0, 'c', 54, 0], [GT_Material.hammers], 2);
   GT_Recipe.ReplaceShapelessRecipeWithTool({id: 377, count:1, data:0}, [{id: 369, data:0}], GT_Material.mortars, 1);
   GT_Recipe.ReplaceRecipeWithTool({id: 380, count: 1, data: 0}, ["p p", "php", "ppp"], ['p', ItemID.plateIron, 0, 'c', 54, 0], [GT_Material.hammers], 2);

   //industrial
   GT_Recipe.ReplaceRecipeWithTool({id: BlockID.machineBlockBasic, count: 1, data: 0}, ["xxx", "xhx", "xxx"], ['x', ItemID.plateSteel, 0], [GT_Material.hammers], 2);
	
   GT_Recipe.ReplaceWithShaped({id: ItemID.ingotAlloy, count: 1, data: 0}, ["sss", "bbb", "ttt"], ['s', ItemID.ingotStainless, 0, 'b', ItemID.ingotBronze, 0, 't', ItemID.ingotTin, 0]);
	
	GT_Recipe.ReplaceRecipeWithTool({id:ItemID.circuitBasic, count:1, data:0}, ["clc", "cpc", "crc"], ['c', ItemID.cableCopper, 0, 'p', ItemID.plateSilver, 0, 'r', 331, 0], [GT_Material.solderings], 2);
	
	GT_Recipe.ReplaceRecipeWithTool({id:ItemID.circuitAdvanced, count:1, data:0}, ["ala", "aca", "apa"], ['a', ItemID.cableGold, 0, 'p', ItemID.plateLapis, 0, 'c', ItemID.circuitBasic, 0], [GT_Material.solderings], 2);

   //deleted recipes
   Recipes.deleteRecipe({id:272, count:1, data:0});
   Recipes.deleteRecipe({id:273, count:1, data:0});
   Recipes.deleteRecipe({id:274, count:1, data:0});
   Recipes.deleteRecipe({id:275, count:1, data:0});
   Recipes.deleteRecipe({id:291, count:1, data:0});

   Recipes.deleteRecipe({id:268, count:1, data:0});
   Recipes.deleteRecipe({id:269, count:1, data:0});
   Recipes.deleteRecipe({id:270, count:1, data:0});
   Recipes.deleteRecipe({id:270, count:1, data:0});
   Recipes.deleteRecipe({id:271, count:1, data:0});
   Recipes.deleteRecipe({id:290, count:1, data:0});

   Recipes.deleteRecipe({id:266, count:1, data:0});


   Recipes.deleteRecipe({id:ItemID.plateGold, count:1, data:0});
   Recipes.deleteRecipe({id:ItemID.craftingHammer, count:1, data:0});
   Recipes.deleteRecipe({id:ItemID.craftingCutter, count:1, data:0});
   Recipes.deleteRecipe({id:ItemID.wrench, count:1, data:0});

   Recipes.deleteRecipe({id:BlockID.blockCopper, count:1, data:0});
   Recipes.deleteRecipe({id:ItemID.ingotCopper, count:9, data:0});

   Recipes.deleteRecipe({id:BlockID.blockLead, count:1, data:0});
   Recipes.deleteRecipe({id:ItemID.ingotLead, count:9, data:0});

   Recipes.deleteRecipe({id:BlockID.blockSteel, count:1, data:0});
   Recipes.deleteRecipe({id:ItemID.ingotSteel, count:9, data:0});

   Recipes.deleteRecipe({id:BlockID.blockBronze, count:1, data:0});
   Recipes.deleteRecipe({id:ItemID.ingotBronze, count:9, data:0});

   Recipes.deleteRecipe({id:BlockID.blockTin, count:1, data:0});
   Recipes.deleteRecipe({id:ItemID.ingotTin, count:9, data:0});

   Recipes.removeFurnaceRecipe(265, -1);
   Recipes.removeFurnaceRecipe(ItemID.dustBronze, -1)
   Recipes.removeFurnaceRecipe(ItemID.dustCopper, -1);
   Recipes.removeFurnaceRecipe(ItemID.dustIron, -1);
   Recipes.removeFurnaceRecipe(ItemID.dustGold, -1);
   Recipes.removeFurnaceRecipe(ItemID.dustSilver, -1);
   Recipes.removeFurnaceRecipe(ItemID.latex, -1);

   //wool
   Recipes.addShapeless({id:287, count:4, data:0}, [{id:35, data:-1}]); 
   //wood
   
   Recipes.addShaped({id: ItemID.woodpickaxe, count: 1, data:0}, ["aaa"," p ", " p "], ['a', 5, -1, 'p', 280, 0]); 
   Recipes.addShaped({id: ItemID.woodsword, count: 1, data:0}, [" a "," a ", " p "], ['a', 5, -1, 'p', 280, 0]); 
   Recipes.addShaped({id: ItemID.woodaxe, count: 1, data:0}, ["aa ","ap ", " p "], ['a', 5, -1, 'p', 280, 0]);
   Recipes.addShaped({id: ItemID.woodshovel, count: 1, data:0}, [" a "," p ", " p "], ['a', 5, -1, 'p', 280, 0]);
   Recipes.addShaped({id: ItemID.woodhoe, count: 1, data:0}, ["aa "," p ", " p "], ['a', 5, -1, 'p', 280, 0]);
   //stone
   Recipes.addShaped({id: ItemID.stonepickaxe, count: 1, data:0}, ["aaa"," p ", " p "], ['a', 4, 0, 'p', 280, 0]); 
   Recipes.addShaped({id: ItemID.stonesword, count: 1, data:0}, [" a "," a ", " p "], ['a', 4, 0, 'p', 280, 0]); 
   Recipes.addShaped({id: ItemID.stoneaxe, count: 1, data:0}, ["aa ","ap ", " p "], ['a', 4, 0, 'p', 280, 0]);
   Recipes.addShaped({id: ItemID.stoneshovel, count: 1, data:0}, [" a "," p ", " p "], ['a', 4, 0, 'p', 280, 0]);
   Recipes.addShaped({id: ItemID.stonehoe, count: 1, data:0}, ["aa "," p ", " p "], ['a', 4, 0, 'p', 280, 0]);

   //torch
  // Recipes.addShaped({id:50, count:4, data:0}, ["a","b"], ['a', ItemID.Lignite, 0, 'b', 280, 0]); 



   GT_Recipe.CreateRecipeWithTool({id:ItemID.flintpickaxe, count:1, data:0}, ["bbb","psh"," s "], ['b', 318, 0, 's', 280, 0, 'p', 287, 0], [GT_Material.hammers], 1);

   GT_Recipe.CreateRecipeWithTool({id:ItemID.flintsword, count:1, data:0}, ["bh","bp","s "], ['b', 318, 0, 's', 280, 0, 'p', 287, 0], [GT_Material.hammers], 1);

   GT_Recipe.CreateRecipeWithTool({id:ItemID.flintaxe, count:1, data:0}, ["bbh","bsp"," s "], ['b', 318, 0, 's', 280, 0, 'p', 287, 0], [GT_Material.hammers], 1);

   GT_Recipe.CreateRecipeWithTool({id:ItemID.flintshovel, count:1, data:0}, ["pbh"," s "," s "], ['b', 318, 0, 's', 280, 0, 'p', 287, 0], [GT_Material.hammers], 1); 

   GT_Recipe.CreateRecipeWithTool({id:ItemID.flinthoe, count:1, data:0}, ["pbh"," s "," s "], ['b', 318, 0, 's', 280, 0, 'p', 287, 0], [GT_Material.hammers], 1);

   //shapes
    GT_Recipe.CreateRecipeWithTool({id: ItemID.EmptyShapePlate, count:1, data:0}, ["hf","##","##"], ['#', ItemID.plateSteel, 0], [GT_Material.hammers, GT_Material.files], 2);
	GT_Recipe.CreateRecipeWithTool({id: ItemID.MoldCylinder, count:1, data:0}, ["  #","   ","  h"], ['#', ItemID.EmptyShapePlate, 0], [GT_Material.hammers], 2);
	GT_Recipe.CreateRecipeWithTool({id: ItemID.MoldAnvil, count:1, data:0}, ["  #","   "," h "], ['#', ItemID.EmptyShapePlate, 0], [GT_Material.hammers], 2);
	GT_Recipe.CreateRecipeWithTool({id: ItemID.MoldPlate, count:1, data:0}, [" h "," # ","   "], ['#', ItemID.EmptyShapePlate, 0], [GT_Material.hammers], 2);
	GT_Recipe.CreateRecipeWithTool({id: ItemID.MoldIngot, count:1, data:0}, ["   "," # "," h "], ['#', ItemID.EmptyShapePlate, 0], [GT_Material.hammers], 2);
	GT_Recipe.CreateRecipeWithTool({id: ItemID.MoldNuggets, count:1, data:0}, ["#  h","   ","   "], ['#', ItemID.EmptyShapePlate, 0], [GT_Material.hammers], 2);
	GT_Recipe.CreateRecipeWithTool({id: ItemID.MoldBlock, count:1, data:0}, ["   ","h# ","   "], ['#', ItemID.EmptyShapePlate, 0], [GT_Material.hammers], 2);
	GT_Recipe.CreateRecipeWithTool({id: ItemID.MoldBall, count:1, data:0}, ["   "," # ","h  "], ['#', ItemID.EmptyShapePlate, 0], [GT_Material.hammers], 2);
	
	//casing
	GT_Recipe.ReplaceRecipeWithTool({id: ItemID.casingCopper, count:1, data:0}, ["h #", "", ""], ['#', ItemID.plateCopper, 0], [GT_Material.hammers], 2);
	GT_Recipe.ReplaceRecipeWithTool({id: ItemID.casingTin, count:1, data:0}, ["h #", "", ""], ['#', ItemID.plateTin, 0], [GT_Material.hammers], 2);
	GT_Recipe.ReplaceRecipeWithTool({id: ItemID.casingBronze, count:1, data:0}, ["h #", "", ""], ['#', ItemID.plateBronze, 0], [GT_Material.hammers], 2);
	GT_Recipe.ReplaceRecipeWithTool({id: ItemID.casingIron, count:1, data:0}, ["h #", "", ""], ['#', ItemID.plateIron, 0], [GT_Material.hammers], 2);
	GT_Recipe.ReplaceRecipeWithTool({id: ItemID.casingSteel, count:1, data:0}, ["h #", "", ""], ['#', ItemID.plateSteel, 0], [GT_Material.hammers], 2);
	GT_Recipe.ReplaceRecipeWithTool({id: ItemID.casingGold, count:1, data:0}, ["h #", "", ""], ['#', ItemID.plateGold, 0], [GT_Material.hammers], 2);
	GT_Recipe.ReplaceRecipeWithTool({id: ItemID.casingLead, count:1, data:0}, ["h #", "", ""], ['#', ItemID.plateLead, 0], [GT_Material.hammers], 2);

     //new blocks
     Recipes.addFurnace(BlockID.redcobblestone, BlockID.redstone, 0);
     Recipes.addFurnace(BlockID.blackcobblestone, BlockID.blackstone, 0);
      
	 //components
	 Recipes.addShaped({id: ItemID.resistor, count: 3, data: 0}, [" p ","cdc"," p "], ['c', BlockID.OneCopperWire, 0, 'p', 339, 0, 'd', ItemID.dustCoal, 0]);	
	 Recipes.addShaped({id: ItemID.vacuumtube, count: 1, data: 0}, ["ptp","ccc"], ['c', BlockID.OneCopperWire, 0, 'p', 339, 0, 't', ItemID.glasstube, 0]);	
	 Recipes.addShaped({id: ItemID.coatedcircuitboard, count: 3, data: 0}, [" p ","ccc"," p "], ['c', ItemID.plateWood, 0, 'p', ItemID.latex, 0]);	
	 GT_Recipe.ReplaceWithShaped({id: ItemID.circuitBasic, count: 1, data: 0}, ["rcr","vbv","aaa"], ['r', ItemID.resistor, 0, 'c', ItemID.casingSteel, 0, 'v', ItemID.vacuumtube, 0, 'b', ItemID.coatedcircuitboard, 0, 'a', BlockID.OneRedAlloyCable, 0]);		 	
	 Recipes.addShaped({id: BlockID.LVMachineHull, count: 1, data: 0}, ["wsw","pcp"], ['c', BlockID.LVMachineCasing, 0, 'p', BlockID.OneTinCable, 0, 's', ItemID.plateSteel, 0, 'w', ItemID.plateWroughtIron, 0]);		
	 Recipes.addShaped({id: ItemID.electricmotorLV, count: 1, data: 0}, ["tcs","cmc","sct"], ['t', BlockID.OneTinCable, 0, 'c', BlockID.OneCopperWire, 0, 's', ItemID.rodIron, 0, 'm', ItemID.magneticRodIron, 0]);	
	 Recipes.addShaped({id: ItemID.electricmotorLV, count: 1, data: 0}, ["tcs","cmc","sct"], ['t', BlockID.OneTinCable, 0, 'c', BlockID.OneCopperWire, 0, 's', ItemID.rodWroughtIron, 0, 'm', ItemID.magneticRodIron, 0]);
	 Recipes.addShaped({id: ItemID.electricpistonLV, count: 1, data: 0}, ["ppp","crr","ceg"], ['p', ItemID.plateSteel, 0, 'c', BlockID.OneTinCable, 0, 'r', ItemID.rodSteel, 0, 'e', ItemID.electricmotorLV, 0, 'g', ItemID.gearSmallSteel, 0]);
	 GT_Recipe.CreateRecipeWithTool({id: ItemID.electricpumpLV, count:1, data:0}, ["#$z","spw","ze*"], ['#', ItemID.screwTin, 0, '$', ItemID.rotorTin, 0, 'z', ItemID.ringRubber, 0, 'p', BlockID.BronzeFluidPipe, 0, 'e', ItemID.electricmotorLV, 0, '*', BlockID.OneTinCable, 0], [GT_Material.screwdrivers, GT_Material.wrenchs], 2);
     
	 //food
	 Recipes.addFurnace(ItemID.doughBread, 297, 0);
	 Recipes.addFurnace(ItemID.doughCookie, 297, 0);
	 GT_Recipe.CreateRecipeWithTool({id:ItemID.flour, count:1, data:0}, ["m#","",""], ['#', 296, 0], [GT_Material.mortars], 1);
	 GT_Recipe.CreateRecipeWithTool({id:ItemID.dough, count:1, data:0}, ["w#","",""], ['#', ItemID.flour, 0], [GT_Material.liquid], 1);
	 Recipes.addShaped({id: ItemID.doughBread, count: 1, data:0}, ["aa","", ""], ['a', ItemID.dough, 0]); 
	 Recipes.addShaped({id: ItemID.doughCookie, count: 2, data:0}, ["ac","", ""], ['a', ItemID.dough, 0, 'c', ItemID.dustCocoa, 0]); 
	 
});