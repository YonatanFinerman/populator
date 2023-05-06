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

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NationIndexComponent,
    NationListComponent,
    NationPreviewComponent
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
