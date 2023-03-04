const form = document.getElementById("novoItem")
const lista = document.getElementById('lista')
/* variável para consultar se há itens no local storage */

const itens = JSON.parse(localStorage.getItem('itens')) || []

/* variável para consultar se há itens no local storage */


/* busca os dados do local storage e cria os elementos */

itens.forEach((elemento) => {
    criaElemento(elemento)
})
/* busca os dados do local storage e cria os elementos */



/* criação do formulário para o envio do item*/

form.addEventListener('submit', (evento)=>{
    evento.preventDefault()

    const nome = evento.target.elements['nome']
    const quantidade = evento.target.elements['quantidade']

/* procura se o elemento já existe */

    const existe = itens.find(elemento => elemento.nome === nome.value) 

/* procura se o elemento já existe */    
  
    const ItemAtual = {
        'nome': nome.value,
        'quantidade': quantidade.value
    }
/* se o nome é encontrado, atualiza o elemento */

    if (existe) {
        ItemAtual.id = existe.id
        atualizaElemento(ItemAtual)
        /* sobrescreve  a array e busca o elemento correto para atualizar no local storage */

        itens[itens.findIndex(elemento => elemento.id === existe.id)]= ItemAtual

        /* sobrescreve  a array e busca o elemento correto para atualizar no local storage */

/* se o nome é encontrado, atualiza o elemento */

/* se o nome não é encontrado, cria o elemento a partir do último */

    } else {
        ItemAtual.id = itens[itens.length - 1] ? (itens[itens.length-1]).id +1 : 0; 

        criaElemento(ItemAtual)

        itens.push(ItemAtual)
    }

/* se o nome não é encontrado, cria o elemento a partir do último */
    localStorage.setItem('itens', JSON.stringify(itens))

    nome.value = ''
    quantidade.value = ''

    
})

/* criação do formulário para o envio do item*/

/* função para criar a lista e adicionar nome e quantidade */

function criaElemento(item) {
    const novoItem = document.createElement('li')
    novoItem.classList.add('item')

    const numeroItem = document.createElement('strong')
    numeroItem.innerHTML = item.quantidade
    numeroItem.dataset.id = item.id

    novoItem.appendChild(numeroItem)
    novoItem.innerHTML += item.nome

    novoItem.appendChild(BotaoDeleta(item.id))

    lista.appendChild(novoItem)
}

/* função para criar a lista e adicionar nome e quantidade */

/* função para atualizar a lista*/

function atualizaElemento(item){
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}

/* função para atualizar a lista*/

/* função para criar o botão */

function BotaoDeleta(id){
    const elementoBotao = document.createElement('button')
    elementoBotao.innerText = 'X'

    /* evento para adicionar o click e capturar o elemento */

    elementoBotao.addEventListener('click', function (){
        deletaElemento(this.parentNode, id)

    /* evento para adicionar o click e capturar o elemento */   

    })
    return elementoBotao
}

/* função para deletar o item */

function deletaElemento (tag, id){
    tag.remove()

    itens.splice(itens.findIndex(elemento => elemento.id ===id), 1)

    localStorage.setItem('itens', JSON.stringify(itens))
}

/* função para deletar o item */