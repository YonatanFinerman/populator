import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app-root/app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NationIndexComponent } from './pages/nation-index/nation-index.component';
import { NationListComponent } from './cmps/nation-list/nation-list.component';
import { NationPreviewComponent } from './cmps/nation-preview/nation-preview.component';
import { AppHeaderComponent } from './cmps/app-header/app-header.component';
import { NaturalTypePipe } from './pipes/natural-type.pipe';
import { AvrGrowthPipe } from './pipes/avr-growth.pipe';
import { NationFilterComponent } from './cmps/nation-filter/nation-filter.component';
import { NationDetailsComponent } from './pages/nation-details/nation-details.component';
import { PopulationChartComponent } from './cmps/population-chart/population-chart.component';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NationIndexComponent,
    NationListComponent,
    NationPreviewComponent,
    AppHeaderComponent,
    NaturalTypePipe,
    AvrGrowthPipe,
    NationFilterComponent,
    NationDetailsComponent,
    PopulationChartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
