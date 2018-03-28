/*
BUILD INFO:
  dir: dev
  target: main.js
  files: 38
*/



// file: common/header.js

IMPORT("ToolType", "*");
IMPORT("Chemistry", "*");
IMPORT("SoundAPI", "*");
IMPORT("energylib", "*");

var EU = EnergyTypeRegistry.assureEnergyType("Eu", 1);
var ST = EnergyTypeRegistry.assureEnergyType("St", 1);
var explode = ModAPI.requireGlobal("Level.explode");
var setLoadingTip = ModAPI.requireGlobal("MCSystem.setLoadingTip");

LiquidRegistry.registerLiquid("steam", "Steam", ["fluid_steam_bg"]);

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




// file: common/config.js

let vanileFurnaceTemp = __config__.getNumber("vanileFurnaceTemp")

let Config = {
	//cobbleFurnaceRecEff: __config__.getNumber("furnaces.cobbFurnaceRecEff"),
	//cobbleFurnaceFuelEff: __config__.getNumber("furnaces.cobbFurnaceFuelEff"),
	//cobbleFurnaceMaxTemp: __config__.getNumber("furnaces.cobbFurnaceMaxTemp"),
	
	//blastFurnaceRecEff: __config__.getNumber("furnaces.blastFurnaceRecEff"),
	//blastFurnaceFuelEff: __config__.getNumber("furnaces.blastFurnaceFuelEff"),
	//blastFurnaceMaxTemp: __config__.getNumber("furnaces.blastFurnaceMaxTemp"),
	
	//indFurnaceRecEff: __config__.getNumber("furnaces.indFurnaceRecEff"),
	//indFurnaceFuelEff: __config__.getNumber("furnaces.indFurnaceFuelEff"),
	//StandartCasingTemp: __config__.getNumber("furnaces.StandartCasingTemp"),
	//ReinforcedCasingTemp: __config__.getNumber("furnaces.ReinforcedCasingTemp"),
	//AdvancedCasingTemp: __config__.getNumber("furnaces.AdvancedCasingTemp"),

	limit: __config__.getNumber("generation.checkChanceLimit"),
	chunkNumForGen: __config__.getNumber("generation.chunkNumForGen"),
	genChanceForBreed: __config__.getNumber("generation.genChanceForBreed"),
	smallOresMinY: __config__.getNumber("generation.smallOresMinY"),
	smallOresMaxY: __config__.getNumber("generation.smallOresMaxY"),
	smallOresCount: __config__.getNumber("generation.smallOresCount"),
	smallOresTiles: __config__.getNumber("generation.smallOresTiles"),
	chanceMultiplier: __config__.getNumber("generation.chanceMultiplier"),
}




// file: api/util/GT_Recipe.js

ItemID.ingotIron = 265;
ItemID.ingotGold = 266;

function strongIfForTools(lvl, i){
	let gg = null;
	for(var a = 0; a<i; a++){
		if(gg==null){
			gg = "tool_arr["+a+"][keys"+(a+1)+"].lvl>=lvl";
		}else{
			gg = gg + " && tool_arr["+a+"][keys"+(a+1)+"].lvl>=lvl";
		}
	}
    return gg;
}

var GT_Recipe = {
	ReplaceWithShaped: function(item, newRecipe, transcript, tool){
	   Recipes.deleteRecipe(item);
	   if(!tool){
		   Recipes.addShaped(item, newRecipe, transcript);
	   }
	   Recipes.addShaped(item, newRecipe, transcript, tool);
    },
	ReplaceWithShapeless: function(item, newRecipe, tool){
	   Recipes.deleteRecipe(item);
	   if(!tool){
		   Recipes.addShapeless(item, newRecipe);
	   }
	   Recipes.addShapeless(item, newRecipe, tool);
    },
	CreateRecipeWithTool: function(result, ing, tr, tool_arr, lvl){
	   let code;
	   let i = 0;
	   code = "for(var key = 0; key<tool_arr.length; key++){    ";
	   for(var key = 0; key<tool_arr.length; key++){
		   code = code + "for(var keys"+(key+1)+" in tool_arr["+key+"]){    ";
		   i++;
	   }
	   code = code + "if("+strongIfForTools(lvl, i)+"){    ";
	   for(let a = 0; a<i; a++){
		   code = code + "tr.push(tool_arr["+a+"][keys"+(a+1)+"].Symbol);    ";
		   code = code + "tr.push(tool_arr["+a+"][keys"+(a+1)+"].id);    ";
		   code = code + "tr.push(-1);    "
	   }
	   code = code + "Recipes.addShaped(result, ing, tr, GT_Tool.Tool);    ";
	   for(let a = 0; a<i+2; a++){
		   code = code + "}    "
	   }
	eval(code);
   },

   ReplaceRecipeWithTool: function(result, ing, tr, tool_arr, lvl){
	   Recipes.deleteRecipe(result);
       let code;
	   let i = 0;
	   code = "for(var key = 0; key<tool_arr.length; key++){    "
	   for(var key = 0; key<tool_arr.length; key++){
		   code = code + "for(var keys"+(key+1)+" in tool_arr["+key+"]){    ";
		   i++;
	   }
	   code = code + "if("+strongIfForTools(lvl, i)+"){    ";
	   for(let a = 0; a<i; a++){
		   code = code + "tr.push(tool_arr["+a+"][keys"+(a+1)+"].Symbol);    ";
		   code = code + "tr.push(tool_arr["+a+"][keys"+(a+1)+"].id);    ";
		   code = code + "tr.push(-1);    ";
	   }
	   code = code + "Recipes.addShaped(result, ing, tr, GT_Tool.Tool);    "
	   for(let a = 0; a<i+2; a++){
		   code = code + "}    ";
	   }
	   eval(code);
   },
   CreateShapelessRecipeWithTool: function(result, ing, tool, lvl){
       for(var keys in tool){
           for(var key in ing){  
        	   if(tool[keys].lvl>=lvl){
                   Recipes.addShapeless(result, [ing[key], {id:tool[keys].id, data:-1}], GT_Tool.Tool)
               }
           } 
       }
   },

   ReplaceShapelessRecipeWithTool: function(result, ing, tool, lvl){
	   Recipes.deleteRecipe(result)
       for(var keys in tool){
           for(var key in ing){  
        	   if(tool[keys].lvl>=lvl){
                   Recipes.addShapeless(result, [ing[key], {id:tool[keys].id, data:-1}], GT_Tool.Tool)
               }
           } 
       }
   },
   
   AlloySmelterRecipe:{
	recipe: [],
	
	add: function(obj){
		if(!obj) return;
		
		this.recipe.push(obj);
	},
	get: function(id1, count1, id2, coutn2){
		for(var rec in this.recipe){
			if(id1 == this.recipe[rec].slot1.id && id2 == this.recipe[rec].slot2.id){
				if(count1 >= this.recipe[rec].slot1.count && coutn2 >= this.recipe[rec].slot2.count){
					 return this.recipe[rec];
				}
			}
		}
	}
   },
   MaceratorRecipe: {
	   recipe: [],
	   add: function(result, recipe, adv, chance){
		   if(!result){result.id = 0; result.data = 0; result.count = 0;}
           if(!recipe){recipe.id = 0; recipe.data = 0; recipe.count = 0;}
           if(!adv){adv.long = 0; adv.lvl = 0;} 
           if(!chance){chance = null;}		   
           this.recipe.push({result : {id: result.id, data: result.data, count: result.count}, recipe: {id: recipe.id, data: recipe.data, count: recipe.count}, adv: {long: adv.long, lvl: adv.lvl}, chance: chance});
	   }	   
   },
   ForgeHammerRecipe: {
	   recipe: [],
	   add: function(result, recipe, adv){
		   if(!result){result.id = 0; result.data = 0; result.count = 0;}
           if(!recipe){recipe.id = 0; recipe.data = 0; recipe.count = 0;}
           if(!adv){adv.long = 0; adv.lvl = 0;}          
           this.recipe.push({result : {id: result.id, data: result.data, count: result.coutn}, recipe: {id: recipe.id, data: recipe.data, count: recipe.count}, adv: {long: adv.long, lvl: adv.lvl}});
	   }	   
   },
   CompressorRecipe: {
	   recipe: [],
	   add: function(result, recipe, adv){
		   if(!result){result.id = 0; result.data = 0; result.count = 0;}
           if(!recipe){recipe.id = 0; recipe.data = 0; recipe.count = 0;}
           if(!adv){adv.long = 0; adv.lvl = 0;} 	   
           this.recipe.push({result : {id: result.id, data: result.data, count: result.count}, recipe: {id: recipe.id, data: recipe.data, count: recipe.count}, adv: {long: adv.long, lvl: adv.lvl}});
	   }	   
   },
   BlastFurnaceRecipe: {
	   recipe: [],
	   add: function(result, recipe, adv){
		   if(!result){result.id = 0; result.data = 0; result.count = 0;}
           if(!recipe){recipe.id = 0; recipe.data = 0; recipe.count = 0;}
           if(!adv){adv.long = 0; adv.lvl = 0;} 	   
           this.recipe.push({result : {id: result.id, data: result.data, count: result.count}, recipe: {id: recipe.id, data: recipe.data, count: recipe.count}, adv: {long: adv.long, lvl: adv.lvl}});
	   }	   
   }
};

let CreateHelmetRecipe = function(id, mat, lvl){
   GT_Recipe.ReplaceRecipeWithTool({id:id, count:1, data:0}, [
   "ppp",
   "php"
   ], ['p', eval("ItemID.plate"+mat), 0], [GT_Material.hammers], lvl);
}

let CreateChestplateRecipe = function(id, mat, lvl){
   GT_Recipe.ReplaceRecipeWithTool ({id:id, count:1, data:0}, [
   "php",
   "ppp",
   "ppp"
   ], ['p', eval("ItemID.plate"+mat), 0], [GT_Material.hammers], lvl)
}

let CreateLeggingsRecipe = function(id, mat, lvl){
   GT_Recipe.ReplaceRecipeWithTool ({id:id, count:1, data:0}, [
   "ppp",
   "php",
   "p p"
   ], ['p', eval("ItemID.plate"+mat), 0], [GT_Material.hammers], lvl)
}

let CreateBootsRecipe = function(id, mat, lvl){
   GT_Recipe.ReplaceRecipeWithTool ({id:id, count:1, data:0}, [
   "php",
   "p p"
   ], ['p', eval("ItemID.plate"+mat), 0], [GT_Material.hammers], lvl);
}

let CreatePickaxeRecipe = function(id, mat, lvl){
   GT_Recipe.ReplaceRecipeWithTool ({id:id, count:1, data:0}, [
   "pii",
   "fsh",
   " s "
   ], ['p', eval("ItemID.plate"+mat), 0, 'i', eval("ItemID.ingot"+mat), 0, 's', 280, 0], [GT_Material.hammers, GT_Material.files], 2);
}

let CreateAxeRecipe = function(id, mat, lvl){
   GT_Recipe.ReplaceRecipeWithTool ({id:id, count:1, data:0}, [
   "pih",
   "ps ",
   "fs "
   ], ['p', eval("ItemID.plate"+mat), 0, 'i', eval("ItemID.ingot"+mat), 0, 's', 280, 0], [GT_Material.hammers, GT_Material.files], 2);
}

let CreateHoeRecipe = function(id, mat, lvl){
   GT_Recipe.ReplaceRecipeWithTool ({id:id, count:1, data:0}, [
   "pih",
   "fs ",
   " s "
   ], ['p', eval("ItemID.plate"+mat), 0, 'i', eval("ItemID.ingot"+mat), 0, 's', 280, 0], [GT_Material.hammers, GT_Material.files], 2);
}

let CreateSwordRecipe = function(id, mat, lvl){
   GT_Recipe.ReplaceRecipeWithTool ({id:id, count:1, data:0}, [
   "ph",
   "pf",
   "s "
   ], ['p', eval("ItemID.plate"+mat), 0, 'i', eval("ItemID.ingot"+mat), 0, 's', 280, 0], [GT_Material.hammers, GT_Material.files], 2);
}

let CreateShovelRecipe = function(id, mat, lvl){
   GT_Recipe.ReplaceRecipeWithTool ({id:id, count:1, data:0}, [
   "pf",
   "s ",
   "s "
   ], ['p', eval("ItemID.plate"+mat), 0, 'i', eval("ItemID.ingot"+mat), 0, 's', 280, 0], [GT_Material.files], 2);
}




// file: api/item/GT_Item.js

var GT_Material = {
	//Tools
	hammers:[], files:[], mortars:[], cutters:[], wrenchs:[], screwdrivers:[], knifes:[], saws:[], solderings:[],
	//Items
    ingots:[], plates:[], dusts:[], dustSmall:[], dustTiny:[], bolts:[], nuggets:[], modules:[], littleOres:[], gems:[], rods:[], long_rods:[], rings:[], impuredusts:[], crusheds:[], crushedpurifieds:[], sawblades: [], magneticrods: [], screws: [], gearSmalls: [],
	//Blocks
    wires:[], blocks:[], ores:[],
	//Liquid
	liquid: [],
    RetArg: function(type, Material, arg){
    	for(var keys in eval("this."+type)){
    	    var t = eval("this."+type+"[keys]")
            if(t.Material == Material){
            	return eval("t."+arg);
            }
        }
    },
    RetArgFromID: function(id, arg){
    	for(var keys in this.nuggets){
    	   if(this.nuggets[keys].id == id){
    	        return eval("this.nuggets[keys]."+arg)
    	    }
        }
    	for(var keys in this.dusts){
    	   if(this.dusts[keys].id == id){
    	        return eval("this.dusts[keys]."+arg)
    	    }
        }
        for(var keys in this.ingots){
    	    if(this.ingots[keys].id == id){
    	        return eval("this.ingots[keys]."+arg)
    	    }
        }
        for(var keys in this.plates){
    	    if(this.plates[keys].id == id){
    	        return eval("this.plates[keys]."+arg)
    	    }
        }
        for(var keys in this.littleOres){
    	    if(this.littleOres[keys].id == id){
    	        return eval("this.littleOres[keys]."+arg)
    	    }
        }
        for(var keys in this.ores){
    	    if(this.ores[keys].id == id){
    	        return eval("this.ores[keys]."+arg)
    	    }
        }
        return 0;
    },
    RegisterImpureDust(id, Material, lvl, n){
    	this.impuredusts.push({id: id, Material: Material, lvl: lvl});
        if(n == true){
        Item.registerUseFunction(id, function(coords, item, b){
        	var c = coords.relative;
            if(World.getBlockID(c.x, c.y, c.z) == 9 && rollPercentage(3)){
            	World.drop(c.x+0.5, c.y+0.1, c.z+0.5, Material[0], Material[1], 0);
                World.setBlock(c.x, c.y, c.z, 0, 0);
                item.count--;
	            if(!item.count){ 
                    item.id = 0;
                 }
	             Player.setCarriedItem(item.id, item.count, 0);
	         }
	    });
	    }
    },
    SmallOreRegister(name, drop){
    	var ID = IDRegistry.genBlockID("ore"+"Small"+name);
        Block.createBlock("ore"+"Small"+name, [
	    {name: "Small " + name + " Ore", texture: [[name+"_ore_small", 0]], inCreative: true}
        ], "opaque");
        ToolAPI.registerBlockMaterial(ID, "stone", 1, true);
        Block.setDestroyLevel(ID, 1);
        GT_Worldgen.oresSmall.push(ID);
        setLoadingTip("[GregTech 5] register small ore: " + name);
        if(drop){
            Block.registerDropFunction(ID, function(coords, id, data, level, enchant){
            	if(level>=1){
                	return drop;
                }else{
                	return [];
                }
            });
        }
    },
    OreRegister: function(name, materials, types, generateDrop, lvl){ 
        if(!lvl){lvl = 0;}    	
        for(var keys in types){
        	for(var key in ores_types){
        	    if(types[keys]==ores_types[key].name){        	                
                    var ID = IDRegistry.genBlockID("ore"+name+types[keys]);
                    Block.createBlock("ore"+name+types[keys], [
	                {name: name+" Ore", texture: [[name+"_ore", ores_types[key].data]], inCreative: true}
                    ], "opaque");
                    ToolAPI.registerBlockMaterial(ID, "stone", ores_types[key].level + lvl, true);
                    Block.setDestroyLevel(ID, (ores_types[key].level + lvl));
                    this.ores.push({id:ID, type:name, data:0, Material: materials, lvl: ores_types[key].level + lvl});
                    setLoadingTip("[GregTech 5] register ore: " + name);
                    if(generateDrop==true){
                    	
                    	this.GenerateRecipes({ore:ID, resourses:materials, lvl:ores_types[key].level + lvl});
                                    
                        Block.registerDropFunction(ID, function(coords, id, data, level, enchant){
                            	var A = GT_Material;
                    	        var a = true;                            
                                if(level>=A.RetArgFromID(id, "lvl")){
                            	    for(var h in A.hammers){
                                        if(Player.getCarriedItem().id==A.hammers[h].id){                             	        
                                             var drop = [];                                                                                             
                                    	         if(materials[0][1]==0){
                                    	             for(var n in A.nuggets){
                                                         if(materials[0][0]==A.nuggets[n].Material){
                                                         	drop.push([A.nuggets[n].id, 1, 0]);
                                                             a = false;
                                                             break;
                                                         }
                                                     }
                                             	    for(var sd in A.dustSmall){
                                                         if(materials[0][0]==A.dustSmall[sd].Material && a==true){
                                                             drop.push([A.dustSmall[sd].id, 1, 0]); 
                                                             break;
                                                         }
                                                     }                                            
                                                 } 
                                                 a = true;
                                                 if(materials[0][1]==1){
                                                     for(var n in A.nuggets){ 
                                                         if(materials[0][0]==A.nuggets[n].Material){
                                                             drop.push([A.nuggets[n].id, 5, 0]);
                                                             a = false;
                                                             break;                                                
                                                         }
                                                     }
                                             	    for(var sd in A.dustSmall){
                                                         if(materials[0][0]==A.dustSmall[sd].Material && a==true){
                                                             drop.push([A.dustSmall[sd].id, 5, 0]);
                                                             break;
                                                         }
                                                     }                                            
                                                 }
                                                 a = true;
                                                 if(materials[0][1]==2){                                                        
                                                 	for(var lo in A.littleOres){                                       
                                                         if(materials[0][0]==A.littleOres[lo].Material){
                                                         	drop.push([A.littleOres[lo].id, 1, A.littleOres[lo].data]);
                                                             a = false;
                                                             break;                  
                                                         }
                                                     }
                                                     for(var d in A.dusts){
                                                         if(materials[0][0]==A.dusts[d].Material && a==true){
                                                         	drop.push([A.dusts[d].id, 1, 0]);
                                                             break;
                                                         }
                                                     }                                                
                                                 }
                                                 a = true;
                                                 if(materials[0][1]==3){                                                                              	
                                                 	for(var lo in A.littleOres){                                       
                                                         if(materials[0][0]==A.littleOres[lo].Material){
                                                         	drop.push([A.littleOres[lo].id, random(2, 3), A.littleOres[lo].data]);
                                                             a = false;                                                           
                                                             break;                    
                                                         }
                                                     }
                                                     for(var d in A.dusts){
                                                         if(materials[0][0]==A.dusts[d].Material && a==true){
                                                         	drop.push([A.dusts[d].id, random(2, 3), 0]);
                                                             ToolAPI.dropOreExp(coords, 13, 28, enchant.experience);
                                                             break;
                                                         }
                                                     }                                                
                                                 }                                                                                                        
                                             return drop;
                                         }                                        
                                     }
                                     return [[id, 1, data]];
                                  }                 
                                  return [];                   
                              });
                          }
                }
            }
        }
    },
	register: function(name, obj, obj1){
		 setLoadingTip("[GregTech 5] register material: " + name);
		var constant = 100;
		var it = {};
		if(obj1){
			it.temp = obj1.temp;
            it.long = obj1.long;
            it.lvl = obj1.lvl;
        }
		if(obj.isCrushed==true){
			it.crushed = IDRegistry.genItemID("crushed"+name);
            Item.createItem("crushed"+name, "Crushed " + name + " Ore", {name:name+"_crushed"});
            this.crusheds.push({Material:name, id:it.dust, data:0, temp:obj1.temp, lvl:obj1.lvl, long: obj1.long});          
        }
		if(obj.isGearSmall==true){
			it.gearSmall = IDRegistry.genItemID("gearSmall"+name);
            Item.createItem("gearSmall"+name, "Small " + name + " Gear", {name:name+"_gearSmall"});
            this.gearSmalls.push({Material:name, id:it.dust, data:0, temp:obj1.temp, lvl:obj1.lvl, long: obj1.long});          
        }
		if(obj.isMagneticRod == true){
			it.magneticrod = IDRegistry.genItemID("magneticRod"+name);
            Item.createItem("magneticRod"+name, "Magneric " + name + " Rod", {name:name+"_magneticRod"});
            this.magneticrods.push({Material:name, id:it.dust, data:0, temp:obj1.temp, lvl:obj1.lvl, long: obj1.long});     
		}
		if(obj.isScrew==true){
			it.screw = IDRegistry.genItemID("screw"+name);
            Item.createItem("screw"+name, name + " Screw", {name:name+"_screw"});
            this.screws.push({Material:name, id:it.dust, data:0, temp:obj1.temp, lvl:obj1.lvl, long: obj1.long});          
        }
		if(obj.isCrushedPurified==true){
			it.crushedpurified = IDRegistry.genItemID("crushedPurified"+name);
            Item.createItem("crushedPurified"+name, "Purified Crushed " + name + " Ore", {name:name+"_crushedPurified"});
            this.crushedpurifieds.push({Material:name, id:it.dust, data:0, temp:obj1.temp, lvl:obj1.lvl, long: obj1.long});          
        }
		if(obj.isSawBlade==true){
			it.sawblade = IDRegistry.genItemID("sawBlade"+name);
            Item.createItem("sawBlade"+name, name + " Saw Blade", {name:name+"_sawBlade"});
            this.sawblades.push({Material:name, id:it.dust, data:0, temp:obj1.temp, lvl:obj1.lvl, long: obj1.long});          
        }
		if(obj.isDust==true){
			it.dust = IDRegistry.genItemID("dust"+name);
            Item.createItem("dust"+name, name+" Dust", {name:name+"_dust"});
            this.dusts.push({Material:name, id:it.dust, data:0, temp:obj1.temp, lvl:obj1.lvl, long: obj1.long});          
        }
	    if(obj.isIngot==true){
			it.ingot = IDRegistry.genItemID("ingot"+name);
            Item.createItem("ingot"+name, name+" Ingot", {name:name+"_ingot"});
            this.ingots.push({Material:name, id:it.ingot, data:0, temp:obj1.temp, lvl:obj1.lvl, long: obj1.long});
	    }
	    if(obj.isPlate==true){
			it.plate = IDRegistry.genItemID("plate"+name);
            Item.createItem("plate"+name, name+" Plate", {name:name+"_plate"});
            this.plates.push({Material:name, id: it.plate, data:0, temp:obj1.temp, lvl:obj1.lvl, long: obj1.long});
	    }
	    if(obj.isNugget==true){
			it.nugget = IDRegistry.genItemID("nugget"+name);
            Item.createItem("nugget"+name, name+" Nugget", {name:name+"_nugget"});
            this.nuggets.push({Material:name, id: it.nugget, data:0, temp:obj1.temp, lvl:obj1.lvl, long: obj1.long});
	    }
	    if(obj.isSmallDust==true){
			it.dustSmall = IDRegistry.genItemID("dustSmall"+name);
            Item.createItem("dustSmall"+name, "Small Pile of "+name+" Dust", {name:name+"_dustSmall"});
            this.dustSmall.push({Material:name, id: it.dustSmall, data:0, temp:obj1.temp, lvl:obj1.lvl, long: obj1.long});
	    }
		if(obj.isTinyDust==true){
			it.dustTiny = IDRegistry.genItemID("dustTiny"+name);
            Item.createItem("dustTiny"+name, "Tiny Pile of "+name+" Dust", {name:name+"_dustTiny"});
            this.dustTiny.push({Material:name, id: it.dustTiny, data:0, temp:obj1.temp, lvl:obj1.lvl, long: obj1.long});
	    }
	    if(obj.isBolt==true){
			it.bolt = IDRegistry.genItemID("bolt"+name);
            Item.createItem("bolt"+name, name+" Bolt", {name:name+"_bolt"});
            this.bolts.push({Material:name, id: it.bolt, data:0, temp:obj1.temp, lvl:obj1.lvl, long: obj1.long});
	    }
	    if(obj.isLittleOre==true){
			it.littleOre = IDRegistry.genItemID(name);
            Item.createItem(name, name, {name:"little_"+name+"_ore"});
            this.littleOres.push({Material:name, id: it.littleOre, data:0, temp:obj1.temp, lvl:obj1.lvl, long: obj1.long});
	    }
	    if(obj.isModule==true){
			it.module = IDRegistry.genItemID("module"+name);
            Item.createItem("module"+name, name+" Module", {name:name+"_module"});
            this.modules.push({Material:name, id: it.module, data:0, temp:obj1.temp, lvl:obj1.lvl, long: obj1.long});
	    }
	    if(obj.isGem==true){
			it.gem = IDRegistry.genItemID("gem"+name);
            Item.createItem("gem"+name, name+" Gem", {name:name+"_gem"});
            this.gems.push({Material:name, id: it.gem, data:0, temp:obj1.temp, lvl:obj1.lvl, long: obj1.long});
	    }
	if(obj.isRods==true){
		it.rod = IDRegistry.genItemID("rod"+name);
        Item.createItem("rod"+name, name+" Rod", {name:name+"_rod"});
        this.rods.push({Material:name, id: it.rod, data:0, temp:obj1.temp, lvl:obj1.lvl, long: obj1.long});
        
        it.long_rod = IDRegistry.genItemID("long_rod"+name);
        Item.createItem("long_rod"+name, "Long "+name+" Rod", {name:name+"_long_rod"});
        this.long_rods.push({Material:name, id: it.long_rod, data:0, temp:obj1.temp, lvl:obj1.lvl, long: obj1.long});
	}
	if(obj.isRing==true){
		it.ring = IDRegistry.genItemID("ring"+name);
        Item.createItem("ring"+name, name+" Ring", {name:name+"_ring"});
        this.rings.push({Material:name, id: it.ring, data:0, temp:obj1.temp, lvl:obj1.lvl, long: obj1.long});
    }
    if(obj.isBlock==true){
    	it.block = IDRegistry.genBlockID("block"+name);
        Block.createBlock("block"+name, [
	    {name: name+" Block", texture: [[name+"_block", 0]], inCreative: true}], "opaque" );
        ToolAPI.registerBlockMaterial(it.block, "stone");
        Block.setDestroyLevel(it.block, 3);
        this.rings.push({Material:name, id: it.block, data:0, temp:obj1.temp, lvl:obj1.lvl, long: obj1.long});
    }
    if(obj.isWire == true){
    	it.wire = IDRegistry.genItemID("cable"+name);
        Item.createItem("cable"+name, name+" Cable", {name:name+"_cable"});
        this.wires.push({Material:name, id: it.wires, data:0, temp:obj1.temp, lvl:obj1.lvl, long: obj1.long});
    }
    if(name == "Iron"){
    	it.ingot = 265;
        this.ingots.push({Material:name, id: 265, data:0, temp:obj1.temp, lvl:obj1.lvl, long: obj1.long});
    }
    if(name == "Gold"){
    	it.ingot = 266;
        this.ingots.push({Material:name, id: 266, data:0, temp:obj1.temp, lvl:obj1.lvl, long: obj1.long});
    }
    if(name == "Iron"){
    	it.block = 42;
        this.blocks.push({Material:name, id: 42, data:0, temp:obj1.temp, lvl:obj1.lvl, long: obj1.long});
    }
    if(name == "Gold"){
    	it.block = 41;
        this.blocks.push({Material:name, id: 41, data:0, temp:obj1.temp, lvl:obj1.lvl, long: obj1.long});
    }
    if(name == "Coal"){
    	it.littleOre = 263;
        this.littleOres.push({Material:name, id: 263, data:0, temp:obj1.temp, lvl:obj1.lvl, long: obj1.long});
    }
    if(name == "Lapis"){
    	it.littleOre = 351;
        this.littleOres.push({Material:name, id: 351, data:4, temp:obj1.temp, lvl:obj1.lvl, long: obj1.long});
    }
    if(name == "Gold"){
    	it.nugget = 371;
        this.nuggets.push({Material:name, id: 371, data:0, temp:obj1.temp, lvl:obj1.lvl, long: obj1.long});
    }
        
    if(obj.generateRecipes==true){
			this.GenerateRecipes(it);
	    }
	},
	GenerateRecipes: function(obj) {
		if(obj.ore){
			var rS1 = [0, 0, 0];
		    var rS2 = [0, 0, 0];
		    var rS3 = [0, 0, 0];
		    var rS4 = [0, 0, 0];
		    var a;
		    var A = this;
		
            for(var key = 0; key<obj.resourses.length; key++){
				a = true;
				if(obj.resourses[key][1]==3){					
                        for(var d in A.dusts){
                            if(obj.resourses[key][0]==A.dusts[d].Material && a==true){
                            	for(var i in A.ingots){
                                    if(A.dusts[d].Material == A.ingots[i].Material && A.ingots[i].temp <= vanileFurnaceTemp){
                                	    Recipes.addFurnace(obj.ore, A.ingots[i].id, 0);
                                    }      
                               }                         
                               eval("rS"+(key+1)+" = [A.dusts[d].id, 3, 0]");
                               break;                       
                            }
                        }                                                
                    }
                    a = true;
                    if(obj.resourses[key][1]==2){					
                        for(var d in A.dusts){
                            if(obj.resourses[key][0]==A.dusts[d].Material && a==true){
                            	for(var i in A.ingots){
                                	if(A.littleOres[lo].Material == A.ingots[i].Material && A.ingots[i].temp <= vanileFurnaceTemp){
                                	    Recipes.addFurnace(obj.ore, A.ingots[i].id, 0);
                                    }
                                }
                               eval("rS"+(key+1)+" = [A.dusts[d].id, 1, 0]");
                               break;
                            }
                        }                                                
                    }
                    a = true;
                    if(obj.resourses[key][1]==1){
					for(var lo in A.nuggets){                                       
                        if(obj.resourses[key][0]==A.nuggets[lo].Material){
                            eval("rS"+(key+1)+" = [A.nuggets[lo].id, 5, 0]");
                            a = false;                                                      
                            break;                    
                            }
                        }
                        for(var d in A.dustSmall){
                            if(obj.resourses[key][0]==A.dustSmall[d].Material && a==true){                            
                               eval("rS"+(key+1)+" = [A.dustSmall[d].id, 5, 0]");
                               break;
                            }
                        }                                                
                    }
                    a = true;
                    if(obj.resourses[key][1]==0){
					for(var lo in A.nuggets){                                       
                        if(obj.resourses[key][0]==A.nuggets[lo].Material){
                            eval("rS"+(key+1)+" = [A.nuggets[lo].id, 1, 0]");
                            a = false;                                                           
                            break;                    
                            }
                        }
                        for(var d in A.dustSmall){
                            if(obj.resourses[key][0]==A.dustSmall[d].Material && a==true){                            
                               eval("rS"+(key+1)+" = [A.dustSmall[d].id, 1, 0]");
                               break;
                            }
                        }    
                    }
                }
			GT_Recipe.MaceratorRecipe.add({id: rS1[0], data: rS1[2], count: rS1[1]}, {id: obj.ore, data: 0, count: 1}, {long:obj.long, lvl: obj.lvl});
		}
		//dust
		if(obj.dust && obj.dustSmall){
			Recipes.addShapeless({id:obj.dustSmall, count:9, data:0}, [ {id:obj.dust, data:0}]);
			Recipes.addShaped({id:obj.dust, count:1, data:0}, ["aaa", "aaa", "aaa"], ['a', obj.dustSmall, 0])
            if(obj.nugget){
            	GT_Recipe.MaceratorRecipe.add({id: obj.dustSmall, data: 0, count: 1}, {id: obj.nugget, data: 0, count: 1}, {long:obj.long*10, lvl: obj.lvl});
            	//ATMech.FurnaceRecipe ({sS1:[obj.dustSmall, 1, 0], rS1:[obj.nugget, 1, 0], long:round(obj.long/9, 1), temp:obj.temp});               
        	    GT_Recipe.ReplaceShapelessRecipeWithTool({id:obj.dustSmall, count:1, data:0}, [{id:obj.nugget, data:0}], this.mortars, obj.lvl);                                                            
                if(obj.ingot && obj.lvl <=2){
        	        Recipes.addShapeless({id:obj.nugget, count:9, data:0}, [{id:obj.ingot, data:0}]);
                    Recipes.addShaped({id: obj.ingot, count: 1, data: 0}, ["xxx", "xxx", "xxx"], ['x', obj.nugget, 0]);
                }
                if(obj.ingot){
                	//ATMech.FurnaceRecipe ({sS1:[obj.nugget, 9, 0], rS1:[obj.ingot, 1, 0], long:round(obj.long, 1), temp:obj.temp});
                    GT_Recipe.AlloySmelterRecipe.add({slot1: {id: obj.nugget, count: 9}, slot2: {id: ItemID.MoldIngot, count: 1}, output: {id: obj.ingot, data: 0, count: 1}, adv: {time: obj.long * 20, level: obj.lvl, isShape: true}});
                	GT_Recipe.AlloySmelterRecipe.add({slot1: {id: obj.ingot, count: 1}, slot2: {id: ItemID.MoldNuggets, count: 1}, output: {id: obj.nugget, data: 0, count: 9}, adv: {time: obj.long* 20, level: obj.lvl, isShape: true}});
					GT_Recipe.AlloySmelterRecipe.add({slot1: {id: obj.plate, count: 1}, slot2: {id: ItemID.MoldIngot, count: 1}, output: {id: obj.ingot, data: 0, count: 1}, adv: {time: obj.long* 20, level: obj.lvl, isShape: true}});
					GT_Recipe.AlloySmelterRecipe.add({slot1: {id: obj.dustSmall, count: 4}, slot2: {id: ItemID.MoldIngot, count: 1}, output: {id: obj.ingot, data: 0, count: 1}, adv: {time: obj.long* 20, level: obj.lvl, isShape: true}});
					if(obj.dustTiny){
						GT_Recipe.AlloySmelterRecipe.add({slot1: {id: obj.dustTiny, count: 9}, slot2: {id: ItemID.MoldIngot, count: 1}, output: {id: obj.ingot, data: 0, count: 1}, adv: {time: obj.long* 20, level: obj.lvl, isShape: true}});
					}
                }
            }
            if(obj.gem){
            	//ATMech.MaceratorRecipe ({sS:[obj.gem, 1, 0], rS1:[obj.dust, 1, 0], long:obj.lvl*10, lvl:obj.lvl});
            	//ATMech.FurnaceRecipe ({sS1:[obj.dust, 1, 0], rS1:[obj.gem, 1, 0], long:round(obj.long, 1), temp:obj.temp});
            }
            if(obj.ingot){
            	if(obj.long_rod){
            	    GT_Recipe.CreateRecipeWithTool({id:obj.long_rod, count:1, data:0}, ["fa"], ['a', obj.ingot, 0], [this.files], obj.lvl);
                    GT_Recipe.CreateRecipeWithTool({id:obj.rod, count:2, data:0}, ["sa"], ['a', obj.long_rod, 0], [this.saws], obj.lvl);
					GT_Recipe.MaceratorRecipe.add({id: obj.dust, data: 0, count: 1}, {id: obj.long_rod, data: 0, count: 1}, {long: obj.long*10, lvl: obj.lvl});
                    if(obj.bolt){
                    	GT_Recipe.CreateRecipeWithTool({id:obj.bolt, count:3, data:0}, ["sa"], ['a', obj.rod, 0], [this.saws], obj.lvl);
						GT_Recipe.MaceratorRecipe.add({id: obj.dustSmall, data: 0, count: 1}, {id: obj.bolt, data: 0, count: 1}, {long: obj.long*10, lvl: obj.lvl});
                    }
                    if(obj.ring){
                    	GT_Recipe.CreateRecipeWithTool({id:obj.ring, count:1, data:0}, ["haf"], ['a', obj.rod, 0], [this.hammers], obj.lvl);
                    }
                }
            	if(obj.block){
                	Recipes.deleteRecipe({id:obj.block, count:1, data:0})
                    Recipes.addShapeless({id:obj.ingot, count:9, data:0}, [ {id:obj.block, data:0}]);
                    GT_Recipe.AlloySmelterRecipe.add({slot1: {id: obj.ingot, count: 9}, slot2: {id: ItemID.MoldBlock, count: 1}, output: {id: obj.block, data: 0, count: 1}, adv: {time: obj.long * 20, level: obj.lvl, isShape: true}});
					
					GT_Recipe.MaceratorRecipe.add({id: obj.dust, data: 0, count: 9}, {id: obj.block, data: 0, count: 1}, {long: obj.long*10, lvl: obj.lvl});
					
					GT_Recipe.CompressorRecipe.add({id: obj.block, data: 0, count: 1}, {id: obj.ingot, data: 0, count: 9}, {long: obj.long*10, lvl: obj.lvl});
                }
            	//ATMech.FurnaceRecipe ({sS1:[obj.dust, 1, 0], rS1:[obj.ingot, 1, 0], long:obj.long, temp:obj.temp});
				GT_Recipe.MaceratorRecipe.add({id: obj.dust, data: 0, count: 1}, {id: obj.ingot, data: 0, count: 1}, {long:obj.long*10, lvl: obj.lvl}); 
				
                if(obj.temp <= vanileFurnaceTemp){
                	Recipes.addFurnace(obj.dust, obj.ingot, 0);
                }
                if(obj.plate){  
                   if(obj.dust){
					   GT_Recipe.MaceratorRecipe.add({id: obj.dust, data: 0, count: 1}, {id: obj.plate, data: 0, count: 1}, {long: obj.long*10, lvl: obj.lvl});
				   }
                   if(obj.gearSmall){
					   GT_Recipe.CreateRecipeWithTool({id: obj.gearSmall, count:1, data:0}, ["#  ", " h ", "   "], ['#', obj.plate, 0], [this.hammers], obj.lvl);
				   }				   
                   GT_Recipe.AlloySmelterRecipe.add({slot1: {id: obj.ingot, count: 1}, slot2: {id: ItemID.MoldPlate, count: 1}, output: {id: obj.plate, data: 0, count: 1}, adv: {time: obj.long * 20, level: obj.lvl, isShape: true}});    
				   GT_Recipe.ForgeHammerRecipe.add({id: obj.plate, count: 2, data: 0}, {id: obj.ingot, count: 3, data: 0}, {long: obj.long, lvl: obj.lvl});
                    GT_Recipe.ReplaceRecipeWithTool({id:obj.plate, count:1, data:0}, ["h", "a", "a"], ['a', obj.ingot, 0], [this.hammers], obj.lvl);
                    if(obj.wire){
                    	GT_Recipe.ReplaceShapelessRecipeWithTool({id:obj.wire, count:3, data:0}, [{id:obj.plate, data:0}], this.cutters, obj.lvl)
                    }
                }
            }
        }
		if(obj.ore && obj.crushed){
			GT_Recipe.MaceratorRecipe.add({id: obj.crushed, data: 0, count: 1}, {id: obj.ore, data: 0, count: 1}, {long: obj.long*10, lvl: obj.lvl}); 
			GT_Recipe.ForgeHammerRecipe.add({id: obj.crushed, count: 1, data: 0}, {id: obj.ore, count: 1, data: 0}, {long: obj.long, lvl: obj.lvl});
		}
		//dust
		if(obj.dustTiny && obj.dust){
			 Recipes.addShaped({id: obj.dust, count: 1, data: 0}, ["xxx", "xxx", "xxx"], ['x', obj.dustTiny, 0]);
			 GT_Recipe.CompressorRecipe.add({id: obj.dust, data: 0, count: 1}, {id: obj.dustTiny, data: 0, count: 9}, {long: obj.long, lvl: obj.lvl});
		}       
		//Bolt
        if(obj.bolt && obj.nugget){            
            GT_Recipe.CreateShapelessRecipeWithTool({id:obj.bolt, count:1, data:0}, [{id:obj.nugget, data:0}], this.files, obj.lvl);                              
        }
		//Module
        if(obj.module){
            if(obj.bolt){        	        
               GT_Recipe.CreateRecipeWithTool({id:obj.module, count:1, data:0}, ["bwb", "bpb", "bsb"], ['b', obj.bolt, 0, 'p', obj.plate, 0], [this.screwdrivers, this.wrenchs], obj.lvl);
            }else{                	                
                GT_Recipe.CreateRecipeWithTool({id:obj.module, count:1, data:0}, ["bwb", "bpb", "bsb"], ['b', ItemID.boltSteel, 0, 'p', obj.plate, 0], [this.screwdrivers, this.wrenchs], obj.lvl);
            }
        }
		//SawBlade
		if(obj.sawblade && obj.plate){
			GT_Recipe.CreateRecipeWithTool({id:obj.sawblade, count:1, data:0}, ["## ", "hf ", "   "], ['#', obj.plate, 0], [this.hammers, this.files], obj.lvl);
		}
		//MagneticRod
		if(obj.magneticrod && obj.rod){
			Recipes.addShapeless({id:obj.magneticrod, count: 1, data:0}, [ {id: obj.rod, data:0}, {id: 331, data:0}, {id: 331, data:0}, {id: 331, data:0}, {id: 331, data:0}]);
		}
		//Screw
		if(obj.screw && obj.bolt){
			GT_Recipe.CreateRecipeWithTool({id:obj.screw, count:1, data:0}, ["#f# ", "", ""], ['#', obj.bolt, 0], [this.files], obj.lvl);
		}
		if(obj.rod){
			GT_Recipe.MaceratorRecipe.add({id: obj.dustSmall, data: 0, count: 2}, {id: obj.rod, data: 0, count: 1}, {long: obj.long*10, lvl: obj.lvl});
		}
	}
};




