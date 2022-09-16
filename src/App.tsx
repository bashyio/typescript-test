import "./App.css";
import AutoComplete from "./components/AutoComplete";

function App(): JSX.Element {
  return (
    <div className="app">
      <div className="section">
        <div className="container">
          <AutoComplete />
          <p>
            Demo Paragraph placed here <br />
            to prove that the Search Results <br />
            will appear on top of any <br />
            component/content below the form.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
