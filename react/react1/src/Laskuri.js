import React from 'react';
class Laskuri extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            numero : 0
        }

        this.btnKasvata = this.kasvata.bind(this)
        this.btnNollaa = this.nollaa.bind(this)
    }
    kasvata() {
        this.setState({numero:this.state.numero+1})
    }
    nollaa() {
        this.setState({numero:0})
    }
    render() {
    return <div>
        <LaskuriTeksti numero={this.state.numero}/>
        <button onClick={this.btnKasvata}>Kasvata</button>
        <button onClick={this.btnNollaa}>Nollaa</button>
    </div>
    }
}
function LaskuriTeksti(props) {
    return <div>
            {props.numero >= 10
            ? <p style={{color:"red", fontStyle:"italic"}}>{props.numero}</p>
            : <p>{props.numero}</p>
            }
    </div>;
}
export default Laskuri;