import { IFieldInfo } from "@pnp/sp/fields/types";

type ChoiceFieldInfo = IFieldInfo & {
    Choices: {results: Array<string>};
}

export default ChoiceFieldInfo;