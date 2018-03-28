Translation.addTranslation("High Pressure Coal Boiler", {ru: "Угольный бойлер высокого давления",  zh: "高壓煤鍋爐"});
IDRegistry.genBlockID("HighPressureCoalBoiler");
Block.createBlockWithRotation("HighPressureCoalBoiler", [
{name: "High Pressure Coal Boiler", texture: [["MACHINE_BRONZEBRICKS_BOTTOM", 0], ["MACHINE_STEEL_TOP", 0], ["MACHINE_STEEL_SIDE", 0], ["MACHINE_HIGHPRESSURECOALBOILER_FRONT", 0], ["MACHINE_STEEL_SIDE", 0], ["MACHINE_STEEL_SIDE", 0]], inCreative: true}
]);
Block.registerDropFunction("HighPressureCoalBoiler", function(){
	return [[BlockID.HighPressureCoalBoiler, 1, 0]];
});

Callback.addCallback("PostLoaded", function(){
	Recipes.addShaped({id: BlockID.HighPressureCoalBoiler, count: 1, data: 0}, ["###","# #", "$f$"], ['#', ItemID.plateSteel, 0, '$', 45, 0, 'f', 61, 0]);
});

Translation.addTranslation("High Pressure Lava Boiler", {ru: "Лавовый бойлер высокого давления",  zh: "熔岩高压锅炉"});
IDRegistry.genBlockID("HighPressureLavaBoiler");
Block.createBlockWithRotation("HighPressureLavaBoiler", [
{name: "High Pressure Lava Boiler", texture: [["MACHINE_BRONZEBRICKS_BOTTOM", 0], ["MACHINE_STEEL_TOP", 0], ["MACHINE_STEEL_SIDE", 0], ["MACHINE_HIGHPRESSURELAVABOILER_FRONT", 0], ["MACHINE_STEEL_SIDE", 0], ["MACHINE_STEEL_SIDE", 0],], inCreative: true}
]);
Block.registerDropFunction("HighPressureLavaBoiler", function(){
	return [[BlockID.HighPressureLavaBoiler, 1, 0]];
});

Callback.addCallback("PostLoaded", function(){
	Recipes.addShaped({id: BlockID.HighPressureLavaBoiler, count: 1, data: 0}, ["###","$$$", "#f#"], ['#', ItemID.plateSteel, 0, '$', 20, 0, 'f', BlockID.BrikedSteelHull, 0]);
});

Translation.addTranslation("Simple Solar Boiler", {ru: "Простой солнечный бойлер",  zh: "简单的太阳能锅炉"});
IDRegistry.genBlockID("SimpleSolarBoiler");
Block.createBlockWithRotation("SimpleSolarBoiler", [
{name: "Simple Solar Boiler", texture: [["MACHINE_BRONZEBRICKS_BOTTOM", 0], ["MACHINE_BRONZE_SOLAR", 0], ["MACHINE_BRONZEBRICKS", 0], ["MACHINE_BRONZEBRICKS", 0], ["MACHINE_BRONZEBRICKS", 0], ["MACHINE_BRONZEBRICKS", 0],], inCreative: true}
]);
Block.registerDropFunction("SimpleSolarBoiler", function(){
	return [[BlockID.SimpleSolarBoiler, 1, 0]];
});

Callback.addCallback("PostLoaded", function(){
	Recipes.addShaped({id: BlockID.SimpleSolarBoiler, count: 1, data: 0}, ["###","$$$", "&0&"], ['#', 20, 0, '$', ItemID.plateSilver, 0, '&', BlockID.SmallBronzeFluidPipe, 0, '0', BlockID.BrikedBronzeHull, 0]);
});

Translation.addTranslation("Small Coal Boiler", {ru: "Маленький угольный бойлер",  zh: "小型燃煤锅炉"});
IDRegistry.genBlockID("SmallBoiler");
Block.createBlockWithRotation("SmallBoiler", [
{name: "Small Coal Boiler", texture: [["MACHINE_BRONZEBRICKS_BOTTOM", 0], ["MACHINE_BRONZE", 0], ["MACHINE_STEAM_EXIT", 0], ["MACHINE_SMALLBOILER_FRONT", 0], ["MACHINE_BRONZEBRICKS", 0], ["MACHINE_BRONZEBRICKS", 0]], inCreative: true}
]);
Block.registerDropFunction("SmallBoiler", function(){
	return [[BlockID.SmallBoiler, 1, 0]];
});

