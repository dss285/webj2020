import React from 'react'
import {
    Link
  } from "react-router-dom";
class AsiakasHaku extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            data : [],
            loading: false
        }
        this.haku = this.haeAsiakas.bind(this)
        this.poista = this.poistaAsiakas.bind(this)
        this.nimiChangein = this.nimiChange.bind(this)
        this.osoiteChangein = this.osoiteChange.bind(this)
        this.pnroChangein = this.pnroChange.bind(this)
        this.ptpChangein = this.ptpChange.bind(this)
        this.puhnoChangein = this.puhnoChange.bind(this)
    }
    async haeAsiakkaat() {
        this.setState({loading:true})
        setTimeout(async function () {
            var req = await fetch('http://localhost:5000/asiakkaat')
            var json = await req.json();
            this.setState({data:json, loading:false})
        }.bind(this), 500)
    }
    async haeAsiakas() {
        
        var asiakas = JSON.parse(JSON.stringify(this.state))
        delete asiakas.data;
        delete asiakas.loading;
        this.setState({loading:true})
        setTimeout(async function () {
            var req = await fetch('http://localhost:5000/asiakkaat?'+new URLSearchParams(asiakas).toString())
            var json = await req.json();
            this.setState({data:json, loading:false})
        }.bind(this), 500)
        
        
    }
    async poistaAsiakas(id) {
        await this.haeAsiakas()
        await fetch(`http://localhost:5000/asiakkaat/${id}`, {method:'DELETE'})
    }
    async componentDidMount() {
        await this.haeAsiakkaat();
    }
    nimiChange(e) {this.setState({nimi_like:e.target.value})}
    osoiteChange(e) {this.setState({osoite_like:e.target.value})}
    pnroChange(e) {this.setState({pnro_like:e.target.value})}
    ptpChange(e) {this.setState({ptp_like:e.target.value})}
    puhnoChange(e) {this.setState({puhno_like:e.target.value})}
    render() {
        console.log(this.state)
        var rivit = []

        if(this.state.data && Array.isArray(this.state.data)) {
        rivit = this.state.data.map(function(val) {
            var redir = `/yhteystiedot/${val.id}`
        return <tr>
            <td>{val.nimi}</td>
            <td>{val.osoite}</td>
            <td>{val.pnro}</td>
            <td>{val.ptp}</td>
            <td>{val.puhno}</td>
            <td><PoistaNappi id={val.id} poista={this.poista}/></td>
            <td><Link to={redir}>Yhteystiedot</Link></td>
            </tr>
        }, this)
        }

        return <div>
            
        <form id="haku">
            Nimi<br />
            <input type="text" name="nimi" onChange={this.nimiChangein}/><br />
            Osoite<br />
            <input type="text" name="osoite" onChange={this.osoiteChangein}/><br />
            Postinumero<br />
            <input type="number" name="pnro" onChange={this.pnroChangein}/><br />
            Postitoimipaikka<br />
            <input type="text" name="ptp" onChange={this.ptpChangein}/><br />
            Puhelinnumero<br />
            <input type="text" name="puhno" onChange={this.puhnoChangein}/><br />
            <button type="button" onClick={this.haku}>Nappi</button><br />
        </form>
        {this.state.loading ? <h2>Lataa . . .</h2> : <h2>Taulukko</h2>}
        {this.state.data.length === 0 ? <h2>Annetuilla hakuehdoilla ei löytynyt dataa</h2> : 
            <table>
                <tr>
                    <th>Nimi</th>
                    <th>Osoite</th>
                    <th>Postinumero</th>
                    <th>Postitoimipaikka</th>
                    <th>Puhelinnumero</th>
                    <th>Poista</th>
                    <th>Yhteystiedot</th>
                </tr>
                {rivit}
            </table>
            }
        </div>
    }
}
class PoistaNappi extends React.Component {

    render() {
        return <button onClick={() => this.props.poista(this.props.id)}>Poista</button>
    }
}
export default AsiakasHaku;