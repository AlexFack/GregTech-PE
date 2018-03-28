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