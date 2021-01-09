import react from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { NoteListProp, NoteType } from '../utils/utils'

const ListItem = styled(Link)`
// display: flex;
// flex-direction: row;
// height: 100%;
text-decoration: none;
`

const ListItemTitle = styled.p`

`
const ListItemContent = styled.span`

`
function List({ notes }: NoteListProp) {
    return (
        <>
            {notes.map((note: NoteType) => {
                return (
                    <div key={note._id as string}>
                        <ListItem to={`/note/${note._id}`} replace>
                                <ListItemTitle>{note.title}</ListItemTitle>
                        </ListItem>
                    </div>
                )
            })}
        </>
    )
}

export default List;