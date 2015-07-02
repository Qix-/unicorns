#!/bin/sh
':' //; exec "$(command -v nodejs || command -v node)" "$0" "$@"
'use strict';

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
var Player = require('player');

var bpm = (60 / 155) * 1000;
var bar = bpm * 4;

var song = new Player(path.join(__dirname, 'qix-unicorn.mp3'));
function playSongImSoSorry() {
  song.play(function(err, player) {
    playSongImSoSorry();
  });
}

playSongImSoSorry();
