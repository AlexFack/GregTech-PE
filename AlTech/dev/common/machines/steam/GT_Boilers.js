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
