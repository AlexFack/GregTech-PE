ATMech.FurnaceRecipe ({sS1:[ItemID.ingotIron, 1, 0], sS2:[ItemID.dustCoal, 1, 0], rS1:[igst, 1, 0], long:steelLong, temp:steelTemp});
ATMech.FurnaceRecipe ({sS1:[1, 1, 1], rS1:[ItemID.nuggetCopper, 2, 0], rS2:[ItemID.littleStone, 4, 0], long:copperLong*2, temp:copperTemp});
ATMech.FurnaceRecipe ({sS1:[1, 1, 3], rS1:[ItemID.nuggetTin, 1, 0], rS2:[ItemID.littleStone, 4, 0], long:tinLong*2, temp:tinTemp});
ATMech.FurnaceRecipe ({sS1:[1, 1, 5], rS1:[ItemID.nuggetIron, 1, 0], rS2:[ItemID.littleStone, 4, 0], long:ironLong*2, temp:ironTemp});

ATMech.Fuel({id:173, data:0, second: 135, f:1});
ATMech.Fuel({id:263, data:0, second: 15, f:1});
ATMech.Fuel({id:263, data:1, second: 15, f:1});
ATMech.Fuel({id:ItemID.dustCoal, data:0, second:30, f:1});
ATMech.Fuel({id:5, data:0, second: 7.5, f:1});
ATMech.Fuel({id:5, data:1, second: 7.5, f:1});
ATMech.Fuel({id:5, data:2, second: 7.5, f:1});
ATMech.Fuel({id:5, data:3, second: 7.5, f:1});
ATMech.Fuel({id:5, data:4, second: 7.5, f:1});
ATMech.Fuel({id:5, data:5, second: 7.5, f:1});

Recipes.addFurnaceFuel(ItemID.dustCoal, 0, 3200);

Recipes.ReplaceWithShaped = function(item, newRecipe, transcript, tool){
	Recipes.deleteRecipe(item)
	Recipes.addShaped(item, newRecipe, transcript, tool);
}

Recipes.ReplaceWithShapeless = function(item, newRecipe, transcript, tool){
	Recipes.deleteRecipe(item);
	Recipes.addShapeless(item, newRecipe, transcript, tool);
}

//coal dust 
CreateShapelessRecipeWithTool({id:ItemID.dustCoal, count:1, data:0}, [{id:ItemID.coal, data:0}], mortars)

//steel dust
Recipes.addShapeless({id:ItemID.dustSteel, count:1, data:0}, [{id:ItemID.dustIron, data:0}, {id:ItemID.dustCoal, data:0}])

//bronze dust
Recipes.ReplaceWithShapeless({id:ItemID.dustBronze, count:4, data:0}, [{id:ItemID.dustCopper, data:0}, {id:ItemID.dustCopper, data:0}, {id:ItemID.dustCopper, data:0}, {id:ItemID.dustTin, data:0}])
 
 //cobblestone
CreateRecipeWithTool({id:4, count:1, data:0}, [
	"h ",
	"bb",
	"bb"
], ['b', litst, 0], [hammers]); 

//little stones
CreateShapelessRecipeWithTool({id:litst, count:4, data:0}, [{id:4, data:0}], hammers)

