import React from 'react';

function Dashboard() {
    return (
        <div className="container max-w-full flex flex-col items-center justify-center bg-white">
            <section className="flex flex-col text-center">
                <p className="text-xl text-gray-600">
                    Welcome to
                </p>
                <h1 className="max-w-xl text-6xl font-bold text-black">
                    DASHBOARD
                </h1>
            </section>
            <div>
                <img
                    src="Amigos Work Space.png"
                    alt="image"
                    width="100%"
                    height="100%"
                />
            </div>
        </div>
    );
}

export default Dashboard;