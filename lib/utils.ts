import { type ClassValue, clsx } from "clsx";
import qs from "query-string";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// FORMAT DATE TIME
export const formatDateTime = (dateInput: Date | string) => {
  const date = new Date(dateInput);

  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  const dateDayOptions: Intl.DateTimeFormatOptions = {
    weekday: "short",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    month: "short",
    year: "numeric",
    day: "numeric",
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  return {
    dateTime: date.toLocaleString("en-US", dateTimeOptions),
    dateDay: date.toLocaleString("en-US", dateDayOptions),
    dateOnly: date.toLocaleString("en-US", dateOptions),
    timeOnly: date.toLocaleString("en-US", timeOptions),
  };
};

export function formatAmount(amount: number): string {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  });

  return formatter.format(amount);
}

export const parseStringify = <T>(value: T): T => JSON.parse(JSON.stringify(value));

export const removeSpecialCharacters = (value: string): string =>
  value.replace(/[^\w\s]/gi, "");

interface UrlQueryParams {
  params: string;
  key: string;
  value: string;
}

export function formUrlQuery({ params, key, value }: UrlQueryParams): string {
  const currentUrl = qs.parse(params);
  currentUrl[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
}

//type AccountTypes = "depository" | "credit";

export function getAccountTypeColors(type: AccountTypes) {
  switch (type) {
    case "depository":
      return {
        bg: "bg-blue-25",
        lightBg: "bg-blue-100",
        title: "text-blue-900",
        subText: "text-blue-700",
      };

    case "credit":
      return {
        bg: "bg-success-25",
        lightBg: "bg-success-100",
        title: "text-success-900",
        subText: "text-success-700",
      };

    default:
      return {
        bg: "bg-green-25",
        lightBg: "bg-green-100",
        title: "text-green-900",
        subText: "text-green-700",
      };
  }
}

interface Transaction {
  category: string;
}

interface CategoryCount {
  name: string;
  count: number;
  totalCount: number;
}

export function countTransactionCategories(
  transactions: Transaction[]
): CategoryCount[] {
  const categoryCounts: Record<string, number> = {};
  let totalCount = 0;

  transactions.forEach(({ category }) => {
    if (Object.prototype.hasOwnProperty.call(categoryCounts, category)) {
      categoryCounts[category]++;
    } else {
      categoryCounts[category] = 1;
    }
    totalCount++;
  });

  return Object.keys(categoryCounts)
    .map((category) => ({
      name: category,
      count: categoryCounts[category],
      totalCount,
    }))
    .sort((a, b) => b.count - a.count);
}

export function extractCustomerIdFromUrl(url: string): string {
  const parts = url.split("/");
  return parts[parts.length - 1];
}

export function encryptId(id: string): string {
  return btoa(id);
}

export function decryptId(id: string): string {
  return atob(id);
}

export const getTransactionStatus = (date: Date): string => {
  const today = new Date();
  const twoDaysAgo = new Date(today);
  twoDaysAgo.setDate(today.getDate() - 2);

  return date > twoDaysAgo ? "Processing" : "Success";
};

export const AuthformSchema =(type:string)=> z.object({
    email: z.string().email(),
    password:z.string().min(8),
    firstname:type==='sign-in'?z.string().optional():z.string().min(3),
    lastname:type==='sign-in'?z.string().optional():z.string().min(3),
    address1:type==='sign-in'?z.string().optional():z.string().max(50),
    city:type==='sign-in'?z.string().optional():z.string().max(50),
    state:type==='sign-in'?z.string().optional():z.string().min(2).max(2),
    postalcode:type==='sign-in'?z.string().optional():z.string().min(3).max(6),
    dateofbirth:type==='sign-in'?z.string().optional():z.string().min(3),
    ssn:type==='sign-in'?z.string().optional():z.string().min(3)
  })
  export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }