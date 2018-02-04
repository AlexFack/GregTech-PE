//Author - Alex Fack
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
    }
   else {
    api.decreaseFieldSlot(i);
   }
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
}
};



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
    StandartOreDeposite(id, data, size, minY, maxY, pr, count){
        return Callback.addCallback("GenerateChunkUnderground", function(chunkX, chunkZ){
            if(pr>=Math.floor(Math.random()*100)){
                    //Game.message(pr+", "+Math.floor(Math.random()*100));
                    for(var i = 0; i<count; i++){
	                    var coords = GenerationUtils.randomCoords(chunkX, chunkZ, minY, maxY);
	                    GenerationUtils.generateOre(coords.x, coords.y, coords.z, id, data, size, false);
                }
            }
        });
    }, 
}

var round = function(num, x){
	var multiplier = Math.pow(10, x)
	return Math.floor(num * multiplier) / multiplier
}

var ATMat = {
	hummers:[],
    tungstensteels:[],
    mortars:[],
    cutters:[],
	MaterialRegister: function(name, obj, obj1){
		var it = {}
		if(obj1){
			it.temp = obj1.temp
            it.long = obj1.long
        }
		if(obj.isDust==true){
			it.dust = IDRegistry.genItemID("dust"+name);
            Item.createItem("dust"+name, name+" dust", {name:name+"_dust"});
	    }
	    if(obj.isIngot==true){
			it.ingot = IDRegistry.genItemID("ingot"+name);
            Item.createItem("ingot"+name, name+" ingot", {name:name+"_ingot"});
	    }
	    if(obj.isPlate==true){
			it.plate = IDRegistry.genItemID("plate"+name);
            Item.createItem("plate"+name, name+" plate", {name:name+"_plate"});
	    }
	    if(obj.isNugget==true){
			it.nugget = IDRegistry.genItemID("nugget"+name);
            Item.createItem("nugget"+name, name+" nugget", {name:name+"_nugget"});
	    }
	    if(obj.isSmallDust==true){
			it.smallDust = IDRegistry.genItemID("smallDust"+name);
            Item.createItem("smallDust"+name, name+" small dust", {name:name+"_small_dust"});
	    }
	    if(obj.isBolt==true){
			it.bolt = IDRegistry.genItemID("bolt"+name);
            Item.createItem("bolt"+name, name+" bolt", {name:name+"_bolt"});
	    }
	    if(obj.isLittleOre==true){
			it.littleOre = IDRegistry.genItemID("little"+name);
            Item.createItem("little"+name, name+" ore", {name:"little_"+name+"_ore"});
	    }
	    if(obj.isModule==true){
			it.module = IDRegistry.genItemID("module"+name);
            Item.createItem("module"+name, name+" module", {name:name+"_module"});
	    }
	    if(obj.generateRecipes==true){
			this.GenerateRecipes(it)
	    }
	    if(obj.isOre==true){
	        
        }
	},
	GenerateRecipes: function(obj) {
		if(obj.dust && obj.smallDust){
			Recipes.addShapeless({id:obj.smallDust, count:9, data:0}, [ {id:obj.dust, data:0}]);
			Recipes.addShaped({id:obj.dust, count:1, data:0}, [
	            "aaa",
	            "aaa",
	            "aaa"], 
                ['a', obj.smallDust, 0]);
            if(obj.nugget){
            	ATMech.FurnaceRecipe ({sS1:[obj.smallDust, 1, 0], rS1:[obj.nugget, 1, 0], long:round(obj.long/9, 1), temp:obj.temp});
            }
            if(obj.ingot){
            	ATMech.FurnaceRecipe ({sS1:[obj.dust, 1, 0], rS1:[obj.ingot, 1, 0], long:obj.long, temp:obj.temp});
            }
        }
        if(obj.ingot && obj.plate){
        	for(var key in this.hummers){
                Recipes.addShapeless({id:obj.plate, count:1, data:0}, [ {id:obj.ingot, data:0}, {id:this.hummers[key], data:-1} ], CTR.Tool);
            }
        }
        if(obj.littleOre && obj.smallDust){
        	for(var key in this.mortars){
        	    Recipes.addShapeless({id:obj.smallDust, count:9, data:0}, [ {id:obj.littleOre, data:0}, {id:this.mortars[key], data:-1} ], CTR.Tool);
            }
            if(obj.nugget){
            	ATMech.FurnaceRecipe ({sS1:[obj.littleOre, 1, 0], rS1:[obj.nugget, 7, 0], rS2:[obj.smallDustStone, 2, 0], long:obj.long, temp:obj.temp});
            }
        }
        if(obj.bolt && obj.ingot){
        	for(var key in this.tungstensteels){
        	    Recipes.addShapeless({id:obj.bolt, count:9, data:0}, [ {id:obj.ingot, data:0}, {id:this.tungstensteels[key], data:-1} ], CTR.Tool);
                if(obj.nugget){
                	Recipes.addShapeless({id:obj.bolt, count:1, data:0}, [ {id:obj.nugget, data:0}, {id:this.tungstensteels[key], data:-1} ], CTR.Tool);
                }
            }
        }
        if(obj.module){
        	for(var key in this.hummers){
        	    if(obj.bolt){
        	        Recipes.addShaped({id:obj.module, count:1, data:0}, [
	                    "bpb",
	                    "ptp",
	                    "bpb"], 
                        ['b', obj.bolt, 0, 'p', obj.plate, 0, 't', this.hummers[key], -1], CTR.Tool);
                }else{
                	Recipes.addShaped({id:obj.module, count:1, data:0}, [
	                    "bpb",
	                    "ptp",
	                    "bpb"], 
                        ['b', ItemID.boltSteel, 0, 'p', obj.plate, 0, 't', this.hummers[key], -1], CTR.Tool);
                }
            }
        } 
        if(obj.nugget && obj.ingot){
        	for(var key in this.tungstensteels){
            	Recipes.addShapeless({id:obj.nugget, count:9, data:0}, [ {id:obj.ingot, data:0}, {id:this.tungstensteels[key], data:-1} ], CTR.Tool);
            }
            Recipes.addShaped({id:obj.ingot, count:1, data:0}, [
	            "aaa",
	            "aaa",
	            "aaa"], 
                ['a', obj.nugget, 0]);
        }
	}
}

registerAPIUnit("MAPI", MAPI);
registerAPIUnit("ATMech", ATMech);
registerAPIUnit("ATGen", ATGen);
registerAPIUnit("ATMat", ATMat);
registerAPIUnit("CTR", CTR);