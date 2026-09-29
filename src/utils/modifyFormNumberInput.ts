import React from "react";
import { FieldValues, Path, UseFormSetValue } from "react-hook-form";

const PHONE_DIGIT_LIMIT = 11;
const LOCAL_PHONE_DIGIT_LIMIT = 10;

const PHONE_FIELD_NAME_REGEX =
  /(phone|phoneNumber|contactNumber|parentNumber|parentGuardianNumber|schoolPhoneNumber)$/i;

const toPhoneDigits = (value: string): string =>
  value.replace(/\D/g, "").slice(0, PHONE_DIGIT_LIMIT);

const toLocalPhoneDigits = (value: string): string => {
  const digits = toPhoneDigits(value);

  if (digits.length > LOCAL_PHONE_DIGIT_LIMIT && digits.startsWith("1")) {
    return digits.slice(1, LOCAL_PHONE_DIGIT_LIMIT + 1);
  }

  return digits.slice(0, LOCAL_PHONE_DIGIT_LIMIT);
};

export const formatUSPhoneNumber = (value: string): string => {
  const digits = toLocalPhoneDigits(value);

  if (digits.length <= 3) {
    return digits;
  }

  if (digits.length <= 6) {
    return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  }

  return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
};

export const isPhoneNumberField = (fieldName: string): boolean =>
  PHONE_FIELD_NAME_REGEX.test(fieldName);

const getCursorIndexByDigits = (
  formattedValue: string,
  targetDigitsCount: number
): number => {
  if (targetDigitsCount <= 0) {
    return 0;
  }

  let digitsSeen = 0;

  for (let i = 0; i < formattedValue.length; i++) {
    if (/\d/.test(formattedValue[i])) {
      digitsSeen += 1;
    }

    if (digitsSeen === targetDigitsCount) {
      return i + 1;
    }
  }

  return formattedValue.length;
};

export const modifyPhoneNumberInput = <TFieldValues extends FieldValues>(
  event: React.FormEvent<HTMLInputElement>,
  setValue: UseFormSetValue<TFieldValues>,
  fieldName: Path<TFieldValues>
): string => {
  const input = event.currentTarget;
  const rawValue = input.value;
  const cursorStart = input.selectionStart ?? rawValue.length;
  const digitsBeforeCursor = Math.min(
    toLocalPhoneDigits(rawValue.slice(0, cursorStart)).length,
    LOCAL_PHONE_DIGIT_LIMIT
  );
  const formatted = formatUSPhoneNumber(rawValue);

  setValue(fieldName, formatted as unknown as TFieldValues[keyof TFieldValues]);

  requestAnimationFrame(() => {
    if (document.activeElement !== input) {
      return;
    }

    const nextCursor = getCursorIndexByDigits(formatted, digitsBeforeCursor);
    input.setSelectionRange(nextCursor, nextCursor);
  });

  return formatted;
};

export const modifyFormNumberInput = <TFieldValues extends FieldValues>(
  event: React.FormEvent<HTMLInputElement>,
  setValue: UseFormSetValue<TFieldValues>,
  fieldName: Path<TFieldValues>
): void => {
  const raw = event.currentTarget.value;

  const isValidNumberInput = /^(\d+)?(\.\d*)?$/.test(raw);

  if (raw === "") {
    setValue(fieldName, "" as TFieldValues[keyof TFieldValues]);
  } else if (isValidNumberInput) {
    setValue(fieldName, raw as unknown as TFieldValues[keyof TFieldValues]);
  }

  if (/^0\d+/.test(raw)) {
    const cleaned = String(parseFloat(raw));
    event.currentTarget.value = cleaned;
    setValue(fieldName, cleaned as unknown as TFieldValues[keyof TFieldValues]);
  }
};