// file: api/item/GT_Tool.js

var GT_Tool = {
	tools: [],
	Tool(api, field, result){
    	var toolCount; var toolData;
        for (var i in field){
            if (GT_Tool.ToolID(field[i].id)){
            	if(field[i].count == 1){
                    field[i].data++;
                   if (GT_Tool.ToolData(field[i].data, field[i].id)){
                       field[i].id = field[i].count = field[i].data = 0;
                   }
               }			   
			   else if(LiquidRegistry.getItemLiquid(field[i].id, field[i].data) != "water"){
               	   toolCount = field[i].count - 1;
                   toolData = field[i].data;
                   field[i].count = 1;
                   field[i].data++;
                   Player.addItemToInventory(field[i].id, toolCount, toolData);
                   if (GT_Tool.ToolData(field[i].data, field[i].id)){
                       field[i].id = field[i].count = field[i].data = 0;
                   }
               }			   
           }
		   else{api.decreaseFieldSlot(i);}
		   
		   if(LiquidRegistry.getItemLiquid(field[i].id, field[i].data) == "water"){
			   var empty = LiquidRegistry.getEmptyItem(field[i].id, field[i].data);
			   Player.addItemToInventory(empty.id, 1, empty.data);
			   field[i].count--;
		   }
        }
    },
	ToolID(id){
       for(var key in this.tools){
            if(id == this.tools[key][0]){
            	for(var keys in GT_Material.hammers){	
                	if(this.tools[key][0] == GT_Material.hammers[keys].id){
                	    PlaySoundFile("HammerUse.ogg");
                    }
                }
                return (id == this.tools[key][0]);
           }
       }
    },
    ToolData(data, id){
        for(var key in this.tools){
            if(data >= this.tools[key][1] && id== this.tools[key][0]){
                return (data == this.tools[key][1])
            }
        }
    },
    addTool(i, d){
        this.tools.push([i, d]);
        Item.setMaxDamage(i, d);
    },
	
	RegisterHammer(name, data, lvl, lvl1){
	   var id = IDRegistry.genItemID(name+"Hammer");
       Item.createItem(name+"Hammer", name+" Hammer", {name:name+"_hammer"}, {stack:1});
       this.addTool(id, data)
       GT_Material.hammers.push({id:id, Material:name, Symbol:'h', lvl:lvl});
       var hammer = {durability:data, level: lvl1, efficiency:5, damage: 5, enchantability:0};
       ToolAPI.setTool(id, hammer, ToolType.pickaxe);
    },
	
   RegisterFile(name, data, lvl){
	   var id = IDRegistry.genItemID(name+"File");
       Item.createItem(name+"File", name+" File", {name:name+"_file"}, {stack:1});
       this.addTool(id, data);
       GT_Material.files.push({id:id, Material:name, Symbol:'f', lvl:lvl});
   },

   RegisterMortar(name, data, lvl){
	   var id = IDRegistry.genItemID(name+"Mortar");
       Item.createItem(name+"Mortar", name+" Mortar", {name:name+"_mortar"}, {stack:1});
       this.addTool(id, data);
       GT_Material.mortars.push({id:id, Material:name, Symbol:'m', lvl:lvl});
   },

   RegisterCutter(name, data, lvl){
	   var id = IDRegistry.genItemID(name+"Cutter");
       Item.createItem(name+"Cutter", name+" Cutter", {name:name+"_cutter"}, {stack:1});
       this.addTool(id, data);
       GT_Material.cutters.push({id:id, Material:name, Symbol:'n', lvl:lvl});
   },
   
   RegisterWrench(name, data, lvl){
	   var id = IDRegistry.genItemID(name+"Wrench");
       Item.createItem(name+"Wrench", name+" Wrench", {name:name+"_wrench"}, {stack:1});
       this.addTool(id, data);
       GT_Material.wrenchs.push({id:id, Material:name, Symbol:'w', lvl:lvl});
   },
   
   RegisterScrewdriver(name, data, lvl){
	   var id = IDRegistry.genItemID(name+"Screwdriver");
       Item.createItem(name+"Screwdriver", name+" Screwdriver", {name:name+"_screwdriver"}, {stack:1});
       this.addTool(id, data);
       GT_Material.screwdrivers.push({id:id, Material:name, Symbol:'s', lvl:lvl});
   },
   
   RegisterKnife(name, data, lvl){
	   var id = IDRegistry.genItemID(name+"Knife");
       Item.createItem(name+"Knife", name+" Knife", {name:name+"_knife"}, {stack:1});
       this.addTool(id, data);
       GT_Material.knifes.push({id:id, Material:name, Symbol:'k', lvl:lvl});
   },
   
   RegisterSoldering(name, data, lvl){
	   var id = IDRegistry.genItemID(name+"Soldering");
       Item.createItem(name+"Soldering", name+" Soldering", {name:name+"_soldering"}, {stack:1});
       this.addTool(id, data)
       GT_Material.solderings.push({id:id, Material:name, Symbol:'l', lvl:lvl})
   },
   
   RegisterSaw(name, data, lvl){
	   var id = IDRegistry.genItemID(name+"Saw");
       Item.createItem(name+"Saw", name+" Saw", {name:name+"_saw"}, {stack:1});
       this.addTool(id, data);
       GT_Material.saws.push({id:id, Material:name, Symbol:'s', lvl:lvl});
       var saw = {durability:data, level:5, efficiency:5, damage: 3, enchantability:0};
       ToolAPI.setTool(id, saw, ToolType.axe);
   },
   RegisterLiquid(id, data){
       this.tools.push([id, data]);
       GT_Material.liquid.push({id:id, Symbol:'w', lvl: 2});    
   },
   
   RegisterToolsSet(name, data, lvl, lvl1){
	   this.RegisterHammer(name, data, lvl, lvl1);
	   this.RegisterFile(name, data, lvl);
	   this.RegisterMortar(name, data, lvl);
	   this.RegisterCutter(name, data, lvl);    
	   this.RegisterWrench(name, data, lvl);   
	   this.RegisterScrewdriver(name, data, lvl);    
       this.RegisterKnife(name, data, lvl);    
       this.RegisterSaw(name, data, lvl);
   }
};




// file: api/machine/GT_SteamMachine.js

var GT_SteamMachine = {
	machineIDs: {},

	isMachine: function(id){
		return this.machineIDs[id];
	},

	register: function(id, Prototype){
		ICRender.getGroup("gt-fuel").add(id, -1);
		this.machineIDs[id] = true;
		if (Prototype.defaultValues){
			Prototype.defaultValues.steam = 0;			
			Prototype.defaultValues.isActive = false;
			Prototype.defaultValues.SoundMachine = null;
		}
		else{
			Prototype.defaultValues = {
				steam: 0,
				isActive: false,
                SoundMachine: null      		
			};
		}
		if(!Prototype.getEnergyStorage){
			Prototype.getEnergyStorage = function(){
				return 0;
			};
		}
		
		Prototype.click = function(id, count, data, coords){
			if(id == ItemID.cellSteam){
				this.liquidStorage.addLiquid("steam", 1);
				Player.setCarriedItem(ItemID.cellEmpty, 1, 0);
				return true;
			}
			if(id == ItemID.cellEmpty){
				if(this.liquidStorage.getAmount("steam") >= 1){
					Player.setCarriedItem(ItemID.cellSteam, 1, 0);
					this.liquidStorage.addLiquid("steam", -1);
					return true
				}
			}
		}				
		ToolAPI.registerBlockMaterial(id, "stone");
		Block.setDestroyTime(id, 3);
		TileEntity.registerPrototype(id, Prototype);
		EnergyTileRegistry.addEnergyTypeForId(id, ST);
	},

	getMachineDrop: function(coords, blockID, level, standartDrop){
		var item = Player.getCarriedItem();
		if(item.id==ItemID.wrench){
			ToolAPI.breakCarriedTool(10);
			World.setBlock(coords.x, coords.y, coords.z, 0);
			if(Math.random() < 0.8){return [[blockID, 1, 0]];}
			return [[standartDrop || blockID, 1, 0]];
		}
		if(item.id==ItemID.electricWrench && item.data + 500 <= Item.getMaxDamage(item.id)){
			Player.setCarriedItem(item.id, 1, item.data + 500);
			World.setBlock(coords.x, coords.y, coords.z, 0);
			return [[blockID, 1, 0]];
		}
		if(level > 0){
			return [[standartDrop || blockID, 1, 0]];
		}
		return [];
	},
	initModel: function(){
		if(this.data.isActive){
			var block = World.getBlock(this.x, this.y, this.z);
			ICore.Render.mapAtCoords(this.x, this.y, this.z, block.id, block.data);
		}
	},
	
	activateMachine: function(){
		if(!this.data.isActive){
			this.data.isActive = true;
			var block = World.getBlock(this.x, this.y, this.z);
			ICore.Render.mapAtCoords(this.x, this.y, this.z, block.id, block.data);
			if(this.data.SoundMachine != null){
			PlayBlockSound(this, this.data.SoundMachine, true, 24);
			}
		}
	},
	
	deactivateMachine: function(){
		if(this.data.isActive){
			this.data.isActive = false;
			BlockRenderer.unmapAtCoords(this.x, this.y, this.z);
			if(this.data.SoundMachine != null){
			StopBlockSound(this);
			}
		}
	}
}




// file: api/machine/GT_ElectricMachine.js

var GT_ElectricMachine = {
	machineIDs: {},

	isMachine: function(id){
		return this.machineIDs[id];
	},

	register: function(id, Prototype){
		ICRender.getGroup("ic-wire").add(id, -1);
		this.machineIDs[id] = true;
		if (Prototype.defaultValues){
			Prototype.defaultValues.energy = 0;			
			Prototype.defaultValues.isActive = false;
			Prototype.defaultValues.SoundMachine = null;
		}
		else{
			Prototype.defaultValues = {
				energy: 0,
				isActive: false,
                SoundMachine: null      		
			};
		}
		if(!Prototype.getEnergyStorage){
			Prototype.getEnergyStorage = function(){
				return 0;
			};
		}
		/*
		Prototype.click = function(id, count, data, coords){
			return true;
		}
		*/		
		ToolAPI.registerBlockMaterial(id, "stone");
		Block.setDestroyTime(id, 3);
		TileEntity.registerPrototype(id, Prototype);
		EnergyTileRegistry.addEnergyTypeForId(id, EU);
	},

	getMachineDrop: function(coords, blockID, level, standartDrop){
		var item = Player.getCarriedItem();
		if(item.id==ItemID.wrench){
			ToolAPI.breakCarriedTool(10);
			World.setBlock(coords.x, coords.y, coords.z, 0);
			if(Math.random() < 0.8){return [[blockID, 1, 0]];}
			return [[standartDrop || blockID, 1, 0]];
		}
		if(item.id==ItemID.electricWrench && item.data + 500 <= Item.getMaxDamage(item.id)){
			Player.setCarriedItem(item.id, 1, item.data + 500);
			World.setBlock(coords.x, coords.y, coords.z, 0);
			return [[blockID, 1, 0]];
		}
		if(level > 0){
			return [[standartDrop || blockID, 1, 0]];
		}
		return [];
	},
	initModel: function(){
		if(this.data.isActive){
			var block = World.getBlock(this.x, this.y, this.z);
			ICore.Render.mapAtCoords(this.x, this.y, this.z, block.id, block.data);
		}
	},
	
	activateMachine: function(){
		if(!this.data.isActive){
			this.data.isActive = true;
			var block = World.getBlock(this.x, this.y, this.z);
			ICore.Render.mapAtCoords(this.x, this.y, this.z, block.id, block.data);
			if(this.data.SoundMachine != null){
			PlayBlockSound(this, this.data.SoundMachine, true, 24);
			}
		}
	},
	
	deactivateMachine: function(){
		if(this.data.isActive){
			this.data.isActive = false;
			BlockRenderer.unmapAtCoords(this.x, this.y, this.z);
			if(this.data.SoundMachine != null){
			StopBlockSound(this);
			}
		}
	},
	basicEnergyReceiveFunc: function(type, src){
		var energyNeed = this.getEnergyStorage() - this.data.energy;
		this.data.energy += src.getAll(energyNeed);
	}
}




// file: api/tileentity/GT_Pipe.js

var GT_Pipe = {
	registerPipe: function(id, fluid){		
		fluid.registerWire(id);		
	},
	setupFluidPipeRender: function(id, fluid, width, groupName, preventSelfAdd){
	/* drop func */
	Block.registerDropFunctionForID(id, function(){
		return [[id, 1, 0]];
	});

	/* render */
	var render = new ICRender.Model();
    BlockRenderer.setStaticICRender(id, 0, render);
   
    var boxes = [
        {side: [1, 0, 0], box: [0.5 + width / 2, 0.5 - width / 2, 0.5 - width / 2, 1, 0.5 + width / 2, 0.5 + width / 2]},
        {side: [-1, 0, 0], box: [0, 0.5 - width / 2, 0.5 - width / 2, 0.5 - width / 2, 0.5 + width / 2, 0.5 + width / 2]},
        {side: [0, 1, 0], box: [0.5 - width / 2, 0.5 + width / 2, 0.5 - width / 2, 0.5 + width / 2, 1, 0.5 + width / 2]},
        {side: [0, -1, 0], box: [0.5 - width / 2, 0, 0.5 - width / 2, 0.5 + width / 2, 0.5 - width / 2, 0.5 + width / 2]},
        {side: [0, 0, 1], box: [0.5 - width / 2, 0.5 - width / 2, 0.5 + width / 2, 0.5 + width / 2, 0.5 + width / 2, 1]},
        {side: [0, 0, -1], box: [0.5 - width / 2, 0.5 - width / 2, 0, 0.5 + width / 2, 0.5 + width / 2, 0.5 - width / 2]},
    ]
   
    var group = ICRender.getGroup(groupName);
    if (!preventSelfAdd) {
        group.add(id, -1);
    }
   
    for (var i in boxes) {
        var box = boxes[i];
       
        var model = BlockRenderer.createModel();
        model.addBox(box.box[0], box.box[1], box.box[2], box.box[3], box.box[4], box.box[5], id, 0);
       
        render.addEntry(model).asCondition(box.side[0], box.side[1], box.side[2], group, 0);
    }
   
    var model = BlockRenderer.createModel();
    model.addBox(0.5 - width / 2, 0.5 - width / 2, 0.5 - width / 2, 0.5 + width / 2, 0.5 + width / 2, 0.5 + width / 2, id, 0);
    render.addEntry(model);
    
    width = Math.max(width, 0.5);
    Block.setBlockShape(id, {x: 0.5 - width/2, y: 0.5 - width/2, z: 0.5 - width/2}, {x: 0.5 + width/2, y: 0.5 + width/2, z: 0.5 + width/2});
	
	GT_Pipe.registerPipe(id, fluid);
    }	
};






// file: api/tileentity/GT_Wire.js

var GT_Wire = {
	registerWire: function(id, energy){
		energy.registerWire(id);
	},
	setupWireRender: function(id, energy, width, groupName, preventSelfAdd){
	/* drop func */
	Block.registerDropFunctionForID(id, function(){
		return [[id, 1, 0]];
	});

	/* render */
	var render = new ICRender.Model();
    BlockRenderer.setStaticICRender(id, 0, render);
   
    var boxes = [
        {side: [1, 0, 0], box: [0.5 + width / 2, 0.5 - width / 2, 0.5 - width / 2, 1, 0.5 + width / 2, 0.5 + width / 2]},
        {side: [-1, 0, 0], box: [0, 0.5 - width / 2, 0.5 - width / 2, 0.5 - width / 2, 0.5 + width / 2, 0.5 + width / 2]},
        {side: [0, 1, 0], box: [0.5 - width / 2, 0.5 + width / 2, 0.5 - width / 2, 0.5 + width / 2, 1, 0.5 + width / 2]},
        {side: [0, -1, 0], box: [0.5 - width / 2, 0, 0.5 - width / 2, 0.5 + width / 2, 0.5 - width / 2, 0.5 + width / 2]},
        {side: [0, 0, 1], box: [0.5 - width / 2, 0.5 - width / 2, 0.5 + width / 2, 0.5 + width / 2, 0.5 + width / 2, 1]},
        {side: [0, 0, -1], box: [0.5 - width / 2, 0.5 - width / 2, 0, 0.5 + width / 2, 0.5 + width / 2, 0.5 - width / 2]},
    ]
   
    var group = ICRender.getGroup(groupName);
    if (!preventSelfAdd) {
        group.add(id, -1);
    }
   
    for (var i in boxes) {
        var box = boxes[i];
       
        var model = BlockRenderer.createModel();
        model.addBox(box.box[0], box.box[1], box.box[2], box.box[3], box.box[4], box.box[5], id, 0);
       
        render.addEntry(model).asCondition(box.side[0], box.side[1], box.side[2], group, 0);
    }
   
    var model = BlockRenderer.createModel();
    model.addBox(0.5 - width / 2, 0.5 - width / 2, 0.5 - width / 2, 0.5 + width / 2, 0.5 + width / 2, 0.5 + width / 2, id, 0);
    render.addEntry(model);
    
    width = Math.max(width, 0.5);
    Block.setBlockShape(id, {x: 0.5 - width/2, y: 0.5 - width/2, z: 0.5 - width/2}, {x: 0.5 + width/2, y: 0.5 + width/2, z: 0.5 + width/2});

    this.registerWire(id, energy);
}
	
};





// file: api/tileentity/GT_MultiBlock.js

var GT_MultiBlock = {multiblocks:[],
   strongIf(a, m){
	   let rt = null
	   if(a[3] == -1){
		   return World.getBlockID(m.x+a[0], m.y+a[1], m.z+a[2]) != World.getBlockID(m.x, m.y, m.z);
	   }
	   for(let keys in a[3]){
		   if(rt==null){
		       rt = World.getBlockID(m.x+a[0], m.y+a[1], m.z+a[2]) == a[3][keys];
		   }else{
		       rt = rt || World.getBlockID(m.x+a[0], m.y+a[1], m.z+a[2]) == a[3][keys];
	       }
	   }
	   return rt;
   },
    Register(name, struc){
    	name._tick = name.tick
        name.tick = function(){
        	//if(World.getWorldTime()%20==0){
                GT_MultiBlock.Corpus(this);
             //}
            this._tick()
        }    
        this.multiblocks.push({name:name, struc:struc});
    },
    Load(){
        for(var key in this.multiblocks){
            this.multiblocks[key].name.defaultValues.MAPIbl=0;
            this.multiblocks[key].name.defaultValues.MAPIact=false;
            this.multiblocks[key].name.defaultValues.MAPIside=0;
            this.multiblocks[key].name.defaultValues.MAPIkey=key;
        }
    },
    Corpus(m){
        for(var key in this.multiblocks){ 
            if(key==m.data.MAPIkey){
                if(m.data.MAPIact!=true){
                    for(var side in this.multiblocks[key].struc){
                    	m.data.MAPIbl = 0;
                        for(var keyi in this.multiblocks[key].struc[side]){ 
                            if(this.strongIf(this.multiblocks[key].struc[side][keyi], m)){ 
                                m.data.MAPIbl++; 
                                if(m.data.MAPIbl == this.multiblocks[key].struc[side].length){                              	
                                    m.data.MAPIact=true; 
                                    m.data.MAPIside=side;
                                }
                            }else{
                                break;
                            }
                        } 
                    } 
                }else{
                	m.data.MAPIbl = 0
                    for(var keyi in this.multiblocks[key].struc[m.data.MAPIside]){ 
                        if(this.strongIf(this.multiblocks[key].struc[m.data.MAPIside][keyi], m)){ 
                            m.data.MAPIbl++; 
                            if(m.data.MAPIbl == this.multiblocks[key].struc[m.data.MAPIside].length){ 
                                m.data.MAPIact = true;
                                return;
                            }
                        }else{
                        	m.data.MAPIact=false;
                            return;
                        }
                    }
                }
            }
        }
    },
    Rotate(originalStruct){
        for (var side = 1; side<=3; side++){
            originalStruct[side] = []
            for(var key in originalStruct[side-1]){
                originalStruct[side].push([originalStruct[side-1][key][2], originalStruct[side-1][key][1], -originalStruct[side-1][key][0], originalStruct[side-1][key][3]]);
            }
        }
    }
}; 


Callback.addCallback("PostLoaded", function(){
   GT_MultiBlock.Load();
});




// file: api/world/GT_Worldgen.js

let ores_types = [{name:"Stone", data:0, level:1}, {name:"Nether", data:3, level:1}, {name:"End", data:4, level:1}]
let genChanceForBreed = Config.genChanceForBreed
let limit = Config.limit
let chunkNumForGen = Config.chunkNumForGen
let GT_Worldgen = {
	strongIf(coords){
		return World.getBlockID(coords.x, coords.y, coords.z) != 0 && World.getBlockID(coords.x, coords.y, coords.z) != 8 && World.getBlockID(coords.x, coords.y, coords.z) != 9 && World.getBlockID(coords.x, coords.y, coords.z) != 10 && World.getBlockID(coords.x, coords.y, coords.z) != 11 && World.getBlockID(coords.x, coords.y, coords.z) != 7 && World.getBlockID(coords.x, coords.y, coords.z) != 2
	},
	chunkNumber(chunkX, chunkZ, n){
		return chunkX % n == 0 && chunkZ % n == 0
	},
	oresEarth:[],
	oresNether:[],
	oresEnd:[],
	breeds:[],
	oresSmall:[],
	
    SmallOreDeposite(){
        //var tiles = [0]
        return Callback.addCallback("GenerateChunk", function(chunkX, chunkZ){
        	var minY = Config.smallOresMinY
            var maxY = Config.smallOresMaxY
            var count = Config.smallOresCount
            var tiles = Config.smallOresTiles
            
            for(var c = 0; c<count; c++){
            	alert(c)
            	var key = random(0, GT_Worldgen.oresSmall.length-1)
                for(var i = maxY; i > minY; i--){
                	var coords = GenerationUtils.randomCoords(chunkX, chunkZ, minY, i);
                	for(var keys in tiles){    	
                        if(World.getBlockID(coords.x, coords.y, coords.y) == tiles[keys]){
                        	//alert(c)
                            GT_Worldgen.setOre(coords.x, coords.y, coords.z, GT_Worldgen.oresSmall[key], 0, tiles); 
                            i = minY
                            break
                        }
                    }
                }
            }
        });
    },
    GenBreed(){
    	return Callback.addCallback("GenerateChunk", function(chunkX, chunkZ){
    	    var key = random(0, GT_Worldgen.breeds.length-1)
            var arr = GT_Worldgen.breeds[key]
            
    	    if(rollPercentage(arr.chance)){
            	for(var i = arr.maxY; i > arr.minY; i--){
            	    //alert(i)
            	   var coords = GenerationUtils.randomCoords(chunkX, chunkZ, arr.minY, i);
                   if(arr.tiles == -1 && GT_Worldgen.strongIf(coords)){
                   	//alert("go")
                       var r = arr.diameter
                         for(var x = -r; x < r; x++){
                             for(var y = -r; y < r; y++) {
                                 for(var z = -r; z < r; z++){
                                    if((x * x) + (y * y) + (z * z) <= (r * r)){
                                       GT_Worldgen.setOre(x+coords.x, y+coords.y, z+coords.z, arr.id, arr.data, arr.tiles);
                                       //i = arr.maxY
                                   }
                               }
                           }
                       }
                    }else if(arr.tiles != -1){
                    	for(var keys in arr.tiles){    	
                            if(World.getBlockID(coords.x, coords.y, coords.z) == arr.tiles[keys]){
                               //alert("go")
                               var r = arr.diameter
                                 for(var x = -r; x < r; x++){
                                     for(var y = -r; y < r; y++) {
                                         for(var z = -r; z < r; z++){
                                            if((x * x) + (y * y) + (z * z) <= (r * r)){
                                               GT_Worldgen.setOre(x+coords.x, y+coords.y, z+coords.z, arr.id, arr.data, arr.tiles);
                                               i = arr.minY
                                           }
                                       }
                                   }
                               }
                            }
                        }
                    }
                var chance = 0
                var oresBreed = eval("GT_Worldgen.ores"+arr.name)
                for(var keys in oresBreed){
                	chance+=oresBreed[keys].chance
                }
                chance = round(genChanceForBreed / (chance / oresBreed.length) * 100, 1)
                if(rollPercentage(chance)){
                    eval("GT_Worldgen.GenLargeOreDepositeOn"+arr.name+"(arr, coords)")
                    return
                    }
                }
            }
        })
    },
    GenLargeOreDepositeOnEarth(){
        return Callback.addCallback("GenerateChunk", function(chunkX, chunkZ){      
            var arr
            var key
            var chance = Config.chanceMultiplier
            if(GT_Worldgen.chunkNumber(chunkX, chunkZ, chunkNumForGen)){
            	alert(chunkX+", "+chunkZ)
            	for(var l = 0; l < limit; l++){
            	    chance+=Config.chanceMultiplier
                     key = random(0, GT_Worldgen.oresEarth.length-1)
                     arr = GT_Worldgen.oresEarth[key]
                     //alert(arr.chance * chance)
                	if(rollPercentage(arr.chance * chance)){
                	    //alert(arr.chance)
                	    for(var a = 0; a<arr.count; a++){
                    	    for(var i = arr.maxY; i > arr.minY; i--){                   	        
                                //alert(i+", "+arr.minY)
                                
                                if(i==arr.minY+1){
                                	//alert("return")
                    	            return
                                }
                            	var coords = GenerationUtils.randomCoords(chunkX, chunkZ, arr.minY, i);
                                for(var keys in arr.tiles){                             
                                    if(World.getBlockID(coords.x, coords.y, coords.z) == arr.tiles[keys]){
                                       GT_Worldgen.LargeOreDepositeTemplate(coords.x, coords.y, coords.z, arr.ids, arr.size, arr.density, arr.tiles)
                                       i = arr.minY
                                       if(a == arr.count - 1){
                                           return
                                        }
                                       break                  
                                   }/*else if(i == arr.minY){                                
                                   	//alert(l)
                                       key = random(0, GT_Worldgen.oresEarth.length-1)
                                       arr = GT_Worldgen.oresEarth[key]
                                       //alert(i)
                                       if(rollPercentage(arr.chance)){
                                           a = 0
                                           break
                                       }else{
                                           //alert("return")
                                           return
                                       }
                                   }*/
                               }
                           }
                        }
                    }
                }
            }          
        })
    },
    GenLargeOreDepositeOnNether(){
        return Callback.addCallback("GenerateNetherChunk", function(chunkX, chunkZ){
        	var arr
            var key
            var chance = Config.chanceMultiplier
            if(GT_Worldgen.chunkNumber(chunkX, chunkZ, chunkNumForGen)){
            	for(var l = 0; l < limit; l++){
            	    chance+=Config.chanceMultiplier
                	 key = random(0, GT_Worldgen.oresNether.length-1)
                     arr = GT_Worldgen.oresNether[key]
                	if(rollPercentage(arr.chance * chance)){
                	    for(var a = 0; a<arr.count; a++){
                       	 for(var i = arr.maxY; i > arr.minY; i--){
                       	    if(i==arr.minY+1){
                                	//alert("return")
                    	            return
                                }
                            	var coords = GenerationUtils.randomCoords(chunkX, chunkZ, arr.minY, i);
                                for(var keys in arr.tiles){
                                    if(World.getBlockID(coords.x, coords.y, coords.z) == arr.tiles[keys]){
                                       GT_Worldgen.LargeOreDepositeTemplate(coords.x, coords.y, coords.z, arr.ids, arr.size, arr.density, arr.tiles)
                                       if(a == arr.count - 1){
                                           return
                                       }
                                       break      
                                   }/*else if(i == arr.minY){
                                       key = random(0, GT_Worldgen.oresNether.length-1)
                                       arr = GT_Worldgen.oresNether[key]
                                       //alert(i)
                                       if(rollPercentage(GT_Worldgen.oresNether[key].chance)){
                                           a = 0
                                           break
                                       }else{
                                           //alert("return")
                                           return
                                       }
                                   }*/
                               }
                           }
                       }
                    }
                }
            }               
        })
    },
    GenLargeOreDepositeOnEnd(){
        return Callback.addCallback("GenerateEndChunk", function(chunkX, chunkZ){
        	var arr
            var key
            var chance = Config.chanceMultiplier
            if(GT_Worldgen.chunkNumber(chunkX, chunkZ, chunkNumForGen)){
            	for(var l = 0; l < limit; l++){
            	    chance+=Config.chanceMultiplier
                   key = random(0, GT_Worldgen.oresEnd.length-1)
              	 arr = GT_Worldgen.oresEnd[key]
               	if(rollPercentage(arr.chance * chance)){
              	    for(var a = 0; a<arr.count; a++){
                  	    for(var i = arr.maxY; i > arr.minY; i--){    
                              if(i==arr.minY+1){
                                 //alert("return")
                    	          return
                              }              	        
                          	var coords = GenerationUtils.randomCoords(chunkX, chunkZ, arr.minY, i);
                              for(var keys in arr.tiles){  
                              	if(i==arr.minY){
                    	                return
                                    }
                                  if(World.getBlockID(coords.x, coords.y, coords.z) == arr.tiles[keys]){
                                      GT_Worldgen.LargeOreDepositeTemplate(coords.x, coords.y, coords.z, arr.ids, arr.size, arr.density, arr.tiles)
                                      if(a == arr.count - 1){
                                          return
                                      }
                                      break
                                  }/*else if(i == arr.minY){
                                      key = random(0, GT_Worldgen.oresEnd.length-1)
                                      arr = GT_Worldgen.oresEnd[key]
                                      //alert(i)
                                      if(rollPercentage(GT_Worldgen.oresEnd[key].chance)){
                                         a = 0
                                         break
                                      }else{
                                         //alert("return")
                                         return
                                      }
                                  }*/
                              }
                          }
                      }
                   }
                }
            }               
        })
    },
    RegisterLargeOreDepositeOnEarth(ids, chance, tiles, minY, maxY, size, density, count){
    	this.oresEarth.push({ids:ids, chance:chance, tiles:tiles, minY:minY, maxY:maxY, size:size, density:density, count:count})
    },
    RegisterLargeOreDepositeOnNether(ids, chance, tiles, minY, maxY, size, density, count){
    	this.oresNether.push({ids:ids, chance:chance, tiles:tiles, minY:minY, maxY:maxY, size:size, density:density, count:count})
    },
    RegisterLargeOreDepositeOnEnd(ids, chance, tiles, minY, maxY, size, density, count){
    	this.oresEnd.push({ids:ids, chance:chance, tiles:tiles, minY:minY, maxY:maxY, size:size, density:density, count:count})
    },
    RegisterBreed(id, data, diameter, chance, minY, maxY, tiles, world, name, tex, level){
    	this.breeds.push({id:id, data:data, diameter:diameter, chance:chance, minY:minY, maxY:maxY, tiles:tiles, world:world, name:name})
        //alert(lvl)
        ores_types.push({name:name, data:tex, level:level})
        eval("this.ores"+name+" = []")
        eval("this.RegisterLargeOreDepositeOn"+name+" = function(ids, chance, density){ this.ores"+name+".push({ids:ids, chance:chance, density:density}) }")
        eval("GT_Worldgen.GenLargeOreDepositeOn"+name+" = function(arr, coords){ var key = random(0, GT_Worldgen.ores"+name+".length-1); var ore = GT_Worldgen.ores"+name+"[key]; if(rollPercentage(ore.chance)){ return GT_Worldgen.LargeOreDepositeTemplate(coords.x, coords.y, coords.z, ore.ids, {x:arr.diameter*2, y:arr.diameter, z:arr.diameter*2}, ore.density, [arr.id])} }")
    },
    setOre(x, y, z, id, data, tile) {
       //alert(id)
        if(tile == -1 && this.strongIf({x:x, y:y, z:z})){
        	World.setBlock(x, y, z, id, data);
            //alert(-1)
        }else{
        	//alert(tile[0])
        	for(var keys in tile){    	
                 if(World.getBlockID(x, y, z) == tile[keys]){
                    World.setBlock(x, y, z, id, data);
                }
            }
        }
    },
    LargeOreDepositeTemplate(x, y, z, ids, size, density, tiles){
    	    var rand1 = 1.5
            var rand2 = 10
            var rand3 = 1.5
            var rand4 = 6
            var rx
            var ry = Math.floor(size.y/2)
            var rz
            if(rollPercentage(50)){
                rx = size.z
                rz = size.x
            }else{
            	rx = size.x
                rz = size.z
            }
            var n = Math.floor(size.y/ids.length) //2
            var code
            var chance
            var num 
            var id = []
            
            /*for(var key1 = 0; key1 < Math.floor(size.y / n); key1++){ // < 8 / 2 = 4
                id[key1] = []
                for(var key2 = 0; key2 < ids.length; key2++){ // ids.length = 4
                    num = key2 + key1
                	if(num < ids.length-1){
                        id[key1].push(ids[num])
                    }else{
                    	num = 0+key1
                    	id[key1].push(ids[num])
                    }
                }
            }*/
            
            for (var xx = -rx; xx <= rx; xx++) {
                for (var yy = -ry; yy < ry; yy++) { // 2
                    for (var zz = -rz; zz <= rz; zz++) {
                        if(yy % n == 0){
                        	//alert(yy)
                        	for(var a = 0; a < n; a++){
                        	    code = ""
                        	    if (Math.sqrt(xx * xx + yy * yy + zz * zz) < Math.floor((size.x + size.z) / 4) && rollPercentage(density)) {
                            	    for(var key = 0; key < ids.length; key++){
                            	        if(code == ""){
                            	            chance = Math.floor(ids.length-key-1)
                            	            code = code + "if (Math.random() < 1 / "+chance+") { GT_Worldgen.setOre(x + xx, y + yy - a, z + zz, ids[key], 0, tiles); }"
                                         }else{
                                         	chance = Math.floor(ids.length-key-1)
                                             code = code + "else if (Math.random() < 1 / "+chance+") { GT_Worldgen.setOre(x + xx, y + yy - a, z + zz, ids[key], 0, tiles); }"
                                         }  
                                         eval(code)
                                         //break
                                     }
                                 }      
                            }
                        }
                    }
                }
            }
    },
}

Callback.addCallback("PostLoaded", function(){
	GT_Worldgen.SmallOreDeposite();
	GT_Worldgen.GenBreed();
	GT_Worldgen.GenLargeOreDepositeOnEarth();
	GT_Worldgen.GenLargeOreDepositeOnNether();
	GT_Worldgen.GenLargeOreDepositeOnEnd();
})




