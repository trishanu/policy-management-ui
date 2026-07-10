import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from '../app/pages/login/login';
import { AdminDashboard } from '../app/pages/admin-dashboard/admin-dashboard';
import { AgentDashboard } from '../app/pages/agent-dashboard/agent-dashboard';
import { CustomerDashboard } from '../app/pages/customer-dashboard/customer-dashboard';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from '../app/pages/dashboard/dashboard';
import { authGuard } from '../app/guards/auth-guard';

export const routes: Routes = [

    {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'dashboard',
    component: DashboardComponent
  },

  {
    path: '**',
    redirectTo: 'login'
  }
];
