GT_Worldgen.RegisterBreed(BlockID.blackstone, 0, 16, 2, 32, 48, -1, "GenerateChunk", "BlackGranite", 2, 4)
GT_Worldgen.RegisterBreed(BlockID.redstone, 0, 16, 2, 32, 48, -1, "GenerateChunk", "RedGranite", 1, 3)

    GT_Material.OreRegister("Tetrahedrite", [["Tetrahedrite", 2], ["Copper", 1],  ["Chrome", 0], ["Nikel", 0]], ["Stone", "RedGranite", "BlackGranite", "Nether", "End"], true);
    GT_Material.OreRegister("Copper", [["Copper", 2],  ["Iron", 1], ["Nikel", 0], ["Tetrahedrite", 0]], ["Stone"], true);
    GT_Material.OreRegister("Tin", [["Tin", 2],  ["Nikel", 1], ["Iron", 0], ["Aluminium", 0]], ["Stone", "RedGranite", "BlackGranite"], true);
    GT_Material.OreRegister("Iron", [["Iron", 2], ["Nikel", 1], ["Stone", 2], ["Aluminium", 1]], ["Stone"], true);
    GT_Material.OreRegister("Lead", [["Lead", 2], ["Aluminium", 1], ["Iron", 0], ["Tin", 0]], ["Stone", "End"], true);
    GT_Material.OreRegister("Silver", [["Silver", 2],  ["Aluminium", 1], ["Tin", 1], ["Nikel", 0]], ["Stone", "BlackGranite"], true, 1);
    GT_Material.OreRegister("Galena", [["Galena", 2], ["Silver", 1], ["Lead", 1], ["Aluminium", 1]], ["Stone"], true);
    GT_Material.OreRegister("Gold", [["Gold", 2], ["Silver", 1], ["Lead", 1]], ["Stone", "RedGranite", "BlackGranite", "Nether", "End"], true, 1);
    GT_Material.OreRegister("Coal", [["Coal", 2]], ["Stone"], true);
    GT_Material.OreRegister("Bauxite", [["Bauxite", 2], ["Titanium", 0], ["Nikel", 1], ["Aluminium", 1]], ["Stone", "BlackGranite"], true);
    GT_Material.OreRegister("Sapphire", [["Sapphire", 2], ["Nikel", 1], ["Lapis-Lazuli", 1]], ["Stone", "RedGranite", "BlackGranite"], true, 1);
    GT_Material.OreRegister("Ruby", [["Ruby", 2], ["Chrome", 0]], ["Stone", "RedGranite", "BlackGranite"], true, 1);
    GT_Material.OreRegister("Emerald", [["Emerald", 2], ["Titanium", 0], ["Chrome", 1]], ["RedGranite", "BlackGranite", "End", "Stone"], true, 1);
    GT_Material.OreRegister("Diamond", [["Diamond", 2]], ["Stone"], true, 1);
    GT_Material.OreRegister("Redstone", [["Redstone", 3], ["Ruby", 0], ["Chrome", 0]], ["Stone"], true, 1);
    GT_Material.OreRegister("Magnetite", [["Magnetite", 2], ["Iron", 1], ["Gold", 1], ["Aluminium", 0]], ["Stone", "BlackGranite"], true, 1);
    GT_Material.OreRegister("Wolfram", [["Wolfram", 2], ["Manganese", 1], ["Aluminium", 1]], ["Stone", "BlackGranite"], true, 2);
    GT_Material.OreRegister("Lapis-Lazuli", [["Lapis-Lazuli", 3], ["Nikel", 1], ["Sapphire", 0]], ["Stone", "BlackGranite", "RedGranite", "End"], true);
    GT_Material.OreRegister("Lignite", [["Lignite", 2]], ["Stone"], true);
    GT_Material.OreRegister("Sulfur", [["Sulfur", 3], ["Gold", 1], ["Bauxite", 1], ["Copper", 1]], ["RedGranite", "BlackGranite", "Nether"], true);
    GT_Material.OreRegister("Malachite", [["Malachite", 2], ["Copper", 1], ["Emerald", 0], ["Nikel", 1]], ["Stone"], true);
	GT_Material.OreRegister("Aluminium", [["Aluminium", 2], ["Nickel", 1], ["Iron", 1]], ["Stone"], true);
    GT_Material.OreRegister("Nickel", [["Nickel", 2], ["Aluminium", 1], ["Iron", 1]], ["Stone"], true);
    
    GT_Material.SmallOreRegister("Coal", [[263, 1, 0]]);
    GT_Material.SmallOreRegister("Copper", [[ItemID.Copper, 1, 0]]);
    GT_Material.SmallOreRegister("Gold", [[ItemID.Gold, 1, 0]]);
    GT_Material.SmallOreRegister("Iron", [[ItemID.Iron, 1, 0]]);
    GT_Material.SmallOreRegister("Lapis-Lazuli", [[351, 1, 4]]);
    GT_Material.SmallOreRegister("Lead", [[ItemID.dustLead, 1, 0]]);
    GT_Material.SmallOreRegister("Redstone", [[331, 1, 0]]);
    GT_Material.SmallOreRegister("Silver", [[ItemID.dustSilver, 1, 0]]);
    GT_Material.SmallOreRegister("Tin", [[ItemID.Tin, 1, 0]]);
    
