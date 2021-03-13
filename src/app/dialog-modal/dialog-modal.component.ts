import { Component, Inject, OnInit, Optional, ViewEncapsulation, HostListener, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Valido } from '../core/valido';
import { isNullOrUndefined, isNumber } from 'util'; 
import { ApiService } from '../core/api.service'; 
import { ImageSnippet } from '../baseform/baseform.component';
import { DomSanitizer } from '@angular/platform-browser'; 
import { AppComponent } from '../app.component'; 
import { TimeUtil } from '../utils/time-util'; 
import { User } from '../model/user.model';
import { StudentsGroup } from '../model/students-group.model';
export class ImageCouple {
  constructor(public sanitized: string, public snippet: ImageSnippet) {
  }
}

@Component({
  selector: 'app-dialog-modal',
  templateUrl: './dialog-modal.component.html',
  styleUrls: ['./dialog-modal.component.scss'], 
})

export class DialogModalComponent implements OnInit, OnDestroy {
  private user: User;
  protected timeUtil: TimeUtil = new TimeUtil('bg-BG');
  objectFromPage: any;
  //collectionFromPage: any;
  fromDialog: string;
  form: FormGroup;
  mode: string;
  classType: string;
  valido: Valido; 
  
  
  //map: ImageCouple[] = [];
  //imgDirty: boolean = false;
 // isImageLoading: boolean = false;
  isMedia: boolean = false; 
  //simSelected: boolean = false;
  // states = [
  //   { id: 1, query: 'in offices', display: 'в офиси' },
  //   { id: 2, query: 'in customers', display: 'в клиенти' },
  //   { id: 3, query: 'in cars', display: 'в автомобили' },
  //   { id: 4, query: 'unknown', display: 'неизвестни' }];

  //currentSimHolderFilter: string = 'Telenor';
 
  closeMode = 'close';
  message: string;
  //simProvider: string = 'Telenor';
  // map: Map<number, ImageCouple> = new Map<number, ImageCouple>(); 
  constructor(public dialogRef: MatDialogRef<DialogModalComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder, private api: ApiService, public snackBar: MatSnackBar, private sanitizer: DomSanitizer) {
    this.objectFromPage = data.obj;

    // if (!isNullOrUndefined(data.collection)) {
    //   this.collectionFromPage = data.collection;
    // }
    this.mode = data.mode;
    this.classType = data.classType;
    this.valido = new Valido();
    this.user = AppComponent.myapp.user; 
  }

  ngOnInit(): void {
    this.isMedia = AppComponent.isMedia;
    
    console.log(this.classType);


    switch (this.classType) {
      case 'group':
        this.buildGroupForm();
        break;
      case 'server':
      //  this.buildFormForServer();
        break;
      case 'packet':
       // this.buildFormForPacket();
        break; 
     
     
      default:
        break;
    }
  }

  buildGroupForm() {
    let group:StudentsGroup = this.objectFromPage;
    this.form = this.formBuilder.group({
      id: [group.id],
      name: [group.name, Validators.required],
      startDate: [group.startDate, Validators.required],
      endDate: [group.endDate ],
      open: [group.open, Validators.required] 
    });
  }

  buildFormForServer() {
    this.form = this.formBuilder.group({
      id: [this.objectFromPage.id],
      domain: [this.objectFromPage.domain, this.valido.validateDomainOrIp(true)],
      ip: [this.objectFromPage.ip, this.valido.validateDomainOrIp(true)]
      // port: [this.objectFromPage.port],
      // description: [this.objectFromPage.description],
      // notes: [this.objectFromPage.notes],
      // diplayText: [this.objectFromPage.diplayText], 
    });

    let names = ['port', 'description', 'notes', 'diplayText', 'protocol', 'pgHost', 'pgDb', 'pgPort', 'pgUser', 'pgPassword', 'pgQueryType', 'pgQueryType'];
    this.addSimpleControlsToFormGroup(this.form, this.objectFromPage, names);
  }
  addSimpleControlsToFormGroup(formGroup: FormGroup, object: any, names: string[]) {
    if (formGroup) {
      names.forEach(element => {
        formGroup.addControl(element, new FormControl(object[element]));
      });
    }
  }
 
