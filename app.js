let amigos = [];

function adicionarAmigo() {
    const input = document.getElementById("amigo");
    const nome = input.value.trim();

    if (nome === "") {
        alert("Digite um nome válido!");
        return;
    }
    if (amigos.includes(nome)) {
        alert("Esse nome já foi adicionado!");
        return;
    }

    amigos.push(nome);
    atualizarLista();
    input.value = "";
}

function atualizarLista() {
    const lista = document.getElementById("listaAmigos");
    lista.innerHTML = "";

    amigos.forEach(nome => {
        const li = document.createElement("li");
        li.textContent = nome;
        lista.appendChild(li);
    });
}

function sortearAmigo() {
    if (amigos.length < 2) {
        alert("Adicione pelo menos 2 amigos para o sorteio!");
        return;
    }

    const participante = prompt("Qual é o seu nome?");
    if (!participante || !amigos.includes(participante)) {
        alert("Nome não encontrado na lista!");
        return;
    }

    let sorteio = {};
    let embaralhado = [...amigos];

    // Algoritmo para garantir que ninguém seja sorteado para si mesmo
    // e que cada pessoa seja sorteada apenas uma vez
    do {
        embaralhado = [...amigos].sort(() => Math.random() - 0.5);
    } while (embaralhado.some((nome, index) => nome === amigos[index])); // Repete até que ninguém seja sorteado para si mesmo

    for (let i = 0; i < amigos.length; i++) {
        sorteio[amigos[i]] = embaralhado[i];
    }

    if (sorteio[participante]) {
        const resultadoLista = document.getElementById("resultado");
        resultadoLista.innerHTML = "";
        const li = document.createElement("li");
        li.textContent = `${participante}, seu amigo secreto é ${sorteio[participante]}`;
        resultadoLista.appendChild(li);
    } else {
        alert("Erro ao encontrar seu amigo secreto. Tente novamente!");
    }
}

function exibirResultado(sorteio) {
    const resultadoLista = document.getElementById("resultado");
    resultadoLista.innerHTML = "";

    for (let amigo in sorteio) {
        const li = document.createElement("li");
        li.textContent = `${amigo} → ${sorteio[amigo]}`;
        resultadoLista.appendChild(li);
    }
}