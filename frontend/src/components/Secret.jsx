import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { secret } from "../services/loginService";

export default function Secret() {
  const [message, setMessage] = useState("");
  const { user } = useContext(UserContext);

  const handleClick = async () => {
    const info = await secret();
    setMessage(info.user._id);
  };

  return (
    <>
      <h2>Secret</h2>
      <p>{message}</p>
      <p>{JSON.stringify(user)}</p>
      <button onClick={handleClick}>Click</button>
    </>
  );
}
