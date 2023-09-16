import AccountInfo from './AccountInfo.dto';
import GameConfig from './GameConfig.dto';
import GameEndResult from './GameEndResult.dto';

/** 対局概要データ. */
export default class RecordGame {
  uuid: string; // UUID
  start_time: number; // 対局開始時間(Unix時間)
  end_time: number; // 対局終了時間(Unix時間)
  config: GameConfig; // 対局のルール情報
  accounts: AccountInfo[]; // 対局のアカウント情報(CPUを含まない)
  result: GameEndResult; // 対局の結果情報
}
