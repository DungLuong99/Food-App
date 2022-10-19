import { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { publicRoutes } from './routes'
import { DefaultLayout } from "./components/Layout"
import { StateProvider } from '~/context/StateProvider'
import { initialState } from "./context/initialState";
import reducer, { actionType } from "./context/reducer";
import { useStateValue } from '~/context/StateProvider';
import productApi from "./api/productAPI";

function App() {
  const [{ foodItems }, dispatch] = useStateValue();
  // console.log(foodItems);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productApi.getAll();
        return response;
      }
      catch (error) {
        console.log('Fail to fetch product: ', error);
      }
    }
    fetchProducts().then(
      response => {
        // console.log(response);
        dispatch({
          type: actionType.SET_FOOD_ITEMS,
          foodItems: response,
        })
      }
    );
  }, [])

  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            let Layout = DefaultLayout;

            if (route.layout) {
              Layout = route.layout
            } else if (route.layout === null) {
              Layout = Fragment
            }

            return <Route
              key={index}
              path={route.path}
              element={
                <Layout >
                  <Page />
                </Layout>
              } />

          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;