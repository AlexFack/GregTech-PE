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

var round = function(num, x){
	var multiplier = Math.pow(10, x)
	return Math.floor(num * multiplier) / multiplier
}


var random = function(min, max){
	return Math.floor(java.lang.Math.random() * (max - min + 1)) + min;
}

var rollPercentage = function(pr){
    return pr>=round(Math.random()*100, 2)
}

var industrial_craft = __config__.access("compability.industrial_craft") == true;
var furnaceRecipes = ATMech.furnaceRecipes
var furnaceFuel = ATMech.furnaceFuel

var ironTemp = 1600
var ironLong = 40

var goldTemp = 1000
var goldLong = 30

var copperTemp = 1000
var copperLong = 30

var tinTemp = 200
var tinLong = 10

var steelLong = 240
var steelTemp = 1600




// file: items/tools.js



CTR.RegisterHammer("Stone", 8, 2)
CTR.RegisterHammer("Iron", 256, 3)
CTR.RegisterHammer("Bronze", 128, 3)
//CTR.RegisterHammer("Gold", 32)
CTR.RegisterHammer("Steel", 512, 4)
CTR.RegisterHammer("Diamond", 1024, 4)

CTR.RegisterCutter("Iron", 256)
CTR.RegisterCutter("Bronze", 128)
//CTR.RegisterCutter("Gold", 32)
CTR.RegisterCutter("Steel", 512)

CTR.RegisterFile("Iron", 256)
CTR.RegisterFile("Bronze", 128)
//CTR.RegisterTungstensteel("Gold", 32)
CTR.RegisterFile("Steel", 512)

CTR.RegisterMortar("Stone", 8)
CTR.RegisterMortar("Iron", 256)
CTR.RegisterMortar("Bronze", 128)
//CTR.RegisterMortar("Gold", 32)
CTR.RegisterMortar("Steel", 512)

CTR.RegisterWrench("Iron", 256)
CTR.RegisterWrench("Bronze", 128)
//CTR.RegisterWrench("Gold", 32)
CTR.RegisterWrench("Steel", 512)
CTR.RegisterWrench("Lead", 128)
CTR.RegisterWrench("Silver", 128)

CTR.RegisterScrewdriver("Iron", 256)
CTR.RegisterScrewdriver("Bronze", 128)
//CTR.RegisterScrewdriver("Gold", 32)
CTR.RegisterScrewdriver("Steel", 512)
CTR.RegisterScrewdriver("Lead", 128)
CTR.RegisterScrewdriver("Silver", 128)
	
var hammers = ATMat.hammers
var files = ATMat.files
var mortars = ATMat.mortars
var cutters = ATMat.cutters
var wrenchs = ATMat.wrenchs
var screwdrivers = ATMat.screwdrivers
	
Callback.addCallback("PostLoaded", function(){
	var A = ATMat
	for(var key1 in A.gems){
		for(var key2 in A.hammers){
		    if(A.gems[key1].mat == A.hammers[key2].mat){
		        Recipes.addShaped({id:A.hammers[key2].id, count:1, data:0}, ["aa ", "aab", "aa"], ['a', A.gems[key1].id, 0, 'b', 280, 0]);
		    }
        }
    }
    for(var key1 in A.plates){
    	for(var key2 in A.cutters){
            	if(A.plates[key1].mat == A.cutters[key2].mat){
                    CreateRecipeWithTool({id:A.cutters[key2].id, count:1, data:0}, ["d d", "fdh", "c c"], ['c', 280, 0, 'd', A.plates[key1].id, 0], [hammers, files]);
                }
            }
        for(var key2 in A.wrenchs){
            	if(A.plates[key1].mat == A.wrenchs[key2].mat){
                    CreateRecipeWithTool({id:A.wrenchs[key2].id, count:1, data:0}, ["aha", "aaa", " a "], ['a', A.plates[key1].id, 0], [hammers]);
                }
            }
    }
    for(var key1 in A.ingots){
		for(var key2 in A.hammers){
			if(A.ingots[key1].mat == A.hammers[key2].mat){
			    Recipes.addShaped({id:A.hammers[key2].id, count:1, data:0}, ["aa ", "aab", "aa"], ['a', A.ingots[key1].id, 0, 'b', 280, 0]);
            }
        }
        for(var key2 in A.mortars){
        	if(A.ingots[key1].mat == A.mortars[key2].mat){
                CreateRecipeWithTool({id:A.mortars[key2].id, count:1, data:0}, [" h ", "cac", " c "], ['a', A.ingots[key1].id, 0, 'c', 1, 0], [hammers])
            }
        }
        for(var key2 in A.files){
        	if(A.ingots[key1].mat == A.files[key2].mat){
                CreateRecipeWithTool({id:A.files[key2].id, count:1, data:0}, ["a ", "ah", "b "], ['a', A.ingots[key1].id, 0, 'b', 280, 0], [hammers])
            }
        }
        for(var key3 in A.plates){
            for(var key2 in A.screwdrives){
            	if(A.ingots[key1].mat == A.screwdrives[key2].mat && A.plates[key3].mat == A.screwdrives[key2].mat){
            	    CreateRecipeWithTool({id:A.screwdrives[key2].id, count:1, data:0}, ["af", "dh", "c "], ['a', A.ingots[key1].id, 0, 'c', 280, 0, 'd', A.plates[key3].id, 0], [hammers, files])
                }
            }
        }
    }
})


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

