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