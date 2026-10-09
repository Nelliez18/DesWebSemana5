// PARTE 1 - MANIPULACAO E VALIDACAO DE DADOS

console.log("--- PARTE 1: VALIDACAO E FILTRAGEM DE PEDIDOS ---");

const pedidos = [
    { cliente: "Ana", valor: 150.00, status: "pago" },
    { cliente: "Bruno", valor: 0.00, status: "pago" }, 
    { cliente: "", valor: 85.00, status: "pago" },     
    { cliente: "Carlos", valor: 45.00, status: "pendente" }, 
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
