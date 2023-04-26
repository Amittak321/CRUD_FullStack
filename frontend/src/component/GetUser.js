import axios from 'axios';
import React, { useEffect, useState } from 'react'

function GetUser() {
    const[userData , setUserData] = useState(null);

    const fetchUserData = async ()=>{
        const resp = await axios.get("/getUser");
        if(resp.data.users.length > 0){
            setUserData(resp.data.users);
        }
    }

    useEffect(()=>{
        fetchUserData();
    },[userData])

    const handleEdit = async(userId)=>{
        const userName = prompt("Enter your user name");
        const email = prompt("Enter you email");

        if(!userName || !email){
            alert("Please enter username and email")
        }else{
            const resp = await axios.put(`/editUser/${userId}`, {name:userName ,email});
            console.log(resp)
        }
    }

    const handleDelete = async(userId) =>{
        const resp = await axios.delete(`/deleteUser/${userId}`);
        console.log(resp);
    }

  return (
    <section className="text-gray-600 body-font mt-12">
      <div className="container py-5 mx-auto">
        <div className="flex flex-col text-center w-full mb-8">
          <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">
            All Users
          </h1>
        </div>
        <div className="lg:w-2/3 w-full mx-auto overflow-auto">
          <table className="table-auto w-full text-left whitespace-no-wrap">
            <thead>
              <tr>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
                  Name
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Email
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Edit
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
                {userData && userData.map((user)=>(
                    <tr>
                    <td className="px-4 py-3">{user.name}</td>
                    <td className="px-4 py-3">{user.email}</td>
                    <td className="px-4 py-3">
                      <button
                        className="hover:text-green-500"
                        onClick={()=>handleEdit(user._id)}
                      >
                        Edit
                      </button>
                    </td>
                    <td className="px-4 py-3 text-lg text-gray-900">
                      <button
                        className="hover:text-red-500"
                        onClick={()=> handleDelete(user._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                  
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export default GetUser