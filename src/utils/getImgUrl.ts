export function getBookImgUrl(name: string) { 
  return new URL(`../assets/books/${name}`, import.meta.url)
}

export function getNewsImgUrl(name: string) { 
  return new URL(`../assets/news/${name}`, import.meta.url)
}