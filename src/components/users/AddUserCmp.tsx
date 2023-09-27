import React, { ChangeEvent, useEffect, useState } from 'react';
import Modal from '../Modal';
import InputCmp from '../InputCmp';
import ButtonCmp from '../ButtonCmp';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

interface AddUserCmpProps {
  show: boolean;
  hide: () => void;
}

export default function AddUserCmp({ show, hide }: AddUserCmpProps) {

    const [accessLevelsList, setAccessLevelsList] = useState([]);

    const [picture, setPicture] = useState<any>([]);

    const handleImage = (e:any) => {
        setPicture(e.target.files[0])
    }

    useEffect(() => {
        axios.get('/api/access-levels').then(res => {
            setAccessLevelsList(res.data);
        });
    }, [])

    const [input, setInput] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        accessId: 1,
        position:'',
        startDate:'',
        contractType:'',
salary:'',
        phone:'',
    })

    const [errors, setErrors] = useState([])

    const handleInput = (e:any) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const itemSubmit = (e:any) => {
        e.preventDefault();

        const data = new FormData();
        data.append('image', picture);
        data.append('firstname', input.firstname);
        data.append('lastname', input.lastname);
        data.append('email', input.email);
        data.append('password', input.password);
        data.append('accessId', input.accessId.toString());
        data.append('position', input.position);
        data.append('startDate',input.startDate);
        data.append('contractType', input.contractType);
        data.append('salary', input.salary);
        data.append('phone', input.phone);

       axios.post("/api/users",data).then(res => {

        toast.success('Utilisateur crée avec succé', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
            hide()

        }).catch(err => {
            console.log(err)
            const response = err.response
            setErrors(response.data.validation_errors)
        })
    }

  return (
    <Modal
    title="Ajout Utilisateur"
      show={show}
      hide={hide}
      dialogClassName="w-full sm:max-w-2xl h-fit my-auto rounded-xl"
    >
      <form className='flex flex-col gap-4' encType='multipart/form-data' onSubmit={itemSubmit}>
        <div className='flex gap-4'>
<InputCmp name="lastname" placeholder='Nom' divClassNames='w-full' onChange={handleInput} value={input.lastname} />
<InputCmp name="firstname" placeholder='Prenom' divClassNames='w-full' onChange={handleInput} value={input.firstname} />
        </div>
        <div className='flex gap-4'>
<InputCmp name="email" type='email' placeholder='Email' divClassNames='w-full' onChange={handleInput} value={input.email} />
<InputCmp name="password" type='password' placeholder='Mot de passe' divClassNames='w-full' onChange={handleInput} value={input.password} />
        </div>
        <div className='flex gap-4'>
<InputCmp name="position" placeholder='Poste' divClassNames='w-full' onChange={handleInput} value={input.position} />
<InputCmp type='date' name="startDate" placeholder='Date début' divClassNames='w-full' onChange={handleInput} value={input.startDate} />
        </div>
        <div className='flex gap-4'>
<InputCmp name="contractType" placeholder='Type de contrat' divClassNames='w-full' onChange={handleInput} value={input.contractType} />
<InputCmp name="salary" placeholder='Salaire' divClassNames='w-full' onChange={handleInput} value={input.salary} />
        </div>
        <div className='flex gap-4'>
<InputCmp name="phone" placeholder='Tél' divClassNames='w-full' onChange={handleInput} value={input.phone} />
<div>
                    <input className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding py-[0.32rem] px-3 text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[margin-inline-end:0.75rem] file:[border-inline-end-width:1px] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-[0_0_0_1px] focus:shadow-primary focus:outline-none" id="file_input" type="file" onChange={handleImage} />
                    {/* <span className='text-red-600'>{errors?.image}</span> */}
                </div>
        </div>
        <div>
                    <label htmlFor="persmission" className="block mb-2 text-sm font-medium text-gray-900">AccessLevel</label>
                    <select id="accessLevel" name="accessId" onChange={handleInput} value={input.accessId} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                        <option>Selectionner niveau de permission</option>
                        {
                            accessLevelsList.map((item:any) => {
                                return (
                                    <option value={item.permissionLevel} key={item.permissionLevel}>{item.type}</option>
                                )
                            })
                        }
                    </select>
                    {/* <small className='bg-red-600'>{errors?.accessId}</small> */}
                </div>
        <div className='flex justify-end gap-4'> <button onClick={hide} type='button' className='font-bold'>Cancel</button> <ButtonCmp type='submit'>Save</ButtonCmp>  </div>
      </form>
    </Modal>
  );
}
