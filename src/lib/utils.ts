import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function loadBlogs() {
  const { data } = await axios.get("http://localhost:3000/api/blogs");
  return data;
}

export async function loadBlog(id: string) {
  const { data } = await axios.get(`http://localhost:3000/api/blogs/${id}`);
  return data;
}

export type ResultMysql = {
  insertId: number;
  affectedRows: number;
};
