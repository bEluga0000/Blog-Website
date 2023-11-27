import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { AppBar } from './components/Appbar'
import { InitUser } from './components/InitUser'
import { CreateBlog } from './pages/CreateBlog'
import { DetailedBlog } from './pages/DetailedBlog'
import { DraftedBlogs } from './pages/DraftedBlogs'
import { Home } from './pages/Home'
import { LandingPage } from './pages/LandingPage'
import { MyBlogs } from './pages/Myblogs'
import { PreviewComponent } from './pages/PreviewPageEdit'
import { PreviewPage } from './pages/PrewiewPage'
import { PublishedBlogs } from './pages/PublishedBlogs'
import { Signin } from './pages/Signin'
import { Signup } from './pages/Signup'
import { TopicBlogPage } from './pages/TopicBlogPage'
import { UpdateBlog } from './pages/UpdateBlog'
import { UserOptions } from './pages/UserOption'
function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <AppBar />
        <InitUser/>
      <Routes>
        <Route path='/' element={<LandingPage/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/landingpage' element={<LandingPage/>}></Route>
        <Route path='/signin' element={<Signin/>}></Route>
          <Route path='/blog/write' element={<CreateBlog/>}></Route>
          <Route path='/preview/:blogId' element={<PreviewPage/>}></Route>
          <Route path="/update/:blogId" element={<UpdateBlog/>}></Route>
          <Route path='/DetailedBlog/:blogId'element={<DetailedBlog/>}></Route>
          <Route path='blogs/t/:topic' element={<TopicBlogPage/>}></Route>
          <Route path='/u/useroptions' element={<UserOptions/>}></Route>
          <Route path='/u/myblogs' element={<MyBlogs/>}></Route>
          <Route path='/u/myblogs/draft' element={<DraftedBlogs/>}></Route>
          <Route path='u/myblogs/published' element={<PublishedBlogs/>}></Route>
          <Route path='/p' element={<PreviewComponent/>}></Route>
      </Routes>
      </BrowserRouter>
    </RecoilRoot>
  )
}

export default App