Callback.addCallback("PostLoaded", function(){
	Recipes.addShaped({id: BlockID.SmallBoiler, count: 1, data: 0}, ["###","# #", "$&$"], ['#', ItemID.plateBronze, 0, '$', 45, 0, '&', 61, 0]);
});


Translation.addTranslation("Steam Alloy Smelter", {ru: "Паровая плавильня",  zh: "蒸汽铸造"});
IDRegistry.genBlockID("SteamAlloySmelter");
Block.createBlockWithRotation("SteamAlloySmelter", [
{name: "Steam Alloy Smelter", texture: [["MACHINE_BRONZEBRICKS_BOTTOM", 0], ["MACHINE_BRONZE", 0], ["MACHINE_BRONZEBRICKS", 0], ["MACHINE_BRONZE_ALLOYSMELTER", 0], ["MACHINE_BRONZEBRICKS", 0], ["MACHINE_BRONZEBRICKS", 0]], inCreative: true}
]);

Callback.addCallback("PostLoaded", function(){
	Recipes.addShaped({id: BlockID.SteamAlloySmelter, count: 1, data: 0}, ["###","$&$", "###"], ['#', BlockID.SmallBronzeFluidPipe, 0, '$', 61, 0, '&', BlockID.BrikedBronzeHull, 0]);
});

Translation.addTranslation("High Pressure Alloy Smelter", {ru: "Плавильня высокого давления",  zh: "高压铸造"});
IDRegistry.genBlockID("HighPressureAlloySmelter");
Block.createBlockWithRotation("HighPressureAlloySmelter", [
{name: "High Pressure Alloy Smelter", texture: [["MACHINE_STEEL_TOP", 0], ["MACHINE_STEEL_TOP", 0], ["MACHINE_STEEL_SIDE", 0], ["MACHINE_HIGHPRESSUREALLOYSMELTER", 0], ["MACHINE_STEEL_SIDE", 0], ["MACHINE_STEEL_SIDE", 0]], inCreative: true}
]);
Block.registerDropFunction("HighPressureAlloySmelter", function(){
	return [[BlockID.HighPressureAlloySmelter, 1, 0]];
});

Callback.addCallback("PostLoaded", function(){
	Recipes.addShaped({id: BlockID.HighPressureAlloySmelter, count: 1, data: 0}, ["###","$&$", "###"], ['#', BlockID.SmallSteelFluidPipe, 0, '$', 61, 0, '&', BlockID.BrikedBronzeHull, 0]);
});

Translation.addTranslation("Steam Compressor", {ru: "Паровой компрессор",  zh: "蒸汽压缩机"});

IDRegistry.genBlockID("SteamCompressor");
Block.createBlockWithRotation("SteamCompressor", [
{name: "Steam Compressor", texture: [["MACHINE_BRONZE", 0], ["MACHINE_BRONZE_COMPRESSORTOP", 0], ["MACHINE_BRONZE", 0], ["MACHINE_BRONZE_COMPRESSOR", 0], ["MACHINE_BRONZE", 0], ["MACHINE_BRONZE_COMPRESSORSIDE", 0]], inCreative: true}
]);

Callback.addCallback("PostLoaded", function(){
	Recipes.addShaped({id: BlockID.SteamCompressor, count: 1, data: 0}, ["###","$&$", "###"], ['#', BlockID.SmallBronzeFluidPipe, 0, '$', 33, 0, '&', BlockID.BronzeHull, 0]);
});

Translation.addTranslation("High Pressure Compressor", {ru: "Компрессор высокого давления",  zh: "高压压缩机"});
IDRegistry.genBlockID("HighPressureCompressor");
Block.createBlockWithRotation("HighPressureCompressor", [
{name: "High Pressure Compressor", texture: [["MACHINE_STEEL_TOP", 0], ["MACHINE_HIGHPRESSURECOMPRESSOR_TOP", 0], ["MACHINE_STEEL_TOP", 0], ["MACHINE_HIGHPRESSURECOMPRESSOR_FRONT", 0], ["MACHINE_HIGHPRESSURECOMPRESSOR_LEFT", 0], ["MACHINE_HIGHPRESSURECOMPRESSOR_LEFT", 0]], inCreative: true}
]);
Block.registerDropFunction("HighPressureCompressor", function(){
	return [[BlockID.HighPressureCompressor, 1, 0]];
});

