var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/ts-chacha20/build/src/chacha20.js
var require_chacha20 = __commonJS({
  "node_modules/ts-chacha20/build/src/chacha20.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Chacha20 = void 0;
    var Chacha202 = (
      /** @class */
      function() {
        function Chacha203(key, nonce, counter) {
          this.key = key;
          this.nonce = nonce;
          this.counter = counter;
          this._rounds = 20;
          this._sigma = [1634760805, 857760878, 2036477234, 1797285236];
          this._byteCounter = 0;
          if (!(key instanceof Uint8Array) || key.length !== 32) {
            throw new Error("Key should be 32 byte array!");
          }
          if (!(nonce instanceof Uint8Array) || nonce.length !== 12) {
            throw new Error("Nonce should be 12 byte array!");
          }
          if (!counter) {
            this.counter = 0;
          }
          this._param = [
            this._sigma[0],
            this._sigma[1],
            this._sigma[2],
            this._sigma[3],
            // key
            this._get32(key, 0),
            this._get32(key, 4),
            this._get32(key, 8),
            this._get32(key, 12),
            this._get32(key, 16),
            this._get32(key, 20),
            this._get32(key, 24),
            this._get32(key, 28),
            // counter
            this.counter,
            // nonce
            this._get32(nonce, 0),
            this._get32(nonce, 4),
            this._get32(nonce, 8)
          ];
          this._keystream = [
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0
          ];
        }
        Chacha203.prototype._chacha = function() {
          var mix = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          var i = 0;
          var b = 0;
          for (i = 0; i < 16; i++) {
            mix[i] = this._param[i];
          }
          for (i = 0; i < this._rounds; i += 2) {
            this._quarterround(mix, 0, 4, 8, 12);
            this._quarterround(mix, 1, 5, 9, 13);
            this._quarterround(mix, 2, 6, 10, 14);
            this._quarterround(mix, 3, 7, 11, 15);
            this._quarterround(mix, 0, 5, 10, 15);
            this._quarterround(mix, 1, 6, 11, 12);
            this._quarterround(mix, 2, 7, 8, 13);
            this._quarterround(mix, 3, 4, 9, 14);
          }
          for (i = 0; i < 16; i++) {
            mix[i] += this._param[i];
            this._keystream[b++] = mix[i] & 255;
            this._keystream[b++] = mix[i] >>> 8 & 255;
            this._keystream[b++] = mix[i] >>> 16 & 255;
            this._keystream[b++] = mix[i] >>> 24 & 255;
          }
        };
        Chacha203.prototype._quarterround = function(output, a, b, c, d) {
          output[d] = this._rotl(output[d] ^ (output[a] += output[b]), 16);
          output[b] = this._rotl(output[b] ^ (output[c] += output[d]), 12);
          output[d] = this._rotl(output[d] ^ (output[a] += output[b]), 8);
          output[b] = this._rotl(output[b] ^ (output[c] += output[d]), 7);
          output[a] >>>= 0;
          output[b] >>>= 0;
          output[c] >>>= 0;
          output[d] >>>= 0;
        };
        Chacha203.prototype._get32 = function(data, index) {
          return data[index++] ^ data[index++] << 8 ^ data[index++] << 16 ^ data[index] << 24;
        };
        Chacha203.prototype._rotl = function(data, shift) {
          return data << shift | data >>> 32 - shift;
        };
        Chacha203.prototype.encrypt = function(data) {
          return this._update(data);
        };
        Chacha203.prototype.decrypt = function(data) {
          return this._update(data);
        };
        Chacha203.prototype._update = function(data) {
          if (!(data instanceof Uint8Array) || data.length === 0) {
            throw new Error("Data should be type of bytes (Uint8Array) and not empty!");
          }
          var output = new Uint8Array(data.length);
          for (var i = 0; i < data.length; i++) {
            if (this._byteCounter === 0 || this._byteCounter === 64) {
              this._chacha();
              this._param[12]++;
              this._byteCounter = 0;
            }
            output[i] = data[i] ^ this._keystream[this._byteCounter++];
          }
          return output;
        };
        return Chacha203;
      }()
    );
    exports.Chacha20 = Chacha202;
  }
});

// node_modules/twofish-ts/bin/index.js
var require_bin = __commonJS({
  "node_modules/twofish-ts/bin/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.decrypt = exports.encrypt = exports.makeSession = void 0;
    var P0 = new Uint8Array([169, 103, 179, 232, 4, 253, 163, 118, 154, 146, 128, 120, 228, 221, 209, 56, 13, 198, 53, 152, 24, 247, 236, 108, 67, 117, 55, 38, 250, 19, 148, 72, 242, 208, 139, 48, 132, 84, 223, 35, 25, 91, 61, 89, 243, 174, 162, 130, 99, 1, 131, 46, 217, 81, 155, 124, 166, 235, 165, 190, 22, 12, 227, 97, 192, 140, 58, 245, 115, 44, 37, 11, 187, 78, 137, 107, 83, 106, 180, 241, 225, 230, 189, 69, 226, 244, 182, 102, 204, 149, 3, 86, 212, 28, 30, 215, 251, 195, 142, 181, 233, 207, 191, 186, 234, 119, 57, 175, 51, 201, 98, 113, 129, 121, 9, 173, 36, 205, 249, 216, 229, 197, 185, 77, 68, 8, 134, 231, 161, 29, 170, 237, 6, 112, 178, 210, 65, 123, 160, 17, 49, 194, 39, 144, 32, 246, 96, 255, 150, 92, 177, 171, 158, 156, 82, 27, 95, 147, 10, 239, 145, 133, 73, 238, 45, 79, 143, 59, 71, 135, 109, 70, 214, 62, 105, 100, 42, 206, 203, 47, 252, 151, 5, 122, 172, 127, 213, 26, 75, 14, 167, 90, 40, 20, 63, 41, 136, 60, 76, 2, 184, 218, 176, 23, 85, 31, 138, 125, 87, 199, 141, 116, 183, 196, 159, 114, 126, 21, 34, 18, 88, 7, 153, 52, 110, 80, 222, 104, 101, 188, 219, 248, 200, 168, 43, 64, 220, 254, 50, 164, 202, 16, 33, 240, 211, 93, 15, 0, 111, 157, 54, 66, 74, 94, 193, 224]);
    var P1 = new Uint8Array([117, 243, 198, 244, 219, 123, 251, 200, 74, 211, 230, 107, 69, 125, 232, 75, 214, 50, 216, 253, 55, 113, 241, 225, 48, 15, 248, 27, 135, 250, 6, 63, 94, 186, 174, 91, 138, 0, 188, 157, 109, 193, 177, 14, 128, 93, 210, 213, 160, 132, 7, 20, 181, 144, 44, 163, 178, 115, 76, 84, 146, 116, 54, 81, 56, 176, 189, 90, 252, 96, 98, 150, 108, 66, 247, 16, 124, 40, 39, 140, 19, 149, 156, 199, 36, 70, 59, 112, 202, 227, 133, 203, 17, 208, 147, 184, 166, 131, 32, 255, 159, 119, 195, 204, 3, 111, 8, 191, 64, 231, 43, 226, 121, 12, 170, 130, 65, 58, 234, 185, 228, 154, 164, 151, 126, 218, 122, 23, 102, 148, 161, 29, 61, 240, 222, 179, 11, 114, 167, 28, 239, 209, 83, 62, 143, 51, 38, 95, 236, 118, 42, 73, 129, 136, 238, 33, 196, 26, 235, 217, 197, 57, 153, 205, 173, 49, 139, 1, 24, 35, 221, 31, 78, 45, 249, 72, 79, 242, 101, 142, 120, 92, 88, 25, 141, 229, 152, 87, 103, 127, 5, 100, 175, 99, 182, 254, 245, 183, 60, 165, 206, 233, 104, 68, 224, 77, 67, 105, 41, 46, 172, 21, 89, 168, 10, 158, 110, 71, 223, 52, 53, 106, 207, 220, 34, 201, 192, 155, 137, 212, 237, 171, 18, 162, 13, 82, 187, 2, 47, 169, 215, 97, 30, 180, 80, 4, 246, 194, 22, 37, 134, 86, 85, 9, 190, 145]);
    var MDS0 = new Uint32Array([3166450293, 3974898163, 538985414, 3014904308, 3671720923, 33721211, 3806473211, 2661219016, 3385453642, 3570665939, 404253670, 505323371, 2560101957, 2998024317, 2795950824, 640071499, 1010587606, 2475919922, 2189618904, 1381144829, 2071712823, 3149608817, 1532729329, 1195869153, 606354480, 1364320783, 3132802808, 1246425883, 3216984199, 218984698, 2964370182, 1970658879, 3537042782, 2105352378, 1717973422, 976921435, 1499012234, 0, 3452801980, 437969053, 2930650221, 2139073473, 724289457, 3200170254, 3772817536, 2324303965, 993743570, 1684323029, 3638069408, 3890718084, 1600120839, 454758676, 741130933, 4244419728, 825304876, 2155898275, 1936927410, 202146163, 2037997388, 1802191188, 1263207058, 1397975412, 2492763958, 2206408529, 707409464, 3301219504, 572704957, 3587569754, 3183330300, 1212708960, 4294954594, 1280051094, 1094809452, 3351766594, 3958056183, 471602192, 1566401404, 909517352, 1734852647, 3924406156, 1145370899, 336915093, 4126522268, 3486456007, 1061104932, 3233866566, 1920129851, 1414818928, 690572490, 4042274275, 134807173, 3334870987, 4092808977, 2358043856, 2762234259, 3402274488, 1751661478, 3099086211, 943204384, 3857002239, 2913818271, 185304183, 3368558019, 2577006540, 1482222851, 421108335, 235801096, 2509602495, 1886408768, 4160172263, 1852755755, 522153698, 3048553849, 151588620, 1633760426, 1465325186, 2678000449, 2644344890, 286352618, 623234489, 2947538404, 1162152090, 3755969956, 2745392279, 3941258622, 892688602, 3991785594, 1128528919, 4177054566, 4227576212, 926405537, 4210704413, 3267520573, 3031747824, 842161630, 2627498419, 1448535819, 3823360626, 2273796263, 353704732, 4193860335, 1667481553, 875866451, 2593817918, 2981184143, 2088554803, 2290653990, 1027450463, 2711738348, 3840204662, 2172752938, 2442199369, 252705665, 4008618632, 370565614, 3621221153, 2543318468, 2779097114, 4278075371, 1835906521, 2021174981, 3318050105, 488498585, 1987486925, 1044307117, 3419105073, 3065399179, 4025441025, 303177240, 1616954659, 1785376989, 1296954911, 3469666638, 3739122733, 1431674361, 2122209864, 555856463, 50559730, 2694850149, 1583225230, 1515873912, 1701137244, 1650609752, 4261233945, 101119117, 1077970661, 4075994776, 859024471, 387420263, 84250239, 3907542533, 1330609508, 2307484335, 269522275, 1953771446, 168457726, 1549570805, 2610656439, 757936956, 808507045, 774785486, 1229556201, 1179021928, 2004309316, 2829637856, 2526413901, 673758531, 2846435689, 3654908201, 2256965934, 3520169900, 4109650453, 2374833497, 3604382376, 3115957258, 1111625118, 4143366510, 791656519, 3722249951, 589510964, 3435946549, 4059153514, 3250655951, 2240146396, 2408554018, 1903272393, 2425417920, 2863289243, 16904585, 2341200340, 1313770733, 2391699371, 2880152082, 1869561506, 3873854477, 3688624722, 2459073467, 3082270210, 1768540719, 960092585, 3553823959, 2812748641, 2728570142, 3284375988, 1819034704, 117900548, 67403766, 656885442, 2896996118, 3503322661, 1347425158, 3705468758, 2223250005, 3789639945, 2054825406, 320073617]);
    var MDS1 = new Uint32Array([2849585465, 1737496343, 3010567324, 3906119334, 67438343, 4254618194, 2741338240, 1994384612, 2584233285, 2449623883, 2158026976, 2019973722, 3839733679, 3719326314, 3518980963, 943073834, 223667942, 3326287904, 895667404, 2562650866, 404623890, 4146392043, 3973554593, 1819754817, 1136470056, 1966259388, 936672123, 647727240, 4201647373, 335103044, 2494692347, 1213890174, 4068082435, 3504639116, 2336732854, 809247780, 2225465319, 1413573483, 3741769181, 600137824, 424017405, 1537423930, 1030275778, 1494584717, 4079086828, 2922473062, 2722000751, 2182502231, 1670713360, 22802415, 2202908856, 781289094, 3652545901, 1361019779, 2605951658, 2086886749, 2788911208, 3946839806, 2782277680, 3190127226, 380087468, 202311945, 3811963120, 1629726631, 3236991120, 2360338921, 981507485, 4120009820, 1937837068, 740766001, 628543696, 199710294, 3145437842, 1323945678, 2314273025, 1805590046, 1403597876, 1791291889, 3029976003, 4053228379, 3783477063, 3865778200, 3184009762, 1158584472, 3798867743, 4106859443, 3056563316, 1724643576, 3439303065, 2515145748, 65886296, 1459084508, 3571551115, 471536917, 514695842, 3607942099, 4213957346, 3273509064, 2384027230, 3049401388, 3918088521, 3474112961, 3212744085, 3122691453, 3932426513, 2005142283, 963495365, 2942994825, 869366908, 3382800753, 1657733119, 1899477947, 2180714255, 2034087349, 156361185, 2916892222, 606945087, 3450107510, 4187837781, 3639509634, 3850780736, 3316545656, 3117229349, 1292146326, 1146451831, 134876686, 2249412688, 3878746103, 2714974007, 490797818, 2855559521, 3985395278, 112439472, 1886147668, 2989126515, 3528604475, 1091280799, 2072707586, 2693322968, 290452467, 828885963, 3259377447, 666920807, 2427780348, 539506744, 4135519236, 1618495560, 4281263589, 2517060684, 1548445029, 2982619947, 2876214926, 2651669058, 2629563893, 1391647707, 468929098, 1604730173, 2472125604, 180140473, 4013619705, 2448364307, 2248017928, 1224839569, 3999340054, 763158238, 1337073953, 2403512753, 1004237426, 1203253039, 2269691839, 1831644846, 1189331136, 3596041276, 1048943258, 1764338089, 1685933903, 714375553, 3460902446, 3407333062, 801794409, 4240686525, 2539430819, 90106088, 2060512749, 2894582225, 2140013829, 3585762404, 447260069, 1270294054, 247054014, 2808121223, 1526257109, 673330742, 336665371, 1071543669, 695851481, 2292903662, 1009986861, 1281325433, 45529015, 3096890058, 3663213877, 2963064004, 402408259, 1427801220, 536235341, 2317113689, 2100867762, 1470903091, 3340292047, 2381579782, 1953059667, 3077872539, 3304429463, 2673257901, 1926947811, 2127948522, 357233908, 580816783, 312650667, 1481532002, 132669279, 2581929245, 876159779, 1858205430, 1346661484, 3730649650, 1752319558, 1697030304, 3163803085, 3674462938, 4173773498, 3371867806, 2827146966, 735014510, 1079013488, 3706422661, 4269083146, 847942547, 2760761311, 3393988905, 269753372, 561240023, 4039947444, 3540636884, 1561365130, 266490193, 0, 1872369945, 2648709658, 915379348, 1122420679, 1257032137, 1593692882, 3249241983, 3772295336]);
    var MDS2 = new Uint32Array([3161832498, 3975408673, 549855299, 3019158473, 3671841283, 41616011, 3808158251, 2663948026, 3377121772, 3570652169, 417732715, 510336671, 2554697742, 2994582072, 2800264914, 642459319, 1020673111, 2469565322, 2195227374, 1392333464, 2067233748, 3144792887, 1542544279, 1205946243, 607134780, 1359958498, 3136862918, 1243302643, 3213344584, 234491248, 2953228467, 1967093214, 3529429757, 2109373728, 1722705457, 979057315, 1502239004, 0, 3451702675, 446503648, 2926423596, 2143387563, 733031367, 3188637369, 3766542496, 2321386e3, 1003633490, 1691706554, 3634419848, 3884246949, 1594318824, 454302481, 750070978, 4237360308, 824979751, 2158198885, 1941074730, 208866433, 2035054943, 1800694593, 1267878658, 1400132457, 2486604943, 2203157279, 708323894, 3299919004, 582820552, 3579500024, 3187457475, 1214269560, 4284678094, 1284918279, 1097613687, 3343042534, 3958893348, 470817812, 1568431459, 908604962, 1730635712, 3918326191, 1142113529, 345314538, 4120704443, 3485978392, 1059340077, 3225862371, 1916498651, 1416647788, 701114700, 4041470005, 142936318, 3335243287, 4078039887, 2362477796, 2761139289, 3401108118, 1755736123, 3095640141, 941635624, 3858752814, 2912922966, 192351108, 3368273949, 2580322815, 1476614381, 426711450, 235408906, 2512360830, 1883271248, 4159174448, 1848340175, 534912878, 3044652349, 151783695, 1638555956, 1468159766, 2671877899, 2637864320, 300552548, 632890829, 2951000029, 1167738120, 3752124301, 2744623964, 3934186197, 903492952, 3984256464, 1125598204, 4167497931, 4220844977, 933312467, 4196268608, 3258827368, 3035673804, 853422685, 2629016689, 1443583719, 3815957466, 2275903328, 354161947, 4193253690, 1674666943, 877868201, 2587794053, 2978984258, 2083749073, 2284226715, 1029651878, 2716639703, 3832997087, 2167046548, 2437517569, 260116475, 4001951402, 384702049, 3609319283, 2546243573, 2769986984, 4276878911, 1842965941, 2026207406, 3308897645, 496573925, 1993176740, 1051541212, 3409038183, 3062609479, 4009881435, 303567390, 1612931269, 1792895664, 1293897206, 3461271273, 3727548028, 1442403741, 2118680154, 558834098, 66192250, 2691014694, 1586388505, 1517836902, 1700554059, 1649959502, 4246338885, 109905652, 1088766086, 4070109886, 861352876, 392632208, 92210574, 3892701278, 1331974013, 2309982570, 274927765, 1958114351, 184420981, 1559583890, 2612501364, 758918451, 816132310, 785264201, 1240025481, 1181238898, 2000975701, 2833295576, 2521667076, 675489981, 2842274089, 3643398521, 2251196049, 3517763975, 4095079498, 2371456277, 3601389186, 3104487868, 1117667853, 4134467265, 793194424, 3722435846, 590619449, 3426077794, 4050317764, 3251618066, 2245821931, 2401406878, 1909027233, 2428539120, 2862328403, 25756145, 2345962465, 1324174988, 2393607791, 2870127522, 1872916286, 3859670612, 3679640562, 2461766267, 3070408630, 1764714954, 967391705, 3554136844, 2808194851, 2719916717, 3283403673, 1817209924, 117704453, 83231871, 667035462, 2887167143, 3492139126, 1350979603, 3696680183, 2220196890, 3775521105, 2059303461, 328274927]);
    var MDS3 = new Uint32Array([3644434905, 2417452944, 1906094961, 3534153938, 84345861, 2555575704, 1702929253, 3756291807, 138779144, 38507010, 2699067552, 1717205094, 3719292125, 2959793584, 3210990015, 908736566, 1424362836, 1126221379, 1657550178, 3203569854, 504502302, 619444004, 3617713367, 2000776311, 3173532605, 851211570, 3564845012, 2609391259, 1879964272, 4181988345, 2986054833, 1518225498, 2047079034, 3834433764, 1203145543, 1009004604, 2783413413, 1097552961, 115203846, 3311412165, 1174214981, 2738510755, 1757560168, 361584917, 569176865, 828812849, 1047503422, 374833686, 2500879253, 1542390107, 1303937869, 2441490065, 3043875253, 528699679, 1403689811, 1667071075, 996714043, 1073670975, 3593512406, 628801061, 2813073063, 252251151, 904979253, 598171939, 4036018416, 2951318703, 2157787776, 2455565714, 2165076865, 657533991, 1993352566, 3881176039, 2073213819, 3922611945, 4043409905, 2669570975, 2838778793, 3304155844, 2579739801, 2539385239, 2202526083, 1796793963, 3357720008, 244860174, 1847583342, 3384014025, 796177967, 3422054091, 4288269567, 3927217642, 3981968365, 4158412535, 3784037601, 454368283, 2913083053, 215209740, 736295723, 499696413, 425627161, 3257710018, 2303322505, 314691346, 2123743102, 545110560, 1678895716, 2215344004, 1841641837, 1787408234, 3514577873, 2708588961, 3472843470, 935031095, 4212097531, 1035303229, 1373702481, 3695095260, 759112749, 2759249316, 2639657373, 4001552622, 2252400006, 2927150510, 3441801677, 76958980, 1433879637, 168691722, 324044307, 821552944, 3543638483, 1090133312, 878815796, 2353982860, 3014657715, 1817473132, 712225322, 1379652178, 194986251, 2332195723, 2295898248, 1341329743, 1741369703, 1177010758, 3227985856, 3036450996, 674766888, 2131031679, 2018009208, 786825006, 122459655, 1264933963, 3341529543, 1871620975, 222469645, 3153435835, 4074459890, 4081720307, 2789040038, 1503957849, 3166243516, 989458234, 4011037167, 4261971454, 26298625, 1628892769, 2094935420, 2988527538, 1118932802, 3681696731, 3090106296, 1220511560, 749628716, 3821029091, 1463604823, 2241478277, 698968361, 2102355069, 2491493012, 1227804233, 398904087, 3395891146, 3284008131, 1554224988, 1592264030, 3505224400, 2278665351, 2382725006, 3127170490, 2829392552, 3072740279, 3116240569, 1619502944, 4174732024, 573974562, 286987281, 3732226014, 2044275065, 2867759274, 858602547, 1601784927, 3065447094, 2529867926, 1479924312, 2630135964, 4232255484, 444880154, 4132249590, 475630108, 951221560, 2889045932, 416270104, 4094070260, 1767076969, 1956362100, 4120364277, 1454219094, 3672339162, 3588914901, 1257510218, 2660180638, 2729120418, 1315067982, 3898542056, 3843922405, 958608441, 3254152897, 1147949124, 1563614813, 1917216882, 648045862, 2479733907, 64674563, 3334142150, 4204710138, 2195105922, 3480103887, 1349533776, 3951418603, 1963654773, 2324902538, 2380244109, 1277807180, 337383444, 1943478643, 3434410188, 164942601, 277503248, 3796963298, 0, 2585358234, 3759840736, 2408855183, 3871818470, 3972614892, 4258422525, 2877276587, 3634946264]);
    var ROUNDS = 16;
    var SK_STEP = 16843009;
    var SK_ROTL = 9;
    var ROUND_SUBKEYS = 8;
    var SUBKEY_CNT = 40;
    var RS_GF_FDBK = 333;
    function b0(x) {
      return x & 255;
    }
    function b1(x) {
      return x >>> 8 & 255;
    }
    function b2(x) {
      return x >>> 16 & 255;
    }
    function b3(x) {
      return x >>> 24 & 255;
    }
    function rsMDSEncode(k0, k1) {
      let b = k1 >>> 24 & 255;
      let g2 = (b << 1 ^ ((b & 128) !== 0 ? RS_GF_FDBK : 0)) & 255;
      let g3 = b >>> 1 ^ ((b & 1) !== 0 ? RS_GF_FDBK >>> 1 : 0) ^ g2;
      k1 = k1 << 8 ^ g3 << 24 ^ g2 << 16 ^ g3 << 8 ^ b;
      for (let i = 0; i < 3; i++) {
        b = k1 >>> 24 & 255;
        g2 = (b << 1 ^ ((b & 128) !== 0 ? RS_GF_FDBK : 0)) & 255;
        g3 = b >>> 1 ^ ((b & 1) !== 0 ? RS_GF_FDBK >>> 1 : 0) ^ g2;
        k1 = k1 << 8 ^ g3 << 24 ^ g2 << 16 ^ g3 << 8 ^ b;
      }
      k1 ^= k0;
      for (let i = 0; i < 4; i++) {
        b = k1 >>> 24 & 255;
        g2 = (b << 1 ^ ((b & 128) !== 0 ? RS_GF_FDBK : 0)) & 255;
        g3 = b >>> 1 ^ ((b & 1) !== 0 ? RS_GF_FDBK >>> 1 : 0) ^ g2;
        k1 = k1 << 8 ^ g3 << 24 ^ g2 << 16 ^ g3 << 8 ^ b;
      }
      return k1;
    }
    var subKeyWord = new Uint32Array(4);
    function getSubKeyWord(k64Cnt, k0, k1, k2, k3, B0, B1, B2, B3) {
      switch (k64Cnt & 3) {
        case 0:
          B0 = P1[B0] ^ b0(k3);
          B1 = P0[B1] ^ b1(k3);
          B2 = P0[B2] ^ b2(k3);
          B3 = P1[B3] ^ b3(k3);
        case 3:
          B0 = P1[B0] ^ b0(k2);
          B1 = P1[B1] ^ b1(k2);
          B2 = P0[B2] ^ b2(k2);
          B3 = P0[B3] ^ b3(k2);
        case 2:
          B0 = P0[B0] ^ b0(k1);
          B1 = P1[B1] ^ b1(k1);
          B2 = P0[B2] ^ b2(k1);
          B3 = P1[B3] ^ b3(k1);
        default:
        case 1:
          subKeyWord[0] = MDS0[P0[B0] ^ b0(k0)];
          subKeyWord[1] = MDS1[P0[B1] ^ b1(k0)];
          subKeyWord[2] = MDS2[P1[B2] ^ b2(k0)];
          subKeyWord[3] = MDS3[P1[B3] ^ b3(k0)];
          return;
      }
    }
    function makeSession2(key) {
      let keyLength = key.length;
      if (keyLength > 32) {
        key = key.subarray(0, 32);
      } else {
        const mod = keyLength & 7;
        if (keyLength === 0 || mod !== 0) {
          keyLength += 8 - mod;
          const nkey = new Uint8Array(keyLength);
          nkey.set(key);
          key = nkey;
        }
      }
      const k64Cnt = keyLength / 8;
      const sessionMemory = new ArrayBuffer(4256);
      const sBox = new Uint32Array(sessionMemory, 0, 1024);
      let offset = 0;
      let k0 = key[offset++] | key[offset++] << 8 | key[offset++] << 16 | key[offset++] << 24;
      let k1 = key[offset++] | key[offset++] << 8 | key[offset++] << 16 | key[offset++] << 24;
      sBox[k64Cnt - 1] = rsMDSEncode(k0, k1);
      let k2 = key[offset++] | key[offset++] << 8 | key[offset++] << 16 | key[offset++] << 24;
      let k3 = key[offset++] | key[offset++] << 8 | key[offset++] << 16 | key[offset++] << 24;
      sBox[k64Cnt - 2] = rsMDSEncode(k2, k3);
      const k4 = key[offset++] | key[offset++] << 8 | key[offset++] << 16 | key[offset++] << 24;
      const k5 = key[offset++] | key[offset++] << 8 | key[offset++] << 16 | key[offset++] << 24;
      sBox[k64Cnt - 3] = rsMDSEncode(k4, k5);
      const k6 = key[offset++] | key[offset++] << 8 | key[offset++] << 16 | key[offset++] << 24;
      const k7 = key[offset++] | key[offset++] << 8 | key[offset++] << 16 | key[offset++] << 24;
      sBox[k64Cnt - 4] = rsMDSEncode(k6, k7);
      let A;
      let B;
      const subKeys = new Uint32Array(sessionMemory, 4096, 40);
      for (let i = 0, q = 0, j = 0; i < SUBKEY_CNT / 2; i++, j += 2) {
        getSubKeyWord(k64Cnt, k0, k2, k4, k6, b0(q), b1(q), b2(q), b3(q));
        A = subKeyWord[0] ^ subKeyWord[1] ^ subKeyWord[2] ^ subKeyWord[3];
        q += SK_STEP;
        getSubKeyWord(k64Cnt, k1, k3, k5, k7, b0(q), b1(q), b2(q), b3(q));
        B = subKeyWord[0] ^ subKeyWord[1] ^ subKeyWord[2] ^ subKeyWord[3];
        q += SK_STEP;
        B = B << 8 | B >>> 24;
        A += B;
        subKeys[j] = A;
        A += B;
        subKeys[j + 1] = A << SK_ROTL | A >>> 32 - SK_ROTL;
      }
      k0 = sBox[0];
      k1 = sBox[1];
      k2 = sBox[2];
      k3 = sBox[3];
      for (let i = 0, j = 0; i < 256; i++, j += 2) {
        getSubKeyWord(k64Cnt, k0, k1, k2, k3, i, i, i, i);
        sBox[j] = subKeyWord[0];
        sBox[j + 1] = subKeyWord[1];
        sBox[512 + j] = subKeyWord[2];
        sBox[513 + j] = subKeyWord[3];
      }
      return [sBox, subKeys];
    }
    exports.makeSession = makeSession2;
    function outputBlock(out, oo, x0, x1, x2, x3) {
      out[oo++] = x0;
      out[oo++] = x0 >>> 8;
      out[oo++] = x0 >>> 16;
      out[oo++] = x0 >>> 24;
      out[oo++] = x1;
      out[oo++] = x1 >>> 8;
      out[oo++] = x1 >>> 16;
      out[oo++] = x1 >>> 24;
      out[oo++] = x2;
      out[oo++] = x2 >>> 8;
      out[oo++] = x2 >>> 16;
      out[oo++] = x2 >>> 24;
      out[oo++] = x3;
      out[oo++] = x3 >>> 8;
      out[oo++] = x3 >>> 16;
      out[oo++] = x3 >>> 24;
    }
    function encrypt2(plain, io, cipher, oo, [sBox, sKey]) {
      if (cipher.length < oo + 16) {
        throw new Error("Insufficient space to write ciphertext block.");
      }
      let x0 = (plain[io++] | plain[io++] << 8 | plain[io++] << 16 | plain[io++] << 24) ^ sKey[0];
      let x1 = (plain[io++] | plain[io++] << 8 | plain[io++] << 16 | plain[io++] << 24) ^ sKey[1];
      let x2 = (plain[io++] | plain[io++] << 8 | plain[io++] << 16 | plain[io++] << 24) ^ sKey[2];
      let x3 = (plain[io++] | plain[io++] << 8 | plain[io++] << 16 | plain[io++] << 24) ^ sKey[3];
      let t0;
      let t1;
      let k = ROUND_SUBKEYS;
      for (let R = 0; R < ROUNDS; R += 2) {
        t0 = sBox[x0 << 1 & 510] ^ sBox[(x0 >>> 7 & 510) + 1] ^ sBox[512 + (x0 >>> 15 & 510)] ^ sBox[512 + (x0 >>> 23 & 510) + 1];
        t1 = sBox[x1 >>> 23 & 510] ^ sBox[(x1 << 1 & 510) + 1] ^ sBox[512 + (x1 >>> 7 & 510)] ^ sBox[512 + (x1 >>> 15 & 510) + 1];
        x2 ^= t0 + t1 + sKey[k++];
        x2 = x2 >>> 1 | x2 << 31;
        x3 = x3 << 1 | x3 >>> 31;
        x3 ^= t0 + 2 * t1 + sKey[k++];
        t0 = sBox[x2 << 1 & 510] ^ sBox[(x2 >>> 7 & 510) + 1] ^ sBox[512 + (x2 >>> 15 & 510)] ^ sBox[512 + (x2 >>> 23 & 510) + 1];
        t1 = sBox[x3 >>> 23 & 510] ^ sBox[(x3 << 1 & 510) + 1] ^ sBox[512 + (x3 >>> 7 & 510)] ^ sBox[512 + (x3 >>> 15 & 510) + 1];
        x0 ^= t0 + t1 + sKey[k++];
        x0 = x0 >>> 1 | x0 << 31;
        x1 = x1 << 1 | x1 >>> 31;
        x1 ^= t0 + 2 * t1 + sKey[k++];
      }
      outputBlock(cipher, oo, x2 ^ sKey[4], x3 ^ sKey[5], x0 ^ sKey[6], x1 ^ sKey[7]);
    }
    exports.encrypt = encrypt2;
    function decrypt2(cipher, io, plain, oo, [sBox, sKey]) {
      if (cipher.length < io + 16) {
        throw new Error("Incomplete ciphertext block.");
      }
      if (plain.length < oo + 16) {
        throw new Error("Insufficient space to write plaintext block.");
      }
      let x2 = (cipher[io++] | cipher[io++] << 8 | cipher[io++] << 16 | cipher[io++] << 24) ^ sKey[4];
      let x3 = (cipher[io++] | cipher[io++] << 8 | cipher[io++] << 16 | cipher[io++] << 24) ^ sKey[5];
      let x0 = (cipher[io++] | cipher[io++] << 8 | cipher[io++] << 16 | cipher[io++] << 24) ^ sKey[6];
      let x1 = (cipher[io++] | cipher[io++] << 8 | cipher[io++] << 16 | cipher[io++] << 24) ^ sKey[7];
      let t0;
      let t1;
      let k = ROUND_SUBKEYS + 2 * ROUNDS - 1;
      for (let R = 0; R < ROUNDS; R += 2) {
        t0 = sBox[x2 << 1 & 510] ^ sBox[(x2 >>> 7 & 510) + 1] ^ sBox[512 + (x2 >>> 15 & 510)] ^ sBox[512 + (x2 >>> 23 & 510) + 1];
        t1 = sBox[x3 >>> 23 & 510] ^ sBox[(x3 << 1 & 510) + 1] ^ sBox[512 + (x3 >>> 7 & 510)] ^ sBox[512 + (x3 >>> 15 & 510) + 1];
        x1 ^= t0 + 2 * t1 + sKey[k--];
        x1 = x1 >>> 1 | x1 << 31;
        x0 = x0 << 1 | x0 >>> 31;
        x0 ^= t0 + t1 + sKey[k--];
        t0 = sBox[x0 << 1 & 510] ^ sBox[(x0 >>> 7 & 510) + 1] ^ sBox[512 + (x0 >>> 15 & 510)] ^ sBox[512 + (x0 >>> 23 & 510) + 1];
        t1 = sBox[x1 >>> 23 & 510] ^ sBox[(x1 << 1 & 510) + 1] ^ sBox[512 + (x1 >>> 7 & 510)] ^ sBox[512 + (x1 >>> 15 & 510) + 1];
        x3 ^= t0 + 2 * t1 + sKey[k--];
        x3 = x3 >>> 1 | x3 << 31;
        x2 = x2 << 1 | x2 >>> 31;
        x2 ^= t0 + t1 + sKey[k--];
      }
      outputBlock(plain, oo, x0 ^ sKey[0], x1 ^ sKey[1], x2 ^ sKey[2], x3 ^ sKey[3]);
    }
    exports.decrypt = decrypt2;
  }
});

// node_modules/@xmldom/xmldom/lib/conventions.js
var require_conventions = __commonJS({
  "node_modules/@xmldom/xmldom/lib/conventions.js"(exports) {
    "use strict";
    function find(list, predicate, ac) {
      if (ac === void 0) {
        ac = Array.prototype;
      }
      if (list && typeof ac.find === "function") {
        return ac.find.call(list, predicate);
      }
      for (var i = 0; i < list.length; i++) {
        if (hasOwn(list, i)) {
          var item = list[i];
          if (predicate.call(void 0, item, i, list)) {
            return item;
          }
        }
      }
    }
    function freeze(object, oc) {
      if (oc === void 0) {
        oc = Object;
      }
      if (oc && typeof oc.getOwnPropertyDescriptors === "function") {
        object = oc.create(null, oc.getOwnPropertyDescriptors(object));
      }
      return oc && typeof oc.freeze === "function" ? oc.freeze(object) : object;
    }
    function hasOwn(object, key) {
      return Object.prototype.hasOwnProperty.call(object, key);
    }
    function assign2(target, source) {
      if (target === null || typeof target !== "object") {
        throw new TypeError("target is not an object");
      }
      for (var key in source) {
        if (hasOwn(source, key)) {
          target[key] = source[key];
        }
      }
      return target;
    }
    var HTML_BOOLEAN_ATTRIBUTES = freeze({
      allowfullscreen: true,
      async: true,
      autofocus: true,
      autoplay: true,
      checked: true,
      controls: true,
      default: true,
      defer: true,
      disabled: true,
      formnovalidate: true,
      hidden: true,
      ismap: true,
      itemscope: true,
      loop: true,
      multiple: true,
      muted: true,
      nomodule: true,
      novalidate: true,
      open: true,
      playsinline: true,
      readonly: true,
      required: true,
      reversed: true,
      selected: true
    });
    function isHTMLBooleanAttribute(name) {
      return hasOwn(HTML_BOOLEAN_ATTRIBUTES, name.toLowerCase());
    }
    var HTML_VOID_ELEMENTS = freeze({
      area: true,
      base: true,
      br: true,
      col: true,
      embed: true,
      hr: true,
      img: true,
      input: true,
      link: true,
      meta: true,
      param: true,
      source: true,
      track: true,
      wbr: true
    });
    function isHTMLVoidElement(tagName) {
      return hasOwn(HTML_VOID_ELEMENTS, tagName.toLowerCase());
    }
    var HTML_RAW_TEXT_ELEMENTS = freeze({
      script: false,
      style: false,
      textarea: true,
      title: true
    });
    function isHTMLRawTextElement(tagName) {
      var key = tagName.toLowerCase();
      return hasOwn(HTML_RAW_TEXT_ELEMENTS, key) && !HTML_RAW_TEXT_ELEMENTS[key];
    }
    function isHTMLEscapableRawTextElement(tagName) {
      var key = tagName.toLowerCase();
      return hasOwn(HTML_RAW_TEXT_ELEMENTS, key) && HTML_RAW_TEXT_ELEMENTS[key];
    }
    function isHTMLMimeType(mimeType) {
      return mimeType === MIME_TYPE.HTML;
    }
    function hasDefaultHTMLNamespace(mimeType) {
      return isHTMLMimeType(mimeType) || mimeType === MIME_TYPE.XML_XHTML_APPLICATION;
    }
    var MIME_TYPE = freeze({
      /**
       * `text/html`, the only mime type that triggers treating an XML document as HTML.
       *
       * @see https://www.iana.org/assignments/media-types/text/html IANA MimeType registration
       * @see https://en.wikipedia.org/wiki/HTML Wikipedia
       * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMParser/parseFromString MDN
       * @see https://html.spec.whatwg.org/multipage/dynamic-markup-insertion.html#dom-domparser-parsefromstring
       *      WHATWG HTML Spec
       */
      HTML: "text/html",
      /**
       * `application/xml`, the standard mime type for XML documents.
       *
       * @see https://www.iana.org/assignments/media-types/application/xml IANA MimeType
       *      registration
       * @see https://tools.ietf.org/html/rfc7303#section-9.1 RFC 7303
       * @see https://en.wikipedia.org/wiki/XML_and_MIME Wikipedia
       */
      XML_APPLICATION: "application/xml",
      /**
       * `text/xml`, an alias for `application/xml`.
       *
       * @see https://tools.ietf.org/html/rfc7303#section-9.2 RFC 7303
       * @see https://www.iana.org/assignments/media-types/text/xml IANA MimeType registration
       * @see https://en.wikipedia.org/wiki/XML_and_MIME Wikipedia
       */
      XML_TEXT: "text/xml",
      /**
       * `application/xhtml+xml`, indicates an XML document that has the default HTML namespace,
       * but is parsed as an XML document.
       *
       * @see https://www.iana.org/assignments/media-types/application/xhtml+xml IANA MimeType
       *      registration
       * @see https://dom.spec.whatwg.org/#dom-domimplementation-createdocument WHATWG DOM Spec
       * @see https://en.wikipedia.org/wiki/XHTML Wikipedia
       */
      XML_XHTML_APPLICATION: "application/xhtml+xml",
      /**
       * `image/svg+xml`,
       *
       * @see https://www.iana.org/assignments/media-types/image/svg+xml IANA MimeType registration
       * @see https://www.w3.org/TR/SVG11/ W3C SVG 1.1
       * @see https://en.wikipedia.org/wiki/Scalable_Vector_Graphics Wikipedia
       */
      XML_SVG_IMAGE: "image/svg+xml"
    });
    var _MIME_TYPES = Object.keys(MIME_TYPE).map(function(key) {
      return MIME_TYPE[key];
    });
    function isValidMimeType(mimeType) {
      return _MIME_TYPES.indexOf(mimeType) > -1;
    }
    var NAMESPACE = freeze({
      /**
       * The XHTML namespace.
       *
       * @see http://www.w3.org/1999/xhtml
       */
      HTML: "http://www.w3.org/1999/xhtml",
      /**
       * The SVG namespace.
       *
       * @see http://www.w3.org/2000/svg
       */
      SVG: "http://www.w3.org/2000/svg",
      /**
       * The `xml:` namespace.
       *
       * @see http://www.w3.org/XML/1998/namespace
       */
      XML: "http://www.w3.org/XML/1998/namespace",
      /**
       * The `xmlns:` namespace.
       *
       * @see https://www.w3.org/2000/xmlns/
       */
      XMLNS: "http://www.w3.org/2000/xmlns/"
    });
    exports.assign = assign2;
    exports.find = find;
    exports.freeze = freeze;
    exports.HTML_BOOLEAN_ATTRIBUTES = HTML_BOOLEAN_ATTRIBUTES;
    exports.HTML_RAW_TEXT_ELEMENTS = HTML_RAW_TEXT_ELEMENTS;
    exports.HTML_VOID_ELEMENTS = HTML_VOID_ELEMENTS;
    exports.hasDefaultHTMLNamespace = hasDefaultHTMLNamespace;
    exports.hasOwn = hasOwn;
    exports.isHTMLBooleanAttribute = isHTMLBooleanAttribute;
    exports.isHTMLRawTextElement = isHTMLRawTextElement;
    exports.isHTMLEscapableRawTextElement = isHTMLEscapableRawTextElement;
    exports.isHTMLMimeType = isHTMLMimeType;
    exports.isHTMLVoidElement = isHTMLVoidElement;
    exports.isValidMimeType = isValidMimeType;
    exports.MIME_TYPE = MIME_TYPE;
    exports.NAMESPACE = NAMESPACE;
  }
});

// node_modules/@xmldom/xmldom/lib/errors.js
var require_errors = __commonJS({
  "node_modules/@xmldom/xmldom/lib/errors.js"(exports) {
    "use strict";
    var conventions = require_conventions();
    function extendError(constructor, writableName) {
      constructor.prototype = Object.create(Error.prototype, {
        constructor: { value: constructor },
        name: { value: constructor.name, enumerable: true, writable: writableName }
      });
    }
    var DOMExceptionName = conventions.freeze({
      /**
       * the default value as defined by the spec
       */
      Error: "Error",
      /**
       * @deprecated
       * Use RangeError instead.
       */
      IndexSizeError: "IndexSizeError",
      /**
       * @deprecated
       * Just to match the related static code, not part of the spec.
       */
      DomstringSizeError: "DomstringSizeError",
      HierarchyRequestError: "HierarchyRequestError",
      WrongDocumentError: "WrongDocumentError",
      InvalidCharacterError: "InvalidCharacterError",
      /**
       * @deprecated
       * Just to match the related static code, not part of the spec.
       */
      NoDataAllowedError: "NoDataAllowedError",
      NoModificationAllowedError: "NoModificationAllowedError",
      NotFoundError: "NotFoundError",
      NotSupportedError: "NotSupportedError",
      InUseAttributeError: "InUseAttributeError",
      InvalidStateError: "InvalidStateError",
      SyntaxError: "SyntaxError",
      InvalidModificationError: "InvalidModificationError",
      NamespaceError: "NamespaceError",
      /**
       * @deprecated
       * Use TypeError for invalid arguments,
       * "NotSupportedError" DOMException for unsupported operations,
       * and "NotAllowedError" DOMException for denied requests instead.
       */
      InvalidAccessError: "InvalidAccessError",
      /**
       * @deprecated
       * Just to match the related static code, not part of the spec.
       */
      ValidationError: "ValidationError",
      /**
       * @deprecated
       * Use TypeError instead.
       */
      TypeMismatchError: "TypeMismatchError",
      SecurityError: "SecurityError",
      NetworkError: "NetworkError",
      AbortError: "AbortError",
      /**
       * @deprecated
       * Just to match the related static code, not part of the spec.
       */
      URLMismatchError: "URLMismatchError",
      QuotaExceededError: "QuotaExceededError",
      TimeoutError: "TimeoutError",
      InvalidNodeTypeError: "InvalidNodeTypeError",
      DataCloneError: "DataCloneError",
      EncodingError: "EncodingError",
      NotReadableError: "NotReadableError",
      UnknownError: "UnknownError",
      ConstraintError: "ConstraintError",
      DataError: "DataError",
      TransactionInactiveError: "TransactionInactiveError",
      ReadOnlyError: "ReadOnlyError",
      VersionError: "VersionError",
      OperationError: "OperationError",
      NotAllowedError: "NotAllowedError",
      OptOutError: "OptOutError"
    });
    var DOMExceptionNames = Object.keys(DOMExceptionName);
    function isValidDomExceptionCode(value) {
      return typeof value === "number" && value >= 1 && value <= 25;
    }
    function endsWithError(value) {
      return typeof value === "string" && value.substring(value.length - DOMExceptionName.Error.length) === DOMExceptionName.Error;
    }
    function DOMException(messageOrCode, nameOrMessage) {
      if (isValidDomExceptionCode(messageOrCode)) {
        this.name = DOMExceptionNames[messageOrCode];
        this.message = nameOrMessage || "";
      } else {
        this.message = messageOrCode;
        this.name = endsWithError(nameOrMessage) ? nameOrMessage : DOMExceptionName.Error;
      }
      if (Error.captureStackTrace) Error.captureStackTrace(this, DOMException);
    }
    extendError(DOMException, true);
    Object.defineProperties(DOMException.prototype, {
      code: {
        enumerable: true,
        get: function() {
          var code = DOMExceptionNames.indexOf(this.name);
          if (isValidDomExceptionCode(code)) return code;
          return 0;
        }
      }
    });
    var ExceptionCode = {
      INDEX_SIZE_ERR: 1,
      DOMSTRING_SIZE_ERR: 2,
      HIERARCHY_REQUEST_ERR: 3,
      WRONG_DOCUMENT_ERR: 4,
      INVALID_CHARACTER_ERR: 5,
      NO_DATA_ALLOWED_ERR: 6,
      NO_MODIFICATION_ALLOWED_ERR: 7,
      NOT_FOUND_ERR: 8,
      NOT_SUPPORTED_ERR: 9,
      INUSE_ATTRIBUTE_ERR: 10,
      INVALID_STATE_ERR: 11,
      SYNTAX_ERR: 12,
      INVALID_MODIFICATION_ERR: 13,
      NAMESPACE_ERR: 14,
      INVALID_ACCESS_ERR: 15,
      VALIDATION_ERR: 16,
      TYPE_MISMATCH_ERR: 17,
      SECURITY_ERR: 18,
      NETWORK_ERR: 19,
      ABORT_ERR: 20,
      URL_MISMATCH_ERR: 21,
      QUOTA_EXCEEDED_ERR: 22,
      TIMEOUT_ERR: 23,
      INVALID_NODE_TYPE_ERR: 24,
      DATA_CLONE_ERR: 25
    };
    var entries = Object.entries(ExceptionCode);
    for (i = 0; i < entries.length; i++) {
      key = entries[i][0];
      DOMException[key] = entries[i][1];
    }
    var key;
    var i;
    function ParseError(message, locator) {
      this.message = message;
      this.locator = locator;
      if (Error.captureStackTrace) Error.captureStackTrace(this, ParseError);
    }
    extendError(ParseError);
    exports.DOMException = DOMException;
    exports.DOMExceptionName = DOMExceptionName;
    exports.ExceptionCode = ExceptionCode;
    exports.ParseError = ParseError;
  }
});

// node_modules/@xmldom/xmldom/lib/grammar.js
var require_grammar = __commonJS({
  "node_modules/@xmldom/xmldom/lib/grammar.js"(exports) {
    "use strict";
    function detectUnicodeSupport(RegExpImpl) {
      try {
        if (typeof RegExpImpl !== "function") {
          RegExpImpl = RegExp;
        }
        var match = new RegExpImpl("\u{1D306}", "u").exec("\u{1D306}");
        return !!match && match[0].length === 2;
      } catch (error) {
      }
      return false;
    }
    var UNICODE_SUPPORT = detectUnicodeSupport();
    function chars(regexp) {
      if (regexp.source[0] !== "[") {
        throw new Error(regexp + " can not be used with chars");
      }
      return regexp.source.slice(1, regexp.source.lastIndexOf("]"));
    }
    function chars_without(regexp, search) {
      if (regexp.source[0] !== "[") {
        throw new Error("/" + regexp.source + "/ can not be used with chars_without");
      }
      if (!search || typeof search !== "string") {
        throw new Error(JSON.stringify(search) + " is not a valid search");
      }
      if (regexp.source.indexOf(search) === -1) {
        throw new Error('"' + search + '" is not is /' + regexp.source + "/");
      }
      if (search === "-" && regexp.source.indexOf(search) !== 1) {
        throw new Error('"' + search + '" is not at the first postion of /' + regexp.source + "/");
      }
      return new RegExp(regexp.source.replace(search, ""), UNICODE_SUPPORT ? "u" : "");
    }
    function reg(args) {
      var self = this;
      return new RegExp(
        Array.prototype.slice.call(arguments).map(function(part) {
          var isStr = typeof part === "string";
          if (isStr && self === void 0 && part === "|") {
            throw new Error("use regg instead of reg to wrap expressions with `|`!");
          }
          return isStr ? part : part.source;
        }).join(""),
        UNICODE_SUPPORT ? "mu" : "m"
      );
    }
    function regg(args) {
      if (arguments.length === 0) {
        throw new Error("no parameters provided");
      }
      return reg.apply(regg, ["(?:"].concat(Array.prototype.slice.call(arguments), [")"]));
    }
    var UNICODE_REPLACEMENT_CHARACTER = "\uFFFD";
    var Char = /[-\x09\x0A\x0D\x20-\x2C\x2E-\uD7FF\uE000-\uFFFD]/;
    if (UNICODE_SUPPORT) {
      Char = reg("[", chars(Char), "\\u{10000}-\\u{10FFFF}", "]");
    }
    var _SChar = /[\x20\x09\x0D\x0A]/;
    var SChar_s = chars(_SChar);
    var S = reg(_SChar, "+");
    var S_OPT = reg(_SChar, "*");
    var NameStartChar = /[:_a-zA-Z\xC0-\xD6\xD8-\xF6\xF8-\u02FF\u0370-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/;
    if (UNICODE_SUPPORT) {
      NameStartChar = reg("[", chars(NameStartChar), "\\u{10000}-\\u{10FFFF}", "]");
    }
    var NameStartChar_s = chars(NameStartChar);
    var NameChar = reg("[", NameStartChar_s, chars(/[-.0-9\xB7]/), chars(/[\u0300-\u036F\u203F-\u2040]/), "]");
    var Name = reg(NameStartChar, NameChar, "*");
    var Nmtoken = reg(NameChar, "+");
    var EntityRef = reg("&", Name, ";");
    var CharRef = regg(/&#[0-9]+;|&#x[0-9a-fA-F]+;/);
    var Reference = regg(EntityRef, "|", CharRef);
    var PEReference = reg("%", Name, ";");
    var EntityValue = regg(
      reg('"', regg(/[^%&"]/, "|", PEReference, "|", Reference), "*", '"'),
      "|",
      reg("'", regg(/[^%&']/, "|", PEReference, "|", Reference), "*", "'")
    );
    var AttValue = regg('"', regg(/[^<&"]/, "|", Reference), "*", '"', "|", "'", regg(/[^<&']/, "|", Reference), "*", "'");
    var NCNameStartChar = chars_without(NameStartChar, ":");
    var NCNameChar = chars_without(NameChar, ":");
    var NCName = reg(NCNameStartChar, NCNameChar, "*");
    var QName = reg(NCName, regg(":", NCName), "?");
    var QName_exact = reg("^", QName, "$");
    var QName_group = reg("(", QName, ")");
    var SystemLiteral = regg(/"[^"]*"|'[^']*'/);
    var PI = reg(/^<\?/, "(", Name, ")", regg(S, "(", Char, "*?)"), "?", /\?>/);
    var PubidChar = /[\x20\x0D\x0Aa-zA-Z0-9-'()+,./:=?;!*#@$_%]/;
    var PubidLiteral = regg('"', PubidChar, '*"', "|", "'", chars_without(PubidChar, "'"), "*'");
    var COMMENT_START = "<!--";
    var COMMENT_END = "-->";
    var Comment = reg(COMMENT_START, regg(chars_without(Char, "-"), "|", reg("-", chars_without(Char, "-"))), "*", COMMENT_END);
    var PCDATA = "#PCDATA";
    var Mixed = regg(
      reg(/\(/, S_OPT, PCDATA, regg(S_OPT, /\|/, S_OPT, QName), "*", S_OPT, /\)\*/),
      "|",
      reg(/\(/, S_OPT, PCDATA, S_OPT, /\)/)
    );
    var _children_quantity = /[?*+]?/;
    var children = reg(
      /\([^>]+\)/,
      _children_quantity
      /*regg(choice, '|', seq), _children_quantity*/
    );
    var contentspec = regg("EMPTY", "|", "ANY", "|", Mixed, "|", children);
    var ELEMENTDECL_START = "<!ELEMENT";
    var elementdecl = reg(ELEMENTDECL_START, S, regg(QName, "|", PEReference), S, regg(contentspec, "|", PEReference), S_OPT, ">");
    var NotationType = reg("NOTATION", S, /\(/, S_OPT, Name, regg(S_OPT, /\|/, S_OPT, Name), "*", S_OPT, /\)/);
    var Enumeration = reg(/\(/, S_OPT, Nmtoken, regg(S_OPT, /\|/, S_OPT, Nmtoken), "*", S_OPT, /\)/);
    var EnumeratedType = regg(NotationType, "|", Enumeration);
    var AttType = regg(/CDATA|ID|IDREF|IDREFS|ENTITY|ENTITIES|NMTOKEN|NMTOKENS/, "|", EnumeratedType);
    var DefaultDecl = regg(/#REQUIRED|#IMPLIED/, "|", regg(regg("#FIXED", S), "?", AttValue));
    var AttDef = regg(S, Name, S, AttType, S, DefaultDecl);
    var ATTLIST_DECL_START = "<!ATTLIST";
    var AttlistDecl = reg(ATTLIST_DECL_START, S, Name, AttDef, "*", S_OPT, ">");
    var ABOUT_LEGACY_COMPAT = "about:legacy-compat";
    var ABOUT_LEGACY_COMPAT_SystemLiteral = regg('"' + ABOUT_LEGACY_COMPAT + '"', "|", "'" + ABOUT_LEGACY_COMPAT + "'");
    var SYSTEM = "SYSTEM";
    var PUBLIC = "PUBLIC";
    var ExternalID = regg(regg(SYSTEM, S, SystemLiteral), "|", regg(PUBLIC, S, PubidLiteral, S, SystemLiteral));
    var ExternalID_match = reg(
      "^",
      regg(
        regg(SYSTEM, S, "(?<SystemLiteralOnly>", SystemLiteral, ")"),
        "|",
        regg(PUBLIC, S, "(?<PubidLiteral>", PubidLiteral, ")", S, "(?<SystemLiteral>", SystemLiteral, ")")
      )
    );
    var NDataDecl = regg(S, "NDATA", S, Name);
    var EntityDef = regg(EntityValue, "|", regg(ExternalID, NDataDecl, "?"));
    var ENTITY_DECL_START = "<!ENTITY";
    var GEDecl = reg(ENTITY_DECL_START, S, Name, S, EntityDef, S_OPT, ">");
    var PEDef = regg(EntityValue, "|", ExternalID);
    var PEDecl = reg(ENTITY_DECL_START, S, "%", S, Name, S, PEDef, S_OPT, ">");
    var EntityDecl = regg(GEDecl, "|", PEDecl);
    var PublicID = reg(PUBLIC, S, PubidLiteral);
    var NotationDecl = reg("<!NOTATION", S, Name, S, regg(ExternalID, "|", PublicID), S_OPT, ">");
    var Eq = reg(S_OPT, "=", S_OPT);
    var VersionNum = /1[.]\d+/;
    var VersionInfo = reg(S, "version", Eq, regg("'", VersionNum, "'", "|", '"', VersionNum, '"'));
    var EncName = /[A-Za-z][-A-Za-z0-9._]*/;
    var EncodingDecl = regg(S, "encoding", Eq, regg('"', EncName, '"', "|", "'", EncName, "'"));
    var SDDecl = regg(S, "standalone", Eq, regg("'", regg("yes", "|", "no"), "'", "|", '"', regg("yes", "|", "no"), '"'));
    var XMLDecl = reg(/^<\?xml/, VersionInfo, EncodingDecl, "?", SDDecl, "?", S_OPT, /\?>/);
    var DOCTYPE_DECL_START = "<!DOCTYPE";
    var CDATA_START = "<![CDATA[";
    var CDATA_END = "]]>";
    var CDStart = /<!\[CDATA\[/;
    var CDEnd = /\]\]>/;
    var CData = reg(Char, "*?", CDEnd);
    var CDSect = reg(CDStart, CData);
    exports.chars = chars;
    exports.chars_without = chars_without;
    exports.detectUnicodeSupport = detectUnicodeSupport;
    exports.reg = reg;
    exports.regg = regg;
    exports.ABOUT_LEGACY_COMPAT = ABOUT_LEGACY_COMPAT;
    exports.ABOUT_LEGACY_COMPAT_SystemLiteral = ABOUT_LEGACY_COMPAT_SystemLiteral;
    exports.AttlistDecl = AttlistDecl;
    exports.CDATA_START = CDATA_START;
    exports.CDATA_END = CDATA_END;
    exports.CDSect = CDSect;
    exports.Char = Char;
    exports.Comment = Comment;
    exports.COMMENT_START = COMMENT_START;
    exports.COMMENT_END = COMMENT_END;
    exports.DOCTYPE_DECL_START = DOCTYPE_DECL_START;
    exports.elementdecl = elementdecl;
    exports.EntityDecl = EntityDecl;
    exports.EntityValue = EntityValue;
    exports.ExternalID = ExternalID;
    exports.ExternalID_match = ExternalID_match;
    exports.Name = Name;
    exports.NotationDecl = NotationDecl;
    exports.Reference = Reference;
    exports.PEReference = PEReference;
    exports.PI = PI;
    exports.PUBLIC = PUBLIC;
    exports.PubidLiteral = PubidLiteral;
    exports.QName = QName;
    exports.QName_exact = QName_exact;
    exports.QName_group = QName_group;
    exports.S = S;
    exports.SChar_s = SChar_s;
    exports.S_OPT = S_OPT;
    exports.SYSTEM = SYSTEM;
    exports.SystemLiteral = SystemLiteral;
    exports.UNICODE_REPLACEMENT_CHARACTER = UNICODE_REPLACEMENT_CHARACTER;
    exports.UNICODE_SUPPORT = UNICODE_SUPPORT;
    exports.XMLDecl = XMLDecl;
  }
});

// node_modules/@xmldom/xmldom/lib/dom.js
var require_dom = __commonJS({
  "node_modules/@xmldom/xmldom/lib/dom.js"(exports) {
    "use strict";
    var conventions = require_conventions();
    var find = conventions.find;
    var hasDefaultHTMLNamespace = conventions.hasDefaultHTMLNamespace;
    var hasOwn = conventions.hasOwn;
    var isHTMLMimeType = conventions.isHTMLMimeType;
    var isHTMLRawTextElement = conventions.isHTMLRawTextElement;
    var isHTMLVoidElement = conventions.isHTMLVoidElement;
    var MIME_TYPE = conventions.MIME_TYPE;
    var NAMESPACE = conventions.NAMESPACE;
    var PDC = Symbol();
    var errors = require_errors();
    var DOMException = errors.DOMException;
    var DOMExceptionName = errors.DOMExceptionName;
    var g = require_grammar();
    function checkSymbol(symbol) {
      if (symbol !== PDC) {
        throw new TypeError("Illegal constructor");
      }
    }
    function notEmptyString(input) {
      return input !== "";
    }
    function splitOnASCIIWhitespace(input) {
      return input ? input.split(/[\t\n\f\r ]+/).filter(notEmptyString) : [];
    }
    function orderedSetReducer(current, element) {
      if (!hasOwn(current, element)) {
        current[element] = true;
      }
      return current;
    }
    function toOrderedSet(input) {
      if (!input) return [];
      var list = splitOnASCIIWhitespace(input);
      return Object.keys(list.reduce(orderedSetReducer, {}));
    }
    function arrayIncludes(list) {
      return function(element) {
        return list && list.indexOf(element) !== -1;
      };
    }
    function validateQualifiedName(qualifiedName) {
      if (!g.QName_exact.test(qualifiedName)) {
        throw new DOMException(DOMException.INVALID_CHARACTER_ERR, 'invalid character in qualified name "' + qualifiedName + '"');
      }
    }
    function validateAndExtract(namespace, qualifiedName) {
      validateQualifiedName(qualifiedName);
      namespace = namespace || null;
      var prefix = null;
      var localName = qualifiedName;
      if (qualifiedName.indexOf(":") >= 0) {
        var splitResult = qualifiedName.split(":");
        prefix = splitResult[0];
        localName = splitResult[1];
      }
      if (prefix !== null && namespace === null) {
        throw new DOMException(DOMException.NAMESPACE_ERR, "prefix is non-null and namespace is null");
      }
      if (prefix === "xml" && namespace !== conventions.NAMESPACE.XML) {
        throw new DOMException(DOMException.NAMESPACE_ERR, 'prefix is "xml" and namespace is not the XML namespace');
      }
      if ((prefix === "xmlns" || qualifiedName === "xmlns") && namespace !== conventions.NAMESPACE.XMLNS) {
        throw new DOMException(
          DOMException.NAMESPACE_ERR,
          'either qualifiedName or prefix is "xmlns" and namespace is not the XMLNS namespace'
        );
      }
      if (namespace === conventions.NAMESPACE.XMLNS && prefix !== "xmlns" && qualifiedName !== "xmlns") {
        throw new DOMException(
          DOMException.NAMESPACE_ERR,
          'namespace is the XMLNS namespace and neither qualifiedName nor prefix is "xmlns"'
        );
      }
      return [namespace, prefix, localName];
    }
    function copy(src, dest) {
      for (var p in src) {
        if (hasOwn(src, p)) {
          dest[p] = src[p];
        }
      }
    }
    function _extends(Class, Super) {
      var pt = Class.prototype;
      if (!(pt instanceof Super)) {
        let t = function() {
        };
        t.prototype = Super.prototype;
        t = new t();
        copy(pt, t);
        Class.prototype = pt = t;
      }
      if (pt.constructor != Class) {
        if (typeof Class != "function") {
          console.error("unknown Class:" + Class);
        }
        pt.constructor = Class;
      }
    }
    var NodeType = {};
    var ELEMENT_NODE = NodeType.ELEMENT_NODE = 1;
    var ATTRIBUTE_NODE = NodeType.ATTRIBUTE_NODE = 2;
    var TEXT_NODE = NodeType.TEXT_NODE = 3;
    var CDATA_SECTION_NODE = NodeType.CDATA_SECTION_NODE = 4;
    var ENTITY_REFERENCE_NODE = NodeType.ENTITY_REFERENCE_NODE = 5;
    var ENTITY_NODE = NodeType.ENTITY_NODE = 6;
    var PROCESSING_INSTRUCTION_NODE = NodeType.PROCESSING_INSTRUCTION_NODE = 7;
    var COMMENT_NODE = NodeType.COMMENT_NODE = 8;
    var DOCUMENT_NODE = NodeType.DOCUMENT_NODE = 9;
    var DOCUMENT_TYPE_NODE = NodeType.DOCUMENT_TYPE_NODE = 10;
    var DOCUMENT_FRAGMENT_NODE = NodeType.DOCUMENT_FRAGMENT_NODE = 11;
    var NOTATION_NODE = NodeType.NOTATION_NODE = 12;
    var DocumentPosition = conventions.freeze({
      DOCUMENT_POSITION_DISCONNECTED: 1,
      DOCUMENT_POSITION_PRECEDING: 2,
      DOCUMENT_POSITION_FOLLOWING: 4,
      DOCUMENT_POSITION_CONTAINS: 8,
      DOCUMENT_POSITION_CONTAINED_BY: 16,
      DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: 32
    });
    function commonAncestor(a, b) {
      if (b.length < a.length) return commonAncestor(b, a);
      var c = null;
      for (var n in a) {
        if (a[n] !== b[n]) return c;
        c = a[n];
      }
      return c;
    }
    function docGUID(doc) {
      if (!doc.guid) doc.guid = Math.random();
      return doc.guid;
    }
    function NodeList() {
    }
    NodeList.prototype = {
      /**
       * The number of nodes in the list. The range of valid child node indices is 0 to length-1
       * inclusive.
       *
       * @type {number}
       */
      length: 0,
      /**
       * Returns the item at `index`. If index is greater than or equal to the number of nodes in
       * the list, this returns null.
       *
       * @param index
       * Unsigned long Index into the collection.
       * @returns {Node | null}
       * The node at position `index` in the NodeList,
       * or null if that is not a valid index.
       */
      item: function(index) {
        return index >= 0 && index < this.length ? this[index] : null;
      },
      /**
       * Returns a string representation of the NodeList.
       *
       * @param {unknown} nodeFilter
       * __A filter function? Not implemented according to the spec?__.
       * @returns {string}
       * A string representation of the NodeList.
       */
      toString: function(nodeFilter) {
        for (var buf = [], i = 0; i < this.length; i++) {
          serializeToString(this[i], buf, nodeFilter);
        }
        return buf.join("");
      },
      /**
       * Filters the NodeList based on a predicate.
       *
       * @param {function(Node): boolean} predicate
       * - A predicate function to filter the NodeList.
       * @returns {Node[]}
       * An array of nodes that satisfy the predicate.
       * @private
       */
      filter: function(predicate) {
        return Array.prototype.filter.call(this, predicate);
      },
      /**
       * Returns the first index at which a given node can be found in the NodeList, or -1 if it is
       * not present.
       *
       * @param {Node} item
       * - The Node item to locate in the NodeList.
       * @returns {number}
       * The first index of the node in the NodeList; -1 if not found.
       * @private
       */
      indexOf: function(item) {
        return Array.prototype.indexOf.call(this, item);
      }
    };
    NodeList.prototype[Symbol.iterator] = function() {
      var me = this;
      var index = 0;
      return {
        next: function() {
          if (index < me.length) {
            return {
              value: me[index++],
              done: false
            };
          } else {
            return {
              done: true
            };
          }
        },
        return: function() {
          return {
            done: true
          };
        }
      };
    };
    function LiveNodeList(node, refresh) {
      this._node = node;
      this._refresh = refresh;
      _updateLiveList(this);
    }
    function _updateLiveList(list) {
      var inc = list._node._inc || list._node.ownerDocument._inc;
      if (list._inc !== inc) {
        var ls = list._refresh(list._node);
        __set__(list, "length", ls.length);
        if (!list.$$length || ls.length < list.$$length) {
          for (var i = ls.length; i in list; i++) {
            if (hasOwn(list, i)) {
              delete list[i];
            }
          }
        }
        copy(ls, list);
        list._inc = inc;
      }
    }
    LiveNodeList.prototype.item = function(i) {
      _updateLiveList(this);
      return this[i] || null;
    };
    _extends(LiveNodeList, NodeList);
    function NamedNodeMap() {
    }
    function _findNodeIndex(list, node) {
      var i = 0;
      while (i < list.length) {
        if (list[i] === node) {
          return i;
        }
        i++;
      }
    }
    function _addNamedNode(el, list, newAttr, oldAttr) {
      if (oldAttr) {
        list[_findNodeIndex(list, oldAttr)] = newAttr;
      } else {
        list[list.length] = newAttr;
        list.length++;
      }
      if (el) {
        newAttr.ownerElement = el;
        var doc = el.ownerDocument;
        if (doc) {
          oldAttr && _onRemoveAttribute(doc, el, oldAttr);
          _onAddAttribute(doc, el, newAttr);
        }
      }
    }
    function _removeNamedNode(el, list, attr) {
      var i = _findNodeIndex(list, attr);
      if (i >= 0) {
        var lastIndex = list.length - 1;
        while (i <= lastIndex) {
          list[i] = list[++i];
        }
        list.length = lastIndex;
        if (el) {
          var doc = el.ownerDocument;
          if (doc) {
            _onRemoveAttribute(doc, el, attr);
          }
          attr.ownerElement = null;
        }
      }
    }
    NamedNodeMap.prototype = {
      length: 0,
      item: NodeList.prototype.item,
      /**
       * Get an attribute by name. Note: Name is in lower case in case of HTML namespace and
       * document.
       *
       * @param {string} localName
       * The local name of the attribute.
       * @returns {Attr | null}
       * The attribute with the given local name, or null if no such attribute exists.
       * @see https://dom.spec.whatwg.org/#concept-element-attributes-get-by-name
       */
      getNamedItem: function(localName) {
        if (this._ownerElement && this._ownerElement._isInHTMLDocumentAndNamespace()) {
          localName = localName.toLowerCase();
        }
        var i = 0;
        while (i < this.length) {
          var attr = this[i];
          if (attr.nodeName === localName) {
            return attr;
          }
          i++;
        }
        return null;
      },
      /**
       * Set an attribute.
       *
       * @param {Attr} attr
       * The attribute to set.
       * @returns {Attr | null}
       * The old attribute with the same local name and namespace URI as the new one, or null if no
       * such attribute exists.
       * @throws {DOMException}
       * With code:
       * - {@link INUSE_ATTRIBUTE_ERR} - If the attribute is already an attribute of another
       * element.
       * @see https://dom.spec.whatwg.org/#concept-element-attributes-set
       */
      setNamedItem: function(attr) {
        var el = attr.ownerElement;
        if (el && el !== this._ownerElement) {
          throw new DOMException(DOMException.INUSE_ATTRIBUTE_ERR);
        }
        var oldAttr = this.getNamedItemNS(attr.namespaceURI, attr.localName);
        if (oldAttr === attr) {
          return attr;
        }
        _addNamedNode(this._ownerElement, this, attr, oldAttr);
        return oldAttr;
      },
      /**
       * Set an attribute, replacing an existing attribute with the same local name and namespace
       * URI if one exists.
       *
       * @param {Attr} attr
       * The attribute to set.
       * @returns {Attr | null}
       * The old attribute with the same local name and namespace URI as the new one, or null if no
       * such attribute exists.
       * @throws {DOMException}
       * Throws a DOMException with the name "InUseAttributeError" if the attribute is already an
       * attribute of another element.
       * @see https://dom.spec.whatwg.org/#concept-element-attributes-set
       */
      setNamedItemNS: function(attr) {
        return this.setNamedItem(attr);
      },
      /**
       * Removes an attribute specified by the local name.
       *
       * @param {string} localName
       * The local name of the attribute to be removed.
       * @returns {Attr}
       * The attribute node that was removed.
       * @throws {DOMException}
       * With code:
       * - {@link DOMException.NOT_FOUND_ERR} if no attribute with the given name is found.
       * @see https://dom.spec.whatwg.org/#dom-namednodemap-removenameditem
       * @see https://dom.spec.whatwg.org/#concept-element-attributes-remove-by-name
       */
      removeNamedItem: function(localName) {
        var attr = this.getNamedItem(localName);
        if (!attr) {
          throw new DOMException(DOMException.NOT_FOUND_ERR, localName);
        }
        _removeNamedNode(this._ownerElement, this, attr);
        return attr;
      },
      /**
       * Removes an attribute specified by the namespace and local name.
       *
       * @param {string | null} namespaceURI
       * The namespace URI of the attribute to be removed.
       * @param {string} localName
       * The local name of the attribute to be removed.
       * @returns {Attr}
       * The attribute node that was removed.
       * @throws {DOMException}
       * With code:
       * - {@link DOMException.NOT_FOUND_ERR} if no attribute with the given namespace URI and local
       * name is found.
       * @see https://dom.spec.whatwg.org/#dom-namednodemap-removenameditemns
       * @see https://dom.spec.whatwg.org/#concept-element-attributes-remove-by-namespace
       */
      removeNamedItemNS: function(namespaceURI, localName) {
        var attr = this.getNamedItemNS(namespaceURI, localName);
        if (!attr) {
          throw new DOMException(DOMException.NOT_FOUND_ERR, namespaceURI ? namespaceURI + " : " + localName : localName);
        }
        _removeNamedNode(this._ownerElement, this, attr);
        return attr;
      },
      /**
       * Get an attribute by namespace and local name.
       *
       * @param {string | null} namespaceURI
       * The namespace URI of the attribute.
       * @param {string} localName
       * The local name of the attribute.
       * @returns {Attr | null}
       * The attribute with the given namespace URI and local name, or null if no such attribute
       * exists.
       * @see https://dom.spec.whatwg.org/#concept-element-attributes-get-by-namespace
       */
      getNamedItemNS: function(namespaceURI, localName) {
        if (!namespaceURI) {
          namespaceURI = null;
        }
        var i = 0;
        while (i < this.length) {
          var node = this[i];
          if (node.localName === localName && node.namespaceURI === namespaceURI) {
            return node;
          }
          i++;
        }
        return null;
      }
    };
    NamedNodeMap.prototype[Symbol.iterator] = function() {
      var me = this;
      var index = 0;
      return {
        next: function() {
          if (index < me.length) {
            return {
              value: me[index++],
              done: false
            };
          } else {
            return {
              done: true
            };
          }
        },
        return: function() {
          return {
            done: true
          };
        }
      };
    };
    function DOMImplementation2() {
    }
    DOMImplementation2.prototype = {
      /**
       * Test if the DOM implementation implements a specific feature and version, as specified in
       * {@link https://www.w3.org/TR/DOM-Level-3-Core/core.html#DOMFeatures DOM Features}.
       *
       * The DOMImplementation.hasFeature() method returns a Boolean flag indicating if a given
       * feature is supported. The different implementations fairly diverged in what kind of
       * features were reported. The latest version of the spec settled to force this method to
       * always return true, where the functionality was accurate and in use.
       *
       * @deprecated
       * It is deprecated and modern browsers return true in all cases.
       * @function DOMImplementation#hasFeature
       * @param {string} feature
       * The name of the feature to test.
       * @param {string} [version]
       * This is the version number of the feature to test.
       * @returns {boolean}
       * Always returns true.
       * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/hasFeature MDN
       * @see https://www.w3.org/TR/REC-DOM-Level-1/level-one-core.html#ID-5CED94D7 DOM Level 1 Core
       * @see https://dom.spec.whatwg.org/#dom-domimplementation-hasfeature DOM Living Standard
       * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#ID-5CED94D7 DOM Level 3 Core
       */
      hasFeature: function(feature, version) {
        return true;
      },
      /**
       * Creates a DOM Document object of the specified type with its document element. Note that
       * based on the {@link DocumentType}
       * given to create the document, the implementation may instantiate specialized
       * {@link Document} objects that support additional features than the "Core", such as "HTML"
       * {@link https://www.w3.org/TR/DOM-Level-3-Core/references.html#DOM2HTML DOM Level 2 HTML}.
       * On the other hand, setting the {@link DocumentType} after the document was created makes
       * this very unlikely to happen. Alternatively, specialized {@link Document} creation methods,
       * such as createHTMLDocument
       * {@link https://www.w3.org/TR/DOM-Level-3-Core/references.html#DOM2HTML DOM Level 2 HTML},
       * can be used to obtain specific types of {@link Document} objects.
       *
       * __It behaves slightly different from the description in the living standard__:
       * - There is no interface/class `XMLDocument`, it returns a `Document`
       * instance (with it's `type` set to `'xml'`).
       * - `encoding`, `mode`, `origin`, `url` fields are currently not declared.
       *
       * @function DOMImplementation.createDocument
       * @param {string | null} namespaceURI
       * The
       * {@link https://www.w3.org/TR/DOM-Level-3-Core/glossary.html#dt-namespaceURI namespace URI}
       * of the document element to create or null.
       * @param {string | null} qualifiedName
       * The
       * {@link https://www.w3.org/TR/DOM-Level-3-Core/glossary.html#dt-qualifiedname qualified name}
       * of the document element to be created or null.
       * @param {DocumentType | null} [doctype=null]
       * The type of document to be created or null. When doctype is not null, its
       * {@link Node#ownerDocument} attribute is set to the document being created. Default is
       * `null`
       * @returns {Document}
       * A new {@link Document} object with its document element. If the NamespaceURI,
       * qualifiedName, and doctype are null, the returned {@link Document} is empty with no
       * document element.
       * @throws {DOMException}
       * With code:
       *
       * - `INVALID_CHARACTER_ERR`: Raised if the specified qualified name is not an XML name
       * according to {@link https://www.w3.org/TR/DOM-Level-3-Core/references.html#XML XML 1.0}.
       * - `NAMESPACE_ERR`: Raised if the qualifiedName is malformed, if the qualifiedName has a
       * prefix and the namespaceURI is null, or if the qualifiedName is null and the namespaceURI
       * is different from null, or if the qualifiedName has a prefix that is "xml" and the
       * namespaceURI is different from "{@link http://www.w3.org/XML/1998/namespace}"
       * {@link https://www.w3.org/TR/DOM-Level-3-Core/references.html#Namespaces XML Namespaces},
       * or if the DOM implementation does not support the "XML" feature but a non-null namespace
       * URI was provided, since namespaces were defined by XML.
       * - `WRONG_DOCUMENT_ERR`: Raised if doctype has already been used with a different document
       * or was created from a different implementation.
       * - `NOT_SUPPORTED_ERR`: May be raised if the implementation does not support the feature
       * "XML" and the language exposed through the Document does not support XML Namespaces (such
       * as {@link https://www.w3.org/TR/DOM-Level-3-Core/references.html#HTML40 HTML 4.01}).
       * @since DOM Level 2.
       * @see {@link #createHTMLDocument}
       * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/createDocument MDN
       * @see https://dom.spec.whatwg.org/#dom-domimplementation-createdocument DOM Living Standard
       * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#Level-2-Core-DOM-createDocument DOM
       *      Level 3 Core
       * @see https://www.w3.org/TR/DOM-Level-2-Core/core.html#Level-2-Core-DOM-createDocument DOM
       *      Level 2 Core (initial)
       */
      createDocument: function(namespaceURI, qualifiedName, doctype) {
        var contentType = MIME_TYPE.XML_APPLICATION;
        if (namespaceURI === NAMESPACE.HTML) {
          contentType = MIME_TYPE.XML_XHTML_APPLICATION;
        } else if (namespaceURI === NAMESPACE.SVG) {
          contentType = MIME_TYPE.XML_SVG_IMAGE;
        }
        var doc = new Document(PDC, { contentType });
        doc.implementation = this;
        doc.childNodes = new NodeList();
        doc.doctype = doctype || null;
        if (doctype) {
          doc.appendChild(doctype);
        }
        if (qualifiedName) {
          var root = doc.createElementNS(namespaceURI, qualifiedName);
          doc.appendChild(root);
        }
        return doc;
      },
      /**
       * Creates an empty DocumentType node. Entity declarations and notations are not made
       * available. Entity reference expansions and default attribute additions do not occur.
       *
       * **This behavior is slightly different from the one in the specs**:
       * - `encoding`, `mode`, `origin`, `url` fields are currently not declared.
       * - `publicId` and `systemId` contain the raw data including any possible quotes,
       *   so they can always be serialized back to the original value
       * - `internalSubset` contains the raw string between `[` and `]` if present,
       *   but is not parsed or validated in any form.
       *
       * @function DOMImplementation#createDocumentType
       * @param {string} qualifiedName
       * The {@link https://www.w3.org/TR/DOM-Level-3-Core/glossary.html#dt-qualifiedname qualified
       * name} of the document type to be created.
       * @param {string} [publicId]
       * The external subset public identifier.
       * @param {string} [systemId]
       * The external subset system identifier.
       * @param {string} [internalSubset]
       * the internal subset or an empty string if it is not present
       * @returns {DocumentType}
       * A new {@link DocumentType} node with {@link Node#ownerDocument} set to null.
       * @throws {DOMException}
       * With code:
       *
       * - `INVALID_CHARACTER_ERR`: Raised if the specified qualified name is not an XML name
       * according to {@link https://www.w3.org/TR/DOM-Level-3-Core/references.html#XML XML 1.0}.
       * - `NAMESPACE_ERR`: Raised if the qualifiedName is malformed.
       * - `NOT_SUPPORTED_ERR`: May be raised if the implementation does not support the feature
       * "XML" and the language exposed through the Document does not support XML Namespaces (such
       * as {@link https://www.w3.org/TR/DOM-Level-3-Core/references.html#HTML40 HTML 4.01}).
       * @since DOM Level 2.
       * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/createDocumentType
       *      MDN
       * @see https://dom.spec.whatwg.org/#dom-domimplementation-createdocumenttype DOM Living
       *      Standard
       * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#Level-3-Core-DOM-createDocType DOM
       *      Level 3 Core
       * @see https://www.w3.org/TR/DOM-Level-2-Core/core.html#Level-2-Core-DOM-createDocType DOM
       *      Level 2 Core
       * @see https://github.com/xmldom/xmldom/blob/master/CHANGELOG.md#050
       * @see https://www.w3.org/TR/DOM-Level-2-Core/#core-ID-Core-DocType-internalSubset
       * @prettierignore
       */
      createDocumentType: function(qualifiedName, publicId, systemId, internalSubset) {
        validateQualifiedName(qualifiedName);
        var node = new DocumentType(PDC);
        node.name = qualifiedName;
        node.nodeName = qualifiedName;
        node.publicId = publicId || "";
        node.systemId = systemId || "";
        node.internalSubset = internalSubset || "";
        node.childNodes = new NodeList();
        return node;
      },
      /**
       * Returns an HTML document, that might already have a basic DOM structure.
       *
       * __It behaves slightly different from the description in the living standard__:
       * - If the first argument is `false` no initial nodes are added (steps 3-7 in the specs are
       * omitted)
       * - `encoding`, `mode`, `origin`, `url` fields are currently not declared.
       *
       * @param {string | false} [title]
       * A string containing the title to give the new HTML document.
       * @returns {Document}
       * The HTML document.
       * @since WHATWG Living Standard.
       * @see {@link #createDocument}
       * @see https://dom.spec.whatwg.org/#dom-domimplementation-createhtmldocument
       * @see https://dom.spec.whatwg.org/#html-document
       */
      createHTMLDocument: function(title) {
        var doc = new Document(PDC, { contentType: MIME_TYPE.HTML });
        doc.implementation = this;
        doc.childNodes = new NodeList();
        if (title !== false) {
          doc.doctype = this.createDocumentType("html");
          doc.doctype.ownerDocument = doc;
          doc.appendChild(doc.doctype);
          var htmlNode = doc.createElement("html");
          doc.appendChild(htmlNode);
          var headNode = doc.createElement("head");
          htmlNode.appendChild(headNode);
          if (typeof title === "string") {
            var titleNode = doc.createElement("title");
            titleNode.appendChild(doc.createTextNode(title));
            headNode.appendChild(titleNode);
          }
          htmlNode.appendChild(doc.createElement("body"));
        }
        return doc;
      }
    };
    function Node2(symbol) {
      checkSymbol(symbol);
    }
    Node2.prototype = {
      /**
       * The first child of this node.
       *
       * @type {Node | null}
       */
      firstChild: null,
      /**
       * The last child of this node.
       *
       * @type {Node | null}
       */
      lastChild: null,
      /**
       * The previous sibling of this node.
       *
       * @type {Node | null}
       */
      previousSibling: null,
      /**
       * The next sibling of this node.
       *
       * @type {Node | null}
       */
      nextSibling: null,
      /**
       * The parent node of this node.
       *
       * @type {Node | null}
       */
      parentNode: null,
      /**
       * The parent element of this node.
       *
       * @type {Element | null}
       */
      get parentElement() {
        return this.parentNode && this.parentNode.nodeType === this.ELEMENT_NODE ? this.parentNode : null;
      },
      /**
       * The child nodes of this node.
       *
       * @type {NodeList}
       */
      childNodes: null,
      /**
       * The document object associated with this node.
       *
       * @type {Document | null}
       */
      ownerDocument: null,
      /**
       * The value of this node.
       *
       * @type {string | null}
       */
      nodeValue: null,
      /**
       * The namespace URI of this node.
       *
       * @type {string | null}
       */
      namespaceURI: null,
      /**
       * The prefix of the namespace for this node.
       *
       * @type {string | null}
       */
      prefix: null,
      /**
       * The local part of the qualified name of this node.
       *
       * @type {string | null}
       */
      localName: null,
      /**
       * The baseURI is currently always `about:blank`,
       * since that's what happens when you create a document from scratch.
       *
       * @type {'about:blank'}
       */
      baseURI: "about:blank",
      /**
       * Is true if this node is part of a document.
       *
       * @type {boolean}
       */
      get isConnected() {
        var rootNode = this.getRootNode();
        return rootNode && rootNode.nodeType === rootNode.DOCUMENT_NODE;
      },
      /**
       * Checks whether `other` is an inclusive descendant of this node.
       *
       * @param {Node | null | undefined} other
       * The node to check.
       * @returns {boolean}
       * True if `other` is an inclusive descendant of this node; false otherwise.
       * @see https://dom.spec.whatwg.org/#dom-node-contains
       */
      contains: function(other) {
        if (!other) return false;
        var parent = other;
        do {
          if (this === parent) return true;
          parent = other.parentNode;
        } while (parent);
        return false;
      },
      /**
       * @typedef GetRootNodeOptions
       * @property {boolean} [composed=false]
       */
      /**
       * Searches for the root node of this node.
       *
       * **This behavior is slightly different from the in the specs**:
       * - ignores `options.composed`, since `ShadowRoot`s are unsupported, always returns root.
       *
       * @param {GetRootNodeOptions} [options]
       * @returns {Node}
       * Root node.
       * @see https://dom.spec.whatwg.org/#dom-node-getrootnode
       * @see https://dom.spec.whatwg.org/#concept-shadow-including-root
       */
      getRootNode: function(options) {
        var parent = this;
        do {
          if (!parent.parentNode) {
            return parent;
          }
          parent = parent.parentNode;
        } while (parent);
      },
      /**
       * Checks whether the given node is equal to this node.
       *
       * @param {Node} [otherNode]
       * @see https://dom.spec.whatwg.org/#concept-node-equals
       */
      isEqualNode: function(otherNode) {
        if (!otherNode) return false;
        if (this.nodeType !== otherNode.nodeType) return false;
        switch (this.nodeType) {
          case this.DOCUMENT_TYPE_NODE:
            if (this.name !== otherNode.name) return false;
            if (this.publicId !== otherNode.publicId) return false;
            if (this.systemId !== otherNode.systemId) return false;
            break;
          case this.ELEMENT_NODE:
            if (this.namespaceURI !== otherNode.namespaceURI) return false;
            if (this.prefix !== otherNode.prefix) return false;
            if (this.localName !== otherNode.localName) return false;
            if (this.attributes.length !== otherNode.attributes.length) return false;
            for (var i = 0; i < this.attributes.length; i++) {
              var attr = this.attributes.item(i);
              if (!attr.isEqualNode(otherNode.getAttributeNodeNS(attr.namespaceURI, attr.localName))) {
                return false;
              }
            }
            break;
          case this.ATTRIBUTE_NODE:
            if (this.namespaceURI !== otherNode.namespaceURI) return false;
            if (this.localName !== otherNode.localName) return false;
            if (this.value !== otherNode.value) return false;
            break;
          case this.PROCESSING_INSTRUCTION_NODE:
            if (this.target !== otherNode.target || this.data !== otherNode.data) {
              return false;
            }
            break;
          case this.TEXT_NODE:
          case this.COMMENT_NODE:
            if (this.data !== otherNode.data) return false;
            break;
        }
        if (this.childNodes.length !== otherNode.childNodes.length) {
          return false;
        }
        for (var i = 0; i < this.childNodes.length; i++) {
          if (!this.childNodes[i].isEqualNode(otherNode.childNodes[i])) {
            return false;
          }
        }
        return true;
      },
      /**
       * Checks whether or not the given node is this node.
       *
       * @param {Node} [otherNode]
       */
      isSameNode: function(otherNode) {
        return this === otherNode;
      },
      /**
       * Inserts a node before a reference node as a child of this node.
       *
       * @param {Node} newChild
       * The new child node to be inserted.
       * @param {Node | null} refChild
       * The reference node before which newChild will be inserted.
       * @returns {Node}
       * The new child node successfully inserted.
       * @throws {DOMException}
       * Throws a DOMException if inserting the node would result in a DOM tree that is not
       * well-formed, or if `child` is provided but is not a child of `parent`.
       * See {@link _insertBefore} for more details.
       * @since Modified in DOM L2
       */
      insertBefore: function(newChild, refChild) {
        return _insertBefore(this, newChild, refChild);
      },
      /**
       * Replaces an old child node with a new child node within this node.
       *
       * @param {Node} newChild
       * The new node that is to replace the old node.
       * If it already exists in the DOM, it is removed from its original position.
       * @param {Node} oldChild
       * The existing child node to be replaced.
       * @returns {Node}
       * Returns the replaced child node.
       * @throws {DOMException}
       * Throws a DOMException if replacing the node would result in a DOM tree that is not
       * well-formed, or if `oldChild` is not a child of `this`.
       * This can also occur if the pre-replacement validity assertion fails.
       * See {@link _insertBefore}, {@link Node.removeChild}, and
       * {@link assertPreReplacementValidityInDocument} for more details.
       * @see https://dom.spec.whatwg.org/#concept-node-replace
       */
      replaceChild: function(newChild, oldChild) {
        _insertBefore(this, newChild, oldChild, assertPreReplacementValidityInDocument);
        if (oldChild) {
          this.removeChild(oldChild);
        }
      },
      /**
       * Removes an existing child node from this node.
       *
       * @param {Node} oldChild
       * The child node to be removed.
       * @returns {Node}
       * Returns the removed child node.
       * @throws {DOMException}
       * Throws a DOMException if `oldChild` is not a child of `this`.
       * See {@link _removeChild} for more details.
       */
      removeChild: function(oldChild) {
        return _removeChild(this, oldChild);
      },
      /**
       * Appends a child node to this node.
       *
       * @param {Node} newChild
       * The child node to be appended to this node.
       * If it already exists in the DOM, it is removed from its original position.
       * @returns {Node}
       * Returns the appended child node.
       * @throws {DOMException}
       * Throws a DOMException if appending the node would result in a DOM tree that is not
       * well-formed, or if `newChild` is not a valid Node.
       * See {@link insertBefore} for more details.
       */
      appendChild: function(newChild) {
        return this.insertBefore(newChild, null);
      },
      /**
       * Determines whether this node has any child nodes.
       *
       * @returns {boolean}
       * Returns true if this node has any child nodes, and false otherwise.
       */
      hasChildNodes: function() {
        return this.firstChild != null;
      },
      /**
       * Creates a copy of the calling node.
       *
       * @param {boolean} deep
       * If true, the contents of the node are recursively copied.
       * If false, only the node itself (and its attributes, if it is an element) are copied.
       * @returns {Node}
       * Returns the newly created copy of the node.
       * @throws {DOMException}
       * May throw a DOMException if operations within {@link Element#setAttributeNode} or
       * {@link Node#appendChild} (which are potentially invoked in this method) do not meet their
       * specific constraints.
       * @see {@link cloneNode}
       */
      cloneNode: function(deep) {
        return cloneNode(this.ownerDocument || this, this, deep);
      },
      /**
       * Puts the specified node and all of its subtree into a "normalized" form. In a normalized
       * subtree, no text nodes in the subtree are empty and there are no adjacent text nodes.
       *
       * Specifically, this method merges any adjacent text nodes (i.e., nodes for which `nodeType`
       * is `TEXT_NODE`) into a single node with the combined data. It also removes any empty text
       * nodes.
       *
       * This method operates recursively, so it also normalizes any and all descendent nodes within
       * the subtree.
       *
       * @throws {DOMException}
       * May throw a DOMException if operations within removeChild or appendData (which are
       * potentially invoked in this method) do not meet their specific constraints.
       * @since Modified in DOM Level 2
       * @see {@link Node.removeChild}
       * @see {@link CharacterData.appendData}
       */
      normalize: function() {
        var child = this.firstChild;
        while (child) {
          var next = child.nextSibling;
          if (next && next.nodeType == TEXT_NODE && child.nodeType == TEXT_NODE) {
            this.removeChild(next);
            child.appendData(next.data);
          } else {
            child.normalize();
            child = next;
          }
        }
      },
      /**
       * Checks whether the DOM implementation implements a specific feature and its version.
       *
       * @deprecated
       * Since `DOMImplementation.hasFeature` is deprecated and always returns true.
       * @param {string} feature
       * The package name of the feature to test. This is the same name that can be passed to the
       * method `hasFeature` on `DOMImplementation`.
       * @param {string} version
       * This is the version number of the package name to test.
       * @returns {boolean}
       * Returns true in all cases in the current implementation.
       * @since Introduced in DOM Level 2
       * @see {@link DOMImplementation.hasFeature}
       */
      isSupported: function(feature, version) {
        return this.ownerDocument.implementation.hasFeature(feature, version);
      },
      /**
       * Look up the prefix associated to the given namespace URI, starting from this node.
       * **The default namespace declarations are ignored by this method.**
       * See Namespace Prefix Lookup for details on the algorithm used by this method.
       *
       * **This behavior is different from the in the specs**:
       * - no node type specific handling
       * - uses the internal attribute _nsMap for resolving namespaces that is updated when changing attributes
       *
       * @param {string | null} namespaceURI
       * The namespace URI for which to find the associated prefix.
       * @returns {string | null}
       * The associated prefix, if found; otherwise, null.
       * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#Node3-lookupNamespacePrefix
       * @see https://www.w3.org/TR/DOM-Level-3-Core/namespaces-algorithms.html#lookupNamespacePrefixAlgo
       * @see https://dom.spec.whatwg.org/#dom-node-lookupprefix
       * @see https://github.com/xmldom/xmldom/issues/322
       * @prettierignore
       */
      lookupPrefix: function(namespaceURI) {
        var el = this;
        while (el) {
          var map = el._nsMap;
          if (map) {
            for (var n in map) {
              if (hasOwn(map, n) && map[n] === namespaceURI) {
                return n;
              }
            }
          }
          el = el.nodeType == ATTRIBUTE_NODE ? el.ownerDocument : el.parentNode;
        }
        return null;
      },
      /**
       * This function is used to look up the namespace URI associated with the given prefix,
       * starting from this node.
       *
       * **This behavior is different from the in the specs**:
       * - no node type specific handling
       * - uses the internal attribute _nsMap for resolving namespaces that is updated when changing attributes
       *
       * @param {string | null} prefix
       * The prefix for which to find the associated namespace URI.
       * @returns {string | null}
       * The associated namespace URI, if found; otherwise, null.
       * @since DOM Level 3
       * @see https://dom.spec.whatwg.org/#dom-node-lookupnamespaceuri
       * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#Node3-lookupNamespaceURI
       * @prettierignore
       */
      lookupNamespaceURI: function(prefix) {
        var el = this;
        while (el) {
          var map = el._nsMap;
          if (map) {
            if (hasOwn(map, prefix)) {
              return map[prefix];
            }
          }
          el = el.nodeType == ATTRIBUTE_NODE ? el.ownerDocument : el.parentNode;
        }
        return null;
      },
      /**
       * Determines whether the given namespace URI is the default namespace.
       *
       * The function works by looking up the prefix associated with the given namespace URI. If no
       * prefix is found (i.e., the namespace URI is not registered in the namespace map of this
       * node or any of its ancestors), it returns `true`, implying the namespace URI is considered
       * the default.
       *
       * **This behavior is different from the in the specs**:
       * - no node type specific handling
       * - uses the internal attribute _nsMap for resolving namespaces that is updated when changing attributes
       *
       * @param {string | null} namespaceURI
       * The namespace URI to be checked.
       * @returns {boolean}
       * Returns true if the given namespace URI is the default namespace, false otherwise.
       * @since DOM Level 3
       * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#Node3-isDefaultNamespace
       * @see https://dom.spec.whatwg.org/#dom-node-isdefaultnamespace
       * @prettierignore
       */
      isDefaultNamespace: function(namespaceURI) {
        var prefix = this.lookupPrefix(namespaceURI);
        return prefix == null;
      },
      /**
       * Compares the reference node with a node with regard to their position in the document and
       * according to the document order.
       *
       * @param {Node} other
       * The node to compare the reference node to.
       * @returns {number}
       * Returns how the node is positioned relatively to the reference node according to the
       * bitmask. 0 if reference node and given node are the same.
       * @since DOM Level 3
       * @see https://www.w3.org/TR/2004/REC-DOM-Level-3-Core-20040407/core.html#Node3-compare
       * @see https://dom.spec.whatwg.org/#dom-node-comparedocumentposition
       */
      compareDocumentPosition: function(other) {
        if (this === other) return 0;
        var node1 = other;
        var node2 = this;
        var attr1 = null;
        var attr2 = null;
        if (node1 instanceof Attr) {
          attr1 = node1;
          node1 = attr1.ownerElement;
        }
        if (node2 instanceof Attr) {
          attr2 = node2;
          node2 = attr2.ownerElement;
          if (attr1 && node1 && node2 === node1) {
            for (var i = 0, attr; attr = node2.attributes[i]; i++) {
              if (attr === attr1)
                return DocumentPosition.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC + DocumentPosition.DOCUMENT_POSITION_PRECEDING;
              if (attr === attr2)
                return DocumentPosition.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC + DocumentPosition.DOCUMENT_POSITION_FOLLOWING;
            }
          }
        }
        if (!node1 || !node2 || node2.ownerDocument !== node1.ownerDocument) {
          return DocumentPosition.DOCUMENT_POSITION_DISCONNECTED + DocumentPosition.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC + (docGUID(node2.ownerDocument) > docGUID(node1.ownerDocument) ? DocumentPosition.DOCUMENT_POSITION_FOLLOWING : DocumentPosition.DOCUMENT_POSITION_PRECEDING);
        }
        if (attr2 && node1 === node2) {
          return DocumentPosition.DOCUMENT_POSITION_CONTAINS + DocumentPosition.DOCUMENT_POSITION_PRECEDING;
        }
        if (attr1 && node1 === node2) {
          return DocumentPosition.DOCUMENT_POSITION_CONTAINED_BY + DocumentPosition.DOCUMENT_POSITION_FOLLOWING;
        }
        var chain1 = [];
        var ancestor1 = node1.parentNode;
        while (ancestor1) {
          if (!attr2 && ancestor1 === node2) {
            return DocumentPosition.DOCUMENT_POSITION_CONTAINED_BY + DocumentPosition.DOCUMENT_POSITION_FOLLOWING;
          }
          chain1.push(ancestor1);
          ancestor1 = ancestor1.parentNode;
        }
        chain1.reverse();
        var chain2 = [];
        var ancestor2 = node2.parentNode;
        while (ancestor2) {
          if (!attr1 && ancestor2 === node1) {
            return DocumentPosition.DOCUMENT_POSITION_CONTAINS + DocumentPosition.DOCUMENT_POSITION_PRECEDING;
          }
          chain2.push(ancestor2);
          ancestor2 = ancestor2.parentNode;
        }
        chain2.reverse();
        var ca = commonAncestor(chain1, chain2);
        for (var n in ca.childNodes) {
          var child = ca.childNodes[n];
          if (child === node2) return DocumentPosition.DOCUMENT_POSITION_FOLLOWING;
          if (child === node1) return DocumentPosition.DOCUMENT_POSITION_PRECEDING;
          if (chain2.indexOf(child) >= 0) return DocumentPosition.DOCUMENT_POSITION_FOLLOWING;
          if (chain1.indexOf(child) >= 0) return DocumentPosition.DOCUMENT_POSITION_PRECEDING;
        }
        return 0;
      }
    };
    function _xmlEncoder(c) {
      return c == "<" && "&lt;" || c == ">" && "&gt;" || c == "&" && "&amp;" || c == '"' && "&quot;" || "&#" + c.charCodeAt() + ";";
    }
    copy(NodeType, Node2);
    copy(NodeType, Node2.prototype);
    copy(DocumentPosition, Node2);
    copy(DocumentPosition, Node2.prototype);
    function _visitNode(node, callback) {
      if (callback(node)) {
        return true;
      }
      if (node = node.firstChild) {
        do {
          if (_visitNode(node, callback)) {
            return true;
          }
        } while (node = node.nextSibling);
      }
    }
    function Document(symbol, options) {
      checkSymbol(symbol);
      var opt = options || {};
      this.ownerDocument = this;
      this.contentType = opt.contentType || MIME_TYPE.XML_APPLICATION;
      this.type = isHTMLMimeType(this.contentType) ? "html" : "xml";
    }
    function _onAddAttribute(doc, el, newAttr) {
      doc && doc._inc++;
      var ns = newAttr.namespaceURI;
      if (ns === NAMESPACE.XMLNS) {
        el._nsMap[newAttr.prefix ? newAttr.localName : ""] = newAttr.value;
      }
    }
    function _onRemoveAttribute(doc, el, newAttr, remove) {
      doc && doc._inc++;
      var ns = newAttr.namespaceURI;
      if (ns === NAMESPACE.XMLNS) {
        delete el._nsMap[newAttr.prefix ? newAttr.localName : ""];
      }
    }
    function _onUpdateChild(doc, parent, newChild) {
      if (doc && doc._inc) {
        doc._inc++;
        var childNodes = parent.childNodes;
        if (newChild && !newChild.nextSibling) {
          childNodes[childNodes.length++] = newChild;
        } else {
          var child = parent.firstChild;
          var i = 0;
          while (child) {
            childNodes[i++] = child;
            child = child.nextSibling;
          }
          childNodes.length = i;
          delete childNodes[childNodes.length];
        }
      }
    }
    function _removeChild(parentNode, child) {
      if (parentNode !== child.parentNode) {
        throw new DOMException(DOMException.NOT_FOUND_ERR, "child's parent is not parent");
      }
      var oldPreviousSibling = child.previousSibling;
      var oldNextSibling = child.nextSibling;
      if (oldPreviousSibling) {
        oldPreviousSibling.nextSibling = oldNextSibling;
      } else {
        parentNode.firstChild = oldNextSibling;
      }
      if (oldNextSibling) {
        oldNextSibling.previousSibling = oldPreviousSibling;
      } else {
        parentNode.lastChild = oldPreviousSibling;
      }
      _onUpdateChild(parentNode.ownerDocument, parentNode);
      child.parentNode = null;
      child.previousSibling = null;
      child.nextSibling = null;
      return child;
    }
    function hasValidParentNodeType(node) {
      return node && (node.nodeType === Node2.DOCUMENT_NODE || node.nodeType === Node2.DOCUMENT_FRAGMENT_NODE || node.nodeType === Node2.ELEMENT_NODE);
    }
    function hasInsertableNodeType(node) {
      return node && (node.nodeType === Node2.CDATA_SECTION_NODE || node.nodeType === Node2.COMMENT_NODE || node.nodeType === Node2.DOCUMENT_FRAGMENT_NODE || node.nodeType === Node2.DOCUMENT_TYPE_NODE || node.nodeType === Node2.ELEMENT_NODE || node.nodeType === Node2.PROCESSING_INSTRUCTION_NODE || node.nodeType === Node2.TEXT_NODE);
    }
    function isDocTypeNode(node) {
      return node && node.nodeType === Node2.DOCUMENT_TYPE_NODE;
    }
    function isElementNode(node) {
      return node && node.nodeType === Node2.ELEMENT_NODE;
    }
    function isTextNode(node) {
      return node && node.nodeType === Node2.TEXT_NODE;
    }
    function isElementInsertionPossible(doc, child) {
      var parentChildNodes = doc.childNodes || [];
      if (find(parentChildNodes, isElementNode) || isDocTypeNode(child)) {
        return false;
      }
      var docTypeNode = find(parentChildNodes, isDocTypeNode);
      return !(child && docTypeNode && parentChildNodes.indexOf(docTypeNode) > parentChildNodes.indexOf(child));
    }
    function isElementReplacementPossible(doc, child) {
      var parentChildNodes = doc.childNodes || [];
      function hasElementChildThatIsNotChild(node) {
        return isElementNode(node) && node !== child;
      }
      if (find(parentChildNodes, hasElementChildThatIsNotChild)) {
        return false;
      }
      var docTypeNode = find(parentChildNodes, isDocTypeNode);
      return !(child && docTypeNode && parentChildNodes.indexOf(docTypeNode) > parentChildNodes.indexOf(child));
    }
    function assertPreInsertionValidity1to5(parent, node, child) {
      if (!hasValidParentNodeType(parent)) {
        throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "Unexpected parent node type " + parent.nodeType);
      }
      if (child && child.parentNode !== parent) {
        throw new DOMException(DOMException.NOT_FOUND_ERR, "child not in parent");
      }
      if (
        // 4. If `node` is not a DocumentFragment, DocumentType, Element, or CharacterData node, then throw a "HierarchyRequestError" DOMException.
        !hasInsertableNodeType(node) || // 5. If either `node` is a Text node and `parent` is a document,
        // the sax parser currently adds top level text nodes, this will be fixed in 0.9.0
        // || (node.nodeType === Node.TEXT_NODE && parent.nodeType === Node.DOCUMENT_NODE)
        // or `node` is a doctype and `parent` is not a document, then throw a "HierarchyRequestError" DOMException.
        isDocTypeNode(node) && parent.nodeType !== Node2.DOCUMENT_NODE
      ) {
        throw new DOMException(
          DOMException.HIERARCHY_REQUEST_ERR,
          "Unexpected node type " + node.nodeType + " for parent node type " + parent.nodeType
        );
      }
    }
    function assertPreInsertionValidityInDocument(parent, node, child) {
      var parentChildNodes = parent.childNodes || [];
      var nodeChildNodes = node.childNodes || [];
      if (node.nodeType === Node2.DOCUMENT_FRAGMENT_NODE) {
        var nodeChildElements = nodeChildNodes.filter(isElementNode);
        if (nodeChildElements.length > 1 || find(nodeChildNodes, isTextNode)) {
          throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "More than one element or text in fragment");
        }
        if (nodeChildElements.length === 1 && !isElementInsertionPossible(parent, child)) {
          throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "Element in fragment can not be inserted before doctype");
        }
      }
      if (isElementNode(node)) {
        if (!isElementInsertionPossible(parent, child)) {
          throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "Only one element can be added and only after doctype");
        }
      }
      if (isDocTypeNode(node)) {
        if (find(parentChildNodes, isDocTypeNode)) {
          throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "Only one doctype is allowed");
        }
        var parentElementChild = find(parentChildNodes, isElementNode);
        if (child && parentChildNodes.indexOf(parentElementChild) < parentChildNodes.indexOf(child)) {
          throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "Doctype can only be inserted before an element");
        }
        if (!child && parentElementChild) {
          throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "Doctype can not be appended since element is present");
        }
      }
    }
    function assertPreReplacementValidityInDocument(parent, node, child) {
      var parentChildNodes = parent.childNodes || [];
      var nodeChildNodes = node.childNodes || [];
      if (node.nodeType === Node2.DOCUMENT_FRAGMENT_NODE) {
        var nodeChildElements = nodeChildNodes.filter(isElementNode);
        if (nodeChildElements.length > 1 || find(nodeChildNodes, isTextNode)) {
          throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "More than one element or text in fragment");
        }
        if (nodeChildElements.length === 1 && !isElementReplacementPossible(parent, child)) {
          throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "Element in fragment can not be inserted before doctype");
        }
      }
      if (isElementNode(node)) {
        if (!isElementReplacementPossible(parent, child)) {
          throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "Only one element can be added and only after doctype");
        }
      }
      if (isDocTypeNode(node)) {
        let hasDoctypeChildThatIsNotChild = function(node2) {
          return isDocTypeNode(node2) && node2 !== child;
        };
        if (find(parentChildNodes, hasDoctypeChildThatIsNotChild)) {
          throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "Only one doctype is allowed");
        }
        var parentElementChild = find(parentChildNodes, isElementNode);
        if (child && parentChildNodes.indexOf(parentElementChild) < parentChildNodes.indexOf(child)) {
          throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "Doctype can only be inserted before an element");
        }
      }
    }
    function _insertBefore(parent, node, child, _inDocumentAssertion) {
      assertPreInsertionValidity1to5(parent, node, child);
      if (parent.nodeType === Node2.DOCUMENT_NODE) {
        (_inDocumentAssertion || assertPreInsertionValidityInDocument)(parent, node, child);
      }
      var cp = node.parentNode;
      if (cp) {
        cp.removeChild(node);
      }
      if (node.nodeType === DOCUMENT_FRAGMENT_NODE) {
        var newFirst = node.firstChild;
        if (newFirst == null) {
          return node;
        }
        var newLast = node.lastChild;
      } else {
        newFirst = newLast = node;
      }
      var pre = child ? child.previousSibling : parent.lastChild;
      newFirst.previousSibling = pre;
      newLast.nextSibling = child;
      if (pre) {
        pre.nextSibling = newFirst;
      } else {
        parent.firstChild = newFirst;
      }
      if (child == null) {
        parent.lastChild = newLast;
      } else {
        child.previousSibling = newLast;
      }
      do {
        newFirst.parentNode = parent;
      } while (newFirst !== newLast && (newFirst = newFirst.nextSibling));
      _onUpdateChild(parent.ownerDocument || parent, parent, node);
      if (node.nodeType == DOCUMENT_FRAGMENT_NODE) {
        node.firstChild = node.lastChild = null;
      }
      return node;
    }
    Document.prototype = {
      /**
       * The implementation that created this document.
       *
       * @type DOMImplementation
       * @readonly
       */
      implementation: null,
      nodeName: "#document",
      nodeType: DOCUMENT_NODE,
      /**
       * The DocumentType node of the document.
       *
       * @type DocumentType
       * @readonly
       */
      doctype: null,
      documentElement: null,
      _inc: 1,
      insertBefore: function(newChild, refChild) {
        if (newChild.nodeType === DOCUMENT_FRAGMENT_NODE) {
          var child = newChild.firstChild;
          while (child) {
            var next = child.nextSibling;
            this.insertBefore(child, refChild);
            child = next;
          }
          return newChild;
        }
        _insertBefore(this, newChild, refChild);
        newChild.ownerDocument = this;
        if (this.documentElement === null && newChild.nodeType === ELEMENT_NODE) {
          this.documentElement = newChild;
        }
        return newChild;
      },
      removeChild: function(oldChild) {
        var removed = _removeChild(this, oldChild);
        if (removed === this.documentElement) {
          this.documentElement = null;
        }
        return removed;
      },
      replaceChild: function(newChild, oldChild) {
        _insertBefore(this, newChild, oldChild, assertPreReplacementValidityInDocument);
        newChild.ownerDocument = this;
        if (oldChild) {
          this.removeChild(oldChild);
        }
        if (isElementNode(newChild)) {
          this.documentElement = newChild;
        }
      },
      // Introduced in DOM Level 2:
      importNode: function(importedNode, deep) {
        return importNode(this, importedNode, deep);
      },
      // Introduced in DOM Level 2:
      getElementById: function(id) {
        var rtv = null;
        _visitNode(this.documentElement, function(node) {
          if (node.nodeType == ELEMENT_NODE) {
            if (node.getAttribute("id") == id) {
              rtv = node;
              return true;
            }
          }
        });
        return rtv;
      },
      /**
       * Creates a new `Element` that is owned by this `Document`.
       * In HTML Documents `localName` is the lower cased `tagName`,
       * otherwise no transformation is being applied.
       * When `contentType` implies the HTML namespace, it will be set as `namespaceURI`.
       *
       * __This implementation differs from the specification:__ - The provided name is not checked
       * against the `Name` production,
       * so no related error will be thrown.
       * - There is no interface `HTMLElement`, it is always an `Element`.
       * - There is no support for a second argument to indicate using custom elements.
       *
       * @param {string} tagName
       * @returns {Element}
       * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
       * @see https://dom.spec.whatwg.org/#dom-document-createelement
       * @see https://dom.spec.whatwg.org/#concept-create-element
       */
      createElement: function(tagName) {
        var node = new Element2(PDC);
        node.ownerDocument = this;
        if (this.type === "html") {
          tagName = tagName.toLowerCase();
        }
        if (hasDefaultHTMLNamespace(this.contentType)) {
          node.namespaceURI = NAMESPACE.HTML;
        }
        node.nodeName = tagName;
        node.tagName = tagName;
        node.localName = tagName;
        node.childNodes = new NodeList();
        var attrs = node.attributes = new NamedNodeMap();
        attrs._ownerElement = node;
        return node;
      },
      /**
       * @returns {DocumentFragment}
       */
      createDocumentFragment: function() {
        var node = new DocumentFragment(PDC);
        node.ownerDocument = this;
        node.childNodes = new NodeList();
        return node;
      },
      /**
       * @param {string} data
       * @returns {Text}
       */
      createTextNode: function(data) {
        var node = new Text(PDC);
        node.ownerDocument = this;
        node.childNodes = new NodeList();
        node.appendData(data);
        return node;
      },
      /**
       * @param {string} data
       * @returns {Comment}
       */
      createComment: function(data) {
        var node = new Comment(PDC);
        node.ownerDocument = this;
        node.childNodes = new NodeList();
        node.appendData(data);
        return node;
      },
      /**
       * @param {string} data
       * @returns {CDATASection}
       */
      createCDATASection: function(data) {
        var node = new CDATASection(PDC);
        node.ownerDocument = this;
        node.childNodes = new NodeList();
        node.appendData(data);
        return node;
      },
      /**
       * @param {string} target
       * @param {string} data
       * @returns {ProcessingInstruction}
       */
      createProcessingInstruction: function(target, data) {
        var node = new ProcessingInstruction(PDC);
        node.ownerDocument = this;
        node.childNodes = new NodeList();
        node.nodeName = node.target = target;
        node.nodeValue = node.data = data;
        return node;
      },
      /**
       * Creates an `Attr` node that is owned by this document.
       * In HTML Documents `localName` is the lower cased `name`,
       * otherwise no transformation is being applied.
       *
       * __This implementation differs from the specification:__ - The provided name is not checked
       * against the `Name` production,
       * so no related error will be thrown.
       *
       * @param {string} name
       * @returns {Attr}
       * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/createAttribute
       * @see https://dom.spec.whatwg.org/#dom-document-createattribute
       */
      createAttribute: function(name) {
        if (!g.QName_exact.test(name)) {
          throw new DOMException(DOMException.INVALID_CHARACTER_ERR, 'invalid character in name "' + name + '"');
        }
        if (this.type === "html") {
          name = name.toLowerCase();
        }
        return this._createAttribute(name);
      },
      _createAttribute: function(name) {
        var node = new Attr(PDC);
        node.ownerDocument = this;
        node.childNodes = new NodeList();
        node.name = name;
        node.nodeName = name;
        node.localName = name;
        node.specified = true;
        return node;
      },
      /**
       * Creates an EntityReference object.
       * The current implementation does not fill the `childNodes` with those of the corresponding
       * `Entity`
       *
       * @deprecated
       * In DOM Level 4.
       * @param {string} name
       * The name of the entity to reference. No namespace well-formedness checks are performed.
       * @returns {EntityReference}
       * @throws {DOMException}
       * With code `INVALID_CHARACTER_ERR` when `name` is not valid.
       * @throws {DOMException}
       * with code `NOT_SUPPORTED_ERR` when the document is of type `html`
       * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#ID-392B75AE
       */
      createEntityReference: function(name) {
        if (!g.Name.test(name)) {
          throw new DOMException(DOMException.INVALID_CHARACTER_ERR, 'not a valid xml name "' + name + '"');
        }
        if (this.type === "html") {
          throw new DOMException("document is an html document", DOMExceptionName.NotSupportedError);
        }
        var node = new EntityReference(PDC);
        node.ownerDocument = this;
        node.childNodes = new NodeList();
        node.nodeName = name;
        return node;
      },
      // Introduced in DOM Level 2:
      /**
       * @param {string} namespaceURI
       * @param {string} qualifiedName
       * @returns {Element}
       */
      createElementNS: function(namespaceURI, qualifiedName) {
        var validated = validateAndExtract(namespaceURI, qualifiedName);
        var node = new Element2(PDC);
        var attrs = node.attributes = new NamedNodeMap();
        node.childNodes = new NodeList();
        node.ownerDocument = this;
        node.nodeName = qualifiedName;
        node.tagName = qualifiedName;
        node.namespaceURI = validated[0];
        node.prefix = validated[1];
        node.localName = validated[2];
        attrs._ownerElement = node;
        return node;
      },
      // Introduced in DOM Level 2:
      /**
       * @param {string} namespaceURI
       * @param {string} qualifiedName
       * @returns {Attr}
       */
      createAttributeNS: function(namespaceURI, qualifiedName) {
        var validated = validateAndExtract(namespaceURI, qualifiedName);
        var node = new Attr(PDC);
        node.ownerDocument = this;
        node.childNodes = new NodeList();
        node.nodeName = qualifiedName;
        node.name = qualifiedName;
        node.specified = true;
        node.namespaceURI = validated[0];
        node.prefix = validated[1];
        node.localName = validated[2];
        return node;
      }
    };
    _extends(Document, Node2);
    function Element2(symbol) {
      checkSymbol(symbol);
      this._nsMap = /* @__PURE__ */ Object.create(null);
    }
    Element2.prototype = {
      nodeType: ELEMENT_NODE,
      /**
       * The attributes of this element.
       *
       * @type {NamedNodeMap | null}
       */
      attributes: null,
      getQualifiedName: function() {
        return this.prefix ? this.prefix + ":" + this.localName : this.localName;
      },
      _isInHTMLDocumentAndNamespace: function() {
        return this.ownerDocument.type === "html" && this.namespaceURI === NAMESPACE.HTML;
      },
      /**
       * Implementaton of Level2 Core function hasAttributes.
       *
       * @returns {boolean}
       * True if attribute list is not empty.
       * @see https://www.w3.org/TR/DOM-Level-2-Core/#core-ID-NodeHasAttrs
       */
      hasAttributes: function() {
        return !!(this.attributes && this.attributes.length);
      },
      hasAttribute: function(name) {
        return !!this.getAttributeNode(name);
      },
      /**
       * Returns element’s first attribute whose qualified name is `name`, and `null`
       * if there is no such attribute.
       *
       * @param {string} name
       * @returns {string | null}
       */
      getAttribute: function(name) {
        var attr = this.getAttributeNode(name);
        return attr ? attr.value : null;
      },
      getAttributeNode: function(name) {
        if (this._isInHTMLDocumentAndNamespace()) {
          name = name.toLowerCase();
        }
        return this.attributes.getNamedItem(name);
      },
      /**
       * Sets the value of element’s first attribute whose qualified name is qualifiedName to value.
       *
       * @param {string} name
       * @param {string} value
       */
      setAttribute: function(name, value) {
        if (this._isInHTMLDocumentAndNamespace()) {
          name = name.toLowerCase();
        }
        var attr = this.getAttributeNode(name);
        if (attr) {
          attr.value = attr.nodeValue = "" + value;
        } else {
          attr = this.ownerDocument._createAttribute(name);
          attr.value = attr.nodeValue = "" + value;
          this.setAttributeNode(attr);
        }
      },
      removeAttribute: function(name) {
        var attr = this.getAttributeNode(name);
        attr && this.removeAttributeNode(attr);
      },
      setAttributeNode: function(newAttr) {
        return this.attributes.setNamedItem(newAttr);
      },
      setAttributeNodeNS: function(newAttr) {
        return this.attributes.setNamedItemNS(newAttr);
      },
      removeAttributeNode: function(oldAttr) {
        return this.attributes.removeNamedItem(oldAttr.nodeName);
      },
      //get real attribute name,and remove it by removeAttributeNode
      removeAttributeNS: function(namespaceURI, localName) {
        var old = this.getAttributeNodeNS(namespaceURI, localName);
        old && this.removeAttributeNode(old);
      },
      hasAttributeNS: function(namespaceURI, localName) {
        return this.getAttributeNodeNS(namespaceURI, localName) != null;
      },
      /**
       * Returns element’s attribute whose namespace is `namespaceURI` and local name is
       * `localName`,
       * or `null` if there is no such attribute.
       *
       * @param {string} namespaceURI
       * @param {string} localName
       * @returns {string | null}
       */
      getAttributeNS: function(namespaceURI, localName) {
        var attr = this.getAttributeNodeNS(namespaceURI, localName);
        return attr ? attr.value : null;
      },
      /**
       * Sets the value of element’s attribute whose namespace is `namespaceURI` and local name is
       * `localName` to value.
       *
       * @param {string} namespaceURI
       * @param {string} qualifiedName
       * @param {string} value
       * @see https://dom.spec.whatwg.org/#dom-element-setattributens
       */
      setAttributeNS: function(namespaceURI, qualifiedName, value) {
        var validated = validateAndExtract(namespaceURI, qualifiedName);
        var localName = validated[2];
        var attr = this.getAttributeNodeNS(namespaceURI, localName);
        if (attr) {
          attr.value = attr.nodeValue = "" + value;
        } else {
          attr = this.ownerDocument.createAttributeNS(namespaceURI, qualifiedName);
          attr.value = attr.nodeValue = "" + value;
          this.setAttributeNode(attr);
        }
      },
      getAttributeNodeNS: function(namespaceURI, localName) {
        return this.attributes.getNamedItemNS(namespaceURI, localName);
      },
      /**
       * Returns a LiveNodeList of all child elements which have **all** of the given class name(s).
       *
       * Returns an empty list if `classNames` is an empty string or only contains HTML white space
       * characters.
       *
       * Warning: This returns a live LiveNodeList.
       * Changes in the DOM will reflect in the array as the changes occur.
       * If an element selected by this array no longer qualifies for the selector,
       * it will automatically be removed. Be aware of this for iteration purposes.
       *
       * @param {string} classNames
       * Is a string representing the class name(s) to match; multiple class names are separated by
       * (ASCII-)whitespace.
       * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/getElementsByClassName
       * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByClassName
       * @see https://dom.spec.whatwg.org/#concept-getelementsbyclassname
       */
      getElementsByClassName: function(classNames) {
        var classNamesSet = toOrderedSet(classNames);
        return new LiveNodeList(this, function(base) {
          var ls = [];
          if (classNamesSet.length > 0) {
            _visitNode(base, function(node) {
              if (node !== base && node.nodeType === ELEMENT_NODE) {
                var nodeClassNames = node.getAttribute("class");
                if (nodeClassNames) {
                  var matches = classNames === nodeClassNames;
                  if (!matches) {
                    var nodeClassNamesSet = toOrderedSet(nodeClassNames);
                    matches = classNamesSet.every(arrayIncludes(nodeClassNamesSet));
                  }
                  if (matches) {
                    ls.push(node);
                  }
                }
              }
            });
          }
          return ls;
        });
      },
      /**
       * Returns a LiveNodeList of elements with the given qualifiedName.
       * Searching for all descendants can be done by passing `*` as `qualifiedName`.
       *
       * All descendants of the specified element are searched, but not the element itself.
       * The returned list is live, which means it updates itself with the DOM tree automatically.
       * Therefore, there is no need to call `Element.getElementsByTagName()`
       * with the same element and arguments repeatedly if the DOM changes in between calls.
       *
       * When called on an HTML element in an HTML document,
       * `getElementsByTagName` lower-cases the argument before searching for it.
       * This is undesirable when trying to match camel-cased SVG elements (such as
       * `<linearGradient>`) in an HTML document.
       * Instead, use `Element.getElementsByTagNameNS()`,
       * which preserves the capitalization of the tag name.
       *
       * `Element.getElementsByTagName` is similar to `Document.getElementsByTagName()`,
       * except that it only searches for elements that are descendants of the specified element.
       *
       * @param {string} qualifiedName
       * @returns {LiveNodeList}
       * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/getElementsByTagName
       * @see https://dom.spec.whatwg.org/#concept-getelementsbytagname
       */
      getElementsByTagName: function(qualifiedName) {
        var isHTMLDocument = (this.nodeType === DOCUMENT_NODE ? this : this.ownerDocument).type === "html";
        var lowerQualifiedName = qualifiedName.toLowerCase();
        return new LiveNodeList(this, function(base) {
          var ls = [];
          _visitNode(base, function(node) {
            if (node === base || node.nodeType !== ELEMENT_NODE) {
              return;
            }
            if (qualifiedName === "*") {
              ls.push(node);
            } else {
              var nodeQualifiedName = node.getQualifiedName();
              var matchingQName = isHTMLDocument && node.namespaceURI === NAMESPACE.HTML ? lowerQualifiedName : qualifiedName;
              if (nodeQualifiedName === matchingQName) {
                ls.push(node);
              }
            }
          });
          return ls;
        });
      },
      getElementsByTagNameNS: function(namespaceURI, localName) {
        return new LiveNodeList(this, function(base) {
          var ls = [];
          _visitNode(base, function(node) {
            if (node !== base && node.nodeType === ELEMENT_NODE && (namespaceURI === "*" || node.namespaceURI === namespaceURI) && (localName === "*" || node.localName == localName)) {
              ls.push(node);
            }
          });
          return ls;
        });
      }
    };
    Document.prototype.getElementsByClassName = Element2.prototype.getElementsByClassName;
    Document.prototype.getElementsByTagName = Element2.prototype.getElementsByTagName;
    Document.prototype.getElementsByTagNameNS = Element2.prototype.getElementsByTagNameNS;
    _extends(Element2, Node2);
    function Attr(symbol) {
      checkSymbol(symbol);
      this.namespaceURI = null;
      this.prefix = null;
      this.ownerElement = null;
    }
    Attr.prototype.nodeType = ATTRIBUTE_NODE;
    _extends(Attr, Node2);
    function CharacterData(symbol) {
      checkSymbol(symbol);
    }
    CharacterData.prototype = {
      data: "",
      substringData: function(offset, count) {
        return this.data.substring(offset, offset + count);
      },
      appendData: function(text) {
        text = this.data + text;
        this.nodeValue = this.data = text;
        this.length = text.length;
      },
      insertData: function(offset, text) {
        this.replaceData(offset, 0, text);
      },
      deleteData: function(offset, count) {
        this.replaceData(offset, count, "");
      },
      replaceData: function(offset, count, text) {
        var start = this.data.substring(0, offset);
        var end = this.data.substring(offset + count);
        text = start + text + end;
        this.nodeValue = this.data = text;
        this.length = text.length;
      }
    };
    _extends(CharacterData, Node2);
    function Text(symbol) {
      checkSymbol(symbol);
    }
    Text.prototype = {
      nodeName: "#text",
      nodeType: TEXT_NODE,
      splitText: function(offset) {
        var text = this.data;
        var newText = text.substring(offset);
        text = text.substring(0, offset);
        this.data = this.nodeValue = text;
        this.length = text.length;
        var newNode = this.ownerDocument.createTextNode(newText);
        if (this.parentNode) {
          this.parentNode.insertBefore(newNode, this.nextSibling);
        }
        return newNode;
      }
    };
    _extends(Text, CharacterData);
    function Comment(symbol) {
      checkSymbol(symbol);
    }
    Comment.prototype = {
      nodeName: "#comment",
      nodeType: COMMENT_NODE
    };
    _extends(Comment, CharacterData);
    function CDATASection(symbol) {
      checkSymbol(symbol);
    }
    CDATASection.prototype = {
      nodeName: "#cdata-section",
      nodeType: CDATA_SECTION_NODE
    };
    _extends(CDATASection, Text);
    function DocumentType(symbol) {
      checkSymbol(symbol);
    }
    DocumentType.prototype.nodeType = DOCUMENT_TYPE_NODE;
    _extends(DocumentType, Node2);
    function Notation(symbol) {
      checkSymbol(symbol);
    }
    Notation.prototype.nodeType = NOTATION_NODE;
    _extends(Notation, Node2);
    function Entity(symbol) {
      checkSymbol(symbol);
    }
    Entity.prototype.nodeType = ENTITY_NODE;
    _extends(Entity, Node2);
    function EntityReference(symbol) {
      checkSymbol(symbol);
    }
    EntityReference.prototype.nodeType = ENTITY_REFERENCE_NODE;
    _extends(EntityReference, Node2);
    function DocumentFragment(symbol) {
      checkSymbol(symbol);
    }
    DocumentFragment.prototype.nodeName = "#document-fragment";
    DocumentFragment.prototype.nodeType = DOCUMENT_FRAGMENT_NODE;
    _extends(DocumentFragment, Node2);
    function ProcessingInstruction(symbol) {
      checkSymbol(symbol);
    }
    ProcessingInstruction.prototype.nodeType = PROCESSING_INSTRUCTION_NODE;
    _extends(ProcessingInstruction, CharacterData);
    function XMLSerializer2() {
    }
    XMLSerializer2.prototype.serializeToString = function(node, nodeFilter) {
      return nodeSerializeToString.call(node, nodeFilter);
    };
    Node2.prototype.toString = nodeSerializeToString;
    function nodeSerializeToString(nodeFilter) {
      var buf = [];
      var refNode = this.nodeType === DOCUMENT_NODE && this.documentElement || this;
      var prefix = refNode.prefix;
      var uri = refNode.namespaceURI;
      if (uri && prefix == null) {
        var prefix = refNode.lookupPrefix(uri);
        if (prefix == null) {
          var visibleNamespaces = [
            { namespace: uri, prefix: null }
            //{namespace:uri,prefix:''}
          ];
        }
      }
      serializeToString(this, buf, nodeFilter, visibleNamespaces);
      return buf.join("");
    }
    function needNamespaceDefine(node, isHTML, visibleNamespaces) {
      var prefix = node.prefix || "";
      var uri = node.namespaceURI;
      if (!uri) {
        return false;
      }
      if (prefix === "xml" && uri === NAMESPACE.XML || uri === NAMESPACE.XMLNS) {
        return false;
      }
      var i = visibleNamespaces.length;
      while (i--) {
        var ns = visibleNamespaces[i];
        if (ns.prefix === prefix) {
          return ns.namespace !== uri;
        }
      }
      return true;
    }
    function addSerializedAttribute(buf, qualifiedName, value) {
      buf.push(" ", qualifiedName, '="', value.replace(/[<>&"\t\n\r]/g, _xmlEncoder), '"');
    }
    function serializeToString(node, buf, nodeFilter, visibleNamespaces) {
      if (!visibleNamespaces) {
        visibleNamespaces = [];
      }
      var doc = node.nodeType === DOCUMENT_NODE ? node : node.ownerDocument;
      var isHTML = doc.type === "html";
      if (nodeFilter) {
        node = nodeFilter(node);
        if (node) {
          if (typeof node == "string") {
            buf.push(node);
            return;
          }
        } else {
          return;
        }
      }
      switch (node.nodeType) {
        case ELEMENT_NODE:
          var attrs = node.attributes;
          var len = attrs.length;
          var child = node.firstChild;
          var nodeName = node.tagName;
          var prefixedNodeName = nodeName;
          if (!isHTML && !node.prefix && node.namespaceURI) {
            var defaultNS;
            for (var ai = 0; ai < attrs.length; ai++) {
              if (attrs.item(ai).name === "xmlns") {
                defaultNS = attrs.item(ai).value;
                break;
              }
            }
            if (!defaultNS) {
              for (var nsi = visibleNamespaces.length - 1; nsi >= 0; nsi--) {
                var namespace = visibleNamespaces[nsi];
                if (namespace.prefix === "" && namespace.namespace === node.namespaceURI) {
                  defaultNS = namespace.namespace;
                  break;
                }
              }
            }
            if (defaultNS !== node.namespaceURI) {
              for (var nsi = visibleNamespaces.length - 1; nsi >= 0; nsi--) {
                var namespace = visibleNamespaces[nsi];
                if (namespace.namespace === node.namespaceURI) {
                  if (namespace.prefix) {
                    prefixedNodeName = namespace.prefix + ":" + nodeName;
                  }
                  break;
                }
              }
            }
          }
          buf.push("<", prefixedNodeName);
          for (var i = 0; i < len; i++) {
            var attr = attrs.item(i);
            if (attr.prefix == "xmlns") {
              visibleNamespaces.push({
                prefix: attr.localName,
                namespace: attr.value
              });
            } else if (attr.nodeName == "xmlns") {
              visibleNamespaces.push({ prefix: "", namespace: attr.value });
            }
          }
          for (var i = 0; i < len; i++) {
            var attr = attrs.item(i);
            if (needNamespaceDefine(attr, isHTML, visibleNamespaces)) {
              var prefix = attr.prefix || "";
              var uri = attr.namespaceURI;
              addSerializedAttribute(buf, prefix ? "xmlns:" + prefix : "xmlns", uri);
              visibleNamespaces.push({ prefix, namespace: uri });
            }
            serializeToString(attr, buf, nodeFilter, visibleNamespaces);
          }
          if (nodeName === prefixedNodeName && needNamespaceDefine(node, isHTML, visibleNamespaces)) {
            var prefix = node.prefix || "";
            var uri = node.namespaceURI;
            addSerializedAttribute(buf, prefix ? "xmlns:" + prefix : "xmlns", uri);
            visibleNamespaces.push({ prefix, namespace: uri });
          }
          var canCloseTag = !child;
          if (canCloseTag && (isHTML || node.namespaceURI === NAMESPACE.HTML)) {
            canCloseTag = isHTMLVoidElement(nodeName);
          }
          if (canCloseTag) {
            buf.push("/>");
          } else {
            buf.push(">");
            if (isHTML && isHTMLRawTextElement(nodeName)) {
              while (child) {
                if (child.data) {
                  buf.push(child.data);
                } else {
                  serializeToString(child, buf, nodeFilter, visibleNamespaces.slice());
                }
                child = child.nextSibling;
              }
            } else {
              while (child) {
                serializeToString(child, buf, nodeFilter, visibleNamespaces.slice());
                child = child.nextSibling;
              }
            }
            buf.push("</", prefixedNodeName, ">");
          }
          return;
        case DOCUMENT_NODE:
        case DOCUMENT_FRAGMENT_NODE:
          var child = node.firstChild;
          while (child) {
            serializeToString(child, buf, nodeFilter, visibleNamespaces.slice());
            child = child.nextSibling;
          }
          return;
        case ATTRIBUTE_NODE:
          return addSerializedAttribute(buf, node.name, node.value);
        case TEXT_NODE:
          return buf.push(node.data.replace(/[<&>]/g, _xmlEncoder));
        case CDATA_SECTION_NODE:
          return buf.push(g.CDATA_START, node.data, g.CDATA_END);
        case COMMENT_NODE:
          return buf.push(g.COMMENT_START, node.data, g.COMMENT_END);
        case DOCUMENT_TYPE_NODE:
          var pubid = node.publicId;
          var sysid = node.systemId;
          buf.push(g.DOCTYPE_DECL_START, " ", node.name);
          if (pubid) {
            buf.push(" ", g.PUBLIC, " ", pubid);
            if (sysid && sysid !== ".") {
              buf.push(" ", sysid);
            }
          } else if (sysid && sysid !== ".") {
            buf.push(" ", g.SYSTEM, " ", sysid);
          }
          if (node.internalSubset) {
            buf.push(" [", node.internalSubset, "]");
          }
          buf.push(">");
          return;
        case PROCESSING_INSTRUCTION_NODE:
          return buf.push("<?", node.target, " ", node.data, "?>");
        case ENTITY_REFERENCE_NODE:
          return buf.push("&", node.nodeName, ";");
        //case ENTITY_NODE:
        //case NOTATION_NODE:
        default:
          buf.push("??", node.nodeName);
      }
    }
    function importNode(doc, node, deep) {
      var node2;
      switch (node.nodeType) {
        case ELEMENT_NODE:
          node2 = node.cloneNode(false);
          node2.ownerDocument = doc;
        //var attrs = node2.attributes;
        //var len = attrs.length;
        //for(var i=0;i<len;i++){
        //node2.setAttributeNodeNS(importNode(doc,attrs.item(i),deep));
        //}
        case DOCUMENT_FRAGMENT_NODE:
          break;
        case ATTRIBUTE_NODE:
          deep = true;
          break;
      }
      if (!node2) {
        node2 = node.cloneNode(false);
      }
      node2.ownerDocument = doc;
      node2.parentNode = null;
      if (deep) {
        var child = node.firstChild;
        while (child) {
          node2.appendChild(importNode(doc, child, deep));
          child = child.nextSibling;
        }
      }
      return node2;
    }
    function cloneNode(doc, node, deep) {
      var node2 = new node.constructor(PDC);
      for (var n in node) {
        if (hasOwn(node, n)) {
          var v = node[n];
          if (typeof v != "object") {
            if (v != node2[n]) {
              node2[n] = v;
            }
          }
        }
      }
      if (node.childNodes) {
        node2.childNodes = new NodeList();
      }
      node2.ownerDocument = doc;
      switch (node2.nodeType) {
        case ELEMENT_NODE:
          var attrs = node.attributes;
          var attrs2 = node2.attributes = new NamedNodeMap();
          var len = attrs.length;
          attrs2._ownerElement = node2;
          for (var i = 0; i < len; i++) {
            node2.setAttributeNode(cloneNode(doc, attrs.item(i), true));
          }
          break;
        case ATTRIBUTE_NODE:
          deep = true;
      }
      if (deep) {
        var child = node.firstChild;
        while (child) {
          node2.appendChild(cloneNode(doc, child, deep));
          child = child.nextSibling;
        }
      }
      return node2;
    }
    function __set__(object, key, value) {
      object[key] = value;
    }
    try {
      if (Object.defineProperty) {
        let getTextContent = function(node) {
          switch (node.nodeType) {
            case ELEMENT_NODE:
            case DOCUMENT_FRAGMENT_NODE:
              var buf = [];
              node = node.firstChild;
              while (node) {
                if (node.nodeType !== 7 && node.nodeType !== 8) {
                  buf.push(getTextContent(node));
                }
                node = node.nextSibling;
              }
              return buf.join("");
            default:
              return node.nodeValue;
          }
        };
        Object.defineProperty(LiveNodeList.prototype, "length", {
          get: function() {
            _updateLiveList(this);
            return this.$$length;
          }
        });
        Object.defineProperty(Node2.prototype, "textContent", {
          get: function() {
            return getTextContent(this);
          },
          set: function(data) {
            switch (this.nodeType) {
              case ELEMENT_NODE:
              case DOCUMENT_FRAGMENT_NODE:
                while (this.firstChild) {
                  this.removeChild(this.firstChild);
                }
                if (data || String(data)) {
                  this.appendChild(this.ownerDocument.createTextNode(data));
                }
                break;
              default:
                this.data = data;
                this.value = data;
                this.nodeValue = data;
            }
          }
        });
        __set__ = function(object, key, value) {
          object["$$" + key] = value;
        };
      }
    } catch (e) {
    }
    exports._updateLiveList = _updateLiveList;
    exports.Attr = Attr;
    exports.CDATASection = CDATASection;
    exports.CharacterData = CharacterData;
    exports.Comment = Comment;
    exports.Document = Document;
    exports.DocumentFragment = DocumentFragment;
    exports.DocumentType = DocumentType;
    exports.DOMImplementation = DOMImplementation2;
    exports.Element = Element2;
    exports.Entity = Entity;
    exports.EntityReference = EntityReference;
    exports.LiveNodeList = LiveNodeList;
    exports.NamedNodeMap = NamedNodeMap;
    exports.Node = Node2;
    exports.NodeList = NodeList;
    exports.Notation = Notation;
    exports.Text = Text;
    exports.ProcessingInstruction = ProcessingInstruction;
    exports.XMLSerializer = XMLSerializer2;
  }
});

// node_modules/@xmldom/xmldom/lib/entities.js
var require_entities = __commonJS({
  "node_modules/@xmldom/xmldom/lib/entities.js"(exports) {
    "use strict";
    var freeze = require_conventions().freeze;
    exports.XML_ENTITIES = freeze({
      amp: "&",
      apos: "'",
      gt: ">",
      lt: "<",
      quot: '"'
    });
    exports.HTML_ENTITIES = freeze({
      Aacute: "\xC1",
      aacute: "\xE1",
      Abreve: "\u0102",
      abreve: "\u0103",
      ac: "\u223E",
      acd: "\u223F",
      acE: "\u223E\u0333",
      Acirc: "\xC2",
      acirc: "\xE2",
      acute: "\xB4",
      Acy: "\u0410",
      acy: "\u0430",
      AElig: "\xC6",
      aelig: "\xE6",
      af: "\u2061",
      Afr: "\u{1D504}",
      afr: "\u{1D51E}",
      Agrave: "\xC0",
      agrave: "\xE0",
      alefsym: "\u2135",
      aleph: "\u2135",
      Alpha: "\u0391",
      alpha: "\u03B1",
      Amacr: "\u0100",
      amacr: "\u0101",
      amalg: "\u2A3F",
      AMP: "&",
      amp: "&",
      And: "\u2A53",
      and: "\u2227",
      andand: "\u2A55",
      andd: "\u2A5C",
      andslope: "\u2A58",
      andv: "\u2A5A",
      ang: "\u2220",
      ange: "\u29A4",
      angle: "\u2220",
      angmsd: "\u2221",
      angmsdaa: "\u29A8",
      angmsdab: "\u29A9",
      angmsdac: "\u29AA",
      angmsdad: "\u29AB",
      angmsdae: "\u29AC",
      angmsdaf: "\u29AD",
      angmsdag: "\u29AE",
      angmsdah: "\u29AF",
      angrt: "\u221F",
      angrtvb: "\u22BE",
      angrtvbd: "\u299D",
      angsph: "\u2222",
      angst: "\xC5",
      angzarr: "\u237C",
      Aogon: "\u0104",
      aogon: "\u0105",
      Aopf: "\u{1D538}",
      aopf: "\u{1D552}",
      ap: "\u2248",
      apacir: "\u2A6F",
      apE: "\u2A70",
      ape: "\u224A",
      apid: "\u224B",
      apos: "'",
      ApplyFunction: "\u2061",
      approx: "\u2248",
      approxeq: "\u224A",
      Aring: "\xC5",
      aring: "\xE5",
      Ascr: "\u{1D49C}",
      ascr: "\u{1D4B6}",
      Assign: "\u2254",
      ast: "*",
      asymp: "\u2248",
      asympeq: "\u224D",
      Atilde: "\xC3",
      atilde: "\xE3",
      Auml: "\xC4",
      auml: "\xE4",
      awconint: "\u2233",
      awint: "\u2A11",
      backcong: "\u224C",
      backepsilon: "\u03F6",
      backprime: "\u2035",
      backsim: "\u223D",
      backsimeq: "\u22CD",
      Backslash: "\u2216",
      Barv: "\u2AE7",
      barvee: "\u22BD",
      Barwed: "\u2306",
      barwed: "\u2305",
      barwedge: "\u2305",
      bbrk: "\u23B5",
      bbrktbrk: "\u23B6",
      bcong: "\u224C",
      Bcy: "\u0411",
      bcy: "\u0431",
      bdquo: "\u201E",
      becaus: "\u2235",
      Because: "\u2235",
      because: "\u2235",
      bemptyv: "\u29B0",
      bepsi: "\u03F6",
      bernou: "\u212C",
      Bernoullis: "\u212C",
      Beta: "\u0392",
      beta: "\u03B2",
      beth: "\u2136",
      between: "\u226C",
      Bfr: "\u{1D505}",
      bfr: "\u{1D51F}",
      bigcap: "\u22C2",
      bigcirc: "\u25EF",
      bigcup: "\u22C3",
      bigodot: "\u2A00",
      bigoplus: "\u2A01",
      bigotimes: "\u2A02",
      bigsqcup: "\u2A06",
      bigstar: "\u2605",
      bigtriangledown: "\u25BD",
      bigtriangleup: "\u25B3",
      biguplus: "\u2A04",
      bigvee: "\u22C1",
      bigwedge: "\u22C0",
      bkarow: "\u290D",
      blacklozenge: "\u29EB",
      blacksquare: "\u25AA",
      blacktriangle: "\u25B4",
      blacktriangledown: "\u25BE",
      blacktriangleleft: "\u25C2",
      blacktriangleright: "\u25B8",
      blank: "\u2423",
      blk12: "\u2592",
      blk14: "\u2591",
      blk34: "\u2593",
      block: "\u2588",
      bne: "=\u20E5",
      bnequiv: "\u2261\u20E5",
      bNot: "\u2AED",
      bnot: "\u2310",
      Bopf: "\u{1D539}",
      bopf: "\u{1D553}",
      bot: "\u22A5",
      bottom: "\u22A5",
      bowtie: "\u22C8",
      boxbox: "\u29C9",
      boxDL: "\u2557",
      boxDl: "\u2556",
      boxdL: "\u2555",
      boxdl: "\u2510",
      boxDR: "\u2554",
      boxDr: "\u2553",
      boxdR: "\u2552",
      boxdr: "\u250C",
      boxH: "\u2550",
      boxh: "\u2500",
      boxHD: "\u2566",
      boxHd: "\u2564",
      boxhD: "\u2565",
      boxhd: "\u252C",
      boxHU: "\u2569",
      boxHu: "\u2567",
      boxhU: "\u2568",
      boxhu: "\u2534",
      boxminus: "\u229F",
      boxplus: "\u229E",
      boxtimes: "\u22A0",
      boxUL: "\u255D",
      boxUl: "\u255C",
      boxuL: "\u255B",
      boxul: "\u2518",
      boxUR: "\u255A",
      boxUr: "\u2559",
      boxuR: "\u2558",
      boxur: "\u2514",
      boxV: "\u2551",
      boxv: "\u2502",
      boxVH: "\u256C",
      boxVh: "\u256B",
      boxvH: "\u256A",
      boxvh: "\u253C",
      boxVL: "\u2563",
      boxVl: "\u2562",
      boxvL: "\u2561",
      boxvl: "\u2524",
      boxVR: "\u2560",
      boxVr: "\u255F",
      boxvR: "\u255E",
      boxvr: "\u251C",
      bprime: "\u2035",
      Breve: "\u02D8",
      breve: "\u02D8",
      brvbar: "\xA6",
      Bscr: "\u212C",
      bscr: "\u{1D4B7}",
      bsemi: "\u204F",
      bsim: "\u223D",
      bsime: "\u22CD",
      bsol: "\\",
      bsolb: "\u29C5",
      bsolhsub: "\u27C8",
      bull: "\u2022",
      bullet: "\u2022",
      bump: "\u224E",
      bumpE: "\u2AAE",
      bumpe: "\u224F",
      Bumpeq: "\u224E",
      bumpeq: "\u224F",
      Cacute: "\u0106",
      cacute: "\u0107",
      Cap: "\u22D2",
      cap: "\u2229",
      capand: "\u2A44",
      capbrcup: "\u2A49",
      capcap: "\u2A4B",
      capcup: "\u2A47",
      capdot: "\u2A40",
      CapitalDifferentialD: "\u2145",
      caps: "\u2229\uFE00",
      caret: "\u2041",
      caron: "\u02C7",
      Cayleys: "\u212D",
      ccaps: "\u2A4D",
      Ccaron: "\u010C",
      ccaron: "\u010D",
      Ccedil: "\xC7",
      ccedil: "\xE7",
      Ccirc: "\u0108",
      ccirc: "\u0109",
      Cconint: "\u2230",
      ccups: "\u2A4C",
      ccupssm: "\u2A50",
      Cdot: "\u010A",
      cdot: "\u010B",
      cedil: "\xB8",
      Cedilla: "\xB8",
      cemptyv: "\u29B2",
      cent: "\xA2",
      CenterDot: "\xB7",
      centerdot: "\xB7",
      Cfr: "\u212D",
      cfr: "\u{1D520}",
      CHcy: "\u0427",
      chcy: "\u0447",
      check: "\u2713",
      checkmark: "\u2713",
      Chi: "\u03A7",
      chi: "\u03C7",
      cir: "\u25CB",
      circ: "\u02C6",
      circeq: "\u2257",
      circlearrowleft: "\u21BA",
      circlearrowright: "\u21BB",
      circledast: "\u229B",
      circledcirc: "\u229A",
      circleddash: "\u229D",
      CircleDot: "\u2299",
      circledR: "\xAE",
      circledS: "\u24C8",
      CircleMinus: "\u2296",
      CirclePlus: "\u2295",
      CircleTimes: "\u2297",
      cirE: "\u29C3",
      cire: "\u2257",
      cirfnint: "\u2A10",
      cirmid: "\u2AEF",
      cirscir: "\u29C2",
      ClockwiseContourIntegral: "\u2232",
      CloseCurlyDoubleQuote: "\u201D",
      CloseCurlyQuote: "\u2019",
      clubs: "\u2663",
      clubsuit: "\u2663",
      Colon: "\u2237",
      colon: ":",
      Colone: "\u2A74",
      colone: "\u2254",
      coloneq: "\u2254",
      comma: ",",
      commat: "@",
      comp: "\u2201",
      compfn: "\u2218",
      complement: "\u2201",
      complexes: "\u2102",
      cong: "\u2245",
      congdot: "\u2A6D",
      Congruent: "\u2261",
      Conint: "\u222F",
      conint: "\u222E",
      ContourIntegral: "\u222E",
      Copf: "\u2102",
      copf: "\u{1D554}",
      coprod: "\u2210",
      Coproduct: "\u2210",
      COPY: "\xA9",
      copy: "\xA9",
      copysr: "\u2117",
      CounterClockwiseContourIntegral: "\u2233",
      crarr: "\u21B5",
      Cross: "\u2A2F",
      cross: "\u2717",
      Cscr: "\u{1D49E}",
      cscr: "\u{1D4B8}",
      csub: "\u2ACF",
      csube: "\u2AD1",
      csup: "\u2AD0",
      csupe: "\u2AD2",
      ctdot: "\u22EF",
      cudarrl: "\u2938",
      cudarrr: "\u2935",
      cuepr: "\u22DE",
      cuesc: "\u22DF",
      cularr: "\u21B6",
      cularrp: "\u293D",
      Cup: "\u22D3",
      cup: "\u222A",
      cupbrcap: "\u2A48",
      CupCap: "\u224D",
      cupcap: "\u2A46",
      cupcup: "\u2A4A",
      cupdot: "\u228D",
      cupor: "\u2A45",
      cups: "\u222A\uFE00",
      curarr: "\u21B7",
      curarrm: "\u293C",
      curlyeqprec: "\u22DE",
      curlyeqsucc: "\u22DF",
      curlyvee: "\u22CE",
      curlywedge: "\u22CF",
      curren: "\xA4",
      curvearrowleft: "\u21B6",
      curvearrowright: "\u21B7",
      cuvee: "\u22CE",
      cuwed: "\u22CF",
      cwconint: "\u2232",
      cwint: "\u2231",
      cylcty: "\u232D",
      Dagger: "\u2021",
      dagger: "\u2020",
      daleth: "\u2138",
      Darr: "\u21A1",
      dArr: "\u21D3",
      darr: "\u2193",
      dash: "\u2010",
      Dashv: "\u2AE4",
      dashv: "\u22A3",
      dbkarow: "\u290F",
      dblac: "\u02DD",
      Dcaron: "\u010E",
      dcaron: "\u010F",
      Dcy: "\u0414",
      dcy: "\u0434",
      DD: "\u2145",
      dd: "\u2146",
      ddagger: "\u2021",
      ddarr: "\u21CA",
      DDotrahd: "\u2911",
      ddotseq: "\u2A77",
      deg: "\xB0",
      Del: "\u2207",
      Delta: "\u0394",
      delta: "\u03B4",
      demptyv: "\u29B1",
      dfisht: "\u297F",
      Dfr: "\u{1D507}",
      dfr: "\u{1D521}",
      dHar: "\u2965",
      dharl: "\u21C3",
      dharr: "\u21C2",
      DiacriticalAcute: "\xB4",
      DiacriticalDot: "\u02D9",
      DiacriticalDoubleAcute: "\u02DD",
      DiacriticalGrave: "`",
      DiacriticalTilde: "\u02DC",
      diam: "\u22C4",
      Diamond: "\u22C4",
      diamond: "\u22C4",
      diamondsuit: "\u2666",
      diams: "\u2666",
      die: "\xA8",
      DifferentialD: "\u2146",
      digamma: "\u03DD",
      disin: "\u22F2",
      div: "\xF7",
      divide: "\xF7",
      divideontimes: "\u22C7",
      divonx: "\u22C7",
      DJcy: "\u0402",
      djcy: "\u0452",
      dlcorn: "\u231E",
      dlcrop: "\u230D",
      dollar: "$",
      Dopf: "\u{1D53B}",
      dopf: "\u{1D555}",
      Dot: "\xA8",
      dot: "\u02D9",
      DotDot: "\u20DC",
      doteq: "\u2250",
      doteqdot: "\u2251",
      DotEqual: "\u2250",
      dotminus: "\u2238",
      dotplus: "\u2214",
      dotsquare: "\u22A1",
      doublebarwedge: "\u2306",
      DoubleContourIntegral: "\u222F",
      DoubleDot: "\xA8",
      DoubleDownArrow: "\u21D3",
      DoubleLeftArrow: "\u21D0",
      DoubleLeftRightArrow: "\u21D4",
      DoubleLeftTee: "\u2AE4",
      DoubleLongLeftArrow: "\u27F8",
      DoubleLongLeftRightArrow: "\u27FA",
      DoubleLongRightArrow: "\u27F9",
      DoubleRightArrow: "\u21D2",
      DoubleRightTee: "\u22A8",
      DoubleUpArrow: "\u21D1",
      DoubleUpDownArrow: "\u21D5",
      DoubleVerticalBar: "\u2225",
      DownArrow: "\u2193",
      Downarrow: "\u21D3",
      downarrow: "\u2193",
      DownArrowBar: "\u2913",
      DownArrowUpArrow: "\u21F5",
      DownBreve: "\u0311",
      downdownarrows: "\u21CA",
      downharpoonleft: "\u21C3",
      downharpoonright: "\u21C2",
      DownLeftRightVector: "\u2950",
      DownLeftTeeVector: "\u295E",
      DownLeftVector: "\u21BD",
      DownLeftVectorBar: "\u2956",
      DownRightTeeVector: "\u295F",
      DownRightVector: "\u21C1",
      DownRightVectorBar: "\u2957",
      DownTee: "\u22A4",
      DownTeeArrow: "\u21A7",
      drbkarow: "\u2910",
      drcorn: "\u231F",
      drcrop: "\u230C",
      Dscr: "\u{1D49F}",
      dscr: "\u{1D4B9}",
      DScy: "\u0405",
      dscy: "\u0455",
      dsol: "\u29F6",
      Dstrok: "\u0110",
      dstrok: "\u0111",
      dtdot: "\u22F1",
      dtri: "\u25BF",
      dtrif: "\u25BE",
      duarr: "\u21F5",
      duhar: "\u296F",
      dwangle: "\u29A6",
      DZcy: "\u040F",
      dzcy: "\u045F",
      dzigrarr: "\u27FF",
      Eacute: "\xC9",
      eacute: "\xE9",
      easter: "\u2A6E",
      Ecaron: "\u011A",
      ecaron: "\u011B",
      ecir: "\u2256",
      Ecirc: "\xCA",
      ecirc: "\xEA",
      ecolon: "\u2255",
      Ecy: "\u042D",
      ecy: "\u044D",
      eDDot: "\u2A77",
      Edot: "\u0116",
      eDot: "\u2251",
      edot: "\u0117",
      ee: "\u2147",
      efDot: "\u2252",
      Efr: "\u{1D508}",
      efr: "\u{1D522}",
      eg: "\u2A9A",
      Egrave: "\xC8",
      egrave: "\xE8",
      egs: "\u2A96",
      egsdot: "\u2A98",
      el: "\u2A99",
      Element: "\u2208",
      elinters: "\u23E7",
      ell: "\u2113",
      els: "\u2A95",
      elsdot: "\u2A97",
      Emacr: "\u0112",
      emacr: "\u0113",
      empty: "\u2205",
      emptyset: "\u2205",
      EmptySmallSquare: "\u25FB",
      emptyv: "\u2205",
      EmptyVerySmallSquare: "\u25AB",
      emsp: "\u2003",
      emsp13: "\u2004",
      emsp14: "\u2005",
      ENG: "\u014A",
      eng: "\u014B",
      ensp: "\u2002",
      Eogon: "\u0118",
      eogon: "\u0119",
      Eopf: "\u{1D53C}",
      eopf: "\u{1D556}",
      epar: "\u22D5",
      eparsl: "\u29E3",
      eplus: "\u2A71",
      epsi: "\u03B5",
      Epsilon: "\u0395",
      epsilon: "\u03B5",
      epsiv: "\u03F5",
      eqcirc: "\u2256",
      eqcolon: "\u2255",
      eqsim: "\u2242",
      eqslantgtr: "\u2A96",
      eqslantless: "\u2A95",
      Equal: "\u2A75",
      equals: "=",
      EqualTilde: "\u2242",
      equest: "\u225F",
      Equilibrium: "\u21CC",
      equiv: "\u2261",
      equivDD: "\u2A78",
      eqvparsl: "\u29E5",
      erarr: "\u2971",
      erDot: "\u2253",
      Escr: "\u2130",
      escr: "\u212F",
      esdot: "\u2250",
      Esim: "\u2A73",
      esim: "\u2242",
      Eta: "\u0397",
      eta: "\u03B7",
      ETH: "\xD0",
      eth: "\xF0",
      Euml: "\xCB",
      euml: "\xEB",
      euro: "\u20AC",
      excl: "!",
      exist: "\u2203",
      Exists: "\u2203",
      expectation: "\u2130",
      ExponentialE: "\u2147",
      exponentiale: "\u2147",
      fallingdotseq: "\u2252",
      Fcy: "\u0424",
      fcy: "\u0444",
      female: "\u2640",
      ffilig: "\uFB03",
      fflig: "\uFB00",
      ffllig: "\uFB04",
      Ffr: "\u{1D509}",
      ffr: "\u{1D523}",
      filig: "\uFB01",
      FilledSmallSquare: "\u25FC",
      FilledVerySmallSquare: "\u25AA",
      fjlig: "fj",
      flat: "\u266D",
      fllig: "\uFB02",
      fltns: "\u25B1",
      fnof: "\u0192",
      Fopf: "\u{1D53D}",
      fopf: "\u{1D557}",
      ForAll: "\u2200",
      forall: "\u2200",
      fork: "\u22D4",
      forkv: "\u2AD9",
      Fouriertrf: "\u2131",
      fpartint: "\u2A0D",
      frac12: "\xBD",
      frac13: "\u2153",
      frac14: "\xBC",
      frac15: "\u2155",
      frac16: "\u2159",
      frac18: "\u215B",
      frac23: "\u2154",
      frac25: "\u2156",
      frac34: "\xBE",
      frac35: "\u2157",
      frac38: "\u215C",
      frac45: "\u2158",
      frac56: "\u215A",
      frac58: "\u215D",
      frac78: "\u215E",
      frasl: "\u2044",
      frown: "\u2322",
      Fscr: "\u2131",
      fscr: "\u{1D4BB}",
      gacute: "\u01F5",
      Gamma: "\u0393",
      gamma: "\u03B3",
      Gammad: "\u03DC",
      gammad: "\u03DD",
      gap: "\u2A86",
      Gbreve: "\u011E",
      gbreve: "\u011F",
      Gcedil: "\u0122",
      Gcirc: "\u011C",
      gcirc: "\u011D",
      Gcy: "\u0413",
      gcy: "\u0433",
      Gdot: "\u0120",
      gdot: "\u0121",
      gE: "\u2267",
      ge: "\u2265",
      gEl: "\u2A8C",
      gel: "\u22DB",
      geq: "\u2265",
      geqq: "\u2267",
      geqslant: "\u2A7E",
      ges: "\u2A7E",
      gescc: "\u2AA9",
      gesdot: "\u2A80",
      gesdoto: "\u2A82",
      gesdotol: "\u2A84",
      gesl: "\u22DB\uFE00",
      gesles: "\u2A94",
      Gfr: "\u{1D50A}",
      gfr: "\u{1D524}",
      Gg: "\u22D9",
      gg: "\u226B",
      ggg: "\u22D9",
      gimel: "\u2137",
      GJcy: "\u0403",
      gjcy: "\u0453",
      gl: "\u2277",
      gla: "\u2AA5",
      glE: "\u2A92",
      glj: "\u2AA4",
      gnap: "\u2A8A",
      gnapprox: "\u2A8A",
      gnE: "\u2269",
      gne: "\u2A88",
      gneq: "\u2A88",
      gneqq: "\u2269",
      gnsim: "\u22E7",
      Gopf: "\u{1D53E}",
      gopf: "\u{1D558}",
      grave: "`",
      GreaterEqual: "\u2265",
      GreaterEqualLess: "\u22DB",
      GreaterFullEqual: "\u2267",
      GreaterGreater: "\u2AA2",
      GreaterLess: "\u2277",
      GreaterSlantEqual: "\u2A7E",
      GreaterTilde: "\u2273",
      Gscr: "\u{1D4A2}",
      gscr: "\u210A",
      gsim: "\u2273",
      gsime: "\u2A8E",
      gsiml: "\u2A90",
      Gt: "\u226B",
      GT: ">",
      gt: ">",
      gtcc: "\u2AA7",
      gtcir: "\u2A7A",
      gtdot: "\u22D7",
      gtlPar: "\u2995",
      gtquest: "\u2A7C",
      gtrapprox: "\u2A86",
      gtrarr: "\u2978",
      gtrdot: "\u22D7",
      gtreqless: "\u22DB",
      gtreqqless: "\u2A8C",
      gtrless: "\u2277",
      gtrsim: "\u2273",
      gvertneqq: "\u2269\uFE00",
      gvnE: "\u2269\uFE00",
      Hacek: "\u02C7",
      hairsp: "\u200A",
      half: "\xBD",
      hamilt: "\u210B",
      HARDcy: "\u042A",
      hardcy: "\u044A",
      hArr: "\u21D4",
      harr: "\u2194",
      harrcir: "\u2948",
      harrw: "\u21AD",
      Hat: "^",
      hbar: "\u210F",
      Hcirc: "\u0124",
      hcirc: "\u0125",
      hearts: "\u2665",
      heartsuit: "\u2665",
      hellip: "\u2026",
      hercon: "\u22B9",
      Hfr: "\u210C",
      hfr: "\u{1D525}",
      HilbertSpace: "\u210B",
      hksearow: "\u2925",
      hkswarow: "\u2926",
      hoarr: "\u21FF",
      homtht: "\u223B",
      hookleftarrow: "\u21A9",
      hookrightarrow: "\u21AA",
      Hopf: "\u210D",
      hopf: "\u{1D559}",
      horbar: "\u2015",
      HorizontalLine: "\u2500",
      Hscr: "\u210B",
      hscr: "\u{1D4BD}",
      hslash: "\u210F",
      Hstrok: "\u0126",
      hstrok: "\u0127",
      HumpDownHump: "\u224E",
      HumpEqual: "\u224F",
      hybull: "\u2043",
      hyphen: "\u2010",
      Iacute: "\xCD",
      iacute: "\xED",
      ic: "\u2063",
      Icirc: "\xCE",
      icirc: "\xEE",
      Icy: "\u0418",
      icy: "\u0438",
      Idot: "\u0130",
      IEcy: "\u0415",
      iecy: "\u0435",
      iexcl: "\xA1",
      iff: "\u21D4",
      Ifr: "\u2111",
      ifr: "\u{1D526}",
      Igrave: "\xCC",
      igrave: "\xEC",
      ii: "\u2148",
      iiiint: "\u2A0C",
      iiint: "\u222D",
      iinfin: "\u29DC",
      iiota: "\u2129",
      IJlig: "\u0132",
      ijlig: "\u0133",
      Im: "\u2111",
      Imacr: "\u012A",
      imacr: "\u012B",
      image: "\u2111",
      ImaginaryI: "\u2148",
      imagline: "\u2110",
      imagpart: "\u2111",
      imath: "\u0131",
      imof: "\u22B7",
      imped: "\u01B5",
      Implies: "\u21D2",
      in: "\u2208",
      incare: "\u2105",
      infin: "\u221E",
      infintie: "\u29DD",
      inodot: "\u0131",
      Int: "\u222C",
      int: "\u222B",
      intcal: "\u22BA",
      integers: "\u2124",
      Integral: "\u222B",
      intercal: "\u22BA",
      Intersection: "\u22C2",
      intlarhk: "\u2A17",
      intprod: "\u2A3C",
      InvisibleComma: "\u2063",
      InvisibleTimes: "\u2062",
      IOcy: "\u0401",
      iocy: "\u0451",
      Iogon: "\u012E",
      iogon: "\u012F",
      Iopf: "\u{1D540}",
      iopf: "\u{1D55A}",
      Iota: "\u0399",
      iota: "\u03B9",
      iprod: "\u2A3C",
      iquest: "\xBF",
      Iscr: "\u2110",
      iscr: "\u{1D4BE}",
      isin: "\u2208",
      isindot: "\u22F5",
      isinE: "\u22F9",
      isins: "\u22F4",
      isinsv: "\u22F3",
      isinv: "\u2208",
      it: "\u2062",
      Itilde: "\u0128",
      itilde: "\u0129",
      Iukcy: "\u0406",
      iukcy: "\u0456",
      Iuml: "\xCF",
      iuml: "\xEF",
      Jcirc: "\u0134",
      jcirc: "\u0135",
      Jcy: "\u0419",
      jcy: "\u0439",
      Jfr: "\u{1D50D}",
      jfr: "\u{1D527}",
      jmath: "\u0237",
      Jopf: "\u{1D541}",
      jopf: "\u{1D55B}",
      Jscr: "\u{1D4A5}",
      jscr: "\u{1D4BF}",
      Jsercy: "\u0408",
      jsercy: "\u0458",
      Jukcy: "\u0404",
      jukcy: "\u0454",
      Kappa: "\u039A",
      kappa: "\u03BA",
      kappav: "\u03F0",
      Kcedil: "\u0136",
      kcedil: "\u0137",
      Kcy: "\u041A",
      kcy: "\u043A",
      Kfr: "\u{1D50E}",
      kfr: "\u{1D528}",
      kgreen: "\u0138",
      KHcy: "\u0425",
      khcy: "\u0445",
      KJcy: "\u040C",
      kjcy: "\u045C",
      Kopf: "\u{1D542}",
      kopf: "\u{1D55C}",
      Kscr: "\u{1D4A6}",
      kscr: "\u{1D4C0}",
      lAarr: "\u21DA",
      Lacute: "\u0139",
      lacute: "\u013A",
      laemptyv: "\u29B4",
      lagran: "\u2112",
      Lambda: "\u039B",
      lambda: "\u03BB",
      Lang: "\u27EA",
      lang: "\u27E8",
      langd: "\u2991",
      langle: "\u27E8",
      lap: "\u2A85",
      Laplacetrf: "\u2112",
      laquo: "\xAB",
      Larr: "\u219E",
      lArr: "\u21D0",
      larr: "\u2190",
      larrb: "\u21E4",
      larrbfs: "\u291F",
      larrfs: "\u291D",
      larrhk: "\u21A9",
      larrlp: "\u21AB",
      larrpl: "\u2939",
      larrsim: "\u2973",
      larrtl: "\u21A2",
      lat: "\u2AAB",
      lAtail: "\u291B",
      latail: "\u2919",
      late: "\u2AAD",
      lates: "\u2AAD\uFE00",
      lBarr: "\u290E",
      lbarr: "\u290C",
      lbbrk: "\u2772",
      lbrace: "{",
      lbrack: "[",
      lbrke: "\u298B",
      lbrksld: "\u298F",
      lbrkslu: "\u298D",
      Lcaron: "\u013D",
      lcaron: "\u013E",
      Lcedil: "\u013B",
      lcedil: "\u013C",
      lceil: "\u2308",
      lcub: "{",
      Lcy: "\u041B",
      lcy: "\u043B",
      ldca: "\u2936",
      ldquo: "\u201C",
      ldquor: "\u201E",
      ldrdhar: "\u2967",
      ldrushar: "\u294B",
      ldsh: "\u21B2",
      lE: "\u2266",
      le: "\u2264",
      LeftAngleBracket: "\u27E8",
      LeftArrow: "\u2190",
      Leftarrow: "\u21D0",
      leftarrow: "\u2190",
      LeftArrowBar: "\u21E4",
      LeftArrowRightArrow: "\u21C6",
      leftarrowtail: "\u21A2",
      LeftCeiling: "\u2308",
      LeftDoubleBracket: "\u27E6",
      LeftDownTeeVector: "\u2961",
      LeftDownVector: "\u21C3",
      LeftDownVectorBar: "\u2959",
      LeftFloor: "\u230A",
      leftharpoondown: "\u21BD",
      leftharpoonup: "\u21BC",
      leftleftarrows: "\u21C7",
      LeftRightArrow: "\u2194",
      Leftrightarrow: "\u21D4",
      leftrightarrow: "\u2194",
      leftrightarrows: "\u21C6",
      leftrightharpoons: "\u21CB",
      leftrightsquigarrow: "\u21AD",
      LeftRightVector: "\u294E",
      LeftTee: "\u22A3",
      LeftTeeArrow: "\u21A4",
      LeftTeeVector: "\u295A",
      leftthreetimes: "\u22CB",
      LeftTriangle: "\u22B2",
      LeftTriangleBar: "\u29CF",
      LeftTriangleEqual: "\u22B4",
      LeftUpDownVector: "\u2951",
      LeftUpTeeVector: "\u2960",
      LeftUpVector: "\u21BF",
      LeftUpVectorBar: "\u2958",
      LeftVector: "\u21BC",
      LeftVectorBar: "\u2952",
      lEg: "\u2A8B",
      leg: "\u22DA",
      leq: "\u2264",
      leqq: "\u2266",
      leqslant: "\u2A7D",
      les: "\u2A7D",
      lescc: "\u2AA8",
      lesdot: "\u2A7F",
      lesdoto: "\u2A81",
      lesdotor: "\u2A83",
      lesg: "\u22DA\uFE00",
      lesges: "\u2A93",
      lessapprox: "\u2A85",
      lessdot: "\u22D6",
      lesseqgtr: "\u22DA",
      lesseqqgtr: "\u2A8B",
      LessEqualGreater: "\u22DA",
      LessFullEqual: "\u2266",
      LessGreater: "\u2276",
      lessgtr: "\u2276",
      LessLess: "\u2AA1",
      lesssim: "\u2272",
      LessSlantEqual: "\u2A7D",
      LessTilde: "\u2272",
      lfisht: "\u297C",
      lfloor: "\u230A",
      Lfr: "\u{1D50F}",
      lfr: "\u{1D529}",
      lg: "\u2276",
      lgE: "\u2A91",
      lHar: "\u2962",
      lhard: "\u21BD",
      lharu: "\u21BC",
      lharul: "\u296A",
      lhblk: "\u2584",
      LJcy: "\u0409",
      ljcy: "\u0459",
      Ll: "\u22D8",
      ll: "\u226A",
      llarr: "\u21C7",
      llcorner: "\u231E",
      Lleftarrow: "\u21DA",
      llhard: "\u296B",
      lltri: "\u25FA",
      Lmidot: "\u013F",
      lmidot: "\u0140",
      lmoust: "\u23B0",
      lmoustache: "\u23B0",
      lnap: "\u2A89",
      lnapprox: "\u2A89",
      lnE: "\u2268",
      lne: "\u2A87",
      lneq: "\u2A87",
      lneqq: "\u2268",
      lnsim: "\u22E6",
      loang: "\u27EC",
      loarr: "\u21FD",
      lobrk: "\u27E6",
      LongLeftArrow: "\u27F5",
      Longleftarrow: "\u27F8",
      longleftarrow: "\u27F5",
      LongLeftRightArrow: "\u27F7",
      Longleftrightarrow: "\u27FA",
      longleftrightarrow: "\u27F7",
      longmapsto: "\u27FC",
      LongRightArrow: "\u27F6",
      Longrightarrow: "\u27F9",
      longrightarrow: "\u27F6",
      looparrowleft: "\u21AB",
      looparrowright: "\u21AC",
      lopar: "\u2985",
      Lopf: "\u{1D543}",
      lopf: "\u{1D55D}",
      loplus: "\u2A2D",
      lotimes: "\u2A34",
      lowast: "\u2217",
      lowbar: "_",
      LowerLeftArrow: "\u2199",
      LowerRightArrow: "\u2198",
      loz: "\u25CA",
      lozenge: "\u25CA",
      lozf: "\u29EB",
      lpar: "(",
      lparlt: "\u2993",
      lrarr: "\u21C6",
      lrcorner: "\u231F",
      lrhar: "\u21CB",
      lrhard: "\u296D",
      lrm: "\u200E",
      lrtri: "\u22BF",
      lsaquo: "\u2039",
      Lscr: "\u2112",
      lscr: "\u{1D4C1}",
      Lsh: "\u21B0",
      lsh: "\u21B0",
      lsim: "\u2272",
      lsime: "\u2A8D",
      lsimg: "\u2A8F",
      lsqb: "[",
      lsquo: "\u2018",
      lsquor: "\u201A",
      Lstrok: "\u0141",
      lstrok: "\u0142",
      Lt: "\u226A",
      LT: "<",
      lt: "<",
      ltcc: "\u2AA6",
      ltcir: "\u2A79",
      ltdot: "\u22D6",
      lthree: "\u22CB",
      ltimes: "\u22C9",
      ltlarr: "\u2976",
      ltquest: "\u2A7B",
      ltri: "\u25C3",
      ltrie: "\u22B4",
      ltrif: "\u25C2",
      ltrPar: "\u2996",
      lurdshar: "\u294A",
      luruhar: "\u2966",
      lvertneqq: "\u2268\uFE00",
      lvnE: "\u2268\uFE00",
      macr: "\xAF",
      male: "\u2642",
      malt: "\u2720",
      maltese: "\u2720",
      Map: "\u2905",
      map: "\u21A6",
      mapsto: "\u21A6",
      mapstodown: "\u21A7",
      mapstoleft: "\u21A4",
      mapstoup: "\u21A5",
      marker: "\u25AE",
      mcomma: "\u2A29",
      Mcy: "\u041C",
      mcy: "\u043C",
      mdash: "\u2014",
      mDDot: "\u223A",
      measuredangle: "\u2221",
      MediumSpace: "\u205F",
      Mellintrf: "\u2133",
      Mfr: "\u{1D510}",
      mfr: "\u{1D52A}",
      mho: "\u2127",
      micro: "\xB5",
      mid: "\u2223",
      midast: "*",
      midcir: "\u2AF0",
      middot: "\xB7",
      minus: "\u2212",
      minusb: "\u229F",
      minusd: "\u2238",
      minusdu: "\u2A2A",
      MinusPlus: "\u2213",
      mlcp: "\u2ADB",
      mldr: "\u2026",
      mnplus: "\u2213",
      models: "\u22A7",
      Mopf: "\u{1D544}",
      mopf: "\u{1D55E}",
      mp: "\u2213",
      Mscr: "\u2133",
      mscr: "\u{1D4C2}",
      mstpos: "\u223E",
      Mu: "\u039C",
      mu: "\u03BC",
      multimap: "\u22B8",
      mumap: "\u22B8",
      nabla: "\u2207",
      Nacute: "\u0143",
      nacute: "\u0144",
      nang: "\u2220\u20D2",
      nap: "\u2249",
      napE: "\u2A70\u0338",
      napid: "\u224B\u0338",
      napos: "\u0149",
      napprox: "\u2249",
      natur: "\u266E",
      natural: "\u266E",
      naturals: "\u2115",
      nbsp: "\xA0",
      nbump: "\u224E\u0338",
      nbumpe: "\u224F\u0338",
      ncap: "\u2A43",
      Ncaron: "\u0147",
      ncaron: "\u0148",
      Ncedil: "\u0145",
      ncedil: "\u0146",
      ncong: "\u2247",
      ncongdot: "\u2A6D\u0338",
      ncup: "\u2A42",
      Ncy: "\u041D",
      ncy: "\u043D",
      ndash: "\u2013",
      ne: "\u2260",
      nearhk: "\u2924",
      neArr: "\u21D7",
      nearr: "\u2197",
      nearrow: "\u2197",
      nedot: "\u2250\u0338",
      NegativeMediumSpace: "\u200B",
      NegativeThickSpace: "\u200B",
      NegativeThinSpace: "\u200B",
      NegativeVeryThinSpace: "\u200B",
      nequiv: "\u2262",
      nesear: "\u2928",
      nesim: "\u2242\u0338",
      NestedGreaterGreater: "\u226B",
      NestedLessLess: "\u226A",
      NewLine: "\n",
      nexist: "\u2204",
      nexists: "\u2204",
      Nfr: "\u{1D511}",
      nfr: "\u{1D52B}",
      ngE: "\u2267\u0338",
      nge: "\u2271",
      ngeq: "\u2271",
      ngeqq: "\u2267\u0338",
      ngeqslant: "\u2A7E\u0338",
      nges: "\u2A7E\u0338",
      nGg: "\u22D9\u0338",
      ngsim: "\u2275",
      nGt: "\u226B\u20D2",
      ngt: "\u226F",
      ngtr: "\u226F",
      nGtv: "\u226B\u0338",
      nhArr: "\u21CE",
      nharr: "\u21AE",
      nhpar: "\u2AF2",
      ni: "\u220B",
      nis: "\u22FC",
      nisd: "\u22FA",
      niv: "\u220B",
      NJcy: "\u040A",
      njcy: "\u045A",
      nlArr: "\u21CD",
      nlarr: "\u219A",
      nldr: "\u2025",
      nlE: "\u2266\u0338",
      nle: "\u2270",
      nLeftarrow: "\u21CD",
      nleftarrow: "\u219A",
      nLeftrightarrow: "\u21CE",
      nleftrightarrow: "\u21AE",
      nleq: "\u2270",
      nleqq: "\u2266\u0338",
      nleqslant: "\u2A7D\u0338",
      nles: "\u2A7D\u0338",
      nless: "\u226E",
      nLl: "\u22D8\u0338",
      nlsim: "\u2274",
      nLt: "\u226A\u20D2",
      nlt: "\u226E",
      nltri: "\u22EA",
      nltrie: "\u22EC",
      nLtv: "\u226A\u0338",
      nmid: "\u2224",
      NoBreak: "\u2060",
      NonBreakingSpace: "\xA0",
      Nopf: "\u2115",
      nopf: "\u{1D55F}",
      Not: "\u2AEC",
      not: "\xAC",
      NotCongruent: "\u2262",
      NotCupCap: "\u226D",
      NotDoubleVerticalBar: "\u2226",
      NotElement: "\u2209",
      NotEqual: "\u2260",
      NotEqualTilde: "\u2242\u0338",
      NotExists: "\u2204",
      NotGreater: "\u226F",
      NotGreaterEqual: "\u2271",
      NotGreaterFullEqual: "\u2267\u0338",
      NotGreaterGreater: "\u226B\u0338",
      NotGreaterLess: "\u2279",
      NotGreaterSlantEqual: "\u2A7E\u0338",
      NotGreaterTilde: "\u2275",
      NotHumpDownHump: "\u224E\u0338",
      NotHumpEqual: "\u224F\u0338",
      notin: "\u2209",
      notindot: "\u22F5\u0338",
      notinE: "\u22F9\u0338",
      notinva: "\u2209",
      notinvb: "\u22F7",
      notinvc: "\u22F6",
      NotLeftTriangle: "\u22EA",
      NotLeftTriangleBar: "\u29CF\u0338",
      NotLeftTriangleEqual: "\u22EC",
      NotLess: "\u226E",
      NotLessEqual: "\u2270",
      NotLessGreater: "\u2278",
      NotLessLess: "\u226A\u0338",
      NotLessSlantEqual: "\u2A7D\u0338",
      NotLessTilde: "\u2274",
      NotNestedGreaterGreater: "\u2AA2\u0338",
      NotNestedLessLess: "\u2AA1\u0338",
      notni: "\u220C",
      notniva: "\u220C",
      notnivb: "\u22FE",
      notnivc: "\u22FD",
      NotPrecedes: "\u2280",
      NotPrecedesEqual: "\u2AAF\u0338",
      NotPrecedesSlantEqual: "\u22E0",
      NotReverseElement: "\u220C",
      NotRightTriangle: "\u22EB",
      NotRightTriangleBar: "\u29D0\u0338",
      NotRightTriangleEqual: "\u22ED",
      NotSquareSubset: "\u228F\u0338",
      NotSquareSubsetEqual: "\u22E2",
      NotSquareSuperset: "\u2290\u0338",
      NotSquareSupersetEqual: "\u22E3",
      NotSubset: "\u2282\u20D2",
      NotSubsetEqual: "\u2288",
      NotSucceeds: "\u2281",
      NotSucceedsEqual: "\u2AB0\u0338",
      NotSucceedsSlantEqual: "\u22E1",
      NotSucceedsTilde: "\u227F\u0338",
      NotSuperset: "\u2283\u20D2",
      NotSupersetEqual: "\u2289",
      NotTilde: "\u2241",
      NotTildeEqual: "\u2244",
      NotTildeFullEqual: "\u2247",
      NotTildeTilde: "\u2249",
      NotVerticalBar: "\u2224",
      npar: "\u2226",
      nparallel: "\u2226",
      nparsl: "\u2AFD\u20E5",
      npart: "\u2202\u0338",
      npolint: "\u2A14",
      npr: "\u2280",
      nprcue: "\u22E0",
      npre: "\u2AAF\u0338",
      nprec: "\u2280",
      npreceq: "\u2AAF\u0338",
      nrArr: "\u21CF",
      nrarr: "\u219B",
      nrarrc: "\u2933\u0338",
      nrarrw: "\u219D\u0338",
      nRightarrow: "\u21CF",
      nrightarrow: "\u219B",
      nrtri: "\u22EB",
      nrtrie: "\u22ED",
      nsc: "\u2281",
      nsccue: "\u22E1",
      nsce: "\u2AB0\u0338",
      Nscr: "\u{1D4A9}",
      nscr: "\u{1D4C3}",
      nshortmid: "\u2224",
      nshortparallel: "\u2226",
      nsim: "\u2241",
      nsime: "\u2244",
      nsimeq: "\u2244",
      nsmid: "\u2224",
      nspar: "\u2226",
      nsqsube: "\u22E2",
      nsqsupe: "\u22E3",
      nsub: "\u2284",
      nsubE: "\u2AC5\u0338",
      nsube: "\u2288",
      nsubset: "\u2282\u20D2",
      nsubseteq: "\u2288",
      nsubseteqq: "\u2AC5\u0338",
      nsucc: "\u2281",
      nsucceq: "\u2AB0\u0338",
      nsup: "\u2285",
      nsupE: "\u2AC6\u0338",
      nsupe: "\u2289",
      nsupset: "\u2283\u20D2",
      nsupseteq: "\u2289",
      nsupseteqq: "\u2AC6\u0338",
      ntgl: "\u2279",
      Ntilde: "\xD1",
      ntilde: "\xF1",
      ntlg: "\u2278",
      ntriangleleft: "\u22EA",
      ntrianglelefteq: "\u22EC",
      ntriangleright: "\u22EB",
      ntrianglerighteq: "\u22ED",
      Nu: "\u039D",
      nu: "\u03BD",
      num: "#",
      numero: "\u2116",
      numsp: "\u2007",
      nvap: "\u224D\u20D2",
      nVDash: "\u22AF",
      nVdash: "\u22AE",
      nvDash: "\u22AD",
      nvdash: "\u22AC",
      nvge: "\u2265\u20D2",
      nvgt: ">\u20D2",
      nvHarr: "\u2904",
      nvinfin: "\u29DE",
      nvlArr: "\u2902",
      nvle: "\u2264\u20D2",
      nvlt: "<\u20D2",
      nvltrie: "\u22B4\u20D2",
      nvrArr: "\u2903",
      nvrtrie: "\u22B5\u20D2",
      nvsim: "\u223C\u20D2",
      nwarhk: "\u2923",
      nwArr: "\u21D6",
      nwarr: "\u2196",
      nwarrow: "\u2196",
      nwnear: "\u2927",
      Oacute: "\xD3",
      oacute: "\xF3",
      oast: "\u229B",
      ocir: "\u229A",
      Ocirc: "\xD4",
      ocirc: "\xF4",
      Ocy: "\u041E",
      ocy: "\u043E",
      odash: "\u229D",
      Odblac: "\u0150",
      odblac: "\u0151",
      odiv: "\u2A38",
      odot: "\u2299",
      odsold: "\u29BC",
      OElig: "\u0152",
      oelig: "\u0153",
      ofcir: "\u29BF",
      Ofr: "\u{1D512}",
      ofr: "\u{1D52C}",
      ogon: "\u02DB",
      Ograve: "\xD2",
      ograve: "\xF2",
      ogt: "\u29C1",
      ohbar: "\u29B5",
      ohm: "\u03A9",
      oint: "\u222E",
      olarr: "\u21BA",
      olcir: "\u29BE",
      olcross: "\u29BB",
      oline: "\u203E",
      olt: "\u29C0",
      Omacr: "\u014C",
      omacr: "\u014D",
      Omega: "\u03A9",
      omega: "\u03C9",
      Omicron: "\u039F",
      omicron: "\u03BF",
      omid: "\u29B6",
      ominus: "\u2296",
      Oopf: "\u{1D546}",
      oopf: "\u{1D560}",
      opar: "\u29B7",
      OpenCurlyDoubleQuote: "\u201C",
      OpenCurlyQuote: "\u2018",
      operp: "\u29B9",
      oplus: "\u2295",
      Or: "\u2A54",
      or: "\u2228",
      orarr: "\u21BB",
      ord: "\u2A5D",
      order: "\u2134",
      orderof: "\u2134",
      ordf: "\xAA",
      ordm: "\xBA",
      origof: "\u22B6",
      oror: "\u2A56",
      orslope: "\u2A57",
      orv: "\u2A5B",
      oS: "\u24C8",
      Oscr: "\u{1D4AA}",
      oscr: "\u2134",
      Oslash: "\xD8",
      oslash: "\xF8",
      osol: "\u2298",
      Otilde: "\xD5",
      otilde: "\xF5",
      Otimes: "\u2A37",
      otimes: "\u2297",
      otimesas: "\u2A36",
      Ouml: "\xD6",
      ouml: "\xF6",
      ovbar: "\u233D",
      OverBar: "\u203E",
      OverBrace: "\u23DE",
      OverBracket: "\u23B4",
      OverParenthesis: "\u23DC",
      par: "\u2225",
      para: "\xB6",
      parallel: "\u2225",
      parsim: "\u2AF3",
      parsl: "\u2AFD",
      part: "\u2202",
      PartialD: "\u2202",
      Pcy: "\u041F",
      pcy: "\u043F",
      percnt: "%",
      period: ".",
      permil: "\u2030",
      perp: "\u22A5",
      pertenk: "\u2031",
      Pfr: "\u{1D513}",
      pfr: "\u{1D52D}",
      Phi: "\u03A6",
      phi: "\u03C6",
      phiv: "\u03D5",
      phmmat: "\u2133",
      phone: "\u260E",
      Pi: "\u03A0",
      pi: "\u03C0",
      pitchfork: "\u22D4",
      piv: "\u03D6",
      planck: "\u210F",
      planckh: "\u210E",
      plankv: "\u210F",
      plus: "+",
      plusacir: "\u2A23",
      plusb: "\u229E",
      pluscir: "\u2A22",
      plusdo: "\u2214",
      plusdu: "\u2A25",
      pluse: "\u2A72",
      PlusMinus: "\xB1",
      plusmn: "\xB1",
      plussim: "\u2A26",
      plustwo: "\u2A27",
      pm: "\xB1",
      Poincareplane: "\u210C",
      pointint: "\u2A15",
      Popf: "\u2119",
      popf: "\u{1D561}",
      pound: "\xA3",
      Pr: "\u2ABB",
      pr: "\u227A",
      prap: "\u2AB7",
      prcue: "\u227C",
      prE: "\u2AB3",
      pre: "\u2AAF",
      prec: "\u227A",
      precapprox: "\u2AB7",
      preccurlyeq: "\u227C",
      Precedes: "\u227A",
      PrecedesEqual: "\u2AAF",
      PrecedesSlantEqual: "\u227C",
      PrecedesTilde: "\u227E",
      preceq: "\u2AAF",
      precnapprox: "\u2AB9",
      precneqq: "\u2AB5",
      precnsim: "\u22E8",
      precsim: "\u227E",
      Prime: "\u2033",
      prime: "\u2032",
      primes: "\u2119",
      prnap: "\u2AB9",
      prnE: "\u2AB5",
      prnsim: "\u22E8",
      prod: "\u220F",
      Product: "\u220F",
      profalar: "\u232E",
      profline: "\u2312",
      profsurf: "\u2313",
      prop: "\u221D",
      Proportion: "\u2237",
      Proportional: "\u221D",
      propto: "\u221D",
      prsim: "\u227E",
      prurel: "\u22B0",
      Pscr: "\u{1D4AB}",
      pscr: "\u{1D4C5}",
      Psi: "\u03A8",
      psi: "\u03C8",
      puncsp: "\u2008",
      Qfr: "\u{1D514}",
      qfr: "\u{1D52E}",
      qint: "\u2A0C",
      Qopf: "\u211A",
      qopf: "\u{1D562}",
      qprime: "\u2057",
      Qscr: "\u{1D4AC}",
      qscr: "\u{1D4C6}",
      quaternions: "\u210D",
      quatint: "\u2A16",
      quest: "?",
      questeq: "\u225F",
      QUOT: '"',
      quot: '"',
      rAarr: "\u21DB",
      race: "\u223D\u0331",
      Racute: "\u0154",
      racute: "\u0155",
      radic: "\u221A",
      raemptyv: "\u29B3",
      Rang: "\u27EB",
      rang: "\u27E9",
      rangd: "\u2992",
      range: "\u29A5",
      rangle: "\u27E9",
      raquo: "\xBB",
      Rarr: "\u21A0",
      rArr: "\u21D2",
      rarr: "\u2192",
      rarrap: "\u2975",
      rarrb: "\u21E5",
      rarrbfs: "\u2920",
      rarrc: "\u2933",
      rarrfs: "\u291E",
      rarrhk: "\u21AA",
      rarrlp: "\u21AC",
      rarrpl: "\u2945",
      rarrsim: "\u2974",
      Rarrtl: "\u2916",
      rarrtl: "\u21A3",
      rarrw: "\u219D",
      rAtail: "\u291C",
      ratail: "\u291A",
      ratio: "\u2236",
      rationals: "\u211A",
      RBarr: "\u2910",
      rBarr: "\u290F",
      rbarr: "\u290D",
      rbbrk: "\u2773",
      rbrace: "}",
      rbrack: "]",
      rbrke: "\u298C",
      rbrksld: "\u298E",
      rbrkslu: "\u2990",
      Rcaron: "\u0158",
      rcaron: "\u0159",
      Rcedil: "\u0156",
      rcedil: "\u0157",
      rceil: "\u2309",
      rcub: "}",
      Rcy: "\u0420",
      rcy: "\u0440",
      rdca: "\u2937",
      rdldhar: "\u2969",
      rdquo: "\u201D",
      rdquor: "\u201D",
      rdsh: "\u21B3",
      Re: "\u211C",
      real: "\u211C",
      realine: "\u211B",
      realpart: "\u211C",
      reals: "\u211D",
      rect: "\u25AD",
      REG: "\xAE",
      reg: "\xAE",
      ReverseElement: "\u220B",
      ReverseEquilibrium: "\u21CB",
      ReverseUpEquilibrium: "\u296F",
      rfisht: "\u297D",
      rfloor: "\u230B",
      Rfr: "\u211C",
      rfr: "\u{1D52F}",
      rHar: "\u2964",
      rhard: "\u21C1",
      rharu: "\u21C0",
      rharul: "\u296C",
      Rho: "\u03A1",
      rho: "\u03C1",
      rhov: "\u03F1",
      RightAngleBracket: "\u27E9",
      RightArrow: "\u2192",
      Rightarrow: "\u21D2",
      rightarrow: "\u2192",
      RightArrowBar: "\u21E5",
      RightArrowLeftArrow: "\u21C4",
      rightarrowtail: "\u21A3",
      RightCeiling: "\u2309",
      RightDoubleBracket: "\u27E7",
      RightDownTeeVector: "\u295D",
      RightDownVector: "\u21C2",
      RightDownVectorBar: "\u2955",
      RightFloor: "\u230B",
      rightharpoondown: "\u21C1",
      rightharpoonup: "\u21C0",
      rightleftarrows: "\u21C4",
      rightleftharpoons: "\u21CC",
      rightrightarrows: "\u21C9",
      rightsquigarrow: "\u219D",
      RightTee: "\u22A2",
      RightTeeArrow: "\u21A6",
      RightTeeVector: "\u295B",
      rightthreetimes: "\u22CC",
      RightTriangle: "\u22B3",
      RightTriangleBar: "\u29D0",
      RightTriangleEqual: "\u22B5",
      RightUpDownVector: "\u294F",
      RightUpTeeVector: "\u295C",
      RightUpVector: "\u21BE",
      RightUpVectorBar: "\u2954",
      RightVector: "\u21C0",
      RightVectorBar: "\u2953",
      ring: "\u02DA",
      risingdotseq: "\u2253",
      rlarr: "\u21C4",
      rlhar: "\u21CC",
      rlm: "\u200F",
      rmoust: "\u23B1",
      rmoustache: "\u23B1",
      rnmid: "\u2AEE",
      roang: "\u27ED",
      roarr: "\u21FE",
      robrk: "\u27E7",
      ropar: "\u2986",
      Ropf: "\u211D",
      ropf: "\u{1D563}",
      roplus: "\u2A2E",
      rotimes: "\u2A35",
      RoundImplies: "\u2970",
      rpar: ")",
      rpargt: "\u2994",
      rppolint: "\u2A12",
      rrarr: "\u21C9",
      Rrightarrow: "\u21DB",
      rsaquo: "\u203A",
      Rscr: "\u211B",
      rscr: "\u{1D4C7}",
      Rsh: "\u21B1",
      rsh: "\u21B1",
      rsqb: "]",
      rsquo: "\u2019",
      rsquor: "\u2019",
      rthree: "\u22CC",
      rtimes: "\u22CA",
      rtri: "\u25B9",
      rtrie: "\u22B5",
      rtrif: "\u25B8",
      rtriltri: "\u29CE",
      RuleDelayed: "\u29F4",
      ruluhar: "\u2968",
      rx: "\u211E",
      Sacute: "\u015A",
      sacute: "\u015B",
      sbquo: "\u201A",
      Sc: "\u2ABC",
      sc: "\u227B",
      scap: "\u2AB8",
      Scaron: "\u0160",
      scaron: "\u0161",
      sccue: "\u227D",
      scE: "\u2AB4",
      sce: "\u2AB0",
      Scedil: "\u015E",
      scedil: "\u015F",
      Scirc: "\u015C",
      scirc: "\u015D",
      scnap: "\u2ABA",
      scnE: "\u2AB6",
      scnsim: "\u22E9",
      scpolint: "\u2A13",
      scsim: "\u227F",
      Scy: "\u0421",
      scy: "\u0441",
      sdot: "\u22C5",
      sdotb: "\u22A1",
      sdote: "\u2A66",
      searhk: "\u2925",
      seArr: "\u21D8",
      searr: "\u2198",
      searrow: "\u2198",
      sect: "\xA7",
      semi: ";",
      seswar: "\u2929",
      setminus: "\u2216",
      setmn: "\u2216",
      sext: "\u2736",
      Sfr: "\u{1D516}",
      sfr: "\u{1D530}",
      sfrown: "\u2322",
      sharp: "\u266F",
      SHCHcy: "\u0429",
      shchcy: "\u0449",
      SHcy: "\u0428",
      shcy: "\u0448",
      ShortDownArrow: "\u2193",
      ShortLeftArrow: "\u2190",
      shortmid: "\u2223",
      shortparallel: "\u2225",
      ShortRightArrow: "\u2192",
      ShortUpArrow: "\u2191",
      shy: "\xAD",
      Sigma: "\u03A3",
      sigma: "\u03C3",
      sigmaf: "\u03C2",
      sigmav: "\u03C2",
      sim: "\u223C",
      simdot: "\u2A6A",
      sime: "\u2243",
      simeq: "\u2243",
      simg: "\u2A9E",
      simgE: "\u2AA0",
      siml: "\u2A9D",
      simlE: "\u2A9F",
      simne: "\u2246",
      simplus: "\u2A24",
      simrarr: "\u2972",
      slarr: "\u2190",
      SmallCircle: "\u2218",
      smallsetminus: "\u2216",
      smashp: "\u2A33",
      smeparsl: "\u29E4",
      smid: "\u2223",
      smile: "\u2323",
      smt: "\u2AAA",
      smte: "\u2AAC",
      smtes: "\u2AAC\uFE00",
      SOFTcy: "\u042C",
      softcy: "\u044C",
      sol: "/",
      solb: "\u29C4",
      solbar: "\u233F",
      Sopf: "\u{1D54A}",
      sopf: "\u{1D564}",
      spades: "\u2660",
      spadesuit: "\u2660",
      spar: "\u2225",
      sqcap: "\u2293",
      sqcaps: "\u2293\uFE00",
      sqcup: "\u2294",
      sqcups: "\u2294\uFE00",
      Sqrt: "\u221A",
      sqsub: "\u228F",
      sqsube: "\u2291",
      sqsubset: "\u228F",
      sqsubseteq: "\u2291",
      sqsup: "\u2290",
      sqsupe: "\u2292",
      sqsupset: "\u2290",
      sqsupseteq: "\u2292",
      squ: "\u25A1",
      Square: "\u25A1",
      square: "\u25A1",
      SquareIntersection: "\u2293",
      SquareSubset: "\u228F",
      SquareSubsetEqual: "\u2291",
      SquareSuperset: "\u2290",
      SquareSupersetEqual: "\u2292",
      SquareUnion: "\u2294",
      squarf: "\u25AA",
      squf: "\u25AA",
      srarr: "\u2192",
      Sscr: "\u{1D4AE}",
      sscr: "\u{1D4C8}",
      ssetmn: "\u2216",
      ssmile: "\u2323",
      sstarf: "\u22C6",
      Star: "\u22C6",
      star: "\u2606",
      starf: "\u2605",
      straightepsilon: "\u03F5",
      straightphi: "\u03D5",
      strns: "\xAF",
      Sub: "\u22D0",
      sub: "\u2282",
      subdot: "\u2ABD",
      subE: "\u2AC5",
      sube: "\u2286",
      subedot: "\u2AC3",
      submult: "\u2AC1",
      subnE: "\u2ACB",
      subne: "\u228A",
      subplus: "\u2ABF",
      subrarr: "\u2979",
      Subset: "\u22D0",
      subset: "\u2282",
      subseteq: "\u2286",
      subseteqq: "\u2AC5",
      SubsetEqual: "\u2286",
      subsetneq: "\u228A",
      subsetneqq: "\u2ACB",
      subsim: "\u2AC7",
      subsub: "\u2AD5",
      subsup: "\u2AD3",
      succ: "\u227B",
      succapprox: "\u2AB8",
      succcurlyeq: "\u227D",
      Succeeds: "\u227B",
      SucceedsEqual: "\u2AB0",
      SucceedsSlantEqual: "\u227D",
      SucceedsTilde: "\u227F",
      succeq: "\u2AB0",
      succnapprox: "\u2ABA",
      succneqq: "\u2AB6",
      succnsim: "\u22E9",
      succsim: "\u227F",
      SuchThat: "\u220B",
      Sum: "\u2211",
      sum: "\u2211",
      sung: "\u266A",
      Sup: "\u22D1",
      sup: "\u2283",
      sup1: "\xB9",
      sup2: "\xB2",
      sup3: "\xB3",
      supdot: "\u2ABE",
      supdsub: "\u2AD8",
      supE: "\u2AC6",
      supe: "\u2287",
      supedot: "\u2AC4",
      Superset: "\u2283",
      SupersetEqual: "\u2287",
      suphsol: "\u27C9",
      suphsub: "\u2AD7",
      suplarr: "\u297B",
      supmult: "\u2AC2",
      supnE: "\u2ACC",
      supne: "\u228B",
      supplus: "\u2AC0",
      Supset: "\u22D1",
      supset: "\u2283",
      supseteq: "\u2287",
      supseteqq: "\u2AC6",
      supsetneq: "\u228B",
      supsetneqq: "\u2ACC",
      supsim: "\u2AC8",
      supsub: "\u2AD4",
      supsup: "\u2AD6",
      swarhk: "\u2926",
      swArr: "\u21D9",
      swarr: "\u2199",
      swarrow: "\u2199",
      swnwar: "\u292A",
      szlig: "\xDF",
      Tab: "	",
      target: "\u2316",
      Tau: "\u03A4",
      tau: "\u03C4",
      tbrk: "\u23B4",
      Tcaron: "\u0164",
      tcaron: "\u0165",
      Tcedil: "\u0162",
      tcedil: "\u0163",
      Tcy: "\u0422",
      tcy: "\u0442",
      tdot: "\u20DB",
      telrec: "\u2315",
      Tfr: "\u{1D517}",
      tfr: "\u{1D531}",
      there4: "\u2234",
      Therefore: "\u2234",
      therefore: "\u2234",
      Theta: "\u0398",
      theta: "\u03B8",
      thetasym: "\u03D1",
      thetav: "\u03D1",
      thickapprox: "\u2248",
      thicksim: "\u223C",
      ThickSpace: "\u205F\u200A",
      thinsp: "\u2009",
      ThinSpace: "\u2009",
      thkap: "\u2248",
      thksim: "\u223C",
      THORN: "\xDE",
      thorn: "\xFE",
      Tilde: "\u223C",
      tilde: "\u02DC",
      TildeEqual: "\u2243",
      TildeFullEqual: "\u2245",
      TildeTilde: "\u2248",
      times: "\xD7",
      timesb: "\u22A0",
      timesbar: "\u2A31",
      timesd: "\u2A30",
      tint: "\u222D",
      toea: "\u2928",
      top: "\u22A4",
      topbot: "\u2336",
      topcir: "\u2AF1",
      Topf: "\u{1D54B}",
      topf: "\u{1D565}",
      topfork: "\u2ADA",
      tosa: "\u2929",
      tprime: "\u2034",
      TRADE: "\u2122",
      trade: "\u2122",
      triangle: "\u25B5",
      triangledown: "\u25BF",
      triangleleft: "\u25C3",
      trianglelefteq: "\u22B4",
      triangleq: "\u225C",
      triangleright: "\u25B9",
      trianglerighteq: "\u22B5",
      tridot: "\u25EC",
      trie: "\u225C",
      triminus: "\u2A3A",
      TripleDot: "\u20DB",
      triplus: "\u2A39",
      trisb: "\u29CD",
      tritime: "\u2A3B",
      trpezium: "\u23E2",
      Tscr: "\u{1D4AF}",
      tscr: "\u{1D4C9}",
      TScy: "\u0426",
      tscy: "\u0446",
      TSHcy: "\u040B",
      tshcy: "\u045B",
      Tstrok: "\u0166",
      tstrok: "\u0167",
      twixt: "\u226C",
      twoheadleftarrow: "\u219E",
      twoheadrightarrow: "\u21A0",
      Uacute: "\xDA",
      uacute: "\xFA",
      Uarr: "\u219F",
      uArr: "\u21D1",
      uarr: "\u2191",
      Uarrocir: "\u2949",
      Ubrcy: "\u040E",
      ubrcy: "\u045E",
      Ubreve: "\u016C",
      ubreve: "\u016D",
      Ucirc: "\xDB",
      ucirc: "\xFB",
      Ucy: "\u0423",
      ucy: "\u0443",
      udarr: "\u21C5",
      Udblac: "\u0170",
      udblac: "\u0171",
      udhar: "\u296E",
      ufisht: "\u297E",
      Ufr: "\u{1D518}",
      ufr: "\u{1D532}",
      Ugrave: "\xD9",
      ugrave: "\xF9",
      uHar: "\u2963",
      uharl: "\u21BF",
      uharr: "\u21BE",
      uhblk: "\u2580",
      ulcorn: "\u231C",
      ulcorner: "\u231C",
      ulcrop: "\u230F",
      ultri: "\u25F8",
      Umacr: "\u016A",
      umacr: "\u016B",
      uml: "\xA8",
      UnderBar: "_",
      UnderBrace: "\u23DF",
      UnderBracket: "\u23B5",
      UnderParenthesis: "\u23DD",
      Union: "\u22C3",
      UnionPlus: "\u228E",
      Uogon: "\u0172",
      uogon: "\u0173",
      Uopf: "\u{1D54C}",
      uopf: "\u{1D566}",
      UpArrow: "\u2191",
      Uparrow: "\u21D1",
      uparrow: "\u2191",
      UpArrowBar: "\u2912",
      UpArrowDownArrow: "\u21C5",
      UpDownArrow: "\u2195",
      Updownarrow: "\u21D5",
      updownarrow: "\u2195",
      UpEquilibrium: "\u296E",
      upharpoonleft: "\u21BF",
      upharpoonright: "\u21BE",
      uplus: "\u228E",
      UpperLeftArrow: "\u2196",
      UpperRightArrow: "\u2197",
      Upsi: "\u03D2",
      upsi: "\u03C5",
      upsih: "\u03D2",
      Upsilon: "\u03A5",
      upsilon: "\u03C5",
      UpTee: "\u22A5",
      UpTeeArrow: "\u21A5",
      upuparrows: "\u21C8",
      urcorn: "\u231D",
      urcorner: "\u231D",
      urcrop: "\u230E",
      Uring: "\u016E",
      uring: "\u016F",
      urtri: "\u25F9",
      Uscr: "\u{1D4B0}",
      uscr: "\u{1D4CA}",
      utdot: "\u22F0",
      Utilde: "\u0168",
      utilde: "\u0169",
      utri: "\u25B5",
      utrif: "\u25B4",
      uuarr: "\u21C8",
      Uuml: "\xDC",
      uuml: "\xFC",
      uwangle: "\u29A7",
      vangrt: "\u299C",
      varepsilon: "\u03F5",
      varkappa: "\u03F0",
      varnothing: "\u2205",
      varphi: "\u03D5",
      varpi: "\u03D6",
      varpropto: "\u221D",
      vArr: "\u21D5",
      varr: "\u2195",
      varrho: "\u03F1",
      varsigma: "\u03C2",
      varsubsetneq: "\u228A\uFE00",
      varsubsetneqq: "\u2ACB\uFE00",
      varsupsetneq: "\u228B\uFE00",
      varsupsetneqq: "\u2ACC\uFE00",
      vartheta: "\u03D1",
      vartriangleleft: "\u22B2",
      vartriangleright: "\u22B3",
      Vbar: "\u2AEB",
      vBar: "\u2AE8",
      vBarv: "\u2AE9",
      Vcy: "\u0412",
      vcy: "\u0432",
      VDash: "\u22AB",
      Vdash: "\u22A9",
      vDash: "\u22A8",
      vdash: "\u22A2",
      Vdashl: "\u2AE6",
      Vee: "\u22C1",
      vee: "\u2228",
      veebar: "\u22BB",
      veeeq: "\u225A",
      vellip: "\u22EE",
      Verbar: "\u2016",
      verbar: "|",
      Vert: "\u2016",
      vert: "|",
      VerticalBar: "\u2223",
      VerticalLine: "|",
      VerticalSeparator: "\u2758",
      VerticalTilde: "\u2240",
      VeryThinSpace: "\u200A",
      Vfr: "\u{1D519}",
      vfr: "\u{1D533}",
      vltri: "\u22B2",
      vnsub: "\u2282\u20D2",
      vnsup: "\u2283\u20D2",
      Vopf: "\u{1D54D}",
      vopf: "\u{1D567}",
      vprop: "\u221D",
      vrtri: "\u22B3",
      Vscr: "\u{1D4B1}",
      vscr: "\u{1D4CB}",
      vsubnE: "\u2ACB\uFE00",
      vsubne: "\u228A\uFE00",
      vsupnE: "\u2ACC\uFE00",
      vsupne: "\u228B\uFE00",
      Vvdash: "\u22AA",
      vzigzag: "\u299A",
      Wcirc: "\u0174",
      wcirc: "\u0175",
      wedbar: "\u2A5F",
      Wedge: "\u22C0",
      wedge: "\u2227",
      wedgeq: "\u2259",
      weierp: "\u2118",
      Wfr: "\u{1D51A}",
      wfr: "\u{1D534}",
      Wopf: "\u{1D54E}",
      wopf: "\u{1D568}",
      wp: "\u2118",
      wr: "\u2240",
      wreath: "\u2240",
      Wscr: "\u{1D4B2}",
      wscr: "\u{1D4CC}",
      xcap: "\u22C2",
      xcirc: "\u25EF",
      xcup: "\u22C3",
      xdtri: "\u25BD",
      Xfr: "\u{1D51B}",
      xfr: "\u{1D535}",
      xhArr: "\u27FA",
      xharr: "\u27F7",
      Xi: "\u039E",
      xi: "\u03BE",
      xlArr: "\u27F8",
      xlarr: "\u27F5",
      xmap: "\u27FC",
      xnis: "\u22FB",
      xodot: "\u2A00",
      Xopf: "\u{1D54F}",
      xopf: "\u{1D569}",
      xoplus: "\u2A01",
      xotime: "\u2A02",
      xrArr: "\u27F9",
      xrarr: "\u27F6",
      Xscr: "\u{1D4B3}",
      xscr: "\u{1D4CD}",
      xsqcup: "\u2A06",
      xuplus: "\u2A04",
      xutri: "\u25B3",
      xvee: "\u22C1",
      xwedge: "\u22C0",
      Yacute: "\xDD",
      yacute: "\xFD",
      YAcy: "\u042F",
      yacy: "\u044F",
      Ycirc: "\u0176",
      ycirc: "\u0177",
      Ycy: "\u042B",
      ycy: "\u044B",
      yen: "\xA5",
      Yfr: "\u{1D51C}",
      yfr: "\u{1D536}",
      YIcy: "\u0407",
      yicy: "\u0457",
      Yopf: "\u{1D550}",
      yopf: "\u{1D56A}",
      Yscr: "\u{1D4B4}",
      yscr: "\u{1D4CE}",
      YUcy: "\u042E",
      yucy: "\u044E",
      Yuml: "\u0178",
      yuml: "\xFF",
      Zacute: "\u0179",
      zacute: "\u017A",
      Zcaron: "\u017D",
      zcaron: "\u017E",
      Zcy: "\u0417",
      zcy: "\u0437",
      Zdot: "\u017B",
      zdot: "\u017C",
      zeetrf: "\u2128",
      ZeroWidthSpace: "\u200B",
      Zeta: "\u0396",
      zeta: "\u03B6",
      Zfr: "\u2128",
      zfr: "\u{1D537}",
      ZHcy: "\u0416",
      zhcy: "\u0436",
      zigrarr: "\u21DD",
      Zopf: "\u2124",
      zopf: "\u{1D56B}",
      Zscr: "\u{1D4B5}",
      zscr: "\u{1D4CF}",
      zwj: "\u200D",
      zwnj: "\u200C"
    });
    exports.entityMap = exports.HTML_ENTITIES;
  }
});

// node_modules/@xmldom/xmldom/lib/sax.js
var require_sax = __commonJS({
  "node_modules/@xmldom/xmldom/lib/sax.js"(exports) {
    "use strict";
    var conventions = require_conventions();
    var g = require_grammar();
    var errors = require_errors();
    var isHTMLEscapableRawTextElement = conventions.isHTMLEscapableRawTextElement;
    var isHTMLMimeType = conventions.isHTMLMimeType;
    var isHTMLRawTextElement = conventions.isHTMLRawTextElement;
    var hasOwn = conventions.hasOwn;
    var NAMESPACE = conventions.NAMESPACE;
    var ParseError = errors.ParseError;
    var DOMException = errors.DOMException;
    var S_TAG = 0;
    var S_ATTR = 1;
    var S_ATTR_SPACE = 2;
    var S_EQ = 3;
    var S_ATTR_NOQUOT_VALUE = 4;
    var S_ATTR_END = 5;
    var S_TAG_SPACE = 6;
    var S_TAG_CLOSE = 7;
    function XMLReader() {
    }
    XMLReader.prototype = {
      parse: function(source, defaultNSMap, entityMap) {
        var domBuilder = this.domBuilder;
        domBuilder.startDocument();
        _copy(defaultNSMap, defaultNSMap = /* @__PURE__ */ Object.create(null));
        parse(source, defaultNSMap, entityMap, domBuilder, this.errorHandler);
        domBuilder.endDocument();
      }
    };
    var ENTITY_REG = /&#?\w+;?/g;
    function parse(source, defaultNSMapCopy, entityMap, domBuilder, errorHandler) {
      var isHTML = isHTMLMimeType(domBuilder.mimeType);
      if (source.indexOf(g.UNICODE_REPLACEMENT_CHARACTER) >= 0) {
        errorHandler.warning("Unicode replacement character detected, source encoding issues?");
      }
      function fixedFromCharCode(code) {
        if (code > 65535) {
          code -= 65536;
          var surrogate1 = 55296 + (code >> 10), surrogate2 = 56320 + (code & 1023);
          return String.fromCharCode(surrogate1, surrogate2);
        } else {
          return String.fromCharCode(code);
        }
      }
      function entityReplacer(a2) {
        var complete = a2[a2.length - 1] === ";" ? a2 : a2 + ";";
        if (!isHTML && complete !== a2) {
          errorHandler.error("EntityRef: expecting ;");
          return a2;
        }
        var match = g.Reference.exec(complete);
        if (!match || match[0].length !== complete.length) {
          errorHandler.error("entity not matching Reference production: " + a2);
          return a2;
        }
        var k = complete.slice(1, -1);
        if (hasOwn(entityMap, k)) {
          return entityMap[k];
        } else if (k.charAt(0) === "#") {
          return fixedFromCharCode(parseInt(k.substr(1).replace("x", "0x")));
        } else {
          errorHandler.error("entity not found:" + a2);
          return a2;
        }
      }
      function appendText(end2) {
        if (end2 > start) {
          var xt = source.substring(start, end2).replace(ENTITY_REG, entityReplacer);
          locator && position(start);
          domBuilder.characters(xt, 0, end2 - start);
          start = end2;
        }
      }
      function position(p, m) {
        while (p >= lineEnd && (m = linePattern.exec(source))) {
          lineStart = m.index;
          lineEnd = lineStart + m[0].length;
          locator.lineNumber++;
        }
        locator.columnNumber = p - lineStart + 1;
      }
      var lineStart = 0;
      var lineEnd = 0;
      var linePattern = /.*(?:\r\n?|\n)|.*$/g;
      var locator = domBuilder.locator;
      var parseStack = [{ currentNSMap: defaultNSMapCopy }];
      var unclosedTags = [];
      var start = 0;
      while (true) {
        try {
          var tagStart = source.indexOf("<", start);
          if (tagStart < 0) {
            if (!isHTML && unclosedTags.length > 0) {
              return errorHandler.fatalError("unclosed xml tag(s): " + unclosedTags.join(", "));
            }
            if (!source.substring(start).match(/^\s*$/)) {
              var doc = domBuilder.doc;
              var text = doc.createTextNode(source.substr(start));
              if (doc.documentElement) {
                return errorHandler.error("Extra content at the end of the document");
              }
              doc.appendChild(text);
              domBuilder.currentElement = text;
            }
            return;
          }
          if (tagStart > start) {
            var fromSource = source.substring(start, tagStart);
            if (!isHTML && unclosedTags.length === 0) {
              fromSource = fromSource.replace(new RegExp(g.S_OPT.source, "g"), "");
              fromSource && errorHandler.error("Unexpected content outside root element: '" + fromSource + "'");
            }
            appendText(tagStart);
          }
          switch (source.charAt(tagStart + 1)) {
            case "/":
              var end = source.indexOf(">", tagStart + 2);
              var tagNameRaw = source.substring(tagStart + 2, end > 0 ? end : void 0);
              if (!tagNameRaw) {
                return errorHandler.fatalError("end tag name missing");
              }
              var tagNameMatch = end > 0 && g.reg("^", g.QName_group, g.S_OPT, "$").exec(tagNameRaw);
              if (!tagNameMatch) {
                return errorHandler.fatalError('end tag name contains invalid characters: "' + tagNameRaw + '"');
              }
              if (!domBuilder.currentElement && !domBuilder.doc.documentElement) {
                return;
              }
              var currentTagName = unclosedTags[unclosedTags.length - 1] || domBuilder.currentElement.tagName || domBuilder.doc.documentElement.tagName || "";
              if (currentTagName !== tagNameMatch[1]) {
                var tagNameLower = tagNameMatch[1].toLowerCase();
                if (!isHTML || currentTagName.toLowerCase() !== tagNameLower) {
                  return errorHandler.fatalError('Opening and ending tag mismatch: "' + currentTagName + '" != "' + tagNameRaw + '"');
                }
              }
              var config = parseStack.pop();
              unclosedTags.pop();
              var localNSMap = config.localNSMap;
              domBuilder.endElement(config.uri, config.localName, currentTagName);
              if (localNSMap) {
                for (var prefix in localNSMap) {
                  if (hasOwn(localNSMap, prefix)) {
                    domBuilder.endPrefixMapping(prefix);
                  }
                }
              }
              end++;
              break;
            // end element
            case "?":
              locator && position(tagStart);
              end = parseProcessingInstruction(source, tagStart, domBuilder, errorHandler);
              break;
            case "!":
              locator && position(tagStart);
              end = parseDoctypeCommentOrCData(source, tagStart, domBuilder, errorHandler, isHTML);
              break;
            default:
              locator && position(tagStart);
              var el = new ElementAttributes();
              var currentNSMap = parseStack[parseStack.length - 1].currentNSMap;
              var end = parseElementStartPart(source, tagStart, el, currentNSMap, entityReplacer, errorHandler, isHTML);
              var len = el.length;
              if (!el.closed) {
                if (isHTML && conventions.isHTMLVoidElement(el.tagName)) {
                  el.closed = true;
                } else {
                  unclosedTags.push(el.tagName);
                }
              }
              if (locator && len) {
                var locator2 = copyLocator(locator, {});
                for (var i = 0; i < len; i++) {
                  var a = el[i];
                  position(a.offset);
                  a.locator = copyLocator(locator, {});
                }
                domBuilder.locator = locator2;
                if (appendElement(el, domBuilder, currentNSMap)) {
                  parseStack.push(el);
                }
                domBuilder.locator = locator;
              } else {
                if (appendElement(el, domBuilder, currentNSMap)) {
                  parseStack.push(el);
                }
              }
              if (isHTML && !el.closed) {
                end = parseHtmlSpecialContent(source, end, el.tagName, entityReplacer, domBuilder);
              } else {
                end++;
              }
          }
        } catch (e) {
          if (e instanceof ParseError) {
            throw e;
          } else if (e instanceof DOMException) {
            throw new ParseError(e.name + ": " + e.message, domBuilder.locator, e);
          }
          errorHandler.error("element parse error: " + e);
          end = -1;
        }
        if (end > start) {
          start = end;
        } else {
          appendText(Math.max(tagStart, start) + 1);
        }
      }
    }
    function copyLocator(f, t) {
      t.lineNumber = f.lineNumber;
      t.columnNumber = f.columnNumber;
      return t;
    }
    function parseElementStartPart(source, start, el, currentNSMap, entityReplacer, errorHandler, isHTML) {
      function addAttribute(qname, value2, startIndex) {
        if (hasOwn(el.attributeNames, qname)) {
          return errorHandler.fatalError("Attribute " + qname + " redefined");
        }
        if (!isHTML && value2.indexOf("<") >= 0) {
          return errorHandler.fatalError("Unescaped '<' not allowed in attributes values");
        }
        el.addValue(
          qname,
          // @see https://www.w3.org/TR/xml/#AVNormalize
          // since the xmldom sax parser does not "interpret" DTD the following is not implemented:
          // - recursive replacement of (DTD) entity references
          // - trimming and collapsing multiple spaces into a single one for attributes that are not of type CDATA
          value2.replace(/[\t\n\r]/g, " ").replace(ENTITY_REG, entityReplacer),
          startIndex
        );
      }
      var attrName;
      var value;
      var p = ++start;
      var s = S_TAG;
      while (true) {
        var c = source.charAt(p);
        switch (c) {
          case "=":
            if (s === S_ATTR) {
              attrName = source.slice(start, p);
              s = S_EQ;
            } else if (s === S_ATTR_SPACE) {
              s = S_EQ;
            } else {
              throw new Error("attribute equal must after attrName");
            }
            break;
          case "'":
          case '"':
            if (s === S_EQ || s === S_ATTR) {
              if (s === S_ATTR) {
                errorHandler.warning('attribute value must after "="');
                attrName = source.slice(start, p);
              }
              start = p + 1;
              p = source.indexOf(c, start);
              if (p > 0) {
                value = source.slice(start, p);
                addAttribute(attrName, value, start - 1);
                s = S_ATTR_END;
              } else {
                throw new Error("attribute value no end '" + c + "' match");
              }
            } else if (s == S_ATTR_NOQUOT_VALUE) {
              value = source.slice(start, p);
              addAttribute(attrName, value, start);
              errorHandler.warning('attribute "' + attrName + '" missed start quot(' + c + ")!!");
              start = p + 1;
              s = S_ATTR_END;
            } else {
              throw new Error('attribute value must after "="');
            }
            break;
          case "/":
            switch (s) {
              case S_TAG:
                el.setTagName(source.slice(start, p));
              case S_ATTR_END:
              case S_TAG_SPACE:
              case S_TAG_CLOSE:
                s = S_TAG_CLOSE;
                el.closed = true;
              case S_ATTR_NOQUOT_VALUE:
              case S_ATTR:
                break;
              case S_ATTR_SPACE:
                el.closed = true;
                break;
              //case S_EQ:
              default:
                throw new Error("attribute invalid close char('/')");
            }
            break;
          case "":
            errorHandler.error("unexpected end of input");
            if (s == S_TAG) {
              el.setTagName(source.slice(start, p));
            }
            return p;
          case ">":
            switch (s) {
              case S_TAG:
                el.setTagName(source.slice(start, p));
              case S_ATTR_END:
              case S_TAG_SPACE:
              case S_TAG_CLOSE:
                break;
              //normal
              case S_ATTR_NOQUOT_VALUE:
              //Compatible state
              case S_ATTR:
                value = source.slice(start, p);
                if (value.slice(-1) === "/") {
                  el.closed = true;
                  value = value.slice(0, -1);
                }
              case S_ATTR_SPACE:
                if (s === S_ATTR_SPACE) {
                  value = attrName;
                }
                if (s == S_ATTR_NOQUOT_VALUE) {
                  errorHandler.warning('attribute "' + value + '" missed quot(")!');
                  addAttribute(attrName, value, start);
                } else {
                  if (!isHTML) {
                    errorHandler.warning('attribute "' + value + '" missed value!! "' + value + '" instead!!');
                  }
                  addAttribute(value, value, start);
                }
                break;
              case S_EQ:
                if (!isHTML) {
                  return errorHandler.fatalError(`AttValue: ' or " expected`);
                }
            }
            return p;
          /*xml space '\x20' | #x9 | #xD | #xA; */
          case "\x80":
            c = " ";
          default:
            if (c <= " ") {
              switch (s) {
                case S_TAG:
                  el.setTagName(source.slice(start, p));
                  s = S_TAG_SPACE;
                  break;
                case S_ATTR:
                  attrName = source.slice(start, p);
                  s = S_ATTR_SPACE;
                  break;
                case S_ATTR_NOQUOT_VALUE:
                  var value = source.slice(start, p);
                  errorHandler.warning('attribute "' + value + '" missed quot(")!!');
                  addAttribute(attrName, value, start);
                case S_ATTR_END:
                  s = S_TAG_SPACE;
                  break;
              }
            } else {
              switch (s) {
                //case S_TAG:void();break;
                //case S_ATTR:void();break;
                //case S_ATTR_NOQUOT_VALUE:void();break;
                case S_ATTR_SPACE:
                  if (!isHTML) {
                    errorHandler.warning('attribute "' + attrName + '" missed value!! "' + attrName + '" instead2!!');
                  }
                  addAttribute(attrName, attrName, start);
                  start = p;
                  s = S_ATTR;
                  break;
                case S_ATTR_END:
                  errorHandler.warning('attribute space is required"' + attrName + '"!!');
                case S_TAG_SPACE:
                  s = S_ATTR;
                  start = p;
                  break;
                case S_EQ:
                  s = S_ATTR_NOQUOT_VALUE;
                  start = p;
                  break;
                case S_TAG_CLOSE:
                  throw new Error("elements closed character '/' and '>' must be connected to");
              }
            }
        }
        p++;
      }
    }
    function appendElement(el, domBuilder, currentNSMap) {
      var tagName = el.tagName;
      var localNSMap = null;
      var i = el.length;
      while (i--) {
        var a = el[i];
        var qName = a.qName;
        var value = a.value;
        var nsp = qName.indexOf(":");
        if (nsp > 0) {
          var prefix = a.prefix = qName.slice(0, nsp);
          var localName = qName.slice(nsp + 1);
          var nsPrefix = prefix === "xmlns" && localName;
        } else {
          localName = qName;
          prefix = null;
          nsPrefix = qName === "xmlns" && "";
        }
        a.localName = localName;
        if (nsPrefix !== false) {
          if (localNSMap == null) {
            localNSMap = /* @__PURE__ */ Object.create(null);
            _copy(currentNSMap, currentNSMap = /* @__PURE__ */ Object.create(null));
          }
          currentNSMap[nsPrefix] = localNSMap[nsPrefix] = value;
          a.uri = NAMESPACE.XMLNS;
          domBuilder.startPrefixMapping(nsPrefix, value);
        }
      }
      var i = el.length;
      while (i--) {
        a = el[i];
        if (a.prefix) {
          if (a.prefix === "xml") {
            a.uri = NAMESPACE.XML;
          }
          if (a.prefix !== "xmlns") {
            a.uri = currentNSMap[a.prefix];
          }
        }
      }
      var nsp = tagName.indexOf(":");
      if (nsp > 0) {
        prefix = el.prefix = tagName.slice(0, nsp);
        localName = el.localName = tagName.slice(nsp + 1);
      } else {
        prefix = null;
        localName = el.localName = tagName;
      }
      var ns = el.uri = currentNSMap[prefix || ""];
      domBuilder.startElement(ns, localName, tagName, el);
      if (el.closed) {
        domBuilder.endElement(ns, localName, tagName);
        if (localNSMap) {
          for (prefix in localNSMap) {
            if (hasOwn(localNSMap, prefix)) {
              domBuilder.endPrefixMapping(prefix);
            }
          }
        }
      } else {
        el.currentNSMap = currentNSMap;
        el.localNSMap = localNSMap;
        return true;
      }
    }
    function parseHtmlSpecialContent(source, elStartEnd, tagName, entityReplacer, domBuilder) {
      var isEscapableRaw = isHTMLEscapableRawTextElement(tagName);
      if (isEscapableRaw || isHTMLRawTextElement(tagName)) {
        var elEndStart = source.indexOf("</" + tagName + ">", elStartEnd);
        var text = source.substring(elStartEnd + 1, elEndStart);
        if (isEscapableRaw) {
          text = text.replace(ENTITY_REG, entityReplacer);
        }
        domBuilder.characters(text, 0, text.length);
        return elEndStart;
      }
      return elStartEnd + 1;
    }
    function _copy(source, target) {
      for (var n in source) {
        if (hasOwn(source, n)) {
          target[n] = source[n];
        }
      }
    }
    function parseUtils(source, start) {
      var index = start;
      function char(n) {
        n = n || 0;
        return source.charAt(index + n);
      }
      function skip(n) {
        n = n || 1;
        index += n;
      }
      function skipBlanks() {
        var blanks = 0;
        while (index < source.length) {
          var c = char();
          if (c !== " " && c !== "\n" && c !== "	" && c !== "\r") {
            return blanks;
          }
          blanks++;
          skip();
        }
        return -1;
      }
      function substringFromIndex() {
        return source.substring(index);
      }
      function substringStartsWith(text) {
        return source.substring(index, index + text.length) === text;
      }
      function substringStartsWithCaseInsensitive(text) {
        return source.substring(index, index + text.length).toUpperCase() === text.toUpperCase();
      }
      function getMatch(args) {
        var expr = g.reg("^", args);
        var match = expr.exec(substringFromIndex());
        if (match) {
          skip(match[0].length);
          return match[0];
        }
        return null;
      }
      return {
        char,
        getIndex: function() {
          return index;
        },
        getMatch,
        getSource: function() {
          return source;
        },
        skip,
        skipBlanks,
        substringFromIndex,
        substringStartsWith,
        substringStartsWithCaseInsensitive
      };
    }
    function parseDoctypeInternalSubset(p, errorHandler) {
      function parsePI(p2, errorHandler2) {
        var match = g.PI.exec(p2.substringFromIndex());
        if (!match) {
          return errorHandler2.fatalError("processing instruction is not well-formed at position " + p2.getIndex());
        }
        if (match[1].toLowerCase() === "xml") {
          return errorHandler2.fatalError(
            "xml declaration is only allowed at the start of the document, but found at position " + p2.getIndex()
          );
        }
        p2.skip(match[0].length);
        return match[0];
      }
      var source = p.getSource();
      if (p.char() === "[") {
        p.skip(1);
        var intSubsetStart = p.getIndex();
        while (p.getIndex() < source.length) {
          p.skipBlanks();
          if (p.char() === "]") {
            var internalSubset = source.substring(intSubsetStart, p.getIndex());
            p.skip(1);
            return internalSubset;
          }
          var current = null;
          if (p.char() === "<" && p.char(1) === "!") {
            switch (p.char(2)) {
              case "E":
                if (p.char(3) === "L") {
                  current = p.getMatch(g.elementdecl);
                } else if (p.char(3) === "N") {
                  current = p.getMatch(g.EntityDecl);
                }
                break;
              case "A":
                current = p.getMatch(g.AttlistDecl);
                break;
              case "N":
                current = p.getMatch(g.NotationDecl);
                break;
              case "-":
                current = p.getMatch(g.Comment);
                break;
            }
          } else if (p.char() === "<" && p.char(1) === "?") {
            current = parsePI(p, errorHandler);
          } else if (p.char() === "%") {
            current = p.getMatch(g.PEReference);
          } else {
            return errorHandler.fatalError("Error detected in Markup declaration");
          }
          if (!current) {
            return errorHandler.fatalError("Error in internal subset at position " + p.getIndex());
          }
        }
        return errorHandler.fatalError("doctype internal subset is not well-formed, missing ]");
      }
    }
    function parseDoctypeCommentOrCData(source, start, domBuilder, errorHandler, isHTML) {
      var p = parseUtils(source, start);
      switch (isHTML ? p.char(2).toUpperCase() : p.char(2)) {
        case "-":
          var comment = p.getMatch(g.Comment);
          if (comment) {
            domBuilder.comment(comment, g.COMMENT_START.length, comment.length - g.COMMENT_START.length - g.COMMENT_END.length);
            return p.getIndex();
          } else {
            return errorHandler.fatalError("comment is not well-formed at position " + p.getIndex());
          }
        case "[":
          var cdata = p.getMatch(g.CDSect);
          if (cdata) {
            if (!isHTML && !domBuilder.currentElement) {
              return errorHandler.fatalError("CDATA outside of element");
            }
            domBuilder.startCDATA();
            domBuilder.characters(cdata, g.CDATA_START.length, cdata.length - g.CDATA_START.length - g.CDATA_END.length);
            domBuilder.endCDATA();
            return p.getIndex();
          } else {
            return errorHandler.fatalError("Invalid CDATA starting at position " + start);
          }
        case "D": {
          if (domBuilder.doc && domBuilder.doc.documentElement) {
            return errorHandler.fatalError("Doctype not allowed inside or after documentElement at position " + p.getIndex());
          }
          if (isHTML ? !p.substringStartsWithCaseInsensitive(g.DOCTYPE_DECL_START) : !p.substringStartsWith(g.DOCTYPE_DECL_START)) {
            return errorHandler.fatalError("Expected " + g.DOCTYPE_DECL_START + " at position " + p.getIndex());
          }
          p.skip(g.DOCTYPE_DECL_START.length);
          if (p.skipBlanks() < 1) {
            return errorHandler.fatalError("Expected whitespace after " + g.DOCTYPE_DECL_START + " at position " + p.getIndex());
          }
          var doctype = {
            name: void 0,
            publicId: void 0,
            systemId: void 0,
            internalSubset: void 0
          };
          doctype.name = p.getMatch(g.Name);
          if (!doctype.name)
            return errorHandler.fatalError("doctype name missing or contains unexpected characters at position " + p.getIndex());
          if (isHTML && doctype.name.toLowerCase() !== "html") {
            errorHandler.warning("Unexpected DOCTYPE in HTML document at position " + p.getIndex());
          }
          p.skipBlanks();
          if (p.substringStartsWith(g.PUBLIC) || p.substringStartsWith(g.SYSTEM)) {
            var match = g.ExternalID_match.exec(p.substringFromIndex());
            if (!match) {
              return errorHandler.fatalError("doctype external id is not well-formed at position " + p.getIndex());
            }
            if (match.groups.SystemLiteralOnly !== void 0) {
              doctype.systemId = match.groups.SystemLiteralOnly;
            } else {
              doctype.systemId = match.groups.SystemLiteral;
              doctype.publicId = match.groups.PubidLiteral;
            }
            p.skip(match[0].length);
          } else if (isHTML && p.substringStartsWithCaseInsensitive(g.SYSTEM)) {
            p.skip(g.SYSTEM.length);
            if (p.skipBlanks() < 1) {
              return errorHandler.fatalError("Expected whitespace after " + g.SYSTEM + " at position " + p.getIndex());
            }
            doctype.systemId = p.getMatch(g.ABOUT_LEGACY_COMPAT_SystemLiteral);
            if (!doctype.systemId) {
              return errorHandler.fatalError(
                "Expected " + g.ABOUT_LEGACY_COMPAT + " in single or double quotes after " + g.SYSTEM + " at position " + p.getIndex()
              );
            }
          }
          if (isHTML && doctype.systemId && !g.ABOUT_LEGACY_COMPAT_SystemLiteral.test(doctype.systemId)) {
            errorHandler.warning("Unexpected doctype.systemId in HTML document at position " + p.getIndex());
          }
          if (!isHTML) {
            p.skipBlanks();
            doctype.internalSubset = parseDoctypeInternalSubset(p, errorHandler);
          }
          p.skipBlanks();
          if (p.char() !== ">") {
            return errorHandler.fatalError("doctype not terminated with > at position " + p.getIndex());
          }
          p.skip(1);
          domBuilder.startDTD(doctype.name, doctype.publicId, doctype.systemId, doctype.internalSubset);
          domBuilder.endDTD();
          return p.getIndex();
        }
        default:
          return errorHandler.fatalError('Not well-formed XML starting with "<!" at position ' + start);
      }
    }
    function parseProcessingInstruction(source, start, domBuilder, errorHandler) {
      var match = source.substring(start).match(g.PI);
      if (!match) {
        return errorHandler.fatalError("Invalid processing instruction starting at position " + start);
      }
      if (match[1].toLowerCase() === "xml") {
        if (start > 0) {
          return errorHandler.fatalError(
            "processing instruction at position " + start + " is an xml declaration which is only at the start of the document"
          );
        }
        if (!g.XMLDecl.test(source.substring(start))) {
          return errorHandler.fatalError("xml declaration is not well-formed");
        }
      }
      domBuilder.processingInstruction(match[1], match[2]);
      return start + match[0].length;
    }
    function ElementAttributes() {
      this.attributeNames = /* @__PURE__ */ Object.create(null);
    }
    ElementAttributes.prototype = {
      setTagName: function(tagName) {
        if (!g.QName_exact.test(tagName)) {
          throw new Error("invalid tagName:" + tagName);
        }
        this.tagName = tagName;
      },
      addValue: function(qName, value, offset) {
        if (!g.QName_exact.test(qName)) {
          throw new Error("invalid attribute:" + qName);
        }
        this.attributeNames[qName] = this.length;
        this[this.length++] = { qName, value, offset };
      },
      length: 0,
      getLocalName: function(i) {
        return this[i].localName;
      },
      getLocator: function(i) {
        return this[i].locator;
      },
      getQName: function(i) {
        return this[i].qName;
      },
      getURI: function(i) {
        return this[i].uri;
      },
      getValue: function(i) {
        return this[i].value;
      }
      //	,getIndex:function(uri, localName)){
      //		if(localName){
      //
      //		}else{
      //			var qName = uri
      //		}
      //	},
      //	getValue:function(){return this.getValue(this.getIndex.apply(this,arguments))},
      //	getType:function(uri,localName){}
      //	getType:function(i){},
    };
    exports.XMLReader = XMLReader;
    exports.parseUtils = parseUtils;
    exports.parseDoctypeCommentOrCData = parseDoctypeCommentOrCData;
  }
});

// node_modules/@xmldom/xmldom/lib/dom-parser.js
var require_dom_parser = __commonJS({
  "node_modules/@xmldom/xmldom/lib/dom-parser.js"(exports) {
    "use strict";
    var conventions = require_conventions();
    var dom = require_dom();
    var errors = require_errors();
    var entities = require_entities();
    var sax = require_sax();
    var DOMImplementation2 = dom.DOMImplementation;
    var hasDefaultHTMLNamespace = conventions.hasDefaultHTMLNamespace;
    var isHTMLMimeType = conventions.isHTMLMimeType;
    var isValidMimeType = conventions.isValidMimeType;
    var MIME_TYPE = conventions.MIME_TYPE;
    var NAMESPACE = conventions.NAMESPACE;
    var ParseError = errors.ParseError;
    var XMLReader = sax.XMLReader;
    function normalizeLineEndings(input) {
      return input.replace(/\r[\n\u0085]/g, "\n").replace(/[\r\u0085\u2028]/g, "\n");
    }
    function DOMParser2(options) {
      options = options || {};
      if (options.locator === void 0) {
        options.locator = true;
      }
      this.assign = options.assign || conventions.assign;
      this.domHandler = options.domHandler || DOMHandler;
      this.onError = options.onError || options.errorHandler;
      if (options.errorHandler && typeof options.errorHandler !== "function") {
        throw new TypeError("errorHandler object is no longer supported, switch to onError!");
      } else if (options.errorHandler) {
        options.errorHandler("warning", "The `errorHandler` option has been deprecated, use `onError` instead!", this);
      }
      this.normalizeLineEndings = options.normalizeLineEndings || normalizeLineEndings;
      this.locator = !!options.locator;
      this.xmlns = this.assign(/* @__PURE__ */ Object.create(null), options.xmlns);
    }
    DOMParser2.prototype.parseFromString = function(source, mimeType) {
      if (!isValidMimeType(mimeType)) {
        throw new TypeError('DOMParser.parseFromString: the provided mimeType "' + mimeType + '" is not valid.');
      }
      var defaultNSMap = this.assign(/* @__PURE__ */ Object.create(null), this.xmlns);
      var entityMap = entities.XML_ENTITIES;
      var defaultNamespace = defaultNSMap[""] || null;
      if (hasDefaultHTMLNamespace(mimeType)) {
        entityMap = entities.HTML_ENTITIES;
        defaultNamespace = NAMESPACE.HTML;
      } else if (mimeType === MIME_TYPE.XML_SVG_IMAGE) {
        defaultNamespace = NAMESPACE.SVG;
      }
      defaultNSMap[""] = defaultNamespace;
      defaultNSMap.xml = defaultNSMap.xml || NAMESPACE.XML;
      var domBuilder = new this.domHandler({
        mimeType,
        defaultNamespace,
        onError: this.onError
      });
      var locator = this.locator ? {} : void 0;
      if (this.locator) {
        domBuilder.setDocumentLocator(locator);
      }
      var sax2 = new XMLReader();
      sax2.errorHandler = domBuilder;
      sax2.domBuilder = domBuilder;
      var isXml = !conventions.isHTMLMimeType(mimeType);
      if (isXml && typeof source !== "string") {
        sax2.errorHandler.fatalError("source is not a string");
      }
      sax2.parse(this.normalizeLineEndings(String(source)), defaultNSMap, entityMap);
      if (!domBuilder.doc.documentElement) {
        sax2.errorHandler.fatalError("missing root element");
      }
      return domBuilder.doc;
    };
    function DOMHandler(options) {
      var opt = options || {};
      this.mimeType = opt.mimeType || MIME_TYPE.XML_APPLICATION;
      this.defaultNamespace = opt.defaultNamespace || null;
      this.cdata = false;
      this.currentElement = void 0;
      this.doc = void 0;
      this.locator = void 0;
      this.onError = opt.onError;
    }
    function position(locator, node) {
      node.lineNumber = locator.lineNumber;
      node.columnNumber = locator.columnNumber;
    }
    DOMHandler.prototype = {
      /**
       * Either creates an XML or an HTML document and stores it under `this.doc`.
       * If it is an XML document, `this.defaultNamespace` is used to create it,
       * and it will not contain any `childNodes`.
       * If it is an HTML document, it will be created without any `childNodes`.
       *
       * @see http://www.saxproject.org/apidoc/org/xml/sax/ContentHandler.html
       */
      startDocument: function() {
        var impl = new DOMImplementation2();
        this.doc = isHTMLMimeType(this.mimeType) ? impl.createHTMLDocument(false) : impl.createDocument(this.defaultNamespace, "");
      },
      startElement: function(namespaceURI, localName, qName, attrs) {
        var doc = this.doc;
        var el = doc.createElementNS(namespaceURI, qName || localName);
        var len = attrs.length;
        appendElement(this, el);
        this.currentElement = el;
        this.locator && position(this.locator, el);
        for (var i = 0; i < len; i++) {
          var namespaceURI = attrs.getURI(i);
          var value = attrs.getValue(i);
          var qName = attrs.getQName(i);
          var attr = doc.createAttributeNS(namespaceURI, qName);
          this.locator && position(attrs.getLocator(i), attr);
          attr.value = attr.nodeValue = value;
          el.setAttributeNode(attr);
        }
      },
      endElement: function(namespaceURI, localName, qName) {
        this.currentElement = this.currentElement.parentNode;
      },
      startPrefixMapping: function(prefix, uri) {
      },
      endPrefixMapping: function(prefix) {
      },
      processingInstruction: function(target, data) {
        var ins = this.doc.createProcessingInstruction(target, data);
        this.locator && position(this.locator, ins);
        appendElement(this, ins);
      },
      ignorableWhitespace: function(ch, start, length) {
      },
      characters: function(chars, start, length) {
        chars = _toString.apply(this, arguments);
        if (chars) {
          if (this.cdata) {
            var charNode = this.doc.createCDATASection(chars);
          } else {
            var charNode = this.doc.createTextNode(chars);
          }
          if (this.currentElement) {
            this.currentElement.appendChild(charNode);
          } else if (/^\s*$/.test(chars)) {
            this.doc.appendChild(charNode);
          }
          this.locator && position(this.locator, charNode);
        }
      },
      skippedEntity: function(name) {
      },
      endDocument: function() {
        this.doc.normalize();
      },
      /**
       * Stores the locator to be able to set the `columnNumber` and `lineNumber`
       * on the created DOM nodes.
       *
       * @param {Locator} locator
       */
      setDocumentLocator: function(locator) {
        if (locator) {
          locator.lineNumber = 0;
        }
        this.locator = locator;
      },
      //LexicalHandler
      comment: function(chars, start, length) {
        chars = _toString.apply(this, arguments);
        var comm = this.doc.createComment(chars);
        this.locator && position(this.locator, comm);
        appendElement(this, comm);
      },
      startCDATA: function() {
        this.cdata = true;
      },
      endCDATA: function() {
        this.cdata = false;
      },
      startDTD: function(name, publicId, systemId, internalSubset) {
        var impl = this.doc.implementation;
        if (impl && impl.createDocumentType) {
          var dt = impl.createDocumentType(name, publicId, systemId, internalSubset);
          this.locator && position(this.locator, dt);
          appendElement(this, dt);
          this.doc.doctype = dt;
        }
      },
      reportError: function(level, message) {
        if (typeof this.onError === "function") {
          try {
            this.onError(level, message, this);
          } catch (e) {
            throw new ParseError("Reporting " + level + ' "' + message + '" caused ' + e, this.locator);
          }
        } else {
          console.error("[xmldom " + level + "]	" + message, _locator(this.locator));
        }
      },
      /**
       * @see http://www.saxproject.org/apidoc/org/xml/sax/ErrorHandler.html
       */
      warning: function(message) {
        this.reportError("warning", message);
      },
      error: function(message) {
        this.reportError("error", message);
      },
      /**
       * This function reports a fatal error and throws a ParseError.
       *
       * @param {string} message
       * - The message to be used for reporting and throwing the error.
       * @returns {never}
       * This function always throws an error and never returns a value.
       * @throws {ParseError}
       * Always throws a ParseError with the provided message.
       */
      fatalError: function(message) {
        this.reportError("fatalError", message);
        throw new ParseError(message, this.locator);
      }
    };
    function _locator(l) {
      if (l) {
        return "\n@#[line:" + l.lineNumber + ",col:" + l.columnNumber + "]";
      }
    }
    function _toString(chars, start, length) {
      if (typeof chars == "string") {
        return chars.substr(start, length);
      } else {
        if (chars.length >= start + length || start) {
          return new java.lang.String(chars, start, length) + "";
        }
        return chars;
      }
    }
    "endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(
      /\w+/g,
      function(key) {
        DOMHandler.prototype[key] = function() {
          return null;
        };
      }
    );
    function appendElement(handler, node) {
      if (!handler.currentElement) {
        handler.doc.appendChild(node);
      } else {
        handler.currentElement.appendChild(node);
      }
    }
    function onErrorStopParsing(level) {
      if (level === "error") throw "onErrorStopParsing";
    }
    function onWarningStopParsing() {
      throw "onWarningStopParsing";
    }
    exports.__DOMHandler = DOMHandler;
    exports.DOMParser = DOMParser2;
    exports.normalizeLineEndings = normalizeLineEndings;
    exports.onErrorStopParsing = onErrorStopParsing;
    exports.onWarningStopParsing = onWarningStopParsing;
  }
});

// node_modules/@xmldom/xmldom/lib/index.js
var require_lib = __commonJS({
  "node_modules/@xmldom/xmldom/lib/index.js"(exports) {
    "use strict";
    var conventions = require_conventions();
    exports.assign = conventions.assign;
    exports.hasDefaultHTMLNamespace = conventions.hasDefaultHTMLNamespace;
    exports.isHTMLMimeType = conventions.isHTMLMimeType;
    exports.isValidMimeType = conventions.isValidMimeType;
    exports.MIME_TYPE = conventions.MIME_TYPE;
    exports.NAMESPACE = conventions.NAMESPACE;
    var errors = require_errors();
    exports.DOMException = errors.DOMException;
    exports.DOMExceptionName = errors.DOMExceptionName;
    exports.ExceptionCode = errors.ExceptionCode;
    exports.ParseError = errors.ParseError;
    var dom = require_dom();
    exports.Attr = dom.Attr;
    exports.CDATASection = dom.CDATASection;
    exports.CharacterData = dom.CharacterData;
    exports.Comment = dom.Comment;
    exports.Document = dom.Document;
    exports.DocumentFragment = dom.DocumentFragment;
    exports.DocumentType = dom.DocumentType;
    exports.DOMImplementation = dom.DOMImplementation;
    exports.Element = dom.Element;
    exports.Entity = dom.Entity;
    exports.EntityReference = dom.EntityReference;
    exports.LiveNodeList = dom.LiveNodeList;
    exports.NamedNodeMap = dom.NamedNodeMap;
    exports.Node = dom.Node;
    exports.NodeList = dom.NodeList;
    exports.Notation = dom.Notation;
    exports.ProcessingInstruction = dom.ProcessingInstruction;
    exports.Text = dom.Text;
    exports.XMLSerializer = dom.XMLSerializer;
    var domParser = require_dom_parser();
    exports.DOMParser = domParser.DOMParser;
    exports.onErrorStopParsing = domParser.onErrorStopParsing;
    exports.onWarningStopParsing = domParser.onWarningStopParsing;
  }
});

// src/constants.ts
var KeePass1 = Object.freeze({
  signature1: 2594363651,
  signature2: 3041655653
});
var KeePass2 = Object.freeze({
  innerStreamSalsa20IV: Uint8Array.from([
    232,
    48,
    9,
    75,
    151,
    32,
    93,
    42
  ]),
  signature1: 2594363651,
  signature2: 3041655655,
  variantMapCriticalMask: 65280,
  variantMapVersion: 256
});

// src/dependencies.ts
import crypto2 from "crypto";

// src/crypto/createAes256CbcCipher.ts
import crypto from "crypto";

// src/enums/SymmetricCipherDirection.ts
var SymmetricCipherDirection = Object.freeze({
  Decrypt: 0,
  Encrypt: 1
});
var SymmetricCipherDirection_default = SymmetricCipherDirection;

// src/crypto/createAes256CbcCipher.ts
async function createAes256CbcCipher(direction, key, iv) {
  const cipher = direction === SymmetricCipherDirection_default.Encrypt ? crypto.createCipheriv("aes-256-cbc", key, iv).setAutoPadding(true) : crypto.createDecipheriv("aes-256-cbc", key, iv).setAutoPadding(true);
  return Promise.resolve({
    process(data) {
      return Promise.resolve(new Uint8Array(cipher.update(data)));
    },
    finish(data) {
      return Promise.resolve(
        Uint8Array.from(Buffer.concat([cipher.update(data), cipher.final()]))
      );
    }
  });
}

// src/crypto/createChaCha20Cipher.ts
var import_ts_chacha20 = __toESM(require_chacha20());
async function createChaCha20Cipher(direction, key, iv) {
  let cipher = new import_ts_chacha20.Chacha20(key, iv);
  return Promise.resolve({
    finish(data) {
      if (!cipher) {
        throw new Error("Cipher is no longer available");
      }
      const result = direction === SymmetricCipherDirection_default.Encrypt ? cipher.encrypt(data) : cipher.decrypt(data);
      cipher = void 0;
      return Promise.resolve(result);
    },
    process(data) {
      if (!cipher) {
        throw new Error("Cipher is no longer available");
      }
      const result = direction === SymmetricCipherDirection_default.Encrypt ? cipher.encrypt(data) : cipher.decrypt(data);
      return Promise.resolve(result);
    }
  });
}

// src/crypto/createTwofishCbcCipher.ts
var import_twofish_ts = __toESM(require_bin());
async function createTwofishCbcCipher(direction, key, initialIv) {
  let session = (0, import_twofish_ts.makeSession)(key);
  let buffer = new Uint8Array(0);
  const iv = initialIv;
  const blockSize = 16;
  function xorBlock(block, iv2) {
    for (let i = 0; i < block.length; i++) {
      block[i] ^= iv2[i];
    }
  }
  return Promise.resolve({
    process(data) {
      if (!session) {
        throw new Error("Cipher is no longer available");
      }
      const combinedData = new Uint8Array([...buffer, ...data]);
      const blockCount = Math.floor(combinedData.length / blockSize);
      const processedData = new Uint8Array(blockCount * blockSize);
      let previousBlock = iv;
      for (let i = 0; i < blockCount; i++) {
        const offset = i * blockSize;
        const block = combinedData.slice(offset, offset + blockSize);
        const outputBlock = new Uint8Array(blockSize);
        if (direction === SymmetricCipherDirection_default.Encrypt) {
          xorBlock(block, previousBlock);
          (0, import_twofish_ts.encrypt)(block, 0, outputBlock, 0, session);
          previousBlock = outputBlock;
        } else {
          (0, import_twofish_ts.decrypt)(block, 0, outputBlock, 0, session);
          xorBlock(outputBlock, previousBlock);
          previousBlock = block;
        }
        processedData.set(outputBlock, offset);
      }
      buffer = combinedData.slice(blockCount * blockSize);
      return Promise.resolve(processedData);
    },
    async finish(data) {
      const remainingData = new Uint8Array([...buffer, ...data]);
      let processedData;
      if (direction === SymmetricCipherDirection_default.Encrypt) {
        const paddingLength = blockSize - remainingData.length % blockSize;
        const paddedData = new Uint8Array([
          ...remainingData,
          ...new Uint8Array(paddingLength).fill(paddingLength)
        ]);
        processedData = await this.process(paddedData);
      } else {
        processedData = await this.process(remainingData);
        const paddingLength = processedData[processedData.length - 1];
        processedData = processedData.slice(0, -paddingLength);
      }
      buffer = new Uint8Array(0);
      session = void 0;
      return processedData;
    }
  });
}

// src/dependencies.ts
var dependencies = {
  cipherAes256: createAes256CbcCipher,
  cipherChaCha20: createChaCha20Cipher,
  cipherSalsa20: void 0,
  cipherTwofish: createTwofishCbcCipher,
  hash: (algorithm) => Promise.resolve(crypto2.createHash(algorithm)),
  hmac: (algorithm, key) => Promise.resolve(crypto2.createHmac(algorithm, key)),
  randomBytes: (length) => Promise.resolve(crypto2.randomBytes(length)),
  transformAes256KdfKey: void 0,
  transformArgon2KdfKey: void 0
};
function configureDependencies(overrides) {
  Object.assign(dependencies, overrides);
}
function getDependency(dependency) {
  if (dependencies[dependency] === void 0) {
    throw new Error(
      `No ${displayDependencyDescription(dependency)} handler defined to use. Configure the "${dependency}" dependency to continue.`
    );
  }
  return dependencies[dependency];
}
function displayDependencyDescription(key) {
  switch (key) {
    case "cipherAes256":
      return "AES-256 cipher";
    case "cipherChaCha20":
      return "ChaCha20 cipher";
    case "cipherSalsa20":
      return "Salsa20 cipher";
    case "cipherTwofish":
      return "Twofish cipher";
    case "hash":
      return "Hash function";
    case "hmac":
      return "HMAC function";
    case "randomBytes":
      return "Random bytes generator";
    case "transformAes256KdfKey":
      return "AES-256 KDF transformer";
    case "transformArgon2KdfKey":
      return "Argon2 KDF transformer";
  }
}

// src/enums/KdfUuid.ts
var KdfUuid = Object.freeze({
  AesKdbx3: "c9d9f39a-628a-4460-bf74-0d08c18a4fea",
  AesKdbx4: "7c02bb82-79a7-4ac0-927d-114a00648238",
  Argon2d: "ef636ddf-8c29-444b-91f7-a9a403e30a0c",
  Argon2id: "9e298b19-56db-4773-b23d-fc3ec6f0a1e6"
});
var KdfUuid_default = KdfUuid;

// src/benchmark/benchmarkKdfKey.ts
async function benchmarkKdfKey(transformer, options) {
  let totalDuration = 0;
  for (let i = 0; i < options.trials; ++i) {
    const trialStartTime = Date.now();
    await transformer(options.key, options.parameters);
    totalDuration += Date.now() - trialStartTime;
  }
  const averageDuration = totalDuration / options.trials;
  const currentValue = Number(options.parameters[options.parameterToBenchmark]);
  return Math.floor(
    currentValue * options.targetMilliseconds / averageDuration
  );
}

// src/benchmark/benchmarkAes256KdfKey.ts
async function benchmarkAes256KdfKey(targetMilliseconds) {
  const randomBytes = getDependency("randomBytes");
  const transformer = getDependency("transformAes256KdfKey");
  const key = await randomBytes(16);
  const seed = await randomBytes(32);
  const kdfParameters = {
    rounds: BigInt(1e5),
    seed,
    uuid: KdfUuid_default.AesKdbx4,
    variantMapVersion: KeePass2.variantMapVersion
  };
  return await benchmarkKdfKey(transformer, {
    key,
    parameterToBenchmark: "rounds",
    parameters: kdfParameters,
    targetMilliseconds,
    trials: 3
  });
}

// src/enums/Argon2Type.ts
var Argon2Type = Object.freeze({
  Argon2d: 0,
  // Argon2i: 1,
  Argon2id: 2
});
var Argon2Type_default = Argon2Type;

// src/enums/Argon2Version.ts
var Argon2Version = Object.freeze({
  V10: 16,
  V13: 19
});
var Argon2Version_default = Argon2Version;

// src/benchmark/benchmarkArgon2KdfKey.ts
async function benchmarkArgon2KdfKey(targetMilliseconds, memoryInBytes = BigInt(65536 * 1024), parallelism = BigInt(2), type = Argon2Type_default.Argon2d, version = Argon2Version_default.V13) {
  const randomBytes = getDependency("randomBytes");
  const transformer = getDependency("transformArgon2KdfKey");
  const key = await randomBytes(16);
  const seed = await randomBytes(16);
  const kdfParameters = {
    iterations: BigInt(10),
    memoryInBytes,
    parallelism,
    seed,
    type,
    uuid: type === Argon2Type_default.Argon2d ? KdfUuid_default.Argon2d : KdfUuid_default.Argon2id,
    variantMapVersion: KeePass2.variantMapVersion,
    version
  };
  return benchmarkKdfKey(transformer, {
    key,
    parameterToBenchmark: "iterations",
    parameters: kdfParameters,
    targetMilliseconds,
    trials: 3
  });
}

// src/enums/CompressionAlgorithm.ts
var CompressionAlgorithm = Object.freeze({
  None: 0,
  GZip: 1
});
var CompressionAlgorithm_default = CompressionAlgorithm;

// src/enums/DefaultIconNumber.ts
var DefaultIconNumber = Object.freeze({
  Password: 0,
  PackageNetwork: 1,
  MessageBoxWarning: 2,
  Server: 3,
  Klipper: 4,
  EduLanguages: 5,
  KCMDF: 6,
  Kate: 7,
  Socket: 8,
  Identity: 9,
  Kontact: 10,
  Camera: 11,
  IrKickFlash: 12,
  KGPGKey3: 13,
  LaptopPower: 14,
  Scanner: 15,
  MozillaFirebird: 16,
  CdromUnmount: 17,
  Display: 18,
  MailGeneric: 19,
  Misc: 20,
  KOrganizer: 21,
  ASCII: 22,
  Icons: 23,
  ConnectEstablished: 24,
  FolderMail: 25,
  FileSave: 26,
  NfsUnmount: 27,
  QuickTime: 28,
  KGPGTerm: 29,
  Konsole: 30,
  FilePrint: 31,
  FSView: 32,
  Run: 33,
  Configure: 34,
  KRFB: 35,
  Ark: 36,
  KPercentage: 37,
  SambaUnmount: 38,
  History: 39,
  MailFind: 40,
  VectorGfx: 41,
  KCMMemory: 42,
  EditTrash: 43,
  KNotes: 44,
  Cancel: 45,
  Help: 46,
  KPackage: 47,
  Folder: 48,
  FolderBlueOpen: 49,
  FolderTar: 50,
  Decrypted: 51,
  Encrypted: 52,
  Apply: 53,
  Signature: 54,
  Thumbnail: 55,
  KAddressBook: 56,
  ViewText: 57,
  KGPG: 58,
  PackageDevelopment: 59,
  KFMHome: 60,
  Services: 61,
  Tux: 62,
  Feather: 63,
  Apple: 64,
  W: 65,
  Money: 66,
  Certificate: 67,
  Smartphone: 68
});
var DefaultIconNumber_default = DefaultIconNumber;

// src/enums/HashAlgorithm.ts
var HashAlgorithm = Object.freeze({
  Sha256: "sha256",
  Sha512: "sha512"
});
var HashAlgorithm_default = HashAlgorithm;

// src/enums/SymmetricCipherAlgorithm.ts
var SymmetricCipherAlgorithm = Object.freeze({
  Aes256_CBC: "aes256_cbc",
  Twofish_CBC: "twofish_cbc",
  ChaCha20: "chacha20",
  Salsa20: "salsa20"
});
var SymmetricCipherAlgorithm_default = SymmetricCipherAlgorithm;

// src/enums/SymmetricCipherUuid.ts
var SymmetricCipherUuid = Object.freeze({
  Aes256: "31c1f2e6-bf71-4350-be58-05216afc5aff",
  Twofish: "ad68f29f-576f-4bb9-a36a-d47af965346c",
  ChaCha20: "d6038a2b-8b6f-4cb5-a524-339a31dbb59a"
});
var SymmetricCipherUuid_default = SymmetricCipherUuid;

// src/errors/KdbxError.ts
var KdbxError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "KdbxError";
  }
};

// src/errors/UnknownKdbxSignatureError.ts
var UnknownKdbxSignatureError = class extends KdbxError {
  constructor(message) {
    super(message);
    this.name = "UnknownKdbxSignatureError";
  }
};

// src/errors/UnsupportedKdbxVersionError.ts
var UnsupportedKdbxVersionError = class extends KdbxError {
  constructor(message) {
    super(message);
    this.name = "UnsupportedKdbxVersionError";
  }
};

// src/outerHeader/fields/validators/validateKdfRounds.ts
function validateKdfRounds(rounds) {
  if (rounds < BigInt(1) || rounds > BigInt(Number.MAX_SAFE_INTEGER)) {
    throw new Error(
      `Invalid number of rounds. Expected between 1 and ${Number.MAX_SAFE_INTEGER}, got ${rounds}`
    );
  }
  return rounds;
}

// src/outerHeader/fields/validators/validateKdfSeed.ts
function validateKdfSeed(seed) {
  const KDF_MIN_SEED_SIZE = 8;
  const KDF_MAX_SEED_SIZE = 32;
  if (seed.byteLength < KDF_MIN_SEED_SIZE || seed.byteLength > KDF_MAX_SEED_SIZE) {
    throw new Error(
      `Invalid seed size. Expected between ${KDF_MIN_SEED_SIZE} and ${KDF_MAX_SEED_SIZE} bytes, got ${seed.byteLength}`
    );
  }
  return seed;
}

// src/helpers/createAesKdfParameters.ts
async function createAesKdfParameters(rounds, seed) {
  const randomBytes = getDependency("randomBytes");
  return {
    rounds: validateKdfRounds(rounds),
    seed: validateKdfSeed(seed ?? await randomBytes(32)),
    uuid: KdfUuid_default.AesKdbx4,
    variantMapVersion: KeePass2.variantMapVersion
  };
}

// src/outerHeader/fields/validators/validateKdfArgon2Memory.ts
function validateKdfArgon2Memory(memoryBytes) {
  const ARGON2_MEMORY_MIN = BigInt(8);
  const ARGON2_MEMORY_MAX = BigInt(1) << BigInt(32);
  if (memoryBytes < ARGON2_MEMORY_MIN || memoryBytes >= ARGON2_MEMORY_MAX) {
    throw new Error(
      `Invalid memory size. Expected between ${ARGON2_MEMORY_MIN} and ${ARGON2_MEMORY_MAX}, got ${memoryBytes}`
    );
  }
  return memoryBytes;
}

// src/outerHeader/fields/validators/validateKdfArgon2Parallelism.ts
function validateKdfArgon2Parallelism(threads) {
  const ARGON2_THREADS_MIN = BigInt(1);
  const ARGON2_THREADS_MAX = BigInt(1 << 24);
  if (threads < ARGON2_THREADS_MIN || threads >= ARGON2_THREADS_MAX) {
    throw new Error(
      `Invalid number of threads. Expected between ${ARGON2_THREADS_MIN} and ${ARGON2_THREADS_MAX}, got ${threads}`
    );
  }
  return threads;
}

// src/helpers/createArgon2KdfParameters.ts
async function createArgon2KdfParameters(iterations, memoryInBytes, parallelism, type, seed) {
  const randomBytes = getDependency("randomBytes");
  return {
    iterations: validateKdfRounds(iterations),
    memoryInBytes: validateKdfArgon2Memory(memoryInBytes),
    parallelism: validateKdfArgon2Parallelism(parallelism),
    seed: validateKdfSeed(seed ?? await randomBytes(32)),
    type,
    uuid: type === Argon2Type_default.Argon2d ? KdfUuid_default.Argon2d : KdfUuid_default.Argon2id,
    variantMapVersion: KeePass2.variantMapVersion,
    version: Argon2Version_default.V13
  };
}

// src/utilities/displaySymmetricCipherAlgorithm.ts
var algorithmDisplayMap = {
  [SymmetricCipherAlgorithm_default.Aes256_CBC]: "AES-256-CBC",
  [SymmetricCipherAlgorithm_default.ChaCha20]: "ChaCha20",
  [SymmetricCipherAlgorithm_default.Salsa20]: "Salsa20",
  [SymmetricCipherAlgorithm_default.Twofish_CBC]: "Twofish-CBC"
};
function displaySymmetricCipherAlgorithm(algorithm) {
  return algorithmDisplayMap[algorithm];
}

// src/utilities/getSymmetricCipherKeySize.ts
function getSymmetricCipherKeySize(algorithm) {
  switch (algorithm) {
    case SymmetricCipherAlgorithm_default.ChaCha20:
      return 64;
    case SymmetricCipherAlgorithm_default.Salsa20:
      return 32;
    case SymmetricCipherAlgorithm_default.Aes256_CBC:
    case SymmetricCipherAlgorithm_default.Twofish_CBC:
    default:
      throw new Error(
        `Unknown expected key size for cipher algorithm "${displaySymmetricCipherAlgorithm(algorithm)}"`
      );
  }
}

// src/helpers/createInnerHeaderEncryptionKey.ts
async function createInnerHeaderEncryptionKey(cipher) {
  const randomBytes = getDependency("randomBytes");
  return await randomBytes(getSymmetricCipherKeySize(cipher));
}

// src/utilities/getSymmetricCipherIvSize.ts
function getSymmetricCipherIvSize(algorithm) {
  switch (algorithm) {
    case SymmetricCipherAlgorithm_default.Aes256_CBC:
    case SymmetricCipherAlgorithm_default.Twofish_CBC:
      return 16;
    case SymmetricCipherAlgorithm_default.Salsa20:
    case SymmetricCipherAlgorithm_default.ChaCha20:
      return 12;
  }
}

// src/helpers/createOuterHeaderEncryptionIV.ts
async function createOuterHeaderEncryptionIV(cipher) {
  const randomBytes = getDependency("randomBytes");
  return await randomBytes(getSymmetricCipherIvSize(cipher));
}

// src/helpers/createOuterHeaderMasterSeed.ts
async function createOuterHeaderMasterSeed() {
  const randomBytes = getDependency("randomBytes");
  return await randomBytes(32);
}

// src/helpers/randomizeSeeds.ts
async function randomizeSeeds(file) {
  const randomBytes = getDependency("randomBytes");
  const kdfSeed = await randomBytes(
    file.outerHeader.fields.kdfParameters.seed.byteLength
  );
  const kdfParameters = {
    ...file.outerHeader.fields.kdfParameters,
    seed: kdfSeed
  };
  const fields = {
    ...file.outerHeader.fields,
    encryptionIV: await createOuterHeaderEncryptionIV(
      file.outerHeader.fields.cipherAlgorithm
    ),
    kdfParameters,
    masterSeed: await createOuterHeaderMasterSeed()
  };
  const innerHeader = {
    ...file.innerHeader,
    innerEncryptionKey: await createInnerHeaderEncryptionKey(
      file.innerHeader.innerEncryptionAlgorithm
    )
  };
  return {
    database: file.database,
    innerHeader,
    outerHeader: {
      fields,
      signature: file.outerHeader.signature
    }
  };
}

// src/keys/createChallengeResponseKey.ts
function createChallengeResponseKey(challenge) {
  return {
    challenge
  };
}

// src/crypto/processHash.ts
async function processHash(algorithm, data) {
  const hash = await getDependency("hash")(algorithm);
  data.forEach((datum) => hash.update(datum));
  return Uint8Array.from(hash.digest());
}

// src/enums/KeyFileType.ts
var FileKeyType = Object.freeze({
  Hashed: 1
});
var KeyFileType_default = FileKeyType;

// src/keys/createFileKey.ts
async function createFileKey(bytes) {
  return createFileKeyHashed(bytes);
}
async function createFileKeyHashed(bytes) {
  const data = await processHash(HashAlgorithm_default.Sha256, [bytes]);
  return {
    data,
    type: KeyFileType_default.Hashed
  };
}

// src/utilities/Uint8ArrayHelper.ts
var Uint8ArrayHelper = {
  areEqual(a, b) {
    if (a.byteLength !== b.byteLength) {
      return false;
    }
    for (let index = 0; index < a.byteLength; index++) {
      if (a[index] !== b[index]) {
        return false;
      }
    }
    return true;
  },
  fromBase64(data) {
    return Uint8Array.from(
      Uint8Array.prototype.slice.call(Buffer.from(data, "base64"))
    );
  },
  fromInt32LE(data) {
    const buffer = Buffer.allocUnsafe(4);
    buffer.writeInt32LE(data, 0);
    return Uint8Array.from(Uint8Array.prototype.slice.call(buffer));
  },
  fromInt64LE(data) {
    const buffer = Buffer.allocUnsafe(8);
    buffer.writeBigInt64LE(data, 0);
    return Uint8Array.from(Uint8Array.prototype.slice.call(buffer));
  },
  fromString(data) {
    return Uint8Array.from(Buffer.from(data, "utf8"));
  },
  fromUInt8(data) {
    const buffer = Buffer.allocUnsafe(1);
    buffer.writeUInt8(data, 0);
    return Uint8Array.from(Uint8Array.prototype.slice.call(buffer));
  },
  fromUInt16LE(data) {
    const buffer = Buffer.allocUnsafe(2);
    buffer.writeUInt16LE(data, 0);
    return Uint8Array.from(Uint8Array.prototype.slice.call(buffer));
  },
  fromUInt32LE(data) {
    const buffer = Buffer.allocUnsafe(4);
    buffer.writeUInt32LE(data, 0);
    return Uint8Array.from(Uint8Array.prototype.slice.call(buffer));
  },
  fromUInt64LE(data) {
    const buffer = Buffer.allocUnsafe(8);
    buffer.writeBigUInt64LE(BigInt(data), 0);
    return Uint8Array.from(Uint8Array.prototype.slice.call(buffer));
  },
  /**
   * Converts a UUID string to an RFC4122-compliant byte array.
   * TODO Restructure the options to allow for empty UUIDs to match compliance
   */
  fromUuid(data, ensureCompliance = true) {
    const match = data.replace(/-/g, "").match(/.{2}/g);
    if (!match) {
      throw new Error(`Invalid UUID "${data}"`);
    }
    if (match.length !== 16) {
      throw new Error(
        `Unexpected UUID length. Expected 36 bytes, got ${data.length}`
      );
    }
    const hexArray = match.map((hex) => parseInt(hex, 16));
    if (hexArray.some(Number.isNaN)) {
      throw new Error(`Invalid UUID "${data}"`);
    }
    if (ensureCompliance) {
      const version = (hexArray[6] & 240) >> 4;
      if (version !== 4) {
        throw new Error(`Unexpected UUID version. Expected 4, got ${version}`);
      }
      const variant = (hexArray[8] & 192) >> 6;
      if (variant !== 2) {
        throw new Error(`Unexpected UUID variant. Expected 2, got ${variant}`);
      }
    }
    return Uint8Array.from(hexArray);
  },
  leftJustify(data, size, fillValue = 0) {
    if (data.byteLength >= size) {
      return Uint8Array.from(data);
    }
    const paddedData = new Uint8Array(size);
    paddedData.set(data);
    paddedData.fill(fillValue, data.byteLength);
    return paddedData;
  },
  toInt32LE(bytes) {
    const buffer = Buffer.from(bytes);
    return buffer.readInt32LE(0);
  },
  toInt64LE(bytes) {
    const buffer = Buffer.from(bytes);
    return buffer.readBigInt64LE(0);
  },
  toString(bytes) {
    return Buffer.from(bytes).toString("utf8");
  },
  toUInt32LE(bytes) {
    const buffer = Buffer.from(bytes);
    return buffer.readUInt32LE(0);
  },
  toUInt64LE(bytes) {
    const buffer = Buffer.from(bytes);
    return buffer.readBigUInt64LE(0);
  }
};
var Uint8ArrayHelper_default = Uint8ArrayHelper;

// src/keys/createPasswordKey.ts
async function createPasswordKey(password) {
  const data = await processHash(HashAlgorithm_default.Sha256, [
    Uint8ArrayHelper_default.fromString(password)
  ]);
  return { data };
}

// src/enums/KeePassVersion.ts
var KeePassVersion = Object.freeze({
  Unknown: 0,
  KeePass1: 1,
  KeePass2: 2
});
var KeePassVersion_default = KeePassVersion;

// src/enums/HeaderFieldId.ts
var HeaderFieldId = Object.freeze({
  EndOfHeader: 0,
  Comment: 1,
  CipherAlgorithm: 2,
  CompressionAlgorithm: 3,
  MasterSeed: 4,
  TransformSeed: 5,
  TransformRounds: 6,
  EncryptionIV: 7,
  ProtectedStreamKey: 8,
  StreamStartBytes: 9,
  InnerRandomStreamID: 10,
  KdfParameters: 11,
  PublicCustomData: 12
});
var HeaderFieldId_default = HeaderFieldId;

// src/utilities/displayHeaderFieldId.ts
var headerFieldDisplayMap = {
  [HeaderFieldId_default.EndOfHeader]: "EndOfHeader",
  [HeaderFieldId_default.Comment]: "Comment",
  [HeaderFieldId_default.CipherAlgorithm]: "CipherAlgorithm",
  [HeaderFieldId_default.CompressionAlgorithm]: "CompressionAlgorithm",
  [HeaderFieldId_default.MasterSeed]: "MasterSeed",
  [HeaderFieldId_default.TransformSeed]: "TransformSeed",
  [HeaderFieldId_default.TransformRounds]: "TransformRounds",
  [HeaderFieldId_default.EncryptionIV]: "EncryptionIV",
  [HeaderFieldId_default.ProtectedStreamKey]: "ProtectedStreamKey",
  [HeaderFieldId_default.StreamStartBytes]: "StreamStartBytes",
  [HeaderFieldId_default.InnerRandomStreamID]: "InnerRandomStreamID",
  [HeaderFieldId_default.KdfParameters]: "KdfParameters",
  [HeaderFieldId_default.PublicCustomData]: "PublicCustomData"
};
function displayHeaderFieldId(id) {
  return headerFieldDisplayMap[id];
}

// src/utilities/isHeaderFieldId.ts
function isHeaderFieldId(id) {
  const values = Object.values(HeaderFieldId_default);
  return values.includes(id);
}

// src/utilities/joinWithConjunction.ts
function joinWithConjunction(values, conjunction) {
  if (values.length === 0) {
    return "";
  }
  if (values.length === 1) {
    return values.at(0) ?? "";
  }
  const lastValue = values.pop();
  const oxfordComma = values.length > 1 ? "," : "";
  return `${values.join(", ")}${oxfordComma} ${conjunction} ${lastValue}`;
}

// src/utilities/displayUuid.ts
function displayUuid(uuid) {
  if (uuid.length !== 16) {
    throw new Error(
      `Invalid UUID length. Expected 16 bytes, got ${uuid.length}`
    );
  }
  return Buffer.from(uuid).toString("hex").replace(/^(.{8})(.{4})(.{4})(.{4})(.{12})$/, "$1-$2-$3-$4-$5").toLowerCase();
}

// src/outerHeader/fields/deserializeCipherAlgorithmValue.ts
var uuidToAlgorithmMapping = Object.freeze({
  [SymmetricCipherUuid_default.Aes256]: SymmetricCipherAlgorithm_default.Aes256_CBC,
  [SymmetricCipherUuid_default.Twofish]: SymmetricCipherAlgorithm_default.Twofish_CBC,
  [SymmetricCipherUuid_default.ChaCha20]: SymmetricCipherAlgorithm_default.ChaCha20
});
function deserializeCipherAlgorithmValue(data) {
  if (data.byteLength !== 16) {
    throw new Error(
      `Invalid cipher algorithm length. Expected 16 bytes, got ${data.byteLength}`
    );
  }
  const uuid = displayUuid(data);
  const algorithm = uuidToAlgorithmMapping[uuid];
  if (!algorithm) {
    throw new Error(`Unsupported cipher "${uuid}"`);
  }
  return algorithm;
}

// src/utilities/isCompressionAlgorithm.ts
function isCompressionAlgorithm(algorithm) {
  const values = Object.values(CompressionAlgorithm_default);
  return values.includes(algorithm);
}

// src/outerHeader/fields/deserializeCompressionAlgorithmValue.ts
function deserializeCompressionAlgorithmValue(data) {
  if (data.byteLength !== 4) {
    throw new Error(
      `Invalid compression algorithm length. Expected 4 bytes, got ${data.byteLength}`
    );
  }
  const id = Uint8ArrayHelper_default.toUInt32LE(data);
  if (!isCompressionAlgorithm(id)) {
    throw new Error(`Unsupported compression algorithm "${id}"`);
  }
  return id;
}

// src/outerHeader/fields/deserializeEncryptionIvValue.ts
function deserializeEncryptionIvValue(data) {
  return data;
}

// src/outerHeader/fields/deserializeEndOfHeaderValue.ts
function deserializeEndOfHeaderValue(data) {
  if (data.byteLength !== 4) {
    throw new Error(
      `Invalid end of header field data length. Expected 4 bytes, got ${data.byteLength}`
    );
  }
  if (!Uint8ArrayHelper_default.areEqual(data, new Uint8Array([13, 10, 13, 10]))) {
    throw new Error(`Unexpected end of header field data`);
  }
  return data;
}

// src/enums/KdfParameterKey.ts
var KdfParameterKey = Object.freeze({
  Uuid: "$UUID",
  AesRounds: "R",
  AesSeed: "S",
  Argon2Salt: "S",
  Argon2Parallelism: "P",
  Argon2Memory: "M",
  Argon2Iterations: "I",
  Argon2Version: "V",
  Argon2Secret: "K",
  Argon2AssocData: "A"
});
var KdfParameterKey_default = KdfParameterKey;

// src/enums/VariantMapFieldType.ts
var VariantMapFieldType = Object.freeze({
  End: 0,
  UInt32: 4,
  UInt64: 5,
  Bool: 8,
  Int32: 12,
  Int64: 13,
  String: 24,
  ByteArray: 66
});
var VariantMapFieldType_default = VariantMapFieldType;

// src/utilities/BufferReader.ts
var BufferReader = class {
  constructor(input) {
    this.cursor = 0;
    this.buffer = Buffer.isBuffer(input) ? input : Buffer.from(input);
  }
  get byteLength() {
    return this.buffer.byteLength - this.cursor;
  }
  get offset() {
    return this.cursor;
  }
  set offset(value) {
    if (value < 0 || value > this.buffer.length) {
      throw new Error(
        `Offset out of bounds. Expected value between 0 and ${this.buffer.length}, got ${value}`
      );
    }
    this.cursor = value;
  }
  readBytes(length) {
    this.assertRemaining(length);
    const bytes = Uint8Array.prototype.slice.call(
      this.buffer,
      this.offset,
      this.offset + length
    );
    this.cursor += length;
    return Uint8Array.from(bytes);
  }
  readUInt8() {
    this.assertRemaining(1);
    const result = this.buffer.readUInt8(this.offset);
    this.cursor += 1;
    return result;
  }
  readUInt16LE() {
    this.assertRemaining(2);
    const result = this.buffer.readUInt16LE(this.offset);
    this.cursor += 2;
    return result;
  }
  readUInt32LE() {
    this.assertRemaining(4);
    const result = this.buffer.readUInt32LE(this.offset);
    this.cursor += 4;
    return result;
  }
  processed() {
    return Uint8Array.from(
      Uint8Array.prototype.slice.call(this.buffer, 0, this.offset)
    );
  }
  remaining() {
    return Uint8Array.from(
      Uint8Array.prototype.slice.call(this.buffer, this.offset)
    );
  }
  assertRemaining(length) {
    if (this.offset + length > this.buffer.length) {
      throw new Error(
        `Unexpected end of buffer. Expected at least ${length} bytes remaining, have ${this.buffer.length - this.offset}`
      );
    }
  }
};

// src/utilities/isVariantMapFieldType.ts
function isVariantMapFieldType(type) {
  const values = Object.values(VariantMapFieldType_default);
  return values.includes(type);
}

// src/outerHeader/fields/deserializeVariantMapValue.ts
function deserializeVariantMapValue(data) {
  const reader = new BufferReader(data);
  const version = reader.readUInt16LE();
  const majorVersion = version & KeePass2.variantMapCriticalMask;
  const maxVersion = KeePass2.variantMapVersion & KeePass2.variantMapCriticalMask;
  if (majorVersion > maxVersion) {
    throw new Error(
      `Invalid variant map version. Expected less than max ${maxVersion}, got ${majorVersion}`
    );
  }
  const values = {};
  for (; ; ) {
    const type = reader.readUInt8();
    if (!isVariantMapFieldType(type)) {
      throw new Error(`Invalid variant map field type "${type}"`);
    }
    if (type === VariantMapFieldType_default.End) {
      break;
    }
    const nameLength = reader.readUInt32LE();
    const nameBytes = reader.readBytes(nameLength);
    const name = Uint8ArrayHelper_default.toString(nameBytes);
    const valueLength = reader.readUInt32LE();
    const valueBytes = reader.readBytes(valueLength);
    switch (type) {
      case VariantMapFieldType_default.Bool:
        if (valueLength !== 1) {
          throw new Error(
            `Invalid variant map Bool entry value length. Expected 1 byte, got ${valueLength}`
          );
        }
        values[name] = {
          type,
          value: valueBytes.at(0) !== 0
        };
        break;
      case VariantMapFieldType_default.Int32:
        if (valueLength !== 4) {
          throw new Error(
            `Invalid variant map Int32 entry value length. Expected 4 bytes, got ${valueLength}`
          );
        }
        values[name] = {
          type,
          value: Uint8ArrayHelper_default.toInt32LE(valueBytes)
        };
        break;
      case VariantMapFieldType_default.UInt32:
        if (valueLength !== 4) {
          throw new Error(
            `Invalid variant map UInt32 entry value length. Expected 4 bytes, got ${valueLength}`
          );
        }
        values[name] = {
          type,
          value: Uint8ArrayHelper_default.toUInt32LE(valueBytes)
        };
        break;
      case VariantMapFieldType_default.Int64:
        if (valueLength !== 8) {
          throw new Error(
            `Invalid variant map Int64 entry value length. Expected 8 bytes, got ${valueLength}`
          );
        }
        values[name] = {
          type,
          value: Uint8ArrayHelper_default.toInt64LE(valueBytes)
        };
        break;
      case VariantMapFieldType_default.UInt64:
        if (valueLength !== 8) {
          throw new Error(
            `Invalid variant map UInt64 entry value length. Expected 8 bytes, got ${valueLength}`
          );
        }
        values[name] = {
          type,
          value: Uint8ArrayHelper_default.toUInt64LE(valueBytes)
        };
        break;
      case VariantMapFieldType_default.String:
        values[name] = {
          type,
          value: Uint8ArrayHelper_default.toString(valueBytes)
        };
        break;
      case VariantMapFieldType_default.ByteArray:
        values[name] = {
          type,
          value: valueBytes
        };
        break;
    }
  }
  return { values, version };
}

// src/outerHeader/fields/validators/validateKdfArgon2Version.ts
function validateKdfArgon2Version(version) {
  const supportedVersions = Object.values(Argon2Version_default);
  if (!supportedVersions.includes(version)) {
    const displayValues = joinWithConjunction(
      supportedVersions.map((v) => `"0x${v.toString(16)}"`),
      "or"
    );
    throw new Error(
      `Invalid Argon2 version. Expected one of ${displayValues}, got "0x${version.toString(16)}"`
    );
  }
  return version;
}

// src/utilities/displayVariantMapFieldType.ts
var variantMapFieldTypeDisplayMap = {
  [VariantMapFieldType_default.End]: "End",
  [VariantMapFieldType_default.Bool]: "Bool",
  [VariantMapFieldType_default.Int32]: "Int32",
  [VariantMapFieldType_default.UInt32]: "UInt32",
  [VariantMapFieldType_default.Int64]: "Int64",
  [VariantMapFieldType_default.UInt64]: "UInt64",
  [VariantMapFieldType_default.String]: "String",
  [VariantMapFieldType_default.ByteArray]: "ByteArray"
};
function displayVariantMapFieldType(type) {
  return variantMapFieldTypeDisplayMap[type];
}

// src/outerHeader/fields/validators/validateVariantValueBigInt.ts
function validateVariantValueBigInt(key, values) {
  const data = values[key];
  if (data === void 0) {
    throw new Error(`Missing variant value for "${key}"`);
  }
  if (data.type !== VariantMapFieldType_default.Int64 && data.type !== VariantMapFieldType_default.UInt64) {
    throw new Error(
      `Invalid variant value type found for "${key}". Expected Int64 or UInt64, got ${displayVariantMapFieldType(data.type)}`
    );
  }
  return BigInt(data.value);
}

// src/outerHeader/fields/validators/validateVariantValueNumber.ts
function validateVariantValueNumber(key, values) {
  const data = values[key];
  if (data === void 0) {
    throw new Error(`Missing variant value for "${key}"`);
  }
  if (data.type !== VariantMapFieldType_default.Int32 && data.type !== VariantMapFieldType_default.UInt32) {
    throw new Error(
      `Invalid variant value type found for "${key}". Expected Int32 or UInt32, got ${displayVariantMapFieldType(data.type)}`
    );
  }
  return data.value;
}

// src/outerHeader/fields/validators/validateVariantValueNumeric.ts
function validateVariantValueNumeric(key, values) {
  const data = values[key];
  if (data === void 0) {
    throw new Error(`Missing variant value for "${key}"`);
  }
  if (data.type !== VariantMapFieldType_default.Int32 && data.type !== VariantMapFieldType_default.UInt32 && data.type !== VariantMapFieldType_default.Int64 && data.type !== VariantMapFieldType_default.UInt64) {
    throw new Error(
      `Invalid variant value type found for "${key}". Expected Int32, UInt32, Int64, or UInt64, got ${displayVariantMapFieldType(data.type)}`
    );
  }
  return BigInt(data.value);
}

// src/outerHeader/fields/validators/validateVariantValueUint8Array.ts
function validateVariantValueUint8Array(key, values) {
  const data = values[key];
  if (data === void 0) {
    throw new Error(`Missing variant value for "${key}"`);
  }
  if (data.type !== VariantMapFieldType_default.ByteArray) {
    throw new Error(
      `Invalid variant value type found for "${key}". Expected ByteArray, got ${displayVariantMapFieldType(data.type)}`
    );
  }
  return data.value;
}

// src/outerHeader/fields/deserializeKdfParametersValue.ts
function deserializeKdfParametersValue(data) {
  const variantMap = deserializeVariantMapValue(data);
  const variantData = variantMap.values[KdfParameterKey_default.Uuid];
  if (variantData === void 0) {
    throw new Error("KDF UUID not found in variant map");
  }
  if (variantData.type !== VariantMapFieldType_default.ByteArray) {
    throw new Error(
      `Invalid KDF UUID data found. Expected ByteArray, got ${variantData.type}`
    );
  }
  const uuid = displayUuid(variantData.value);
  switch (uuid) {
    case KdfUuid_default.AesKdbx3:
    case KdfUuid_default.AesKdbx4:
      return parseAesParameterVariantMap(uuid, variantMap);
    case KdfUuid_default.Argon2d:
    case KdfUuid_default.Argon2id:
      return parseArgon2ParametersVariantMap(uuid, variantMap);
    default:
      throw new Error(`Unknown KDF UUID encountered "${uuid}"`);
  }
}
function parseAesParameterVariantMap(uuid, variantMap) {
  return {
    // TODO Upgrade Kdbx3 automatically to Kdbx4?
    uuid,
    rounds: validateKdfRounds(
      validateVariantValueBigInt(KdfParameterKey_default.AesRounds, variantMap.values)
    ),
    seed: validateKdfSeed(
      validateVariantValueUint8Array(
        KdfParameterKey_default.AesSeed,
        variantMap.values
      )
    ),
    variantMapVersion: variantMap.version
  };
}
function parseArgon2ParametersVariantMap(uuid, variantMap) {
  return {
    iterations: validateKdfRounds(
      validateVariantValueBigInt(
        KdfParameterKey_default.Argon2Iterations,
        variantMap.values
      )
    ),
    memoryInBytes: validateKdfArgon2Memory(
      validateVariantValueBigInt(
        KdfParameterKey_default.Argon2Memory,
        variantMap.values
      )
    ),
    parallelism: validateKdfArgon2Parallelism(
      validateVariantValueNumeric(
        KdfParameterKey_default.Argon2Parallelism,
        variantMap.values
      )
    ),
    seed: validateKdfSeed(
      validateVariantValueUint8Array(
        KdfParameterKey_default.Argon2Salt,
        variantMap.values
      )
    ),
    type: uuid === KdfUuid_default.Argon2d ? Argon2Type_default.Argon2d : Argon2Type_default.Argon2id,
    uuid,
    version: validateKdfArgon2Version(
      validateVariantValueNumber(
        KdfParameterKey_default.Argon2Version,
        variantMap.values
      )
    ),
    variantMapVersion: variantMap.version
  };
}

// src/outerHeader/fields/deserializeMasterSeedValue.ts
function deserializeMasterSeedValue(data) {
  if (data.byteLength !== 32) {
    throw new Error(
      `Invalid master seed length. Expected 32 bytes, got ${data.byteLength}`
    );
  }
  return data;
}

// src/outerHeader/readHeaderFields.ts
function readHeaderFields(buffer) {
  const header = {};
  for (; ; ) {
    const fieldId = readOuterHeaderFieldId(buffer);
    const fieldData = readOuterHeaderFieldData(buffer, fieldId);
    switch (fieldId) {
      case HeaderFieldId_default.Comment:
      case HeaderFieldId_default.TransformSeed:
      case HeaderFieldId_default.TransformRounds:
      case HeaderFieldId_default.ProtectedStreamKey:
      case HeaderFieldId_default.StreamStartBytes:
      case HeaderFieldId_default.InnerRandomStreamID:
        throw new Error(
          `Unsupported header field ID encountered "${displayHeaderFieldId(fieldId)}" with ${buffer.byteLength} bytes of data`
        );
      case HeaderFieldId_default.CipherAlgorithm:
        header.cipherAlgorithm = deserializeCipherAlgorithmValue(fieldData);
        break;
      case HeaderFieldId_default.CompressionAlgorithm:
        header.compressionAlgorithm = deserializeCompressionAlgorithmValue(fieldData);
        break;
      case HeaderFieldId_default.MasterSeed:
        header.masterSeed = deserializeMasterSeedValue(fieldData);
        break;
      case HeaderFieldId_default.EncryptionIV:
        header.encryptionIV = deserializeEncryptionIvValue(fieldData);
        break;
      case HeaderFieldId_default.KdfParameters:
        header.kdfParameters = deserializeKdfParametersValue(fieldData);
        break;
      case HeaderFieldId_default.PublicCustomData:
        header.publicCustomData = deserializeVariantMapValue(fieldData);
        break;
      case HeaderFieldId_default.EndOfHeader:
        header.endOfHeader = deserializeEndOfHeaderValue(fieldData);
        return validateOuterHeader(header);
    }
  }
}
function validateOuterHeader(header) {
  const missingFields = [];
  function validateHeaderComplete(header2) {
    missingFields.length = 0;
    if (header2.cipherAlgorithm === void 0) {
      missingFields.push(HeaderFieldId_default.CipherAlgorithm);
    }
    if (header2.compressionAlgorithm === void 0) {
      missingFields.push(HeaderFieldId_default.CompressionAlgorithm);
    }
    if (header2.masterSeed === void 0) {
      missingFields.push(HeaderFieldId_default.MasterSeed);
    }
    if (header2.encryptionIV === void 0) {
      missingFields.push(HeaderFieldId_default.EncryptionIV);
    }
    if (header2.kdfParameters === void 0) {
      missingFields.push(HeaderFieldId_default.KdfParameters);
    }
    return missingFields.length === 0;
  }
  if (!validateHeaderComplete(header)) {
    const fieldLabel = missingFields.length === 1 ? "field" : "fields";
    const missingLabels = missingFields.map(
      (v) => `"${displayHeaderFieldId(v)}"`
    );
    throw new Error(
      `Missing required header ${fieldLabel}: ${joinWithConjunction(missingLabels, "and")}`
    );
  }
  return {
    cipherAlgorithm: header.cipherAlgorithm,
    compressionAlgorithm: header.compressionAlgorithm,
    encryptionIV: header.encryptionIV,
    endOfHeader: header.endOfHeader,
    kdfParameters: header.kdfParameters,
    masterSeed: header.masterSeed,
    publicCustomData: header.publicCustomData
  };
}
function readOuterHeaderFieldId(reader) {
  const fieldId = reader.readUInt8();
  if (!isHeaderFieldId(fieldId)) {
    throw new Error(`Unknown header field ID encountered "${fieldId}"`);
  }
  return fieldId;
}
function readOuterHeaderFieldData(reader, fieldId) {
  const fieldLength = reader.readUInt32LE();
  if (!fieldLength) {
    throw new Error(
      `Unexpected empty header field length for ${displayHeaderFieldId(fieldId)}`
    );
  }
  return reader.readBytes(fieldLength);
}

// src/outerHeader/readSignature.ts
function readSignature(buffer) {
  if (buffer.byteLength < 12) {
    throw new Error(
      `Unable to parse signature. Expected at least 12 bytes, got ${buffer.byteLength}`
    );
  }
  const signature1 = buffer.readUInt32LE();
  const signature2 = buffer.readUInt32LE();
  const versionMinor = buffer.readUInt16LE();
  const versionMajor = buffer.readUInt16LE();
  return {
    signature1,
    signature2,
    versionMinor,
    versionMajor
  };
}

// src/utilities/getVersionFromSignature.ts
var signatures = Object.freeze([
  {
    signature1: KeePass1.signature1,
    signature2: KeePass1.signature2,
    version: KeePassVersion_default.KeePass1
  },
  {
    signature1: KeePass2.signature1,
    signature2: KeePass2.signature2,
    version: KeePassVersion_default.KeePass2
  }
]);
function getVersionFromSignature(signature) {
  const found = signatures.find(
    ({ signature1, signature2 }) => signature1 === signature.signature1 && signature2 === signature.signature2
  );
  return found?.version ?? KeePassVersion_default.Unknown;
}

// src/parseKdbxHeader.ts
function parseKdbxHeader(fileBytes) {
  const reader = new BufferReader(fileBytes);
  const signature = readSignature(reader);
  const appVersion = getVersionFromSignature(signature);
  switch (appVersion) {
    case KeePassVersion_default.KeePass1:
      throw new UnsupportedKdbxVersionError(
        "KeePass1 databases are not supported"
      );
    case KeePassVersion_default.KeePass2:
      break;
    case KeePassVersion_default.Unknown:
    default:
      throw new UnknownKdbxSignatureError("Unknown database format");
  }
  switch (signature.versionMajor) {
    case 2:
      throw new UnsupportedKdbxVersionError(
        "KeePass2 v2.x databases are not supported"
      );
    case 3:
      throw new UnsupportedKdbxVersionError(
        "KeePass2 v3.x databases are not supported"
      );
    case 4:
      break;
    default:
      throw new UnsupportedKdbxVersionError(
        `Unknown database version "${signature.versionMajor}.${signature.versionMinor}"`
      );
  }
  const fields = readHeaderFields(reader);
  return {
    fields,
    signature,
    size: reader.offset
  };
}

// src/crypto/generateBlockHmacKey.ts
async function generateBlockHmacKey(blockIndex, key) {
  if (key.byteLength !== 64) {
    throw new Error(
      `Unexpected block key length. Expected 64 bytes, got ${key.byteLength}`
    );
  }
  if (blockIndex === null) {
    blockIndex = BigInt("0xffffffffffffffff");
  }
  return await processHash(HashAlgorithm_default.Sha512, [
    Uint8ArrayHelper_default.fromUInt64LE(blockIndex),
    key
  ]);
}

// src/crypto/processHmac.ts
async function processHmac(algorithm, key, data) {
  const hash = await getDependency("hmac")(algorithm, key);
  data.forEach((datum) => hash.update(datum));
  return Uint8Array.from(hash.digest());
}

// src/blocks/readHmacHashedBlocks.ts
async function readHmacHashedBlocks(reader, key) {
  const blocks = [];
  if (reader.byteLength < 36) {
    throw new Error(
      `Invalid HMAC hashed blocks data length. Expected at least 36 bytes, got ${reader.byteLength}`
    );
  }
  for (let blockIndex = 0; ; blockIndex++) {
    const expectedHmac = reader.readBytes(32);
    const blockLengthBytes = reader.readBytes(4);
    const blockLength = Uint8ArrayHelper_default.toInt32LE(blockLengthBytes);
    if (blockLength < 0) {
      throw new Error(
        `Invalid block size. Expected a number greater than or equal to 0, got ${blockLength}`
      );
    }
    const buffer = reader.readBytes(blockLength);
    const blockHmacKey = await generateBlockHmacKey(blockIndex, key);
    const hmac = await processHmac(HashAlgorithm_default.Sha256, blockHmacKey, [
      Uint8ArrayHelper_default.fromUInt64LE(blockIndex),
      blockLengthBytes,
      buffer
    ]);
    if (!Uint8ArrayHelper_default.areEqual(expectedHmac, hmac)) {
      throw new Error(`HMAC mismatch on block ${blockIndex}`);
    }
    blocks.push(buffer);
    if (blockLength === 0) {
      break;
    }
  }
  return Uint8Array.from(Buffer.concat(blocks));
}

// node_modules/pako/dist/pako.esm.mjs
var Z_FIXED$1 = 4;
var Z_BINARY = 0;
var Z_TEXT = 1;
var Z_UNKNOWN$1 = 2;
function zero$1(buf) {
  let len = buf.length;
  while (--len >= 0) {
    buf[len] = 0;
  }
}
var STORED_BLOCK = 0;
var STATIC_TREES = 1;
var DYN_TREES = 2;
var MIN_MATCH$1 = 3;
var MAX_MATCH$1 = 258;
var LENGTH_CODES$1 = 29;
var LITERALS$1 = 256;
var L_CODES$1 = LITERALS$1 + 1 + LENGTH_CODES$1;
var D_CODES$1 = 30;
var BL_CODES$1 = 19;
var HEAP_SIZE$1 = 2 * L_CODES$1 + 1;
var MAX_BITS$1 = 15;
var Buf_size = 16;
var MAX_BL_BITS = 7;
var END_BLOCK = 256;
var REP_3_6 = 16;
var REPZ_3_10 = 17;
var REPZ_11_138 = 18;
var extra_lbits = (
  /* extra bits for each length code */
  new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0])
);
var extra_dbits = (
  /* extra bits for each distance code */
  new Uint8Array([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13])
);
var extra_blbits = (
  /* extra bits for each bit length code */
  new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7])
);
var bl_order = new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
var DIST_CODE_LEN = 512;
var static_ltree = new Array((L_CODES$1 + 2) * 2);
zero$1(static_ltree);
var static_dtree = new Array(D_CODES$1 * 2);
zero$1(static_dtree);
var _dist_code = new Array(DIST_CODE_LEN);
zero$1(_dist_code);
var _length_code = new Array(MAX_MATCH$1 - MIN_MATCH$1 + 1);
zero$1(_length_code);
var base_length = new Array(LENGTH_CODES$1);
zero$1(base_length);
var base_dist = new Array(D_CODES$1);
zero$1(base_dist);
function StaticTreeDesc(static_tree, extra_bits, extra_base, elems, max_length) {
  this.static_tree = static_tree;
  this.extra_bits = extra_bits;
  this.extra_base = extra_base;
  this.elems = elems;
  this.max_length = max_length;
  this.has_stree = static_tree && static_tree.length;
}
var static_l_desc;
var static_d_desc;
var static_bl_desc;
function TreeDesc(dyn_tree, stat_desc) {
  this.dyn_tree = dyn_tree;
  this.max_code = 0;
  this.stat_desc = stat_desc;
}
var d_code = (dist) => {
  return dist < 256 ? _dist_code[dist] : _dist_code[256 + (dist >>> 7)];
};
var put_short = (s, w) => {
  s.pending_buf[s.pending++] = w & 255;
  s.pending_buf[s.pending++] = w >>> 8 & 255;
};
var send_bits = (s, value, length) => {
  if (s.bi_valid > Buf_size - length) {
    s.bi_buf |= value << s.bi_valid & 65535;
    put_short(s, s.bi_buf);
    s.bi_buf = value >> Buf_size - s.bi_valid;
    s.bi_valid += length - Buf_size;
  } else {
    s.bi_buf |= value << s.bi_valid & 65535;
    s.bi_valid += length;
  }
};
var send_code = (s, c, tree) => {
  send_bits(
    s,
    tree[c * 2],
    tree[c * 2 + 1]
    /*.Len*/
  );
};
var bi_reverse = (code, len) => {
  let res = 0;
  do {
    res |= code & 1;
    code >>>= 1;
    res <<= 1;
  } while (--len > 0);
  return res >>> 1;
};
var bi_flush = (s) => {
  if (s.bi_valid === 16) {
    put_short(s, s.bi_buf);
    s.bi_buf = 0;
    s.bi_valid = 0;
  } else if (s.bi_valid >= 8) {
    s.pending_buf[s.pending++] = s.bi_buf & 255;
    s.bi_buf >>= 8;
    s.bi_valid -= 8;
  }
};
var gen_bitlen = (s, desc) => {
  const tree = desc.dyn_tree;
  const max_code = desc.max_code;
  const stree = desc.stat_desc.static_tree;
  const has_stree = desc.stat_desc.has_stree;
  const extra = desc.stat_desc.extra_bits;
  const base = desc.stat_desc.extra_base;
  const max_length = desc.stat_desc.max_length;
  let h;
  let n, m;
  let bits;
  let xbits;
  let f;
  let overflow = 0;
  for (bits = 0; bits <= MAX_BITS$1; bits++) {
    s.bl_count[bits] = 0;
  }
  tree[s.heap[s.heap_max] * 2 + 1] = 0;
  for (h = s.heap_max + 1; h < HEAP_SIZE$1; h++) {
    n = s.heap[h];
    bits = tree[tree[n * 2 + 1] * 2 + 1] + 1;
    if (bits > max_length) {
      bits = max_length;
      overflow++;
    }
    tree[n * 2 + 1] = bits;
    if (n > max_code) {
      continue;
    }
    s.bl_count[bits]++;
    xbits = 0;
    if (n >= base) {
      xbits = extra[n - base];
    }
    f = tree[n * 2];
    s.opt_len += f * (bits + xbits);
    if (has_stree) {
      s.static_len += f * (stree[n * 2 + 1] + xbits);
    }
  }
  if (overflow === 0) {
    return;
  }
  do {
    bits = max_length - 1;
    while (s.bl_count[bits] === 0) {
      bits--;
    }
    s.bl_count[bits]--;
    s.bl_count[bits + 1] += 2;
    s.bl_count[max_length]--;
    overflow -= 2;
  } while (overflow > 0);
  for (bits = max_length; bits !== 0; bits--) {
    n = s.bl_count[bits];
    while (n !== 0) {
      m = s.heap[--h];
      if (m > max_code) {
        continue;
      }
      if (tree[m * 2 + 1] !== bits) {
        s.opt_len += (bits - tree[m * 2 + 1]) * tree[m * 2];
        tree[m * 2 + 1] = bits;
      }
      n--;
    }
  }
};
var gen_codes = (tree, max_code, bl_count) => {
  const next_code = new Array(MAX_BITS$1 + 1);
  let code = 0;
  let bits;
  let n;
  for (bits = 1; bits <= MAX_BITS$1; bits++) {
    code = code + bl_count[bits - 1] << 1;
    next_code[bits] = code;
  }
  for (n = 0; n <= max_code; n++) {
    let len = tree[n * 2 + 1];
    if (len === 0) {
      continue;
    }
    tree[n * 2] = bi_reverse(next_code[len]++, len);
  }
};
var tr_static_init = () => {
  let n;
  let bits;
  let length;
  let code;
  let dist;
  const bl_count = new Array(MAX_BITS$1 + 1);
  length = 0;
  for (code = 0; code < LENGTH_CODES$1 - 1; code++) {
    base_length[code] = length;
    for (n = 0; n < 1 << extra_lbits[code]; n++) {
      _length_code[length++] = code;
    }
  }
  _length_code[length - 1] = code;
  dist = 0;
  for (code = 0; code < 16; code++) {
    base_dist[code] = dist;
    for (n = 0; n < 1 << extra_dbits[code]; n++) {
      _dist_code[dist++] = code;
    }
  }
  dist >>= 7;
  for (; code < D_CODES$1; code++) {
    base_dist[code] = dist << 7;
    for (n = 0; n < 1 << extra_dbits[code] - 7; n++) {
      _dist_code[256 + dist++] = code;
    }
  }
  for (bits = 0; bits <= MAX_BITS$1; bits++) {
    bl_count[bits] = 0;
  }
  n = 0;
  while (n <= 143) {
    static_ltree[n * 2 + 1] = 8;
    n++;
    bl_count[8]++;
  }
  while (n <= 255) {
    static_ltree[n * 2 + 1] = 9;
    n++;
    bl_count[9]++;
  }
  while (n <= 279) {
    static_ltree[n * 2 + 1] = 7;
    n++;
    bl_count[7]++;
  }
  while (n <= 287) {
    static_ltree[n * 2 + 1] = 8;
    n++;
    bl_count[8]++;
  }
  gen_codes(static_ltree, L_CODES$1 + 1, bl_count);
  for (n = 0; n < D_CODES$1; n++) {
    static_dtree[n * 2 + 1] = 5;
    static_dtree[n * 2] = bi_reverse(n, 5);
  }
  static_l_desc = new StaticTreeDesc(static_ltree, extra_lbits, LITERALS$1 + 1, L_CODES$1, MAX_BITS$1);
  static_d_desc = new StaticTreeDesc(static_dtree, extra_dbits, 0, D_CODES$1, MAX_BITS$1);
  static_bl_desc = new StaticTreeDesc(new Array(0), extra_blbits, 0, BL_CODES$1, MAX_BL_BITS);
};
var init_block = (s) => {
  let n;
  for (n = 0; n < L_CODES$1; n++) {
    s.dyn_ltree[n * 2] = 0;
  }
  for (n = 0; n < D_CODES$1; n++) {
    s.dyn_dtree[n * 2] = 0;
  }
  for (n = 0; n < BL_CODES$1; n++) {
    s.bl_tree[n * 2] = 0;
  }
  s.dyn_ltree[END_BLOCK * 2] = 1;
  s.opt_len = s.static_len = 0;
  s.sym_next = s.matches = 0;
};
var bi_windup = (s) => {
  if (s.bi_valid > 8) {
    put_short(s, s.bi_buf);
  } else if (s.bi_valid > 0) {
    s.pending_buf[s.pending++] = s.bi_buf;
  }
  s.bi_buf = 0;
  s.bi_valid = 0;
};
var smaller = (tree, n, m, depth) => {
  const _n2 = n * 2;
  const _m2 = m * 2;
  return tree[_n2] < tree[_m2] || tree[_n2] === tree[_m2] && depth[n] <= depth[m];
};
var pqdownheap = (s, tree, k) => {
  const v = s.heap[k];
  let j = k << 1;
  while (j <= s.heap_len) {
    if (j < s.heap_len && smaller(tree, s.heap[j + 1], s.heap[j], s.depth)) {
      j++;
    }
    if (smaller(tree, v, s.heap[j], s.depth)) {
      break;
    }
    s.heap[k] = s.heap[j];
    k = j;
    j <<= 1;
  }
  s.heap[k] = v;
};
var compress_block = (s, ltree, dtree) => {
  let dist;
  let lc;
  let sx = 0;
  let code;
  let extra;
  if (s.sym_next !== 0) {
    do {
      dist = s.pending_buf[s.sym_buf + sx++] & 255;
      dist += (s.pending_buf[s.sym_buf + sx++] & 255) << 8;
      lc = s.pending_buf[s.sym_buf + sx++];
      if (dist === 0) {
        send_code(s, lc, ltree);
      } else {
        code = _length_code[lc];
        send_code(s, code + LITERALS$1 + 1, ltree);
        extra = extra_lbits[code];
        if (extra !== 0) {
          lc -= base_length[code];
          send_bits(s, lc, extra);
        }
        dist--;
        code = d_code(dist);
        send_code(s, code, dtree);
        extra = extra_dbits[code];
        if (extra !== 0) {
          dist -= base_dist[code];
          send_bits(s, dist, extra);
        }
      }
    } while (sx < s.sym_next);
  }
  send_code(s, END_BLOCK, ltree);
};
var build_tree = (s, desc) => {
  const tree = desc.dyn_tree;
  const stree = desc.stat_desc.static_tree;
  const has_stree = desc.stat_desc.has_stree;
  const elems = desc.stat_desc.elems;
  let n, m;
  let max_code = -1;
  let node;
  s.heap_len = 0;
  s.heap_max = HEAP_SIZE$1;
  for (n = 0; n < elems; n++) {
    if (tree[n * 2] !== 0) {
      s.heap[++s.heap_len] = max_code = n;
      s.depth[n] = 0;
    } else {
      tree[n * 2 + 1] = 0;
    }
  }
  while (s.heap_len < 2) {
    node = s.heap[++s.heap_len] = max_code < 2 ? ++max_code : 0;
    tree[node * 2] = 1;
    s.depth[node] = 0;
    s.opt_len--;
    if (has_stree) {
      s.static_len -= stree[node * 2 + 1];
    }
  }
  desc.max_code = max_code;
  for (n = s.heap_len >> 1; n >= 1; n--) {
    pqdownheap(s, tree, n);
  }
  node = elems;
  do {
    n = s.heap[
      1
      /*SMALLEST*/
    ];
    s.heap[
      1
      /*SMALLEST*/
    ] = s.heap[s.heap_len--];
    pqdownheap(
      s,
      tree,
      1
      /*SMALLEST*/
    );
    m = s.heap[
      1
      /*SMALLEST*/
    ];
    s.heap[--s.heap_max] = n;
    s.heap[--s.heap_max] = m;
    tree[node * 2] = tree[n * 2] + tree[m * 2];
    s.depth[node] = (s.depth[n] >= s.depth[m] ? s.depth[n] : s.depth[m]) + 1;
    tree[n * 2 + 1] = tree[m * 2 + 1] = node;
    s.heap[
      1
      /*SMALLEST*/
    ] = node++;
    pqdownheap(
      s,
      tree,
      1
      /*SMALLEST*/
    );
  } while (s.heap_len >= 2);
  s.heap[--s.heap_max] = s.heap[
    1
    /*SMALLEST*/
  ];
  gen_bitlen(s, desc);
  gen_codes(tree, max_code, s.bl_count);
};
var scan_tree = (s, tree, max_code) => {
  let n;
  let prevlen = -1;
  let curlen;
  let nextlen = tree[0 * 2 + 1];
  let count = 0;
  let max_count = 7;
  let min_count = 4;
  if (nextlen === 0) {
    max_count = 138;
    min_count = 3;
  }
  tree[(max_code + 1) * 2 + 1] = 65535;
  for (n = 0; n <= max_code; n++) {
    curlen = nextlen;
    nextlen = tree[(n + 1) * 2 + 1];
    if (++count < max_count && curlen === nextlen) {
      continue;
    } else if (count < min_count) {
      s.bl_tree[curlen * 2] += count;
    } else if (curlen !== 0) {
      if (curlen !== prevlen) {
        s.bl_tree[curlen * 2]++;
      }
      s.bl_tree[REP_3_6 * 2]++;
    } else if (count <= 10) {
      s.bl_tree[REPZ_3_10 * 2]++;
    } else {
      s.bl_tree[REPZ_11_138 * 2]++;
    }
    count = 0;
    prevlen = curlen;
    if (nextlen === 0) {
      max_count = 138;
      min_count = 3;
    } else if (curlen === nextlen) {
      max_count = 6;
      min_count = 3;
    } else {
      max_count = 7;
      min_count = 4;
    }
  }
};
var send_tree = (s, tree, max_code) => {
  let n;
  let prevlen = -1;
  let curlen;
  let nextlen = tree[0 * 2 + 1];
  let count = 0;
  let max_count = 7;
  let min_count = 4;
  if (nextlen === 0) {
    max_count = 138;
    min_count = 3;
  }
  for (n = 0; n <= max_code; n++) {
    curlen = nextlen;
    nextlen = tree[(n + 1) * 2 + 1];
    if (++count < max_count && curlen === nextlen) {
      continue;
    } else if (count < min_count) {
      do {
        send_code(s, curlen, s.bl_tree);
      } while (--count !== 0);
    } else if (curlen !== 0) {
      if (curlen !== prevlen) {
        send_code(s, curlen, s.bl_tree);
        count--;
      }
      send_code(s, REP_3_6, s.bl_tree);
      send_bits(s, count - 3, 2);
    } else if (count <= 10) {
      send_code(s, REPZ_3_10, s.bl_tree);
      send_bits(s, count - 3, 3);
    } else {
      send_code(s, REPZ_11_138, s.bl_tree);
      send_bits(s, count - 11, 7);
    }
    count = 0;
    prevlen = curlen;
    if (nextlen === 0) {
      max_count = 138;
      min_count = 3;
    } else if (curlen === nextlen) {
      max_count = 6;
      min_count = 3;
    } else {
      max_count = 7;
      min_count = 4;
    }
  }
};
var build_bl_tree = (s) => {
  let max_blindex;
  scan_tree(s, s.dyn_ltree, s.l_desc.max_code);
  scan_tree(s, s.dyn_dtree, s.d_desc.max_code);
  build_tree(s, s.bl_desc);
  for (max_blindex = BL_CODES$1 - 1; max_blindex >= 3; max_blindex--) {
    if (s.bl_tree[bl_order[max_blindex] * 2 + 1] !== 0) {
      break;
    }
  }
  s.opt_len += 3 * (max_blindex + 1) + 5 + 5 + 4;
  return max_blindex;
};
var send_all_trees = (s, lcodes, dcodes, blcodes) => {
  let rank2;
  send_bits(s, lcodes - 257, 5);
  send_bits(s, dcodes - 1, 5);
  send_bits(s, blcodes - 4, 4);
  for (rank2 = 0; rank2 < blcodes; rank2++) {
    send_bits(s, s.bl_tree[bl_order[rank2] * 2 + 1], 3);
  }
  send_tree(s, s.dyn_ltree, lcodes - 1);
  send_tree(s, s.dyn_dtree, dcodes - 1);
};
var detect_data_type = (s) => {
  let block_mask = 4093624447;
  let n;
  for (n = 0; n <= 31; n++, block_mask >>>= 1) {
    if (block_mask & 1 && s.dyn_ltree[n * 2] !== 0) {
      return Z_BINARY;
    }
  }
  if (s.dyn_ltree[9 * 2] !== 0 || s.dyn_ltree[10 * 2] !== 0 || s.dyn_ltree[13 * 2] !== 0) {
    return Z_TEXT;
  }
  for (n = 32; n < LITERALS$1; n++) {
    if (s.dyn_ltree[n * 2] !== 0) {
      return Z_TEXT;
    }
  }
  return Z_BINARY;
};
var static_init_done = false;
var _tr_init$1 = (s) => {
  if (!static_init_done) {
    tr_static_init();
    static_init_done = true;
  }
  s.l_desc = new TreeDesc(s.dyn_ltree, static_l_desc);
  s.d_desc = new TreeDesc(s.dyn_dtree, static_d_desc);
  s.bl_desc = new TreeDesc(s.bl_tree, static_bl_desc);
  s.bi_buf = 0;
  s.bi_valid = 0;
  init_block(s);
};
var _tr_stored_block$1 = (s, buf, stored_len, last) => {
  send_bits(s, (STORED_BLOCK << 1) + (last ? 1 : 0), 3);
  bi_windup(s);
  put_short(s, stored_len);
  put_short(s, ~stored_len);
  if (stored_len) {
    s.pending_buf.set(s.window.subarray(buf, buf + stored_len), s.pending);
  }
  s.pending += stored_len;
};
var _tr_align$1 = (s) => {
  send_bits(s, STATIC_TREES << 1, 3);
  send_code(s, END_BLOCK, static_ltree);
  bi_flush(s);
};
var _tr_flush_block$1 = (s, buf, stored_len, last) => {
  let opt_lenb, static_lenb;
  let max_blindex = 0;
  if (s.level > 0) {
    if (s.strm.data_type === Z_UNKNOWN$1) {
      s.strm.data_type = detect_data_type(s);
    }
    build_tree(s, s.l_desc);
    build_tree(s, s.d_desc);
    max_blindex = build_bl_tree(s);
    opt_lenb = s.opt_len + 3 + 7 >>> 3;
    static_lenb = s.static_len + 3 + 7 >>> 3;
    if (static_lenb <= opt_lenb) {
      opt_lenb = static_lenb;
    }
  } else {
    opt_lenb = static_lenb = stored_len + 5;
  }
  if (stored_len + 4 <= opt_lenb && buf !== -1) {
    _tr_stored_block$1(s, buf, stored_len, last);
  } else if (s.strategy === Z_FIXED$1 || static_lenb === opt_lenb) {
    send_bits(s, (STATIC_TREES << 1) + (last ? 1 : 0), 3);
    compress_block(s, static_ltree, static_dtree);
  } else {
    send_bits(s, (DYN_TREES << 1) + (last ? 1 : 0), 3);
    send_all_trees(s, s.l_desc.max_code + 1, s.d_desc.max_code + 1, max_blindex + 1);
    compress_block(s, s.dyn_ltree, s.dyn_dtree);
  }
  init_block(s);
  if (last) {
    bi_windup(s);
  }
};
var _tr_tally$1 = (s, dist, lc) => {
  s.pending_buf[s.sym_buf + s.sym_next++] = dist;
  s.pending_buf[s.sym_buf + s.sym_next++] = dist >> 8;
  s.pending_buf[s.sym_buf + s.sym_next++] = lc;
  if (dist === 0) {
    s.dyn_ltree[lc * 2]++;
  } else {
    s.matches++;
    dist--;
    s.dyn_ltree[(_length_code[lc] + LITERALS$1 + 1) * 2]++;
    s.dyn_dtree[d_code(dist) * 2]++;
  }
  return s.sym_next === s.sym_end;
};
var _tr_init_1 = _tr_init$1;
var _tr_stored_block_1 = _tr_stored_block$1;
var _tr_flush_block_1 = _tr_flush_block$1;
var _tr_tally_1 = _tr_tally$1;
var _tr_align_1 = _tr_align$1;
var trees = {
  _tr_init: _tr_init_1,
  _tr_stored_block: _tr_stored_block_1,
  _tr_flush_block: _tr_flush_block_1,
  _tr_tally: _tr_tally_1,
  _tr_align: _tr_align_1
};
var adler32 = (adler, buf, len, pos) => {
  let s1 = adler & 65535 | 0, s2 = adler >>> 16 & 65535 | 0, n = 0;
  while (len !== 0) {
    n = len > 2e3 ? 2e3 : len;
    len -= n;
    do {
      s1 = s1 + buf[pos++] | 0;
      s2 = s2 + s1 | 0;
    } while (--n);
    s1 %= 65521;
    s2 %= 65521;
  }
  return s1 | s2 << 16 | 0;
};
var adler32_1 = adler32;
var makeTable = () => {
  let c, table = [];
  for (var n = 0; n < 256; n++) {
    c = n;
    for (var k = 0; k < 8; k++) {
      c = c & 1 ? 3988292384 ^ c >>> 1 : c >>> 1;
    }
    table[n] = c;
  }
  return table;
};
var crcTable = new Uint32Array(makeTable());
var crc32 = (crc, buf, len, pos) => {
  const t = crcTable;
  const end = pos + len;
  crc ^= -1;
  for (let i = pos; i < end; i++) {
    crc = crc >>> 8 ^ t[(crc ^ buf[i]) & 255];
  }
  return crc ^ -1;
};
var crc32_1 = crc32;
var messages = {
  2: "need dictionary",
  /* Z_NEED_DICT       2  */
  1: "stream end",
  /* Z_STREAM_END      1  */
  0: "",
  /* Z_OK              0  */
  "-1": "file error",
  /* Z_ERRNO         (-1) */
  "-2": "stream error",
  /* Z_STREAM_ERROR  (-2) */
  "-3": "data error",
  /* Z_DATA_ERROR    (-3) */
  "-4": "insufficient memory",
  /* Z_MEM_ERROR     (-4) */
  "-5": "buffer error",
  /* Z_BUF_ERROR     (-5) */
  "-6": "incompatible version"
  /* Z_VERSION_ERROR (-6) */
};
var constants$2 = {
  /* Allowed flush values; see deflate() and inflate() below for details */
  Z_NO_FLUSH: 0,
  Z_PARTIAL_FLUSH: 1,
  Z_SYNC_FLUSH: 2,
  Z_FULL_FLUSH: 3,
  Z_FINISH: 4,
  Z_BLOCK: 5,
  Z_TREES: 6,
  /* Return codes for the compression/decompression functions. Negative values
  * are errors, positive values are used for special but normal events.
  */
  Z_OK: 0,
  Z_STREAM_END: 1,
  Z_NEED_DICT: 2,
  Z_ERRNO: -1,
  Z_STREAM_ERROR: -2,
  Z_DATA_ERROR: -3,
  Z_MEM_ERROR: -4,
  Z_BUF_ERROR: -5,
  //Z_VERSION_ERROR: -6,
  /* compression levels */
  Z_NO_COMPRESSION: 0,
  Z_BEST_SPEED: 1,
  Z_BEST_COMPRESSION: 9,
  Z_DEFAULT_COMPRESSION: -1,
  Z_FILTERED: 1,
  Z_HUFFMAN_ONLY: 2,
  Z_RLE: 3,
  Z_FIXED: 4,
  Z_DEFAULT_STRATEGY: 0,
  /* Possible values of the data_type field (though see inflate()) */
  Z_BINARY: 0,
  Z_TEXT: 1,
  //Z_ASCII:                1, // = Z_TEXT (deprecated)
  Z_UNKNOWN: 2,
  /* The deflate compression method */
  Z_DEFLATED: 8
  //Z_NULL:                 null // Use -1 or null inline, depending on var type
};
var { _tr_init, _tr_stored_block, _tr_flush_block, _tr_tally, _tr_align } = trees;
var {
  Z_NO_FLUSH: Z_NO_FLUSH$2,
  Z_PARTIAL_FLUSH,
  Z_FULL_FLUSH: Z_FULL_FLUSH$1,
  Z_FINISH: Z_FINISH$3,
  Z_BLOCK: Z_BLOCK$1,
  Z_OK: Z_OK$3,
  Z_STREAM_END: Z_STREAM_END$3,
  Z_STREAM_ERROR: Z_STREAM_ERROR$2,
  Z_DATA_ERROR: Z_DATA_ERROR$2,
  Z_BUF_ERROR: Z_BUF_ERROR$1,
  Z_DEFAULT_COMPRESSION: Z_DEFAULT_COMPRESSION$1,
  Z_FILTERED,
  Z_HUFFMAN_ONLY,
  Z_RLE,
  Z_FIXED,
  Z_DEFAULT_STRATEGY: Z_DEFAULT_STRATEGY$1,
  Z_UNKNOWN,
  Z_DEFLATED: Z_DEFLATED$2
} = constants$2;
var MAX_MEM_LEVEL = 9;
var MAX_WBITS$1 = 15;
var DEF_MEM_LEVEL = 8;
var LENGTH_CODES = 29;
var LITERALS = 256;
var L_CODES = LITERALS + 1 + LENGTH_CODES;
var D_CODES = 30;
var BL_CODES = 19;
var HEAP_SIZE = 2 * L_CODES + 1;
var MAX_BITS = 15;
var MIN_MATCH = 3;
var MAX_MATCH = 258;
var MIN_LOOKAHEAD = MAX_MATCH + MIN_MATCH + 1;
var PRESET_DICT = 32;
var INIT_STATE = 42;
var GZIP_STATE = 57;
var EXTRA_STATE = 69;
var NAME_STATE = 73;
var COMMENT_STATE = 91;
var HCRC_STATE = 103;
var BUSY_STATE = 113;
var FINISH_STATE = 666;
var BS_NEED_MORE = 1;
var BS_BLOCK_DONE = 2;
var BS_FINISH_STARTED = 3;
var BS_FINISH_DONE = 4;
var OS_CODE = 3;
var err = (strm, errorCode) => {
  strm.msg = messages[errorCode];
  return errorCode;
};
var rank = (f) => {
  return f * 2 - (f > 4 ? 9 : 0);
};
var zero = (buf) => {
  let len = buf.length;
  while (--len >= 0) {
    buf[len] = 0;
  }
};
var slide_hash = (s) => {
  let n, m;
  let p;
  let wsize = s.w_size;
  n = s.hash_size;
  p = n;
  do {
    m = s.head[--p];
    s.head[p] = m >= wsize ? m - wsize : 0;
  } while (--n);
  n = wsize;
  p = n;
  do {
    m = s.prev[--p];
    s.prev[p] = m >= wsize ? m - wsize : 0;
  } while (--n);
};
var HASH_ZLIB = (s, prev, data) => (prev << s.hash_shift ^ data) & s.hash_mask;
var HASH = HASH_ZLIB;
var flush_pending = (strm) => {
  const s = strm.state;
  let len = s.pending;
  if (len > strm.avail_out) {
    len = strm.avail_out;
  }
  if (len === 0) {
    return;
  }
  strm.output.set(s.pending_buf.subarray(s.pending_out, s.pending_out + len), strm.next_out);
  strm.next_out += len;
  s.pending_out += len;
  strm.total_out += len;
  strm.avail_out -= len;
  s.pending -= len;
  if (s.pending === 0) {
    s.pending_out = 0;
  }
};
var flush_block_only = (s, last) => {
  _tr_flush_block(s, s.block_start >= 0 ? s.block_start : -1, s.strstart - s.block_start, last);
  s.block_start = s.strstart;
  flush_pending(s.strm);
};
var put_byte = (s, b) => {
  s.pending_buf[s.pending++] = b;
};
var putShortMSB = (s, b) => {
  s.pending_buf[s.pending++] = b >>> 8 & 255;
  s.pending_buf[s.pending++] = b & 255;
};
var read_buf = (strm, buf, start, size) => {
  let len = strm.avail_in;
  if (len > size) {
    len = size;
  }
  if (len === 0) {
    return 0;
  }
  strm.avail_in -= len;
  buf.set(strm.input.subarray(strm.next_in, strm.next_in + len), start);
  if (strm.state.wrap === 1) {
    strm.adler = adler32_1(strm.adler, buf, len, start);
  } else if (strm.state.wrap === 2) {
    strm.adler = crc32_1(strm.adler, buf, len, start);
  }
  strm.next_in += len;
  strm.total_in += len;
  return len;
};
var longest_match = (s, cur_match) => {
  let chain_length = s.max_chain_length;
  let scan = s.strstart;
  let match;
  let len;
  let best_len = s.prev_length;
  let nice_match = s.nice_match;
  const limit = s.strstart > s.w_size - MIN_LOOKAHEAD ? s.strstart - (s.w_size - MIN_LOOKAHEAD) : 0;
  const _win = s.window;
  const wmask = s.w_mask;
  const prev = s.prev;
  const strend = s.strstart + MAX_MATCH;
  let scan_end1 = _win[scan + best_len - 1];
  let scan_end = _win[scan + best_len];
  if (s.prev_length >= s.good_match) {
    chain_length >>= 2;
  }
  if (nice_match > s.lookahead) {
    nice_match = s.lookahead;
  }
  do {
    match = cur_match;
    if (_win[match + best_len] !== scan_end || _win[match + best_len - 1] !== scan_end1 || _win[match] !== _win[scan] || _win[++match] !== _win[scan + 1]) {
      continue;
    }
    scan += 2;
    match++;
    do {
    } while (_win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && scan < strend);
    len = MAX_MATCH - (strend - scan);
    scan = strend - MAX_MATCH;
    if (len > best_len) {
      s.match_start = cur_match;
      best_len = len;
      if (len >= nice_match) {
        break;
      }
      scan_end1 = _win[scan + best_len - 1];
      scan_end = _win[scan + best_len];
    }
  } while ((cur_match = prev[cur_match & wmask]) > limit && --chain_length !== 0);
  if (best_len <= s.lookahead) {
    return best_len;
  }
  return s.lookahead;
};
var fill_window = (s) => {
  const _w_size = s.w_size;
  let n, more, str;
  do {
    more = s.window_size - s.lookahead - s.strstart;
    if (s.strstart >= _w_size + (_w_size - MIN_LOOKAHEAD)) {
      s.window.set(s.window.subarray(_w_size, _w_size + _w_size - more), 0);
      s.match_start -= _w_size;
      s.strstart -= _w_size;
      s.block_start -= _w_size;
      if (s.insert > s.strstart) {
        s.insert = s.strstart;
      }
      slide_hash(s);
      more += _w_size;
    }
    if (s.strm.avail_in === 0) {
      break;
    }
    n = read_buf(s.strm, s.window, s.strstart + s.lookahead, more);
    s.lookahead += n;
    if (s.lookahead + s.insert >= MIN_MATCH) {
      str = s.strstart - s.insert;
      s.ins_h = s.window[str];
      s.ins_h = HASH(s, s.ins_h, s.window[str + 1]);
      while (s.insert) {
        s.ins_h = HASH(s, s.ins_h, s.window[str + MIN_MATCH - 1]);
        s.prev[str & s.w_mask] = s.head[s.ins_h];
        s.head[s.ins_h] = str;
        str++;
        s.insert--;
        if (s.lookahead + s.insert < MIN_MATCH) {
          break;
        }
      }
    }
  } while (s.lookahead < MIN_LOOKAHEAD && s.strm.avail_in !== 0);
};
var deflate_stored = (s, flush) => {
  let min_block = s.pending_buf_size - 5 > s.w_size ? s.w_size : s.pending_buf_size - 5;
  let len, left, have, last = 0;
  let used = s.strm.avail_in;
  do {
    len = 65535;
    have = s.bi_valid + 42 >> 3;
    if (s.strm.avail_out < have) {
      break;
    }
    have = s.strm.avail_out - have;
    left = s.strstart - s.block_start;
    if (len > left + s.strm.avail_in) {
      len = left + s.strm.avail_in;
    }
    if (len > have) {
      len = have;
    }
    if (len < min_block && (len === 0 && flush !== Z_FINISH$3 || flush === Z_NO_FLUSH$2 || len !== left + s.strm.avail_in)) {
      break;
    }
    last = flush === Z_FINISH$3 && len === left + s.strm.avail_in ? 1 : 0;
    _tr_stored_block(s, 0, 0, last);
    s.pending_buf[s.pending - 4] = len;
    s.pending_buf[s.pending - 3] = len >> 8;
    s.pending_buf[s.pending - 2] = ~len;
    s.pending_buf[s.pending - 1] = ~len >> 8;
    flush_pending(s.strm);
    if (left) {
      if (left > len) {
        left = len;
      }
      s.strm.output.set(s.window.subarray(s.block_start, s.block_start + left), s.strm.next_out);
      s.strm.next_out += left;
      s.strm.avail_out -= left;
      s.strm.total_out += left;
      s.block_start += left;
      len -= left;
    }
    if (len) {
      read_buf(s.strm, s.strm.output, s.strm.next_out, len);
      s.strm.next_out += len;
      s.strm.avail_out -= len;
      s.strm.total_out += len;
    }
  } while (last === 0);
  used -= s.strm.avail_in;
  if (used) {
    if (used >= s.w_size) {
      s.matches = 2;
      s.window.set(s.strm.input.subarray(s.strm.next_in - s.w_size, s.strm.next_in), 0);
      s.strstart = s.w_size;
      s.insert = s.strstart;
    } else {
      if (s.window_size - s.strstart <= used) {
        s.strstart -= s.w_size;
        s.window.set(s.window.subarray(s.w_size, s.w_size + s.strstart), 0);
        if (s.matches < 2) {
          s.matches++;
        }
        if (s.insert > s.strstart) {
          s.insert = s.strstart;
        }
      }
      s.window.set(s.strm.input.subarray(s.strm.next_in - used, s.strm.next_in), s.strstart);
      s.strstart += used;
      s.insert += used > s.w_size - s.insert ? s.w_size - s.insert : used;
    }
    s.block_start = s.strstart;
  }
  if (s.high_water < s.strstart) {
    s.high_water = s.strstart;
  }
  if (last) {
    return BS_FINISH_DONE;
  }
  if (flush !== Z_NO_FLUSH$2 && flush !== Z_FINISH$3 && s.strm.avail_in === 0 && s.strstart === s.block_start) {
    return BS_BLOCK_DONE;
  }
  have = s.window_size - s.strstart;
  if (s.strm.avail_in > have && s.block_start >= s.w_size) {
    s.block_start -= s.w_size;
    s.strstart -= s.w_size;
    s.window.set(s.window.subarray(s.w_size, s.w_size + s.strstart), 0);
    if (s.matches < 2) {
      s.matches++;
    }
    have += s.w_size;
    if (s.insert > s.strstart) {
      s.insert = s.strstart;
    }
  }
  if (have > s.strm.avail_in) {
    have = s.strm.avail_in;
  }
  if (have) {
    read_buf(s.strm, s.window, s.strstart, have);
    s.strstart += have;
    s.insert += have > s.w_size - s.insert ? s.w_size - s.insert : have;
  }
  if (s.high_water < s.strstart) {
    s.high_water = s.strstart;
  }
  have = s.bi_valid + 42 >> 3;
  have = s.pending_buf_size - have > 65535 ? 65535 : s.pending_buf_size - have;
  min_block = have > s.w_size ? s.w_size : have;
  left = s.strstart - s.block_start;
  if (left >= min_block || (left || flush === Z_FINISH$3) && flush !== Z_NO_FLUSH$2 && s.strm.avail_in === 0 && left <= have) {
    len = left > have ? have : left;
    last = flush === Z_FINISH$3 && s.strm.avail_in === 0 && len === left ? 1 : 0;
    _tr_stored_block(s, s.block_start, len, last);
    s.block_start += len;
    flush_pending(s.strm);
  }
  return last ? BS_FINISH_STARTED : BS_NEED_MORE;
};
var deflate_fast = (s, flush) => {
  let hash_head;
  let bflush;
  for (; ; ) {
    if (s.lookahead < MIN_LOOKAHEAD) {
      fill_window(s);
      if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH$2) {
        return BS_NEED_MORE;
      }
      if (s.lookahead === 0) {
        break;
      }
    }
    hash_head = 0;
    if (s.lookahead >= MIN_MATCH) {
      s.ins_h = HASH(s, s.ins_h, s.window[s.strstart + MIN_MATCH - 1]);
      hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
      s.head[s.ins_h] = s.strstart;
    }
    if (hash_head !== 0 && s.strstart - hash_head <= s.w_size - MIN_LOOKAHEAD) {
      s.match_length = longest_match(s, hash_head);
    }
    if (s.match_length >= MIN_MATCH) {
      bflush = _tr_tally(s, s.strstart - s.match_start, s.match_length - MIN_MATCH);
      s.lookahead -= s.match_length;
      if (s.match_length <= s.max_lazy_match && s.lookahead >= MIN_MATCH) {
        s.match_length--;
        do {
          s.strstart++;
          s.ins_h = HASH(s, s.ins_h, s.window[s.strstart + MIN_MATCH - 1]);
          hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
          s.head[s.ins_h] = s.strstart;
        } while (--s.match_length !== 0);
        s.strstart++;
      } else {
        s.strstart += s.match_length;
        s.match_length = 0;
        s.ins_h = s.window[s.strstart];
        s.ins_h = HASH(s, s.ins_h, s.window[s.strstart + 1]);
      }
    } else {
      bflush = _tr_tally(s, 0, s.window[s.strstart]);
      s.lookahead--;
      s.strstart++;
    }
    if (bflush) {
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    }
  }
  s.insert = s.strstart < MIN_MATCH - 1 ? s.strstart : MIN_MATCH - 1;
  if (flush === Z_FINISH$3) {
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    return BS_FINISH_DONE;
  }
  if (s.sym_next) {
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
  }
  return BS_BLOCK_DONE;
};
var deflate_slow = (s, flush) => {
  let hash_head;
  let bflush;
  let max_insert;
  for (; ; ) {
    if (s.lookahead < MIN_LOOKAHEAD) {
      fill_window(s);
      if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH$2) {
        return BS_NEED_MORE;
      }
      if (s.lookahead === 0) {
        break;
      }
    }
    hash_head = 0;
    if (s.lookahead >= MIN_MATCH) {
      s.ins_h = HASH(s, s.ins_h, s.window[s.strstart + MIN_MATCH - 1]);
      hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
      s.head[s.ins_h] = s.strstart;
    }
    s.prev_length = s.match_length;
    s.prev_match = s.match_start;
    s.match_length = MIN_MATCH - 1;
    if (hash_head !== 0 && s.prev_length < s.max_lazy_match && s.strstart - hash_head <= s.w_size - MIN_LOOKAHEAD) {
      s.match_length = longest_match(s, hash_head);
      if (s.match_length <= 5 && (s.strategy === Z_FILTERED || s.match_length === MIN_MATCH && s.strstart - s.match_start > 4096)) {
        s.match_length = MIN_MATCH - 1;
      }
    }
    if (s.prev_length >= MIN_MATCH && s.match_length <= s.prev_length) {
      max_insert = s.strstart + s.lookahead - MIN_MATCH;
      bflush = _tr_tally(s, s.strstart - 1 - s.prev_match, s.prev_length - MIN_MATCH);
      s.lookahead -= s.prev_length - 1;
      s.prev_length -= 2;
      do {
        if (++s.strstart <= max_insert) {
          s.ins_h = HASH(s, s.ins_h, s.window[s.strstart + MIN_MATCH - 1]);
          hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
          s.head[s.ins_h] = s.strstart;
        }
      } while (--s.prev_length !== 0);
      s.match_available = 0;
      s.match_length = MIN_MATCH - 1;
      s.strstart++;
      if (bflush) {
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
      }
    } else if (s.match_available) {
      bflush = _tr_tally(s, 0, s.window[s.strstart - 1]);
      if (bflush) {
        flush_block_only(s, false);
      }
      s.strstart++;
      s.lookahead--;
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    } else {
      s.match_available = 1;
      s.strstart++;
      s.lookahead--;
    }
  }
  if (s.match_available) {
    bflush = _tr_tally(s, 0, s.window[s.strstart - 1]);
    s.match_available = 0;
  }
  s.insert = s.strstart < MIN_MATCH - 1 ? s.strstart : MIN_MATCH - 1;
  if (flush === Z_FINISH$3) {
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    return BS_FINISH_DONE;
  }
  if (s.sym_next) {
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
  }
  return BS_BLOCK_DONE;
};
var deflate_rle = (s, flush) => {
  let bflush;
  let prev;
  let scan, strend;
  const _win = s.window;
  for (; ; ) {
    if (s.lookahead <= MAX_MATCH) {
      fill_window(s);
      if (s.lookahead <= MAX_MATCH && flush === Z_NO_FLUSH$2) {
        return BS_NEED_MORE;
      }
      if (s.lookahead === 0) {
        break;
      }
    }
    s.match_length = 0;
    if (s.lookahead >= MIN_MATCH && s.strstart > 0) {
      scan = s.strstart - 1;
      prev = _win[scan];
      if (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan]) {
        strend = s.strstart + MAX_MATCH;
        do {
        } while (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && scan < strend);
        s.match_length = MAX_MATCH - (strend - scan);
        if (s.match_length > s.lookahead) {
          s.match_length = s.lookahead;
        }
      }
    }
    if (s.match_length >= MIN_MATCH) {
      bflush = _tr_tally(s, 1, s.match_length - MIN_MATCH);
      s.lookahead -= s.match_length;
      s.strstart += s.match_length;
      s.match_length = 0;
    } else {
      bflush = _tr_tally(s, 0, s.window[s.strstart]);
      s.lookahead--;
      s.strstart++;
    }
    if (bflush) {
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    }
  }
  s.insert = 0;
  if (flush === Z_FINISH$3) {
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    return BS_FINISH_DONE;
  }
  if (s.sym_next) {
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
  }
  return BS_BLOCK_DONE;
};
var deflate_huff = (s, flush) => {
  let bflush;
  for (; ; ) {
    if (s.lookahead === 0) {
      fill_window(s);
      if (s.lookahead === 0) {
        if (flush === Z_NO_FLUSH$2) {
          return BS_NEED_MORE;
        }
        break;
      }
    }
    s.match_length = 0;
    bflush = _tr_tally(s, 0, s.window[s.strstart]);
    s.lookahead--;
    s.strstart++;
    if (bflush) {
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    }
  }
  s.insert = 0;
  if (flush === Z_FINISH$3) {
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    return BS_FINISH_DONE;
  }
  if (s.sym_next) {
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
  }
  return BS_BLOCK_DONE;
};
function Config(good_length, max_lazy, nice_length, max_chain, func) {
  this.good_length = good_length;
  this.max_lazy = max_lazy;
  this.nice_length = nice_length;
  this.max_chain = max_chain;
  this.func = func;
}
var configuration_table = [
  /*      good lazy nice chain */
  new Config(0, 0, 0, 0, deflate_stored),
  /* 0 store only */
  new Config(4, 4, 8, 4, deflate_fast),
  /* 1 max speed, no lazy matches */
  new Config(4, 5, 16, 8, deflate_fast),
  /* 2 */
  new Config(4, 6, 32, 32, deflate_fast),
  /* 3 */
  new Config(4, 4, 16, 16, deflate_slow),
  /* 4 lazy matches */
  new Config(8, 16, 32, 32, deflate_slow),
  /* 5 */
  new Config(8, 16, 128, 128, deflate_slow),
  /* 6 */
  new Config(8, 32, 128, 256, deflate_slow),
  /* 7 */
  new Config(32, 128, 258, 1024, deflate_slow),
  /* 8 */
  new Config(32, 258, 258, 4096, deflate_slow)
  /* 9 max compression */
];
var lm_init = (s) => {
  s.window_size = 2 * s.w_size;
  zero(s.head);
  s.max_lazy_match = configuration_table[s.level].max_lazy;
  s.good_match = configuration_table[s.level].good_length;
  s.nice_match = configuration_table[s.level].nice_length;
  s.max_chain_length = configuration_table[s.level].max_chain;
  s.strstart = 0;
  s.block_start = 0;
  s.lookahead = 0;
  s.insert = 0;
  s.match_length = s.prev_length = MIN_MATCH - 1;
  s.match_available = 0;
  s.ins_h = 0;
};
function DeflateState() {
  this.strm = null;
  this.status = 0;
  this.pending_buf = null;
  this.pending_buf_size = 0;
  this.pending_out = 0;
  this.pending = 0;
  this.wrap = 0;
  this.gzhead = null;
  this.gzindex = 0;
  this.method = Z_DEFLATED$2;
  this.last_flush = -1;
  this.w_size = 0;
  this.w_bits = 0;
  this.w_mask = 0;
  this.window = null;
  this.window_size = 0;
  this.prev = null;
  this.head = null;
  this.ins_h = 0;
  this.hash_size = 0;
  this.hash_bits = 0;
  this.hash_mask = 0;
  this.hash_shift = 0;
  this.block_start = 0;
  this.match_length = 0;
  this.prev_match = 0;
  this.match_available = 0;
  this.strstart = 0;
  this.match_start = 0;
  this.lookahead = 0;
  this.prev_length = 0;
  this.max_chain_length = 0;
  this.max_lazy_match = 0;
  this.level = 0;
  this.strategy = 0;
  this.good_match = 0;
  this.nice_match = 0;
  this.dyn_ltree = new Uint16Array(HEAP_SIZE * 2);
  this.dyn_dtree = new Uint16Array((2 * D_CODES + 1) * 2);
  this.bl_tree = new Uint16Array((2 * BL_CODES + 1) * 2);
  zero(this.dyn_ltree);
  zero(this.dyn_dtree);
  zero(this.bl_tree);
  this.l_desc = null;
  this.d_desc = null;
  this.bl_desc = null;
  this.bl_count = new Uint16Array(MAX_BITS + 1);
  this.heap = new Uint16Array(2 * L_CODES + 1);
  zero(this.heap);
  this.heap_len = 0;
  this.heap_max = 0;
  this.depth = new Uint16Array(2 * L_CODES + 1);
  zero(this.depth);
  this.sym_buf = 0;
  this.lit_bufsize = 0;
  this.sym_next = 0;
  this.sym_end = 0;
  this.opt_len = 0;
  this.static_len = 0;
  this.matches = 0;
  this.insert = 0;
  this.bi_buf = 0;
  this.bi_valid = 0;
}
var deflateStateCheck = (strm) => {
  if (!strm) {
    return 1;
  }
  const s = strm.state;
  if (!s || s.strm !== strm || s.status !== INIT_STATE && //#ifdef GZIP
  s.status !== GZIP_STATE && //#endif
  s.status !== EXTRA_STATE && s.status !== NAME_STATE && s.status !== COMMENT_STATE && s.status !== HCRC_STATE && s.status !== BUSY_STATE && s.status !== FINISH_STATE) {
    return 1;
  }
  return 0;
};
var deflateResetKeep = (strm) => {
  if (deflateStateCheck(strm)) {
    return err(strm, Z_STREAM_ERROR$2);
  }
  strm.total_in = strm.total_out = 0;
  strm.data_type = Z_UNKNOWN;
  const s = strm.state;
  s.pending = 0;
  s.pending_out = 0;
  if (s.wrap < 0) {
    s.wrap = -s.wrap;
  }
  s.status = //#ifdef GZIP
  s.wrap === 2 ? GZIP_STATE : (
    //#endif
    s.wrap ? INIT_STATE : BUSY_STATE
  );
  strm.adler = s.wrap === 2 ? 0 : 1;
  s.last_flush = -2;
  _tr_init(s);
  return Z_OK$3;
};
var deflateReset = (strm) => {
  const ret = deflateResetKeep(strm);
  if (ret === Z_OK$3) {
    lm_init(strm.state);
  }
  return ret;
};
var deflateSetHeader = (strm, head) => {
  if (deflateStateCheck(strm) || strm.state.wrap !== 2) {
    return Z_STREAM_ERROR$2;
  }
  strm.state.gzhead = head;
  return Z_OK$3;
};
var deflateInit2 = (strm, level, method, windowBits, memLevel, strategy) => {
  if (!strm) {
    return Z_STREAM_ERROR$2;
  }
  let wrap = 1;
  if (level === Z_DEFAULT_COMPRESSION$1) {
    level = 6;
  }
  if (windowBits < 0) {
    wrap = 0;
    windowBits = -windowBits;
  } else if (windowBits > 15) {
    wrap = 2;
    windowBits -= 16;
  }
  if (memLevel < 1 || memLevel > MAX_MEM_LEVEL || method !== Z_DEFLATED$2 || windowBits < 8 || windowBits > 15 || level < 0 || level > 9 || strategy < 0 || strategy > Z_FIXED || windowBits === 8 && wrap !== 1) {
    return err(strm, Z_STREAM_ERROR$2);
  }
  if (windowBits === 8) {
    windowBits = 9;
  }
  const s = new DeflateState();
  strm.state = s;
  s.strm = strm;
  s.status = INIT_STATE;
  s.wrap = wrap;
  s.gzhead = null;
  s.w_bits = windowBits;
  s.w_size = 1 << s.w_bits;
  s.w_mask = s.w_size - 1;
  s.hash_bits = memLevel + 7;
  s.hash_size = 1 << s.hash_bits;
  s.hash_mask = s.hash_size - 1;
  s.hash_shift = ~~((s.hash_bits + MIN_MATCH - 1) / MIN_MATCH);
  s.window = new Uint8Array(s.w_size * 2);
  s.head = new Uint16Array(s.hash_size);
  s.prev = new Uint16Array(s.w_size);
  s.lit_bufsize = 1 << memLevel + 6;
  s.pending_buf_size = s.lit_bufsize * 4;
  s.pending_buf = new Uint8Array(s.pending_buf_size);
  s.sym_buf = s.lit_bufsize;
  s.sym_end = (s.lit_bufsize - 1) * 3;
  s.level = level;
  s.strategy = strategy;
  s.method = method;
  return deflateReset(strm);
};
var deflateInit = (strm, level) => {
  return deflateInit2(strm, level, Z_DEFLATED$2, MAX_WBITS$1, DEF_MEM_LEVEL, Z_DEFAULT_STRATEGY$1);
};
var deflate$2 = (strm, flush) => {
  if (deflateStateCheck(strm) || flush > Z_BLOCK$1 || flush < 0) {
    return strm ? err(strm, Z_STREAM_ERROR$2) : Z_STREAM_ERROR$2;
  }
  const s = strm.state;
  if (!strm.output || strm.avail_in !== 0 && !strm.input || s.status === FINISH_STATE && flush !== Z_FINISH$3) {
    return err(strm, strm.avail_out === 0 ? Z_BUF_ERROR$1 : Z_STREAM_ERROR$2);
  }
  const old_flush = s.last_flush;
  s.last_flush = flush;
  if (s.pending !== 0) {
    flush_pending(strm);
    if (strm.avail_out === 0) {
      s.last_flush = -1;
      return Z_OK$3;
    }
  } else if (strm.avail_in === 0 && rank(flush) <= rank(old_flush) && flush !== Z_FINISH$3) {
    return err(strm, Z_BUF_ERROR$1);
  }
  if (s.status === FINISH_STATE && strm.avail_in !== 0) {
    return err(strm, Z_BUF_ERROR$1);
  }
  if (s.status === INIT_STATE && s.wrap === 0) {
    s.status = BUSY_STATE;
  }
  if (s.status === INIT_STATE) {
    let header = Z_DEFLATED$2 + (s.w_bits - 8 << 4) << 8;
    let level_flags = -1;
    if (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2) {
      level_flags = 0;
    } else if (s.level < 6) {
      level_flags = 1;
    } else if (s.level === 6) {
      level_flags = 2;
    } else {
      level_flags = 3;
    }
    header |= level_flags << 6;
    if (s.strstart !== 0) {
      header |= PRESET_DICT;
    }
    header += 31 - header % 31;
    putShortMSB(s, header);
    if (s.strstart !== 0) {
      putShortMSB(s, strm.adler >>> 16);
      putShortMSB(s, strm.adler & 65535);
    }
    strm.adler = 1;
    s.status = BUSY_STATE;
    flush_pending(strm);
    if (s.pending !== 0) {
      s.last_flush = -1;
      return Z_OK$3;
    }
  }
  if (s.status === GZIP_STATE) {
    strm.adler = 0;
    put_byte(s, 31);
    put_byte(s, 139);
    put_byte(s, 8);
    if (!s.gzhead) {
      put_byte(s, 0);
      put_byte(s, 0);
      put_byte(s, 0);
      put_byte(s, 0);
      put_byte(s, 0);
      put_byte(s, s.level === 9 ? 2 : s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ? 4 : 0);
      put_byte(s, OS_CODE);
      s.status = BUSY_STATE;
      flush_pending(strm);
      if (s.pending !== 0) {
        s.last_flush = -1;
        return Z_OK$3;
      }
    } else {
      put_byte(
        s,
        (s.gzhead.text ? 1 : 0) + (s.gzhead.hcrc ? 2 : 0) + (!s.gzhead.extra ? 0 : 4) + (!s.gzhead.name ? 0 : 8) + (!s.gzhead.comment ? 0 : 16)
      );
      put_byte(s, s.gzhead.time & 255);
      put_byte(s, s.gzhead.time >> 8 & 255);
      put_byte(s, s.gzhead.time >> 16 & 255);
      put_byte(s, s.gzhead.time >> 24 & 255);
      put_byte(s, s.level === 9 ? 2 : s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ? 4 : 0);
      put_byte(s, s.gzhead.os & 255);
      if (s.gzhead.extra && s.gzhead.extra.length) {
        put_byte(s, s.gzhead.extra.length & 255);
        put_byte(s, s.gzhead.extra.length >> 8 & 255);
      }
      if (s.gzhead.hcrc) {
        strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending, 0);
      }
      s.gzindex = 0;
      s.status = EXTRA_STATE;
    }
  }
  if (s.status === EXTRA_STATE) {
    if (s.gzhead.extra) {
      let beg = s.pending;
      let left = (s.gzhead.extra.length & 65535) - s.gzindex;
      while (s.pending + left > s.pending_buf_size) {
        let copy = s.pending_buf_size - s.pending;
        s.pending_buf.set(s.gzhead.extra.subarray(s.gzindex, s.gzindex + copy), s.pending);
        s.pending = s.pending_buf_size;
        if (s.gzhead.hcrc && s.pending > beg) {
          strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
        }
        s.gzindex += copy;
        flush_pending(strm);
        if (s.pending !== 0) {
          s.last_flush = -1;
          return Z_OK$3;
        }
        beg = 0;
        left -= copy;
      }
      let gzhead_extra = new Uint8Array(s.gzhead.extra);
      s.pending_buf.set(gzhead_extra.subarray(s.gzindex, s.gzindex + left), s.pending);
      s.pending += left;
      if (s.gzhead.hcrc && s.pending > beg) {
        strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
      }
      s.gzindex = 0;
    }
    s.status = NAME_STATE;
  }
  if (s.status === NAME_STATE) {
    if (s.gzhead.name) {
      let beg = s.pending;
      let val;
      do {
        if (s.pending === s.pending_buf_size) {
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
          flush_pending(strm);
          if (s.pending !== 0) {
            s.last_flush = -1;
            return Z_OK$3;
          }
          beg = 0;
        }
        if (s.gzindex < s.gzhead.name.length) {
          val = s.gzhead.name.charCodeAt(s.gzindex++) & 255;
        } else {
          val = 0;
        }
        put_byte(s, val);
      } while (val !== 0);
      if (s.gzhead.hcrc && s.pending > beg) {
        strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
      }
      s.gzindex = 0;
    }
    s.status = COMMENT_STATE;
  }
  if (s.status === COMMENT_STATE) {
    if (s.gzhead.comment) {
      let beg = s.pending;
      let val;
      do {
        if (s.pending === s.pending_buf_size) {
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
          flush_pending(strm);
          if (s.pending !== 0) {
            s.last_flush = -1;
            return Z_OK$3;
          }
          beg = 0;
        }
        if (s.gzindex < s.gzhead.comment.length) {
          val = s.gzhead.comment.charCodeAt(s.gzindex++) & 255;
        } else {
          val = 0;
        }
        put_byte(s, val);
      } while (val !== 0);
      if (s.gzhead.hcrc && s.pending > beg) {
        strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
      }
    }
    s.status = HCRC_STATE;
  }
  if (s.status === HCRC_STATE) {
    if (s.gzhead.hcrc) {
      if (s.pending + 2 > s.pending_buf_size) {
        flush_pending(strm);
        if (s.pending !== 0) {
          s.last_flush = -1;
          return Z_OK$3;
        }
      }
      put_byte(s, strm.adler & 255);
      put_byte(s, strm.adler >> 8 & 255);
      strm.adler = 0;
    }
    s.status = BUSY_STATE;
    flush_pending(strm);
    if (s.pending !== 0) {
      s.last_flush = -1;
      return Z_OK$3;
    }
  }
  if (strm.avail_in !== 0 || s.lookahead !== 0 || flush !== Z_NO_FLUSH$2 && s.status !== FINISH_STATE) {
    let bstate = s.level === 0 ? deflate_stored(s, flush) : s.strategy === Z_HUFFMAN_ONLY ? deflate_huff(s, flush) : s.strategy === Z_RLE ? deflate_rle(s, flush) : configuration_table[s.level].func(s, flush);
    if (bstate === BS_FINISH_STARTED || bstate === BS_FINISH_DONE) {
      s.status = FINISH_STATE;
    }
    if (bstate === BS_NEED_MORE || bstate === BS_FINISH_STARTED) {
      if (strm.avail_out === 0) {
        s.last_flush = -1;
      }
      return Z_OK$3;
    }
    if (bstate === BS_BLOCK_DONE) {
      if (flush === Z_PARTIAL_FLUSH) {
        _tr_align(s);
      } else if (flush !== Z_BLOCK$1) {
        _tr_stored_block(s, 0, 0, false);
        if (flush === Z_FULL_FLUSH$1) {
          zero(s.head);
          if (s.lookahead === 0) {
            s.strstart = 0;
            s.block_start = 0;
            s.insert = 0;
          }
        }
      }
      flush_pending(strm);
      if (strm.avail_out === 0) {
        s.last_flush = -1;
        return Z_OK$3;
      }
    }
  }
  if (flush !== Z_FINISH$3) {
    return Z_OK$3;
  }
  if (s.wrap <= 0) {
    return Z_STREAM_END$3;
  }
  if (s.wrap === 2) {
    put_byte(s, strm.adler & 255);
    put_byte(s, strm.adler >> 8 & 255);
    put_byte(s, strm.adler >> 16 & 255);
    put_byte(s, strm.adler >> 24 & 255);
    put_byte(s, strm.total_in & 255);
    put_byte(s, strm.total_in >> 8 & 255);
    put_byte(s, strm.total_in >> 16 & 255);
    put_byte(s, strm.total_in >> 24 & 255);
  } else {
    putShortMSB(s, strm.adler >>> 16);
    putShortMSB(s, strm.adler & 65535);
  }
  flush_pending(strm);
  if (s.wrap > 0) {
    s.wrap = -s.wrap;
  }
  return s.pending !== 0 ? Z_OK$3 : Z_STREAM_END$3;
};
var deflateEnd = (strm) => {
  if (deflateStateCheck(strm)) {
    return Z_STREAM_ERROR$2;
  }
  const status = strm.state.status;
  strm.state = null;
  return status === BUSY_STATE ? err(strm, Z_DATA_ERROR$2) : Z_OK$3;
};
var deflateSetDictionary = (strm, dictionary) => {
  let dictLength = dictionary.length;
  if (deflateStateCheck(strm)) {
    return Z_STREAM_ERROR$2;
  }
  const s = strm.state;
  const wrap = s.wrap;
  if (wrap === 2 || wrap === 1 && s.status !== INIT_STATE || s.lookahead) {
    return Z_STREAM_ERROR$2;
  }
  if (wrap === 1) {
    strm.adler = adler32_1(strm.adler, dictionary, dictLength, 0);
  }
  s.wrap = 0;
  if (dictLength >= s.w_size) {
    if (wrap === 0) {
      zero(s.head);
      s.strstart = 0;
      s.block_start = 0;
      s.insert = 0;
    }
    let tmpDict = new Uint8Array(s.w_size);
    tmpDict.set(dictionary.subarray(dictLength - s.w_size, dictLength), 0);
    dictionary = tmpDict;
    dictLength = s.w_size;
  }
  const avail = strm.avail_in;
  const next = strm.next_in;
  const input = strm.input;
  strm.avail_in = dictLength;
  strm.next_in = 0;
  strm.input = dictionary;
  fill_window(s);
  while (s.lookahead >= MIN_MATCH) {
    let str = s.strstart;
    let n = s.lookahead - (MIN_MATCH - 1);
    do {
      s.ins_h = HASH(s, s.ins_h, s.window[str + MIN_MATCH - 1]);
      s.prev[str & s.w_mask] = s.head[s.ins_h];
      s.head[s.ins_h] = str;
      str++;
    } while (--n);
    s.strstart = str;
    s.lookahead = MIN_MATCH - 1;
    fill_window(s);
  }
  s.strstart += s.lookahead;
  s.block_start = s.strstart;
  s.insert = s.lookahead;
  s.lookahead = 0;
  s.match_length = s.prev_length = MIN_MATCH - 1;
  s.match_available = 0;
  strm.next_in = next;
  strm.input = input;
  strm.avail_in = avail;
  s.wrap = wrap;
  return Z_OK$3;
};
var deflateInit_1 = deflateInit;
var deflateInit2_1 = deflateInit2;
var deflateReset_1 = deflateReset;
var deflateResetKeep_1 = deflateResetKeep;
var deflateSetHeader_1 = deflateSetHeader;
var deflate_2$1 = deflate$2;
var deflateEnd_1 = deflateEnd;
var deflateSetDictionary_1 = deflateSetDictionary;
var deflateInfo = "pako deflate (from Nodeca project)";
var deflate_1$2 = {
  deflateInit: deflateInit_1,
  deflateInit2: deflateInit2_1,
  deflateReset: deflateReset_1,
  deflateResetKeep: deflateResetKeep_1,
  deflateSetHeader: deflateSetHeader_1,
  deflate: deflate_2$1,
  deflateEnd: deflateEnd_1,
  deflateSetDictionary: deflateSetDictionary_1,
  deflateInfo
};
var _has = (obj, key) => {
  return Object.prototype.hasOwnProperty.call(obj, key);
};
var assign = function(obj) {
  const sources = Array.prototype.slice.call(arguments, 1);
  while (sources.length) {
    const source = sources.shift();
    if (!source) {
      continue;
    }
    if (typeof source !== "object") {
      throw new TypeError(source + "must be non-object");
    }
    for (const p in source) {
      if (_has(source, p)) {
        obj[p] = source[p];
      }
    }
  }
  return obj;
};
var flattenChunks = (chunks) => {
  let len = 0;
  for (let i = 0, l = chunks.length; i < l; i++) {
    len += chunks[i].length;
  }
  const result = new Uint8Array(len);
  for (let i = 0, pos = 0, l = chunks.length; i < l; i++) {
    let chunk = chunks[i];
    result.set(chunk, pos);
    pos += chunk.length;
  }
  return result;
};
var common = {
  assign,
  flattenChunks
};
var STR_APPLY_UIA_OK = true;
try {
  String.fromCharCode.apply(null, new Uint8Array(1));
} catch (__) {
  STR_APPLY_UIA_OK = false;
}
var _utf8len = new Uint8Array(256);
for (let q = 0; q < 256; q++) {
  _utf8len[q] = q >= 252 ? 6 : q >= 248 ? 5 : q >= 240 ? 4 : q >= 224 ? 3 : q >= 192 ? 2 : 1;
}
_utf8len[254] = _utf8len[254] = 1;
var string2buf = (str) => {
  if (typeof TextEncoder === "function" && TextEncoder.prototype.encode) {
    return new TextEncoder().encode(str);
  }
  let buf, c, c2, m_pos, i, str_len = str.length, buf_len = 0;
  for (m_pos = 0; m_pos < str_len; m_pos++) {
    c = str.charCodeAt(m_pos);
    if ((c & 64512) === 55296 && m_pos + 1 < str_len) {
      c2 = str.charCodeAt(m_pos + 1);
      if ((c2 & 64512) === 56320) {
        c = 65536 + (c - 55296 << 10) + (c2 - 56320);
        m_pos++;
      }
    }
    buf_len += c < 128 ? 1 : c < 2048 ? 2 : c < 65536 ? 3 : 4;
  }
  buf = new Uint8Array(buf_len);
  for (i = 0, m_pos = 0; i < buf_len; m_pos++) {
    c = str.charCodeAt(m_pos);
    if ((c & 64512) === 55296 && m_pos + 1 < str_len) {
      c2 = str.charCodeAt(m_pos + 1);
      if ((c2 & 64512) === 56320) {
        c = 65536 + (c - 55296 << 10) + (c2 - 56320);
        m_pos++;
      }
    }
    if (c < 128) {
      buf[i++] = c;
    } else if (c < 2048) {
      buf[i++] = 192 | c >>> 6;
      buf[i++] = 128 | c & 63;
    } else if (c < 65536) {
      buf[i++] = 224 | c >>> 12;
      buf[i++] = 128 | c >>> 6 & 63;
      buf[i++] = 128 | c & 63;
    } else {
      buf[i++] = 240 | c >>> 18;
      buf[i++] = 128 | c >>> 12 & 63;
      buf[i++] = 128 | c >>> 6 & 63;
      buf[i++] = 128 | c & 63;
    }
  }
  return buf;
};
var buf2binstring = (buf, len) => {
  if (len < 65534) {
    if (buf.subarray && STR_APPLY_UIA_OK) {
      return String.fromCharCode.apply(null, buf.length === len ? buf : buf.subarray(0, len));
    }
  }
  let result = "";
  for (let i = 0; i < len; i++) {
    result += String.fromCharCode(buf[i]);
  }
  return result;
};
var buf2string = (buf, max) => {
  const len = max || buf.length;
  if (typeof TextDecoder === "function" && TextDecoder.prototype.decode) {
    return new TextDecoder().decode(buf.subarray(0, max));
  }
  let i, out;
  const utf16buf = new Array(len * 2);
  for (out = 0, i = 0; i < len; ) {
    let c = buf[i++];
    if (c < 128) {
      utf16buf[out++] = c;
      continue;
    }
    let c_len = _utf8len[c];
    if (c_len > 4) {
      utf16buf[out++] = 65533;
      i += c_len - 1;
      continue;
    }
    c &= c_len === 2 ? 31 : c_len === 3 ? 15 : 7;
    while (c_len > 1 && i < len) {
      c = c << 6 | buf[i++] & 63;
      c_len--;
    }
    if (c_len > 1) {
      utf16buf[out++] = 65533;
      continue;
    }
    if (c < 65536) {
      utf16buf[out++] = c;
    } else {
      c -= 65536;
      utf16buf[out++] = 55296 | c >> 10 & 1023;
      utf16buf[out++] = 56320 | c & 1023;
    }
  }
  return buf2binstring(utf16buf, out);
};
var utf8border = (buf, max) => {
  max = max || buf.length;
  if (max > buf.length) {
    max = buf.length;
  }
  let pos = max - 1;
  while (pos >= 0 && (buf[pos] & 192) === 128) {
    pos--;
  }
  if (pos < 0) {
    return max;
  }
  if (pos === 0) {
    return max;
  }
  return pos + _utf8len[buf[pos]] > max ? pos : max;
};
var strings = {
  string2buf,
  buf2string,
  utf8border
};
function ZStream() {
  this.input = null;
  this.next_in = 0;
  this.avail_in = 0;
  this.total_in = 0;
  this.output = null;
  this.next_out = 0;
  this.avail_out = 0;
  this.total_out = 0;
  this.msg = "";
  this.state = null;
  this.data_type = 2;
  this.adler = 0;
}
var zstream = ZStream;
var toString$1 = Object.prototype.toString;
var {
  Z_NO_FLUSH: Z_NO_FLUSH$1,
  Z_SYNC_FLUSH,
  Z_FULL_FLUSH,
  Z_FINISH: Z_FINISH$2,
  Z_OK: Z_OK$2,
  Z_STREAM_END: Z_STREAM_END$2,
  Z_DEFAULT_COMPRESSION,
  Z_DEFAULT_STRATEGY,
  Z_DEFLATED: Z_DEFLATED$1
} = constants$2;
function Deflate$1(options) {
  this.options = common.assign({
    level: Z_DEFAULT_COMPRESSION,
    method: Z_DEFLATED$1,
    chunkSize: 16384,
    windowBits: 15,
    memLevel: 8,
    strategy: Z_DEFAULT_STRATEGY
  }, options || {});
  let opt = this.options;
  if (opt.raw && opt.windowBits > 0) {
    opt.windowBits = -opt.windowBits;
  } else if (opt.gzip && opt.windowBits > 0 && opt.windowBits < 16) {
    opt.windowBits += 16;
  }
  this.err = 0;
  this.msg = "";
  this.ended = false;
  this.chunks = [];
  this.strm = new zstream();
  this.strm.avail_out = 0;
  let status = deflate_1$2.deflateInit2(
    this.strm,
    opt.level,
    opt.method,
    opt.windowBits,
    opt.memLevel,
    opt.strategy
  );
  if (status !== Z_OK$2) {
    throw new Error(messages[status]);
  }
  if (opt.header) {
    deflate_1$2.deflateSetHeader(this.strm, opt.header);
  }
  if (opt.dictionary) {
    let dict;
    if (typeof opt.dictionary === "string") {
      dict = strings.string2buf(opt.dictionary);
    } else if (toString$1.call(opt.dictionary) === "[object ArrayBuffer]") {
      dict = new Uint8Array(opt.dictionary);
    } else {
      dict = opt.dictionary;
    }
    status = deflate_1$2.deflateSetDictionary(this.strm, dict);
    if (status !== Z_OK$2) {
      throw new Error(messages[status]);
    }
    this._dict_set = true;
  }
}
Deflate$1.prototype.push = function(data, flush_mode) {
  const strm = this.strm;
  const chunkSize = this.options.chunkSize;
  let status, _flush_mode;
  if (this.ended) {
    return false;
  }
  if (flush_mode === ~~flush_mode) _flush_mode = flush_mode;
  else _flush_mode = flush_mode === true ? Z_FINISH$2 : Z_NO_FLUSH$1;
  if (typeof data === "string") {
    strm.input = strings.string2buf(data);
  } else if (toString$1.call(data) === "[object ArrayBuffer]") {
    strm.input = new Uint8Array(data);
  } else {
    strm.input = data;
  }
  strm.next_in = 0;
  strm.avail_in = strm.input.length;
  for (; ; ) {
    if (strm.avail_out === 0) {
      strm.output = new Uint8Array(chunkSize);
      strm.next_out = 0;
      strm.avail_out = chunkSize;
    }
    if ((_flush_mode === Z_SYNC_FLUSH || _flush_mode === Z_FULL_FLUSH) && strm.avail_out <= 6) {
      this.onData(strm.output.subarray(0, strm.next_out));
      strm.avail_out = 0;
      continue;
    }
    status = deflate_1$2.deflate(strm, _flush_mode);
    if (status === Z_STREAM_END$2) {
      if (strm.next_out > 0) {
        this.onData(strm.output.subarray(0, strm.next_out));
      }
      status = deflate_1$2.deflateEnd(this.strm);
      this.onEnd(status);
      this.ended = true;
      return status === Z_OK$2;
    }
    if (strm.avail_out === 0) {
      this.onData(strm.output);
      continue;
    }
    if (_flush_mode > 0 && strm.next_out > 0) {
      this.onData(strm.output.subarray(0, strm.next_out));
      strm.avail_out = 0;
      continue;
    }
    if (strm.avail_in === 0) break;
  }
  return true;
};
Deflate$1.prototype.onData = function(chunk) {
  this.chunks.push(chunk);
};
Deflate$1.prototype.onEnd = function(status) {
  if (status === Z_OK$2) {
    this.result = common.flattenChunks(this.chunks);
  }
  this.chunks = [];
  this.err = status;
  this.msg = this.strm.msg;
};
function deflate$1(input, options) {
  const deflator = new Deflate$1(options);
  deflator.push(input, true);
  if (deflator.err) {
    throw deflator.msg || messages[deflator.err];
  }
  return deflator.result;
}
function deflateRaw$1(input, options) {
  options = options || {};
  options.raw = true;
  return deflate$1(input, options);
}
function gzip$1(input, options) {
  options = options || {};
  options.gzip = true;
  return deflate$1(input, options);
}
var Deflate_1$1 = Deflate$1;
var deflate_2 = deflate$1;
var deflateRaw_1$1 = deflateRaw$1;
var gzip_1$1 = gzip$1;
var constants$1 = constants$2;
var deflate_1$1 = {
  Deflate: Deflate_1$1,
  deflate: deflate_2,
  deflateRaw: deflateRaw_1$1,
  gzip: gzip_1$1,
  constants: constants$1
};
var BAD$1 = 16209;
var TYPE$1 = 16191;
var inffast = function inflate_fast(strm, start) {
  let _in;
  let last;
  let _out;
  let beg;
  let end;
  let dmax;
  let wsize;
  let whave;
  let wnext;
  let s_window;
  let hold;
  let bits;
  let lcode;
  let dcode;
  let lmask;
  let dmask;
  let here;
  let op;
  let len;
  let dist;
  let from;
  let from_source;
  let input, output;
  const state = strm.state;
  _in = strm.next_in;
  input = strm.input;
  last = _in + (strm.avail_in - 5);
  _out = strm.next_out;
  output = strm.output;
  beg = _out - (start - strm.avail_out);
  end = _out + (strm.avail_out - 257);
  dmax = state.dmax;
  wsize = state.wsize;
  whave = state.whave;
  wnext = state.wnext;
  s_window = state.window;
  hold = state.hold;
  bits = state.bits;
  lcode = state.lencode;
  dcode = state.distcode;
  lmask = (1 << state.lenbits) - 1;
  dmask = (1 << state.distbits) - 1;
  top:
    do {
      if (bits < 15) {
        hold += input[_in++] << bits;
        bits += 8;
        hold += input[_in++] << bits;
        bits += 8;
      }
      here = lcode[hold & lmask];
      dolen:
        for (; ; ) {
          op = here >>> 24;
          hold >>>= op;
          bits -= op;
          op = here >>> 16 & 255;
          if (op === 0) {
            output[_out++] = here & 65535;
          } else if (op & 16) {
            len = here & 65535;
            op &= 15;
            if (op) {
              if (bits < op) {
                hold += input[_in++] << bits;
                bits += 8;
              }
              len += hold & (1 << op) - 1;
              hold >>>= op;
              bits -= op;
            }
            if (bits < 15) {
              hold += input[_in++] << bits;
              bits += 8;
              hold += input[_in++] << bits;
              bits += 8;
            }
            here = dcode[hold & dmask];
            dodist:
              for (; ; ) {
                op = here >>> 24;
                hold >>>= op;
                bits -= op;
                op = here >>> 16 & 255;
                if (op & 16) {
                  dist = here & 65535;
                  op &= 15;
                  if (bits < op) {
                    hold += input[_in++] << bits;
                    bits += 8;
                    if (bits < op) {
                      hold += input[_in++] << bits;
                      bits += 8;
                    }
                  }
                  dist += hold & (1 << op) - 1;
                  if (dist > dmax) {
                    strm.msg = "invalid distance too far back";
                    state.mode = BAD$1;
                    break top;
                  }
                  hold >>>= op;
                  bits -= op;
                  op = _out - beg;
                  if (dist > op) {
                    op = dist - op;
                    if (op > whave) {
                      if (state.sane) {
                        strm.msg = "invalid distance too far back";
                        state.mode = BAD$1;
                        break top;
                      }
                    }
                    from = 0;
                    from_source = s_window;
                    if (wnext === 0) {
                      from += wsize - op;
                      if (op < len) {
                        len -= op;
                        do {
                          output[_out++] = s_window[from++];
                        } while (--op);
                        from = _out - dist;
                        from_source = output;
                      }
                    } else if (wnext < op) {
                      from += wsize + wnext - op;
                      op -= wnext;
                      if (op < len) {
                        len -= op;
                        do {
                          output[_out++] = s_window[from++];
                        } while (--op);
                        from = 0;
                        if (wnext < len) {
                          op = wnext;
                          len -= op;
                          do {
                            output[_out++] = s_window[from++];
                          } while (--op);
                          from = _out - dist;
                          from_source = output;
                        }
                      }
                    } else {
                      from += wnext - op;
                      if (op < len) {
                        len -= op;
                        do {
                          output[_out++] = s_window[from++];
                        } while (--op);
                        from = _out - dist;
                        from_source = output;
                      }
                    }
                    while (len > 2) {
                      output[_out++] = from_source[from++];
                      output[_out++] = from_source[from++];
                      output[_out++] = from_source[from++];
                      len -= 3;
                    }
                    if (len) {
                      output[_out++] = from_source[from++];
                      if (len > 1) {
                        output[_out++] = from_source[from++];
                      }
                    }
                  } else {
                    from = _out - dist;
                    do {
                      output[_out++] = output[from++];
                      output[_out++] = output[from++];
                      output[_out++] = output[from++];
                      len -= 3;
                    } while (len > 2);
                    if (len) {
                      output[_out++] = output[from++];
                      if (len > 1) {
                        output[_out++] = output[from++];
                      }
                    }
                  }
                } else if ((op & 64) === 0) {
                  here = dcode[(here & 65535) + (hold & (1 << op) - 1)];
                  continue dodist;
                } else {
                  strm.msg = "invalid distance code";
                  state.mode = BAD$1;
                  break top;
                }
                break;
              }
          } else if ((op & 64) === 0) {
            here = lcode[(here & 65535) + (hold & (1 << op) - 1)];
            continue dolen;
          } else if (op & 32) {
            state.mode = TYPE$1;
            break top;
          } else {
            strm.msg = "invalid literal/length code";
            state.mode = BAD$1;
            break top;
          }
          break;
        }
    } while (_in < last && _out < end);
  len = bits >> 3;
  _in -= len;
  bits -= len << 3;
  hold &= (1 << bits) - 1;
  strm.next_in = _in;
  strm.next_out = _out;
  strm.avail_in = _in < last ? 5 + (last - _in) : 5 - (_in - last);
  strm.avail_out = _out < end ? 257 + (end - _out) : 257 - (_out - end);
  state.hold = hold;
  state.bits = bits;
  return;
};
var MAXBITS = 15;
var ENOUGH_LENS$1 = 852;
var ENOUGH_DISTS$1 = 592;
var CODES$1 = 0;
var LENS$1 = 1;
var DISTS$1 = 2;
var lbase = new Uint16Array([
  /* Length codes 257..285 base */
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  13,
  15,
  17,
  19,
  23,
  27,
  31,
  35,
  43,
  51,
  59,
  67,
  83,
  99,
  115,
  131,
  163,
  195,
  227,
  258,
  0,
  0
]);
var lext = new Uint8Array([
  /* Length codes 257..285 extra */
  16,
  16,
  16,
  16,
  16,
  16,
  16,
  16,
  17,
  17,
  17,
  17,
  18,
  18,
  18,
  18,
  19,
  19,
  19,
  19,
  20,
  20,
  20,
  20,
  21,
  21,
  21,
  21,
  16,
  72,
  78
]);
var dbase = new Uint16Array([
  /* Distance codes 0..29 base */
  1,
  2,
  3,
  4,
  5,
  7,
  9,
  13,
  17,
  25,
  33,
  49,
  65,
  97,
  129,
  193,
  257,
  385,
  513,
  769,
  1025,
  1537,
  2049,
  3073,
  4097,
  6145,
  8193,
  12289,
  16385,
  24577,
  0,
  0
]);
var dext = new Uint8Array([
  /* Distance codes 0..29 extra */
  16,
  16,
  16,
  16,
  17,
  17,
  18,
  18,
  19,
  19,
  20,
  20,
  21,
  21,
  22,
  22,
  23,
  23,
  24,
  24,
  25,
  25,
  26,
  26,
  27,
  27,
  28,
  28,
  29,
  29,
  64,
  64
]);
var inflate_table = (type, lens, lens_index, codes, table, table_index, work, opts) => {
  const bits = opts.bits;
  let len = 0;
  let sym = 0;
  let min = 0, max = 0;
  let root = 0;
  let curr = 0;
  let drop = 0;
  let left = 0;
  let used = 0;
  let huff = 0;
  let incr;
  let fill;
  let low;
  let mask;
  let next;
  let base = null;
  let match;
  const count = new Uint16Array(MAXBITS + 1);
  const offs = new Uint16Array(MAXBITS + 1);
  let extra = null;
  let here_bits, here_op, here_val;
  for (len = 0; len <= MAXBITS; len++) {
    count[len] = 0;
  }
  for (sym = 0; sym < codes; sym++) {
    count[lens[lens_index + sym]]++;
  }
  root = bits;
  for (max = MAXBITS; max >= 1; max--) {
    if (count[max] !== 0) {
      break;
    }
  }
  if (root > max) {
    root = max;
  }
  if (max === 0) {
    table[table_index++] = 1 << 24 | 64 << 16 | 0;
    table[table_index++] = 1 << 24 | 64 << 16 | 0;
    opts.bits = 1;
    return 0;
  }
  for (min = 1; min < max; min++) {
    if (count[min] !== 0) {
      break;
    }
  }
  if (root < min) {
    root = min;
  }
  left = 1;
  for (len = 1; len <= MAXBITS; len++) {
    left <<= 1;
    left -= count[len];
    if (left < 0) {
      return -1;
    }
  }
  if (left > 0 && (type === CODES$1 || max !== 1)) {
    return -1;
  }
  offs[1] = 0;
  for (len = 1; len < MAXBITS; len++) {
    offs[len + 1] = offs[len] + count[len];
  }
  for (sym = 0; sym < codes; sym++) {
    if (lens[lens_index + sym] !== 0) {
      work[offs[lens[lens_index + sym]]++] = sym;
    }
  }
  if (type === CODES$1) {
    base = extra = work;
    match = 20;
  } else if (type === LENS$1) {
    base = lbase;
    extra = lext;
    match = 257;
  } else {
    base = dbase;
    extra = dext;
    match = 0;
  }
  huff = 0;
  sym = 0;
  len = min;
  next = table_index;
  curr = root;
  drop = 0;
  low = -1;
  used = 1 << root;
  mask = used - 1;
  if (type === LENS$1 && used > ENOUGH_LENS$1 || type === DISTS$1 && used > ENOUGH_DISTS$1) {
    return 1;
  }
  for (; ; ) {
    here_bits = len - drop;
    if (work[sym] + 1 < match) {
      here_op = 0;
      here_val = work[sym];
    } else if (work[sym] >= match) {
      here_op = extra[work[sym] - match];
      here_val = base[work[sym] - match];
    } else {
      here_op = 32 + 64;
      here_val = 0;
    }
    incr = 1 << len - drop;
    fill = 1 << curr;
    min = fill;
    do {
      fill -= incr;
      table[next + (huff >> drop) + fill] = here_bits << 24 | here_op << 16 | here_val | 0;
    } while (fill !== 0);
    incr = 1 << len - 1;
    while (huff & incr) {
      incr >>= 1;
    }
    if (incr !== 0) {
      huff &= incr - 1;
      huff += incr;
    } else {
      huff = 0;
    }
    sym++;
    if (--count[len] === 0) {
      if (len === max) {
        break;
      }
      len = lens[lens_index + work[sym]];
    }
    if (len > root && (huff & mask) !== low) {
      if (drop === 0) {
        drop = root;
      }
      next += min;
      curr = len - drop;
      left = 1 << curr;
      while (curr + drop < max) {
        left -= count[curr + drop];
        if (left <= 0) {
          break;
        }
        curr++;
        left <<= 1;
      }
      used += 1 << curr;
      if (type === LENS$1 && used > ENOUGH_LENS$1 || type === DISTS$1 && used > ENOUGH_DISTS$1) {
        return 1;
      }
      low = huff & mask;
      table[low] = root << 24 | curr << 16 | next - table_index | 0;
    }
  }
  if (huff !== 0) {
    table[next + huff] = len - drop << 24 | 64 << 16 | 0;
  }
  opts.bits = root;
  return 0;
};
var inftrees = inflate_table;
var CODES = 0;
var LENS = 1;
var DISTS = 2;
var {
  Z_FINISH: Z_FINISH$1,
  Z_BLOCK,
  Z_TREES,
  Z_OK: Z_OK$1,
  Z_STREAM_END: Z_STREAM_END$1,
  Z_NEED_DICT: Z_NEED_DICT$1,
  Z_STREAM_ERROR: Z_STREAM_ERROR$1,
  Z_DATA_ERROR: Z_DATA_ERROR$1,
  Z_MEM_ERROR: Z_MEM_ERROR$1,
  Z_BUF_ERROR,
  Z_DEFLATED
} = constants$2;
var HEAD = 16180;
var FLAGS = 16181;
var TIME = 16182;
var OS = 16183;
var EXLEN = 16184;
var EXTRA = 16185;
var NAME = 16186;
var COMMENT = 16187;
var HCRC = 16188;
var DICTID = 16189;
var DICT = 16190;
var TYPE = 16191;
var TYPEDO = 16192;
var STORED = 16193;
var COPY_ = 16194;
var COPY = 16195;
var TABLE = 16196;
var LENLENS = 16197;
var CODELENS = 16198;
var LEN_ = 16199;
var LEN = 16200;
var LENEXT = 16201;
var DIST = 16202;
var DISTEXT = 16203;
var MATCH = 16204;
var LIT = 16205;
var CHECK = 16206;
var LENGTH = 16207;
var DONE = 16208;
var BAD = 16209;
var MEM = 16210;
var SYNC = 16211;
var ENOUGH_LENS = 852;
var ENOUGH_DISTS = 592;
var MAX_WBITS = 15;
var DEF_WBITS = MAX_WBITS;
var zswap32 = (q) => {
  return (q >>> 24 & 255) + (q >>> 8 & 65280) + ((q & 65280) << 8) + ((q & 255) << 24);
};
function InflateState() {
  this.strm = null;
  this.mode = 0;
  this.last = false;
  this.wrap = 0;
  this.havedict = false;
  this.flags = 0;
  this.dmax = 0;
  this.check = 0;
  this.total = 0;
  this.head = null;
  this.wbits = 0;
  this.wsize = 0;
  this.whave = 0;
  this.wnext = 0;
  this.window = null;
  this.hold = 0;
  this.bits = 0;
  this.length = 0;
  this.offset = 0;
  this.extra = 0;
  this.lencode = null;
  this.distcode = null;
  this.lenbits = 0;
  this.distbits = 0;
  this.ncode = 0;
  this.nlen = 0;
  this.ndist = 0;
  this.have = 0;
  this.next = null;
  this.lens = new Uint16Array(320);
  this.work = new Uint16Array(288);
  this.lendyn = null;
  this.distdyn = null;
  this.sane = 0;
  this.back = 0;
  this.was = 0;
}
var inflateStateCheck = (strm) => {
  if (!strm) {
    return 1;
  }
  const state = strm.state;
  if (!state || state.strm !== strm || state.mode < HEAD || state.mode > SYNC) {
    return 1;
  }
  return 0;
};
var inflateResetKeep = (strm) => {
  if (inflateStateCheck(strm)) {
    return Z_STREAM_ERROR$1;
  }
  const state = strm.state;
  strm.total_in = strm.total_out = state.total = 0;
  strm.msg = "";
  if (state.wrap) {
    strm.adler = state.wrap & 1;
  }
  state.mode = HEAD;
  state.last = 0;
  state.havedict = 0;
  state.flags = -1;
  state.dmax = 32768;
  state.head = null;
  state.hold = 0;
  state.bits = 0;
  state.lencode = state.lendyn = new Int32Array(ENOUGH_LENS);
  state.distcode = state.distdyn = new Int32Array(ENOUGH_DISTS);
  state.sane = 1;
  state.back = -1;
  return Z_OK$1;
};
var inflateReset = (strm) => {
  if (inflateStateCheck(strm)) {
    return Z_STREAM_ERROR$1;
  }
  const state = strm.state;
  state.wsize = 0;
  state.whave = 0;
  state.wnext = 0;
  return inflateResetKeep(strm);
};
var inflateReset2 = (strm, windowBits) => {
  let wrap;
  if (inflateStateCheck(strm)) {
    return Z_STREAM_ERROR$1;
  }
  const state = strm.state;
  if (windowBits < 0) {
    wrap = 0;
    windowBits = -windowBits;
  } else {
    wrap = (windowBits >> 4) + 5;
    if (windowBits < 48) {
      windowBits &= 15;
    }
  }
  if (windowBits && (windowBits < 8 || windowBits > 15)) {
    return Z_STREAM_ERROR$1;
  }
  if (state.window !== null && state.wbits !== windowBits) {
    state.window = null;
  }
  state.wrap = wrap;
  state.wbits = windowBits;
  return inflateReset(strm);
};
var inflateInit2 = (strm, windowBits) => {
  if (!strm) {
    return Z_STREAM_ERROR$1;
  }
  const state = new InflateState();
  strm.state = state;
  state.strm = strm;
  state.window = null;
  state.mode = HEAD;
  const ret = inflateReset2(strm, windowBits);
  if (ret !== Z_OK$1) {
    strm.state = null;
  }
  return ret;
};
var inflateInit = (strm) => {
  return inflateInit2(strm, DEF_WBITS);
};
var virgin = true;
var lenfix;
var distfix;
var fixedtables = (state) => {
  if (virgin) {
    lenfix = new Int32Array(512);
    distfix = new Int32Array(32);
    let sym = 0;
    while (sym < 144) {
      state.lens[sym++] = 8;
    }
    while (sym < 256) {
      state.lens[sym++] = 9;
    }
    while (sym < 280) {
      state.lens[sym++] = 7;
    }
    while (sym < 288) {
      state.lens[sym++] = 8;
    }
    inftrees(LENS, state.lens, 0, 288, lenfix, 0, state.work, { bits: 9 });
    sym = 0;
    while (sym < 32) {
      state.lens[sym++] = 5;
    }
    inftrees(DISTS, state.lens, 0, 32, distfix, 0, state.work, { bits: 5 });
    virgin = false;
  }
  state.lencode = lenfix;
  state.lenbits = 9;
  state.distcode = distfix;
  state.distbits = 5;
};
var updatewindow = (strm, src, end, copy) => {
  let dist;
  const state = strm.state;
  if (state.window === null) {
    state.wsize = 1 << state.wbits;
    state.wnext = 0;
    state.whave = 0;
    state.window = new Uint8Array(state.wsize);
  }
  if (copy >= state.wsize) {
    state.window.set(src.subarray(end - state.wsize, end), 0);
    state.wnext = 0;
    state.whave = state.wsize;
  } else {
    dist = state.wsize - state.wnext;
    if (dist > copy) {
      dist = copy;
    }
    state.window.set(src.subarray(end - copy, end - copy + dist), state.wnext);
    copy -= dist;
    if (copy) {
      state.window.set(src.subarray(end - copy, end), 0);
      state.wnext = copy;
      state.whave = state.wsize;
    } else {
      state.wnext += dist;
      if (state.wnext === state.wsize) {
        state.wnext = 0;
      }
      if (state.whave < state.wsize) {
        state.whave += dist;
      }
    }
  }
  return 0;
};
var inflate$2 = (strm, flush) => {
  let state;
  let input, output;
  let next;
  let put;
  let have, left;
  let hold;
  let bits;
  let _in, _out;
  let copy;
  let from;
  let from_source;
  let here = 0;
  let here_bits, here_op, here_val;
  let last_bits, last_op, last_val;
  let len;
  let ret;
  const hbuf = new Uint8Array(4);
  let opts;
  let n;
  const order = (
    /* permutation of code lengths */
    new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15])
  );
  if (inflateStateCheck(strm) || !strm.output || !strm.input && strm.avail_in !== 0) {
    return Z_STREAM_ERROR$1;
  }
  state = strm.state;
  if (state.mode === TYPE) {
    state.mode = TYPEDO;
  }
  put = strm.next_out;
  output = strm.output;
  left = strm.avail_out;
  next = strm.next_in;
  input = strm.input;
  have = strm.avail_in;
  hold = state.hold;
  bits = state.bits;
  _in = have;
  _out = left;
  ret = Z_OK$1;
  inf_leave:
    for (; ; ) {
      switch (state.mode) {
        case HEAD:
          if (state.wrap === 0) {
            state.mode = TYPEDO;
            break;
          }
          while (bits < 16) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          if (state.wrap & 2 && hold === 35615) {
            if (state.wbits === 0) {
              state.wbits = 15;
            }
            state.check = 0;
            hbuf[0] = hold & 255;
            hbuf[1] = hold >>> 8 & 255;
            state.check = crc32_1(state.check, hbuf, 2, 0);
            hold = 0;
            bits = 0;
            state.mode = FLAGS;
            break;
          }
          if (state.head) {
            state.head.done = false;
          }
          if (!(state.wrap & 1) || /* check if zlib header allowed */
          (((hold & 255) << 8) + (hold >> 8)) % 31) {
            strm.msg = "incorrect header check";
            state.mode = BAD;
            break;
          }
          if ((hold & 15) !== Z_DEFLATED) {
            strm.msg = "unknown compression method";
            state.mode = BAD;
            break;
          }
          hold >>>= 4;
          bits -= 4;
          len = (hold & 15) + 8;
          if (state.wbits === 0) {
            state.wbits = len;
          }
          if (len > 15 || len > state.wbits) {
            strm.msg = "invalid window size";
            state.mode = BAD;
            break;
          }
          state.dmax = 1 << state.wbits;
          state.flags = 0;
          strm.adler = state.check = 1;
          state.mode = hold & 512 ? DICTID : TYPE;
          hold = 0;
          bits = 0;
          break;
        case FLAGS:
          while (bits < 16) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          state.flags = hold;
          if ((state.flags & 255) !== Z_DEFLATED) {
            strm.msg = "unknown compression method";
            state.mode = BAD;
            break;
          }
          if (state.flags & 57344) {
            strm.msg = "unknown header flags set";
            state.mode = BAD;
            break;
          }
          if (state.head) {
            state.head.text = hold >> 8 & 1;
          }
          if (state.flags & 512 && state.wrap & 4) {
            hbuf[0] = hold & 255;
            hbuf[1] = hold >>> 8 & 255;
            state.check = crc32_1(state.check, hbuf, 2, 0);
          }
          hold = 0;
          bits = 0;
          state.mode = TIME;
        /* falls through */
        case TIME:
          while (bits < 32) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          if (state.head) {
            state.head.time = hold;
          }
          if (state.flags & 512 && state.wrap & 4) {
            hbuf[0] = hold & 255;
            hbuf[1] = hold >>> 8 & 255;
            hbuf[2] = hold >>> 16 & 255;
            hbuf[3] = hold >>> 24 & 255;
            state.check = crc32_1(state.check, hbuf, 4, 0);
          }
          hold = 0;
          bits = 0;
          state.mode = OS;
        /* falls through */
        case OS:
          while (bits < 16) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          if (state.head) {
            state.head.xflags = hold & 255;
            state.head.os = hold >> 8;
          }
          if (state.flags & 512 && state.wrap & 4) {
            hbuf[0] = hold & 255;
            hbuf[1] = hold >>> 8 & 255;
            state.check = crc32_1(state.check, hbuf, 2, 0);
          }
          hold = 0;
          bits = 0;
          state.mode = EXLEN;
        /* falls through */
        case EXLEN:
          if (state.flags & 1024) {
            while (bits < 16) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            state.length = hold;
            if (state.head) {
              state.head.extra_len = hold;
            }
            if (state.flags & 512 && state.wrap & 4) {
              hbuf[0] = hold & 255;
              hbuf[1] = hold >>> 8 & 255;
              state.check = crc32_1(state.check, hbuf, 2, 0);
            }
            hold = 0;
            bits = 0;
          } else if (state.head) {
            state.head.extra = null;
          }
          state.mode = EXTRA;
        /* falls through */
        case EXTRA:
          if (state.flags & 1024) {
            copy = state.length;
            if (copy > have) {
              copy = have;
            }
            if (copy) {
              if (state.head) {
                len = state.head.extra_len - state.length;
                if (!state.head.extra) {
                  state.head.extra = new Uint8Array(state.head.extra_len);
                }
                state.head.extra.set(
                  input.subarray(
                    next,
                    // extra field is limited to 65536 bytes
                    // - no need for additional size check
                    next + copy
                  ),
                  /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
                  len
                );
              }
              if (state.flags & 512 && state.wrap & 4) {
                state.check = crc32_1(state.check, input, copy, next);
              }
              have -= copy;
              next += copy;
              state.length -= copy;
            }
            if (state.length) {
              break inf_leave;
            }
          }
          state.length = 0;
          state.mode = NAME;
        /* falls through */
        case NAME:
          if (state.flags & 2048) {
            if (have === 0) {
              break inf_leave;
            }
            copy = 0;
            do {
              len = input[next + copy++];
              if (state.head && len && state.length < 65536) {
                state.head.name += String.fromCharCode(len);
              }
            } while (len && copy < have);
            if (state.flags & 512 && state.wrap & 4) {
              state.check = crc32_1(state.check, input, copy, next);
            }
            have -= copy;
            next += copy;
            if (len) {
              break inf_leave;
            }
          } else if (state.head) {
            state.head.name = null;
          }
          state.length = 0;
          state.mode = COMMENT;
        /* falls through */
        case COMMENT:
          if (state.flags & 4096) {
            if (have === 0) {
              break inf_leave;
            }
            copy = 0;
            do {
              len = input[next + copy++];
              if (state.head && len && state.length < 65536) {
                state.head.comment += String.fromCharCode(len);
              }
            } while (len && copy < have);
            if (state.flags & 512 && state.wrap & 4) {
              state.check = crc32_1(state.check, input, copy, next);
            }
            have -= copy;
            next += copy;
            if (len) {
              break inf_leave;
            }
          } else if (state.head) {
            state.head.comment = null;
          }
          state.mode = HCRC;
        /* falls through */
        case HCRC:
          if (state.flags & 512) {
            while (bits < 16) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            if (state.wrap & 4 && hold !== (state.check & 65535)) {
              strm.msg = "header crc mismatch";
              state.mode = BAD;
              break;
            }
            hold = 0;
            bits = 0;
          }
          if (state.head) {
            state.head.hcrc = state.flags >> 9 & 1;
            state.head.done = true;
          }
          strm.adler = state.check = 0;
          state.mode = TYPE;
          break;
        case DICTID:
          while (bits < 32) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          strm.adler = state.check = zswap32(hold);
          hold = 0;
          bits = 0;
          state.mode = DICT;
        /* falls through */
        case DICT:
          if (state.havedict === 0) {
            strm.next_out = put;
            strm.avail_out = left;
            strm.next_in = next;
            strm.avail_in = have;
            state.hold = hold;
            state.bits = bits;
            return Z_NEED_DICT$1;
          }
          strm.adler = state.check = 1;
          state.mode = TYPE;
        /* falls through */
        case TYPE:
          if (flush === Z_BLOCK || flush === Z_TREES) {
            break inf_leave;
          }
        /* falls through */
        case TYPEDO:
          if (state.last) {
            hold >>>= bits & 7;
            bits -= bits & 7;
            state.mode = CHECK;
            break;
          }
          while (bits < 3) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          state.last = hold & 1;
          hold >>>= 1;
          bits -= 1;
          switch (hold & 3) {
            case 0:
              state.mode = STORED;
              break;
            case 1:
              fixedtables(state);
              state.mode = LEN_;
              if (flush === Z_TREES) {
                hold >>>= 2;
                bits -= 2;
                break inf_leave;
              }
              break;
            case 2:
              state.mode = TABLE;
              break;
            case 3:
              strm.msg = "invalid block type";
              state.mode = BAD;
          }
          hold >>>= 2;
          bits -= 2;
          break;
        case STORED:
          hold >>>= bits & 7;
          bits -= bits & 7;
          while (bits < 32) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          if ((hold & 65535) !== (hold >>> 16 ^ 65535)) {
            strm.msg = "invalid stored block lengths";
            state.mode = BAD;
            break;
          }
          state.length = hold & 65535;
          hold = 0;
          bits = 0;
          state.mode = COPY_;
          if (flush === Z_TREES) {
            break inf_leave;
          }
        /* falls through */
        case COPY_:
          state.mode = COPY;
        /* falls through */
        case COPY:
          copy = state.length;
          if (copy) {
            if (copy > have) {
              copy = have;
            }
            if (copy > left) {
              copy = left;
            }
            if (copy === 0) {
              break inf_leave;
            }
            output.set(input.subarray(next, next + copy), put);
            have -= copy;
            next += copy;
            left -= copy;
            put += copy;
            state.length -= copy;
            break;
          }
          state.mode = TYPE;
          break;
        case TABLE:
          while (bits < 14) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          state.nlen = (hold & 31) + 257;
          hold >>>= 5;
          bits -= 5;
          state.ndist = (hold & 31) + 1;
          hold >>>= 5;
          bits -= 5;
          state.ncode = (hold & 15) + 4;
          hold >>>= 4;
          bits -= 4;
          if (state.nlen > 286 || state.ndist > 30) {
            strm.msg = "too many length or distance symbols";
            state.mode = BAD;
            break;
          }
          state.have = 0;
          state.mode = LENLENS;
        /* falls through */
        case LENLENS:
          while (state.have < state.ncode) {
            while (bits < 3) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            state.lens[order[state.have++]] = hold & 7;
            hold >>>= 3;
            bits -= 3;
          }
          while (state.have < 19) {
            state.lens[order[state.have++]] = 0;
          }
          state.lencode = state.lendyn;
          state.lenbits = 7;
          opts = { bits: state.lenbits };
          ret = inftrees(CODES, state.lens, 0, 19, state.lencode, 0, state.work, opts);
          state.lenbits = opts.bits;
          if (ret) {
            strm.msg = "invalid code lengths set";
            state.mode = BAD;
            break;
          }
          state.have = 0;
          state.mode = CODELENS;
        /* falls through */
        case CODELENS:
          while (state.have < state.nlen + state.ndist) {
            for (; ; ) {
              here = state.lencode[hold & (1 << state.lenbits) - 1];
              here_bits = here >>> 24;
              here_op = here >>> 16 & 255;
              here_val = here & 65535;
              if (here_bits <= bits) {
                break;
              }
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            if (here_val < 16) {
              hold >>>= here_bits;
              bits -= here_bits;
              state.lens[state.have++] = here_val;
            } else {
              if (here_val === 16) {
                n = here_bits + 2;
                while (bits < n) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                hold >>>= here_bits;
                bits -= here_bits;
                if (state.have === 0) {
                  strm.msg = "invalid bit length repeat";
                  state.mode = BAD;
                  break;
                }
                len = state.lens[state.have - 1];
                copy = 3 + (hold & 3);
                hold >>>= 2;
                bits -= 2;
              } else if (here_val === 17) {
                n = here_bits + 3;
                while (bits < n) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                hold >>>= here_bits;
                bits -= here_bits;
                len = 0;
                copy = 3 + (hold & 7);
                hold >>>= 3;
                bits -= 3;
              } else {
                n = here_bits + 7;
                while (bits < n) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                hold >>>= here_bits;
                bits -= here_bits;
                len = 0;
                copy = 11 + (hold & 127);
                hold >>>= 7;
                bits -= 7;
              }
              if (state.have + copy > state.nlen + state.ndist) {
                strm.msg = "invalid bit length repeat";
                state.mode = BAD;
                break;
              }
              while (copy--) {
                state.lens[state.have++] = len;
              }
            }
          }
          if (state.mode === BAD) {
            break;
          }
          if (state.lens[256] === 0) {
            strm.msg = "invalid code -- missing end-of-block";
            state.mode = BAD;
            break;
          }
          state.lenbits = 9;
          opts = { bits: state.lenbits };
          ret = inftrees(LENS, state.lens, 0, state.nlen, state.lencode, 0, state.work, opts);
          state.lenbits = opts.bits;
          if (ret) {
            strm.msg = "invalid literal/lengths set";
            state.mode = BAD;
            break;
          }
          state.distbits = 6;
          state.distcode = state.distdyn;
          opts = { bits: state.distbits };
          ret = inftrees(DISTS, state.lens, state.nlen, state.ndist, state.distcode, 0, state.work, opts);
          state.distbits = opts.bits;
          if (ret) {
            strm.msg = "invalid distances set";
            state.mode = BAD;
            break;
          }
          state.mode = LEN_;
          if (flush === Z_TREES) {
            break inf_leave;
          }
        /* falls through */
        case LEN_:
          state.mode = LEN;
        /* falls through */
        case LEN:
          if (have >= 6 && left >= 258) {
            strm.next_out = put;
            strm.avail_out = left;
            strm.next_in = next;
            strm.avail_in = have;
            state.hold = hold;
            state.bits = bits;
            inffast(strm, _out);
            put = strm.next_out;
            output = strm.output;
            left = strm.avail_out;
            next = strm.next_in;
            input = strm.input;
            have = strm.avail_in;
            hold = state.hold;
            bits = state.bits;
            if (state.mode === TYPE) {
              state.back = -1;
            }
            break;
          }
          state.back = 0;
          for (; ; ) {
            here = state.lencode[hold & (1 << state.lenbits) - 1];
            here_bits = here >>> 24;
            here_op = here >>> 16 & 255;
            here_val = here & 65535;
            if (here_bits <= bits) {
              break;
            }
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          if (here_op && (here_op & 240) === 0) {
            last_bits = here_bits;
            last_op = here_op;
            last_val = here_val;
            for (; ; ) {
              here = state.lencode[last_val + ((hold & (1 << last_bits + last_op) - 1) >> last_bits)];
              here_bits = here >>> 24;
              here_op = here >>> 16 & 255;
              here_val = here & 65535;
              if (last_bits + here_bits <= bits) {
                break;
              }
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            hold >>>= last_bits;
            bits -= last_bits;
            state.back += last_bits;
          }
          hold >>>= here_bits;
          bits -= here_bits;
          state.back += here_bits;
          state.length = here_val;
          if (here_op === 0) {
            state.mode = LIT;
            break;
          }
          if (here_op & 32) {
            state.back = -1;
            state.mode = TYPE;
            break;
          }
          if (here_op & 64) {
            strm.msg = "invalid literal/length code";
            state.mode = BAD;
            break;
          }
          state.extra = here_op & 15;
          state.mode = LENEXT;
        /* falls through */
        case LENEXT:
          if (state.extra) {
            n = state.extra;
            while (bits < n) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            state.length += hold & (1 << state.extra) - 1;
            hold >>>= state.extra;
            bits -= state.extra;
            state.back += state.extra;
          }
          state.was = state.length;
          state.mode = DIST;
        /* falls through */
        case DIST:
          for (; ; ) {
            here = state.distcode[hold & (1 << state.distbits) - 1];
            here_bits = here >>> 24;
            here_op = here >>> 16 & 255;
            here_val = here & 65535;
            if (here_bits <= bits) {
              break;
            }
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          if ((here_op & 240) === 0) {
            last_bits = here_bits;
            last_op = here_op;
            last_val = here_val;
            for (; ; ) {
              here = state.distcode[last_val + ((hold & (1 << last_bits + last_op) - 1) >> last_bits)];
              here_bits = here >>> 24;
              here_op = here >>> 16 & 255;
              here_val = here & 65535;
              if (last_bits + here_bits <= bits) {
                break;
              }
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            hold >>>= last_bits;
            bits -= last_bits;
            state.back += last_bits;
          }
          hold >>>= here_bits;
          bits -= here_bits;
          state.back += here_bits;
          if (here_op & 64) {
            strm.msg = "invalid distance code";
            state.mode = BAD;
            break;
          }
          state.offset = here_val;
          state.extra = here_op & 15;
          state.mode = DISTEXT;
        /* falls through */
        case DISTEXT:
          if (state.extra) {
            n = state.extra;
            while (bits < n) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            state.offset += hold & (1 << state.extra) - 1;
            hold >>>= state.extra;
            bits -= state.extra;
            state.back += state.extra;
          }
          if (state.offset > state.dmax) {
            strm.msg = "invalid distance too far back";
            state.mode = BAD;
            break;
          }
          state.mode = MATCH;
        /* falls through */
        case MATCH:
          if (left === 0) {
            break inf_leave;
          }
          copy = _out - left;
          if (state.offset > copy) {
            copy = state.offset - copy;
            if (copy > state.whave) {
              if (state.sane) {
                strm.msg = "invalid distance too far back";
                state.mode = BAD;
                break;
              }
            }
            if (copy > state.wnext) {
              copy -= state.wnext;
              from = state.wsize - copy;
            } else {
              from = state.wnext - copy;
            }
            if (copy > state.length) {
              copy = state.length;
            }
            from_source = state.window;
          } else {
            from_source = output;
            from = put - state.offset;
            copy = state.length;
          }
          if (copy > left) {
            copy = left;
          }
          left -= copy;
          state.length -= copy;
          do {
            output[put++] = from_source[from++];
          } while (--copy);
          if (state.length === 0) {
            state.mode = LEN;
          }
          break;
        case LIT:
          if (left === 0) {
            break inf_leave;
          }
          output[put++] = state.length;
          left--;
          state.mode = LEN;
          break;
        case CHECK:
          if (state.wrap) {
            while (bits < 32) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold |= input[next++] << bits;
              bits += 8;
            }
            _out -= left;
            strm.total_out += _out;
            state.total += _out;
            if (state.wrap & 4 && _out) {
              strm.adler = state.check = /*UPDATE_CHECK(state.check, put - _out, _out);*/
              state.flags ? crc32_1(state.check, output, _out, put - _out) : adler32_1(state.check, output, _out, put - _out);
            }
            _out = left;
            if (state.wrap & 4 && (state.flags ? hold : zswap32(hold)) !== state.check) {
              strm.msg = "incorrect data check";
              state.mode = BAD;
              break;
            }
            hold = 0;
            bits = 0;
          }
          state.mode = LENGTH;
        /* falls through */
        case LENGTH:
          if (state.wrap && state.flags) {
            while (bits < 32) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            if (state.wrap & 4 && hold !== (state.total & 4294967295)) {
              strm.msg = "incorrect length check";
              state.mode = BAD;
              break;
            }
            hold = 0;
            bits = 0;
          }
          state.mode = DONE;
        /* falls through */
        case DONE:
          ret = Z_STREAM_END$1;
          break inf_leave;
        case BAD:
          ret = Z_DATA_ERROR$1;
          break inf_leave;
        case MEM:
          return Z_MEM_ERROR$1;
        case SYNC:
        /* falls through */
        default:
          return Z_STREAM_ERROR$1;
      }
    }
  strm.next_out = put;
  strm.avail_out = left;
  strm.next_in = next;
  strm.avail_in = have;
  state.hold = hold;
  state.bits = bits;
  if (state.wsize || _out !== strm.avail_out && state.mode < BAD && (state.mode < CHECK || flush !== Z_FINISH$1)) {
    if (updatewindow(strm, strm.output, strm.next_out, _out - strm.avail_out)) ;
  }
  _in -= strm.avail_in;
  _out -= strm.avail_out;
  strm.total_in += _in;
  strm.total_out += _out;
  state.total += _out;
  if (state.wrap & 4 && _out) {
    strm.adler = state.check = /*UPDATE_CHECK(state.check, strm.next_out - _out, _out);*/
    state.flags ? crc32_1(state.check, output, _out, strm.next_out - _out) : adler32_1(state.check, output, _out, strm.next_out - _out);
  }
  strm.data_type = state.bits + (state.last ? 64 : 0) + (state.mode === TYPE ? 128 : 0) + (state.mode === LEN_ || state.mode === COPY_ ? 256 : 0);
  if ((_in === 0 && _out === 0 || flush === Z_FINISH$1) && ret === Z_OK$1) {
    ret = Z_BUF_ERROR;
  }
  return ret;
};
var inflateEnd = (strm) => {
  if (inflateStateCheck(strm)) {
    return Z_STREAM_ERROR$1;
  }
  let state = strm.state;
  if (state.window) {
    state.window = null;
  }
  strm.state = null;
  return Z_OK$1;
};
var inflateGetHeader = (strm, head) => {
  if (inflateStateCheck(strm)) {
    return Z_STREAM_ERROR$1;
  }
  const state = strm.state;
  if ((state.wrap & 2) === 0) {
    return Z_STREAM_ERROR$1;
  }
  state.head = head;
  head.done = false;
  return Z_OK$1;
};
var inflateSetDictionary = (strm, dictionary) => {
  const dictLength = dictionary.length;
  let state;
  let dictid;
  let ret;
  if (inflateStateCheck(strm)) {
    return Z_STREAM_ERROR$1;
  }
  state = strm.state;
  if (state.wrap !== 0 && state.mode !== DICT) {
    return Z_STREAM_ERROR$1;
  }
  if (state.mode === DICT) {
    dictid = 1;
    dictid = adler32_1(dictid, dictionary, dictLength, 0);
    if (dictid !== state.check) {
      return Z_DATA_ERROR$1;
    }
  }
  ret = updatewindow(strm, dictionary, dictLength, dictLength);
  if (ret) {
    state.mode = MEM;
    return Z_MEM_ERROR$1;
  }
  state.havedict = 1;
  return Z_OK$1;
};
var inflateReset_1 = inflateReset;
var inflateReset2_1 = inflateReset2;
var inflateResetKeep_1 = inflateResetKeep;
var inflateInit_1 = inflateInit;
var inflateInit2_1 = inflateInit2;
var inflate_2$1 = inflate$2;
var inflateEnd_1 = inflateEnd;
var inflateGetHeader_1 = inflateGetHeader;
var inflateSetDictionary_1 = inflateSetDictionary;
var inflateInfo = "pako inflate (from Nodeca project)";
var inflate_1$2 = {
  inflateReset: inflateReset_1,
  inflateReset2: inflateReset2_1,
  inflateResetKeep: inflateResetKeep_1,
  inflateInit: inflateInit_1,
  inflateInit2: inflateInit2_1,
  inflate: inflate_2$1,
  inflateEnd: inflateEnd_1,
  inflateGetHeader: inflateGetHeader_1,
  inflateSetDictionary: inflateSetDictionary_1,
  inflateInfo
};
function GZheader() {
  this.text = 0;
  this.time = 0;
  this.xflags = 0;
  this.os = 0;
  this.extra = null;
  this.extra_len = 0;
  this.name = "";
  this.comment = "";
  this.hcrc = 0;
  this.done = false;
}
var gzheader = GZheader;
var toString = Object.prototype.toString;
var {
  Z_NO_FLUSH,
  Z_FINISH,
  Z_OK,
  Z_STREAM_END,
  Z_NEED_DICT,
  Z_STREAM_ERROR,
  Z_DATA_ERROR,
  Z_MEM_ERROR
} = constants$2;
function Inflate$1(options) {
  this.options = common.assign({
    chunkSize: 1024 * 64,
    windowBits: 15,
    to: ""
  }, options || {});
  const opt = this.options;
  if (opt.raw && opt.windowBits >= 0 && opt.windowBits < 16) {
    opt.windowBits = -opt.windowBits;
    if (opt.windowBits === 0) {
      opt.windowBits = -15;
    }
  }
  if (opt.windowBits >= 0 && opt.windowBits < 16 && !(options && options.windowBits)) {
    opt.windowBits += 32;
  }
  if (opt.windowBits > 15 && opt.windowBits < 48) {
    if ((opt.windowBits & 15) === 0) {
      opt.windowBits |= 15;
    }
  }
  this.err = 0;
  this.msg = "";
  this.ended = false;
  this.chunks = [];
  this.strm = new zstream();
  this.strm.avail_out = 0;
  let status = inflate_1$2.inflateInit2(
    this.strm,
    opt.windowBits
  );
  if (status !== Z_OK) {
    throw new Error(messages[status]);
  }
  this.header = new gzheader();
  inflate_1$2.inflateGetHeader(this.strm, this.header);
  if (opt.dictionary) {
    if (typeof opt.dictionary === "string") {
      opt.dictionary = strings.string2buf(opt.dictionary);
    } else if (toString.call(opt.dictionary) === "[object ArrayBuffer]") {
      opt.dictionary = new Uint8Array(opt.dictionary);
    }
    if (opt.raw) {
      status = inflate_1$2.inflateSetDictionary(this.strm, opt.dictionary);
      if (status !== Z_OK) {
        throw new Error(messages[status]);
      }
    }
  }
}
Inflate$1.prototype.push = function(data, flush_mode) {
  const strm = this.strm;
  const chunkSize = this.options.chunkSize;
  const dictionary = this.options.dictionary;
  let status, _flush_mode, last_avail_out;
  if (this.ended) return false;
  if (flush_mode === ~~flush_mode) _flush_mode = flush_mode;
  else _flush_mode = flush_mode === true ? Z_FINISH : Z_NO_FLUSH;
  if (toString.call(data) === "[object ArrayBuffer]") {
    strm.input = new Uint8Array(data);
  } else {
    strm.input = data;
  }
  strm.next_in = 0;
  strm.avail_in = strm.input.length;
  for (; ; ) {
    if (strm.avail_out === 0) {
      strm.output = new Uint8Array(chunkSize);
      strm.next_out = 0;
      strm.avail_out = chunkSize;
    }
    status = inflate_1$2.inflate(strm, _flush_mode);
    if (status === Z_NEED_DICT && dictionary) {
      status = inflate_1$2.inflateSetDictionary(strm, dictionary);
      if (status === Z_OK) {
        status = inflate_1$2.inflate(strm, _flush_mode);
      } else if (status === Z_DATA_ERROR) {
        status = Z_NEED_DICT;
      }
    }
    while (strm.avail_in > 0 && status === Z_STREAM_END && strm.state.wrap > 0 && data[strm.next_in] !== 0) {
      inflate_1$2.inflateReset(strm);
      status = inflate_1$2.inflate(strm, _flush_mode);
    }
    switch (status) {
      case Z_STREAM_ERROR:
      case Z_DATA_ERROR:
      case Z_NEED_DICT:
      case Z_MEM_ERROR:
        this.onEnd(status);
        this.ended = true;
        return false;
    }
    last_avail_out = strm.avail_out;
    if (strm.next_out) {
      if (strm.avail_out === 0 || status === Z_STREAM_END) {
        if (this.options.to === "string") {
          let next_out_utf8 = strings.utf8border(strm.output, strm.next_out);
          let tail = strm.next_out - next_out_utf8;
          let utf8str = strings.buf2string(strm.output, next_out_utf8);
          strm.next_out = tail;
          strm.avail_out = chunkSize - tail;
          if (tail) strm.output.set(strm.output.subarray(next_out_utf8, next_out_utf8 + tail), 0);
          this.onData(utf8str);
        } else {
          this.onData(strm.output.length === strm.next_out ? strm.output : strm.output.subarray(0, strm.next_out));
        }
      }
    }
    if (status === Z_OK && last_avail_out === 0) continue;
    if (status === Z_STREAM_END) {
      status = inflate_1$2.inflateEnd(this.strm);
      this.onEnd(status);
      this.ended = true;
      return true;
    }
    if (strm.avail_in === 0) break;
  }
  return true;
};
Inflate$1.prototype.onData = function(chunk) {
  this.chunks.push(chunk);
};
Inflate$1.prototype.onEnd = function(status) {
  if (status === Z_OK) {
    if (this.options.to === "string") {
      this.result = this.chunks.join("");
    } else {
      this.result = common.flattenChunks(this.chunks);
    }
  }
  this.chunks = [];
  this.err = status;
  this.msg = this.strm.msg;
};
function inflate$1(input, options) {
  const inflator = new Inflate$1(options);
  inflator.push(input);
  if (inflator.err) throw inflator.msg || messages[inflator.err];
  return inflator.result;
}
function inflateRaw$1(input, options) {
  options = options || {};
  options.raw = true;
  return inflate$1(input, options);
}
var Inflate_1$1 = Inflate$1;
var inflate_2 = inflate$1;
var inflateRaw_1$1 = inflateRaw$1;
var ungzip$1 = inflate$1;
var constants = constants$2;
var inflate_1$1 = {
  Inflate: Inflate_1$1,
  inflate: inflate_2,
  inflateRaw: inflateRaw_1$1,
  ungzip: ungzip$1,
  constants
};
var { Deflate, deflate, deflateRaw, gzip } = deflate_1$1;
var { Inflate, inflate, inflateRaw, ungzip } = inflate_1$1;
var Deflate_1 = Deflate;
var deflate_1 = deflate;
var deflateRaw_1 = deflateRaw;
var gzip_1 = gzip;
var Inflate_1 = Inflate;
var inflate_1 = inflate;
var inflateRaw_1 = inflateRaw;
var ungzip_1 = ungzip;
var constants_1 = constants$2;
var pako = {
  Deflate: Deflate_1,
  deflate: deflate_1,
  deflateRaw: deflateRaw_1,
  gzip: gzip_1,
  Inflate: Inflate_1,
  inflate: inflate_1,
  inflateRaw: inflateRaw_1,
  ungzip: ungzip_1,
  constants: constants_1
};

// src/compression/decompressInnerData.ts
function decompressInnerData(compressionAlgorithm, data) {
  switch (compressionAlgorithm) {
    case CompressionAlgorithm_default.None:
      return data;
    case CompressionAlgorithm_default.GZip:
      return pako.inflate(data);
  }
}

// src/crypto/createSymmetricCipher.ts
var ciphers = Object.freeze({
  [SymmetricCipherAlgorithm_default.Aes256_CBC]: "cipherAes256",
  [SymmetricCipherAlgorithm_default.ChaCha20]: "cipherChaCha20",
  [SymmetricCipherAlgorithm_default.Salsa20]: "cipherSalsa20",
  [SymmetricCipherAlgorithm_default.Twofish_CBC]: "cipherTwofish"
});
function createSymmetricCipher(algorithm, direction, key, iv) {
  return getDependency(ciphers[algorithm])(direction, key, iv);
}

// src/crypto/createInnerStreamCipher.ts
async function createInnerStreamCipher(algorithm, key) {
  switch (algorithm) {
    case SymmetricCipherAlgorithm_default.Salsa20:
      return createSymmetricCipher(
        SymmetricCipherAlgorithm_default.Salsa20,
        SymmetricCipherDirection_default.Encrypt,
        await processHash(HashAlgorithm_default.Sha256, [key]),
        KeePass2.innerStreamSalsa20IV
      );
    case SymmetricCipherAlgorithm_default.ChaCha20: {
      const hash = await processHash(HashAlgorithm_default.Sha512, [key]);
      return createSymmetricCipher(
        SymmetricCipherAlgorithm_default.ChaCha20,
        SymmetricCipherDirection_default.Encrypt,
        hash.subarray(0, 32),
        hash.subarray(32, 44)
      );
    }
    case SymmetricCipherAlgorithm_default.Aes256_CBC:
    case SymmetricCipherAlgorithm_default.Twofish_CBC:
    default:
      throw new Error(
        `Invalid inner stream cipher algorithm ${displaySymmetricCipherAlgorithm(algorithm)}`
      );
  }
}

// src/crypto/cryptInnerData.ts
async function cryptInnerData(direction, algorithm, masterSeed, encryptionIV, compositeKey, data) {
  const finalKey = await processHash(HashAlgorithm_default.Sha256, [
    masterSeed,
    compositeKey
  ]);
  const cipher = await createSymmetricCipher(
    algorithm,
    direction,
    finalKey,
    encryptionIV
  );
  return await cipher.finish(data);
}

// src/crypto/generateHmacKeySeed.ts
async function generateHmacKeySeed(masterSeed, compositeKey) {
  return await processHash(HashAlgorithm_default.Sha512, [
    masterSeed,
    compositeKey,
    Uint8Array.from([1])
  ]);
}

// src/utilities/isChallengeResponseKey.ts
function isChallengeResponseKey(key) {
  return typeof key.challenge === "function";
}

// src/utilities/isKdbxProcessedKey.ts
function isKdbxProcessedKey(key) {
  return ArrayBuffer.isView(key.data);
}

// src/crypto/transformCompositeKey.ts
async function transformCompositeKey(parameters, keys) {
  const processedKeys = keys.filter(isKdbxProcessedKey);
  const keyData = processedKeys.map((key) => key.data);
  keyData.push(await challengeKeys(parameters.seed, keys));
  const hash = await processHash(HashAlgorithm_default.Sha256, keyData);
  switch (parameters.uuid) {
    case KdfUuid_default.Argon2d:
    case KdfUuid_default.Argon2id:
      return await getDependency("transformArgon2KdfKey")(hash, parameters);
    case KdfUuid_default.AesKdbx3:
    case KdfUuid_default.AesKdbx4:
      return await processHash(HashAlgorithm_default.Sha256, [
        await getDependency("transformAes256KdfKey")(hash, parameters)
      ]);
  }
}
async function challengeKeys(seed, keys) {
  const challengeKeys2 = keys.filter(isChallengeResponseKey);
  if (!challengeKeys2.length) {
    return Uint8Array.from([]);
  }
  const responses = [];
  for (const key of challengeKeys2) {
    responses.push(await key.challenge(seed));
  }
  return await processHash(HashAlgorithm_default.Sha256, responses);
}

// src/enums/InnerHeaderFieldId.ts
var InnerHeaderFieldId = Object.freeze({
  EndOfHeader: 0,
  InnerEncryptionAlgorithm: 1,
  InnerEncryptionKey: 2,
  Binary: 3
});
var InnerHeaderFieldId_default = InnerHeaderFieldId;

// src/utilities/displayInnerHeaderFieldId.ts
var innerFieldDisplayMap = {
  [InnerHeaderFieldId_default.EndOfHeader]: "EndOfHeader",
  [InnerHeaderFieldId_default.InnerEncryptionAlgorithm]: "InnerEncryptionAlgorithm",
  [InnerHeaderFieldId_default.InnerEncryptionKey]: "InnerEncryptionKey",
  [InnerHeaderFieldId_default.Binary]: "Binary"
};
function displayInnerHeaderFieldId(id) {
  return innerFieldDisplayMap[id];
}

// src/utilities/isInnerHeaderFieldId.ts
function isInnerHeaderFieldId(type) {
  const values = Object.values(InnerHeaderFieldId_default);
  return values.includes(type);
}

// src/innerHeader/fields/deserializeBinaryValue.ts
function deserializeBinaryValue(data) {
  if (data.byteLength < 1) {
    throw new Error(
      `Invalid binary value length. Expected at least 1 byte, got ${data.byteLength}`
    );
  }
  const reader = new BufferReader(data);
  const protectInMemoryFlag = reader.readUInt8();
  if (protectInMemoryFlag !== 0 && protectInMemoryFlag !== 1) {
    throw new Error(
      `Unexpected protect in memory binary flag. Expected 0x00 or 0x01, got 0x${protectInMemoryFlag.toString(16)}`
    );
  }
  return {
    data: reader.remaining(),
    protectInMemory: protectInMemoryFlag === 1
  };
}

// src/innerHeader/fields/deserializeEndOfHeaderValue.ts
function deserializeEndOfHeaderValue2(data) {
  return data;
}

// src/enums/ProtectedStreamAlgorithm.ts
var ProtectedStreamAlgorithm = Object.freeze({
  Salsa20: 2,
  ChaCha20: 3
});
var ProtectedStreamAlgorithm_default = ProtectedStreamAlgorithm;

// src/utilities/isProtectedStreamAlgorithm.ts
function isProtectedStreamAlgorithm(type) {
  const values = Object.values(ProtectedStreamAlgorithm_default);
  return values.includes(type);
}

// src/innerHeader/fields/deserializeStreamCipherAlgorithmValue.ts
function deserializeStreamCipherAlgorithmValue(data) {
  if (data.byteLength !== 4) {
    throw new Error(
      `Invalid stream cipher algorithm length. Expected 4 bytes, got ${data.byteLength}`
    );
  }
  const id = Uint8ArrayHelper_default.toUInt32LE(data);
  if (!isProtectedStreamAlgorithm(id)) {
    throw new Error(`Invalid stream cipher algorithm "${id}"`);
  }
  switch (id) {
    case ProtectedStreamAlgorithm_default.Salsa20:
      return SymmetricCipherAlgorithm_default.Salsa20;
    case ProtectedStreamAlgorithm_default.ChaCha20:
      return SymmetricCipherAlgorithm_default.ChaCha20;
  }
}

// src/innerHeader/fields/deserializeStreamKeyValue.ts
function deserializeStreamKeyValue(data, algorithm) {
  if (algorithm !== void 0) {
    if (algorithm !== SymmetricCipherAlgorithm_default.Salsa20 && algorithm !== SymmetricCipherAlgorithm_default.ChaCha20) {
      throw new Error(
        `Unsupported symmetric cipher algorithm "${displaySymmetricCipherAlgorithm(algorithm)}"`
      );
    }
    const expectedBytes = getSymmetricCipherKeySize(algorithm);
    if (data.byteLength !== expectedBytes) {
      throw new Error(
        `Invalid ${displaySymmetricCipherAlgorithm(algorithm)} key length. Expected ${expectedBytes} bytes, got ${data.byteLength}`
      );
    }
  }
  return data;
}

// src/innerHeader/readInnerHeaderFields.ts
function readInnerHeaderFields(buffer) {
  const header = {};
  for (; ; ) {
    const fieldId = readInnerHeaderFieldId(buffer);
    const fieldData = readInnerHeaderFieldData(buffer, fieldId);
    switch (fieldId) {
      case InnerHeaderFieldId_default.InnerEncryptionAlgorithm:
        header.innerEncryptionAlgorithm = deserializeStreamCipherAlgorithmValue(fieldData);
        if (header.innerEncryptionKey) {
          header.innerEncryptionKey = deserializeStreamKeyValue(
            fieldData,
            header.innerEncryptionAlgorithm
          );
        }
        break;
      case InnerHeaderFieldId_default.InnerEncryptionKey:
        header.innerEncryptionKey = deserializeStreamKeyValue(
          fieldData,
          header.innerEncryptionAlgorithm
        );
        break;
      case InnerHeaderFieldId_default.Binary: {
        const binaryValue = deserializeBinaryValue(fieldData);
        if (!header.binaryPool) {
          header.binaryPool = [];
        }
        const nextPoolIndex = `${Object.keys(header.binaryPool).length}`;
        header.binaryPool.push({
          data: binaryValue.data,
          index: nextPoolIndex,
          protectInMemory: binaryValue.protectInMemory
        });
        break;
      }
      case InnerHeaderFieldId_default.EndOfHeader:
        header.endOfHeader = deserializeEndOfHeaderValue2(fieldData);
        return validateInnerHeader(header);
    }
  }
}
function validateInnerHeader(header) {
  const missingFields = [];
  function validateHeaderComplete(header2) {
    missingFields.length = 0;
    if (header2.innerEncryptionAlgorithm === void 0) {
      missingFields.push(InnerHeaderFieldId_default.InnerEncryptionAlgorithm);
    }
    if (header2.innerEncryptionKey === void 0) {
      missingFields.push(InnerHeaderFieldId_default.InnerEncryptionKey);
    }
    return missingFields.length === 0;
  }
  if (!validateHeaderComplete(header)) {
    const fieldLabel = missingFields.length === 1 ? "field" : "fields";
    const missingLabels = missingFields.map(
      (v) => `"${displayInnerHeaderFieldId(v)}"`
    );
    throw new Error(
      `Missing required inner header ${fieldLabel}: ${joinWithConjunction(missingLabels, "and")}`
    );
  }
  return {
    binaryPool: header.binaryPool,
    endOfHeader: header.endOfHeader,
    innerEncryptionAlgorithm: header.innerEncryptionAlgorithm,
    innerEncryptionKey: header.innerEncryptionKey
  };
}
function readInnerHeaderFieldId(reader) {
  const fieldId = reader.readUInt8();
  if (!isInnerHeaderFieldId(fieldId)) {
    throw new Error(`Unknown inner header field ID encountered "${fieldId}"`);
  }
  return fieldId;
}
function readInnerHeaderFieldData(reader, fieldId) {
  const fieldLength = reader.readUInt32LE();
  if (!fieldLength && fieldId !== InnerHeaderFieldId_default.EndOfHeader) {
    throw new Error(
      `Unexpected empty inner header field length for "${displayInnerHeaderFieldId(fieldId)}"`
    );
  }
  return reader.readBytes(fieldLength);
}

// src/utilities/displayHash.ts
function displayHash(hash) {
  if (hash.length === 0) {
    throw new Error("Invalid hash length. Expected at least 1 byte");
  }
  return Array.from(hash).map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

// src/xml/readDatabaseXml.ts
var import_xmldom2 = __toESM(require_lib());

// src/utilities/KdbxXmlReader.ts
var import_xmldom = __toESM(require_lib());

// src/enums/NullableBoolean.ts
var NullableBoolean = Object.freeze({
  Inherit: -1,
  False: 0,
  True: 1
});
var NullableBoolean_default = NullableBoolean;

// src/utilities/gregorianTimestampToDate.ts
function gregorianTimestampToDate(timestamp) {
  const date = /* @__PURE__ */ new Date();
  date.setUTCFullYear(1, 0, 1);
  date.setUTCHours(0, 0, 0, 0);
  date.setUTCSeconds(timestamp);
  return date;
}

// src/utilities/isBase64.ts
function isBase64(input) {
  return Boolean(
    input.match(/(^(?:[a-z\d+/]{4})*(?:[a-z\d+/]{3}=|[a-z\d+/]{2}==)?$)/i)
  );
}

// src/utilities/KdbxXmlReader.ts
var KdbxXmlReader = class {
  constructor(cipher, binaryPool) {
    this.cipher = cipher;
    this.binaryPool = binaryPool;
  }
  assertTag(element, tagName) {
    if (element.tagName !== tagName) {
      throw new Error(
        `Expected element "${tagName}" but found "${element.tagName}"`
      );
    }
  }
  attribute(element, name) {
    const attribute = element.attributes.getNamedItem(name);
    return attribute?.value;
  }
  *children(element) {
    for (const childNode of element.childNodes) {
      switch (childNode.nodeType) {
        case import_xmldom.Node.TEXT_NODE:
          if (childNode.nodeValue !== null && childNode.nodeValue.trim().length > 0) {
            throw new Error(
              `Unexpected text content found: "${childNode.nodeValue}"`
            );
          }
          break;
        case import_xmldom.Node.ELEMENT_NODE:
          if (!(childNode instanceof import_xmldom.Element)) {
            throw new Error(
              `Unexpected non-Element node found in "${element.tagName}"`
            );
          }
          yield childNode;
          break;
        default:
          throw new Error(
            `Unexpected node type ${childNode.nodeType} found in "${element.tagName}"`
          );
      }
    }
  }
  async readBinaryValue(element) {
    const value = this.readStringValue(element);
    const data = Uint8ArrayHelper_default.fromBase64(value);
    if (this.isProtectedValue(element)) {
      return await this.cipher.process(data);
    }
    return data;
  }
  readBinaryPoolData(index) {
    const poolValue = this.binaryPool?.find((value) => value.index === index);
    if (!poolValue) {
      throw new Error(`Binary pool value not found for index "${index}"`);
    }
    return poolValue.data;
  }
  readBooleanValue(element) {
    const value = this.readStringValue(element);
    switch (value.toLowerCase()) {
      case "true":
        return true;
      case "false":
      case "":
        return false;
      default:
        throw new Error(`Invalid bool value "${value}"`);
    }
  }
  readColorValue(element) {
    const colorString = this.readStringValue(element);
    if (!colorString.length) {
      return colorString;
    }
    if (!colorString.match(/^#[0-f]{6}$/)) {
      throw new Error(`Invalid color value "${colorString}"`);
    }
    return colorString;
  }
  readDateTimeValue(element) {
    const value = this.readStringValue(element);
    if (!isBase64(value)) {
      return this.readDateTimeFromIsoString(value, true);
    }
    return this.readDateTimeFromBase64(value);
  }
  readNullableBoolean(element) {
    const value = this.readStringValue(element);
    switch (value.toLowerCase()) {
      case "null":
        return NullableBoolean_default.Inherit;
      case "true":
        return NullableBoolean_default.True;
      case "false":
        return NullableBoolean_default.False;
      default:
        throw new Error(`Invalid NullableBoolean value "${value}"`);
    }
  }
  readNumberValue(element, radix = 10) {
    const text = this.readStringValue(element);
    return parseInt(text, radix);
  }
  async readPotentiallyProtectedStringValue(element) {
    const isProtected = this.isProtectedValue(element);
    const text = this.readStringValue(element);
    if (!isProtected || text.length === 0) {
      return [text, isProtected];
    }
    const data = await this.cipher.process(Uint8ArrayHelper_default.fromBase64(text));
    return [Uint8ArrayHelper_default.toString(data), isProtected];
  }
  readStringValue(element) {
    if (element.textContent === null) {
      throw new Error(`Text content is null for element "${element.tagName}".`);
    }
    return element.textContent;
  }
  async readUuidValue(element) {
    const data = await this.readBinaryValue(element);
    if (data.byteLength !== 16) {
      throw new Error(
        `Invalid UUID length. Expected 16 bytes, got ${data.byteLength}`
      );
    }
    return displayUuid(data);
  }
  readDateTimeFromBase64(value) {
    const data = Uint8ArrayHelper_default.leftJustify(
      Uint8ArrayHelper_default.fromBase64(value),
      8
    ).slice(0, 8);
    const timestamp = Uint8ArrayHelper_default.toUInt64LE(data);
    if (timestamp < Number.MIN_SAFE_INTEGER || timestamp > Number.MAX_SAFE_INTEGER) {
      throw new Error(
        `Invalid date time found. Out of range for Date seconds "${timestamp}"`
      );
    }
    const timestampAsNumber = Number(timestamp);
    return gregorianTimestampToDate(timestampAsNumber);
  }
  readDateTimeFromIsoString(input, ensureCompliance) {
    const date = new Date(input);
    if (!isNaN(date.getTime())) {
      return date;
    }
    if (ensureCompliance) {
      throw new Error(
        `Unexpected date format. Expected ISO 8601 date string, got "${input}"`
      );
    }
    return /* @__PURE__ */ new Date();
  }
  isProtectedValue(element) {
    const protectedAttribute = this.attribute(element, "Protected");
    return protectedAttribute?.toLowerCase() === "true";
  }
};

// src/xml/tags/parseCustomDataTag.ts
function parseCustomDataTag(reader, element, withTimes) {
  reader.assertTag(element, "CustomData");
  const customData = {};
  for (const child of reader.children(element)) {
    switch (child.tagName) {
      case "Item": {
        const item = parseCustomDataItemTag(reader, child, withTimes);
        if (!item.key || !item.value) {
          throw new Error("Missing custom data key or value");
        }
        customData[item.key] = item;
        break;
      }
      default:
        throw new Error(
          `Unexpected tag "${child.tagName}" while parsing "${element.tagName}"`
        );
    }
  }
  return customData;
}
function parseCustomDataItemTag(reader, element, withTimes) {
  reader.assertTag(element, "Item");
  const customData = {};
  for (const child of reader.children(element)) {
    switch (child.tagName) {
      case "Key":
        customData.key = reader.readStringValue(child);
        break;
      case "Value":
        customData.value = reader.readStringValue(child);
        break;
      case "LastModificationTime":
        if (!withTimes) {
          throw new Error(
            'Unexpected "LastModificationTime" tag in custom data item'
          );
        }
        customData.lastModified = reader.readDateTimeValue(child);
        break;
      default:
        throw new Error(
          `Unexpected tag "${child.tagName}" while parsing "${element.tagName}"`
        );
    }
  }
  if (!isCustomDataItemComplete(customData)) {
    throw new Error(`Found "${element.tagName}" tag with incomplete data`);
  }
  return customData;
}
function isCustomDataItemComplete(item) {
  return item.key !== void 0 && item.value !== void 0;
}

// src/xml/tags/parseIconTag.ts
async function parseIconTag(reader, element) {
  reader.assertTag(element, "Icon");
  const icon = {};
  for (const child of reader.children(element)) {
    switch (child.tagName) {
      case "UUID":
        icon.uuid = await reader.readUuidValue(child);
        break;
      case "Data":
        icon.data = await reader.readBinaryValue(child);
        break;
      case "Name":
        icon.name = reader.readStringValue(child);
        break;
      case "LastModificationTime":
        icon.lastModificationTime = reader.readDateTimeValue(child);
        break;
      default:
        throw new Error(
          `Unexpected tag "${child.tagName}" while parsing "${element.tagName}"`
        );
    }
  }
  if (!isIconComplete(icon)) {
    throw new Error(`Found "${element.tagName}" tag with incomplete data`);
  }
  return icon;
}
function isIconComplete(icon) {
  return icon.data !== void 0 && icon.uuid !== void 0;
}

// src/xml/tags/parseCustomIconsTag.ts
async function parseCustomIconsTag(reader, element) {
  reader.assertTag(element, "CustomIcons");
  const icons = {};
  for (const child of reader.children(element)) {
    switch (child.tagName) {
      case "Icon": {
        const icon = await parseIconTag(reader, child);
        icons[icon.uuid] = icon;
        break;
      }
      default:
        throw new Error(
          `Unexpected tag "${child.tagName}" while parsing "${element.tagName}"`
        );
    }
  }
  return icons;
}

// src/xml/tags/parseMemoryProtectionTag.ts
function parseMemoryProtectionTag(reader, element) {
  reader.assertTag(element, "MemoryProtection");
  const memoryProtection = {};
  for (const child of reader.children(element)) {
    switch (child.tagName) {
      case "ProtectTitle":
        memoryProtection.protectTitle = reader.readBooleanValue(child);
        break;
      case "ProtectUserName":
        memoryProtection.protectUserName = reader.readBooleanValue(child);
        break;
      case "ProtectPassword":
        memoryProtection.protectPassword = reader.readBooleanValue(child);
        break;
      case "ProtectURL":
        memoryProtection.protectURL = reader.readBooleanValue(child);
        break;
      case "ProtectNotes":
        memoryProtection.protectNotes = reader.readBooleanValue(child);
        break;
      default:
        throw new Error(
          `Unexpected tag "${child.tagName}" while parsing "${element.tagName}"`
        );
    }
  }
  return memoryProtection;
}

// src/xml/tags/parseMetaTag.ts
async function parseMetaTag(reader, element) {
  reader.assertTag(element, "Meta");
  const metadata = {};
  for (const child of reader.children(element)) {
    switch (child.tagName) {
      case "Generator":
        metadata.generator = reader.readStringValue(child);
        break;
      case "HeaderHash":
        metadata.headerHash = await reader.readBinaryValue(child);
        break;
      case "DatabaseName":
        metadata.name = reader.readStringValue(child);
        break;
      case "DatabaseNameChanged":
        metadata.nameChanged = reader.readDateTimeValue(child);
        break;
      case "DatabaseDescription":
        metadata.description = reader.readStringValue(child);
        break;
      case "DatabaseDescriptionChanged":
        metadata.descriptionChanged = reader.readDateTimeValue(child);
        break;
      case "DefaultUserName":
        metadata.defaultUserName = reader.readStringValue(child);
        break;
      case "DefaultUserNameChanged":
        metadata.defaultUserNameChanged = reader.readDateTimeValue(child);
        break;
      case "MaintenanceHistoryDays":
        metadata.maintenanceHistoryDays = reader.readNumberValue(child);
        break;
      case "Color":
        metadata.color = reader.readColorValue(child);
        break;
      case "MasterKeyChanged":
        metadata.masterKeyChanged = reader.readDateTimeValue(child);
        break;
      case "MasterKeyChangeRec":
        metadata.masterKeyChangeRec = reader.readNumberValue(child);
        break;
      case "MasterKeyChangeForce":
        metadata.masterKeyChangeForce = reader.readNumberValue(child);
        break;
      case "MemoryProtection":
        metadata.memoryProtection = parseMemoryProtectionTag(reader, child);
        break;
      case "CustomIcons":
        metadata.customIcons = await parseCustomIconsTag(reader, child);
        break;
      case "RecycleBinEnabled":
        metadata.recycleBinEnabled = reader.readBooleanValue(child);
        break;
      case "RecycleBinUUID":
        metadata.recycleBinUuid = await reader.readUuidValue(child);
        break;
      case "RecycleBinChanged":
        metadata.recycleBinChanged = reader.readDateTimeValue(child);
        break;
      case "EntryTemplatesGroup":
        metadata.entryTemplatesGroup = await reader.readUuidValue(child);
        break;
      case "EntryTemplatesGroupChanged":
        metadata.entryTemplatesGroupChanged = reader.readDateTimeValue(child);
        break;
      case "LastSelectedGroup":
        metadata.lastSelectedGroup = await reader.readUuidValue(child);
        break;
      case "LastTopVisibleGroup":
        metadata.lastTopVisibleGroup = await reader.readUuidValue(child);
        break;
      case "HistoryMaxItems":
        metadata.historyMaxItems = reader.readNumberValue(child);
        break;
      case "HistoryMaxSize":
        metadata.historyMaxSize = reader.readNumberValue(child);
        break;
      case "Binaries":
        throw new Error('"Binaries" not implemented');
      case "CustomData":
        metadata.customData = parseCustomDataTag(reader, child, true);
        break;
      case "SettingsChanged":
        metadata.settingsChanged = reader.readDateTimeValue(child);
        break;
      default:
        throw new Error(
          `Unexpected tag "${child.tagName}" while parsing "${element.tagName}"`
        );
    }
  }
  return metadata;
}

// src/xml/tags/parseDeletedObjectsTag.ts
async function parseDeletedObjectsTag(reader, element) {
  reader.assertTag(element, "DeletedObjects");
  const objects = [];
  for (const child of reader.children(element)) {
    switch (child.tagName) {
      case "DeletedObject":
        objects.push(await parseDeletedObjectTag(reader, child));
        break;
      default:
        throw new Error(
          `Unexpected tag "${child.tagName}" while parsing "${element.tagName}"`
        );
    }
  }
  return objects;
}
async function parseDeletedObjectTag(reader, element) {
  reader.assertTag(element, "DeletedObject");
  const deleted = {};
  for (const child of reader.children(element)) {
    switch (child.tagName) {
      case "UUID":
        deleted.uuid = await reader.readUuidValue(child);
        break;
      case "DeletionTime":
        deleted.deletionTime = reader.readDateTimeValue(child);
        break;
      default:
        throw new Error(
          `Unexpected tag "${child.tagName}" while parsing "${element.tagName}"`
        );
    }
  }
  if (!isDeletedObjectComplete(deleted)) {
    throw new Error(`Found "${element.tagName}" tag with incomplete data`);
  }
  return deleted;
}
function isDeletedObjectComplete(deletedObject) {
  return deletedObject.uuid !== void 0 && deletedObject.deletionTime !== void 0;
}

// src/utilities/isDefaultIconNumber.ts
function isDefaultIconNumber(id) {
  const values = Object.values(DefaultIconNumber_default);
  return values.includes(id);
}

// src/xml/tags/parseAutoTypeTag.ts
function parseAutoTypeTag(reader, element) {
  reader.assertTag(element, "AutoType");
  const autoType = {};
  for (const child of reader.children(element)) {
    switch (child.tagName) {
      case "Enabled":
        autoType.enabled = reader.readBooleanValue(child);
        break;
      case "DataTransferObfuscation":
        autoType.dataTransferObfuscation = reader.readNumberValue(child);
        break;
      case "DefaultSequence":
        autoType.defaultSequence = reader.readStringValue(child);
        break;
      case "Association":
        if (!autoType.associations) {
          autoType.associations = [];
        }
        autoType.associations.push(parseAutoTypeAssociationTag(reader, child));
        break;
      default:
        throw new Error(
          `Unexpected tag "${child.tagName}" while parsing "${element.tagName}"`
        );
    }
  }
  return autoType;
}
function parseAutoTypeAssociationTag(reader, element) {
  reader.assertTag(element, "Association");
  const association = {};
  for (const child of reader.children(element)) {
    switch (child.tagName) {
      case "Window":
        association.window = reader.readStringValue(child);
        break;
      case "KeystrokeSequence":
        association.sequence = reader.readStringValue(child);
        break;
      default:
        throw new Error(
          `Unexpected tag "${child.tagName}" while parsing "${element.tagName}"`
        );
    }
  }
  if (!isAutoTypeAssociationComplete(association)) {
    throw new Error(`Found "${element.tagName}" tag with incomplete data`);
  }
  return association;
}
function isAutoTypeAssociationComplete(association) {
  return association.window !== void 0 && association.sequence !== void 0;
}

// src/xml/tags/parseEntryBinaryTag.ts
function parseEntryBinaryTag(reader, element) {
  reader.assertTag(element, "Binary");
  const result = {};
  for (const child of reader.children(element)) {
    switch (child.tagName) {
      case "Key":
        result.key = reader.readStringValue(child);
        break;
      case "Value":
        if (reader.attribute(child, "Ref") === void 0) {
          throw new Error("Inline Binary not implemented");
        }
        result.ref = reader.attribute(child, "Ref");
        break;
      default:
        throw new Error(
          `Unexpected tag "${child.tagName}" while parsing "${element.tagName}"`
        );
    }
  }
  if (!isBinaryTagDataComplete(result)) {
    throw new Error(`Found "${element.tagName}" tag with incomplete data`);
  }
  return result;
}
function isBinaryTagDataComplete(data) {
  return data.key !== void 0 && data.ref !== void 0;
}

// src/xml/tags/parseEntryHistoryTag.ts
async function parseEntryHistoryTag(reader, element) {
  reader.assertTag(element, "History");
  const history = [];
  for (const child of reader.children(element)) {
    switch (child.tagName) {
      case "Entry":
        history.push(await parseEntryTag(reader, child, true));
        break;
      default:
        throw new Error(
          `Unexpected tag "${child.tagName}" while parsing "${element.tagName}"`
        );
    }
  }
  return history;
}

// src/xml/tags/parseEntryStringTag.ts
async function parseEntryStringTag(reader, element) {
  reader.assertTag(element, "String");
  let key;
  let value;
  let isProtected;
  for (const child of reader.children(element)) {
    switch (child.tagName) {
      case "Key":
        key = reader.readStringValue(child);
        break;
      case "Value":
        [value, isProtected] = await reader.readPotentiallyProtectedStringValue(child);
        break;
      default:
        throw new Error(
          `Unexpected tag "${child.tagName}" while parsing "${element.tagName}"`
        );
    }
  }
  if (key === void 0 || value === void 0) {
    throw new Error(`Found "${element.tagName}" tag with incomplete data`);
  }
  return {
    isProtected: isProtected ?? false,
    key,
    value
  };
}

// src/xml/tags/parseTimesTag.ts
function parseTimesTag(reader, element) {
  reader.assertTag(element, "Times");
  const timeInfo = {};
  for (const child of reader.children(element)) {
    switch (child.tagName) {
      case "LastModificationTime":
        timeInfo.lastModificationTime = reader.readDateTimeValue(child);
        break;
      case "CreationTime":
        timeInfo.creationTime = reader.readDateTimeValue(child);
        break;
      case "LastAccessTime":
        timeInfo.lastAccessTime = reader.readDateTimeValue(child);
        break;
      case "ExpiryTime":
        timeInfo.expiryTime = reader.readDateTimeValue(child);
        break;
      case "Expires":
        timeInfo.expires = reader.readBooleanValue(child);
        break;
      case "UsageCount":
        timeInfo.usageCount = reader.readNumberValue(child);
        break;
      case "LocationChanged":
        timeInfo.locationChanged = reader.readDateTimeValue(child);
        break;
      default:
        throw new Error(
          `Unexpected tag "${child.tagName}" while parsing "${element.tagName}"`
        );
    }
  }
  return timeInfo;
}

// src/xml/tags/parseEntryTag.ts
async function parseEntryTag(reader, element, fromHistory) {
  reader.assertTag(element, "Entry");
  const entry = {};
  for (const child of reader.children(element)) {
    switch (child.tagName) {
      case "UUID":
        entry.uuid = await reader.readUuidValue(child);
        break;
      case "String": {
        const value = await parseEntryStringTag(reader, child);
        if (!entry.attributes) {
          entry.attributes = {};
        }
        if (entry.attributes[value.key] !== void 0) {
          throw new Error(
            `Duplicate custom attribute found in entry "${value.key}"`
          );
        }
        entry.attributes[value.key] = value;
        break;
      }
      case "Times":
        entry.timeInfo = parseTimesTag(reader, child);
        break;
      case "History":
        if (fromHistory) {
          throw new Error("Recursive history element found");
        }
        entry.history = await parseEntryHistoryTag(reader, child);
        break;
      case "CustomData":
        entry.customData = parseCustomDataTag(reader, child, false);
        break;
      case "IconID":
        entry.iconNumber = reader.readNumberValue(child);
        if (!isDefaultIconNumber(entry.iconNumber)) {
          console.warn(
            `Entry has unexpected default icon number "${entry.iconNumber}"`
          );
        }
        break;
      case "CustomIconUUID":
        entry.customIcon = await reader.readUuidValue(child);
        break;
      case "ForegroundColor":
        entry.foregroundColor = reader.readColorValue(child);
        break;
      case "BackgroundColor":
        entry.backgroundColor = reader.readColorValue(child);
        break;
      case "OverrideURL":
        entry.overrideURL = reader.readStringValue(child);
        break;
      case "Tags":
        entry.tags = reader.readStringValue(child);
        break;
      case "QualityCheck":
        entry.qualityCheck = reader.readBooleanValue(child);
        break;
      case "Binary": {
        const tag = parseEntryBinaryTag(reader, child);
        const data = reader.readBinaryPoolData(tag.ref);
        if (!entry.attachments) {
          entry.attachments = {};
        }
        entry.attachments[tag.key] = {
          ...tag,
          data
        };
        break;
      }
      case "AutoType":
        entry.autoType = parseAutoTypeTag(reader, child);
        break;
      case "PreviousParentGroup":
        entry.previousParentGroup = await reader.readUuidValue(child);
        break;
      default:
        throw new Error(
          `Unexpected tag "${child.tagName}" while parsing "${element.tagName}"`
        );
    }
  }
  if (!isEntryComplete(entry)) {
    throw new Error(`Found "${element.tagName}" tag with incomplete data`);
  }
  return entry;
}
function isEntryComplete(entry) {
  return entry.uuid !== void 0;
}

// src/xml/tags/parseGroupTag.ts
async function parseGroupTag(reader, element) {
  reader.assertTag(element, "Group");
  const group = {};
  for (const child of reader.children(element)) {
    switch (child.tagName) {
      case "UUID":
        group.uuid = await reader.readUuidValue(child);
        break;
      case "Name":
        group.name = reader.readStringValue(child);
        break;
      case "Notes":
        group.notes = reader.readStringValue(child);
        break;
      case "Tags":
        group.tags = reader.readStringValue(child);
        break;
      case "Times":
        group.timeInfo = parseTimesTag(reader, child);
        break;
      case "IconID":
        group.iconNumber = reader.readNumberValue(child);
        if (!isDefaultIconNumber(group.iconNumber)) {
          console.warn(
            `Group has unexpected default icon number "${group.iconNumber}"`
          );
        }
        break;
      case "CustomIconUUID":
        group.customIcon = await reader.readUuidValue(child);
        break;
      case "Group":
        if (!group.children) {
          group.children = [];
        }
        group.children.push(await parseGroupTag(reader, child));
        break;
      case "Entry":
        if (!group.entries) {
          group.entries = [];
        }
        group.entries.push(await parseEntryTag(reader, child, false));
        break;
      case "CustomData":
        group.customData = parseCustomDataTag(reader, child, false);
        break;
      case "IsExpanded":
        group.isExpanded = reader.readBooleanValue(child);
        break;
      case "DefaultAutoTypeSequence":
        group.defaultAutoTypeSequence = reader.readStringValue(child);
        break;
      case "EnableAutoType":
        group.enableAutoType = reader.readNullableBoolean(child);
        break;
      case "EnableSearching":
        group.enableSearching = reader.readNullableBoolean(child);
        break;
      case "LastTopVisibleEntry":
        group.lastTopVisibleEntry = await reader.readUuidValue(child);
        break;
      case "PreviousParentGroup":
        group.previousParentGroup = await reader.readUuidValue(child);
        break;
      default:
        throw new Error(
          `Unexpected tag "${child.tagName}" while parsing "${element.tagName}"`
        );
    }
  }
  if (!isGroupComplete(group)) {
    throw new Error(`Found "${element.tagName}" tag with incomplete data`);
  }
  return group;
}
function isGroupComplete(group) {
  return group.uuid !== void 0;
}

// src/xml/tags/parseRootTag.ts
async function parseRootTag(reader, element) {
  reader.assertTag(element, "Root");
  const result = {};
  for (const child of reader.children(element)) {
    switch (child.tagName) {
      case "Group":
        result.group = await parseGroupTag(reader, child);
        break;
      case "DeletedObjects":
        result.deletedObjects = await parseDeletedObjectsTag(reader, child);
        break;
      default:
        throw new Error(
          `Unexpected tag "${child.tagName}" while parsing "${element.tagName}"`
        );
    }
  }
  if (!isDatabaseRootComplete(result)) {
    throw new Error(`Found "${element.tagName}" tag with incomplete data`);
  }
  return result;
}
function isDatabaseRootComplete(results) {
  return results.group !== void 0;
}

// src/xml/tags/parseKeePassFileTag.ts
async function parseKeePassFileTag(reader, element) {
  reader.assertTag(element, "KeePassFile");
  const database = {};
  for (const child of reader.children(element)) {
    switch (child.tagName) {
      case "Meta":
        database.metadata = await parseMetaTag(reader, child);
        break;
      case "Root":
        database.root = await parseRootTag(reader, child);
        break;
      default:
        throw new Error(
          `Unexpected tag "${child.tagName}" found in "${element.tagName}"`
        );
    }
  }
  if (!isDatabaseComplete(database)) {
    throw new Error(`Found "${element.tagName}" tag with incomplete data`);
  }
  return database;
}
function isDatabaseComplete(database) {
  return database.metadata !== void 0 && database.root !== void 0;
}

// src/xml/readDatabaseXml.ts
async function readDatabaseXml(contents, binaryPool, streamCipher) {
  const document = new import_xmldom2.DOMParser().parseFromString(contents, "text/xml");
  if (!document.documentElement) {
    throw new Error("Document has no root element.");
  }
  const reader = new KdbxXmlReader(streamCipher, binaryPool);
  return await parseKeePassFileTag(reader, document.documentElement);
}

// src/readKdbxFile.ts
async function readKdbxFile(keys, fileBytes) {
  const outerHeader = parseKdbxHeader(fileBytes);
  const reader = new BufferReader(fileBytes);
  const headerData = reader.readBytes(outerHeader.size);
  const expectedHeaderHash = reader.readBytes(32);
  const expectedHeaderHmacHash = reader.readBytes(32);
  const headerHash = await processHash(HashAlgorithm_default.Sha256, [headerData]);
  if (!Uint8ArrayHelper_default.areEqual(expectedHeaderHash, headerHash)) {
    throw new Error(
      `Invalid header hash. Expected "${displayHash(expectedHeaderHash)}", got "${displayHash(headerHash)}"`
    );
  }
  const compositeKey = ArrayBuffer.isView(keys) ? keys : await transformCompositeKey(outerHeader.fields.kdfParameters, keys);
  const hmacKey = await generateHmacKeySeed(
    outerHeader.fields.masterSeed,
    compositeKey
  );
  const headerHmacHash = await processHmac(
    HashAlgorithm_default.Sha256,
    await generateBlockHmacKey(null, hmacKey),
    [headerData]
  );
  if (!Uint8ArrayHelper_default.areEqual(expectedHeaderHmacHash, headerHmacHash)) {
    throw new Error("HMAC mismatch");
  }
  const innerData = await readHmacHashedBlocks(reader, hmacKey);
  const decryptedData = await cryptInnerData(
    SymmetricCipherDirection_default.Decrypt,
    outerHeader.fields.cipherAlgorithm,
    outerHeader.fields.masterSeed,
    outerHeader.fields.encryptionIV,
    compositeKey,
    innerData
  );
  const decompressedData = decompressInnerData(
    outerHeader.fields.compressionAlgorithm,
    decryptedData
  );
  const innerReader = new BufferReader(decompressedData);
  const innerHeader = readInnerHeaderFields(innerReader);
  const databaseXml = Uint8ArrayHelper_default.toString(innerReader.remaining());
  const streamCipher = await createInnerStreamCipher(
    innerHeader.innerEncryptionAlgorithm,
    innerHeader.innerEncryptionKey
  );
  const database = await readDatabaseXml(
    databaseXml,
    innerHeader.binaryPool,
    streamCipher
  );
  const file = {
    database,
    innerHeader,
    outerHeader
  };
  return {
    compositeKey,
    file
  };
}

// src/blocks/serializeHmacHashedBlocks.ts
async function serializeHmacHashedBlocks(data, key) {
  const chunks = chunkData(data, 1024 * 1024);
  chunks.push(new Uint8Array(0));
  const buffers = [];
  for (let blockIndex = 0; blockIndex < chunks.length; blockIndex++) {
    const chunk = chunks[blockIndex];
    const blockLengthBytes = Uint8ArrayHelper_default.fromUInt32LE(chunk.byteLength);
    const hmac = await processHmac(
      HashAlgorithm_default.Sha256,
      await generateBlockHmacKey(blockIndex, key),
      [Uint8ArrayHelper_default.fromUInt64LE(blockIndex), blockLengthBytes, chunk]
    );
    buffers.push(hmac);
    buffers.push(blockLengthBytes);
    buffers.push(chunk);
  }
  return Uint8Array.from(Buffer.concat(buffers));
}
function chunkData(data, chunkSize) {
  const length = data.byteLength;
  const chunks = [];
  for (let i = 0; i < length; i += chunkSize) {
    const currentChunkSize = Math.min(chunkSize, length - i);
    chunks.push(data.slice(i, i + currentChunkSize));
  }
  return chunks;
}

// src/compression/compressInnerData.ts
function compressInnerData(compressionAlgorithm, data) {
  switch (compressionAlgorithm) {
    case CompressionAlgorithm_default.None:
      return data;
    case CompressionAlgorithm_default.GZip:
      return pako.deflate(data, {
        level: 6,
        strategy: constants_1.Z_DEFAULT_STRATEGY,
        windowBits: 31
      });
  }
}

// src/utilities/BufferWriter.ts
var BufferWriter = class {
  constructor() {
    this.chunks = [];
    this.length = 0;
  }
  toUint8Array() {
    const result = new Uint8Array(this.length);
    let offset = 0;
    for (const chunk of this.chunks) {
      result.set(chunk, offset);
      offset += chunk.byteLength;
    }
    return result;
  }
  writeBytes(data) {
    this.chunks.push(data);
    this.length += data.byteLength;
    return this.length;
  }
  writeInt32LE(number) {
    return this.writeBytes(Uint8ArrayHelper_default.fromInt32LE(number));
  }
  writeUInt8(number) {
    return this.writeBytes(Uint8ArrayHelper_default.fromUInt8(number));
  }
  writeUInt16LE(data) {
    return this.writeBytes(Uint8ArrayHelper_default.fromUInt16LE(data));
  }
  writeUInt32LE(number) {
    return this.writeBytes(Uint8ArrayHelper_default.fromUInt32LE(number));
  }
};

// src/innerHeader/fields/serializeBinaryValue.ts
function serializeBinaryValue(value) {
  const writer = new BufferWriter();
  writer.writeUInt8(value.protectInMemory ? 1 : 0);
  writer.writeBytes(value.data);
  return writer.toUint8Array();
}

// src/innerHeader/fields/serializeEndOfHeaderValue.ts
function serializeEndOfHeaderValue(data) {
  return data;
}

// src/innerHeader/fields/serializeStreamCipherAlgorithmValue.ts
var streamCipherAlgorithmMap = {
  [SymmetricCipherAlgorithm_default.ChaCha20]: ProtectedStreamAlgorithm_default.ChaCha20,
  [SymmetricCipherAlgorithm_default.Salsa20]: ProtectedStreamAlgorithm_default.Salsa20
};
function serializeStreamCipherAlgorithmValue(algorithm) {
  const id = streamCipherAlgorithmMap[algorithm];
  if (!id) {
    throw new Error(
      `Invalid stream cipher algorithm "${displaySymmetricCipherAlgorithm(algorithm)}"`
    );
  }
  return Uint8ArrayHelper_default.fromUInt32LE(id);
}

// src/innerHeader/fields/serializeStreamKeyValue.ts
function serializeStreamKeyValue(data, algorithm) {
  const expectedLength = getSymmetricCipherKeySize(algorithm);
  if (data.byteLength !== expectedLength) {
    throw new Error(
      `Invalid ${displaySymmetricCipherAlgorithm(algorithm)} key length. Expected ${expectedLength} bytes, got ${data.byteLength}`
    );
  }
  return data;
}

// src/innerHeader/serializeInnerHeaderFields.ts
function serializeInnerHeaderFields(header) {
  const writer = new BufferWriter();
  const binaryPool = header.binaryPool ?? [];
  const fields = [
    {
      id: InnerHeaderFieldId_default.InnerEncryptionAlgorithm,
      data: serializeStreamCipherAlgorithmValue(
        header.innerEncryptionAlgorithm
      )
    },
    {
      id: InnerHeaderFieldId_default.InnerEncryptionKey,
      data: serializeStreamKeyValue(
        header.innerEncryptionKey,
        header.innerEncryptionAlgorithm
      )
    },
    ...binaryPool.map((value) => ({
      id: InnerHeaderFieldId_default.Binary,
      data: serializeBinaryValue(value)
    })),
    {
      id: InnerHeaderFieldId_default.EndOfHeader,
      data: header.endOfHeader !== void 0 ? serializeEndOfHeaderValue(header.endOfHeader) : new Uint8Array(0)
    }
  ];
  for (const { data, id } of fields) {
    writer.writeUInt8(id);
    writer.writeUInt32LE(data.byteLength);
    writer.writeBytes(data);
  }
  return writer.toUint8Array();
}

// src/outerHeader/fields/serializeCipherAlgorithmValue.ts
var algorithmToUuidMapping = Object.freeze({
  [SymmetricCipherAlgorithm_default.Aes256_CBC]: SymmetricCipherUuid_default.Aes256,
  [SymmetricCipherAlgorithm_default.Twofish_CBC]: SymmetricCipherUuid_default.Twofish,
  [SymmetricCipherAlgorithm_default.ChaCha20]: SymmetricCipherUuid_default.ChaCha20
});
function serializeCipherAlgorithmValue(algorithm) {
  const uuid = algorithmToUuidMapping[algorithm];
  if (uuid === void 0) {
    throw new Error(`Unsupported cipher algorithm "${algorithm}"`);
  }
  return Uint8ArrayHelper_default.fromUuid(uuid);
}

// src/outerHeader/fields/serializeCompressionAlgorithmValue.ts
function serializeCompressionAlgorithmValue(algorithm) {
  return Uint8ArrayHelper_default.fromUInt32LE(algorithm);
}

// src/outerHeader/fields/serializeEncryptionIvValue.ts
function serializeEncryptionIvValue(data) {
  return data;
}

// src/outerHeader/fields/serializeEndOfHeaderValue.ts
function serializeEndOfHeaderValue2(data) {
  if (data.byteLength !== 4) {
    throw new Error(
      `Invalid end of header length. Expected 4 bytes, got ${data.byteLength}`
    );
  }
  return data;
}

// src/outerHeader/fields/serializeVariantMapValue.ts
function serializeVariantMapValue(variantMap) {
  const writer = new BufferWriter();
  writer.writeUInt16LE(variantMap.version);
  for (const [key, value] of Object.entries(variantMap.values)) {
    if (value === void 0) {
      continue;
    }
    const data = serializeVariantMapField(value);
    writer.writeUInt8(value.type);
    writer.writeInt32LE(key.length);
    writer.writeBytes(Uint8ArrayHelper_default.fromString(key));
    writer.writeInt32LE(data.byteLength);
    writer.writeBytes(data);
  }
  writer.writeUInt8(VariantMapFieldType_default.End);
  return writer.toUint8Array();
}
function serializeVariantMapField(data) {
  switch (data.type) {
    case VariantMapFieldType_default.Bool:
      return Uint8ArrayHelper_default.fromString(data.value ? "1" : "0");
    case VariantMapFieldType_default.ByteArray:
      return Uint8Array.from(data.value);
    case VariantMapFieldType_default.Int32:
      return Uint8ArrayHelper_default.fromInt32LE(data.value);
    case VariantMapFieldType_default.Int64:
      return Uint8ArrayHelper_default.fromInt64LE(data.value);
    case VariantMapFieldType_default.String:
      return Uint8ArrayHelper_default.fromString(data.value);
    case VariantMapFieldType_default.UInt32:
      return Uint8ArrayHelper_default.fromUInt32LE(data.value);
    case VariantMapFieldType_default.UInt64:
      return Uint8ArrayHelper_default.fromUInt64LE(data.value);
    case VariantMapFieldType_default.End:
      return new Uint8Array(0);
  }
}

// src/outerHeader/fields/serializeKdfParametersValue.ts
function serializeKdfParametersValue(data) {
  switch (data.uuid) {
    case KdfUuid_default.Argon2d:
    case KdfUuid_default.Argon2id:
      return serializeVariantMapValue(getArgon2VariantMap(data));
    case KdfUuid_default.AesKdbx3:
    case KdfUuid_default.AesKdbx4:
      return serializeVariantMapValue(getAesVariantMap(data));
  }
}
function getAesVariantMap(parameters) {
  return {
    values: {
      [KdfParameterKey_default.Uuid]: {
        type: VariantMapFieldType_default.ByteArray,
        value: Uint8ArrayHelper_default.fromUuid(parameters.uuid)
      },
      [KdfParameterKey_default.AesRounds]: {
        type: VariantMapFieldType_default.UInt64,
        value: parameters.rounds
      },
      [KdfParameterKey_default.AesSeed]: {
        type: VariantMapFieldType_default.ByteArray,
        value: parameters.seed
      }
    },
    version: parameters.variantMapVersion
  };
}
function getArgon2VariantMap(parameters) {
  return {
    values: {
      [KdfParameterKey_default.Uuid]: {
        type: VariantMapFieldType_default.ByteArray,
        // TODO We should accept UUID or version, not both
        value: Uint8ArrayHelper_default.fromUuid(parameters.uuid)
      },
      [KdfParameterKey_default.Argon2Salt]: {
        type: VariantMapFieldType_default.ByteArray,
        value: parameters.seed
      },
      [KdfParameterKey_default.Argon2Parallelism]: {
        type: VariantMapFieldType_default.UInt64,
        value: parameters.parallelism
      },
      [KdfParameterKey_default.Argon2Memory]: {
        type: VariantMapFieldType_default.UInt64,
        value: parameters.memoryInBytes
      },
      [KdfParameterKey_default.Argon2Iterations]: {
        type: VariantMapFieldType_default.UInt64,
        value: parameters.iterations
      },
      [KdfParameterKey_default.Argon2Version]: {
        type: VariantMapFieldType_default.UInt32,
        value: parameters.version
      }
    },
    version: parameters.variantMapVersion
  };
}

// src/outerHeader/fields/serializeMasterSeedValue.ts
function serializeMasterSeedValue(data) {
  if (data.byteLength !== 32) {
    throw new Error(
      `Invalid master seed length. Expected 32 bytes, got ${data.byteLength}`
    );
  }
  return data;
}

// src/outerHeader/serializeHeaderFields.ts
function serializeHeaderFields(header) {
  const writer = new BufferWriter();
  const fieldsToWrite = [
    {
      id: HeaderFieldId_default.CipherAlgorithm,
      data: serializeCipherAlgorithmValue(header.cipherAlgorithm)
    },
    {
      id: HeaderFieldId_default.CompressionAlgorithm,
      data: serializeCompressionAlgorithmValue(header.compressionAlgorithm)
    },
    {
      id: HeaderFieldId_default.MasterSeed,
      data: serializeMasterSeedValue(header.masterSeed)
    },
    {
      id: HeaderFieldId_default.EncryptionIV,
      data: serializeEncryptionIvValue(header.encryptionIV)
    },
    {
      id: HeaderFieldId_default.KdfParameters,
      data: serializeKdfParametersValue(header.kdfParameters)
    },
    {
      id: HeaderFieldId_default.PublicCustomData,
      data: header.publicCustomData ? serializeVariantMapValue(header.publicCustomData) : void 0
    },
    {
      id: HeaderFieldId_default.EndOfHeader,
      data: header.endOfHeader !== void 0 ? serializeEndOfHeaderValue2(header.endOfHeader) : Uint8ArrayHelper_default.fromString("\r\n\r\n")
    }
  ];
  for (const { data, id } of fieldsToWrite) {
    if (data === void 0) {
      continue;
    }
    writer.writeUInt8(id);
    writer.writeUInt32LE(data.byteLength);
    writer.writeBytes(data);
  }
  return writer.toUint8Array();
}

// src/outerHeader/serializeSignature.ts
function serializeSignature(signature) {
  const data = new BufferWriter();
  data.writeUInt32LE(signature.signature1);
  data.writeUInt32LE(signature.signature2);
  data.writeUInt16LE(signature.versionMinor);
  data.writeUInt16LE(signature.versionMajor);
  return data.toUint8Array();
}

// src/xml/serializeDatabaseXml.ts
var import_xmldom3 = __toESM(require_lib());

// src/utilities/gregorianTimestampFromDate.ts
function gregorianTimestampFromDate(date) {
  const gregorianSecondsFrom1970To0001 = 62135596800;
  const unixTimestamp = date.getTime();
  const unixSeconds = Math.round(unixTimestamp / 1e3);
  return unixSeconds + gregorianSecondsFrom1970To0001;
}

// src/utilities/KdbxXmlWriter.ts
var KdbxXmlWriter = class {
  constructor(document, binaryPool, streamCipher) {
    this.document = document;
    this.binaryPool = binaryPool;
    this.streamCipher = streamCipher;
  }
  createElement(tagName) {
    return this.document.createElement(tagName);
  }
  writeBinary(tagName, value) {
    const valueAsBase64 = Buffer.from(value).toString("base64");
    return this.writeString(tagName, valueAsBase64);
  }
  writeBoolean(tagName, value) {
    const valueAsString = value ? "True" : "False";
    return this.writeString(tagName, valueAsString);
  }
  writeColor(tagName, value) {
    if (value.length && !value.match(/^#[0-f]{6}$/)) {
      throw new Error(`Invalid color value "${value}"`);
    }
    return this.writeString(tagName, value);
  }
  writeDateTime(tagName, value) {
    const timestamp = gregorianTimestampFromDate(value);
    const timestampAsBytes = Uint8ArrayHelper_default.leftJustify(
      Uint8ArrayHelper_default.fromUInt64LE(timestamp),
      8
    ).slice(0, 8);
    return this.writeString(
      tagName,
      Buffer.from(timestampAsBytes).toString("base64")
    );
  }
  writeNullableBoolean(tagName, value) {
    if (value === NullableBoolean_default.True) {
      return this.writeString(tagName, "true");
    } else if (value === NullableBoolean_default.False) {
      return this.writeString(tagName, "false");
    } else {
      return this.writeString(tagName, "null");
    }
  }
  writeNumber(tagName, value) {
    return this.writeString(tagName, value.toString());
  }
  async writeProtectedString(tagName, value) {
    const element = this.createElement(tagName);
    element.setAttribute("Protected", "True");
    if (value.length > 0) {
      const encryptedValue = await this.streamCipher.process(
        Uint8ArrayHelper_default.fromString(value)
      );
      element.textContent = Buffer.from(encryptedValue).toString("base64");
    }
    return element;
  }
  writeString(tagName, value) {
    const element = this.createElement(tagName);
    element.textContent = value;
    return element;
  }
  writeUuid(tagName, value, ensureCompliance) {
    const uuidBytes = Uint8ArrayHelper_default.fromUuid(value, ensureCompliance);
    return this.writeString(tagName, Buffer.from(uuidBytes).toString("base64"));
  }
};

// src/xml/tags/writeCustomDataTag.ts
function writeCustomDataTag(writer, data, withTimes) {
  const element = writer.createElement("CustomData");
  for (const item of Object.values(data)) {
    if (!item) {
      continue;
    }
    element.appendChild(writeCustomDataItemTag(writer, item, withTimes));
  }
  return element;
}
function writeCustomDataItemTag(writer, data, withTimes) {
  const element = writer.createElement("Item");
  element.appendChild(writer.writeString("Key", data.key));
  element.appendChild(writer.writeString("Value", data.value));
  if (withTimes && isCustomDataWithTimes(data) && data.lastModified !== void 0) {
    element.appendChild(writer.writeDateTime("Times", data.lastModified));
  }
  return element;
}
function isCustomDataWithTimes(data) {
  return data.lastModified !== void 0;
}

// src/xml/tags/writeIconTag.ts
function writeIconTag(writer, icon) {
  const element = writer.createElement("Icon");
  element.appendChild(writer.writeUuid("UUID", icon.uuid, true));
  if (icon.name !== void 0) {
    element.appendChild(writer.writeString("Name", icon.name));
  }
  if (icon.lastModificationTime !== void 0) {
    element.appendChild(
      writer.writeDateTime("LastModificationTime", icon.lastModificationTime)
    );
  }
  element.appendChild(writer.writeBinary("Data", icon.data));
  return element;
}

// src/xml/tags/writeCustomIconsTag.ts
function writeCustomIconsTag(writer, customIcons) {
  const element = writer.createElement("CustomIcons");
  for (const icon of Object.values(customIcons)) {
    if (icon === void 0) {
      continue;
    }
    element.appendChild(writeIconTag(writer, icon));
  }
  return element;
}

// src/xml/tags/writeMemoryProtectionTag.ts
function writeMemoryProtectionTag(writer, memoryProtection) {
  const element = writer.createElement("MemoryProtection");
  if (memoryProtection.protectTitle !== void 0) {
    element.appendChild(
      writer.writeBoolean("ProtectTitle", memoryProtection.protectTitle)
    );
  }
  if (memoryProtection.protectUserName !== void 0) {
    element.appendChild(
      writer.writeBoolean("ProtectUserName", memoryProtection.protectUserName)
    );
  }
  if (memoryProtection.protectPassword !== void 0) {
    element.appendChild(
      writer.writeBoolean("ProtectPassword", memoryProtection.protectPassword)
    );
  }
  if (memoryProtection.protectURL !== void 0) {
    element.appendChild(
      writer.writeBoolean("ProtectURL", memoryProtection.protectURL)
    );
  }
  if (memoryProtection.protectNotes !== void 0) {
    element.appendChild(
      writer.writeBoolean("ProtectNotes", memoryProtection.protectNotes)
    );
  }
  return element;
}

// src/xml/tags/writeMetaTag.ts
function writeMetaTag(writer, metadata) {
  const element = writer.createElement("Meta");
  if (metadata.generator !== void 0) {
    element.appendChild(writer.writeString("Generator", metadata.generator));
  }
  if (metadata.headerHash !== void 0) {
    element.appendChild(writer.writeBinary("HeaderHash", metadata.headerHash));
  }
  if (metadata.name !== void 0) {
    element.appendChild(writer.writeString("DatabaseName", metadata.name));
  }
  if (metadata.nameChanged !== void 0) {
    element.appendChild(
      writer.writeDateTime("DatabaseNameChanged", metadata.nameChanged)
    );
  }
  if (metadata.description !== void 0) {
    element.appendChild(
      writer.writeString("DatabaseDescription", metadata.description)
    );
  }
  if (metadata.descriptionChanged !== void 0) {
    element.appendChild(
      writer.writeDateTime(
        "DatabaseDescriptionChanged",
        metadata.descriptionChanged
      )
    );
  }
  if (metadata.defaultUserName !== void 0) {
    element.appendChild(
      writer.writeString("DefaultUserName", metadata.defaultUserName)
    );
  }
  if (metadata.defaultUserNameChanged !== void 0) {
    element.appendChild(
      writer.writeDateTime(
        "DefaultUserNameChanged",
        metadata.defaultUserNameChanged
      )
    );
  }
  if (metadata.maintenanceHistoryDays !== void 0) {
    element.appendChild(
      writer.writeNumber(
        "MaintenanceHistoryDays",
        metadata.maintenanceHistoryDays
      )
    );
  }
  if (metadata.color !== void 0) {
    element.appendChild(writer.writeColor("Color", metadata.color));
  }
  if (metadata.masterKeyChanged !== void 0) {
    element.appendChild(
      writer.writeDateTime("MasterKeyChanged", metadata.masterKeyChanged)
    );
  }
  if (metadata.masterKeyChangeRec !== void 0) {
    element.appendChild(
      writer.writeNumber("MasterKeyChangeRec", metadata.masterKeyChangeRec)
    );
  }
  if (metadata.masterKeyChangeForce !== void 0) {
    element.appendChild(
      writer.writeNumber("MasterKeyChangeForce", metadata.masterKeyChangeForce)
    );
  }
  if (metadata.memoryProtection !== void 0) {
    element.appendChild(
      writeMemoryProtectionTag(writer, metadata.memoryProtection)
    );
  }
  if (metadata.customIcons !== void 0) {
    element.appendChild(writeCustomIconsTag(writer, metadata.customIcons));
  }
  if (metadata.recycleBinEnabled !== void 0) {
    element.appendChild(
      writer.writeBoolean("RecycleBinEnabled", metadata.recycleBinEnabled)
    );
  }
  if (metadata.recycleBinUuid !== void 0) {
    element.appendChild(
      writer.writeUuid("RecycleBinUUID", metadata.recycleBinUuid, false)
    );
  }
  if (metadata.recycleBinChanged !== void 0) {
    element.appendChild(
      writer.writeDateTime("RecycleBinChanged", metadata.recycleBinChanged)
    );
  }
  if (metadata.entryTemplatesGroup !== void 0) {
    element.appendChild(
      writer.writeUuid(
        "EntryTemplatesGroup",
        metadata.entryTemplatesGroup,
        false
      )
    );
  }
  if (metadata.entryTemplatesGroupChanged !== void 0) {
    element.appendChild(
      writer.writeDateTime(
        "EntryTemplatesGroupChanged",
        metadata.entryTemplatesGroupChanged
      )
    );
  }
  if (metadata.lastSelectedGroup !== void 0) {
    element.appendChild(
      writer.writeUuid("LastSelectedGroup", metadata.lastSelectedGroup, false)
    );
  }
  if (metadata.lastTopVisibleGroup !== void 0) {
    element.appendChild(
      writer.writeUuid(
        "LastTopVisibleGroup",
        metadata.lastTopVisibleGroup,
        false
      )
    );
  }
  if (metadata.historyMaxItems !== void 0) {
    element.appendChild(
      writer.writeNumber("HistoryMaxItems", metadata.historyMaxItems)
    );
  }
  if (metadata.historyMaxSize !== void 0) {
    element.appendChild(
      writer.writeNumber("HistoryMaxSize", metadata.historyMaxSize)
    );
  }
  if (metadata.binaries !== void 0) {
    throw new Error('"Binaries" not implemented');
  }
  if (metadata.customData !== void 0) {
    element.appendChild(writeCustomDataTag(writer, metadata.customData, true));
  }
  if (metadata.settingsChanged !== void 0) {
    element.appendChild(
      writer.writeDateTime("SettingsChanged", metadata.settingsChanged)
    );
  }
  return element;
}

// src/xml/tags/writeDeletedObjectsTag.ts
function writeDeletedObjectsTag(writer, deletedObjects) {
  const element = writer.createElement("DeletedObjects");
  for (const deletedObject of deletedObjects) {
    element.appendChild(writeDeletedObjectTag(writer, deletedObject));
  }
  return element;
}
function writeDeletedObjectTag(writer, deletedObject) {
  const element = writer.createElement("DeletedObject");
  element.appendChild(writer.writeUuid("UUID", deletedObject.uuid, true));
  element.appendChild(
    writer.writeDateTime("DeletionTime", deletedObject.deletionTime)
  );
  return element;
}

// src/xml/tags/writeAutoTypeTag.ts
function writeAutoTypeTag(writer, autoType) {
  const element = writer.createElement("AutoType");
  if (autoType.enabled !== void 0) {
    element.appendChild(writer.writeBoolean("Enabled", autoType.enabled));
  }
  if (autoType.dataTransferObfuscation !== void 0) {
    element.appendChild(
      writer.writeNumber(
        "DataTransferObfuscation",
        autoType.dataTransferObfuscation
      )
    );
  }
  if (autoType.defaultSequence !== void 0) {
    element.appendChild(
      writer.writeString("DefaultSequence", autoType.defaultSequence)
    );
  }
  if (autoType.associations !== void 0) {
    for (const value of autoType.associations) {
      element.appendChild(writeAutoTypeAssociationTag(writer, value));
    }
  }
  return element;
}
function writeAutoTypeAssociationTag(writer, association) {
  const element = writer.createElement("Association");
  element.appendChild(writer.writeString("Window", association.window));
  element.appendChild(
    writer.writeString("KeystrokeSequence", association.sequence)
  );
  return element;
}

// src/xml/tags/writeEntryBinaryTag.ts
function writeEntryBinaryTag(writer, attachment) {
  const element = writer.createElement("Binary");
  element.appendChild(writer.writeString("Key", attachment.key));
  const value = writer.createElement("Value");
  value.setAttribute("Ref", attachment.ref);
  element.appendChild(value);
  return element;
}

// src/xml/tags/writeEntryHistoryTag.ts
async function writeEntryHistoryTag(writer, history) {
  const element = writer.createElement("History");
  if (history !== void 0) {
    for (const entry of history) {
      element.appendChild(await writeEntryTag(writer, entry, true));
    }
  }
  return element;
}

// src/xml/tags/writeEntryStringTag.ts
async function writeEntryStringTag(writer, attribute) {
  const element = writer.createElement("String");
  element.appendChild(writer.writeString("Key", attribute.key));
  if (attribute.isProtected) {
    element.appendChild(
      await writer.writeProtectedString("Value", attribute.value)
    );
  } else {
    element.appendChild(writer.writeString("Value", attribute.value));
  }
  return element;
}

// src/xml/tags/writeTimesTag.ts
function writeTimesTag(writer, times) {
  const element = writer.createElement("Times");
  if (times.lastModificationTime !== void 0) {
    element.appendChild(
      writer.writeDateTime("LastModificationTime", times.lastModificationTime)
    );
  }
  if (times.creationTime !== void 0) {
    element.appendChild(
      writer.writeDateTime("CreationTime", times.creationTime)
    );
  }
  if (times.lastAccessTime !== void 0) {
    element.appendChild(
      writer.writeDateTime("LastAccessTime", times.lastAccessTime)
    );
  }
  if (times.expiryTime !== void 0) {
    element.appendChild(writer.writeDateTime("ExpiryTime", times.expiryTime));
  }
  if (times.expires !== void 0) {
    element.appendChild(writer.writeBoolean("Expires", times.expires));
  }
  if (times.usageCount !== void 0) {
    element.appendChild(writer.writeNumber("UsageCount", times.usageCount));
  }
  if (times.locationChanged !== void 0) {
    element.appendChild(
      writer.writeDateTime("LocationChanged", times.locationChanged)
    );
  }
  return element;
}

// src/xml/tags/writeEntryTag.ts
async function writeEntryTag(writer, entry, fromHistory) {
  const element = writer.createElement("Entry");
  element.appendChild(writer.writeUuid("UUID", entry.uuid, true));
  if (entry.iconNumber !== void 0) {
    element.appendChild(writer.writeNumber("IconID", entry.iconNumber));
  }
  if (entry.foregroundColor !== void 0) {
    element.appendChild(
      writer.writeColor("ForegroundColor", entry.foregroundColor)
    );
  }
  if (entry.backgroundColor !== void 0) {
    element.appendChild(
      writer.writeColor("BackgroundColor", entry.backgroundColor)
    );
  }
  if (entry.overrideURL !== void 0) {
    element.appendChild(writer.writeString("OverrideURL", entry.overrideURL));
  }
  if (entry.tags !== void 0) {
    element.appendChild(writer.writeString("Tags", entry.tags));
  }
  if (entry.timeInfo !== void 0) {
    element.appendChild(writeTimesTag(writer, entry.timeInfo));
  }
  if (entry.qualityCheck !== void 0) {
    element.appendChild(
      writer.writeBoolean("QualityCheck", entry.qualityCheck)
    );
  }
  if (entry.previousParentGroup !== void 0) {
    element.appendChild(
      writer.writeUuid("PreviousParentGroup", entry.previousParentGroup, true)
    );
  }
  if (entry.attributes !== void 0) {
    for (const value of Object.values(entry.attributes)) {
      if (value === void 0) {
        continue;
      }
      element.appendChild(await writeEntryStringTag(writer, value));
    }
  }
  if (entry.attachments !== void 0) {
    for (const attachment of Object.values(entry.attachments)) {
      if (attachment === void 0) {
        continue;
      }
      element.appendChild(writeEntryBinaryTag(writer, attachment));
    }
  }
  if (entry.autoType !== void 0) {
    element.appendChild(writeAutoTypeTag(writer, entry.autoType));
  }
  if (entry.customData !== void 0) {
    element.appendChild(writeCustomDataTag(writer, entry.customData, false));
  }
  if (entry.customIcon !== void 0) {
    element.appendChild(
      writer.writeUuid("CustomIconUUID", entry.customIcon, true)
    );
  }
  if (entry.history !== void 0) {
    if (fromHistory) {
      throw new Error("Recursive history element found");
    }
    element.appendChild(await writeEntryHistoryTag(writer, entry.history));
  }
  return element;
}

// src/xml/tags/writeGroupTag.ts
async function writeGroupTag(writer, group) {
  const element = writer.createElement("Group");
  element.appendChild(writer.writeUuid("UUID", group.uuid, true));
  if (group.name !== void 0) {
    element.appendChild(writer.writeString("Name", group.name));
  }
  if (group.notes !== void 0) {
    element.appendChild(writer.writeString("Notes", group.notes));
  }
  if (group.tags !== void 0) {
    element.appendChild(writer.writeString("Tags", group.tags));
  }
  if (group.iconNumber !== void 0) {
    element.appendChild(writer.writeNumber("IconID", group.iconNumber));
  }
  if (group.customIcon !== void 0) {
    element.appendChild(
      writer.writeUuid("CustomIconUUID", group.customIcon, true)
    );
  }
  if (group.timeInfo !== void 0) {
    element.appendChild(writeTimesTag(writer, group.timeInfo));
  }
  if (group.isExpanded !== void 0) {
    element.appendChild(writer.writeBoolean("IsExpanded", group.isExpanded));
  }
  if (group.defaultAutoTypeSequence !== void 0) {
    element.appendChild(
      writer.writeString(
        "DefaultAutoTypeSequence",
        group.defaultAutoTypeSequence
      )
    );
  }
  if (group.enableAutoType !== void 0) {
    element.appendChild(
      writer.writeNullableBoolean("EnableAutoType", group.enableAutoType)
    );
  }
  if (group.enableSearching !== void 0) {
    element.appendChild(
      writer.writeNullableBoolean("EnableSearching", group.enableSearching)
    );
  }
  if (group.lastTopVisibleEntry !== void 0) {
    element.appendChild(
      writer.writeUuid("LastTopVisibleEntry", group.lastTopVisibleEntry, false)
    );
  }
  if (group.customData !== void 0) {
    element.appendChild(writeCustomDataTag(writer, group.customData, false));
  }
  if (group.previousParentGroup !== void 0) {
    element.appendChild(
      writer.writeUuid("PreviousParentGroup", group.previousParentGroup, true)
    );
  }
  if (group.entries !== void 0) {
    for (const entry of group.entries) {
      element.appendChild(await writeEntryTag(writer, entry, false));
    }
  }
  if (group.children !== void 0) {
    for (const child of group.children) {
      element.appendChild(await writeGroupTag(writer, child));
    }
  }
  return element;
}

// src/xml/tags/writeRootTag.ts
async function writeRootTag(writer, root) {
  const element = writer.createElement("Root");
  element.appendChild(await writeGroupTag(writer, root.group));
  if (root.deletedObjects !== void 0) {
    element.appendChild(writeDeletedObjectsTag(writer, root.deletedObjects));
  }
  return element;
}

// src/xml/tags/writeKeePassFileTag.ts
async function writeKeePassFileTag(writer, database) {
  const keePassFile = writer.createElement("KeePassFile");
  keePassFile.appendChild(writeMetaTag(writer, database.metadata));
  keePassFile.appendChild(await writeRootTag(writer, database.root));
  return keePassFile;
}

// src/xml/serializeDatabaseXml.ts
async function serializeDatabaseXml(database, binaryPool, streamCipher) {
  const document = new import_xmldom3.DOMImplementation().createDocument("", "", null);
  const writer = new KdbxXmlWriter(document, binaryPool, streamCipher);
  const root = await writeKeePassFileTag(writer, database);
  document.appendChild(root);
  const serialized = new import_xmldom3.XMLSerializer().serializeToString(document);
  return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' + serialized + "\n";
}

// src/writeKdbxFile.ts
async function writeKdbxFile(keys, file) {
  const signature = serializeSignature(file.outerHeader.signature);
  const compositeKey = await transformCompositeKey(
    file.outerHeader.fields.kdfParameters,
    keys
  );
  const outerHeader = serializeHeaderFields(file.outerHeader.fields);
  const outerHeaderHash = await processHash(HashAlgorithm_default.Sha256, [
    signature,
    outerHeader
  ]);
  const outerHeaderHmacKey = await generateHmacKeySeed(
    file.outerHeader.fields.masterSeed,
    compositeKey
  );
  const outerHeaderHmac = await processHmac(
    HashAlgorithm_default.Sha256,
    await generateBlockHmacKey(null, outerHeaderHmacKey),
    [signature, outerHeader]
  );
  const innerHeader = serializeInnerHeaderFields(file.innerHeader);
  const streamCipher = await createInnerStreamCipher(
    file.innerHeader.innerEncryptionAlgorithm,
    file.innerHeader.innerEncryptionKey
  );
  const databaseXml = await serializeDatabaseXml(
    file.database,
    file.innerHeader.binaryPool,
    streamCipher
  );
  const innerData = Buffer.concat([
    innerHeader,
    Uint8ArrayHelper_default.fromString(databaseXml)
  ]);
  const compressedData = compressInnerData(
    file.outerHeader.fields.compressionAlgorithm,
    innerData
  );
  const encryptedData = await cryptInnerData(
    SymmetricCipherDirection_default.Encrypt,
    file.outerHeader.fields.cipherAlgorithm,
    file.outerHeader.fields.masterSeed,
    file.outerHeader.fields.encryptionIV,
    compositeKey,
    compressedData
  );
  const blocks = await serializeHmacHashedBlocks(
    encryptedData,
    outerHeaderHmacKey
  );
  const bytes = Uint8Array.from(
    Buffer.concat([
      signature,
      outerHeader,
      outerHeaderHash,
      outerHeaderHmac,
      blocks
    ])
  );
  return {
    bytes,
    compositeKey
  };
}
export {
  Argon2Type_default as Argon2Type,
  Argon2Version_default as Argon2Version,
  CompressionAlgorithm_default as CompressionAlgorithm,
  DefaultIconNumber_default as DefaultIconNumber,
  HashAlgorithm_default as HashAlgorithm,
  KdbxError,
  KdfUuid_default as KdfUuid,
  KeePass2,
  SymmetricCipherAlgorithm_default as SymmetricCipherAlgorithm,
  SymmetricCipherDirection_default as SymmetricCipherDirection,
  SymmetricCipherUuid_default as SymmetricCipherUuid,
  UnknownKdbxSignatureError,
  UnsupportedKdbxVersionError,
  benchmarkAes256KdfKey,
  benchmarkArgon2KdfKey,
  configureDependencies,
  createAesKdfParameters,
  createArgon2KdfParameters,
  createChallengeResponseKey,
  createFileKey,
  createInnerHeaderEncryptionKey,
  createOuterHeaderEncryptionIV,
  createOuterHeaderMasterSeed,
  createPasswordKey,
  parseKdbxHeader,
  randomizeSeeds,
  readKdbxFile,
  writeKdbxFile
};
/*! Bundled license information:

pako/dist/pako.esm.mjs:
  (*! pako 2.1.0 https://github.com/nodeca/pako @license (MIT AND Zlib) *)
*/
//# sourceMappingURL=index.mjs.map
