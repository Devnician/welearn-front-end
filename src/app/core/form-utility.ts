import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { isNullOrUndefined } from 'util';

export class FormUtility {


    /**
     * Getter method for FormGroup with values af given object.
     * @param fb  The FormBuilder
     * @param object  The object
     * @param props array with properties
     */
    static getFormGroupFrom(fb: FormBuilder, object: any, props: string[]): FormGroup {
        let group: FormGroup = fb.group({});
        props.forEach(prop => {
            group.setControl(prop, fb.control(object[prop]));
        });
        return group;
    }

    static mapAndAddFormArrayToGivenForm(fb: FormBuilder, fg: FormGroup, arrayWithObjects: any[], props: string[], controlName: string) {
        if (isNullOrUndefined(arrayWithObjects) === true) {
            console.log('collection is empty.');
        } else {
            let array: FormArray = fb.array([]);
            for (let index = 0; index < arrayWithObjects.length; index++) {
                const element = arrayWithObjects[index];
                let group: FormGroup = fb.group([]);
                props.forEach(prop => {
                    group.setControl(prop, fb.control(element[prop]));
                });
                array.setControl(index, group);
            }
            fg.setControl(controlName, array);
        }
    }
}