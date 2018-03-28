var GT_MultiBlock = {multiblocks:[],
   strongIf(a, m){
	   let rt = null
	   if(a[3] == -1){
		   return World.getBlockID(m.x+a[0], m.y+a[1], m.z+a[2]) != World.getBlockID(m.x, m.y, m.z);
	   }
	   for(let keys in a[3]){
		   if(rt==null){
		       rt = World.getBlockID(m.x+a[0], m.y+a[1], m.z+a[2]) == a[3][keys];
		   }else{
		       rt = rt || World.getBlockID(m.x+a[0], m.y+a[1], m.z+a[2]) == a[3][keys];
	       }
	   }
	   return rt;
   },
    Register(name, struc){
    	name._tick = name.tick
        name.tick = function(){
        	//if(World.getWorldTime()%20==0){
                GT_MultiBlock.Corpus(this);
             //}
            this._tick()
        }    
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
        for(var key in this.multiblocks){ 
            if(key==m.data.MAPIkey){
                if(m.data.MAPIact!=true){
                    for(var side in this.multiblocks[key].struc){
                    	m.data.MAPIbl = 0;
                        for(var keyi in this.multiblocks[key].struc[side]){ 
                            if(this.strongIf(this.multiblocks[key].struc[side][keyi], m)){ 
                                m.data.MAPIbl++; 
                                if(m.data.MAPIbl == this.multiblocks[key].struc[side].length){                              	
                                    m.data.MAPIact=true; 
                                    m.data.MAPIside=side;
                                }
                            }else{
                                break;
                            }
                        } 
                    } 
                }else{
                	m.data.MAPIbl = 0
                    for(var keyi in this.multiblocks[key].struc[m.data.MAPIside]){ 
                        if(this.strongIf(this.multiblocks[key].struc[m.data.MAPIside][keyi], m)){ 
                            m.data.MAPIbl++; 
                            if(m.data.MAPIbl == this.multiblocks[key].struc[m.data.MAPIside].length){ 
                                m.data.MAPIact = true;
                                return;
                            }
                        }else{
                        	m.data.MAPIact=false;
                            return;
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
                originalStruct[side].push([originalStruct[side-1][key][2], originalStruct[side-1][key][1], -originalStruct[side-1][key][0], originalStruct[side-1][key][3]]);
            }
        }
    }
}; 


Callback.addCallback("PostLoaded", function(){
   GT_MultiBlock.Load();
});