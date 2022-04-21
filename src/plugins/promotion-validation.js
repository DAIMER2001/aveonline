import { Validators, createFormValidation } from "@lemoncode/fonk";
import { minNumberValidator } from "../custom-validators";

const validationSchema = {
  field: {
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
    percentage: [
      {
        validator: Validators.required.validator,
        message: "Required"
      },
      {
        validator: minNumberValidator,
        customArgs: { min: 70 }
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
    ]
  }
};


export const promotionValidation = createFormValidation(validationSchema);
