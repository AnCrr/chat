import { gql } from "../libs";

export const fetchRegister = ({ login, password, nick }) => {
  return gql(
    `mutation reg($user:UserInput) {
        UserUpsert(user:$user) {
        _id 
        }
     }
     `,
    { user: { login, password, nick } }
  );
};

export const fetchLogin = ({ login, password }) => {
  return gql(
    `query log($login: String, $password: String) {
    login(login: $login, password: $password)
 }`,
    { login, password }
  );
};
