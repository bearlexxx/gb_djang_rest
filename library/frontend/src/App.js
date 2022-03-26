import React from 'react';
import axios from "axios";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';
import ProjectList from "./components/Project";
import UserList from "./components/User";
import FooterContent from "./components/Footer";
import MenuContent from "./components/Menu";
import MainPage from "./components/Main";
import NotFound from "./components/NotFound";
import ToDos from "./components/ToDos";

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'authors': [],
            'users': [],
            'projects': [],
            'todos': [],
        }
    }

    componentDidMount() {
        // const authors = [
        //     {
        //         'first_name': 'Фёдор',
        //         'last_name': 'Достоевский',
        //         'birthday_year': 1821
        //     },
        //     {
        //         'first_name': 'Александр',
        //         'last_name': 'Грин',
        //         'birthday_year': 1880
        //     },
        // ]
        // this.setState(
        //     {
        //         'authors': authors
        //     }
        // )
        axios.get('http://127.0.0.1:8000/api/authors/')
            .then(response => {
                const authors = response.data
                this.setState(
                    {
                        'authors': authors
                    }
                )
            }).catch(error => console.log(error))


        axios.get('http://127.0.0.1:8000/api/users/')
            .then(response => {
                const users = response.data
                this.setState(
                    {
                        'users': users
                    }
                )
            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/projects/')
            .then(response => {
                const projects = response.data.results
                // console.log(projects)
                this.setState(
                    {
                        'projects': projects
                    }
                )
            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/project_todos/')
            .then(response => {
                const todos = response.data.results
                this.setState(
                    {
                        'todos': todos
                    }
                )
            }).catch(error => console.log(error))

    }


    render() {

        return (
            <BrowserRouter>
                <MenuContent/>
                <main>
                    <Routes>
                        <Route path='/' element={<MainPage />} />
                        <Route path='/projects/*' element={<ProjectList projects={this.state.projects} todos={this.state.todos} />} />
                        <Route path='/todos' element={<ToDos todos={this.state.todos}/>} />
                        <Route path='/users' element={<UserList users={this.state.users}/>} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>

                <FooterContent/>
            </BrowserRouter>

        )
    }
}

export default App;

// import logo from './logo.svg';
// import './App.css';
//
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload. <br/>Привет мир.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
//
// export default App;
