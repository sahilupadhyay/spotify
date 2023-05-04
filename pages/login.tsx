import React from 'react';
import {getProviders, signIn} from "next-auth/react";
import Image from "next/image";

// @ts-ignore
function Login({ providers }) {
    return (
        <div className={`flex flex-col items-center bg-black min-h-screen w-full justify-center`}>
            <img src="https://i.imgur.com/fPuEa9V.png" alt="SPOTIFY" className={`w-52 h-52`} />
            {Object.values(providers).map((provider: any) => (
                <div key={provider.name}>
                    <button onClick={() => signIn(provider.id, {callbackUrl: '/'})} className={`bg-[#18D860] text-white p-5 rounded-full`}>Login with {provider.name}</button>
                </div>
            ))}
        </div>
    );
}

export default Login;

export async function getServerSideProps() {
    const providers = await getProviders();

    return {
        props: {providers}, // will be passed to the page component as props
    }
}
