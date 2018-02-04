/*
BUILD INFO:
  dir: dev
  target: main.js
  files: 10
*/



// file: head.js

importLib("ATAPI", "*");
importLib("ToolType", "*");
importLib("Chemistry", "*");

__config__.checkAndRestore({ 
compability: {
   industrial_craft:false
}, 
furnaceOptions: {
   blastFurnaceFuelFlowEfficiencyPercent:100,
   blastFurnaceRecipesEfficiencyPercent:150,
   blastFurnaceFuseLong:33,
   blastFurnaceMaxTemp:2000,
      
   compactedFurnaceFuelFlowEfficiencyPercent:100,
   compactedFurnaceRecipesEfficiencyPercent:150,
   compactedFurnaceFuseLongFromLongRecipePercent:33,
   compactedFurnaceMaxTemp:600
}
});

var industrial_craft = __config__.access("compability.industrial_craft") == true;
var furnaceRecipes = ATMech.furnaceRecipes
var furnaceFuel = ATMech.furnaceFuel

var round = function(num, x){
	var multiplier = Math.pow(10, x)
	return Math.floor(num * multiplier) / multiplier
}

var random = function(min, max){
	return Math.floor(Math.random() * (max - min + 1)) + min;
}




// file: items/tools.js

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




// file: items/materialRegister.js

var metalls = {isDust:true, isIngot:true, isPlate:true, isNugget:true, isSmallDust:true, isTinyDust:false, isBolt:true, isLittleOre:false, isModule:true, generateRecipes:true, isOre:false}
var metalls_non_module = {isDust:true, isIngot:true, isPlate:true, isNugget:true, isSmallDust:true, isTinyDust:false, isBolt:false, isLittleOre:false, isModule:false, generateRecipes:true, isOre:false}

var stones = {isDust:true, isIngot:false, isPlate:false, isNugget:false, isSmallDust:true, isTinyDust:false, isBolt:false, isLittleOre:true, isModule:false, generateRecipes:true, isOre:false}

var iron = {isDust:true, isIngot:false, isPlate:true, isNugget:true, isSmallDust:true, isTinyDust:false, isBolt:true, isLittleOre:true, isModule:true, generateRecipes:true, isOre:false}
var gold = {isDust:true, isIngot:false, isPlate:true, isNugget:false, isSmallDust:true, isTinyDust:false, isBolt:false, isLittleOre:true, isModule:false, generateRecipes:true, isOre:false}

ATMat.MaterialRegister("Stone", stones)
ATMat.MaterialRegister("RedGranit", stones)
ATMat.MaterialRegister("BlackGranit", stones)

ATMat.MaterialRegister("Steel", metalls, {temp:1600, long:240})
ATMat.MaterialRegister("Bronze", metalls, {temp:1000, long:30})
ATMat.MaterialRegister("Chrome", metalls, {temp:1900,  long:300})
ATMat.MaterialRegister("Aluminium", metalls, {temp:600, long:20})
ATMat.MaterialRegister("Titanium",  metalls, {temp:1600, long:240})
ATMat.MaterialRegister("Stainless", metalls, {temp:1800, long:260})
ATMat.MaterialRegister("Volfram", metalls, {temp:3400, long:400}) 

ATMat.MaterialRegister("Copper", metalls_non_module, {temp:1000, long:30})
ATMat.MaterialRegister("Tin", metalls_non_module, {temp:200, long:10})
ATMat.MaterialRegister("Nikel",  metalls_non_module, {temp:1400, long:60})
ATMat.MaterialRegister("Antimony", metalls_non_module, {temp:1600, long:30})
ATMat.MaterialRegister("Silver", metalls_non_module, {temp:900, long:30})
ATMat.MaterialRegister("Lead", metalls_non_module, {temp:300, long:10})

ATMat.MaterialRegister("Iron", iron, {temp:1000, long:100})
ATMat.MaterialRegister("Gold", gold, {temp:1000, long:30})




// file: items/other.js

//???
IDRegistry.genItemID("itemlava");
Item.createItem("itemlava", "item_lava", {name:"lava"}, {isTech:true})




// file: items/ids.js

