import { BACKEND_API } from "../api/constants";

const getGQL =
  (url) =>
  (query, variables = {}) =>
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(localStorage.authToken
          ? { Authorization: "Bearer " + localStorage.authToken }
          : {}),
      },
      body: JSON.stringify({ query, variables }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.data && data.errors) {
          throw new Error(JSON.stringify(data.errors));
        }
        return data.data[Object.keys(data.data)[0]];
      })
      .catch((error) => console.log("error", error));

export const gql = getGQL(`http://${BACKEND_API}/graphql`);

export const jwtDecode = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (err) {
    console.log(err);
  }
};
