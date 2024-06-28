"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

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

// src/index.ts
var index_exports = {};
__export(index_exports, {
  Argon2Type: () => Argon2Type_default,
  Argon2Version: () => Argon2Version_default,
  CompressionAlgorithm: () => CompressionAlgorithm_default,
  DefaultIconNumber: () => DefaultIconNumber_default,
  HashAlgorithm: () => HashAlgorithm_default,
  KdbxError: () => KdbxError,
  KdfUuid: () => KdfUuid_default,
  KeePass2: () => KeePass2,
  SymmetricCipherAlgorithm: () => SymmetricCipherAlgorithm_default,
  SymmetricCipherDirection: () => SymmetricCipherDirection_default,
  SymmetricCipherUuid: () => SymmetricCipherUuid_default,
  UnknownKdbxSignatureError: () => UnknownKdbxSignatureError,
  UnsupportedKdbxVersionError: () => UnsupportedKdbxVersionError,
  benchmarkAes256KdfKey: () => benchmarkAes256KdfKey,
  benchmarkArgon2KdfKey: () => benchmarkArgon2KdfKey,
  configureDependencies: () => configureDependencies,
  createAesKdfParameters: () => createAesKdfParameters,
  createArgon2KdfParameters: () => createArgon2KdfParameters,
  createChallengeResponseKey: () => createChallengeResponseKey,
  createFileKey: () => createFileKey,
  createInnerHeaderEncryptionKey: () => createInnerHeaderEncryptionKey,
  createOuterHeaderEncryptionIV: () => createOuterHeaderEncryptionIV,
  createOuterHeaderMasterSeed: () => createOuterHeaderMasterSeed,
  createPasswordKey: () => createPasswordKey,
  parseKdbxHeader: () => parseKdbxHeader,
  randomizeSeeds: () => randomizeSeeds,
  readKdbxFile: () => readKdbxFile,
  writeKdbxFile: () => writeKdbxFile
});
module.exports = __toCommonJS(index_exports);

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
var import_crypto2 = __toESM(require("crypto"));

// src/crypto/createAes256CbcCipher.ts
var import_crypto = __toESM(require("crypto"));

// src/enums/SymmetricCipherDirection.ts
var SymmetricCipherDirection = Object.freeze({
  Decrypt: 0,
  Encrypt: 1
});
var SymmetricCipherDirection_default = SymmetricCipherDirection;

