export default class PlayerItem {
  seat: number; // 対局者の席番号
  total_point: number; // ウマオカを含めた点数収支
  part_point_1: number; // ウマオカを除いた点数収支
  part_point_2: number;
  grading_score: number; // 段位昇段ポイントの収支
  gold: number; // コイン収支
}
