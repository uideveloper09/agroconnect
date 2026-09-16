import usersData from "@/data/users.json";

export type StoredUser = {
  id: string;
  name: string;
  mobile: string;
  password: string;
  otp: string;
  role: string;
  place: string;
  crop: string;
};

export type PublicUser = Omit<StoredUser, "password" | "otp">;

export const USERS = usersData.users as StoredUser[];

export function findUserByMobile(mobile: string) {
  return USERS.find((user) => user.mobile === mobile);
}

export function toPublicUser(user: StoredUser): PublicUser {
  return {
    id: user.id,
    name: user.name,
    mobile: user.mobile,
    role: user.role,
    place: user.place,
    crop: user.crop,
  };
}

export function demoAccounts() {
  return USERS.map((user) => ({
    name: user.name,
    mobile: user.mobile,
    password: user.password,
    otp: user.otp,
  }));
}