//id items
var cobbhum = ItemID.stoneHammer;
var irhum = ItemID.ironHammer;
var irtung = ItemID.ironTungstensteel;
var mort = ItemID.stoneMortar;
var litst = ItemID.littleStone
var irpl = ItemID.plateIron;
var brpl = ItemID.plateBronze;
var gpl = ItemID.plateGold;
var litir = ItemID.littleIronOre;
var litcopp = ItemID.littleCopperOre;
var littin = ItemID.littleTinOre;
var litg = ItemID.littleGoldOre;
var igcopp = ItemID.ingotCopper;
var igtin = ItemID.ingotTin;
var igbr = ItemID.ingotBronze;
var igst = ItemID.ingotSteel;
var duir = ItemID.dustIron;
var dug = ItemID.dustGold;
var ducopp = ItemID.dustCopper;
var dutin = ItemID.dustTin;
var dubr = ItemID.dustBronze;
var sduir = ItemID.smallDustIron;
var sdug = ItemID.smallDustGold;
var sducopp = ItemID.smallDustCopper;
var sdutin = ItemID.smallDustTin;
var brmod = ItemID.moduleBronze;
var brbolt = ItemID.boltBronze
 
var lava = ItemID.itemlava;




// file: blocks/machines/template.js

var FurnaceTemplate = function(FuelEffPct, MaxTemp, RecipesEffPct, gui) { return {
    defaultValues: {
        progress1:0,
        prog1end:0,
        progress2:0,
        prog2end:0,
        fire:0, 
        burn:1,
        temp:0,
        lava:0,
        keys:0,
        result1:0,
        result2:0,
        maxTemp:0,
        fuelEfr:0
	},
    container:gui,
    click: function(){
        this.container.openAs(gui)
        //Game.message("Duck")
       /*var key = this.data.MAPIkey
        var m = this
        var side = 0
        var bl = 0
        //for(var side in MAPI.multiblocks[key].struc){
        	bl=0
            //Game.message(side);
            for(var keyi in MAPI.multiblocks[key].struc[side]){ 
            	World.setBlock(m.x+MAPI.multiblocks[key].struc[side][keyi][0], m.y+MAPI.multiblocks[key].struc[side][keyi][1], m.z+MAPI.multiblocks[key].struc[side][keyi][2], MAPI.multiblocks[key].struc[side][keyi][3])
            }
        //}         */         	
    },
    tick: function(){

		var sourseSlot1 = this.container.getSlot("slot1");
		var sourseSlot2 = this.container.getSlot("slot2");
		var resultSlot1 = this.container.getSlot("slot4");
		var resultSlot2 = this.container.getSlot("slot5");
		var metallSlot = this.container.getSlot("slot3");
		var fuelSlot = this.container.getSlot("slot6");

		this.container.validateSlot("slot1");
		this.container.validateSlot("slot2");
		this.container.validateSlot("slot4");
		this.container.validateSlot("slot5");
		this.container.validateSlot("slot6");
	    
		if(World.getWorldTime()%10==0){
            MAPI.Corpus(this)
            //Game.message(this.data.key)
            //Game.message(this.data.MAPIact)
            //Game.message(MAPI.Corpus(this))
            //Game.message(this.data.MAPIside)
            //Game.message(this.data.MAPIbl)
        }
         if(this.data.MAPIact==true){
			for(var key1 in furnaceFuel){
				//Game.message(this.data.fuel.length);
				if(fuelSlot.id==furnaceFuel[key1].id && fuelSlot.data==furnaceFuel[key1].data && this.data.fire==0){
					fuelSlot.count--;
					this.data.fire=furnaceFuel[key1].second*20 
					this.data.burn=this.data.fire;
					this.data.fuelEff=round(furnaceFuel[key1].f / 100 * FuelEffPct, 0)
					//Game.message(this.data.fuelEff)
				}
			}
			if(this.data.fire>0){
				this.data.fire--;
				this.data.temp+=this.data.fuelEff
			}
	
			if(this.data.temp>MaxTemp){
				this.data.temp=MaxTemp;
			}

			for(var key in furnaceRecipes){
				if(
				furnaceRecipes[key].sS1[0]==sourseSlot1.id 
				&& 
				furnaceRecipes[key].sS1[1]<=sourseSlot1.count &&
				furnaceRecipes[key].sS1[2]==sourseSlot1.data
				&&
				furnaceRecipes[key].sS2[0]==sourseSlot2.id 
				&& 
				furnaceRecipes[key].sS2[1]<=sourseSlot2.count &&
				furnaceRecipes[key].sS2[2]==sourseSlot2.data
				&&
				this.data.lava==0
				&&
				this.data.prog1end==0
				&&
				this.data.temp>=furnaceRecipes[key].temp){
					sourseSlot1.count-=furnaceRecipes[key].sS1[1];
					sourseSlot2.count-=furnaceRecipes[key].sS2[1];
					this.data.prog1end=round(furnaceRecipes[key].long*20/ 1.33 / RecipesEffPct * 100, 1)
					this.data.keys=key
					this.data.maxtemp = furnaceRecipes[key].temp
				    //Game.message(round(furnaceRecipes[key].long*20/ 1.33 / 100 * RecipesEffPct, 1))
				}
			}
		   if(this.data.progress1<this.data.prog1end &&
                this.data.temp>=this.data.maxtemp &&this.data.lava==0){
                this.data.progress1++;
            }
           if(this.data.prog1end<=this.data.progress1&&this.data.lava==0&&this.data.prog1end>0){
                this.data.lava=1;
                this.data.prog2end=round(furnaceRecipes[this.data.keys].long*20 / RecipesEffPct * 100 - this.data.prog1end, 1)
                //Game.message(this.data.prog1end)
                //Game.message(this.data.prog2end)
            }
            if(this.data.progress2<this.data.prog2end &&
                this.data.temp>=this.data.maxtemp &&this.data.lava==1){
                this.data.progress2++;
                
            }
    
			if(this.data.prog2end<=this.data.progress2&&this.data.lava==1&&this.data.prog2end>0&&
			(resultSlot1.id==0||resultSlot1.id==furnaceRecipes[this.data.keys].rS1[0])&&
			(resultSlot2.id==0||resultSlot2.id==furnaceRecipes[this.data.keys].rS2[0]) ){
				resultSlot1.id = furnaceRecipes[this.data.keys].rS1[0]
				resultSlot1.count += furnaceRecipes[this.data.keys].rS1[1]
				resultSlot1.data = furnaceRecipes[this.data.keys].rS1[2]
				resultSlot2.id = furnaceRecipes[this.data.keys].rS2[0]
				resultSlot2.count += furnaceRecipes[this.data.keys].rS2[1]
				resultSlot2.data = furnaceRecipes[this.data.keys].rS2[2]
				this.data.lava=0;
				this.data.progress1=0;
				this.data.progress2=0;
				this.data.prog1end=0;
				this.data.prog2end=0;
				this.data.result1=0;
				this.data.result2=0;
			}
	    }else{this.data.fire=0}
	
	    if(this.data.fire==0 && this.data.temp>0){
				this.data.temp--;
			}

		if(this.data.lava==1){
			metallSlot.id=lava;
			metallSlot.count=1;
		}else{
			metallSlot.id=0;
			metallSlot.count=0
		}

		this.container.setText("temp", "t: "+this.data.temp+" C");
		this.container.setScale("fire", this.data.fire/this.data.burn);
		this.container.setScale("progbar1", this.data.progress1/this.data.prog1end)
		this.container.setScale("progbar2", this.data.progress2/this.data.prog2end);
		}
	}
}




