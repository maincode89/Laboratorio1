window.onload = callService;

var datos;
var urlApp = "https://maincode89.github.io/Tasty_Bites_API/menu.json";

function callService () {
    $.ajax({
        url: urlApp,
        type: "get",
        dataType: "json",
        success: onSuccess,
        error: onError
    });
}

function onSuccess (data) {
    datos = data;
    procesarDatos();
}

function onError (jqXHR, textStatus, errorThrow) {
    alert("mensaje de error: " + errorThrow + "\nURL " + urlApp);
}



function cargarComboPaises () {

    for (var i = 0; i < Object.keys(datos).length; i++) {
        var pais = $("<option></option>").val(datos[i].cca3).text(datos[i].name.common)
        $("#nacionalidad").append(pais)
    }

}



// function cargarPantalla() {

//     if (typeof (Storage) !== "undefined") {

//         var memRegistro = JSON.parse(localStorage.getItem("memRegistro"));

//         if (memRegistro != null) {
          

//             var now = new Date(memRegistro[0]);
//             var day = ("0" + now.getDate()).slice(-2);
//             var month = ("0" + (now.getMonth() + 1)).slice(-2);
//             var today = now.getFullYear() + "-" + (month) + "-" + (day);

//             $('#fechaRetiro').val(today);

//             var now = new Date(memRegistro[1]);
//             var day = ("0" + now.getDate()).slice(-2);
//             var month = ("0" + (now.getMonth() + 1)).slice(-2);
//             var today = now.getFullYear() + "-" + (month) + "-" + (day);

//             $("#fechadevolucion").val(today);

//             document.getElementById("nacionalidad").value =memRegistro[2];
//             document.getElementById("tipoVehiculo").selectedIndex = memRegistro[3];
//             document.getElementById("seguro").selectedIndex = memRegistro[4];

//             $("#dias").val(memRegistro[5]);
//             $("#td").val(memRegistro[6]);
//             $("#tp").val(memRegistro[7]);

//         }
//     }

// }

// function procesarDatos() {
//     let menuContainer = document.getElementById("menu-container-id");
//     let html = "";
//     datos.productos.forEach(producto => {
//         html += "<div class='col-lg-6 menu-item filter-specialty'>";
//         html += "<div class='menu-content'>";
//         html += "<a href='#'>" + producto.nombre + "</a><span>&#x20a1;" + producto.precio + "</span>";
//         html += "</div>";
//         html += "<div class='menu-ingredients'>" + producto.descripcion + "</div>";
//         html += "</div>";
//     });
//     menuContainer.innerHTML= "";
//     menuContainer.innerHTML = html;
// }