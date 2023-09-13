export default class GameDetailRule {
  time_fixed: number; // 基本考慮時間(sec)
  time_add: number; // 追加考慮時間(sec)
  dora_count: number; // 赤ドラ枚数
  shiduan: number; // 喰いタン有無
  init_point: number; // 配給原点
  fandian: number; // 1位必要得点
  bianjietichi: boolean; // 便利表示有無(false:なし,true:あり)
  ai_level: number; // CPUレベル
  fanfu: number; // 飜数縛り
  guyi_mode: number; // ローカル役有無
  open_hand: number; // 手配表示有無(0:なし,1:あり)
}
