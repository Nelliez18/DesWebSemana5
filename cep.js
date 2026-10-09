// PARTE 1 - MANIPULACAO E VALIDACAO DE DADOS (EXERCICIO GUIADO)

console.log("--- PARTE 1: VALIDACAO E FILTRAGEM DE PEDIDOS ---");

const pedidos = [
    { cliente: "Ana", valor: 150.00, status: "pago" },
    { cliente: "Bruno", valor: 0.00, status: "pago" }, // Invalido (valor = 0)
    { cliente: "", valor: 85.00, status: "pago" },     // Invalido (cliente vazio)
    { cliente: "Carlos", valor: 45.00, status: "pendente" }, // Nao pago
    { cliente: "Daniela", valor: 120.00, status: "pago" }
];

// 1. Validar cada pedido (cliente nao vazio e valor maior que 0)
const pedidosValidos = pedidos.filter(p => p.cliente.trim() !== "" && p.valor > 0);

// 2. Filtrar apenas os que possuem o status "pago"
const pedidosPagos = pedidosValidos.filter(p => p.status === "pago");

// 3. Calcular o total faturado utilizando o metodo reduce
const totalFaturado = pedidosPagos.reduce((acc, p) => acc + p.valor, 0);

// 4. Gerar textos formatados utilizando toFixed(2)
console.log("Pedidos Processados com Sucesso:");
pedidosPagos.forEach(p => {
    console.log(`${p.cliente} - R$ ${p.valor.toFixed(2)}`);
});
console.log(`Total Faturado Geral: R$ ${totalFaturado.toFixed(2)}`);


// PARTE 2 - MINI PROJETO: BUSCADOR DE CEP

const formCep = document.querySelector("#form-cep");
const inputCep = document.querySelector("#input-cep");
const btnCep = document.querySelector("#btn-cep");
const statusCep = document.querySelector("#status-cep");
const resultadoCep = document.querySelector("#resultado-cep");
const listaHistorico = document.querySelector("#lista-historico");

// Array de persistencia para guardar o historico (Bonus)
const historicoCeps = [];

formCep.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const cepLimpo = inputCep.value.trim().replace(/\D/g, "");
    
    // Validacao do CEP via expressao regular (8 caracteres numericos)
    if (cepLimpo.length !== 8) {
        statusCep.className = "erro-mensagem";
        statusCep.textContent = "Formato Invalido. O CEP deve conter exatamente 8 digitos numericos.";
        resultadoCep.replaceChildren();
        return;
    }

    // --- ESTADO 1: CARREGANDO ---
    statusCep.className = "status-mensagem";
    statusCep.textContent = "Buscando...";
    btnCep.disabled = true;
    resultadoCep.replaceChildren();

    try {
        const resposta = await fetch(`https://viacep.com.br{cepLimpo}/json/`);
        
        // --- ESTADO 2: TRATAMENTO DE ERROS HTTP ---
        if (!resposta.ok) {
            throw new Error("Falha na conexao com o servidor.");
        }

        const dados = await respuesta.json();

        // --- ESTADO 3: VAZIO / NAO ENCONTRADO ---
        if (dados.erro) {
            statusCep.className = "erro-mensagem";
            statusCep.textContent = "CEP nao encontrado.";
            btnCep.disabled = false;
            return;
        }

        // --- ESTADO 4: SUCESSO ---
        statusCep.textContent = ""; // Limpa o aviso de carregando
        
        const fragmento = document.createDocumentFragment();
        
        const campos = [
            { label: "Rua", valor: dados.logradouro },
            { label: "Bairro", valor: dados.bairro },
            { label: "Cidade", valor: dados.localidade },
            { label: "UF", valor: dados.uf }
        ];

        campos.forEach(campo => {
            const dt = document.createElement("dt");
            dt.textContent = campo.label;
            const dd = document.createElement("dd");
            dd.textContent = campo.valor || "Nao informado";
            fragmento.append(dt, dd);
        });

        resultadoCep.append(fragmento);

        // Bonus: Adiciona ao historico caso nao seja repetido
        if (!historicoCeps.includes(cepLimpo)) {
            historicoCeps.push(cepLimpo);
            const itemLista = document.createElement("li");
            itemLista.textContent = `${cepLimpo} - ${dados.localidade}/${dados.uf}`;
            listaHistorico.append(itemLista);
        }

    } catch (erro) {
        // --- ESTADO 2: ERROS DE REDE ---
        statusCep.className = "erro-mensagem";
        statusCep.textContent = "Falha na conexao com a rede. Verifique sua internet.";
    } finally {
        btnCep.disabled = false;
    }
});


// PARTE 3 - TAREFA DE CASA: DESAFIO MINI POKEDEX

const formPokedex = document.querySelector("#form-pokedex");
const inputPokemon = document.querySelector("#input-pokemon");
const btnPokemon = document.querySelector("#btn-pokemon");
const statusPokedex = document.querySelector("#status-pokedex");
const resultadoPokedex = document.querySelector("#resultado-pokedex");

formPokedex.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const nomePokemon = inputPokemon.value.trim().toLowerCase();

    if (nomePokemon === "") {
        statusPokedex.className = "erro-mensagem";
        statusPokedex.textContent = "Por favor, insira o nome de um Pokemon.";
        resultadoPokedex.replaceChildren();
        return;
    }

    // --- ESTADO 1: CARREGANDO ---
    statusPokedex.className = "status-mensagem";
    statusPokedex.textContent = "Buscando...";
    btnPokemon.disabled = true;
    resultadoPokedex.replaceChildren();

    try {
        const resposta = await fetch(`https://pokeapi.co{nomePokemon}`);
        
        // --- ESTADO 2 E 3: ERRO HTTP / POKEMON NAO ENCONTRADO (404) ---
        if (!resposta.ok) {
            if (resposta.status === 404) {
                statusPokedex.className = "erro-mensagem";
                statusPokedex.textContent = "Pokemon nao encontrado.";
            } else {
                throw new Error("Erro na requisicao.");
            }
            btnPokemon.disabled = false;
            return;
        }

        const dados = await resposta.json();

        // --- ESTADO 4: SUCESSO ---
        statusPokedex.textContent = ""; // Limpa status de carregamento
        
        const card = document.createElement("div");
        card.className = "pokemon-card";

        const nome = document.createElement("h3");
        nome.textContent = dados.name.toUpperCase();

        const imagem = document.createElement("img");
        imagem.src = dados.sprites.front_default;
        imagem.alt = dados.name;

        const listaTipos = document.createElement("p");
        // Mapeia e junta os tipos estruturados da API
        const tipos = dados.types.map(t => t.type.name).join(" / ");
        listaTipos.textContent = `Tipo: ${tipos}`;

        card.append(nome, imagem, listaTipos);
        resultadoPokedex.append(card);

    } catch (erro) {
        statusPokedex.className = "erro-mensagem";
        statusPokedex.textContent = "Falha na conexao com o servidor da PokeAPI.";
    } finally {
        btnPokemon.disabled = false;
    }
});
