Translation.addTranslation("Small Bronze Fluid Pipe", {ru: "Малая бронзовая жидкостная труба",  zh: "小铜液管"});

IDRegistry.genBlockID("SmallBronzeFluidPipe");
Block.createBlock("SmallBronzeFluidPipe", [
	{name: "Small Bronze Fluid Pipe", texture: [["PIPE_Bronze", 0]], inCreative: true}
]);

GT_Pipe.setupFluidPipeRender(BlockID.SmallBronzeFluidPipe, ST, 3/8, "gt-fuel");


Translation.addTranslation("Bronze Fluid Pipe", {ru: "Бронзовая жидкостная труба",  zh: "青铜液管"});

IDRegistry.genBlockID("BronzeFluidPipe");
Block.createBlock("BronzeFluidPipe", [
	{name: "Bronze Fluid Pipe", texture: [["PIPE_Bronze", 0]], inCreative: true}
]);

GT_Pipe.setupFluidPipeRender(BlockID.BronzeFluidPipe, ST, 4/8, "gt-fuel");

Translation.addTranslation("Large Bronze Fluid Pipe", {ru: "Большая бронзовая жидкостная труба",  zh: "青铜液管"});

IDRegistry.genBlockID("LargeBronzeFluidPipe");
Block.createBlock("LargeBronzeFluidPipe", [
	{name: "Large Bronze Fluid Pipe", texture: [["PIPE_Bronze", 0]], inCreative: true}
]);

GT_Pipe.setupFluidPipeRender(BlockID.LargeBronzeFluidPipe, ST, 5/8, "gt-fuel");

//STEEL
Translation.addTranslation("Small Steel Fluid Pipe", {ru: "Малая стальная жидкостная труба",  zh: "小钢液管"});

IDRegistry.genBlockID("SmallSteelFluidPipe");
Block.createBlock("SmallSteelFluidPipe", [
	{name: "Small Steel Fluid Pipe", texture: [["PIPE_Steel", 0]], inCreative: true}
]);

GT_Pipe.setupFluidPipeRender(BlockID.SmallSteelFluidPipe, ST, 3/8, "gt-fuel");

Translation.addTranslation("Steel Fluid Pipe", {ru: "Стальная жидкостная труба",  zh: "钢液管"});

IDRegistry.genBlockID("SteelFluidPipe");
Block.createBlock("SteelFluidPipe", [
	{name: "Steel Fluid Pipe", texture: [["PIPE_Steel", 0]], inCreative: true}
]);

GT_Pipe.setupFluidPipeRender(BlockID.SteelFluidPipe, ST, 4/8, "gt-fuel");

Translation.addTranslation("Large Steel Fluid Pipe", {ru: "Большая стальная жидкостная труба",  zh: "大钢液管"});

IDRegistry.genBlockID("LargeSteelFluidPipe");
Block.createBlock("LargeSteelFluidPipe", [
	{name: "Large Steel Fluid Pipe", texture: [["PIPE_Steel", 0]], inCreative: true}
]);

GT_Pipe.setupFluidPipeRender(BlockID.LargeSteelFluidPipe, ST, 5/8, "gt-fuel");

Callback.addCallback("PostLoaded", function(){
	GT_Recipe.CreateRecipeWithTool({id: BlockID.SmallBronzeFluidPipe, count:6, data:0}, ["#w#","# #","#h#"], ['#', ItemID.plateBronze, 0], [GT_Material.hammers, GT_Material.wrenchs], 2);
	GT_Recipe.CreateRecipeWithTool({id: BlockID.BronzeFluidPipe, count:2, data:0}, ["###","w h","###"], ['#', ItemID.plateBronze, 0], [GT_Material.hammers, GT_Material.wrenchs], 2);
	GT_Recipe.CreateRecipeWithTool({id: BlockID.LargeBronzeFluidPipe, count:1, data:0}, ["#h#","# #","#w#"], ['#', ItemID.plateBronze, 0], [GT_Material.hammers, GT_Material.wrenchs], 2);
	
	GT_Recipe.CreateRecipeWithTool({id: BlockID.SmallSteelFluidPipe, count:6, data:0}, ["#w#","# #","#h#"], ['#', ItemID.plateSteel, 0], [GT_Material.hammers, GT_Material.wrenchs], 2);
	GT_Recipe.CreateRecipeWithTool({id: BlockID.SteelFluidPipe, count:2, data:0}, ["###","w h","###"], ['#', ItemID.plateSteel, 0], [GT_Material.hammers, GT_Material.wrenchs], 2);
	GT_Recipe.CreateRecipeWithTool({id: BlockID.LargeSteelFluidPipe, count:1, data:0}, ["#h#","# #","#w#"], ['#', ItemID.plateSteel, 0], [GT_Material.hammers, GT_Material.wrenchs], 2);
});



