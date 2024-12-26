export const isRequired = (value: string): boolean | string => value.trim() !== '' || 'error.input-required';
