# Entregável de Desenvolvimento Web – (Objetos, Dados e Assincronismo) – Semana 05
# Sistema de Integracao de Dados, Assincronismo e Consumo de APIs

Este projeto consolida a aplicacao pratica de tecnicas avancadas de JavaScript moderno (ES6+), englobando a manipulacao estruturada de objetos, tratamento de fluxos assincronos com Promises e Fetch API, e gerenciamento reativo da interface com base em quatro estados controlados de tela.

## Metodos de Array Aplicados

*   filter: Utilizado na Parte 1 para validar as regras de negocio dos pedidos (excluindo cadastros sem identificacao ou com valores monetarios nulos/negativos) e para isolar transacoes baseadas no status de pagamento.
*   reduce: Processou o acumulador financeiro para condensar os valores de todos os objetos filtrados em um unico montante consolidado de faturamento.
*   map: Aplicado no desafio da Pokedex para extrair a propriedade string contida no arranjo aninhado de objetos de tipo retornado pela PokeAPI.

## Gerenciamento de Estados de Tela

A interface web foi projetada para responder dinamicamente a quatro contextos de execucao, garantindo uma boa experiencia ao usuario:

1. Carregando: Disparado assim que o formulario e enviado. Ele altera o texto de sinalizacao para "Buscando..." e desabilita os botoes de acao para mitigar cliques duplicados e chamadas repetidas desnecessarias a API.
2. Erro: Intercepta falhas fisicas ou logicas no bloco catch. Trata problemas como a falta de conectividade local do usuario ou falhas internas de resposta do servidor HTTP.
3. Vazio / Nao Encontrado: Atua quando a infraestrutura da API responde perfeitamente, mas a informacao buscada nao consta no banco de dados centralizado (como um CEP inexistente ou um erro HTTP 404 de um Pokemon invalido).
4. Sucesso: Limpa o layout de buscas anteriores atraves do metodo replaceChildren() e renderiza a resposta final na tela utilizando a criacao segura de nos com createElement e textContent.

---

## Reflexao: Analise de Performance Assincrona

**Pergunta**: Por que Promise.all pode ser mais rapido que varios await seguidos?

**Resposta**: 
Quando utilizamos multiplas instrucoes await de maneira sequencial (uma embaixo da outra), o interpretador do JavaScript e forcado a pausar a execucao e esperar de forma passiva que a primeira Promise seja totalmente resolvida (enviada, processada e retornada pela internet) antes de sequer iniciar o disparo da segunda requisicao. Se tivermos tres buscas que demoram 1 segundo cada, o tempo de execucao total sera de 3 segundos.

Em contrapartida, o metodo Promise.all() recebe um array de Promises e dispara todas as requisicoes de forma paralela e simultanea para a rede. O JavaScript nao aguarda uma resposta para enviar a proxima. Ele aproveita ao maximo a largura de banda da rede e processa os dados de forma concorrente. A execucao total passa a demorar apenas o tempo da requisicao individual mais lenta da lista (aproximadamente 1 segundo no mesmo cenario), otimizando consideravelmente o tempo de processamento.

# Saída da Parte 1 (Console)
```text
--- PARTE 1: VALIDACAO E FILTRAGEM DE PEDIDOS ---
Pedidos Processados com Sucesso:
Ana - R$ 150.00
Daniela - R$ 120.00
Total Faturado Geral: R$ 270.00
```
# Saída da Parte 2: Buscador de CEP (Exibida na Tela / DOM)
## Estado: Carregando
```text
Buscando...
```
## Estado: Sucesso (Exemplo de busca com o CEP 01001-000)
```text
Rua
Praça da Sé
Bairro
Sé
Cidade
São Paulo
UF
SP
```
## Estado: Vazio / Não Encontrado
```text
CEP nao encontrado.
```
## Estado: Erro de Rede / Sem Internet
```text
Falha na conexao com a rede. Verifique sua internet.
```
# Saída da Parte 3: Mini Pokédex (Exibida na Tela / DOM)
## Estado: Carregando
```text
Buscando...
```
## Estado: Sucesso (Exemplo de busca pelo termo "pikachu")
```text
PIKACHU
[Imagem do Pikachu renderizada na tela]
Tipo: electric
```
## Estado: Vazio / Não Encontrado (Erro 404)
```text
Pokemon nao encontrado.
```
## Estado: Erro de Conexão com o Servidor
```text
Falha na conexao com o servidor da PokeAPI.
```
