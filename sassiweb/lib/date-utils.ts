// src/lib/date-utils.ts
import { parseISO, format } from 'date-fns';

// Parse ISO strings as local time without timezone conversions
export function parseLocalDate(dateInput: string | Date | null | undefined) {
  // Handle null/undefined case
  if (!dateInput) {
    return new Date(); // Return current date or handle as appropriate
  }
  
  // If it's already a Date object, just return it
  if (dateInput instanceof Date) {
    return dateInput;
  }
  
  // If it's a string, handle it appropriately
  if (typeof dateInput === 'string') {
    // Remove any Z suffix to avoid UTC interpretation
    const cleanDate = dateInput.replace(/Z$/, '');
    return parseISO(cleanDate);
  }
  
  // Fallback - shouldn't reach here with proper typing
  return new Date(dateInput);
}

// Format a date for display
export function formatLocalDate(date: Date, formatStr: string) {
  return format(date, formatStr);
}

// Format a time in 12-hour format
export function formatLocalTime12h(date: Date) {
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours % 12 || 12}:${minutes} ${hours >= 12 ? 'PM' : 'AM'}`;
}

// Format a time in 24-hour format
export function formatLocalTime24h(date: Date) {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

// Create ISO string without timezone suffix
export function createLocalISOString(dateStr: string, timeStr: string) {
  return `${dateStr}T${timeStr}:00`;
}