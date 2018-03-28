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

