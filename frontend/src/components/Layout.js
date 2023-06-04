import { Outlet, useLoaderData, useSubmit } from "react-router-dom";
import MainNavigation from "./MainNavigation";
import { useEffect } from "react";
import { getTokenDuration } from "../util/auth";

function Layout() {
  const token = useLoaderData();
  const submit = useSubmit();
  //   const navigation = useNavigation();
  useEffect(() => {
    if (!token) {
      return;
    }

    if (token === "EXPIRED") {
      submit(null, { action: "/logout", method: "post" });
      return;
    }

    const tokenDuration = getTokenDuration();
    console.log(tokenDuration);

    setTimeout(() => {
      submit(null, { action: "/logout", method: "post" });
    }, tokenDuration);
  }, [token, submit]);

  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === "loading" && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
