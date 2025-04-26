// utils/validation.ts

/**
 * Validates the category field.
 * Accepts only predefined options.
 */
export const isValidCategory = (category: string): boolean => {
    return /^(Boundary|Percentage|Other)$/.test(category);
  };
  

  /**
   * Validates the source field.
   * Allows letters, numbers, spaces, and common punctuation.
   * Must be between 2 and 50 characters.
   */
export const isValidSource = (source: string): boolean => {
    return /^[A-Za-z0-9\s.,'-]{2,50}$/.test(source);
};
  

  /**
   * Validates the amount field.
   * Allows whole numbers or decimals with up to 2 places.
   */
export const isValidAmount = (amount: string): boolean => {
    return /^\d+(\.\d{1,2})?$/.test(amount);
};
  