// title:  Explore
// author: TheInvader360
// desc:   An exploration game
// script: js
// saveid: ti360explore

const TILE_BLOCKED = 0,
      TILE_KEY = 1,
      TILE_LOOT = 2,
      TILE_DOOR = 3,
      TILE_SIZE = 8,
      BUTTON_U = 0,
      BUTTON_D = 1,
      BUTTON_L = 2,
      BUTTON_R = 3,
      BUTTON_A = 4;

var camera, player, ticks;

function initCamera() {
  camera = {
    x: 0,
    y: 0,
    w: 30,
    h: 17
  };
}

function initPlayer() {
  player = {
    x: 20,
    y: 12,
    sprite: 320,
    keys: 0,
    gold: 0
  };
}

function init() {
  ticks = 0;
  initCamera();
  initPlayer();
}

function tileHasFlag(x, y, flag) {
  var tile = mget(x, y);
  return fget(tile, flag);
}

function isBlockedTile(x, y) {
  return tileHasFlag(x, y, TILE_BLOCKED);
}

function swapTile(x, y, indexModifier) {
  mset(x, y, mget(x, y) + indexModifier);
}

function getKey(x, y) {
  player.keys++;
  swapTile(x, y, 1);
  sfx(0);
}

function getLoot(x, y) {
  player.gold += 5;
  swapTile(x, y, 1);
  sfx(0);
}

function openDoor(x, y) {
  player.keys--;
  swapTile(x, y, 1);
  sfx(1);
}

function interact(x, y) {
  if (tileHasFlag(x, y, TILE_KEY)) getKey(x, y);
  if (tileHasFlag(x, y, TILE_LOOT)) getLoot(x, y);
  if (tileHasFlag(x, y, TILE_DOOR) && player.keys > 0) openDoor(x, y);
}

function updatePlayer() {
  var x = player.x;
  var y = player.y;
  if (btn(BUTTON_U)) y--;
  if (btn(BUTTON_D)) y++;
  if (btn(BUTTON_L)) x--;
  if (btn(BUTTON_R)) x++;
  interact(x, y);
  if (!isBlockedTile(x, y)) {
    player.x = x;
    player.y = y;
  }
}

function updateCamera() {
  camera.x = Math.floor(player.x / camera.w) * camera.w;
  camera.y = Math.floor(player.y / camera.h) * camera.h;
}

function drawInventoryPanel() {
  var x, y, w, h;
  x = (camera.w / 2 - 4) * TILE_SIZE;
  y = 2 * TILE_SIZE;
  w = 8 * TILE_SIZE;
  h = 6 * TILE_SIZE;
  rect(x, y, w, h, 0);
  print("INVENTORY", x + TILE_SIZE, y + TILE_SIZE, 3);
  print("Keys: " + player.keys, x + TILE_SIZE, y + TILE_SIZE * 3, 4);
  print("Gold: " + player.gold, x + TILE_SIZE, y + TILE_SIZE * 4, 4);
}

function TIC() {
  ticks++;
  if (ticks %5 === 0) updatePlayer();
  updateCamera();
  cls();
  map(camera.x, camera.y, camera.w, camera.h);
  spr(player.sprite, (player.x - camera.x) * TILE_SIZE, (player.y - camera.y) * TILE_SIZE, 6);
  if (btn(BUTTON_A)) drawInventoryPanel();
}

init();

// <TILES>
// 001:eccccccccc888888caaaaaaaca888888cacccccccacc0ccccacc0ccccacc0ccc
// 002:ccccceee8888cceeaaaa0cee888a0ceeccca0ccc0cca0c0c0cca0c0c0cca0c0c
// 003:eccccccccc888888caaaaaaaca888888cacccccccacccccccacc0ccccacc0ccc
// 004:ccccceee8888cceeaaaa0cee888a0ceeccca0cccccca0c0c0cca0c0c0cca0c0c
// 017:cacccccccaaaaaaacaaacaaacaaaaccccaaaaaaac8888888cc000cccecccccec
// 018:ccca00ccaaaa0ccecaaa0ceeaaaa0ceeaaaa0cee8888ccee000cceeecccceeee
// 019:cacccccccaaaaaaacaaacaaacaaaaccccaaaaaaac8888888cc000cccecccccec
// 020:ccca00ccaaaa0ccecaaa0ceeaaaa0ceeaaaa0cee8888ccee000cceeecccceeee
// 064:6666666666666666666666666666666666666666666666666666666666666666
// 065:6666566666665666656666666566666666656666666566566666665666666666
// 066:6688866668eee8668eedee868eeede8681eeeee881eedee86811ee8600888866
// 068:66666666444666664c444444464cc4c444466c6cccc666666666666666666666
// 069:6666666666666666666666666666666666666666666666666666666666666666
// 080:8888888888888888888888888888888888888888888888888888888888888888
// 081:8888888888998988888888888888888888899888998888888888889988888888
// 082:8888888888eee8888eedee888eeede8881eeeee8a1eedeea8a11eea888aaaa88
// 084:2422224224222242242222422422224244433444838338382422224224222242
// 085:2423324283833838888888888888888888888888232222322422224224222242
// 096:dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
// 097:dddddddddddddedddedddddddddddddddddeddddddddddedddddddddddeddddd
// 098:ddedddedeeeeeeeeddddedddeeeeeeeeddedddedeeeeeeeeedddedddeeeeeeee
// 100:eeeeeeeeeee22eeee222222ee882222ee222222ee222242ee882222ee222222e
// 101:eeeeeeeeeeeddeeeeddddddeeddddddeeddddddeeddddddeeddddddeedddddde
// </TILES>

