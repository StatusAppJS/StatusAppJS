import { Choice } from "../../ChoiceFieldValue";
import BaseField from "../BaseField";
import { ChoiceFieldFormatType, } from '@pnp/sp/fields/types';

type ChoiceField = BaseField & {
    FormatType: ChoiceFieldFormatType,
    Choices: Array<Choice>,
}

export default ChoiceField;