// file: common/translation.js

//Food
Translation.addTranslation("Flour", {ru: "Мука",  zh: "面粉"});
Translation.addTranslation("Dough", {ru: "Тесто",  zh: "面团"});
Translation.addTranslation("Dough Bread", {ru: "Тесто в форме Хлеба",  zh: "面团，面包"});
Translation.addTranslation("Cocoa Powder", {ru: "Какао-порошок",  zh: "可可粉"});
Translation.addTranslation("Chocolate Dough", {ru: "Шоколадное тесто",  zh: "巧克力面团"});
Translation.addTranslation("Cookie shaped Dough", {ru: "Тесто в форме печенья",  zh: "饼形状的面"});

// Small Ore
Translation.addTranslation("Small Silver Ore", {ru: "Малая серебрянная руда",  zh: "小银矿"});
Translation.addTranslation("Small Lead Ore", {ru: "Малая свинцовая руда",  zh: "小鉛礦石"});
Translation.addTranslation("Small Tin Ore", {ru: "Малая оловянная руда",  zh: "小錫礦"});
Translation.addTranslation("Small Copper Ore", {ru: "Малая медная руда",  zh: "小銅礦石"});
Translation.addTranslation("Small Diamond Ore", {ru: "Малая алмазная руда",  zh: "小鑽石礦石"});
Translation.addTranslation("Small Emerald Ore", {ru: "Малая изумрудная руда",  zh: "小祖母綠礦石"});
Translation.addTranslation("Small Redstone Ore", {ru: "Малая красная руда",  zh: "小紅石礦石"});
Translation.addTranslation("Small Gold Ore", {ru: "Малая золотая руда",  zh: "小金礦"});
Translation.addTranslation("Small Iron Ore", {ru: "Малая железная руда",  zh: "小鐵礦石"});
Translation.addTranslation("Small Lapis-Lazuli Ore", {ru: "Малая руда ляпис-лазури",  zh: "小青金石礦石"});
Translation.addTranslation("Small Coal Ore", {ru: "Малая угольная руда",  zh: "小煤礦"});

// Ore
Translation.addTranslation("Malachite Ore", {ru: "Малахитовая руда",  zh: "孔雀石礦石"});
Translation.addTranslation("Banded Iron Ore", {ru: "Руда полосчатого железа",  zh: "帶狀鐵礦石"});
Translation.addTranslation("Yellow Limonite Ore", {ru: "Руда жёлтого лимонита",  zh: "黃褐鐵礦礦石"});
Translation.addTranslation("Brown Limonite Ore", {ru: "Руда коричневого лимонита",  zh: "棕色褐鐵礦礦石"});
Translation.addTranslation("Pyrite Ore", {ru: "Пиритовая руда",  zh: "硫鐵礦"});
Translation.addTranslation("Chalcopyrite Ore", {ru: "Халькопиритовая руда",  zh: "黃銅礦"});
Translation.addTranslation("Vanadium-Magnetite Ore", {ru: "Ванадий-Магнетитовая руда",  zh: "釩磁鐵礦"});
Translation.addTranslation("Magnetite Ore", {ru: "Магнетитовая руда",  zh: "磁鐵礦"});
Translation.addTranslation("Iron Ore", {ru: "Железная руда",  zh: "鐵礦"});
Translation.addTranslation("Cassiterite Ore", {ru: "Касситеритная руда",  zh: "錫石礦石"});
Translation.addTranslation("Antimonite Ore", {ru: "Антимонитовая руда",  zh: "銻礦"});
Translation.addTranslation("Tetrahedrite Ore", {ru: "Тетраэдритная руда",  zh: "四鐵礦礦石"});
Translation.addTranslation("Galena Ore", {ru: "Галенитовая руда",  zh: "方鉛礦礦石"});
Translation.addTranslation("Silver Ore", {ru: "Серебрянная руда",  zh: "银矿"});
Translation.addTranslation("Coal Ore", {ru: "Угольная руда",  zh: "煤礦"});
Translation.addTranslation("Lignite Ore", {ru: "Руда бурого угля",  zh: "褐煤煤礦"});
Translation.addTranslation("Lazurite Ore", {ru: "Лазуритовая руда",  zh: "Lazurite礦石"});
Translation.addTranslation("Lapis-Lazuli Ore", {ru: "Руда ляпис-лазури",  zh: "Lapis-Lazuli礦石"});
Translation.addTranslation("Sodalite Ore", {ru: "Содалитовая руда",  zh: "方鈉石礦石"});
Translation.addTranslation("Calcite Ore", {ru: "Кальцитовая руда",  zh: "方解石礦石"});
Translation.addTranslation("Redstone Ore", {ru: "Руда красного камня",  zh: "紅石礦石"});
Translation.addTranslation("Cinnabar Ore", {ru: "Киноварная руда",  zh: "硃砂礦石"});
Translation.addTranslation("Ruby Ore", {ru: "Рубиновая руда",  zh: "紅寶石礦石"});
Translation.addTranslation("Diamond Ore", {ru: "Алмазная руда",  zh: "鑽石礦石"});
Translation.addTranslation("Graphite Ore", {ru: "Графитовая руда",  zh: "石墨礦"});
Translation.addTranslation("Gold Ore", {ru: "Золотая руда",  zh: "金礦"});
Translation.addTranslation("Bauxite Ore", {ru: "Бокситовая руда",  zh: "矾土矿"});
Translation.addTranslation("Sapphire Ore", {ru: "Сапфировая руда",  zh: "蓝宝石矿石"});
Translation.addTranslation("Emerald Ore", {ru: "Изумрудная руда",  zh: "绿宝石矿石"});
Translation.addTranslation("Wolfram Ore", {ru: "Вольфрамовая руда",  zh: "钨矿石"});
Translation.addTranslation("Sulfur Ore", {ru: "Руда cеры",  zh: "硫矿石"});
Translation.addTranslation("Nickel Ore", {ru: "Никелевая руда",  zh: "镍矿"});
Translation.addTranslation("Aluminium Ore", {ru: "Алюминиевая руда",  zh: "铝矿的"});


//INGOT
Translation.addTranslation("Lignite", {ru: "Бурый уголь",  zh: "褐煤"});
Translation.addTranslation("Rubber Ingot", {ru: "Резиновый брусок",  zh: "橡胶酒吧"});
Translation.addTranslation("Silver Ingot", {ru: "Серебряный слиток",  zh: "银锭"});
Translation.addTranslation("Antimony Ingot", {ru: "Слиток сурьмы",  zh: "锑锭"});
Translation.addTranslation("WroughtIron Ingot", {ru: "Слиток кованого железа",  zh: "铁铸锭"});
Translation.addTranslation("RedAlloy Ingot", {ru: "Слиток красного сплава",  zh: "红合金锭"});
Translation.addTranslation("Chrome Ingot", {ru: "Хромированный слиток",  zh: "铬钢锭"});
Translation.addTranslation("Aluminium Ingot", {ru: "Алюминиевый слиток",  zh: "铝锭"});
Translation.addTranslation("Titanium Ingot", {ru: "Титановый слиток",  zh: "钛铝锭"});
Translation.addTranslation("Stainless Ingot", {ru: "Нержавеющий слиток",  zh: "不锈钢锭"});
Translation.addTranslation("Wolfram Ingot", {ru: "Вольфрамовый слиток",  zh: "Wolfram锭"});
Translation.addTranslation("Nickel Ingot", {ru: "Никелевый слиток",  zh: "镍铝锭"});


//NUGGETS
Translation.addTranslation("Rubber Nugget", {ru: "Резиновый обломок",  zh: "橡胶片"});
Translation.addTranslation("Tin Nugget", {ru: "Оловянный самородок",  zh: "锡金块"});
Translation.addTranslation("Copper Nugget", {ru: "Медный самородок",  zh: "铜金块"});
Translation.addTranslation("Bronze Nugget", {ru: "Бронзовый самородок",  zh: "铜金块"});
Translation.addTranslation("Silver Nugget", {ru: "Серебряный самородок",  zh: "银块"});
Translation.addTranslation("Iron Nugget", {ru: "Железный самородок",  zh: "铁块"});
Translation.addTranslation("Steel Nugget", {ru: "Стальной самородок",  zh: "鋼塊"});
Translation.addTranslation("Lead Nugget", {ru: "Свинцовый самородок",  zh: "铅块"});
Translation.addTranslation("Antimony Nugget", {ru: "Самородок из сурьмы",  zh: "金块的锑"});
Translation.addTranslation("WroughtIron Nugget", {ru: "Самородок кованого железа",  zh: "锻铁块"});
Translation.addTranslation("Gold Nugget", {ru: "Золотой самородок",  zh: "金块"});
Translation.addTranslation("Chrome Nugget", {ru: "Хромированный самородок",  zh: "铬块"});
Translation.addTranslation("Aluminium Nugget", {ru: "Алюминиевый самородок",  zh: "铝金块"});
Translation.addTranslation("Titanium Nugget", {ru: "Титановый самородок",  zh: "钛金块"});
Translation.addTranslation("Stainless Nugget", {ru: "Нержавеющий самородок",  zh: "不锈金块"});
Translation.addTranslation("Wolfram Nugget", {ru: "Вольфрамовый самородок",  zh: "Wolfram块"});
Translation.addTranslation("Nickel Nugget", {ru: "Никелевый самородок",  zh: "镍金块"});


//PLATES
Translation.addTranslation("Rubber Plate", {ru: "Резиновый лист",  zh: "橡胶板"});
Translation.addTranslation("LapisLazuli Plate", {ru: "Лазуритная пластина",  zh: "青金石板"});
Translation.addTranslation("Redstone Plate", {ru: "Пластина из красного камня",  zh: "紅石板"});
Translation.addTranslation("Emerald Plate", {ru: "Изумрудная пластина",  zh: "綠寶石板"});
Translation.addTranslation("Diamond Plate", {ru: "Алмазная пластина",  zh: "鑽石板"});
Translation.addTranslation("Silver Plate", {ru: "Серебрянная пластина",  zh: "银板"});
Translation.addTranslation("Antimony Plate", {ru: "Пластина из сурьмы",  zh: "板锑"});
Translation.addTranslation("WroughtIron Plate", {ru: "Пластина кованого железа",  zh: "锻铁板"});
Translation.addTranslation("Wood Plate", {ru: "Деревянная пластина",  zh: "木板"});
Translation.addTranslation("RedAlloy Plate", {ru: "Пластина из красного сплава",  zh: "红合金板"});
Translation.addTranslation("Chrome Plate", {ru: "Хромированная пластина",  zh: "铬板"});
Translation.addTranslation("Aluminium Plate", {ru: "Алюминиевая пластина",  zh: "铝板"});
Translation.addTranslation("Titanium Plate", {ru: "Титановая пластина",  zh: "钛板"});
Translation.addTranslation("Stainless Plate", {ru: "Нержавеющая пластина",  zh: "不锈钢板"});
Translation.addTranslation("Wolfram Plate", {ru: "Вольфрамовая пластина",  zh: "Wolfram板"});
Translation.addTranslation("Nickel Plate", {ru: "Никелевая пластина",  zh: "镍板"});


//RODS
Translation.addTranslation("Rubber Rod", {ru: "Резиновый стержень",  zh: "橡胶棒"});
Translation.addTranslation("Tin Rod", {ru: "Оловянный стержень",  zh: "锡杆"});
Translation.addTranslation("Copper Rod", {ru: "Медный стержень",  zh: "铜终端"});
Translation.addTranslation("Bronze Rod", {ru: "Бронзовый стержень",  zh: "铜板"});
Translation.addTranslation("Iron Rod", {ru: "Железный стержень",  zh: "铁杆"});
Translation.addTranslation("Steel Rod", {ru: "Стальной стержень",  zh: "鋼棒"});
Translation.addTranslation("Silver Rod", {ru: "Серебряный стержень",  zh: "银杆"});
Translation.addTranslation("Gold Rod", {ru: "Золотой стержень",  zh: "金棒"});
Translation.addTranslation("Lead Rod", {ru: "Свинцовый стержень",  zh: "导致网"});
Translation.addTranslation("Antimony Rod", {ru: "Стержень из сурьмы",  zh: "棒的锑"});
Translation.addTranslation("WroughtIron Rod", {ru: "Стержень кованого железа",  zh: "锻铁杆"});
Translation.addTranslation("Magnetic Iron Rod", {ru: "Магнитный железный стержень",  zh: "磁铁杆"});

//LONG ROD
Translation.addTranslation("Long Rubber Rod", {ru: "Длинный резиновый стержень",  zh: "长橡胶棒"});
Translation.addTranslation("Long Tin Rod", {ru: "Длинный оловянный стержень",  zh: "只要锡杆"});
Translation.addTranslation("Long Copper Rod", {ru: "Длинный медный стержень",  zh: "长长铜杆"});
Translation.addTranslation("Long Bronze Rod", {ru: "Длинный бронзовый стержень",  zh: "长长铜杆"});
Translation.addTranslation("Long Silver Rod", {ru: "Длинный серебряный стержень",  zh: "只要银杆"});
Translation.addTranslation("Long Gold Rod", {ru: "Длинный золотой стержень",  zh: "金色的长杆"});
Translation.addTranslation("Long Iron Rod", {ru: "Длинный железный стержень",  zh: "长的铁杆"});
Translation.addTranslation("Long Steel Rod", {ru: "Длинный стальной стержень",  zh: "長鋼棒"});
Translation.addTranslation("Long Lead Rod", {ru: "Длинный свинцовый стержень",  zh: "长导杆"});
Translation.addTranslation("Long Antimony Rod", {ru: "Длинный стержень из сурьмы",  zh: "一个漫长的杆的锑"});
Translation.addTranslation("Long WroughtIron Rod", {ru: "Длинный стержень кованого железа",  zh: "长锻铁杆"});

// Ring
Translation.addTranslation("Rubber Ring", {ru: "Резиновое кольцо",  zh: "橡皮圈"});
Translation.addTranslation("Tin Ring", {ru: "Оловянное кольцо",  zh: "环锡"});


//BOLTS
Translation.addTranslation("Rubber Bolt", {ru: "Резиновый болт",  zh: "橡胶螺栓"});
Translation.addTranslation("Tin Bolt", {ru: "Оловянный болт",  zh: "锡螺栓"});
Translation.addTranslation("Copper Bolt", {ru: "Медный болт",  zh: "铜的螺栓"});
Translation.addTranslation("Bronze Bolt", {ru: "Бронзовый болт",  zh: "铜牌螺栓"});
Translation.addTranslation("Iron Bolt", {ru: "Железный болт",  zh: "一个铁的螺栓"});
Translation.addTranslation("Steel Bolt", {ru: "Стальной болт",  zh: "鋼螺栓"});
Translation.addTranslation("Silver Bolt", {ru: "Серебряный болт",  zh: "银螺栓"});
Translation.addTranslation("Gold Bolt", {ru: "Золотой болт",  zh: "金螺栓"})
Translation.addTranslation("Lead Bolt", {ru: "Свинцовый болт",  zh: "导致螺栓"});
Translation.addTranslation("Antimony Bolt", {ru: "Болт из сурьмы",  zh: "螺栓从锑"});
Translation.addTranslation("WroughtIron Bolt", {ru: "Болт кованого железа",  zh: "锻铁螺栓"});


//DUSTS
Translation.addTranslation("Rubber Dust", {ru: "Резиновая масса",  zh: "橡胶纸浆"});
Translation.addTranslation("Glass Dust", {ru: "Стеклянная пыль",  zh: "玻璃粉尘"});
Translation.addTranslation("Stone Dust", {ru: "Каменная пыль",  zh: "石灰尘"});
Translation.addTranslation("Wood Dust", {ru: "Деревянная масса",  zh: "木屑"});
Translation.addTranslation("Lignite Dust", {ru: "Пыль бурого угля",  zh: "褐煤灰"});
Translation.addTranslation("RedAlloy Dust", {ru: "Пыль красного сплава",  zh: "红合金粉尘"});
Translation.addTranslation("Ashes Dust", {ru: "Пепел",  zh: "灰燼"});
Translation.addTranslation("DarkAshes Dust", {ru: "Зола",  zh: "黑暗的灰燼"});
Translation.addTranslation("LapisLazuli Dust", {ru: "Лазуритная пыль",  zh: "青金石灰塵"});
Translation.addTranslation("Emerald Dust", {ru: "Изумрудная пыль",  zh: "祖母綠的塵埃"});
Translation.addTranslation("Steel Dust", {ru: "Стальная пыль",  zh: "鋼塵"});
Translation.addTranslation("Antimony Dust", {ru: "Пыль сурьмы",  zh: "灰尘的锑"});
Translation.addTranslation("WroughtIron Dust", {ru: "Пыль кованого железа",  zh: "锻铁粉"});
Translation.addTranslation("Chrome Dust", {ru: "Хромированная пыль",  zh: "铬灰尘"});
Translation.addTranslation("Aluminium Dust", {ru: "Алюминиевая пыль",  zh: "铝螺钉"});
Translation.addTranslation("Titanium Dust", {ru: "Титановая пыль",  zh: "钛灰尘"});
Translation.addTranslation("Stainless Dust", {ru: "Нержавеющая пыль",  zh: "不锈尘"});
Translation.addTranslation("Wolfram Dust", {ru: "Вольфрамовая пыль",  zh: "Wolfram灰尘"});
Translation.addTranslation("Nickel Dust", {ru: "Никелевая пыль",  zh: "镍粉尘"});
Translation.addTranslation("RedGranit Dust", {ru: "Пыль красного гранита",  zh: "红花岗石灰尘"});
Translation.addTranslation("BlackGranit Dust", {ru: "Пыль чёрного гранита",  zh: "灰黑色花岗岩"});
Translation.addTranslation("Bauxite Dust", {ru: "Бокситовая пыль",  zh: "铝土矿灰尘"});
Translation.addTranslation("Magnetite Dust", {ru: "Магнетитовая пыль",  zh: "磁铁矿的灰尘"});
Translation.addTranslation("Tetrahedrite Dust", {ru: "Тетраэдритная пыль",  zh: "Tetrahedrite灰尘"});
Translation.addTranslation("Galena Dust", {ru: "Галенитовая пыль",  zh: "Galena灰尘"});


//SMALL DUSTS
Translation.addTranslation("Small Pile of Rubber Dust", {ru: "Малая кучка резиновой массы",  zh: "一小堆的橡胶纸浆"});
Translation.addTranslation("Small Pile of Emerald Dust", {ru: "Малая кучка изумрудной пыли",  zh: "小堆翠綠的塵土"});
Translation.addTranslation("Small Pile of Diamond Dust", {ru: "Малая кучка алмазной пыли",  zh: "小堆金剛石粉塵"});
Translation.addTranslation("Small Pile of Tin Dust", {ru: "Малая кучка оловянной пыли",  zh: "一小堆的锡灰尘"});
Translation.addTranslation("Small Pile of Copper Dust", {ru: "Малая кучка медной пыли",  zh: "一小堆铜灰尘"});
Translation.addTranslation("Small Pile of Bronze Dust", {ru: "Малая кучка бронзовой пыли",  zh: "一小堆铜灰尘"});
Translation.addTranslation("Small Pile of Iron Dust", {ru: "Малая кучка железной пыли",  zh: "小堆的铁粉"});
Translation.addTranslation("Small Pile of Steel Dust", {ru: "Малая кучка стальной пыли",  zh: "一小堆鋼塵"});
Translation.addTranslation("Small Pile of Silver Dust", {ru: "Малая кучка серебряной пыли",  zh: "一小堆银灰尘"});
Translation.addTranslation("Small Pile of Gold Dust", {ru: "Малая кучка золотой пыли",  zh: "一小堆黄尘"});
Translation.addTranslation("Small Pile of Lead Dust", {ru: "Малая кучка свинцовой пыли",  zh: "一小堆铅粉尘"});
Translation.addTranslation("Small Pile of Antimony Dust", {ru: "Малая кучка пыли из сурьмы",  zh: "一小堆的粉尘从锑"});
Translation.addTranslation("Small Pile of WroughtIron Dust", {ru: "Малая кучка пыли кованого железа",  zh: "小堆的锻铁粉"});
Translation.addTranslation("Small Pile of Sulfur Dust", {ru: "Малая кучка серной пыли",  zh: "小堆的硫灰尘"});
Translation.addTranslation("Small Pile of Chrome Dust", {ru: "Малая кучка хромированной пыли",  zh: "小堆的粉尘"});
Translation.addTranslation("Small Pile of Aluminium Dust", {ru: "Малая кучка алюминиевой пыли",  zh: "小堆的铝粉尘"});
Translation.addTranslation("Small Pile of Titanium Dust", {ru: "Малая кучка титановой пыли",  zh: "小堆的钛灰尘"});
Translation.addTranslation("Small Pile of Stainless Dust", {ru: "Малая кучка нержавеющей пыли",  zh: "小堆的不锈尘"});
Translation.addTranslation("Small Pile of Wolfram Dust", {ru: "Малая кучка вольфрамовой пыли",  zh: "小堆的Wolfram灰尘"});
Translation.addTranslation("Small Pile of Nickel Dust", {ru: "Малая кучка никелевой пыли",  zh: "小堆的镍粉尘"});
Translation.addTranslation("Small Pile of Stone Dust", {ru: "Малая кучка каменной пыли",  zh: "小堆的石灰尘"});
Translation.addTranslation("Small Pile of RedGranit Dust", {ru: "Малая кучка пыли красного гранита",  zh: "一小撮尘红花岗岩"});
Translation.addTranslation("Small Pile of BlackGranit Dust", {ru: "Малая кучка пыли чёрного гранита",  zh: "一小堆黑色花岗石灰尘"});
Translation.addTranslation("Small Pile of Bauxite Dust", {ru: "Малая кучка бокситовой пыли",  zh: "小堆的铝土矿灰尘"});
Translation.addTranslation("Small Pile of Magnetite Dust", {ru: "Малая кучка магнетитовой пыли",  zh: "小堆的磁铁矿的灰尘"});
Translation.addTranslation("Small Pile of Tetrahedrite Dust", {ru: "Малая кучка тэтраэдритной пыли",  zh: "小堆的Tetrahedrite灰尘"});
Translation.addTranslation("Small Pile of Galena Dust", {ru: "Малая кучка галенитовой пыли",  zh: "小堆的方铅的粉尘"});


//TINY DUSTS
Translation.addTranslation("Tiny Pile of Rubber Dust", {ru: "Крошечная кучка резиновой массы",  zh: "小堆的橡胶纸浆"});
Translation.addTranslation("Tiny Pile of Ashes Dust", {ru: "Крошечная кучка пепла",  zh: "一小堆灰燼"});
Translation.addTranslation("Tiny Pile of DarkAshes Dust", {ru: "Крошечная кучка золы",  zh: "一小堆黑灰"});
Translation.addTranslation("Tiny Pile of Emerald Dust", {ru: "Крошечная кучка изумрудной пыли",  zh: "一小堆翠綠的灰塵"});
Translation.addTranslation("Tiny Pile of Diamond Dust", {ru: "Крошечная кучка алмазной пыли",  zh: "一小堆金剛石粉塵尘"});
Translation.addTranslation("Tiny Pile of Tin Dust", {ru: "Крошечная кучка оловянной пыли",  zh: "小堆的锡灰尘"});
Translation.addTranslation("Tiny Pile of Copper Dust", {ru: "Крошечная кучка медной пыли",  zh: "小堆铜灰尘"});
Translation.addTranslation("Tiny Pile of Bronze Dust", {ru: "Крошечная кучка бронзовой пыли",  zh: "小堆铜灰尘"});
Translation.addTranslation("Tiny Pile of Iron Dust", {ru: "Крошечная кучка железной пыли",  zh: "微小的鐵塵埃堆"});
Translation.addTranslation("Tiny Pile of Steel Dust", {ru: "Крошечная кучка стальной пыли",  zh: "一小堆鋼塵"});
Translation.addTranslation("Tiny Pile of Silver Dust", {ru: "Крошечная кучка серебряной пыли",  zh: "小堆银灰尘"});
Translation.addTranslation("Tiny Pile of Gold Dust", {ru: "Крошечная кучка золотой пыли",  zh: "小堆黄尘"});
Translation.addTranslation("Tiny Pile of Lead Dust", {ru: "Крошечная кучка свинцовой пыли",  zh: "小堆铅粉尘"});
Translation.addTranslation("Tiny Pile of Antimony Dust", {ru: "Крошечная кучка пыли из сурьмы",  zh: "小堆的粉尘从锑"});
Translation.addTranslation("Tiny Pile of WroughtIron Dust", {ru: "Крошечная кучка пыли кованого железа",  zh: "小堆的锻铁粉"});


//CRUSHED
Translation.addTranslation("Crushed Lignite Ore", {ru: "Измельчённая руда бурого угля",  zh: "粉碎的褐煤礦"});
Translation.addTranslation("Crushed Malachite Ore", {ru: "Измельчённая малахитовая руда",  zh: "粉碎石矿"});
Translation.addTranslation("Crushed BandedIron Ore", {ru: "Измельчённая железо-полосчатая руда",  zh: "粉碎铁矿石镶边"});
Translation.addTranslation("Crushed YellowLimonite Ore", {ru: "Измельчённая руда жёлтого лимонита",  zh: "粉碎矿石的黄褐铁矿"});
Translation.addTranslation("Crushed BrownLimonite Ore", {ru: "Измельчённая руда коричневого лимонита",  zh: "粉碎矿石棕褐铁矿"});
Translation.addTranslation("Crushed Pyrite Ore", {ru: "Измельчённая пиритовая руда",  zh: "碎黄铁矿石"});
Translation.addTranslation("Crushed Chalcopyrite Ore", {ru: "Измельчённая халькопиритовая руда",  zh: "粉碎黄铜矿石"});
Translation.addTranslation("Crushed VanadiumMagnetite Ore", {ru: "Измельчённая ванадий-магнетитовая руда",  zh: "碎钒-磁铁矿"});
Translation.addTranslation("Crushed Magnetite Ore", {ru: "Измельчённая магнетитовая руда",  zh: "粉碎的磁铁矿"});
Translation.addTranslation("Crushed Cassiterite Ore", {ru: "Измельчённая касситеритовая руда",  zh: "粉碎矿石，锡石"});
Translation.addTranslation("Crushed Antimony Ore", {ru: "Измельчённая антимонитовая руда",  zh: "粉碎矿石Antimonova"});
Translation.addTranslation("Crushed Tetrahedrite Ore", {ru: "Измельчённая тетраэдритная руда",  zh: "粉碎矿石Tetraedrica"});
Translation.addTranslation("Crushed Galena Ore", {ru: "Измельчённая галенитовая руда",  zh: "碾碎的方铅矿矿石"});
Translation.addTranslation("Crushed LapisLazuli Ore", {ru: "Измельчённая лазуритная руда",  zh: "粉碎的青金石礦石"});
Translation.addTranslation("Crushed Redstone Ore", {ru: "Измельчённая красная руда",  zh: "碾碎的紅石礦石"});
Translation.addTranslation("Crushed Emerald Ore", {ru: "Измельчённая изумрудная руда",  zh: "祖母綠碾碎的礦石"});
Translation.addTranslation("Crushed Diamond Ore", {ru: "Измельчённая алмазная руда",  zh: "粉碎的鑽石礦石"});
Translation.addTranslation("Crushed Coal Ore", {ru: "Измельчённая угольная руда",  zh: "碎煤礦"});
Translation.addTranslation("Crushed Iron Ore", {ru: "Измельчённая железная руда",  zh: "粉碎的鐵礦石"});
Translation.addTranslation("Crushed Tin Ore", {ru: "Измельчённая оловянная руда",  zh: "被擊碎的錫礦石"});
Translation.addTranslation("Crushed Silver Ore", {ru: "Измельчённая серебряная руда",  zh: "粉碎銀礦"});
Translation.addTranslation("Crushed Gold Ore", {ru: "Измельчённая золотая руда",  zh: "粉碎的金礦石"});
Translation.addTranslation("Crushed Copper Ore", {ru: "Измельчённая медная руда",  zh: "銅礦粉碎"});
Translation.addTranslation("Crushed Lead Ore", {ru: "Измельчённая свинцовая руда",  zh: "鉛礦石粉碎"});


// PURIFIED
Translation.addTranslation("Purified Crushed LapisLazuli Ore", {ru: "Очищенная лазуритная руда",  zh: "純淨的青金石礦石"});
Translation.addTranslation("Purified Crushed Redstone Ore", {ru: "Очищенная красная руда",  zh: "純化的紅石礦石"});
Translation.addTranslation("Purified Crushed Emerald Ore", {ru: "Очищенная изумрудная руда",  zh: "純淨的祖母綠礦石"});
Translation.addTranslation("Purified Crushed Diamond Ore", {ru: "Очищенная алмазная руда",  zh: "純淨的鑽石礦石"});
Translation.addTranslation("Purified Crushed Coal Ore", {ru: "Очищенная угольная руда",  zh: "淨化煤礦"});
Translation.addTranslation("Purified Crushed Iron Ore", {ru: "Очищенная железная руда",  zh: "純化的鐵礦石"});
Translation.addTranslation("Purified Crushed Tin Ore", {ru: "Очищенная оловянная руда",  zh: "純錫礦石"});
Translation.addTranslation("Purified Crushed Silver Ore", {ru: "Очищенная серебряная руда",  zh: "純銀礦石"});
Translation.addTranslation("Purified Crushed Gold Ore", {ru: "Очищенная золотая руда",  zh: "純化的金礦石"});
Translation.addTranslation("Purified Crushed Copper Ore", {ru: "Очищенная медная руда",  zh: "純化的銅礦"});
Translation.addTranslation("Purified Crushed Lead Ore", {ru: "Очищенная свинцовая руда",  zh: "純化鉛礦石"});
Translation.addTranslation("Purified Crushed Lignite Ore", {ru: "Очищенная руда бурого угля",  zh: "純化的褐煤礦石"});

//IMPURE DUST
Translation.addTranslation("Impure Stone Dust", {ru: "Загрязнённая каменная пыль",  zh: "不純的石頭塵土"});
Translation.addTranslation("Impure Lignite Dust", {ru: "Загрязнённая пыль бурого угля",  zh: "不純的褐煤粉塵"});
Translation.addTranslation("Impure Malachite Dust", {ru: "Загрязнённая малахитовая пыль",  zh: "被污染的石灰尘"});
Translation.addTranslation("Impure BandedIron Dust", {ru: "Загрязнённая железо-полосчатая пыль",  zh: "受污染的铁-带状灰尘"});
Translation.addTranslation("Impure YellowLimonite Dust", {ru: "Загрязнённая пыль жёлтого лимонита",  zh: "被污染的粉尘黄褐铁矿"});
Translation.addTranslation("Impure BrownLimonite Dust", {ru: "Загрязнённая пыль коричневого лимонита",  zh: "被污染的粉尘棕褐铁矿"});
Translation.addTranslation("Impure Pyrite Dust", {ru: "Загрязнённая пиритовая пыль",  zh: "受污染的黄铁矿灰尘"});
Translation.addTranslation("Impure Chalcopyrite Dust", {ru: "Загрязнённая халькопиритовая пыль",  zh: "黄铜矿污染的粉尘"});
Translation.addTranslation("Impure VanadiumMagnetite Dust", {ru: "Загрязнённая ванадий-магнетитовая пыль",  zh: "受污染的钒磁铁矿的灰尘"});
Translation.addTranslation("Impure Magnetite Dust", {ru: "Загрязнённая магнетитовая пыль",  zh: "受污染的磁铁矿的灰尘"});
Translation.addTranslation("Impure Cassiterite Dust", {ru: "Загрязнённая касситеритовая пыль",  zh: "锡石被污染的粉尘"});
Translation.addTranslation("Impure Antimony Dust", {ru: "Загрязнённая антимонитовая пыль",  zh: "Antimonova被污染的粉尘"});
Translation.addTranslation("Impure Tetrahedrite Dust", {ru: "Загрязнённая тетраэдритовая пыль",  zh: "Tetraedrica被污染的粉尘"});
Translation.addTranslation("Impure Galena Dust", {ru: "Загрязнённая галенитовая пыль",  zh: "Galena被污染的粉尘"});
Translation.addTranslation("Impure LapisLazuli Dust", {ru: "Загрязнённая лазуритная пыль",  zh: "不純的青金石礦石"});
Translation.addTranslation("Impure Redstone Dust", {ru: "Загрязнённая красная пыль",  zh: "不純的紅石礦"});
Translation.addTranslation("Impure Emerald Dust", {ru: "Загрязнённая изумрудная пыль",  zh: "不純的祖母綠礦石"});
Translation.addTranslation("Impure Diamond Dust", {ru: "Загрязнённая алмазная пыль",  zh: "不純的鑽石礦石"});
Translation.addTranslation("Impure Coal Dust", {ru: "Загрязнённая угольная пыль",  zh: "不純的煤礦"});
Translation.addTranslation("Impure Tin Dust", {ru: "Загрязнённая оловянная пыль",  zh: "不純淨的錫塵"});
Translation.addTranslation("Impure Iron Dust", {ru: "Загрязнённая железная пыль",  zh: "不純的鐵屑"});
Translation.addTranslation("Impure Silver Dust", {ru: "Загрязнённая серебряная пыль",  zh: "不純的銀灰"});
Translation.addTranslation("Impure Gold Dust", {ru: "Загрязнённая золотая пыль",  zh: "不純的金粉"});
Translation.addTranslation("Impure Copper Dust", {ru: "Загрязнённая медная пыль",  zh: "不純的銅塵"});
Translation.addTranslation("Impure Lead Dust", {ru: "Загрязнённая cвинцовая пыль",  zh: "不純的鉛塵"});

//GEMS
Translation.addTranslation("Perfect Diamond", {ru: "Совершенный алмаз",  zh: "完美的鑽石"});
Translation.addTranslation("Flawless Diamond", {ru: "Безупречный алмаз",  zh: "完美無瑕的鑽石"});
Translation.addTranslation("Defective Diamond", {ru: "Дефектный алмаз",  zh: "有缺陷的鑽石"});
Translation.addTranslation("Split Diamond", {ru: "Расколотый алмаз",  zh: "分裂的鑽石"});
Translation.addTranslation("Perfect Emerald", {ru: "Совершенный изумруд",  zh: "完美的祖母綠"});
Translation.addTranslation("Flawless Emerald", {ru: "Безупречный изумруд",  zh: "完美無瑕的祖母綠"});
Translation.addTranslation("Defective Emerald", {ru: "Дефектный изумруд",  zh: "有缺陷的祖母綠"});
Translation.addTranslation("Split Emerald", {ru: "Расколотый изумруд",  zh: "分裂祖母綠"});

//SCREWS
Translation.addTranslation("Bronze Screw", {ru: "Бронзовый винт",  zh: "铜牌螺钉"});
Translation.addTranslation("Copper Screw", {ru: "Медный винт",  zh: "铜螺钉"});
Translation.addTranslation("Gold Screw", {ru: "Золотой винт",  zh: "金螺钉"});
Translation.addTranslation("Lead Screw", {ru: "Свинцовый винт",  zh: "导致螺钉"});
Translation.addTranslation("Steel Screw", {ru: "Стальной винт",  zh: "钢钉"});
Translation.addTranslation("Tin Screw", {ru: "Оловянный винт",  zh: "锡螺钉"});
Translation.addTranslation("Chrome Screw", {ru: "Хромированный винт",  zh: "铬螺钉"});
Translation.addTranslation("Aluminium Screw", {ru: "Алюминиевый винт",  zh: "铝螺钉"});
Translation.addTranslation("Titanium Screw", {ru: "Титановый винт",  zh: "钛螺钉"});
Translation.addTranslation("Stainless Screw", {ru: "Нержавеющий винт",  zh: "不锈螺丝"});
Translation.addTranslation("Wolfram Screw", {ru: "Вольфрамовый винт",  zh: "Wolfram螺钉"});

//Small gear
Translation.addTranslation("Small Steel Gear", {ru: "Малая стальная шестерня",  zh: "小钢铁齿轮"});
Translation.addTranslation("Small Bronze Gear", {ru: "Малая бронзовая шестерня",  zh: "小的铜器齿轮"});

//Axe
Translation.addTranslation("Wood Axe", {ru: "Деревянный топор",  zh: "木斧头"});
Translation.addTranslation("Stone Axe", {ru: "Каменный топор",  zh: "石斧"});
Translation.addTranslation("Iron Axe", {ru: "Железный топор",  zh: "铁斧头"});
Translation.addTranslation("Steel Axe", {ru: "Стальной топор",  zh: "钢斧头"});
Translation.addTranslation("Emerald Axe", {ru: "Изумрудный топор",  zh: "绿宝石斧头"});
Translation.addTranslation("Flint Axe", {ru: "Кремневый топор",  zh: "弗林特斧头"});
Translation.addTranslation("Diamond Axe", {ru: "Алмазный топор",  zh: "钻石斧头"});

//Shovel
Translation.addTranslation("Wood Shovel", {ru: "Деревянная лопата",  zh: "木铲"});
Translation.addTranslation("Stone Shovel", {ru: "Каменная лопата",  zh: "石铲"});
Translation.addTranslation("Iron Shovel", {ru: "Железная лопата",  zh: "铁铲"});
Translation.addTranslation("Steel Shovel", {ru: "Стальная лопата",  zh: "钢铁铲"});
Translation.addTranslation("Emerald Shovel", {ru: "Изумрудная лопата",  zh: "铲子翡翠"});
Translation.addTranslation("Flint Shovel", {ru: "Кремневая лопата",  zh: "弗林特铲"});
Translation.addTranslation("Diamond Shovel", {ru: "Алмазная лопата",  zh: "钻石铲"});

//Hoe
Translation.addTranslation("Wood Hoe", {ru: "Деревянная мотыга",  zh: "木锄头"});
Translation.addTranslation("Stone Hoe", {ru: "Каменная мотыга",  zh: "石锄头"});
Translation.addTranslation("Iron Hoe", {ru: "Железная мотыга",  zh: "铁锄头"});
Translation.addTranslation("Steel Hoe", {ru: "Стальная мотыга",  zh: "钢铁锄头"});
Translation.addTranslation("Emerald Hoe", {ru: "Изумрудная мотыга",  zh: "翡翠锄头"});
Translation.addTranslation("Flint Hoe", {ru: "Кремневая мотыга",  zh: "弗林特锄头"});
Translation.addTranslation("Diamond Hoe", {ru: "Алмазная мотыга",  zh: "钻石锄头"});