// src/crypto/createAes256CbcCipher.ts
async function createAes256CbcCipher(direction, key, iv) {
  const cipher = direction === SymmetricCipherDirection_default.Encrypt ? import_crypto.default.createCipheriv("aes-256-cbc", key, iv).setAutoPadding(true) : import_crypto.default.createDecipheriv("aes-256-cbc", key, iv).setAutoPadding(true);
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
  hash: (algorithm) => Promise.resolve(import_crypto2.default.createHash(algorithm)),
  hmac: (algorithm, key) => Promise.resolve(import_crypto2.default.createHmac(algorithm, key)),
  randomBytes: (length) => Promise.resolve(import_crypto2.default.randomBytes(length)),
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

// src/benchmarkAes256KdfKey.ts
async function benchmarkAes256KdfKey(targetMilliseconds) {
  const transformer = getDependency("transformAes256KdfKey");
  const key = Uint8Array.from({ length: 16 }, () => 126);
  const seed = Uint8Array.from({ length: 32 }, () => 75);
  const trials = 3;
  const rounds = 1e5;
  const parameters = {
    rounds: BigInt(rounds),
    seed,
    uuid: KdfUuid_default.AesKdbx4,
    variantMapVersion: KeePass2.variantMapVersion
  };
  const startTime = Date.now();
  for (let i = 0; i < trials; ++i) {
    await transformer(key, parameters);
  }
  const duration = Date.now() - startTime;
  return Math.floor(rounds * trials * targetMilliseconds / duration);
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

// src/benchmarkArgon2KdfKey.ts
async function benchmarkArgon2KdfKey(targetMilliseconds, memoryInBytes = BigInt(65536 * 1024), parallelism = BigInt(2), type = Argon2Type_default.Argon2d, version = Argon2Version_default.V13) {
  const transformer = getDependency("transformArgon2KdfKey");
  const key = Uint8Array.from({ length: 16 }, () => 126);
  const parameters = {
    iterations: BigInt(10),
    memoryInBytes,
    parallelism,
    seed: key,
    type,
    uuid: type === Argon2Type_default.Argon2d ? KdfUuid_default.Argon2d : KdfUuid_default.Argon2id,
    variantMapVersion: KeePass2.variantMapVersion,
    version
  };
  const startTime = Date.now();
  await transformer(key, parameters);
  const duration = BigInt(Date.now() - startTime);
  return Math.floor(
    Number(parameters.iterations * (BigInt(targetMilliseconds) / duration))
  );
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

// src/utilities/XmlReader.ts
var XmlReader = class _XmlReader {
  constructor(contents) {
    this.contents = contents;
    this.totalSize = 0;
    this.totalSize = this.contents.length;
    const firstElement = this.readNextTag(0);
    if (!firstElement) {
      throw new Error("No elements found");
    }
    this.currentElement = firstElement;
  }
  assertOpenedTagOf(tagName) {
    if (this.current.name !== tagName) {
      throw new Error(`Expected "${tagName}", found "${this.current.name}"`);
    }
    if (!this.current.isOpen) {
      throw new Error(`Expected open tag of "${tagName}", close found`);
    }
  }
  get current() {
    return this.currentElement;
  }
  createChildReader(contents) {
    return new _XmlReader(contents);
  }
  readFromCurrent() {
    const endTag = this.currentElement.isClose ? this.currentElement : this.findEndOfCurrentElement();
    if (endTag?.name !== this.currentElement.name) {
      throw new Error(
        `Unable to find end "${this.currentElement.name}" element`
      );
    }
    const reader = this.createChildReader(
      this.contents.slice(this.currentElement.position[0], endTag.position[1])
    );
    this.currentElement = endTag;
    return reader;
  }
  readNextStartElement() {
    let nextStart = this.readNextTag(this.currentElement.position[1]);
    if (!nextStart) {
      return false;
    }
    while (!nextStart.isOpen) {
      nextStart = this.readNextTag(nextStart.position[1]);
      if (!nextStart) {
        return false;
      }
    }
    this.currentElement = nextStart;
    return true;
  }
  skipCurrentElement() {
    if (this.currentElement.isOpen) {
      if (this.currentElement.isClose) {
        const nextTag = this.readNextTag(this.currentElement.position[1]);
        if (!nextTag) {
          throw new Error("Unable to find next element");
        }
        this.currentElement = nextTag;
      } else {
        const endTag = this.findEndOfCurrentElement();
        if (endTag?.name !== this.currentElement.name) {
          throw new Error(
            `Unable to find end "${this.currentElement.name}" element`
          );
        }
        this.currentElement = endTag;
      }
    }
  }
  readElementText() {
    if (!this.currentElement.isOpen) {
      throw new Error(
        `Cannot read text from non-open element "${this.currentElement.name}"`
      );
    }
    if (this.currentElement.isClose) {
      return "";
    }
    const openTag = this.currentElement;
    const endTag = this.findEndOfCurrentElement();
    if (endTag?.name !== this.currentElement.name) {
      throw new Error(
        `Unable to find end "${this.currentElement.name}" element`
      );
    }
    this.currentElement = endTag;
    return this.contents.slice(openTag.position[1], endTag.position[0]);
  }
  findEndOfCurrentElement() {
    let openChildTags = 0;
    let endTag = this.readNextTag(this.currentElement.position[1]);
    if (!endTag) {
      return void 0;
    }
    if (endTag.name === this.currentElement.name && endTag.isClose) {
      return endTag;
    }
    for (; ; ) {
      endTag = this.readNextTag(endTag.position[1]);
      if (!endTag) {
        return void 0;
      }
      if (endTag.name === this.currentElement.name) {
        if (endTag.isOpen) {
          openChildTags++;
          continue;
        }
        if (openChildTags) {
          openChildTags--;
        } else {
          break;
        }
      }
    }
    if (endTag.name !== this.currentElement.name) {
      return void 0;
    }
    return endTag;
  }
  readNextTag(startPosition) {
    const startIndex = this.contents.indexOf("<", startPosition);
    if (startIndex === -1) {
      return void 0;
    }
    const endIndex = this.contents.indexOf(">", startIndex);
    if (endIndex === -1) {
      return void 0;
    }
    const position = [startIndex, endIndex + 1];
    let tagInside = this.contents.slice(startIndex + 1, endIndex);
    let isMeta = false;
    let isOpen = true;
    let isClose = false;
    if (tagInside[0] === "?") {
      isMeta = true;
      isOpen = false;
      tagInside = tagInside.slice(1, -1);
    }
    if (tagInside.endsWith("/")) {
      isClose = true;
      tagInside = tagInside.slice(0, -1);
    }
    if (tagInside.startsWith("/")) {
      isOpen = false;
      isClose = true;
      tagInside = tagInside.slice(1);
    }
    tagInside = tagInside.trim();
    const firstSpace = tagInside.indexOf(" ");
    if (firstSpace === -1) {
      return {
        name: tagInside,
        attributes: {},
        isMeta,
        isOpen,
        isClose,
        position
      };
    }
    const tagName = tagInside.substring(0, firstSpace);
    tagInside = tagInside.substring(firstSpace);
    const attributes = _XmlReader.splitAttributes(tagInside);
    return {
      name: tagName,
      attributes,
      isMeta,
      isOpen,
      isClose,
      position
    };
  }
  static splitAttributes(input) {
    const attributes = {};
    let remaining = input.trim();
    while (remaining.length) {
      const stringMatch = /^([^=\s]+)=(['"])((?!\2).*?)?\2/g.exec(remaining);
      if (stringMatch) {
        remaining = remaining.substring(stringMatch[0].length).trim();
        attributes[stringMatch[1]] = _XmlReader.decodeAttribute(
          stringMatch[3] || ""
        );
        continue;
      }
      const booleanMatch = /^([^\t\n\f />"'=]+)($|\s)/g.exec(remaining);
      if (booleanMatch) {
        remaining = remaining.substring(booleanMatch[0].length).trim();
        attributes[booleanMatch[1]] = "true";
        continue;
      }
      throw new Error(`Invalid attribute format "${remaining}"`);
    }
    return attributes;
  }
  static decodeAttribute(input) {
    return input.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
  }
  static decodeText(input) {
    return input.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"');
  }
};

// src/utilities/KdbxXmlReader.ts
var KdbxXmlReader = class _KdbxXmlReader extends XmlReader {
  constructor(contents, cipher, binaryPool) {
    super(contents);
    this.cipher = cipher;
    this.binaryPool = binaryPool;
  }
  createChildReader(contents) {
    return new _KdbxXmlReader(contents, this.cipher, this.binaryPool);
  }
  isProtectedValue() {
    return this.current.attributes.Protected?.toLowerCase() === "true";
  }
  readBinaryPoolData(index) {
    const poolValue = this.binaryPool.find((value) => value.index === index);
    if (!poolValue) {
      throw new Error(`Binary pool value not found for index "${index}"`);
    }
    return poolValue.data;
  }
  async readBinaryValue() {
    const value = this.readElementText();
    let data = Uint8ArrayHelper_default.fromBase64(value);
    if (this.isProtectedValue()) {
      data = await this.cipher.process(data);
    }
    return data;
  }
  readBooleanValue() {
    const value = this.readStringValue();
    if (!value.length) {
      return false;
    }
    const valueAsLower = value.toLowerCase();
    if (valueAsLower === "true") {
      return true;
    }
    if (valueAsLower === "false") {
      return false;
    }
    throw new Error(`Invalid bool value "${value}"`);
  }
  readColorValue() {
    const colorString = this.readStringValue();
    if (!colorString.length) {
      return colorString;
    }
    if (!colorString.match(/^#[0-f]{6}$/)) {
      throw new Error(`Invalid color value "${colorString}"`);
    }
    return colorString;
  }
  readDateTimeValue() {
    const value = this.readStringValue();
    if (!isBase64(value)) {
      return this.readDateTimeFromIsoString(value, true);
    }
    return this.readDateTimeFromBase64(value);
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
  readDateTimeFromIsoString(input, strictMode) {
    const date = new Date(input);
    if (!isNaN(date.getTime())) {
      return date;
    }
    if (strictMode) {
      throw new Error(
        `Unexpected date format. Expected ISO 8601 date string, got "${input}"`
      );
    }
    return /* @__PURE__ */ new Date();
  }
  readNullableBoolean() {
    const value = this.readStringValue().toLowerCase();
    if (value === "null") {
      return NullableBoolean_default.Inherit;
    } else if (value === "true") {
      return NullableBoolean_default.True;
    } else if (value === "false") {
      return NullableBoolean_default.False;
    }
    throw new Error(`Invalid NullableBoolean value "${value}"`);
  }
  readNumberValue(radix = 10) {
    const text = this.readElementText();
    return parseInt(text, radix);
  }
  async readPotentiallyProtectedStringValue() {
    const isProtected = this.isProtectedValue();
    if (this.current.isClose) {
      return ["", isProtected];
    }
    const text = this.readElementText();
    if (!isProtected) {
      return [XmlReader.decodeText(text), isProtected];
    }
    const data = await this.cipher.process(Uint8ArrayHelper_default.fromBase64(text));
    return [XmlReader.decodeText(Uint8ArrayHelper_default.toString(data)), isProtected];
  }
  readStringValue() {
    if (this.current.isClose) {
      return "";
    }
    return XmlReader.decodeText(this.readElementText());
  }
  readUnsignedNumberValue(radix = 10) {
    const value = this.readNumberValue(radix);
    if (value < 0) {
      throw new Error(`Invalid unsigned number "${value}"`);
    }
    return value;
  }
  async readUuidValue() {
    const data = await this.readBinaryValue();
    if (data.byteLength !== 16) {
      throw new Error(
        `Invalid UUID length. Expected 16 bytes, got ${data.byteLength}`
      );
    }
    return displayUuid(data);
  }
};

// src/xml/tags/parseCustomDataTag.ts
function parseCustomDataTag(reader, withTimes) {
  reader.assertOpenedTagOf("CustomData");
  const customData = {};
  while (reader.readNextStartElement()) {
    switch (reader.current.name) {
      case "Item": {
        const item = parseCustomDataItemTag(
          reader.readFromCurrent(),
          withTimes
        );
        if (!item.key || !item.value) {
          throw new Error("Missing custom data key or value");
        }
        customData[item.key] = item;
        break;
      }
      default:
        throw new Error(
          `Unexpected tag "${reader.current.name}" while parsing "CustomData"`
        );
    }
  }
  return customData;
}
function parseCustomDataItemTag(reader, withTimes) {
  reader.assertOpenedTagOf("Item");
  const customData = {};
  while (reader.readNextStartElement()) {
    switch (reader.current.name) {
      case "Key":
        customData.key = reader.readStringValue();
        break;
      case "Value":
        customData.value = reader.readStringValue();
        break;
      case "LastModificationTime":
        if (!withTimes) {
          throw new Error(
            'Unexpected "LastModificationTime" tag in custom data item'
          );
        }
        customData.lastModified = reader.readDateTimeValue();
        break;
      default:
        throw new Error(
          `Unexpected tag "${reader.current.name}" while parsing "Item"`
        );
    }
  }
  if (!isCustomDataItemComplete(customData)) {
    throw new Error('Found "Item" tag with incomplete data');
  }
  return customData;
}
function isCustomDataItemComplete(item) {
  return item.key !== void 0 && item.value !== void 0;
}

// src/xml/tags/parseIconTag.ts
async function parseIconTag(reader) {
  reader.assertOpenedTagOf("Icon");
  const icon = {};
  while (reader.readNextStartElement()) {
    switch (reader.current.name) {
      case "UUID":
        icon.uuid = await reader.readUuidValue();
        break;
      case "Data":
        icon.data = await reader.readBinaryValue();
        break;
      case "Name":
        icon.name = reader.readStringValue();
        break;
      case "LastModificationTime":
        icon.lastModificationTime = reader.readDateTimeValue();
        break;
      default:
        throw new Error(
          `Unexpected tag "${reader.current.name}" while parsing "Icon"`
        );
    }
  }
  if (!isIconComplete(icon)) {
    throw new Error('Found "Icon" tag with incomplete data');
  }
  return icon;
}
function isIconComplete(icon) {
  return icon.data !== void 0 && icon.uuid !== void 0;
}

// src/xml/tags/parseCustomIconsTag.ts
async function parseCustomIconsTag(reader) {
  reader.assertOpenedTagOf("CustomIcons");
  const icons = {};
  while (reader.readNextStartElement()) {
    switch (reader.current.name) {
      case "Icon": {
        const icon = await parseIconTag(reader.readFromCurrent());
        icons[icon.uuid] = icon;
        break;
      }
      default:
        throw new Error(
          `Unexpected tag "${reader.current.name}" while parsing "CustomIcons"`
        );
    }
  }
  return icons;
}

// src/xml/tags/parseMemoryProtectionTag.ts
function parseMemoryProtectionTag(reader) {
  reader.assertOpenedTagOf("MemoryProtection");
  const memoryProtection = {};
  while (reader.readNextStartElement()) {
    switch (reader.current.name) {
      case "ProtectTitle":
        memoryProtection.protectTitle = reader.readBooleanValue();
        break;
      case "ProtectUserName":
        memoryProtection.protectUserName = reader.readBooleanValue();
        break;
      case "ProtectPassword":
        memoryProtection.protectPassword = reader.readBooleanValue();
        break;
      case "ProtectURL":
        memoryProtection.protectURL = reader.readBooleanValue();
        break;
      case "ProtectNotes":
        memoryProtection.protectNotes = reader.readBooleanValue();
        break;
      default:
        throw new Error(
          `Unexpected tag "${reader.current.name}" while parsing "MemoryProtection"`
        );
    }
  }
  return memoryProtection;
}

// src/xml/tags/parseMetaTag.ts
async function parseMetaTag(reader) {
  reader.assertOpenedTagOf("Meta");
  const metadata = {};
  while (reader.readNextStartElement()) {
    switch (reader.current.name) {
      case "Generator":
        metadata.generator = reader.readStringValue();
        break;
      case "HeaderHash":
        metadata.headerHash = await reader.readBinaryValue();
        break;
      case "DatabaseName":
        metadata.name = reader.readStringValue();
        break;
      case "DatabaseNameChanged":
        metadata.nameChanged = reader.readDateTimeValue();
        break;
      case "DatabaseDescription":
        metadata.description = reader.readStringValue();
        break;
      case "DatabaseDescriptionChanged":
        metadata.descriptionChanged = reader.readDateTimeValue();
        break;
      case "DefaultUserName":
        metadata.defaultUserName = reader.readStringValue();
        break;
      case "DefaultUserNameChanged":
        metadata.defaultUserNameChanged = reader.readDateTimeValue();
        break;
      case "MaintenanceHistoryDays":
        metadata.maintenanceHistoryDays = reader.readNumberValue();
        break;
      case "Color":
        metadata.color = reader.readColorValue();
        break;
      case "MasterKeyChanged":
        metadata.masterKeyChanged = reader.readDateTimeValue();
        break;
      case "MasterKeyChangeRec":
        metadata.masterKeyChangeRec = reader.readNumberValue();
        break;
      case "MasterKeyChangeForce":
        metadata.masterKeyChangeForce = reader.readNumberValue();
        break;
      case "MemoryProtection":
        metadata.memoryProtection = parseMemoryProtectionTag(
          reader.readFromCurrent()
        );
        break;
      case "CustomIcons":
        metadata.customIcons = await parseCustomIconsTag(
          reader.readFromCurrent()
        );
        break;
      case "RecycleBinEnabled":
        metadata.recycleBinEnabled = reader.readBooleanValue();
        break;
      case "RecycleBinUUID":
        metadata.recycleBinUuid = await reader.readUuidValue();
        break;
      case "RecycleBinChanged":
        metadata.recycleBinChanged = reader.readDateTimeValue();
        break;
      case "EntryTemplatesGroup":
        metadata.entryTemplatesGroup = await reader.readUuidValue();
        break;
      case "EntryTemplatesGroupChanged":
        metadata.entryTemplatesGroupChanged = reader.readDateTimeValue();
        break;
      case "LastSelectedGroup":
        metadata.lastSelectedGroup = await reader.readUuidValue();
        break;
      case "LastTopVisibleGroup":
        metadata.lastTopVisibleGroup = await reader.readUuidValue();
        break;
      case "HistoryMaxItems":
        metadata.historyMaxItems = reader.readNumberValue();
        break;
      case "HistoryMaxSize":
        metadata.historyMaxSize = reader.readNumberValue();
        break;
      case "Binaries":
        throw new Error('"Binaries" not implemented');
      case "CustomData":
        metadata.customData = parseCustomDataTag(
          reader.readFromCurrent(),
          true
        );
        break;
      case "SettingsChanged":
        metadata.settingsChanged = reader.readDateTimeValue();
        break;
      default:
        throw new Error(
          `Unexpected tag "${reader.current.name}" while parsing "Meta"`
        );
    }
  }
  return metadata;
}

// src/xml/tags/parseDeletedObjectsTag.ts
async function parseDeletedObjectsTag(reader) {
  reader.assertOpenedTagOf("DeletedObjects");
  const objects = [];
  if (reader.current.isClose) {
    return objects;
  }
  while (reader.readNextStartElement()) {
    switch (reader.current.name) {
      case "DeletedObject":
        objects.push(await parseDeletedObjectTag(reader.readFromCurrent()));
        break;
      default:
        throw new Error(
          `Unexpected tag "${reader.current.name}" while parsing "DeletedObjects"`
        );
    }
  }
  return objects;
}
async function parseDeletedObjectTag(reader) {
  reader.assertOpenedTagOf("DeletedObject");
  const deleted = {};
  while (reader.readNextStartElement()) {
    switch (reader.current.name) {
      case "UUID":
        deleted.uuid = await reader.readUuidValue();
        break;
      case "DeletionTime":
        deleted.deletionTime = reader.readDateTimeValue();
        break;
      default:
        throw new Error(
          `Unexpected tag "${reader.current.name}" while parsing "DeletedObject"`
        );
    }
  }
  if (!isDeletedObjectComplete(deleted)) {
    throw new Error('Found "DeletedObject" tag with incomplete data');
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
function parseAutoTypeTag(reader) {
  reader.assertOpenedTagOf("AutoType");
  const autoType = {};
  while (reader.readNextStartElement()) {
    switch (reader.current.name) {
      case "Enabled":
        autoType.enabled = reader.readBooleanValue();
        break;
      case "DataTransferObfuscation":
        autoType.dataTransferObfuscation = reader.readNumberValue();
        break;
      case "DefaultSequence":
        autoType.defaultSequence = reader.readStringValue();
        break;
      case "Association":
        if (!autoType.associations) {
          autoType.associations = [];
        }
        autoType.associations.push(
          parseAutoTypeAssociationTag(reader.readFromCurrent())
        );
        break;
      default:
        throw new Error(
          `Unexpected tag "${reader.current.name}" while parsing "AutoType"`
        );
    }
  }
  return autoType;
}
function parseAutoTypeAssociationTag(reader) {
  reader.assertOpenedTagOf("Association");
  const association = {};
  while (reader.readNextStartElement()) {
    switch (reader.current.name) {
      case "Window":
        association.window = reader.readStringValue();
        break;
      case "KeystrokeSequence":
        association.sequence = reader.readStringValue();
        break;
      default:
        throw new Error(
          `Unexpected tag "${reader.current.name}" while parsing "Association"`
        );
    }
  }
  if (!isAutoTypeAssociationComplete(association)) {
    throw new Error('Found "Association" tag with incomplete data');
  }
  return association;
}
function isAutoTypeAssociationComplete(association) {
  return association.window !== void 0 && association.sequence !== void 0;
}

// src/xml/tags/parseEntryBinaryTag.ts
function parseEntryBinaryTag(reader) {
  reader.assertOpenedTagOf("Binary");
  const result = {};
  while (reader.readNextStartElement()) {
    switch (reader.current.name) {
      case "Key":
        result.key = reader.readStringValue();
        break;
      case "Value":
        if (reader.current.attributes.Ref === void 0) {
          throw new Error("Inline Binary not implemented");
        }
        result.ref = reader.current.attributes.Ref;
        break;
      default:
        throw new Error(
          `Unexpected tag "${reader.current.name}" while parsing "Binary"`
        );
    }
  }
  if (!isBinaryTagDataComplete(result)) {
    throw new Error('Found "Binary" tag with incomplete data');
  }
  return result;
}
function isBinaryTagDataComplete(data) {
  return data.key !== void 0 && data.ref !== void 0;
}

// src/xml/tags/parseEntryHistoryTag.ts
async function parseEntryHistoryTag(reader) {
  reader.assertOpenedTagOf("History");
  const history = [];
  while (reader.readNextStartElement()) {
    switch (reader.current.name) {
      case "Entry":
        history.push(await parseEntryTag(reader.readFromCurrent(), true));
        break;
      default:
        throw new Error(
          `Unexpected tag "${reader.current.name}" while parsing "History"`
        );
    }
  }
  return history;
}

// src/xml/tags/parseEntryStringTag.ts
async function parseEntryStringTag(reader) {
  reader.assertOpenedTagOf("String");
  let key;
  let value;
  let isProtected;
  while (reader.readNextStartElement()) {
    switch (reader.current.name) {
      case "Key":
        key = reader.readStringValue();
        break;
      case "Value":
        [value, isProtected] = await reader.readPotentiallyProtectedStringValue();
        break;
      default:
        throw new Error(
          `Unexpected tag "${reader.current.name}" while parsing "String"`
        );
    }
  }
  if (key === void 0 || value === void 0) {
    throw new Error('Found "String" tag with incomplete data');
  }
  return {
    isProtected: isProtected ?? false,
    key,
    value
  };
}

// src/xml/tags/parseTimesTag.ts
function parseTimesTag(reader) {
  reader.assertOpenedTagOf("Times");
  const timeInfo = {};
  while (reader.readNextStartElement()) {
    switch (reader.current.name) {
      case "LastModificationTime":
        timeInfo.lastModificationTime = reader.readDateTimeValue();
        break;
      case "CreationTime":
        timeInfo.creationTime = reader.readDateTimeValue();
        break;
      case "LastAccessTime":
        timeInfo.lastAccessTime = reader.readDateTimeValue();
        break;
      case "ExpiryTime":
        timeInfo.expiryTime = reader.readDateTimeValue();
        break;
      case "Expires":
        timeInfo.expires = reader.readBooleanValue();
        break;
      case "UsageCount":
        timeInfo.usageCount = reader.readNumberValue();
        break;
      case "LocationChanged":
        timeInfo.locationChanged = reader.readDateTimeValue();
        break;
      default:
        throw new Error(
          `Unexpected tag "${reader.current.name}" while parsing "Times"`
        );
    }
  }
  return timeInfo;
}

// src/xml/tags/parseEntryTag.ts
async function parseEntryTag(reader, fromHistory) {
  reader.assertOpenedTagOf("Entry");
  const entry = {};
  while (reader.readNextStartElement()) {
    switch (reader.current.name) {
      case "UUID":
        entry.uuid = await reader.readUuidValue();
        break;
      case "String": {
        const value = await parseEntryStringTag(reader.readFromCurrent());
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
        entry.timeInfo = parseTimesTag(reader.readFromCurrent());
        break;
      case "History":
        if (fromHistory) {
          throw new Error("Recursive history element found");
        }
        entry.history = await parseEntryHistoryTag(reader.readFromCurrent());
        break;
      case "CustomData":
        entry.customData = parseCustomDataTag(reader.readFromCurrent(), false);
        break;
      case "IconID":
        entry.iconNumber = reader.readNumberValue();
        if (!isDefaultIconNumber(entry.iconNumber)) {
          console.warn(
            `Entry has unexpected default icon number "${entry.iconNumber}"`
          );
        }
        break;
      case "CustomIconUUID":
        entry.customIcon = await reader.readUuidValue();
        break;
      case "ForegroundColor":
        entry.foregroundColor = reader.readColorValue();
        break;
      case "BackgroundColor":
        entry.backgroundColor = reader.readColorValue();
        break;
      case "OverrideURL":
        entry.overrideURL = reader.readStringValue();
        break;
      case "Tags":
        entry.tags = reader.readStringValue();
        break;
      case "QualityCheck":
        entry.qualityCheck = reader.readBooleanValue();
        break;
      case "Binary": {
        const tag = parseEntryBinaryTag(reader.readFromCurrent());
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
        entry.autoType = parseAutoTypeTag(reader.readFromCurrent());
        break;
      case "PreviousParentGroup":
        entry.previousParentGroup = await reader.readUuidValue();
        break;
      default:
        throw new Error(
          `Unexpected tag "${reader.current.name}" while parsing "Entry"`
        );
    }
  }
  if (!isEntryComplete(entry)) {
    throw new Error('Found "Entry" tag with incomplete data');
  }
  return entry;
}
function isEntryComplete(entry) {
  return entry.uuid !== void 0;
}

// src/xml/tags/parseGroupTag.ts
async function parseGroupTag(reader) {
  reader.assertOpenedTagOf("Group");
  const group = {};
  while (reader.readNextStartElement()) {
    switch (reader.current.name) {
      case "UUID":
        group.uuid = await reader.readUuidValue();
        break;
      case "Name":
        group.name = reader.readStringValue();
        break;
      case "Notes":
        group.notes = reader.readStringValue();
        break;
      case "Tags":
        group.tags = reader.readStringValue();
        break;
      case "Times":
        group.timeInfo = parseTimesTag(reader.readFromCurrent());
        break;
      case "IconID":
        group.iconNumber = reader.readNumberValue();
        if (!isDefaultIconNumber(group.iconNumber)) {
          console.warn(
            `Group has unexpected default icon number "${group.iconNumber}"`
          );
        }
        break;
      case "CustomIconUUID":
        group.customIcon = await reader.readUuidValue();
        break;
      case "Group":
        if (!group.children) {
          group.children = [];
        }
        group.children.push(await parseGroupTag(reader.readFromCurrent()));
        break;
      case "Entry":
        if (!group.entries) {
          group.entries = [];
        }
        group.entries.push(
          await parseEntryTag(reader.readFromCurrent(), false)
        );
        break;
      case "CustomData":
        group.customData = parseCustomDataTag(reader.readFromCurrent(), false);
        break;
      case "IsExpanded":
        group.isExpanded = reader.readBooleanValue();
        break;
      case "DefaultAutoTypeSequence":
        group.defaultAutoTypeSequence = reader.readStringValue();
        break;
      case "EnableAutoType":
        group.enableAutoType = reader.readNullableBoolean();
        break;
      case "EnableSearching":
        group.enableSearching = reader.readNullableBoolean();
        break;
      case "LastTopVisibleEntry":
        group.lastTopVisibleEntry = await reader.readUuidValue();
        break;
      case "PreviousParentGroup":
        group.previousParentGroup = await reader.readUuidValue();
        break;
      default:
        throw new Error(
          `Unexpected tag "${reader.current.name}" while parsing "Group"`
        );
    }
  }
  if (!isGroupComplete(group)) {
    throw new Error('Found "Group" tag with incomplete data');
  }
  return group;
}
function isGroupComplete(group) {
  return group.uuid !== void 0;
}

// src/xml/tags/parseRootTag.ts
async function parseRootTag(reader) {
  reader.assertOpenedTagOf("Root");
  const result = {};
  while (reader.readNextStartElement()) {
    switch (reader.current.name) {
      case "Group":
        if (result.group) {
          throw new Error("Multiple root group elements");
        }
        result.group = await parseGroupTag(reader.readFromCurrent());
        break;
      case "DeletedObjects":
        result.deletedObjects = await parseDeletedObjectsTag(
          reader.readFromCurrent()
        );
        break;
      default:
        throw new Error(
          `Unexpected tag "${reader.current.name}" while parsing "Root"`
        );
    }
  }
  if (!isDatabaseRootComplete(result)) {
    throw new Error('Found "Root" tag with incomplete data');
  }
  return result;
}
function isDatabaseRootComplete(results) {
  return results.group !== void 0;
}

// src/xml/tags/parseKeePassFileTag.ts
async function parseKeePassFileTag(reader) {
  reader.assertOpenedTagOf("KeePassFile");
  const database = {};
  while (reader.readNextStartElement()) {
    switch (reader.current.name) {
      case "Meta":
        if (database.metadata) {
          throw new Error("Unexpected duplicate Meta element found");
        }
        database.metadata = await parseMetaTag(reader.readFromCurrent());
        break;
      case "Root": {
        if (database.root) {
          throw new Error("Unexpected duplicate Root element found");
        }
        database.root = await parseRootTag(reader.readFromCurrent());
        break;
      }
      default:
        throw new Error(
          `Unexpected tag "${reader.current.name}" while parsing "KeePassFile"`
        );
    }
  }
  if (!isDatabaseComplete(database)) {
    throw new Error('Found "KeePassFile" tag with incomplete data');
  }
  return database;
}
function isDatabaseComplete(database) {
  return database.metadata !== void 0 && database.root !== void 0;
}

// src/xml/readDatabaseXml.ts
async function readDatabaseXml(contents, binaryPool, streamCipher) {
  const reader = new KdbxXmlReader(contents, streamCipher, binaryPool ?? []);
  if (!reader.current.isMeta) {
    throw new Error("Invalid database format. No XML header found");
  }
  reader.readNextStartElement();
  return await parseKeePassFileTag(reader);
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

// src/utilities/gregorianTimestampFromDate.ts
function gregorianTimestampFromDate(date) {
  const julianSecondsFrom1970To0001 = 62135596800;
  const unixTimestamp = date.getTime();
  const unixSeconds = Math.round(unixTimestamp / 1e3);
  return unixSeconds + julianSecondsFrom1970To0001;
}

// src/utilities/XmlWriter.ts
var XmlWriter = class {
  constructor(indentString = "  ", lineSeparator = "\n") {
    this.indentString = indentString;
    this.lineSeparator = lineSeparator;
    this.buffer = "";
    this.currentOpenElements = [];
    this.currentElementStartedAt = -1;
  }
  get contents() {
    return this.buffer;
  }
  writeAttribute(name, value) {
    if (this.currentElementStartedAt === -1) {
      throw new Error("Cannot write attribute after element has been closed");
    }
    const validNameRegex = /^[a-zA-Z_:][-a-zA-Z0-9_:.]*$/;
    if (!validNameRegex.test(name)) {
      throw new Error(`Invalid attribute name "${name}"`);
    }
    const escapedValue = value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    this.buffer += ` ${name}="${escapedValue}"`;
    this.currentElementStartedAt = this.buffer.length;
  }
  writeCharacters(text) {
    this.finishStartElement();
    this.buffer += this.escape(text);
  }
  writeEmptyElement(name) {
    this.finishStartElement();
    this.buffer += `${this.startLine()}<${name}/>`;
  }
  writeEndDocument() {
    while (this.currentOpenElements.length > 0) {
      this.writeEndElement();
    }
  }
  writeEndElement(withStartLine = true) {
    if (this.currentElementStartedAt === this.buffer.length) {
      this.finishEmptyElement();
      return;
    }
    this.finishStartElement();
    const name = this.currentOpenElements.pop();
    if (name === void 0) {
      throw new Error("No element started to close");
    }
    this.buffer += `${withStartLine ? this.startLine() : ""}</${name}>`;
  }
  writeStartDocument(version, standalone) {
    if (this.buffer.length > 0) {
      throw new Error("Document already started");
    }
    this.buffer += `<?xml version="${version}" encoding="UTF-8" standalone="${standalone ? "yes" : "no"}"?>`;
  }
  writeStartElement(name) {
    this.finishStartElement();
    this.buffer += `${this.startLine()}<${name}`;
    this.currentElementStartedAt = this.buffer.length;
    this.currentOpenElements.push(name);
  }
  writeTextElement(qualifiedName, text) {
    this.finishStartElement();
    this.buffer += `${this.startLine()}<${qualifiedName}>${this.escape(text)}</${qualifiedName}>`;
  }
  finishEmptyElement() {
    if (this.currentElementStartedAt === -1) {
      throw new Error("No element started to finish");
    }
    this.buffer += "/>";
    this.currentOpenElements.pop();
    this.currentElementStartedAt = -1;
  }
  finishStartElement() {
    if (this.currentElementStartedAt === -1) {
      return false;
    }
    this.buffer += ">";
    this.currentElementStartedAt = -1;
    return true;
  }
  startLine() {
    return this.lineSeparator + this.indentString.repeat(this.currentOpenElements.length);
  }
  escape(text) {
    return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
};

// src/utilities/KdbxXmlWriter.ts
var KdbxXmlWriter = class extends XmlWriter {
  constructor(cipher, binaryPool) {
    super("	");
    this.cipher = cipher;
    this.binaryPool = binaryPool;
  }
  writeBinary(name, value) {
    const valueAsBase64 = Buffer.from(value).toString("base64");
    this.writeTextElement(name, valueAsBase64);
  }
  writeBoolean(name, value) {
    if (value) {
      this.writeString(name, "True");
    } else {
      this.writeString(name, "False");
    }
  }
  writeColor(name, value) {
    if (value.length && !value.match(/^#[0-f]{6}$/)) {
      throw new Error(`Invalid color value "${value}"`);
    }
    this.writeString(name, value);
  }
  writeDateTime(name, value) {
    const timestamp = gregorianTimestampFromDate(value);
    const timestampAsBytes = Uint8ArrayHelper_default.leftJustify(
      Uint8ArrayHelper_default.fromUInt64LE(timestamp),
      8
    ).slice(0, 8);
    this.writeString(name, Buffer.from(timestampAsBytes).toString("base64"));
  }
  writeNullableBoolean(name, value) {
    if (value === NullableBoolean_default.True) {
      this.writeString(name, "true");
    } else if (value === NullableBoolean_default.False) {
      this.writeString(name, "false");
    } else {
      this.writeString(name, "null");
    }
  }
  writeNumber(name, value) {
    this.writeString(name, value.toString());
  }
  async writeProtectedString(name, value) {
    this.writeStartElement(name);
    this.writeAttribute("Protected", "True");
    if (value.length > 0) {
      const encryptedValue = await this.cipher.process(
        Uint8ArrayHelper_default.fromString(value)
      );
      const encryptedValueAsBase64 = Buffer.from(encryptedValue).toString("base64");
      this.writeCharacters(encryptedValueAsBase64);
    }
    this.writeEndElement(false);
  }
  writeString(name, value) {
    if (value.length === 0) {
      this.writeEmptyElement(name);
    } else {
      this.writeTextElement(name, value);
    }
  }
  writeUuid(name, value, ensureCompliance) {
    const uuidBytes = Uint8ArrayHelper_default.fromUuid(value, ensureCompliance);
    this.writeTextElement(name, Buffer.from(uuidBytes).toString("base64"));
  }
};

// src/xml/tags/writeCustomDataTag.ts
function writeCustomDataTag(writer, data, withTimes) {
  writer.writeStartElement("CustomData");
  for (const item of Object.values(data)) {
    if (!item) {
      continue;
    }
    serializeCustomDataItemTag(writer, item, withTimes);
  }
  writer.writeEndElement();
}
function serializeCustomDataItemTag(writer, data, withTimes) {
  writer.writeStartElement("Item");
  writer.writeString("Key", data.key);
  writer.writeString("Value", data.value);
  if (withTimes && isCustomDataWithTimes(data) && data.lastModified !== void 0) {
    writer.writeDateTime("Times", data.lastModified);
  }
  writer.writeEndElement();
}
function isCustomDataWithTimes(data) {
  return data.lastModified !== void 0;
}

// src/xml/tags/writeIconTag.ts
function writeIconTag(writer, icon) {
  writer.writeStartElement("Icon");
  writer.writeUuid("UUID", icon.uuid, true);
  if (icon.name !== void 0) {
    writer.writeString("Name", icon.name);
  }
  if (icon.lastModificationTime !== void 0) {
    writer.writeDateTime("LastModificationTime", icon.lastModificationTime);
  }
  writer.writeBinary("Data", icon.data);
  writer.writeEndElement();
}

// src/xml/tags/writeCustomIconsTag.ts
function writeCustomIconsTag(writer, customIcons) {
  writer.writeStartElement("CustomIcons");
  for (const icon of Object.values(customIcons)) {
    if (icon === void 0) {
      continue;
    }
    writeIconTag(writer, icon);
  }
  writer.writeEndElement();
}

// src/xml/tags/writeMemoryProtectionTag.ts
function writeMemoryProtectionTag(writer, memoryProtection) {
  if (isEmpty(memoryProtection)) {
    return;
  }
  writer.writeStartElement("MemoryProtection");
  if (memoryProtection.protectTitle !== void 0) {
    writer.writeBoolean("ProtectTitle", memoryProtection.protectTitle);
  }
  if (memoryProtection.protectUserName !== void 0) {
    writer.writeBoolean("ProtectUserName", memoryProtection.protectUserName);
  }
  if (memoryProtection.protectPassword !== void 0) {
    writer.writeBoolean("ProtectPassword", memoryProtection.protectPassword);
  }
  if (memoryProtection.protectURL !== void 0) {
    writer.writeBoolean("ProtectURL", memoryProtection.protectURL);
  }
  if (memoryProtection.protectNotes !== void 0) {
    writer.writeBoolean("ProtectNotes", memoryProtection.protectNotes);
  }
  writer.writeEndElement();
}
function isEmpty(memoryProtection) {
  return Object.keys(memoryProtection).length === 0;
}

// src/xml/tags/writeMetaTag.ts
function writeMetaTag(writer, metadata) {
  if (isEmpty2(metadata)) {
    return;
  }
  writer.writeStartElement("Meta");
  if (metadata.generator !== void 0) {
    writer.writeString("Generator", metadata.generator);
  }
  if (metadata.headerHash !== void 0) {
    writer.writeBinary("HeaderHash", metadata.headerHash);
  }
  if (metadata.name !== void 0) {
    writer.writeString("DatabaseName", metadata.name);
  }
  if (metadata.nameChanged !== void 0) {
    writer.writeDateTime("DatabaseNameChanged", metadata.nameChanged);
  }
  if (metadata.description !== void 0) {
    writer.writeString("DatabaseDescription", metadata.description);
  }
  if (metadata.descriptionChanged !== void 0) {
    writer.writeDateTime(
      "DatabaseDescriptionChanged",
      metadata.descriptionChanged
    );
  }
  if (metadata.defaultUserName !== void 0) {
    writer.writeString("DefaultUserName", metadata.defaultUserName);
  }
  if (metadata.defaultUserNameChanged !== void 0) {
    writer.writeDateTime(
      "DefaultUserNameChanged",
      metadata.defaultUserNameChanged
    );
  }
  if (metadata.maintenanceHistoryDays !== void 0) {
    writer.writeNumber(
      "MaintenanceHistoryDays",
      metadata.maintenanceHistoryDays
    );
  }
  if (metadata.color !== void 0) {
    writer.writeColor("Color", metadata.color);
  }
  if (metadata.masterKeyChanged !== void 0) {
    writer.writeDateTime("MasterKeyChanged", metadata.masterKeyChanged);
  }
  if (metadata.masterKeyChangeRec !== void 0) {
    writer.writeNumber("MasterKeyChangeRec", metadata.masterKeyChangeRec);
  }
  if (metadata.masterKeyChangeForce !== void 0) {
    writer.writeNumber("MasterKeyChangeForce", metadata.masterKeyChangeForce);
  }
  if (metadata.memoryProtection !== void 0) {
    writeMemoryProtectionTag(writer, metadata.memoryProtection);
  }
  if (metadata.customIcons !== void 0) {
    writeCustomIconsTag(writer, metadata.customIcons);
  }
  if (metadata.recycleBinEnabled !== void 0) {
    writer.writeBoolean("RecycleBinEnabled", metadata.recycleBinEnabled);
  }
  if (metadata.recycleBinUuid !== void 0) {
    writer.writeUuid("RecycleBinUUID", metadata.recycleBinUuid, false);
  }
  if (metadata.recycleBinChanged !== void 0) {
    writer.writeDateTime("RecycleBinChanged", metadata.recycleBinChanged);
  }
  if (metadata.entryTemplatesGroup !== void 0) {
    writer.writeUuid(
      "EntryTemplatesGroup",
      metadata.entryTemplatesGroup,
      false
    );
  }
  if (metadata.entryTemplatesGroupChanged !== void 0) {
    writer.writeDateTime(
      "EntryTemplatesGroupChanged",
      metadata.entryTemplatesGroupChanged
    );
  }
  if (metadata.lastSelectedGroup !== void 0) {
    writer.writeUuid("LastSelectedGroup", metadata.lastSelectedGroup, false);
  }
  if (metadata.lastTopVisibleGroup !== void 0) {
    writer.writeUuid(
      "LastTopVisibleGroup",
      metadata.lastTopVisibleGroup,
      false
    );
  }
  if (metadata.historyMaxItems !== void 0) {
    writer.writeNumber("HistoryMaxItems", metadata.historyMaxItems);
  }
  if (metadata.historyMaxSize !== void 0) {
    writer.writeNumber("HistoryMaxSize", metadata.historyMaxSize);
  }
  if (metadata.binaries !== void 0) {
    throw new Error('"Binaries" not implemented');
  }
  if (metadata.customData !== void 0) {
    writeCustomDataTag(writer, metadata.customData, true);
  }
  if (metadata.settingsChanged !== void 0) {
    writer.writeDateTime("SettingsChanged", metadata.settingsChanged);
  }
  writer.writeEndElement();
}
function isEmpty2(metadata) {
  return Object.keys(metadata).length === 0;
}

// src/xml/tags/writeDeletedObjectsTag.ts
function writeDeletedObjectsTag(writer, deletedObjects) {
  writer.writeStartElement("DeletedObjects");
  for (const deletedObject of deletedObjects) {
    writeDeletedObjectTag(writer, deletedObject);
  }
  writer.writeEndElement();
}
function writeDeletedObjectTag(writer, deletedObject) {
  writer.writeStartElement("DeletedObject");
  writer.writeUuid("UUID", deletedObject.uuid, true);
  writer.writeDateTime("DeletionTime", deletedObject.deletionTime);
  writer.writeEndElement();
}

// src/xml/tags/writeAutoTypeTag.ts
function writeAutoTypeTag(writer, autoType) {
  writer.writeStartElement("AutoType");
  if (autoType.enabled !== void 0) {
    writer.writeBoolean("Enabled", autoType.enabled);
  }
  if (autoType.dataTransferObfuscation !== void 0) {
    writer.writeNumber(
      "DataTransferObfuscation",
      autoType.dataTransferObfuscation
    );
  }
  if (autoType.defaultSequence !== void 0) {
    writer.writeString("DefaultSequence", autoType.defaultSequence);
  }
  if (autoType.associations !== void 0) {
    for (const value of autoType.associations) {
      writeAutoTypeAssociationTag(writer, value);
    }
  }
  writer.writeEndElement();
}
function writeAutoTypeAssociationTag(writer, association) {
  writer.writeStartElement("Association");
  writer.writeString("Window", association.window);
  writer.writeString("KeystrokeSequence", association.sequence);
  writer.writeEndElement();
}

// src/xml/tags/writeEntryBinaryTag.ts
function writeEntryBinaryTag(writer, attachment) {
  writer.writeStartElement("Binary");
  writer.writeString("Key", attachment.key);
  writer.writeStartElement("Value");
  writer.writeAttribute("Ref", attachment.ref);
  writer.writeEndElement();
  writer.writeEndElement();
}

// src/xml/tags/writeEntryHistoryTag.ts
async function writeEntryHistoryTag(writer, history) {
  writer.writeStartElement("History");
  if (history !== void 0) {
    for (const entry of history) {
      await writeEntryTag(writer, entry, true);
    }
  }
  writer.writeEndElement();
}

// src/xml/tags/writeEntryStringTag.ts
async function writeEntryStringTag(writer, attribute) {
  writer.writeStartElement("String");
  writer.writeString("Key", attribute.key);
  if (attribute.isProtected) {
    await writer.writeProtectedString("Value", attribute.value);
  } else {
    writer.writeString("Value", attribute.value);
  }
  writer.writeEndElement();
}

// src/xml/tags/writeTimesTag.ts
function writeTimesTag(writer, times) {
  writer.writeStartElement("Times");
  if (times.lastModificationTime !== void 0) {
    writer.writeDateTime("LastModificationTime", times.lastModificationTime);
  }
  if (times.creationTime !== void 0) {
    writer.writeDateTime("CreationTime", times.creationTime);
  }
  if (times.lastAccessTime !== void 0) {
    writer.writeDateTime("LastAccessTime", times.lastAccessTime);
  }
  if (times.expiryTime !== void 0) {
    writer.writeDateTime("ExpiryTime", times.expiryTime);
  }
  if (times.expires !== void 0) {
    writer.writeBoolean("Expires", times.expires);
  }
  if (times.usageCount !== void 0) {
    writer.writeNumber("UsageCount", times.usageCount);
  }
  if (times.locationChanged !== void 0) {
    writer.writeDateTime("LocationChanged", times.locationChanged);
  }
  writer.writeEndElement();
}

// src/xml/tags/writeEntryTag.ts
async function writeEntryTag(writer, entry, fromHistory) {
  writer.writeStartElement("Entry");
  writer.writeUuid("UUID", entry.uuid, true);
  if (entry.iconNumber !== void 0) {
    writer.writeNumber("IconID", entry.iconNumber);
  }
  if (entry.foregroundColor !== void 0) {
    writer.writeColor("ForegroundColor", entry.foregroundColor);
  }
  if (entry.backgroundColor !== void 0) {
    writer.writeColor("BackgroundColor", entry.backgroundColor);
  }
  if (entry.overrideURL !== void 0) {
    writer.writeString("OverrideURL", entry.overrideURL);
  }
  if (entry.tags !== void 0) {
    writer.writeString("Tags", entry.tags);
  }
  if (entry.timeInfo !== void 0) {
    writeTimesTag(writer, entry.timeInfo);
  }
  if (entry.qualityCheck !== void 0) {
    writer.writeBoolean("QualityCheck", entry.qualityCheck);
  }
  if (entry.previousParentGroup !== void 0) {
    writer.writeUuid("PreviousParentGroup", entry.previousParentGroup, true);
  }
  if (entry.attributes !== void 0) {
    for (const value of Object.values(entry.attributes)) {
      if (value === void 0) {
        continue;
      }
      await writeEntryStringTag(writer, value);
    }
  }
  if (entry.attachments !== void 0) {
    for (const attachment of Object.values(entry.attachments)) {
      if (attachment === void 0) {
        continue;
      }
      writeEntryBinaryTag(writer, attachment);
    }
  }
  if (entry.autoType !== void 0) {
    writeAutoTypeTag(writer, entry.autoType);
  }
  if (entry.customData !== void 0) {
    writeCustomDataTag(writer, entry.customData, false);
  }
  if (entry.customIcon !== void 0) {
    writer.writeUuid("CustomIconUUID", entry.customIcon, true);
  }
  if (entry.history !== void 0) {
    if (fromHistory) {
      throw new Error("Recursive history element found");
    }
    await writeEntryHistoryTag(writer, entry.history);
  }
  writer.writeEndElement();
}

// src/xml/tags/writeGroupTag.ts
async function writeGroupTag(writer, group) {
  writer.writeStartElement("Group");
  writer.writeUuid("UUID", group.uuid, true);
  if (group.name !== void 0) {
    writer.writeString("Name", group.name);
  }
  if (group.notes !== void 0) {
    writer.writeString("Notes", group.notes);
  }
  if (group.tags !== void 0) {
    writer.writeString("Tags", group.tags);
  }
  if (group.iconNumber !== void 0) {
    writer.writeNumber("IconID", group.iconNumber);
  }
  if (group.customIcon !== void 0) {
    writer.writeUuid("CustomIconUUID", group.customIcon, true);
  }
  if (group.timeInfo !== void 0) {
    writeTimesTag(writer, group.timeInfo);
  }
  if (group.isExpanded !== void 0) {
    writer.writeBoolean("IsExpanded", group.isExpanded);
  }
  if (group.defaultAutoTypeSequence !== void 0) {
    writer.writeString(
      "DefaultAutoTypeSequence",
      group.defaultAutoTypeSequence
    );
  }
  if (group.enableAutoType !== void 0) {
    writer.writeNullableBoolean("EnableAutoType", group.enableAutoType);
  }
  if (group.enableSearching !== void 0) {
    writer.writeNullableBoolean("EnableSearching", group.enableSearching);
  }
  if (group.lastTopVisibleEntry !== void 0) {
    writer.writeUuid("LastTopVisibleEntry", group.lastTopVisibleEntry, false);
  }
  if (group.customData !== void 0) {
    writeCustomDataTag(writer, group.customData, false);
  }
  if (group.previousParentGroup !== void 0) {
    writer.writeUuid("PreviousParentGroup", group.previousParentGroup, true);
  }
  if (group.entries !== void 0) {
    for (const entry of group.entries) {
      await writeEntryTag(writer, entry, false);
    }
  }
  if (group.children !== void 0) {
    for (const child of group.children) {
      await writeGroupTag(writer, child);
    }
  }
  writer.writeEndElement();
}

// src/xml/tags/writeRootTag.ts
async function writeRootTag(writer, root) {
  writer.writeStartElement("Root");
  await writeGroupTag(writer, root.group);
  if (root.deletedObjects !== void 0) {
    writeDeletedObjectsTag(writer, root.deletedObjects);
  }
  writer.writeEndElement();
}

// src/xml/tags/writeKeePassFileTag.ts
async function writeKeePassFileTag(writer, database) {
  writer.writeStartElement("KeePassFile");
  writeMetaTag(writer, database.metadata);
  await writeRootTag(writer, database.root);
  writer.writeEndElement();
}

// src/xml/serializeDatabaseXml.ts
async function serializeDatabaseXml(database, binaryPool, streamCipher) {
  const writer = new KdbxXmlWriter(streamCipher, binaryPool ?? []);
  writer.writeStartDocument("1.0", true);
  await writeKeePassFileTag(writer, database);
  writer.writeEndDocument();
  return writer.contents + writer.lineSeparator;
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
/*! Bundled license information:

pako/dist/pako.esm.mjs:
  (*! pako 2.1.0 https://github.com/nodeca/pako @license (MIT AND Zlib) *)
*/
//# sourceMappingURL=index.cjs.map
