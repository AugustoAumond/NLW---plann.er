import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { CreateTripPage } from "./pages";
import { TripDetailsPage } from "./trip-details";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
        <CreateTripPage/>
    ),
  },
  {
    path: "/trips/:tripId",
    element: (
        <TripDetailsPage/>
    ),
  },
]);

export function App() {
  return <RouterProvider router={router} />
}
