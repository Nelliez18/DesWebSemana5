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

    // ESTADO 1: CARREGANDO
    statusPokedex.className = "status-mensagem";
    statusPokedex.textContent = "Buscando...";
    btnPokemon.disabled = true;
    resultadoPokedex.replaceChildren();

    try {
        const resposta = await fetch(`https://pokeapi.co{nomePokemon}`);
        
        // ESTADO 2 E 3: ERRO HTTP / POKEMON NAO ENCONTRADO (404)
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

        // ESTADO 4: SUCESSO
        statusPokedex.textContent = ""; 
        
        const card = document.createElement("div");
        card.className = "pokemon-card";

        const nome = document.createElement("h3");
        nome.textContent = dados.name.toUpperCase();

        const imagem = document.createElement("img");
        imagem.src = dados.sprites.front_default;
        imagem.alt = dados.name;

        const listaTipos = document.createElement("p");
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
