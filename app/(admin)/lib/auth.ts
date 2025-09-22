export const isValidAdmin = (userName: string, password: string) => {
  return userName === "admin" && password === process.env.ADMIN_PASSWORD;
}