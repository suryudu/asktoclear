
import React,{useEffect,useReducer,createContext,useContext} from 'react';
import './App.css';
import Questions from "./components/QuestionsDisplay/Questions";
import UserProfile from "./components/Profile/UserProfile";
import Signin from "./components/signin/Signin";
import SignUp from "./components/signup/SignUp";
import Answer from "./components/Answer/Answer";
// import DisplayProfile from "./components/Profile/DisplayProfile";
import EventUpdates from "./components/Updates/EventUpdates";
import Home from "./components/HomeFiles/Home";
import TryToAnswer from "./components/UnAnswered/TryToAnswer";
import SubmitAnswer from "./components/UnAnswered/SubmitAnswer";
import UpdateInfo from "./components/Profile/UpdateInfo";
import AskQuestion from "./components/Askquestion/AskQuestion";
import PostEvent from "./components/Updates/PostEvent";
// import ViewUpdate from "./components/Updates/ViewUpdate";
import Files from "./components/FilesDisplay/Files";
import ShareFile from "./components/ShareFile/ShareFile";
import UpdatePic from "./components/Profile/UpdatePic";
import ChangePassword from "./components/Profile/ChangePassword";
import {Route,BrowserRouter as Router,Switch,useHistory} from "react-router-dom";
import {initialState,reducer} from "./reducers/useReducer";
import UpdateQuestion from './components/Profile/Updatequestion/UpdateQuestion';
import UpdateAnswer from "./components/Profile/Updateanswer/UpdateAnswer";
import UpdateEvent from './components/Profile/Updateevent/UpdateEvent';
import ImageViewer from "./components/FilesDisplay/ImageViewer";
import PdfViewer from "./components/FilesDisplay/PdfViewer";
import UpdateFile from "./components/Profile/updateFile/UpdateFile";

export const UserContext =createContext();

const Routing =(e)=>{
  
  const history = useHistory();
  const {dispatch} = useContext(UserContext);
  useEffect(()=>{
    const user=JSON.parse(localStorage.getItem("user"));
    if(user){
      dispatch({type:"USER",payload:user});
      // history.push("/");
    }else{
      history.push("/signin");
    }
  },[dispatch,history])
  return (
    <Switch>
          <Route exact path="/">
              <Home />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/signin">
            <Signin />
          </Route>
          <Route path="/trytoanswer">
            <TryToAnswer />
          </Route>
          <Route path="/sharedfiles">
          <Files />
          </Route>
          <Route path="/questions">
            <Questions />
          </Route>
          <Route path="/eventsandupdates">
            <EventUpdates />
          </Route>
          <Route path="/profile">
            <UserProfile />
          </Route>
          <Route path="/askyourquestion" >
            <AskQuestion />
          </Route>
          <Route path="/postevent">
            <PostEvent />
          </Route>
          <Route path="/sharefile">
            <ShareFile />
          </Route>
          <Route path="/updateinfo">
            <UpdateInfo />
          </Route>
          <Route path="/updatepic" >
            <UpdatePic />
          </Route>
          <Route path="/changepassword">
            <ChangePassword />
          </Route>
          <Route path="/submitanswer/:questionId">
            <SubmitAnswer />
          </Route>
          <Route path="/answer/:questionId">
            <Answer />
          </Route>
          <Route path="/updatequestion/:questionId">
            <UpdateQuestion />
          </Route>
          <Route path="/updateanswer/:answerId">
            <UpdateAnswer />
          </Route>
          <Route path="/updateevent/:eventId">
          <UpdateEvent />
          </Route>
          <Route path="/imagefile/:id">
            <ImageViewer />
          </Route>
          <Route path="/pdfviewer/:id">
            <PdfViewer />
          </Route>
          <Route path="/updatefile/:fileId">
            <UpdateFile />
          </Route>
          
          
      </Switch>
  )
}

function App() {
  const [state,dispatch]=useReducer(reducer,initialState);
  return (
    <>
    <UserContext.Provider value={{state,dispatch}} >
    <Router>
      <Routing />
    </Router>
    </UserContext.Provider>
    </>
  );
}

export default App;
