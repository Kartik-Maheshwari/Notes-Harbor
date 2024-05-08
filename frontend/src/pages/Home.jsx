import Sidebar from '../components/Sidebar.jsx'
import  Topnav from '../components/Topnav.jsx'

function Home() {

  return (
  <div className='flex   '>
    <div className='flex mt-50 w-52'>
      <div><Sidebar/></div>
      <div></div>
    </div>
    <div className='w-full'><Topnav/></div>
  </div>
  );
}

export default Home