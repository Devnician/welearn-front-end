import { ResourceDto } from 'libs/rest-client/src';
import { ResourceControllerService } from 'libs/rest-client/src/api/resourceController.service';
import { BlitcenComponent } from '../blitcen/blitcen.component';

export class FileUtil {
  resources: ResourceDto[] = [];
  newResources: ResourceDto[] = [];
  files: any[] = [];
  regexpForFileTypes = new RegExp(
    '^(application/msword)|(application/vnd.openxmlformats-officedocument.wordprocessingml.document)' +
      '|(application/pdf)|(image/png)|(image/jpeg)|' +
      '(application/vnd.openxmlformats-officedocument.spreadsheetml.sheet)' +
      '|(application/vnd.ms-excel)|(text/csv)|' +
      '(application/vnd.oasis.opendocument.spreadsheet)|(text/plain)$'
 
  );
  constructor(
    private resourceControllerService: ResourceControllerService,
    private parent: BlitcenComponent
  ) {}

  push(dto: ResourceDto) {
    this.resources.push(dto);
  }

  filter(resourceId: string) {
    this.resources = this.resources.filter((f) => f.resourceId !== resourceId);
  }

  /**
   * on file drop handler
   */
  onFileDropped($event, disciplineId: string) {
    if (this.prepareFilesList($event) === true) {
      this.resourceControllerService
        .saveUsingPOST2(this.files[0], true, disciplineId)
        .subscribe((data) => {
          this.newResources.push(data);
        });
    }
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(files) {
    this.prepareFilesList(files);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    let removeThis = this.files[index];
    let dto = this.newResources.find((res) => res.name === removeThis.name);
    this.newResources.filter((f) => f.name !== removeThis.name);
    this.files.splice(index, 1);
    this.deleteExistingFile(dto);
  }

  deleteExistingFile(resourceDto: ResourceDto) {
    let ref = this.parent.showConfirmDialog(
      'Изтриване на файл',
      'Файлът ще бъде изтрит завинаги',
      undefined
    );
    ref.afterClosed().subscribe((data) => {
      if (data) {
        if (data.res === 'confirmed') {
          this.resourceControllerService
            .deleteUsingDELETE(resourceDto.resourceId)
            .subscribe((data) => {
              this.resources = this.resources.filter(
                (f) => f.resourceId !== resourceDto.resourceId
              );
              // this.fileUtil.filter(resourceDto.resourceId);
            });
        }
      }
    });
  }

  downloadExistingFile(resourceDto: ResourceDto) {
    let name = resourceDto.name;
    let resourceId = resourceDto.resourceId;
    this.downloadFile(resourceId, name);
  }
  private downloadFile(resourceId: string, name: string) {
    this.resourceControllerService
      .downloadResourceUsingGET(resourceId)
      .subscribe((body) => {
        var url = window.URL.createObjectURL(body);
        var anchor = document.createElement('a');
        anchor.download = name;
        anchor.href = url;
        anchor.target = '_blank';
        anchor.click();
        // this.fetchFile(name, url);
      });
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>): boolean {
    console.log(files);
    let correct = this.checkTypes(files);
    if (correct === true) {
      for (const item of files) {
        this.files.push(item);
      }
      return true;
    }
    return false;
  }

  checkTypes(files: any[]): boolean {
    for (const item of files) {
      if (!this.regexpForFileTypes.test(item.type)) {
          this.parent.showSnack('Некоректен тип на файл.', 'ОК', 3500);
        return false;
      }
    }
    console.log('OOOOK');
    return true;
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes, decimals) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
}
