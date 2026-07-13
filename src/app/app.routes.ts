import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from '../app/pages/login/login';
import { AgentDashboard } from '../app/pages/agent-dashboard/agent-dashboard';
import { CustomerDashboard } from '../app/pages/customer-dashboard/customer-dashboard';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from '../app/pages/dashboard/dashboard';
import { authGuard } from '../app/guards/auth-guard';
import { LayoutComponent } from './layout/layout';
import { PolicyDashboard } from './pages/policy-dashboard/policy-dashboard';
import { ClaimDashboard } from './pages/claim-dashboard/claim-dashboard';

export const routes: Routes = [

    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
{
    path:'login',
    component:LoginComponent
},

{
    path:'',
    component:LayoutComponent,
    canActivate:[authGuard],
    children:[

        {
            path:'dashboard',
            component:DashboardComponent
        },

        {
            path:'customers',
            component:CustomerDashboard
        },

        {
            path:'policies',
            component:PolicyDashboard
        },

        {
            path:'claims',
            component:ClaimDashboard
        },

        {
            path:'',
            redirectTo:'dashboard',
            pathMatch:'full'
        }

    ]
},

{
    path:'**',
    redirectTo:'login'
}
];
