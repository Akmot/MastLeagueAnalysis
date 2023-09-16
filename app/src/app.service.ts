import { Injectable } from '@nestjs/common';
import Request from './dto/request/Request.dto';
import { AnalysisResponse } from './dto/response/analysis-response.dto';
import { getGameData } from './logic/ReadJsonLogic';
import { ResGameRecord } from './dto/gamedata/ResGameRecord.dto';
import {
  createResponseHeader,
  createResponseBody,
} from './logic/AnalyzeResGameRecordHeaderLogic';

@Injectable()
export class AppService {
  /**
   * ローカルJsonファイル解析
   * @param request リクエストボディ
   * @returns レスポンス情報
   */
  analyzeFromLocalJson(request: Request): AnalysisResponse {
    console.log(request.json_path);
    // Jsonからゲームデータを取得
    const readJsonResult = getGameData(request.json_path);

    if (!readJsonResult.isProcessTarget) {
      return null;
    }

    return this.createAnalysisResponse(
      readJsonResult.gameData,
      request.json_path,
    );
  }

  /**
   * 解析結果作成
   * @param resGameRecord リクエスト情報の対局データ
   * @param filePath 読み取りファイルのパス
   * @returns レスポンス情報
   */
  private createAnalysisResponse(
    resGameRecord: ResGameRecord,
    filePath: string,
  ): AnalysisResponse {
    const response = {
      header: createResponseHeader(resGameRecord.head),
      body: createResponseBody(resGameRecord.head),
    };
    response.header.file_path = filePath;

    return response;
  }
}
