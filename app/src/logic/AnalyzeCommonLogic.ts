import { getKeyByValue } from 'src/util/util';
import {
  RANK_BONUS_MAPPING,
  RANK_MAPPING,
  DEFAULT_PLUS_POINT,
} from '../const/AnalyzeConst';
import GameDetailRule from 'src/dto/gamedata/GameDetailRule.dto';
/**
 * 日時変換(Unix時間 -> 日時)
 * @param unixTime Unix時間(uint32)
 * @returns 変換後日時
 */
export const convertUnixTimeToDate = (unixTime: number): Date => {
  return new Date(unixTime * 1000);
};

/**
 * 得点計算
 * @param matchPoint 素点
 * @param matchRank 対局順位
 * @returns 得点
 */
export const calculateResultPont = (
  matchPoint: number,
  matchRank: number,
  gameDetailRule: GameDetailRule,
): number => {
  // 素点から基礎得点を算出((素点-計算基準点)/1000)
  const basePoint =
    (matchPoint + DEFAULT_PLUS_POINT - gameDetailRule.fandian) / 1000;

  // 順位に対するウマ点を取得
  const rankBonusPoint =
    RANK_BONUS_MAPPING[getKeyByValue(RANK_MAPPING, matchRank)];

  // オカ計算(1位必要得点-配給原点)
  const topPrize =
    ((gameDetailRule.fandian - gameDetailRule.init_point) * 4) / 1000;

  // 基礎得点 + ウマ点 + オカ得点(1位の場合)
  const resultPoint =
    basePoint + rankBonusPoint + (matchRank == 1 ? topPrize : 0);

  return resultPoint;
};
