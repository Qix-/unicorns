#!/bin/sh
':' //; exec "$(command -v nodejs || command -v node)" "$0" "$@"
'use strict';
/* global require */
/* global process */
/* global console */
/* global setTimeout */
/* global setInterval */
/* global clearInterval */
/* global __dirname */
/* ^ real unicorns don't need jshint */

/* The following code may hurt you a little bit.
   I make no warranty on the sanity of the following code.
   The following code WILL make you cry a little.
   I'm extremely tired and need a mental exercise.
   No, I didn't make the unicorn. R.B.Cleary did in 1995.
   Music by me, originally written by Weebl.

   I'm so sorry. */


/*

                  .
                 /'
                //
            .  //
            |\//7
           /' " \
          .   . .
          | (    \     '._
          |  '._  '    '. '
          /    \'-'_---. ) )
         .              :.'
         |               \
         | .    .   .     .
         ' .    |  |      |
          \^   /_-':     /
          / | |    '\  .'
         / /| |     \\  |
         \ \( )     // /
          \ | |    // /
           L! !   // /
            [_]  L[_|
*/

var path = require('path');
var fs = require('fs');
var Player = require('player');
var Color = require('color-js');

var width = process.stdout.columns;
var beat = (60 / 155) * 1000;
var bar = beat * 4;
var beat4 = beat / 4;

var song = new Player(path.join(__dirname, 'qix-unicorn.mp3'));
song.on('error', function() {}); // I don't give a damn.
song.play();

process.stdout.write('\x1b[1;1H\x1b[107;30m');

function setupLine() {
  console.log('\x1b[?25l\x1b[K\n\x1b[K');
}

function clearCanvas() {
  process.stdout.write('\x1b[1;1H\x1b[J');
  for (var i = 0; i < process.stdout.rows; i++) setupLine();
}

function domain(v, lb, ub, tlb, tub) {
  return Math.round(((v - lb) / (ub - lb)) * (tub - tlb) + tlb);
}

function rgb256(col) {
  col = col.toRGB();
  return Math.round(16 + (
        (col.red * 5 * 36) +
        (col.green * 5 * 6) +
        (col.blue * 5)
      ));
}

function go(x, y) {
  ++x;
  ++y;
  process.stdout.write('\x1b[' + y + ';' + x + 'H');
}

function rest() {
  process.stdout.write('\x1b[0;0H');
}

var signColors = [166, 200, 207, 162, 127, 214, 132, 198, 136];
var signColor = 0;

function showSign() {
  var dat = fs.readFileSync(path.join(__dirname, 'unicorns.dat'));

  var show = function(code) {
    process.stdout.write('\x1b[8H');
    for (var y = 0; y < 10; y++) {
      process.stdout.write('\x1b[' + (width - 65) + 'G');
      for (var x = 0; x < 60; x++) {
        var i = y * 60 + x;
        var pixel = ' \x1b[107m';
        if (dat[i]) {
          pixel = code + pixel;
        }
        process.stdout.write(pixel);
      }
      process.stdout.write('\n');
    }
  };

  for (var t = 0; t < 32*4; t++) {
    var bt = beat * t;
    if (t === 15 * 4 + 2) {
      bt -= beat / 2;
    }
    if (t === 15 * 4 + 3) {
      continue;
    }
    setTimeout(function() {
      signColor = ++signColor % signColors.length;
      show('\x1b[48;5;' + signColors[signColor] + 'm');
    }, bt);
  }
}

function showBarry() {
  clearCanvas();
  var barry = [
    '        /\'',
    '       //',
    '   .  //',
    '   |\\//7',
    '  /\' " \\',
    ' .   . .',
    ' | (    \\     \'._',
    ' |  \'._  \'    \'. \'',
    ' /    \\\'-\'_---. ) )',
    '.              :.\'',
    '|               \\',
    '| .    .   .     .',
    '\' .    |  |      |',
    ' \\^   /_-\':     /',
    ' / | |    \'\\  .\'',
    '/ /| |     \\\\  |',
    '\\ \\( )     // /',
    ' \\ | |    // /',
    '  L! !   // /',
    '   [_]  L[_|'
  ];

  process.stdout.write('\x1b[1m\x1b[11H');
  for (var i in barry) {
    var line = barry[i];
    console.log('\x1b[15G' + line);
  }
  process.stdout.write('\x1b[22m');

  var buttSprinkles = [];
  var buttInterval = setInterval(function() {
    process.stdout.write('\x1b[21;32H\x1b[K');
    for (var i in buttSprinkles) {
      var sprinkle = buttSprinkles[i]++;
      var shift = domain(sprinkle, 0, (width - 32), 0, 100);
      var color = new Color([255, 0, 0]).shiftHue(shift).toRGB();
      sprinkle = "\x1b[" + (sprinkle + 32) + "G\x1b[48;5;" +
        rgb256(color) + "m \x1b[107m";
      process.stdout.write(sprinkle);
    }

    buttSprinkles = buttSprinkles.filter(function(s) {
      return (s + 33) < width;
    });
    rest();
  }, 1000/30);

  for (var j = 0; j < (32 * 4); j++) {
    setTimeout(function() {
      buttSprinkles.push(0);
    }, j * beat);
  }
  setTimeout(function() {
    clearInterval(buttInterval);
  }, 32*4*beat);

  showSign();
}

var c = 0;
process.stdout.write('\x1b[16;' + Math.round(width/2-6) + 'H');
function showNext() {
  process.stdout.write("I'm so sorry  :("[c++]);
  //                                 ^ dear god let me never program again
}

for (var i = 0; i < 16; i++) {
  setTimeout(showNext, i * beat);
}

setTimeout(showBarry, beat * 16);

function cleanup() {
  process.stdout.write('\x1b[32H');
  if (this)
    console.log([
      '\x1b[?25h\x1b[0m\n\n',
      'Made with.. something.. by Qix',
      '       github.com/Qix-',
      '\x1b[1mSong:\x1b[0m "Unicorn" by Qix',
      '\x1b[1mCredit:\x1b[0m originally written by Weebl',
      '\n\n',
      'I\'m so sorry.'
    ].join('\n'));
  // process.exit(parseInt('unicorns', 36));
  // ^ do not uncomment. you'll lose all your gold.
}
process.on('exit', cleanup.bind(true));
process.on('SIGINT', cleanup.bind(false));