  // addFile(imageInput: any, num: number) {
  //   this.imgDirty = true;
  //   const file: File = imageInput.files[0];
  //   const reader = new FileReader();
  //   let imgSnipp = this.map[num].snippet;
  //   imgSnipp.file = file;
  //   imgSnipp.pending = true;
  //   reader.addEventListener('load', (event: any) => {
  //     imgSnipp.src = event.target.result;

  //     if (file.size > 512000) { // 500 kb

  //       var image = new Image();
  //       //https://www.code-sample.com/2017/10/resize-image-before-upload-javascript.html
  //       image.onload = function () {

  //         var canvas = document.createElement("canvas");
  //         var context = canvas.getContext("2d");
  //         let ratio: number = image.width / image.height;
  //         let width: number = 1024;

  //         let height: number = width / ratio;
  //         width = height * ratio;

  //         canvas.width = width;
  //         canvas.height = height;

  //         context.drawImage(image,
  //           0,
  //           0,
  //           image.width,
  //           image.height,
  //           0,
  //           0,
  //           canvas.width,
  //           canvas.height
  //         );

  //         imageInput.src = canvas.toDataURL();

  //         canvas.toBlob(function (blob) {
  //           var newImg = document.createElement('img'),
  //             url = URL.createObjectURL(blob);
  //           newImg.onload = function () {
  //             // no longer need to read the blob so it's revoked
  //             URL.revokeObjectURL(url);
  //           };

  //           newImg.src = url;
  //           const fileNew = new File([blob], file.name, { type: file.type });
  //           imgSnipp.file = fileNew;
  //         }, file.type, 0.95);

  //       };
  //       image.src = event.target.result;
  //     }
  //     this.onSuccess(imgSnipp);
  //     // this.map[num].snippet = imgSnipp;
  //   });
  //   reader.readAsDataURL(file);
  // }

  // private onSuccess(snippet: ImageSnippet) {
  //   snippet.pending = false;
  //   snippet.status = 'ok';
  // }

  // removeFile(num: number) {
  //   this.map[num].sanitized = undefined;
  //   var csvFile = "a,b,c";
  //   var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
  //   this.imgDirty = true;
  //   this.map[num].snippet.file = new File([blob], 'removed', { type: 'removed' });
  // }
 
  // buildEquipmentTypeForm(equipment: Equipment) {
  //   let newOne: boolean = isNullOrUndefined(equipment);
  //   this.form = this.formBuilder.group({
  //     id: [newOne ? '' : equipment.id],
  //     sku: [newOne ? '' : equipment.sku, this.mode == 'create' ? Validators.required : ''],
  //     model: [newOne ? '' : equipment.model],
  //     version: [newOne ? '' : equipment.version],
  //     price: [newOne ? '' : equipment.price.toFixed(2)],
  //     salePrice: [newOne ? '' : equipment.salePrice.toFixed(2)],
  //     description: [newOne ? '' : equipment.description],
  //     info: [newOne ? '' : equipment.info],
  //   });
  // }
  

  
  // buildFormForDevice(device: Device, isMounted: boolean, isInCustomer: boolean) {
  //   this.isMounted = isMounted;
  //   this.simFound = !isNullOrUndefined(device.sim);
  //   this.defaultSimFilter();

  //   this.form = this.formBuilder.group({
  //     id: [device.id],
  //     name: [{ value: device.name, disabled: isMounted }, this.valido.validateDeviceNumber()],
  //     gpsModel: [{ value: device.gpsModel, disabled: isMounted }],
  //     gpsVersion: [{ value: device.gpsVersion, disabled: isMounted }],
  //     sim: [device.sim],
  //     holder: ['Telenor'], //radio button
  //     requestDate: [{ value: device.requestDate, disabled: true }],
  //     packetId: [device.packetId],
  //     info: [device.info],
  //   });