var tileTemplate = [1, 14, 15, 16, 56, 73, 74, 129, 21];
//var tileTemplate = [0]

GT_Worldgen.RegisterLargeOreDepositeOnEarth([BlockID.oreMagnetiteStone, BlockID.oreIronStone, BlockID.oreIronStone, BlockID.oreMagnetiteStone], (100), tileTemplate, 80, 120, {x:50, y:8, z:50}, 40, 1);
GT_Worldgen.RegisterLargeOreDepositeOnEarth([BlockID.oreMalachiteStone, BlockID.oreCopperStone, BlockID.oreTetrahedriteStone, BlockID.oreCopperStone], (80), tileTemplate, 40, 120, {x:50, y:8, z:50}, 40, 1);
GT_Worldgen.RegisterLargeOreDepositeOnEarth([BlockID.oreMagnetiteStone, BlockID.oreGoldStone, BlockID.oreGoldStone, BlockID.oreMagnetiteStone], (30), tileTemplate, 32, 48, {x:50, y:8, z:50}, 40, 1);
GT_Worldgen.RegisterLargeOreDepositeOnEarth([BlockID.oreVolframStone, BlockID.oreMagnetiteStone, BlockID.oreMagnetiteStone, BlockID.oreVolframStone], (30), tileTemplate, 32, 48, {x:50, y:8, z:50}, 40, 1);
GT_Worldgen.RegisterLargeOreDepositeOnEarth([BlockID.oreLigniteStone, BlockID.oreCoalStone, BlockID.oreLigniteStone, BlockID.oreLigniteStone], (100), tileTemplate, 40, 120, {x:50, y:8, z:50}, 40, 1);
GT_Worldgen.RegisterLargeOreDepositeOnEarth([BlockID.oreCoalStone, BlockID.oreCoalStone, BlockID.oreLigniteStone, BlockID.oreCoalStone], (100), tileTemplate, 80, 120, {x:50, y:8, z:50}, 40, 1);
GT_Worldgen.RegisterLargeOreDepositeOnEarth([BlockID.oreTinStone, BlockID.oreSilverStone, BlockID.oreLeadStone, BlockID.oreGalenaStone], (80), tileTemplate, 32, 48, {x:50, y:8, z:50}, 40, 1);
GT_Worldgen.RegisterLargeOreDepositeOnEarth([BlockID.oreBauxiteStone, BlockID.oreIronStone, BlockID.oreBauxiteStone, BlockID.oreMagnetiteStone], (30), tileTemplate, 80, 120, {x:50, y:8, z:50}, 40, 1);
GT_Worldgen.RegisterLargeOreDepositeOnEarth([BlockID.oreCoalStone, BlockID.oreDiamondStone, BlockID.oreCoalStone, BlockID.oreLigniteStone], (10), tileTemplate, 10, 32, {x:30, y:8, z:30}, 40, 1);
GT_Worldgen.RegisterLargeOreDepositeOnEarth([BlockID.oreRedstoneStone, BlockID.oreRubyStone, BlockID.oreRedstoneStone, BlockID.oreRedstoneStone], (10), tileTemplate, 10, 32, {x:30, y:8, z:30}, 40, 1);
GT_Worldgen.RegisterLargeOreDepositeOnEarth([BlockID.oreLapisStone, BlockID.oreSaphireStone, BlockID.oreLapisStone, BlockID.oreLapisStone], (10), tileTemplate, 10, 32, {x:30, y:8, z:30}, 40, 1);
GT_Worldgen.RegisterLargeOreDepositeOnEarth([BlockID.oreEmeraldStone, BlockID.oreEmeraldStone, BlockID.oreMalachiteStone, BlockID.oreMalachiteStone], (10), tileTemplate, 10, 32, {x:30, y:8, z:30}, 40, 1);
GT_Worldgen.RegisterLargeOreDepositeOnEarth([BlockID.oreRedstoneStone, BlockID.oreRedstoneStone, BlockID.oreTetrahedriteStone, BlockID.oreRedstoneStone, BlockID.oreRedstone, BlockID.oreRedstone, BlockID.oreTetrahedriteStone, BlockID.oreRedstoneStone], (33), tileTemplate, 10, 32, {x:40, y:8, z:40}, 40, 1);
GT_Worldgen.RegisterLargeOreDepositeOnEarth([BlockID.oreAluminiumStone, BlockID.oreNickelStone, BlockID.oreGalenaStone], 100, tileTemplate, 32, 48, {x:30, y:6, z:30}, 20, 1);

