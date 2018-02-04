CTR.RegisterHammer = function(name, data){
	var id = IDRegistry.genItemID(name+"Hammer");
    Item.createItem(name+"Hammer", "Hammer from "+name, {name:name+"_hammer"}, {stack:1});
    CTR.addTool(id, data)
    ATMat.hummers.push(id)
}
	
CTR.RegisterTungstensteel = function(name, data){
	var id = IDRegistry.genItemID(name+"Tungstensteel");
    Item.createItem(name+"Tungstensteel", "Tungstensteel from "+name, {name:name+"_tungstensteel"}, {stack:1});
    CTR.addTool(id, data)
    ATMat.tungstensteels.push(id)
}

CTR.RegisterMortar = function(name, data){
	var id = IDRegistry.genItemID(name+"Mortar");
    Item.createItem(name+"Mortar", "Mortar from "+name, {name:name+"_mortar"}, {stack:1});
    CTR.addTool(id, data)
    ATMat.mortars.push(id)
}

CTR.RegisterCutter = function(name, data){
	var id = IDRegistry.genItemID(name+"Cutter");
    Item.createItem(name+"Cutter", "Cutter from "+name, {name:name+"_cutter"}, {stack:1});
    CTR.addTool(id, data)
    ATMat.cutters.push(id)
}

CTR.RegisterHammer("Stone", 5)
CTR.RegisterHammer("Iron", 128)
CTR.RegisterHammer("Bronze", 64)
CTR.RegisterHammer("Gold", 32)
CTR.RegisterHammer("Steel", 256)

CTR.RegisterCutter("Iron", 128)
CTR.RegisterCutter("Bronze", 64)
CTR.RegisterCutter("Gold", 32)
CTR.RegisterCutter("Steel", 256)

CTR.RegisterTungstensteel("Iron", 128)
CTR.RegisterTungstensteel("Bronze", 64)
CTR.RegisterTungstensteel("Gold", 32)
CTR.RegisterTungstensteel("Steel", 256)

CTR.RegisterMortar("Stone", 8)
CTR.RegisterMortar("Iron", 128)
CTR.RegisterMortar("Bronze", 64)
CTR.RegisterMortar("Gold", 32)
CTR.RegisterMortar("Steel", 256)

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

var cwood = {durability: 12, level: 1, efficiency:2, damage: 2, enchantability: 16};
var cstone = {durability: 38, level: 2, efficiency:3, damage: 2, enchantability: 16};

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