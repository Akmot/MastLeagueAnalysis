export default class GameDataConst {
  // GameMode:東風戦
  static readonly TONPUSEN = 1;

  // GameMode:半荘戦
  static readonly HANCHANSEN = 2;

  // GameDetailRule:飜数縛り_1飜
  static readonly FANFU_1 = 1;

  // GameDetailRule:飜数縛り_2飜
  static readonly FANFU_2 = 2;

  // GameDetailRule:飜数縛り_4飜
  static readonly FANFU_4 = 4;

  // AccountInfo:対局者の席番号_起家
  static readonly FIRST_LEADER = 0;

  // AccountInfo:対局者の席番号_起家の下家
  static readonly FIRST_LEADER_RIGHT = 1;

  // AccountInfo:対局者の席番号_起家の対面
  static readonly FIRST_LEADER_OPPOSITE = 2;

  // AccountInfo:対局者の席番号_起家の上家
  static readonly FIRST_LEADER_LEFT = 3;
}
