import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { AnalysisResponse } from './dto/response/analysis-response.dto';
import Request from './dto/request/Request.dto';

@Controller('mast-league-analysis')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('from-local-json')
  analyzeFromLocalJson(@Body() request: Request): AnalysisResponse {
    return this.appService.analyzeFromLocalJson(request);
  }
}
