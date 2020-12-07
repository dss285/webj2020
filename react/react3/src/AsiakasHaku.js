import React, { useState, useEffect } from 'react';
function Asiakashaku() {
    const[stat, setStat] = useState({});
    const[form, setForm] = useState({});
    const[loading, setLoading] = useState(true);
    useEffect(async () => {
        if(loading) {
            var data = form
            setTimeout(async function() {
                var req = await fetch('http://localhost:5000/asiakkaat?'+new URLSearchParams(data).toString())
                var json = await req.json()
                stat.data = json
                setLoading(false)
                console.log(stat)
            }, 500)

        }
    }, [loading])

  
    return <div>
        
    <form id="haku">
        Nimi<br />
        <input type="text" name="nimi" onChange={(event) => {setForm({nimi_like : event.target.value})}}/><br />
        Osoite<br />
        <input type="text" name="osoite" onChange={(event) => {setForm({osoite_like : event.target.value})}}/><br />
        Postinumero<br />
        <input type="number" name="pnro" onChange={(event) => {setForm({pnro_like : event.target.value})}}/><br />
        Postitoimipaikka<br />
        <input type="text" name="ptp" onChange={(event) => {setForm({ptp_like : event.target.value})}}/><br />
        Puhelinnumero<br />
        <input type="text" name="puhno" onChange={(event) => {setForm({puhno_like : event.target.value})}}/><br />
        <button type="button" onClick={() => setLoading(true)}>Hae</button>
    </form>
    {loading.val ? <h2>Lataa . . .</h2> : <h2>Taulukko</h2>}
        <table>
            <tr>
                <th>Nimi</th>
                <th>Osoite</th>
                <th>Postinumero</th>
                <th>Postitoimipaikka</th>
                <th>Puhelinnumero</th>
            </tr>
            { stat.data && stat.data.length > 0 ? stat.data.map(function(val) {
    return <tr>
        <td>{val.nimi}</td>
        <td>{val.osoite}</td>
        <td>{val.pnro}</td>
        <td>{val.ptp}</td>
        <td>{val.puhno}</td>
        </tr>
    }) : <h2>Annetuilla hakuehdoilla ei löytynyt dataa</h2>}
        </table>

    </div>
  }
export default Asiakashaku;