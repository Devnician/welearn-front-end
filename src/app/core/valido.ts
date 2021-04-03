import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
//for errors
interface HashTable<T> {
    [key: string]: string;
}


@Injectable()
export class Valido {
    private errorMessages: HashTable<string> = {};
    private forbiddenWords = ["select", "insert", "update", "delete", "drop", "fuck"];
    //Patterns
    private domain: string = '(([www.]*([a-z]*\\-)?([a-z]{1,}\\.)){1,2}[a-z]+)|(?:\\d{1,3}\.){3}\\d{1,3}';
    private phonePattern: string = '\\+?\\d{9,15}';
    private carYearPattern: string = '[12]\\d{3}';//dummy car year validator
    private regNumberPattern: string = '[ABEKMHOPCTYX]{1,2}\\ ?[0-9]{4}\\ ?[ABEKMHOPCTYX]{1,2}';


    constructor() {
        try {
            this.loadErrorMessages();
        } catch (error) {
        }
    }
    loadErrorMessages() {
        this.errorMessages['required'] = 'wl.required_field';
        this.errorMessages['password'] = 'wl.error_password';
        this.errorMessages['username'] = 'wl.error_username';
        this.errorMessages['name'] = 'wl.invalid_device_pattern';
        this.errorMessages['domain'] = 'wl.invalid_domain_pattern';
        this.errorMessages['ip'] = 'wl.invalid_ip_pattern';
        //baseform component
        this.errorMessages['email'] = 'wl.error_email';
        this.errorMessages['password'] = 'wl.error_password';
        this.errorMessages['username'] = 'wl.error_username';
        this.errorMessages['firstName'] = 'wl.error_firstName';
        this.errorMessages['middleName'] = 'wl.error_middleName';
        this.errorMessages['lastName'] = 'wl.error_lastName';
        this.errorMessages['birthDate'] = 'wl.error_birthDate';
        this.errorMessages['address'] = 'wl.error_address';
        this.errorMessages['roleId'] = 'wl.error_roleId';
        this.errorMessages['positionId'] = 'wl.positionId';
        this.errorMessages['phoneNumberPrivate'] = 'wl.error_phoneNumberPrivate';
    }

    getErrorMessage(field: string): string {
        let displayError: string = this.errorMessages[field];
        if (displayError) {
            return displayError;
        }
        return this.errorMessages['required'];
    }


    /**
     * Returns array with valido rules.
     * @param required 
     */
    validateDomainOrIp(required: boolean) {
        return required ?
            [Validators.required,
            Validators.pattern(this.domain)
            ] : [Validators.pattern(this.domain)]
    }


    validateDeviceNumber() {
        return [
            Validators.required,
            Validators.pattern('[0-5][0-9A-Z]{3}')
        ];
    }

    validateSimNumber(required: boolean) {
        return required ? [
            Validators.required,
            Validators.pattern("\\d{20}")
        ] :
            [
                Validators.pattern("\\d{20}")
            ];
    }

    validateBgGsmNumber(required: boolean) {
        return required ? [
            Validators.required,
            Validators.pattern("\\+?359\\d{9}")
        ] : [
            Validators.pattern("\\+?359\\d{9}")
        ];
    }

    validatePhone(req: boolean) {
        if (req) {
            return [Validators.required, Validators.pattern(this.phonePattern)];
        } else {
            return [Validators.pattern(this.phonePattern)];
        }
    }

    validateCarYear(required: boolean) {
        if (required) {
            return [Validators.required, Validators.pattern(this.carYearPattern)];
        } else {
            return [Validators.pattern(this.carYearPattern)];
        }
    }
    /**
     * Checks user input string with every word in collection with forbidden words.
     * @param userInput the user input
     */
    isThereForbiddenWords(userInput: string): boolean {
        for (let index = 0; index < this.forbiddenWords.length; index++) {
            const element = this.forbiddenWords[index];
            if (userInput.toLowerCase().includes(element)) {
                return true;
            }
        }
        return false;
    }
    ////////////////////////////////
    //      OLD
    ////////////////////////////////
    validateDbNames(min: number, max: number) {
        return [
            Validators.required,
            Validators.minLength(min),
            Validators.maxLength(max),
            Validators.pattern("[\\w\\_]+")
        ];
    }

    validateText(min: number, max: number) {
        return [
            Validators.required,
            Validators.minLength(min),
            Validators.maxLength(max)
        ];
    }

    validateName(min: number, max: number) {
        return [
            Validators.required,
            Validators.minLength(min),
            Validators.maxLength(max),
            Validators.pattern("([а-яА-Я]{2,})|([a-zA-Z]{2,})")
        ];
    }

    validateMinMax(min: number, max: number) {
        return [
            Validators.required,
            Validators.minLength(min),
            Validators.maxLength(max),
            Validators.pattern('[0-9]+')  // validates input is digit
        ];
    }

    validateCarRegNumber(required: boolean) {
        return required ?

            [
                Validators.required,
                Validators.pattern(this.regNumberPattern)
            ] : [

                Validators.pattern(this.regNumberPattern)
            ];
    }

    /**
     * Minimum min characters, at least one uppercase letter, one lowercase letter, one number and one special character:
     */
    validatePassowrd(min: number, max: number) {
        return [
            Validators.required,
            Validators.minLength(min),
            Validators.maxLength(max),
            Validators.pattern('(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\\#\\$\\%\\=\\@\\!\\{\\}\\,\\`\\~\\&\\*\\(\\)\\<\\>\\?\\.\\:\\;\\_\\|\\^\\/\\+\\t\\[\\]\\"\\-])[\\da-zA-Z\\#\\$\\%\\=\\@\\!\\{\\}\\,\\`\\~\\&\\*\\(\\)\\<\\>\\?\\.\\:\\;\\_\\|\\^\\/\\+\\t\\[\\]\\"\\-]{' + min + ',' + max + '}')  // validates input is digit
        ];
    }

    validateAllFormFields(formGroup: FormGroup) {         //{1}
        Object.keys(formGroup.controls).forEach(field => {  //{2}
            const control = formGroup.get(field);             //{3}
            if (control instanceof FormControl) {

                if (!control.valid) {
                    console.log('brada');
                    console.log(field);
                }//{4}
                control.markAsTouched({ onlySelf: true });
            } else if (control instanceof FormGroup) {        //{5}
                this.validateAllFormFields(control);            //{6}
            }
        });
    }
}