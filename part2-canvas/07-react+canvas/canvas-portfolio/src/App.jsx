import { useEffect } from "react";

function App() {
  useEffect(() => {
    console.log("프로젝트 실행!");
  }, []);

  return <div>프로젝트 초기화!</div>;
}

export default App;
