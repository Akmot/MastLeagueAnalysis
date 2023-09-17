// 順位点
export const BONUS_POINT_TOP = 50;
export const BONUS_POINT_SECOND = 10;
export const BONUS_POINT_THIRD = -BONUS_POINT_SECOND;
export const BONUS_POINT_RAS = -30;

// 順位表
export const RANK_MAPPING = {
  top: 1,
  second: 2,
  third: 3,
  ras: 4,
};

// 順位-ウマ対応
export const RANK_BONUS_MAPPING = {
  top: BONUS_POINT_TOP,
  second: BONUS_POINT_SECOND,
  third: BONUS_POINT_THIRD,
  ras: BONUS_POINT_RAS,
};

// 飛びなし考慮加算素点
export const DEFAULT_PLUS_POINT = 100000;