// <SPRITES>
// 064:6663366666633666622222262622226226222262369999636696696660066006
// </SPRITES>

// <MAP>
// 000:050505050505050505050505050505050505050505050505050505050505050505050505050505050505050505050505050505050505050505050505000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
// 001:050505050505050504040404040404040404040404140404040404040404050505050505050505050505050505050505050505050505050505050505000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
// 002:050505050404040404040404040404040404040404040404040424040404040404040404040414040404050505050505050505050404040404040505000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
// 003:050505050404040404040424040404140404040404040404040404040404040404240404040404040404140404040404040414040404060604040505000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
// 004:050505040406060404040404040404040404040404040404040404040404040404040404040404040404040404240404040416060606060404040405000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
// 005:050505040404060604040404040404040404140404040414040404040404040404140404040404040404040404040404060606040404040445040405000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
// 006:050505040404040606060404140404040404040404040404040404040404040404040404040404041404040404040616060404040404040404040405000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
// 007:050504040445040404060606060604040404040404040404240404040414040404040404240404040404040406060604040404040404040404140505000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
// 008:050504040404040406060616060606060404040404140404040404040404040404040406160606060606061606040404040404041404042404040505000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
// 009:050504040616060606042404040606060606060604040404040404040606060606060606060606061606040404040414040404040404040404040505000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
// 010:050504140404040404040404040404061606060604040606060606160606060616060606040404040406060404040404040404040404040404040505000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
// 011:050505040404040414040404040404040406060606060616060606060606040404040404040404140404060604140404040404040404140404040505000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
// 012:050505250504040404040404040404040404040606060606040404040404040404040404040404040404040616060404040414040404040404040505000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
// 013:050505050505050505050504040414044504040616060404040404040414040404040414040404040404040404060604042404040404040404041405000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
// 014:050505150505050505051505050504040404040606060404040404040404040424040404040404040404044404040616060404040404040404040405000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
// 015:050505050505150525050505050505050505040606060404040404040404040404040404040404041404040404040404060606060606160604040405000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
// 016:051505050505050505050505050505051505051606060505051505050505050505050505040404040404040404140404040404040404040606040405000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
// 017:050505050505041404050505150505050505050606061505050525050505050505051505050505050404040404040404040404040414040404040405000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
// 018:050505050404040404040404040404040414040606060404050505050515050505050505050505050505050505050505040404040404040404040505000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
// 019:050504040404040404040404040404040404040606060414040404040404040505050505050515050505150505050505150505050505040445040505000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
// 020:050504040426262626262626262626260404040606160404040404040414040404040405150505050505050505050505050525050505050404040505000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
// 021:050404041426060606060606060606260404040606060606041404040404040404040404040404050505050515050505050505050505050505050515000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
// 022:050404040426064506060606060606260406060606060606160604240404040414040404140404040414040404040405050505150505050505250505000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
// 023:051404040426060606060626264626260406160606040406060606060606060404040404040404040404040404040404040405050505050505050505000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
// 024:050404040426060606060626040604040406060404140404040606060616060606060604040404040404040404041404040404040404040505051505000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
// 025:050404040426060606060626040606040606040404040404042404040404060606160604040414040404240404040404041404040404040404050505000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
// 026:050404040426064506060626040406060604040404040404040404040404040404040606040404040404040404040404040404040414040404140505000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
// 027:050404040426060606060626040404040404040404040404040404040404040404040406060606061606040404140404040404040404040404040405000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
// 028:050404041426262626060626262626262626260404040404041404040404040404040404040404040406060606060606160606040404040445042405000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
// 029:050414040404040426060606060606060606260404040404040404040414040424040404040414040404040404040404040406061606060404040405000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
// 030:050504040404040426060606450606064506260414040404040404040404040404040404040404040404040404040404040404040404140404040505000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
// 031:050504040404450426060606060606060606260404040404040404040404040404040404140404040404140404042404040404040404050505050505000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
// 032:050505050404040426262626262626262626260404040505050505050505050505040404040404040404050505040404040404140405050505050505000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
// 033:050505050505050505050505050505050505050505050505050505050505050505050505050505050505050505050505050505050505050505050505000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
// </MAP>

// <WAVES>
// 000:00000000ffffffff00000000ffffffff
// 001:0123456789abcdeffedcba9876543210
// 002:0123456789abcdef0123456789abcdef
// </WAVES>

// <SFX>
// 000:31823183418541d541d641d641d651d661d671d691d6b1d6e1d6f100f100f100f100f100f100f100f100f100f100f100f100f100f100f100f100f10050b000000000
// 001:c001b02490438047809780a6a093c061d041e031e051f000f000f000f000f000f000f000f000f000f000f000f000f000f000f000f000f000f000f000370000000000
// </SFX>

// <FLAGS>
// 000:00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010002000000000000000000000001010100050100000000000000000000000001000900000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
// </FLAGS>

// <PALETTE>
// 000:1a1c2c5d275db13e53ef7d57ffcd75a7f07038b76425717929366f3b5dc941a6f673eff7f4f4f494b0c2566c86333c57
// </PALETTE>

