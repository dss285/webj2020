import React from 'react';
class Yhteystiedot extends React.Component {
    constructor(props) {
        super(props)
        if(this.props.match) {
            this.state = {
                id:props.match.params.id
            }
        } else {
            this.state = {
                id : 0
            }
        }
    }
    async componentDidMount() {
        await this.haeAsiakas();
    }
    async haeAsiakas() {
        if(this.state && this.state.id) {
            var asiakas = JSON.parse(JSON.stringify(this.state))
            this.setState()
            var req = await fetch('http://localhost:5000/asiakkaat?'+new URLSearchParams(asiakas).toString())
            var json = await req.json();
            if(Array.isArray(json)) {
                json = json[0];
            }
            this.setState({data:json})
        }
        
    }
    render() {
        return <div>
            <h1>Yhteystiedot</h1>
            {this.state && this.state.data ? 
            <div>
                <p>Nimi: {this.state.data.nimi}</p>
                <p>Osoite: {this.state.data.osoite}</p>
                <p>Postinumero : {this.state.data.pnro}</p>
                <p>Postitoimipaikka: {this.state.data.ptp}</p>
                <p>Puhelinnumero: {this.state.data.puhno}</p>
                
            </div>
            : 
            <div>Yhteystiedot</div>
            
            }
        </div>
    }
}
export default Yhteystiedot;