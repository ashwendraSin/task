import logo from './logo.svg';
import './App.css';
import React from 'react';
import axios from "axios"

function App() {

  const [posts, setPosts] = React.useState()
  const [editId, setEditID] = React.useState(null)
  const [editForm, setEditForm] = React.useState()

  React.useEffect(() => {
    const fatchData = async () => {
      const res = await axios.get(`https://jsonplaceholder.typicode.com/users`)
      console.log(res.data)
      setPosts(res.data)
    }
    fatchData();
  }, [])
  const hadleEdit = (e, contacts) => {
    debugger
    e.preventDefault();
    setEditID(contacts.id)
    const formValues = {
      name: contacts.name,
      email: contacts.email,
      phone: contacts.phone,
      city: contacts.address.city,
      zipcode: contacts.address.zipcode

    }
    setEditForm(formValues)
  }
  const handleDeleteClick = (contactsId) => {
    debugger
    const newContacts = [...posts]
    const index = posts.findIndex((contacts) => contacts.id === contactsId);
    newContacts.splice(index, 1);
    setPosts(newContacts);
  };
  const handleEditSubmit = (e) => {
    debugger
    e.preventDefault()
    const editField = {
      id: editId,
      name: editForm.name,
      email: editForm.email,
      phone: editForm.phone,
      city: editForm.city,
      zipcode: editForm.zipcode
    };
    const newTable = [...posts]
    const index = posts.findIndex(data => data.id === editId);
    newTable[index] = editField;
    setPosts(newTable)
    setEditForm(newTable)
    setEditID(null);
  }
  const handlecancleClick = () => {
    setEditID(null)
  }
  return (
    <>
      <div>
        <table style={{ padding: 40 }} >
          <thead>
            <tr>
              <th style={{ paddingRight: 50 }}>id</th>
              <th style={{ paddingRight: 50 }}>name</th>
              <th style={{ paddingRight: 50 }}>email</th>
              <th style={{ paddingRight: 50 }}>phone</th>
              <th style={{ paddingRight: 50 }}>city </th>
              <th style={{ paddingRight: 50 }}>zip code</th>
              <th style={{ paddingRight: 50 }}>Action</th>

            </tr>
          </thead>

          <tbody>


            {posts.map((contacts) => {
              return (
                <>
                  {editId === contacts.id ? (
                    <tr>
                      <td>{contacts.id} </td>
                      <td><input type='text' value={editForm.name} /></td>
                      <td><input value={editForm.email} /></td>
                      <td><input value={editForm.phone} /></td>
                      <td><input value={editForm.city} /></td>
                      <td><input value={editForm.zipcode} /></td>
                      <td><button onClick={handleEditSubmit}> save</button><button onClick={handlecancleClick}>cancel</button></td>

                    </tr>

                  ) : (<tr>
                    <td>{contacts.id}</td>
                    <td>{contacts.name}</td>
                    <td>{contacts.email}</td>
                    <td>{contacts.phone}</td>
                    <td>{contacts.address.city}</td>
                    <td>{contacts.address.zipcode}</td>
                    <td><button onClick={(e) => { hadleEdit(e, contacts) }}>edit</button><button onClick={(e) => { handleDeleteClick(contacts.id) }}>delete</button></td>

                  </tr>)}


                </>
              )

            })}
          </tbody>


        </table>
      </div>

    </>
  );
}

export default App;
