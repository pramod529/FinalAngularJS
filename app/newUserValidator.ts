import {Control} from 'angular2/common';

export class NewUserValidators{

    static validateEmail(control: Control) { 
        var email = control.value;
        if(email != null){

            var lastAtPos = email.lastIndexOf('@');
            var lastDotPos = email.lastIndexOf('.');
            if (lastAtPos < lastDotPos 
                && lastAtPos > 0 
                && email.indexOf('@@') == -1 
                && lastDotPos > 2 
                && (email.length - lastDotPos) > 2){
                return null;
            }else{
                return {validateEmail:true};
            }

        }
        
    }
         
 

}