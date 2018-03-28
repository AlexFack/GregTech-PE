let ores_types = [{name:"Stone", data:0, level:1}, {name:"Nether", data:3, level:1}, {name:"End", data:4, level:1}]
let genChanceForBreed = Config.genChanceForBreed
let limit = Config.limit
let chunkNumForGen = Config.chunkNumForGen
let GT_Worldgen = {
	strongIf(coords){
		return World.getBlockID(coords.x, coords.y, coords.z) != 0 && World.getBlockID(coords.x, coords.y, coords.z) != 8 && World.getBlockID(coords.x, coords.y, coords.z) != 9 && World.getBlockID(coords.x, coords.y, coords.z) != 10 && World.getBlockID(coords.x, coords.y, coords.z) != 11 && World.getBlockID(coords.x, coords.y, coords.z) != 7 && World.getBlockID(coords.x, coords.y, coords.z) != 2
	},
	chunkNumber(chunkX, chunkZ, n){
		return chunkX % n == 0 && chunkZ % n == 0
	},
	oresEarth:[],
	oresNether:[],
	oresEnd:[],
	breeds:[],
	oresSmall:[],
	
    SmallOreDeposite(){
        //var tiles = [0]
        return Callback.addCallback("GenerateChunk", function(chunkX, chunkZ){
        	var minY = Config.smallOresMinY
            var maxY = Config.smallOresMaxY
            var count = Config.smallOresCount
            var tiles = Config.smallOresTiles
            
            for(var c = 0; c<count; c++){
            	//alert(c)
            	var key = random(0, GT_Worldgen.oresSmall.length-1)
                for(var i = maxY; i > minY; i--){
                	var coords = GenerationUtils.randomCoords(chunkX, chunkZ, minY, i);
                	for(var keys in tiles){    	
                        if(World.getBlockID(coords.x, coords.y, coords.y) == tiles[keys]){
                        	//alert(c)
                            GT_Worldgen.setOre(coords.x, coords.y, coords.z, GT_Worldgen.oresSmall[key], 0, tiles); 
                            i = minY
                            break
                        }
                    }
                }
            }
        });
    },
    GenBreed(){
    	return Callback.addCallback("GenerateChunk", function(chunkX, chunkZ){
    	    var key = random(0, GT_Worldgen.breeds.length-1)
            var arr = GT_Worldgen.breeds[key]
            
    	    if(rollPercentage(arr.chance)){
            	for(var i = arr.maxY; i > arr.minY; i--){
            	    //alert(i)
            	   var coords = GenerationUtils.randomCoords(chunkX, chunkZ, arr.minY, i);
                   if(arr.tiles == -1 && GT_Worldgen.strongIf(coords)){
                   	//alert("go")
                       var r = arr.diameter
                         for(var x = -r; x < r; x++){
                             for(var y = -r; y < r; y++) {
                                 for(var z = -r; z < r; z++){
                                    if((x * x) + (y * y) + (z * z) <= (r * r)){
                                       GT_Worldgen.setOre(x+coords.x, y+coords.y, z+coords.z, arr.id, arr.data, arr.tiles);
                                       //i = arr.maxY
                                   }
                               }
                           }
                       }
                    }else if(arr.tiles != -1){
                    	for(var keys in arr.tiles){    	
                            if(World.getBlockID(coords.x, coords.y, coords.z) == arr.tiles[keys]){
                               //alert("go")
                               var r = arr.diameter
                                 for(var x = -r; x < r; x++){
                                     for(var y = -r; y < r; y++) {
                                         for(var z = -r; z < r; z++){
                                            if((x * x) + (y * y) + (z * z) <= (r * r)){
                                               GT_Worldgen.setOre(x+coords.x, y+coords.y, z+coords.z, arr.id, arr.data, arr.tiles);
                                               i = arr.minY
                                           }
                                       }
                                   }
                               }
                            }
                        }
                    }
                var chance = 0
                var oresBreed = eval("GT_Worldgen.ores"+arr.name)
                for(var keys in oresBreed){
                	chance+=oresBreed[keys].chance
                }
                chance = round(genChanceForBreed / (chance / oresBreed.length) * 100, 1)
                if(rollPercentage(chance)){
                    eval("GT_Worldgen.GenLargeOreDepositeOn"+arr.name+"(arr, coords)")
                    return
                    }
                }
            }
        })
    },
    GenLargeOreDepositeOnEarth(){
        return Callback.addCallback("GenerateChunk", function(chunkX, chunkZ){      
            var arr
            var key
            var chance = Config.chanceMultiplier
            if(GT_Worldgen.chunkNumber(chunkX, chunkZ, chunkNumForGen)){
            	alert(chunkX+", "+chunkZ)
            	for(var l = 0; l < limit; l++){
            	    chance+=Config.chanceMultiplier
                     key = random(0, GT_Worldgen.oresEarth.length-1)
                     arr = GT_Worldgen.oresEarth[key]
                     //alert(arr.chance * chance)
                	if(rollPercentage(arr.chance * chance)){
                	    //alert(arr.chance)
                	    for(var a = 0; a<arr.count; a++){
                    	    for(var i = arr.maxY; i > arr.minY; i--){                   	        
                                //alert(i+", "+arr.minY)
                                
                                if(i==arr.minY+1){
                                	//alert("return")
                    	            return
                                }
                            	var coords = GenerationUtils.randomCoords(chunkX, chunkZ, arr.minY, i);
                                for(var keys in arr.tiles){                             
                                    if(World.getBlockID(coords.x, coords.y, coords.z) == arr.tiles[keys]){
                                       GT_Worldgen.LargeOreDepositeTemplate(coords.x, coords.y, coords.z, arr.ids, arr.size, arr.density, arr.tiles)
                                       i = arr.minY
                                       if(a == arr.count - 1){
                                           return
                                        }
                                       break                  
                                   }/*else if(i == arr.minY){                                
                                   	//alert(l)
                                       key = random(0, GT_Worldgen.oresEarth.length-1)
                                       arr = GT_Worldgen.oresEarth[key]
                                       //alert(i)
                                       if(rollPercentage(arr.chance)){
                                           a = 0
                                           break
                                       }else{
                                           //alert("return")
                                           return
                                       }
                                   }*/
                               }
                           }
                        }
                    }
                }
            }          
        })
    },
    GenLargeOreDepositeOnNether(){
        return Callback.addCallback("GenerateNetherChunk", function(chunkX, chunkZ){
        	var arr
            var key
            var chance = Config.chanceMultiplier
            if(GT_Worldgen.chunkNumber(chunkX, chunkZ, chunkNumForGen)){
            	for(var l = 0; l < limit; l++){
            	    chance+=Config.chanceMultiplier
                	 key = random(0, GT_Worldgen.oresNether.length-1)
                     arr = GT_Worldgen.oresNether[key]
                	if(rollPercentage(arr.chance * chance)){
                	    for(var a = 0; a<arr.count; a++){
                       	 for(var i = arr.maxY; i > arr.minY; i--){
                       	    if(i==arr.minY+1){
                                	//alert("return")
                    	            return
                                }
                            	var coords = GenerationUtils.randomCoords(chunkX, chunkZ, arr.minY, i);
                                for(var keys in arr.tiles){
                                    if(World.getBlockID(coords.x, coords.y, coords.z) == arr.tiles[keys]){
                                       GT_Worldgen.LargeOreDepositeTemplate(coords.x, coords.y, coords.z, arr.ids, arr.size, arr.density, arr.tiles)
                                       if(a == arr.count - 1){
                                           return
                                       }
                                       break      
                                   }/*else if(i == arr.minY){
                                       key = random(0, GT_Worldgen.oresNether.length-1)
                                       arr = GT_Worldgen.oresNether[key]
                                       //alert(i)
                                       if(rollPercentage(GT_Worldgen.oresNether[key].chance)){
                                           a = 0
                                           break
                                       }else{
                                           //alert("return")
                                           return
                                       }
                                   }*/
                               }
                           }
                       }
                    }
                }
            }               
        })
    },
    GenLargeOreDepositeOnEnd(){
        return Callback.addCallback("GenerateEndChunk", function(chunkX, chunkZ){
        	var arr
            var key
            var chance = Config.chanceMultiplier
            if(GT_Worldgen.chunkNumber(chunkX, chunkZ, chunkNumForGen)){
            	for(var l = 0; l < limit; l++){
            	    chance+=Config.chanceMultiplier
                   key = random(0, GT_Worldgen.oresEnd.length-1)
              	 arr = GT_Worldgen.oresEnd[key]
               	if(rollPercentage(arr.chance * chance)){
              	    for(var a = 0; a<arr.count; a++){
                  	    for(var i = arr.maxY; i > arr.minY; i--){    
                              if(i==arr.minY+1){
                                 //alert("return")
                    	          return
                              }              	        
                          	var coords = GenerationUtils.randomCoords(chunkX, chunkZ, arr.minY, i);
                              for(var keys in arr.tiles){  
                              	if(i==arr.minY){
                    	                return
                                    }
                                  if(World.getBlockID(coords.x, coords.y, coords.z) == arr.tiles[keys]){
                                      GT_Worldgen.LargeOreDepositeTemplate(coords.x, coords.y, coords.z, arr.ids, arr.size, arr.density, arr.tiles)
                                      if(a == arr.count - 1){
                                          return
                                      }
                                      break
                                  }/*else if(i == arr.minY){
                                      key = random(0, GT_Worldgen.oresEnd.length-1)
                                      arr = GT_Worldgen.oresEnd[key]
                                      //alert(i)
                                      if(rollPercentage(GT_Worldgen.oresEnd[key].chance)){
                                         a = 0
                                         break
                                      }else{
                                         //alert("return")
                                         return
                                      }
                                  }*/
                              }
                          }
                      }
                   }
                }
            }               
        })
    },
    RegisterLargeOreDepositeOnEarth(ids, chance, tiles, minY, maxY, size, density, count){
    	this.oresEarth.push({ids:ids, chance:chance, tiles:tiles, minY:minY, maxY:maxY, size:size, density:density, count:count})
    },
    RegisterLargeOreDepositeOnNether(ids, chance, tiles, minY, maxY, size, density, count){
    	this.oresNether.push({ids:ids, chance:chance, tiles:tiles, minY:minY, maxY:maxY, size:size, density:density, count:count})
    },
    RegisterLargeOreDepositeOnEnd(ids, chance, tiles, minY, maxY, size, density, count){
    	this.oresEnd.push({ids:ids, chance:chance, tiles:tiles, minY:minY, maxY:maxY, size:size, density:density, count:count})
    },
    RegisterBreed(id, data, diameter, chance, minY, maxY, tiles, world, name, tex, level){
    	this.breeds.push({id:id, data:data, diameter:diameter, chance:chance, minY:minY, maxY:maxY, tiles:tiles, world:world, name:name})
        //alert(lvl)
        ores_types.push({name:name, data:tex, level:level})
        eval("this.ores"+name+" = []")
        eval("this.RegisterLargeOreDepositeOn"+name+" = function(ids, chance, density){ this.ores"+name+".push({ids:ids, chance:chance, density:density}) }")
        eval("GT_Worldgen.GenLargeOreDepositeOn"+name+" = function(arr, coords){ var key = random(0, GT_Worldgen.ores"+name+".length-1); var ore = GT_Worldgen.ores"+name+"[key]; if(rollPercentage(ore.chance)){ return GT_Worldgen.LargeOreDepositeTemplate(coords.x, coords.y, coords.z, ore.ids, {x:arr.diameter*2, y:arr.diameter, z:arr.diameter*2}, ore.density, [arr.id])} }")
    },
    setOre(x, y, z, id, data, tile) {
       //alert(id)
        if(tile == -1 && this.strongIf({x:x, y:y, z:z})){
        	World.setBlock(x, y, z, id, data);
            //alert(-1)
        }else{
        	//alert(tile[0])
        	for(var keys in tile){    	
                 if(World.getBlockID(x, y, z) == tile[keys]){
                    World.setBlock(x, y, z, id, data);
                }
            }
        }
    },
    LargeOreDepositeTemplate(x, y, z, ids, size, density, tiles){
    	    var rand1 = 1.5
            var rand2 = 10
            var rand3 = 1.5
            var rand4 = 6
            var rx
            var ry = Math.floor(size.y/2)
            var rz
            if(rollPercentage(50)){
                rx = size.z
                rz = size.x
            }else{
            	rx = size.x
                rz = size.z
            }
            var n = Math.floor(size.y/ids.length) //2
            var code
            var chance
            var num 
            var id = []
            
            /*for(var key1 = 0; key1 < Math.floor(size.y / n); key1++){ // < 8 / 2 = 4
                id[key1] = []
                for(var key2 = 0; key2 < ids.length; key2++){ // ids.length = 4
                    num = key2 + key1
                	if(num < ids.length-1){
                        id[key1].push(ids[num])
                    }else{
                    	num = 0+key1
                    	id[key1].push(ids[num])
                    }
                }
            }*/
            
            for (var xx = -rx; xx <= rx; xx++) {
                for (var yy = -ry; yy < ry; yy++) { // 2
                    for (var zz = -rz; zz <= rz; zz++) {
                        if(yy % n == 0){
                        	//alert(yy)
                        	for(var a = 0; a < n; a++){
                        	    code = ""
                        	    if (Math.sqrt(xx * xx + yy * yy + zz * zz) < Math.floor((size.x + size.z) / 4) && rollPercentage(density)) {
                            	    for(var key = 0; key < ids.length; key++){
                            	        if(code == ""){
                            	            chance = Math.floor(ids.length-key-1)
                            	            code = code + "if (Math.random() < 1 / "+chance+") { GT_Worldgen.setOre(x + xx, y + yy - a, z + zz, ids[key], 0, tiles); }"
                                         }else{
                                         	chance = Math.floor(ids.length-key-1)
                                             code = code + "else if (Math.random() < 1 / "+chance+") { GT_Worldgen.setOre(x + xx, y + yy - a, z + zz, ids[key], 0, tiles); }"
                                         }  
                                         eval(code)
                                         //break
                                     }
                                 }      
                            }
                        }
                    }
                }
            }
    },
}

Callback.addCallback("PostLoaded", function(){
	GT_Worldgen.SmallOreDeposite();
	GT_Worldgen.GenBreed();
	GT_Worldgen.GenLargeOreDepositeOnEarth();
	GT_Worldgen.GenLargeOreDepositeOnNether();
	GT_Worldgen.GenLargeOreDepositeOnEnd();
})