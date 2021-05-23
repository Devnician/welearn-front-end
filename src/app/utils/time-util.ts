import { formatDate } from '@angular/common';

export class TimeUtil {
  private formatDate = 'dd/MM/yyyy';
  private formatDateTime = 'dd/MM/yyyy HH:mm:ss';
  locale: string;
  /**
   * Returns date string only
   * @param dateString date string
   */
  public static adjustDate(dateString: any): any {
    // 2019-05-15
    if (!dateString) {
      return '';
    }
    try {
      return new Date(dateString).toISOString().substring(0, 10);
    } catch (error) {
      return '';
    }
  }

  public static adjustDateStringToDateTime(dateString: any): any {
    if (!dateString) {
      return '';
    }
    try {
      return new Date(dateString).toISOString().substring(0, 16);
    } catch (error) {
      return '';
    }
  }

  constructor(locale: string) {
    this.locale = locale;
  }

  /**
   * Gets absolute start of today
   */
  public getStartOFToday(): Date {
    const date: Date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  }

  formatDateToLocale(date: string) {
    const result: any = formatDate(date, this.formatDate, this.locale);
    return result;
  }

  getDateFromFormatedDate(date: string): Date {
    try {
      const dateArray = date.split('/');
      const d: Date = new Date(
        dateArray[2] + '-' + dateArray[1] + '-' + dateArray[0]
      );
      return d;
    } catch (error) {
      return undefined;
    }
  }

  formatDateTimeToLocale(date: string) {
    const result: any = formatDate(date, this.formatDateTime, this.locale);
    return result;
  }
  // // const myDate = '2019-06-29';
  // const locale = 'bg-BG';
  // // const formattedDate = formatDate(myDate, format, locale);
  // dev.requestDate = formatDate(dev.requestDate, format, locale);//   pipe.transform(dev.requestDate, 'short'); // this
}
