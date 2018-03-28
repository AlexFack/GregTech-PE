ItemID.ingotIron = 265;
ItemID.ingotGold = 266;

function strongIfForTools(lvl, i){
	let gg = null;
	for(var a = 0; a<i; a++){
		if(gg==null){
			gg = "tool_arr["+a+"][keys"+(a+1)+"].lvl>=lvl";
		}else{
			gg = gg + " && tool_arr["+a+"][keys"+(a+1)+"].lvl>=lvl";
		}
	}
    return gg;
}

var GT_Recipe = {
	ReplaceWithShaped: function(item, newRecipe, transcript, tool){
	   Recipes.deleteRecipe(item);
	   if(!tool){
		   Recipes.addShaped(item, newRecipe, transcript);
	   }
	   Recipes.addShaped(item, newRecipe, transcript, tool);
    },
	ReplaceWithShapeless: function(item, newRecipe, tool){
	   Recipes.deleteRecipe(item);
	   if(!tool){
		   Recipes.addShapeless(item, newRecipe);
	   }
	   Recipes.addShapeless(item, newRecipe, tool);
    },
	CreateRecipeWithTool: function(result, ing, tr, tool_arr, lvl){
	   let code;
	   let i = 0;
	   code = "for(var key = 0; key<tool_arr.length; key++){    ";
	   for(var key = 0; key<tool_arr.length; key++){
		   code = code + "for(var keys"+(key+1)+" in tool_arr["+key+"]){    ";
		   i++;
	   }
	   code = code + "if("+strongIfForTools(lvl, i)+"){    ";
	   for(let a = 0; a<i; a++){
		   code = code + "tr.push(tool_arr["+a+"][keys"+(a+1)+"].Symbol);    ";
		   code = code + "tr.push(tool_arr["+a+"][keys"+(a+1)+"].id);    ";
		   code = code + "tr.push(-1);    "
	   }
	   code = code + "Recipes.addShaped(result, ing, tr, GT_Tool.Tool);    ";
	   for(let a = 0; a<i+2; a++){
		   code = code + "}    "
	   }
	eval(code);
   },

   ReplaceRecipeWithTool: function(result, ing, tr, tool_arr, lvl){
	   Recipes.deleteRecipe(result);
       let code;
	   let i = 0;
	   code = "for(var key = 0; key<tool_arr.length; key++){    "
	   for(var key = 0; key<tool_arr.length; key++){
		   code = code + "for(var keys"+(key+1)+" in tool_arr["+key+"]){    ";
		   i++;
	   }
	   code = code + "if("+strongIfForTools(lvl, i)+"){    ";
	   for(let a = 0; a<i; a++){
		   code = code + "tr.push(tool_arr["+a+"][keys"+(a+1)+"].Symbol);    ";
		   code = code + "tr.push(tool_arr["+a+"][keys"+(a+1)+"].id);    ";
		   code = code + "tr.push(-1);    ";
	   }
	   code = code + "Recipes.addShaped(result, ing, tr, GT_Tool.Tool);    "
	   for(let a = 0; a<i+2; a++){
		   code = code + "}    ";
	   }
	   eval(code);
   },
   CreateShapelessRecipeWithTool: function(result, ing, tool, lvl){
       for(var keys in tool){
           for(var key in ing){  
        	   if(tool[keys].lvl>=lvl){
                   Recipes.addShapeless(result, [ing[key], {id:tool[keys].id, data:-1}], GT_Tool.Tool)
               }
           } 
       }
   },

   ReplaceShapelessRecipeWithTool: function(result, ing, tool, lvl){
	   Recipes.deleteRecipe(result)
       for(var keys in tool){
           for(var key in ing){  
        	   if(tool[keys].lvl>=lvl){
                   Recipes.addShapeless(result, [ing[key], {id:tool[keys].id, data:-1}], GT_Tool.Tool)
               }
           } 
       }
   },
   
   AlloySmelterRecipe:{
	recipe: [],
	
	add: function(obj){
		if(!obj) return;
		
		this.recipe.push(obj);
	},
	get: function(id1, count1, id2, coutn2){
		for(var rec in this.recipe){
			if(id1 == this.recipe[rec].slot1.id && id2 == this.recipe[rec].slot2.id){
				if(count1 >= this.recipe[rec].slot1.count && coutn2 >= this.recipe[rec].slot2.count){
					 return this.recipe[rec];
				}
			}
		}
	}
   },
   MaceratorRecipe: {
	   recipe: [],
	   add: function(result, recipe, adv, chance){
		   if(!result){result.id = 0; result.data = 0; result.count = 0;}
           if(!recipe){recipe.id = 0; recipe.data = 0; recipe.count = 0;}
           if(!adv){adv.long = 0; adv.lvl = 0;} 
           if(!chance){chance = null;}		   
           this.recipe.push({result : {id: result.id, data: result.data, count: result.count}, recipe: {id: recipe.id, data: recipe.data, count: recipe.count}, adv: {long: adv.long, lvl: adv.lvl}, chance: chance});
	   }	   
   },
   ForgeHammerRecipe: {
	   recipe: [],
	   add: function(result, recipe, adv){
		   if(!result){result.id = 0; result.data = 0; result.count = 0;}
           if(!recipe){recipe.id = 0; recipe.data = 0; recipe.count = 0;}
           if(!adv){adv.long = 0; adv.lvl = 0;}          
           this.recipe.push({result : {id: result.id, data: result.data, count: result.coutn}, recipe: {id: recipe.id, data: recipe.data, count: recipe.count}, adv: {long: adv.long, lvl: adv.lvl}});
	   }	   
   },
   CompressorRecipe: {
	   recipe: [],
	   add: function(result, recipe, adv){
		   if(!result){result.id = 0; result.data = 0; result.count = 0;}
           if(!recipe){recipe.id = 0; recipe.data = 0; recipe.count = 0;}
           if(!adv){adv.long = 0; adv.lvl = 0;} 	   
           this.recipe.push({result : {id: result.id, data: result.data, count: result.count}, recipe: {id: recipe.id, data: recipe.data, count: recipe.count}, adv: {long: adv.long, lvl: adv.lvl}});
	   }	   
   },
   BlastFurnaceRecipe: {
	   recipe: [],
	   add: function(result, recipe, adv){
		   if(!result){result.id = 0; result.data = 0; result.count = 0;}
           if(!recipe){recipe.id = 0; recipe.data = 0; recipe.count = 0;}
           if(!adv){adv.long = 0; adv.lvl = 0;} 	   
           this.recipe.push({result : {id: result.id, data: result.data, count: result.count}, recipe: {id: recipe.id, data: recipe.data, count: recipe.count}, adv: {long: adv.long, lvl: adv.lvl}});
	   }	   
   }
};

