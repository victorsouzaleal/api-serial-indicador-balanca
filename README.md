# WebService API serial para indicadores de balanças

Esse projeto foi desenvolvido por mim por uma curiosidade se era possível criar uma WebService capaz de ler o código serial de um indicador para balanças rodoviárias e converte-lo para ser exibido em apps WEB, Desktop e Mobile.  Encontrei a solução com a documentação do módulo **SerialPort** do **Node.js**


# Instalação e Inicialização

> git clone https://github.com/Victorsouza02/api-serial-indicador-balanca.git

> cd api-serial-indicador-balanca

> npm install

> npm start

Após esse comando o servidor deverá estar executando em sua http://localhost:3333

## Indicadores suportados
Até o momento será suportado apenas o indicador **WT1000N** mas futuramente novos serão adicionados.

WT1000N (Verifique no manual da fabricante Weightech) :
- Configurar formato de saída para 0,0000000,0000000,0000000 (Transmissão continua)
- Baud rate : 9600

## Comandos básicos

**Abrir porta específica**
> GET http://localhost:3333/api/open?port=SUA_PORTA_SERIAL

**Fechar porta**
>GET http://localhost:3333/api/close

**Listar portas disponíveis e configuração atual**
> GET http://localhost:3333/api/configinfo

**Alterar configuração de porta e equipamento utilizado**
> PUT http://localhost:3333/api/updateinfo

Exemplo de requisição :

````
{
	porta: "COM1",
	equipamento: "WT1000N"
}
````
**Obter dados da porta** :
> GET http://localhost:3333/api/data?equip=NOME_DO_EQUIPAMENTO

## Guia rápido

Após iniciar o servidor seguir esses passos utilizando as requisições acima:

1 - Listar portas disponíveis e a configuração atual

2 - Alterar configuração de porta e equipamento(se necessário)

3 - Abrir a porta

4 - Obter dados da porta

5 - Fechar a porta



## Considerações Finais

Ainda estou iniciando nesse mundo do Node.js e esse projeto me ajudou a aprender muitas coisas, com a ajuda da documentação do módulo **Node SerialPort** e ajuda de membros do StackOverflow este projeto foi possível. Estarei atualizando conforme eu for aprendendo novos métodos de melhorar o meu código.
