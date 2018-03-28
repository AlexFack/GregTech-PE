IDRegistry.genItemID("cellSteam");
Item.createItem("cellSteam", "Steam cell", {name: "Steam_cell"});
LiquidRegistry.registerItem("steam", {id: ItemID.cellEmpty, data: 0}, {id: ItemID.cellSteam, data: 0});