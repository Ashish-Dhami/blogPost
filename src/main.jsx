import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import {Provider} from "react-redux";
import {AddEditPost, AllPosts, Dashboard, Home, LoginPage, Post, SignupPage} from "./pages/index.js";
import store from "./store/store.js";
import {IsLoggedIn} from "./components/index.js";

const router = createBrowserRouter([
        {
            path: "/",
            element: <App />,
            children: [
                {
                    path: "/",
                    element: <Home />,
                },
                {
                    path: "/login",
                    element: (
                        <IsLoggedIn authentication={false}>
                            <LoginPage />
                        </IsLoggedIn>
                    )
                },
                {
                    path: "/signup",
                    element: (
                        <IsLoggedIn authentication={false}>
                            <SignupPage />
                        </IsLoggedIn>
                    )
                },
                {
                    path: "/dashboard",
                    element: (
                        <IsLoggedIn>
                            <Dashboard />
                        </IsLoggedIn>
                    )
                },
                {
                    path: "/myposts",
                    element: (
                        <IsLoggedIn>
                            <AllPosts my={true}/>
                        </IsLoggedIn>
                    )
                },
                {
                    path: "/posts",
                    element: (
                        <IsLoggedIn>
                            <AllPosts />
                        </IsLoggedIn>
                    )
                },
                {
                    path: "/add-post",
                    element: (
                        <IsLoggedIn>
                            <AddEditPost />
                        </IsLoggedIn>
                    )
                },
                {
                    path: "/edit-post/:postId",
                    element: (
                        <IsLoggedIn>
                            <AddEditPost />
                        </IsLoggedIn>
                    )
                },
                {
                    path: "/post/:postId",
                    element: (
                        <IsLoggedIn>
                            <Post />
                        </IsLoggedIn>
                    )
                }
            ]
        }
    ]
    /*createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/dashboard" element={<IsLoggedIn />}>
                <Route element={<Dashboard />} />
            </Route>
        </Route>
    )*/
)
createRoot(document.getElementById('root')).render(
      <Provider store={store}>
          <RouterProvider router={router} />
      </Provider>
)
