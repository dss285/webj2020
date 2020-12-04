import React from 'react'

class Elaimet extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            elaimet : props.elaimet
        }
    }
    render() {
        var el = this.state.elaimet.map(function (val) {
            return <li>{val.nimi}, Omistaja {val.omistaja}, syntynyt {val.vuosi}</li>
        })
        return <ul>{el}</ul>
    }
}
export default Elaimet;