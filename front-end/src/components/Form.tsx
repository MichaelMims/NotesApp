import react, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { FormProp } from '../utils/utils'
import axios from 'axios'
import { useHistory, useRouteMatch } from 'react-router-dom'

const FormContainer = styled.form`
display: flex;
// flex-grow: 2;
text-align: center;
flex-direction: column;
height: 100%;
width: 100%;

#content {
  height: 75%;
}

#title {
  border: none;
}

#content {
  border: none;
}

#save {
  display: block;
  margin: 0 auto;
  width: 25%;
}

#delete {
  display: block;
  margin: 0 auto;
  width: 25%;
}

#controls {
  display: flex;
}
`

function Form({ onSubmit, onPatch, onDelete }: FormProp) {
  const [noteValues, setNoteValues] = useState({ _id: -1, title: "", content: "" })
  const history = useHistory();
  let match: any = useRouteMatch();
  let noteId = match.params.noteId

  useEffect(() => {
    if (noteId) {
      axios
        .get(`/notes/${noteId}`)
        .then((res) => {
          setNoteValues(res.data.note)
        })
        .catch((err) => {

        })

    } else {
      setNoteValues({ _id: -1, title: "", content: "" })
    }
  }, [noteId])

  let onHandleSubmit = (e: react.FormEvent) => {
    e.preventDefault();
    onSubmit(e)
    history.push('/')
  }

  let onHandlePatch = (e: react.FormEvent) => {
    e.preventDefault();
    if(onPatch) {
      onPatch(e, noteId)
    }
    history.push('/')

  }

  let onHandleDelete = (e: react.MouseEvent) => {
    e.preventDefault();
    if (onDelete) {
      onDelete(e)
    }
    history.push('/')
  }

  return (
    <FormContainer onSubmit={onPatch ? onHandlePatch : onHandleSubmit } >
      <input type="text" id="title" name="title" placeholder="tilte" defaultValue={noteValues ? noteValues.title : ""} required />
      {/* <input type="text" id="content" name="content" required/> */}
      <textarea id="content" name="content" placeholder="..." defaultValue={noteValues ? noteValues.content : ""}></textarea>
      <div id="controls">
        {onDelete ? <button id="delete" value={noteId} onClick={(e) => onHandleDelete(e)}>Delete</button> : ""} <input type="submit" id="save" value="Save" />

      </div>

    </FormContainer>
  )
}

export default Form