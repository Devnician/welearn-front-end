import { Component, Input } from '@angular/core';

@Component({
    selector: 'loader',
    template: `<div [class.loader-hidden]="!show">
                    <div class="loader-overlay">
                        <div>
                            <mat-progress-bar mode="indeterminate" *ngIf="show">
                            </mat-progress-bar>
                        </div>
                    </div>
                </div>`,


})
export class LoaderComponent {
    @Input() show: boolean;

}