import { GithubUser } from "./gitFavoritUser.js"

export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root)
    this.lond()
  }

  lond() {
    this.entries = JSON.parse(localStorage.getItem('@github-favorites2:')) || []
  }

  save() {
    localStorage.setItem('@github-favorites2:', JSON.stringify(this.entries))
  }

  async add(username) {
    try {
      
      const userExists = this.entries.find(entry => entry.login === username)
      
      if(userExists){
        throw new Error('Usuário ja cadastrado')
      }
      
      const user = await GithubUser.search(username)
      
      if(user.login === undefined) {
        throw new Error ('Usuario não encontrado!')
      }
      
      this.entries = [user, ...this.entries]
      this.update()
      this.save()
      
    }catch(error) {
      alert(error.message)
    }
  }
  
  delete(user) {
    const filteredEntries = this.entries
    .filter(entry => entry.login !== user.login)

    this.entries = filteredEntries
    this.update()
    this.save()
  }
}

export class FavoritesView extends Favorites {
  constructor(root) {
    super(root)
    
    this.tbody = this.root.querySelector('table tbody')
    this.main = this.root.querySelector('main')
    
    this.update()
    this.onadd()
    this.offVavorites()
  }

  onadd () {
    const addButton = this.root.querySelector('.search button')
    addButton.onclick = () => {
      const {value} = this.root.querySelector('.search input')
      this.add(value)
    }  
  }

  update() {
    this.removeAllTr()
    
    this.entries.forEach( user => {
      const row = this.CreatingTr()
      if(user.value = (true)){
        const deletMain = document.querySelector('main')
   
        this.main.remove()
      }
      
      row.querySelector('.user img').src = `https://github.com/${user.login}.png`
      row.querySelector('.user img').alt = ` Imagem ${user.name}.png`
      row.querySelector('.user a').href = `https://github.com/${user.login}`
      row.querySelector('.user p').textContent = user.name
      row.querySelector('.user span').textContent = user.login
      row.querySelector('.repositories').textContent = user.public_repos
      row.querySelector('.followers').textContent = user.followers

      row.querySelector('.remove').onclick = () => {
        const isOk = confirm('tem certezar que deseja deletar essa linha')
        if(isOk) {
          this.delete(user)
        }
        location.reload()
      }
      
      this.tbody.append(row)
      console.log(user)
    })
    
  }

  CreatingTr () {
    
    const tr = document.createElement('tr')
    
    tr.innerHTML = `
    <td class="user">
    <img src="https://github.com/PauloS2Henrique.png" alt="imagen do Paulo">
    <a href="https://github.com/PauloS2Henrique" target="_blank">
    <p>Paulo Henrique</p>
    <span>PauloS2Henrique</span>
    </a>
    </td>
    <td class="repositories">
    4
    </td>
    <td class="followers">
    1
    </td>
    <td>
    <button class="remove">Remover</button>
    </td> 
    
    `
    
    return tr
  }

  offVavorites() {
    const off = this.CreatingMain() 
    
    this.main.append(off)
  }
  
  CreatingMain() {
    
    const div = document.createElement('div')
    
    div.innerHTML = ` 
    <div id=favoritesOff>
      <img src="./scryptes/starG.svg" alt="">
      <p>Nenhum favorito ainda</p>
    </div>
    `
    return div
  }

  removeAllTr() {
    this.tbody.querySelectorAll('tr')
    .forEach((tr) => {
      tr.remove()
    })
  }

  removeMain(user) {
    if(user.value = (true)){
      const deletMain = document.querySelector('main')
 
      this.main.remove()
    }
  }
}