var cwood = {durability: 12, level: 1, efficiency:4, damage: 2, enchantability: 16};
var cstone = {durability: 38, level: 2, efficiency:5, damage: 2, enchantability: 16};

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

var metalls =                      {isDust:true, isIngot:true, isPlate:true, isNugget:true, isSmallDust:true, isBolt:true, isModule:true, generateRecipes:true}
var metalls_non_module = {isDust:true, isIngot:true, isPlate:true, isNugget:true, isSmallDust:true, generateRecipes:true}
var metalls_with_ore =       {isDust:true, isIngot:true, isPlate:true, isNugget:true, isSmallDust:true, isLittleOre:true, generateRecipes:true}

var stones = {isDust:true, isSmallDust:true, isLittleOre:true, generateRecipes:true}

var iron = {isDust:true, isPlate:true, isNugget:true, isSmallDust:true, isBolt:true, isLittleOre:true, isModule:true, generateRecipes:true}
var gold = {isDust:true, isPlate:true, isNugget:false, isSmallDust:true, isLittleOre:true, generateRecipes:true}

var gems = {idDust:true, isDust:true, isSmallDust:true, isGem:true, generateRecipes:true}

ATMat.MaterialRegister("Coal", {isDust:true})
ATMat.MaterialRegister("Redstone", {isDust:true})
ATMat.MaterialRegister("Lapis", {isDust:true})

ATMat.MaterialRegister("Stone", stones)
ATMat.MaterialRegister("RedGranit", stones)
ATMat.MaterialRegister("BlackGranit", stones)

ATMat.MaterialRegister("Steel", metalls, {temp:steelTemp, long:steelLong})
ATMat.MaterialRegister("Bronze", metalls, {temp:1000, long:30})
ATMat.MaterialRegister("Chrome", metalls, {temp:1900,  long:300})
ATMat.MaterialRegister("Aluminium", metalls, {temp:600, long:20})
ATMat.MaterialRegister("Titanium",  metalls, {temp:1600, long:240})
ATMat.MaterialRegister("Stainless", metalls, {temp:1800, long:260})
ATMat.MaterialRegister("Volfram", metalls, {temp:3400, long:400}) 

ATMat.MaterialRegister("Copper", metalls_with_ore, {temp:copperTemp, long:copperLong})
ATMat.MaterialRegister("Tin", metalls_with_ore, {temp:tinTemp, long:tinLong})

ATMat.MaterialRegister("Nikel",  metalls_non_module, {temp:1400, long:60})
ATMat.MaterialRegister("Antimony", metalls_non_module, {temp:1600, long:30})
ATMat.MaterialRegister("Silver", metalls_non_module, {temp:900, long:30})
ATMat.MaterialRegister("Lead", metalls_non_module, {temp:300, long:10})

ATMat.MaterialRegister("Iron", iron, {temp:ironTemp, long:ironLong})
ATMat.MaterialRegister("Gold", gold, {temp:goldTemp, long:goldLong})

ATMat.MaterialRegister("Diamond", gems, {temp:4000, long:100})
ATMat.MaterialRegister("Ruby", gems, {temp:2000, long:100})
ATMat.MaterialRegister("Saphire", gems, {temp:2300, long:100})
ATMat.MaterialRegister("Emerald", gems, {temp:1400, long:100})




// file: items/ids.js

//id items
var irhum = ItemID.IronHammer;
var irtung = ItemID.IronTungstensteel;
var mort = ItemID.StoneMortar;
var litst = ItemID.littleStone
var irpl = ItemID.plateIron;
var brpl = ItemID.plateBronze;
var gpl = ItemID.plateGold;
var litir = ItemID.littleIron
var litcopp = ItemID.littleCopper
var littin = ItemID.littleTin
var litg = ItemID.littleGold
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
ItemID.nuggetGold = 371
ItemID.ingotGold = 266
ItemID.ingotIron = 265
ItemID.coal = 263
 
var lava = ItemID.itemlava;




// file: items/other.js

//???
IDRegistry.genItemID("itemlava");
Item.createItem("itemlava", "item_lava", {name:"lava"}, {isTech:true})




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




// file: blocks/machines/compactedFurnace.js

var cFuelEffPct = __config__.access("furnacesOptions.compactedFurnaceFuelFlowEfficiencyPercent")
var cRecipesEffPct = __config__.access("furnacesOptions.compactedFurnaceRecipesEfficiencyPercent")
var cMaxTemp = __config__.access("furnacesOptions.compactedFurnaceMaxTemp")

