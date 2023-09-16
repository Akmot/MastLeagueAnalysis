import { Injectable } from '@nestjs/common';
import Request from './dto/request/Request.dto';
import { AnalysisResponse } from './dto/response/analysis-response.dto';
// import { Body } from './dto/response/body.dto';
import { Header } from './dto/response/header.dto';
import { getGameData } from './logic/ReadJsonLogic';

@Injectable()
export class AppService {
  analyzeFromLocalJson(request: Request): AnalysisResponse {
    console.log(request.json_path);
    // Jsonからゲームデータを取得
    const readJsonResult = getGameData(request.json_path);
    console.log(readJsonResult);
    return this.createAnalysisResponse();
  }

  // TODO ゲームデータ解析を作成する。
  private createAnalysisResponse(): AnalysisResponse {
    const responseHeader: Header = new Header();
    responseHeader.startDateTime = new Date();
    responseHeader.endDateTime = new Date();
    responseHeader.duration = 0;

    const response: AnalysisResponse = new AnalysisResponse();
    response.header = responseHeader;
    return response;
  }
}
