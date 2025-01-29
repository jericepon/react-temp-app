import { useEffect } from "react";
import { getCabins } from "./api/cabins";
import { ModeToggle } from "./components/ui/mode-toggle";
import { ThemeProvider } from "./components/ui/theme-privider";

function App() {
  useEffect(() => {
    getCabins().then((data) => {
      console.log(data);
    });
  }, []);
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <ModeToggle />
      </ThemeProvider>
    </>
  );
}

export default App;
