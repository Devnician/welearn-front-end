import { HttpClient } from "@angular/common/http";
import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from "@angular/core";
import { AuthenticationControllerService } from "./api/authenticationController.service";
import { DisciplineControllerService } from "./api/disciplineController.service";
import { EvaluationMarkControllerService } from "./api/evaluationMarkController.service";
import { EventControllerService } from "./api/eventController.service";
import { GroupControllerService } from "./api/groupController.service";
import { ResourceControllerService } from "./api/resourceController.service";
import { RoleControllerService } from "./api/roleController.service";
import { UserControllerService } from "./api/userController.service";
import { Configuration } from "./configuration";

@NgModule({
  imports: [],
  declarations: [],
  exports: [],
  providers: [
    AuthenticationControllerService,
    DisciplineControllerService,
    EvaluationMarkControllerService,
    EventControllerService,
    GroupControllerService,
    ResourceControllerService,
    RoleControllerService,
    UserControllerService,
  ],
})
export class ApiModule {
  public static forRoot(
    configurationFactory: () => Configuration
  ): ModuleWithProviders<any> {
    return {
      ngModule: ApiModule,
      providers: [{ provide: Configuration, useFactory: configurationFactory }],
    };
  }

  constructor(
    @Optional() @SkipSelf() parentModule: ApiModule,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error(
        "ApiModule is already loaded. Import in your base AppModule only."
      );
    }
    if (!http) {
      throw new Error(
        "You need to import the HttpClientModule in your AppModule! \n" +
          "See also https://github.com/angular/angular/issues/20575"
      );
    }
  }
}
