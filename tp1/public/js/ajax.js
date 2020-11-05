$(document).ready(function () {
    paivitaTaulukko();
    haeTyypit();

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
        inner += "</tr>\n";

    });
    $('#data tbody').html(inner);
}