//mechs
IDRegistry.genBlockID("compactedfurnace");
Block.createBlockWithRotation("compactedfurnace", [
	{name: "Cobb furnace", texture: [["compacted_stone", 0], ["compacted_stone", 0 ], ["compacted_stone", 0 ], ["furnace", 0], ["compacted_stone", 0 ], ["compacted_stone", 0 ]], inCreative: true}]);
IDRegistry.genBlockID("compactedcobblestone");
Block.createBlock("compactedcobblestone", [
{name: "Cobb furnace block", texture: [["compacted_stone", 0]], inCreative: true}]);

Block.registerDropFunction("compactedfurnace", function(coords, id, data, level){ 
	if(level>=1){
		return [[id, 1, data]]
	}
	return []
})

Block.registerDropFunction("compactedcobblestone", function(coords, id, data, level){ 
	if(level>=1){
		return [[id, 1, data]]
	}
	return []
})

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




// file: blocks/ores.js

//ores
var BLACK_STONE = Block.createSpecialType({
	base: 1,
	destroytime: 5,
	opaque: true,
	solid: true,
}, "ore");

var RED_STONE = Block.createSpecialType({
	base: 1,
	destroytime: 4,
	opaque: true,
	solid: true,
}, "ore");

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

    ATMat.OreRegister("Tetrahedrite", [["Copper", 1],  ["Chrome", 0], ["Nikel", 0], ["Gold", 0]], ["Stone", "RedGranite", "BlackGranite", "Nether", "End"], true)
    ATMat.OreRegister("Copper", [["Copper", 2],  ["Iron", 1], ["Nikel", 0], ["Stone", 2]], ["Stone"], true)
    ATMat.OreRegister("Tin", [["Tin", 2],  ["Nikel", 1], ["Iron", 0]], ["Stone", "RedGranite", "BlackGranite"], true)
    ATMat.OreRegister("Iron", [["Iron", 2], ["Nikel", 1], ["Stone", 2]], ["Stone"], true)
    ATMat.OreRegister("Lead", [["Lead", 2], ["Iron", 0], ["Tin", 0]], ["Stone", "End"], true)
    ATMat.OreRegister("Galena", [["Silver", 1], ["Lead", 1], ["Stone", 2]], ["Stone"], true)
    ATMat.OreRegister("Gold", [["Gold", 2], ["Silver", 1], ["Lead", 1]], ["Stone", "RedGranite", "BlackGranite", "Nether", "End"], true)
    ATMat.OreRegister("Coal", [], ["Stone"], true)
    ATMat.OreRegister("Bauxite", [["Titanium", 0], ["Aluminium", 1], ["Nikel", 1]], ["Stone"], true)    
    ATMat.OreRegister("Saphire", [["Saphire",1], ["Lapis", 2]], ["Stone", "RedGranite", "BlackGranite"], true)
    ATMat.OreRegister("Ruby", [["Ruby", 2], ["Ruby", 1], ["Chrome", 0]], ["Stone", "RedGranite", "BlackGranite"], true)
    ATMat.OreRegister("Emerald", [["Emerald", 2], ["Emerald", 1]], ["RedGranite", "BlackGranite", "End"], true)
    ATMat.OreRegister("Diamond", [["Diamond", 2], ["Diamond", 1], ["Stone", 2]], ["Stone"], true)
    ATMat.OreRegister("Redstone", [], ["Stone"], true)
    ATMat.OreRegister("Magnetite", [["Iron", 1], ["Gold", 0], ["Magnetite", 2]], ["Stone", "BlackGranite"], true)
    ATMat.OreRegister("Volfram", [["Volfram", 2], ["Silver", 1], ["Lead", 1]], ["Stone", "BlackGranite"], true)
    ATMat.OreRegister("Lapis", [["Lapis", 2], ["Saphire", 0]], ["BlackGranite", "RedGranite", "End"], true)
    
//GenerateChunk, GenerateNetherChunk, GenerateEndChunk
var generateChance = function(c){
	return c
}

ATGen.genBreed(BlockID.blackstone, 0, 16, 5, 16, 32, -1, [
[BlockID.oreMagnetiteBlackGranite, BlockID.oreVolframBlackGranite, BlockID.oreVolframBlackGranite, BlockID.oreMagnetiteBlackGranite],
[BlockID.oreTetrahedriteBlackGranite, BlockID.oreTinBlackGranite, BlockID.oreTetrahedriteBlackGranite, BlockID.oreTinBlackGranite],
[BlockID.oreTetrahedriteBlackGranite, BlockID.oreGoldBlackGranite, BlockID.oreTinBlackGranite, BlockID.oreTetrahedriteBlackGranite],
])

ATGen.genBreed(BlockID.redstone, 0, 16, 5, 16, 32, -1, [
[BlockID.oreLapisRedGranite, BlockID.oreSaphireRedGranite, BlockID.oreLapisRedGranite, BlockID.oreSaphireRedGranite],
[BlockID.oreTetrahedriteRedGranite, BlockID.oreTinRedGranite, BlockID.oreTetrahedriteRedGranite, BlockID.oreTinRedGranite],
])

