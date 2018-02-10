//Author - Alex Fack

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//????????? ?????? ?????????? ? ?????? ?????????? ??????-?? ?? ????????, ???????? ToopType ???????????? ????? ????.
var ToolType = {
	sword: {
		isWeapon: true,
		enchantType: Native.EnchantType.weapon,
		damage: 4,
		blockTypes: ["fibre", "plant"],
		onAttack: function(item, mob){ },
		calcDestroyTime: function(item, block, coords, params, destroyTime, enchant){
			if(block.id==30){return 0.08;}
			if(block.id==35){return 0.05;}
			var material = ToolAPI.getBlockMaterial(block.id) || {};
			material = material.name;
			if(material=="fibre" || material=="plant"){return params.base/1.5;}
			return destroyTime;
		}
	},
	
	shovel: {
		enchantType: Native.EnchantType.shovel,
		damage: 2,
		blockTypes: ["dirt"],
		useItem: function(coords, item, block){
			if(block.id==2&&coords.side==1){ 
				World.setBlock(coords.x, coords.y, coords.z, 198);
				World.playSoundAtEntity(Player.get(), "step.grass", 0.5, 0.75);
				ToolAPI.breakCarriedTool(1);
			}
		}
	},
	
	pickaxe: {
		enchantType: Native.EnchantType.pickaxe,
		damage: 2,
		blockTypes: ["stone"]
	},
	
	axe: {
		enchantType: Native.EnchantType.axe,
		damage: 3,
		blockTypes: ["wood"]
	},
	
	hoe: {
		useItem: function(coords, item, block){
			if((block.id==2 || block.id==3) && coords.side==1){ 
				World.setBlock(coords.x, coords.y, coords.z, 60);
				World.playSoundAtEntity(Player.get(), "step.grass", 0.5, 0.75);
				ToolAPI.breakCarriedTool(1);
			}
		}
	}
}

ToolAPI.breakCarriedTool = function(damage){
	var item = Player.getCarriedItem(true);
	item.data += damage;
	if(item.data >= Item.getMaxDamage(item.id)){
		item.id = 0;
	}
	Player.setCarriedItem(item.id, item.count, item.data, item.enchant);
}

ToolAPI.setTool = function(id, toolMaterial, toolType, brokenId){
	Item.setToolRender(id, true);
	toolMaterial = ToolAPI.toolMaterials[toolMaterial] || toolMaterial;
	if(toolType.blockTypes){
		toolProperties = {brokenId: brokenId || 0};
		for(var i in toolType){
		toolProperties[i] = toolType[i];}
		if(!toolMaterial.durability){
			var maxDmg = Item.getMaxDamage(id)
			toolMaterial.durability = maxDmg;
		}
		ToolAPI.registerTool(id, toolMaterial, toolType.blockTypes, toolProperties);
	}
	else{
		Item.setMaxDamage(id, toolMaterial.durability);
	}
	if(toolType.enchantType){
		Item.setEnchantType(id, toolType.enchantType, toolMaterial.enchantability);
	}
	if(toolType.useItem){
		Item.registerUseFunctionForID(id, toolType.useItem);
	}
	if(toolType.destroyBlock){
		Callback.addCallback("DestroyBlock", function(coords, block, player){
			var item = Player.getCarriedItem(true);
			if(item.id == id){
				toolType.destroyBlock(coords, coords.side, item, block);
			}
		});
	}
}
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

var _ 

var round = function(num, x){
	var multiplier = Math.pow(10, x)
	return Math.floor(num * multiplier) / multiplier
}

var rollPercentage = function(pr){
    return pr>=round(Math.random()*100, 2)
}
var random = function(min, max){
	return Math.floor(java.lang.Math.random() * (max - min + 1)) + min;
}

