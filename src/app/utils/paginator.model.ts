import { ElementRef, Injectable } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { FilterPipe } from '../filter.pipe';

@Injectable({
    providedIn: 'root'
})
/**
 * Class that will be used in modules with table
 */
export class PPaginator {
    pageOptions: any[] = [10, 15, 20];
    allElements: number;
    pageSize: number = this.pageOptions[0];
    currentPage: number;
    lowValue: number = 0;
    highValue: number = this.pageOptions[0];
    origin: any[];
    slice: any[] = [];

    private currFilter: string = '';
    private currProp: string = '';
    filter: FilterPipe;

    constructor() {
        this.filter = new FilterPipe();
    }
    /**
     * Loads objects
     * @param origin Collection that we will use
     */

    init(data: any, prop: string) {
        this.clear();
        this.loadOrigin(data);
        if (this.currFilter.length > 0) {
            this.slice = this.filter.transform(this.currFilter, this.slice, prop);
        }
    }

    private loadOrigin(origin: any[]) {
        this.origin = origin;
        this.allElements = origin.length;

        if (this.allElements > 0 && this.allElements > this.pageOptions[2] && this.pageOptions.findIndex(e => e === this.allElements) < 0) {
            this.pageOptions.push(this.allElements);
        }
        this.refreshSlice();
    }
    /**
     * Get array with id's for objects in slice.
     */
    getSliceObjectsIds(): number[] {
        let arr: number[] = [];
        this.slice.forEach(element => {
            arr.push(element.id);
        });
        return arr;

    }
    refreshSlice() {
        this.slice = this.origin.slice(this.lowValue, this.highValue);
    }

    hideDeletedItem(item: any) {
        this.slice = this.slice.filter(elem => elem.id !== item.id);
    }
    /**
     * Receive info from interactions with view- page changes
     * @param e 
     */
    notify(e: any) {
        this.currentPage = e.pageIndex;
        this.pageSize = e.pageSize;

        if (this.pageSize <= this.pageOptions[2]) {
            localStorage.setItem('page_size', JSON.stringify(this.pageSize));
        }

        this.allElements = e.length;
        this.lowValue = e.pageIndex * e.pageSize;
        this.highValue = this.lowValue + e.pageSize;
        this.refreshSlice();
    }
    /**
     * Clears variables
     */
    clear() {

        let size: number = JSON.parse(localStorage.getItem('page_size'));
        this.pageOptions = [10, 15, 20];

        if (size > this.pageOptions[2]) {
            size = this.pageOptions[2];
        }
        this.currFilter = '';
        this.currProp = '';
        this.allElements = 0;
        this.pageSize = size ? size : this.pageOptions[0];
        this.currentPage = 1;
        this.lowValue = 0;
        this.highValue = size ? size : this.pageOptions[0];
        delete this.origin;//= undefined;
        delete this.slice;//= undefined;
    }

    filterCollection(searchText: string, prop: string) {
        this.currFilter = searchText;
        this.currProp = prop;
        this.refreshSlice();
        if (this.currFilter.length > 0) {
            this.slice = this.filter.transform(this.currFilter, this.slice, this.currProp);
        }
    }


    sortCollection(sort: Sort) {
        const data = this.origin;
        if (!sort.active || sort.direction === '') {
            // this.sortedData = data;
            return;
        }

        let sorted = data.sort((a, b) => {
            const isAsc = sort.direction === 'asc';
            return this.compare(a[sort.active], b[sort.active], isAsc);
        });

        this.loadOrigin(sorted);
    }

    private compare(a: number | string, b: number | string, isAsc: boolean) {
        return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }

    /**
     * Show on matPaginator reference new options
     * @param pagin 
     */
    refreshViewPageSizeOptions(pagin: ElementRef<any>, showAll: boolean) {
        if (showAll === true) {
            this.highValue = this.allElements;
            this.pageSize = this.highValue;
            this.refreshSlice();
        }
        pagin['pageSizeOptions'] = this.pageOptions;
    }
}