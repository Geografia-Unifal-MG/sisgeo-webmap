import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapComponent } from './map/map.component';
import { TopografiaComponent } from './topografia/topografia.component';
import { HomeComponent } from './home/home.component';
import { BaciaComponent } from './bacia/bacia.component';
import { MapeamentoComponent } from './mapeamento/home/mapeamento.component';

const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'bacia', component: BaciaComponent},
    { path: 'topografia', component: TopografiaComponent},
    { path: 'mapeamento', component: MapeamentoComponent},
    { path: 'webmap', component : MapComponent },
    {
        path: "**",
        redirectTo: "webmap",
        pathMatch: "full"
    }
];

@NgModule({
imports: [
    RouterModule.forRoot(routes)
],
exports: [
    RouterModule
],
declarations: []
})

export class AppRoutingModule { }