Callback.addCallback("PostLoaded", function(){
	Recipes.addShaped({id: BlockID.HighPressureCompressor, count: 1, data: 0}, ["###","$&$", "###"], ['#', BlockID.SmallSteelFluidPipe, 0, '$', 33, 0, '&', BlockID.SteelHull, 0]);
});

Translation.addTranslation("Steam Extractor", {ru: "Паровой экстрактор",  zh: "蒸气提取器"});
IDRegistry.genBlockID("SteamExtractor");
Block.createBlockWithRotation("SteamExtractor", [
{name: "Steam Extractor", texture: [["MACHINE_BRONZE", 0], ["MACHINE_BRONZE_EXTRACTORTOP", 0], ["MACHINE_BRONZE", 0], ["MACHINE_BRONZE_EXTRACTOR", 0], ["MACHINE_BRONZE", 0], ["MACHINE_BRONZE_EXTRACTORRIGHT", 1]], inCreative: true}
]);

Callback.addCallback("PostLoaded", function(){
	Recipes.addShaped({id: BlockID.SteamExtractor, count: 1, data: 0}, ["###","$&0", "###"], ['#', BlockID.SmallBronzeFluidPipe, 0, '$', 33, 0, '&', BlockID.BronzeHull, 0, '0', 20, 0]);
});

Translation.addTranslation("High Pressure Extractor", {ru: "Экстрактор высокого давления",  zh: "提取的高压"});
IDRegistry.genBlockID("HighPressureExtractor");
Block.createBlockWithRotation("HighPressureExtractor", [
{name: "High Pressure Extractor", texture: [["MACHINE_STEEL_TOP", 0], ["MACHINE_HIGHPRESSUREEXTRACTOR_TOP", 0], ["MACHINE_STEEL_TOP", 0], ["MACHINE_HIGHPRESSUREEXTRACTOR_FRONT", 0], ["MACHINE_HIGHPRESSUREEXTRACTOR_LEFT", 0], ["MACHINE_HIGHPRESSUREEXTRACTOR_LEFT", 0]], inCreative: true}
]);
Block.registerDropFunction("HighPressureExtractor", function(){
	return [[BlockID.HighPressureExtractor, 1, 0]];
});

Callback.addCallback("PostLoaded", function(){
	Recipes.addShaped({id: BlockID.HighPressureExtractor, count: 1, data: 0}, ["###","$&0", "###"], ['#', BlockID.SmallSteelFluidPipe, 0, '$', 33, 0, '&', BlockID.SteelHull, 0, '0', 20, 0]);
});

Translation.addTranslation("Steam Forge Hammer", {ru: "Паровой Кузнечный Молот",  zh: "蒸汽锻锤"});
IDRegistry.genBlockID("SteamForgeHammer");
Block.createBlockWithRotation("SteamForgeHammer", [
{name: "Steam Forge Hammer", texture: [["MACHINE_BRONZE", 0], ["MACHINE_BRONZE", 0], ["MACHINE_BRONZE", 0], ["MACHINE_BRONZE_HAMMER", 0], ["MACHINE_BRONZE", 0], ["MACHINE_BRONZE", 0]], inCreative: true}
]);

Callback.addCallback("PostLoaded", function(){
	Recipes.addShaped({id: BlockID.SteamForgeHammer, count: 1, data: 0}, ["#$#","#&#", "#0#"], ['#', BlockID.SmallBronzeFluidPipe, 0, '$', 33, 0, '&', BlockID.BronzeHull, 0, '0', 145, 0]);
});

Translation.addTranslation("High Pressure Forge Hammer", {ru: "Кузнечный Молот высокого давления",  zh: "锻锤是高压"});
IDRegistry.genBlockID("HighPressureForgeHammer");
Block.createBlockWithRotation("HighPressureForgeHammer", [
{name: "High Pressure Forge Hammer", texture: [["MACHINE_STEEL_TOP", 0], ["MACHINE_STEEL_TOP", 0], ["MACHINE_STEEL_TOP", 0], ["MACHINE_HIGHPRESSUREFORGEHAMMER", 0], ["MACHINE_STEEL_TOP", 0], ["MACHINE_STEEL_TOP", 0]], inCreative: true}
]);
Block.registerDropFunction("HighPressureForgeHammer", function(){
	return [[BlockID.HighPressureForgeHammer, 1, 0]];
});