//Pickaxe
Translation.addTranslation("Wood Pickaxe", {ru: "Деревянная кирка",  zh: "木镐"});
Translation.addTranslation("Stone Pickaxe", {ru: "Каменная кирка",  zh: "石镐"});
Translation.addTranslation("Iron Pickaxe", {ru: "Железная кирка",  zh: "铁镐头"});
Translation.addTranslation("Steel Pickaxe", {ru: "Стальная кирка",  zh: "钢铁镐头"});
Translation.addTranslation("Emerald Pickaxe", {ru: "Изумрудная кирка",  zh: "翡翠镐头"});
Translation.addTranslation("Flint Pickaxe", {ru: "Кремневая кирка",  zh: "弗林特镐头"});
Translation.addTranslation("Diamond Pickaxe", {ru: "Алмазная кирка",  zh: "钻石镐头"});

//Sword
Translation.addTranslation("Wood Sword", {ru: "Деревянный меч",  zh: "木剑"});
Translation.addTranslation("Stone Sword", {ru: "Каменный меч",  zh: "石剑"});
Translation.addTranslation("Iron Sword", {ru: "Железный меч",  zh: "铁剑"});
Translation.addTranslation("Steel Sword", {ru: "Стальной меч",  zh: "钢刀"});
Translation.addTranslation("Emerald Sword", {ru: "Изумрудный меч",  zh: "绿宝剑"});
Translation.addTranslation("Flint Sword", {ru: "Кремневый меч",  zh: "弗林特剑"});
Translation.addTranslation("Diamond Sword", {ru: "Алмазный меч",  zh: "钻石的剑"});


//HAMMERS

Translation.addTranslation("Iron Hammer", {ru: "Железный молот",  zh: "铁锤"});
Translation.addTranslation("Bronze Hammer", {ru: "Бронзовый молот",  zh: "青铜锤"});
Translation.addTranslation("Diamond Hammer", {ru: "Алмазный молот",  zh: "钻石锤"});
Translation.addTranslation("Emerald Hammer", {ru: "Изумрудный молот",  zh: "翡翠锤"});
Translation.addTranslation("Quartz Hammer", {ru: "Кварцевый молот",  zh: "石英锤"});
Translation.addTranslation("Star Hammer", {ru: "Молот из адской звезды",  zh: "锤狱星"});
Translation.addTranslation("Steel Hammer", {ru: "Стальной молот",  zh: "钢铁锤"});
Translation.addTranslation("Lead Hammer", {ru: "Свинцовый молот",  zh: "铅锤"});
Translation.addTranslation("Gold Hammer", {ru: "Золотой молот",  zh: "金锤"});
Translation.addTranslation("Silver Hammer", {ru: "Серебряный молот",  zh: "银锤"});

//Wrenchs

Translation.addTranslation("Iron Wrench", {ru: "Железный ключ",  zh: "铁键"});
Translation.addTranslation("Gold Wrench", {ru: "Золотой ключ",  zh: "铁键"});
Translation.addTranslation("Bronze Wrench", {ru: "Бронзовый ключ",  zh: "青铜钥匙"});
Translation.addTranslation("Lead Wrench", {ru: "Свинцовый ключ",  zh: "导致关键"});
Translation.addTranslation("Steel Wrench", {ru: "Стальной ключ",  zh: "钢关键"});
Translation.addTranslation("Silver Wrench", {ru: "Серебряный ключ",  zh: "银色的钥匙"});

//Files

Translation.addTranslation("Bronze File", {ru: "Бронзовый напильник",  zh: "青铜文件"});
Translation.addTranslation("Steel File", {ru: "Стальной напильник",  zh: "钢文件"});
Translation.addTranslation("Iron File", {ru: "Железный напильник",  zh: "铁文件"});
Translation.addTranslation("Gold File", {ru: "Золотой напильник",  zh: "黄金的文件"});
Translation.addTranslation("Silver File", {ru: "Серебряный напильник",  zh: "银文件"});
Translation.addTranslation("Lead File", {ru: "Свинцовый напильник",  zh: "导文件"});

//Knifes

Translation.addTranslation("Lead Knife", {ru: "Свинцовый нож",  zh: "导致刀"});
Translation.addTranslation("Silver Knife", {ru: "Серебряный нож",  zh: "银刀"});
Translation.addTranslation("Bronze Knife", {ru: "Бронзовый нож",  zh: "青铜刀"});
Translation.addTranslation("Gold Knife", {ru: "Золотой нож",  zh: "金色的刀"});
Translation.addTranslation("Iron Knife", {ru: "Железный нож",  zh: "铁刀"});
Translation.addTranslation("Steel Knife", {ru: "Стальной нож",  zh: "钢刀"});

//SawBlades
Translation.addTranslation("Bronze Saw Blade", {ru: "Бронзовая часть пилы",  zh: "铜的一部分，看到了"});
Translation.addTranslation("Gold Saw Blade", {ru: "Золотая часть пилы",  zh: "黄金的一部分，看到了"});
Translation.addTranslation("Iron Saw Blade", {ru: "Железная часть пилы",  zh: "铁的一部分，看到了"});
Translation.addTranslation("Silver Saw Blade", {ru: "Серебряная часть пилы",  zh: "银的一部分，看到了"});
Translation.addTranslation("Steel Saw Blade", {ru: "Стальная часть пилы",  zh: "的钢材的一部分，看到了"});

//saw
Translation.addTranslation("Bronze Saw", {ru: "Бронзовая пила",  zh: "青铜看到了"});
Translation.addTranslation("Gold Saw", {ru: "Золотая пила",  zh: "金看到了"});
Translation.addTranslation("Iron Saw", {ru: "Железная пила",  zh: "钢锯"});
Translation.addTranslation("Lead Saw", {ru: "Свинцовая пила",  zh: "致看到了"});
Translation.addTranslation("Silver Saw", {ru: "Серебряная пила",  zh: "银看到了"});
Translation.addTranslation("Steel Saw", {ru: "Стальная пила",  zh: "钢锯"});

//mortar
Translation.addTranslation("Flint Mortar", {ru: "Кремневая ступка",  zh: "石灰浆"});
Translation.addTranslation("Iron Mortar", {ru: "Железная ступка",  zh: "铁砂浆"});
Translation.addTranslation("Bronze Mortar", {ru: "Бронзовая ступка",  zh: "青铜灰浆"});
Translation.addTranslation("Diamond Mortar", {ru: "Алмазная ступка",  zh: "钻石砂浆"});
Translation.addTranslation("Gold Mortar", {ru: "Золотая ступка",  zh: "金色的砂浆"});
Translation.addTranslation("Lead Mortar", {ru: "Свинцовая ступка",  zh: "导致砂浆"});
Translation.addTranslation("Steel Mortar", {ru: "Стальная ступка",  zh: "钢铁砂浆"});
Translation.addTranslation("Silver Mortar", {ru: "Серебряная ступка",  zh: "银灰浆"});

//cutter
Translation.addTranslation("Lead Cutter", {ru: "Свинцовые кусачки",  zh: "导致"});
Translation.addTranslation("Gold Cutter", {ru: "Золотые кусачки",  zh: "金刀"});
Translation.addTranslation("Iron Cutter", {ru: "Железные кусачки",  zh: "铁刀"});
Translation.addTranslation("Bronze Cutter", {ru: "Бронзовые кусачки",  zh: "青铜刀"});
Translation.addTranslation("Steel Cutter", {ru: "Стальные кусачки",  zh: "钢刀"});

//screwdriver
Translation.addTranslation("Gold Screwdriver", {ru: "Золотая отвёртка",  zh: "黄金丝刀"});
Translation.addTranslation("Iron Screwdriver", {ru: "Железная отвёртка",  zh: "铁制螺丝刀"});
Translation.addTranslation("Steel Screwdriver", {ru: "Стальная отвёртка",  zh: "钢丝刀"});

//components
Translation.addTranslation("Resistor", {ru: "Резистор",  zh: "阻"});
Translation.addTranslation("Glass Tube", {ru: "Стеклянная трубка",  zh: "玻璃管"});
Translation.addTranslation("Vacuum Tube", {ru: "Вакумная трубка",  zh: "真空管"});
Translation.addTranslation("Coated Circuit Board", {ru: "Печатная плата",  zh: "复电路板"});
Translation.addTranslation("Electric Motor (LV)", {ru: "Электрический мотор (LV)",  zh: "电动机(LV)"});
Translation.addTranslation("Electric Pump (LV)", {ru: "Электрическая насос (LV)",  zh: "电泵(LV)"});
Translation.addTranslation("Electric Piston (LV)", {ru: "Электрический поршень (LV)",  zh: "电塞(LV)"});
Translation.addTranslation("Tin Rotor", {ru: "Оловянный ротор",  zh: "锡转子"});

//Cells
Translation.addTranslation("Steam cell", {ru: "Капсула с паром",  zh: "蒸汽细胞"});

//Blocks
Translation.addTranslation("Silver Block", {ru: "Серебрянный блок",  zh: "银色的包"});




// file: common/blocks/metals.js

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




// file: common/blocks/ores.js

GT_Worldgen.RegisterBreed(BlockID.blackstone, 0, 16, 2, 32, 48, -1, "GenerateChunk", "BlackGranite", 2, 4)
GT_Worldgen.RegisterBreed(BlockID.redstone, 0, 16, 2, 32, 48, -1, "GenerateChunk", "RedGranite", 1, 3)

    GT_Material.OreRegister("Tetrahedrite", [["Tetrahedrite", 2], ["Copper", 1],  ["Chrome", 0], ["Nikel", 0]], ["Stone", "RedGranite", "BlackGranite", "Nether", "End"], true);
    GT_Material.OreRegister("Copper", [["Copper", 2],  ["Iron", 1], ["Nikel", 0], ["Tetrahedrite", 0]], ["Stone"], true);
    GT_Material.OreRegister("Tin", [["Tin", 2],  ["Nikel", 1], ["Iron", 0], ["Aluminium", 0]], ["Stone", "RedGranite", "BlackGranite"], true);
    GT_Material.OreRegister("Iron", [["Iron", 2], ["Nikel", 1], ["Stone", 2], ["Aluminium", 1]], ["Stone"], true);
    GT_Material.OreRegister("Lead", [["Lead", 2], ["Aluminium", 1], ["Iron", 0], ["Tin", 0]], ["Stone", "End"], true);
    GT_Material.OreRegister("Silver", [["Silver", 2],  ["Aluminium", 1], ["Tin", 1], ["Nikel", 0]], ["Stone", "BlackGranite"], true, 1);
    GT_Material.OreRegister("Galena", [["Galena", 2], ["Silver", 1], ["Lead", 1], ["Aluminium", 1]], ["Stone"], true);
    GT_Material.OreRegister("Gold", [["Gold", 2], ["Silver", 1], ["Lead", 1]], ["Stone", "RedGranite", "BlackGranite", "Nether", "End"], true, 1);
    GT_Material.OreRegister("Coal", [["Coal", 2]], ["Stone"], true);
    GT_Material.OreRegister("Bauxite", [["Bauxite", 2], ["Titanium", 0], ["Nikel", 1], ["Aluminium", 1]], ["Stone", "BlackGranite"], true);
    GT_Material.OreRegister("Sapphire", [["Sapphire", 2], ["Nikel", 1], ["Lapis-Lazuli", 1]], ["Stone", "RedGranite", "BlackGranite"], true, 1);
    GT_Material.OreRegister("Ruby", [["Ruby", 2], ["Chrome", 0]], ["Stone", "RedGranite", "BlackGranite"], true, 1);
    GT_Material.OreRegister("Emerald", [["Emerald", 2], ["Titanium", 0], ["Chrome", 1]], ["RedGranite", "BlackGranite", "End", "Stone"], true, 1);
    GT_Material.OreRegister("Diamond", [["Diamond", 2]], ["Stone"], true, 1);
    GT_Material.OreRegister("Redstone", [["Redstone", 3], ["Ruby", 0], ["Chrome", 0]], ["Stone"], true, 1);
    GT_Material.OreRegister("Magnetite", [["Magnetite", 2], ["Iron", 1], ["Gold", 1], ["Aluminium", 0]], ["Stone", "BlackGranite"], true, 1);
    GT_Material.OreRegister("Wolfram", [["Wolfram", 2], ["Manganese", 1], ["Aluminium", 1]], ["Stone", "BlackGranite"], true, 2);
    GT_Material.OreRegister("Lapis-Lazuli", [["Lapis-Lazuli", 3], ["Nikel", 1], ["Sapphire", 0]], ["Stone", "BlackGranite", "RedGranite", "End"], true);
    GT_Material.OreRegister("Lignite", [["Lignite", 2]], ["Stone"], true);
    GT_Material.OreRegister("Sulfur", [["Sulfur", 3], ["Gold", 1], ["Bauxite", 1], ["Copper", 1]], ["RedGranite", "BlackGranite", "Nether"], true);
    GT_Material.OreRegister("Malachite", [["Malachite", 2], ["Copper", 1], ["Emerald", 0], ["Nikel", 1]], ["Stone"], true);
	GT_Material.OreRegister("Aluminium", [["Aluminium", 2], ["Nickel", 1], ["Iron", 1]], ["Stone"], true);
    GT_Material.OreRegister("Nickel", [["Nickel", 2], ["Aluminium", 1], ["Iron", 1]], ["Stone"], true);
    
    GT_Material.SmallOreRegister("Coal", [[263, 1, 0]]);
    GT_Material.SmallOreRegister("Copper", [[ItemID.Copper, 1, 0]]);
    GT_Material.SmallOreRegister("Gold", [[ItemID.Gold, 1, 0]]);
    GT_Material.SmallOreRegister("Iron", [[ItemID.Iron, 1, 0]]);
    GT_Material.SmallOreRegister("Lapis-Lazuli", [[351, 1, 4]]);
    GT_Material.SmallOreRegister("Lead", [[ItemID.dustLead, 1, 0]]);
    GT_Material.SmallOreRegister("Redstone", [[331, 1, 0]]);
    GT_Material.SmallOreRegister("Silver", [[ItemID.dustSilver, 1, 0]]);
    GT_Material.SmallOreRegister("Tin", [[ItemID.Tin, 1, 0]]);
    
var tileTemplate = [1, 14, 15, 16, 56, 73, 74, 129, 21];
//var tileTemplate = [0]

GT_Worldgen.RegisterLargeOreDepositeOnEarth([BlockID.oreMagnetiteStone, BlockID.oreIronStone, BlockID.oreIronStone, BlockID.oreMagnetiteStone], (100), tileTemplate, 80, 120, {x:50, y:8, z:50}, 40, 1);
GT_Worldgen.RegisterLargeOreDepositeOnEarth([BlockID.oreMalachiteStone, BlockID.oreCopperStone, BlockID.oreTetrahedriteStone, BlockID.oreCopperStone], (80), tileTemplate, 40, 120, {x:50, y:8, z:50}, 40, 1);
GT_Worldgen.RegisterLargeOreDepositeOnEarth([BlockID.oreMagnetiteStone, BlockID.oreGoldStone, BlockID.oreGoldStone, BlockID.oreMagnetiteStone], (30), tileTemplate, 32, 48, {x:50, y:8, z:50}, 40, 1);
GT_Worldgen.RegisterLargeOreDepositeOnEarth([BlockID.oreVolframStone, BlockID.oreMagnetiteStone, BlockID.oreMagnetiteStone, BlockID.oreVolframStone], (30), tileTemplate, 32, 48, {x:50, y:8, z:50}, 40, 1);
GT_Worldgen.RegisterLargeOreDepositeOnEarth([BlockID.oreLigniteStone, BlockID.oreCoalStone, BlockID.oreLigniteStone, BlockID.oreLigniteStone], (100), tileTemplate, 40, 120, {x:50, y:8, z:50}, 40, 1);
GT_Worldgen.RegisterLargeOreDepositeOnEarth([BlockID.oreCoalStone, BlockID.oreCoalStone, BlockID.oreLigniteStone, BlockID.oreCoalStone], (100), tileTemplate, 80, 120, {x:50, y:8, z:50}, 40, 1);
GT_Worldgen.RegisterLargeOreDepositeOnEarth([BlockID.oreTinStone, BlockID.oreSilverStone, BlockID.oreLeadStone, BlockID.oreGalenaStone], (80), tileTemplate, 32, 48, {x:50, y:8, z:50}, 40, 1);
GT_Worldgen.RegisterLargeOreDepositeOnEarth([BlockID.oreBauxiteStone, BlockID.oreIronStone, BlockID.oreBauxiteStone, BlockID.oreMagnetiteStone], (30), tileTemplate, 80, 120, {x:50, y:8, z:50}, 40, 1);
GT_Worldgen.RegisterLargeOreDepositeOnEarth([BlockID.oreCoalStone, BlockID.oreDiamondStone, BlockID.oreCoalStone, BlockID.oreLigniteStone], (10), tileTemplate, 10, 32, {x:30, y:8, z:30}, 40, 1);
GT_Worldgen.RegisterLargeOreDepositeOnEarth([BlockID.oreRedstoneStone, BlockID.oreRubyStone, BlockID.oreRedstoneStone, BlockID.oreRedstoneStone], (10), tileTemplate, 10, 32, {x:30, y:8, z:30}, 40, 1);
GT_Worldgen.RegisterLargeOreDepositeOnEarth([BlockID.oreLapisStone, BlockID.oreSaphireStone, BlockID.oreLapisStone, BlockID.oreLapisStone], (10), tileTemplate, 10, 32, {x:30, y:8, z:30}, 40, 1);
GT_Worldgen.RegisterLargeOreDepositeOnEarth([BlockID.oreEmeraldStone, BlockID.oreEmeraldStone, BlockID.oreMalachiteStone, BlockID.oreMalachiteStone], (10), tileTemplate, 10, 32, {x:30, y:8, z:30}, 40, 1);
GT_Worldgen.RegisterLargeOreDepositeOnEarth([BlockID.oreRedstoneStone, BlockID.oreRedstoneStone, BlockID.oreTetrahedriteStone, BlockID.oreRedstoneStone, BlockID.oreRedstone, BlockID.oreRedstone, BlockID.oreTetrahedriteStone, BlockID.oreRedstoneStone], (33), tileTemplate, 10, 32, {x:40, y:8, z:40}, 40, 1);
GT_Worldgen.RegisterLargeOreDepositeOnEarth([BlockID.oreAluminiumStone, BlockID.oreNickelStone, BlockID.oreGalenaStone], 100, tileTemplate, 32, 48, {x:30, y:6, z:30}, 20, 1);

GT_Worldgen.RegisterLargeOreDepositeOnRedGranite([BlockID.oreTetrahedriteRedGranite, BlockID.oreSulfurRedGranite, BlockID.oreSulfurRedGranite, BlockID.oreTetrahedriteRedGranite], (100), 40);
GT_Worldgen.RegisterLargeOreDepositeOnRedGranite([BlockID.oreLapisRedGranite, BlockID.oreLapisRedGranite, BlockID.oreSaphireRedGranite, BlockID.oreLapisRedGranite], (100), 40);
GT_Worldgen.RegisterLargeOreDepositeOnRedGranite([BlockID.oreRubyRedGranite, BlockID.oreEmeraldRedGranite, BlockID.oreEmeraldRedGranite, BlockID.oreRubyRedGranite], (100), 40);
GT_Worldgen.RegisterLargeOreDepositeOnRedGranite([BlockID.oreTinRedGranite], (100), 40)

GT_Worldgen.RegisterLargeOreDepositeOnBlackGranite([BlockID.oreTetrahedriteBlackGranite, BlockID.oreSulfurBlackGranite, BlockID.oreSulfurBlackGranite, BlockID.oreTetrahedriteBlackGranite], (100), 40);
GT_Worldgen.RegisterLargeOreDepositeOnBlackGranite([BlockID.oreLapisBlackGranite, BlockID.oreLapisBlackGranite, BlockID.oreSaphireBlackGranite, BlockID.oreLapisBlackGranite], (100), 40);
GT_Worldgen.RegisterLargeOreDepositeOnBlackGranite([BlockID.oreRubyBlackGranite, BlockID.oreEmeraldBlackGranite, BlockID.oreEmeraldBlackGranite, BlockID.oreRubyBlackGranite], (100), 40);
GT_Worldgen.RegisterLargeOreDepositeOnBlackGranite([BlockID.oreVolframBlackGranite, BlockID.oreMagnetiteBlackGranite, BlockID.oreVolframBlackGranite, BlockID.oreMagnetiteBlackGranite], (100), 40);
GT_Worldgen.RegisterLargeOreDepositeOnBlackGranite([BlockID.oreMagnetiteBlackGranite, BlockID.oreGoldBlackGranite, BlockID.oreMagnetiteBlackGranite, BlockID.oreGoldBlackGranite], (100), 40);
GT_Worldgen.RegisterLargeOreDepositeOnBlackGranite([BlockID.oreTinBlackGranite, BlockID.oreMagnetiteBlackGranite, BlockID.oreSilverBlackGranite, BlockID.oreBauxiteBlackGranite], (100), 40);

GT_Worldgen.RegisterLargeOreDepositeOnNether([BlockID.oreGoldNether, BlockID.oreTetrahedriteNether, BlockID.oreSulfurNether, BlockID.oreSulfurNether], (50), [87], 32, 120, {x:16, y:4, z:16}, 20, 1);

GT_Worldgen.RegisterLargeOreDepositeOnEnd([BlockID.oreLapisEnd], (40), [121], 10, 120, {x:24, y:8, z:32}, 40, 1);
GT_Worldgen.RegisterLargeOreDepositeOnEnd([BlockID.oreLeadEnd, BlockID.oreSilverEnd, BlockID.oreLeadEnd, BlockID.oreSilverEnd], (80), [121], 32, 64, {x:32, y:8, z:28}, 40, 1);
GT_Worldgen.RegisterLargeOreDepositeOnEnd([BlockID.oreCassiteriteEnd, BlockID.oreCassiteriteEnd, BlockID.oreTinEnd], (100), [121], 10, 128, {x:32, y:6, z:32}, 40, 1);
GT_Worldgen.RegisterLargeOreDepositeOnEnd([BlockID.oreRedstoneEnd, BlockID.oreRubyEnd, BlockID.oreRubyEnd], (33), [121], 10, 128, {x:24, y:6, z:24}, 40, 1);
GT_Worldgen.RegisterLargeOreDepositeOnEnd([BlockID.oreCoalEnd, BlockID.oreLigniteEnd, BlockID.oreGraphiteEnd, BlockID.oreDiamondEnd, BlockID.oreDiamondEnd], (20), [121], 10, 128, {x:40, y:10, z:40}, 40, 1);
GT_Worldgen.RegisterLargeOreDepositeOnEnd([BlockID.oreEmeraldEnd, BlockID.oreMalachiteEnd, BlockID.oreEmeraldEnd, BlockID.oreMalachiteEnd], (33), [121], 10, 128, {x:30, y:8, z:30}, 40, 1);
GT_Worldgen.RegisterLargeOreDepositeOnEnd([BlockID.oreGoldEnd, BlockID.oreMagnetiteEnd, BlockID.oreGoldEnd], (50), [121], 10, 128, {x:32, y:6, z:32}, 40, 1);
GT_Worldgen.RegisterLargeOreDepositeOnEnd([BlockID.oreCopperEnd, BlockID.oreTetrahedriteEnd, BlockID.oreCopperEnd, BlockID.oreTetrahedriteEnd], (100), [121], 10, 128, {x:48, y:8, z:48}, 40, 1);
GT_Worldgen.RegisterLargeOreDepositeOnEnd([BlockID.oreIronEnd, BlockID.oreMagnetiteEnd, BlockID.oreIronEnd, BlockID.oreMagnetiteEnd], (100), [121], 10, 128, {x:48, y:8, z:48}, 40, 1);


let DeleteOre = function(id){
	id = 1
	Block.setDestroyLevel(id, 0.7)
	
    Block.registerDropFunctionForID(id, function(coords, id, data, level){ 
        if(level>=1&&data==0&&rollPercentage(5)){
            return [[litst, 4, 0]];
        }else if(level>=1&&data==0){
        	return[[4, 1, 0]]
        }      
        return []
    })
}

Callback.addCallback("PostLoaded", function(){
DeleteOre(14);
DeleteOre(15);
DeleteOre(16);
DeleteOre(56);
DeleteOre(73);
DeleteOre(74);
DeleteOre(129);
DeleteOre(21);

Block.registerDropFunctionForID(153, function(coords, id, data, level){ 
    if(level>=1&&data==0){
    	return[[87, 1, 0]];
    }
    return [];
})

Block.registerDropFunction(49, function(coords, id, data, level){ 
    if(level>=3){
        return [[BlockID.blackcobblestone, 1, 0]];
    }
       return [];
    });
Block.setDestroyLevel(49, 3);

Block.registerDropFunction("blackstone", function(coords, id, data, level){ 
    if(level>=4){
        return [[BlockID.blackcobblestone, 1, 0]];
    }
       return [];
    });
Block.registerDropFunction("redstone", function(coords, id, data, level){ 
    if(level>=3){
        return [[BlockID.redcobblestone, 1, 0]];
    }
       return [];
    });
Block.registerDropFunction("blackcobblestone", function(coords, id, data, level){ 
    if(level>=4){
        return [[BlockID.blackcobblestone, 1, 0]];
    }
       return [];
    });
Block.registerDropFunction("redcobblestone", function(coords, id, data, level){ 
    if(level>=3){
        return [[BlockID.redcobblestone, 1, 0]];
    }
       return [];
    });

    
Block.registerDropFunction(1, function(coords, id, data, level){ 
    if(level>=1&&data==0&&rollPercentage(5)){
        return [[litst, 4, 0]];
    }else if(level>=1&&data==0){  	
    	return[[4, 1, 0]];
    }
    if(level>=1){
    	return[[id, 1, data]];
    }
    return [];
    });
});




// file: common/blocks/machines.js

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




// file: common/blocks/other.js

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




// file: common/tools/mainGenerate.js

GT_Tool.RegisterToolsSet("Iron", 256, 2, 3);
//GT_Tool.RegisterSoldering("Iron", 256, 2);

GT_Tool.RegisterToolsSet("Steel", 512, 3, 4);

GT_Tool.RegisterHammer("Diamond", 1024, 2, 4);
GT_Tool.RegisterHammer("Emerald", 1024, 2, 4);

GT_Tool.RegisterHammer("Bronze", 128, 2, 3);
GT_Tool.RegisterCutter("Bronze", 128, 2);
GT_Tool.RegisterFile("Bronze", 128, 2);
GT_Tool.RegisterMortar("Bronze", 128, 2);
GT_Tool.RegisterWrench("Bronze", 128, 2);
GT_Tool.RegisterSaw("Bronze", 128, 2);

GT_Tool.RegisterLiquid(325, 8);
GT_Tool.RegisterLiquid(ItemID.cellWater, 0);

Callback.addCallback("PostLoaded", function(){
	var A = GT_Material;
	var stick = 280;
	for(var key1 in A.gems){
		for(var key2 in A.hammers){
		    if(A.gems[key1].mat == A.hammers[key2].Material){
		        Recipes.addShaped({id:A.hammers[key2].id, count:1, data:0}, ["aa ", "aab", "aa"], ['a', A.gems[key1].id, 0, 'b', 280, 0]);
		    }
        }
    }
    stick = 280;
    for(var key1 in A.plates){
    	for(var key4 in A.rods){
    	    for(var key5 in A.solderings){
    	        for(var key6 in A.bolts){
    	            if(A.plates[key1].Material == A.solderings[key5].Material && A.rods[key4].Material == A.solderings[key5].Material && A.bolts[key6].Material == A.solderings[key5].Material){
    	                GT_Recipe.CreateRecipeWithTool({id:A.solderings[key5].id, count:1, data:0}, ["as ", "cab", " bb"], ['a', A.rods[key4].id, 0, 'b', A.plates[key1].id, 0, 'c', A.bolts[key6].id, 0], [GT_Material.screwdrivers], 2);
                    }
                }
            }
        }  
    	for(var key2 in A.cutters){
    	    for(var key3 in A.bolts){
              if(A.plates[key1].Material == A.cutters[key2].Material && A.bolts[key3].Material == A.cutters[key2].Material){             	
                    GT_Recipe.CreateRecipeWithTool({id:A.cutters[key2].id, count:1, data:0}, ["d d", "fdh", "cbc"], ['c', stick, 0, 'd', A.plates[key1].id, 0, 'b', A.bolts[key3].id, 0], [GT_Material.hammers, GT_Material.files], 2);
                }
            }
        }
        stick = 280;
        for(var key2 in A.knifes){
            if(A.plates[key1].Material == A.knifes[key2].Material){
            	for(var key3 in A.rods){
				    if(A.rods[key3].Material==A.knifes[key2].Material){
					    stick = A.rods[key3].id;
			        }
		        }
                GT_Recipe.CreateRecipeWithTool({id:A.knifes[key2].id, count:1, data:0}, ["h ", "af", "b "], ['a', A.plates[key1].id, 0, 'b', stick, 0], [GT_Material.hammers, GT_Material.files], 2);
            }
        }
        stick = 280;
        for(var key2 in A.saws){
            if(A.plates[key1].Material == A.saws[key2].Material){
            	for(var key3 in A.rods){
				    if(A.rods[key3].Material==A.saws[key2].Material){
					    stick = A.rods[key3].id;
			        }
		        }
                GT_Recipe.CreateRecipeWithTool({id:A.saws[key2].id, count:1, data:0}, ["bbb", "aab", "fh "], ['a', A.plates[key1].id, 0, 'b', 280, 0], [GT_Material.hammers, GT_Material.files], 2);
            }
        }
    }
    stick = 280;
    for(var key1 in A.ingots){
    	for(var key2 in A.wrenchs){
            if(A.ingots[key1].Material == A.wrenchs[key2].Material){
                GT_Recipe.CreateRecipeWithTool({id:A.wrenchs[key2].id, count:1, data:0}, ["aha", "aaa", " a "], ['a', A.ingots[key1].id, 0], [GT_Material.hammers], 2);
            }
        }
		for(var key2 in A.hammers){
			if(A.ingots[key1].Material == A.hammers[key2].Material){
			    Recipes.addShaped({id:A.hammers[key2].id, count:1, data:0}, ["aa ", "aab", "aa"], ['a', A.ingots[key1].id, 0, 'b', stick, 0]);
            }
        }
        for(var key2 in A.mortars){
        	if(A.ingots[key1].Material == A.mortars[key2].Material){
                Recipes.addShaped({id:A.mortars[key2].id, count:1, data:0}, [" a ", "cac", "ccc"], ['a', A.ingots[key1].id, 0, 'c', 1, 0]);
            }
        }
        stick = 280;
        for(var key2 in A.files){
        	if(A.ingots[key1].Material == A.files[key2].Material){
                GT_Recipe.CreateRecipeWithTool({id:A.files[key2].id, count:1, data:0}, ["a ", "ah", "b "], ['a', A.ingots[key1].id, 0, 'b', stick, 0], [GT_Material.hammers], 2);
            }
        }
    }
    stick = 280;
    for(var key3 in A.long_rods){
        for(var key2 in A.screwdrives){
        	if(A.long_rods[key3].Material == A.screwdrives[key2].Material){
        	    for(var key4 in A.rods){
		            if(A.rods[key4].Material==A.screwdrives[key2].Material){
		                stick = A.rods[key4].id;
			        }
                }
        	    GT_Recipe.CreateRecipeWithTool({id:A.screwdrives[key2].id, count:1, data:0}, [" fd", " dh", "c  "], ['c', stick, 0, 'd', A.long_rods[key3].id, 0], [GT_Material.hammers, GT_Material.files], 2);
            }
        }
    }
});

IDRegistry.genItemID("stonepickaxe");
Item.createItem("stonepickaxe", "Stone Pickaxe", {name:"stone_pickaxe"}, {stack:1});

IDRegistry.genItemID("stonesword");
Item.createItem("stonesword", "Stone Sword", {name:"stone_sword"}, {stack:1});

IDRegistry.genItemID("stoneaxe");
Item.createItem("stoneaxe", "Stone Axe", {name:"stone_axe"}, {stack:1});

IDRegistry.genItemID("stoneshovel");
Item.createItem("stoneshovel", "Stone Shovel", {name:"stone_shovel"}, {stack:1});

IDRegistry.genItemID("stonehoe");
Item.createItem("stonehoe", "Stone Hoe", {name:"stone_hoe"}, {stack:1});


IDRegistry.genItemID("flintpickaxe");
Item.createItem("flintpickaxe", "Flint Pickaxe", {name:"flint_pickaxe"}, {stack:1});

IDRegistry.genItemID("flintsword");
Item.createItem("flintsword", "Flint Sword", {name:"flint_sword"}, {stack:1});

IDRegistry.genItemID("flintaxe");
Item.createItem("flintaxe", "Flint Axe", {name:"flint_axe"}, {stack:1});

IDRegistry.genItemID("flintshovel");
Item.createItem("flintshovel", "Flint Shovel", {name:"flint_shovel"}, {stack:1});

IDRegistry.genItemID("flinthoe");
Item.createItem("flinthoe", "Flint Hoe", {name:"flint_hoe"}, {stack:1});


IDRegistry.genItemID("woodpickaxe");
Item.createItem("woodpickaxe", "Wood Pickaxe", {name:"wood_pickaxe"}, {stack:1});

IDRegistry.genItemID("woodsword");
Item.createItem("woodsword", "Wood Sword", {name:"wood_sword"}, {stack:1});

IDRegistry.genItemID("woodaxe");
Item.createItem("woodaxe", "Wood Axe", {name:"wood_axe"}, {stack:1});

IDRegistry.genItemID("woodshovel");
Item.createItem("woodshovel", "Wood Shovel", {name:"wood_shovel"}, {stack:1});

IDRegistry.genItemID("woodhoe");
Item.createItem("woodhoe", "Wood Hoe", {name:"wood_hoe"}, {stack:1});

var cwood = {durability: 12, level: 1, efficiency:3, damage: 2, enchantability: 16};
var cstone = {durability: 38, level: 2, efficiency:4, damage: 2, enchantability: 16};
var cflint = {durability: 114, level: 2, efficiency:4, damage: 2, enchantability: 16};

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

ToolAPI.setTool(ItemID.flintpickaxe, cflint, ToolType.pickaxe);
ToolAPI.setTool(ItemID.flintsword, cflint, ToolType.sword);
ToolAPI.setTool(ItemID.flintaxe, cflint, ToolType.axe);
ToolAPI.setTool(ItemID.flintshovel, cflint, ToolType.shovel);
ToolAPI.setTool(ItemID.flinthoe, cflint, ToolType.hoe);




// file: common/items/mainGenerate.js

var ironMap = {isDust:true, isPlate:true, isNugget:true, isSmallDust:true, isTinyDust:true, isBolt:true, isRods:true, isCrushed: true, isCrushedPurified: true, isSawBlade: true, isMagneticRod: true, generateRecipes:true};
var steel_bronzeMap = {isBlock: true, isIngot: true, isDust:true, isPlate:true, isNugget:true, isSmallDust:true, isTinyDust:true, isBolt:true, isRods:true, isScrew: true, isSawBlade: true, isGearSmall: true, generateRecipes:true};
var rubberMap = {isIngot: true, isDust:true, isPlate:true, isNugget:true, isSmallDust:true, isTinyDust:true, isBolt:true,  isRods:true, isRing: true, generateRecipes: true};
var copperMap = {isBlock: true, isIngot: true, isDust:true, isPlate:true, isNugget:true, isSmallDust:true, isTinyDust:true, isBolt:true, isRods:true, isCrushed: true, isCrushedPurified: true, isScrew: true, generateRecipes:true};
var wroughtMap = {isIngot: true, isDust:true, isPlate:true, isNugget:true, isSmallDust:true, isTinyDust:true, isBolt:true, isRods:true, generateRecipes:true};
var leadMap = {isIngot: true, isDust:true, isPlate:true, isNugget:true, isSmallDust:true, isTinyDust:true, isBolt:true, isRods:true, isCrushed: true, isCrushedPurified: true, isScrew: true, generateRecipes:true};
var ch_al_ti_st_wMap = {isIngot: true, isDust: true, isPlate: true, isNugget: true, isScrew: true, isSmallDust: true, generateRecipes:true};
var ashesMap = {isDust: true, isTinyDust: true, generateRecipes: true};
var crushedMap = {isCrushed: true, generateRecipes: false};
var coal_ligniteMap = {isDust: true, isCrushed: true, isCrushedPurified: true, generateRecipes: true};
var diamond_emeraldMap = {isDust: true, isPlate: true, isSmallDust: true, isTinyDust: true, isCrushed: true, isCrushedPurified: true, generateRecipes: true};
var redstoneMap = {isPlate: true, isCrushed: true, isCrushedPurified: true, generateRecipes: false};
var stones = {isDust:true, isSmallDust:true, generateRecipes:true};
var antimonyMap = {isIngot: true, isDust: true, isNugget: true, isPlate: true, isRods: true, isSmallDust: true, isTinyDust: true, isBolt: true, generateRecipes: true};
var silverMap = {isIngot: true, isDust: true, isNugget: true, isPlate: true, isRods: true, isSmallDust: true, isTinyDust: true, isBolt: true, isCrushed: true, isCrushedPurified: true, isSawBlade: true, isBlock: true, generateRecipes: true};
var tinMap = {isIngot: true, isDust: true, isNugget: true, isPlate: true, isRods: true, isSmallDust: true, isTinyDust: true, isBolt: true, isScrew: true, isRing: true, isCrushed: true, isCrushedPurified: true, isBlock: true, generateRecipes: true};
var goldMap = {isDust: true, isNugget: true, isPlate: true, isRods: true, isSmallDust: true, isTinyDust: true, isBolt: true, isScrew: true, isCrushed: true, isCrushedPurified: true, isSawBlade: true, generateRecipes: true};
var bauxiteMap = {isDust:true, isSmallDust:true, generateRecipes:true};
var nickelMap = {isDust:true, isIngot:true, isPlate:true, isNugget:true, isSmallDust:true, generateRecipes:true};