  //   if (this.simFound === true) {
  //     this.form.addControl('serial', new FormControl({ value: device.sim.serial, disabled: true }));
  //     this.form.addControl('phone', new FormControl(device.sim.phone));
  //     this.form.addControl('history', new FormControl(device.sim.history));
  //   }
  //   this.form.addControl('newSim', new FormControl([]));
  //   if (isMounted === true) {
  //     this.form.addControl('logDir', new FormControl(device.logDir));
  //     this.form.addControl('sensorOne', new FormControl(device.sensorOne));
  //     this.form.addControl('sensorTwo', new FormControl(device.sensorTwo));
  //     this.form.addControl('sensorThree', new FormControl(device.sensorThree));
  //     this.form.addControl('sensorFour', new FormControl(device.sensorFour));
  //     this.form.addControl('carRegNum', new FormControl(device.carRegNum));
  //     this.form.addControl('carBrand', new FormControl(device.carBrand));
  //     this.form.addControl('carModel', new FormControl(device.carModel));
  //     this.form.addControl('carType', new FormControl(device.carType));
  //     this.form.addControl('carYear', new FormControl(device.carYear));
  //     this.form.addControl('oldSim', new FormControl(device.oldSim));

  //     if (device.sim) {
  //       this.form.addControl('enabled', new FormControl(device.sim.enabled));
  //     } else {
  //       this.form.addControl('enabled', new FormControl(false));
  //     }
  //     this.form.addControl('installationDate', new FormControl({ value: device.installationDate, disabled: true }));
  //     this.form.addControl('installationAddress', new FormControl({ value: device.installationAddress, disabled: true }));
  //   }
  // //  this.loadMapWithImages(device);
  // }
  // /**
  //  * 
  //  * @param device 
  //  */
  // buildDeviceImagesForm(device: Device) {
  //   this.form = this.formBuilder.group({
  //     id: [device.id],
  //     name: [{ value: device.name, disabled: true }],
  //   });
  //  // this.loadMapWithImages(device);
  // }

  // loadMapWithImages( ) {
  //   let sanitazedImages: any[] = [];
  //   // sanitazedImages.push(this.getSanitizedImage('installImageOne', 'imageOne', device));
  //   // sanitazedImages.push(this.getSanitizedImage('installImageTwo', 'imageTwo', device));
  //   // sanitazedImages.push(this.getSanitizedImage('installImageThree', 'imageThree', device));
  //   // sanitazedImages.push(this.getSanitizedImage('installImageFour', 'imageFour', device));
  //   // sanitazedImages.push(this.getSanitizedImage('installImageFive', 'imageFive', device));

  //   for (let index = 0; index < 5; index++) {
  //     let sanitazedImage: any = sanitazedImages[index];
  //     let imageSnippet: ImageSnippet = new ImageSnippet(undefined, undefined);

  //     let couple: ImageCouple = new ImageCouple(sanitazedImage, imageSnippet);
  //     this.map.push(couple);
  //   }
  // }

  // getSanitizedImage(imageNameAndTyoe: string, byteArrayName: string, device: Device): any {
  //   try {
  //     let imgFront: string = device[imageNameAndTyoe];
  //     let imageType: string[] = imgFront.split(':');
  //     let image: string = 'data:' + imageType[1] + ';base64,' + device[byteArrayName];
  //     return this.sanitizer.bypassSecurityTrustUrl(image);
  //   } catch (error) {
  //     return undefined;
  //   }
  // }
  /**
   * Builds form for PACKET
   */
  // buildFormForPacket() {
  //   this.form = this.formBuilder.group({
  //     id: [this.objectFromPage.id],
  //     packet: [this.objectFromPage.packet, Validators.required],
  //     packetBg: [this.objectFromPage.packetBg, Validators.required],
  //     info: [this.objectFromPage.info, Validators.required],
  //   });
  // }
  /**
   * Builds form for SERVER
   */
 
  // alabala() {
  //   let name = 'pgQueryType';
  //   this.form.addControl(name, new FormControl(this.objectFromPage[name]));
  // }



  // /**
  //  * Builds edit sim form group
  //  * @param sim The object
  //  */
  // buildSimBashForm(sim: Sim) {

