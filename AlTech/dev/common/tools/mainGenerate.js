GT_Tool.RegisterToolsSet("Iron", 256, 2, 3);
//GT_Tool.RegisterSoldering("Iron", 256, 2);

GT_Tool.RegisterToolsSet("Steel", 512, 3, 4);

GT_Tool.RegisterHammer("Diamond", 1024, 2, 4);
GT_Tool.RegisterHammer("Emerald", 1024, 2, 4);

GT_Tool.RegisterHammer("Bronze", 128, 2, 3);
GT_Tool.RegisterCutter("Bronze", 128, 2);
GT_Tool.RegisterFile("Bronze", 128, 2);
GT_Tool.RegisterMortar("Bronze", 128, 2);
GT_Tool.RegisterWrench("Bronze", 128, 2);
GT_Tool.RegisterSaw("Bronze", 128, 2);

GT_Tool.RegisterLiquid(325, 8);
GT_Tool.RegisterLiquid(ItemID.cellWater, 0);

Callback.addCallback("PostLoaded", function(){
	var A = GT_Material;
	var stick = 280;
	for(var key1 in A.gems){
		for(var key2 in A.hammers){
		    if(A.gems[key1].mat == A.hammers[key2].Material){
		        Recipes.addShaped({id:A.hammers[key2].id, count:1, data:0}, ["aa ", "aab", "aa"], ['a', A.gems[key1].id, 0, 'b', 280, 0]);
		    }
        }
    }
    stick = 280;
    for(var key1 in A.plates){
    	for(var key4 in A.rods){
    	    for(var key5 in A.solderings){
    	        for(var key6 in A.bolts){
    	            if(A.plates[key1].Material == A.solderings[key5].Material && A.rods[key4].Material == A.solderings[key5].Material && A.bolts[key6].Material == A.solderings[key5].Material){
    	                GT_Recipe.CreateRecipeWithTool({id:A.solderings[key5].id, count:1, data:0}, ["as ", "cab", " bb"], ['a', A.rods[key4].id, 0, 'b', A.plates[key1].id, 0, 'c', A.bolts[key6].id, 0], [GT_Material.screwdrivers], 2);
                    }
                }
            }
        }  
    	for(var key2 in A.cutters){
    	    for(var key3 in A.bolts){
              if(A.plates[key1].Material == A.cutters[key2].Material && A.bolts[key3].Material == A.cutters[key2].Material){             	
                    GT_Recipe.CreateRecipeWithTool({id:A.cutters[key2].id, count:1, data:0}, ["d d", "fdh", "cbc"], ['c', stick, 0, 'd', A.plates[key1].id, 0, 'b', A.bolts[key3].id, 0], [GT_Material.hammers, GT_Material.files], 2);
                }
            }
        }
        stick = 280;
        for(var key2 in A.knifes){
            if(A.plates[key1].Material == A.knifes[key2].Material){
            	for(var key3 in A.rods){
				    if(A.rods[key3].Material==A.knifes[key2].Material){
					    stick = A.rods[key3].id;
			        }
		        }
                GT_Recipe.CreateRecipeWithTool({id:A.knifes[key2].id, count:1, data:0}, ["h ", "af", "b "], ['a', A.plates[key1].id, 0, 'b', stick, 0], [GT_Material.hammers, GT_Material.files], 2);
            }
        }
        stick = 280;
        for(var key2 in A.saws){
            if(A.plates[key1].Material == A.saws[key2].Material){
            	for(var key3 in A.rods){
				    if(A.rods[key3].Material==A.saws[key2].Material){
					    stick = A.rods[key3].id;
			        }
		        }
                GT_Recipe.CreateRecipeWithTool({id:A.saws[key2].id, count:1, data:0}, ["bbb", "aab", "fh "], ['a', A.plates[key1].id, 0, 'b', 280, 0], [GT_Material.hammers, GT_Material.files], 2);
            }
        }
    }
    stick = 280;
    for(var key1 in A.ingots){
    	for(var key2 in A.wrenchs){
            if(A.ingots[key1].Material == A.wrenchs[key2].Material){
                GT_Recipe.CreateRecipeWithTool({id:A.wrenchs[key2].id, count:1, data:0}, ["aha", "aaa", " a "], ['a', A.ingots[key1].id, 0], [GT_Material.hammers], 2);
            }
        }
		for(var key2 in A.hammers){
			if(A.ingots[key1].Material == A.hammers[key2].Material){
			    Recipes.addShaped({id:A.hammers[key2].id, count:1, data:0}, ["aa ", "aab", "aa"], ['a', A.ingots[key1].id, 0, 'b', stick, 0]);
            }
        }
        for(var key2 in A.mortars){
        	if(A.ingots[key1].Material == A.mortars[key2].Material){
                Recipes.addShaped({id:A.mortars[key2].id, count:1, data:0}, [" a ", "cac", "ccc"], ['a', A.ingots[key1].id, 0, 'c', 1, 0]);
            }
        }
        stick = 280;
        for(var key2 in A.files){
        	if(A.ingots[key1].Material == A.files[key2].Material){
                GT_Recipe.CreateRecipeWithTool({id:A.files[key2].id, count:1, data:0}, ["a ", "ah", "b "], ['a', A.ingots[key1].id, 0, 'b', stick, 0], [GT_Material.hammers], 2);
            }
        }
    }
    stick = 280;
    for(var key3 in A.long_rods){
        for(var key2 in A.screwdrives){
        	if(A.long_rods[key3].Material == A.screwdrives[key2].Material){
        	    for(var key4 in A.rods){
		            if(A.rods[key4].Material==A.screwdrives[key2].Material){
		                stick = A.rods[key4].id;
			        }
                }
        	    GT_Recipe.CreateRecipeWithTool({id:A.screwdrives[key2].id, count:1, data:0}, [" fd", " dh", "c  "], ['c', stick, 0, 'd', A.long_rods[key3].id, 0], [GT_Material.hammers, GT_Material.files], 2);
            }
        }
    }
});