// file: blocks/machines/blastFurnace.js

var bFuelEffPct = __config__.access("furnacesOptions.blastFurnaceFuelFlowEfficiencyPercent") 
var bRecipesEffPct = __config__.access("furnacesOptions.blastFurnaceRecipesEfficiencyPercent")
var bMaxTemp = __config__.access("furnacesOptions.blastFurnaceMaxTemp")

//mechs
IDRegistry.genBlockID("blastfurnace");
Block.createBlockWithRotation("blastfurnace", [
	{name: "Доменная печь", texture: [["blast_furnace_block", 0], [ "blast_furnace_block", 0 ], [ "blast_furnace_block", 0 ], ["blast_furnace", 0], [ "blast_furnace_block", 0 ], [ "blast_furnace_block", 0 ]], inCreative: true}]);
IDRegistry.genBlockID("bronzeblock");
Block.createBlock("bronzeblock", [
	{name: "Блок доменной печи", texture: [["blast_furnace_block", 0]], inCreative: true}]);
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




// file: blocks/machines/compactedFurnace.js

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




// file: blocks/blocks.js

//ores
var BLOCK_TYPE_ORE = Block.createSpecialType({
	base: 1,
	destroytime: 2,
	opaque: true,
}, "ore");

var BLACK_STONE = Block.createSpecialType({
	base: 1,
	destroytime: 3,
	opaque: true,
}, "stone");

