const {h, render, Component} = require('preact')
const Goban = require('..')

const signMap = [
    [0,0,0,-1,-1,-1,1,0,1,1,-1,-1,0,-1,0,-1,-1,1,0],
    [0,0,-1,0,-1,1,1,1,0,1,-1,0,-1,-1,-1,-1,1,1,0],
    [0,0,-1,-1,-1,1,1,0,0,1,1,-1,-1,1,-1,1,0,1,0],
    [0,0,0,0,-1,-1,1,0,1,-1,1,1,1,1,1,0,1,0,0],
    [0,0,0,0,-1,0,-1,1,0,0,1,1,0,0,0,1,1,1,0],
    [0,0,-1,0,0,-1,-1,1,0,-1,-1,1,-1,-1,0,1,0,0,1],
    [0,0,0,-1,-1,1,1,1,1,1,1,1,1,-1,-1,-1,1,1,1],
    [0,0,-1,1,1,0,1,-1,-1,1,0,1,-1,0,1,-1,-1,-1,1],
    [0,0,-1,-1,1,1,1,0,-1,1,-1,-1,0,-1,-1,1,1,1,1],
    [0,0,-1,1,1,-1,-1,-1,-1,1,1,1,-1,-1,-1,-1,1,-1,-1],
    [-1,-1,-1,-1,1,1,1,-1,0,-1,1,-1,-1,0,-1,1,1,-1,0],
    [-1,1,-1,0,-1,-1,-1,-1,-1,-1,1,-1,0,-1,-1,1,-1,0,-1],
    [1,1,1,1,-1,1,1,1,-1,1,0,1,-1,0,-1,1,-1,-1,0],
    [0,1,-1,1,1,-1,-1,1,-1,1,1,1,-1,1,-1,1,1,-1,1],
    [0,0,-1,1,0,0,1,1,-1,-1,0,1,-1,1,-1,1,-1,0,-1],
    [0,0,1,0,1,0,1,1,1,-1,-1,1,-1,-1,1,-1,-1,-1,0],
    [0,0,0,0,1,1,0,1,-1,0,-1,-1,1,1,1,1,-1,-1,-1],
    [0,0,1,1,-1,1,1,-1,0,-1,-1,1,1,1,1,0,1,-1,1],
    [0,0,0,1,-1,-1,-1,-1,-1,0,-1,-1,1,1,0,1,1,1,0]
]

const paintMap = [
    [-1,-1,-1,-1,-1,-1,1,1,1,1,-1,-1,-1,-1,-1,-1,-1,1,1],
    [-1,-1,-1,-1,-1,1,1,1,1,1,-1,-1,-1,-1,-1,-1,1,1,1],
    [-1,-1,-1,-1,-1,1,1,1,1,1,1,-1,-1,1,-1,1,1,1,1],
    [-1,-1,-1,-1,-1,-1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [-1,-1,-1,-1,-1,-1,-1,1,1,1,1,1,0,0,0,1,1,1,1],
    [-1,-1,-1,-1,-1,-1,-1,1,1,1,1,1,-1,-1,0,1,1,1,1],
    [-1,-1,-1,-1,-1,1,1,1,1,1,1,1,1,-1,-1,-1,1,1,1],
    [-1,-1,-1,1,1,1,1,-1,-1,1,0,1,-1,-1,-1,-1,-1,-1,1],
    [-1,-1,-1,-1,1,1,1,0,-1,1,-1,-1,-1,-1,-1,1,1,1,1],
    [-1,-1,-1,1,1,-1,-1,-1,-1,1,1,1,-1,-1,-1,-1,1,-1,-1],
    [-1,-1,-1,-1,1,1,1,-1,-1,-1,1,-1,-1,-1,-1,1,1,-1,-1],
    [-1,1,-1,0,-1,-1,-1,-1,-1,-1,1,-1,-1,-1,-1,1,-1,-1,-1],
    [1,1,1,1,-1,1,1,1,-1,1,1,1,-1,-1,-1,1,-1,-1,-1],
    [1,1,1,1,1,1,1,1,-1,1,1,1,-1,-1,-1,1,1,-1,-1],
    [1,1,1,1,1,1,1,1,-1,-1,0,1,-1,-1,-1,1,-1,-1,-1],
    [1,1,1,1,1,1,1,1,1,-1,-1,1,-1,-1,1,-1,-1,-1,-1],
    [1,1,1,1,1,1,1,1,-1,-1,-1,-1,1,1,1,1,-1,-1,-1],
    [1,1,1,1,-1,1,1,-1,-1,-1,-1,1,1,1,1,1,1,-1,1],
    [1,1,1,1,-1,-1,-1,-1,-1,-1,-1,-1,1,1,1,1,1,1,1]
]

const heatMap = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,7,9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,5,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
]

const createTwoWayCheckBox = (state, setState) => (
    ({stateKey, text}) => h('label',
        {
            style: {
                display: 'flex',
                alignItems: 'center'
            }
        },

        h('input', {
            style: {marginRight: '.5em'},
            type: 'checkbox',
            checked: state[stateKey],

            onClick: () => setState(s => ({[stateKey]: !s[stateKey]}))
        }),

        h('span', {}, text)
    )
)

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showCoordinates: false,
            showDimmedStones: false,
            fuzzyStonePlacement: false,
            showPaintMap: false,
            showHeatMap: false,
            showLines: false,
            showSelection: false
        }

        this.CheckBox = createTwoWayCheckBox(this.state, this.setState.bind(this))
    }

    render() {
        let {showCoordinates, showDimmedStones, fuzzyStonePlacement,
            showPaintMap, showHeatMap, showLines,
            showSelection} = this.state

        return h('section',
            {
                style: {
                    display: 'grid',
                    gridTemplateColumns: 'auto 1fr',
                    gridColumnGap: '1em'
                }
            },

            h(Goban, {
                signMap,
                showCoordinates,
                fuzzyStonePlacement,
                paintMap: showPaintMap && paintMap,
                heatMap: showHeatMap && heatMap,

                lines: showLines ? [
                    {type: 'line', v1: [15, 6], v2: [12, 15]},
                    {type: 'arrow', v1: [10, 4], v2: [5, 7]}
                ] : [],

                dimmedVertices: showDimmedStones ? [
                    [2, 14], [2, 13], [5, 13], [6, 13],
                    [9, 3], [9, 5], [10, 5], [14, 7],
                    [13, 13], [13, 14], [18, 13]
                ] : [],

                selectedVertices: showSelection ? [
                    [9, 7], [9, 8], [9, 9], [10, 9]
                ] : []
            }),

            h('form',
                {
                    style: {
                        display: 'flex',
                        flexDirection: 'column'
                    }
                },

                h(this.CheckBox, {stateKey: 'showCoordinates', text: 'Show coordinates'}),
                h(this.CheckBox, {stateKey: 'showDimmedStones', text: 'Dim dead stones'}),
                h(this.CheckBox, {stateKey: 'fuzzyStonePlacement', text: 'Fuzzy stone placement'}),
                h(this.CheckBox, {stateKey: 'showPaintMap', text: 'Show paint map'}),
                h(this.CheckBox, {stateKey: 'showHeatMap', text: 'Show heat map'}),
                h(this.CheckBox, {stateKey: 'showLines', text: 'Show lines'}),
                h(this.CheckBox, {stateKey: 'showSelection', text: 'Show selection'})
            )
        )
    }
}

render(h(App), document.body)
