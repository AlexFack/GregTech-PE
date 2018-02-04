ATMech.FurnaceRecipe ({sS1:[265, 1, 0], rS1:[igst, 1, 0], long:240, temp:1600});

ATMech.FurnaceRecipe ({sS1:[ItemID.dustIron, 1, 0], rS1:[265, 1, 0], long:100, temp:1000});
ATMech.FurnaceRecipe ({sS1:[ItemID.dustGold, 1, 0], rS1:[266, 1, 0], long:30, temp:1000});

ATMech.Fuel({id:173, data:0, second: 135, f:1});
ATMech.Fuel({id:263, data:0, second: 15, f:1});
ATMech.Fuel({id:263, data:1, second: 15, f:1});
ATMech.Fuel({id:5, data:0, second: 7.5, f:1});
ATMech.Fuel({id:5, data:1, second: 7.5, f:1});
ATMech.Fuel({id:5, data:2, second: 7.5, f:1});
ATMech.Fuel({id:5, data:3, second: 7.5, f:1});
ATMech.Fuel({id:5, data:4, second: 7.5, f:1});
ATMech.Fuel({id:5, data:5, second: 7.5, f:1});



/*Recipes.ReplaceWithShaped = function(item, newRecipe, transcript, tool){
	Recipes.deleteRecipe(item);
	Recipes.addShaped(item, newRecipe, transcript, tool);
}

Callback.addCallback("PostLoaded", function(){
var hummers = ATMat.hummers
var mortars = ATMat.mortars
var tungstensteels = ATMat.tungstensteels

for(var key in hummers){
//replaced recipes

Recipes.ReplaceWithShaped({id:306, count:1, data:0}, [
"ppp",
"ptp",
"   "
], ['p', irpl, 0, 't', hummers[key], -1], CTR.Tool );

Recipes.ReplaceWithShaped ({id:307, count:1, data:0}, [
"ptp",
"ppp",
"ppp"
], ['p', irpl, 0, 't', hummers[key], -1], CTR.Tool )

Recipes.ReplaceWithShaped ({id:308, count:1, data:0}, [
"ppp",
"ptp",
"p p"
], ['p', irpl, 0, 't', hummers[key], -1], CTR.Tool )

Recipes.ReplaceWithShaped ({id:309, count:1, data:0}, [
"ptp",
"p p",
"   "
], ['p', irpl, 0, 't', hummers[key], -1], CTR.Tool);

Recipes.ReplaceWithShaped({id:314, count:1, data:0}, [
"ppp",
"ptp",
"   "
], ['p', gpl, 0, 't', hummers[key], -1], CTR.Tool );

Recipes.ReplaceWithShaped ({id:315, count:1, data:0}, [
"ptp",
"ppp",
"ppp"
], ['p', gpl, 0, 't', hummers[key], -1], CTR.Tool )

Recipes.ReplaceWithShaped ({id:316, count:1, data:0}, [
"ppp",
"ptp",
"p p"
], ['p', gpl, 0, 't', hummers[key], -1], CTR.Tool )

Recipes.ReplaceWithShaped ({id:317, count:1, data:0}, [
"ptp",
"p p",
"   "
], ['p', gpl, 0, 't', hummers[key], -1], CTR.Tool );

Recipes.ReplaceWithShaped({id: ItemID.bronzeHelmet, count: 1, data: 0}, [
	"xxx",
	"xtx"
], ['x', ItemID.plateBronze, 0, 't', hummers[key], -1], CTR.Tool);

Recipes.ReplaceWithShaped({id: ItemID.bronzeChestplate, count: 1, data: 0}, [
	"xtx",
	"xxx",
	"xxx"
], ['x', ItemID.plateBronze, 0, 't', hummers[key], -1], CTR.Tool);

Recipes.ReplaceWithShaped({id: ItemID.bronzeLeggings, count: 1, data: 0}, [
	"xxx",
	"xtx",
	"x x"
], ['x', ItemID.plateBronze, 0, 't', hummers[key], -1],CTR.Tool );

Recipes.ReplaceWithShaped({id: ItemID.bronzeBoots, count: 1, data: 0}, [
	"xtx",
	"x x"
], ['x', ItemID.plateBronze, 0, 't', hummers[key], -1], CTR.Tool);


Recipes.addShaped({id:4, count:1, data:0}, [
	"t ",
	"bb",
	"bb"
], ['b', litst, 0, 't', hummers[key], -1], CTR.Tool); 

Recipes.addShaped({id:c, count:1, data:0}, [
	"t ",
	"bb",
	"bb"
], ['b', 1, 0, 't', hummers[key], -1], CTR.Tool); 

Recipes.addShaped({id:BlockID.compactedfurnace, count:1, data:0}, [
	" t ",
	"bfb",
	"ggg"
], ['b', c, 0, 'f', 61, 0, 'g', 82, 0, 't', hummers[key], -1], CTR.Tool); 

Recipes.addShaped({id:ItemID.stonepickaxe, count:1, data:0}, [
	"bbb",
	"pst",
	" s "
], ['b', litst, 0, 's', 280, 0, 'p', 287, 0, 't', hummers[key], -1], CTR.Tool); 

Recipes.addShaped({id:ItemID.stonesword, count:1, data:0}, [
	"bt",
	"bp",
	"s "
], ['b', litst, 0, 's', 280, 0, 'p', 287, 0, 't', hummers[key], -1], CTR.Tool); 

Recipes.addShaped({id:ItemID.stoneaxe, count:1, data:0}, [
	"bbt",
	"bsp",
	" s "
], ['b', litst, 0, 's', 280, 0, 'p', 287, 0, 't', hummers[key], -1], CTR.Tool); 

Recipes.addShaped({id:ItemID.stoneshovel, count:1, data:0}, [
	"pbt",
	" s ",
	" s "
], ['b', litst, 0, 's', 280, 0, 'p', 287, 0, 't', hummers[key], -1], CTR.Tool); 

Recipes.addShaped({id:ItemID.stonehoe, count:1, data:0}, [
	"pbt",
	" s ",
	" s "
], ['b', litst, 0, 's', 280, 0, 'p', 287, 0, 't', hummers[key], -1], CTR.Tool); 

Recipes.addShaped({id:b, count:1, data:0}, [
	"pmp",
	"btb",
	"pmp"
], ['p', brpl, 0, 'b', brbolt, 0, 'm', brmod, 0, 't', hummers[key], -1], CTR.Tool); 


for(var key1 in tungstensteels){
Recipes.ReplaceWithShaped ({id:267, count:1, data:0}, [
"ph",
"pt",
"s "
], ['p', irpl, 0, 'i', 265, 0, 's', 280, 0, 't', tungstensteels[key1], -1, 'h', hummers[key], -1], CTR.Tool );

Recipes.ReplaceWithShaped ({id:257, count:1, data:0}, [
"pii",
"tsh",
" s "
], ['p', irpl, 0, 'i', 265, 0, 's', 280, 0, 't', tungstensteels[key1], -1, 'h', hummers[key], -1], CTR.Tool );

Recipes.ReplaceWithShaped ({id:258, count:1, data:0}, [
"pih",
"ps ",
"ts "
], ['p', irpl, 0, 'i', 265, 0, 's', 280, 0, 't', tungstensteels[key1], -1, 'h', hummers[key], -1], CTR.Tool );

Recipes.ReplaceWithShaped ({id:292, count:1, data:0}, [
"pih",
"ts ",
" s "
], ['p', irpl, 0, 'i', 265, 0, 's', 280, 0, 't', tungstensteels[key1], -1, 'h', hummers[key], -1], CTR.Tool );

Recipes.ReplaceWithShaped ({id:285, count:1, data:0}, [
"pii",
"tsh",
" s "
], ['p', gpl, 0, 'i', 266, 0, 's', 280, 0, 't', tungstensteels[key1], -1, 'h', hummers[key], -1], CTR.Tool );

Recipes.ReplaceWithShaped ({id:286, count:1, data:0}, [
"pih",
"ps ",
"ts "
], ['p', gpl, 0, 'i', 266, 0, 's', 280, 0, 't', tungstensteels[key1], -1, 'h', hummers[key], -1], CTR.Tool );

Recipes.ReplaceWithShaped ({id:294, count:1, data:0}, [
"pih",
"ts ",
" s "
], ['p', gpl, 0, 'i', 266, 0, 's', 280, 0, 't', tungstensteels[key1], -1, 'h', hummers[key], -1], CTR.Tool );

if(industrial_craft){
Recipes.ReplaceWithShaped ({id:ItemID.bronzePickaxe, count:1, data:0}, [
"pii",
"tsh",
" s "
], ['p', ItemID.plateBronze, 0, 'i', ItemID.ingotBronze, 0, 's', 280, 0, 't', tungstensteels[key1], -1, 'h', hummers[key], -1], CTR.Tool );

Recipes.ReplaceWithShaped ({id:ItemID.bronzeAxe, count:1, data:0}, [
"pih",
"ps ",
"ts "
], ['p', ItemID.plateBronze, 0, 'i', ItemID.ingotBronze, 0, 's', 280, 0, 't', tungstensteels[key1], -1, 'h', hummers[key], -1], CTR.Tool );

Recipes.ReplaceWithShaped ({id:ItemID.bronzeHoe, count:1, data:0}, [
"pih",
"ts ",
" s "
], ['p', ItemID.plateBronze, 0, 'i', ItemID.ingotBronze, 0, 's', 280, 0, 't', tungstensteels[key1], -1, 'h', hummers[key], -1], CTR.Tool );
}
}
}
for(var key1 in tungstensteels){
Recipes.ReplaceWithShaped ({id:256, count:1, data:0}, [
"pt",
"s ",
"s "
], ['p', irpl, 0, 'i', 265, 0, 's', 280, 0, 't', tungstensteels[key1], -1, 'h'], CTR.Tool );

Recipes.ReplaceWithShaped ({id:283, count:1, data:0}, [
"p ",
"pt",
"s "
], ['p', gpl, 0, 'i', 266, 0, 's', 280, 0, 't', tungstensteels[key1], -1], CTR.Tool );

Recipes.ReplaceWithShaped ({id:284, count:1, data:0}, [
"pt",
"s ",
"s "
], ['p', gpl, 0, 'i', 266, 0, 's', 280, 0, 't', tungstensteels[key1], -1, 'h'], CTR.Tool );

Recipes.ReplaceWithShaped ({id:ItemID.bronzeSword, count:1, data:0}, [
"p ",
"pt",
"s "
], ['p', ItemID.plateBronze, 0, 'i', ItemID.ingotBronze, 0, 's', 280, 0, 't', tungstensteels[key1], -1], CTR.Tool );

Recipes.ReplaceWithShaped ({id:ItemID.bronzeShovel, count:1, data:0}, [
"pt",
"s ",
"s "
], ['p', ItemID.plateBronze, 0, 'i', ItemID.ingotBronze, 0, 's', 280, 0, 't', tungstensteels[key1], -1], CTR.Tool );
}
})



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

//recipes
Recipes.addShapeless({id:287, count:4, data:0}, [{id:35, data:-1}]); 

Recipes.ReplaceWithShaped({id:61, count:1, data:0}, [
"bbb",
"b b",
"bbb"
], ['b', litst, 0]);

Recipes.addShaped({id:BlockID.blastfurnace, count:1, data:0}, [
	"bmb",
	"mfm",
	"bmb"
], ['b', brbolt, 0, 'm', brmod, 0, 'f', BlockID.compactedfurnace, 0], CTR.Tool); 


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


Recipes.addShaped({id:irhum, count:1, data:0}, [
	"ii ",
	"iss",
	"ii "
], ['i', 265, 0, 's', 280, 0]); 


//configs
Callback.addCallback("PostLoaded", function(){
if(industrial_craft){
Recipes.removeFurnaceRecipe(265, ItemID.ingotSteel, 0);
Recipes.removeFurnaceRecipe(ItemID.dustBronze, ItemID.ingotBronze, 0);
}
});*/
