import React from 'react';
import Login from './Login'; // Importing the Login component

const Home: React.FC = () => {
    return (
        <div>
            <h1>Welcome to my Todo List application!</h1>           
                <Login />
        </div>
    );
};

export default Home;