Callback.addCallback("PostLoaded", function(){
	Recipes.addShaped({id: BlockID.HighPressureForgeHammer, count: 1, data: 0}, ["#$#","#&#", "#0#"], ['#', BlockID.SmallSteelFluidPipe, 0, '$', 33, 0, '&', BlockID.SteelHull, 0, '0', 145, 0]);
});

Translation.addTranslation("Steam Furnace", {ru: "Паровая печь",  zh: "蒸汽式炉"});
IDRegistry.genBlockID("SteamFurnace");
Block.createBlockWithRotation("SteamFurnace", [
{name: "Steam Furnace", texture: [["MACHINE_BRONZEBRICKS_BOTTOM", 0], ["MACHINE_BRONZE", 0], ["MACHINE_BRONZEBRICKS", 0], ["MACHINE_STEAM_FURNACE", 0], ["MACHINE_BRONZEBRICKS", 0], ["MACHINE_BRONZEBRICKS", 0]], inCreative: true}
]);

Callback.addCallback("PostLoaded", function(){
	Recipes.addShaped({id: BlockID.SteamFurnace, count: 1, data: 0}, ["###","#&#", "#$#"], ['#', BlockID.SmallBronzeFluidPipe, 0, '$', 61, 0, '&', BlockID.BrikedBronzeHull, 0]);
});

Translation.addTranslation("High Pressure Furnace", {ru: "Печь высокого давления",  zh: "炉高压"});
IDRegistry.genBlockID("HighPressureFurnace");
Block.createBlockWithRotation("HighPressureFurnace", [
{name: "High Pressure Furnace", texture: [["MACHINE_STEEL_TOP", 0], ["MACHINE_STEEL_TOP", 0], ["MACHINE_STEEL_SIDE", 0], ["MACHINE_HIGHPRESSUREFURNACE", 0], ["MACHINE_STEEL_SIDE", 0], ["MACHINE_STEEL_SIDE", 0]], inCreative: true}
]);
Block.registerDropFunction("HighPressureFurnace", function(){
	return [[BlockID.HighPressureFurnace, 1, 0]];
});

Callback.addCallback("PostLoaded", function(){
	Recipes.addShaped({id: BlockID.HighPressureFurnace, count: 1, data: 0}, ["###","#&#", "#$#"], ['#', BlockID.SmallSteelFluidPipe, 0, '$', 61, 0, '&', BlockID.BrikedSteelHull, 0]);
});

Translation.addTranslation("Steam Macerator", {ru: "Паровой дробитель",  zh: "污水蒸汽"});
IDRegistry.genBlockID("SteamMacerator");
Block.createBlockWithRotation("SteamMacerator", [
{name: "Steam Macerator", texture: [["MACHINE_BRONZE", 0], ["MACHINE_BRONZE_DROBTOP", 0], ["MACHINE_BRONZE", 0], ["MACHINE_BRONZE_DROBFRONT", 0], ["MACHINE_BRONZE", 0], ["MACHINE_BRONZE", 0]], inCreative: true}
]);

Callback.addCallback("PostLoaded", function(){
	Recipes.addShaped({id: BlockID.SteamMacerator, count: 1, data: 0}, ["$#$","#&#", "0#0"], ['#', BlockID.SmallBronzeFluidPipe, 0, '$', 264, 0, '&', BlockID.BrikedBronzeHull, 0, '0', 33, 0]);
});

Translation.addTranslation("High Pressure Macerator", {ru: "Дробитель высокого давления",  zh: "破碎机高压"});
IDRegistry.genBlockID("HighPressureMacerator");
Block.createBlockWithRotation("HighPressureMacerator", [
{name: "High Pressure Macerator", texture: [["MACHINE_STEEL_TOP", 0], ["MACHINE_HIGHPRESSUREMACERATOR", 0], ["MACHINE_STEEL_TOP", 0], ["MACHINE_HIGHPRESSUREMACERATOR_FRONT", 0], ["MACHINE_STEEL_TOP", 0], ["MACHINE_STEEL_TOP", 0]], inCreative: true},
]);
Block.registerDropFunction("HighPressureMacerator", function(){
	return [[BlockID.HighPressureMacerator, 1, 0]];
});

