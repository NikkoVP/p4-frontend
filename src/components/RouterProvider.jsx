import { useEffect, useState } from "react";

function RouterProvider({ router }) {

  const [location, setlocation] = useState(window.location.pathname);


  useEffect(() => {
    function onLocationChange() {
      setlocation(window.location.pathname);
    }
    window.addEventListener('popstate', onLocationChange);
    return () => {
      window.removeEventListener('popstate', onLocationChange);
    };
  })


  const searchRoute = router.find(element => element.path === location)

  if (!searchRoute) {
    return <div>Not Found</div>
  }

  return (
    <>{searchRoute.element}</>
  )
}

export default RouterProvider;