GT_Material.register("Iron", ironMap, {temp: 1600, long: 40, lvl: 2});
GT_Material.register("Steel", steel_bronzeMap, {temp: 1600, long: 240, lvl: 2});
GT_Material.register("Rubber", rubberMap, {temp: 200, long: 10, lvl: 2});
GT_Material.register("Copper", copperMap, {temp: 1000, long: 100, lvl: 2});
GT_Material.register("WroughtIron", wroughtMap, {temp: 1600, long: 40, lvl: 2});
GT_Material.register("Lead", leadMap, {temp: 300, long: 10, lvl: 2});
GT_Material.register("Gold", goldMap, {temp: 1000, long: 10, lvl: 1});
GT_Material.register("Tin", tinMap, {temp: 200, long: 10, lvl: 1});
GT_Material.register("Silver", silverMap, {temp: 900, long: 10, lvl: 1});
GT_Material.register("Bronze", steel_bronzeMap, {temp: 1000, long: 100, lvl: 2});
GT_Material.register("Antimony", antimonyMap, {temp: 1600, long: 40, lvl: 2});
GT_Material.register("LapisLazuli", {isDust: true, isPlate: true, isCrushed: true, isCrushedPurified: true, generateRecipes:true}, {temp: 600, long: 10, lvl: 1});
GT_Material.register("Redstone", redstoneMap, {temp: 200, long: 40, lvl: 2});
GT_Material.register("Diamond", diamond_emeraldMap, {temp: 4000, long: 400, lvl: 3});
GT_Material.register("Emerald", diamond_emeraldMap, {temp: 1400, long: 400, lvl: 3});
GT_Material.register("Lignite", coal_ligniteMap, {temp: 200, long: 10, lvl: 1});
GT_Material.register("Coal", coal_ligniteMap, {temp: 200, long: 10, lvl: 1});
GT_Material.register("Cassiterite", crushedMap, {temp: 1600, long: 40, lvl: 2});
GT_Material.register("BrownLimonite", crushedMap, {temp: 1600, long: 40, lvl: 2});
GT_Material.register("YellowLimonite", crushedMap, {temp: 1600, long: 40, lvl: 2});
GT_Material.register("BandedIron", crushedMap, {temp: 1600, long: 40, lvl: 2});
GT_Material.register("Malachite", crushedMap, {temp: 1600, long: 40, lvl: 2});
GT_Material.register("VanadiumMagnetite", crushedMap, {temp: 1600, long: 40, lvl: 2});
GT_Material.register("Magnetite", crushedMap, {temp: 1600, long: 40, lvl: 2});
GT_Material.register("Chalcopyrite", crushedMap, {temp: 1600, long: 40, lvl: 2});
GT_Material.register("Pyrite", crushedMap, {temp: 1600, long: 40, lvl: 2});
GT_Material.register("Tetrahedrite", crushedMap, {temp: 1600, long: 40, lvl: 2});
GT_Material.register("Galena", crushedMap, {temp: 1600, long: 40, lvl: 2});
GT_Material.register("Ashes", ashesMap, {temp: 200, long: 10, lvl: 1});
GT_Material.register("DarkAshes", ashesMap, {temp: 200, long: 10, lvl: 1});
GT_Material.register("Glass", {isDust: true, generateRecipes: true}, {temp: 200, long: 10, lvl: 1});
GT_Material.register("Wood", {isDust: true, isPlate: true, generateRecipes: false}, {temp: 200, long: 10, lvl: 1});
GT_Material.register("RedAlloy", {isIngot: true, isPlate: true, generateRecipes: true}, {temp: 200, long: 10, lvl: 1});

GT_Material.register("Sulfur", {isDust: true, isSmallDust: true, generateRecipes: true}, {temp: 200, long: 10, lvl: 1});
GT_Material.register("Chrome", ch_al_ti_st_wMap, {temp: 1900, long: 300, lvl: 3});
GT_Material.register("Aluminium", ch_al_ti_st_wMap, {temp: 600, long: 10, lvl: 2});
GT_Material.register("Titanium", ch_al_ti_st_wMap, {temp: 1600, long: 240, lvl: 3});
GT_Material.register("Stainless", ch_al_ti_st_wMap, {temp: 1800, long: 260, lvl: 3});
GT_Material.register("Wolfram", ch_al_ti_st_wMap, {temp: 3400, long: 400, lvl: 4});
GT_Material.register("Nickel", nickelMap, {temp:1400, long:60, lvl:1});

GT_Material.register("Stone", stones, {lvl: 2});
GT_Material.register("RedGranit", stones, {lvl: 2});
GT_Material.register("BlackGranit", stones, {lvl: 3});

GT_Material.register("Bauxite", bauxiteMap, {lvl:1});
GT_Material.register("Magnetite", {isDust:true, isSmallDust:true, generateRecipes:true}, {temp:1200, lvl:2, long:10});
GT_Material.register("Tetrahedrite", {isDust:true, isSmallDust:true, generateRecipes:true}, {temp: 1000, long: 10, lvl:1});
GT_Material.register("Galena", {isDust:true, isSmallDust:true, generateRecipes:true}, {temp: 800, long: 10, lvl:1});

GT_Material.RegisterImpureDust(ItemID.dustBauxite, [[ItemID.dustAluminium, 1], [ItemID.dustSmallTitanium, 4], [ItemID.dustSmallIron, 4]], GT_Material.RetArg("dusts", "Bauxite", "lvl"));
GT_Material.RegisterImpureDust(ItemID.dustRuby, [ItemID.dustChrome, 1, ItemID.dustAluminium, 1], GT_Material.RetArg("dusts", "Ruby", "lvl"));
GT_Material.RegisterImpureDust(331, [ItemID.dustSmallRuby, 1, ItemID.dustNikel, 1, ItemID.dustSmallBauxite, 1], GT_Material.RetArg("dusts", "Redstone", "lvl"));
GT_Material.RegisterImpureDust(ItemID.dustLapis, [ItemID.dustSmallSaphire, 1, ItemID.dustAluminium, 1, ItemID.dustSmallManganese, 2], GT_Material.RetArg("dusts", "Lapis", "lvl"));
GT_Material.RegisterImpureDust(ItemID.dustEmerald, [ItemID.dustSmallRuby, 1, ItemID.dustNikel, 1], GT_Material.RetArg("dusts", "Emerald", "lvl"));
GT_Material.RegisterImpureDust(ItemID.dustStainless, [ItemID.dustSmallIron, 3, ItemID.dustSmallNikel, 3, ItemID.dustSmallManganese, 2], GT_Material.RetArg("dusts", "Stainless", "lvl"));
GT_Material.RegisterImpureDust(ItemID.dustMagnetite, [ItemID.dustSmallIron, 4, ItemID.dustSmallGold, 4, ItemID.dustSmallVolfram, 1], GT_Material.RetArg("dusts", "Magnetite", "lvl"), true);
GT_Material.RegisterImpureDust(ItemID.dustRedGranit, [ItemID.dustSmallBauxite, 2, ItemID.dustSmallStone, 7], GT_Material.RetArg("dusts", "RedGranit", "lvl"));
GT_Material.RegisterImpureDust(ItemID.dustBlackGranit, [ItemID.dustSmallMagnetite, 2, ItemID.dustSmallStone, 7], GT_Material.RetArg("dusts", "BlackGranit", "lvl"));
GT_Material.RegisterImpureDust(ItemID.dustTetrahedrite, [ItemID.dustCopper, 1, ItemID.dustSmallChrome, 1], GT_Material.RetArg("dusts", "Tetrahedrite", "lvl"), true);
GT_Material.RegisterImpureDust(ItemID.dustGalena, [ItemID.dustSilver, 1, ItemID.dustLead, 1], GT_Material.RetArg("dusts", "Galena", "lvl"), true);
GT_Material.RegisterImpureDust(ItemID.dustMalachite, [ItemID.dustCopper, 1, ItemID.dustSmallEmerald, 1], GT_Material.RetArg("dusts", "Malachite", "lvl"), true);




// file: common/items/components.js

IDRegistry.genItemID("resistor");
Item.createItem("resistor", "Resistor", {name: "resistor"});

IDRegistry.genItemID("glasstube");
Item.createItem("glasstube", "Glass Tube", {name: "glasstube"});

IDRegistry.genItemID("vacuumtube");
Item.createItem("vacuumtube", "Vacuum Tube", {name: "vacuumtube"});

IDRegistry.genItemID("coatedcircuitboard");
Item.createItem("coatedcircuitboard", "Coated Circuit Board", {name: "coatedcircuitboard"});

IDRegistry.genItemID("electricmotorLV");
Item.createItem("electricmotorLV", "Electric Motor (LV)", {name: "electricmotor_lv"});

IDRegistry.genItemID("electricpumpLV");
Item.createItem("electricpumpLV", "Electric Pump (LV)", {name: "electricpump_lv"});

IDRegistry.genItemID("electricpistonLV");
Item.createItem("electricpistonLV", "Electric Piston (LV)", {name: "electricpiston_lv"});

IDRegistry.genItemID("rotorTin");
Item.createItem("rotorTin", "Tin Rotor", {name: "tin_rotor"});

IDRegistry.genItemID("flour");
Item.createItem("flour", "Flour", {name: "flour"});

IDRegistry.genItemID("dough");
Item.createItem("dough", "Dough", {name: "dough"});

IDRegistry.genItemID("doughBread");
Item.createItem("doughBread", "Dough Bread", {name: "dough_bread"});

IDRegistry.genItemID("dustCocoa");
Item.createItem("dustCocoa", "Cocoa Powder", {name: "cocoa_dust"});

IDRegistry.genItemID("doughChocolate");
Item.createItem("doughChocolate", "Chocolate Dough", {name: "dough_c"});

IDRegistry.genItemID("doughCookie");
Item.createItem("doughCookie", "Cookie shaped Dough", {name: "dough_cookie"});




// file: common/items/cells.js

IDRegistry.genItemID("cellSteam");
Item.createItem("cellSteam", "Steam cell", {name: "Steam_cell"});
LiquidRegistry.registerItem("steam", {id: ItemID.cellEmpty, data: 0}, {id: ItemID.cellSteam, data: 0});




// file: common/items/shapes.js

Translation.addTranslation("Empty Shape Plate", {ru: "Пустая пластина формы",  zh: "空盘形式"});
IDRegistry.genItemID("EmptyShapePlate");
Item.createItem("EmptyShapePlate", "Empty Shape Plate", {name: "EMPTY"});

Translation.addTranslation("Mold (Cylinder)", {ru: "Прессформа (Цилиндр)",  zh: "模(气缸)"});
IDRegistry.genItemID("MoldCylinder");
Item.createItem("MoldCylinder", "Mold (Cylinder)", {name: "CYLINDER"});

Translation.addTranslation("Mold (Anvil)", {ru: "Прессформа (Наковальня)",  zh: "模(砧)"});
IDRegistry.genItemID("MoldAnvil");
Item.createItem("MoldAnvil", "Mold (Anvil)", {name: "ANVIL"});

Translation.addTranslation("Mold (Plate)", {ru: "Прессформа (Пластина)",  zh: "模(板)"});
IDRegistry.genItemID("MoldPlate");
Item.createItem("MoldPlate", "Mold (Plate)", {name: "MPLATE"});


Translation.addTranslation("Mold (Ingot)", {ru: "Прессформа (Слиток)",  zh: "模(锭)"});
IDRegistry.genItemID("MoldIngot");
Item.createItem("MoldIngot", "Mold (Ingot)", {name: "MINGOT"});

Translation.addTranslation("Mold (Nuggets)", {ru: "Прессформа (Самородок)",  zh: "模(金块)"});
IDRegistry.genItemID("MoldNuggets");
Item.createItem("MoldNuggets", "Mold (Nuggets)", {name: "MNUGGET"});

Translation.addTranslation("Mold (Block)", {ru: "Прессформа (Блок)",  zh: "模(单元)"});
IDRegistry.genItemID("MoldBlock");
Item.createItem("MoldBlock", "Mold (Block)", {name: "MBLOCK"});

Translation.addTranslation("Mold (Ball)", {ru: "Прессформа (Шар)",  zh: "模(球)"});
IDRegistry.genItemID("MoldBall");
Item.createItem("MoldBall", "Mold (Ball)", {name: "MBALL"});




Translation.addTranslation("Extruder Shape (Casing)", {ru: "Форма экструдера (Корпус)",  zh: "挤压形的(情况下)"});
IDRegistry.genItemID("ExtruderShapeCasing");
Item.createItem("ExtruderShapeCasing", "Extruder Shape (Casing)", {name: "ECASING"});

Translation.addTranslation("Extruder Shape (Bottle)", {ru: "Форма экструдера (Бутыль)",  zh: "挤压形的(瓶)"});
IDRegistry.genItemID("ExtruderShapeBottle");
Item.createItem("ExtruderShapeBottle", "Extruder Shape (Bottle)", {name: "EBOTTLE"});

Translation.addTranslation("Extruder Shape (Ingot)", {ru: "Форма экструдера (Слиток)",  zh: "挤压形的(锭)"});
IDRegistry.genItemID("ExtruderShapeIngot");
Item.createItem("ExtruderShapeIngot", "Extruder Shape (Ingot)", {name: "EINGOT"});

Translation.addTranslation("Extruder Shape (Cell)", {ru: "Форма экструдера (Капсула)",  zh: "挤压形的(胶囊)"});
IDRegistry.genItemID("ExtruderShapeCell");
Item.createItem("ExtruderShapeCell", "Extruder Shape (Cell)", {name: "ECELL"});

Translation.addTranslation("Extruder Shape (Ring)", {ru: "Форма экструдера (Кольцо)",  zh: "挤压形的(环)"});
IDRegistry.genItemID("ExtruderShapeRing");
Item.createItem("ExtruderShapeRing", "Extruder Shape (Ring)", {name: "ERING"});

Translation.addTranslation("Extruder Shape (Block)", {ru: "Форма экструдера (Блок)",  zh: "挤压形的(单元)"});
IDRegistry.genItemID("ExtruderShapeBlock");
Item.createItem("ExtruderShapeBlock", "Extruder Shape (Block)", {name: "EBLOCK"});

Translation.addTranslation("Extruder Shape (Plate)", {ru: "Форма экструдера (Пластина)",  zh: "挤压形的(板)"});
IDRegistry.genItemID("ExtruderShapePlate");
Item.createItem("ExtruderShapePlate", "Extruder Shape (Plate)", {name: "EPLATE"});

Translation.addTranslation("Extruder Shape (Rod)", {ru: "Форма экструдера (Стрежень)",  zh: "挤压形的(棒)"});
IDRegistry.genItemID("ExtruderShapeRod");
Item.createItem("ExtruderShapeRod", "Extruder Shape (Rod)", {name: "EROD"});

Translation.addTranslation("Extruder Shape (Bolt)", {ru: "Форма экструдера (Болт)",  zh: "挤压形的(螺栓)"});
IDRegistry.genItemID("ExtruderShapeBolt");
Item.createItem("ExtruderShapeBolt", "Extruder Shape (Bolt)", {name: "EBOLT"});

Translation.addTranslation("Extruder Shape (Wire)", {ru: "Форма экструдера (Провод)",  zh: "挤压形的(丝)"});
IDRegistry.genItemID("ExtruderShapeWire");
Item.createItem("ExtruderShapeWire", "Extruder Shape (Wire)", {name: "EWIRE"});

Translation.addTranslation("Extruder Shape (Tiny Pipe)", {ru: "Форма экструдера (Крошечная труба)",  zh: "挤压形的(小管)"});
IDRegistry.genItemID("ExtruderShapeTinyPipe");
Item.createItem("ExtruderShapeTinyPipe", "Extruder Shape (Tiny Pipe)", {name: "ETP"});

Translation.addTranslation("Extruder Shape (Small Pipe)", {ru: "Форма экструдера (Маленькая труба)",  zh: "挤压形的(小管道)"});
IDRegistry.genItemID("ExtruderShapeSmallPipe");
Item.createItem("ExtruderShapeSmallPipe", "Extruder Shape (Small Pipe)", {name: "ESP"});

Translation.addTranslation("Extruder Shape (Normal Pipe)", {ru: "Форма экструдера (Обычная труба)",  zh: "挤压形的(传统管)"});
IDRegistry.genItemID("ExtruderShapeNormalPipe");
Item.createItem("ExtruderShapeNormalPipe", "Extruder Shape (Normal Pipe)", {name: "ENP"});

Translation.addTranslation("Extruder Shape (Large Pipe)", {ru: "Форма экструдера (Большая труба)",  zh: "挤压形的(大管子)"});
IDRegistry.genItemID("ExtruderShapeLargePipe");
Item.createItem("ExtruderShapeLargePipe", "Extruder Shape (Large Pipe)", {name: "ELP"});

Translation.addTranslation("Extruder Shape (Huge Pipe)", {ru: "Форма экструдера (Огромная труба)",  zh: "挤压形的(一个巨大的水管)"});
IDRegistry.genItemID("ExtruderShapeHugePipe");
Item.createItem("ExtruderShapeHugePipe", "Extruder Shape (Huge Pipe)", {name: "EHP"});




// file: common/gui/GT_Container_Boiler.js

var guiHighPressureCoalBoiler = new UI.StandartWindow({
    standart: {header: {text: {text: "High Pressure Coal Boiler"}}, inventory: {standart: true}, background: { bitmap: "SteelBG"}},
	params: {slot: "SteelSlot", invSlot: "SteelSlot"},
    drawing: [{type: "bitmap", x: 446, y: 200, bitmap: "SteelFuelIcon", scale: 3.2},
            {type: "bitmap", x: 530, y: 140, bitmap: "SteelFuelBG", scale: 3.2},  
            {type: "bitmap", x: 590, y: 140, bitmap: "SteelFuelBG", scale: 3.2}, 
            {type: "bitmap", x: 650, y: 140, bitmap: "SteelFuelBG", scale: 3.2}, 
            {type: "bitmap", x: 714, y: 200, bitmap: "SteelBurnBG", scale: 3.2},
            {type: "bitmap", x: 900, y: 400, bitmap: "GTLogoSteel", scale: 4},     
    ],
    elements: {
        "slotWater": {type: "slot", x: 441, y: 132, bitmap:"SteelSlotIN"},
		"slotNull": {type: "slot", x: 441, y: 262, bitmap:"SteelSlotOUT"},
		"slotFuelD": {type: "slot", x: 711, y: 132, bitmap:"SteelSlotDust"},
		"slotFuel": {type: "slot", x: 711, y: 262, bitmap:"SteelSlotFuel"},
		"steamScale": {type: "scale", x: 530, y: 140, direction: 1, value: 0, bitmap: "SteamScale", scale: 3.2},
		"waterScale": {type: "scale", x: 590, y: 140, direction: 1, value: 0, bitmap: "WaterScale", scale: 3.2},
		"fuelScale": {type: "scale", x: 650, y: 140, direction: 1, value: 0, bitmap: "FuelScale", scale: 3.2},
		"burningScale": {type: "scale", x: 714, y: 200, direction: 1, value: 0.5, bitmap: "SteelBurnScale", scale: 3.2},
    }
});

var guiHighPressureLavaBoiler = new UI.StandartWindow({
    standart: {header: {text: {text: "High Pressure Lava Boiler"}}, inventory: {standart: true}, background: { bitmap: "SteelBG"}},
	params: {slot: "SteelSlot", invSlot: "SteelSlot"}, 
    drawing: [
            {type: "bitmap", x: 446, y: 200, bitmap: "SteelFuelIcon", scale: 3.2},
            {type: "bitmap", x: 530, y: 140, bitmap: "SteelFuelBG", scale: 3.2},  
            {type: "bitmap", x: 590, y: 140, bitmap: "SteelFuelBG", scale: 3.2}, 
            {type: "bitmap", x: 650, y: 140, bitmap: "SteelFuelBG", scale: 3.2}, 
            {type: "bitmap", x: 714, y: 200, bitmap: "SteelBurnBG", scale: 3.2},
            {type: "bitmap", x: 900, y: 400, bitmap: "GTLogoSteel", scale: 4},     
    ], 
    elements: {
        "slotWater": {type: "slot", x: 441, y: 132, bitmap:"SteelSlotIN"},
		"slotNull": {type: "slot", x: 441, y: 262, bitmap:"SteelSlotOUT"},
		"slotFuelD": {type: "slot", x: 711, y: 132, bitmap:"SteelSlotDust"},
		"slotFuel": {type: "slot", x: 711, y: 262, bitmap:"SteelSlotFuel"},
		"steamScale": {type: "scale", x: 530, y: 140, direction: 1, value: 0, bitmap: "SteamScale", scale: 3.2},
		"waterScale": {type: "scale", x: 590, y: 140, direction: 1, value: 0, bitmap: "WaterScale", scale: 3.2},
		"fuelScale": {type: "scale", x: 650, y: 140, direction: 1, value: 0, bitmap: "FuelScale", scale: 3.2},
		"burningScale": {type: "scale", x: 714, y: 200, direction: 1, value: 0.5, bitmap: "SteelBurnScale", scale: 3.2},
    }
});

var guiSimpleSolarBoiler = new UI.StandartWindow({
    standart: {header: {text: {text: "Simple Solar Boiler"}}, inventory: {standart: true}, background: { bitmap: "BronzeBG"}},
	params: {slot: "BronzeSlot", invSlot: "BronzeSlot"},
    drawing: [
            {type: "bitmap", x: 446, y: 200, bitmap: "FuelIcon", scale: 3.2},
            {type: "bitmap", x: 530, y: 140, bitmap: "BronzeFuelBG", scale: 3.2},  
            {type: "bitmap", x: 590, y: 140, bitmap: "BronzeFuelBG", scale: 3.2}, 
            {type: "bitmap", x: 650, y: 140, bitmap: "BronzeFuelBG", scale: 3.2}, 
            {type: "bitmap", x: 714, y: 200, bitmap: "BronzeFuelScaleBG", scale: 3.2},
            {type: "bitmap", x: 900, y: 400, bitmap: "GTLogoBronze", scale: 4},     
    ],
    elements: {
        "slotWater": {type: "slot", x: 441, y: 132, bitmap: "bronzeSlotIN"},
		"slotNull": {type: "slot", x: 441, y: 262, bitmap: "bronzeSlotOUT"},
		"steamScale": {type: "scale", x: 530, y: 140, direction: 1, value: 0, bitmap: "SteamScale", scale: 3.2},
		"waterScale": {type: "scale", x: 590, y: 140, direction: 1, value: 0, bitmap: "WaterScale", scale: 3.2},
		"fuelScale": {type: "scale", x: 650, y: 140, direction: 1, value: 0, bitmap: "FuelScale", scale: 3.2},
		"burningScale": {type: "scale", x: 714, y: 200, direction: 1, value: 0.5, bitmap: "BronzeFuelScale", scale: 3.2},
    }
});


var guiSmallBoiler = new UI.StandartWindow({
    standart: {header: {text: {text: "Small Coal Boiler"}}, inventory: {standart: true}, background: { bitmap: "BronzeBG"}},
	params: {slot: "BronzeSlot", invSlot: "BronzeSlot"}, 
    drawing: [
            {type: "bitmap", x: 446, y: 200, bitmap: "FuelIcon", scale: 3.2},
            {type: "bitmap", x: 530, y: 140, bitmap: "BronzeFuelBG", scale: 3.2},  
            {type: "bitmap", x: 590, y: 140, bitmap: "BronzeFuelBG", scale: 3.2}, 
            {type: "bitmap", x: 650, y: 140, bitmap: "BronzeFuelBG", scale: 3.2}, 
            {type: "bitmap", x: 714, y: 200, bitmap: "BronzeFuelScaleBG", scale: 3.2},
            {type: "bitmap", x: 900, y: 400, bitmap: "GTLogoBronze", scale: 4},     
    ], 
    elements: {
        "slotWater": {type: "slot", x: 441, y: 132, bitmap:"bronzeSlotIN"},
		"slotNull": {type: "slot", x: 441, y: 262, bitmap:"bronzeSlotOUT"},
		"slotFuelD": {type: "slot", x: 711, y: 132, bitmap:"bronzeSlotDust"},
		"slotFuel": {type: "slot", x: 711, y: 262, bitmap:"bronzeSlotFuel"},
		"steamScale": {type: "scale", x: 530, y: 140, direction: 1, value: 0, bitmap: "SteamScale", scale: 3.2},
		"waterScale": {type: "scale", x: 590, y: 140, direction: 1, value: 0, bitmap: "WaterScale", scale: 3.2},
		"fuelScale": {type: "scale", x: 650, y: 140, direction: 1, value: 0, bitmap: "FuelScale", scale: 3.2},
		"burningScale": {type: "scale", x: 714, y: 200, direction: 1, value: 0.5, bitmap: "BronzeFuelScale", scale: 3.2},
    }
});




// file: common/gui/GT_Container_BronzeMachine.js

var guiCharcoalPit = new UI.StandartWindow({
    standart: {header: {text: {text: "Charcoal Pit"}}, inventory: {standart: true}, background: { bitmap: "BronzeBG"}},
    drawing: [
            {type: "bitmap", x: 515, y: 82, bitmap: "BronzeGuiScale", scale: 4},
            {type: "bitmap", x: 900, y: 400, bitmap: "GTLogoBronze", scale: 4},     
    ], 
    elements: {
    "text1": {type: "text", x: 585, y: 90, width: 300, height: 32, text: "Working"},
    "text2": {type: "text", x: 588, y: 113, width: 300, height: 32, text: "Size"},
    "text3": {type: "text", x: 550, y: 134, width: 300, height: 32, text: "Block Checking"},
    "BronzeButton": {type: "button",  x: 580, y: 165, bitmap: "BronzeButton", bitmap2: "BronzeButtonDown", scale: 3.2, clicker: {onClick: function(){if(CharcoalActive == 1){CharcoalActive = 0;}}}},
	"BronzeButton1": {type: "button",  x: 685, y: 165, bitmap: "BronzeButton1", bitmap2: "BronzeButtonDown1", scale: 3.2, clicker: {onClick: function(){if(CharcoalActive == 0){CharcoalActive = 1;}}}},
	}
});

var guiSteamAlloySmelter = new UI.StandartWindow({
    standart: {header: {text: {text: "Steam Alloy Smelter"}}, inventory: {standart: true}, background: { bitmap: "BronzeBG"}},
	params: {slot: "BronzeSlot",invSlot: "BronzeSlot"},
    drawing: [
            {type: "bitmap", x: 530, y: 153, bitmap: "BronzeProgressBG", scale: 3.2},
            {type: "bitmap", x: 900, y: 400, bitmap: "GTLogoBronze", scale: 4},     
    ],
    elements: {
        "slotSource": {type: "slot", x: 381, y: 150, bitmap: "bronzeSlotFire"},
		"slotSource2": {type: "slot", x: 441, y: 150, bitmap: "bronzeSlotFire"},
		"slotResult": {type: "slot", x: 625, y: 150},		
		"progressScale": {type: "scale", x: 530, y: 150, direction: 0, value: 0, bitmap: "BronzeProgressScale", scale: 3.2},
    }
});

var guiSteamComressor = new UI.StandartWindow({
    standart: {header: {text: {text: "Steam Compressor"}}, inventory: {standart: true}, background: { bitmap: "BronzeBG"}},
	params: {slot: "BronzeSlot", invSlot: "BronzeSlot"},
    drawing: [
            {type: "bitmap", x: 530, y: 153, bitmap: "BronzeCompressorBG", scale: 3.2},
            {type: "bitmap", x: 900, y: 400, bitmap: "GTLogoBronze", scale: 4},     
    ],
    elements: {
        "slotSource": {type: "slot", x: 441, y: 153, bitmap:"bronzeSlotCompress"},
		"slotResult": {type: "slot", x: 625, y: 153},		
		"progressScale": {type: "scale", x: 530, y: 153, direction: 0, value: 0, bitmap: "BronzeCompressorScale", scale: 3.2},
    }
});

var guiSteamExtractor = new UI.StandartWindow({
    standart: {header: {text: {text: "Steam Extractor"}},inventory: {standart: true}, background: { bitmap: "BronzeBG"}},
	params: {slot: "BronzeSlot", invSlot: "BronzeSlot"},
    drawing: [
            {type: "bitmap", x: 530, y: 158, bitmap: "BronzeExtractorBG", scale: 3.2},
            {type: "bitmap", x: 900, y: 400, bitmap: "GTLogoBronze", scale: 4},     
    ],
    elements: {
        "slotSource": {type: "slot", x: 441, y: 158, bitmap: "bronzeSlotExtractor"},
		"slotResult": {type: "slot", x: 625, y: 158},		
		"progressScale": {type: "scale", x: 530, y: 158, direction: 0, value: 0, bitmap: "BronzeExtractorScale", scale: 3.2},
		
    }
});

var guiSteamForgeHammer = new UI.StandartWindow({
    standart: {header: {text: {text: "Steam Forge Hammer"}}, inventory: {standart: true}, background: { bitmap: "BronzeBG"}},
	params: {slot: "BronzeSlot", invSlot: "BronzeSlot"},
    drawing: [
            {type: "bitmap", x: 530, y: 150, bitmap: "BronzeHammerBG", scale: 3.2},
            {type: "bitmap", x: 900, y: 400, bitmap: "GTLogoBronze", scale: 4},     
    ],
    elements: {
        "slotSource": {type: "slot", x: 441, y: 150, bitmap: "bronzeSlotHammer"},
		"slotResult": {type: "slot", x: 625, y: 150},		
		"progressScale": {type: "scale", x: 530, y: 150, direction: 3, value: 0, bitmap: "BronzeHammerScale", scale: 3.2},
    }
});

var guiSteamFurnace = new UI.StandartWindow({
    standart: {header: {text: {text: "Steam Furnace"}}, inventory: {standart: true}, background: { bitmap: "BronzeBG"}},
	params: {slot: "BronzeSlot", invSlot: "BronzeSlot"},
    drawing: [
            {type: "bitmap", x: 530, y: 153, bitmap: "BronzeProgressBG", scale: 3.2},
            {type: "bitmap", x: 900, y: 400, bitmap: "GTLogoBronze", scale: 4},     
    ],
    elements: {
        "slotSource": {type: "slot", x: 441, y: 150, bitmap: "bronzeSlotFire"},
		"slotResult": {type: "slot", x: 625, y: 150},		
		"progressScale": {type: "scale", x: 530, y: 150, direction: 0, value: 0, bitmap: "BronzeProgressScale", scale: 3.2},
    }
});

var guiSteamMacerator = new UI.StandartWindow({
    standart: {header: {text: {text: "Steam Macerator"}}, inventory: {standart: true}, background: { bitmap: "BronzeBG"}},
	params: {slot: "BronzeSlot", invSlot: "BronzeSlot"},
    drawing: [
            {type: "bitmap", x: 530, y: 153, bitmap: "BronzeMaceratorBG", scale: 3.2},
            {type: "bitmap", x: 900, y: 400, bitmap: "GTLogoBronze", scale: 4},     
    ],
    elements: {
        "slotSource": {type: "slot", x: 441, y: 153, bitmap: "bronzeSlotMacerator"},
		"slotResult": {type: "slot", x: 625, y: 153},		
		"progressScale": {type: "scale", x: 530, y: 153, direction: 0, value: 0, bitmap: "BronzeMaceratorScale", scale: 3.2},
    }
});

var guiBronzePlatedBlastFurnase = new UI.StandartWindow({
    standart: {header: {text: {text: "Bronze Blast Furnace"}}, inventory: {standart: true}, background: { bitmap: "BronzeBG"}},
	params: {slot: "BronzeSlot", invSlot: "BronzeSlot"}, 
    drawing: [
            {type: "bitmap", x: 530, y: 200, bitmap: "BronzeBlastFurnaceBG", scale: 3.2},
            {type: "bitmap", x: 900, y: 400, bitmap: "GTLogoBronze", scale: 4},     
            {type: "bitmap", x: 800, y: 115, bitmap: "BronzeBlastFurnaceInfo", scale: 4},     
    ],
    elements: {
        "slotSource": {type: "slot", x: 441, y: 155, bitmap: "bronzeSlotIngot"},
		"slotFuel": {type: "slot", x: 441, y: 215, bitmap: "bronzeSlotFuel"},
		"slotResult": {type: "slot", x: 625, y: 185, bitmap: "bronzeSlotIngot"},
        "slotResultDust": {type: "slot", x: 685, y: 185, bitmap: "bronzeSlotDust"},			
		"progressScale": {type: "scale", x: 530, y: 200, direction: 0, value: 0, bitmap: "BronzeBlastFurnaceScale", scale: 3.2},
    }
});




// file: common/gui/GT_Container_ElectricMachine.js

var guiBasicElectricFurnace = new UI.StandartWindow({
    standart: {header: {text: {text: "Basic Electric Furnace"}}, inventory: {standart: true}, background: {standart: true}},
    drawing: [
            {type: "bitmap", x: 900, y: 380, bitmap: "GTLogoGold", scale: 4},
            {type: "bitmap", x: 530, y: 146, bitmap: "furnace_bar_background", scale: 3.2},			
    ],
    elements: {
        "progressScale": {type: "scale", x: 530, y: 146, direction: 0, value: 0.5, bitmap: "furnace_bar_scale", scale: 3.2},
		"slotSource": {type: "slot", x: 441, y: 142, bitmap:"SlotFire"},
		"slotResult": {type: "slot", x: 625, y: 142}
		}
});

var guiBasicElectricAlloySmelter = new UI.StandartWindow({
    standart: {header: {text: {text: "Basic Electric Alloy Smelter"}}, inventory: {standart: true}, background: {standart: true}},
    drawing: [
            {type: "bitmap", x: 530, y: 153, bitmap: "furnace_bar_background", scale: 3.2},
            {type: "bitmap", x: 900, y: 380, bitmap: "GTLogoGold", scale: 4},     
    ],
    elements: {
        "slotSource": {type: "slot", x: 381, y: 150, bitmap: "SlotFire"},
		"slotSource2": {type: "slot", x: 441, y: 150, bitmap: "SlotFire"},
		"slotResult": {type: "slot", x: 625, y: 150},		
		"progressScale": {type: "scale", x: 530, y: 150, direction: 0, value: 0, bitmap: "furnace_bar_scale", scale: 3.2},
    }
});

var guiBasicElectricComressor = new UI.StandartWindow({
    standart: {header: {text: {text: "Basic Electric Compressor"}}, inventory: {standart: true}, background: {standart: true}},
    drawing: [
            {type: "bitmap", x: 530, y: 153, bitmap: "compressor_bar_background", scale: 3.2},
            {type: "bitmap", x: 900, y: 380, bitmap: "GTLogoGold", scale: 4},     
    ],
    elements: {
        "slotSource": {type: "slot", x: 441, y: 153, bitmap:"SlotCompress"},
		"slotResult": {type: "slot", x: 625, y: 153},		
		"progressScale": {type: "scale", x: 530, y: 153, direction: 0, value: 0, bitmap: "compressor_bar_scale", scale: 3.2},
    }
});

var guiBasicElectricExtractor = new UI.StandartWindow({
    standart: {header: {text: {text: "Basic Electric Extractor"}},inventory: {standart: true}, background: {standart: true}},
    drawing: [
            {type: "bitmap", x: 530, y: 158, bitmap: "extractor_bar_background", scale: 3.2},
            {type: "bitmap", x: 900, y: 380, bitmap: "GTLogoGold", scale: 4},     
    ],
    elements: {
        "slotSource": {type: "slot", x: 441, y: 158, bitmap: "SlotExtractor"},
		"slotResult": {type: "slot", x: 625, y: 158},		
		"progressScale": {type: "scale", x: 530, y: 158, direction: 0, value: 0, bitmap: "extractor_bar_scale", scale: 3.2},
		
    }
});

var guiBasicElectricMacerator = new UI.StandartWindow({
    standart: {header: {text: {text: "Basic Electric Macerator"}}, inventory: {standart: true}, background: {standart: true}},
    drawing: [
            {type: "bitmap", x: 530, y: 153, bitmap: "macerator_bar_background", scale: 3.2},
            {type: "bitmap", x: 900, y: 380, bitmap: "GTLogoGold", scale: 4},     
    ],
    elements: {
        "slotSource": {type: "slot", x: 441, y: 153, bitmap: "SlotMacerator"},
		"slotResult": {type: "slot", x: 625, y: 153},		
		"progressScale": {type: "scale", x: 530, y: 153, direction: 0, value: 0, bitmap: "macerator_bar_scale", scale: 3.2},
    }
});




// file: common/gui/GT_Container_Generator.js

var guiBasicSteamTurbine = new UI.StandartWindow({
    standart: {header: {text: {text: "Basic Steam Turbine"}}, inventory: {standart: true}, background: {standart: true}},
    drawing: [
            {type: "bitmap", x: 320, y: 40, bitmap: "InfoBG", scale: 5},
			{type: "bitmap", x: 695, y: 125, bitmap: "TankScaleBG", scale: 3.8},
            {type: "bitmap", x: 900, y: 380, bitmap: "GTLogoGold", scale: 4},     
    ],  
    elements: {
        "slotSteam": {type: "slot", x: 690, y: 60, bitmap:"ESlotIN"},
		"slotNull": {type: "slot", x: 690, y: 190, bitmap:"ESlotOUT"},
		"text1": {type: "text", text: "Liquid Amount",  width: 100, height: 50, x: 340, y: 60},
		"text2": {type: "text", text: "0", width: 100, height: 50, x: 340, y: 90},
		"Liquid": {type: "image", x: 600, y: 185, bitmap: "fluid_none_bg", scale: 4}
    }
});




// file: common/gui/GT_Container_SteelMachine.js

var guiHighPressureFurnace = new UI.StandartWindow({
    standart: {header: {text: {text: "High Pressure Furnace"}}, inventory: {standart: true}, background: { bitmap: "SteelBG"}},
	params: {slot: "SteelSlot", invSlot: "SteelSlot"},
    drawing: [
            {type: "bitmap", x: 530, y: 153, bitmap: "SteelProgressBG", scale: 3.2},
            {type: "bitmap", x: 900, y: 400, bitmap: "GTLogoSteel", scale: 4},     
    ],
    elements: {
        "slotSource": {type: "slot", x: 441, y: 150, bitmap: "steelSlotFire"},
		"slotResult": {type: "slot", x: 625, y: 150},		
		"progressScale": {type: "scale", x: 530, y: 150, direction: 0, value: 0, bitmap: "SteelProgressScale", scale: 3.2},
    }
});

