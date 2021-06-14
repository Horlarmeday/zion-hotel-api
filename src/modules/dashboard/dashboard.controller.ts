import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('stats')
  async getStats() {
    const stats = await this.dashboardService.getStats();
    return { message: 'Data retrieved', result: stats };
  }

  @Get('departures')
  async getDepartures() {
    const departures = await this.dashboardService.getDeparturesToday();
    return { message: 'Data retrieved', result: departures };
  }

  @Get('arrivals')
  async getArrivals() {
    const arrivals = await this.dashboardService.getNewArrivals();
    return { message: 'Data retrieved', result: arrivals };
  }
}
