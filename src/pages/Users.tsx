import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';
import AddUserCmp from '../components/users/AddUserCmp';
import Avatar from 'react-avatar';
import EditUserCmp from '../components/users/EditUserCmp';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Card from '../components/Card';
import TableCmp from '../components/Table';

export default function Users(){
  const [users, setUsers] = useState<any[]>([]);
  const [modalShow, setModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [toEdit, setToEdit] = useState({});

function getItems(){
  axios.get('/api/users')
  .then((response) => {
    setUsers(response.data);
  })
  .catch((error) => {
    console.error('Error fetching users:', error);
  });
}

  useEffect(() => {
   getItems()
  }, []);

  const deleteItem = (e:any, item:any) => {

    Swal.fire({
        title: 'Supprimer utilisateur',
        text: `Vous éte sur de supprimer l'utilisateur ${item.firstname} ${item.lastname}?`,
        showDenyButton: true,
        confirmButtonText: 'Delete',
        denyButtonText: `Cancel`,
        confirmButtonColor: '#df4759',
        denyButtonColor: '#d9e2ef',
    }).then((result) => {
        if (result.isConfirmed) {

            axios.delete(`/api/users/${item._id}`).then(res => {

              toast.success('Utilisateur Supprimé avec succé', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
                getItems();

            }).catch(err => {
                if (err.response.data.status === 404) {
                    Swal.fire("Erreur", err.response.data.message, "error")
                }
                else if (err.response.status === 401) {
                    Swal.fire("Error", err.response.data.message, "error");
                }
            })

        } else if (result.isDenied) {
        }
    });


}

  return (
    <div className="m-2 p-2">
<Card title='Utilisateurs' right={<button className="bg-indigo-600 text-white font-bold px-4 py-2 rounded-lg text-sm" onClick={()=>{setModalShow(true)}}>Ajouter un Utilisateur</button>}>
     <TableCmp head={<>
  <div className='col-span-4'>User</div>
  <div className='col-span-3'>POSTE</div>
  <div className='col-span-2'>DATE DEBUT</div>
  <div className='col-span-2'>TYPE CONTRAT</div>
  <div className='col-span-1 justify-self-center'>ACTIONS</div>
     </>
     }>


        {users.map((user) => (
          <div key={user._id} className="grid grid-cols-12 bg-white dark:bg-gray-800 dark:text-white p-3 rounded shadow">
  <div className="flex items-center space-x-3 col-span-4">
                                            <div className="">
                                            
                                                <Avatar
      name={user.firstname}
      src={"http://localhost:5000/"+user.picture} // Use null if picture is not available
      size="50" // Adjust the size as needed
      round={true}
    />
                                           
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-1">
                                                <div className="font-bold">{user.firstname}</div>
                                                <div className="text-sm">{user.lastname}</div>
                                                    </div> 
                                                <div className="text-sm opacity-50">{user.email}</div>
                                            </div>
                                        </div>
            <div className="col-span-3 self-center">{user.position}</div>
            <div className="col-span-2 self-center">{user.startDate}</div>
            <div className="col-span-2 self-center">{user.contractType}</div>
            <div className="col-span-1 self-center flex justify-between"><button onClick={()=>{setToEdit(user);setEditModalShow(true)}}><PencilSquareIcon className='w-6 h-6 text-indigo-600'/> </button> <button onClick={(e)=>deleteItem(e,user)}><TrashIcon className='w-6 h-6 text-red-500' /> </button> </div>
          </div>
        ))}
     </TableCmp>
</Card>
      <ToastContainer />
      <AddUserCmp show={modalShow} hide={()=>{getItems();setModalShow(false)}} />
      <EditUserCmp show={editModalShow} hide={()=>{getItems();setEditModalShow(false)}} toedit={toEdit} />
    </div>
  );
};