var RED_STONE = Block.createSpecialType({
	base: 1,
	destroytime: 2,
	opaque: true,
}, "stone");

IDRegistry.genBlockID("oreCopper");
Block.createBlock("oreCopper", [
	{name: "copper_ore", texture: [["ore_copper", 0]], inCreative: true}
], BLOCK_TYPE_ORE );
ToolAPI.registerBlockMaterial(BlockID.oreCopper, "stone");

IDRegistry.genBlockID("oreTin");
Block.createBlock("oreTin", [
	{name: "tin_ore", texture: [["ore_tin", 0]], inCreative: true}
], BLOCK_TYPE_ORE );
ToolAPI.registerBlockMaterial(BlockID.oreTin, "stone");

IDRegistry.genBlockID("blackstone");
Block.createBlock("blackstone", [
	{name: "tin_ore", texture: [["black_stone", 0]], inCreative: true}
], BLACK_STONE );
ToolAPI.registerBlockMaterial(BlockID.blackstone, "stone");

IDRegistry.genBlockID("blackcobblestone");
Block.createBlock("blackcobblestone", [
	{name: "tin_ore", texture: [["black_cobblestone", 0]], inCreative: true}
], BLACK_STONE );
ToolAPI.registerBlockMaterial(BlockID.blackcobblestone, "stone");

IDRegistry.genBlockID("redstone");
Block.createBlock("redstone", [
	{name: "tin_ore", texture: [["red_stone", 0]], inCreative: true}
], RED_STONE );
ToolAPI.registerBlockMaterial(BlockID.redstone, "stone");

IDRegistry.genBlockID("redcobblestone");
Block.createBlock("redcobblestone", [
	{name: "tin_ore", texture: [["red_cobblestone", 0]], inCreative: true}
], RED_STONE );
ToolAPI.registerBlockMaterial(BlockID.redcobblestone, "stone");

//drop ores
Callback.addCallback("PostLoaded", function(){
    Block.registerDropFunctionForID(14, function(coords, id, data, level){ 
    if(level>2){
        return [[litg, 1, 0], [litst, 3, 0]];
    }
       return []
    });

Block.registerDropFunctionForID(15, function(coords, id, data, level){ 
    if(level>1){
        return [[litir, 1, 0], [litst, 3, 0]];
    }
       return []
    });
Block.registerDropFunctionForID(16, function(coords, id, data, level){ 
    if(level>=1){
        return [[litst, 3, 0], [263, 1, 0]];
    }
       return []
    });
Block.registerDropFunction("oreCopper", function(coords, id, data, level){ 
    if(level>1){
        return [[litcopp, 1, 0], [litst, 3, 0]];
    }
       return []
    });
Block.registerDropFunction("oreTin", function(coords, id, data, level){ 
    if(level>1){
        return [[littin, 1, 0], [litst, 3, 0]];
    }
       return []
    });
Block.registerDropFunction("blackstone", function(coords, id, data, level){ 
    if(level>2){
        return [[BlockID.blackcobblestone, 1, 0]];
    }
       return []
    });
Block.registerDropFunction("redstone", function(coords, id, data, level){ 
    if(level>1){
        return [[BlockID.redcobblestone, 1, 0]];
    }
       return []
    });
Block.registerDropFunctionForID(17, function(coords, id, data, level){ 
        return [[5, 2, data]];
    });
Block.registerDropFunctionForID(162, function(coords, id, data, level){ 
        return [[5, 2, data+4]];
    });
});

if(industrial_craft){
ATGen.StandartOreDeposite(BlockID.oreCopper, 0, 3, 24, 64, 100, 16);
ATGen.StandartOreDeposite(BlockID.oreTin, 0, 3, 18, 52, 100, 16);
}

ATGen.StandartOreDeposite(BlockID.blackstone, 0, 256, 48, 64, 2, 1);
ATGen.StandartOreDeposite(BlockID.redstone, 0, 256, 48, 64, 2, 1);




// file: recipes.js

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




