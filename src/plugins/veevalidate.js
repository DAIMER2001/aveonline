import { reactive, toRefs } from "vue";
import { createDefaultValidationResult } from "@lemoncode/fonk";
import { formValidation } from "./form-validation";
import { invoiceValidation } from "./invoice-validation";
import { promotionValidation } from "./promotion-validation";
import { medicineValidation } from "./medicine-validation";

const createEmptyValues = () => ({
  full_payment: "",
  date_payment: "",
  medicines: [],
  description: "",
  percentage: "",
  end_date: "",
  start_date: "",
  name: "",
  price: "",
  location: ""
});

const createEmptyErrors = () => ({
  full_payment: createDefaultValidationResult(),
  date_payment: createDefaultValidationResult(),
  medicines: createDefaultValidationResult(),
  description: createDefaultValidationResult(),
  percentage: createDefaultValidationResult(),
  end_date: createDefaultValidationResult(),
  start_date: createDefaultValidationResult(),
  name: createDefaultValidationResult(),
  price: createDefaultValidationResult(),
  location: createDefaultValidationResult(),
});

export default function() {
  const state = reactive({
    values: createEmptyValues(),
    errors: createEmptyErrors()
  });


  // const returnValidate = () => {
  //   const { value } = event.target
  //   state.values[full_payment] = value

  //   formValidation.validateField(fieldName, value)
  //   .then(validationResult => (state.errors[fieldName] = validationResult))

  // }
  const handleInputChange = (fieldName, value) => {
    if(fieldName === 'start_date') state.values['end_date'] = ''
    state.values[fieldName] = value;
    console.log(value)
    console.log(fieldName)

    formValidation
      .validateField(fieldName, value)
      .then(validationResult => (state.errors[fieldName] = validationResult));
  };

  const onValidateForm = async (formValid, api) => {
    try {
      console.log(formValid)
      console.log(formValidation)
      const actionValidation = api === 'promotion' ? promotionValidation : api === 'medicine' ? medicineValidation : invoiceValidation  

      const validationResult = await actionValidation.validateForm(formValid);
      console.log(validationResult)
      state.errors = { ...state.errors, ...validationResult.fieldErrors };
      console.log(state.errors)
      if (validationResult.succeeded) {
        return true
      }
      return false
    } catch (error) {
      console.error("onValidateForm -> error", error);
      return false
    }
  };

  const resetButton = () => {
    state.values = createEmptyValues();
    state.errors = createEmptyErrors();
  };

  return {
    ...toRefs(state),
    handleInputChange,
    onValidateForm,
    resetButton
  };
}
