import { Component, Input } from '@angular/core';

@Component({
    selector: 'alert-tag',
    template: `<div #alert class="alert">
                <span class="closebtn" (click)="alert.hidden='true';">&times;</span>
                <strong>Забележка: </strong> {{message}}
               </div>`,
    styles: [`.closebtn {
        margin-left: 15px;
        color: white;
        font-weight: bold;
        float: right;
        font-size: 22px;
        line-height: 20px;
        cursor: pointer;
        transition: 0.3s;
      }`,
        `.closebtn:hover {color: black;}`,
        `.alert { border-radius: 10px;   padding: 20px; background-color: #cea29f; color: white;`,
    ]

})
export class AlertTagComponent {
    @Input() message: string;

}