var tileTemplate = [1, 14, 15, 16, 56, 73, 74, 129, 21]
//var tileTemplate = [0]

ATGen.LargeOreDeposite(BlockID.oreMagnetiteStone, BlockID.oreIronStone, BlockID.oreIronStone, BlockID.oreMagnetiteStone, (20), tileTemplate, 48, 64, "GenerateChunk", {x:25, z:25}, 25, 1)
ATGen.LargeOreDeposite(BlockID.oreMagnetiteStone, BlockID.oreCopperStone, BlockID.oreTetrahedriteStone, BlockID.oreTinStone, (20), tileTemplate, 48, 64, "GenerateChunk", {x:25, z:25}, 25, 1)
ATGen.LargeOreDeposite(BlockID.oreMagnetiteStone, BlockID.oreGoldStone, BlockID.oreGoldStone, BlockID.oreMagnetiteStone, (5), tileTemplate, 20, 40, "GenerateChunk", {x:25, z:25}, 25, 1)
ATGen.LargeOreDeposite(BlockID.oreCoalStone, BlockID.oreCoalStone, BlockID.oreCoalStone, BlockID.oreCoalStone, (20), tileTemplate, 48, 64, "GenerateChunk", {x:25, z:25}, 25, 1)
ATGen.LargeOreDeposite(BlockID.oreTinStone, BlockID.oreSilverStone, BlockID.oreLeadStone, BlockID.oreGalenaStone, (15), tileTemplate, 48, 64, "GenerateChunk", {x:25, z:25}, 25, 1)
ATGen.LargeOreDeposite(BlockID.oreBauxiteStone, BlockID.oreIronStone, BlockID.oreIronStone, BlockID.oreBauxiteStone, (10), tileTemplate, 32, 40, "GenerateChunk", {x:25, z:25}, 25, 1)

ATGen.LargeOreDeposite(BlockID.oreCoalStone, BlockID.oreDiamondStone, BlockID.oreDiamondStone, BlockID.oreCoalStone, (5), tileTemplate, 10, 20, "GenerateChunk", {x:15, z:15}, 25, 1)
ATGen.LargeOreDeposite(BlockID.oreRedstoneStone, BlockID.oreRubyStone, BlockID.oreRubyStone, BlockID.oreRedstoneStone, (5), tileTemplate, 10, 20, "GenerateChunk", {x:15, z:15}, 25, 1)
ATGen.LargeOreDeposite(BlockID.oreSaphireStone, BlockID.oreSaphireStone, BlockID.oreSaphireStone, BlockID.oreSaphireStone, (5), tileTemplate, 10, 20, "GenerateChunk", {x:5, z:5}, 25, 1)
ATGen.LargeOreDeposite(BlockID.oreRedstoneStone, BlockID.oreRedstoneStone, BlockID.oreRedstoneStone, BlockID.oreRedstoneStone, (15), tileTemplate, 10, 20, "GenerateChunk", {x:15, z:15}, 25, 1)

ATGen.LargeOreDeposite(BlockID.oreGoldNether, BlockID.oreGoldNether, BlockID.oreGoldNether, BlockID.oreGoldNether, (10), [87], 0, 128, "GenerateNetherChunk", {x:10, z:10}, 33, 2)
ATGen.LargeOreDeposite(BlockID.oreMagnetiteStone, BlockID.oreCopperStone, BlockID.oreTetrahedriteStone, BlockID.oreTinStone, (20), tileTemplate, 0, 128, "GenerateNetherChunk", {x:10, z:10}, 33, 2)

ATGen.LargeOreDeposite(BlockID.oreLapisEnd, BlockID.oreLapisEnd, BlockID.oreEmeraldEnd, BlockID.oreLapisEnd, (20), [121], 32, 64, "GenerateEndChunk", {x:20, z:20}, 25, 1)
ATGen.LargeOreDeposite(BlockID.oreLeadEnd, BlockID.oreGoldEnd, BlockID.oreGoldEnd, BlockID.oreTetrahedriteEnd, (20), [121], 32, 64, "GenerateEndChunk", {x:20, z:20}, 25, 1)

//drop ores
Block.registerDropFunctionForID(14, function(coords, id, data, level){ 
    if(level>=1){
        return [[4, 1, 0]];
    }
       return []
    });
Block.registerDropFunctionForID(15, function(coords, id, data, level){ 
    if(level>=1){
        return [[4, 1, 0]];
    }
       return []
    });
Block.registerDropFunctionForID(16, function(coords, id, data, level){ 
    if(level>=1){
        return [[4, 1, 0]];
    }
       return []
    });
Block.registerDropFunctionForID(56, function(coords, id, data, level){ 
    if(level>=1){
        return [[4, 1, 0]];
    }
       return []
    });
Block.registerDropFunctionForID(73, function(coords, id, data, level){ 
    if(level>=1){
        return [[4, 1, 0]];
    }
       return []
    });
Block.registerDropFunctionForID(74, function(coords, id, data, level){ 
    if(level>=1){
        return [[4, 1, 0]];
    }
       return []
    });
