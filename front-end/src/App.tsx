import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios'
import styled from 'styled-components'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom"

import Form from './components/Form'
import List from './components/List'
import { GetANote, GetAllNotes, NoteType, FormProp, NoteListProp } from './utils/utils'
import dotenv from 'dotenv'

const AppContainer = styled.div`
display: flex;
flex-direction: row;
flex-wrap: nowrap;
width: 100%;
height: 100%;
`

const SideMenu = styled.div`

`

const Button = styled.button`

`

const MainContent = styled.div`
width: 100%;
`

function App() {
  const noteType: NoteType = { _id: "", title: "", content: "" }
  const [notesList, setNotesList] = useState([])
  const [selectedNote, setSelectedNote] = useState(noteType)
  const [refresh, setRefresh] = useState(false)
  const history = useHistory()

  useEffect(() => {
    if (process.env.REACT_APP_API_BASE_URL) { 
      axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL
    }
    
    updateNotesList()
  }, [])

  let updateNotesList = () => {
    GetAllNotes()
      .then((notes) => {
        if (notes) {
          setNotesList(notes)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  let onListSelect = (_id: String) => {
    GetANote(_id)
      .then((note) => {
        console.log(note)
        setSelectedNote(note)
      })
  }

  let onSubmitPost = (e: React.FormEvent | any) => {
    e.preventDefault();

    const title = e.currentTarget.title.value
    const content = e.currentTarget.content.value
    axios.post(
      `/notes`,
      {
        title: title,
        content: content
      }
    )
      .then((res) => {
        if (res.status === 200) { 
          GetAllNotes().then((notes) => setNotesList(notes))
        }
      })
    console.log(e.currentTarget.content.value)
  }

  let onSubmitPatch = (e: React.FormEvent | any, noteId: any) => {
    e.preventDefault();

    const title = e.currentTarget.title.value
    const content = e.currentTarget.content.value
    axios
      .patch(
        `/notes/${noteId}`,
        {
          title: title,
          content: content
        })
      .then((res) => {
        if (res.status === 200) {
          GetAllNotes().then((notes) => setNotesList(notes))
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  let onSubmitDelete = (e: React.MouseEvent | any) => {
    e.preventDefault();
    console.log(e.target.value)
    axios
      .delete(
        `/notes/${e.target.value}`
      )
      .then((res) => {
        if (res.status === 200) {
          GetAllNotes().then((notes)=> setNotesList(notes))
        }

      })
      .catch((err) => {
        console.log(err)
      })
  }


// let returnHome = () => {
//   history.push('/')
//   updateNotesList()
// }


return (
  <Router>
    <AppContainer>
      <SideMenu>
        <Link to="/create">Add New Note</Link>

        <List notes={notesList} onListSelect={onListSelect} />
      </SideMenu>
      <MainContent>
        <Switch>
          <Route path="/create">
            <Form config={{ type: "create" }} onSubmit={onSubmitPost} />
          </Route>
          <Route path="/note/:noteId">
            <Form config={{ type: "update" }} onDelete={onSubmitDelete} onPatch={onSubmitPatch} />
            {/* <FormComp config={{type: "update", defaultValue: {title: }}} */}
          </Route>
          <Route path="/">
            Select or Add a new note
          </Route>
        </Switch>
      </MainContent>
    </AppContainer>
  </Router>

  // <>
  //   <NoteList notes={notesList}/>
  //   <Form onSubmit={onFormSubmit}/>
  // </>
);
}

export default App;
