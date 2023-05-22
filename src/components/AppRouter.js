import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { authRoutes } from "../routes";
import { publicRoutes } from "../routes";
import { fetchAuthMe, selectIsAuth } from "../redux/slices/auth";

const AppRouter = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  React.useEffect(() => {
    const data = dispatch(fetchAuthMe());
  }, []);

  return (
    <div className="wrapper">
      <Routes>
        {isAuth &&
          authRoutes.map(({ path, Component }) => (
            <Route key={path} path={path} element={Component} exact></Route>
          ))}
        {publicRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={Component} exact></Route>
        ))}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
};

export default AppRouter;

//   <Routes>
//     <Route path="/" element={<Home />}></Route>
//     <Route path="/login" element={<Login />}></Route>
//     <Route path="gardens">
//       <Route index element={<Gardens />}></Route>
//       <Route path=":gardenId" element={<Garden />}></Route>
//       <Route path="new" element={<NewGarden />}></Route>
//     </Route>
//   </Routes>
