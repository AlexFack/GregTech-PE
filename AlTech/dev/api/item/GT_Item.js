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