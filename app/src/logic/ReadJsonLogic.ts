import * as fs from 'fs';
import { ResGameRecord } from 'src/dto/gamedata/ResGameRecord.dto';

type ReadJsonResult = {
  isProcessTarget: boolean;
  gameData: ResGameRecord;
};

/**
 * ゲームデータ取得
 *
 * @param filePath Jsonファイルが格納されているパス文字列
 * @returns Json読み取り結果
 */
export const getGameData = (filePath: string): ReadJsonResult => {
  const result: ReadJsonResult = {
    isProcessTarget: false,
    gameData: null,
  };
  // Jsonファイル読み取り
  const jsonData = readJsonFile(filePath);

  // 解析対象のオブジェクト判定
  const isTarget = isResGameRecordInstance(jsonData);

  if (!isTarget) {
    return result;
  } else {
    result.isProcessTarget = isTarget;
    result.gameData = jsonData;
  }

  return result;
};

/**
 * ResGameRecordInstance Check.
 *
 * @param obj Jsonファイルから読み取ったオブジェクト
 * @returns オブジェクトがResGameRecordである場合にtrue
 */
const isResGameRecordInstance = (obj: any): obj is ResGameRecord => {
  return (
    typeof obj === 'object' && obj !== null && 'head' in obj && 'data' in obj
  );
};

/**
 * Jsonファイル読み取り
 *
 * @param filePath Jsonファイルが格納されているパス文字列
 * @returns Jsonファイル読み取り結果
 */
const readJsonFile = (filePath: string): any => {
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    throw new Error(`Error reading JSON file: ${error.message}`);
  }
};
