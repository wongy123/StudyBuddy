import { createContext, useContext, useState } from "react";

const SidebarRefreshContext = createContext();

export const SidebarRefreshProvider = ({ children }) => {
  const [refreshKey, setRefreshKey] = useState(0);

  const triggerRefresh = () => setRefreshKey((prev) => prev + 1);

  return (
    <SidebarRefreshContext.Provider value={{ refreshKey, triggerRefresh }}>
      {children}
    </SidebarRefreshContext.Provider>
  );
};

export const useSidebarRefresh = () => useContext(SidebarRefreshContext);
