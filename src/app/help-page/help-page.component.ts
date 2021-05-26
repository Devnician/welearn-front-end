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
    for (var i = 0; i < parentObj.childList.length; i++) {
      parentObj.childList[i].isSelected = parentObj.isSelected;
    }
  }

  // Click event on child checkbox
  childCheck(parentObj, childObj) {
    parentObj.isSelected = childObj.every(function (itemChild: any) {
      return itemChild.isSelected == true;
    });
  }

  // Click event on master select
  selectUnselectAll(obj) {
    obj.isAllSelected = !obj.isAllSelected;
    for (let i = 0; i < obj.ParentChildchecklist.length; i++) {
      obj.ParentChildchecklist[i].isSelected = obj.isAllSelected;
      // for (var j = 0; j < obj.ParentChildchecklist[i].childList.length; j++) {
      //   obj.ParentChildchecklist[i].childList[j].isSelected = obj.isAllSelected;
      // }
    }
  }

  // Expand/Collapse event on each parent
  expandCollapse(obj) {
    obj.isClosed = !obj.isClosed;
  }

  // Master expand/ collapse event
  expandCollapseAll(obj) {
    for (let i = 0; i < obj.ParentChildchecklist.length; i++) {
      obj.ParentChildchecklist[i].isClosed = !obj.isAllCollapsed;
    }
    obj.isAllCollapsed = !obj.isAllCollapsed;
  }

  // Just to show updated JSON object on view
  stringify(obj) {
    return JSON.stringify(obj);
  }
}
