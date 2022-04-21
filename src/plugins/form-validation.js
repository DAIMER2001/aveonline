import { Validators, createFormValidation } from "@lemoncode/fonk";
import { minNumberValidator } from "../custom-validators";

const validationSchema = {
  field: {
    full_payment: [
      {
        validator: Validators.required.validator,
        message: "Required"
      }
    ],
    date_payment: [
      {
        validator: Validators.required.validator,
        message: "Required"
      }
    ],
    medicines: [
      {
        validator: Validators.required.validator,
        message: "Required"
      }
    ],
    description: [
      {
        validator: Validators.required.validator,
        message: "Required"
      }
    ],
    end_date: [
      {
        validator: Validators.required.validator,
        message: "Required"
      }
    ],
    start_date: [
      {
        validator: Validators.required.validator,
        message: "Required"
      }
    ],
    name: [
      {
        validator: Validators.required.validator,
        message: "Required"
      }
    ],
    price: [
      {
        validator: Validators.required.validator,
        message: "Required"
      }
    ],
    location: [
      {
        validator: Validators.required.validator,
        message: "Required"
      }
    ],
    percentage: [
      {
        validator: Validators.required.validator,
        message: "Required"
      },
      {
        validator: minNumberValidator,
        customArgs: { min: 70 }
      }
    ]
  }
};

// function requiredFields(fields){
//   let required
//   validationSchema.field.forEach((field, key) => {
//     console.log(field)
//     console.log(key)
//     if(field === )
//   });
//   validationSchema.field.map((field) => field === fields)
// }

export const formValidation = createFormValidation(validationSchema);