var CTR = {tools:[],
    Tool(api, field, result){
        for (var i in field){
            if (CTR.ToolID(field[i].id)){
                field[i].data++;
               //Game.message(field[i].data);
               if (CTR.ToolData(field[i].data, field[i].id)){
                   field[i].id = field[i].count = field[i].data = 0;
                   //Game.message("dick");
               }
           }else{api.decreaseFieldSlot(i)}
        }
    },
   ToolID(id){
       for(var key in this.tools){
            if(id== this.tools[key][0]){
                return (id == this.tools[key][0])
           }
       }
    },
    ToolData(data, id){
        for(var key in this.tools){
            if(data== this.tools[key][1]&&id== this.tools[key][0]){
                //Game.message( this.tools[key][1]);
                return (data == this.tools[key][1])
            }
        }
    },
    addTool(i, d){
        this.tools.push([i, d]);
        Item.setMaxDamage(i, d);
    },
RegisterHammer(name, data, lvl){
	var id = IDRegistry.genItemID(name+"Hammer");
    Item.createItem(name+"Hammer", "Hammer from "+name, {name:name+"_hammer"}, {stack:1});
    CTR.addTool(id, data)
    ATMat.hammers.push({id:id, mat:name, s:'h'})
    var hammer = {durability:data, level: lvl, efficiency:3, damage: 5, enchantability:0};
    ToolAPI.setTool(id, hammer, ToolType.pickaxe);
},
	
RegisterFile(name, data){
	var id = IDRegistry.genItemID(name+"File");
    Item.createItem(name+"File", "File from "+name, {name:name+"_file"}, {stack:1});
    CTR.addTool(id, data)
    ATMat.files.push({id:id, mat:name, s:'f'})
},

RegisterMortar(name, data){
	var id = IDRegistry.genItemID(name+"Mortar");
    Item.createItem(name+"Mortar", "Mortar from "+name, {name:name+"_mortar"}, {stack:1});
    CTR.addTool(id, data)
    ATMat.mortars.push({id:id, mat:name, s:'m'})
},

RegisterCutter(name, data){
	var id = IDRegistry.genItemID(name+"Cutter");
    Item.createItem(name+"Cutter", "Cutter from "+name, {name:name+"_cutter"}, {stack:1});
    CTR.addTool(id, data)
    ATMat.cutters.push({id:id, mat:name, s:'n'})
},
RegisterWrench(name, data){
	var id = IDRegistry.genItemID(name+"Wrench");
    Item.createItem(name+"Wrench", "Wrench from "+name, {name:name+"_wrench"}, {stack:1});
    CTR.addTool(id, data)
    ATMat.wrenchs.push({id:id, mat:name, s:'w'})
},
RegisterScrewdriver(name, data){
	var id = IDRegistry.genItemID(name+"Screwdriver");
    Item.createItem(name+"Screwdriver", "Screwdriver from "+name, {name:name+"_screwdriver"}, {stack:1});
    CTR.addTool(id, data)
    ATMat.screwdrivers.push({id:id, mat:name, s:'s'})
}
}

Recipes.ReplaceWithShaped = function(item, newRecipe, transcript, tool){
	Recipes.deleteRecipe(item)
	Recipes.addShaped(item, newRecipe, transcript, tool);
}

Recipes.ReplaceWithShapeless = function(item, newRecipe, transcript, tool){
	Recipes.deleteRecipe(item)
	Recipes.addShapeless(item, newRecipe, tool);
}

CreateRecipeWithTool = function(result, ing, tr, tool_arr){
        if(tool_arr.length==1){
        	for(var keys1 in tool_arr[0]){
        	    tr.push(tool_arr[0][keys1].s)
                tr.push(tool_arr[0][keys1].id)
                tr.push(-1)
                Recipes.addShaped(result, ing, tr, CTR.Tool)
            }
        }
        if(tool_arr.length==2){
        	for(var keys1 in tool_arr[0]){
        	    for(var keys2 in tool_arr[1]){
        	        tr.push(tool_arr[0][keys1].s)
                    tr.push(tool_arr[0][keys1].id)
                    tr.push(-1)
                    tr.push(tool_arr[1][keys2].s)
                    tr.push(tool_arr[1][keys2].id)
                    tr.push(-1)
                    Recipes.addShaped(result, ing, tr, CTR.Tool)
                }
            }
        }
}

ReplaceRecipeWithTool = function(result, ing, tr, tool_arr){
        if(tool_arr.length==1){
        	for(var keys1 in tool_arr[0]){
        	    tr.push(tool_arr[0][keys1].s)
                tr.push(tool_arr[0][keys1].id)
                tr.push(-1)
                Recipes.ReplaceWithShaped(result, ing, tr, CTR.Tool)
            }
        }
        if(tool_arr.length==2){
        	for(var keys1 in tool_arr[0]){
        	    for(var keys2 in tool_arr[1]){
        	        tr.push(tool_arr[0][keys1].s)
                    tr.push(tool_arr[0][keys1].id)
                    tr.push(-1)
                    tr.push(tool_arr[1][keys2].s)
                    tr.push(tool_arr[1][keys2].id)
                    tr.push(-1)
                    Recipes.ReplaceWithShaped(result, ing, tr, CTR.Tool)
                }
            }
        }
}

