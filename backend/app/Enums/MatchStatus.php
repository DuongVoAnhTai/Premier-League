<?php

namespace App\Enums;

enum PlayerPosition: string
{
    case GOALKEEPER = 'GOALKEEPER';
    case DEFENDER = 'DEFENDER';
    case MIDFIELDER = 'MIDFIELDER';
    case FORWARD = 'FORWARD';
}