//COPPER
Translation.addTranslation("1x Copper Wire", {ru: "1х Медный провод",  zh: "1铜线"});

IDRegistry.genBlockID("OneCopperWire");
Block.createBlock("OneCopperWire", [
	{name: "1x Copper Wire", texture: [["COPPER_WIRE", 0]], inCreative: true}
]);

GT_Wire.setupWireRender(BlockID.OneCopperWire, EU, 1/8, "ic-wire");

Translation.addTranslation("2x Copper Wire", {ru: "2х Медный провод",  zh: "2铜线"});

IDRegistry.genBlockID("TwoCopperWire");
Block.createBlock("TwoCopperWire", [
	{name: "2x Copper Wire", texture: [["COPPER_WIRE", 0]], inCreative: true}
]);

GT_Wire.setupWireRender(BlockID.TwoCopperWire, EU, 2/8, "ic-wire");

Translation.addTranslation("4x Copper Wire", {ru: "4х Медный провод",  zh: "4铜线"});

IDRegistry.genBlockID("FourCopperWire");
Block.createBlock("FourCopperWire", [
	{name: "4x Copper Wire", texture: [["COPPER_WIRE", 0]], inCreative: true}
]);

GT_Wire.setupWireRender(BlockID.FourCopperWire, EU, 4/8, "ic-wire");


//REDALLOY
Translation.addTranslation("1x Red Alloy Wire", {ru: "1х Провод из красного сплава",  zh: "1红色的金丝"});

IDRegistry.genBlockID("OneRedAlloyWire");
Block.createBlock("OneRedAlloyWire", [
	{name: "1x Red Alloy Wire", texture: [["REDALLOY_WIRE", 0]], inCreative: true}
]);

GT_Wire.setupWireRender(BlockID.OneRedAlloyWire, EU, 1/8, "ic-wire");

Translation.addTranslation("1x Red Alloy Cable", {ru: "1х Кабель из красного сплава",  zh: "1红合金电缆"});

IDRegistry.genBlockID("OneRedAlloyCable");
Block.createBlock("OneRedAlloyCable", [
	{name: "1x Red Alloy Cable", texture: [["REDALLOY_CABLE", 0]], inCreative: true}
]);

GT_Wire.setupWireRender(BlockID.OneRedAlloyCable, EU, 2/8, "ic-wire");


//TIN

Translation.addTranslation("1x Tin Wire", {ru: "1х Оловянный провод",  zh: "1锡丝"});

IDRegistry.genBlockID("OneTinWire");
Block.createBlock("OneTinWire", [
	{name: "1x Tin Wire", texture: [["TIN_WIRE", 0]], inCreative: true}
]);

GT_Wire.setupWireRender(BlockID.OneTinWire, EU, 1/8, "ic-wire");

Translation.addTranslation("1x Tin Cable", {ru: "1х Оловянный кабель",  zh: "1锡的电缆"});

IDRegistry.genBlockID("OneTinCable");
Block.createBlock("OneTinCable", [
	{name: "1x Tin Cable", texture: [["TIN_CABLE", 0]], inCreative: true}
]);

GT_Wire.setupWireRender(BlockID.OneTinCable, EU, 2/8, "ic-wire");


Callback.addCallback("PostLoaded", function(){
	Recipes.addShapeless({id: BlockID.OneRedAlloyCable, count: 1, data: 0}, [{id: BlockID.OneRedAlloyWire, data: 0}, {id: 339, data: 0}]); 
	Recipes.addShapeless({id: BlockID.OneTinCable, count: 1, data: 0}, [{id: BlockID.OneTinWire, data: 0}, {id: 171, data: 15}, {id: 287, data: 0}]); 
	Recipes.addShapeless({id: BlockID.TwoCopperWire, count: 1, data: 0}, [{id: BlockID.OneCopperWire, data: 0}, {id: BlockID.OneCopperWire, data: 0}]); 
	Recipes.addShapeless({id: BlockID.FourCopperWire, count: 1, data: 0}, [{id: BlockID.TwoCopperWire, data: 0}, {id: BlockID.TwoCopperWire, data: 0}]); 
	
	GT_Recipe.CreateShapelessRecipeWithTool({id: BlockID.OneCopperWire, count: 1, data: 0}, [{id: ItemID.plateCopper, data: 0}], GT_Material.cutters, 2);
	GT_Recipe.CreateShapelessRecipeWithTool({id: BlockID.OneTinWire, count: 1, data: 0}, [{id: ItemID.plateTin, data: 0}], GT_Material.cutters, 2);
    GT_Recipe.CreateShapelessRecipeWithTool({id: BlockID.OneRedAlloyWire, count: 1, data: 0}, [{id: ItemID.plateRedAlloy, data: 0}], GT_Material.cutters, 2);
});
