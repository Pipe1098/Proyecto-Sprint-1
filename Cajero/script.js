// Creando una lista de clientes, admin
const usuarios = [
    {
        nombre: "Juan",
        documento: "123456",
        contraseña: "789",
        tipoUsuario: "cliente",
    },
    {
        nombre: "Luis",
        documento: "456789",
        contraseña: "543",
        tipoUsuario: "cliente",
    },
    {
        nombre: "Pedro",
        documento: "896751",
        contraseña: "245",
        tipoUsuario: "ADMIN",
    },
];
// Creando array compuesto de objetos (billetes)
const billetes = [
    {
        denom: 5000,
        cantidad: 0,
    },
    {
        denom: 10000,
        cantidad: 0,
    },
    {
        denom: 20000,
        cantidad: 0,
    },
    {
        denom: 50000,
        cantidad: 0,
    },
    {
        denom: 100000,
        cantidad: 0,
    },
];

//Variable para saber cuanto dinero hay disponible
let dineroEnCajero = 0;

//Funcion principal donde se piden datos al usuario para despues saber que funcion usar y que datos o mensajes entregar 
function main() {
    const usuario = login(); //invocamos la funcion login y guardamos en una constante
    const isAdmin = usuario.tipoUsuario === "ADMIN" ? true : false;
    //Validamos tipo de usuario
    if (isAdmin) {
        agregarBilletes();
        main();
    } else {
        if (dineroEnCajero === 0)
            return console.log("Cajero en mantenimiento, vuelva pronto.");

        const aRetirar = parseInt(prompt("Cuanto desea retirar?"));

        if (aRetirar > dineroEnCajero)
            return console.log("No hay suficiente dinero");

        retirarDinero(aRetirar);
    }
}
main();

//funcion para recibir datos del usuario
function login() {
    const documento = prompt("Ingrese su documento");
    const contraseña = prompt("Ingrese su contraseña");

    //Buscar que el documento coincida con alguno de la lista creada
    let usuario = usuarios.find((usuario) => usuario.documento === documento);

    if (!usuario) {
        console.log("No se encontró el usuario");
        alert('no se encontró el usuario')
        login();
    }
    //verificar si contraseña coincide
    if (usuario.contraseña !== contraseña) {
        console.log("No ingresó bien la contraseña");
        alert("No ingresó bien la contraseña")
        login();
    }
    return usuario;
}
//Si es admin usamos la funcion agregar billetes al cajero
function agregarBilletes() {

    //Preguntar cuantos billetes de cada denominacion quiere agregar y agregar esa cantidad al array de billetes.
    billetes.forEach((billete) => {
        const cantidad = parseInt(
            prompt(`Cuantos billetes de ${billete.denom} desea agregar?`)
        );

        billete.cantidad = cantidad;

        //Acumulamos la cantidad de dinero en la variable previamente declarada
        dineroEnCajero += billete.cantidad * billete.denom;
    });

    console.log(billetes);
    console.log(dineroEnCajero);
}
// Si es cliente se aplica esta funcion que recibe como parametro la cantidad a retirar
function retirarDinero(cantidadARetirar) {
    let aEntregar = {}; //se almacenarán aca los billetes a retirar
    let totalARetirar = 0;

    billetes.reverse().forEach((billete) => {
        //Se empieza a comparar la cantidad a retirar con el valor del billete
        if (billete.cantidad > 0 && cantidadARetirar >= billete.denom) {
            while (billete.cantidad !== 0 && cantidadARetirar >= billete.denom) {
                aEntregar[billete.denom] = aEntregar[billete.denom] ? aEntregar[billete.denom] + 1 : 1;

                billete.cantidad -= 1;//Cantidad del billete disminuye

                totalARetirar += billete.denom;

                cantidadARetirar -= totalARetirar;
            }
        }
    });

    dineroEnCajero -= totalARetirar;
// Mostramos la info
    if (totalARetirar < cantidadARetirar) alert("Te dimos lo que se pudo");
    console.log("Resultado transacción:", { aEntregar, totalARetirar, billetes, dineroEnCajero });
    // return { aEntregar, totalARetirar };
}

