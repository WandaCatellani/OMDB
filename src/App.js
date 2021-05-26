import React, { Fragment } from "react";

import List from "./Containers/List/List";

function App() {
  return (
    <Fragment>
      <nav className="navbar navbar-dark bg-dark border-bottom border-white">
        <a href="/" className="navbar-brand">
          MovieApp{" "}
        </a>
      </nav>
      <main className="bg-dark">
        <div className="container">
          <List />
        </div>
      </main>
    </Fragment>
  );
}

export default App;