let CreateHelmetRecipe = function(id, mat, lvl){
   GT_Recipe.ReplaceRecipeWithTool({id:id, count:1, data:0}, [
   "ppp",
   "php"
   ], ['p', eval("ItemID.plate"+mat), 0], [GT_Material.hammers], lvl);
}

let CreateChestplateRecipe = function(id, mat, lvl){
   GT_Recipe.ReplaceRecipeWithTool ({id:id, count:1, data:0}, [
   "php",
   "ppp",
   "ppp"
   ], ['p', eval("ItemID.plate"+mat), 0], [GT_Material.hammers], lvl)
}

let CreateLeggingsRecipe = function(id, mat, lvl){
   GT_Recipe.ReplaceRecipeWithTool ({id:id, count:1, data:0}, [
   "ppp",
   "php",
   "p p"
   ], ['p', eval("ItemID.plate"+mat), 0], [GT_Material.hammers], lvl)
}

let CreateBootsRecipe = function(id, mat, lvl){
   GT_Recipe.ReplaceRecipeWithTool ({id:id, count:1, data:0}, [
   "php",
   "p p"
   ], ['p', eval("ItemID.plate"+mat), 0], [GT_Material.hammers], lvl);
}

let CreatePickaxeRecipe = function(id, mat, lvl){
   GT_Recipe.ReplaceRecipeWithTool ({id:id, count:1, data:0}, [
   "pii",
   "fsh",
   " s "
   ], ['p', eval("ItemID.plate"+mat), 0, 'i', eval("ItemID.ingot"+mat), 0, 's', 280, 0], [GT_Material.hammers, GT_Material.files], 2);
}

let CreateAxeRecipe = function(id, mat, lvl){
   GT_Recipe.ReplaceRecipeWithTool ({id:id, count:1, data:0}, [
   "pih",
   "ps ",
   "fs "
   ], ['p', eval("ItemID.plate"+mat), 0, 'i', eval("ItemID.ingot"+mat), 0, 's', 280, 0], [GT_Material.hammers, GT_Material.files], 2);
}

let CreateHoeRecipe = function(id, mat, lvl){
   GT_Recipe.ReplaceRecipeWithTool ({id:id, count:1, data:0}, [
   "pih",
   "fs ",
   " s "
   ], ['p', eval("ItemID.plate"+mat), 0, 'i', eval("ItemID.ingot"+mat), 0, 's', 280, 0], [GT_Material.hammers, GT_Material.files], 2);
}

let CreateSwordRecipe = function(id, mat, lvl){
   GT_Recipe.ReplaceRecipeWithTool ({id:id, count:1, data:0}, [
   "ph",
   "pf",
   "s "
   ], ['p', eval("ItemID.plate"+mat), 0, 'i', eval("ItemID.ingot"+mat), 0, 's', 280, 0], [GT_Material.hammers, GT_Material.files], 2);
}

let CreateShovelRecipe = function(id, mat, lvl){
   GT_Recipe.ReplaceRecipeWithTool ({id:id, count:1, data:0}, [
   "pf",
   "s ",
   "s "
   ], ['p', eval("ItemID.plate"+mat), 0, 'i', eval("ItemID.ingot"+mat), 0, 's', 280, 0], [GT_Material.files], 2);
}


let CreateArmorSet = function(mat, lvl){
   CreateHelmetRecipe(eval("ItemID.helmet"+mat), mat, lvl);
   CreateChestplateRecipe(eval("ItemID.chestplate"+mat), mat, lvl);
   CreateLeggingsRecipe(eval("ItemID.leggins"+mat), mat, lvl);
   CreateBootsRecipe(eval("ItemID.boots"+mat), mat, lvl);
}

let CreateToolSet = function(mat, lvl){
   CreatePickaxeRecipe(eval("ItemID.pickaxe"+mat), mat, lvl);
   CreateAxeRecipe(eval("ItemID.axe"+mat), mat, lvl);
   CreateHoeRecipe(eval("ItemID.hoe"+mat), mat, lvl);
   CreateSwordRecipe(eval("ItemID.sword"+mat), mat, lvl);
   CreateShovelRecipe(eval("ItemID.shovel"+mat), mat, lvl);
}
let CreateSet = function(mat, lvl){
   CreateToolSet(mat, lvl);
   CreateArmorSet(mat, lvl);
}