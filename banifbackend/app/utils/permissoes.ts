export const permissions = [
  // Cliente - 0
  {
    createClient: false,     // não pode criar clientes
    createAccount: false,    // não pode criar conta corrente
    showClient: true,
    viewClient: false,
    listClient: false,
    editClient: false,
    deleteClient: false,
    investMoney: true,       // pode aplicar financeiramente
    transferMoney: true,     // pode transferir via Pix
    checkBalance: true,      // pode verificar saldo
    generateStatement: true, // pode gerar extrato
  },
  {
    createClient: false,     // não pode criar clientes
    createAccount: false,    // não pode criar conta corrente
    showClient: true,
    viewClient: false,
    listClient: false,
    editClient: false,
    deleteClient: false,
    investMoney: true,       // pode aplicar financeiramente
    transferMoney: true,     // pode transferir via Pix
    checkBalance: true,      // pode verificar saldo
    generateStatement: true, // pode gerar extrato
  },
  {
    createClient: true,      // pode cadastrar clientes
    createAccount: true,     // pode criar contas correntes'
    showClient: true,
    viewClient: true,
    listClient: true,
    editClient: true,
    deleteClient: true,
    transferMoney: true,     // pode realizar transferências administrativas
    checkBalance: true,      // pode ver saldos
    generateStatement: true, // pode gerar extratos
    investMoney: true,       // pode fazer aplicações em nome de clientes
  },
]