Callback.addCallback("PostLoaded", function(){
	Recipes.addShaped({id: BlockID.HighPressureMacerator, count: 1, data: 0}, ["$#$","#&#", "0#0"], ['#', BlockID.SmallSteelFluidPipe, 0, '$', 264, 0, '&', BlockID.BrikedSteelHull, 0, '0', 33, 0]);
});

Translation.addTranslation("Bronze Blast Furnace", {ru: "Бронзовая доменная печь",  zh: "青铜的炉"});
IDRegistry.genBlockID("BronzePlatedBlastFurnase");
Block.createBlockWithRotation("BronzePlatedBlastFurnase", [
{name: "Bronze Blast Furnace", texture: [["MACHINE_BRONZE_PLATEDBRICK", 0], ["MACHINE_BRONZE_PLATEDBRICK", 0], ["MACHINE_BRONZE_PLATEDBRICK", 0], ["MACHINE_BRONZE_BLASTFURNACE", 0], ["MACHINE_BRONZE_PLATEDBRICK", 0], ["MACHINE_BRONZE_PLATEDBRICK", 0]], inCreative: true}
]);
Block.registerDropFunction("BronzePlatedBlastFurnase", function(){
	return [[BlockID.BronzePlatedBlastFurnase, 1, 0]];
});

Callback.addCallback("PostLoaded", function(){
	GT_Recipe.CreateRecipeWithTool({id: BlockID.BronzePlatedBlastFurnase, count:1, data:0}, ["#$#","$w$","#$#"], ['#', ItemID.plateBronze, 0, "$", 61, 0], [GT_Material.wrenchs], 2);
});

Translation.addTranslation("LV Machine Casing", {ru: "LV Кожух машины",  zh: "LV机壳"});
IDRegistry.genBlockID("LVMachineCasing");
Block.createBlockWithRotation("LVMachineCasing", [
{name: "LV Machine Casing", texture: [["LVMachineHull", 0], ["LVMachineHull", 0], ["LVMachineHull", 0], ["LVMachineHull", 0], ["LVMachineHull", 0], ["LVMachineHull", 0],], inCreative: true}
]);
Block.registerDropFunction("LVMachineCasing", function(){
	return [[BlockID.LVMachineCasing, 1, 0]];
});

Callback.addCallback("PostLoaded", function(){
	GT_Recipe.CreateRecipeWithTool({id: BlockID.LVMachineCasing, count:1, data:0}, ["###","#w#","###"], ['#', ItemID.plateSteel, 0], [GT_Material.wrenchs], 2);
});

Translation.addTranslation("LV Machine Hull", {ru: "LV Корпус машины",  zh: "LV机的船体"});
IDRegistry.genBlockID("LVMachineHull");
Block.createBlockWithRotation("LVMachineHull", [
{name: "LV Machine Hull", texture: [["LVMachineHull", 0], ["LVMachineHull", 0], ["LVMachineHull", 0], ["LVMachineHull", 0], ["MachineHull", 0], ["LVMachineHull", 0],], inCreative: true}
]);
Block.registerDropFunction("LVMachineHull", function(){
	return [[BlockID.LVMachineHull, 1, 0]];
});

Callback.addCallback("PostLoaded", function(){
	Recipes.addShaped({id: BlockID.LVMachineHull, count: 1, data: 0}, ["wsw","c#c", ""], ['#', BlockID.LVMachineCasing, 0, 'w', ItemID.plateWroughtIron, 0, 's', ItemID.plateSteel, 0, 'c', BlockID.OneTinCable, 0]);
});

//Generators

Translation.addTranslation("Basic Steam Turbine", {ru: "(Базовая) Паровая турбина",  zh: "基本的蒸汽涡轮机"});
IDRegistry.genBlockID("BasicSteamTurbine");
Block.createBlockWithRotation("BasicSteamTurbine", [
{name: "Basic Steam Turbine", texture: [["LVMachineHull", 0], ["LVMachineHull", 0], ["TurbineRotor", 0], ["TurbineRotor", 0], ["MachineHull", 0], ["LVMachineHull", 0],], inCreative: true}
]);
Block.registerDropFunction("BasicSteamTurbine", function(){
	return [[BlockID.BasicSteamTurbine, 1, 0]];
});

