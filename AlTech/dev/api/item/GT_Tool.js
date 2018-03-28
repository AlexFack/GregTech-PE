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