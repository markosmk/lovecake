import { GooContent, GooElement } from '@/config/types';
import { clsx, type ClassValue } from 'clsx';
import { differenceInDays } from 'date-fns';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function daysUntilNextSaturday(): number {
  const today = new Date();
  const nextSaturday = new Date(today);
  nextSaturday.setDate(today.getDate() + ((6 - today.getDay() + 7) % 7));
  return differenceInDays(nextSaturday, today);
}

export function formatDate(input: string | number): string {
  const date = new Date(input);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatDateEsp(dateString: Date) {
  const months = [
    'enero',
    'febrero',
    'marzo',
    'abril',
    'mayo',
    'junio',
    'julio',
    'agosto',
    'septiembre',
    'octubre',
    'noviembre',
    'diciembre',
  ];
  const daysOfWeek = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
  const date = new Date(dateString);
  const dayOfWeek = daysOfWeek[date.getDay()];
  const day = date.getDate();
  const month = months[date.getMonth()];
  return `${dayOfWeek} ${day} de ${month}`;
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}

export function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function adapterElement(item: Omit<GooContent, 'Type'>): GooElement {
  return {
    id: item.Id !== null && item.Id !== undefined && item.Id !== '' ? item.Id : generateUUID(),
    name: item.Name,
    description: item.Description,
    cost: isNaN(parseInt(item.Cost)) ? 0 : parseInt(item.Cost),
    cant: isNaN(parseInt(item.Cant)) ? 0 : parseInt(item.Cant),
    price: isNaN(parseInt(item.Price)) ? 0 : parseInt(item.Price),
    disabled: item.Available !== 'TRUE' ? true : false,
  };
}

export function groupByType(array: GooContent[]): Record<string, GooElement[]> {
  const groupedObjects: Record<string, GooElement[]> = {};
  array.forEach((item: GooContent) => {
    const { Type, ...rest } = item;

    if (groupedObjects[Type]) {
      groupedObjects[Type].push(adapterElement(rest));
    } else {
      groupedObjects[Type] = [adapterElement(rest)];
    }
  });

  return groupedObjects;
}