Block.registerDropFunctionForID(129, function(coords, id, data, level){ 
    if(level>=1){
        return [[4, 1, 0]];
    }
       return []
    });
Block.registerDropFunctionForID(153, function(coords, id, data, level){ 
    if(level>=1){
        return [[87, 1, 0]];
    }
       return []
    });
Block.registerDropFunctionForID(21, function(coords, id, data, level){ 
    if(level>=1){
        return [[4, 1, 0]];
    }
       return []
    });
Block.registerDropFunction("oreCopper", function(coords, id, data, level){ 
    if(level>=2){
        return [[litcopp, 1, 0], [litst, 3, 0]];
    }
       return []
    });
Block.registerDropFunction("oreTin", function(coords, id, data, level){ 
    if(level>=2){
        return [[littin, 1, 0], [litst, 3, 0]];
    }
       return []
    });
Block.registerDropFunction("blackstone", function(coords, id, data, level){ 
    if(level>=4){
        return [[BlockID.blackcobblestone, 1, 0]];
    }
       return []
    });
Block.registerDropFunction("redstone", function(coords, id, data, level){ 
    if(level>=3){
        return [[BlockID.redcobblestone, 1, 0]];
    }
       return []
    });
Block.registerDropFunctionForID(17, function(coords, id, data, level){ 
        return [[5, 2, data]];
    });
Block.registerDropFunctionForID(162, function(coords, id, data, level){ 
        return [[5, 2, data+4]];
    })
Block.registerDropFunction("oreCoalStone", function(coords, id, data, level){ 
    if(level>=1){
        return [[263, 1, 0], [litst, 3, 0]];
    }
       return []
    })
Block.registerDropFunction("oreRedstoneStone", function(coords, id, data, level){ 
    if(level>=1){
        return [[331, random(3, 5), 0], [ItemID.smallDustRuby, 1, 0], [litst, 1, 0]];
    }
       return []
    })
Block.registerDropFunction(1, function(coords, id, data, level){ 
    if(level>=1&&data==0&&rollPercentage(5)){
        return [[litst, 4, 0]];
    }else if(level>=1&&data==0){
    	//Game.message(data)
    	return[[4, 1, 0]]
    }
    if(level>=1){
    	//Game.message(data)
    	return[[id, 1, data]]
    }
    return []
    })




// file: recipes.js

ATMech.FurnaceRecipe ({sS1:[ItemID.ingotIron, 1, 0], sS2:[ItemID.dustCoal, 1, 0], rS1:[igst, 1, 0], long:steelLong, temp:steelTemp});
ATMech.FurnaceRecipe ({sS1:[1, 1, 1], rS1:[ItemID.nuggetCopper, 2, 0], rS2:[ItemID.littleStone, 4, 0], long:copperLong*2, temp:copperTemp});
ATMech.FurnaceRecipe ({sS1:[1, 1, 3], rS1:[ItemID.nuggetTin, 2, 0], rS2:[ItemID.littleStone, 4, 0], long:tinLong*2, temp:tinTemp});
ATMech.FurnaceRecipe ({sS1:[1, 1, 5], rS1:[ItemID.nuggetIron, 2, 0], rS2:[ItemID.littleStone, 4, 0], long:ironLong*2, temp:ironTemp});

ATMech.Fuel({id:173, data:0, second: 135, f:1});
ATMech.Fuel({id:263, data:0, second: 15, f:1});
ATMech.Fuel({id:263, data:1, second: 15, f:1});
ATMech.Fuel({id:ItemID.dustCoal, data:0, second:30, f:1});
ATMech.Fuel({id:5, data:0, second: 7.5, f:1});
ATMech.Fuel({id:5, data:1, second: 7.5, f:1});
ATMech.Fuel({id:5, data:2, second: 7.5, f:1});
ATMech.Fuel({id:5, data:3, second: 7.5, f:1});
ATMech.Fuel({id:5, data:4, second: 7.5, f:1});
ATMech.Fuel({id:5, data:5, second: 7.5, f:1});

Recipes.addFurnaceFuel(ItemID.dustCoal, 0, 3200);

Recipes.ReplaceWithShaped = function(item, newRecipe, transcript, tool){
	Recipes.deleteRecipe(item)
	Recipes.addShaped(item, newRecipe, transcript, tool);
}

Recipes.ReplaceWithShapeless = function(item, newRecipe, transcript, tool){
	Recipes.deleteRecipe(item);
	Recipes.addShapeless(item, newRecipe, transcript, tool);
}

//coal dust 
CreateShapelessRecipeWithTool({id:ItemID.dustCoal, count:1, data:0}, [{id:ItemID.coal, data:0}], mortars)

//steel dust
Recipes.addShapeless({id:ItemID.dustSteel, count:1, data:0}, [{id:ItemID.dustIron, data:0}, {id:ItemID.dustCoal, data:0}])

