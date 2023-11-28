import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { AppBar } from './components/Appbar'
import { InitUser } from './components/InitUser'
import { PrivateRoute } from './components/PrivateRoute'
import { CreateBlog } from './pages/CreateBlog'
import { DetailedBlog } from './pages/DetailedBlog'
import { DraftedBlogs } from './pages/DraftedBlogs'
import { PathErrorPage } from './pages/ErrorPage'
import { Home } from './pages/Home'
import { LandingPage } from './pages/LandingPage'
import { MyBlogs } from './pages/Myblogs'
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
        <InitUser />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/landingpage" element={<LandingPage />} />
          <Route path="/signin" element={<Signin />} />
          {/* {private routes} */}
          <Route path="/blog/write" element={<PrivateRoute><CreateBlog /></PrivateRoute>} />
          <Route path="/preview/:blogId" element={<PrivateRoute><PreviewPage /></PrivateRoute>} />
          <Route path="/update/:blogId" element={<PrivateRoute><UpdateBlog /></PrivateRoute>} />
          <Route path="/DetailedBlog/:blogId" element={<PrivateRoute><DetailedBlog /></PrivateRoute>} />
          <Route path="blogs/t/:topic" element={<PrivateRoute><TopicBlogPage /></PrivateRoute>} />
          <Route path="/u/useroptions" element={<PrivateRoute><UserOptions /></PrivateRoute>} />
          <Route path="/u/myblogs" element={<PrivateRoute><MyBlogs /></PrivateRoute>} />
          <Route path="/u/myblogs/draft" element={<PrivateRoute><DraftedBlogs /></PrivateRoute>} />
          <Route path="u/myblogs/published" element={<PrivateRoute><PublishedBlogs /></PrivateRoute>} />
          {/* <Route path='/p' element={<PreviewComponent/>}></Route> */}
          <Route path="*" element={<PathErrorPage />} />
        </Routes>

      </BrowserRouter>
    </RecoilRoot>
  )
}

export default App
