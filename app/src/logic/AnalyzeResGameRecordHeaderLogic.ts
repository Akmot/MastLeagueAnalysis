import AccountInfo from 'src/dto/gamedata/AccountInfo.dto';
import RecordGame from 'src/dto/gamedata/RecordGame.dto';
import {
  MatchResult,
  Player,
  ResponseBody,
} from 'src/dto/response/ResponseBody.dto';
import { ResponseHeader } from 'src/dto/response/ResponseHeader.dto';
import {
  calculateResultPoint,
  convertUnixTimeToDate,
} from './AnalyzeCommonLogic';
import PlayerItem from 'src/dto/gamedata/PlayerItem.dto';
import GameDetailRule from 'src/dto/gamedata/GameDetailRule.dto';
import { DEFAULT_PLUS_POINT } from 'src/const/AnalyzeConst';
import MatchRankPoint from 'src/dto/logic/MatchRank.dto';

/**
 * レスポンスヘッダ作成
 * @param resGameRecordHead リクエストの対局データ
 * @returns レスポンスヘッダ
 */
export const createResponseHeader = (
  resGameRecordHead: RecordGame,
): ResponseHeader => {
  // 返却値初期化
  const responseHeader: ResponseHeader = {
    file_path: null,
    startDateTime: new Date(),
    endDateTime: new Date(),
    duration: 0,
  };

  // リクエスト情報のヘッダ部と対局時間を取得
  const { start_time, end_time } = resGameRecordHead;

  // 対局時間を変換し、詰め替え
  responseHeader.startDateTime = convertUnixTimeToDate(start_time);
  responseHeader.endDateTime = convertUnixTimeToDate(end_time);
  responseHeader.duration = (end_time - start_time) * 1000;

  return responseHeader;
};

/**
 * レスポンスボディ作成
 * @param resGameRecordHead リクエストの対局データ
 * @returns レスポンスボディ
 */
export const createResponseBody = (
  resGameRecordHead: RecordGame,
): ResponseBody => {
  // 返却値初期化
  const responseBody: ResponseBody = {
    playerList: null,
    matchResult: null,
  };

  // リクエスト情報のヘッダ部からアカウント情報と対局結果情報を取得
  const { accounts, result, config } = resGameRecordHead;
  const playerMatchData: PlayerItem[] = result.players;

  // データを作成
  responseBody.playerList = createPlayerList(accounts);
  responseBody.matchResult = createMatchResultList(
    accounts,
    playerMatchData,
    config.mode.detail_rule,
  );

  return responseBody;
};

/**
 * 対局者リスト作成
 * @param accountInfoList リクエスト情報の対局者情報
 * @returns レスポンスボディの対局者リスト
 */
const createPlayerList = (accountInfoList: AccountInfo[]): Player[] => {
  return accountInfoList.map((accountInfo: AccountInfo) => {
    const player: Player = {
      accountId: null,
      accountName: null,
    };

    player.accountId = accountInfo.account_id;
    player.accountName = accountInfo.nickname;

    return player;
  });
};

/**
 * 対局結果リスト作成
 * @param accountInfoList リクエスト情報の対局者情報
 * @param playerMatchData リクエスト情報の対局者毎の対局結果
 * @returns レスポンスボディの対局結果リスト
 */
const createMatchResultList = (
  accountInfoList: AccountInfo[],
  playerMatchData: PlayerItem[],
  gameDetailRule: GameDetailRule,
): MatchResult[] => {
  // 得点のリストを取得
  const matchPointRankList: MatchRankPoint[] = playerMatchData.map(
    (playerItem: PlayerItem) => {
      return {
        point: playerItem.part_point_1,
        seat: playerItem.seat,
        rank: 0,
      };
    },
  );
  // 点数の降順にソート
  matchPointRankList.sort((a, b) => b.point - a.point);

  const matchResultList: MatchResult[] = accountInfoList.map(
    (accountInfo: AccountInfo) => {
      const matchResult: MatchResult = {
        accountId: accountInfo.account_id,
        matchRank: 0,
        matchPoint: 0,
        resultPoint: 0,
        seat: 0,
      };

      // 席番号から対象アカウントの対局結果を取得
      const matchData = playerMatchData.find(
        (playerItem: PlayerItem) => playerItem.seat == accountInfo.seat,
      );

      // 順位を取得(同立の場合、上位の順位が取得される)
      const matchRank =
        matchPointRankList.findIndex(
          (matchPointRank: MatchRankPoint) =>
            matchPointRank.point === matchData.part_point_1,
        ) + 1;
      // 得点順位リストの順位を更新
      matchPointRankList.find(
        (matchRankPoint) => matchRankPoint.seat === accountInfo.seat,
      ).rank = matchRank;

      // 素点を計算
      const matchPoint = matchData.part_point_1 - DEFAULT_PLUS_POINT;

      // 対局結果を格納
      matchResult.matchRank = matchRank;
      matchResult.matchPoint = matchPoint;
      matchResult.seat = accountInfo.seat;
      matchResult.resultPoint = calculateResultPoint(
        matchPoint,
        matchRank,
        gameDetailRule,
        accountInfo.seat,
        matchPointRankList,
      );

      return matchResult;
    },
  );

  // 得点を算出し返却(順位計算の前後関係の都合上)
  return matchResultList.map((matchResult) => {
    return {
      accountId: matchResult.accountId,
      matchRank: matchResult.matchRank,
      matchPoint: matchResult.matchPoint,
      seat: matchResult.seat,
      resultPoint: calculateResultPoint(
        matchResult.matchPoint,
        matchResult.matchRank,
        gameDetailRule,
        matchResult.seat,
        matchPointRankList,
      ),
    };
  });
};
