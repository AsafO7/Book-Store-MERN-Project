import { User, UserCredential } from "firebase/auth"

export type Book = {
  "_id": number,
  "title": string,
  "description": string,
  "category": string,
  "trending": boolean,
  "coverImage": string,
  "oldPrice": number,
  "newPrice": number
}

export type NewsType = Pick<Book, "_id" | "title" | "description" | "coverImage">

export type AuthParams = {
  "currentUser": User | null,
  "loading": boolean,
  "registerUser": ((email: string, password: string) => Promise<UserCredential>) | null,
  "loginUser": ((email: string, password: string) => Promise<UserCredential>) | null,
  "signInWithGoogle": (() => Promise<UserCredential>) | null,
  "logout": (() => Promise<void>) | null,
}

export type FormValues = {
  name: string
  email: string
  phone: number
  city: string,
  country: string,
  state: string,
  zipcode: number,
  productIds: number[],
  totalPrice: number,
}

export type Order = {
  _id: number,
  name: string
  email: string
  phone: number
  address: {
    city: string,
    country: string,
    state: string,
    zipcode: number,
  }
  productIds: number[],
  totalPrice: number,
}

export type Stats = {
  totalBooks: number,
  totalSales: number,
  trendingBooks: string,
  totalOrders: number
}

export type Option = {
  value: string;
  label: string;
}