//replaced recipes
Callback.addCallback("PostLoaded", function(){

ReplaceRecipeWithTool({id:306, count:1, data:0}, [
"ppp",
"php"
], ['p', irpl, 0], [hammers]);

ReplaceRecipeWithTool ({id:307, count:1, data:0}, [
"php",
"ppp",
"ppp"
], ['p', irpl, 0], [hammers])

ReplaceRecipeWithTool ({id:308, count:1, data:0}, [
"ppp",
"php",
"p p"
], ['p', irpl, 0], [hammers])

ReplaceRecipeWithTool ({id:309, count:1, data:0}, [
"php",
"p p"
], ['p', irpl, 0], [hammers]);

ReplaceRecipeWithTool({id:314, count:1, data:0}, [
"ppp",
"php"
], ['p', gpl, 0], [hammers] );

ReplaceRecipeWithTool ({id:315, count:1, data:0}, [
"php",
"ppp",
"ppp"
], ['p', gpl, 0], [hammers] )

ReplaceRecipeWithTool ({id:316, count:1, data:0}, [
"ppp",
"php",
"p p"
], ['p', gpl, 0], [hammers] )

ReplaceRecipeWithTool ({id:317, count:1, data:0}, [
"php",
"p p"
], ['p', gpl, 0], [hammers] )

ReplaceRecipeWithTool ({id:267, count:1, data:0}, [
"ph",
"pf",
"s "
], ['p', irpl, 0, 'i', 265, 0, 's', 280, 0], [hammers, files]);

ReplaceRecipeWithTool ({id:257, count:1, data:0}, [
"pii",
"fsh",
" s "
], ['p', irpl, 0, 'i', 265, 0, 's', 280, 0], [hammers, files]);

ReplaceRecipeWithTool ({id:258, count:1, data:0}, [
"pih",
"ps ",
"fs "
], ['p', irpl, 0, 'i', 265, 0, 's', 280, 0], [hammers, files]);

ReplaceRecipeWithTool ({id:292, count:1, data:0}, [
"pih",
"fs ",
" s "
], ['p', irpl, 0, 'i', 265, 0, 's', 280, 0], [hammers, files]);

ReplaceRecipeWithTool ({id:285, count:1, data:0}, [
"pii",
"fsh",
" s "
], ['p', gpl, 0, 'i', 266, 0, 's', 280, 0], [hammers, files]);

ReplaceRecipeWithTool ({id:286, count:1, data:0}, [
"pih",
"ps ",
"fs "
], ['p', gpl, 0, 'i', 266, 0, 's', 280, 0], [hammers, files]);

ReplaceRecipeWithTool ({id:294, count:1, data:0}, [
"pih",
"fs ",
" s "
], ['p', gpl, 0, 'i', 266, 0, 's', 280, 0], [hammers, files] );

if(industrial_craft){
ReplaceRecipeWithTool({id: ItemID.bronzeHelmet, count: 1, data: 0}, [
	"xxx",
	"xhx"
], ['x', ItemID.plateBronze, 0], [hammers]);

ReplaceRecipeWithTool({id: ItemID.bronzeChestplate, count: 1, data: 0}, [
	"xhx",
	"xxx",
	"xxx"
], ['x', ItemID.plateBronze, 0], [hammers]);

ReplaceRecipeWithTool({id: ItemID.bronzeLeggings, count: 1, data: 0}, [
	"xxx",
	"xhx",
	"x x"
], ['x', ItemID.plateBronze, 0], [hammers]);

ReplaceRecipeWithTool({id: ItemID.bronzeBoots, count: 1, data: 0}, [
	"xhx",
	"x x"
], ['x', ItemID.plateBronze, 0], [hammers]);

ReplaceRecipeWithTool ({id:ItemID.bronzePickaxe, count:1, data:0}, [
"pii",
"fsh",
" s "
], ['p', ItemID.plateBronze, 0, 'i', ItemID.ingotBronze, 0, 's', 280, 0], [hammers, files]);

ReplaceRecipeWithTool ({id:ItemID.bronzeAxe, count:1, data:0}, [
"pih",
"ps ",
"fs "
], ['p', ItemID.plateBronze, 0, 'i', ItemID.ingotBronze, 0, 's', 280, 0], [hammers, files]);

ReplaceRecipeWithTool ({id:ItemID.bronzeHoe, count:1, data:0}, [
"pih",
"fs ",
" s "
], ['p', ItemID.plateBronze, 0, 'i', ItemID.ingotBronze, 0, 's', 280, 0], [hammers, files]);

ReplaceRecipeWithTool ({id:ItemID.bronzeSword, count:1, data:0}, [
"ph",
"ptf",
"s "
], ['p', ItemID.plateBronze, 0, 'i', ItemID.ingotBronze, 0, 's', 280, 0], [hammers, files]);

ReplaceRecipeWithTool ({id:ItemID.bronzeShovel, count:1, data:0}, [
"pf",
"s ",
"s "
], ['p', ItemID.plateBronze, 0, 'i', ItemID.ingotBronze, 0, 's', 280, 0], [files]);
}

ReplaceRecipeWithTool ({id:256, count:1, data:0}, [
"pf",
"s ",
"s "
], ['p', irpl, 0, 'i', 265, 0, 's', 280, 0], [files]);

ReplaceRecipeWithTool ({id:283, count:1, data:0}, [
"p ",
"ph",
"s "
], ['p', gpl, 0, 'i', 266, 0, 's', 280, 0], [hammers]);

ReplaceRecipeWithTool ({id:284, count:1, data:0}, [
"pf",
"s ",
"s "
], ['p', gpl, 0, 'i', 266, 0, 's', 280, 0], [files]);

Recipes.ReplaceWithShaped({id:276, count:1, data:0}, [
	"a",
	"a",
	"b"
], ['a', ItemID.gemDiamond, 0, 'b', 280, 0])

Recipes.ReplaceWithShaped({id:277, count:1, data:0}, [
	"a",
	"b",
	"b"
], ['a', ItemID.gemDiamond, 0, 'b', 280, 0]); 

Recipes.ReplaceWithShaped({id:278, count:1, data:0}, [
	"aaa",
	" b ",
	" b "
], ['a', ItemID.gemDiamond, 0, 'b', 280, 0]); 

Recipes.ReplaceWithShaped({id:279, count:1, data:0}, [
	"aa",
	"ab",
	" b"
], ['a', ItemID.gemDiamond, 0, 'b', 280, 0]) 

Recipes.ReplaceWithShaped({id:293, count:1, data:0}, [
	"aa",
	" b",
	" b"
], ['a', ItemID.gemDiamond, 0, 'b', 280, 0]); 

Recipes.ReplaceWithShaped({id:310, count:1, data:0}, [
	"aaa",
	"a a"
], ['a', ItemID.gemDiamond, 0]); 

Recipes.ReplaceWithShaped({id:311, count:1, data:0}, [
	"a a",
	"aaa",
	"aaa"
], ['a', ItemID.gemDiamond, 0]); 

Recipes.ReplaceWithShaped({id:312, count:1, data:0}, [
	"aaa",
	"a a",
	"a a"
], ['a', ItemID.gemDiamond, 0]); 

Recipes.ReplaceWithShaped({id:313, count:1, data:0}, [
	"a a",
	"a a"
], ['a', ItemID.gemDiamond, 0]); 

})

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

Recipes.deleteRecipe({id:ItemID.plateGold, count:1, data:0})
Recipes.deleteRecipe({id:ItemID.craftingHammer, count:1, data:0});
Recipes.deleteRecipe({id:ItemID.craftingCutter, count:1, data:0});

//wool
Recipes.addShapeless({id:287, count:4, data:0}, [{id:35, data:-1}]); 

//planks
for(var i = 0; i<3; i++){
    Recipes.addShaped({id:17, count:1, data:i}, ["a a", "   ", "a a"], ['a', 5, i]); 
}
Recipes.addShaped({id:162, count:1, data:0}, ["a a", "   ", "a a"], ['a', 5, 4]); 
Recipes.addShaped({id:162, count:1, data:1}, ["a a", "   ", "a a"], ['a', 5, 5]); 

//torch
Recipes.addShaped({id:50, count:4, data:0}, [
	"a",
	"b"
], ['a', ItemID.dustCoal, 0, 'b', 280, 0]); 

//furnace
Recipes.ReplaceWithShaped({id:61, count:1, data:0}, [
"bbb",
"b b",
"bbb"
], ['b', litst, 0]);

//cobb furnace and blocks
CreateRecipeWithTool({id:BlockID.compactedfurnace, count:1, data:0}, [
	" h ",
	"bfb",
	"ggg"
], ['b', c, 0, 'f', 61, 0, 'g', 82, 0], [hammers]); 

CreateRecipeWithTool({id:c, count:1, data:0}, [
	"h ",
	"bb",
	"bb"
], ['b', 1, 0], [hammers]); 

//blast furnace and blocks
Recipes.addShaped({id:BlockID.blastfurnace, count:1, data:0}, [
	"bmb",
	"mfm",
	"bmb"
], ['b', brbolt, 0, 'm', brmod, 0, 'f', BlockID.compactedfurnace, 0]); 

CreateRecipeWithTool({id:b, count:1, data:0}, [
	"pmp",
	"bwb",
	"pmp"
], ['p', brpl, 0, 'b', brbolt, 0, 'm', brmod, 0], [wrenchs]); 

//tools
CreateRecipeWithTool({id:ItemID.stonepickaxe, count:1, data:0}, [
	"bbb",
	"psh",
	" s "
], ['b', litst, 0, 's', 280, 0, 'p', 287, 0], [hammers]); 

CreateRecipeWithTool({id:ItemID.stonesword, count:1, data:0}, [
	"bh",
	"bp",
	"s "
], ['b', litst, 0, 's', 280, 0, 'p', 287, 0], [hammers]); 

CreateRecipeWithTool({id:ItemID.stoneaxe, count:1, data:0}, [
	"bbh",
	"bsp",
	" s "
], ['b', litst, 0, 's', 280, 0, 'p', 287, 0], [hammers]); 

CreateRecipeWithTool({id:ItemID.stoneshovel, count:1, data:0}, [
	"pbh",
	" s ",
	" s "
], ['b', litst, 0, 's', 280, 0, 'p', 287, 0], [hammers]); 

CreateRecipeWithTool({id:ItemID.stonehoe, count:1, data:0}, [
	"pbt",
	" s ",
	" s "
], ['b', litst, 0, 's', 280, 0, 'p', 287, 0], [hammers]); 

Recipes.addShaped ({id:ItemID.woodpickaxe, count:1, data:0}, [
"www",
"ps ",
" s "
], ['w', 5, -1, 's', 280, 0, 'p', 287, 0]);

