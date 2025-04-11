export interface UserDto {
  email: string;
  password: string;
  role: "USER" | "ADMIN";
}