//bronze dust
Recipes.ReplaceWithShapeless({id:ItemID.dustBronze, count:4, data:0}, [{id:ItemID.dustCopper, data:0}, {id:ItemID.dustCopper, data:0}, {id:ItemID.dustCopper, data:0}, {id:ItemID.dustTin, data:0}])
 
 //cobblestone
CreateRecipeWithTool({id:4, count:1, data:0}, [
	"h ",
	"bb",
	"bb"
], ['b', litst, 0], [hammers]); 

//little stones
CreateShapelessRecipeWithTool({id:litst, count:4, data:0}, [{id:4, data:0}], hammers)

//replaced recipes
Callback.addCallback("PostLoaded", function(){

ReplaceRecipeWithTool({id:306, count:1, data:0}, [
"ppp",
"php"
], ['p', irpl, 0], [hammers]);

ReplaceRecipeWithTool ({id:307, count:1, data:0}, [
"php",
"ppp",
"ppp"
], ['p', irpl, 0], [hammers])

ReplaceRecipeWithTool ({id:308, count:1, data:0}, [
"ppp",
"php",
"p p"
], ['p', irpl, 0], [hammers])

ReplaceRecipeWithTool ({id:309, count:1, data:0}, [
"php",
"p p"
], ['p', irpl, 0], [hammers]);

ReplaceRecipeWithTool({id:314, count:1, data:0}, [
"ppp",
"php"
], ['p', gpl, 0], [hammers] );

ReplaceRecipeWithTool ({id:315, count:1, data:0}, [
"php",
"ppp",
"ppp"
], ['p', gpl, 0], [hammers] )

ReplaceRecipeWithTool ({id:316, count:1, data:0}, [
"ppp",
"php",
"p p"
], ['p', gpl, 0], [hammers] )

ReplaceRecipeWithTool ({id:317, count:1, data:0}, [
"php",
"p p"
], ['p', gpl, 0], [hammers] )

ReplaceRecipeWithTool ({id:267, count:1, data:0}, [
"ph",
"pf",
"s "
], ['p', irpl, 0, 'i', 265, 0, 's', 280, 0], [hammers, files]);

ReplaceRecipeWithTool ({id:257, count:1, data:0}, [
"pii",
"fsh",
" s "
], ['p', irpl, 0, 'i', 265, 0, 's', 280, 0], [hammers, files]);

ReplaceRecipeWithTool ({id:258, count:1, data:0}, [
"pih",
"ps ",
"fs "
], ['p', irpl, 0, 'i', 265, 0, 's', 280, 0], [hammers, files]);

ReplaceRecipeWithTool ({id:292, count:1, data:0}, [
"pih",
"fs ",
" s "
], ['p', irpl, 0, 'i', 265, 0, 's', 280, 0], [hammers, files]);

ReplaceRecipeWithTool ({id:285, count:1, data:0}, [
"pii",
"fsh",
" s "
], ['p', gpl, 0, 'i', 266, 0, 's', 280, 0], [hammers, files]);

ReplaceRecipeWithTool ({id:286, count:1, data:0}, [
"pih",
"ps ",
"fs "
], ['p', gpl, 0, 'i', 266, 0, 's', 280, 0], [hammers, files]);

ReplaceRecipeWithTool ({id:294, count:1, data:0}, [
"pih",
"fs ",
" s "
], ['p', gpl, 0, 'i', 266, 0, 's', 280, 0], [hammers, files] );

if(industrial_craft){
ReplaceRecipeWithTool({id: ItemID.bronzeHelmet, count: 1, data: 0}, [
	"xxx",
	"xhx"
], ['x', ItemID.plateBronze, 0], [hammers]);

ReplaceRecipeWithTool({id: ItemID.bronzeChestplate, count: 1, data: 0}, [
	"xhx",
	"xxx",
	"xxx"
], ['x', ItemID.plateBronze, 0], [hammers]);

ReplaceRecipeWithTool({id: ItemID.bronzeLeggings, count: 1, data: 0}, [
	"xxx",
	"xhx",
	"x x"
], ['x', ItemID.plateBronze, 0], [hammers]);

ReplaceRecipeWithTool({id: ItemID.bronzeBoots, count: 1, data: 0}, [
	"xhx",
	"x x"
], ['x', ItemID.plateBronze, 0], [hammers]);

ReplaceRecipeWithTool ({id:ItemID.bronzePickaxe, count:1, data:0}, [
"pii",
"fsh",
" s "
], ['p', ItemID.plateBronze, 0, 'i', ItemID.ingotBronze, 0, 's', 280, 0], [hammers, files]);

ReplaceRecipeWithTool ({id:ItemID.bronzeAxe, count:1, data:0}, [
"pih",
"ps ",
"fs "
], ['p', ItemID.plateBronze, 0, 'i', ItemID.ingotBronze, 0, 's', 280, 0], [hammers, files]);

ReplaceRecipeWithTool ({id:ItemID.bronzeHoe, count:1, data:0}, [
"pih",
"fs ",
" s "
], ['p', ItemID.plateBronze, 0, 'i', ItemID.ingotBronze, 0, 's', 280, 0], [hammers, files]);

ReplaceRecipeWithTool ({id:ItemID.bronzeSword, count:1, data:0}, [
"ph",
"ptf",
"s "
], ['p', ItemID.plateBronze, 0, 'i', ItemID.ingotBronze, 0, 's', 280, 0], [hammers, files]);

ReplaceRecipeWithTool ({id:ItemID.bronzeShovel, count:1, data:0}, [
"pf",
"s ",
"s "
], ['p', ItemID.plateBronze, 0, 'i', ItemID.ingotBronze, 0, 's', 280, 0], [files]);
}

ReplaceRecipeWithTool ({id:256, count:1, data:0}, [
"pf",
"s ",
"s "
], ['p', irpl, 0, 'i', 265, 0, 's', 280, 0], [files]);

ReplaceRecipeWithTool ({id:283, count:1, data:0}, [
"p ",
"ph",
"s "
], ['p', gpl, 0, 'i', 266, 0, 's', 280, 0], [hammers]);

ReplaceRecipeWithTool ({id:284, count:1, data:0}, [
"pf",
"s ",
"s "
], ['p', gpl, 0, 'i', 266, 0, 's', 280, 0], [files]);

Recipes.ReplaceWithShaped({id:276, count:1, data:0}, [
	"a",
	"a",
	"b"
], ['a', ItemID.gemDiamond, 0, 'b', 280, 0])

Recipes.ReplaceWithShaped({id:277, count:1, data:0}, [
	"a",
	"b",
	"b"
], ['a', ItemID.gemDiamond, 0, 'b', 280, 0]); 

Recipes.ReplaceWithShaped({id:278, count:1, data:0}, [
	"aaa",
	" b ",
	" b "
], ['a', ItemID.gemDiamond, 0, 'b', 280, 0]); 

Recipes.ReplaceWithShaped({id:279, count:1, data:0}, [
	"aa",
	"ab",
	" b"
], ['a', ItemID.gemDiamond, 0, 'b', 280, 0]) 

Recipes.ReplaceWithShaped({id:293, count:1, data:0}, [
	"aa",
	" b",
	" b"
], ['a', ItemID.gemDiamond, 0, 'b', 280, 0]); 

Recipes.ReplaceWithShaped({id:310, count:1, data:0}, [
	"aaa",
	"a a"
], ['a', ItemID.gemDiamond, 0]); 

Recipes.ReplaceWithShaped({id:311, count:1, data:0}, [
	"a a",
	"aaa",
	"aaa"
], ['a', ItemID.gemDiamond, 0]); 

Recipes.ReplaceWithShaped({id:312, count:1, data:0}, [
	"aaa",
	"a a",
	"a a"
], ['a', ItemID.gemDiamond, 0]); 

Recipes.ReplaceWithShaped({id:313, count:1, data:0}, [
	"a a",
	"a a"
], ['a', ItemID.gemDiamond, 0]); 

})

