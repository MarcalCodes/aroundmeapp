import {AustraliaStates} from "./australia.js";

/**
 * Validation for an AUS postcode
 */
export const isAusPostcode = (value) => {
  const length = value.trim().length

  if (length === 3 || length === 4) {
    return null // valid
  } else {
    return "Postcode must be 3 or 4 characters long"
  }
}

/**
 * Validation for an AUS state
 */
export const isAusState = (state) => {
  const cleaned = state.trim().toLocaleLowerCase()

  if (AustraliaStates.has(cleaned)) {
    return null
  } else {
    return `Invalid state: ${state.trim()}`
  }
}