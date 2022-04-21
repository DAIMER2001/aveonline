import { Validators, createFormValidation } from "@lemoncode/fonk";
import { minNumberValidator } from "../custom-validators";

const validationSchema = {
  field: {
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
    ]
  }
};


export const medicineValidation = createFormValidation(validationSchema);
