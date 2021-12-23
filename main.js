'use strict'

import { player1, player2 } from "./js/playersObj.js"
import { createPlayer } from './js/creatorsFunc.js'
import {$arenas, $formFigth} from './js/DOMelements.js'
import {submitFormFigthHandler} from './js/submitHandler.js'

$arenas.append(createPlayer(player1))
$arenas.append(createPlayer(player2))

$formFigth.addEventListener('submit', submitFormFigthHandler)

