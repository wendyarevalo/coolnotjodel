import { v4 as uuidv4 } from "uuid";

let userUUID = uuidv4();
if (!localStorage.getItem("currentUser")) {
  const res = await fetch("http://my-api-app-service:7778/api/saveUser", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      "uuid": userUUID,
    }),
  });
  const result = await res.json();
  console.log(result);
  localStorage.setItem("currentUser", userUUID);
}
userUUID = localStorage.getItem("currentUser");

export { userUUID };