IDRegistry.genItemID("stonepickaxe");
Item.createItem("stonepickaxe", "Stone Pickaxe", {name:"stone_pickaxe"}, {stack:1});

IDRegistry.genItemID("stonesword");
Item.createItem("stonesword", "Stone Sword", {name:"stone_sword"}, {stack:1});

IDRegistry.genItemID("stoneaxe");
Item.createItem("stoneaxe", "Stone Axe", {name:"stone_axe"}, {stack:1});

IDRegistry.genItemID("stoneshovel");
Item.createItem("stoneshovel", "Stone Shovel", {name:"stone_shovel"}, {stack:1});

IDRegistry.genItemID("stonehoe");
Item.createItem("stonehoe", "Stone Hoe", {name:"stone_hoe"}, {stack:1});


IDRegistry.genItemID("flintpickaxe");
Item.createItem("flintpickaxe", "Flint Pickaxe", {name:"flint_pickaxe"}, {stack:1});

IDRegistry.genItemID("flintsword");
Item.createItem("flintsword", "Flint Sword", {name:"flint_sword"}, {stack:1});

IDRegistry.genItemID("flintaxe");
Item.createItem("flintaxe", "Flint Axe", {name:"flint_axe"}, {stack:1});

IDRegistry.genItemID("flintshovel");
Item.createItem("flintshovel", "Flint Shovel", {name:"flint_shovel"}, {stack:1});

IDRegistry.genItemID("flinthoe");
Item.createItem("flinthoe", "Flint Hoe", {name:"flint_hoe"}, {stack:1});


IDRegistry.genItemID("woodpickaxe");
Item.createItem("woodpickaxe", "Wood Pickaxe", {name:"wood_pickaxe"}, {stack:1});

IDRegistry.genItemID("woodsword");
Item.createItem("woodsword", "Wood Sword", {name:"wood_sword"}, {stack:1});

IDRegistry.genItemID("woodaxe");
Item.createItem("woodaxe", "Wood Axe", {name:"wood_axe"}, {stack:1});

IDRegistry.genItemID("woodshovel");
Item.createItem("woodshovel", "Wood Shovel", {name:"wood_shovel"}, {stack:1});

IDRegistry.genItemID("woodhoe");
Item.createItem("woodhoe", "Wood Hoe", {name:"wood_hoe"}, {stack:1});

var cwood = {durability: 12, level: 1, efficiency:3, damage: 2, enchantability: 16};
var cstone = {durability: 38, level: 2, efficiency:4, damage: 2, enchantability: 16};
var cflint = {durability: 114, level: 2, efficiency:4, damage: 2, enchantability: 16};

ToolAPI.setTool(ItemID.stonepickaxe, cstone, ToolType.pickaxe);
ToolAPI.setTool(ItemID.stonesword, cstone, ToolType.sword);
ToolAPI.setTool(ItemID.stoneaxe, cstone, ToolType.axe);
ToolAPI.setTool(ItemID.stoneshovel, cstone, ToolType.shovel);
ToolAPI.setTool(ItemID.stonehoe, cstone, ToolType.hoe);

ToolAPI.setTool(ItemID.woodpickaxe, cwood, ToolType.pickaxe);
ToolAPI.setTool(ItemID.woodsword, cwood, ToolType.sword);
ToolAPI.setTool(ItemID.woodaxe, cwood, ToolType.axe);
ToolAPI.setTool(ItemID.woodshovel, cwood, ToolType.shovel);
ToolAPI.setTool(ItemID.woodhoe, cwood, ToolType.hoe);

ToolAPI.setTool(ItemID.flintpickaxe, cflint, ToolType.pickaxe);
ToolAPI.setTool(ItemID.flintsword, cflint, ToolType.sword);
ToolAPI.setTool(ItemID.flintaxe, cflint, ToolType.axe);
ToolAPI.setTool(ItemID.flintshovel, cflint, ToolType.shovel);
ToolAPI.setTool(ItemID.flinthoe, cflint, ToolType.hoe);