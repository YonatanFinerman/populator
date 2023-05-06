import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NationIndexComponent } from './pages/nation-index/nation-index.component';

const routes: Routes = [

  { path: 'nation', component: NationIndexComponent },
  { path: '', component: HomePageComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
