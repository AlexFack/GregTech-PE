var cFuelEffPct = __config__.access("furnacesOptions.compactedFurnaceFuelFlowEfficiencyPercent")
var cRecipesEffPct = __config__.access("furnacesOptions.compactedFurnaceRecipesEfficiencyPercent")
var cMaxTemp = __config__.access("furnacesOptions.compactedFurnaceMaxTemp")

//mechs
IDRegistry.genBlockID("compactedfurnace");
Block.createBlockWithRotation("compactedfurnace", [
	{name: "Промышленная каменная печь", texture: [["compacted_stone", 0], ["compacted_stone", 0 ], ["compacted_stone", 0 ], ["furnace", 0], ["compacted_stone", 0 ], ["compacted_stone", 0 ]], inCreative: true}]);
IDRegistry.genBlockID("compactedcobblestone");
Block.createBlock("compactedcobblestone", [
{name: "Уплотненный булыжник", texture: [["compacted_stone", 0]], inCreative: true}]);
var c = BlockID.compactedcobblestone;

var compactedfurnacestruct = [[
[-1, 0, 0, c],
[-1, 0, 1, c],
[-1, 0, 2, c],
[1, 0, 0, c],
[1, 0, 1, c],
[1, 0, 2, c],
[0, 0, 2, c],

[-1, 1, 1, c],
[1, 1, 1, c],
[0, 1, 2, c],
[0, 1, 0, c],

[-1, 2, 1, c],
[1, 2, 1, c],
[0, 2, 2, c],
[0, 2, 0, c],

[-1, 3, 1, c],
[1, 3, 1, c],
[0, 3, 2, c],
[0, 3, 0, c],

[-1, 4, 1, c],
[1, 4, 1, c],
[0, 4, 2, c],
[0, 4, 0, c],

[0, 0, 1, 0],
[0, 1, 1, 0],
[0, 2, 1, 0],
[0, 3, 1, 0],
[0, 4, 1, 0],
[0, 5, 1, 0]
]];

var cfguicon = {
	standart: {
		header:{
			text:{
				text: "Промышленная каменная печь"
			}
		},
		inventory: {standart: true},
		background: {standart:true}
	},
	drawing: [
		{type: "bitmap", bitmap:"fire_background", x:436, y:280, scale:3},
		{type: "bitmap", bitmap:"furnace_bar_background", x:460, y:200, scale: 4},
		{type: "bitmap", bitmap:"furnace_bar_background", x:610, y:200, scale: 4},
	],
	elements:{
		"slot1":{type: "slot", x: 330, y: 200, size:60},
		"slot2":{type: "slot", x: 400, y: 200, size:60},
		"slot3":{type: "slot", x: 550, y:200, size:60, visual:true},
		"slot4":{type: "slot", x: 700, y: 200, size:60},
		"slot5":{type: "slot", x: 770, y: 200, size:60},
		"slot6":{type: "slot", x: 366, y: 270, size:60},
		"progbar1":{type: "scale", x:460, y:200, direction:0, bitmap: "furnace_bar_scale", scale:4},
		"progbar2":{type: "scale", x:610, y:200, direction:0, bitmap: "furnace_bar_scale", scale:4},
		"fire":{type: "scale", x:436, y:280, direction:1, bitmap: "fire_scale", scale:3},
		"temp":{type: "text", x:480, y:300, width:30, height:10, text: ""},
		}
}

var cfgui = new UI.StandartWindow(cfguicon);

var compactedfurnacecon = FurnaceTemplate(cFuelEffPct, cMaxTemp, cRecipesEffPct, cfgui)
TileEntity.registerPrototype(BlockID.compactedfurnace, compactedfurnacecon); 
MAPI.Rotate(compactedfurnacestruct);
MAPI.Register(compactedfurnacecon, compactedfurnacestruct);