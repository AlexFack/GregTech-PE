var GT_SteamMachine = {
	machineIDs: {},

	isMachine: function(id){
		return this.machineIDs[id];
	},

	register: function(id, Prototype){
		ICRender.getGroup("gt-fuel").add(id, -1);
		this.machineIDs[id] = true;
		if (Prototype.defaultValues){
			Prototype.defaultValues.steam = 0;			
			Prototype.defaultValues.isActive = false;
			Prototype.defaultValues.SoundMachine = null;
		}
		else{
			Prototype.defaultValues = {
				steam: 0,
				isActive: false,
                SoundMachine: null      		
			};
		}
		if(!Prototype.getEnergyStorage){
			Prototype.getEnergyStorage = function(){
				return 0;
			};
		}
		
		Prototype.click = function(id, count, data, coords){
			if(id == ItemID.cellSteam){
				this.liquidStorage.addLiquid("steam", 1);
				Player.setCarriedItem(ItemID.cellEmpty, 1, 0);
				return true;
			}
			if(id == ItemID.cellEmpty){
				if(this.liquidStorage.getAmount("steam") >= 1){
					Player.setCarriedItem(ItemID.cellSteam, 1, 0);
					this.liquidStorage.addLiquid("steam", -1);
					return true
				}
			}
		}				
		ToolAPI.registerBlockMaterial(id, "stone");
		Block.setDestroyTime(id, 3);
		TileEntity.registerPrototype(id, Prototype);
		EnergyTileRegistry.addEnergyTypeForId(id, ST);
	},

	getMachineDrop: function(coords, blockID, level, standartDrop){
		var item = Player.getCarriedItem();
		if(item.id==ItemID.wrench){
			ToolAPI.breakCarriedTool(10);
			World.setBlock(coords.x, coords.y, coords.z, 0);
			if(Math.random() < 0.8){return [[blockID, 1, 0]];}
			return [[standartDrop || blockID, 1, 0]];
		}
		if(item.id==ItemID.electricWrench && item.data + 500 <= Item.getMaxDamage(item.id)){
			Player.setCarriedItem(item.id, 1, item.data + 500);
			World.setBlock(coords.x, coords.y, coords.z, 0);
			return [[blockID, 1, 0]];
		}
		if(level > 0){
			return [[standartDrop || blockID, 1, 0]];
		}
		return [];
	},
	initModel: function(){
		if(this.data.isActive){
			var block = World.getBlock(this.x, this.y, this.z);
			ICore.Render.mapAtCoords(this.x, this.y, this.z, block.id, block.data);
		}
	},
	
	activateMachine: function(){
		if(!this.data.isActive){
			this.data.isActive = true;
			var block = World.getBlock(this.x, this.y, this.z);
			ICore.Render.mapAtCoords(this.x, this.y, this.z, block.id, block.data);
			if(this.data.SoundMachine != null){
			PlayBlockSound(this, this.data.SoundMachine, true, 24);
			}
		}
	},
	
	deactivateMachine: function(){
		if(this.data.isActive){
			this.data.isActive = false;
			BlockRenderer.unmapAtCoords(this.x, this.y, this.z);
			if(this.data.SoundMachine != null){
			StopBlockSound(this);
			}
		}
	}
}