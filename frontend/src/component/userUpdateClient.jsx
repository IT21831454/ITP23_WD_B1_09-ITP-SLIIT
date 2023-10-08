/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import { useParams } from 'react-router-dom';
import Nav from './Nav'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UpadateUserClient() {

    const { id } = useParams();
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState(" ");
    const [email, setEmail] = useState(" ");

    function Notify() {
        toast.success('Successful Updated', {
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            position: "top-right",
            draggable: true,
            progress: undefined,
            theme: "dark",
            style: {
                width: '300px',         // Set the width
                height: '100px',        // Set the height
                fontSize: '22px',       // Set the font size
                alignItems: 'center',   // Center align items vertically
                fontFamily: "Ropa Sans",
                display: 'flex',        // Use flexbox to align items
                justifyContent: 'center', // Center align items horizontally
                color: 'white',          // White text color
            },
            bodyClassName: 'custom-toast-body'

        });
    }


    useEffect(() => {

        function updateClients() {

            axios.get('http://localhost:8090/client/gets/' + id).then((res) => {

                setFname(res.data.fname);
                setLname(res.data.lname);
                setEmail(res.data.email);
                console.log(res)

            }).catch((err) => {
                console.log(err)
            })

        }

        updateClients();

    }, [])




    const Update = (e) => {

        e.preventDefault();
        axios.put("http://localhost:8090/client/updated/" + id, { fname, lname, email }).then(result => {

            Notify();
            setTimeout(function () {
                window.location = '/profile'
            }, 1500); // 2000 milliseconds (2 seconds)


        }).catch((err) => {
            alert("User Not Updated");
            console.log(err)
        })

    }



    //handle error messages
    const errPrint = (fname) => {
        if (fname.length < 3) {
            document.getElementById('error').innerHTML = "Name must be more than 3 characters";
            document.getElementById('error').style.color = "red";
        } else if (/^\d/.test(fname)) {
            document.getElementById('error').innerHTML = "Name must not start with number";
            document.getElementById('error').style.color = "red";
        }
        else {
            document.getElementById('error').innerHTML = "Done";
            document.getElementById('error').style.color = "#00a550 ";
        }
    }

    const errPrint2 = (lname) => {
        if (lname.length < 3) {
            document.getElementById('error2').innerHTML = "Name must be more than 3 characters";
            document.getElementById('error2').style.color = "red";
        } else if (/^\d/.test(lname)) {
            document.getElementById('error2').innerHTML = "Name must not start with number";
            document.getElementById('error2').style.color = "red";
        }
        else {
            document.getElementById('error2').innerHTML = "Done";
            document.getElementById('error2').style.color = "#00a550 ";
        }
    }

    const isEmailValid = (email) =>{
        const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailPattern.test(email);
    }

    const emailCheck = (email) => {

        if(isEmailValid(email)){
            document.getElementById('error3').innerHTML = "Done";
            document.getElementById('error3').style.color = "#00a550 ";
        }else{
            document.getElementById('error3').innerHTML = "Enter Invalid Email";
            document.getElementById('error3').style.color = "red";
        }

    }

    

    return (
        <div class="new-12">
            <Nav />

            <div className='container pb-2' style={{ display: "flex", alignItems: "center", justifyContent: "flex-start", marginTop: "30px", backgroundColor: "" }}>
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="/" style={{ fontSize: "1.1rem", color: "#000" }}>Home</a></li>
                        <li class="breadcrumb-item"><a href="/profile" style={{ fontSize: "1.1rem", color: "#000" }}>Account Details</a></li>
                        <li class="breadcrumb-item active" aria-current="page" style={{ fontSize: "1.1rem" }}>Update Details</li>
                    </ol>
                </nav>
            </div>

            <div className='row d-flex justify-content-center' id='con-2'>


                <div class="container card" id='col-new-1'>

                    <div className="card-header  px-2">

                        <h3 className='text-capitalize'>Update Account Details</h3>
                        <p>Enter your new details</p>

                    </div>

                    <form onSubmit={Update} className='p-2'>

                        <div className="mb-4 mt-2">
                            <label for="fname" className="form-label px-1">First Name</label>
                            <input type="text" className="form-control" id="fname" name="fname" placeholder='First Name' required autoComplete='off' value={fname}
                                pattern="^[a-zA-Z][a-zA-Z0-9]*$" title='Please Enter Valid Name'
                                onChange={(e) => {

                                    setFname(e.target.value);

                                }}

                                onKeyUp={(e) => {
                                    errPrint(e.target.value);
                                }}



                            />
                            <div className='py-2 ' style={{ color: "red" }} id='error'></div>
                        </div>
                        <div className="mb-4">
                            <label for="lname" className="form-label px-1">Last Name</label>
                            <input type="text" className="form-control" id="lname" name="lname" placeholder='Last Name' required autoComplete='off' value={lname}
                                pattern="^[a-zA-Z][a-zA-Z0-9]*$" title='Please Enter Valid Name'
                                onChange={(e) => {

                                    setLname(e.target.value);
                                }}

                                onKeyUp={(e) => {
                                    errPrint2(e.target.value);
                                }}
                            />
                            <div className='py-2 ' style={{ color: "red" }} id='error2'></div>
                        </div>
                        <div className="mb-4">
                            <label for="email" className="form-label px-1">Email</label>
                            <input type="email" className="form-control" id="email" name="email" placeholder='Email' required autoComplete='off' value={email}
                                pattern="^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$" title='Please Enter Valid Email' disabled
                                onChange={(e) => {

                                    setEmail(e.target.value);
                                }}

                                onKeyUp={(e) => {
                                    emailCheck(e.target.value);
                                }}

                            />

                        <div className='py-2 ' style={{ color: "red" }} id='error3'></div>
                        </div>

                        <button type="submit" className="btn btn-primary w-100 mt-2 but-1">Update Details</button>

                    </form>
                </div>


                <div className='col-6' id='col-new-2'></div>



            </div>

            <ToastContainer />
        </div>


    )
}






export default UpadateUserClient;