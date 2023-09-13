export default class AccountInfo {
  account_id: number; // アカウントID
  seat: number; // 対局者の席
  nickname: string; // プレイヤー名
  avatar_id: number;
  character; // キャラクター情報
  title: number; // 称号
  level; //四麻の段位情報
  level3; // 三麻の段位情報
  avatar_frame: number; // アイコンフレームのID
  verified: number; // 公認プレイヤーフラグ
  views; // 装飾品情報
}
