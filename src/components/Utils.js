/**
 * append a class to a base class if the condition is true
 */

export function getConditionalclass(cls, conditionalclass, condition) {
    return cls + " " + (condition ? conditionalclass : "")
}