  //   this.form = this.formBuilder.group({
  //     id: [sim.id],
  //     cNumber: [sim.cNumber],
  //     phone: [sim.phone, this.valido.validatePhone(false)],// Validators.required],
  //     serial: [sim.serial, this.valido.validateSimNumber(true)],
  //     info: [sim.info],
  //     updatedAt: [sim.updatedAt],
  //     updatedBy: [sim.updatedBy],
  //     ratePlan: [sim.ratePlan, ''],
  //     holder: [sim.holder, ''],
  //     roaming: [sim.roaming, ''],
  //     creditLimit: [sim.creditLimit, ''],
  //     color: [sim.color],
  //     state: [{ value: sim.state, disabled: true }],
  //     newSim: [],
  //     history: [sim.history],
  //     owner: [sim.owner],
  //     enabled: [sim.enabled]
  //   });
  // }

  /**
   * Builds form for OFFICE
   */
  // buildFormForOffices() {
  //   this.form = this.formBuilder.group({
  //     id: [this.objectFromPage.id],
  //     name: [this.objectFromPage.name, Validators.required],
  //     address: [this.objectFromPage.address, Validators.required],
  //     phone: [this.objectFromPage.phone, Validators.required],
  //     email: [this.objectFromPage.email, Validators.required],
  //     info: [this.objectFromPage.info, Validators.required],
  //   });
  // }

  // buildAddDeviceToCustomerForm() {
  //   this.form = this.formBuilder.group({
  //     id: [''],
  //     name: [''],
  //     gpsModel: [''],
  //     gpsVersion: [''],
  //     packetId: [1],
  //     info: [''],
  //     createTicket: ['true'],
  //     sim: []
  //   });
  //   this.form.get('sim').disable();
  // }

  // onDeviceSelected(dev: Device) {
  //   // if (dev) {
  //   //   this.form.patchValue(dev);
  //   //   this.form.get('sim').enable();
  //   //   this.form.get('packetId').patchValue(1);
  //   //   this.form.markAsDirty();
  //   //   let stor: Device = this.dm.getDeviceFromStorage();
  //   //   if (stor) {
  //   //     this.api.unlockDevice(stor, 'office', this.user.officeId, -1).subscribe(
  //   //       data => {
  //   //         this.dm.removeDeviceFromLocalStorageIfAny();
  //   //         this.dm.addDeviceInLocalStorage(dev);
  //   //         this.lockDevice(dev.id);
  //   //       }
  //   //     );
  //   //   } else {
  //   //     this.dm.addDeviceInLocalStorage(dev);
  //   //     this.lockDevice(dev.id);
  //   //   }
  //   // } else {
  //   //   this.buildAddDeviceToCustomerForm();
  //   //   this.dm.unlockDeviceInLocalStorage(false, undefined, undefined);
  //   // }
  // }
 

  close() {
    // if (this.mode == 'editTicketAndSim') {
    //   let val: any = this.form.getRawValue();
    //   delete val.sim;
    //   this.dialogRef.close({ event: this.mode, data: val, imageDirty: this.imgDirty });
    // } else {
    //   this.dialogRef.close();
    // }
  }
  save() {
    // this.closeMode = 'save';//this is flag for unlocking or not device in local storage
    // if (!this.form.valid) {
    //   this.valido.validateAllFormFields(this.form);
    //   return;
    // }

    // if (this.imgDirty === true) {

    //   let images: File[] = [];
    //   for (let index = 0; index < this.map.length; index++) {
    //     const element = this.map[index];
    //     if (element.snippet) {
    //       images[index] = element.snippet.file ? element.snippet.file : undefined;
    //     } else {
    //       images[index] = undefined;
    //     }
    //   }
    //   // //Put images in array.
    //   // images[0] = this.carFront ? this.carFront.file : undefined;     
    //   // this.api.saveDeviceImages(images, this.objectFromPage.id).subscribe(
    //   //   data => {
    //   //     console.log(data.message);
    //   //   }
    //   // );
    // }

    // if (this.form.dirty) {
    //   //save only if have any changes
    //   if (this.classType == 'deviceMounted') {
    //     //here a half fields are disabled
    //    // let device: Device = this.form.getRawValue();
    //     // if (!this.simSelected) {
    //     //   delete device.newSim;
    //     // }
    //     // device.packet = this.packets.find(p => p.id === device.packetId).packetBg;
    //     // device.installationDate = this.timeUtil.getDateFromFormatedDate(device.installationDate);
    //     // device.requestDate = this.timeUtil.getDateFromFormatedDate(device.requestDate);
    //    // this.dialogRef.close({ event: this.mode, data: "BRADA", source: 'office', sourceId: this.user.officeId, imageDirty: this.imgDirty });

    //   } else {
    //     let val: any = this.form.getRawValue();
    //     let createTicket: boolean = val.createTicket;
    //     delete val.createTicket;
    //     if (!this.simSelected) {
    //       delete val.newSim;
    //     }

    //     this.dialogRef.close({ event: this.mode, data: val, source: 'office', sourceId: 111, create: createTicket });
    //   }
    // } else {
    //   console.log('not dirty....')
    //   this.close();
    // }
  }

