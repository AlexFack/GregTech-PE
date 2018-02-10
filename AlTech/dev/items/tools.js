

CTR.RegisterHammer("Stone", 8, 2)
CTR.RegisterHammer("Iron", 256, 3)
CTR.RegisterHammer("Bronze", 128, 3)
//CTR.RegisterHammer("Gold", 32)
CTR.RegisterHammer("Steel", 512, 4)
CTR.RegisterHammer("Diamond", 1024, 4)

CTR.RegisterCutter("Iron", 256)
CTR.RegisterCutter("Bronze", 128)
//CTR.RegisterCutter("Gold", 32)
CTR.RegisterCutter("Steel", 512)

CTR.RegisterFile("Iron", 256)
CTR.RegisterFile("Bronze", 128)
//CTR.RegisterTungstensteel("Gold", 32)
CTR.RegisterFile("Steel", 512)

CTR.RegisterMortar("Stone", 8)
CTR.RegisterMortar("Iron", 256)
CTR.RegisterMortar("Bronze", 128)
//CTR.RegisterMortar("Gold", 32)
CTR.RegisterMortar("Steel", 512)

CTR.RegisterWrench("Iron", 256)
CTR.RegisterWrench("Bronze", 128)
//CTR.RegisterWrench("Gold", 32)
CTR.RegisterWrench("Steel", 512)
CTR.RegisterWrench("Lead", 128)
CTR.RegisterWrench("Silver", 128)

CTR.RegisterScrewdriver("Iron", 256)
CTR.RegisterScrewdriver("Bronze", 128)
//CTR.RegisterScrewdriver("Gold", 32)
CTR.RegisterScrewdriver("Steel", 512)
CTR.RegisterScrewdriver("Lead", 128)
CTR.RegisterScrewdriver("Silver", 128)
	
var hammers = ATMat.hammers
var files = ATMat.files
var mortars = ATMat.mortars
var cutters = ATMat.cutters
var wrenchs = ATMat.wrenchs
var screwdrivers = ATMat.screwdrivers
	
Callback.addCallback("PostLoaded", function(){
	var A = ATMat
	for(var key1 in A.gems){
		for(var key2 in A.hammers){
		    if(A.gems[key1].mat == A.hammers[key2].mat){
		        Recipes.addShaped({id:A.hammers[key2].id, count:1, data:0}, ["aa ", "aab", "aa"], ['a', A.gems[key1].id, 0, 'b', 280, 0]);
		    }
        }
    }
    for(var key1 in A.plates){
    	for(var key2 in A.cutters){
            	if(A.plates[key1].mat == A.cutters[key2].mat){
                    CreateRecipeWithTool({id:A.cutters[key2].id, count:1, data:0}, ["d d", "fdh", "c c"], ['c', 280, 0, 'd', A.plates[key1].id, 0], [hammers, files]);
                }
            }
        for(var key2 in A.wrenchs){
            	if(A.plates[key1].mat == A.wrenchs[key2].mat){
                    CreateRecipeWithTool({id:A.wrenchs[key2].id, count:1, data:0}, ["aha", "aaa", " a "], ['a', A.plates[key1].id, 0], [hammers]);
                }
            }
    }
    for(var key1 in A.ingots){
		for(var key2 in A.hammers){
			if(A.ingots[key1].mat == A.hammers[key2].mat){
			    Recipes.addShaped({id:A.hammers[key2].id, count:1, data:0}, ["aa ", "aab", "aa"], ['a', A.ingots[key1].id, 0, 'b', 280, 0]);
            }
        }
        for(var key2 in A.mortars){
        	if(A.ingots[key1].mat == A.mortars[key2].mat){
                CreateRecipeWithTool({id:A.mortars[key2].id, count:1, data:0}, [" h ", "cac", " c "], ['a', A.ingots[key1].id, 0, 'c', 1, 0], [hammers])
            }
        }
        for(var key2 in A.files){
        	if(A.ingots[key1].mat == A.files[key2].mat){
                CreateRecipeWithTool({id:A.files[key2].id, count:1, data:0}, ["a ", "ah", "b "], ['a', A.ingots[key1].id, 0, 'b', 280, 0], [hammers])
            }
        }
        for(var key3 in A.plates){
            for(var key2 in A.screwdrives){
            	if(A.ingots[key1].mat == A.screwdrives[key2].mat && A.plates[key3].mat == A.screwdrives[key2].mat){
            	    CreateRecipeWithTool({id:A.screwdrives[key2].id, count:1, data:0}, ["af", "dh", "c "], ['a', A.ingots[key1].id, 0, 'c', 280, 0, 'd', A.plates[key3].id, 0], [hammers, files])
                }
            }
        }
    }
})


//tools
IDRegistry.genItemID("stonepickaxe");
Item.createItem("stonepickaxe", "Каменная кирка", {name:"stone_pickaxe"}, {stack:1});

IDRegistry.genItemID("stonesword");
Item.createItem("stonesword", "Каменный меч", {name:"stone_sword"}, {stack:1});

IDRegistry.genItemID("stoneaxe");
Item.createItem("stoneaxe", "Каменный топор", {name:"stone_axe"}, {stack:1});

IDRegistry.genItemID("stoneshovel");
Item.createItem("stoneshovel", "Каменная лопата", {name:"stone_shovel"}, {stack:1});

IDRegistry.genItemID("stonehoe");
Item.createItem("stonehoe", "Каменная мотыга", {name:"stone_hoe"}, {stack:1});


IDRegistry.genItemID("woodpickaxe");
Item.createItem("woodpickaxe", "Деревянная кирка", {name:"wood_pickaxe"}, {stack:1});

IDRegistry.genItemID("woodsword");
Item.createItem("woodsword", "Деревянный меч", {name:"wood_sword"}, {stack:1});

IDRegistry.genItemID("woodaxe");
Item.createItem("woodaxe", "Деревянный топор", {name:"wood_axe"}, {stack:1});

IDRegistry.genItemID("woodshovel");
Item.createItem("woodshovel", "Деревянная лопата", {name:"wood_shovel"}, {stack:1});

IDRegistry.genItemID("woodhoe");
Item.createItem("woodhoe", "Деревянная мотыга", {name:"wood_hoe"}, {stack:1});

IDRegistry.genItemID("woodpickaxe");
Item.createItem("woodpickaxe", "Деревянная кирка", {name:"wood_pickaxe"}, {stack:1});

var cwood = {durability: 12, level: 1, efficiency:4, damage: 2, enchantability: 16};
var cstone = {durability: 38, level: 2, efficiency:5, damage: 2, enchantability: 16};

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