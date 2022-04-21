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
    ]
  }
};


export const invoiceValidation = createFormValidation(validationSchema);
