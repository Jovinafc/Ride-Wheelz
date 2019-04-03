export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
   };
};



export const updateSelect = (valueSelected, prevSelectvalue) => {
    let newArray = [];
    if(valueSelected === 'Two-Wheelers'){
         newArray =  ['Bajaj','Honda','Hero','Kawasaki','KTM','Royal Enfield','Suzuki','TVS','Yamaha'];
    }
    if(valueSelected === 'Four-Wheelers'){
        newArray = ['','Ashok Leyland','Bajaj','Datsun','Ford','Fiat','Force','Jeep','Honda','Hyundai','Land Rover','Mahindra','Maruti Suzuki','Nissan','Renault','Tata','Toyota', 'Volkswagen']
    }
    if(valueSelected === 'Bajaj' && prevSelectvalue === 'Two-Wheelers'){
        newArray = ['Platina','Pulsar','Avenger','Discover','CT 100']
    }
    if(valueSelected === 'Honda' && prevSelectvalue === 'Two-Wheelers'){
        newArray = ['Activa','NAvi','Shine','Hornet 160 R','Dio','Livo','CB Unicorn'];
    }
    return newArray;
}


export const checkValidity = (value, rules) =>  {
    let isValid = true;
    if(!rules) {
        return true;
    }
    if(rules.required) {
        isValid = value.trim() !== '' && isValid;
    }

    if(rules.minLength) {
        isValid = value.length >= rules.minLength && isValid
    }

    if(rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid 
    }

    if(rules.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid
    }

    if(rules.isEmail) {
       // const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const pattern = /^([a-zA-Z0-9_])+(([a-zA-Z0-9])+\.)+([a-zA-Z0-9]{2,4})+$/;
        isValid = pattern.test(value) && isValid
    }
    if(rules.isPassword) {
        const pattern1 = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        isValid = pattern1.test(value) && isValid

    }   
    return isValid;
}