import {SchemaDataType} from "./types";

export function assertDataType(dataType: string, schemaType: SchemaDataType) {
    const numberCondition = dataType === "number" && schemaType !== "number";
    const booleanCondition = dataType === "boolean" && schemaType !== "boolean";
    const stringCondition = dataType === "string" && schemaType !== "ascii";
    if (numberCondition || booleanCondition || stringCondition) {
        throw new Error(`ValueError: value type ${dataType} is not assignable to schema type ${schemaType}.`);
    }
}
