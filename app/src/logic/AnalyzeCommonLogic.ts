import { getKeyByValue } from 'src/util/util';
import {
  RANK_BONUS_MAPPING,
  RANK_MAPPING,
  DEFAULT_PLUS_POINT,
  BONUS_POINT_SECOND,
  BONUS_POINT_TOP,
  BONUS_POINT_THIRD,
  BONUS_POINT_RAS,
} from '../const/AnalyzeConst';
import GameDetailRule from 'src/dto/gamedata/GameDetailRule.dto';
import MatchRankPoint from '../dto/logic/MatchRank.dto';
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
export const calculateResultPoint = (
  matchPoint: number,
  matchRank: number,
  gameDetailRule: GameDetailRule,
  seat: number,
  matchRankPointList: MatchRankPoint[],
): number => {
  // 素点から基礎得点を算出((素点-計算基準点)/1000)
  const basePoint =
    (matchPoint + DEFAULT_PLUS_POINT - gameDetailRule.fandian) / 1000;

  // 基礎得点 + 順位点
  const resultPoint =
    basePoint +
    getRankBonusPoint(
      matchRank,
      getSamePointFlag(matchRankPointList),
      seat,
      matchRankPointList,
    );

  return resultPoint;
};

export const getRankBonusPoint = (
  matchRank: number,
  samePointFlag: number,
  seat: number,
  matchRankPointList: MatchRankPoint[],
): number => {
  // 同点者なしの場合
  if (samePointFlag === 0) {
    return RANK_BONUS_MAPPING[getKeyByValue(RANK_MAPPING, matchRank)];
  }

  // 同点者2名&1,2位同立の場合
  if (samePointFlag === 1) {
    // 3,4着の場合は計算なしで返却する
    if (matchRank !== 1) {
      return RANK_BONUS_MAPPING[getKeyByValue(RANK_MAPPING, matchRank)];
    }

    // 1,2着の順位点を山分け
    return (BONUS_POINT_TOP + BONUS_POINT_SECOND) / 2;
  }

  // 同点者2名&2,3位同立の場合
  if (samePointFlag === 2) {
    // 1,4着の場合は計算なしで返却する
    if (matchRank !== 2) {
      return RANK_BONUS_MAPPING[getKeyByValue(RANK_MAPPING, matchRank)];
    }

    // 2,3着の順位点を山分け
    return (BONUS_POINT_SECOND + BONUS_POINT_THIRD) / 2;
  }

  // 同点者2名&3,4位同立の場合
  if (samePointFlag === 3) {
    // 1,2着の場合は計算なしで返却する
    if (matchRank !== 3) {
      return RANK_BONUS_MAPPING[getKeyByValue(RANK_MAPPING, matchRank)];
    }

    // 3,4着の順位点を山分け
    return (BONUS_POINT_THIRD + BONUS_POINT_RAS) / 2;
  }

  // 同点者3名&1,2,3位同立の場合
  if (samePointFlag === 4) {
    // 4着の場合は計算なしで返却する
    if (matchRank !== 1) {
      return RANK_BONUS_MAPPING[getKeyByValue(RANK_MAPPING, matchRank)];
    }

    // 同点者の席番号リストを取得し、昇順に並べる(要素数3)
    const seatList: number[] = matchRankPointList
      .filter(
        (matchRankPoint: MatchRankPoint) => matchRankPoint.rank === matchRank,
      )
      .map((matchRankPoint: MatchRankPoint) => matchRankPoint.seat)
      .sort((a: number, b: number) => a - b);

    // 順位点基礎計算
    const bonusBasePoint = Math.floor(
      (BONUS_POINT_TOP + BONUS_POINT_SECOND + BONUS_POINT_THIRD) / 3,
    );
    // 起家用加算得点
    const bonusFirstLeaderPoint =
      (BONUS_POINT_TOP + BONUS_POINT_SECOND + BONUS_POINT_THIRD) % 3;

    // 引数の席番号が起家に近い場合に余りを加算して返却
    return bonusBasePoint + (seatList[0] === seat ? bonusFirstLeaderPoint : 0);
  }

  // 同点者3名& 2,3,4位同立の場合
  if (samePointFlag === 5) {
    // 1着の場合は計算なしで返却する
    if (matchRank !== 2) {
      return RANK_BONUS_MAPPING[getKeyByValue(RANK_MAPPING, matchRank)];
    }

    // 2,3,4着の順位点を山分け
    return (BONUS_POINT_SECOND + BONUS_POINT_THIRD + BONUS_POINT_RAS) / 3;
  }
};

/**
 * 同点フラグ取得
 *
 * <pre>
 * 素点リストから、同点判定を行いフラグを返却する
 * 0: 同点者なし
 * 1: 同点者2名&1,2位同立
 * 2: 同点者2名&2,3位同立
 * 3: 同点者2名&3,4位同立
 * 4: 同点者3名&1,2,3位同立
 * 5: 同点者3名&2,3,4位同立
 * </pre>
 *
 * @param matchRankPointList 素点リスト
 * @returns 同点フラグ
 */
export const getSamePointFlag = (
  matchRankPointList: MatchRankPoint[],
): number => {
  // 同点者3人&1,2,3位同立
  if (
    matchRankPointList[0].point == matchRankPointList[1].point &&
    matchRankPointList[1].point == matchRankPointList[2].point
  ) {
    return 4;
  }

  // 同点者3人&2,3,4位同立
  if (
    matchRankPointList[1].point == matchRankPointList[2].point &&
    matchRankPointList[2].point == matchRankPointList[3].point
  ) {
    return 5;
  }

  // 同点者2人&1,2位同立
  if (
    matchRankPointList[0].point == matchRankPointList[1].point &&
    matchRankPointList[1].point != matchRankPointList[2].point
  ) {
    return 1;
  }

  // 同点者2人&2,3位同立
  if (matchRankPointList[1].point == matchRankPointList[2].point) {
    return 2;
  }

  // 同点者2人&3,4位同立
  if (matchRankPointList[2].point == matchRankPointList[3].point) {
    return 3;
  }

  return 0;
};
