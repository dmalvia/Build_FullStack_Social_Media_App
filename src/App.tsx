import * as React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { UserAuthProvider } from "./context/userAuthContext";

interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = () => {
  return (
    <UserAuthProvider>
      <RouterProvider router={router} />
    </UserAuthProvider>
  );
};

export default App;
