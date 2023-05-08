import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NationIndexComponent } from './pages/nation-index/nation-index.component';
import { NationDetailsComponent } from './pages/nation-details/nation-details.component';
import { NationResolver } from './services/nation.resolver';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'nation/:id',
    component: NationDetailsComponent,
    canActivate: [AuthGuard],
    resolve: { nation: NationResolver }
},

  { path: 'nation', component: NationIndexComponent },
  { path: '', component: HomePageComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
