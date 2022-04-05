import React from 'react';
import axios from "axios";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Cookies from 'universal-cookie';
import './App.css';
import ProjectList from "./components/Project";
import UserList from "./components/User";
import FooterContent from "./components/Footer";
import MenuContent from "./components/Menu";
import MainPage from "./components/Main";
import NotFound from "./components/NotFound";
import ToDos from "./components/ToDos";
import LoginForm from "./components/Auth";

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'authors': [],
            'users': [],
            'projects': [],
            'todos': [],
            'token': '',
            'auth_login': '',
        }
    }

    set_token(token, auth_login) {
        const cookies = new Cookies()
        cookies.set('token', token)
        cookies.set('auth_login', auth_login)
        this.setState({'token': token}, ()=>this.load_data())
        this.setState({'auth_login': auth_login})
    }

    is_authenticated() {
        return this.state.token !== ''
        // return true
        // return this.state.token
    }

    logout() {
        this.set_token('', '')
    }

    get_token_from_storage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        const auth_login = cookies.get('auth_login')
        if (token !== undefined) this.setState({'token': token}, ()=>this.load_data())
        this.setState({'auth_login': auth_login})
    }

    get_token(username, password) {
        console.log(username)
        axios.post('http://127.0.0.1:8000/api-token-auth/', {
            username: username,
            password: password
        })
            .then(response => {
                this.set_token(response.data['token'], username)
                console.log(response.data)
            }).catch(error => {
            console.log(error);
            if (error.response && error.response.status === 400) {
                alert('Неверный логин или пароль')
            } else {
                alert('Неизвестная ошибка')
            }
        })
    }

    get_headers() {
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.is_authenticated()) {
            headers['Authorization'] = 'Token ' + this.state.token
        }
        return headers
    }

    load_data() {
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
        const headers = this.get_headers()

        axios.get('http://127.0.0.1:8000/api/authors/',  {headers})
            .then(response => {
                const authors = response.data.results
                this.setState(
                    {
                        'authors': authors
                    }
                )
            }).catch(error => console.log(error))


        axios.get('http://127.0.0.1:8000/api/users/',  {headers})
            .then(response => {
                const users = response.data.results
                this.setState(
                    {
                        'users': users
                    }
                )
            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/projects/',  {headers})
            .then(response => {
                const projects = response.data.results
                // console.log(projects)
                this.setState(
                    {
                        'projects': projects
                    }
                )
            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/project_todos/',  {headers})
            .then(response => {
                const todos = response.data.results
                this.setState(
                    {
                        'todos': todos
                    }
                )
            }).catch(error => console.log(error))

    }

    componentDidMount() {
        this.get_token_from_storage()
    }

    render() {

        return (
            <BrowserRouter>
                <MenuContent is_authenticated={() => this.is_authenticated()} logout={() => this.logout()} auth_login={this.state.auth_login}/>
                <main>
                    <Routes>
                        <Route path='/' element={<MainPage />} />
                        <Route path='/projects/*' element={<ProjectList projects={this.state.projects} todos={this.state.todos} />} />
                        <Route path='/todos' element={<ToDos todos={this.state.todos}/>} />
                        <Route path='/users' element={<UserList users={this.state.users}/>} />
                        <Route path='/login' element={<LoginForm get_token={(username, password) => this.get_token(username, password)}
                            is_authenticated={() => this.is_authenticated()} />}/>
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
