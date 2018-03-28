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