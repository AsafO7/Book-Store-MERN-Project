export const logData = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  const email = e.currentTarget[0] as HTMLInputElement
  const password = e.currentTarget[1] as HTMLInputElement
  console.log(email.value, password.value)
  
  // for(let i = 0; i < e.currentTarget.childNodes[1].childNodes[0].childNodes.length; i++) {
  //   console.log((e.currentTarget.childNodes[1].childNodes[0].childNodes[i].childNodes[1]))
  // }
}