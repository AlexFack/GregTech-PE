var num = 18;
var chem = [];

var IA = {name:"IA", numb:1};
var IIA = {name:"IIA", numb:2};
var IIIA = {name:"IIIA", numb:3};
var IVA = {name:"IVA", numb:4};
var VA = {name:"VA", numb:5};
var VIA = {name:"VIA", numb:6};
var VIIA = {name:"VIIA", numb:7};
var VIIIA = {name:"VIIIA", numb:8};

var IB = {name: "IB", numb:1};
var IIB = {name: "IIB", numb:2};
var IIIB = {name: "IIIB", numb:3};
var IVB = {name: "IVB", numb:4};
var VB = {name: "VB", numb:5}; 
var VIB = {name: "VIB", numb:6};
var VIIB = {name: "VIIB", numb:7};
var VIIIB = {name: "VIIIB", numb:8}; 

var FLAG = {
    ORGANIC: {
        PROTEIN:"protein",
        FAT: "fat",
        CARBONHYDRATE: "carbohydrate"
    },
    INORGANIC: {
        ACID: "acid",
        METALL: "metall",
        NO_METALL: "no_metall",
        OXIDE: "oxide",
        gas: "gas"
    },
    CONTAINER: "container"
}

for(var i = 0; i<=118; i++){
chem.push({num:i, mass:i*2});
}

function f(num, name, val, gr, per, m){
chem[num].name = name;
chem[num].val = val;
chem[num].gr = gr;
chem[num].per = per;
chem[num].m = m;
}

