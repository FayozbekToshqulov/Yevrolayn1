import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

export const SignUp = () => {
    const [error, setError] = useState('');
    const [userSignup, setUserSignup] = useState({
        name: "",
        email: "",
        password: "",
        role: "",
    })

    const onSubmit = (e) => {
        e.preventDefault();

        createUserWithEmailAndPassword(auth, userSignup.email, userSignup.password)
            .then((userCredential) => {
                const users = userCredential.user;
                localStorage.setItem('users', JSON.stringify(users))

                const user = {
                    name: userSignup.name,
                    email: userSignup.email,
                    role: userSignup.role,
                    date: new Date().toLocaleString("en-US", {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                    }),
                }

                const userData = collection(db, 'user');
                addDoc(userData, user)

            })
            .catch((error) => {
                const errorMessage = error.message;
                setError(errorMessage);
                console.log(errorMessage);
            });
    };

    return (
        <div>
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
                    <form onSubmit={onSubmit} className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
                        <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Sign Up</h2>

                        {error && <p className="text-red-500 text-xs mb-4">{error}</p>}

                        <div className="relative mb-4">
                            <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={userSignup.email}
                                onChange={(e) => {
                                    setUserSignup({
                                        ...userSignup,
                                        email: e.target.value,
                                    })
                                }}
                                name="email"
                                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                        <div className="relative mb-4">
                            <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={userSignup.password}
                                onChange={(e) => {
                                    setUserSignup({
                                        ...userSignup,
                                        password: e.target.value,
                                    })
                                }}
                                name="password"
                                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                        <button className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Button</button>
                        <p className="text-xs text-gray-500 mt-3">Literally you probably heard of them jean shorts.</p>
                    </form>
                </div>
            </section>
        </div>
    )
}