GT_Worldgen.RegisterLargeOreDepositeOnRedGranite([BlockID.oreTetrahedriteRedGranite, BlockID.oreSulfurRedGranite, BlockID.oreSulfurRedGranite, BlockID.oreTetrahedriteRedGranite], (100), 40);
GT_Worldgen.RegisterLargeOreDepositeOnRedGranite([BlockID.oreLapisRedGranite, BlockID.oreLapisRedGranite, BlockID.oreSaphireRedGranite, BlockID.oreLapisRedGranite], (100), 40);
GT_Worldgen.RegisterLargeOreDepositeOnRedGranite([BlockID.oreRubyRedGranite, BlockID.oreEmeraldRedGranite, BlockID.oreEmeraldRedGranite, BlockID.oreRubyRedGranite], (100), 40);
GT_Worldgen.RegisterLargeOreDepositeOnRedGranite([BlockID.oreTinRedGranite], (100), 40)

GT_Worldgen.RegisterLargeOreDepositeOnBlackGranite([BlockID.oreTetrahedriteBlackGranite, BlockID.oreSulfurBlackGranite, BlockID.oreSulfurBlackGranite, BlockID.oreTetrahedriteBlackGranite], (100), 40);
GT_Worldgen.RegisterLargeOreDepositeOnBlackGranite([BlockID.oreLapisBlackGranite, BlockID.oreLapisBlackGranite, BlockID.oreSaphireBlackGranite, BlockID.oreLapisBlackGranite], (100), 40);
GT_Worldgen.RegisterLargeOreDepositeOnBlackGranite([BlockID.oreRubyBlackGranite, BlockID.oreEmeraldBlackGranite, BlockID.oreEmeraldBlackGranite, BlockID.oreRubyBlackGranite], (100), 40);
GT_Worldgen.RegisterLargeOreDepositeOnBlackGranite([BlockID.oreVolframBlackGranite, BlockID.oreMagnetiteBlackGranite, BlockID.oreVolframBlackGranite, BlockID.oreMagnetiteBlackGranite], (100), 40);
GT_Worldgen.RegisterLargeOreDepositeOnBlackGranite([BlockID.oreMagnetiteBlackGranite, BlockID.oreGoldBlackGranite, BlockID.oreMagnetiteBlackGranite, BlockID.oreGoldBlackGranite], (100), 40);
GT_Worldgen.RegisterLargeOreDepositeOnBlackGranite([BlockID.oreTinBlackGranite, BlockID.oreMagnetiteBlackGranite, BlockID.oreSilverBlackGranite, BlockID.oreBauxiteBlackGranite], (100), 40);

GT_Worldgen.RegisterLargeOreDepositeOnNether([BlockID.oreGoldNether, BlockID.oreTetrahedriteNether, BlockID.oreSulfurNether, BlockID.oreSulfurNether], (50), [87], 32, 120, {x:16, y:4, z:16}, 20, 1);

