/** 対局者情報. */
export class Player {
  /** アカウントID. */
  accountId: number;
  /** アカウント名. */
  accountName: string;
}

/** 対局結果. */
export class MatchResult {
  /** アカウントID. */
  accountId: number;
  /** 席番号. */
  seat: number;
  /** 対局順位. */
  matchRank: number;
  /** 素点. */
  matchPoint: number;
  /** 得点. */
  resultPoint: number;
}

/** 対局者詳細. */
export class PlayerMatchDetail {
  /** アカウントID. */
  accountId: number;
  /** 立直回数. */
  liqiCount: number;
  /** 和了回数. */
  huCount: number;
  /** 放銃回数. */
  gunCount: number;
  /** 副露回数（局単位）. */
  meldCount: number;
  /** 合計和了点. */
  huPointSum: number;
  /** 合計放銃点. */
  gunPointSum: number;
}

/** 対局詳細. */
export class MatchDetail {
  /** 局数. */
  juCount: number;
  /** 対局者詳細リスト. */
  playerMatchDetailList: PlayerMatchDetail[];
}

/** ボディ部. */
export class ResponseBody {
  /** 対局者リスト. */
  playerList: Player[];
  /** 対局結果リスト. */
  matchResult: MatchResult[];
  /** 対局詳細. */
  // TODO Shot2で対応
  // matchDetail: MatchDetail[];
}
