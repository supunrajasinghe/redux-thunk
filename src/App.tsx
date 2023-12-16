import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "./state/store";
import {
  decreament,
  increament,
  increamentAsync,
} from "./state/counter/counterSlice";
import { LoadingOverlay } from "@mantine/core";

function App() {
  const { value, loadingCount } = useSelector(
    (state: RootState) => state.counter
  );
  const { isLoading } = useSelector((state: RootState) => state.loader);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="App">
      <LoadingOverlay id="test" visible={loadingCount} zIndex={1000} />
      <div style={{ color: "black" }}>{value}</div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "10px",
          width: "100%",
          justifyContent: "center",
        }}
      >
        <button onClick={() => dispatch(increamentAsync(12))}>
          increament
        </button>
        <button onClick={() => dispatch(decreament())}>decreament</button>
      </div>
    </div>
  );
}

export default App;
