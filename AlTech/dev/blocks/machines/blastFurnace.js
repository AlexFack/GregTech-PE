var bFuelEffPct = __config__.access("furnacesOptions.blastFurnaceFuelFlowEfficiencyPercent") 
var bRecipesEffPct = __config__.access("furnacesOptions.blastFurnaceRecipesEfficiencyPercent")
var bMaxTemp = __config__.access("furnacesOptions.blastFurnaceMaxTemp")

//mechs
IDRegistry.genBlockID("blastfurnace");
Block.createBlockWithRotation("blastfurnace", [
	{name: "Blast furnace", texture: [["blast_furnace_block", 0], [ "blast_furnace_block", 0 ], [ "blast_furnace_block", 0 ], ["blast_furnace", 0], [ "blast_furnace_block", 0 ], [ "blast_furnace_block", 0 ]], inCreative: true}]);
IDRegistry.genBlockID("bronzeblock");
Block.createBlock("bronzeblock", [
	{name: "Blast furnace block", texture: [["blast_furnace_block", 0]], inCreative: true}]);
	
Block.registerDropFunction("blastfurnace", function(coords, id, data, level){ 
	if(level>=2){
		return [[id, 1, data]]
	}
	return []
})
	
Block.registerDropFunction("bronzeblock", function(coords, id, data, level){ 
	if(level>=2){
		return [[id, 1, data]]
	}
	return []
})
	
var m = {x:0, y:0, z:0};
var b = BlockID.bronzeblock;
var d = null;

var blastfurnacestruct = [[	
   [m.x, m.y-1, m.z-1, b, d],
	[m.x, m.y-1, m.z, b, d],
	[m.x, m.y+1, m.z, b, d],
	[m.x, m.y+2, m.z, b, d],

	[m.x, m.y-1, m.z-2, b, d],
	[m.x, m.y, m.z-2, b, d],
	[m.x, m.y+1, m.z-2, b, d],
	[m.x, m.y+2, m.z-2, b, d],

	[m.x-1, m.y-1, m.z, b, d],
	[m.x-1, m.y, m.z, b, d],
	[m.x-1, m.y+1, m.z, b, d],
	[m.x-1, m.y+2, m.z, b, d],

	[m.x-1, m.y-1, m.z-1, b, d],
	[m.x-1, m.y, m.z-1, b, d],
	[m.x-1, m.y+1, m.z-1, b, d],
	[m.x-1, m.y+2, m.z-1, b, d],

	[m.x-1, m.y-1, m.z-2, b, d],
	[m.x-1, m.y, m.z-2, b, d],
	[m.x-1, m.y+1, m.z-2, b, d],
	[m.x-1, m.y+2, m.z-2, b, d],

	[m.x+1, m.y-1, m.z, b, d],
	[m.x+1, m.y, m.z, b, d],
	[m.x+1, m.y+1, m.z, b, d],
	[m.x+1, m.y+2, m.z, b, d],

	[m.x+1, m.y-1, m.z-1, b, d],
	[m.x+1, m.y, m.z-1, b, d],
	[m.x+1, m.y+1, m.z-1, b, d],
	[m.x+1, m.y+2, m.z-1, b, d],

	[m.x+1, m.y-1, m.z-2, b, d],

	[m.x+1, m.y, m.z-2, b, d],
	[m.x+1, m.y+1, m.z-2, b, d],
	[m.x+1, m.y+2, m.z-2, b, d]]]

var bfgui = new UI.StandartWindow({
	standart: {
		header: {
			text: {
				text: "Доменная печь"
			},
color: android.graphics.Color.rgb(0x5a, 0x11, 0x00)
		},
		inventory: {
			standart: true
		},
		background: {
	  color: android.graphics.Color.rgb(0xa2, 0x3c, 0x00)
		}
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
});

var blastfurnacecon = FurnaceTemplate(bFuelEffPct, bMaxTemp, bRecipesEffPct, bfgui)
TileEntity.registerPrototype(BlockID.blastfurnace, blastfurnacecon)
MAPI.Rotate(blastfurnacestruct);
MAPI.Register(blastfurnacecon, blastfurnacestruct);