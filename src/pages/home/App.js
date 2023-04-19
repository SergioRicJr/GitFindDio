// eslint-disable-next-line
import {Header} from '../../components/Header'
import './styles.css'
import ItemList from '../../components/itemlist'
import { useState } from 'react';


function App() {
  const [user, setUser] = useState('')
  const [currentUser, setCurrentUser] = useState(null)
  const [repositories, setRepositories] = useState(null)

  const handleGetData = async () => {
    const userData = await fetch(`https://api.github.com/users/${user}`)
    const newUser = await userData.json()
    console.log(newUser.name)

    if (newUser.name) {
      const {avatar_url, name, bio, login} = newUser;
      setCurrentUser({avatar_url, name, bio, login})

      const repositoiesData = await fetch(`https://api.github.com/users/${user}/repos`)
      const newRepos = await repositoiesData.json()

      if(newRepos.length) {
        setRepositories(newRepos)
      }
    }
  }

  return (
    <div className="App">
      <Header/>
      <div className='conteudo'>
        <div className='info'>
          <div>
            <input name='usuario' placeholder='@user' value={user} onChange={(event)=> setUser(event.target.value)}></input>
            <button onClick={handleGetData}>Buscar</button>
          </div>
          {currentUser?.name ? (
            <><div className='perfil'>
              <img src={currentUser.avatar_url} alt='avatar imagem' className='profile'/>
              <div>
                <h3>{currentUser.name}</h3>
                <span>{currentUser.login}</span>
                <p>{currentUser.bio}</p>
              </div>
              </div>
              <hr></hr>
              </>
          ):null}
          {repositories?.length? (
            <div>
              <h4 className='repositorio'>Repositorios</h4>
              {
                repositories.map((repository)=>{
                  console.log("1itemlistarepos")
                  return (<ItemList title={repository.name} description={repository.description} />)
                })
              }
            </div>
          ):console.log("erro")}
        </div>
        {/* <img src={background} className='background' alt='background-app'/> */}
      </div>
    </div>
  );
}

export default App;