Callback.addCallback("PostLoaded", function(){
	Recipes.addShaped({id: BlockID.BasicSteamTurbine, count: 1, data: 0}, ["pcp","r#r", "ewe"], ['p', BlockID.BronzeFluidPipe, 0, 'c', ItemID.circuitBasic, 0, 'r', ItemID.rotorTin, 0, 'e', ItemID.electricmotorLV, 0, 'w', BlockID.OneTinCable, 0, '#', BlockID.LVMachineHull, 0]);
});

//ELECTRIC

Translation.addTranslation("Basic Electric Furnace", {ru: "(Базовая) Электричекая печь",  zh: "基本电炉"});
IDRegistry.genBlockID("BasicElectricFurnace");
Block.createBlockWithRotation("BasicElectricFurnace", [
{name: "Basic Electric Furnace", texture: [["LVMachineHull", 0], ["LVMachineHull", 0], ["LVMachineHull", 0], ["ELECTRIC_FURNACE_BASIC", 0], ["MachineHull", 0], ["LVMachineHull", 0]], inCreative: true}
]);
Block.registerDropFunction("BasicElectricFurnace", function(){
	return [[BlockID.BasicElectricFurnace, 1, 0]];
});

Callback.addCallback("PostLoaded", function(){
	Recipes.addShaped({id: BlockID.BasicElectricFurnace, count: 1, data: 0}, ["cpc","p#p", "epe"], ['p', BlockID.TwoCopperWire, 0, 'c', ItemID.circuitBasic, 0, 'e', BlockID.OneTinCable, 0, '#', BlockID.LVMachineHull, 0]);
});

Translation.addTranslation("Basic Electric Alloy Smelter", {ru: "(Базовая) Электричекая плавильня",  zh: "基本电冶炼厂合金"});
IDRegistry.genBlockID("BasicElectricAlloySmelter");
Block.createBlockWithRotation("BasicElectricAlloySmelter", [
{name: "Basic Electric Alloy Smelter", texture: [["LVMachineHull", 0], ["LVMachineHull", 0], ["LVMachineHull", 0], ["ELECTRIC_ALLOYSMELTER_BASIC", 0], ["MachineHull", 0], ["LVMachineHull", 0]], inCreative: true}
]);
Block.registerDropFunction("BasicElectricAlloySmelter", function(){
	return [[BlockID.BasicElectricAlloySmelter, 1, 0]];
});

Callback.addCallback("PostLoaded", function(){
	Recipes.addShaped({id: BlockID.BasicElectricAlloySmelter, count: 1, data: 0}, ["cpc","p#p", "epe"], ['p', BlockID.FourCopperWire, 0, 'c', ItemID.circuitBasic, 0, 'e', BlockID.OneTinCable, 0, '#', BlockID.LVMachineHull, 0]);
});

/*
Translation.addTranslation("Basic Electric Assembling Machine", {ru: "(Базовая) Электричекая собирающая машина",  zh: "基本电装机器"});
IDRegistry.genBlockID("BasicElectricAssemblingMachine");
Block.createBlockWithRotation("BasicElectricAssemblingMachine", [
{name: "Basic Electric Assembling Machine", texture: [["ELECTRIC_ASSEMBLING_TOP_BASIC", 0], ["LVMachineHull", 0], ["LVMachineHull", 0], ["ELECTRIC_ASSEMBLING_FRONT_BASIC", 0], ["MachineHull", 0], ["LVMachineHull", 0],], inCreative: true}
]);
Block.registerDropFunction("BasicElectricAssemblingMachine", function(){
	return [[BlockID.BasicElectricAssemblingMachine, 1, 0]];
});
*/

