import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapComponent } from './map/map.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
    { path: '', component: AboutComponent},
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