//deleted recipes
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

Recipes.deleteRecipe({id:266, count:1, data:0});

Recipes.deleteRecipe({id:ItemID.plateGold, count:1, data:0})
Recipes.deleteRecipe({id:ItemID.craftingHammer, count:1, data:0});
Recipes.deleteRecipe({id:ItemID.craftingCutter, count:1, data:0});

//wool
Recipes.addShapeless({id:287, count:4, data:0}, [{id:35, data:-1}]); 

//planks
for(var i = 0; i<3; i++){
    Recipes.addShaped({id:17, count:1, data:i}, ["aa", "aa", "  a"], ['a', 5, i]); 
}
Recipes.addShaped({id:162, count:1, data:0}, ["aa", "aa", "  a"], ['a', 5, 4]); 
Recipes.addShaped({id:162, count:1, data:1}, ["aa", "aa", "  a"], ['a', 5, 5]); 

//torch
Recipes.addShaped({id:50, count:4, data:0}, [
	"a",
	"b"
], ['a', ItemID.dustCoal, 0, 'b', 280, 0]); 

//furnace
Recipes.ReplaceWithShaped({id:61, count:1, data:0}, [
"bbb",
"b b",
"bbb"
], ['b', litst, 0]);

//cobb furnace and blocks
CreateRecipeWithTool({id:BlockID.compactedfurnace, count:1, data:0}, [
	" h ",
	"bfb",
	"ggg"
], ['b', c, 0, 'f', 61, 0, 'g', 82, 0], [hammers]); 

CreateRecipeWithTool({id:c, count:1, data:0}, [
	"h ",
	"bb",
	"bb"
], ['b', 1, 0], [hammers]); 

//blast furnace and blocks
Recipes.addShaped({id:BlockID.blastfurnace, count:1, data:0}, [
	"bmb",
	"mfm",
	"bmb"
], ['b', brbolt, 0, 'm', brmod, 0, 'f', BlockID.compactedfurnace, 0]); 

CreateRecipeWithTool({id:b, count:1, data:0}, [
	"pmp",
	"bwb",
	"pmp"
], ['p', brpl, 0, 'b', brbolt, 0, 'm', brmod, 0], [wrenchs]); 