GT_Worldgen.RegisterLargeOreDepositeOnEnd([BlockID.oreLapisEnd], (40), [121], 10, 120, {x:24, y:8, z:32}, 40, 1);
GT_Worldgen.RegisterLargeOreDepositeOnEnd([BlockID.oreLeadEnd, BlockID.oreSilverEnd, BlockID.oreLeadEnd, BlockID.oreSilverEnd], (80), [121], 32, 64, {x:32, y:8, z:28}, 40, 1);
GT_Worldgen.RegisterLargeOreDepositeOnEnd([BlockID.oreCassiteriteEnd, BlockID.oreCassiteriteEnd, BlockID.oreTinEnd], (100), [121], 10, 128, {x:32, y:6, z:32}, 40, 1);
GT_Worldgen.RegisterLargeOreDepositeOnEnd([BlockID.oreRedstoneEnd, BlockID.oreRubyEnd, BlockID.oreRubyEnd], (33), [121], 10, 128, {x:24, y:6, z:24}, 40, 1);
GT_Worldgen.RegisterLargeOreDepositeOnEnd([BlockID.oreCoalEnd, BlockID.oreLigniteEnd, BlockID.oreGraphiteEnd, BlockID.oreDiamondEnd, BlockID.oreDiamondEnd], (20), [121], 10, 128, {x:40, y:10, z:40}, 40, 1);
GT_Worldgen.RegisterLargeOreDepositeOnEnd([BlockID.oreEmeraldEnd, BlockID.oreMalachiteEnd, BlockID.oreEmeraldEnd, BlockID.oreMalachiteEnd], (33), [121], 10, 128, {x:30, y:8, z:30}, 40, 1);
GT_Worldgen.RegisterLargeOreDepositeOnEnd([BlockID.oreGoldEnd, BlockID.oreMagnetiteEnd, BlockID.oreGoldEnd], (50), [121], 10, 128, {x:32, y:6, z:32}, 40, 1);
GT_Worldgen.RegisterLargeOreDepositeOnEnd([BlockID.oreCopperEnd, BlockID.oreTetrahedriteEnd, BlockID.oreCopperEnd, BlockID.oreTetrahedriteEnd], (100), [121], 10, 128, {x:48, y:8, z:48}, 40, 1);
GT_Worldgen.RegisterLargeOreDepositeOnEnd([BlockID.oreIronEnd, BlockID.oreMagnetiteEnd, BlockID.oreIronEnd, BlockID.oreMagnetiteEnd], (100), [121], 10, 128, {x:48, y:8, z:48}, 40, 1);


let DeleteOre = function(id){
	id = 1
	Block.setDestroyLevel(id, 0.7)
	
    Block.registerDropFunctionForID(id, function(coords, id, data, level){ 
        if(level>=1&&data==0&&rollPercentage(5)){
            return [[litst, 4, 0]];
        }else if(level>=1&&data==0){
        	return[[4, 1, 0]]
        }      
        return []
    })
}

Callback.addCallback("PostLoaded", function(){
DeleteOre(14);
DeleteOre(15);
DeleteOre(16);
DeleteOre(56);
DeleteOre(73);
DeleteOre(74);
DeleteOre(129);
DeleteOre(21);

Block.registerDropFunctionForID(153, function(coords, id, data, level){ 
    if(level>=1&&data==0){
    	return[[87, 1, 0]];
    }
    return [];
})

Block.registerDropFunction(49, function(coords, id, data, level){ 
    if(level>=3){
        return [[BlockID.blackcobblestone, 1, 0]];
    }
       return [];
    });
Block.setDestroyLevel(49, 3);

Block.registerDropFunction("blackstone", function(coords, id, data, level){ 
    if(level>=4){
        return [[BlockID.blackcobblestone, 1, 0]];
    }
       return [];
    });
Block.registerDropFunction("redstone", function(coords, id, data, level){ 
    if(level>=3){
        return [[BlockID.redcobblestone, 1, 0]];
    }
       return [];
    });
Block.registerDropFunction("blackcobblestone", function(coords, id, data, level){ 
    if(level>=4){
        return [[BlockID.blackcobblestone, 1, 0]];
    }
       return [];
    });
Block.registerDropFunction("redcobblestone", function(coords, id, data, level){ 
    if(level>=3){
        return [[BlockID.redcobblestone, 1, 0]];
    }
       return [];
    });

    
Block.registerDropFunction(1, function(coords, id, data, level){ 
    if(level>=1&&data==0&&rollPercentage(5)){
        return [[litst, 4, 0]];
    }else if(level>=1&&data==0){  	
    	return[[4, 1, 0]];
    }
    if(level>=1){
    	return[[id, 1, data]];
    }
    return [];
    });
});