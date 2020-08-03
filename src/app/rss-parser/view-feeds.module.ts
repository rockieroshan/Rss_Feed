import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedcomponentModule } from '../shared/sharedcomponent.module';
import { AppFeedsComponent } from './app-feeds/app-feeds.component';
import { ViewFeedsRoutingModule } from './view-feeds-routing.module';
import { ViewFeedsComponent } from './view-feeds/view-feeds.component';

@NgModule({
  declarations: [ViewFeedsComponent, AppFeedsComponent],
  imports: [
    CommonModule,
    DragDropModule,
    FileUploadModule,
    DialogModule,
    FormsModule,
    TableModule,
    TooltipModule,
    ReactiveFormsModule,
    SharedcomponentModule,
    ViewFeedsRoutingModule
  ]
})
export class ViewFeedsModule {}