CreateShapelessRecipeWithTool = function(result, ing, tool){
    for(var keys in tool){
        for(var key in ing){  
            Recipes.addShapeless(result, [ing[key], {id:tool[keys].id, data:-1}], CTR.Tool)
        } 
    }
}

ReplaceShapelessRecipeWithTool = function(result, ing, tool){
    for(var keys in tool){
        for(var key in ing){  
            Recipes.ReplaceWithShapeless(result, [ing[key], {id:tool[keys].id, data:-1}], CTR.Tool)
        } 
    }
}

var MAPI = {multiblocks:[],
    Register(name, struc){
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
    //Game.message(m.x+", "+m.y+", "+m.z)
    //Game.message(m.data.MAPIact);
        for(var key in this.multiblocks){ 
            if(key==m.data.MAPIkey){
                if(m.data.MAPIact==false){
                    for(var side in this.multiblocks[key].struc){
                        //Game.message(side);
                        for(var keyi in this.multiblocks[key].struc[side]){ 
                            if(World.getBlockID(m.x+this.multiblocks[key].struc[side][keyi][0], m.y+this.multiblocks[key].struc[side][keyi][1], m.z+this.multiblocks[key].struc[side][keyi][2])==this.multiblocks[key].struc[side][keyi][3]){ 
                                m.data.MAPIbl++; 
                                //alert(m.data.MAPIbl);
                                if(m.data.MAPIbl == this.multiblocks[key].struc[side].length){ 
                                	//Game.message("Duck")
                                    m.data.MAPIact=true; 
                                    m.data.MAPIside=side;
                                    //return true
                                }
                            }else{
                            	//alert("break")
                                m.data.MAPIbl=0
                                break
                            }
                        } 
                    } 
                }else{
                    for(var keyi in this.multiblocks[key].struc[m.data.MAPIside]){ 
                        if(World.getBlockID(m.x+this.multiblocks[key].struc[m.data.MAPIside][keyi][0], m.y+this.multiblocks[key].struc[m.data.MAPIside][keyi][1], m.z+this.multiblocks[key].struc[m.data.MAPIside][keyi][2])==this.multiblocks[key].struc[m.data.MAPIside][keyi][3]){ 
                            m.data.MAPIbl++; 
                        }else{
                        	m.data.MAPIact=false;
                            //return false 
                        }
                        if(m.data.MAPIbl== this.multiblocks[key].struc[m.data.MAPIside].length){
                        	//Game.message("Deck")
                            //return true
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
                originalStruct[side].push([originalStruct[side-1][key][2], originalStruct[side-1][key][1], -originalStruct[side-1][key][0], originalStruct[side-1][key][3]])
            }
        }
    }
}; 


Callback.addCallback("PostLoaded", function(){
MAPI.Load();
})


var ATMech = {
	furnaceRecipes:[], 
	furnaceFuel:[],
FurnaceRecipe(obj){

    if(!obj.rS1){
        obj.rS1=[0, 0, 0];
    }
    if(!obj.rS2){
        obj.rS2=[0, 0, 0];
    }
   if(!obj.sS1){
        obj.sS1=[0, 0, 0];
    }
    if(!obj.sS2){
        obj.sS2=[0, 0, 0];
    }    
    this.furnaceRecipes.push({sS1:obj.sS1, sS2:obj.sS2, rS1:obj.rS1, rS2:obj.rS2, long:obj.long, temp:obj.temp});
    this.furnaceRecipes.push({sS1:obj.sS2, sS2:obj.sS1, rS1:obj.rS1, rS2:obj.rS2, long:obj.long, temp:obj.temp}); 
}, 
Fuel(obj){
   this.furnaceFuel.push(obj);
}
};


var ATGen = {
    StandartOreDeposite(id, data, size, minY, maxY, pr, count, chance){
        return Callback.addCallback("GenerateChunkUnderground", function(chunkX, chunkZ){
            if(rollPercentage(diameter)){
                    //Game.message(pr+", "+Math.floor(Math.random()*100));
                    for(var i = 0; i<count; i++){
	                    var coords = GenerationUtils.randomCoords(chunkX, chunkZ, minY, maxY);
	                    GenerationUtils.generateOre(coords.x, coords.y, coords.z, id, data, size, false);
                }
            }
        });
    },
    genBreed(id, data, diameter, chance, minY, maxY, tiles, ores){
    	return Callback.addCallback("GenerateChunkUnderground", function(chunkX, chunkZ){
    	    if(rollPercentage(chance)){
    	      //Game.message(diameter)
        	   var coords = GenerationUtils.randomCoords(chunkX, chunkZ, minY, maxY);
                for(var x = -diameter; x < diameter; x++){
                    for(var y = -diameter; y < diameter; y++) {
                        for(var z = -diameter; z < diameter; z++){
                           if((x * x) + (y * y) + (z * z) <= (diameter * diameter)){
                               ATGen.setOre(x+coords.x, y+coords.y, z+coords.z, id, data, tiles);
                           }
                       }
                    }
                }
                var key 
                key = random(0, ores.length-1)
                ATGen.LargeOreDepositeTemplate(coords.x, coords.y+diameter/4, coords.z, ores[key][0], ores[key][1], ores[key][2], ores[key][3], {x:diameter*2, z:diameter*2}, 20, [id])
                key = random(0, ores.length-1)
                ATGen.LargeOreDepositeTemplate(coords.x, coords.y+diameter/2, coords.z, ores[key][0], ores[key][1], ores[key][2], ores[key][3], {x:diameter*2, z:diameter*2}, 20, [id])
                key = random(0, ores.length-1)
                ATGen.LargeOreDepositeTemplate(coords.x, coords.y, coords.z, ores[key][0], ores[key][1], ores[key][2], ores[key][3], {x:diameter*2, z:diameter*2}, 20, [id])
                key = random(0, ores.length-1)
                ATGen.LargeOreDepositeTemplate(coords.x, coords.y-diameter/2, coords.z, ores[key][0], ores[key][1], ores[key][2], ores[key][3], {x:diameter*2, z:diameter*2}, 20, [id])
                key = random(0, ores.length-1)
                ATGen.LargeOreDepositeTemplate(coords.x, coords.y-diameter/4, coords.z, ores[key][0], ores[key][1], ores[key][2], ores[key][3], {x:diameter*2, z:diameter*2}, 20, [id])
            }
        })
    },
    LargeOreDeposite(id1, id2, id3, id4, chance, tiles, minY, maxY, world, size, density, count){
    	this.ores++
        return Callback.addCallback(world, function(chunkX, chunkZ){
        	for(var i = 0; i<count; i++){
            	if(rollPercentage(chance)){
                	var coords = GenerationUtils.randomCoords(chunkX, chunkZ, minY, maxY);
                    ATGen.LargeOreDepositeTemplate(coords.x, coords.y, coords.z, id1, id2, id3, id4, size, density, tiles)
                }
            }               
        })
    },
    setOre(x, y, z, id, data, tile) {
       //alert(id)
        if(tile == -1 && World.getBlockID(x, y, z) != 0 && World.getBlockID(x, y, z) != 8 && World.getBlockID(x, y, z) != 9 && World.getBlockID(x, y, z) != 10 && World.getBlockID(x, y, z) != 11){
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
    LargeOreDepositeTemplate(x, y, z, id1, id2, id3, id4, size, density, tiles){
            var rand1 = 0.5 + Math.random()
            var rand2 = 5 + Math.random() * 5
            var rand3 = 0.5 + Math.random()
            var rand4 = Math.random() * 6
            
    for (var xx = -size.x; xx <= size.x; xx++) {
                for (var yy = -3; yy < 4; yy++) {
                    for (var zz = -size.z; zz <= size.z; zz++) {
                        if (Math.sqrt(xx * xx * rand1 + yy * yy * rand2 + zz * zz * rand3) < 6 + rand4 && rollPercentage(density)) {
                        	//alert("gen")
                            if (yy == 1) {
                                if (Math.random() < 1 / 7) {
                                    ATGen.setOre(x + xx, y + yy, z + zz, id4, 0, tiles)
                                } else {
                                    if (Math.random() < 1 / 2) {
                                        ATGen.setOre(x + xx, y + yy, z + zz, id2, 0, tiles);
                                    } else {
                                        ATGen.setOre(x + xx, y + yy, z + zz, id1, 0, tiles);
                                    }
                                }
                            }
                            if (yy == -1) {
                                if (Math.random() < 1 / 7) {
                                    ATGen.setOre(x + xx, y + yy, z + zz, id4, 0, tiles)
                                } else {
                                    if (Math.random() < 1 / 2) {
                                        ATGen.setOre(x + xx, y + yy, z + zz, id2, 0, tiles);
                                    } else {
                                        ATGen.setOre(x + xx, y + yy, z + zz, id3, 0, tiles);
                                    }
                                }
                            }
                            if (yy > 1) {
                                if (Math.random() < 1 / 7) {
                                    ATGen.setOre(x + xx, y + yy, z + zz, id4, 0, tiles)
                                } else {
                                    ATGen.setOre(x + xx, y + yy, z + zz, id1, 0, tiles);
                                }
                            }
                            if (yy < -1) {
                                 if (Math.random() < 1 / 7) {
                                    ATGen.setOre(x + xx, y + yy, z + zz, id4, 0, tiles)
                                } else {
                                    ATGen.setOre(x + xx, y + yy, z + zz, id3, 0, tiles);
                                }
                            }
                            if (yy == 0) {
                                if (Math.random() < 1 / 7) {
                                    ATGen.setOre(x + xx, y + yy, z + zz, id4, 0, tiles)
                                } else {
                                    ATGen.setOre(x + xx, y + yy, z + zz, id2, 0, tiles);
                                }
                            }
                        }
                    }
                }
            }
        }
}

var round = function(num, x){
	var multiplier = Math.pow(10, x)
	return Math.floor(num * multiplier) / multiplier
}

var ATMat = {
	hammers:[],
    files:[],
    mortars:[],
    cutters:[],
    wrenchs:[],
    screwdrivers:[],
    ingots:[],
    plates:[],
    dusts:[],
    smallDusts:[],
    nuggets:[],
    littleOres:[],
    gems:[],
    ores:[],
    OreRegister: function(name, materials, types, generateDrop){
        
    	var STONE = Block.createSpecialType({
	    base: 1,
	    destroytime: 3,
	    opaque: true,
	    solid: true,
        }, "ore");
        
        var RED_GRANITE = Block.createSpecialType({
	    base: 1,
	    destroytime: 4,
	    opaque: true,
	    solid: true,
        }, "ore");

        var BLACK_GRANITE = Block.createSpecialType({
	    base: 1,
	    destroytime: 5,
	    opaque: true,
	    solid: true,
        }, "ore")
        
        var NETHER = Block.createSpecialType({
	    base: 1,
	    destroytime: 2,
	    opaque: true,
	    solid: true,
        }, "ore");

        var END = Block.createSpecialType({
	    base: 1,
	    destroytime: 2,
	    opaque: true,
        }, "ore")
        
        var ores_types = [{t:STONE, name:"Stone", data:0, level:2}, {t:RED_GRANITE, name:"RedGranite", data:1, level:3}, {t:BLACK_GRANITE, name:"BlackGranite", data:2, level:4}, {t:NETHER, name:"Nether", data:3, level:1}, {t:END, name:"End", data:4, level:1}]
        
        for(var keys in types){
        	for(var key in ores_types){
        	    if(types[keys]==ores_types[key].name){
                    var id = IDRegistry.genBlockID("ore"+name+types[keys]);	
                    Block.createBlock("ore"+name+types[keys], [
	                {name: name+" ore", texture: [[name+"_ore", ores_types[key].data]], inCreative: true}
                    ], ores_types[key].t );
                    ToolAPI.registerBlockMaterial(id, "stone");
                    this.ores.push({id:id, mat:materials, type:name})
                    
                    if(generateDrop==true){                  	
                            //Game.message(keys)
                                    
                            Block.registerDropFunction(id, function(coords, id, data, level){
                            	var A = ATMat
                    	        var a = true
                            	    for(var h in A.hammers){
                                        if(Player.getCarriedItem().id==A.hammers[h].id && level>=ores_types[key].level){
                                	         //alert(keys)
                                             var drop = []
                                    
                                             for(var dr in materials){
                                    	         if(materials[dr][1]==0){
                                    	             for(var n in A.nuggets){
                                                         if(materials[dr][0]==A.nuggets[n].mat){
                                                         	drop.push([A.nuggets[n].id, 1, 0])
                                                             a = false
                                                             break
                                                         }
                                                     }
                                             	    for(var sd in A.smallDusts){
                                                         if(materials[dr][0]==A.smallDusts[sd].mat&&a==true){
                                                             drop.push([A.smallDusts[sd].id, 1, 0]) 
                                                             break
                                                         }
                                                     }                                            
                                                 } 
                                                 a = true
                                                 if(materials[dr][1]==1){
                                                     for(var n in A.nuggets){ 
                                                         if(materials[dr][0]==A.nuggets[n].mat){
                                                             drop.push([A.nuggets[n].id, 5, 0])
                                                             a = false
                                                             break                                                
                                                         }
                                                     }
                                             	    for(var sd in A.smallDusts){
                                                         if(materials[dr][0]==A.smallDusts[sd].mat&&a==true){
                                                             drop.push([A.smallDusts[sd].id, 5, 0]) 
                                                             break
                                                         }
                                                     }                                            
                                                 }
                                                 a = true
                                                 if(materials[dr][1]==2){                             
                                                 	for(var lo in A.littleOres){                                       
                                                         if(materials[dr][0]==A.littleOres[lo].mat){
                                                         	drop.push([A.littleOres[lo].id, 1])
                                                             a = false
                                                             break                    
                                                         }
                                                     }
                                                     for(var d in A.dusts){
                                                         if(materials[dr][0]==A.dusts[d].mat&&a==true){
                                                         	drop.push([A.dusts[d].id, 1])
                                                             break
                                                         }
                                                     }                                                
                                                 }
                                             }
                                             //alert(drop.length)
                                             return drop
                                         }                                        
                                     }
                                     if(level>=ores_types[key].level){
                                          return [[id, 1, data]]
                                      }
                                     return []                                    
                                  })
                              }
                }
            }
        }
    },
	MaterialRegister: function(name, obj, obj1){
		var it = {}
		if(obj1){
			it.temp = obj1.temp
            it.long = obj1.long
        }
		if(obj.isDust==true){
			it.dust = IDRegistry.genItemID("dust"+name);
            Item.createItem("dust"+name, name+" dust", {name:name+"_dust"});
            this.dusts.push({mat:name, id:it.dust})
	    }
	    if(obj.isIngot==true){
			it.ingot = IDRegistry.genItemID("ingot"+name);
            Item.createItem("ingot"+name, name+" ingot", {name:name+"_ingot"});
            this.ingots.push({mat:name, id:it.ingot})
	    }
	    if(obj.isPlate==true){
			it.plate = IDRegistry.genItemID("plate"+name);
            Item.createItem("plate"+name, name+" plate", {name:name+"_plate"});
            this.plates.push({mat:name, id:it.plate})
	    }
	    if(obj.isNugget==true){
			it.nugget = IDRegistry.genItemID("nugget"+name);
            Item.createItem("nugget"+name, name+" nugget", {name:name+"_nugget"});
            this.nuggets.push({mat:name, id:it.nugget})
	    }
	    if(obj.isSmallDust==true){
			it.smallDust = IDRegistry.genItemID("smallDust"+name);
            Item.createItem("smallDust"+name, name+" small dust", {name:name+"_small_dust"});
            this.smallDusts.push({mat:name, id:it.smallDust})
	    }
	    if(obj.isBolt==true){
			it.bolt = IDRegistry.genItemID("bolt"+name);
            Item.createItem("bolt"+name, name+" bolt", {name:name+"_bolt"});
	    }
	    if(obj.isLittleOre==true){
			it.littleOre = IDRegistry.genItemID("little"+name);
            Item.createItem("little"+name, "Little "+name, {name:"little_"+name+"_ore"});
            this.littleOres.push({mat:name, id:it.littleOre})
	    }
	    if(obj.isModule==true){
			it.module = IDRegistry.genItemID("module"+name);
            Item.createItem("module"+name, name+" module", {name:name+"_module"});
	    }
	    if(obj.isGem==true){
			it.gem = IDRegistry.genItemID("gem"+name);
            Item.createItem("gem"+name, name+" gem", {name:name+"_gem"});
            this.gems.push({mat:name, id:it.gem})
	    }
	    if(obj.generateRecipes==true){
			this.GenerateRecipes(it)
	    }
	},
	GenerateRecipes: function(obj) {
		if(obj.dust && obj.smallDust){
			Recipes.addShapeless({id:obj.smallDust, count:9, data:0}, [ {id:obj.dust, data:0}]);
			Recipes.addShaped({id:obj.dust, count:1, data:0}, ["aaa", "aaa", "aaa"], ['a', obj.smallDust, 0]);
            if(obj.nugget){
            	ATMech.FurnaceRecipe ({sS1:[obj.smallDust, 1, 0], rS1:[obj.nugget, 1, 0], long:round(obj.long/9, 1), temp:obj.temp});
                if(obj.smallDust){
        	        CreateShapelessRecipeWithTool({id:obj.smallDust, count:1, data:0}, [{id:obj.nugget, data:0}], this.mortars);
                }
                if(obj.temp <= 600){
                	Recipes.addFurnace(obj.dust, obj.ingot, 0);
                }
                if(obj.ingot){
        	        CreateShapelessRecipeWithTool({id:obj.nugget, count:9, data:0}, [{id:obj.ingot, data:0}], this.hammers);
                    ATMech.FurnaceRecipe ({sS1:[obj.nugget, 9, 0], rS1:[obj.ingot, 1, 0], long:round(obj.long, 1), temp:obj.temp});
                }
                if(obj.gem){
                	ATMech.FurnaceRecipe ({sS1:[obj.dust, 1, 0], rS1:[obj.gem, 1, 0], long:round(obj.long, 1), temp:obj.temp});
                }
            }
            if(obj.ingot){
            	ATMech.FurnaceRecipe ({sS1:[obj.dust, 1, 0], rS1:[obj.ingot, 1, 0], long:obj.long, temp:obj.temp});
                if(obj.temp <= 600){
                	Recipes.addFurnace(obj.dust, obj.ingot, 0);
                }
                if(obj.plate){
                    CreateRecipeWithTool({id:obj.plate, count:1, data:0}, ["h", "a", "a"], ['a', obj.ingot, 0], [this.hammers])
                }
            }
        }
        if(obj.littleOre && obj.smallDust){
        	CreateShapelessRecipeWithTool({id:obj.smallDust, count:8, data:0}, [{id:obj.littleOre, data:0}], this.mortars);
            if(obj.nugget){
            	ATMech.FurnaceRecipe ({sS1:[obj.littleOre, 1, 0], rS1:[obj.nugget, 7, 0], rS2:[obj.smallDustStone, 2, 0], long:obj.long, temp:obj.temp});
            }
        }
        if(obj.bolt && obj.nugget){
            CreateShapelessRecipeWithTool({id:obj.bolt, count:1, data:0}, [{id:obj.nugget, data:0}], this.files)
        }
        if(obj.module){
        	    if(obj.bolt){
        	        CreateRecipeWithTool({id:obj.module, count:1, data:0}, ["bpb", "psp", "bpb"], ['b', obj.bolt, 0, 'p', obj.plate, 0], [this.screwdrivers]);
                }else{
                	CreateRecipeWithTool({id:obj.module, count:1, data:0}, ["bpb", "psp", "bpb"], ['b', ItemID.boltSteel, 0, 'p', obj.plate, 0], [this.screwdrivers]);
                }
        } 
	}
}

registerAPIUnit("MAPI", MAPI);
registerAPIUnit("ATMech", ATMech);
registerAPIUnit("ATGen", ATGen);
registerAPIUnit("ATMat", ATMat);
registerAPIUnit("CTR", CTR);
registerAPIUnit("CreateRecipeWithTool", CreateRecipeWithTool)
registerAPIUnit("ReplaceRecipeWithTool", ReplaceRecipeWithTool)
registerAPIUnit("CreateShapelessRecipeWithTool", CreateShapelessRecipeWithTool) 
registerAPIUnit("ReplaceShapelessRecipeWithTool", ReplaceShapelessRecipeWithTool) 