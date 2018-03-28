Translation.addTranslation("Brittle Charcoal", {ru: "Хрупкий древесный уголь",  zh: "脆木炭"});
IDRegistry.genBlockID("BrittleCharcoal");
Block.createBlock("BrittleCharcoal", [
	{name: "Brittle Charcoal", texture: [["coal_block", 0]], inCreative: true}
]);
ToolAPI.registerBlockMaterial(BlockID.BrittleCharcoal, "wood", 1, true);
Block.registerDropFunctionForID(BlockID.BrittleCharcoal, function(coords, blockID, blockData, level, enchant){
    if(level>0){
     var drop = [ ];
    drop.push([263, 1, 1]);
	if(Math.random()<1/2){	drop.push([263, 1, 1]);
}
return drop;
}
return [];
}, 1);

Translation.addTranslation("Bricked Bronze Hull", {ru: "Кирпичный бронзовый корпус",  zh: "砖砌的青铜船体"});
IDRegistry.genBlockID("BrikedBronzeHull");
Block.createBlock("BrikedBronzeHull", [
	{name: "Bricked Bronze Hull", texture: [["MACHINE_BRONZE", 0], ["MACHINE_BRONZE", 0], ["MACHINE_BRONZEBRICKS", 0]], inCreative: true}
]);

Callback.addCallback("PostLoaded", function(){
	GT_Recipe.CreateRecipeWithTool({id: BlockID.BrikedBronzeHull, count: 1, data: 0}, ["###","#h#", "$$$"], ['#', ItemID.plateBronze, 0, '$', 45, 0], [GT_Material.hammers]);
});

Translation.addTranslation("Bricked Steel Hull", {ru: "Кирпичный стальной корпус",  zh: "砖钢情况"});
IDRegistry.genBlockID("BrikedSteelHull");
Block.createBlock("BrikedSteelHull", [
	{name: "Bricked Steel Hull", texture: [["MACHINE_STEEL_TOP", 0], ["MACHINE_STEEL_TOP", 0], ["MACHINE_STEEL_SIDE", 0]], inCreative: true}
]);

Callback.addCallback("PostLoaded", function(){
	GT_Recipe.CreateRecipeWithTool({id: BlockID.BrikedSteelHull, count: 1, data: 0}, ["###","#h#", "$$$"], ['#', ItemID.plateSteel, 0, '$', 45, 0], [GT_Material.hammers]);
});


Translation.addTranslation("Bronze Hull", {ru: "Бронзовый корпус",  zh: "青铜船体"});

IDRegistry.genBlockID("BronzeHull");
Block.createBlock("BronzeHull", [
	{name: "Bronze Hull", texture: [["MACHINE_BRONZE", 0]], inCreative: true}
]);

Callback.addCallback("PostLoaded", function(){
	GT_Recipe.CreateRecipeWithTool({id: BlockID.BronzeHull, count: 1, data: 0}, ["###","#h#", "###"], ['#', ItemID.plateBronze, 0], [GT_Material.hammers]);
});

Translation.addTranslation("Steel Hull", {ru: "Стальной корпус",  zh: "钢情况"});

IDRegistry.genBlockID("SteelHull");
Block.createBlock("SteelHull", [
	{name: "Steel Hull", texture: [["MACHINE_STEEL_TOP", 0]], inCreative: true}
]);

Callback.addCallback("PostLoaded", function(){
	GT_Recipe.CreateRecipeWithTool({id: BlockID.SteelHull, count: 1, data: 0}, ["###","#h#", "###"], ['#', ItemID.plateSteel, 0], [GT_Material.hammers]);
});

Translation.addTranslation("Bronze Plated Bricks", {ru: "Кирпичи с бронзовым покрытием",  zh: "砖块铜牌完成"});

IDRegistry.genBlockID("BronzePlatedBricks");
Block.createBlock("BronzePlatedBricks", [
	{name: "Bronze Plated Bricks", texture: [["MACHINE_BRONZE_PLATEDBRICK", 0]], inCreative: true}
]);

Callback.addCallback("PostLoaded", function(){
	GT_Recipe.CreateRecipeWithTool({id: BlockID.BronzePlatedBricks, count: 1, data: 0}, ["#h#","#$#", "#w#"], ['#', ItemID.plateBronze, 0, "$", 45, 0], [GT_Material.hammers, GT_Material.wrenchs]);
});

Translation.addTranslation("Black granite", {ru: "Чёрный гранит",  zh: "黑色花岗岩"});
IDRegistry.genBlockID("blackstone");
Block.createBlock("blackstone", [
	{name: "Black granite", texture: [["black_stone", 0]], inCreative: true}
], "opaque" );
ToolAPI.registerBlockMaterial(BlockID.blackstone, "stone");
Block.setDestroyLevel(BlockID.blackstone, 4);
ToolAPI.registerBlockMaterial(BlockID.blackstone, "stone", 4, true);

Translation.addTranslation("Black cobblestone", {ru: "Чёрный булыжник",  zh: "黑色的鹅卵石"});
IDRegistry.genBlockID("blackcobblestone");
Block.createBlock("blackcobblestone", [
	{name: "Black cobblestone", texture: [["black_cobblestone", 0]], inCreative: true}
], "opaque" );
ToolAPI.registerBlockMaterial(BlockID.blackcobblestone, "stone");
Block.setDestroyLevel(BlockID.blackcobblestone, 4);
ToolAPI.registerBlockMaterial(BlockID.blackcobblestone, "stone", 4, true);

Translation.addTranslation("Red granite", {ru: "Красный гранит",  zh: "红花岗岩"});
IDRegistry.genBlockID("redstone");
Block.createBlock("redstone", [
	{name: "Red granite", texture: [["red_stone", 0]], inCreative: true}
], "opaque" );
ToolAPI.registerBlockMaterial(BlockID.redstone, "stone");
Block.setDestroyLevel(BlockID.redstone, 3);
ToolAPI.registerBlockMaterial(BlockID.redstone, "stone", 3, true);

Translation.addTranslation("Red cobblestone", {ru: "Красный булыжник",  zh: "红色卵石"});
IDRegistry.genBlockID("redcobblestone");
Block.createBlock("redcobblestone", [
	{name: "Red cobblestone", texture: [["red_cobblestone", 0]], inCreative: true}
], "opaque" );
ToolAPI.registerBlockMaterial(BlockID.redcobblestone, "stone");
Block.setDestroyLevel(BlockID.redcobblestone, 3);
ToolAPI.registerBlockMaterial(BlockID.redcobblestone, "stone", 3, true);