var guiHighPressureMacerator = new UI.StandartWindow({
    standart: {header: {text: {text: "High Pressure Macerator"}}, inventory: {standart: true}, background: { bitmap: "SteelBG"}},
	params: {slot: "SteelSlot", invSlot: "SteelSlot"},
    drawing: [
            {type: "bitmap", x: 530, y: 153, bitmap: "SteelMaceratorBG", scale: 3.2},
            {type: "bitmap", x: 900, y: 400, bitmap: "GTLogoSteel", scale: 4},     
    ],
    elements: {
        "slotSource": {type: "slot", x: 441, y: 153, bitmap: "steelSlotMacerator"},
		"slotResult": {type: "slot", x: 625, y: 153},		
		"progressScale": {type: "scale", x: 530, y: 153, direction: 0, value: 0, bitmap: "SteelMaceratorScale", scale: 3.2},
    }
});

var guiHighPressureExtractor = new UI.StandartWindow({
    standart: {header: {text: {text: "High Pressure Extractor"}},inventory: {standart: true},background: { bitmap: "SteelBG"}},
	params: {slot: "SteelSlot", invSlot: "SteelSlot"},
    drawing: [
            {type: "bitmap", x: 530, y: 158, bitmap: "SteelExtractorBG", scale: 3.2},
            {type: "bitmap", x: 900, y: 400, bitmap: "GTLogoSteel", scale: 4},     
    ],
    elements: {
        "slotSource": {type: "slot", x: 441, y: 158, bitmap: "steelSlotExtractor"},
		"slotResult": {type: "slot", x: 625, y: 158},		
		"progressScale": {type: "scale", x: 530, y: 158, direction: 0, value: 0, bitmap: "SteelExtractorScale", scale: 3.2},	
    }
});

var guiHighPressureForgeHammer = new UI.StandartWindow({
    standart: {header: {text: {text: "High Pressure Forge Hammer"}},inventory: {standart: true},background: { bitmap: "BronzeBG"}},
	params: {slot: "SteelSlot", invSlot: "SteelSlot"},
    drawing: [
            {type: "bitmap", x: 530, y: 150, bitmap: "SteelHammerBG", scale: 3.2},
            {type: "bitmap", x: 900, y: 400, bitmap: "GTLogoSteel", scale: 4},     
    ],
    elements: {
        "slotSource": {type: "slot", x: 441, y: 150, bitmap: "steelSlotHammer"},
		"slotResult": {type: "slot", x: 625, y: 150},		
		"progressScale": {type: "scale", x: 530, y: 150, direction: 3, value: 0, bitmap: "SteelHammerScale", scale: 3.2},
    }
});

var guiHighPressureComressor = new UI.StandartWindow({
    standart: {header: {text: {text: "High Pressure Compressor"}},inventory: {standart: true},background: { bitmap: "SteelBG"}},
	params: {slot: "SteelSlot", invSlot: "SteelSlot"},
    drawing: [
            {type: "bitmap", x: 530, y: 153, bitmap: "SteelCompressorBG", scale: 3.2},
            {type: "bitmap", x: 900, y: 400, bitmap: "GTLogoSteel", scale: 4},     
    ],
    elements: {
        "slotSource": {type: "slot", x: 441, y: 153, bitmap:"steelSlotCompress"},
		"slotResult": {type: "slot", x: 625, y: 153},		
		"progressScale": {type: "scale", x: 530, y: 153, direction: 0, value: 0, bitmap: "SteelCompressorScale", scale: 3.2},
    }
});

var guiHighPressureAlloySmelter = new UI.StandartWindow({
    standart: {header: {text: {text: "High Pressure Alloy Smelter"}}, inventory: {standart: true}, background: { bitmap: "SteelBG"}},
	params: {slot: "SteelSlot", invSlot: "SteelSlot"},
    drawing: [
            {type: "bitmap", x: 530, y: 153, bitmap: "SteelProgressBG", scale: 3.2},
            {type: "bitmap", x: 900, y: 400, bitmap: "GTLogoSteel", scale: 4},     
    ],
    elements: {
        "slotSource": {type: "slot", x: 381, y: 150, bitmap: "steelSlotFire"},
		"slotSource2": {type: "slot", x: 441, y: 150, bitmap: "steelSlotFire"},
		"slotResult": {type: "slot", x: 625, y: 150},		
		"progressScale": {type: "scale", x: 530, y: 150, direction: 0, value: 0, bitmap: "SteelProgressScale", scale: 3.2},
    }
});




// file: common/machines/steam/GT_Boilers.js

ICore.Render.setStandartModel(BlockID.SmallBoiler, [["MACHINE_BRONZEBRICKS_BOTTOM", 0], ["MACHINE_BRONZE", 0], ["MACHINE_STEAM_EXIT", 0], ["MACHINE_SMALLBOILER_FRONT", 0], ["MACHINE_BRONZEBRICKS", 0], ["MACHINE_BRONZEBRICKS", 0]], true);
ICore.Render.registerRenderModel(BlockID.SmallBoiler, [["MACHINE_BRONZEBRICKS_BOTTOM", 0], ["MACHINE_BRONZE", 0], ["MACHINE_STEAM_EXIT", 0], ["MACHINE_SMALLBOILER_FRONT", 1], ["MACHINE_BRONZEBRICKS", 0], ["MACHINE_BRONZEBRICKS", 0]], true);
GT_SteamMachine.register(BlockID.SmallBoiler, {
	defaultValues: {burn: 0, fuel: 0, burnMax: 0},	
	getGuiScreen: function(){
		return guiSmallBoiler;
	},		
	init: function(){
		this.liquidStorage.setLimit("steam", 15);
		this.liquidStorage.setLimit("water", 15);
	},
	getTransportSlots: function(){
		return {input: ["slotFuel"], output: ["slotFuelD"]};
	},
	tick: function(){
	 var slotWater = this.container.getSlot("slotWater");
	 var slotNull = this.container.getSlot("slotNull");
	 var FuelD = this.container.getSlot("slotFuelD");
	 var Fuel = this.container.getSlot("slotFuel");
	 var empty = LiquidRegistry.getEmptyItem(slotWater.id, slotWater.data);
	        
     if(Math.random()<1/3 && this.data.burn==1){
             FuelD.id=ItemID.tinydustDarkAshes;
             FuelD.count++;
     }
	 if(empty && empty.liquid == "water"){
			if(this.liquidStorage.getAmount("water") <= 14 && (slotNull.id == empty.id && slotNull.data == empty.data && slotNull.count < Item.getMaxStack(empty.id) || slotNull.id == 0)){
				this.liquidStorage.addLiquid("water", 1);
				slotWater.count--;
				slotNull.id = empty.id;
				slotNull.data = empty.data;
				slotNull.count++;
				this.container.validateAll();
			}
		}
		if(this.liquidStorage.getAmount("water") >= 0.004 && this.data.fuel >= 100){
			if(this.liquidStorage.getAmount("steam") <= 15 - 0.0075){
				this.liquidStorage.addLiquid("steam", 0.0075);
				this.liquidStorage.addLiquid("water", -0.001);
			}
		}	              
		if(this.data.burn > 0){
			if(this.data.fuel < 1000){
				this.data.fuel += 0.08; 
				this.data.burn--;
			}
		}
		if(this.data.burn <= 0){
			this.data.burn = this.data.burnMax = this.getFuel("slotFuel") / 4;
			this.data.fuel -= 0.02;
		}
		if(this.liquidStorage.getAmount("steam") >= 15){
				this.liquidStorage.addLiquid("steam", -1);	
		}
		this.container.setScale("burningScale", this.data.burn / this.data.burnMax || 0);
		this.container.setScale("steamScale", this.liquidStorage.getAmount("steam")  / 15);
		this.container.setScale("waterScale", this.liquidStorage.getAmount("water")  / 15);		
		this.container.setScale("fuelScale", this.data.fuel / 1000);			
	},
	
	getFuel: function(slotName){
		var fuelSlot = this.container.getSlot(slotName);
		if (fuelSlot.id > 0){
			var burn = Recipes.getFuelBurnDuration(fuelSlot.id, fuelSlot.data);
			if (burn && !LiquidRegistry.getItemLiquid(fuelSlot.id, fuelSlot.data)){
				fuelSlot.count--;
				this.container.validateSlot(slotName);
				this.activate();
				return burn;
			}
		}
		this.deactivate();
		return 0;
	},
	
	isGenerator: function() {
		return true;
	},
	
	destroyBlock: function(coords, player){
          this.deactivate();       
     },
	 energyTick: function(type, src){
		var output = Math.min(0.0075, this.liquidStorage.getAmount("steam"));
		this.liquidStorage.addLiquid("steam", src.add(output) - output);
	 }, 
    init: GT_SteamMachine.initModel,
	activate: GT_SteamMachine.activateMachine,
	deactivate: GT_SteamMachine.deactivateMachine
});

ICore.Render.setStandartModel(BlockID.HighPressureLavaBoiler, [["MACHINE_BRONZEBRICKS_BOTTOM", 0], ["MACHINE_STEEL_TOP", 0], ["MACHINE_STEEL_SIDE", 0], ["MACHINE_HIGHPRESSURELAVABOILER_FRONT", 0], ["MACHINE_STEEL_SIDE", 0], ["MACHINE_STEEL_SIDE", 0]], true);
ICore.Render.registerRenderModel(BlockID.HighPressureLavaBoiler, [["MACHINE_BRONZEBRICKS_BOTTOM", 0], ["MACHINE_STEEL_TOP", 0], ["MACHINE_STEEL_SIDE", 0], ["MACHINE_HIGHPRESSURELAVABOILER_FRONT", 0], ["MACHINE_STEEL_SIDE", 0], ["MACHINE_STEEL_SIDE", 0]], true);
GT_SteamMachine.register(BlockID.HighPressureLavaBoiler, {
	defaultValues: {burn: 0, fuel: 0, burnMax: 0},
	
	getGuiScreen: function(){
		return guiHighPressureLavaBoiler;
	},
	init: function(){
		this.liquidStorage.setLimit("water", 15);
		this.liquidStorage.setLimit("steam", 15);
	},
	
	getTransportSlots: function(){
		return {input: ["slotFuel"], output: ["slotFuelD"]};
	},
	
	tick: function(){
	 var slotWater = this.container.getSlot("slotWater");
	 var slotNull = this.container.getSlot("slotNull");
	 var FuelD = this.container.getSlot("slotFuelD");
	 var Fuel = this.container.getSlot("slotFuel");
	 var empty = LiquidRegistry.getEmptyItem(slotWater.id, slotWater.data);
	 var energyStorage = this.getEnergyStorage();
      
	  if(empty && empty.liquid == "lava"){
			if(this.data.burn == 0 && slotNull.id == empty.id && slotNull.data == empty.data && slotNull.count < Item.getMaxStack(empty.id) || slotNull.id == 0){
				Fuel.count--;
				slotNull.id = empty.id;
				slotNull.data = empty.data;
				slotNull.count++;
				this.data.burn = 1000;
				this.container.validateAll();
			}
		}
	  
       if(empty && empty.liquid == "water"){
			if(this.liquidStorage.getAmount("water") <= 14 && (slotNull.id == empty.id && slotNull.data == empty.data && slotNull.count < Item.getMaxStack(empty.id) || slotNull.id == 0)){
				this.liquidStorage.addLiquid("water", 1);
				slotWater.count--;
				slotNull.id = empty.id;
				slotNull.data = empty.data;
				slotNull.count++;
				this.container.validateAll();
			}
		}
		if(this.liquidStorage.getAmount("water") >= 0.001 && this.data.fuel >= 100){
			if(this.liquidStorage.getAmount("steam") <= 15 - 0.03){
				this.liquidStorage.addLiquid("steam", 0.03);
				this.liquidStorage.addLiquid("water", -0.001);
			}
		}	        
        
		if(this.data.burn > 0){
			if(this.data.fuel < 500){
				this.data.fuel += 0.125; 
				this.data.burn--;
				this.activate();
			}
		}
		else {		
			this.data.fuel -= 0.02;
			this.deactivate();
		}
        if(this.liquidStorage.getAmount("steam") >= 15){
				this.liquidStorage.addLiquid("steam", -1);						
		}
                   	      
		this.container.setScale("burningScale", this.data.burn / this.data.burnMax || 0);
		this.container.setScale("steamScale", this.liquidStorage.getAmount("steam")  / 15);
		this.container.setScale("waterScale", this.liquidStorage.getAmount("water")  / 15);		
		this.container.setScale("fuelScale", this.data.fuel / 500);				
	},
	
	isGenerator: function() {
		return true;
	},
	
	getEnergyStorage: function(){
		return 16000;
	},
	energyTick: function(type, src){
		var output = Math.min(0.03, this.liquidStorage.getAmount("steam"));
		this.liquidStorage.addLiquid("steam", src.add(output) - output);
	},
	init: GT_SteamMachine.initModel,
	activate: GT_SteamMachine.activateMachine,
	deactivate: GT_SteamMachine.deactivateMachine,
	destroy: this.deactivate	
});


GT_SteamMachine.register(BlockID.SimpleSolarBoiler, {
	defaultValues: {fuel: 0},
	
	getGuiScreen: function(){
		return guiSimpleSolarBoiler;
	},
	
	init: function(){
		this.liquidStorage.setLimit("water", 15);
		this.liquidStorage.setLimit("steam", 15);
	},
	
	tick: function(){
		var slotWater = this.container.getSlot("slotWater");
		var slotNull = this.container.getSlot("slotNull");
		var empty = LiquidRegistry.getEmptyItem(slotWater.id, slotWater.data);	
		
		 if(empty && empty.liquid == "water"){
			if(this.liquidStorage.getAmount("water") <= 14 && (slotNull.id == empty.id && slotNull.data == empty.data && slotNull.count < Item.getMaxStack(empty.id) || slotNull.id == 0)){
				this.liquidStorage.addLiquid("water", 1);
				slotWater.count--;
				slotNull.id = empty.id;
				slotNull.data = empty.data;
				slotNull.count++;
				this.container.validateAll();
			}
		}
		if(this.liquidStorage.getAmount("water") >= 0.004 && this.data.fuel >= 100){
			if(this.liquidStorage.getAmount("steam") <= 15 - 0.0075){
				this.liquidStorage.addLiquid("steam", 0.0075);
				this.liquidStorage.addLiquid("water", -0.001);
			}
		}	        
        
		if(World.getLightLevel(this.x, this.y + 1, this.z) == 15 && this.data.fuel < 1000){
			this.data.fuel += 0.0105;
			this.container.setScale("burningScale", 1);
		}
		if(World.getLightLevel(this.x, this.y + 1, this.z) != 15 && this.data.fuel >= 20.04){
			this.data.fuel -= 0.04;
			this.container.setScale("burningScale", 0.1);
		}
		if(this.liquidStorage.getAmount("steam") >= 15){
				this.liquidStorage.addLiquid("steam", -1);						
		}
		
		this.container.setScale("steamScale", this.liquidStorage.getAmount("steam")  / 15);
		this.container.setScale("waterScale", this.liquidStorage.getAmount("water")  / 15);		
		this.container.setScale("fuelScale", this.data.fuel / 500);
	},
	
	
	isGenerator: function() {
		return true;
	},
	
	energyTick: function(type, src){
		var output = Math.min(0.0075, this.liquidStorage.getAmount("steam"));
		this.liquidStorage.addLiquid("steam", src.add(output) - output);
	}
	
});



ICore.Render.setStandartModel(BlockID.HighPressureCoalBoiler, [["MACHINE_BRONZEBRICKS_BOTTOM", 0], ["MACHINE_STEEL_TOP", 0], ["MACHINE_STEEL_SIDE", 0], ["MACHINE_HIGHPRESSURECOALBOILER_FRONT", 0], ["MACHINE_STEEL_SIDE", 0], ["MACHINE_STEEL_SIDE", 0]], true);
ICore.Render.registerRenderModel(BlockID.HighPressureCoalBoiler, [["MACHINE_BRONZEBRICKS_BOTTOM", 0], ["MACHINE_STEEL_TOP", 0], ["MACHINE_STEEL_SIDE", 0], ["MACHINE_HIGHPRESSURECOALBOILER_FRONT", 1], ["MACHINE_STEEL_SIDE", 0], ["MACHINE_STEEL_SIDE", 0]], true);
GT_SteamMachine.register(BlockID.HighPressureCoalBoiler, {
	defaultValues: {burn: 0, fuel: 0, burnMax: 0},
	
	getGuiScreen: function(){
		return guiHighPressureCoalBoiler;
	},
	
	init: function(){
		this.liquidStorage.setLimit("water", 15);
		this.liquidStorage.setLimit("steam", 15);
	},
	
	tick: function(){
	 var slotWater = this.container.getSlot("slotWater");
	 var slotNull = this.container.getSlot("slotNull");
	 var FuelD = this.container.getSlot("slotFuelD");
	 var Fuel = this.container.getSlot("slotFuel");
	 var empty = LiquidRegistry.getEmptyItem(slotWater.id, slotWater.data);
	 
         if(Math.random()<1/3&&this.data.burn==1){
           FuelD.id=ItemID.tinydustDarkAshes;
           FuelD.count++;
         }
		 
		  if(empty && empty.liquid == "water"){
			if(this.liquidStorage.getAmount("water") <= 14 && (slotNull.id == empty.id && slotNull.data == empty.data && slotNull.count < Item.getMaxStack(empty.id) || slotNull.id == 0)){
				this.liquidStorage.addLiquid("water", 1);
				slotWater.count--;
				slotNull.id = empty.id;
				slotNull.data = empty.data;
				slotNull.count++;
				this.container.validateAll();
			}
		}
		if(this.liquidStorage.getAmount("water") >= 0.001 && this.data.fuel >= 100){
			if(this.liquidStorage.getAmount("steam") <= 15 - 0.015){
				this.liquidStorage.addLiquid("steam", 0.015);
				this.liquidStorage.addLiquid("water", -0.001);
			}
		}	        
        
		if(this.data.burn > 0){
			if(this.data.fuel < 500){
				this.data.fuel += 0.15; 
				this.data.burn--;
			}
		}
		else {
			this.data.burn = this.data.burnMax = this.getFuel("slotFuel") / 4;
			this.data.fuel -= 0.04;
		}
        if(this.liquidStorage.getAmount("steam") >= 15){
				this.liquidStorage.addLiquid("steam", -1);		
		}			    	          	
		this.container.setScale("burningScale", this.data.burn / this.data.burnMax || 0);
		this.container.setScale("steamScale", this.liquidStorage.getAmount("steam")  / 15);
		this.container.setScale("waterScale", this.liquidStorage.getAmount("water")  / 15);		
		this.container.setScale("fuelScale", this.data.fuel / 500);		
	},
	
	getFuel: function(slotName){
		var fuelSlot = this.container.getSlot(slotName);
		if (fuelSlot.id > 0){
			var burn = Recipes.getFuelBurnDuration(fuelSlot.id, fuelSlot.data);
			if (burn && !LiquidRegistry.getItemLiquid(fuelSlot.id, fuelSlot.data)){
				fuelSlot.count--;
				this.container.validateSlot(slotName);
				this.activate();
				return burn;
			}
		}
		this.deactivate();
		return 0;
	},
	
	isGenerator: function() {
		return true;
	},
	
	energyTick: function(type, src){
		var output = Math.min(0.015, this.liquidStorage.getAmount("steam"));
		this.liquidStorage.addLiquid("steam", src.add(output) - output);
	},
	init: GT_SteamMachine.initModel,
	activate: GT_SteamMachine.activateMachine,
	deactivate: GT_SteamMachine.deactivateMachine,
	destroy: this.deactivate
});




// file: common/machines/steam/GT_Bronze.js

ICore.Render.setStandartModel(BlockID.SteamFurnace, [["MACHINE_BRONZEBRICKS_BOTTOM", 0], ["MACHINE_BRONZE", 0], ["MACHINE_BRONZEBRICKS", 0], ["MACHINE_STEAM_FURNACE", 0], ["MACHINE_BRONZEBRICKS", 0], ["MACHINE_BRONZEBRICKS", 0]], true);
ICore.Render.registerRenderModel(BlockID.SteamFurnace, [["MACHINE_BRONZEBRICKS_BOTTOM", 0], ["MACHINE_BRONZE", 0], ["MACHINE_BRONZEBRICKS", 0], ["MACHINE_STEAM_FURNACE", 1], ["MACHINE_BRONZEBRICKS", 0], ["MACHINE_BRONZEBRICKS", 0]], true);
GT_SteamMachine.register(BlockID.SteamFurnace, {
	defaultValues: {energy_consumption: 0.008, work_time: 256, progress: 0},
	
	getGuiScreen: function(){
		return guiSteamFurnace;
	},
	
	init: function(){
		this.liquidStorage.setLimit("steam", 15);
	},
	
	setDefaultValues: function(){
		this.data.energy_consumption = this.defaultValues.energy_consumption;
		this.data.work_time = this.defaultValues.work_time;
	},
		
	tick: function(){
		this.setDefaultValues();
		var content = this.container.getGuiContent();
		var sourceSlot = this.container.getSlot("slotSource");
		var result = Recipes.getFurnaceRecipeResult(sourceSlot.id, "iron");
		this.data.SoundMachine = "ElectroFurnaceLoop.ogg";
		if(result){
			var resultSlot = this.container.getSlot("slotResult");
			if(resultSlot.id == result.id && resultSlot.data == result.data && resultSlot.count < 64 || resultSlot.id == 0){
				if(this.liquidStorage.getAmount("steam")  >= this.data.energy_consumption){
					this.liquidStorage.addLiquid("steam", this.data.energy_consumption * -1);
					this.data.progress += 1/this.data.work_time;
					this.activate();
				}
				if(this.data.progress >= 1){
					sourceSlot.count--;
					resultSlot.id = result.id;
					resultSlot.data = result.data;
					resultSlot.count++;
					this.container.validateAll();
					this.data.progress = 0;
				}
			}
		}
		else {
			this.data.progress = 0;
			this.deactivate();
		}
		this.container.setScale("progressScale", this.data.progress);		
	},			
	
	destroyBlock: function(coords, player){
          this.deactivate();       
     },
	 
	 energyTick: function(type, src){
		var fluidNeed = 15 - this.liquidStorage.getAmount("steam");
		this.liquidStorage.addLiquid("steam", src.getAll(fluidNeed));
	 },
 
	init: GT_SteamMachine.initModel,
	activate: GT_SteamMachine.activateMachine,
	deactivate: GT_SteamMachine.deactivateMachine
});


ICore.Render.setStandartModel(BlockID.SteamMacerator, [["MACHINE_BRONZE", 0], ["MACHINE_BRONZE_DROBTOP", 0], ["MACHINE_BRONZE", 0], ["MACHINE_BRONZE_DROBFRONT", 0], ["MACHINE_BRONZE", 0], ["MACHINE_BRONZE", 0]], true);
ICore.Render.registerRenderModel(BlockID.SteamMacerator, [["MACHINE_BRONZE", 0], ["MACHINE_BRONZE_DROBTOP", 1], ["MACHINE_BRONZE", 0], ["MACHINE_BRONZE_DROBFRONT", 1], ["MACHINE_BRONZE", 0], ["MACHINE_BRONZE", 0]], true);
GT_SteamMachine.register(BlockID.SteamMacerator, {
	defaultValues: {energy_consumption: 0.004, progress: 0, RLevel: 2},
	
	getGuiScreen: function(){
		return guiSteamMacerator;
	},
	
	init: function(){
		this.liquidStorage.setLimit("steam", 15);
	},
	
	setDefaultValues: function(){
		this.data.energy_consumption = this.defaultValues.energy_consumption;
		this.data.RLevel =  this.defaultValues.RLevel;
	},
		
	tick: function(){
		this.setDefaultValues();
		var content = this.container.getGuiContent();
		var sourceSlot = this.container.getSlot("slotSource");
		var result = ICore.Recipe.getRecipeResult("macerator", sourceSlot.id, sourceSlot.data);
		this.data.SoundMachine = "MaceratorOp.ogg";
        if(result && sourceSlot.count >= 1){
			var resultSlot = this.container.getSlot("slotResult");
			if(resultSlot.id == result.id && resultSlot.data == result.data && resultSlot.count <= Item.getMaxStack(result.id) - result.count || resultSlot.id == 0 && this.data.RLevel >= result.lvl){
				if(this.liquidStorage.getAmount("steam")  >= this.data.energy_consumption){
					this.liquidStorage.addLiquid("steam", this.data.energy_consumption * -1);
					this.data.progress += 1/result.time;
					this.activate();
				}
				if(this.data.progress >= 1){
                    sourceSlot.count -= 1;
                    resultSlot.id = result.id;
                    resultSlot.data = result.data;
                    resultSlot.count += result.count;
                    this.container.validateAll();
                    this.data.progress = 0;
                }
            }
        }
        else {
            this.data.progress = 0;
			this.deactivate();
        }
		this.container.setScale("progressScale", this.data.progress);
	},
					
	energyTick: function(type, src){
		var fluidNeed = 15 - this.liquidStorage.getAmount("steam");
		this.liquidStorage.addLiquid("steam", src.getAll(fluidNeed));
	},
	 init: GT_SteamMachine.initModel,
	activate: GT_SteamMachine.activateMachine,
	deactivate: GT_SteamMachine.deactivateMachine,
	destroy: this.deactivate
});


ICore.Render.setStandartModel(BlockID.SteamForgeHammer, [["MACHINE_BRONZE", 0], ["MACHINE_BRONZE", 0], ["MACHINE_BRONZE", 0], ["MACHINE_BRONZE_HAMMER", 0], ["MACHINE_BRONZE", 0], ["MACHINE_BRONZE", 0]], true);
ICore.Render.registerRenderModel(BlockID.SteamForgeHammer, [["MACHINE_BRONZE", 0], ["MACHINE_BRONZE", 0], ["MACHINE_BRONZE", 0], ["MACHINE_BRONZE_HAMMER", 1], ["MACHINE_BRONZE", 0], ["MACHINE_BRONZE", 0]], true);
GT_SteamMachine.register(BlockID.SteamForgeHammer, {
	defaultValues: {energy_consumption: 0.032, progress: 0, RLevel: 2},
	
	getGuiScreen: function(){
		return guiSteamForgeHammer;
	},
	
	setDefaultValues: function(){
		this.data.energy_consumption = this.defaultValues.energy_consumption;
		this.data.RLevel = this.defaultValues.RLevel;
	},
	
	init: function(){
		this.liquidStorage.setLimit("steam", 15);
	},
		
	tick: function(){
		this.setDefaultValues();
		var content = this.container.getGuiContent();
		var sourceSlot = this.container.getSlot("slotSource");
		var result = ICore.Recipe.getRecipeResult("forgehammer", sourceSlot.id);
		this.data.SoundMachine = null;
        if(result && (sourceSlot.count >= result.ingredientCount || !result.ingredientCount) && this.data.RLevel >= result.lvl){
			var resultSlot = this.container.getSlot("slotResult");
			if(resultSlot.id == result.id && resultSlot.data == result.data && resultSlot.count <= Item.getMaxStack(result.id) - result.count || resultSlot.id == 0){
				if(this.liquidStorage.getAmount("steam")  >= this.data.energy_consumption){
					this.liquidStorage.addLiquid("steam", this.data.energy_consumption * -1);
					this.data.progress += 1/result.time;
					this.activate();
				}
				if(this.data.progress >= 1){
                    sourceSlot.count -= result.ingredientCount || 1;
                    resultSlot.id = result.id;
                    resultSlot.data = result.data;
                    resultSlot.count += result.count;
                    this.container.validateAll();
                    this.data.progress = 0;					
                }
            }
        }
        else {
            this.data.progress = 0;
		    this.deactivate();
        }
		this.container.setScale("progressScale", this.data.progress);
	},
					
	energyTick: function(type, src){
		var fluidNeed = 15 - this.liquidStorage.getAmount("steam");
		this.liquidStorage.addLiquid("steam", src.getAll(fluidNeed));
	},
	 init: GT_SteamMachine.initModel,
	activate: GT_SteamMachine.activateMachine,
	deactivate: GT_SteamMachine.deactivateMachine,
	destroy: this.deactivate
});


ICore.Render.setStandartModel(BlockID.SteamExtractor, [["MACHINE_BRONZE", 0], ["MACHINE_BRONZE_EXTRACTORTOP", 0], ["MACHINE_BRONZE", 0], ["MACHINE_BRONZE_EXTRACTOR", 0], ["MACHINE_BRONZE", 0], ["MACHINE_BRONZE_EXTRACTORRIGHT", 1]], true);
ICore.Render.registerRenderModel(BlockID.SteamExtractor, [["MACHINE_BRONZE", 0], ["MACHINE_BRONZE_EXTRACTORTOP", 1], ["MACHINE_BRONZE", 0], ["MACHINE_BRONZE_EXTRACTOR", 1], ["MACHINE_BRONZE", 0], ["MACHINE_BRONZE_EXTRACTORRIGHT", 1]], true);
GT_SteamMachine.register(BlockID.SteamExtractor, {
	defaultValues: {energy_consumption: 0.004, progress: 0, RLevel: 2},
	
	getGuiScreen: function(){
		return guiSteamExtractor;
	},
	
	setDefaultValues: function(){
		this.data.energy_consumption = this.defaultValues.energy_consumption;
        this.data.RLevel = this.defaultValue.RLevel;
	},
	
	init: function(){
		this.liquidStorage.setLimit("steam", 15);
	},
	
	tick: function(){
		this.setDefaultValues();
		var content = this.container.getGuiContent();
		var sourceSlot = this.container.getSlot("slotSource");
		var result = ICore.Recipe.getRecipeResult("extractor", sourceSlot.id, sourceSlot.data);
		this.data.SoundMachine = "ExtractorOp.ogg";
		if(result){
			var resultSlot = this.container.getSlot("slotResult");
			if(resultSlot.id == result.id && resultSlot.data == result.data && resultSlot.count <= 64 - result.count || resultSlot.id == 0 && this.data.RLevel >= result.lvl){
				if(this.liquidStorage.getAmount("steam")  >= this.data.energy_consumption){
					this.liquidStorage.addLiquid("steam", this.data.energy_consumption * -1);
					this.data.progress += 1/result.time;
					this.activate();
				}
				if(this.data.progress >= 1){
					sourceSlot.count--;
					resultSlot.id = result.id;
					resultSlot.data = result.data;
					resultSlot.count += result.count;
					this.container.validateAll();
					this.data.progress = 0;
				}
			}
		}
		else {
			this.data.progress = 0;
			this.deactivate();
		}
		
		this.container.setScale("progressScale", this.data.progress);
	},
					
	energyTick: function(type, src){
		var fluidNeed = 15 - this.liquidStorage.getAmount("steam");
		this.liquidStorage.addLiquid("steam", src.getAll(fluidNeed));
	},
    init: GT_SteamMachine.initModel,
	activate: GT_SteamMachine.activateMachine,
	deactivate: GT_SteamMachine.deactivateMachine,
	destroy: this.deactivate	
});


ICore.Render.setStandartModel(BlockID.SteamCompressor, [["MACHINE_BRONZE", 0], ["MACHINE_BRONZE_COMPRESSORTOP", 0], ["MACHINE_BRONZE", 0], ["MACHINE_BRONZE_COMPRESSOR", 0], ["MACHINE_BRONZE", 0], ["MACHINE_BRONZE_COMPRESSORSIDE", 0]], true);
ICore.Render.registerRenderModel(BlockID.SteamCompressor, [["MACHINE_BRONZE", 0], ["MACHINE_BRONZE_COMPRESSORTOP", 1], ["MACHINE_BRONZE", 0], ["MACHINE_BRONZE_COMPRESSOR", 1], ["MACHINE_BRONZE", 0], ["MACHINE_BRONZE_COMPRESSORSIDE", 0]], true);
GT_SteamMachine.register(BlockID.SteamCompressor, {
	defaultValues: {energy_consumption: 0.004, progress: 0, RLevel: 2},
	
	getGuiScreen: function(){
		return guiSteamComressor;
	},
	
	setDefaultValues: function(){
		this.data.energy_consumption = this.defaultValues.energy_consumption;
		this.data.RLevel = this.defaultValues.RLevel;
	},
	
	init: function(){
		this.liquidStorage.setLimit("steam", 15);
	},
		
	tick: function(){
		this.setDefaultValues();
		var content = this.container.getGuiContent();
		var sourceSlot = this.container.getSlot("slotSource");
		var result = ICore.Recipe.getRecipeResult("compressor", sourceSlot.id, sourceSlot.data);
	    this.data.SoundMachine = "CompressorOp.ogg";
        if(result && (sourceSlot.count >= result.ingredientCount || !result.ingredientCount) && this.data.RLevel >= result.lvl){
			var resultSlot = this.container.getSlot("slotResult");
			if(resultSlot.id == result.id && resultSlot.data == result.data && resultSlot.count <= Item.getMaxStack(result.id) - result.count || resultSlot.id == 0){
				if(this.liquidStorage.getAmount("steam")  >= this.data.energy_consumption){
					this.liquidStorage.addLiquid("steam", this.data.energy_consumption * -1);
					this.data.progress += 1/result.time;
					this.activate();
				}
				if(this.data.progress >= 1){
                    sourceSlot.count -= result.ingredientCount || 1;
                    resultSlot.id = result.id;
                    resultSlot.data = result.data;
                    resultSlot.count += result.count;
                    this.container.validateAll();
                    this.data.progress = 0;
                }
            }
        }
        else {
            this.data.progress = 0;
			this.deactivate();
        }
		this.container.setScale("progressScale", this.data.progress);
	},
					
	energyTick: function(type, src){
		var fluidNeed = 15 - this.liquidStorage.getAmount("steam");
		this.liquidStorage.addLiquid("steam", src.getAll(fluidNeed));
	},
	init: GT_SteamMachine.initModel,
	activate: GT_SteamMachine.activateMachine,
	deactivate: GT_SteamMachine.deactivateMachine,
	destroy: this.deactivate	
});

ICore.Render.setStandartModel(BlockID.SteamAlloySmelter, [["MACHINE_BRONZEBRICKS_BOTTOM", 0], ["MACHINE_BRONZE", 0], ["MACHINE_BRONZEBRICKS", 0], ["MACHINE_BRONZE_ALLOYSMELTER", 0], ["MACHINE_BRONZEBRICKS", 0], ["MACHINE_BRONZEBRICKS", 0]], true);
ICore.Render.registerRenderModel(BlockID.SteamAlloySmelter, [["MACHINE_BRONZEBRICKS_BOTTOM", 0], ["MACHINE_BRONZE", 0], ["MACHINE_BRONZEBRICKS", 0], ["MACHINE_BRONZE_ALLOYSMELTER", 1], ["MACHINE_BRONZEBRICKS", 0], ["MACHINE_BRONZEBRICKS", 0]], true);
GT_SteamMachine.register(BlockID.SteamAlloySmelter, {
	defaultValues: {energy_consumption: 0.016, progress: 0, RLevel: 2},
	
	getGuiScreen: function(){
		return guiSteamAlloySmelter;
	},
	
	setDefaultValues: function(){
		this.data.energy_consumption = this.defaultValues.energy_consumption;
		this.data.RLevel = this.defaultValues.RLevel;
	},
	
	init: function(){
		this.liquidStorage.setLimit("steam", 15);
	},
	
	
	tick: function(){
		this.setDefaultValues();
		var content = this.container.getGuiContent();
		var sourceSlot = this.container.getSlot("slotSource");
		var sourceSlot2 = this.container.getSlot("slotSource2");
		var resultSlot = this.container.getSlot("slotResult");
		this.data.SoundMachine = "ElectroFurnaceLoop.ogg";
		var recipe = GT_Recipe.AlloySmelterRecipe.get(sourceSlot.id, sourceSlot.count, sourceSlot2.id, sourceSlot2.count);
		if(recipe){
		   var RecipeLevel = recipe.adv.level;
		   if(this.data.RLevel >= RecipeLevel){		
		      if(resultSlot.id == recipe.output.id && resultSlot.data == recipe.output.data && resultSlot.count <= Item.getMaxStack(recipe.output.id) - recipe.output.count || resultSlot.id == 0){
				if(this.liquidStorage.getAmount("steam")  >= this.data.energy_consumption){
					this.liquidStorage.addLiquid("steam", this.data.energy_consumption * -1);
					this.data.progress += 1/recipe.adv.time;
					this.activate();
				}					 		 
				if(this.data.progress >= 1){
                    sourceSlot.count -= recipe.slot1.count;
					if(!recipe.adv.isShape){
						sourceSlot2.count -= recipe.slot2.count;
					}
                    resultSlot.id = recipe.output.id;
                    resultSlot.data = recipe.output.data;
                    resultSlot.count += recipe.output.count;
                    this.container.validateAll();
                    this.data.progress = 0;
                }
			}
			}
		}
		else{
			 this.data.progress = 0;
			 this.deactivate();
		}
		
		this.container.setScale("progressScale", this.data.progress);
	},
					
	energyTick: function(type, src){
		var fluidNeed = 15 - this.liquidStorage.getAmount("steam");
		this.liquidStorage.addLiquid("steam", src.getAll(fluidNeed));
	},
    init: GT_SteamMachine.initModel,
	activate: GT_SteamMachine.activateMachine,
	deactivate: GT_SteamMachine.deactivateMachine,
	destroy: this.deactivate	
});




// file: common/machines/steam/GT_Steel.js

