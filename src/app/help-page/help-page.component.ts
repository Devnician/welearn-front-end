import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-help-page',
  templateUrl: './help-page.component.html',
  styleUrls: ['./help-page.component.scss'],
})
export class HelpPageComponent implements OnInit {
  title = 'NG7 CheckList With Parents and Child Structure';
  data: any;

  constructor() {
    this.data = {};
    this.data.isAllSelected = false;
    this.data.isAllCollapsed = false;
    // List object having hierarchy of parents and its children
    this.data.ParentChildchecklist = [
      {
        id: 1,
        value: 'автомобили',
        isSelected: false,
        isClosed: false,
        childList: [
          {
            id: 1,
            parent_id: 1,
            value: 'списък с автомобили',
            text: '',
            isSelected: false,
          },
          {
            id: 2,
            parent_id: 1,
            value: 'добавяне',
            text: '',
            isSelected: false,
          },
          {
            id: 3,
            parent_id: 1,
            value: 'редактиранe',
            text: ' Достъпно от всеки ред в списъка с автомобили чрез бутона "редактирай"',
            isSelected: false,
          },
        ],
      },
      {
        id: 2,
        value: 'билети',
        isSelected: false,
        isClosed: false,
        childList: [
          {
            id: 1,
            parent_id: 1,
            value: 'child 1',
            text: '',
            isSelected: false,
          },
          {
            id: 2,
            parent_id: 1,
            value: 'child 2',
            text: '',
            isSelected: false,
          },
        ],
      },
      {
        id: 3,
        value: 'календар',
        isSelected: false,
        isClosed: false,
        childList: [
          {
            id: 1,
            parent_id: 1,
            value: 'child 1',
            text: '',
            isSelected: false,
          },
          {
            id: 2,
            parent_id: 1,
            value: 'child 2',
            text: '',
            isSelected: false,
          },
        ],
      },
      {
        id: 3,
        value: 'устройства',
        isSelected: false,
        isClosed: false,
        childList: [
          {
            id: 1,
            parent_id: 1,
            value: 'добавяне',
            text: ' Добавяне на устройство е достъпно чрез бутон "+"в горния десен ъгъл на модул "Устройства" ',
            isSelected: false,
          },
          {
            id: 2,
            parent_id: 1,
            value: 'редактиране',
            text: ' Достъпно от всеки ред в списъка с устройства чрез бутона "редактирай"',
            isSelected: false,
          },
        ],
      },
    ];
  }

  ngOnInit() {}

  // Click event on parent checkbox
  parentCheck(parentObj) {
    for (const row of parentObj.childList) {
      row.isSelected = parentObj.isSelected;
    }
  }

  // Click event on child checkbox
  childCheck(parentObj, childObj) {
    for (const row of childObj) {
      if (row.isSelected === true) {
        parentObj.isSelected = true;
        break;
      }
    }
  }

  // Click event on master select
  selectUnselectAll(obj) {
    obj.isAllSelected = !obj.isAllSelected;
    for (const row of obj.ParentChildchecklist) {
      row.isSelected = obj.isAllSelected;
    }
  }

  // Expand/Collapse event on each parent
  expandCollapse(obj) {
    obj.isClosed = !obj.isClosed;
  }

  // Master expand/ collapse event
  expandCollapseAll(obj) {
    for (const row of obj.ParentChildchecklist) {
      row.isClosed = !obj.isAllCollapsed;
    }
    obj.isAllCollapsed = !obj.isAllCollapsed;
  }

  // Just to show updated JSON object on view
  stringify(obj) {
    return JSON.stringify(obj);
  }
}
