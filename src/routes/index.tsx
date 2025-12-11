import { createBrowserRouter } from "react-router-dom";
import BasicLayout from "../layout/BasicLayout";
import Welcome from "../pages/Welcome";
import Admin from "../pages/Admin";
import AdminSubPage1 from "../pages/Admin/SubPage1";
import ListTableList from "../pages/ListTableList";
import ListSubSubPage1 from "../pages/List/SubPage/SubSubPage1";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/404";
import Form from "../pages/Form";

const router = createBrowserRouter([
  {
    path: "/",
    element: <BasicLayout />,
    children: [
      {
        index: true,
        element: <Welcome />,
      },
      {
        path: "welcome",
        element: <Welcome />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "admin",
        element: <Admin />,
        children: [
          {
            path: "sub-page1",
            element: <AdminSubPage1 />,
          },
          {
            path: "sub-page2",
            element: <AdminSubPage1 />,
          },
          {
            path: "sub-page3",
            element: <AdminSubPage1 />,
          },
        ],
      },
      {
        path: "list",
        element: <ListTableList />,
        children: [
          {
            path: "sub-page",
            children: [
              {
                path: "sub-sub-page1",
                element: <ListSubSubPage1 />,
              },
              {
                path: "sub-sub-page2",
                element: <ListSubSubPage1 />,
              },
              {
                path: "sub-sub-page3",
                element: <ListSubSubPage1 />,
              },
            ],
          },
          {
            path: "sub-page2",
            element: <ListSubSubPage1 />,
          },
          {
            path: "sub-page3",
            element: <ListSubSubPage1 />,
          },
        ],
      },
      {
        path: "form",
        element: <Form />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;