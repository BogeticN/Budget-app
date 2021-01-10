let listaP = []
let listaR = []

const plusMinus = document.querySelector('#plusMinus')
const opis = document.querySelector('#opis')
const cifra = document.querySelector('#iznos')
const forma = document.querySelector('#forma')
const cifraPrihod = document.querySelector("#cifraPrihod")
const cifraRashod = document.querySelector("#cifraRashod")
const procenatRashoda = document.querySelector('#procenat')
const total = document.querySelector('#stanje')


let suma = 0
let suma2 = 0
let suma3 = 0

const procenat = (num1, num2) => {
    let test = Math.round((num1 / num2) * 100)
    return test
}

const addToDomPrihodi = prihod => {
    const li = document.createElement('li')
    li.id = 'prihodiLi'
    li.innerHTML = `<span class="spanOpis">${opis.value}</span> <span class="spanCifra"> +${cifra.value}</span>`

    const dltPrihodi = document.createElement('button')

    dltPrihodi.innerHTML = `<i class="fa fa-times"></i>`
    dltPrihodi.className = 'dugmeDlt'
    dltPrihodi.addEventListener('click', () => {
        li.remove()
        listaP.splice(listaP.indexOf(prihod), 1)
        // console.log(listaP)
        suma -= prihod.iznos
        cifraPrihod.innerHTML = '+' + suma.toLocaleString()

        suma3 = suma - suma2
        if (suma3 > 0) {
            total.textContent = '+' + suma3.toLocaleString()
        }
        else if (suma3 < 0) {
            total.textContent = suma3.toLocaleString()
        }
        procenatRashoda.innerHTML = procenat(suma2, suma) + '%'
    })

    const prihodiLista = document.querySelector('#prihodi-lista')

    li.append(dltPrihodi)
    prihodiLista.append(li)
}
const addToDomRashodi = rashod => {
    const li = document.createElement('li')
    li.id = 'rashodiLi'
    li.innerHTML = `<span class="spanOpis">${opis.value}</span> <span class="spanCifra"> -${cifra.value}</span> <span id="spanProcenat">${procenat(Number(cifra.value), suma)} %</span>`
    const dltRashodi = document.createElement('button')

    dltRashodi.innerHTML = `<i class="fa fa-times"></i>`
    dltRashodi.className = 'dugmeDlt'
    dltRashodi.addEventListener('click', () => {
        li.remove()
        listaR.splice(listaR.indexOf(rashod), 1)
        suma2 -= rashod.iznos
        cifraRashod.innerHTML = '-' + suma2.toLocaleString()

        suma3 = suma - suma2
        if (suma3 > 0) {
            total.textContent = '+' + suma3.toLocaleString()
        }
        else if (suma3 < 0) {
            total.textContent = suma3.toLocaleString()
        }

        procenatRashoda.innerHTML = procenat(suma2, suma) + '%'
    })
    const rashodiLista = document.querySelector('#rashodi-lista')

    li.append(dltRashodi)
    rashodiLista.appendChild(li)
}

const isVaild = () => {
    if(opis.value != '' && cifra.value > 0)
    return true
}



forma.addEventListener('submit', (e) => {
    e.preventDefault()

    if (!isVaild()) {
        window.alert('Greska pri unosu')
        return
    }
    if (plusMinus.value == 1) {

        suma += Number(cifra.value)
        cifraPrihod.innerHTML = '+' + suma.toLocaleString()

        let prihod = {
            opis: opis.value,
            iznos: cifra.value
        }
        listaP.push(prihod)
        addToDomPrihodi(prihod)
    }
    else if (plusMinus.value == 2 && procenat(Number(cifra.value), suma) != Infinity) {
        suma2 += Number(cifra.value)
        cifraRashod.innerHTML = '-' + suma2.toLocaleString()
        let rashod = {
            opis: opis.value,
            iznos: cifra.value
        }
        listaR.push(prihod)
        addToDomRashodi(rashod)
    }
    else {
        window.alert('Ne mozete uneti rashod pre prihoda')
    }
    opis.value = ''
    cifra.value = ''

    suma3 = suma - suma2
    if (suma3 > 0) {
        total.textContent = '+' + suma3.toLocaleString()
    }
    else if (suma3 < 0) {
        total.textContent = suma3.toLocaleString()
    }

    procenatRashoda.innerHTML = procenat(suma2, suma) + '%'
})