ICore.Render.setStandartModel(BlockID.HighPressureFurnace, [["MACHINE_STEEL_TOP", 0], ["MACHINE_STEEL_TOP", 0], ["MACHINE_STEEL_SIDE", 0], ["MACHINE_HIGHPRESSUREFURNACE", 0], ["MACHINE_STEEL_SIDE", 0], ["MACHINE_STEEL_SIDE", 0]], true);
ICore.Render.registerRenderModel(BlockID.HighPressureFurnace, [["MACHINE_STEEL_TOP", 0], ["MACHINE_STEEL_TOP", 0], ["MACHINE_STEEL_SIDE", 0], ["MACHINE_HIGHPRESSUREFURNACE", 1], ["MACHINE_STEEL_SIDE", 0], ["MACHINE_STEEL_SIDE", 0]], true);
GT_SteamMachine.register(BlockID.HighPressureFurnace, {
	defaultValues: {energy_consumption: 0.024, work_time: 128, progress: 0},
	
	getGuiScreen: function(){
		return guiHighPressureFurnace;
	},
	
	setDefaultValues: function(){
		this.data.energy_consumption = this.defaultValues.energy_consumption;
		this.data.work_time = this.defaultValues.work_time;
	},
	
	init: function(){
		this.liquidStorage.setLimit("steam", 31);
	},
	
	
	tick: function(){
		this.setDefaultValues();
		var content = this.container.getGuiContent();
		var sourceSlot = this.container.getSlot("slotSource");
		var result = Recipes.getFurnaceRecipeResult(sourceSlot.id, "iron");
		this.data.SoundMachine = "ElectroFurnaceLoop.ogg";
		if(result){
			var resultSlot = this.container.getSlot("slotResult");
			if(resultSlot.id == result.id && resultSlot.data == result.data && resultSlot.count < 64 || resultSlot.id == 0){
				if(this.liquidStorage.getAmount("steam")  >= this.data.energy_consumption){
					this.liquidStorage.addLiquid("steam", this.data.energy_consumption * -1);
					this.data.progress += 1/this.data.work_time;
					this.activate();
				}
				if(this.data.progress >= 1){
					sourceSlot.count--;
					resultSlot.id = result.id;
					resultSlot.data = result.data;
					resultSlot.count++;
					this.container.validateAll();
					this.data.progress = 0;
				}
			}
		}
		else {
			this.data.progress = 0;
			this.deactivate();
		}
		this.container.setScale("progressScale", this.data.progress);		
	},
				
	energyTick: function(type, src){
		var fluidNeed = 32 - this.liquidStorage.getAmount("steam");
		this.liquidStorage.addLiquid("steam", src.getAll(fluidNeed));
	},
	 init: GT_SteamMachine.initModel,
	activate: GT_SteamMachine.activateMachine,
	deactivate: GT_SteamMachine.deactivateMachine,
	destroy: this.deactivate
});


ICore.Render.setStandartModel(BlockID.HighPressureCompressor, [["MACHINE_STEEL_TOP", 0], ["MACHINE_HIGHPRESSURECOMPRESSOR_TOP", 0], ["MACHINE_STEEL_TOP", 0], ["MACHINE_HIGHPRESSURECOMPRESSOR_FRONT", 0], ["MACHINE_HIGHPRESSURECOMPRESSOR_LEFT", 0], ["MACHINE_HIGHPRESSURECOMPRESSOR_LEFT", 0]], true);
ICore.Render.registerRenderModel(BlockID.HighPressureCompressor, [["MACHINE_STEEL_TOP", 0], ["MACHINE_HIGHPRESSURECOMPRESSOR_TOP", 1], ["MACHINE_STEEL_TOP", 0], ["MACHINE_HIGHPRESSURECOMPRESSOR_FRONT", 1], ["MACHINE_HIGHPRESSURECOMPRESSOR_LEFT", 1], ["MACHINE_HIGHPRESSURECOMPRESSOR_LEFT", 0]], true);
GT_SteamMachine.register(BlockID.HighPressureCompressor, {
	defaultValues: {energy_consumption: 0.012, progress: 0, RLevel: 2},
	
	getGuiScreen: function(){
		return guiHighPressureComressor;
	},
	
	setDefaultValues: function(){
		this.data.energy_consumption = this.defaultValues.energy_consumption;
		this.data.RLevel = this.defaultValues.RLevel;
	},
	
	init: function(){
		this.liquidStorage.setLimit("steam", 31);
	},
	
	tick: function(){
		this.setDefaultValues();
		var content = this.container.getGuiContent();
		var sourceSlot = this.container.getSlot("slotSource");
		var result = ICore.Recipe.getRecipeResult("compressor", sourceSlot.id, sourceSlot.data);
		this.data.SoundMachine = "CompressorOp.ogg";
        if(result && (sourceSlot.count >= result.ingredientCount || !result.ingredientCount)){
			var resultSlot = this.container.getSlot("slotResult");
			if(resultSlot.id == result.id && resultSlot.data == result.data && resultSlot.count <= Item.getMaxStack(result.id) - result.count || resultSlot.id == 0 && this.data.RLevel >= result.lvl){
				if(this.liquidStorage.getAmount("steam")  >= this.data.energy_consumption){
					this.liquidStorage.addLiquid("steam", this.data.energy_consumption * -1);
					this.data.progress += 1/result.time;
					this.activate();
				}
				if(this.data.progress >= 1){
                    sourceSlot.count -= result.ingredientCount || 1;
                    resultSlot.id = result.id;
                    resultSlot.data = result.data;
                    resultSlot.count += result.count;
                    this.container.validateAll();
                    this.data.progress = 0;				
                }
            }
        }
        else {
            this.data.progress = 0;
			this.deactivate();
        }
		this.container.setScale("progressScale", this.data.progress);	
	},				
	energyTick: function(type, src){
		var fluidNeed = 32 - this.liquidStorage.getAmount("steam");
		this.liquidStorage.addLiquid("steam", src.getAll(fluidNeed));
	},
	init: GT_SteamMachine.initModel,
	activate: GT_SteamMachine.activateMachine,
	deactivate: GT_SteamMachine.deactivateMachine,
	destroy: this.deactivate
});


ICore.Render.setStandartModel(BlockID.HighPressureExtractor, [["MACHINE_BRONZE", 0], ["MACHINE_BRONZE_EXTRACTORTOP", 0], ["MACHINE_BRONZE", 0], ["MACHINE_BRONZE_EXTRACTOR", 0], ["MACHINE_BRONZE", 0], ["MACHINE_BRONZE_EXTRACTORRIGHT", 1]], true);
ICore.Render.registerRenderModel(BlockID.HighPressureExtractor, [["MACHINE_BRONZE", 0], ["MACHINE_BRONZE_EXTRACTORTOP", 1], ["MACHINE_BRONZE", 0], ["MACHINE_BRONZE_EXTRACTOR", 1], ["MACHINE_BRONZE", 0], ["MACHINE_BRONZE_EXTRACTORRIGHT", 1]], true);
GT_SteamMachine.register(BlockID.HighPressureExtractor, {
	defaultValues: {energy_consumption: 0.012, progress: 0, RLevel: 2},
	
	getGuiScreen: function(){
		return guiHighPressureExtractor;
	},
	
	setDefaultValues: function(){
		this.data.energy_consumption = this.defaultValues.energy_consumption;
		this.data.RLevel = this.defaultValues.RLevel;
	},
	
	init: function(){
		this.liquidStorage.setLimit("steam", 31);
	},
	
	tick: function(){
		this.setDefaultValues();
		var content = this.container.getGuiContent();
		var sourceSlot = this.container.getSlot("slotSource");
		var result = ICore.Recipe.getRecipeResult("extractor", sourceSlot.id, sourceSlot.data);
		this.data.SoundMachine = "ExtractorOp.ogg";
		if(result){
			var resultSlot = this.container.getSlot("slotResult");
			if(resultSlot.id == result.id && resultSlot.data == result.data && resultSlot.count <= 64 - result.count || resultSlot.id == 0 && this.data.RLevel >= result.lvl){
				if(this.liquidStorage.getAmount("steam")  >= this.data.energy_consumption){
					this.liquidStorage.addLiquid("steam", this.data.energy_consumption * -1);
					this.data.progress += 1/result.time;
					this.activate();
				}
				if(this.data.progress >= 1){
					sourceSlot.count--;
					resultSlot.id = result.id;
					resultSlot.data = result.data;
					resultSlot.count += result.count;
					this.container.validateAll();
					this.data.progress = 0;
				}
			}
		}
		else {
			this.data.progress = 0;
			this.deactivate();
		}
		
		this.container.setScale("progressScale", this.data.progress);
		
	},
	energyTick: function(type, src){
		var fluidNeed = 32 - this.liquidStorage.getAmount("steam");
		this.liquidStorage.addLiquid("steam", src.getAll(fluidNeed));
	},
	init: GT_SteamMachine.initModel,
	activate: GT_SteamMachine.activateMachine,
	deactivate: GT_SteamMachine.deactivateMachine,
	destroy: this.deactivate
});

ICore.Render.setStandartModel(BlockID.HighPressureForgeHammer, [["MACHINE_STEEL_TOP", 0], ["MACHINE_STEEL_TOP", 0], ["MACHINE_STEEL_TOP", 0], ["MACHINE_HIGHPRESSUREFORGEHAMMER", 0], ["MACHINE_STEEL_TOP", 0], ["MACHINE_STEEL_TOP", 0]], true);
ICore.Render.registerRenderModel(BlockID.HighPressureForgeHammer, [["MACHINE_STEEL_TOP", 0], ["MACHINE_STEEL_TOP", 0], ["MACHINE_STEEL_TOP", 0], ["MACHINE_HIGHPRESSUREFORGEHAMMER", 1], ["MACHINE_STEEL_TOP", 0], ["MACHINE_STEEL_TOP", 0]], true);
GT_SteamMachine.register(BlockID.HighPressureForgeHammer, {
	defaultValues: {energy_consumption: 0.096, progress: 0, RLevel: 2},
	
	getGuiScreen: function(){
		return guiHighPressureForgeHammer;
	},
	
	setDefaultValues: function(){
		this.data.energy_consumption = this.defaultValues.energy_consumption;
		this.data.RLevel = this.defaultValues.RLevel;
	},
	
	init: function(){
		this.liquidStorage.setLimit("steam", 31);
	},
	
	tick: function(){
		this.setDefaultValues();
		var content = this.container.getGuiContent();
		var sourceSlot = this.container.getSlot("slotSource");
		var result = ICore.Recipe.getRecipeResult("forgehammer", sourceSlot.id);
		this.data.SoundMachine = null;
        if(result && (sourceSlot.count >= result.ingredientCount || !result.ingredientCount)){
			var resultSlot = this.container.getSlot("slotResult");
			if(resultSlot.id == result.id && this.data.RLevel >= result.lvl && resultSlot.data == result.data && resultSlot.count <= Item.getMaxStack(result.id) - result.count || resultSlot.id == 0){
				if(this.liquidStorage.getAmount("steam")  >= this.data.energy_consumption){
					this.liquidStorage.addLiquid("steam", this.data.energy_consumption * -1);
					this.data.progress += 1/result.time;
					this.activate();
				}
				if(this.data.progress >= 1){
                    sourceSlot.count -= result.ingredientCount || 1;
                    resultSlot.id = result.id;
                    resultSlot.data = result.data;
                    resultSlot.count += result.count;
                    this.container.validateAll();
                    this.data.progress = 0;
                }
            }
        }
        else {
            this.data.progress = 0;
		    this.deactivate();
        }
		this.container.setScale("progressScale", this.data.progress);
		
	},				
	energyTick: function(type, src){
		var fluidNeed = 32 - this.liquidStorage.getAmount("steam");
		this.liquidStorage.addLiquid("steam", src.getAll(fluidNeed));
	},
	init: GT_SteamMachine.initModel,
	activate: GT_SteamMachine.activateMachine,
	deactivate: GT_SteamMachine.deactivateMachine,
	destroy: this.deactivate
});


ICore.Render.setStandartModel(BlockID.HighPressureMacerator, [["MACHINE_STEEL_TOP", 0], ["MACHINE_HIGHPRESSUREMACERATOR", 0], ["MACHINE_STEEL_TOP", 0], ["MACHINE_HIGHPRESSUREMACERATOR_FRONT", 0], ["MACHINE_STEEL_TOP", 0], ["MACHINE_STEEL_TOP", 0]], true);
ICore.Render.registerRenderModel(BlockID.HighPressureMacerator, [["MACHINE_STEEL_TOP", 0], ["MACHINE_HIGHPRESSUREMACERATOR", 1], ["MACHINE_STEEL_TOP", 0], ["MACHINE_HIGHPRESSUREMACERATOR_FRONT", 1], ["MACHINE_STEEL_TOP", 0], ["MACHINE_STEEL_TOP", 0]], true);
GT_SteamMachine.register(BlockID.HighPressureMacerator, {
	defaultValues: {energy_consumption: 0.012, progress: 0, RLevel: 2},
	
	getGuiScreen: function(){
		return guiHighPressureMacerator;
	},
	
	setDefaultValues: function(){
		this.data.energy_consumption = this.defaultValues.energy_consumption;
		this.data.RLevel = this.defaultValues.RLevel;
	},
	
	init: function(){
		this.liquidStorage.setLimit("steam", 31);
	},
	
	
	tick: function(){
		this.setDefaultValues();
		var content = this.container.getGuiContent();
		var sourceSlot = this.container.getSlot("slotSource");
		var result = ICore.Recipe.getRecipeResult("macerator", sourceSlot.id, sourceSlot.data);
		this.data.SoundMachine = "MaceratorOp.ogg";
        if(result && sourceSlot.count >= 1){
			var resultSlot = this.container.getSlot("slotResult");
			if(resultSlot.id == result.id && resultSlot.data == result.data && resultSlot.count <= Item.getMaxStack(result.id) - result.count || resultSlot.id == 0 && this.data.RLevel >= result.lvl){
				if(this.liquidStorage.getAmount("steam")  >= this.data.energy_consumption){
					this.liquidStorage.addLiquid("steam", this.data.energy_consumption * -1);
					this.data.progress += 1/result.time;
					this.activate();
				}
				if(this.data.progress >= 1){
                    sourceSlot.count -= 1;
                    resultSlot.id = result.id;
                    resultSlot.data = result.data;
                    resultSlot.count += result.count;
                    this.container.validateAll();
                    this.data.progress = 0;
					this.data.scaleprogress = 0;					
                }
            }
        }
        else {
            this.data.progress = 0;
			this.deactivate();
        }
		this.container.setScale("progressScale", this.data.progress);
		
	},
	energyTick: function(type, src){
		var fluidNeed = 32 - this.liquidStorage.getAmount("steam");
		this.liquidStorage.addLiquid("steam", src.getAll(fluidNeed));
	},
	 init: GT_SteamMachine.initModel,
	activate: GT_SteamMachine.activateMachine,
	deactivate: GT_SteamMachine.deactivateMachine,
	destroy: this.deactivate
});

ICore.Render.setStandartModel(BlockID.HighPressureAlloySmelter, [["MACHINE_STEEL_TOP", 0], ["MACHINE_STEEL_TOP", 0], ["MACHINE_STEEL_SIDE", 0], ["MACHINE_HIGHPRESSUREALLOYSMELTER", 0], ["MACHINE_STEEL_SIDE", 0], ["MACHINE_STEEL_SIDE", 0]], true);
ICore.Render.registerRenderModel(BlockID.HighPressureAlloySmelter, [["MACHINE_STEEL_TOP", 0], ["MACHINE_STEEL_TOP", 0], ["MACHINE_STEEL_SIDE", 0], ["MACHINE_HIGHPRESSUREALLOYSMELTER", 1], ["MACHINE_STEEL_SIDE", 0], ["MACHINE_STEEL_SIDE", 0]], true);
GT_SteamMachine.register(BlockID.HighPressureAlloySmelter, {
	defaultValues: {energy_consumption: 0.048,progress: 0, RLevel: 2},
	
	getGuiScreen: function(){
		return guiHighPressureAlloySmelter;
	},
	
	setDefaultValues: function(){
		this.data.energy_consumption = this.defaultValues.energy_consumption;
		this.data.RLevel = this.defaultValues.RLevel;
	},
	
	init: function(){
		this.liquidStorage.setLimit("steam", 31);
	},
		
	tick: function(){
		this.setDefaultValues();
		var content = this.container.getGuiContent();
		var sourceSlot = this.container.getSlot("slotSource");
		var sourceSlot2 = this.container.getSlot("slotSource2");
		var resultSlot = this.container.getSlot("slotResult");
		this.data.SoundMachine = "ElectroFurnaceLoop.ogg";
		var recipe = AlloySmelterRecipe.get(sourceSlot.id, sourceSlot.count, sourceSlot2.id, sourceSlot2.count);
		if(recipe){
		   var RecipeLevel = recipe.adv.lvl;
		   if(this.data.RLevel >= RecipeLevel){		
		      if(resultSlot.id == recipe.output.id && resultSlot.data == recipe.output.data && resultSlot.count <= Item.getMaxStack(recipe.output.id) - recipe.output.count || resultSlot.id == 0){
				if(this.liquidStorage.getAmount("steam")  >= this.data.energy_consumption){
					this.liquidStorage.addLiquid("steam", this.data.energy_consumption * -1);
					this.data.progress += 1/recipe.adv.time;
					this.activate();
				}					 		 
				if(this.data.progress >= 1){
                    sourceSlot.count -= recipe.slot1.count;
					if(!recipe.adv.isShape){
						sourceSlot2.count -= recipe.slot2.count;
					}
                    resultSlot.id = recipe.output.id;
                    resultSlot.data = recipe.output.data;
                    resultSlot.count += recipe.output.count;
                    this.container.validateAll();
                    this.data.progress = 0;
                }
			}
			}
		}
		else{
			 this.data.progress = 0;
			 this.deactivate();
		}		
		this.container.setScale("progressScale", this.data.progress);		
	},
	energyTick: function(type, src){
		var fluidNeed = 32 - this.liquidStorage.getAmount("steam");
		this.liquidStorage.addLiquid("steam", src.getAll(fluidNeed));
	},
	init: GT_SteamMachine.initModel,
	activate: GT_SteamMachine.activateMachine,
	deactivate: GT_SteamMachine.deactivateMachine,
	destroy: this.deactivate
});





// file: common/machines/multiblock/blastFurnace.js

ICore.Render.setStandartModel(BlockID.BronzePlatedBlastFurnase, [["MACHINE_BRONZE_PLATEDBRICK", 0], ["MACHINE_BRONZE_PLATEDBRICK", 0], ["MACHINE_BRONZE_PLATEDBRICK", 0], ["MACHINE_BRONZE_BLASTFURNACE", 0], ["MACHINE_BRONZE_PLATEDBRICK", 0], ["MACHINE_BRONZE_PLATEDBRICK", 0]], true);
ICore.Render.registerRenderModel(BlockID.BronzePlatedBlastFurnase, [["MACHINE_BRONZE_PLATEDBRICK", 0], ["MACHINE_BRONZE_PLATEDBRICK", 0], ["MACHINE_BRONZE_PLATEDBRICK", 0], ["MACHINE_BRONZE_BLASTFURNACE", 1], ["MACHINE_BRONZE_PLATEDBRICK", 0], ["MACHINE_BRONZE_PLATEDBRICK", 0]], true);

var bpb = BlockID.BronzePlatedBricks;

var BlastFurnaseStruct = [[	
   [0, -1, 1, [bpb]], 
   [0, -1, 0, [bpb]],
   [0, -1, -1, [bpb]],
   
   [1, -1, 1, [bpb]],
   [1, -1, 0, [bpb]],
   [1, -1, -1, [bpb]],
   
   [2, -1, 1, [bpb]],
   [2, -1, 0, [bpb]],
   [2, -1, -1, [bpb]],
   
   [0, 0, 1, [bpb]], 
   [0, 0, -1, [bpb]],
   
   [1, 0, 1, [bpb]],
   [1, 0, 0, [0]],
   [1, 0, -1, [bpb]],
   
   [2, 0, 1, [bpb]],
   [2, 0, 0, [bpb]],
   [2, 0, -1, [bpb]],
   
   [0, 1, 1, [bpb]], 
   [0, 1, 0, [bpb]],
   [0, 1, -1, [bpb]],
   
   [1, 1, 1, [bpb]],
   [1, 1, 0, [0]],
   [1, 1, -1, [bpb]],
   
   [2, 1, 1, [bpb]],
   [2, 1, 0, [bpb]],
   [2, 1, -1, [bpb]],
   
   [0, 2, 1, [bpb]], 
   [0, 2, 0, [bpb]],
   [0, 2, -1, [bpb]],
   
   [1, 2, 1, [bpb]],
   [1, 2, 0, [0]],
   [1, 2, -1, [bpb]],
   
   [2, 2, 1, [bpb]],
   [2, 2, 0, [bpb]],
   [2, 2, -1, [bpb]]
]];

var BronzePlatedBlastFurnaseTile = {
		defaultValues: {RLevel: 2},
	
	    getGuiScreen: function(){
		    return guiBronzePlatedBlastFurnase;
	    },
	
	    setDefaultValues: function(){		    
		    this.data.RLevel = this.defaultValues.RLevel;
	    },
	
	    tick: function(){
		   this.setDefaultValues();
		   var content = this.container.getGuiContent();
		   var sourceSlot = this.container.getSlot("slotSource");
		   var fuelSlot = this.container.getSlot("slotFuel");
		   var result = ICore.Recipe.getRecipeResult("blastfurnace", sourceSlot.id, sourceSlot.data);
		   if(this.data.MAPIact == true && result && fuelSlot.id == 263 && fuelSlot.count >= 3){
			   var resultSlot = this.container.getSlot("slotResult");
			   var resultSlotDust = this.container.getSlot("slotResultDust");
			   if(resultSlot.id == result.id && resultSlot.data == result.data && resultSlot.count <= 64 - result.count || resultSlot.id == 0 && this.data.RLevel >= result.lvl){							
					   this.data.progress += 1/result.time;
					   this.activate();			
				   if(this.data.progress >= 1){
					   resultSlot.id = result.id;
					   resultSlot.data = result.data;
					   resultSlot.count += result.count;
					   resultSlotDust.id = ItemID.dustTinyDarkAshes;
					   resultSlotDust.data = 0;
					   resultSlotDust.count++;
					   fuelSlot.count -= 3;
					   sourceSlot.count--;					
					   this.container.validateAll();
					   this.data.progress = 0;
				   }
			   }
		   }
		   else {
			   this.data.progress = 0;
			   this.deactivate();
		   }
		
		   this.container.setScale("progressScale", this.data.progress);
		
	   },
	   init: ICore.Machine.initModel,
	   activate:  ICore.Machine.activateMachine,
	   deactivate: ICore.Machine.deactivateMachine,
	   destroy: this.deactivate

};

GT_MultiBlock.Rotate(BlastFurnaseStruct);
GT_MultiBlock.Register(BronzePlatedBlastFurnaseTile, BlastFurnaseStruct);
ICore.Machine.registerPrototype(BlockID.BronzePlatedBlastFurnase, BronzePlatedBlastFurnaseTile);




// file: common/machines/electric/GT_Generators.js

GT_ElectricMachine.register(BlockID.BasicSteamTurbine, {
	defaultValues: {},
	
	getGuiScreen: function(){
		return guiBasicSteamTurbine;
	},
	
	init: function(){
		this.liquidStorage.setLimit("steam", 24);
	},
	
	tick: function(){
		var content = this.container.getGuiContent();
		var luidSlot = this.container.getSlot("slotSteam");
		var luidSlotNull = this.container.getSlot("slotNull");
		var empty = LiquidRegistry.getEmptyItem(luidSlot.id, luidSlot.data);
		if(empty && empty.liquid == "steam"){
			if(this.liquidStorage.getAmount("steam") <= 23 && (luidSlotNull.id == empty.id && luidSlotNull.data == empty.data && luidSlotNull.count < Item.getMaxStack(empty.id) || luidSlotNull.id == 0)){
				this.liquidStorage.addLiquid("steam", 1);
				luidSlot.count--;
				luidSlotNull.id = empty.id;
				luidSlotNull.data = empty.data;
				luidSlotNull.count++;
				this.container.validateAll();
			}
		}		
        if(this.liquidStorage.getAmount("steam") >= 1 && this.data.energy < this.getEnergyStorage()){
	       this.data.energy += 42.5;
	       this.liquidStorage.addLiquid("steam", -0.01);
       }   
	    if(this.liquidStorage.getAmount("steam") > 0){
			if(content){
			content.elements["Liquid"].bitmap = "fluid_steam_bg";
		    }
		}
		if(this.liquidStorage.getAmount("steam") <= 0){ 
	        if(content){
			content.elements["Liquid"].bitmap = "fluid_none_bg";
		    }
	    }
		this.container.setText("text2", parseInt(this.liquidStorage.getAmount("steam") * 1000));
	},
	isGenerator: function() {
		return true;
	},	
	getEnergyStorage: function(){
		return 24000;
	},
	energyTick: function(type, src){
		var output = Math.min(42.5, this.data.energy);
		this.data.energy += src.add(output) - output;		
	}
});




// file: common/machines/electric/GT_Basic.js

ICore.Render.setStandartModel(BlockID.BasicElectricFurnace, [["LVMachineHull", 0], ["LVMachineHull", 0], ["LVMachineHull", 0], ["ELECTRIC_FURNACE_BASIC", 0], ["MachineHull", 0], ["LVMachineHull", 0]], true);
ICore.Render.registerRenderModel(BlockID.BasicElectricFurnace, [["LVMachineHull", 0], ["LVMachineHull", 0], ["LVMachineHull", 0], ["ELECTRIC_FURNACE_BASIC", 1], ["MachineHull", 0], ["LVMachineHull", 0]], true);
GT_ElectricMachine.register(BlockID.BasicElectricFurnace, {
	defaultValues: {energy_consumption: 8, work_time: 256, progress: 0},
	
	getGuiScreen: function(){
		return guiBasicElectricFurnace;
	},
	
	setDefaultValues: function(){
		this.data.energy_consumption = this.defaultValues.energy_consumption;
		this.data.work_time = this.defaultValues.work_time;
	},
		
	tick: function(){
		this.setDefaultValues();
		var content = this.container.getGuiContent();
		var sourceSlot = this.container.getSlot("slotSource");
		var result = Recipes.getFurnaceRecipeResult(sourceSlot.id, "iron");
		this.data.SoundMachine = "ElectroFurnaceLoop.ogg";
		if(result){
			var resultSlot = this.container.getSlot("slotResult");
			if(resultSlot.id == result.id && resultSlot.data == result.data && resultSlot.count < 64 || resultSlot.id == 0){
				if(this.data.energy >= this.data.energy_consumption){
					this.data.energy -= this.data.energy_consumption;
					this.data.progress += 1/this.data.work_time;
					this.activate();
				}
				if(this.data.progress >= 1){
					sourceSlot.count--;
					resultSlot.id = result.id;
					resultSlot.data = result.data;
					resultSlot.count++;
					this.container.validateAll();
					this.data.progress = 0;
				}
			}
		}
		else {
			this.data.progress = 0;
			this.deactivate();
		}
		this.container.setScale("progressScale", this.data.progress);		
	},			
	
	destroyBlock: function(coords, player){
          this.deactivate();       
     },
	 
	 getEnergyStorage: function(){
		return 2000;
	},
	 
	init: GT_SteamMachine.initModel,
	activate: GT_SteamMachine.activateMachine,
	deactivate: GT_SteamMachine.deactivateMachine,
	energyTick: GT_ElectricMachine.basicEnergyReceiveFunc
});

ICore.Render.setStandartModel(BlockID.BasicElectricAlloySmelter, [["LVMachineHull", 0], ["LVMachineHull", 0], ["LVMachineHull", 0], ["ELECTRIC_ALLOYSMELTER_BASIC", 0], ["MachineHull", 0], ["LVMachineHull", 0]], true);
ICore.Render.registerRenderModel(BlockID.BasicElectricAlloySmelter, [["LVMachineHull", 0], ["LVMachineHull", 0], ["LVMachineHull", 0], ["ELECTRIC_ALLOYSMELTER_BASIC", 1], ["MachineHull", 0], ["LVMachineHull", 0]], true);
GT_ElectricMachine.register(BlockID.BasicElectricAlloySmelter, {
	defaultValues: {energy_consumption: 8, progress: 0, RLevel: 2},
	
	getGuiScreen: function(){
		return guiBasicElectricAlloySmelter;
	},
	
	setDefaultValues: function(){
		this.data.energy_consumption = this.defaultValues.energy_consumption;
		this.data.RLevel = this.defaultValues.RLevel;
	},
		
	tick: function(){
		this.setDefaultValues();
		var content = this.container.getGuiContent();
		var sourceSlot = this.container.getSlot("slotSource");
		var sourceSlot2 = this.container.getSlot("slotSource2");
		var resultSlot = this.container.getSlot("slotResult");
		this.data.SoundMachine = "ElectroFurnaceLoop.ogg";
		var recipe = GT_Recipe.AlloySmelterRecipe.get(sourceSlot.id, sourceSlot.count, sourceSlot2.id, sourceSlot2.count);
		if(recipe){
		   var RecipeLevel = recipe.adv.level;
		   if(this.data.RLevel >= RecipeLevel){		
		      if(resultSlot.id == recipe.output.id && resultSlot.data == recipe.output.data && resultSlot.count <= Item.getMaxStack(recipe.output.id) - recipe.output.count || resultSlot.id == 0){
				if(this.data.energy >= this.data.energy_consumption){
					this.data.energy -= this.data.energy_consumption;
					this.data.progress += 1/recipe.adv.time;
					this.activate();
				}					 		 
				if(this.data.progress >= 1){
                    sourceSlot.count -= recipe.slot1.count;
					if(!recipe.adv.isShape){
						sourceSlot2.count -= recipe.slot2.count;
					}
                    resultSlot.id = recipe.output.id;
                    resultSlot.data = recipe.output.data;
                    resultSlot.count += recipe.output.count;
                    this.container.validateAll();
                    this.data.progress = 0;
                }
			}
			}
		}
		else{
			 this.data.progress = 0;
			 this.deactivate();
		}
		
		this.container.setScale("progressScale", this.data.progress);	
	},			
	
	destroyBlock: function(coords, player){
          this.deactivate();       
     },
	 
	 getEnergyStorage: function(){
		return 2000;
	},
	 
	init: GT_SteamMachine.initModel,
	activate: GT_SteamMachine.activateMachine,
	deactivate: GT_SteamMachine.deactivateMachine,
	energyTick: GT_ElectricMachine.basicEnergyReceiveFunc
});


ICore.Render.setStandartModel(BlockID.BasicElectricCompressor, [["LVMachineHull", 0], ["ELECTRIC_COMPRESSOR_TOP", 0], ["LVMachineHull", 0], ["ELECTRIC_COMPRESSOR_FRONT", 0], ["ELECTRIC_COMPRESSOR_RIGHT", 0], ["ELECTRIC_COMPRESSOR_RIGHT", 0]], true);
ICore.Render.registerRenderModel(BlockID.BasicElectricCompressor, [["LVMachineHull", 0], ["ELECTRIC_COMPRESSOR_TOP", 1], ["LVMachineHull", 0], ["ELECTRIC_COMPRESSOR_FRONT", 1], ["ELECTRIC_COMPRESSOR_RIGHT", 1], ["ELECTRIC_COMPRESSOR_RIGHT", 1]], true);
GT_ElectricMachine.register(BlockID.BasicElectricCompressor, {
	defaultValues: {energy_consumption: 8, progress: 0, RLevel: 2},
	
	getGuiScreen: function(){
		return guiBasicElectricComressor;
	},
	
	setDefaultValues: function(){
		this.data.energy_consumption = this.defaultValues.energy_consumption;
		this.data.RLevel = this.defaultValues.RLevel;
	},
		
	tick: function(){
		this.setDefaultValues();
		var content = this.container.getGuiContent();
		var sourceSlot = this.container.getSlot("slotSource");
		var result = ICore.Recipe.getRecipeResult("compressor", sourceSlot.id, sourceSlot.data);
	    this.data.SoundMachine = "CompressorOp.ogg";
        if(result && (sourceSlot.count >= result.ingredientCount || !result.ingredientCount) && this.data.RLevel >= result.lvl){
			var resultSlot = this.container.getSlot("slotResult");
			if(resultSlot.id == result.id && resultSlot.data == result.data && resultSlot.count <= Item.getMaxStack(result.id) - result.count || resultSlot.id == 0){
				if(this.data.energy >= this.data.energy_consumption){
					this.data.energy -= this.data.energy_consumption
					this.data.progress += 1/result.time;
					this.activate();
				}
				if(this.data.progress >= 1){
                    sourceSlot.count -= result.ingredientCount || 1;
                    resultSlot.id = result.id;
                    resultSlot.data = result.data;
                    resultSlot.count += result.count;
                    this.container.validateAll();
                    this.data.progress = 0;
                }
            }
        }
        else {
            this.data.progress = 0;
			this.deactivate();
        }
		this.container.setScale("progressScale", this.data.progress);
	},			
	
	destroyBlock: function(coords, player){
          this.deactivate();       
     },
	 
	 getEnergyStorage: function(){
		return 2000;
	},
	 
	init: GT_SteamMachine.initModel,
	activate: GT_SteamMachine.activateMachine,
	deactivate: GT_SteamMachine.deactivateMachine,
	energyTick: GT_ElectricMachine.basicEnergyReceiveFunc
});



ICore.Render.setStandartModel(BlockID.BasicElectricExtractor, [["LVMachineHull", 0], ["ELECTRIC_EXTRACTOR_TOP", 0], ["LVMachineHull", 0], ["ELECTRIC_EXTRACTOR_FRONT", 0], ["ELECTRIC_EXTRACTOR_RIGHT", 0], ["ELECTRIC_EXTRACTOR_RIGHT", 0]], true);
ICore.Render.registerRenderModel(BlockID.BasicElectricExtractor, [["LVMachineHull", 0], ["ELECTRIC_EXTRACTOR_TOP", 1], ["LVMachineHull", 0], ["ELECTRIC_EXTRACTOR_FRONT", 1], ["ELECTRIC_EXTRACTOR_RIGHT", 1], ["ELECTRIC_EXTRACTOR_RIGHT", 1]], true);
GT_ElectricMachine.register(BlockID.BasicElectricExtractor, {
	defaultValues: {energy_consumption: 8, progress: 0, RLevel: 2},
	
	getGuiScreen: function(){
		return guiBasicElectricExtractor;
	},
	
	setDefaultValues: function(){
		this.data.energy_consumption = this.defaultValues.energy_consumption;
		this.data.RLevel = this.defaultValues.RLevel;
	},
		
	tick: function(){
		this.setDefaultValues();
		var content = this.container.getGuiContent();
		var sourceSlot = this.container.getSlot("slotSource");
		var result = ICore.Recipe.getRecipeResult("extractor", sourceSlot.id, sourceSlot.data);
		this.data.SoundMachine = "ExtractorOp.ogg";
		if(result){
			var resultSlot = this.container.getSlot("slotResult");
			if(resultSlot.id == result.id && resultSlot.data == result.data && resultSlot.count <= 64 - result.count || resultSlot.id == 0 && this.data.RLevel >= result.lvl){
				if(this.data.energy >= this.data.energy_consumption){
				    this.data.energy -= this.data.energy_consumption;
					this.data.progress += 1/result.time;
					this.activate();
				}
				if(this.data.progress >= 1){
					sourceSlot.count--;
					resultSlot.id = result.id;
					resultSlot.data = result.data;
					resultSlot.count += result.count;
					this.container.validateAll();
					this.data.progress = 0;
				}
			}
		}
		else {
			this.data.progress = 0;
			this.deactivate();
		}
		
		this.container.setScale("progressScale", this.data.progress);
	},			
	
	destroyBlock: function(coords, player){
          this.deactivate();       
     },
	 
	 getEnergyStorage: function(){
		return 2000;
	},
	 
	init: GT_SteamMachine.initModel,
	activate: GT_SteamMachine.activateMachine,
	deactivate: GT_SteamMachine.deactivateMachine,
	energyTick: GT_ElectricMachine.basicEnergyReceiveFunc
});


ICore.Render.setStandartModel(BlockID.BasicElectricMacerator, [["LVMachineHull", 0], ["ELECTRIC_MACERATOR_TOP", 0], ["LVMachineHull", 0], ["ELECTRIC_MACERATOR_FRONT", 0], ["LVMachineHull", 0], ["LVMachineHull", 0]], true);
ICore.Render.registerRenderModel(BlockID.BasicElectricMacerator, [["LVMachineHull", 0], ["ELECTRIC_MACERATOR_TOP", 1], ["LVMachineHull", 0], ["ELECTRIC_MACERATOR_FRONT", 1], ["LVMachineHull", 0], ["LVMachineHull", 0]], true);
GT_ElectricMachine.register(BlockID.BasicElectricMacerator, {
	defaultValues: {energy_consumption: 8, progress: 0, RLevel: 2},
	
	getGuiScreen: function(){
		return guiBasicElectricMacerator;
	},
	
	setDefaultValues: function(){
		this.data.energy_consumption = this.defaultValues.energy_consumption;
		this.data.RLevel = this.defaultValues.RLevel;
	},
		
	tick: function(){
		this.setDefaultValues();
		var content = this.container.getGuiContent();
		var sourceSlot = this.container.getSlot("slotSource");
		var result = ICore.Recipe.getRecipeResult("macerator", sourceSlot.id, sourceSlot.data);
		this.data.SoundMachine = "MaceratorOp.ogg";
        if(result && sourceSlot.count >= 1){
			var resultSlot = this.container.getSlot("slotResult");
			if(resultSlot.id == result.id && resultSlot.data == result.data && resultSlot.count <= Item.getMaxStack(result.id) - result.count || resultSlot.id == 0 && this.data.RLevel >= result.lvl){
				if(this.data.energy >= this.data.energy_consumption){
					this.data.energy -= this.data.energy_consumption;
					this.data.progress += 1/result.time;
					this.activate();
				}
				if(this.data.progress >= 1){
                    sourceSlot.count -= 1;
                    resultSlot.id = result.id;
                    resultSlot.data = result.data;
                    resultSlot.count += result.count;
                    this.container.validateAll();
                    this.data.progress = 0;
                }
            }
        }
        else {
            this.data.progress = 0;
			this.deactivate();
        }
		this.container.setScale("progressScale", this.data.progress);
	},			
	
	destroyBlock: function(coords, player){
          this.deactivate();       
     },
	 
	 getEnergyStorage: function(){
		return 2000;
	},
	 
	init: GT_SteamMachine.initModel,
	activate: GT_SteamMachine.activateMachine,
	deactivate: GT_SteamMachine.deactivateMachine,
	energyTick: GT_ElectricMachine.basicEnergyReceiveFunc
});