  /**
   * 
   * @param fieldName 
   */
  isFieldValid(fieldName: string) {
    // if (!fieldName) {
    //   return false;
    // }
    let val: string = this.form.get(fieldName).value;
    if (isNumber(val)) {
      return true;
    }

    if (isNullOrUndefined(val)) {
      val = '';
    }
    if (this.valido.isThereForbiddenWords(val)) {
      return false;
    }
    return !this.form.get(fieldName).valid && this.form.get(fieldName).touched;
  }

   

  // /**
  //  * Sim change event handler
  //  */
  // newSimSelected(eventValue: any) {
  //   if (isNullOrUndefined(eventValue)) {
  //     this.simSelected = false;
  //     this.snackBar.open('Остава текущата сим карта', "", {
  //       duration: 2000,
  //     });
  //   } else {
  //     this.simSelected = true;
  //     this.snackBar.open('Смяната ще се осъществи при запис', "", {
  //       duration: 2000,
  //     });
  //   }
  // }

  // importTableWithSim(excelInput: any) {
  //   let xls = excelInput.files[0];
  // //  this.api.sendExcelWithSimPlastics(xls, 2).subscribe(
  //     // data => {
  //     //   let res: Sim[] = data.result;
  //     //   let counter: number = 1;
  //     //   res.forEach(element => {
  //     //     element.id = counter++;
  //     //   });

  //     //   this.simCards = res;
  //    // }
  //  // );
  // }


  // filterSimByHolder(event: any) {
  //   this.currentSimHolderFilter = event.srcElement.value;
  //   this.defaultSimFilter();

  //   // if (this.simCardsOrigin.length === 0) {
  //   //   this.snackBar.open('Няма налични карти от ' + this.currentSimHolderFilter, "", {
  //   //     duration: 2000,
  //   //   });
  //   // }
  // }

  // /**
  //  * Applyes default sim filter over collection from page and saves result in simCardOrigin
  //  */
  // defaultSimFilter() {


  //   //this.dm.sim
  //   //this.simCardsOrigin = this.dm.availableSim.filter(sim => sim.holder === this.currentSimHolderFilter);
  // }
  // /**
  //  * 
  //  * @param value 
  //  */
  // onSimFiltered(value) {
  //   // this.defaultSimFilter();
  //   // this.simCardsOrigin = this.simCardsOrigin.filter(sim => (sim.serial.includes(value) || sim.phone.includes(value)));

  // }

  // changeSimState(event: any) {
  //   // let sim: Sim = this.objectFromPage.sim;
  //   // sim.enabled = event.checked ? 1 : 0;
  //   // sim.updatedBy = AppComponent.myapp.user.id;

  //   // // console.log(sim.enabled, this.objectFromPage.sim.enabled);
  //   // this.api.updateSimBash(sim).subscribe(
  //   //   data => {
  //   //     if (data) {
  //   //       console.log(data);
  //   //     }
  //   //   }
  //   // );
  // }
  

  ngOnDestroy(): void {
    // if (this.mode != 'editTicketAndSim') {
    //   console.log('not equal with editTicketAndSim');
    //   if (this.closeMode == 'close') {
    //     this.dm.unlockDeviceInLocalStorage(false, undefined, undefined);
    //   } else {
    //     //just remove from localstorage, it will be unlock in backend 
    //     this.dm.removeDeviceFromLocalStorageIfAny();
    //   }
    // } else {
    //   console.log('just adding sim..')
    // }
  }
}
