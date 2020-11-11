$(document).ready(function () {
    paivitaTaulukko();
    haeTyypit();
    $("#dialog").dialog({
        autoOpen : false, modal : true, show : "blind", hide : "blind"
    });
    function haeTyypit() {
        $.get(
            {
                url : `http://127.0.0.1:3002/Tyypit`,
                success : (result) => {
                    result.forEach(element => {
                        $("select").append("<option value='"+element.Avain+"'>"+element.Lyhenne+" - "+element.Selite+"</option>");
                    });
                }
            }
        )
    }
    $("form.haku").on( "submit", function( event ) {
        event.preventDefault();
        paivitaTaulukko();
    });

    function paivitaTaulukko() {
                $.get({
                    url : `http://127.0.0.1:3002/Asiakas`,
                    data : $('form.haku').serializeArray(),
                    success : (result) => {
                        showResultInTable(result);
                    }
                })
    }
    function lisaa() {
        $.post(
            {
                url : `http://127.0.0.1:3002/Asiakas`,
                data : $('form.lisays').serializeArray(),
                success : (result) => {
                    paivitaTaulukko();
                }
            }
        ).fail(function(xhr, status, error) {
            alert(xhr.responseJSON.message);
        });
        $("#lisaaBtn").click(function() {
            $("#dialog").dialog("open");
        })
    }
    $("table").on("click", ".poista", function() {
        $.ajax({
            url: `http://127.0.0.1:3002/Asiakas/Poista/`+$(this).attr("data"),
            type: 'DELETE',
            success: function(result) {
                paivitaTaulukko();
            }
        });
    });
    $("#lisaaBtn").click(function() {
        $("#dialog").dialog("open");
    })
    $("form.lisays").on("submit", function(event) {
        event.preventDefault();
        lisaa();
    })
});

showResultInTable = (result) => {
    var inner = "";
    result.forEach(element => {
        inner += "<tr><td>" + element.NIMI + "</td>\n";
        inner += "<td>" + element.OSOITE + "</td>\n";
        inner += "<td>" + element.POSTINRO + "</td>\n";
        inner += "<td>" + element.POSTITMP + "</td>\n";
        inner += "<td>" + element.LUONTIPVM + "</td>\n";
        inner += "<td>" + element.ASTY_AVAIN + "</td>\n";
        inner += "<td><button class='poista' data='"+element.AVAIN+"'>Poista</button></td>\n";
        inner += "</tr>\n";

    });
    $('#data tbody').html(inner);
}
