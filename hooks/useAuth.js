"use client";

import { useEffect, useState } from "react";
import { signIn, useSession, getProviders } from "next-auth/react";

const useAuth = ({ errorMessage = "" }) => {
  const [providers, setProviders] = useState(null);

  const { data: session, status } = useSession();

  useEffect(() => {
    const retrieveProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };

    retrieveProviders();
  }, []);

  const NoPermissions = () => (
    <div className="w-full h-full flex-center flex-col space-y-6">
      <span className="text-3xl blue_gradient font-satoshi">
        {errorMessage}
      </span>
      {providers &&
        Object.values(providers).map(provider => (
          <button
            key={provider.name}
            onClick={() => signIn(provider.id)}
            className="blue_btn"
          >
            Sign In
          </button>
        ))}
    </div>
  );

  return { providers, status, session, NoPermissions };
};

export default useAuth;