f(1, "H", IA, 1, 1, 4);
f(2, "He", VIIIA, 18, 1, 0);
f(3, "Li", IA, 1, 2, 3);
f(4, "Be", IIA, 2, 2, 3);
f(5, "B", IIIA, 13, 2, 5);
f(6, "C", IVA, 14, 2, 0);
f(7, "N", VA, 15, 2, 0);
f(8, "O", VIA, 16, 2, 0);
f(9, "F", VIIA, 17, 2, 0);
f(10, "Ne", VIIIA, 18, 2, 0);
f(11, "Na", IA, 1, 3, 3);
f(12, "Mg", IIA, 2, 3, 3);
f(13, "Al", IIIA, 13, 3, 0);
f(14, "Si", IVA, 14, 3, 5);
f(15, "P", VA, 15, 3, 0);
f(16, "S", VIA, 16, 3, 0);
f(17, "Cl", VIIA, 17, 3, 0);
f(18, "Ar", VIIIA, 18, 3, 0);
f(19, "K", IA, 1, 4, 3);
f(20, "Ca", IIA, 2, 4, 3);
f(21, "Sc", IIIB, 3, 4, 1);
f(22, "Ti", IVB, 4, 4, 1);
f(23, "V", VB, 5, 4, 1);
f(24, "Cr", VIB, 6, 4, 1);
f(25, "Mn", VIIB, 7, 4, 1);
f(26, "Fe", VIIIB, 8, 4, 1);
f(27, "Co", VIIIB, 9, 4, 1);
f(28, "Ni", VIIIB, 10, 4, 1);
f(29, "Cu", IB, 11, 4, 1);
f(30, "Zn", IIB, 12, 4, 1);
f(31, "Ga", IIIA, 13, 4, 0);
f(32, "Ge", IVA, 14, 4, 0);
f(33, "As", VA, 15, 4, 5);
f(34, "Se", VIA, 16, 4, 0);
f(35, "Br", VIIA, 17, 4, 0);
f(36, "Kr", VIIIA, 18, 4, 0);
f(37, "Rb", IA, 1, 5, 3);
f(38, "Sr", IIA, 2, 5, 3);
f(39, "Y", IIIB, 3, 5, 1);
f(40, "Zr", IVB, 4, 5, 1);
f(41, "Nb", VB, 5, 5, 1);
f(42, "Mo", VIB, 6, 5, 1);
f(43, "Tc", VIIB, 7, 5, 1);
f(44, "Ru", VIIIB, 8, 5, 1);
f(45, "Rh", VIIIB, 9, 5, 1);
f(46, "Pd", VIIIB, 10, 5, 1);
f(47, "Ag", IB, 11, 5, 1);
f(48, "Cd", IIB, 12, 5, 1);
f(49, "In", IIIB, 13, 5, 0);
f(50, "Sn", IVB, 14, 5, 0);
f(51, "Sb", VB, 15, 5, 0);
f(52, "Sr", VIA, 16, 5, 5);
f(53, "I", VIIA, 17, 5, 0);
f(54, "Xe", VIIIA, 18, 5, 0);
f(55, "Cs", IA, 1, 6, 3);
f(56, "Ba", IIA, 2, 6, 3);
f(57, "La", IIIB, 3, 6, 1);
f(58, "Ce", VB, 5, 8, 2);
f(59, "Pr", VIB, 6, 8, 2);
f(60, "Nd", VIIB, 7, 8, 2);
f(61, "Pm", VIIIB, 8, 8, 2);
f(62, "Sm", VIIIB, 9, 8, 2);
f(63, "Eu", VIIIB, 10, 8, 2);
f(64, "Gd", IB, 11, 8, 2);
f(65, "Tb", IIB, 12, 8, 2);
f(66, "Dy", IIIA, 13, 8, 2);
f(67, "Ho", IVA, 14, 8, 2);
f(68, "Er", VA, 15, 8, 2);
f(69, "Tm", VIA, 16, 8, 2);
f(70, "Yb", VIIA, 17, 8, 2);
f(71, "Lu", VIIIA, 18, 8, 2);
f(72, "Hf", IVB, 4, 6, 1);
f(73, "Ta", VB, 5, 6, 1);
f(74, "W", VIB, 6, 6, 1);
f(75, "Re", VIIB, 7, 6, 1);
f(76, "Os", VIIIB, 8, 6, 1);
f(77, "Ir", VIIIB, 9, 6, 1);
f(78, "Pt", VIIIB, 10, 6, 1);
f(79, "Au", IB, 11, 6, 1);
f(80, "Hg", IIB, 12, 6, 1);
f(81, "Tl", IIIA, 13, 6, 0);
f(82, "Pb", IVA, 14, 6, 0);
f(83, "Bi", VA, 15, 6, 0);
f(84, "Po", VIA, 16, 6, 0);
f(85, "At", VIIA, 17, 6, 5);
f(86, "Rn", VIIIA, 18, 6, 0);
f(87, "Fr", IA, 1, 7, 3);
f(88, "Ra", IIA, 2, 7, 3);
f(89, "Ac", IIIB, 3, 7, 1);
f(90, "Th", VB, 5, 9, 2);
f(91, "Pa", VIB, 6, 9, 2);
f(92, "U", VIIB, 7, 9, 2);
f(93, "Np", VIIIB, 8, 9, 2);
f(94, "Pu", VIIIB, 9, 9, 2);
f(95, "Am", VIIIB, 10, 9, 2);
f(96, "Cm", IB, 11, 9, 2);
f(97, "Bk", IIB, 12, 9, 2);
f(98, "Cf", IIIA, 13, 9, 2);
f(99, "Es", IVA, 14, 9, 2);
f(100, "Fm", VA, 15, 9, 2);
f(101, "Md", VIA, 16, 9, 2);
f(102, "No", VIIA, 17, 9, 2);
f(103, "Lr", VIIIA, 18, 9, 2);
f(104, "Rf", IVB, 4, 7, 1);
f(105, "Db", VB, 5, 7, 1);
f(106, "Sg", VIB, 6, 7, 1);
f(107, "Bh", VIIB, 7, 7, 1);
f(108, "Hs", VIIIB, 8, 7, 1);
f(109, "Mt", VIIIB, 9, 7, 1);
f(110, "Uun", VIIIB, 10, 7, 1);
f(111, "Uuu", IB, 11, 7, 1);
f(112, "Uub", IIB, 12, 7, 1);
f(113, "Uut", IIIA, 13, 7, 0);
f(114, "Uuq", IVA, 14, 7, 0);
f(116, "Uuh", VIA, 16, 7, 0);
f(118, "Uuo", VIIIA, 18, 7, 5);

registerAPIUnit("RegisterElement", f);
