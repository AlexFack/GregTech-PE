/*
ModAPI.addAPICallback("APIMEK", function(api){	
	Callback.addCallback("PreLoaded", function(){		
	   ItemID.ingotosmium = ItemID.ingotOsmium;
	   ItemID.copperingot = ItemID.ingotCopper;
	   ItemID.tiningot = ItemID.ingotTin;
	   ItemID.ObsidianIngot = ItemID.ingotObsidian;
	   ItemID.ObsidianDust = ItemID.dustObsidian;
	   ItemID.SteelDust = ItemID.dustSteel;
	   ItemID.SteelIngot = ItemID.ingotSteel;
	   ItemID.DiamondDust = ItemID.dustDiamond;
	   ItemID.GoldDust = ItemID.dustGold;
	   ItemID.IronDust = ItemID.dustIron;
	   ItemID.OsmiumDust = ItemID.dustOsmium;
	   ItemID.TinDust = ItemID.dustTin;
	   ItemID.CopperDust = ItemID.dustCopper;
	   ItemID.GlowstoneIngot = ItemID.ingotGlowstone;
	   BlockID.CopperOre = 1;
       BlockID.TinOre = 1;
       BlockID.OsmiumOre = 1;	   
	});
	
	   GT_Material.register("Osmium", {isIngot: true, isDust: true, isPlate: true, generateRecipes: true}, {temp:1000, long:10, lvl:2});
	   GT_Material.register("Obsidian", {isIngot: true, isDust: true, isPlate: true, generateRecipes: true}, {temp:2000, long:120, lvl:3});
	   GT_Material.register("Glowstone", {isIngot: true, isPlate: true, generateRecipes: true}, {temp:2000, long:120, lvl:2});
	
	   //GT_Material.OreRegister("Osmium", [["Osmium", 2],  ["Iron", 1], ["Aluminium", 0]], ["Stone"], true);
	   //GT_Worldgen.RegisterLargeOreDepositeOnEarth([BlockID.oreOsmiumStone, BlockID.oreGalenaStone, BlockID.oreTinStone, BlockID.oreLeadStone], 80, tileTemplate, 40, 120, {x:40, y:10, z:40}, 20, 1);
	
	Callback.addCallback("PostLoaded", function(){
      ICore.Recipe.addRecipeFor("macerator", 348, {id: ItemID.dustGlowstone, count: 1, data: 0});
      //osmium tools
      CreateHelmetRecipe(ItemID.OsmiumHelmet, "Osmium", 2);
      CreateChestplateRecipe(ItemID.OsmiumChestplate, "Osmium", 2);
      CreateLeggingsRecipe(ItemID.OsmiumLeggings, "Osmium", 2);
      CreateBootsRecipe(ItemID.OsmiumBoots, "Osmium", 2);

      CreatePickaxeRecipe(ItemID.OsmiumPickaxe, "Osmium", 2);
      CreateAxeRecipe(ItemID.OsmiumAxe, "Osmium", 2);
      CreateSwordRecipe(ItemID.OsmiumSword, "Osmium", 2);
      CreateShovelRecipe(ItemID.OsmiumShovel, "Osmium", 2);

      //steel tools
      CreateHelmetRecipe(ItemID.SteelHelmet, "Steel", 2);
      CreateChestplateRecipe(ItemID.SteelChestplate, "Steel", 2);
      CreateLeggingsRecipe(ItemID.SteelLeggings, "Steel", 2);
      CreateBootsRecipe(ItemID.SteelBoots, "Steel", 2);

      CreatePickaxeRecipe(ItemID.SteelPickaxe, "Steel", 2);
      CreateAxeRecipe(ItemID.SteelAxe, "Steel", 2);
      CreateSwordRecipe(ItemID.SteelSword, "Steel", 2);
      CreateShovelRecipe(ItemID.SteelShovel, "Steel", 2);
	
     //lapis tools
     CreateHelmetRecipe(ItemID.lapisHelmet, "Lapis", 1);
     CreateChestplateRecipe(ItemID.lapisChestplate, "Lapis", 1);
     CreateLeggingsRecipe(ItemID.lapisLeggings, "Lapis", 1);
     CreateBootsRecipe(ItemID.lapisBoots, "Lapis", 1);

     CreatePickaxeRecipe(ItemID.lazuliPickaxe, "Lapis", 1);
     CreateAxeRecipe(ItemID.lazuliAxe, "Lapis", 1);
     CreateSwordRecipe(ItemID.lazuliSword, "Lapis", 1);
     CreateShovelRecipe(ItemID.lazuliShovel, "Lapis", 1);
	
     //obsidian tools
     CreateHelmetRecipe(ItemID.obsidianHelmet, "Obsidian", 3);
     CreateChestplateRecipe(ItemID.obsidianChestplate, "Obsidian", 3);
     CreateLeggingsRecipe(ItemID.obsidianLeggings, "Obsidian", 3);
     CreateBootsRecipe(ItemID.obsidianBoots, "Obsidian", 3);

     CreatePickaxeRecipe(ItemID.obsidianPickaxe, "Obsidian", 3);
     CreateAxeRecipe(ItemID.obsidianAxe, "Obsidian", 3);
     CreateSwordRecipe(ItemID.obsidianSword, "Obsidian", 3);
     CreateShovelRecipe(ItemID.obsidianShovel, "Obsidian", 3);
	
     //glowstone tools
     CreateHelmetRecipe(ItemID.GlowstoneHelmet, "Glowstone", 2);
     CreateChestplateRecipe(ItemID.GlowstoneChestplate, "Glowstone", 2);
     CreateLeggingsRecipe(ItemID.GlowstoneLeggings, "Glowstone", 2);
     CreateBootsRecipe(ItemID.GlowstoneBoots, "Glowstone", 2);

     CreatePickaxeRecipe(ItemID.GlowstonePickaxe, "Glowstone", 2);
     CreateAxeRecipe(ItemID.GlowstoneAxe, "Glowstone", 2);
     CreateSwordRecipe(ItemID.GlowstoneSword, "Glowstone", 2);
     CreateShovelRecipe(ItemID.GlowstoneShovel, "Glowstone", 2);
    });
});
*/