// file: common/recipes/standart.js

Callback.addCallback("PostLoaded", function(){
	Recipes.addFurnaceFuel(ItemID.Lignite, 0, 1000);

   //stainless dust
   //Recipes.addShaped({id: ItemID.dustStainless, count: 1, data: 0}, ["iin", "inn", "ssc"], ['i', ItemID.dustSmallIron, 0, 'n', ItemID.dustSmallNikel, 0, 's', ItemID.dustSmallManganese, 0, 'c', ItemID.dustSmallChrome, 0]);
   //Recipes.addShaped({id: ItemID.dustStainless, count: 9, data: 0}, ["iin", "inn", "ssc"], ['i', ItemID.dustIron, 0, 'n', ItemID.dustNikel, 0, 's', ItemID.dustManganese, 0, 'c', ItemID.dustChrome, 0]);

   //steel dust
   Recipes.addShapeless({id:ItemID.dustSteel, count:1, data:0}, [{id:ItemID.dustIron, data:0}, {id:ItemID.dustCoal, data:0}]);

   //bronze dust
   GT_Recipe.ReplaceWithShapeless({id:ItemID.dustBronze, count:1, data:0}, [{id:ItemID.dustSmallCopper, data:0}, {id:ItemID.dustSmallCopper, data:0}, {id:ItemID.dustSmallCopper, data:0}, {id:ItemID.dustSmallTin, data:0}]);
   GT_Recipe.ReplaceWithShapeless({id:ItemID.dustBronze, count:4, data:0}, [{id:ItemID.dustCopper, data:0}, {id:ItemID.dustCopper, data:0}, {id:ItemID.dustCopper, data:0}, {id:ItemID.dustTin, data:0}]);
 
   //cobblestone
   GT_Recipe.CreateRecipeWithTool({id:4, count:1, data:0}, ["h ", "bb", "bb"], ['b', 1, 0], [GT_Material.hammers], 1); 


   //replaced recipes

   CreateHelmetRecipe(ItemID.compositeHelmet, "Alloy", 2)
   CreateChestplateRecipe(ItemID.compositeChestplate, "Alloy", 2)
   CreateLeggingsRecipe(ItemID.compositeLeggings, "Alloy", 2)
   CreateBootsRecipe(ItemID.compositeBoots, "Alloy", 2)

   CreateHelmetRecipe(ItemID.bronzeHelmet, "Bronze", 2)
   CreateChestplateRecipe(ItemID.bronzeChestplate, "Bronze", 2)
   CreateLeggingsRecipe(ItemID.bronzeLeggings, "Bronze", 2)
   CreateBootsRecipe(ItemID.bronzeBoots, "Bronze", 2)

   CreatePickaxeRecipe(ItemID.bronzePickaxe, "Bronze", 2)
   CreateAxeRecipe(ItemID.bronzeAxe, "Bronze", 2)
   CreateHoeRecipe(ItemID.bronzeHoe, "Bronze", 2)
   CreateSwordRecipe(ItemID.bronzeSword, "Bronze", 2)
   CreateShovelRecipe(ItemID.bronzeShovel, "Bronze", 2)

   CreateHelmetRecipe(306, "Iron", 2)
   CreateChestplateRecipe(307, "Iron", 2)
   CreateLeggingsRecipe(308, "Iron", 2)
   CreateBootsRecipe(309, "Iron", 2)

   CreatePickaxeRecipe(257, "Iron", 2)
   CreateAxeRecipe(258, "Iron", 2)
   CreateHoeRecipe(292, "Iron", 2)
   CreateSwordRecipe(267, "Iron", 2)
   CreateShovelRecipe(256, "Iron", 2)

   CreateHelmetRecipe(314, "Gold", 2)
   CreateChestplateRecipe(315, "Gold", 2)
   CreateLeggingsRecipe(316, "Gold", 2)
   CreateBootsRecipe(317, "Gold", 2)

   CreatePickaxeRecipe(285, "Gold", 2)
   CreateAxeRecipe(286, "Gold", 2)
   CreateHoeRecipe(294, "Gold", 2)
   CreateSwordRecipe(283, "Gold", 2)
   CreateShovelRecipe(284, "Gold", 2)

   GT_Recipe.ReplaceRecipeWithTool({id:325, count:1, data:0}, ["aha"," a "], ['a', ItemID.plateIron, 0], [GT_Material.hammers], 2); 
   GT_Recipe.ReplaceRecipeWithTool({id:359, count:1, data:0}, ["ah"," a"], ['a', ItemID.plateIron, 0], [GT_Material.hammers], 2); 
   
   GT_Recipe.ReplaceRecipeWithTool({id: 66, data: 0, count: 16}, ["isi", "ihi", "isi"], ['i', ItemID.long_rodIron, 0, 's', 280, 0], [GT_Material.hammers], 2);
   GT_Recipe.ReplaceRecipeWithTool({id: 126, data: 0, count: 6}, ["wlw", "grg", "sch"], ['w', ItemID.cableGold, 0, 'g', ItemID.long_rodGold, 0, 'r', 280, 0], [GT_Material.solderings, GT_Material.screwdrivers, GT_Material.hammers], 2);
   GT_Recipe.ReplaceWithShaped({id: 259, count:1, data: 0}, ["n ", " c"], ['n', ItemID.nuggetSteel, 0, 'c', 318, 0]);
   GT_Recipe.ReplaceWithShaped({id: 259, count:1, data: 0}, ["n ", " c"], ['n', ItemID.nuggetIron, 0, 'c', 318, 0]);
   GT_Recipe.ReplaceWithShaped({id: 259, count:1, data: 0}, ["n ", " c"], ['n', ItemID.nuggetTin, 0, 'c', 318, 0]);
   GT_Recipe.ReplaceRecipeWithTool({id: 328, count: 1, data: 0}, ["php", "ppp"], ['p', ItemID.plateIron, 0], [GT_Material.hammers], 2);
   GT_Recipe.ReplaceRecipeWithTool({id: 330, count: 1, data: 0}, ["ppw", "pp ", "pp "], ['p', ItemID.plateIron, 0], [GT_Material.wrenchs], 2);
   GT_Recipe.ReplaceWithShaped({id: 345, count:1, data: 0}, [" p ", "prp", " p "], ['p', ItemID.plateIron, 0, 'r', 331, 0]);
   GT_Recipe.ReplaceWithShaped({id: 347, count:1, data: 0}, [" p ", "prp", " p "], ['p', ItemID.plateGold, 0, 'r', 331, 0]);
   GT_Recipe.ReplaceRecipeWithTool({id: 410, count: 1, data: 0}, ["php", "pcp", " p "], ['p', ItemID.plateIron, 0, 'c', 54, 0], [GT_Material.hammers], 2);
   GT_Recipe.ReplaceShapelessRecipeWithTool({id: 377, count:1, data:0}, [{id: 369, data:0}], GT_Material.mortars, 1);
   GT_Recipe.ReplaceRecipeWithTool({id: 380, count: 1, data: 0}, ["p p", "php", "ppp"], ['p', ItemID.plateIron, 0, 'c', 54, 0], [GT_Material.hammers], 2);

   //industrial
   GT_Recipe.ReplaceRecipeWithTool({id: BlockID.machineBlockBasic, count: 1, data: 0}, ["xxx", "xhx", "xxx"], ['x', ItemID.plateSteel, 0], [GT_Material.hammers], 2);
	
   GT_Recipe.ReplaceWithShaped({id: ItemID.ingotAlloy, count: 1, data: 0}, ["sss", "bbb", "ttt"], ['s', ItemID.ingotStainless, 0, 'b', ItemID.ingotBronze, 0, 't', ItemID.ingotTin, 0]);
	
	GT_Recipe.ReplaceRecipeWithTool({id:ItemID.circuitBasic, count:1, data:0}, ["clc", "cpc", "crc"], ['c', ItemID.cableCopper, 0, 'p', ItemID.plateSilver, 0, 'r', 331, 0], [GT_Material.solderings], 2);
	
	GT_Recipe.ReplaceRecipeWithTool({id:ItemID.circuitAdvanced, count:1, data:0}, ["ala", "aca", "apa"], ['a', ItemID.cableGold, 0, 'p', ItemID.plateLapis, 0, 'c', ItemID.circuitBasic, 0], [GT_Material.solderings], 2);

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


   Recipes.deleteRecipe({id:ItemID.plateGold, count:1, data:0});
   Recipes.deleteRecipe({id:ItemID.craftingHammer, count:1, data:0});
   Recipes.deleteRecipe({id:ItemID.craftingCutter, count:1, data:0});
   Recipes.deleteRecipe({id:ItemID.wrench, count:1, data:0});

   Recipes.deleteRecipe({id:BlockID.blockCopper, count:1, data:0});
   Recipes.deleteRecipe({id:ItemID.ingotCopper, count:9, data:0});

   Recipes.deleteRecipe({id:BlockID.blockLead, count:1, data:0});
   Recipes.deleteRecipe({id:ItemID.ingotLead, count:9, data:0});

   Recipes.deleteRecipe({id:BlockID.blockSteel, count:1, data:0});
   Recipes.deleteRecipe({id:ItemID.ingotSteel, count:9, data:0});

   Recipes.deleteRecipe({id:BlockID.blockBronze, count:1, data:0});
   Recipes.deleteRecipe({id:ItemID.ingotBronze, count:9, data:0});

   Recipes.deleteRecipe({id:BlockID.blockTin, count:1, data:0});
   Recipes.deleteRecipe({id:ItemID.ingotTin, count:9, data:0});

   Recipes.removeFurnaceRecipe(265, -1);
   Recipes.removeFurnaceRecipe(ItemID.dustBronze, -1)
   Recipes.removeFurnaceRecipe(ItemID.dustCopper, -1);
   Recipes.removeFurnaceRecipe(ItemID.dustIron, -1);
   Recipes.removeFurnaceRecipe(ItemID.dustGold, -1);
   Recipes.removeFurnaceRecipe(ItemID.dustSilver, -1);
   Recipes.removeFurnaceRecipe(ItemID.latex, -1);

   //wool
   Recipes.addShapeless({id:287, count:4, data:0}, [{id:35, data:-1}]); 

   //torch
   Recipes.addShaped({id:50, count:4, data:0}, ["a","b"], ['a', ItemID.Lignite, 0, 'b', 280, 0]); 



   GT_Recipe.CreateRecipeWithTool({id:ItemID.flintpickaxe, count:1, data:0}, ["bbb"," sh"," s "], ['b', 318, 0, 's', 280, 0], [GT_Material.hammers], 1);

   GT_Recipe.CreateRecipeWithTool({id:ItemID.flintsword, count:1, data:0}, ["bh","b ","s "], ['b', 318, 0, 's', 280, 0], [GT_Material.hammers], 1);

   GT_Recipe.CreateRecipeWithTool({id:ItemID.flintaxe, count:1, data:0}, ["bbh","bs "," s "], ['b', 318, 0, 's', 280, 0], [GT_Material.hammers], 1);

   GT_Recipe.CreateRecipeWithTool({id:ItemID.flintshovel, count:1, data:0}, [" bh"," s "," s "], ['b', 318, 0, 's', 280, 0], [GT_Material.hammers], 1); 

   GT_Recipe.CreateRecipeWithTool({id:ItemID.flinthoe, count:1, data:0}, [" bh"," s "," s "], ['b', 318, 0, 's', 280, 0], [GT_Material.hammers], 1);

   //shapes
    GT_Recipe.CreateRecipeWithTool({id: ItemID.EmptyShapePlate, count:1, data:0}, ["hf","##","##"], ['#', ItemID.plateSteel, 0], [GT_Material.hammers, GT_Material.files], 2);
	GT_Recipe.CreateRecipeWithTool({id: ItemID.MoldCylinder, count:1, data:0}, ["  #","   ","  h"], ['#', ItemID.EmptyShapePlate, 0], [GT_Material.hammers], 2);
	GT_Recipe.CreateRecipeWithTool({id: ItemID.MoldAnvil, count:1, data:0}, ["  #","   "," h "], ['#', ItemID.EmptyShapePlate, 0], [GT_Material.hammers], 2);
	GT_Recipe.CreateRecipeWithTool({id: ItemID.MoldPlate, count:1, data:0}, [" h "," # ","   "], ['#', ItemID.EmptyShapePlate, 0], [GT_Material.hammers], 2);
	GT_Recipe.CreateRecipeWithTool({id: ItemID.MoldIngot, count:1, data:0}, ["   "," # "," h "], ['#', ItemID.EmptyShapePlate, 0], [GT_Material.hammers], 2);
	GT_Recipe.CreateRecipeWithTool({id: ItemID.MoldNuggets, count:1, data:0}, ["#  h","   ","   "], ['#', ItemID.EmptyShapePlate, 0], [GT_Material.hammers], 2);
	GT_Recipe.CreateRecipeWithTool({id: ItemID.MoldBlock, count:1, data:0}, ["   ","h# ","   "], ['#', ItemID.EmptyShapePlate, 0], [GT_Material.hammers], 2);
	GT_Recipe.CreateRecipeWithTool({id: ItemID.MoldBall, count:1, data:0}, ["   "," # ","h  "], ['#', ItemID.EmptyShapePlate, 0], [GT_Material.hammers], 2);
	
	//casing
	GT_Recipe.ReplaceRecipeWithTool({id: ItemID.casingCopper, count:1, data:0}, ["h #", "", ""], ['#', ItemID.plateCopper, 0], [GT_Material.hammers], 2);
	GT_Recipe.ReplaceRecipeWithTool({id: ItemID.casingTin, count:1, data:0}, ["h #", "", ""], ['#', ItemID.plateTin, 0], [GT_Material.hammers], 2);
	GT_Recipe.ReplaceRecipeWithTool({id: ItemID.casingBronze, count:1, data:0}, ["h #", "", ""], ['#', ItemID.plateBronze, 0], [GT_Material.hammers], 2);
	GT_Recipe.ReplaceRecipeWithTool({id: ItemID.casingIron, count:1, data:0}, ["h #", "", ""], ['#', ItemID.plateIron, 0], [GT_Material.hammers], 2);
	GT_Recipe.ReplaceRecipeWithTool({id: ItemID.casingSteel, count:1, data:0}, ["h #", "", ""], ['#', ItemID.plateSteel, 0], [GT_Material.hammers], 2);
	GT_Recipe.ReplaceRecipeWithTool({id: ItemID.casingGold, count:1, data:0}, ["h #", "", ""], ['#', ItemID.plateGold, 0], [GT_Material.hammers], 2);
	GT_Recipe.ReplaceRecipeWithTool({id: ItemID.casingLead, count:1, data:0}, ["h #", "", ""], ['#', ItemID.plateLead, 0], [GT_Material.hammers], 2);

     //new blocks
     Recipes.addFurnace(BlockID.redcobblestone, BlockID.redstone, 0);
     Recipes.addFurnace(BlockID.blackcobblestone, BlockID.blackstone, 0);
      
	 //components
	 Recipes.addShaped({id: ItemID.resistor, count: 3, data: 0}, [" p ","cdc"," p "], ['c', BlockID.OneCopperWire, 0, 'p', 339, 0, 'd', ItemID.dustCoal, 0]);	
	 Recipes.addShaped({id: ItemID.vacuumtube, count: 1, data: 0}, ["ptp","ccc"], ['c', BlockID.OneCopperWire, 0, 'p', 339, 0, 't', ItemID.glasstube, 0]);	
	 Recipes.addShaped({id: ItemID.coatedcircuitboard, count: 3, data: 0}, [" p ","ccc"," p "], ['c', ItemID.plateWood, 0, 'p', ItemID.latex, 0]);	
	 GT_Recipe.ReplaceWithShaped({id: ItemID.circuitBasic, count: 1, data: 0}, ["rcr","vbv","aaa"], ['r', ItemID.resistor, 0, 'c', ItemID.casingSteel, 0, 'v', ItemID.vacuumtube, 0, 'b', ItemID.coatedcircuitboard, 0, 'a', BlockID.OneRedAlloyCable, 0]);		 	
	 Recipes.addShaped({id: BlockID.LVMachineHull, count: 1, data: 0}, ["wsw","pcp"], ['c', BlockID.LVMachineCasing, 0, 'p', BlockID.OneTinCable, 0, 's', ItemID.plateSteel, 0, 'w', ItemID.plateWroughtIron, 0]);		
	 Recipes.addShaped({id: ItemID.electricmotorLV, count: 1, data: 0}, ["tcs","cmc","sct"], ['t', BlockID.OneTinCable, 0, 'c', BlockID.OneCopperWire, 0, 's', ItemID.rodIron, 0, 'm', ItemID.magneticRodIron, 0]);	
	 Recipes.addShaped({id: ItemID.electricmotorLV, count: 1, data: 0}, ["tcs","cmc","sct"], ['t', BlockID.OneTinCable, 0, 'c', BlockID.OneCopperWire, 0, 's', ItemID.rodWroughtIron, 0, 'm', ItemID.magneticRodIron, 0]);
	 Recipes.addShaped({id: ItemID.electricpistonLV, count: 1, data: 0}, ["ppp","crr","ceg"], ['p', ItemID.plateSteel, 0, 'c', BlockID.OneTinCable, 0, 'r', ItemID.rodSteel, 0, 'e', ItemID.electricmotorLV, 0, 'g', ItemID.gearSmallSteel, 0]);
	 GT_Recipe.CreateRecipeWithTool({id: ItemID.electricpumpLV, count:1, data:0}, ["#$z","spw","ze*"], ['#', ItemID.screwTin, 0, '$', ItemID.rotorTin, 0, 'z', ItemID.ringRubber, 0, 'p', BlockID.BronzeFluidPipe, 0, 'e', ItemID.electricmotorLV, 0, '*', BlockID.OneTinCable, 0], [GT_Material.screwdrivers, GT_Material.wrenchs], 2);
     
	 //food
	 Recipes.addFurnace(ItemID.doughBread, 297, 0);
	 Recipes.addFurnace(ItemID.doughCookie, 297, 0);
	 GT_Recipe.CreateRecipeWithTool({id:ItemID.flour, count:1, data:0}, ["m#","",""], ['#', 296, 0], [GT_Material.mortars], 1);
	 GT_Recipe.CreateRecipeWithTool({id:ItemID.dough, count:1, data:0}, ["w#","",""], ['#', ItemID.flour, 0], [GT_Material.liquid], 1);
	 Recipes.addShaped({id: ItemID.doughBread, count: 1, data:0}, ["aa","", ""], ['a', ItemID.dough, 0]); 
	 Recipes.addShaped({id: ItemID.doughCookie, count: 2, data:0}, ["ac","", ""], ['a', ItemID.dough, 0, 'c', ItemID.dustCocoa, 0]); 
});




// file: common/recipes/machine.js

Callback.addCallback("PostLoaded", function(){
	//Alloy
	GT_Recipe.AlloySmelterRecipe.add({slot1: {id: ItemID.dustCopper, count: 3}, slot2: {id: ItemID.dustTin, count: 1}, output: {id: ItemID.ingotBronze, data: 0, count: 4},adv: {time: GT_Material.RetArgFromID(ItemID.ingotBronze, "long") * 20, level: GT_Material.RetArgFromID(ItemID.ingotBronze, "lvl"), isShape: false}});
	GT_Recipe.AlloySmelterRecipe.add({slot1: {id: ItemID.ingotCopper, count: 3}, slot2: {id: ItemID.ingotTin, count: 1}, output: {id: ItemID.ingotBronze, data: 0, count: 4},adv: {time: GT_Material.RetArgFromID(ItemID.ingotBronze, "long") * 20, level: GT_Material.RetArgFromID(ItemID.ingotBronze, "lvl"), isShape: false}});
	GT_Recipe.AlloySmelterRecipe.add({slot1: {id: ItemID.dustCopper, count: 3}, slot2: {id: ItemID.ingotTin, count: 1}, output: {id: ItemID.ingotBronze, data: 0, count: 4},adv: {time: GT_Material.RetArgFromID(ItemID.ingotBronze, "long") * 20, level: GT_Material.RetArgFromID(ItemID.ingotBronze, "lvl"), isShape: false}});
	GT_Recipe.AlloySmelterRecipe.add({slot1: {id: ItemID.ingotCopper, count: 3}, slot2: {id: ItemID.dustTin, count: 1}, output: {id: ItemID.ingotBronze, data: 0, count: 4},adv: {time: GT_Material.RetArgFromID(ItemID.ingotBronze, "long") * 20, level: GT_Material.RetArgFromID(ItemID.ingotBronze, "lvl"), isShape: false}});
    GT_Recipe.AlloySmelterRecipe.add({slot1: {id: ItemID.dustGlass, count: 1}, slot2: {id: ItemID.MoldBall, count: 1}, output: {id: ItemID.glasstube, data: 0, count: 1},adv: {time: 120, level: 1, isShape: true}});
	//extractor
	ICore.Recipe.registerRecipesFor("extractor", {
		"ItemID.latex": {id: ItemID.dustRubber, count: 3, data: 0, level: 1, time: 150},
		"BlockID.rubberTreeLog": {id: ItemID.dustRubber, count: 1, data: 0, level: 1, time: 150},
		289: {id: ItemID.dustSulfur, count: 1, data: 0, level: 1, time: 150},		
		37: {id: 351, count: 2, data: 11, level: 1, time: 150},
		38: {id: 351, count: 2, data: 1, level: 1, time: 150},
		"38:2": {id: 351, count: 2, data: 13, level: 1, time: 150},
		"38:3": {id: 351, count: 2, data: 7, level: 1, time: 150},
		"38:4": {id: 351, count: 2, data: 1, level: 1, time: 150},
		"38:5": {id: 351, count: 2, data: 14, level: 1, time: 150},
		"38:6": {id: 351, count: 2, data: 7, level: 1, time: 150},
		"38:7": {id: 351, count: 2, data: 9, level: 1, time: 150},
		"38:8": {id: 351, count: 2, data: 7, level: 1, time: 150},
		45: {id: 336, count: 4, data: 0, level: 1, time: 150},
		47: {id: 340, count: 3, data: 0, level: 1, time: 150},
		80: {id: 332, count: 4, data: 0, level: 1, time: 150},
		82: {id: 337, count: 4, data: 0, level: 1, time: 150},
		112: {id: 405, count: 4, data: 0, level: 1, time: 150},
		175: {id: 351, count: 3, data: 11, level: 1, time: 150},
		"175:1": {id: 351, count: 3, data: 13, level: 1, time: 150},
		"175:4": {id: 351, count: 3, data: 1, level: 1, time: 150},
		"175:5": {id: 351, count: 3, data: 9, level: 1, time: 150},
	}, true);
	
	
	//metalformer
	for(var p in GT_Material.plates){
		    for(var i in GT_Material.ingots){
			    var ingots = GT_Material.ingots[i];
			    var plates = GT_Material.plates[p];
			    if(plates.Material == ingots.Material){
		            ICore.Recipe.addRecipeFor("metalFormer0", ingots.id, {id: plates.id, count: 1});
		        }
		   }
    }
	
	//macerator
	for(var keys in GT_Recipe.MaceratorRecipe.recipe){
         var r = GT_Recipe.MaceratorRecipe.recipe[keys];      
            ICore.Recipe.addRecipeFor("macerator", r.recipe.id, {id: r.result.id, count: r.result.count, data: r.result.data, time: r.adv.long, lvl: r.adv.lvl});        
    }
	ICore.Recipe.addRecipeFor("macerator", 297, {id: ItemID.flour, count: 1, data: 0, time: 30, lvl: 1});
    ICore.Recipe.addRecipeFor("macerator", "351:3", {id: ItemID.dustCocoa, count: 1, data: 0, time: 30, lvl: 1}); 
    ICore.Recipe.addRecipeFor("macerator", 17, {id: ItemID.dustWood, count: 6, data: 0, time: GT_Material.RetArgFromID(ItemID.dustWood, "long") * 10, lvl: GT_Material.RetArgFromID(ItemID.dustWood, "lvl")});
    ICore.Recipe.addRecipeFor("macerator", "17:1", {id: ItemID.dustWood, count: 6, data: 0, time: GT_Material.RetArgFromID(ItemID.dustWood, "long") * 10, lvl: GT_Material.RetArgFromID(ItemID.dustWood, "lvl")});
    ICore.Recipe.addRecipeFor("macerator", "17:2", {id: ItemID.dustWood, count: 6, data: 0, time: GT_Material.RetArgFromID(ItemID.dustWood, "long") * 10, lvl: GT_Material.RetArgFromID(ItemID.dustWood, "lvl")});
    ICore.Recipe.addRecipeFor("macerator", "17:3", {id: ItemID.dustWood, count: 6, data: 0, time: GT_Material.RetArgFromID(ItemID.dustWood, "long") * 10, lvl: GT_Material.RetArgFromID(ItemID.dustWood, "lvl")});		
	
	//forgehammer
	ICore.Recipe.registerRecipesFor("forgehammer", {}, true);
	for(var keys in GT_Recipe.ForgeHammerRecipe.recipe){
         var r = GT_Recipe.ForgeHammerRecipe.recipe[keys];      
            ICore.Recipe.addRecipeFor("forgehammer", r.recipe.id, {id: r.result.id, count: r.result.count, data: r.result.data, time: r.adv.long, lvl: r.adv.lvl});        
    }
	ICore.Recipe.addRecipeFor("forgehammer", 20, {id: ItemID.dustGlass, count: 1, data: 0, time: 30, lvl: 2});   
    ICore.Recipe.addRecipeFor("forgehammer", 138, {id: ItemID.dustGlass, count: 5, data: 0, time: 30, lvl: 2});    	
	//compressor
	for(var keys in GT_Recipe.CompressorRecipe.recipe){
         var r = GT_Recipe.CompressorRecipe.recipe[keys];      
            ICore.Recipe.addRecipeFor("compressor", r.recipe.id, {id: r.result.id, count: r.result.count, data: r.result.data, time: r.adv.long, lvl: r.adv.lvl, ingredientCount: r.recipe.count});        
    }
	//blastfurnace
	GT_Recipe.BlastFurnaceRecipe.add({id: ItemID.ingotSteel, data: 0, count: 1}, {id: 265, data: 0, count: 1}, {long: 7200, lvl: 2});
	ICore.Recipe.registerRecipesFor("blastfurnace", {}, true);
	for(var keys in GT_Recipe.BlastFurnaceRecipe.recipe){
         var r = GT_Recipe.BlastFurnaceRecipe.recipe[keys];      
            ICore.Recipe.addRecipeFor("blastfurnace", r.recipe.id, {id: r.result.id, count: r.result.count, data: r.result.data, time: r.adv.long, lvl: r.adv.lvl});        
    }
}); 




// file: api/GT_API.js

ModAPI.registerAPI("GTCore", {
	GT_MultiBlock: GT_MultiBlock,
    GT_Recipe : GT_Recipe,
    GT_Worldgen : GT_Worldgen,
    GT_Material : GT_Material,
    
    GT_Tool: GT_Tool,
    
    DeleteOre:DeleteOre,
    
    CreateHelmetRecipe:CreateHelmetRecipe,
    CreateChestplateRecipe:CreateChestplateRecipe,
    CreateLeggingsRecipe:CreateLeggingsRecipe,
    CreateBootsRecipe:CreateBootsRecipe,

    CreatePickaxeRecipe:CreatePickaxeRecipe,
    CreateAxeRecipe:CreateAxeRecipe,
    CreateHoeRecipe:CreateHoeRecipe,
    CreateSwordRecipe:CreateSwordRecipe,
    CreateHelmetRecipe:CreateHelmetRecipe,
    
    requireGlobal: function (command) {
        return eval(command);
    }
});
Logger.Log("GregTechAPI shared", "API");




// file: integration/IMekanism.js

/*
ModAPI.addAPICallback("APIMEK", function(api){	
	Callback.addCallback("PreLoaded", function(){		
	   ItemID.ingotosmium = ItemID.ingotOsmium;
	   ItemID.copperingot = ItemID.ingotCopper;
	   ItemID.tiningot = ItemID.ingotTin;
	   ItemID.ObsidianIngot = ItemID.ingotObsidian;
	   ItemID.ObsidianDust = ItemID.dustObsidian;
	   ItemID.SteelDust = ItemID.dustSteel;
	   ItemID.SteelIngot = ItemID.ingotSteel;
	   ItemID.DiamondDust = ItemID.dustDiamond;
	   ItemID.GoldDust = ItemID.dustGold;
	   ItemID.IronDust = ItemID.dustIron;
	   ItemID.OsmiumDust = ItemID.dustOsmium;
	   ItemID.TinDust = ItemID.dustTin;
	   ItemID.CopperDust = ItemID.dustCopper;
	   ItemID.GlowstoneIngot = ItemID.ingotGlowstone;
	   BlockID.CopperOre = 1;
       BlockID.TinOre = 1;
       BlockID.OsmiumOre = 1;	   
	});
	
	   GT_Material.register("Osmium", {isIngot: true, isDust: true, isPlate: true, generateRecipes: true}, {temp:1000, long:10, lvl:2});
	   GT_Material.register("Obsidian", {isIngot: true, isDust: true, isPlate: true, generateRecipes: true}, {temp:2000, long:120, lvl:3});
	   GT_Material.register("Glowstone", {isIngot: true, isPlate: true, generateRecipes: true}, {temp:2000, long:120, lvl:2});
	
	   //GT_Material.OreRegister("Osmium", [["Osmium", 2],  ["Iron", 1], ["Aluminium", 0]], ["Stone"], true);
	   //GT_Worldgen.RegisterLargeOreDepositeOnEarth([BlockID.oreOsmiumStone, BlockID.oreGalenaStone, BlockID.oreTinStone, BlockID.oreLeadStone], 80, tileTemplate, 40, 120, {x:40, y:10, z:40}, 20, 1);
	
	Callback.addCallback("PostLoaded", function(){
      ICore.Recipe.addRecipeFor("macerator", 348, {id: ItemID.dustGlowstone, count: 1, data: 0});
      //osmium tools
      CreateHelmetRecipe(ItemID.OsmiumHelmet, "Osmium", 2);
      CreateChestplateRecipe(ItemID.OsmiumChestplate, "Osmium", 2);
      CreateLeggingsRecipe(ItemID.OsmiumLeggings, "Osmium", 2);
      CreateBootsRecipe(ItemID.OsmiumBoots, "Osmium", 2);

      CreatePickaxeRecipe(ItemID.OsmiumPickaxe, "Osmium", 2);
      CreateAxeRecipe(ItemID.OsmiumAxe, "Osmium", 2);
      CreateSwordRecipe(ItemID.OsmiumSword, "Osmium", 2);
      CreateShovelRecipe(ItemID.OsmiumShovel, "Osmium", 2);

      //steel tools
      CreateHelmetRecipe(ItemID.SteelHelmet, "Steel", 2);
      CreateChestplateRecipe(ItemID.SteelChestplate, "Steel", 2);
      CreateLeggingsRecipe(ItemID.SteelLeggings, "Steel", 2);
      CreateBootsRecipe(ItemID.SteelBoots, "Steel", 2);

      CreatePickaxeRecipe(ItemID.SteelPickaxe, "Steel", 2);
      CreateAxeRecipe(ItemID.SteelAxe, "Steel", 2);
      CreateSwordRecipe(ItemID.SteelSword, "Steel", 2);
      CreateShovelRecipe(ItemID.SteelShovel, "Steel", 2);
	
     //lapis tools
     CreateHelmetRecipe(ItemID.lapisHelmet, "Lapis", 1);
     CreateChestplateRecipe(ItemID.lapisChestplate, "Lapis", 1);
     CreateLeggingsRecipe(ItemID.lapisLeggings, "Lapis", 1);
     CreateBootsRecipe(ItemID.lapisBoots, "Lapis", 1);

     CreatePickaxeRecipe(ItemID.lazuliPickaxe, "Lapis", 1);
     CreateAxeRecipe(ItemID.lazuliAxe, "Lapis", 1);
     CreateSwordRecipe(ItemID.lazuliSword, "Lapis", 1);
     CreateShovelRecipe(ItemID.lazuliShovel, "Lapis", 1);
	
     //obsidian tools
     CreateHelmetRecipe(ItemID.obsidianHelmet, "Obsidian", 3);
     CreateChestplateRecipe(ItemID.obsidianChestplate, "Obsidian", 3);
     CreateLeggingsRecipe(ItemID.obsidianLeggings, "Obsidian", 3);
     CreateBootsRecipe(ItemID.obsidianBoots, "Obsidian", 3);

     CreatePickaxeRecipe(ItemID.obsidianPickaxe, "Obsidian", 3);
     CreateAxeRecipe(ItemID.obsidianAxe, "Obsidian", 3);
     CreateSwordRecipe(ItemID.obsidianSword, "Obsidian", 3);
     CreateShovelRecipe(ItemID.obsidianShovel, "Obsidian", 3);
	
     //glowstone tools
     CreateHelmetRecipe(ItemID.GlowstoneHelmet, "Glowstone", 2);
     CreateChestplateRecipe(ItemID.GlowstoneChestplate, "Glowstone", 2);
     CreateLeggingsRecipe(ItemID.GlowstoneLeggings, "Glowstone", 2);
     CreateBootsRecipe(ItemID.GlowstoneBoots, "Glowstone", 2);

     CreatePickaxeRecipe(ItemID.GlowstonePickaxe, "Glowstone", 2);
     CreateAxeRecipe(ItemID.GlowstoneAxe, "Glowstone", 2);
     CreateSwordRecipe(ItemID.GlowstoneSword, "Glowstone", 2);
     CreateShovelRecipe(ItemID.GlowstoneShovel, "Glowstone", 2);
    });
});
*/




// file: integration/IForesty.js

ModAPI.addAPICallback("ForestryAPI", function(api){
	Callback.addCallback("PostLoaded", function(){
	//Recipes.deleteRecipe({id: ItemID.bronzePickaxe, count:1, data:0})
	//Recipes.deleteRecipe({id: ItemID.bronzeShovel, count:1, data:0})
	
	Recipes.deleteRecipe({id: ItemID.canEmpty, count: 12, data: 0});
	Recipes.deleteRecipe({id: ItemID.waxCapsuleEmpty, count: 4, data: 0});
	Recipes.deleteRecipe({id: ItemID.refractoryEmpty, count: 4, data: 0});
	
	GT_Recipe.ReplaceRecipeWithTool({id: ItemID.sturdyMachine, count:1, data:0},['aaa', 'aha', 'aaa'], ['a', ItemID.plateBronze, 0], [GT_Material.hammers], 2);
	
	GT_Recipe.CreateRecipeWithTool({id: ItemID.canEmpty, count: 4, data: 0}, [" x ","xhx"," x "], ['x', ItemID.plateTin, 0], [GT_Material.hammers], 2);
    
    Recipes.addShaped({id: ItemID.waxCapsuleEmpty, count: 1, data: 0}, [" x ","xax"," x "], ['x', ItemID.beeswax, 0, 'a', ItemID.canEmpty, 0]);
    
	Recipes.addShaped({id: ItemID.refractoryEmpty, count: 1, data: 0}, [" x ","xax"," x "], ['x', ItemID.refractoryWax, 0, 'a', ItemID.canEmpty, 0]);
    
	});
	Callback.addCallback("PreLoaded", function(){
		BlockID.oreCopper = 1;
		BlockID.oreTin = 1;
		BlockID.oreApatite = 1;
		Translation.addTranslation("Apatite Ore", {ru: "Апатитовая руда",  zh: "磷灰石矿"});
	    GT_Material.OreRegister("Apatite", [["apatite", 3],  ["Lapis", 1], ["Saphire", 0]], ["Stone"], true);
	    GT_Worldgen.RegisterLargeOreDepositeOnEarth([BlockID.oreApatiteStone, BlockID.oreApatiteStone, BlockID.oreLapisStone, BlockID.oreLapisStone, BlockID.oreApatiteStone, BlockID.oreApatiteStone, BlockID.oreApatiteStone, BlockID.oreApatiteStone], 80, tileTemplate, 32, 48, {x:40, y:8, z:40}, 20, 1);
	});
});




// file: integration/IThermalExpation.js

ModAPI.addAPICallback("ThermalExpansionAPI", function(api){
	ATMat.MaterialRegister("Mithril", {isDust:true, generateRecipes:true, isIngot:true, isPlate:true, isNugget:true}, {temp:2300, long:100, lvl:3})
	ATMat.OreRegister("Mithril", [["Mithril", 2], ["Saphire", 0]], ["Stone"], true)
	ATGen.RegisterLargeOreDepositeOnEarth([BlockID.oreMithrilStone, BlockID.oreLapisStone], 30, tileTemplate, 10, 20, {x:24, y:6, z:24})
	
	Callback.addCallback("PostLoaded", function(){
	CreateSet("Copper", 1)
	CreateSet("Tin", 1)
	CreateSet("Silver", 2)
	CreateSet("Aluminium", 2)
	CreateSet("Lead", 1)
	CreateSet("Nikel", 1)
	CreateSet("Platinum", 3)
	CreateSet("Steel", 3)
	CreateSet("Electrum", 2)
	CreateSet("Invar", 2)
	CreateSet("Bronze", 2)
	CreateSet("Iridium", 1)
	CreateSet("Mithril", 1)
	
	Recipes.removeFurnaceRecipe(ItemID.dustBronze, 0)
    Recipes.removeFurnaceRecipe(ItemID.dustPlatinum, 0)
    Recipes.removeFurnaceRecipe(ItemID.dustInvar, 0)
    Recipes.removeFurnaceRecipe(ItemID.dustElectrum, 0)
    Recipes.removeFurnaceRecipe(ItemID.dustMithril, 0)
    Recipes.removeFurnaceRecipe(ItemID.dustSteel, 0)
	})
	
	Callback.addCallback("PreLoaded", function(){
	    DeleteOre(BlockID.oreLead)
	    DeleteOre(BlockID.oreSilver)
	    DeleteOre(BlockID.oreAluminium)
	    DeleteOre(BlockID.oreNikel)
	    DeleteOre(BlockID.orePlatinum)
	    DeleteOre(BlockID.oreCopper)
	    DeleteOre(BlockID.oreTin)
	    DeleteOre(BlockID.oreIridium)
	    DeleteOre(BlockID.oreMithril)
	})
})




