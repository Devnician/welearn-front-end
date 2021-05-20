export * from './authenticationController.service';
import { AuthenticationControllerService } from './authenticationController.service';
export * from './disciplineController.service';
import { DisciplineControllerService } from './disciplineController.service';
export * from './evaluationMarkController.service';
import { EvaluationMarkControllerService } from './evaluationMarkController.service';
export * from './eventController.service';
import { EventControllerService } from './eventController.service';
export * from './groupController.service';
import { GroupControllerService } from './groupController.service';
export * from './resourceController.service';
import { ResourceControllerService } from './resourceController.service';
export * from './roleController.service';
import { RoleControllerService } from './roleController.service';
export * from './userController.service';
import { UserControllerService } from './userController.service';
export const APIS = [AuthenticationControllerService, DisciplineControllerService, EvaluationMarkControllerService, EventControllerService, GroupControllerService, ResourceControllerService, RoleControllerService, UserControllerService];
