// Import hook
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Diagnosis from "./pages/Diagnosis.js";
import "./app.css"
const router = createBrowserRouter([
  { path: "/diagnosis", element: <Diagnosis /> },
]);

function App() {
  return (
    <main>
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
