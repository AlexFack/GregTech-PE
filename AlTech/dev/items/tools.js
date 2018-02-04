CTR.RegisterHammer = function(name, data){
	var id = IDRegistry.genItemID(name+"Hammer");
    Item.createItem(name+"Hammer", "Hammer from "+name, {name:name+"_hammer"}, {stack:1});
    CTR.addTool(id, data)
    ATMat.hummers.push(id)
/*    Recipes.addShaped({id:id, count:1, data:0}, [
	"aa ",
	"aab",
	"aa "
     ], ['a', materialID, 0, 'b', 280, 0] ); */
}
	
CTR.RegisterTungstensteel = function(name, data){
	var id = IDRegistry.genItemID(name+"Tungstensteel");
    Item.createItem(name+"Tungstensteel", "Tungstensteel from "+name, {name:name+"_tungstensteel"}, {stack:1});
    CTR.addTool(id, data)
    ATMat.tungstensteels.push(id)
    for(var key in ATMat.hummers){
 /*   Recipes.addShaped({id:id, count:1, data:0}, [
	"a  ",
	"ab ",
	"c  "
     ], ['a', materialID, 0, 'b', ATMat.hummers[key], -1, 'c', 280, 0] ); */
     }
}

CTR.RegisterMortar = function(name, data){
	var id = IDRegistry.genItemID(name+"Mortar");
    Item.createItem(name+"Mortar", "Mortar from "+name, {name:name+"_mortar"}, {stack:1});
    CTR.addTool(id, data)
    ATMat.mortars.push(id)
    for(var key in ATMat.hummers){
/*    Recipes.addShaped({id:id, count:1, data:0}, [
	" c ",
	"aba",
	" a "
     ], ['b', materialID, 0, 'c', ATMat.hummers[key], -1, 'c', ItemID.littleStone, 0] ); */
     }
}

CTR.RegisterHammer("stone", 5)
CTR.RegisterHammer("iron", 128)
CTR.RegisterTungstensteel("iron", 128)
CTR.RegisterTungstensteel("bronze", 64)
CTR.RegisterMortar("stone", 8)

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