Recipes.addShaped({id:ItemID.woodsword, count:1, data:0}, [
	"b ",
	"bp",
	"s "
], ['b', 5, -1, 's', 280, 0, 'p', 287, 0]); 

Recipes.addShaped({id:ItemID.woodaxe, count:1, data:0}, [
	"bbt",
	"bsp",
	" s "
], ['b', 5, -1, 's', 280, 0, 'p', 287, 0]); 

Recipes.addShaped({id:ItemID.woodshovel, count:1, data:0}, [
	"pbt",
	" s ",
	" s "
], ['b', 5, -1, 's', 280, 0, 'p', 287, 0]); 

Recipes.addShaped({id:ItemID.woodhoe, count:1, data:0}, [
	"pbt",
	" s ",
	" s "
], ['b', 5, -1, 's', 280, 0, 'p', 287, 0]); 

//craft tools
Recipes.addShaped({id:ItemID.StoneHammer, count:1, data:0}, ["aa ", "aab", "aa"], ['a', litst, 0, 'b', 280, 0]);

CreateRecipeWithTool({id:ItemID.StoneMortar, count:1, data:0}, [" h ", "cac", " c "], ['a', litst, 0, 'c', 1, 0], [hammers])

Recipes.addShaped({id:ItemID.IronHammer, count:1, data:0}, [
	"ii ",
	"iis",
	"ii "
], ['i', 265, 0, 's', 280, 0]); 

CreateRecipeWithTool({id:ItemID.IronFile, count:1, data:0}, [
    "a ",
    "bh",
    "c "
    ], ['a', 265, 0, 'b', irpl, 0, 'c', 280, 0], [hammers])
    
CreateRecipeWithTool({id:ItemID.IronCutter, count:1, data:0}, [
    "a a",
    "fah",
    "b b"
    ], ['a', irpl, 0, 'b', 280, 0], [hammers, files])
    
CreateRecipeWithTool({id:ItemID.IronWrench, count:1, data:0}, ["aha", "aaa", " a "], ['a', ItemID.plateIron, 0], [hammers]);

CreateRecipeWithTool({id:ItemID.IronScrewdriver, count:1, data:0}, ["a ", "dh", "c "], ['a', ItemID.ingotIron, 0, 'c', 280, 0, 'd', ItemID.plateIron, 0], [hammers, files])
    
CreateRecipeWithTool({id:ItemID.IronMortar, count:1, data:0}, [" h ", "cac", " c "], ['a', 265, 0, 'c', 1, 0], [hammers]) 

//iron
CreateShapelessRecipeWithTool({id:ItemID.nuggetIron, count:9, data:0}, [{id:265, data:0}], hammers);
CreateShapelessRecipeWithTool({id:ItemID.boltIron, count:1, data:0}, [{id:ItemID.nuggetIron, data:0}], files)
ReplaceRecipeWithTool({id:ItemID.plateIron, count:1, data:0}, ["h", "a", "a"], ['a', 265, 0], [hammers])

ATMech.FurnaceRecipe ({sS1:[ItemID.dustIron, 1, 0], rS1:[265, 1, 0], long:ironLong, temp:ironTemp});
ATMech.FurnaceRecipe ({sS1:[ItemID.nuggetIron, 9, 0], rS1:[265, 1, 0], long:ironLong, temp:ironTemp});

//gold
ReplaceShapelessRecipeWithTool({id:ItemID.nuggetGold, count:9, data:0}, [{id:266, data:0}], hammers);
CreateRecipeWithTool({id:ItemID.plateGold, count:1, data:0}, ["h", "a", "a"], ['a', 266, 0], [hammers])

ATMech.FurnaceRecipe ({sS1:[ItemID.dustGold, 1, 0], rS1:[266, 1, 0], long:goldLong, temp:goldTemp});
ATMech.FurnaceRecipe ({sS1:[ItemID.nuggetGold, 9, 0], rS1:[266, 1, 0], long:goldLong, temp:goldTemp});
ATMech.FurnaceRecipe ({sS1:[ItemID.smallDustGold, 9, 0], rS1:[ItemID.nuggetGold, 1, 0], long:goldLong/9, temp:goldTemp});

//configs
Callback.addCallback("PostLoaded", function(){
if(industrial_craft){
Recipes.removeFurnaceRecipe(265, -1);
Recipes.removeFurnaceRecipe(ItemID.dustBronze, -1);
Recipes.removeFurnaceRecipe(ItemID.dustCopper, -1);
Recipes.removeFurnaceRecipe(ItemID.dustIron, -1);
Recipes.removeFurnaceRecipe(ItemID.dustGold, -1);
}
}); 