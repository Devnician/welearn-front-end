import { Component, OnDestroy, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { BlitcenComponent } from '../blitcen/blitcen.component';
import { PPaginator } from '../utils/paginator.model';

@Component({
  selector: 'app-base',
  template: 'NO UI TO BE FOUND HERE!',
  styleUrls: ['./base.component.scss']
})

/**
 * Base class for components that contains TABLE. Included are Pagination, filtering by props and other utility methods.
 */
export class BaseComponent extends BlitcenComponent implements OnDestroy {
  show = false;
  officeId: number = 0;
  paginator: PPaginator;
  protected activatedRoute: ActivatedRoute;
  storage: any = {};

  @ViewChild('table', { static: true }) table: MatTable<any>;
  constructor(ar: ActivatedRoute) {
    super();
    this.injectPaginator();
    this.activatedRoute = ar;
  }

  injectPaginator() {
    this.paginator = this.appInjector.get(PPaginator);
  }

  loadStorageVars() {
    this.storage.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.storage.type = this.activatedRoute.snapshot.paramMap.get('type');
  }

  /**
   * Loads pager with given collection.
   * @param data The data  
   * @param prop initial property for filtering
   */
  loadPaginator(data: any, prop: string) {
    this.paginator.init(data, prop);
  }
  /**
   * Filtering collection by given property
   * @param searchText criteria
   * @param prop  property for filtering
   */
  applyFilter(searchText: string, prop: string) {
    this.paginator.filterCollection(searchText, prop);
  }
  /**
   * Handler for pagination event's
   * @param e 
   */
  handlePage(e: any) {
    this.paginator.notify(e);
  }
  /**
   * Clears pginator, if no one of inheritors does this
   */
  ngOnDestroy(): void {
    delete this.paginator;
  }

}
