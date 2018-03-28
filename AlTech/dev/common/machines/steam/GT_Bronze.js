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