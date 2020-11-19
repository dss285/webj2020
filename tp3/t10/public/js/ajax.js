$(document).ready(function () {
    paivitaTaulukko();
    haeTyypit();
    $("#dialog").dialog({
        autoOpen : false, modal : true, show : "blind", hide : "blind"
    });
    $("#dialog1").dialog({
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
    $("table").on("click", ".poista", function() {
        $.ajax({
            url: `http://127.0.0.1:3002/Asiakas/`+$(this).attr("data"),
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
    $("form.paivita").on("submit", function(event) {
        event.preventDefault();
        paivita($(`form.paivita input[name="avain"]`).val());
    })
    function paivita(id) {
        $.ajax({
            url: `http://127.0.0.1:3002/Asiakas/`+id,
            type: 'PUT',
            data: $("form.paivita").serializeArray(),
            success: function(result) {
                paivitaTaulukko();
            }
        });
    }
    $("#lisaaBtn").click(function() {
        $("#dialog").dialog("open");
    })
    $("table").on("click", ".muokkaa", function() {
        var data = $(this).attr('data')
        $.get(
            {
                url : "http://127.0.0.1:3002/Asiakas/"+data,
                success : function(result) {
                    result = result[0]
                    $(`form.paivita input[name="nimi"]`).val(result.NIMI);
                    $(`form.paivita input[name="osoite"]`).val(result.OSOITE);
                    $(`form.paivita input[name="postinro"]`).val(result.POSTINRO);
                    $(`form.paivita input[name="postitmp"]`).val(result.POSTITMP);
                    $(`form.paivita input[name="avain"]`).val(result.AVAIN);
                    $(`form.paivita select[name="asty_avain"]`).val(result.ASTY_AVAIN);
                }
            }
        )
        $("#dialog1").dialog("open");
    })
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
        inner += "<td><button class='muokkaa' data='"+element.AVAIN+"'>Muokkaa</button></td>\n";
        inner += "</tr>\n";

    });
    $('#data tbody').html(inner);
}