//tools
CreateRecipeWithTool({id:ItemID.stonepickaxe, count:1, data:0}, [
	"bbb",
	"psh",
	" s "
], ['b', litst, 0, 's', 280, 0, 'p', 287, 0], [hammers]); 

CreateRecipeWithTool({id:ItemID.stonesword, count:1, data:0}, [
	"bh",
	"bp",
	"s "
], ['b', litst, 0, 's', 280, 0, 'p', 287, 0], [hammers]); 

CreateRecipeWithTool({id:ItemID.stoneaxe, count:1, data:0}, [
	"bbh",
	"bsp",
	" s "
], ['b', litst, 0, 's', 280, 0, 'p', 287, 0], [hammers]); 

CreateRecipeWithTool({id:ItemID.stoneshovel, count:1, data:0}, [
	"pbh",
	" s ",
	" s "
], ['b', litst, 0, 's', 280, 0, 'p', 287, 0], [hammers]); 

CreateRecipeWithTool({id:ItemID.stonehoe, count:1, data:0}, [
	"pbt",
	" s ",
	" s "
], ['b', litst, 0, 's', 280, 0, 'p', 287, 0], [hammers]); 

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

//craft tools
Recipes.addShaped({id:ItemID.StoneHammer, count:1, data:0}, ["aa ", "aab", "aa"], ['a', litst, 0, 'b', 280, 0]);

CreateRecipeWithTool({id:ItemID.StoneMortar, count:1, data:0}, [" h ", "cac", " c "], ['a', litst, 0, 'c', 1, 0], [hammers])

Recipes.addShaped({id:ItemID.IronHammer, count:1, data:0}, [
	"ii ",
	"iis",
	"ii "
], ['i', 265, 0, 's', 280, 0]); 

CreateRecipeWithTool({id:ItemID.IronFile, count:1, data:0}, [
    "a ",
    "bh",
    "c "
    ], ['a', 265, 0, 'b', irpl, 0, 'c', 280, 0], [hammers])
    
CreateRecipeWithTool({id:ItemID.IronCutter, count:1, data:0}, [
    "a a",
    "fah",
    "b b"
    ], ['a', irpl, 0, 'b', 280, 0], [hammers, files])
    
CreateRecipeWithTool({id:ItemID.IronWrench, count:1, data:0}, ["aha", "aaa", " a "], ['a', ItemID.plateIron, 0], [hammers]);

CreateRecipeWithTool({id:ItemID.IronScrewdriver, count:1, data:0}, ["a ", "dh", "c "], ['a', ItemID.ingotIron, 0, 'c', 280, 0, 'd', ItemID.plateIron, 0], [hammers, files])
    
CreateRecipeWithTool({id:ItemID.IronMortar, count:1, data:0}, [" h ", "cac", " c "], ['a', 265, 0, 'c', 1, 0], [hammers]) 

//iron
CreateShapelessRecipeWithTool({id:ItemID.nuggetIron, count:9, data:0}, [{id:265, data:0}], hammers);
CreateShapelessRecipeWithTool({id:ItemID.boltIron, count:1, data:0}, [{id:ItemID.nuggetIron, data:0}], files)
ReplaceRecipeWithTool({id:ItemID.plateIron, count:1, data:0}, ["h", "a", "a"], ['a', 265, 0], [hammers])

ATMech.FurnaceRecipe ({sS1:[ItemID.dustIron, 1, 0], rS1:[265, 1, 0], long:ironLong, temp:ironTemp});
ATMech.FurnaceRecipe ({sS1:[ItemID.nuggetIron, 9, 0], rS1:[265, 1, 0], long:ironLong, temp:ironTemp});

//gold
ReplaceShapelessRecipeWithTool({id:ItemID.nuggetGold, count:9, data:0}, [{id:266, data:0}], hammers);
CreateRecipeWithTool({id:ItemID.plateGold, count:1, data:0}, ["h", "a", "a"], ['a', 266, 0], [hammers])

ATMech.FurnaceRecipe ({sS1:[ItemID.dustGold, 1, 0], rS1:[266, 1, 0], long:goldLong, temp:goldTemp});
ATMech.FurnaceRecipe ({sS1:[ItemID.nuggetGold, 9, 0], rS1:[266, 1, 0], long:goldLong, temp:goldTemp});
ATMech.FurnaceRecipe ({sS1:[ItemID.smallDustGold, 9, 0], rS1:[ItemID.nuggetGold, 1, 0], long:goldLong/9, temp:goldTemp});

//configs
Callback.addCallback("PostLoaded", function(){
if(industrial_craft){
Recipes.removeFurnaceRecipe(265, -1);
Recipes.removeFurnaceRecipe(ItemID.dustBronze, -1);
Recipes.removeFurnaceRecipe(ItemID.dustCopper, -1);
Recipes.removeFurnaceRecipe(ItemID.dustIron, -1);
Recipes.removeFurnaceRecipe(ItemID.dustGold, -1);
}
}); 




