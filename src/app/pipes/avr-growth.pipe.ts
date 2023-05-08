import { Pipe, PipeTransform } from '@angular/core';
import { NationYearPopulationStats } from '../models/nation.model';

@Pipe({
  name: 'avrGrowth'
})
export class AvrGrowthPipe implements PipeTransform {

  transform(stats:NationYearPopulationStats[] ): number {

    const totalGrowth = stats[stats.length-1].population - stats[0].population
    const years = stats.length - 1
    const avgGrowth = totalGrowth / years

    return (+avgGrowth.toFixed(0))
  }

}
