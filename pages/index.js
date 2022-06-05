import Sidebar from "../components/Sidebar"
import Main from "../components/Main"

const styles = {
  container: `h-full w-full flex bg-[#fff]`
}

//we can inherit the properties in  by making styles object in each component
export default function Home() {
  return (
    <div className={styles.container}>
      <Sidebar />
      <Main />
    </div>
  )
}
