import React from 'react';
class TableClass extends React.Component {
    constructor(props) {
        super(props)
        this.data = props.data
        if(this.data) {
            this.data = this.data.map(function(kayttaja) {
            return <tr><td>{kayttaja.nimi}</td><td>{kayttaja.osoite}</td><td>{kayttaja.aloitusvuosi}</td></tr>
            })
        }
    }
    render() {
        
        return <table>
            <tr><th>Nimi</th><th>Osoite</th><th>Aloitusvuosi</th></tr>
            {this.data}
        </table>
    }
}
export default TableClass;