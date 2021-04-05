import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';


import { AuthenticationControllerService } from './api/authenticationController.service';
import { DisciplineControllerService } from './api/disciplineController.service';
import { EvaluationMarkControllerService } from './api/evaluationMarkController.service';
import { GroupControllerService } from './api/groupController.service';
import { RoleControllerService } from './api/roleController.service';
import { UserControllerService } from './api/userController.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: [
    AuthenticationControllerService,
    DisciplineControllerService,
    EvaluationMarkControllerService,
    GroupControllerService,
    RoleControllerService,
    UserControllerService ]
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