Translation.addTranslation("Basic Electric Compressor", {ru: "(Базовый) Электричекий компрессор",  zh: "基本电动压缩机"});
IDRegistry.genBlockID("BasicElectricCompressor");
Block.createBlockWithRotation("BasicElectricCompressor", [
{name: "Basic Electric Compressor", texture: [["LVMachineHull", 0], ["ELECTRIC_COMPRESSOR_TOP", 0], ["LVMachineHull", 0], ["ELECTRIC_COMPRESSOR_FRONT", 0], ["ELECTRIC_COMPRESSOR_RIGHT", 0], ["ELECTRIC_COMPRESSOR_RIGHT", 0]], inCreative: true}
]);
Block.registerDropFunction("BasicElectricCompressor", function(){
	return [[BlockID.BasicElectricCompressor, 1, 0]];
});

Callback.addCallback("PostLoaded", function(){
	Recipes.addShaped({id: BlockID.BasicElectricCompressor, count: 1, data: 0}, [" c ","p#p", "ece"], ['p', ItemID.electricpistonLV, 0, 'c', ItemID.circuitBasic, 0, 'e', BlockID.OneTinCable, 0, '#', BlockID.LVMachineHull, 0]);
});

Translation.addTranslation("Basic Electric Extractor", {ru: "(Базовый) Электричекий экстрактор",  zh: "基本电气提取器"});
IDRegistry.genBlockID("BasicElectricExtractor");
Block.createBlockWithRotation("BasicElectricExtractor", [
{name: "Basic Electric Extractor", texture: [["LVMachineHull", 0], ["ELECTRIC_EXTRACTOR_TOP", 0], ["LVMachineHull", 0], ["ELECTRIC_EXTRACTOR_FRONT", 0], ["ELECTRIC_EXTRACTOR_RIGHT", 0], ["ELECTRIC_EXTRACTOR_RIGHT", 0]], inCreative: true}
]);
Block.registerDropFunction("BasicElectricExtractor", function(){
	return [[BlockID.BasicElectricExtractor, 1, 0]];
});

Callback.addCallback("PostLoaded", function(){
	Recipes.addShaped({id: BlockID.BasicElectricExtractor, count: 1, data: 0}, ["gcg","p#u", "ece"], ['p', ItemID.electricpistonLV, 0, 'c', ItemID.circuitBasic, 0, 'e', BlockID.OneTinCable, 0, '#', BlockID.LVMachineHull, 0, 'g', 20, 0, 'u', ItemID.electricpumpLV, 0]);
});

Translation.addTranslation("Basic Electric Macerator", {ru: "(Базовый) Электричекий дробитель",  zh: "基本的污水电"});
IDRegistry.genBlockID("BasicElectricMacerator");
Block.createBlockWithRotation("BasicElectricMacerator", [
{name: "Basic Electric Macerator", texture: [["LVMachineHull", 0], ["ELECTRIC_MACERATOR_TOP", 0], ["LVMachineHull", 0], ["ELECTRIC_MACERATOR_FRONT", 0], ["LVMachineHull", 0], ["LVMachineHull", 0]], inCreative: true}
]);
Block.registerDropFunction("BasicElectricMacerator", function(){
	return [[BlockID.BasicElectricMacerator, 1, 0]];
});

Callback.addCallback("PostLoaded", function(){
	Recipes.addShaped({id: BlockID.BasicElectricMacerator, count: 1, data: 0}, ["pud","ee#", "cce"], ['p', ItemID.electricpistonLV, 0, 'c', ItemID.circuitBasic, 0, 'e', BlockID.OneTinCable, 0, '#', BlockID.LVMachineHull, 0, 'd', 264, 0, 'u', ItemID.electricpumpLV, 0]);
});

/*
Translation.addTranslation("Basic Electric Recycler", {ru: "(Базовый) Электричекий утилизатор",  zh: "基本回收电"});
IDRegistry.genBlockID("BasicElectricRecycler");
Block.createBlockWithRotation("BasicElectricRecycler", [
{name: "Basic Electric Recycler", texture: [["ELECTRIC_RECYCLER_TOP", 0], ["LVMachineHull", 0], ["LVMachineHull", 0], ["ELECTRIC_RECYCLER_FRONT", 0], ["ELECTRIC_RECYCLER_RIGHT", 0], ["ELECTRIC_RECYCLER_RIGHT", 0],], inCreative: true}
]);
Block.registerDropFunction("BasicElectricRecycler", function(){
	return [[BlockID.BasicElectricRecycler, 1, 0]];
});
*/